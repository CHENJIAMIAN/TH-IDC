/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/device-monitor',
  component: Layout,
  redirect: '/device-monitor/1F/menu1-1',
  name: '设备监控',
  meta: {
    title: '设备监控',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: '1F',
      component: () => import('@/views/device-monitor/1F/index'), // Parent router-view
      name: '1F',
      meta: { title: '1F' },
      redirect: '/device-monitor/1F/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/device-monitor/1F/menu1-1'),
          name: '高压配电室A',
          meta: { title: '高压配电室A' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/device-monitor/1F/menu1-2'),
          name: '高压配电室2',
          redirect: '/device-monitor/1F/menu1-2/menu1-2-1',
          meta: { title: '高压配电室2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/device-monitor/1F/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/device-monitor/1F/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/device-monitor/1F/menu1-3'),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/device-monitor/2F/index'),
      meta: { title: 'Menu 2' }
    }
  ]
}
