import { appConstants } from 'constants/appConstants'
import { axiosInstance } from 'lib/axiosInstance'
import { UserData } from 'lib/types/authData'

class UserService {
  async getUpdatedUserData(): Promise<UserData> {
    const { data } = await axiosInstance.get<UserData>('/v1/user/profile', {})
    return data
  }

  async checkSyncTwitter() {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const { data } = await axiosInstance.get('/v1/user/twitter/check-sync', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async syncTwitter(code: string) {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const body = { code }
      const { data } = await axiosInstance.post('/v1/user/twitter/sync', body, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async updateEmail(email: string) {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const body = { email }
      const { data } = await axiosInstance.put('/v1/user/email', body, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      const _e = e as Error
      throw _e
    }
  }

  async logoutTwitter() {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const { data } = await axiosInstance.get('/v1/user/twitter/logout', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async logoutDiscord() {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const { data } = await axiosInstance.get('/v1/user/discord/logout', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async syncDiscord(code: string) {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const body = { code }
      const { data } = await axiosInstance.post('/v1/user/discord/sync', body, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async checkSyncDiscord() {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const { data } = await axiosInstance.get('/v1/user/discord/check-sync', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
    return null
  }

  async getUserStatus() {
    try {
      const userData = JSON.parse(
        localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
      )
      const accessToken = userData.access_token as string
      const { data } = await axiosInstance.get('/v1/user/status', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

export const userService = new UserService()
