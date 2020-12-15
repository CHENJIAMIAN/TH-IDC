import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')


// 根据设备类型统计
export function assetGetDeviceByDeviceType(data){return request({url:'/admin/report/asset/getDeviceByDeviceType',method:'post',data})}
// 根据楼层统计
export function assetGetDeviceByFloor(data){return request({url:'/admin/report/asset/getDeviceByFloor',method:'post',data})}
// 根据楼层与设备统计
export function assetGetDeviceByFloorAndDeviceType(data){return request({url:'/admin/report/asset/getDeviceByFloorAndDeviceType',method:'post',data})}