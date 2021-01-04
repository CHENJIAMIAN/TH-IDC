import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

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

// 更新测点数据到缓存redis
export function pointUpdateToRedis(data) { return request({ url: '/admin/device/point/updateToRedis', method: 'post', data }) }
// 获取所有测点列表
export function pointListAll(data) { return request({ url: '/admin/device/point/listAll', method: 'post', data }) }
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

// 获取某个房间的所有设备组列表接口	
export function deviceGroupListAll(data) { return request({ url: '/admin/device/deviceGroup/listAll', method: 'post', data }) }
// 获取某一房间的所有设备列表接口
export function deviceListAll(data) { return request({ url: '/admin/device/device/listAll', method: 'post', data }) }
//查询设备所有未绑定测点列表
export function deviceQueryAllNotBindForDevice(data){return request({url:'/admin/device/device/queryAllNotBindForDevice',method:'post',data})}
//查询设备所有已经绑定测点列表
export function deviceQueryAllBindForDevice(data){return request({url:'/admin/device/device/queryAllBindForDevice',method:'post',data})}
//查询设备组所有已经绑定测点列表
export function deviceGroupListAllBindDeviceGroup(data){return request({url:'/admin/device/deviceGroup/listAllBindDeviceGroup',method:'post',data})}
//查询设备组所有未绑定测点列表
export function deviceGroupListAllNotBindDeviceGroup(data){return request({url:'/admin/device/deviceGroup/listAllNotBindDeviceGroup',method:'post',data})}
//设备绑定测点接口
export function deviceAddPointToDevice(data){return request({url:'/admin/device/device/addPointToDevice',method:'post',data})}
//设备组绑定测点接口
export function deviceGroupAddPointToGroup(data){return request({url:'/admin/device/deviceGroup/addPointToGroup',method:'post',data})}
//查询设备组所有已经绑定设备列表
export function deviceGroupListAllBindDeviceForDeviceGroup(data){return request({url:'/admin/device/deviceGroup/listAllBindDeviceForDeviceGroup',method:'post',data})}
//查询设备组所有未绑定设备列表
export function deviceGroupListAllNotBindDeviceForDeviceGroup(data){return request({url:'/admin/device/deviceGroup/listAllNotBindDeviceForDeviceGroup',method:'post',data})}
//设备组绑定设备接口
export function deviceGroupAddDeviceToGroup(data){return request({url:'/admin/device/deviceGroup/addDeviceToGroup',method:'post',data})}
//获取设备组已绑定位置的测点
export function deviceGroupPointLocationListAllByBindForDeviceGroup(data){return request({url:'/admin/device/deviceGroupPointLocation/listAllByBindForDeviceGroup',method:'post',data})}
//获取设备组未绑定位置的测点
export function deviceGroupPointLocationListAllByNotBindForDeviceGroup(data){return request({url:'/admin/device/deviceGroupPointLocation/listAllByNotBindForDeviceGroup',method:'post',data})}
//采集测点位置接口
export function deviceGroupPointLocationAdd(data){return request({url:'/admin/device/deviceGroupPointLocation/add',method:'post',data})}
// 已完成 获取建筑物图片接口
export function configGetBuilding_bg(data){return request({url:'/admin/space/config/getBuilding_bg',method:'post',data})}
// 已完成 建筑图片上传或修改接口
export function configAddOrEdit_building_bg(data){return request({url:'/admin/space/config/addOrEdit_building_bg',method:'post',data})}
// 获取设备类型列表接口，带分页
export function deviceTypeListByPage(data){return request({url:'/admin/spacetype/deviceType/listByPage',method:'post',data})}
// 获取所有设备类型列表接口
export function deviceTypeListAll(data){return request({url:'/admin/spacetype/deviceType/listAll',method:'post',data})}
// 设备类型删除
export function deviceTypeDelete(data){return request({url:'/admin/spacetype/deviceType/delete',method:'post',data})}
// 获取设备类型接口
export function deviceTypeQueryById(data){return request({url:'/admin/spacetype/deviceType/queryById',method:'post',data})}
// 设备类型修改
export function deviceTypeEdit(data){return request({url:'/admin/spacetype/deviceType/edit',method:'post',data})}
// 设备类型新增
export function deviceTypeAdd(data){return request({url:'/admin/spacetype/deviceType/add',method:'post',data})}
// 获取房间类型接口
export function spaceRoomTypeQueryById(data){return request({url:'/admin/spacetype/spaceRoomType/queryById',method:'post',data})}
// 获取所有房间类型列表接口
export function spaceRoomTypeListAll(data){return request({url:'/admin/spacetype/spaceRoomType/listAll',method:'post',data})}
// 获取房间类型列表接口，带分页
export function spaceRoomTypeListByPage(data){return request({url:'/admin/spacetype/spaceRoomType/listByPage',method:'post',data})}
// 房间类型删除
export function spaceRoomTypeDelete(data){return request({url:'/admin/spacetype/spaceRoomType/delete',method:'post',data})}
// 房间类型修改
export function spaceRoomTypeEdit(data){return request({url:'/admin/spacetype/spaceRoomType/edit',method:'post',data})}
// 房间类型新增
export function spaceRoomTypeAdd(data){return request({url:'/admin/spacetype/spaceRoomType/add',method:'post',data})}
//获取测点类型列表接口，带分页
export function pointTypeListByPage(data){return request({url:'/admin/spacetype/pointType/listByPage',method:'post',data})}
//获取所有测点类型列表接口
export function pointTypeListAll(data){return request({url:'/admin/spacetype/pointType/listAll',method:'post',data})}
//测点类型删除
export function pointTypeDelete(data){return request({url:'/admin/spacetype/pointType/delete',method:'post',data})}
//获取测点类型接口
export function pointTypeQueryById(data){return request({url:'/admin/spacetype/pointType/queryById',method:'post',data})}
//测点类型修改
export function pointTypeEdit(data){return request({url:'/admin/spacetype/pointType/edit',method:'post',data})}
//测点类型新增
export function pointTypeAdd(data){return request({url:'/admin/spacetype/pointType/add',method:'post',data})}






// 获取某设备下的所有测点列表接口
export function pointGetPointByDeivceCode(data){return request({url:'/admin/device/point/getPointByDeivceCode',method:'post',data})}


// 逻辑设备组绑定实体设备组接口
export function deviceGroupAddDeviceGroupToLogicGroup(data){return request({url:'/admin/device/deviceGroup/addDeviceGroupToLogicGroup',method:'post',data})}
// 未绑定的设备组
export function deviceGroupListAllNotBindLogicGroup(data){return request({url:'/admin/device/deviceGroup/listAllNotBindLogicGroup',method:'post',data})}
// 已绑定的设备组
export function deviceGroupListAllBindLogicGroup(data){return request({url:'/admin/device/deviceGroup/listAllBindLogicGroup',method:'post',data})}