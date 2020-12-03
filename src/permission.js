import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  //开始进度条 
  NProgress.start()

  //设置页面标题 
  document.title = getPageTitle(to.meta.title)

  //确定用户是否已登录 
  const hasToken = getToken()
  
  if (hasToken) {
    // 跳到驾驶舱单页
    if (to.path === '/login') {
      //如果已登录，请重定向到主页 
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 控制开不开sidebar
      store.commit("app/OPEN_SIDE");
      if (to.path.includes("/device-monitor")) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
        if (to.path.includes("/room")) {
          store.commit("app/CLOSE_SIDE");
        }
      } else {
        store.dispatch("app/openSideBar", { withoutAnimation: false });
      }
      
      const auth = store.getters.auth && store.getters.auth.length >= 0;
      // console.log(store.getters.auth, to, from);
      if (auth) {
        next();
      } else {
        try {
          const menuListStr = localStorage.getItem('menuList');
          const menuList = JSON.parse(menuListStr);
          store.commit('user/SET_AUTH', menuList)
          //根据角色生成可访问的路线图 
          const accessRoutes = await store.dispatch('permission/generateRoutes', menuList)
          //动态添加可访问的路由 
          router.addRoutes(accessRoutes)
          //hack方法以确保addRoutes是完整的
          //设置replace：true，因此导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          debugger
          //删除令牌并转到登录页面以重新登录 
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /*没有令牌*/
    if (whiteList.indexOf(to.path) !== -1) {
      //在免费的登录白名单中，直接进入 
      next()
    } else {
      //其他无权访问的页面将重定向到登录页面。 
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
