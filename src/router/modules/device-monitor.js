/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import store from '@/store'

export default {
  path: '/device-monitor',
  component: Layout,
  redirect: '/device-monitor/index',
  name: '设备监控',
  meta: {
    title: '设备监控',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/device-monitor/index'),
      meta: { title: '楼层' }
    },
    {
      path: 'floor/:floorId/:floorName',
      component: () => import('@/views/device-monitor/floor/index'),
      name: 'floor',
      meta: { title: '层数' },
      children: [
        {
          path: 'room/:roomId/:roomName',
          component: () => import('@/views/device-monitor/floor/room/index.vue'),
          name: 'room',
          meta: { title: '房间' },
          children: [
            {
              path: 'device-group/:deviceGroupId/:deviceGroupName',
              component: () => import('@/views/device-monitor/floor/room/device-group/index.vue'),
              name: 'device-group',
              meta: { title: '设备组' }
            },
          ]
        },
      ]
    }
  ]
}
