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
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // 跳到驾驶舱单页
    if (to.path === '/BIM') {
      next();
    }
    else if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 控制开不开sidebar
      store.commit("app/OPEN_SIDE");
      if (to.path.includes("/device-monitor")) {
        if (to.path.includes("/room")) {
          store.commit("app/CLOSE_SIDE");
        }
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
        next();
      } else {
        store.dispatch("app/openSideBar", { withoutAnimation: false });
        next();
      }
      //确定用户是否已通过getInfo获得其权限角色 
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          //注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor'] 
          const { roles } = await store.dispatch('user/getInfo')

          //根据角色生成可访问的路线图 
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

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
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
