import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

// 获取房间与设备组接口(根据房间id)
export function deviceGroupListAll(data){return request({url:'/admin/devicemonitor/deviceGroup/listAll',method:'post',data})}
// 获取楼层图片与楼层的房间接口	(根据楼层id)
export function roomListAll(data){return request({url:'/admin/devicemonitor/room/listAll',method:'post',data})}
// 获取建筑物图片与楼层数据接口	(不传)
export function floorListAll(data){return request({url:'/admin/devicemonitor/floor/listAll',method:'post',data})}
// 4. 高压配电房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType4(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType4',method:'post',data})}


// 7. IDC机房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType7(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType7',method:'post',data})}
// 6. 变压器房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType6(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType6',method:'post',data})}
// 5. 电池房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType5(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType5',method:'post',data})}
// 3.低压配电房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType3(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType3',method:'post',data})}
// 2. UPS配电房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType2(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType2',method:'post',data})}
// 1. 精密空调房设备组数据接口
export function roomTypeDeviceGroupListAllRoomType1(data){return request({url:'/admin/devicemonitor/RoomTypeDeviceGroup/listAllRoomType1',method:'post',data})}

















