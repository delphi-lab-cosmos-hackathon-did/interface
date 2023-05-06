import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://delphi-lab-hackathon-api-h3giweexeq-as.a.run.app/',
})

export { axiosInstance }
