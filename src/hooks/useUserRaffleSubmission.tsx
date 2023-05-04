import { useMemo } from 'react'
import { UserQuestSubmissionStatus } from 'services/types/quest'
import { userRaffleSubmissionService } from 'services/userRaffleSubmissionService'
import { userRaffleSubmissionStore } from 'stores/userRaffleSubmission.store'

const useUserRaffleSubmission = () => {
  const { setList, list, clearStore, meta, setMeta } =
    userRaffleSubmissionStore()

  const fetchData = async (raffleId: number, limit: number) => {
    try {
      const res = await userRaffleSubmissionService.getAllUserRaffleSubmission({
        raffleId,
        limit,
        status: UserQuestSubmissionStatus.APPROVE,
      })

      if (res) {
        setMeta(res?.meta)
        setList(res?.items)
      }
    } catch (error) {}
  }

  const totalItems = useMemo(() => {
    return meta?.totalItems || 0
  }, [meta])

  const moreItem = useMemo(() => {
    return meta?.totalItems - meta?.itemsPerPage || 0
  }, [meta])

  return { fetchData, list, clearStore, meta, totalItems, moreItem }
}

export default useUserRaffleSubmission
