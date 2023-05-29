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
import ExploreBadge from '../../src/component/ExploreBadge'
import { badgeList } from '../../src/constant/badgeData'
import Table from '../../src/component/Table'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  gap: 1rem;
`

export default function Spirit() {
  const [minted, setMinted] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState([true, false, false])
  const [badgeInfo, setBadgeInfo] = useState({
    type: '',
    attribute: '',
    description: '',
    image: '',
  })
  const [userList, setUserList] = useState<string[]>([])

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

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          console.log('btoa')
          let humanizedText = atob(router.query?.tag || '')
          let badge
          badgeList.forEach((_badge) => {
            if (_badge.attribute === humanizedText) {
              badge = _badge
            }
          })
          setBadgeInfo(badge)
          console.log('api call')
          const _list = await spiritService.getBadgeList(
            router.query?.tag.toString() || '',
          )
          console.log('api called complete')
          const cacheList = [..._list]
          console.log('cacheList ', cacheList)
          setUserList(cacheList)
          console.log('list ', userList)
          // setAPIData(spirit)
          // setReady(true)
        } catch (err) {
          console.log('err', err)
        }
      }
      fetch()
    }
  }, [router.isReady])
  console.log('userList ', userList)
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
            User Tag :{' '}
            <span style={{ color: '#00CDDA !important' }}>
              {badgeInfo.attribute}
            </span>
          </Typography>
        </Box>
        <Box marginTop="32px" display="flex">
          <Box
            style={{
              background: 'rgba(217, 217, 217, 0.4)',
            }}
            borderRadius="15px"
            border="2px solid #000000"
            padding="13px 50px"
            height="362px"
            width="362px"
          >
            <img
              style={{ width: '220px', height: '220px' }}
              src={badgeInfo.image}
            />
            <Box marginTop="16px">
              <Typography
                fontWeight="500"
                fontSize="20px"
                color="white"
                lineHeight="30px"
              >
                {badgeInfo.description}
              </Typography>
            </Box>
          </Box>
          <Table list={userList} />
        </Box>
      </Box>
    </Container>
  )
}
