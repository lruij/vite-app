import { createApp, toRaw } from 'vue'
import { createPinia, PiniaPluginContext } from 'pinia'

import './style.css'
import App from './App.vue'


type Options = {
  key?: string
}

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const __piniaKey__: string = 'lruij'

const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    console.log(context);

    const { store } = context

    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
    console.log('getStorage data: ',data);


    store.$subscribe(() => {
      console.log('change');
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
    })
    console.log('store', store)
    
    return {
      ...data
    }
  }
}

const pinia = createPinia()

pinia.use(piniaPlugin({
  key: 'pinia'
}))


let app = createApp(App)

app.use(pinia)
app.mount('#app')
