import { Button, OutlinedInput, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { useState, useEffect } from 'react'
import { BaseButton } from '../../src/component/BaseButton'
import BaseToggle from '../../src/component/BaseToggle'
import Badge from '../../src/component/Badge'
import { API_DATA } from '../../src/constant/mockData'
import { Item, Spirit } from '../../src/type/spirit.interface'
import { MARS, OSMOSIS } from '../../src/constant/protocol'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useAddressInfo } from '../../src/hooks/useBackend'
import { spiritService } from '../../src/service/spiritService'
import { useChain } from '@cosmos-kit/react'

export default function Spirit() {
  const router = useRouter()
  const { username, connect, disconnect, address } = useChain('osmosis')

  useEffect(() => {
    if (router.isReady) {
      if (address) {
        router.push(`/spirit/${address}`)
      }
    }
  }, [router.isReady, address])

  return (
    <Container maxWidth="xl">
      <Box minWidth="100%" marginBottom="80px">
        <Box marginTop="35px">
          <Typography
            fontSize="60px"
            fontWeight="700"
            lineHeight="90px"
            color="white"
          >
            My Spirit
          </Typography>
        </Box>
        <Box textAlign="center" my={10}>
          <Button variant="contained" onClick={() => connect()}>
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
