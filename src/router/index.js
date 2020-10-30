import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import deviceMonitorRouter from './modules/device-monitor'
import systemSettingRouter from './modules/system-setting'
import resourceManageRouter from './modules/resource-manage'
import reportManageRouter from './modules/report-manage'
import engineerConfigRouter from './modules/engineer-config'

/**
 *注意：子菜单仅在路由children.length> = 1时出现
 *详细信息请参见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                 *隐藏：如果设置为true，则为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow: true             *alwaysShow：如果设置为true，则将始终显示根菜单
 *                              *如果未设置alwaysShow，则当项具有多个子路线时，
 *                              *它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect         *redirect：noRedirect如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'           *名称：“ router-name”（路由器名称），该名称由<keep-alive>使用（必须设置！！！）
 * meta : {*meta：{
 roles: ['admin','editor']      角色：['admin'，'editor']控制页面角色（您可以设置多个角色）
 title: 'title'                 title：标题显示在侧边栏和面包屑中的名称（推荐集）
 icon: 'svg-name'/'el-icon-x'   图标：'svg-name'/'el-icon-x'图标显示在侧栏中
 noCache: true                  noCache：如果设置为true，则不缓存页面（默认为false）
 affix: true                    affix：true如果设置为true，标签将粘贴在tags-view中
 breadcrumb: false              面包屑：如果设置为false，则该项将隐藏在面包屑中（默认值为true）
 activeMenu: '/example/list'    activeMenu：如果设置了路径，则为“ /example /list”，边栏将突出显示您设置的路径
  }
 */


/**
 *constantRoutes
 *没有权限要求的基本页面
 *可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    // redirect: '/device-monitor',
    redirect: '/system-setting',
    // children: [
    //   {
    //     path: 'nested',
    //     component: () => import('@/views/index2d/index'),
    //     name: 'nested',
    //     meta: { title: 'nested', icon: 'dashboard', affix: true }
    //   }
    // ]
  },
]

/**
 *asyncRoutes
 *需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  /**当您的路由映射表太长时，您可以将其拆分为小模块**/
  {
    path: '/Cockpit',
    name: "驾驶舱",
    component: Layout,
    beforeEnter: (to, from, next) => {
      debugger
    },
    meta: {
      title: '驾驶舱',
      icon: 'nested',
      affix: true
    }
  },
  deviceMonitorRouter,
  reportManageRouter,
  systemSettingRouter,
  engineerConfigRouter,
  resourceManageRouter,
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
