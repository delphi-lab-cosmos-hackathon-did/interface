import { makeAutoObservable } from 'mobx'

class ExampleStore {
  constructor() {
    makeAutoObservable(this)
  }

  name = 'สมศักดิ์ จงรักเป็ด'

  setName = (name: string) => {
    this.name = name
  }
}

export const exampleStore = new ExampleStore()
