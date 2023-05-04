import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Stack, Typography } from '@mui/material'

import { formatNumber, formatDate, formatMintPrice } from 'utils/format'

interface IProjectProfile {
  projectName?: string
  image?: string
  questName?: string
  description?: string
  projectSupply?: number
  projectMintPrice?: string
  projectMintingDate?: string
  numberOfWinner?: number
  projectTwitter?: string
  projectDiscord?: string
  projectWebsite?: string
}

interface ProjectProfileProps {
  data?: IProjectProfile
}

const ProjectProfile: React.FC<ProjectProfileProps> = ({ data }) => {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      spacing={{
        xs: 2,
        sm: 4,
      }}
      sx={{ width: '100%' }}
    >
      <Stack alignItems="center">
        <Avatar
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
          }}
          src={data?.image}
        />
      </Stack>

      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full">
          <Typography variant="h4" gutterBottom>
            {data?.projectName} : {data?.questName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 300 }}>
            {data?.description}
          </Typography>
          <div className="grid grid-cols-2 gap-y-2 mt-2 md:mt-4 md:flex md:flex-row md:space-x-14 text-sm md:text-base">
            <div className="flex flex-col">
              <div className="text-white/50">Supply</div>
              <div className="font-semibold">
                {data?.projectSupply
                  ? formatNumber(data?.projectSupply)
                  : 'TBA'}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-white/50">Mint Price</div>
              <div className="font-semibold">
                {formatMintPrice(data?.projectMintPrice)}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-white/50">Minting Date</div>
              <div className="font-semibold uppercase">
                {data?.projectMintingDate
                  ? formatDate(data?.projectMintingDate)
                  : 'TBA'}
              </div>
            </div>
            {data?.numberOfWinner && (
              <div className="flex flex-col">
                <div className="text-white/50">Number of winners</div>
                <div className="font-semibold uppercase">
                  {data?.numberOfWinner}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full text-center md:w-28 mt-4 md:mt-0 md:text-right text-lg">
          <div className="space-x-4">
            {data?.projectTwitter && (
              <a
                href={data?.projectTwitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
            {data?.projectDiscord && (
              <a
                href={data?.projectDiscord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            )}
            {data?.projectWebsite && (
              <a
                href={data?.projectWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Stack>
  )
}

export default ProjectProfile
