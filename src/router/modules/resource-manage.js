/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/resource-manage',
  component: Layout,
  redirect: '/resource-manage/space-device/room-type-manage',
  name: '资产管理',
  meta: {
    title: '资产管理',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'space-device',
      component: () => import('@/views/resource-manage/index'),
      name: 'space-device',
      meta: { title: '基础类型', icon: 'icon' },
      children: [
        {
          path: 'room-type-manage',
          component: () => import('@/views/resource-manage/room-type-manage/index'),
          name: 'room-type-manage',
          meta: { title: '房间类型', icon: 'icon' }
        },
        {
          path: 'device-type-manage',
          component: () => import('@/views/resource-manage/device-type-manage/index'),
          name: 'device-type-manage',
          meta: { title: '设备类型', icon: 'icon' }
        },
        {
          path: 'measure-point-type-manage',
          component: () => import('@/views/resource-manage/measure-point-type-manage/index'),
          name: 'measure-point-type-manage',
          meta: { title: '测点类型', icon: 'icon' }
        },
      ]
    },
    {
      path: 'basic-type',
      component: () => import('@/views/resource-manage/index'),
      name: 'basic-type',
      meta: { title: '空间设备', icon: 'icon' },
      children: [
        {
          path: 'building-manage',
          component: () => import('@/views/resource-manage/building-manage/index'),
          name: 'building-manage',
          meta: { title: '楼幢管理', icon: 'icon' }
        },
        {
          path: 'floor-manage',
          component: () => import('@/views/resource-manage/floor-manage/index'),
          name: 'floor-manage',
          meta: { title: '楼层管理', icon: 'icon' }
        },
        {
          path: 'room-manage',
          component: () => import('@/views/resource-manage/room-manage/index'),
          name: 'room-manage',
          meta: { title: '房间管理', icon: 'icon' }
        },
        {
          path: 'device-group-manage',
          component: () => import('@/views/resource-manage/device-group-manage/index'),
          name: 'device-group-manage',
          meta: { title: '设备分组', icon: 'icon' }
        },
        {
          path: 'device-manage',
          component: () => import('@/views/resource-manage/device-manage/index'),
          name: 'device-manage',
          meta: { title: '设备管理', icon: 'icon' }
        },
        {
          path: 'measure-point-manage',
          component: () => import('@/views/resource-manage/measure-point-manage/index'),
          name: 'measure-point-manage',
          meta: { title: '测点管理', icon: 'icon' }
        },
      ]
    }
  ],
}
