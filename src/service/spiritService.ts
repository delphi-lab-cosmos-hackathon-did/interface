import { Axios } from 'axios'
import { axiosInstance } from '../lib/axiosInstance'

class SpiritService {
  private axios: Axios

  constructor() {
    this.axios = axiosInstance
  }

  getSpirit = async ({ address }: { address: string }) => {
    const response = await this.axios.get(
      `/details/osmosis/osmosis-1/${address}`,
    )
    return response?.data
  }
}

export const spiritService = new SpiritService()
