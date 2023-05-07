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

export const ButtonAppBar = () => {
  const { username, connect, disconnect, address } = useChain('osmosistestnet')
  const { wallet } = useWallet()
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar sx={{ py: 1 }}>
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
            <Typography
              variant="body1"
              fontWeight={600}
              color="white"
              fontSize={14}
            >
              First Native Cosmos Identity
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{ my: 2, color: 'white', display: 'block', height: '100%' }}
            ></Button>
          </Box>

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
