import { Grid, Tab } from '@mui/material'
import { EmptyState } from 'components/EmptyState'
import { DIDTabs } from 'components/DIDTabs'
import { QuestCardSkeleton } from 'components/skeleton/QuestCardSkeleton'
import { TabLabel } from 'components/TabLabel'
import { Routes } from 'constants/Routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { raffleService, RaffleStatus } from 'services/raffleService'
import {
  MetaDataRewardERC20,
  QuestRewardType,
} from '../../../services/types/quest'
import { Layout } from '../Layout'
import { QuestCard, QuestCardProps } from '../QuestCard'

enum BoardTabs {
  Active,
  Completed,
  Missed,
}

export const RaffleBoardPage = () => {
  const router = useRouter()
  const [rafflePropsList, setRafflePropsList] = useState<QuestCardProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<BoardTabs>(BoardTabs.Active)

  useEffect(() => {
    fetchRaffleList(RaffleStatus.Active)
  }, [])

  const fetchRaffleList = async (status: RaffleStatus) => {
    try {
      setIsLoading(true)
      const resp = await raffleService.listRaffle({ limit: 100, status }) //TODO: make pagination
      const list = resp.items

      const props = list.map((i) => {
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
          maxParticipant: i.limitParticipant,
          projectPoint: i.projectPoint,
          startDate: i.startDate,
          platformPoint: i.platformPoint,
          cryptoReward: cryptoReward,
          endDate: i.endDate,
          symbol: i.symbol,
          slug: i.slug,
        }
      })

      setRafflePropsList(props)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const goToDetail = (slug?: string) => {
    router.push(Routes.RaffleDetail(slug))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: BoardTabs) => {
    setActiveTab(newValue)
    setRafflePropsList([])
    let filterStatus: RaffleStatus = RaffleStatus.Active
    if (newValue === BoardTabs.Active) {
      filterStatus = RaffleStatus.Active
    } else if (newValue === BoardTabs.Completed) {
      filterStatus = RaffleStatus.Completed
    } else if (newValue === BoardTabs.Missed) {
      filterStatus = RaffleStatus.Missed
    }
    fetchRaffleList(filterStatus)
  }

  return (
    <Layout>
      <DIDTabs value={activeTab} onChange={handleChange}>
        <Tab
          value={BoardTabs.Active}
          label={
            <TabLabel text="Active" active={activeTab === BoardTabs.Active} />
          }
        />
        <Tab
          value={BoardTabs.Missed}
          label={
            <TabLabel text="Ended" active={activeTab === BoardTabs.Missed} />
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
          rafflePropsList.length === 0 && (
            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
              <EmptyState category="quest" text="No Raffle quest Yet" />
            </Grid>
          )
        )}
        {rafflePropsList.map((item) => (
          <Grid key={item.name} item xs={12} md={6}>
            <QuestCard
              questId={item.questId}
              name={item.name}
              image={item.image}
              description={item.description}
              participant={item.participant}
              maxParticipant={item.maxParticipant}
              startDate={item.startDate}
              projectPoint={item.projectPoint}
              platformPoint={item.platformPoint}
              cryptoReward={item.cryptoReward}
              endDate={item.endDate}
              symbol={item.symbol}
              type="raffle"
              onClick={() => goToDetail(item?.slug)}
              inactivePoint={activeTab === BoardTabs.Missed}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
