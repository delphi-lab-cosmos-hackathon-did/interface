import { axiosInstance } from 'lib/axiosInstance'

export interface IUserProjectPoint {
  userId: string
  projectId: number
  totalPoint: number
  usedPoint: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  project?: IProject
}

export interface IProject {
  id: number
  name: string
  image: string
  description: string
  twitter?: string
  discord?: string
  website?: string
  symbol?: string
  rewards?: any[]
  projectAdmin?: any[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

class UserProjectPointService {
  async getUserProjectPoint() {
    const { data } = await axiosInstance.get(`/v1/user-project-point`, {
      params: {
        limit: 999,
        page: 1,
      },
    })
    return data?.items as IUserProjectPoint[]
  }
}

export const userProjectPointService = new UserProjectPointService()
