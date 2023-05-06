import { Button, OutlinedInput, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { useState } from 'react'
const items = [
  {
    title: 'NFT Identity',
    description:
      'A composable SBT to collect badge for your on-chain activities.',
  },
  {
    title: 'Protocol Badge',
    description:
      'Reward your user with badge to be used for future airdrops and incentives',
  },
  {
    title: 'Tag Search',
    description: 'Identify your targeted segment with on-chain behavior tag',
  },
]
export default function Home() {
  const router = useRouter()
  const [address, setAddress] = useState('')

  return (
    <Box sx={{ background: 'url(/bg.svg)' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          height="calc(100vh - 86px)"
        >
          <Typography
            variant="h3"
            fontWeight={600}
            component="h1"
            gutterBottom
            color="white"
          >
            Explore your own{' '}
            <span style={{ color: '#00D1FF' }}> Cosmos Identity</span>
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            component="h1"
            gutterBottom
            color="white"
            mb={2}
          >
            Redeem your
            <span style={{ color: '#EAFF68' }}>
              {' '}
              Reputation, Achievement, Loyalty
            </span>
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color="white"
            component="h1"
            gutterBottom
            mb={2}
            fontSize={14}
          >
            Supported over 260 protocols in Cosmos Ecosystem
          </Typography>
          <Box display="flex" mb={4} gap={2} alignItems={'center'}>
            {['/atom.png', '/osmosis.png', '/mars.png'].map((logo) => (
              <img src={logo} width={24} height={24} />
            ))}
            <Typography color="white" fontWeight={600} fontSize={12}>
              & many more
            </Typography>
          </Box>
          <OutlinedInput
            startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
            placeholder="Address"
            sx={{ width: 500, background: 'white', borderRadius: '8px', mb: 3 }}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                router.push(`/spirit/${address}`)
              }
            }}
          />

          <Typography fontSize={30} fontWeight={600} color="white">
            OR
          </Typography>
          <Box my={3} width="200px">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                router.push('/spirit')
              }}
            >
              Mint You Spirit
            </Button>
          </Box>

          {/* <img width={300} src="/logo.png" alt="logo" /> */}
          <Box display="flex" textAlign="center" gap={5}>
            {items.map((item) => {
              return (
                <Box
                  sx={{
                    background: 'rgba(217, 217, 217, 0.4)',
                    border: '2px solid #000000',
                    borderRadius: 2,
                    width: 200,
                    py: 2,
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    fontWeight={700}
                    fontSize={20}
                    color="#40F1C5"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    fontWeight={700}
                    fontSize={14}
                    color="white"
                  >
                    {item.description}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
