import { useMemo } from 'react'
import { UserQuestSubmissionStatus } from 'services/types/quest'
import { userQuestSubmissionService } from 'services/userQuestSubmissionService'
import { userQuestSubmissionStore } from 'stores/userQuestSubmission.store'

const useUserQuestSubmission = () => {
  const { setList, list, clearStore, meta, setMeta } =
    userQuestSubmissionStore()

  const fetchData = async (questId: number, limit: number) => {
    try {
      const res = await userQuestSubmissionService.getAllUserQuestSubmission({
        questId,
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

export default useUserQuestSubmission
