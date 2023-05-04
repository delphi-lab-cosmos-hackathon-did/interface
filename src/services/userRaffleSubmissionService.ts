import { axiosInstance } from 'lib/axiosInstance'
import { UserData } from 'lib/types/authData'
import { IQuestCondition, QuestResponseItem } from './questService'
import { IPaginationMeta } from './types/pagination'
import { UserQuestSubmissionStatus } from './types/quest'

export interface IQueryUserRaffleSubmission {
  raffleId?: number
  orderBy?: string
  status?: UserQuestSubmissionStatus
  sort?: 'ASC' | 'DESC'
  limit?: number
  page?: number
}

export interface IUserRaffleSubmission {
  approvedBy?: string
  image?: string
  questConditions: IQuestCondition[]
  questId: number
  status: 'APPROVE'
  text?: string
  url?: string
  user: UserData
  userId?: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

class UserRaffleSubmissionService {
  async getUserRaffleSubmission(status: string) {
    const { data } = await axiosInstance.get<
      IPaginationMeta<QuestResponseItem>
    >(`/v1/user-raffle-submission/quest-of-user/`, {
      params: {
        status,
        limit: 100,
        page: 1,
      },
    })
    return data
  }

  async getAllUserRaffleSubmission(query: IQueryUserRaffleSubmission) {
    const { data } = await axiosInstance.get<
      IPaginationMeta<IUserRaffleSubmission>
    >(`/v1/user-raffle-submission`, {
      params: query,
    })
    return data
  }
}

export const userRaffleSubmissionService = new UserRaffleSubmissionService()
