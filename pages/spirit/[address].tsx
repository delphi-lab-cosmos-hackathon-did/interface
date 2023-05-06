import { OutlinedInput, TextField } from '@mui/material'
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

export default function Spirit() {
  const [minted, setMinted] = useState<boolean>(true)
  const [activeFilter, setActiveFilter] = useState([true, false, false])
  const [filterStamp, setFilterStamp] = useState<Item[]>([])
  const [apiData, setAPIData] = useState<Spirit>(API_DATA)
  const [badge, setBadge] = useState<Set<string>>(new Set())

  const router = useRouter()

  const toggleFilter = (indice) => {
    const cacheActiveFilter = [false, false, false]
    cacheActiveFilter[indice] = true
    setActiveFilter([...cacheActiveFilter])
  }

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        const spirit = await spiritService.getSpirit({
          address: router.query.address.toString() || '',
        })
        setAPIData(spirit)
      }
      fetch()
    }
  }, [router.isReady])

  useEffect(() => {
    let cacheBadge = new Set<string>()
    apiData.attributes.forEach((attr) => {
      attr.items.forEach((item) => {
        cacheBadge.add(item.attribute)
      })
    })
    setBadge(cacheBadge)
  }, [apiData])

  useEffect(() => {
    //filter osmo
    let cacheFilterStamp: Item[] = []
    apiData.attributes.forEach((attr) => {
      const cacheItems = attr.items
        .map((item) => {
          return item
        })
        .filter((item) => {
          if (activeFilter[1]) {
            return item.type === OSMOSIS
          } else if (activeFilter[2]) {
            return item.type === MARS
          } else {
            return true
          }
        })
      cacheFilterStamp = cacheFilterStamp.concat(cacheItems)
    })
    setFilterStamp([...cacheFilterStamp])
  }, [activeFilter])

  const formatDateDuration = (startDate, endDate) => {
    const duration = dayjs(startDate).diff(dayjs(endDate), 'month')
    if (duration < 12) {
      return `${duration} Months`
    }
    const year = Math.floor(duration / 12)
    const month = duration % 12
    return `${year} Year ${month} Months`
  }
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
                {router.query.address}
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
                    <span style={{ color: 'white' }}>
                      {formatDateDuration(
                        apiData.statistics.last_active_timestamp,
                        apiData.statistics.first_active_timestamp,
                      )}
                    </span>
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
                {Array.from(badge).map((tag, index) => {
                  return (
                    <Box key={index} marginRight="22px" marginTop="32px">
                      <BaseButton>{tag}</BaseButton>
                    </Box>
                  )
                })}
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
            <BaseToggle
              onClick={() => toggleFilter(0)}
              active={activeFilter[0]}
              image="/logo.png"
            >
              All
            </BaseToggle>
            <Box sx={{ marginLeft: '18px' }}>
              <BaseToggle
                onClick={() => toggleFilter(1)}
                active={activeFilter[1]}
                image="/osmosis.png"
              >
                Osmosis
              </BaseToggle>
            </Box>
            <Box sx={{ marginLeft: '18px' }}>
              <BaseToggle
                onClick={() => toggleFilter(2)}
                active={activeFilter[2]}
                image="/mars.png"
              >
                Mars Protocol
              </BaseToggle>
            </Box>
          </Box>
          <Box marginTop="24px" display="flex" flexWrap="wrap">
            {filterStamp.map((stamp, index) => {
              return (
                <Box key={index} marginTop="16px" marginRight="100px">
                  <Badge
                    image={'./pepe.png'}
                    header={stamp.attribute}
                    description={stamp.description}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}