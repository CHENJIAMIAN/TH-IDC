import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

// 获取排班星期几未绑定的用户接口
export function arrangeWorkListAllUserNotBind(data){return request({url:'/admin/alert/arrangeWork/listAllUserNotBind',method:'post',data})}
// 获取排班星期几绑定的用户接口
export function arrangeWorkListAllUserBind(data){return request({url:'/admin/alert/arrangeWork/listAllUserBind',method:'post',data})}
// 修改排班状态接口
export function arrangeWorkUpdateStatus(data){return request({url:'/admin/alert/arrangeWork/updateStatus',method:'post',data})}
// 删除排班接口
export function arrangeWorkDelete(data){return request({url:'/admin/alert/arrangeWork/delete',method:'post',data})}
// 修改排班接口
export function arrangeWorkEdit(data){return request({url:'/admin/alert/arrangeWork/edit',method:'post',data})}
// 新增排班接口
export function arrangeWorkAdd(data){return request({url:'/admin/alert/arrangeWork/add',method:'post',data})}
// 获取所有排班列表接口
export function arrangeWorkListAll(data){return request({url:'/admin/alert/arrangeWork/listAll',method:'post',data})}

// 查看所有告警规则
export function alertRuleListAll(data){return request({url:'/admin/alert/alertRule/listAll',method:'post',data})}
// 分页查看告警规则
export function alertRuleListByPage(data){return request({url:'/admin/alert/alertRule/listByPage',method:'post',data})}
//修改告警规则
export function alertRuleEdit(data){return request({url:'/admin/alert/alertRule/edit',method:'post',data})}
//新增告警规则
export function alertRuleAdd(data){return request({url:'/admin/alert/alertRule',method:'post',data})}

//新增屏蔽
export function alertMaskAdd(data){return request({url:'/admin/alert/alertMask/add',method:'post',data})}

//分页查看告警通知
export function alertNotificationListByPage(data){return request({url:'/admin/alert/alertNotification/listByPage',method:'post',data})}

//查看所有告警等级
export function alertLevelListAll(data){return request({url:'/admin/alert/alertLevel/listAll',method:'post',data})}
//删除等级
export function alertLevelDelete(data){return request({url:'/admin/alert/alertLevel/delete',method:'post',data})}
//修改等级
export function alertLevelEdit(data){return request({url:'/admin/alert/alertLevel/edit',method:'post',data})}
//分页列表
export function alertLevelListByPage(data){return request({url:'/admin/alert/alertLevel/listByPage',method:'post',data})}
//新增告警等级
export function alertLevelAdd(data){return request({url:'/admin/alert/alertLevel/add',method:'post',data})}