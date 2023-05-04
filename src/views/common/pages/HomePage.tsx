import { useAuthData } from 'lib/AuthDataContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { localStorageService } from 'services/localStorageService'
import { dialogStore } from 'stores/dialogStore'
import { userService } from '../../../services/userService'
import { Layout } from '../Layout'

export const HomePage = () => {
  // TODO: move to other page
  const { setAuthData } = useAuthData()

  const router = useRouter()
  useEffect(() => {
    processAction()
  }, [])

  const getUpdatedUserAndRedirect = async (path: string) => {
    const newUserData = await userService.getUpdatedUserData()
    setAuthData((prevAuthData) => ({ ...prevAuthData, user: newUserData }))
    localStorageService.updateNewUserDataToLocalStorage(newUserData)
    router.push(path)
  }

  const processAction = async () => {
    try {
      const query = new URLSearchParams(window.location.search)

      const sync = query.get('sync')
      if (sync === null) {
        router.push('quest-board')
        return
      }

      if (sync === 'discord' && query.get('code')) {
        const path = `${sessionStorage.getItem('redirect')}`
        // sessionStorage.setItem('redirect', null)
        const code = query.get('code')
        const res = await userService.syncDiscord(code)
        if (res) {
          await getUpdatedUserAndRedirect(path)
        } else {
          dialogStore.open('Please try again later in 10 min.', {
            title: 'Sync Discord fail',
          })
          router.push(path)
        }
      } else if (sync === 'twitter' && query.get('code')) {
        const path = `${sessionStorage.getItem('redirect')}`
        // sessionStorage.setItem('redirect', null)
        const code = query.get('code')
        const res = await userService.syncTwitter(code)
        if (res) {
          await getUpdatedUserAndRedirect(path)
        } else {
          dialogStore.open('Please try again later in 10 min.', {
            title: 'Sync Twitter fail',
          })
          router.push(path)
        }
      } else {
        alert('error')
      }
    } catch (err) {}
  }

  return <Layout></Layout>
}
