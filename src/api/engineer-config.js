import request from '@/utils/request'
// .map(i=> i.split('/')[0]  + i.split('/')[1][0].toUpperCase()+ i.split('/')[1].slice(1,)).join('\n')

// 获取排班星期几未绑定的用户接口
export function arrangeWorkListAllUserNotBind(data) { return request({ url: '/admin/alert/arrangeWork/listAllUserNotBind', method: 'post', data }) }
// 获取排班星期几绑定的用户接口
export function arrangeWorkListAllUserBind(data) { return request({ url: '/admin/alert/arrangeWork/listAllUserBind', method: 'post', data }) }
// 修改排班状态接口
export function arrangeWorkUpdateStatus(data) { return request({ url: '/admin/alert/arrangeWork/updateStatus', method: 'post', data }) }
// 删除排班接口
export function arrangeWorkDelete(data) { return request({ url: '/admin/alert/arrangeWork/delete', method: 'post', data }) }
// 修改排班接口
export function arrangeWorkEdit(data) { return request({ url: '/admin/alert/arrangeWork/edit', method: 'post', data }) }
// 新增排班接口
export function arrangeWorkAdd(data) { return request({ url: '/admin/alert/arrangeWork/add', method: 'post', data }) }
// 获取所有排班列表接口
export function arrangeWorkListAll(data) { return request({ url: '/admin/alert/arrangeWork/listAll', method: 'post', data }) }

// 获取等级接口
export function alertLevelQueryById(data) { return request({ url: '/admin/alert/alertLevel/queryById', method: 'post', data }) }
//查看所有告警等级
export function alertLevelListAll(data) { return request({ url: '/admin/alert/alertLevel/listAll', method: 'post', data }) }
//删除等级
export function alertLevelDelete(data) { return request({ url: '/admin/alert/alertLevel/delete', method: 'post', data }) }
//修改等级
export function alertLevelEdit(data) { return request({ url: '/admin/alert/alertLevel/edit', method: 'post', data }) }
//分页列表
export function alertLevelListByPage(data) { return request({ url: '/admin/alert/alertLevel/listByPage', method: 'post', data }) }
//新增告警等级
export function alertLevelAdd(data) { return request({ url: '/admin/alert/alertLevel/add', method: 'post', data }) }

// 获取告警显示参数
export function alertconfigGetAlertConfigParams(data) { return request({ url: '/admin/alert/alertconfig/getAlertConfigParams', method: 'post', data }) }
// 告警显示参数重置
export function alertconfigAlertparam_reset(data) { return request({ url: '/admin/alert/alertconfig/alertparam_reset', method: 'post', data }) }
// 告警显示参数设置接口
export function alertconfigAddOrEdit_alert_params(data) { return request({ url: '/admin/alert/alertconfig/addOrEdit_alert_params', method: 'post', data }) }

// 配置存储配置数据
export function storeconfigAddOrEdit_store_params(data) { return request({ url: '/admin/alert/storeconfig/addOrEdit_store_params', method: 'post', data }) }
// 获取存储配置数据
export function storeconfigGetStoreConfigParams(data) { return request({ url: '/admin/alert/storeconfig/getStoreConfigParams', method: 'post', data }) }
// 组合存储时绑定测点接口
export function storePointAdd(data) { return request({ url: '/admin/alert/storePoint/add', method: 'post', data }) }
// 组合存储时所有未绑定的测点
export function storePointListAllNotBindPoint(data) { return request({ url: '/admin/alert/storePoint/listAllNotBindPoint', method: 'post', data }) }
// 组合存储时所有已经绑定的测点
export function storePointListAllBindPoint(data) { return request({ url: '/admin/alert/storePoint/listAllBindPoint', method: 'post', data }) }
// 组合存储时未绑定的测点（带分页）
export function storePointListByPageNotBindPoint(data) { return request({ url: '/admin/alert/storePoint/listByPageNotBindPoint', method: 'post', data }) }
// 组合存储时已经绑定的测点（带分页）
export function storePointListByPageBindPoint(data) { return request({ url: '/admin/alert/storePoint/listByPageBindPoint', method: 'post', data }) }

// 查看所有告警规则
export function alertRuleListByPointTypeId(data) { return request({ url: '/admin/alert/alertRule/listByPointTypeId', method: 'post', data }) }
// 删除告警规则
export function alertRuleDelete(data) { return request({ url: '/admin/alert/alertRule/delete', method: 'post', data }) }
// 查看告警规则
export function alertRuleQueryById(data) { return request({ url: '/admin/alert/alertRule/queryById', method: 'post', data }) }
// 分页查看告警规则
export function alertRuleListByPage(data) { return request({ url: '/admin/alert/alertRule/listByPage', method: 'post', data }) }
//修改告警规则
export function alertRuleEdit(data) { return request({ url: '/admin/alert/alertRule/edit', method: 'post', data }) }
//新增告警规则
export function alertRuleAdd(data) { return request({ url: '/admin/alert/alertRule/add', method: 'post', data }) }

// 获取屏蔽接口
export function alertMaskQueryById(data) { return request({ url: '/admin/alert/alertMask/queryById', method: 'post', data }) }
//删除屏蔽
export function alertMaskDelete(data) { return request({ url: '/admin/alert/alertMask/delete', method: 'post', data }) }
//修改屏蔽
export function alertMaskEdit(data) { return request({ url: '/admin/alert/alertMask/edit', method: 'post', data }) }
//分页列表
export function alertMaskListByPage(data) { return request({ url: '/admin/alert/alertMask/listByPage', method: 'post', data }) }
//新增屏蔽
export function alertMaskAdd(data) { return request({ url: '/admin/alert/alertMask/add', method: 'post', data }) }

// 恢复状态操作
export function alertNotificationEditResumeStatus(data) { return request({ url: '/admin/alert/alertNotification/editResumeStatus', method: 'post', data }) }
// 告警受理操作
export function alertNotificationEditStatus(data) { return request({ url: '/admin/alert/alertNotification/editStatus', method: 'post', data }) }
//分页查看告警通知
export function alertNotificationListByPage(data) { return request({ url: '/admin/alert/alertNotification/listByPage', method: 'post', data }) }

// 分页查看
export function alertRuleTemplateListByPage(data) { return request({ url: '/admin/alert/alertRuleTemplate/listByPage', method: 'post', data }) }
// 查看告警模板
export function alertRuleTemplateQueryById(data) { return request({ url: '/admin/alert/alertRuleTemplate/queryById', method: 'post', data }) }
// 删除告警模板
export function alertRuleTemplateDelete(data) { return request({ url: '/admin/alert/alertRuleTemplate/delete', method: 'post', data }) }
// 修改告警模板
export function alertRuleTemplateEdit(data) { return request({ url: '/admin/alert/alertRuleTemplate/edit', method: 'post', data }) }
// 新增告警模板
export function alertRuleTemplateAdd(data) { return request({ url: '/admin/alert/alertRuleTemplate/add', method: 'post', data }) }

//获取所有邮箱配置列表
export function configEmailListAll(data) { return request({ url: '/admin/alert/configEmail/listAll', method: 'post', data }) }
// 修改状态
export function configEmailUpdateState(data) { return request({ url: '/admin/alert/configEmail/updateState', method: 'post', data }) }
// 获取邮箱配置列表 （带分页）
export function configEmailListByPage(data) { return request({ url: '/admin/alert/configEmail/listByPage', method: 'post', data }) }
// 删除邮箱配置
export function configEmailDelete(data) { return request({ url: '/admin/alert/configEmail/delete', method: 'post', data }) }
// 修改邮箱配置
export function configEmailEdit(data) { return request({ url: '/admin/alert/configEmail/edit', method: 'post', data }) }
// 新增邮箱配置
export function configEmailAdd(data) { return request({ url: '/admin/alert/configEmail/add', method: 'post', data }) }

//获取语音配置接口
export function phoneSoundConfigGetSoundConfig(data) { return request({ url: '/admin/alert/phoneSoundConfig/getSoundConfig', method: 'post', data }) }
//语音配置接口
export function phoneSoundConfigAddOrEdit_sound(data) { return request({ url: '/admin/alert/phoneSoundConfig/addOrEdit_sound', method: 'post', data }) }

//获取短信配置接口
export function smsconfigGetSmsConfig(data) { return request({ url: '/admin/alert/smsconfig/getSmsConfig', method: 'post', data }) }
//短信配置接口
export function smsconfigAddOrEdit_sms(data) { return request({ url: '/admin/alert/smsconfig/addOrEdit_sms', method: 'post', data }) }

// 告警通知发送记录管理
export function alertNotificationSendListByPage(data) { return request({ url: '/admin/alert/alertNotificationSend/listByPage', method: 'post', data }) }




























