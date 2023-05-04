import { Grid, Tab } from '@mui/material'
import { EmptyState } from 'components/EmptyState'
import { DIDTabs } from 'components/DIDTabs'
import { QuestCardSkeleton } from 'components/skeleton/QuestCardSkeleton'
import { TabLabel } from 'components/TabLabel'
import { Routes } from 'constants/Routes'
import { id } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  QuestResponseItem,
  questService,
  QuestStatus,
} from 'services/questService'
import { useAuthData } from '../../../lib/AuthDataContext'
import {
  MetaDataRewardERC20,
  QuestRewardType,
  UserQuestSubmissionStatus,
} from '../../../services/types/quest'
import { Layout } from '../Layout'
import { QuestCard, QuestCardProps } from '../QuestCard'

enum QuestBoardTabs {
  Active,
  Completed,
  Missed,
}

interface QuestBoardItem extends QuestResponseItem {
  status?: UserQuestSubmissionStatus
}

export const QuestBoardPage = () => {
  const router = useRouter()
  const [questPropsList, setQuestPropsList] = useState<QuestCardProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<QuestBoardTabs>(
    QuestBoardTabs.Active,
  )
  const { isLogin } = useAuthData()

  useEffect(() => {
    fetchQuestList(QuestStatus.Active)
  }, [isLogin])

  const fetchQuestList = async (status: QuestStatus) => {
    try {
      setIsLoading(true)
      const resp = await questService.listQuest({ limit: 100, status }) //TODO: make pagination
      const quests = resp.items as QuestBoardItem[]
      const questIds = quests.map((q) => q.id)
      if (isLogin) {
        try {
          const respStatus = await questService.listMyUserSubmissionQuestStatus(
            questIds,
          )
          const statusMap = new Map<number, UserQuestSubmissionStatus>()
          for (const status of respStatus) {
            const s = status.status as UserQuestSubmissionStatus
            statusMap.set(status.questId, s)
          }
          for (let i = 0; i < quests.length; i++) {
            const quest = quests[i]
            const status = statusMap.get(quest.id)
            quest.status = status
          }
        } catch (e) {
          console.warn(e)
        }
      }

      const props = quests.map((i) => {
        let cryptoReward = null
        const erc20Reward = i.questRewards.find(
          (r) => r.type === QuestRewardType.ERC20,
        )
        if (erc20Reward) {
          const reward = erc20Reward.metaData as unknown as MetaDataRewardERC20
          cryptoReward = reward.amount
        }
        return {
          questId: i.id,
          image: i.projectImageUrl,
          name: i.name,
          description: i.description,
          participant: i.participant,
          maxParticipant: i.maxParticipant,
          projectPoint: i.projectPoint,
          startDate: i.startDate,
          platformPoint: i.platformPoint,
          cryptoReward: cryptoReward,
          endDate: i.endDate,
          symbol: i.symbol,
          slug: i.slug,
          status: i.status,
        }
      })

      setQuestPropsList(props)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const goToQuestDetail = (slug?: string) => {
    router.push(Routes.QuestDetail(slug))
  }

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: QuestBoardTabs,
  ) => {
    setActiveTab(newValue)
    setQuestPropsList([])
    let filterStatus: QuestStatus = QuestStatus.Active
    if (newValue === QuestBoardTabs.Active) {
      filterStatus = QuestStatus.Active
    } else if (newValue === QuestBoardTabs.Completed) {
      filterStatus = QuestStatus.Completed
    } else if (newValue === QuestBoardTabs.Missed) {
      filterStatus = QuestStatus.Missed
    }
    fetchQuestList(filterStatus)
  }

  return (
    <Layout>
      <DIDTabs value={activeTab} onChange={handleChange}>
        <Tab
          value={QuestBoardTabs.Active}
          label={
            <TabLabel
              text="Active"
              active={activeTab === QuestBoardTabs.Active}
            />
          }
        />
        {/* TODO: copy logic from MyQuest */}
        {/* <Tab
          value={QuestBoardTabs.Completed}
          label={
            <TabLabel
              text="Completed"
              active={activeTab === QuestBoardTabs.Completed}
            />
          }
        /> */}
        <Tab
          value={QuestBoardTabs.Missed}
          label={
            <TabLabel
              text="Ended"
              active={activeTab === QuestBoardTabs.Missed}
            />
          }
        />
      </DIDTabs>
      <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
        {isLoading ? (
          <>
            <Grid item xs={12} md={6}>
              <QuestCardSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <QuestCardSkeleton />
            </Grid>
          </>
        ) : (
          questPropsList.length === 0 && (
            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
              <EmptyState category="quest" text="No Quest Yet" />
            </Grid>
          )
        )}
        {questPropsList.map((quest) => (
          <Grid item xs={12} md={6} key={quest.name}>
            <QuestCard
              questId={quest.questId}
              name={quest.name}
              image={quest.image}
              description={quest.description}
              participant={quest.participant}
              maxParticipant={quest.maxParticipant}
              startDate={quest.startDate}
              projectPoint={quest.projectPoint}
              platformPoint={quest.platformPoint}
              cryptoReward={quest.cryptoReward}
              endDate={quest.endDate}
              symbol={quest.symbol}
              status={quest.status}
              type="quest"
              onClick={() => goToQuestDetail(quest?.slug)}
              inactivePoint={activeTab === QuestBoardTabs.Missed}
            />
          </Grid>
        ))}
      </Grid>

      {/* Test Scroll */}
      {/* <Box sx={{ height: '100vh' }} /> */}
    </Layout>
  )
}
