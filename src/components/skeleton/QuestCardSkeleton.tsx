import { Skeleton } from '@mui/material'

export const QuestCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{
        borderRadius: '16px',
        backgroundColor: 'rgba(43, 43, 44, 0.6)',
        backdropFilter: 'blur(30px)',
        height: { md: 212, xs: 186 },
      }}
    />
  )
}
