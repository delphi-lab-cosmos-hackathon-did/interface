import { OutlinedInput, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { BaseButton } from '../src/component/BaseButton'
import BaseToggle from '../src/component/BaseToggle'
import Badge from '../src/component/Badge'

export default function Spirit() {
  const [minted, setMinted] = useState<boolean>(true)
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box marginTop="31px">
            <img width={571} height={516} src="/ghost.png" alt="spirit" />
          </Box>
          {minted ? (
            <Box>
              <Typography
                variant="h2"
                fontWeight="600"
                fontSize="30px"
                lineHeight="45px"
                color="#FFA0BD"
              >
                Address:
              </Typography>
              <Typography
                variant="h2"
                fontWeight="400"
                fontSize="27px"
                lineHeight="40px"
                color="white"
              >
                osmo1typsgj0nvketwusvaakyerjp9exr2fuxw5hhxs
              </Typography>
              <Box
                sx={{
                  width: '630px',
                  background: 'rgba(217, 217, 217, 0.3)',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '15px',
                  padding: '32px 38px',
                  textAlign: 'center',
                  marginTop: '16px',
                }}
              >
                <Box sx={{ textAlign: 'start' }}>
                  <Typography
                    sx={{ marginTop: '8px' }}
                    fontSize="20px"
                    lineHeight="30px"
                    fontWeight="500"
                    color="#8DDDFF"
                  >
                    {' '}
                    Wallet Age:{' '}
                    <span style={{ color: 'white' }}>2 Year 1 Months</span>
                  </Typography>
                  <Typography
                    sx={{ marginTop: '8px' }}
                    fontSize="20px"
                    lineHeight="30px"
                    fontWeight="500"
                    color="#FFE39A"
                  >
                    {' '}
                    Activity Frequency:{' '}
                    <span style={{ color: 'white' }}>2 Months</span>
                  </Typography>
                  <Typography
                    sx={{ marginTop: '8px' }}
                    fontSize="20px"
                    lineHeight="30px"
                    fontWeight="500"
                    color="#9CFF94"
                  >
                    {' '}
                    Governance Voting:{' '}
                    <span style={{ color: 'white' }}>2 Months</span>
                  </Typography>
                  <Typography
                    sx={{ marginTop: '8px' }}
                    fontSize="20px"
                    lineHeight="30px"
                    fontWeight="500"
                    color="#E786FF"
                  >
                    {' '}
                    KYC: <span style={{ color: 'white' }}>2 Months</span>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" width="800px" flexWrap="wrap">
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Early Supporter</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
                <Box marginRight="22px" marginTop="32px">
                  <BaseButton>Osmo Whale</BaseButton>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: '574px',
                height: '272px',
                background: 'rgba(217, 217, 217, 0.3)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '15px',
                padding: '38px 60px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                fontWeight="600"
                fontSize="25px"
                lineHeight="37.5px"
                color="#EAFF68"
              >
                Mint Your Spirit
              </Typography>
              <Typography
                sx={{ marginTop: '8px' }}
                fontSize="20px"
                lineHeight="30px"
                fontWeight="500"
                color="white"
              >
                You don’t have Spirit yet. Mint your Spirit to explore badges
              </Typography>
              <BaseButton sx={{ marginTop: '32px' }} fullWidth>
                Mint Spirit
              </BaseButton>
            </Box>
          )}
        </Box>
        <Box marginTop="46px">
          <Typography
            fontSize="60px"
            fontWeight="700"
            lineHeight="90px"
            color="white"
          >
            My Badge:
          </Typography>
          <Box display="flex" marginTop="32px">
            <BaseToggle active image="/logo.png">
              All
            </BaseToggle>
            <Box sx={{ marginLeft: '18px' }}>
              <BaseToggle image="/osmosis.png">Osmosis</BaseToggle>
            </Box>
            <Box sx={{ marginLeft: '18px' }}>
              <BaseToggle image="/mars.png">Mars Protocol</BaseToggle>
            </Box>
          </Box>
          <Box marginTop="24px" display="flex" flexWrap="wrap">
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
            <Box marginTop="16px" marginRight="100px">
              <Badge
                image="/pepe.png"
                header="OSMO Whale"
                description="Hold more than 1,000,000 OSMO"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
