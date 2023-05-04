import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPenToSquare } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, ButtonBase, Stack, SxProps, Tab, Typography } from '@mui/material'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { TabPanel } from 'components/TabPenel'
import { TabLabel } from 'components/TabLabel'
import { DIDTabs } from 'components/DIDTabs'
import { useAuthData } from 'lib/AuthDataContext'
import { userService } from 'services/userService'
import { truncateAddress } from 'utils/address'
import { Layout } from '../common/Layout'
import { EditProfileDialog } from './EditProfileDialog'
import MyPoint from './MyPoint'
import { MyQuestTab } from './MyQuestTab'

const LinkSocialChip = ({
  text,
  icon,
  onClickWhenNotConnected,
  onClickWhenConnected,
  connectedUserName,
}: {
  text: string
  icon: IconProp
  onClickWhenNotConnected?: () => void
  onClickWhenConnected?: () => void
  connectedUserName?: string
}) => {
  const theme = useTheme()

  const onClick = connectedUserName
    ? onClickWhenConnected
    : onClickWhenNotConnected

  const notConnectedStyle: SxProps = {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px solid transparent',
      borderRadius: '20px',
      background: `${theme.palette.gradient.primary} border-box`,
      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      maskComposite: 'destination-out',
    },
  }

  const connectedStyle: SxProps = {
    backgroundColor: 'rgba(15,15,15,0.28)',
    backdropFilter: 'blur(24px)',
  }

  const style = connectedUserName ? connectedStyle : notConnectedStyle

  return (
    <ButtonBase onClick={() => onClick?.()} sx={{ borderRadius: '20px' }}>
      <Box
        sx={{
          height: 40,
          position: 'relative',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '20px',
          width: '100%',
          ...style,
        }}
      >
        <Box component={FontAwesomeIcon} icon={icon} sx={{ fontSize: 18 }} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {connectedUserName ? connectedUserName : text}
        </Typography>
      </Box>
    </ButtonBase>
  )
}

enum ProfileTabs {
  MyQuest,
  MyPoint,
  MyRewards,
}

export const ProfilePage = () => {
  const theme = useTheme()
  const router = useRouter()
  const { walletAddress, authData, setAuthData } = useAuthData()

  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.MyQuest)
  const [openProfileEdit, setOpenProfileEdit] = useState(false)

  const [myQuest, setMyQuest] = useState<number>(0)
  const [myPoint, setMyPoint] = useState<number>(0)
  const [myReward, setMyReward] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: ProfileTabs) => {
    setActiveTab(newValue)
  }

  useEffect(() => {
    if (authData) {
      getUserStatus()
    } else {
      setMyQuest(0)
      setMyPoint(0)
      setMyReward(0)
      router.push('/')
    }
  }, [authData])

  const getUserStatus = async () => {
    try {
      const { data } = await userService.getUserStatus()
      if (data) {
        setMyQuest(data?.myQuest)
        setMyPoint(data?.myPoint)
        setMyReward(data?.myReward)
      }
    } catch (e) {}
  }

  const onClickSyncDiscord = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_DISCORD_URL
  }

  const onClickSyncTwitter = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_TWITTER_URL
  }

  const twitterUserName = useMemo(
    () => authData?.user?.metaData?.twitter?.username,
    [authData],
  )

  const discordUserName = useMemo(() => {
    const discord = authData?.user?.metaData?.discord
    if (discord) {
      const { username, discriminator } = discord
      return `${username}#${discriminator}`
    }
    return ''
  }, [authData])

  return (
    <Layout>
      <Stack sx={{ mt: { xs: 4, md: 10 }, alignItems: 'center' }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '60px',
              overflow: 'hidden',
            }}
          >
            <Jazzicon seed={jsNumberForAddress(walletAddress)} diameter={120} />
          </Box>

          <ButtonBase
            onClick={() => setOpenProfileEdit(true)}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              backgroundColor: theme.palette.common.white,
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} color="#333" />
          </ButtonBase>
        </Box>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {truncateAddress(walletAddress)}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 4 }}
          width={{ xs: 240, sm: '100%' }}
          justifyContent="center"
        >
          <LinkSocialChip
            connectedUserName={discordUserName}
            text="Connect Discord"
            icon={faDiscord}
            onClickWhenNotConnected={onClickSyncDiscord}
          />
          <LinkSocialChip
            connectedUserName={twitterUserName}
            text="Connect Twitter"
            icon={faTwitter}
            onClickWhenNotConnected={onClickSyncTwitter}
          />
        </Stack>
        <DIDTabs
          value={activeTab}
          onChange={handleChange}
          sx={{ mt: { xs: 2, md: 6 } }}
        >
          <Tab
            value={ProfileTabs.MyQuest}
            label={
              <TabLabel
                text="My Quest"
                num={myQuest}
                active={activeTab === ProfileTabs.MyQuest}
              />
            }
          />
          <Tab
            value={ProfileTabs.MyPoint}
            label={
              <TabLabel
                text="My Point"
                num={myPoint}
                active={activeTab === ProfileTabs.MyPoint}
              />
            }
          />
          {/* <Tab
            value={ProfileTabs.MyRewards}
            label={
              <TabLabel
                text="My Reward"
                num={myReward}
                active={activeTab === ProfileTabs.MyRewards}
              />
            }
          /> */}
        </DIDTabs>
        <TabPanel value={activeTab} index={ProfileTabs.MyQuest}>
          <MyQuestTab />
        </TabPanel>
        <TabPanel value={activeTab} index={ProfileTabs.MyPoint}>
          <MyPoint />
        </TabPanel>
        <TabPanel value={activeTab} index={ProfileTabs.MyRewards}>
          Reward
        </TabPanel>
      </Stack>
      <EditProfileDialog
        connectedDiscordUserName={discordUserName}
        connectedTwitterUserName={twitterUserName}
        open={openProfileEdit}
        onClose={() => {
          setOpenProfileEdit(false)
        }}
        onFetchUserData={(key: string) => {
          const d = { ...authData }
          d.user.metaData[key] = null
          setAuthData(d)
          getUserStatus()
        }}
      />
    </Layout>
  )
}
