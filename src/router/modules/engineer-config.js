/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/engineer-config',
  component: Layout,
  redirect: '/engineer-config/rule-manage/alert-rule',
  name: '工程配置',
  meta: {
    title: '工程配置',
    icon: 'img-gc',
    affix: true
  },
  children: [
    {
      path: 'alert-config',
      component: () => import('@/views/engineer-config/alert-config'),
      name: 'alert-config',
      meta: { title: '告警配置', icon: 'img-gj' },
      // children: [
      //   {
      //     path: 'alert-level',
      //     component: () => import('@/views/engineer-config/alert-level/index'),
      //     name: 'alert-level',
      //     meta: { title: '告警等级', icon: 'img-' }
      //   },
      //   {
      //     path: 'alert-display',
      //     component: () => import('@/views/engineer-config/alert-display/index'),
      //     name: 'alert-display',
      //     meta: { title: '告警显示', icon: 'img-' }
      //   },
      //   {
      //     path: 'alert-mask-setting',
      //     component: () => import('@/views/engineer-config/alert-mask-setting/index'),
      //     name: 'alert-mask-setting',
      //     meta: { title: '屏蔽设置', icon: 'img-' }
      //   },
      // ]
    },
    {
      path: 'channel-config',
      component: () => import('@/views/engineer-config/channel-config'),
      name: 'channel-config',
      meta: { title: '通道配置', icon: 'img-td' },
      /* 
channel-config
mailbox-config
sms-config
voice-config
wechat-config
dingding-config
      */
    },
    {
      path: 'storage-config',
      component: () => import('@/views/engineer-config/storage-config/index'),
      name: 'storage-config',
      meta: { title: '存储配置', icon: 'img-cc' }
    },
    {
      path: 'rule-manage',
      component: () => import('@/views/engineer-config/index'),
      name: 'rule-manage',
      meta: { title: '规则管理', icon: 'img-gz' },
      children: [
        {
          path: 'alert-notify',
          component: () => import('@/views/engineer-config/alert-notify/index'),
          name: 'alert-notify',
          meta: { title: '告警通知', icon: 'img-gjj' }
        },
        {
          path: 'alert-stratege',
          component: () => import('@/views/engineer-config/alert-stratege/index.vue'),
          name: 'alert-stratege',
          meta: { title: '告警策略', icon: 'img-cl' }
        },
        {
          path: 'notify-record',
          component: () => import('@/views/engineer-config/notify-record/index.vue'),
          name: 'notify-record',
          meta: { title: '通知记录', icon: 'img-jl' }
        },
        {
          path: 'arrange-work-manage',
          component: () => import('@/views/engineer-config/arrange-work-manage/index'),
          name: 'arrange-work-manage',
          meta: { title: '排班管理', icon: 'img-pb' }
        },
        // {
        //   path: 'rule-template',
        //   component: () => import('@/views/engineer-config/rule-template/index'),
        //   name: 'rule-template',
        //   meta: { title: '规则模板', icon: 'img-' }
        // },
        {
          path: 'alert-rule',
          component: () => import('@/views/engineer-config/alert-rule/index'),
          name: 'alert-rule',
          meta: { title: '告警规则', icon: 'img-gzz' }
        },
      ]
    },
    // {
    //   path: 'host-config',
    //   component: () => import('@/views/engineer-config/index'),
    //   name: 'host-config',
    //   meta: { title: '主机配置', icon: 'img-' },
    //   children: [
    //   ]
    // }
  ]


}
