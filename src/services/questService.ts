import { axiosInstance } from 'lib/axiosInstance'
import { IPaginationMeta } from './types/pagination'
import {
  ListMyUserQuestSubmissionStatusByUserIdResponseItem,
  QuestConditionField,
  QuestConditionMetaData,
  QuestConditionValues,
  QuestReward,
  UserQuestSubmissionResponse,
} from './types/quest'

export interface IQuestCondition {
  seq: number
  title: string
  description: string
  type: QuestConditionValues
  metaData?: QuestConditionMetaData
  fields: QuestConditionField[]
  check?: boolean
}

export interface QuestResponseItem {
  id: number
  name: string
  description: string
  questRewards: QuestReward[]
  questPreConditions: any[] //TODO:
  questConditions: IQuestCondition[] //TODO:
  projectId: number
  startDate: Date | null
  endDate: Date | null
  projectPoint: number
  platformPoint: number
  maxParticipant: number | null
  participant: number
  isAutomated: boolean
  isActive: boolean
  projectName: string
  projectImageUrl: string | null
  projectPointImageUrl: string | null
  projectTwitter: string | null
  projectWebsite: string | null
  projectDiscord: string | null
  projectDescription: string | null
  projectSupply?: number
  projectMintPrice?: string
  projectMintingDate?: string
  symbol: string
  slug?: string
}

export enum QuestStatus {
  Active = 'active',
  Completed = 'completed',
  Missed = 'missed',
}

interface ListQuestQuery {
  page?: number
  limit?: number
  status?: QuestStatus
}
class QuestService {
  listQuest = async (q: ListQuestQuery) => {
    const params = new URLSearchParams()
    if (q.page) {
      params.set('page', `${q.page}`)
    }
    if (q.limit) {
      params.set('limit', `${q.limit}`)
    }
    if (q.status) {
      params.set('status', `${q.status}`)
    }

    const { data } = await axiosInstance.get<
      IPaginationMeta<QuestResponseItem>
    >(`/v1/quest?${params.toString()}`)
    return data
  }

  getQuest = async (id: number) => {
    const { data } = await axiosInstance.get<QuestResponseItem>(
      `/v1/quest/${id}`,
    )
    return data
  }

  getQuestBySlug = async (slug: string) => {
    const { data } = await axiosInstance.get<QuestResponseItem>(
      `/v1/quest/slug/${slug}`,
    )
    return data
  }

  verifyQuest = async (id: number, meta) => {
    const userData = JSON.parse(localStorage.getItem('user:data'))
    const accessToken = userData.access_token as string
    const { data } = await axiosInstance.post<QuestResponseItem>(
      `/v1/quest-verifying/condition/quest/${id}`,
      {
        meta,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return data
  }

  getMyUserSubmissionQuest = async (questID: number) => {
    const userData = JSON.parse(localStorage.getItem('user:data'))
    const accessToken = userData.access_token as string
    const { data } = await axiosInstance.get<UserQuestSubmissionResponse>(
      `/v1/user-quest-submission/my-submission/${questID}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return data
  }

  listMyUserSubmissionQuestStatus = async (questIds: number[]) => {
    const userData = JSON.parse(localStorage.getItem('user:data'))
    const accessToken = userData.access_token as string
    const payload = {
      questIds: questIds,
    }
    const { data } = await axiosInstance.post<
      ListMyUserQuestSubmissionStatusByUserIdResponseItem[]
    >(`/v1/user-quest-submission/my-submission/list-quest-status`, payload, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    return data
  }
}

export const questService = new QuestService()
