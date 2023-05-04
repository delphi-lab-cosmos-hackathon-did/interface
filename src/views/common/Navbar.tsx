import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faLock,
  faMemoPad,
  faRightFromBracket,
  faDice,
  faUser,
  faTrophy,
} from '@fortawesome/pro-light-svg-icons'
import {
  faChevronRight,
  faMemoPad as faMemoPadSolid,
  faDice as faDiceSolid,
  faTrophy as faTrophySolid,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AppBar,
  Box,
  ButtonBase,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuItemProps,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'

import { appConstants } from 'constants/appConstants'
import { Routes } from 'constants/Routes'
import { useAuthData } from 'lib/AuthDataContext'
import { ComingSoonIcon, Logo } from 'svgs'
import { truncateAddress } from 'utils/address'
import { ConnectWallet } from './ConnectWallet'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { GradientBorderButton } from '../../components/GradientBorderButton'

const Offset = () => <Box sx={{ pt: 11 }} />

const NavLink = ({
  href,
  text,
  icon,
  activeIcon,
}: {
  href: string
  text: string
  icon: IconProp
  activeIcon: IconProp
}) => {
  const router = useRouter()
  const shouldActive = router.route
    .replace('/quest/[id]', '/quest-board')
    .replace('/raffle/[id]', '/raffle-board')
    .includes(href)

  return (
    <Link href={href}>
      <a>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{ fontSize: 18 }}
            component={FontAwesomeIcon}
            icon={shouldActive ? activeIcon : icon}
          />
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: shouldActive ? '600' : 'normal',
            }}
          >
            {text}
          </Typography>
        </Stack>
      </a>
    </Link>
  )
}

const StyledMenuItem = (props: MenuItemProps) => (
  <MenuItem
    {...props}
    sx={{
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
      },
      userSelect: 'none',
      ...props.sx,
    }}
  >
    {props.children}
  </MenuItem>
)
const menu = [
  {
    slug: Routes.QuestBoard,
    text: 'Quest Board',
    icon: faMemoPad,
    activeIcon: faMemoPadSolid,
    lock: false,
  },
  {
    slug: Routes.Raffle,
    text: 'Raffle',
    icon: faDice,
    activeIcon: faDiceSolid,
    lock: false,
  },
  {
    slug: Routes.Reward,
    text: 'Reward',
    icon: faTrophy,
    activeIcon: faTrophySolid,
    lock: true,
  },
]

export const Navbar = () => {
  const trigger = useScrollTrigger({ threshold: 10, disableHysteresis: true })
  const { isLogin, walletAddress, setAuthData } = useAuthData()
  const [showDiscordBtn, setShowDiscord] = useState<boolean>(false)
  const theme = useTheme()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClickProfileIcon = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY)
    setAuthData(null)
    handleClose()
  }

  const goToPage = (href: string) => () => {
    router.push(href)
    handleClose()
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('discord') === 'true') {
      setShowDiscord(true)
    }
  }, [])

  const onClickConnectDiscord = () => {
    window.location.href = process.env.NEXT_PUBLIC_CONNECT_DISCORD_URL
  }

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ background: 'transparent' }}>
        <Toolbar
          sx={{
            px: 0,
            backgroundColor: trigger ? 'rgba(255,255,255,0.01)' : 'transparent',
            backdropFilter: trigger ? 'blur(30px)' : 'blur(0px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              width: '100%',
              height: 64,
              px: {
                md: 2,
                xs: 1,
              },
            }}
          >
            <Link href={Routes.QuestBoard} className="select-none">
              <a>
                <Logo className="w-[100px] md:w-[110px]" />
              </a>
            </Link>
            <Stack
              direction="row"
              spacing={{
                md: 4,
                xs: 1,
              }}
              sx={{ alignItems: 'center' }}
            >
              {menu?.map((item, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      userSelect: 'none',
                    }}
                  >
                    <div className="relative">
                      {item?.lock && (
                        <ComingSoonIcon className="absolute -top-3 -right-2" />
                      )}
                      <NavLink
                        href={!item?.lock ? item?.slug : '#'}
                        text={item?.text}
                        icon={!item?.lock ? item?.icon : faLock}
                        activeIcon={!item?.lock ? item?.activeIcon : faLock}
                      />
                    </div>
                  </Box>
                </React.Fragment>
              ))}
              <a href="/register" className="hidden md:block">
                <GradientBorderButton onClick={() => null}>
                  Register for Creators
                </GradientBorderButton>
              </a>
              {!isLogin ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  <ConnectWallet />
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  {showDiscordBtn && (
                    <ButtonBase onClick={onClickConnectDiscord}>
                      <img
                        style={{
                          marginRight: '.5rem',
                        }}
                        src={'/static/images/icon/discord.svg'}
                        width={15}
                        height={15}
                      />
                      Connect discord
                    </ButtonBase>
                  )}

                  <IconButton onClick={handleClickProfileIcon}>
                    <Jazzicon
                      seed={jsNumberForAddress(walletAddress)}
                      diameter={30}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        backgroundColor: 'rgba(43, 43, 44, 0.4)',
                        backdropFilter: 'blur(30px)',
                        minWidth: 240,
                      },
                    }}
                  >
                    <StyledMenuItem onClick={goToPage(Routes.Profile)}>
                      <ListItemIcon>
                        <Jazzicon
                          seed={jsNumberForAddress(walletAddress)}
                          diameter={24}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={truncateAddress(walletAddress)}
                        secondary="Level 0"
                      />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </StyledMenuItem>
                    <a href="/register">
                      <StyledMenuItem
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                      >
                        <ListItemIcon>
                          <Box
                            component={FontAwesomeIcon}
                            icon={faUser}
                            sx={{ color: theme.palette.common.white }}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Register for Creators" />
                      </StyledMenuItem>
                    </a>
                    {menu?.map((item, index) => (
                      <StyledMenuItem
                        key={index}
                        onClick={goToPage(!item?.lock ? item?.slug : '#')}
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                      >
                        <ListItemIcon>
                          <Box
                            component={FontAwesomeIcon}
                            icon={!item?.lock ? item?.icon : faLock}
                            sx={{ color: theme.palette.common.white }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item?.text} />
                      </StyledMenuItem>
                    ))}

                    <Divider />
                    <StyledMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Box
                          component={FontAwesomeIcon}
                          icon={faRightFromBracket}
                          sx={{ color: theme.palette.common.white }}
                        />
                      </ListItemIcon>
                      Log out
                    </StyledMenuItem>
                  </Menu>
                </Stack>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}
