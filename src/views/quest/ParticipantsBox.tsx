import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { ParticipantSkeleton } from 'components/skeleton/ParticipantSkeleton'
import { IUserQuestSubmission } from 'services/userQuestSubmissionService'
import { IMeta } from 'services/types/pagination'
import { IUserRaffleSubmission } from 'services/userRaffleSubmissionService'

interface ParticipantsBoxProps {
  questId: number
  maxParticipant?: number
  type?: 'quest' | 'raffle'
  useUserSubmission: () => {
    fetchData: (id: number, limit: number) => Promise<void>
    list: IUserQuestSubmission[] | IUserRaffleSubmission[]
    clearStore: () => void
    meta: IMeta
    totalItems: number
    moreItem: number
  }
}

export const ParticipantsBox: React.FC<ParticipantsBoxProps> = ({
  questId,
  maxParticipant,
  useUserSubmission,
  type,
}) => {
  const router = useRouter()

  const { fetchData, meta, list, totalItems, moreItem, clearStore } =
    useUserSubmission()

  const [loading, setLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(8)

  useEffect(() => {
    if (questId && limit && router?.query?.id) {
      initialData()
    }
  }, [questId, limit, router?.query?.id])

  useEffect(() => {
    return () => {
      clearStore()
    }
  }, [])

  const handleLoadMore = () => {
    if (limit < 50) {
      setLoading(true)
      setLimit(limit + 9)
    }
  }

  const initialData = async () => {
    await fetchData(questId, limit)
    setLoading(false)
  }

  return (
    <Stack
      spacing={4}
      sx={{
        paddingBottom: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {`Participants `}
        {type === 'quest' && meta && (
          <>
            {`(`}
            {`${meta?.totalItems !== null ? meta.totalItems : ``}`}
            {maxParticipant !== null ? ` / ` : ``}
            {maxParticipant}
            {`)`}
          </>
        )}
        {type === 'raffle' && meta && <>({`${meta?.totalItems}`})</>}
      </Typography>

      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4">
        {list?.map((item, index) => (
          <Jazzicon
            key={item?.user?.address}
            seed={jsNumberForAddress(item?.user?.address)}
            diameter={54}
          />
        ))}

        {loading && <ParticipantSkeleton count={10} />}
        {totalItems > 8 && Boolean(moreItem > 0) && !loading && (
          <div
            onClick={handleLoadMore}
            className="relative h-[54px] w-[54px] overflow-hidden rounded-full flex items-center justify-center cursor-pointer select-none"
          >
            <Jazzicon seed={123} diameter={52} />
            <div className="top-0 absolute h-full w-full flex items-center justify-center backdrop-blur-xl text-sm">
              +{moreItem}
            </div>
          </div>
        )}
      </div>
    </Stack>
  )
}
