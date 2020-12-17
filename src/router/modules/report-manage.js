/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/report-manage',
  component: Layout,
  redirect: '/report-manage/assets-statistics/floor-statistics',
  name: '报表管理',
  meta: {
    title: '报表管理',
    icon: 'img-bb',
    affix: true
  },
  children: [
    {
      path: 'assets-statistics',
      component: () => import('@/views/report-manage/index'),
      name: 'assets-statistics',
      meta: { title: '资产报表', icon: 'img-zcbb' },
      children: [
        {
          path: 'floor-statistics',
          component: () => import('@/views/report-manage/assets-statistics/floor-statistics/index.vue'),
          name: 'floor-statistics',
          meta: { title: '楼层统计', icon: 'img-lctj' }
        }, {
          path: 'classify-statistics',
          component: () => import('@/views/report-manage/assets-statistics/classify-statistics/index'),
          name: 'classify-statistics',
          meta: { title: '分类统计', icon: 'img-fl' }
        }, {
          path: 'floor-classify',
          component: () => import('@/views/report-manage/assets-statistics/floor-classify/index'),
          name: 'floor-classify',
          meta: { title: '楼层分类', icon: 'img-lcfl' }
        },
      ],
    },
    {
      path: 'alert',
      component: () => import('@/views/report-manage/index'),
      name: 'alert',
      meta: { title: '告警报表', icon: 'img-gjbb' },
      children: [
        {
          path: 'day',
          component: () => import('@/views/report-manage/alert/day/index'),
          name: 'day',
          meta: { title: '日期统计', icon: 'img-gjbb' }
        }, {
          path: 'month',
          component: () => import('@/views/report-manage/alert/month/index'),
          name: 'month',
          meta: { title: '月份统计', icon: 'img-gjbb' }
        }, {
          path: 'level',
          component: () => import('@/views/report-manage/alert/level/index'),
          name: 'level',
          meta: { title: '级别统计', icon: 'img-gjbb' }
        },
      ]
    },
    {
      path: 'history-data',
      component: () => import('@/views/report-manage/history-data/index'),
      name: 'history-data',
      meta: { title: '历史数据', icon: 'img-ls' }
    },
    {
      path: 'capacity',
      component: () => import('@/views/report-manage/capacity/index'),
      name: 'capacity',
      meta: { title: '容量报表', icon: 'img-rl' }
    },
    {
      path: 'system',
      component: () => import('@/views/report-manage/system/index'),
      name: 'system',
      meta: { title: '系统报表', icon: 'img-xt' }
    },
    {
      path: 'dynamic-environment-system-info',
      component: () => import('@/views/report-manage/dynamic-environment-system-info/index'),
      name: 'dynamic-environment-system-info',
      meta: { title: '信息报表', icon: 'img-xx' }
    },
    {
      path: 'energy-consump',
      component: () => import('@/views/report-manage/energy-consump/index'),
      name: 'energy-consump',
      meta: { title: '能耗报表', icon: 'img-nh' }
    },
    {
      path: 'work-order-service',
      component: () => import('@/views/report-manage/work-order-service/index'),
      name: 'work-order-service',
      meta: { title: '工单报表', icon: 'img-gd' }
    }
  ]
}
