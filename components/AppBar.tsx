import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useChain, useWallet } from '@cosmos-kit/react'
import { formatAddress } from '../src/utils/formatAddress'
import { Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'

export const ButtonAppBar = () => {
  const { username, connect, disconnect, address } = useChain('osmosistestnet')
  const { wallet } = useWallet()
  const router = useRouter()

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            onClick={() => {
              router.push('/')
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{ mr: 1 }}>
              <img width={70} src="/logo.png" alt="logo" />
            </Box>

            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                color="white"
                lineHeight={1}
                fontSize={24}
              >
                SPIRITO
              </Typography>
              {/* <Typography
              variant="body1"
              fontWeight={600}
              color="white"
              fontSize={14}
            >
              First Native Cosmos Identity
            </Typography> */}
            </Box>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Button
              sx={{ color: 'white', display: 'block', height: '100%' }}
              // onClick={() => {
              //   router.push('/spirit')
              // }}
              href="/spirit"
            >
              Spirit
            </Button>
          </Box>
          <Box flex="1"></Box>

          {
            <Button variant="contained" onClick={() => connect()}>
              {address ? formatAddress(address) : 'Connect Wallet'}
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
