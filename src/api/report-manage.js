import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')


// 根据设备类型统计
export function assetGetDeviceByDeviceType(data) { return request({ url: '/admin/report/asset/getDeviceByDeviceType', method: 'post', data }) }
// 根据楼层统计
export function assetGetDeviceByFloor(data) { return request({ url: '/admin/report/asset/getDeviceByFloor', method: 'post', data }) }
// 根据楼层与设备统计
export function assetGetDeviceByFloorAndDeviceType(data) { return request({ url: '/admin/report/asset/getDeviceByFloorAndDeviceType', method: 'post', data }) }


// 按告警级别统计告警接口
export function warnQueryByAlertLevel(data) { return request({ url: '/admin/report/warn/queryByAlertLevel', method: 'post', data }) }
// 按月份统计告警接口
export function warnQueryByMonth(data) { return request({ url: '/admin/report/warn/queryByMonth', method: 'post', data }) }
// 按日统计告警接口
export function warnQueryBydate(data) { return request({ url: '/admin/report/warn/queryBydate', method: 'post', data }) }


// 按告警级别统计告警接口
export function warnExcelByAlertLevel(data) { return request({ url: '/admin/report/warn/excelByAlertLevel', method: 'post', data, responseType: 'blob' }) }
// 按月份统计告警接口
export function warnExcelByMonth(data) { return request({ url: '/admin/report/warn/excelByMonth', method: 'post', data, responseType: 'blob' }) }
// 按日统计告警接口
export function warnExcelBydate(data) { return request({ url: '/admin/report/warn/excelBydate', method: 'post', data, responseType: 'blob' }) }
// 根据设备类型统计
export function assetGetDeviceByDeviceTypeExcel(data) { return request({ url: '/admin/report/asset/getDeviceByDeviceTypeExcel', method: 'post', data, responseType: 'blob' }) }
// 根据楼层统计
export function assetGetDeviceByFloorExcel(data) { return request({ url: '/admin/report/asset/getDeviceByFloorExcel', method: 'post', data, responseType: 'blob' }) }
// 根据楼层与设备统计
export function assetGetDeviceByFloorAndDeviceTypeExcel(data) { return request({ url: '/admin/report/asset/getDeviceByFloorAndDeviceTypeExcel', method: 'post', data, responseType: 'blob' }) }