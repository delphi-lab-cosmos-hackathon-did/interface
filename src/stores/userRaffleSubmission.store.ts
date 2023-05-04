import create from 'zustand'

import { IUserRaffleSubmission } from 'services/userRaffleSubmissionService'
import { IMeta } from 'services/types/pagination'

type StoreType = {
  list: IUserRaffleSubmission[]
  setList: (data: IUserRaffleSubmission[]) => void
  meta: IMeta | undefined
  setMeta: (data: IMeta | undefined) => void
  clearStore: () => void
}

const initialState = {
  list: [],
  meta: undefined,
}

export const userRaffleSubmissionStore = create<StoreType>((set, get) => ({
  ...initialState,
  setList: (data) => set({ list: data }),
  setMeta: (data) => set({ meta: data }),
  clearStore: () => set({ ...initialState }),
}))
