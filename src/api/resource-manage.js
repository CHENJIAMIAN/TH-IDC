import request from '@/utils/request'

//获取设备列表接口（带分页功能）
export function deviceListByPage(data) { return request({ url: '/admin/device/device/listByPage', method: 'post', data }) }
//获取设备信息接口
export function deviceQueryById(data) { return request({ url: '/admin/device/device/queryById', method: 'post', data }) }
//删除设备接口
export function deviceDelete(data) { return request({ url: '/admin/device/device/delete', method: 'post', data }) }
// 修改设备接口
export function deviceEdit(data) { return request({ url: '/admin/device/device/edit', method: 'post', data }) }
//新增设备接口
export function deviceAdd(data) { return request({ url: '/admin/device/device/add', method: 'post', data }) }
//获取设备组列表接口（带分页功能）
export function deviceGroupListByPage(data) { return request({ url: '/admin/device/deviceGroup/listByPage', method: 'post', data }) }
//获取设备组信息接口
export function deviceGroupQueryById(data) { return request({ url: '/admin/device/deviceGroup/queryById', method: 'post', data }) }
//删除设备组接口
export function deviceGroupDelete(data) { return request({ url: '/admin/device/deviceGroup/delete', method: 'post', data }) }
//修改设备组接口
export function deviceGroupEdit(data) { return request({ url: '/admin/device/deviceGroup/edit', method: 'post', data }) }
//新增设备组接口
export function deviceGroupAdd(data) { return request({ url: '/admin/device/deviceGroup/add', method: 'post', data }) }
//获取房间接口
export function spaceRoomQueryById(data) { return request({ url: '/admin/space/spaceRoom/queryById', method: 'post', data }) }
//获取符合查询条件的房间列表接口（带分页功能）
export function spaceRoomListByPage(data) { return request({ url: '/admin/space/spaceRoom/listByPage', method: 'post', data }) }
//获取符合条件的所有房间列表接口
export function spaceRoomListAll(data) { return request({ url: '/admin/space/spaceRoom/listAll', method: 'post', data }) }
//删除房间接口
export function spaceRoomDelete(data) { return request({ url: '/admin/space/spaceRoom/delete', method: 'post', data }) }
//修改房间接口
export function spaceRoomEdit(data) { return request({ url: '/admin/space/spaceRoom/edit', method: 'post', data }) }
//新增房间接口
export function spaceRoomAdd(data) { return request({ url: '/admin/space/spaceRoom/add', method: 'post', data }) }
//获取楼层列表接口（带分页功能）
export function spaceFloorListByPage(data) { return request({ url: '/admin/space/spaceFloor/listByPage', method: 'post', data }) }
//获取所有楼层列表接口
export function spaceFloorListAll(data) { return request({ url: '/admin/space/spaceFloor/listAll', method: 'post', data }) }
//获取楼层接口
export function spaceFloorQueryById(data) { return request({ url: '/admin/space/spaceFloor/queryById', method: 'post', data }) }
//删除楼层接口
export function spaceFloorDelete(data) { return request({ url: '/admin/space/spaceFloor/delete', method: 'post', data }) }
//修改楼层接口
export function spaceFloorEdit(data) { return request({ url: '/admin/space/spaceFloor/edit', method: 'post', data }) }
//新增楼层接口
export function spaceFloorAdd(data) { return request({ url: '/admin/space/spaceFloor/add', method: 'post', data }) }
// 获取测点列表接口（带分页功能）
export function pointListByPage(data) { return request({ url: '/admin/device/point/listByPage', method: 'post', data }) }
// 获取测点信息接口
export function pointQueryById(data) { return request({ url: '/admin/device/point/queryById', method: 'post', data }) }
// 删除测点接口
export function pointDelete(data) { return request({ url: '/admin/device/point/delete', method: 'post', data }) }
// 修改测点接口
export function pointEdit(data) { return request({ url: '/admin/device/point/edit', method: 'post', data }) }
// 新增测点接口 
export function pointAdd(data) { return request({ url: '/admin/device/point/add', method: 'post', data }) }




// 给角色添加菜单权限接口
export function sysRoleMenuAdd(data) { return request({ url: '/admin/system/sysRoleMenu/add', method: 'post', data }) }
// 获取所有菜单和角色所拥有的菜单权限
export function sysRoleMenuListAll(data) { return request({ url: '/admin/system/sysRoleMenu/listAll', method: 'post', data }) }
// 获取所有设备类型接口
export function deviceTypeListAll(data) { return request({ url: '/admin/device/deviceType/listAll', method: 'post', data }) }

