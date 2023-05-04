import { axiosInstance } from 'lib/axiosInstance'
import { UserData } from 'lib/types/authData'
import { IQuestCondition, QuestResponseItem } from './questService'
import { IPaginationMeta } from './types/pagination'
import { UserQuestSubmissionStatus } from './types/quest'

export interface IQueryUserQuestSubmission {
  questId?: number
  orderBy?: string
  status?: UserQuestSubmissionStatus
  sort?: 'ASC' | 'DESC'
  limit?: number
  page?: number
}

export interface IUserQuestSubmission {
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

class UserQuestSubmissionService {
  async getUserQuestSubmission(status: string) {
    const { data } = await axiosInstance.get<
      IPaginationMeta<QuestResponseItem>
    >(`/v1/user-quest-submission/quest-of-user/`, {
      params: {
        status,
        limit: 100,
        page: 1,
      },
    })
    return data
  }

  async getAllUserQuestSubmission(query: IQueryUserQuestSubmission) {
    const { data } = await axiosInstance.get<
      IPaginationMeta<IUserQuestSubmission>
    >(`/v1/user-quest-submission`, {
      params: query,
    })
    return data
  }
}

export const userQuestSubmissionService = new UserQuestSubmissionService()
