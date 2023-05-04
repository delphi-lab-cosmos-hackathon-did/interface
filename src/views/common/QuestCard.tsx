import { faUserGroup, faTrophy } from '@fortawesome/pro-solid-svg-icons'
import { faCalendarClock } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DriveEtaOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import {
  CryptoReward,
  PlatformReward,
  ProjectReward,
} from 'components/RewardIconWithText'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { formatDataCountdown } from '../../utils/format'
import { QuestStatus } from '../../services/questService'
import { UserQuestSubmissionStatus } from '../../services/types/quest'
dayjs.extend(relativeTime)

export interface QuestCardProps {
  questId: number
  image: string
  name: string
  description: string
  participant: number
  maxParticipant: number | null
  projectPoint: number
  platformPoint: number
  cryptoReward: number
  startDate: Date | null
  endDate: Date | null
  symbol: string
  slug?: string
  type?: 'quest' | 'raffle'
  status?: UserQuestSubmissionStatus
  inactivePoint?: boolean
  onClick?: () => void
}
export const QuestCard: React.FC<QuestCardProps> = (props) => {
  const {
    image,
    name,
    description,
    participant,
    maxParticipant,
    projectPoint,
    platformPoint,
    startDate,
    cryptoReward,
    endDate,
    symbol,
    type,
    status,
    inactivePoint,
    onClick,
  } = props

  const renderStatusTag = (status?: UserQuestSubmissionStatus) => {
    if (status === UserQuestSubmissionStatus.APPROVE) {
      return (
        <div className="bg-[#05BE2E] bg-opacity-[15%] text-[#05BE2E] backdrop-blur-3xl rounded-md p-1 px-2 font-medium">
          Success
        </div>
      )
    }
    if (status === UserQuestSubmissionStatus.PENDING) {
      return (
        <div className="bg-[#FF6B00] bg-opacity-[15%] text-[#FF6B00] backdrop-blur-3xl rounded-md p-1 px-2 font-medium">
          Joined
        </div>
      )
    }
    if (status === UserQuestSubmissionStatus.REJECT) {
      return (
        <div className="bg-[#DD0707] bg-opacity-[15%] text-[#DD0707] backdrop-blur-3xl rounded-md p-1 px-2 font-medium">
          Fail
        </div>
      )
    }
    if (status === UserQuestSubmissionStatus.WAIT_APPROVE) {
      return (
        <div className="bg-[#DFAE00] bg-opacity-[15%] text-[#DFAE00] backdrop-blur-3xl rounded-md p-1 px-2 font-medium">
          In-Review
        </div>
      )
    }
    return null
  }
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'rgba(43, 43, 44, 0.4)',
        backdropFilter: 'blur(30px)',
        borderRadius: '16px',
        height: '100%',
      }}
    >
      <CardActionArea sx={{ height: '100%' }} onClick={onClick}>
        <div
          className="p-4 md:p-6"
          style={{
            fontFamily: 'Work Sans',
          }}
        >
          <div className="flex w-full flex-grow-0">
            <Avatar
              alt={name}
              src={image}
              sx={{
                width: { xs: 70, md: 84 },
                height: { xs: 70, md: 84 },
                flexShrink: 0,
              }}
            />
            <div className="w-full ml-4">
              <div className="w-full font-bold flex justify-between">
                <div>
                  <div className="line-clamp-1 text-lg md:text-xl">{name}</div>
                </div>

                <div className="flex items-center space-x-2">
                  {type === 'quest' && props.maxParticipant !== null && (
                    <>
                      <FontAwesomeIcon icon={faUserGroup} />
                      <div className="font-light text-[16px]">{`${participant}/${maxParticipant}`}</div>
                    </>
                  )}
                  {type === 'raffle' && props.maxParticipant !== null && (
                    <>
                      <FontAwesomeIcon icon={faTrophy} />
                      <div className="font-light text-[16px]">
                        {maxParticipant}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm lg:text-base mt-1 md:mt-2 font-light w-[200px] md:w-[300px] lg:w-[400px] truncate">
                {description}
              </p>
              {endDate && (
                <div className="text-sm lg:text-base flex items-center w-full mt-4 space-x-2 font-white/50 font-light text-[#FFFFFF80] text-[16px]">
                  <FontAwesomeIcon icon={faCalendarClock} className="mr-1" />
                  <div>{formatDataCountdown(startDate, endDate)}</div>
                </div>
              )}
            </div>
          </div>
          <div className="border my-4 h-[1px]  w-full bg-[rgba(0,0,0,0.15)]"></div>
          <div className="flex mt-4 justify-between">
            <div className="flex flex-col">
              <ProjectReward
                text={projectPoint}
                unit={symbol}
                imgUrl={image}
                inactive={
                  status === UserQuestSubmissionStatus.APPROVE || inactivePoint
                }
              />
              <PlatformReward text={platformPoint} />
              <CryptoReward text={cryptoReward} />
            </div>
            <div className="flex justify-end items-center">
              {renderStatusTag(status)}
            </div>
          </div>
        </div>
      </CardActionArea>
    </Card>
  )
}
