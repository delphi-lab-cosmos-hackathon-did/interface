import { appConstants } from 'constants/appConstants'
import { useAuthData } from 'lib/AuthDataContext'
import { AuthData, UserData } from 'lib/types/authData'

class LocalStorageService {
  updateNewUserDataToLocalStorage(newUserData: UserData) {
    const localStorageAuthData: AuthData = JSON.parse(
      localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
    )
    localStorage.setItem(
      appConstants.USER_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify({ ...localStorageAuthData, user: newUserData }),
    )
  }
}

export const localStorageService = new LocalStorageService()
