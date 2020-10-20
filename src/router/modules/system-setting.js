/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/system-setting',
  component: Layout,
  redirect: '/system-setting/user-manage',
  name: '系统设置',
  meta: {
    title: '系统设置',
    icon: 'nested',
    affix: true
  },
  children: [
    {
      path: 'department--manage',
      component: () => import('@/views/system-setting/department-manage/index'),
      name: 'Icons',
      meta: { title: '部门管理', icon: 'icon' }
    },
    {
      path: 'menu-auth-manage',
      component: () => import('@/views/system-setting/menu-auth-manage/index'),
      name: 'Icons',
      meta: { title: '菜单权限管理', icon: 'icon' }
    },
    {
      path: 'role-manage',
      component: () => import('@/views/system-setting/role-manage/index'),
      name: 'Icons',
      meta: { title: '角色管理', icon: 'icon' }
    },
    {
      path: 'user-manage',
      component: () => import('@/views/system-setting/user-manage/index'),
      name: 'Icons',
      meta: { title: '用户管理', icon: 'icon' }
    },
    {
      path: 'system-log',
      component: () => import('@/views/system-setting/system-log/index'),
      name: 'Icons',
      meta: { title: '系统日志', icon: 'icon' }
    },
  ]
}
