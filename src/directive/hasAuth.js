import Vue from 'vue'
import store from '@/store'

// 用于菜单的隐藏 , 还有一个路由的屏蔽是在生成路由时控制的
const auth = value => {
  let auth
  if (typeof value === 'number') {
    auth = store.getters['permission/hasAuth'](value)
  } else {
    auth = value.some(item => {
      return store.getters['permission/hasAuth'](item)
    })
  }
  return auth
}

// 注册 v-auth 指令
Vue.directive('auth', {
  inserted: (el, binding) => {
    if (!auth(binding.value)) {
      el.remove()
    }
  }
})