import { Box, Grid } from '@mui/material'
import { RewardCard } from 'components/RewardCard'
import { MockReward, MockRewards } from 'mock-data/mock-rewards'
import { Layout } from '../Layout'

export const RewardPage = () => {
  return (
    <Layout>
      <Grid container spacing={2} sx={{ pt: 4 }}>
        {MockRewards.map((reward: MockReward) => (
          <Grid item xs={6} md={3} key={reward.name}>
            <RewardCard reward={reward} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height: '100vh' }} /> {/* Test Scroll */}
    </Layout>
  )
}
