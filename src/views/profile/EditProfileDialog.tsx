import { useTheme } from '@emotion/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCamera } from '@fortawesome/pro-light-svg-icons'
import { faXmark } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  ButtonBase,
  Dialog,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { GradientBorderButton } from 'components/GradientBorderButton'
import { useFormik } from 'formik'
import { useAuthData } from 'lib/AuthDataContext'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { userService } from 'services/userService'
import { dialogStore } from 'stores/dialogStore'
import * as yup from 'yup'

const TransparentTextField = (props: TextFieldProps) => (
  <TextField
    {...props}
    sx={{
      backgroundColor: 'rgba(43, 43, 44, 0.4)',
      borderRadius: 2,
      '& label': {
        color: 'white',
        '&.Mui-focused': {
          fontWeight: 600,
        },
        '&.MuiInputLabel-shrink': {
          pt: 4,
          color: 'white',
        },
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'transparent',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent',
        },
        '&:hover fieldset': {
          borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'transparent',
        },
      },
      ...props.sx,
    }}
  />
)

const SocialConnectBox = ({
  icon,
  text,
  children,
}: {
  icon: IconProp
  text: string
  children: ReactNode
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(43, 43, 44, 0.4)',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        py: 2,
        px: 3,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box component={FontAwesomeIcon} icon={icon} color="common.white" />
        <Typography>{text}</Typography>
      </Stack>
      {children}
    </Box>
  )
}

const validationSchema = yup.object({
  username: yup.string(),
})

export const EditProfileDialog = ({
  open,
  onClose,
  connectedDiscordUserName,
  connectedTwitterUserName,
  onFetchUserData,
}: {
  connectedDiscordUserName?: string
  connectedTwitterUserName?: string
  open: boolean
  onClose: () => void
  onFetchUserData: (key: string) => void
}) => {
  const [connectedDiscord, setConnectedDiscord] = useState(
    connectedDiscordUserName && connectedDiscordUserName !== '',
  )
  const [connectedTwitter, setConnectedTwitter] = useState(
    connectedTwitterUserName && connectedTwitterUserName !== '',
  )
  const theme = useTheme()
  const { walletAddress } = useAuthData()
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema,
    onSubmit: () => {},
  })
  // const [isFocus, setIsFocus] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setConnectedDiscord(
      connectedDiscordUserName && connectedDiscordUserName !== '',
    )
    setConnectedTwitter(
      connectedTwitterUserName && connectedTwitterUserName !== '',
    )
  }, [connectedDiscordUserName, connectedTwitterUserName])

  const logoutTwitter = async () => {
    // await userService.logoutTwitter()
    // onClose()
    // onFetchUserData('twitter')
    dialogStore.open(
      'Are you sure you want to disconnect your Twitter account ?',
      {
        title: '',
        onOk: async () => {
          dialogStore.close()
          await userService.logoutTwitter()
          onFetchUserData('twitter')
          onClose()
        },
        cancelText: 'Cancel',
      },
    )
  }
  const onClickSyncDiscord = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_DISCORD_URL
  }

  const onClickSyncTwitter = () => {
    sessionStorage.setItem('redirect', router.asPath)
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_TWITTER_URL
  }

  const logoutDiscord = async () => {
    dialogStore.open(
      'Are you sure you want to disconnect your Discord account ?',
      {
        title: '',
        onOk: async () => {
          dialogStore.close()
          await userService.logoutDiscord()
          onFetchUserData('discord')
          onClose()

          onClose()
        },
        cancelText: 'Cancel',
      },
    )
  }

  return (
    <Dialog
      open={open}
      fullScreen
      PaperProps={{ sx: { backgroundColor: 'transparent' }, elevation: 0 }}
      sx={{
        backdropFilter: 'blur(10px)',
        display: 'flex',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <ButtonBase
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              p: 1,
              borderRadius: 999,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '25px',
                border: `1px solid ${theme.palette.common.white}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </Box>
          </ButtonBase>
          <Box
            sx={{
              display: 'flex',
              maxWidth: theme.breakpoints.values.sm,
              width: '100%',
            }}
          >
            <Box sx={{ flexShrink: 0, px: 4 }}>
              <Box
                sx={{
                  height: 120,
                  width: 120,
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
                  <Jazzicon
                    seed={jsNumberForAddress(walletAddress)}
                    diameter={120}
                  />
                </Box>
                <ButtonBase
                  sx={{
                    position: 'absolute',
                    height: 120,
                    width: 120,
                    borderRadius: '60px',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <Box component={FontAwesomeIcon} icon={faCamera} size="2x" />
                </ButtonBase>
              </Box>
            </Box>
            <Stack sx={{ flex: 1 }} spacing={2}>
              {/* TODO: make edit */}
              {/* <Typography variant="h5">Profile</Typography>
              <TransparentTextField
                variant="outlined"
                fullWidth
                label="username"
                sx={{ pt: formik.values.username || isFocus ? 2 : 0 }}
                InputProps={{
                  onFocus: () => setIsFocus(true),
                  onBlur: () => setIsFocus(false),
                }}
                id="username"
                name="username"
                type="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              /> */}
              <Typography variant="h5">Social Media</Typography>
              <SocialConnectBox
                icon={faDiscord}
                text={
                  connectedDiscord ? connectedDiscordUserName : 'Link Discord'
                }
              >
                {connectedDiscord ? (
                  <GradientBorderButton onClick={logoutDiscord}>
                    Disconnect
                  </GradientBorderButton>
                ) : (
                  <GradientBorderButton onClick={onClickSyncDiscord}>
                    Connect
                  </GradientBorderButton>
                )}
              </SocialConnectBox>
              <SocialConnectBox
                icon={faTwitter}
                text={
                  connectedTwitter ? connectedTwitterUserName : 'Link Twitter'
                }
              >
                {connectedTwitter ? (
                  <GradientBorderButton onClick={logoutTwitter}>
                    Disconnect
                  </GradientBorderButton>
                ) : (
                  <GradientBorderButton onClick={onClickSyncTwitter}>
                    Connect
                  </GradientBorderButton>
                )}
              </SocialConnectBox>
            </Stack>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}
