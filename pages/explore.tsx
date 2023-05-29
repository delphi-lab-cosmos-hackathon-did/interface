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
import { BaseButton } from '../src/component/BaseButton'
import BaseToggle from '../src/component/BaseToggle'
import Badge from '../src/component/Badge'
import { API_DATA } from '../src/constant/mockData'
import { Item, Spirit } from '../src/type/spirit.interface'
import { MARS, OSMOSIS } from '../src/constant/protocol'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { spiritService } from '../src/service/spiritService'
import { useChainWallet } from '@cosmos-kit/react'
import { StdFee } from '@cosmjs/stargate'
import ExploreBadge from '../src/component/ExploreBadge'
import { badgeList } from '../src/constant/badgeData'

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

  const formattedBadge = () => {
    if (activeFilter[0]) {
      return badgeList
    } else if (activeFilter[1]) {
      return badgeList.filter((b) => b.type == 'osmosis')
    } else if (activeFilter[2]) {
      return badgeList.filter((b) => b.type == 'mars')
    }
    return []
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
            Explore Badge :
          </Typography>
        </Box>
        <Box display="flex" margin="24px 0">
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
        <Box display="flex" flexWrap="wrap">
          {formattedBadge().map((b) => {
            return (
              <ExploreBadge
                header={b.type}
                image={b.image}
                description={b.description}
                attribute={b.attribute}
              />
            )
          })}
        </Box>
      </Box>
    </Container>
  )
}
