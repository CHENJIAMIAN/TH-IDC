//修改用户密码
export function sysUserUpdatePassword() { return request({ url: '/admin/system/sysUser/updatePassword', method: 'post' }) }
//获取用户信息接口
export function sysUserQueryById() { return request({ url: '/admin/system/sysUser/queryById', method: 'post' }) }
//获取所有角色接口
export function sysRoleListAll() { return request({ url: '/admin/system/sysRole/listAll', method: 'post' }) }
//获取所有菜单接口
export function sysMenuListAll() { return request({ url: '/admin/system/sysMenu/listAll', method: 'post' }) }
//获取日志详情接口
export function sysLogQueryById() { return request({ url: '/admin/system/sysLog/queryById', method: 'post' }) }
//获取操作日志列表接口
export function sysLogListByPage() { return request({ url: '/admin/system/sysLog/listByPage', method: 'post' }) }
//删除用户接口
export function sysUserDelete() { return request({ url: '/admin/system/sysUser/delete', method: 'post' }) }
//修改用户接口
export function sysUserEdit() { return request({ url: '/admin/system/sysUser/edit', method: 'post' }) }
//新增用户接口
export function sysUserAdd() { return request({ url: '/admin/system/sysUser/add', method: 'post' }) }
//获取用户列表接口（带分页功能）
export function sysUserListByPage() { return request({ url: '/admin/system/sysUser/listByPage', method: 'post' }) }
//删除角色接口
export function sysRoleDelete() { return request({ url: '/admin/system/sysRole/delete', method: 'post' }) }
//修改角色接口
export function sysRoleEdit() { return request({ url: '/admin/system/sysRole/edit', method: 'post' }) }
//新增角色接口
export function sysRoleAdd() { return request({ url: '/admin/system/sysRole/add', method: 'post' }) }
//获取角色列表接口（带分页功能）
export function sysRoleListByPage() { return request({ url: '/admin/system/sysRole/listByPage', method: 'post' }) }
//获取角色信息接口
export function sysRoleQueryById() { return request({ url: '/admin/system/sysRole/queryById', method: 'post' }) }
//删除菜单接口
export function sysMenuDelete() { return request({ url: '/admin/system/sysMenu/delete', method: 'post' }) }
//修改菜单接口
export function sysMenuEdit() { return request({ url: '/admin/system/sysMenu/edit', method: 'post' }) }
//新增菜单接口
export function sysMenuAdd() { return request({ url: '/admin/system/sysMenu/add', method: 'post' }) }
//获取菜单列表接口（带分页功能）
export function sysMenuListByPage() { return request({ url: '/admin/system/sysMenu/listByPage', method: 'post' }) }
//获取菜单信息接口
export function sysMenuQueryById() { return request({ url: '/admin/system/sysMenu/queryById', method: 'post' }) }
//删除部门接口
export function sysDepartmentDelete() { return request({ url: '/admin/system/sysDepartment/delete', method: 'post' }) }
//修改部门接口
export function sysDepartmentEdit() { return request({ url: '/admin/system/sysDepartment/edit', method: 'post' }) }
//新增部门接口
export function sysDepartmentAdd() { return request({ url: '/admin/system/sysDepartment/add', method: 'post' }) }
//获取单个部门信息接口
export function sysDepartmentQueryById() { return request({ url: '/admin/system/sysDepartment/queryById', method: 'post' }) }
//获取部门列表（带分页功能）
export function sysDepartmentListByPage() { return request({ url: '/admin/system/sysDepartment/listByPage', method: 'post' }) }
//获取所有部门
export function sysDepartmentListAll() { return request({ url: '/admin/system/sysDepartment/listAll', method: 'post' }) }

// 系统管理
// 2.3.1.1.部门管理
// QURD 部门编号（id）、部门名称、 创建时间、修改时间、创建人、 修改人

// 2.3.1.2.菜单权限管理
// QURD 菜单编号（id）、菜单名称、 上级菜单编号、菜单类型、创建时间、修改时间、创建人、 修改人

// 2.3.1.3.角色管理
// QURD 角色编号（id）、角色名称、 创建时间、修改时间、创建人、 修改人

// 2.3.1.4.角色权限关联
// 角色权限（一个或多个）

// 2.3.1.5.用户管理
// QURD 
// 用户编号（id）、用户名、用户密码、姓名、电话、邮箱、微信、钉钉、备注、所属部门、启用状态、 创建时间、修改时间、创建人、 修改人

// 2.3.1.6.用户角色关联
// 用户角色（一个或多个）


// 2.3.1.7.系统日志
// 查询
// 添加

// 用户编号（id）、用户名、模块名、模块方法、用户IP、描述、日志类型（普通日志、异常日志）操作时间
