import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

// 获取房间与设备组接口(根据房间id)
export function deviceGroupListAll(data){return request({url:'/admin/devicemonitor/deviceGroup/listAll',method:'post',data})}
// 获取楼层图片与楼层的房间接口	(根据楼层id)
export function roomListAll(data){return request({url:'/admin/devicemonitor/room/listAll',method:'post',data})}
// 获取建筑物图片与楼层数据接口	(不传)
export function floorListAll(data){return request({url:'/admin/devicemonitor/floor/listAll',method:'post',data})}


// 获取房间里面设备组采集到的数据接口
export function deviceGroupTypeGetData(data){return request({url:'/admin/devicemonitor/deviceGroupType/getData',method:'post',data})}




// 获取备采集到的数据接口	
export function deviceType3DGetData(data){return request({url:'/admin/devicemonitor/deviceType3D/getData',method:'post',data})}

// 根据设备号与字段名获取历史数据
export function historyGetData(data){return request({url:'/admin/devicemonitor/History/getData',method:'post',data})}






