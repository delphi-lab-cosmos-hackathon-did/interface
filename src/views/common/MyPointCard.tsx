import React, { useMemo } from 'react'
import { Avatar, Box, Card, LinearProgress } from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { IUserProjectPoint } from 'services/userProjectPointService'
import { formatNumber } from 'utils/format'

dayjs.extend(relativeTime)

export interface MyPointCardProps {
  item?: IUserProjectPoint
  onClick?: () => void
}

export const MyPointCard: React.FC<MyPointCardProps> = ({ item, onClick }) => {
  const scale = 1000

  const level = useMemo(() => {
    return Number(item?.totalPoint / scale).toFixed(0)
  }, [item?.totalPoint])

  const experiencePoint = useMemo(() => {
    return item?.totalPoint % scale
  }, [item?.totalPoint])

  const percent = useMemo(() => {
    return (experiencePoint * 100) / scale
  }, [experiencePoint])

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'rgba(43, 43, 44, 0.4)',
        backdropFilter: 'blur(30px)',
        borderRadius: '16px',
        height: '100%',
      }}
      className="p-4 md:p-6"
    >
      <div className="space-y-2 md:space-y-4">
        <div className="text-center text-base md:text-lg line-clamp-1">
          {item?.project?.name}
        </div>

        <div className="flex justify-center">
          <Avatar
            alt={item?.project?.name}
            src={item?.project?.image}
            sx={{
              width: { xs: 70, md: 84 },
              height: { xs: 70, md: 84 },
              flexShrink: 0,
            }}
          />
        </div>

        <div className="space-y-1">
          <div className="text-center text-base md:text-lg font-semibold">
            Level {formatNumber(level)}
          </div>
          <div className="flex justify-center">
            <LinearProgress
              sx={{
                width: 140,
                height: 8,
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              variant="determinate"
              value={percent}
            />
          </div>
          <div className="text-center">
            {formatNumber(experiencePoint)}/{formatNumber(scale)} XP
          </div>
        </div>

        <div>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255, 0.05)',
              backdropFilter: 'blur(100px)',
            }}
            className="py-1 px-4 flex justify-between rounded-full"
          >
            <span className="font-semibold">
              {formatNumber(item?.totalPoint)}
            </span>
            <span>{item?.project?.symbol?.toUpperCase()}</span>
          </Box>
        </div>
      </div>
    </Card>
  )
}
