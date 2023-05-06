import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Attribute } from '../type/spirit.interface'

const baseURL = 'https://delphi-lab-hackathon-api-h3giweexeq-as.a.run.app/'

export const useAddressInfo = () => {
  const axiosInstance = axios.create({
    baseURL,
  })
  return useCallback(async (address: string): Promise<Attribute> => {
    const { data } = await axiosInstance.post<Attribute>(
      `/details/osmosis/osmosis-1/${address}`,
    )
    return data
  }, [])
}
