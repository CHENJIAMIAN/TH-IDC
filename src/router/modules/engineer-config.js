/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/engineer-config',
  component: Layout,
  redirect: '/engineer-config/alert-config/alert-level',
  name: '工程配置',
  meta: {
    title: '工程配置',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'alert-config',
      component: () => import('@/views/engineer-config/index'),
      name: 'alert-config',
      meta: { title: '告警配置', icon: 'icon' },
      children: [
        {
          path: 'alert-level',
          component: () => import('@/views/engineer-config/alert-level/index'),
          name: 'alert-level',
          meta: { title: '告警等级', icon: 'icon' }
        },
        {
          path: 'alert-display',
          component: () => import('@/views/engineer-config/alert-display/index'),
          name: 'alert-display',
          meta: { title: '告警显示', icon: 'icon' }
        },
        {
          path: 'alert-mask-setting',
          component: () => import('@/views/engineer-config/alert-mask-setting/index'),
          name: 'alert-mask-setting',
          meta: { title: '屏蔽设置', icon: 'icon' }
        },
      ]
    },
    {
      path: 'rule-manage',
      component: () => import('@/views/engineer-config/index'),
      name: 'rule-manage',
      meta: { title: '规则管理', icon: 'icon' },
      children: [
        {
          path: 'rule-template',
          component: () => import('@/views/engineer-config/rule-template/index'),
          name: 'rule-template',
          meta: { title: '规则模板', icon: 'icon' }
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