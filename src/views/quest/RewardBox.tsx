import { Box, Stack, Typography } from '@mui/material'

interface RewardBoxProps {
  amount: number
  unit: string
  imageUrl: string
}

const RewardBox: React.FC<RewardBoxProps> = (props) => {
  const { amount, unit, imageUrl } = props
  return (
    <Box
      sx={{
        background: '#FFFFFF0D',
        borderRadius: 4,
        p: 2,
      }}
    >
      <Stack sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            background: '#FFFFFF0D',
            width: 44,
            height: 44,
            borderRadius: '22px',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img className="rounded-full" src={imageUrl} width={44} height={44} />
        </Box>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {amount}
        </Typography>
        <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
          {unit}
        </Typography>
      </Stack>
    </Box>
  )
}

export default RewardBox
