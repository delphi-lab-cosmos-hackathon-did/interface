import { appConstants } from 'constants/appConstants'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { localStorageService } from 'services/localStorageService'
import { userService } from 'services/userService'
import { AuthData } from './types/authData'

interface AuthDataContextInterface {
  isLogin: boolean
  walletAddress: string
  authData: AuthData
  setAuthData: React.Dispatch<React.SetStateAction<AuthData>>
}

const defaultAuthData = {
  access_token: '',
  user: {
    address: '',
    totalPlatformPoint: 0,
    usedPlatformPoint: 0,
    metaData: {},
  },
}

export const AuthDataContext = React.createContext<AuthDataContextInterface>({
  isLogin: false,
  walletAddress: '',
  authData: undefined,
  setAuthData: (data: AuthData) => null,
})

export const useAuthData = () => useContext(AuthDataContext)

export const AuthDataProvider = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>(defaultAuthData)

  useEffect(() => {
    const localStorageAuthData: AuthData = JSON.parse(
      localStorage.getItem(appConstants.USER_DATA_LOCAL_STORAGE_KEY),
    )
    if (localStorageAuthData) {
      setAuthData(localStorageAuthData)
    }
  }, [])

  const isLogin = useMemo(() => {
    return !!authData?.access_token
  }, [authData])

  const walletAddress = useMemo(() => {
    return authData?.user?.address ?? ''
  }, [authData])

  const fetchUpdatedUserData = async () => {
    const newUserData = await userService.getUpdatedUserData()
    setAuthData((prevAuthData) => ({ ...prevAuthData, user: newUserData }))
    localStorageService.updateNewUserDataToLocalStorage(newUserData)
  }

  useEffect(() => {
    if (isLogin) {
      fetchUpdatedUserData()
    }
  }, [isLogin, setAuthData])

  return (
    <AuthDataContext.Provider
      value={{ isLogin, walletAddress, authData, setAuthData }}
    >
      {children}
    </AuthDataContext.Provider>
  )
}
