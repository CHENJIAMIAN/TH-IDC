/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/resource-manage',
  component: Layout,
  redirect: '/resource-manage/floor-manage',
  name: '资源管理',
  meta: {
    title: '资源管理',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'floor-manage',
      component: () => import('@/views/resource-manage/floor-manage/index'),
      name: 'Icons',
      meta: { title: '楼层管理', icon: 'icon' }
    },
    {
      path: 'room-manage',
      component: () => import('@/views/resource-manage/room-manage/index'),
      name: 'Icons',
      meta: { title: '房间管理', icon: 'icon' }
    },
    {
      path: 'device-group-manage',
      component: () => import('@/views/resource-manage/device-group-manage/index'),
      name: 'Icons',
      meta: { title: '设备组管理', icon: 'icon' }
    },
    {
      path: 'device-manage',
      component: () => import('@/views/resource-manage/device-manage/index'),
      name: 'Icons',
      meta: { title: '设备管理', icon: 'icon' }
    },
    {
      path: 'measure-point-manage',
      component: () => import('@/views/resource-manage/measure-point-manage/index'),
      name: 'Icons',
      meta: { title: '测点管理', icon: 'icon' }
    },

  ]
}