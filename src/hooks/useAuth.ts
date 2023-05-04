import { Routes } from 'constants/Routes'
// import { firebaseApp } from 'lib/firebaseApp'
import { includes, isNil } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { exampleService } from 'services/exampleService'
import { exampleStore } from 'stores/exampleStore'
import { loadingStore } from 'stores/loadingStore'

export const useAuth = () => {
  const router = useRouter()
  const [isReady, setReady] = useState(false)
  const lastUser = useRef(null)

  return { isReady: true }

  // TODO: Uncomment below to start using authentication guard

  // useEffect(() => {
  //   const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
  //     const authChanged = lastUser.current !== user
  //     const loggedIn = !isNil(user)

  //     if (authChanged) {
  //       if (user) {
  //         try {
  //           loadingStore.increase()

  //           // TODO: Query user
  //           await exampleService.get()
  //           exampleStore.setName('สมศักดิ์ จงรักเป็ด')
  //         } catch (error) {}
  //         loadingStore.decrease()
  //       }
  //     }

  //     if (loggedIn && includes(Routes.UNAUTHENTICATED_ONLY, router.pathname)) {
  //       await router.replace('/')
  //     } else if (!loggedIn && !includes(Routes.PUBLIC, router.pathname)) {
  //       await router.replace('/login')
  //     }

  //     lastUser.current = user
  //     setReady(true)
  //   })

  //   return unsubscribe
  // }, [router])

  // return { isReady }
}
