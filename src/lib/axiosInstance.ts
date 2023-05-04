import axios from 'axios'
import { appConstants } from 'constants/appConstants'
// import { firebaseApp } from './firebaseApp'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Token injector
axiosInstance.interceptors.request.use(async (config) => {
  const userData = JSON.parse(
    localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
  )

  const accessToken = userData?.access_token
  if (accessToken) {
    config.headers = {
      authorization: `Bearer ${accessToken}`,
      ...config.headers,
    }
  }

  return config
})

// Auth guards
// axiosInstance.interceptors.response.use(null, (error) => {
//   if (error.response && error.response.status === 401) {
//     firebaseApp.auth().signOut()
//   }
//   return Promise.reject(error)
// })

export { axiosInstance }
