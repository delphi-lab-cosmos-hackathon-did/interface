import { axiosInstance } from 'lib/axiosInstance'

class ExampleService {
  get = async () => {
    const { data } = await axiosInstance.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    return data
  }
}

export const exampleService = new ExampleService()
