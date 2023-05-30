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
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useChainWallet } from '@cosmos-kit/react'
import { StdFee } from '@cosmjs/stargate'
import TextInput from '../src/component/TextInput'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  gap: 1rem;
`

export default function Spirit() {
  const [activeFilter, setActiveFilter] = useState([true, false, false])
  const [uploaded, setUploaded] = useState(false)

  const toggleFilter = (indice: number) => {
    const cacheActiveFilter = [false, false, false]
    cacheActiveFilter[indice] = true
    setActiveFilter([...cacheActiveFilter])
  }
  const getUploadParams = ({ meta }: { meta: any }) => {
    return { url: 'https://httpbin.org/post' }
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
            New Badge
          </Typography>
        </Box>
        <Box
          marginTop="32px"
          borderRadius="15px"
          padding="18px"
          minHeight="531px"
          style={{ background: 'rgba(217, 217, 217, 0.3)' }}
        >
          {uploaded ? (
            <Typography
              fontWeight="600"
              fontSize="24px"
              lineHeight="30px"
              color="#00CDDA"
              textTransform="uppercase"
            >
              Upload Badge Complete, Please wait for approval
            </Typography>
          ) : (
            <>
              <Typography
                fontWeight="600"
                fontSize="24px"
                lineHeight="30px"
                color="#00CDDA"
                textTransform="uppercase"
              >
                Please fill the following information for Badge Creation
              </Typography>
              <Typography
                fontWeight="600"
                fontSize="16px"
                lineHeight="22px"
                color="white"
                margin="16px 0"
              >
                Noting that if you wish to tailor made the condition for badge
                eligibility, please contact directly to us for enterprise
                solution
              </Typography>
              <Box display="flex">
                <Box width="25%">
                  <Box sx={{ color: 'white!important' }} padding="24px">
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={() => console.log()}
                      onSubmit={() => console.log()}
                      accept="image/*"
                      inputContent="Please add 400*400 Size"
                    />
                  </Box>
                </Box>
                <Box width="75%">
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    marginBottom="16px"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      lineHeight="30px"
                      color="#FFC83A"
                      style={{ marginRight: '16px' }}
                    >
                      Name:
                    </Typography>
                    <TextInput placeholder="Name of the Badge" />
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    marginBottom="16px"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      lineHeight="30px"
                      color="#FFC83A"
                      style={{ marginRight: '16px' }}
                    >
                      Description:
                    </Typography>
                    <TextInput placeholder="Description of the Badge" />
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    marginBottom="16px"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      lineHeight="30px"
                      color="#FFC83A"
                    >
                      Chain:
                    </Typography>
                    <Box>
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
                    </Box>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    marginBottom="16px"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      lineHeight="30px"
                      color="#FFC83A"
                    >
                      Condition Setting:
                    </Typography>
                    <Box style={{ marginBottom: '16px' }}>
                      <select
                        style={{
                          padding: '8.5px 20px',
                          border: '1px solid #241D2D',
                          borderRadius: '8px',
                          width: '75%',
                        }}
                        name="select"
                        id="select"
                      >
                        <option value="swapping">Swapping</option>
                        <option value="holding">Holding</option>
                        <option value="delegating">Delegating</option>
                        <option value="staking">Staking</option>
                      </select>
                    </Box>
                    <TextInput placeholder="Amount" />
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box marginTop="32px" display="flex" justifyContent="flex-end">
          <BaseButton onClick={() => setUploaded(true)}>
            Create Badge
          </BaseButton>
        </Box>
      </Box>
    </Container>
  )
}
