import { QuestResponseItem } from 'services/questService'
import { MetaDataRewardERC20, QuestRewardType } from 'services/types/quest'

export const toQuestCardProps = (q: QuestResponseItem) => {
  let cryptoReward = null
  const erc20Reward = q.questRewards.find(
    (r) => r.type === QuestRewardType.ERC20,
  )
  if (erc20Reward) {
    const reward = erc20Reward.metaData as unknown as MetaDataRewardERC20
    cryptoReward = reward.amount
  }
  return {
    questId: q.id,
    image: q.projectImageUrl,
    name: q.name,
    description: q.description,
    participant: q.participant,
    maxParticipant: q.maxParticipant,
    projectPoint: q.projectPoint,
    platformPoint: q.platformPoint,
    cryptoReward: cryptoReward,
    endDate: q.endDate,
    startDate: q.startDate,
    symbol: q.symbol,
    slug: q.slug,
  }
}
