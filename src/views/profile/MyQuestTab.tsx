import {
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { EmptyState } from 'components/EmptyState'
import { QuestCardSkeleton } from 'components/skeleton/QuestCardSkeleton'
import { Routes } from 'constants/Routes'
import { useAuthData } from 'lib/AuthDataContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserQuestSubmissionStatus } from 'services/types/quest'
import { userQuestSubmissionService } from 'services/userQuestSubmissionService'
import { toQuestCardProps } from 'utils/quest'
import { QuestCard, QuestCardProps } from 'views/common/QuestCard'

enum MyQuestStatus {
  Unfinished = 'Unfinished',
  InReview = 'In-Review',
  Success = 'Success',
  NotSelected = 'Not selected',
}

const MyQuestFilter = (props: {
  value: MyQuestStatus
  onChangFilter?: (status: MyQuestStatus) => void
}) => {
  const statuses = Object.keys(MyQuestStatus)
  return (
    <Box>
      <Stack spacing={{ md: 2 }} direction="row">
        {statuses.map((key) => {
          const status = MyQuestStatus[key]
          const active = status === props.value
          return (
            <ButtonBase
              onClick={() => props.onChangFilter?.(status)}
              key={status}
              sx={{ p: { xs: 1, md: 2 }, borderRadius: '8px' }}
            >
              <Typography
                sx={{
                  fontWeight: { md: active ? 700 : 300 },
                  opacity: active ? 1 : 0.4,
                }}
              >
                {status}
              </Typography>
            </ButtonBase>
          )
        })}
      </Stack>
    </Box>
  )
}

export const MyQuestTab = () => {
  const router = useRouter()
  const { authData } = useAuthData()
  const [currentTab, setCurrentTab] = useState<MyQuestStatus>(
    MyQuestStatus.Unfinished,
  )
  const [questPropsList, setQuestPropsList] = useState<QuestCardProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setQuestPropsList([])
    fetchUserQuestSubmissionQuestList(currentTab)
  }, [currentTab])

  const fetchUserQuestSubmissionQuestList = async (status: MyQuestStatus) => {
    setLoading(true)
    try {
      const data = await userQuestSubmissionService.getUserQuestSubmission(
        status,
      )
      const quests = data.items
      const props = quests.map((q) => toQuestCardProps(q))
      setQuestPropsList(props)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  console.log('currentTab', currentTab)

  const goToQuestDetail = (questSlug: string) => {
    router.push(Routes.QuestDetail(questSlug))
  }

  const status = {
    [MyQuestStatus.Unfinished]: UserQuestSubmissionStatus.PENDING,
    [MyQuestStatus.InReview]: UserQuestSubmissionStatus.WAIT_APPROVE,
    [MyQuestStatus.Success]: UserQuestSubmissionStatus.APPROVE,
    [MyQuestStatus.NotSelected]: UserQuestSubmissionStatus.REJECT,
  }

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }}>
      <MyQuestFilter
        value={currentTab}
        onChangFilter={(status) => setCurrentTab(status)}
      />
      {loading ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <QuestCardSkeleton />
          </Grid>
          <Grid item xs={12} md={6}>
            <QuestCardSkeleton />
          </Grid>
        </Grid>
      ) : questPropsList.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {questPropsList.map((quest) => (
            <Grid key={quest.name} item xs={12} md={6}>
              <QuestCard
                questId={quest.questId}
                name={quest.name}
                image={quest.image}
                description={quest.description}
                participant={quest.participant}
                maxParticipant={quest.maxParticipant}
                projectPoint={quest.projectPoint}
                platformPoint={quest.platformPoint}
                cryptoReward={quest.cryptoReward}
                startDate={quest.startDate}
                endDate={quest.endDate}
                onClick={() => goToQuestDetail(quest.slug)}
                symbol={quest.symbol}
                status={status[currentTab]}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box p={4}>
          <EmptyState
            category="quest"
            text="No Quest Yet"
            subtitle="Go join the quest to get reward!"
          />
        </Box>
      )}
    </Stack>
  )
}
