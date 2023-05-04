import create from 'zustand'

import { IUserQuestSubmission } from 'services/userQuestSubmissionService'
import { IMeta } from 'services/types/pagination'

type StoreType = {
  list: IUserQuestSubmission[]
  setList: (data: IUserQuestSubmission[]) => void
  meta: IMeta | undefined
  setMeta: (data: IMeta | undefined) => void
  clearStore: () => void
}

const initialState = {
  list: [],
  meta: undefined,
}

export const userQuestSubmissionStore = create<StoreType>((set, get) => ({
  ...initialState,
  setList: (data) => set({ list: data }),
  setMeta: (data) => set({ meta: data }),
  clearStore: () => set({ ...initialState }),
}))
