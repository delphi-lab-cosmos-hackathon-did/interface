import { Skeleton } from '@mui/material'

export const PointCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{
        borderRadius: '16px',
        backgroundColor: 'rgba(43, 43, 44, 0.6)',
        backdropFilter: 'blur(30px)',
        height: { md: 308, sm: 288, xs: 240 },
      }}
    />
  )
}
