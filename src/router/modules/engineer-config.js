/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/engineer-config',
  component: Layout,
  redirect: '/engineer-config/rule-manage/alert-rule',
  name: '工程配置',
  meta: {
    title: '工程配置',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'alert-config',
      component: () => import('@/views/engineer-config/alert-config'),
      name: 'alert-config',
      meta: { title: '告警配置', icon: 'icon' },
      // children: [
      //   {
      //     path: 'alert-level',
      //     component: () => import('@/views/engineer-config/alert-level/index'),
      //     name: 'alert-level',
      //     meta: { title: '告警等级', icon: 'icon' }
      //   },
      //   {
      //     path: 'alert-display',
      //     component: () => import('@/views/engineer-config/alert-display/index'),
      //     name: 'alert-display',
      //     meta: { title: '告警显示', icon: 'icon' }
      //   },
      //   {
      //     path: 'alert-mask-setting',
      //     component: () => import('@/views/engineer-config/alert-mask-setting/index'),
      //     name: 'alert-mask-setting',
      //     meta: { title: '屏蔽设置', icon: 'icon' }
      //   },
      // ]
    },
    {
      path: 'rule-manage',
      component: () => import('@/views/engineer-config/index'),
      name: 'rule-manage',
      meta: { title: '规则管理', icon: 'icon' },
      children: [
        {
          path: 'alert-notify',
          component: () => import('@/views/engineer-config/alert-notify/index'),
          name: 'alert-notify',
          meta: { title: '告警通知', icon: 'icon' }
        },
        {
          path: 'arrange-work-manage',
          component: () => import('@/views/engineer-config/arrange-work-manage/index'),
          name: 'arrange-work-manage',
          meta: { title: '排班管理', icon: 'icon' }
        },
        {
          path: 'rule-template',
          component: () => import('@/views/engineer-config/rule-template/index'),
          name: 'rule-template',
          meta: { title: '规则模板', icon: 'icon' }
        },
        {
          path: 'mail-config',
          component: () => import('@/views/engineer-config/mail-config/index'),
          name: 'mail-config',
          meta: { title: '邮箱配置', icon: 'icon' }
        },
        {
          path: 'alert-rule',
          component: () => import('@/views/engineer-config/alert-rule/index'),
          name: 'alert-rule',
          meta: { title: '告警规则', icon: 'icon' }
        },
      ]
    },
    {
      path: 'host-config',
      component: () => import('@/views/engineer-config/index'),
      name: 'host-config',
      meta: { title: '主机配置', icon: 'icon' },
      children: [
        {
          path: 'storage-config',
          component: () => import('@/views/engineer-config/storage-config/index'),
          name: 'storage-config',
          meta: { title: '存储配置', icon: 'icon' }
        },
      ]
    }
  ]


}
