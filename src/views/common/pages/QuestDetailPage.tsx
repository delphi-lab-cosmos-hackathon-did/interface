import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Routes } from 'constants/Routes'
import { useTheme } from '@emotion/react'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCalendarClock } from '@fortawesome/pro-light-svg-icons'
import { faLock, faXmark } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ConditionBoxSkeleton } from 'components/skeleton/ConditionBoxSkeleton'
import { TranslucentBlurBox } from 'components/TranslucentBlurBox'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAuthData } from 'lib/AuthDataContext'
import { useRouter } from 'next/router'

import { QuestResponseItem, questService } from 'services/questService'
import { userService } from 'services/userService'
import { dialogStore } from 'stores/dialogStore'
import { loadingStore } from 'stores/loadingStore'
import ConditionBox, { ConditionBoxProps } from 'views/quest/ConditionBox'
import { CustomMetaTag } from 'components/CustomMetaTag'
import ConditionStatusBox from 'views/quest/ConditionStatusBox'
import RewardBox from 'views/quest/RewardBox'
import VerifyDialog from 'views/quest/VerifyDialog'
import { GradientButton } from '../../../components/GradientButton'
import {
  MetaDataRewardERC20,
  QuestConditionValues,
  QuestPreCondition,
  QuestPreConditionTypeValues,
  QuestRewardType,
  UserQuestSubmissionStatus,
} from '../../../services/types/quest'
import { ParticipantsBox } from '../../quest/ParticipantsBox'
import { ConnectWallet } from '../ConnectWallet'
import { Layout } from '../Layout'
import { formatDataCountdown, formatDate, formatNumber } from 'utils/format'
import { SadIcon } from 'svgs'

import useUserQuestSubmission from 'hooks/useUserQuestSubmission'
import ProjectProfile from '../ProjectProfile'
import DialogTextSubmission from '../DialogTextSubmission'
import ButtonSubmit from 'components/ButtonSubmit'

dayjs.extend(relativeTime)
dayjs.extend(utc)

export interface QuestDetailProps {
  questData: QuestResponseItem | null
}

export const QuestDetail = (props: QuestDetailProps) => {
  const router = useRouter()
  const theme = useTheme()

  const { fetchData } = useUserQuestSubmission()

  const [questData, setQuestData] = useState<QuestResponseItem>(props.questData)
  const [notFound, setNotfound] = useState(false)
  const { isLogin } = useAuthData()
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [conditionData, setConditionData] = useState<ConditionBoxProps[]>([])
  const [isSyncTwitter, SetIsSyncTwitter] = useState(true)
  const [isSyncDiscord, SetIsSyncDiscord] = useState(true)
  const [notStart, setNotStart] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [cryptoReward, setCryptoReward] = useState(0)
  const [submissionStatus, setSubmissionStatus] = useState<
    UserQuestSubmissionStatus | undefined
  >(undefined)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passPrecondition, setPassPrecondition] = useState(true)
  const [openTextSubmission, setOpenTextSubmission] = useState(false)
  const [initialTextSubmission, setInitialTextSubmission] = useState<string>('')

  const fetchQuest = async (slug: string, force = false) => {
    loadingStore.increase()
    setIsLoading(true)
    try {
      let data: QuestResponseItem
      if (force) {
        data = await questService.getQuestBySlug(slug)
      } else {
        data = questData
      }
      if (data == null) {
        setNotfound(true)
        return
      }
      data.questRewards.forEach((i) => {
        let amount = 0
        switch (i.type) {
          case QuestRewardType.ERC20:
            amount = (i.metaData as MetaDataRewardERC20).amount
            setCryptoReward(amount)
            break
        }
      })
      const now = dayjs.utc()
      if (now.isBefore(data.startDate)) {
        setNotStart(true)
      }
      if (now.isAfter(data.endDate)) {
        setIsEnd(true)
      }
      setQuestData(data)
      let conditions = data.questConditions.map((i) => {
        return {
          title: i.title,
          description: i.description,
          check: false,
          seq: i.seq,
        }
      })
      if (isLogin) {
        const questSubmission = await questService.getMyUserSubmissionQuest(
          data?.id,
        )
        setSubmissionStatus(questSubmission.status)

        // Initial Text Submission
        const result = questSubmission?.questConditions?.find(
          (i) =>
            i.type === QuestConditionValues.TEXT ||
            i.type === QuestConditionValues.URL,
        )
        if (result) {
          setInitialTextSubmission(result?.metaData?.text)
        } else {
          setInitialTextSubmission('')
        }

        // Initial Check
        conditions = data?.questConditions?.map((i) => {
          let check = false

          if (questSubmission.questConditions) {
            check =
              questSubmission.questConditions?.find(
                (q) => q.type === i.type && i.seq === q.seq,
              )?.check || false
          }

          let linkDisplay = ''
          let displaySecondary = ''
          let text = ''
          switch (i.type) {
            case QuestConditionValues.FOLLOW_TWITTER:
              linkDisplay = i?.metaData?.twitterUsername
              break
            case QuestConditionValues.LIKE:
            case QuestConditionValues.RETWEET:
              linkDisplay = 'this tweet'
              break
            case QuestConditionValues.JOIN_DISCORD:
              linkDisplay = i?.metaData.display
              displaySecondary = i?.metaData?.roleDisplays
              break
            case QuestConditionValues.TEXT:
            case QuestConditionValues.URL:
              text = i?.metaData?.text
              break
          }

          return {
            title: i.title,
            description: i.description,
            check: check,
            seq: i.seq,
            link: i.metaData.url,
            linkType: i?.type,
            linkDisplay,
            displaySecondary,
            text,
          }
        })
        await checkPrecondition(data.questPreConditions)
      }
      setConditionData(conditions)
    } catch (e) {
      setNotfound(true)
    } finally {
      loadingStore.decrease()
      setIsLoading(false)
    }
  }

  const checkPrecondition = async (questPreConditions: QuestPreCondition[]) => {
    let check = true
    const preConditionSyncTwitter = questPreConditions.find(
      (i) => i.type === QuestPreConditionTypeValues.SYNC_TWITTER,
    )
    if (preConditionSyncTwitter) {
      const checkTwitter = await checkSyncTwitter()
      check = check && checkTwitter
    }

    const preConditionSyncDiscord = questPreConditions.find(
      (i) => i.type === QuestPreConditionTypeValues.SYNC_DISCORD,
    )
    if (preConditionSyncDiscord) {
      const checkDiscord = await checkSyncDiscord()
      check = check && checkDiscord
    }
    setPassPrecondition(check)
  }

  const checkSyncTwitter = async () => {
    let res = false
    try {
      loadingStore.increase()
      const resp = await userService.checkSyncTwitter()
      if (resp?.isSuccess) {
        SetIsSyncTwitter(true)
        res = true
      } else {
        SetIsSyncTwitter(false)
        res = false
      }
    } finally {
      loadingStore.decrease()
    }
    return res
  }

  const checkSyncDiscord = async () => {
    let res = false
    try {
      loadingStore.increase()
      const resp = await userService.checkSyncDiscord()
      if (resp === 'ok') {
        SetIsSyncDiscord(true)
        res = true
      } else {
        SetIsSyncDiscord(false)
      }
    } finally {
      loadingStore.decrease()
    }
    return res
  }

  useEffect(() => {
    const slug = router?.query?.id
    if (slug) {
      fetchQuest(String(slug))
    }
  }, [router?.query?.id, isLogin])

  const openSubmission = questData?.questConditions?.some(
    (i) =>
      i?.type === QuestConditionValues.TEXT ||
      i?.type === QuestConditionValues.URL,
  )

  const renderSubmit = () => {
    const notSubmit = submissionStatus === undefined && !isFull
    const pending =
      submissionStatus === UserQuestSubmissionStatus.PENDING && !isFull
    const reject =
      submissionStatus === UserQuestSubmissionStatus.REJECT && !isFull

    if (!loadingStore.isLoading) {
      // Before quest start
      if (notStart) {
        return <div className="text-center font-bold">Quest is not started</div>
      }
      // After quest end
      else if (isEnd) {
        return (
          <Stack spacing={3}>
            <div className="text-center font-bold">Quest is ended</div>
            {submissionStatus === UserQuestSubmissionStatus.APPROVE &&
              openSubmission && (
                <ButtonSubmit onClick={onOpenTextSubmission}>
                  View Submission
                </ButtonSubmit>
              )}
          </Stack>
        )
      }
      // Quest success and wait admin approve
      else if (submissionStatus === UserQuestSubmissionStatus.WAIT_APPROVE) {
        return (
          <Stack spacing={3}>
            <div className="text-center font-light">
              You have succesfully entered <br />
              the quest, please wait for admin review
            </div>
            <ButtonSubmit onClick={onOpenTextSubmission}>
              View Submission
            </ButtonSubmit>
          </Stack>
        )
      } else if (
        submissionStatus === UserQuestSubmissionStatus.APPROVE &&
        openSubmission
      ) {
        return (
          <Stack spacing={3}>
            <ButtonSubmit onClick={onOpenTextSubmission}>
              View Submission
            </ButtonSubmit>
          </Stack>
        )
      }
      // Quest pending
      else if (reject || pending || isFull || notSubmit) {
        return (
          <ButtonSubmit
            disabled={!passPrecondition || !isLogin || isVerifying || isFull}
            onClick={() =>
              openSubmission ? onOpenTextSubmission() : onClickVerify({})
            }
          >
            Submit
          </ButtonSubmit>
        )
      }
    }
    return <></>
  }

  const onOpenTextSubmission = () => {
    setOpenTextSubmission(true)
  }

  const onClickVerify = async (meta) => {
    setOpenTextSubmission(false)
    setIsVerifying(true)
    try {
      const slug = router?.query?.id as string

      await questService.verifyQuest(questData?.id, meta)
      await fetchQuest(slug, true)
      await fetchData(Number(questData?.id), 9)
      setOpenVerifyModal(true)
    } catch (error) {
      if (error?.response?.status === 429) {
        dialogStore.open('Please try again in 5 minutes', {
          title: 'Too Many Requests',
        })
      } else if (error?.response?.status === 400) {
        const text = error?.response?.data?.message || 'Something error'
        dialogStore.open(text, {
          title: 'Cannot submit',
        })
      } else {
        dialogStore.open('Please try again later', {
          title: 'Something went wrong',
        })
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const onProceedVerify = (): void => {
    setOpenVerifyModal(false)
  }

  const onClickSyncDiscord = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_DISCORD_URL
  }

  const onClickSyncTwitter = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_TWITTER_URL
  }

  const isFull = useMemo(() => {
    return questData?.participant >= questData?.maxParticipant
  }, [questData])

  const { shouldPreventDoingQuest, preventDoingQuestBox } = useMemo(() => {
    let preventDoingQuestBox: React.ReactNode

    if (isFull && submissionStatus === undefined && !isLoading) {
      preventDoingQuestBox = (
        <ConditionStatusBox
          primaryText={`You missed the train 🚂 ! ${questData?.maxParticipant} people completed this quest.`}
          secondaryText="Please come back daily to complete many other quests"
          iconBackground={theme.palette.error.main}
          icon={
            <Box
              component={FontAwesomeIcon}
              icon={faXmark}
              sx={{ fontSize: 20 }}
            />
          }
        />
      )
    }

    if (!isLogin) {
      preventDoingQuestBox = (
        <ConditionStatusBox
          primaryText="You're not signed in"
          secondaryText="Get access to this bounty by connecting your wallet."
          iconBackground="#DDA505"
          icon={
            <Box
              component={FontAwesomeIcon}
              icon={faLock}
              sx={{ fontSize: 20 }}
            />
          }
          actionButton={<ConnectWallet />}
        />
      )
    }

    return {
      shouldPreventDoingQuest: isFull || !isLogin || !passPrecondition,
      preventDoingQuestBox,
    }
  }, [
    isFull,
    submissionStatus,
    isLoading,
    isLogin,
    passPrecondition,
    questData?.maxParticipant,
    theme.palette.error.main,
  ])

  const renderTime = () => {
    return <>{formatDataCountdown(questData.startDate, questData.endDate)}</>
  }
  if (notFound) {
    return (
      <>
        <Layout>
          <div className="flex w-full justify-center items-center flex-col  space-y-8 mt-8 h-[60vh]">
            <SadIcon className="!fill-white" />
            <div className="text-center">Your quest is not found</div>

            <Link href={Routes.QuestBoard}>
              <Button className="mt-4 !p-0 !rounded-[35px]">
                <div className="px-6 py-2 text-white bg-gradient-to-r from-[#00C78B] to-[#00CDDA] rounded-[35px] w-full">
                  Go to quest board
                </div>
              </Button>
            </Link>
          </div>
        </Layout>
      </>
    )
  }
  return (
    <>
      {questData && (
        <Head>
          <CustomMetaTag
            title={`${questData?.projectName} : ${questData?.name}`}
            description={questData?.description}
          ></CustomMetaTag>
        </Head>
      )}

      <Layout>
        <DialogTextSubmission
          open={openTextSubmission}
          action={
            submissionStatus === UserQuestSubmissionStatus.WAIT_APPROVE ||
            (openSubmission &&
              submissionStatus === UserQuestSubmissionStatus.APPROVE)
              ? 'view'
              : 'edit'
          }
          loading={isVerifying}
          initialText={initialTextSubmission}
          onClose={() => setOpenTextSubmission(false)}
          onSubmit={(e) => onClickVerify({ text: e })}
          type={
            questData?.questConditions?.some(
              (i) => i.type === QuestConditionValues.TEXT,
            )
              ? QuestConditionValues.TEXT
              : QuestConditionValues.URL
          }
        />
        <VerifyDialog
          status={submissionStatus}
          open={openVerifyModal}
          onProceed={onProceedVerify}
        />
        {questData && (
          <Stack
            sx={{
              mt: {
                xs: 0,
                md: 4,
              },
            }}
          >
            <TranslucentBlurBox
              sx={{
                py: {
                  xs: 2,
                  md: 4,
                },
                px: {
                  xs: 2,
                  md: 6,
                },
                display: 'flex',
              }}
            >
              <ProjectProfile
                data={{
                  projectName: questData?.projectName,
                  image: questData?.projectImageUrl,
                  questName: questData?.name,
                  description: questData?.description,
                  projectSupply: questData?.projectSupply,
                  projectMintPrice: questData?.projectMintPrice,
                  projectMintingDate: questData?.projectMintingDate,
                  projectTwitter: questData?.projectTwitter,
                  projectDiscord: questData?.projectDiscord,
                  projectWebsite: questData?.projectWebsite,
                }}
              />
            </TranslucentBlurBox>
            <Box
              sx={{
                my: 3,
                display: 'flex',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Box sx={{ borderTop: '1px solid #fff', flex: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', px: 3 }}>
                <FontAwesomeIcon icon={faCalendarClock} />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {renderTime()}
                </Typography>
              </Box>
              <Box sx={{ borderTop: '1px solid #fff', flex: 1 }} />
            </Box>
            <Grid container className="mb-6">
              <Grid item container xs={12} md={8}>
                <Stack spacing={2} className="w-full lg:pr-6 mb-4 lg  :mb-0">
                  {shouldPreventDoingQuest && preventDoingQuestBox}

                  {isLogin &&
                    questData.questPreConditions.map((i) => {
                      switch (i.type) {
                        case QuestPreConditionTypeValues.SYNC_TWITTER:
                          if (!isSyncTwitter) {
                            return (
                              <ConditionStatusBox
                                key={i.seq}
                                primaryText={i.title}
                                secondaryText={i.description}
                                iconBackground="#DDA505"
                                icon={
                                  <Box
                                    component={FontAwesomeIcon}
                                    icon={faLock}
                                    sx={{ fontSize: 20 }}
                                  />
                                }
                                actionButton={
                                  <GradientButton
                                    onClick={onClickSyncTwitter}
                                    sx={{
                                      px: 2,
                                      display: 'flex',
                                      alignItems: 'center',
                                      pt: 1,
                                    }}
                                  >
                                    <Box
                                      component={FontAwesomeIcon}
                                      icon={faTwitter}
                                      sx={{ fontSize: 16 }}
                                    />
                                    <span className="ml-1">
                                      Connect Twitter
                                    </span>
                                  </GradientButton>
                                }
                              />
                            )
                          }
                          break
                        case QuestPreConditionTypeValues.SYNC_DISCORD:
                          if (!isSyncDiscord) {
                            return (
                              <ConditionStatusBox
                                key={i.seq}
                                primaryText={i.title}
                                secondaryText={i.description}
                                iconBackground="#DDA505"
                                icon={
                                  <Box
                                    component={FontAwesomeIcon}
                                    icon={faLock}
                                    sx={{ fontSize: 20 }}
                                  />
                                }
                                actionButton={
                                  <GradientButton
                                    onClick={onClickSyncDiscord}
                                    sx={{
                                      px: 2,
                                      display: 'flex',
                                      alignItems: 'center',
                                      pt: 1,
                                    }}
                                  >
                                    <Box
                                      component={FontAwesomeIcon}
                                      icon={faDiscord}
                                      sx={{ fontSize: 16 }}
                                    />
                                    <span className="ml-1">
                                      Connect Discord
                                    </span>
                                  </GradientButton>
                                }
                              />
                            )
                          }
                          break
                        default:
                          // return <div key={i.seq}>{JSON.stringify(i)}</div>
                          console.error('quest pre condition not support', i)
                          return null
                      }
                    })}
                  <Stack
                    sx={{
                      marginBottom: 4,
                    }}
                    spacing={3}
                  >
                    {conditionData.map((i) => (
                      <ConditionBox
                        key={i.seq}
                        title={i.title}
                        description={i.description}
                        dimmed={shouldPreventDoingQuest}
                        check={i.check}
                        seq={i.seq}
                        link={i?.link}
                        linkType={i?.linkType}
                        linkDisplay={i?.linkDisplay}
                        text={i?.text}
                        isVerifying={isVerifying}
                        displaySecondary={i?.displaySecondary}
                      />
                    ))}
                    {isLoading && <ConditionBoxSkeleton />}
                  </Stack>

                  <ParticipantsBox
                    useUserSubmission={useUserQuestSubmission}
                    questId={questData?.id}
                    maxParticipant={questData?.maxParticipant}
                    type="quest"
                  />
                </Stack>
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={4}
                sx={{ alignItems: 'flex-start' }}
              >
                <TranslucentBlurBox
                  sx={{ p: 3, display: 'flex', width: '100%' }}
                >
                  <Stack
                    spacing={3}
                    sx={{ alignItems: 'center', width: '100%' }}
                  >
                    <Typography variant="h4">Reward</Typography>
                    {/* reward */}
                    <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
                      {questData.projectPoint > 0 && (
                        <Box sx={{ flex: 1 }}>
                          <RewardBox
                            imageUrl={questData.projectImageUrl}
                            amount={questData.projectPoint}
                            unit={questData.symbol}
                          />
                        </Box>
                      )}

                      {questData.platformPoint > 0 && (
                        <Box sx={{ flex: 1 }}>
                          <RewardBox
                            imageUrl={'/static/images/icon/cube.svg'}
                            amount={questData.platformPoint}
                            unit="point"
                          />
                        </Box>
                      )}
                      {cryptoReward > 0 && (
                        <Box sx={{ flex: 1 }}>
                          <RewardBox
                            imageUrl="/static/images/icon/usdc.svg"
                            amount={cryptoReward}
                            unit="USDC"
                          />
                        </Box>
                      )}
                    </Stack>

                    <div className="w-full">{renderSubmit()}</div>
                  </Stack>
                </TranslucentBlurBox>
              </Grid>
            </Grid>
          </Stack>
        )}
      </Layout>
    </>
  )
}
