<template>
   <div>Pinia state: {{  Test.current }} -- {{ Test.name }}</div>
   <div>响应式解构: {{  current }} -- {{ name }}</div>
   <button @click="change">$patch 方法：改变数据</button>
  <br/>
   <div>Pinia actions: {{  Test.user.name }} -- {{  Test.user.age }}</div>
   <button @click="staticChange">同步改变数据</button>
   <br>
   <div>Pinia actions:
    <ul>
      <li v-for="item in Test.data" :key="item.id">{{ item.desc }}</li>
    </ul>
   </div>
   <button @click="asyncChange">异步改变数据</button>

   <br>
   <div>Pinia getters: {{ Test.newName }}</div>

   <br>
   <button @click="Test.$reset()">重置数据</button>
</template>

<script setup lang='ts'>
import { useTestStore } from './store'
import { storeToRefs } from 'pinia'

const Test = useTestStore()

const change = () => {
  // #1、直接修改值
  // Test.current++

  // #2、通过 $patch 传对象
  Test.$patch({
    current: 1222,
    name: '改变了'
  })

  // #3、通过 $patch 传函数 【推荐】
  // Test.$patch((state) => {
  //   state.current++
  // })

  // #4、通过 $state 覆盖所有值
  // Test.$state = {
  //   current: 2222,
  //   name: '$state'
  // }

  // 5、通过 action 【推荐】
  // Test.setCurrent(999)
}

// 数据解构
const { current, name} = storeToRefs(Test)


const staticChange = () => {
  Test.setUser()
}

const asyncChange = () => {
  Test.getData()
}

// 监听数据改变
Test.$subscribe((args, state) => {
  console.log('--- $subscribe ----');
  console.log('==> ', args);
  console.log('==> ', state);
})

Test.$onAction((args) => {
  args.after(() => {
    console.log('after');
  })
  console.log('--- $onAction ----');
  console.log(args);

})
</script>

<style lang='scss' scoped>

</style>
