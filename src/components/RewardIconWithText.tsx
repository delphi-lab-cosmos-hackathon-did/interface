import { Box, Typography } from '@mui/material'

export const RewardIconWithText = ({
  border,
  text,
  imgSrc,
  inactive,
}: {
  border?: string
  text: string | number | null
  imgSrc: string
  inactive?: boolean
}) => {
  return (
    <Box
      sx={{
        border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255, 0.05)',
        backdropFilter: 'blur(100px)',
        px: 1,
        py: 0.5,
        opacity: inactive ? 0.5 : 1,
      }}
    >
      <Box
        sx={{
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 999,
          minHeight: '25px',
          minWidth: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img className="rounded-full" src={imgSrc} width={15} height={15} />
      </Box>
      <Typography variant="body1" sx={{ mx: '6px' }}>
        {text}
      </Typography>
    </Box>
  )
}

export const ProjectReward = ({
  text,
  unit,
  imgUrl,
  inactive,
}: {
  text: string | number
  unit: string
  imgUrl: string
  inactive?: boolean
}) => {
  if (text === 0 || text === null) return
  return (
    <RewardIconWithText
      text={`${text} ${unit}`}
      imgSrc={imgUrl}
      inactive={inactive}
    />
  )
}

export const PlatformReward = ({ text }: { text: string | number | null }) => {
  if (text === 0 || text === null) return
  return (
    <RewardIconWithText
      text={`${text} DID`}
      imgSrc="/static/images/icon/cube.svg"
    />
  )
}

export const CryptoReward = ({ text }: { text: string | number | null }) => {
  if (text == null || text === 0) return null
  return (
    <RewardIconWithText
      text={`${text} USDC`}
      imgSrc="/static/images/icon/usdc.svg"
    />
  )
}
