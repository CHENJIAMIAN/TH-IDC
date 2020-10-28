import request from '@/utils/request'

// 已完成 获取楼层图片与楼层的房间接口	
export function roomListAll(data){return request({url:'/admin/devicemonitor/room/listAll',method:'post',data})}
// 已完成 获取建筑物图片与楼层数据接口	
export function floorListAll(data){return request({url:'/admin/devicemonitor/floor/listAll',method:'post',data})}