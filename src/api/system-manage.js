import request from '@/utils/request'
// temp1.map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

// 获取登陆者用户信息接口
export function sysUserQueryLoginUser(data) { return request({ url: '/admin/system/sysUser/queryLoginUser', method: 'post', data }) }
// 登陆者修改自己用户账号信息接口
export function sysUserEditSelf(data) { return request({ url: '/admin/system/sysUser/editSelf', method: 'post', data }) }
//修改用户密码
export function sysUserUpdatePassword(data) { return request({ url: '/admin/system/sysUser/updatePassword', method: 'post', data }) }
//获取用户信息接口
export function sysUserQueryById(data) { return request({ url: '/admin/system/sysUser/queryById', method: 'post', data }) }
//获取所有角色接口
export function sysRoleListAll(data) { return request({ url: '/admin/system/sysRole/listAll', method: 'post', data }) }
//获取所有菜单接口
export function sysMenuListAll(data) { return request({ url: '/admin/system/sysMenu/listAll', method: 'post', data }) }
//获取日志详情接口
export function sysLogQueryById(data) { return request({ url: '/admin/system/sysLog/queryById', method: 'post', data }) }
//获取操作日志列表接口
export function sysLogListByPage(data) { return request({ url: '/admin/system/sysLog/listByPage', method: 'post', data }) }
//删除用户接口
export function sysUserDelete(data) { return request({ url: '/admin/system/sysUser/delete', method: 'post', data }) }
//修改用户接口
export function sysUserEdit(data) { return request({ url: '/admin/system/sysUser/edit', method: 'post', data }) }
//新增用户接口
export function sysUserAdd(data) { return request({ url: '/admin/system/sysUser/add', method: 'post', data }) }
//获取用户列表接口（带分页功能）
export function sysUserListByPage(data) { return request({ url: '/admin/system/sysUser/listByPage', method: 'post', data }) }
//删除角色接口
export function sysRoleDelete(data) { return request({ url: '/admin/system/sysRole/delete', method: 'post', data }) }
//修改角色接口
export function sysRoleEdit(data) { return request({ url: '/admin/system/sysRole/edit', method: 'post', data }) }
//新增角色接口
export function sysRoleAdd(data) { return request({ url: '/admin/system/sysRole/add', method: 'post', data }) }
//获取角色列表接口（带分页功能）
export function sysRoleListByPage(data) { return request({ url: '/admin/system/sysRole/listByPage', method: 'post', data }) }
//获取角色信息接口
export function sysRoleQueryById(data) { return request({ url: '/admin/system/sysRole/queryById', method: 'post', data }) }
//删除菜单接口
export function sysMenuDelete(data) { return request({ url: '/admin/system/sysMenu/delete', method: 'post', data }) }
//修改菜单接口
export function sysMenuEdit(data) { return request({ url: '/admin/system/sysMenu/edit', method: 'post', data }) }
//新增菜单接口
export function sysMenuAdd(data) { return request({ url: '/admin/system/sysMenu/add', method: 'post', data }) }
//获取菜单列表接口（带分页功能）
export function sysMenuListByPage(data) { return request({ url: '/admin/system/sysMenu/listByPage', method: 'post', data }) }
//获取菜单信息接口
export function sysMenuQueryById(data) { return request({ url: '/admin/system/sysMenu/queryById', method: 'post', data }) }
//删除部门接口
export function sysDepartmentDelete(data) { return request({ url: '/admin/system/sysDepartment/delete', method: 'post', data }) }
//修改部门接口
export function sysDepartmentEdit(data) { return request({ url: '/admin/system/sysDepartment/edit', method: 'post', data }) }
//新增部门接口
export function sysDepartmentAdd(data) { return request({ url: '/admin/system/sysDepartment/add', method: 'post', data }) }
//获取单个部门信息接口
export function sysDepartmentQueryById(data) { return request({ url: '/admin/system/sysDepartment/queryById', method: 'post', data }) }
//获取部门列表（带分页功能）
export function sysDepartmentListByPage(data) { return request({ url: '/admin/system/sysDepartment/listByPage', method: 'post', data }) }
//获取所有部门
export function sysDepartmentListAll(data) { return request({ url: '/admin/system/sysDepartment/listAll', method: 'post', data }) }
// 给角色添加菜单权限接口
export function sysRoleMenuAdd(data) { return request({ url: '/admin/system/sysRolePermission/add', method: 'post', data }) }
// 获取所有菜单和角色所拥有的菜单权限
export function sysRoleMenuListAll(data) { return request({ url: '/admin/system/sysRolePermission/listAll', method: 'post', data }) }
//获取所有楼层房间和角色所拥有的房间权限
export function sysRoleRoomListAll(data){return request({url:'/admin/system/sysRoleRoom/listAll',method:'post',data})}
//给角色添加房间接口
export function sysRoleRoomAdd(data){return request({url:'/admin/system/sysRoleRoom/add',method:'post',data})}
//获取权限列表接口（带分页功能）
export function sysPermissionListByPage(data){return request({url:'/admin/system/sysPermission/listByPage',method:'post',data})}
//获取权限信息接口
export function sysPermissionQueryById(data){return request({url:'/admin/system/sysPermission/queryById',method:'post',data})}
//删除权限接口
export function sysPermissionDelete(data){return request({url:'/admin/system/sysPermission/delete',method:'post',data})}
//修改权限接口
export function sysPermissionEdit(data){return request({url:'/admin/system/sysPermission/edit',method:'post',data})}
//新增权限接口
export function sysPermissionAdd(data){return request({url:'/admin/system/sysPermission/add',method:'post',data})}
