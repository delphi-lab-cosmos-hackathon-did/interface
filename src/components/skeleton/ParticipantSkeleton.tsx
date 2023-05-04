import React from 'react'
import { Skeleton } from '@mui/material'
interface SkeletonProps {
  count?: number
}

export const ParticipantSkeleton: React.FC<SkeletonProps> = ({ count = 1 }) => {
  return (
    <React.Fragment>
      {Array.from(Array(count), (e, index) => {
        return (
          <Skeleton
            key={index}
            variant="rectangular"
            width={54}
            height={54}
            sx={{
              borderRadius: '100%',
              backgroundColor: 'rgba(43, 43, 44, 0.6)',
              backdropFilter: 'blur(30px)',
            }}
          />
        )
      })}
    </React.Fragment>
  )
}
