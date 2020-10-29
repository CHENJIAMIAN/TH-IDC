/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/report-manage',
  component: Layout,
  redirect: '/report-manage/alert',
  name: '报表管理',
  meta: {
    title: '报表管理',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'alert',
      component: () => import('@/views/report-manage/alert/index'),
      name: 'alert',
      meta: { title: '告警报表', icon: 'icon' }
    },
    {
      path: 'assets',
      component: () => import('@/views/report-manage/assets/index'),
      name: 'assets',
      meta: { title: '资产报表', icon: 'icon' }
    },
    {
      path: 'capacity',
      component: () => import('@/views/report-manage/capacity/index'),
      name: 'capacity',
      meta: { title: '容量报表', icon: 'icon' }
    },
    {
      path: 'dynamic-environment-system-info',
      component: () => import('@/views/report-manage/dynamic-environment-system-info/index'),
      name: 'dynamic-environment-system-info',
      meta: { title: '动力环境系统信息报表', icon: 'icon' }
    },
    {
      path: 'energy-consump',
      component: () => import('@/views/report-manage/energy-consump/index'),
      name: 'energy-consump',
      meta: { title: '能耗报表', icon: 'icon' }
    },
    {
      path: 'history-data',
      component: () => import('@/views/report-manage/history-data/index'),
      name: 'history-data',
      meta: { title: '历史数据报表', icon: 'icon' }
    },
    {
      path: 'system',
      component: () => import('@/views/report-manage/system/index'),
      name: 'system',
      meta: { title: '系统报表', icon: 'icon' }
    },
    {
      path: 'work-order-service',
      component: () => import('@/views/report-manage/work-order-service/index'),
      name: 'work-order-service',
      meta: { title: '工单服务类报表', icon: 'icon' }
    }
  ]
}