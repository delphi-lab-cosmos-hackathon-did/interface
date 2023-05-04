import { Skeleton } from '@mui/material'

export const ConditionBoxSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={152}
      sx={{
        borderRadius: '16px',
        backgroundColor: 'rgba(43, 43, 44, 0.6)',
        backdropFilter: 'blur(30px)',
      }}
    />
  )
}
