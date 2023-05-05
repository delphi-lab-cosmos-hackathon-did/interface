import { Routes } from 'constants/Routes'
import { useTheme } from '@emotion/react'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/pro-light-svg-icons'
import { faCalendarClock } from '@fortawesome/pro-light-svg-icons'
import {
  faLock,
  faTrophy,
  faXmark,
  faEnvelopeOpen,
  faPaperPlane,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  Button,
  ButtonBase,
  Dialog,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { ConditionBoxSkeleton } from 'components/skeleton/ConditionBoxSkeleton'
import { TranslucentBlurBox } from 'components/TranslucentBlurBox'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAuthData } from 'lib/AuthDataContext'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { QuestResponseItem, questService } from 'services/questService'
import { userService } from 'services/userService'
import { dialogStore } from 'stores/dialogStore'
import { loadingStore } from 'stores/loadingStore'
import ConditionBox, { ConditionBoxProps } from 'views/quest/ConditionBox'
import { CustomMetaTag } from 'components/CustomMetaTag'
import ConditionStatusBox from 'views/quest/ConditionStatusBox'
import RewardBox from 'views/quest/RewardBox'
import VerifyDialog from 'views/quest/VerifyDialog'
import TextField from '@mui/material/TextField'
import { GradientButton } from '../../../components/GradientButton'
import {
  MetaDataRewardERC20,
  QuestConditionValues,
  QuestPreCondition,
  QuestPreConditionTypeValues,
  QuestRewardType,
  UserQuestSubmissionStatus,
  UserRaffleSubmissionResponse,
} from 'services/types/quest'
import { ParticipantsBox } from '../../quest/ParticipantsBox'
import { ConnectWallet } from '../ConnectWallet'
import { Layout } from '../Layout'
import { formatDataCountdown, formatDate, formatNumber } from 'utils/format'
import { SadIcon, WinnerIcon, FaceAnguishedIcon } from 'svgs'
import Link from 'next/link'
import Head from 'next/head'
import {
  RaffleResponseItem,
  raffleService,
} from '../../../services/raffleService'
import useUserRaffleSubmission from 'hooks/useUserRaffleSubmission'
import { IQueryUserRaffleSubmission } from '../../../services/userRaffleSubmissionService'
import ProjectProfile from '../ProjectProfile'
import ButtonSubmit from 'components/ButtonSubmit'
dayjs.extend(relativeTime)
dayjs.extend(utc)

export interface RaffleDetailProps {
  raffleData: RaffleResponseItem | null
}

export const RaffleDetail = (props: RaffleDetailProps) => {
  const router = useRouter()
  const theme = useTheme()

  const { fetchData } = useUserRaffleSubmission()

  const [raffleData, setRaffleData] = useState<RaffleResponseItem>(
    props.raffleData,
  )
  const [notFound, setNotfound] = useState(false)
  const { isLogin, authData } = useAuthData()
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
  const [isCompleted, setCompleted] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [raffleSubmission, setRaffleSubmission] =
    useState<UserRaffleSubmissionResponse>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [passPrecondition, setPassPrecondition] = useState(true)

  const fetchRaffle = async (slug: string, force = false) => {
    loadingStore.increase()
    setIsLoading(true)
    try {
      let data: RaffleResponseItem
      if (force) {
        data = await raffleService.getRaffleBySlug(slug)
      } else {
        data = raffleData
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
      setRaffleData(data)
      let conditions = data?.questConditions.map((i) => {
        return {
          title: i.title,
          description: i.description,
          check: false,
          seq: i.seq,
        }
      })
      if (isLogin) {
        const raffleSubmission = await raffleService.getMyUserSubmissionRaffle(
          data?.id,
        )
        setSubmissionStatus(raffleSubmission.status)
        setCompleted(
          raffleSubmission.status === UserQuestSubmissionStatus.COMPLETED,
        )
        setRaffleSubmission(raffleSubmission)

        conditions = data?.questConditions?.map((i) => {
          let check = false
          if (raffleSubmission.questConditions) {
            check =
              raffleSubmission.questConditions?.find(
                (q) => q.type === i.type && i.seq === q.seq,
              )?.check || false
          }

          let linkDisplay = ''
          let displaySecondary = ''
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
          }
        })
        await checkPrecondition(data.questPreConditions)
      }
      setConditionData(conditions)
    } catch (e) {
      setNotfound(true)
      console.log(e)
    } finally {
      loadingStore.decrease()
      setIsLoading(false)
    }
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
      fetchRaffle(String(slug))
    }
  }, [router?.query?.id, isLogin])

  const renderSubmit = () => {
    let canSubmit = submissionStatus !== UserQuestSubmissionStatus.APPROVE
    canSubmit =
      canSubmit ||
      (submissionStatus === UserQuestSubmissionStatus.PENDING &&
        raffleData?.isAutomated)

    if (!loadingStore.isLoading) {
      // Before raffle start
      if (notStart) {
        return (
          <div className="text-center font-bold">Raffle is not started</div>
        )
      }
      // After raffle end
      else if (isEnd) {
        return <div className="text-center font-bold">Raffle is ended</div>
      }
      // Raffle not success
      else if (canSubmit) {
        return (
          <ButtonSubmit
            disabled={!passPrecondition || !isLogin || isVerifying}
            onClick={onClickVerify}
          >
            Submit
          </ButtonSubmit>
        )
      }
    }
    return <></>
  }

  const onClickVerify = async () => {
    setIsVerifying(true)
    try {
      const slug = router?.query?.id as string

      await raffleService.verifyRaffle(raffleData?.id)
      await fetchRaffle(slug, true)
      await fetchData(Number(raffleData?.id), 9)
      setOpenVerifyModal(true)
      if (!authData?.user?.email || authData?.user?.email === '') {
        setEmailModalOpen(true)
      }
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

  const { shouldPreventDoingQuest, preventDoingQuestBox } = useMemo(() => {
    let preventDoingQuestBox: React.ReactNode

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
      shouldPreventDoingQuest: !isLogin || !passPrecondition,
      preventDoingQuestBox,
    }
  }, [isLogin, passPrecondition, raffleData, theme])

  const renderTime = () => {
    return <>{formatDataCountdown(raffleData.startDate, raffleData.endDate)}</>
  }

  const renderReward = () => {
    if (isEnd && isCompleted && raffleSubmission) {
      let title = ''
      let description = 'Congrats on winning the Allow List Raffle !'
      if (raffleSubmission.isSelected) {
        title = 'You were  selected!'
        description = 'Congrats on winning the Allow List Raffle !'
        if (raffleData.winnerTitle) {
          title = raffleData.winnerTitle
        }
        if (raffleData.winnerMessage) {
          description = raffleData.winnerMessage
        }
      } else {
        title = 'You were not selected'
        description = ''
        if (raffleData.nonWinnerTitle) {
          title = raffleData.nonWinnerTitle
        }
        if (raffleData.nonWinnerMessage) {
          description = raffleData.nonWinnerMessage
        }
      }
      return (
        <TranslucentBlurBox sx={{ p: 3, display: 'flex', width: '100%' }}>
          <Stack spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
            {raffleSubmission.isSelected ? (
              <WinnerIcon />
            ) : (
              <FaceAnguishedIcon />
            )}
            <Typography variant="h4" className="text-center">
              {title}
            </Typography>
            <Typography variant="body2" className="text-center">
              {description}
            </Typography>
            {raffleSubmission.isSelected ? (
              ''
            ) : (
              <div className=" text-transparent bg-clip-text bg-gradient-to-br from-[#00C78B] to-[#00CDDA] ">
                Good luck next time!
              </div>
            )}
          </Stack>
        </TranslucentBlurBox>
      )
    }

    return (
      <TranslucentBlurBox sx={{ p: 3, display: 'flex', width: '100%' }}>
        <Stack spacing={3} sx={{ alignItems: 'center', width: '100%' }}>
          <Typography variant="h4">Reward</Typography>
          {/* reward */}
          <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
            {raffleData.projectPoint > 0 && (
              <Box sx={{ flex: 1 }}>
                <RewardBox
                  imageUrl={raffleData.projectImageUrl}
                  amount={raffleData.projectPoint}
                  unit={raffleData.symbol}
                />
              </Box>
            )}

            {raffleData.platformPoint > 0 && (
              <Box sx={{ flex: 1 }}>
                <RewardBox
                  imageUrl={'/static/images/icon/cube.svg'}
                  amount={raffleData.platformPoint}
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
    )
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
                  Go to raffle board
                </div>
              </Button>
            </Link>
          </div>
        </Layout>
      </>
    )
  }

  const handleSubmitEmail = async () => {
    event.preventDefault()
    try {
      const dom = document.getElementById('emailInput') as HTMLInputElement
      const email = dom.value
      await userService.updateEmail(email)
      setEmailModalOpen(false)
    } catch (e) {
      const errorMessage = e?.response?.data?.message || `Something error`
      alert(errorMessage)
    }
  }

  return (
    <>
      {raffleData && (
        <Head>
          <CustomMetaTag
            title={`${raffleData?.projectName} : ${raffleData?.name}`}
            description={raffleData?.description}
          ></CustomMetaTag>
        </Head>
      )}

      <Layout>
        <Dialog
          open={emailModalOpen}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { backgroundColor: 'transparent', borderRadius: '8px' },
            elevation: 0,
          }}
          sx={{ backdropFilter: 'blur(10px)' }}
          className="flex justify-center"
        >
          <ButtonBase
            onClick={() => {
              setEmailModalOpen(false)
            }}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              p: 1,
            }}
          >
            <Box
              sx={{
                border: 0,
                width: 50,
                height: 50,
                borderRadius: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </Box>
          </ButtonBase>
          <div className="bg-[#2B2B2C66] p-10">
            <div className="flex justify-center mt-2 mb-4">
              <FontAwesomeIcon icon={faEnvelopeOpen} size="4x" />
            </div>
            <div className="text-center text-white font-semibold text-3xl mb-4">
              {`Don't miss out.`}
            </div>
            <div className="font-normal text-white text-center mb-8 text-sm">
              Enter you email to get registration confirmation and updates.
            </div>
            <div className="flex justify-center w-full">
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <div className="py-2 px-4 bg-[#2B2B2C66] bg-opacity-40 rounded-md">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitEmail()
                    }}
                  >
                    <input
                      id="emailInput"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      className=" appearance-none bg-transparent outline-none focus:outline-none text-white border-none"
                    />
                    <ButtonBase
                      onClick={() => {
                        handleSubmitEmail()
                      }}
                      className="ml-4 h-10 w-10 border-none !rounded-full bg-gradient-to-r from-[#00C78B] to-[#00CDDA]"
                    >
                      <FontAwesomeIcon
                        className="text-white"
                        icon={faPaperPlane}
                      />
                    </ButtonBase>
                  </form>
                </div>
              </Box>
            </div>
          </div>
        </Dialog>

        <VerifyDialog
          status={submissionStatus}
          open={openVerifyModal}
          onProceed={onProceedVerify}
        />
        {raffleData && (
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
                  projectName: raffleData?.projectName,
                  image: raffleData?.projectImageUrl,
                  questName: raffleData?.name,
                  description: raffleData?.description,
                  projectSupply: raffleData?.projectSupply,
                  projectMintPrice: raffleData?.projectMintPrice,
                  projectMintingDate: raffleData?.projectMintingDate,
                  numberOfWinner: raffleData?.limitParticipant,
                  projectTwitter: raffleData?.projectTwitter,
                  projectDiscord: raffleData?.projectDiscord,
                  projectWebsite: raffleData?.projectWebsite,
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
                    raffleData.questPreConditions.map((i) => {
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
                                key={i?.seq}
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
                        isVerifying={isVerifying}
                        displaySecondary={i?.displaySecondary}
                      />
                    ))}
                    {isLoading && <ConditionBoxSkeleton />}
                  </Stack>

                  <ParticipantsBox
                    useUserSubmission={useUserRaffleSubmission}
                    questId={raffleData?.id}
                    maxParticipant={null}
                    type="raffle"
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
                {renderReward()}
              </Grid>
            </Grid>
          </Stack>
        )}
      </Layout>
    </>
  )
}
