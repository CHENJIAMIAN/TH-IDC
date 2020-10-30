/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/engineer-config',
  component: Layout,
  redirect: '/engineer-config/alert-level',
  name: '工程配置',
  meta: {
    title: '工程配置',
    icon: 'nested',
    affix: true
  },

  children: [
    {
      path: 'alert-level',
      component: () => import('@/views/engineer-config/alert-level/index'),
      name: 'alert-level',
      meta: { title: '告警等级', icon: 'icon' }
    },
    {
      path: 'alert-rule',
      component: () => import('@/views/engineer-config/alert-rule/index'),
      name: 'alert-rule',
      meta: { title: '告警规则', icon: 'icon' }
    },
    {
      path: 'alert-notify',
      component: () => import('@/views/engineer-config/alert-notify/index'),
      name: 'alert-notify',
      meta: { title: '告警通知', icon: 'icon' }
    },
    {
      path: 'alert-mask-setting',
      component: () => import('@/views/engineer-config/alert-mask-setting/index'),
      name: 'alert-mask-setting',
      meta: { title: '屏蔽设置', icon: 'icon' }
    },
    {
      path: 'arrange-work-manage',
      component: () => import('@/views/engineer-config/arrange-work-manage/index'),
      name: 'arrange-work-manage',
      meta: { title: '排班管理', icon: 'icon' }
    },
  ]
}
