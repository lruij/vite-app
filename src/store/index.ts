import { defineStore } from 'pinia'
import { Names } from './store-name'


// 同步
type User = {
  name: string,
  age: number
}

const result: User = {
  name: '同步',
  age: 18
}

// 异步
type List = {
  id: number,
  desc: string
}

const listData: List[] = [
  {
    id: 1,
    desc: '第一行'
  }
]


const getListData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listData)
    }, 2000)
  })
}


export const useTestStore = defineStore(Names.TEST, {
  state: () => {
    return {
      current: 1,
      name: 'Test',
      user: <User>{},
      data: <List[]>[]
    }
  },
  // computed 修饰一些值
  getters: {
    newName():string {
      return `$---${this.name}`
    }
  },
  // methods 支持同步和异步 提交 state
  actions: {
    setCurrent (num: number) {
      this.current = num
    },

    setUser() {
      this.user = result
    },

    async getData() {
      this.data = await getListData() as List[]
      this.updateName('数据获取成功')
    },

    updateName(name: string) {
      this.name = name
    }
  }
})

export const useBaseStore = defineStore(Names.BASE, {
  state: () => {
    return {
      baseCurrent: 0,
      baseName: 'base',
      baseUser: <User>{},
      data: <List[]>[]
    }
  },

  actions: {
  },

  getters: {

  }
})
