import {
  Alert,
  CircularProgress,
  OutlinedInput,
  Skeleton,
  Snackbar,
  SnackbarContent,
  TextField,
  styled,
} from '@mui/material'
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
import { spiritService } from '../../src/service/spiritService'
import { useChainWallet } from '@cosmos-kit/react'
import { StdFee } from '@cosmjs/stargate'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  gap: 1rem;
`

export default function Spirit() {
  const [minted, setMinted] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState([true, false, false])
  const [filterStamp, setFilterStamp] = useState<Item[]>([])
  const [apiData, setAPIData] = useState<Spirit>({
    attributes: [],
    statistics: {
      first_active_height: 0,
      first_active_timestamp: '',
      last_active_height: 0,
      last_active_timestamp: '',
      success_count: 0,
      gov_total: 0,
      gov_voted: 0,
    },
  })
  const [badge, setBadge] = useState<Set<string>>(new Set())
  const [ready, setReady] = useState(false)
  const [toast, setToast] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { getCosmWasmClient, getSigningCosmWasmClient, address } =
    useChainWallet('osmosistestnet', 'keplr-extension', false)
  const toggleFilter = (indice: number) => {
    const cacheActiveFilter = [false, false, false]
    cacheActiveFilter[indice] = true
    setActiveFilter([...cacheActiveFilter])
  }

  const sleep = (ms: any) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const mintSpirit = async () => {
    try {
      setToast(true)
      setIsMinting(true)
      await sleep(6000)
      // const client = await getSigningCosmWasmClient()
      // const fee: StdFee = {
      //   amount: [
      //     {
      //       denom: 'uosmo',
      //       amount: '100',
      //     },
      //   ],
      //   gas: '200261',
      // }
      // const result = await client.execute(
      //   address || '',
      //   'osmo1ky4y575azpje9c8en35h5a8mjutsyjnkpr6nepjvg4ep8nplm4xqphm92d',
      //   {
      //     mint: {
      //       owner: router.query.address,
      //     },
      //   },
      //   fee,
      // )

      setMinted(true)
      setSuccess(true)
    } catch {
      setIsMinting(false)
    } finally {
      // setToast(false)
      setIsMinting(false)
    }
  }
  const checkSpiritStatus = async () => {
    const client = await getCosmWasmClient()
    //
    try {
      const msg = await client.queryContractSmart(
        'osmo1ky4y575azpje9c8en35h5a8mjutsyjnkpr6nepjvg4ep8nplm4xqphm92d',
        {
          tokens: {
            owner: router.query.address,
          },
        },
      )
      if (msg.tokens.length === 0) {
        setMinted(false)
      }
    } catch (err) {
      setMinted(false)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          await checkSpiritStatus()
          const spirit = await spiritService.getSpirit({
            address: (router.query?.address || '').toString(),
          })
          setAPIData(spirit)
          setReady(true)
          setActiveFilter([true, false, false])
        } catch (err) {
          console.log('err', err)
          setReady(true)
        }
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

  const handleClose = () => {
    setToast(false)
  }

  const formatDateDuration = (startDate: string, endDate: string) => {
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
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box marginTop="31px">
            <img width={571} height={516} src="/ghost.png" alt="spirit" />
          </Box>
          <Box>
            {ready ? (
              minted ? (
                <>
                  <Box display="flex" gap={1}>
                    <Typography
                      variant="h2"
                      fontWeight="600"
                      fontSize="20px"
                      lineHeight="45px"
                      color="#FFA0BD"
                    >
                      Address:
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight="400"
                      fontSize="20px"
                      lineHeight="40px"
                      color="white"
                    >
                      {router.query.address}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      width: '574px',
                      height: '272px',
                      background: 'rgba(217, 217, 217, 0.3)',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: '15px',
                      padding: '38px 60px',
                      textAlign: 'start',
                    }}
                  >
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
                      Last Active:{' '}
                      <span style={{ color: 'white' }}>
                        {dayjs(apiData.statistics.last_active_timestamp).format(
                          'DD/MM/YYYY',
                        )}
                      </span>
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
                      <span style={{ color: 'white' }}>
                        {apiData.statistics.gov_voted} /{' '}
                        {apiData.statistics.gov_total}
                      </span>
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
                  <Box display="flex" width="800px" flexWrap="wrap">
                    {Array.from(badge).map((tag, index) => {
                      return (
                        <Box key={index} marginRight="22px" marginTop="32px">
                          <BaseButton>{tag}</BaseButton>
                        </Box>
                      )
                    })}
                  </Box>
                </>
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
                    You don’t have Spirit yet. Mint your Spirit to explore
                    badges
                  </Typography>
                  <BaseButton
                    onClick={() => mintSpirit()}
                    sx={{ marginTop: '32px' }}
                    fullWidth
                  >
                    Mint Spirit
                  </BaseButton>
                </Box>
              )
            ) : (
              <Box>
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
                  <Skeleton width={300} height={40} />
                  <Skeleton width={200} height={40} />
                  <Skeleton width={250} height={40} />
                  <Skeleton width={220} height={40} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {minted && (
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
            <Grid marginTop="24px">
              {filterStamp.map((stamp, index) => {
                return (
                  <Box key={index}>
                    <Badge
                      image={stamp.image}
                      header={stamp.attribute}
                      description={stamp.description}
                    />
                  </Box>
                )
              })}
            </Grid>
          </Box>
        )}
      </Box>

      <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
        {isMinting ? (
          <SnackbarContent
            sx={{ background: 'rgb(2, 136, 209)' }}
            message={
              <Box display="flex" height="20px">
                <CircularProgress size="22px" sx={{ mr: 2, color: 'white' }} />
                Loading
              </Box>
            }
          ></SnackbarContent>
        ) : success ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Minted!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Fail!
          </Alert>
        )}
      </Snackbar>
    </Container>
  )
}
