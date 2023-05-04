import axios, { AxiosInstance } from 'axios'
import { axiosInstance } from 'lib/axiosInstance'
import { IPaginationMeta } from './types/pagination'
import {
  QuestConditionField,
  QuestConditionMetaData,
  QuestConditionValues,
  QuestPreCondition,
  QuestReward,
  UserQuestSubmissionResponse,
  UserRaffleSubmissionResponse,
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

export interface RaffleResponseItem {
  id: number
  name: string
  description: string
  questRewards: QuestReward[]
  questPreConditions: QuestPreCondition[]
  questConditions: IQuestCondition[]
  projectId: number
  startDate: Date | null
  endDate: Date | null
  projectPoint: number
  platformPoint: number
  limitParticipant: number | null
  participant: number
  isAutomated: boolean
  isActive: boolean
  slug: string
  projectName: string
  projectSymbol: string
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
  winnerTitle: string
  winnerMessage: string
  nonWinnerTitle: string
  nonWinnerMessage: string
}

export enum RaffleStatus {
  Active = 'active',
  Completed = 'completed',
  Missed = 'missed',
}

interface ListQuery {
  page?: number
  limit?: number
  status?: RaffleStatus
}
class RaffleService {
  private axiosInstance: AxiosInstance
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }
  listRaffle = async (q: ListQuery) => {
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

    const { data } = await this.axiosInstance.get<
      IPaginationMeta<RaffleResponseItem>
    >(`/v1/raffle?${params.toString()}`)
    return data
  }

  getRaffleBySlug = async (slug: string) => {
    const { data } = await this.axiosInstance.get<RaffleResponseItem>(
      `/v1/raffle/slug/${slug}`,
    )
    return data
  }

  verifyRaffle = async (id: number) => {
    const userData = JSON.parse(localStorage.getItem('user:data'))
    const accessToken = userData.access_token as string
    const { data } = await this.axiosInstance.get<RaffleResponseItem>(
      `/v1/quest-verifying/condition/raffle/${id}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return data
  }

  getMyUserSubmissionRaffle = async (raffleId: number) => {
    const userData = JSON.parse(localStorage.getItem('user:data'))
    const accessToken = userData.access_token as string
    const { data } = await this.axiosInstance.get<UserRaffleSubmissionResponse>(
      `/v1/user-raffle-submission/my-submission/${raffleId}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return data
  }
}

export const raffleService = new RaffleService(axiosInstance)
const serverAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
export const raffleSSRService = new RaffleService(serverAxiosInstance)
