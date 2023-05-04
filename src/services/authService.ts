import { axiosInstance } from 'lib/axiosInstance'

class AuthService {
  getLoginKey = async (address: string) => {
    const { data } = await axiosInstance.get(
      '/v1/auth/login-key-request',
      { params: { address } }
    )
    return data
  }

  login = async (signature: string, address: string) => {
    const { data } = await axiosInstance.post(
      '/v1/auth/login',
      { signature, address }
    )
    return data
  }
}

export const authService = new AuthService()
