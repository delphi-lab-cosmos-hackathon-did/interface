import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import { GradientButton } from 'components/GradientButton'
import dayjs from 'dayjs'
import { MockReward } from 'mock-data/mock-rewards'
import { PlatformReward, ProjectReward } from './RewardIconWithText'

export const RewardCard = ({ reward }: { reward: MockReward }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid #202424',
        backgroundColor: 'rgba(43, 43, 44, 0.4)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          height={140}
          image={reward.image}
          alt={reward.name}
        />
        <CardContent
          sx={{
            width: '100%',
            height: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" spacing={1}>
            <ProjectReward
              text={reward.projectPoint}
              imgUrl={reward.image}
              unit=""
            />
            <PlatformReward text={reward.projectPoint} />
          </Stack>
          <Typography variant="body1" sx={{ mt: 1, fontSize: 20 }}>
            {reward.name}
          </Typography>
          {reward.remaining && (
            <Typography
              variant="body1"
              sx={{ fontSize: 20 }}
            >{`Remaining: ${reward.remaining}`}</Typography>
          )}
          <Box sx={{ flex: 1 }} />
          <Typography variant="body1" sx={{ opacity: 0.5, mt: 1 }}>
            Expiry :{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {dayjs(reward.expiryDate).format('D MMMM YYYY')}
            </Typography>
          </Typography>
        </CardContent>
        {/* <Box sx={{ flex: 1 }} /> */}
      </CardActionArea>

      <CardActions>
        <GradientButton fullWidth>Redeem</GradientButton>
      </CardActions>
    </Card>
  )
}
