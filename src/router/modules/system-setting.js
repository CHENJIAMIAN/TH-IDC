/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/system-setting',
  component: Layout,
  redirect: '/system-setting/organization/department-manage',
  name: '系统设置',
  meta: {
    title: '系统设置',
    icon: 'nested',
    affix: true,
    onlyShowChild:true
  },
  children: [
    {
      path: 'organization',
      component: () => import('@/views/system-setting/index'),
      name: 'organization',
      meta: { title: '组织架构', icon: 'icon' },
      children: [
        {
          path: 'department-manage',
          component: () => import('@/views/system-setting/department-manage/index'),
          name: 'department-manage',
          meta: { title: '部门管理', icon: 'icon' }
        },
        {
          path: 'menu-manage',
          component: () => import('@/views/system-setting/menu-manage/index'),
          name: 'menu-manage',
          meta: { title: '菜单管理', icon: 'icon' }
        },
        {
          path: 'auth-manage',
          component: () => import('@/views/system-setting/auth-manage/index'),
          name: 'auth-manage',
          meta: { title: '权限管理', icon: 'icon' }
        },
        {
          path: 'role-manage',
          component: () => import('@/views/system-setting/role-manage/index'),
          name: 'role-manage',
          meta: { title: '角色管理', icon: 'icon' }
        },
        {
          path: 'user-manage',
          component: () => import('@/views/system-setting/user-manage/index'),
          name: 'user-manage',
          meta: { title: '用户管理', icon: 'icon' }
        },
      ]
    },
    {
      path: 'system-operation',
      component: () => import('@/views/system-setting/index'),
      name: 'system-operation',
      meta: { title: '系统运维', icon: 'icon' },
      children: [
        {
          path: 'system-log',
          component: () => import('@/views/system-setting/system-log/index'),
          name: 'system-log',
          meta: { title: '系统日志', icon: 'icon' }
        },
      ]
    },
  ],
}
