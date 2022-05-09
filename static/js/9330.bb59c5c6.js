"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[9330],{41849:function(e,t,r){r.d(t,{C0:function(){return s},Mj:function(){return l},Uz:function(){return o},eW:function(){return i},ed:function(){return a}});r(48503);const l=[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}],a=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],i=[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}],s=(e,t,r)=>{e.required||void 0!==t&&""!==t||r(),""===t||!Number.isInteger(+t)||+t<0?r(new Error("请输入整数值")):r()},o=(e,t,r)=>{""===t||isNaN(t)||Number(t)<0?r(new Error("请输入非负数字")):r()}},19330:function(e,t,r){r.r(t),r.d(t,{default:function(){return p}});var l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showPage?r("div",{staticClass:"app-container department-manage"},[e.hasAuth?e._e():r("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),!e.dialogVisible&&e.hasAuth?r("div",{staticClass:"page1"},[r("div",{staticClass:"head"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,size:"medium",model:e.filterForm}},[r("el-form-item",{attrs:{prop:"name"}},[r("el-input",{attrs:{placeholder:"测点类型名称"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"===typeof t?t.trim():t)},expression:"filterForm.name"}})],1),r("el-form-item",{attrs:{prop:"deviceTypeId"}},[r("el-select",{attrs:{clearable:"",placeholder:"设备类型","popper-class":"three-column"},model:{value:e.filterForm.deviceTypeId,callback:function(t){e.$set(e.filterForm,"deviceTypeId",t)},expression:"filterForm.deviceTypeId"}},e._l(e.deviceTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}}),r("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1)],1)],1),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[r("el-table-column",{attrs:{prop:"name",label:"测点类型名称"}}),r("el-table-column",{attrs:{prop:"units",label:"单位",width:"80"}}),r("el-table-column",{attrs:{prop:"valueType",label:"值类型"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(e.valueTypeOpts.find((function(e){return e.id==r.valueType}))&&e.valueTypeOpts.find((function(e){return e.id==r.valueType})).name)+" ")]}}],null,!1,2225099506)}),r("el-table-column",{attrs:{prop:"columnName",label:"字段名"}}),r("el-table-column",{attrs:{prop:"deviceTypeName",label:"设备类型名称"}}),r("el-table-column",{attrs:{prop:"count",label:"告警规则条数"}}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[r("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(l)}}},[e._v("规则")])]}}],null,!1,2289520078)})],1),r("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}})],1):e._e(),e.dialogVisible&&e.hasAuth?r("div",{staticClass:"page2"},[r("div",{staticClass:"dialog-content"},[r("div",{staticClass:"measure-point-info"},[r("el-card",{staticClass:"custom-card"},[r("el-form",{ref:"cdForm",staticStyle:{"pointer-events":"none"},attrs:{model:e.cdForm.forms,rules:e.cdForm.rules,size:"mini"}},[r("div",{staticStyle:{display:"flex","justify-content":"space-around","margin-bottom":"-20px"}},[r("el-form-item",{attrs:{label:"测点类型名称",prop:"name"}},[e._v(" "+e._s(e.cdForm.forms.name)+" ")]),r("el-form-item",{attrs:{label:"设备类型",prop:"deviceTypeId"}},[e._v(" "+e._s(e.deviceTypeOpts.find((function(t){return t.id==e.cdForm.forms.deviceTypeId}))&&e.deviceTypeOpts.find((function(t){return t.id==e.cdForm.forms.deviceTypeId})).name)+" ")]),r("el-form-item",{attrs:{label:"值类型",prop:"valueType"}},[e._v(" "+e._s(e.valueTypeOpts.find((function(t){return t.id==e.cdForm.forms.valueType}))&&e.valueTypeOpts.find((function(t){return t.id==e.cdForm.forms.valueType})).name)+" ")]),r("el-form-item",{attrs:{label:"单位",prop:"units"}},[e._v(" "+e._s(e.cdForm.forms.units||"无")+" ")]),r("el-form-item",{attrs:{label:"字段名",prop:"columnName"}},[e._v(" "+e._s(e.cdForm.forms.columnName||"无")+" ")])],1)])],1)],1),r("div",{staticClass:"rule-list"},[e._l(e.cdForm.forms.alertRuleList,(function(t,l){return r("el-card",{key:l,staticClass:"custom-card",staticStyle:{width:"340px"}},[r("el-form",{ref:"ruleForm"+l,refInFor:!0,staticClass:"custom-rule-form",attrs:{model:e.cdForm.forms.alertRuleList[l],rules:e.cdForm.ruleForm.rules,"label-width":"120px",size:"mini"}},[r("el-form-item",{attrs:{label:"告警算法",prop:"alertAlgorithm"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].alertAlgorithm,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertAlgorithm",t)},expression:"cdForm.forms.alertRuleList[index].alertAlgorithm"}},[r("el-option",{attrs:{border:"",label:"阈值算法",value:1}}),r("el-option",{attrs:{border:"",label:"中断算法",value:2}}),r("el-option",{attrs:{border:"",label:"故障算法",value:3}})],1)],1),r("el-form-item",{attrs:{prop:"alertOperator",label:"告警运算符"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].alertOperator,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertOperator",t)},expression:"cdForm.forms.alertRuleList[index].alertOperator"}},[r("el-option",{attrs:{border:"",label:"大于",value:1}}),r("el-option",{attrs:{border:"",label:"小于",value:2}}),r("el-option",{attrs:{border:"",label:"等于",value:3}})],1)],1),r("el-form-item",{attrs:{prop:"alertOperatorValue",label:"告警运算值"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].alertOperatorValue,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertOperatorValue",t)},expression:"cdForm.forms.alertRuleList[index].alertOperatorValue"}})],1),r("el-form-item",{attrs:{prop:"recoverOperator",label:"恢复运算符"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].recoverOperator,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"recoverOperator",t)},expression:"cdForm.forms.alertRuleList[index].recoverOperator"}},[r("el-option",{attrs:{border:"",label:"大于",value:1}}),r("el-option",{attrs:{border:"",label:"小于",value:2}}),r("el-option",{attrs:{border:"",label:"等于",value:3}})],1)],1),r("el-form-item",{attrs:{prop:"recoverOperatorValue",label:"恢复运算值"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].recoverOperatorValue,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"recoverOperatorValue",t)},expression:"\n                  cdForm.forms.alertRuleList[index].recoverOperatorValue\n                "}})],1),r("el-form-item",{attrs:{prop:"alertType",label:"告警类型"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].alertType,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertType",t)},expression:"cdForm.forms.alertRuleList[index].alertType"}},e._l(e.alertTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{prop:"alertLevelId",label:"告警等级"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].alertLevelId,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertLevelId",t)},expression:"cdForm.forms.alertRuleList[index].alertLevelId"}},e._l(e.alertLevelOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{prop:"filterTime",label:"闪烁过滤时间(秒)"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].filterTime,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"filterTime",t)},expression:"cdForm.forms.alertRuleList[index].filterTime"}})],1),r("el-form-item",{attrs:{prop:"continueTime",label:"持续超限时间(秒)"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].continueTime,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"continueTime",t)},expression:"cdForm.forms.alertRuleList[index].continueTime"}})],1),r("el-form-item",{attrs:{prop:"alertContent",label:"告警内容"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].alertContent,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"alertContent",t)},expression:"cdForm.forms.alertRuleList[index].alertContent"}})],1),r("el-form-item",{attrs:{prop:"handlerAdvise",label:"处理建议"}},[r("el-input",{model:{value:e.cdForm.forms.alertRuleList[l].handlerAdvise,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"handlerAdvise",t)},expression:"cdForm.forms.alertRuleList[index].handlerAdvise"}})],1),r("el-form-item",{attrs:{label:"状态",prop:"status"}},[r("el-radio-group",{staticClass:"radio-status",staticStyle:{width:"100%"},model:{value:e.cdForm.forms.alertRuleList[l].status,callback:function(t){e.$set(e.cdForm.forms.alertRuleList[l],"status",t)},expression:"cdForm.forms.alertRuleList[index].status"}},[r("el-radio",{staticStyle:{color:"#55fb55"},attrs:{border:"",label:1}},[e._v("启用")]),r("el-radio",{staticStyle:{color:"gray"},attrs:{border:"",label:2}},[e._v("禁用")])],1)],1)],1),r("div",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.handleDeleteRule(e.cdForm.forms.alertRuleList[l].id,l)}}},[e._v("删除规则")]),r("el-button",{attrs:{type:"primary",disabled:e.cdForm.forms.alertRuleList[l].diabledSave,size:"mini"},on:{click:function(t){return e.dialogSubmitRule(e.cdForm.forms.alertRuleList[l].id,l)}}},[e._v("保存规则")])],1)],1)})),r("el-button",{staticStyle:{width:"200px"},attrs:{icon:"el-icon-plus",type:"primary",size:"medium"},on:{click:function(t){return e.cdForm.forms.alertRuleList.push({status:1,diabledSave:!1})}}},[e._v(" 添加规则 ")])],2)]),r("div",{staticStyle:{"text-align":"center",transform:"translate(0px, 10px)"}},[r("el-button",{staticStyle:{width:"200px"},on:{click:e.handleClose}},[e._v("关闭")])],1)]):e._e()]):e._e()},a=[],i=r(41849),s=r(87130),o=r(97595),n=r(5211),m={components:{pagination:s.Z},data(){return{showPage:!1,hasAuth:!0,valueTypeOpts:i.Mj,dialogVisible:!1,pointTypeOpts:[],alertLevelOpts:[],deviceTypeOpts:[],filterForm:{pageNo:1,pageSize:10},alertAlgorithmOpts:[{id:1,name:"阈值算法"},{id:2,name:"中断算法"},{id:3,name:"故障算法"}],alertTypeOpts:[{id:1,name:"过高"},{id:2,name:"过低"},{id:3,name:"中断"},{id:4,name:"故障"},{id:5,name:"事件"},{id:6,name:"其他"}],listLoading:!0,listData:[],listTotal:0,cdForm:{forms:{alertRuleList:[{status:1,diabledSave:!1}]},rules:{},ruleForm:{forms:{},rules:{pointTypeId:[{required:!0,trigger:"blur",message:"请输入"}],alertAlgorithm:[{required:!0,trigger:"blur",message:"请输入"}],alertOperator:[{required:!0,trigger:"blur",message:"请输入"}],alertOperatorValue:[{required:!0,trigger:"blur",message:"请输入"},{pattern:/^-?\d+\.?\d*$/,message:"只能输入数字和小数",trigger:"blur"}],recoverOperator:[{required:!0,trigger:"blur",message:"请输入"}],recoverOperatorValue:[{required:!0,trigger:"blur",message:"请输入"},{pattern:/^-?\d+\.?\d*$/,message:"只能输入数字和小数",trigger:"blur"}],alertLevelId:[{required:!0,trigger:"blur",message:"请输入"}],filterTime:[{required:!1,trigger:"blur",validator:i.C0}],continueTime:[{required:!1,trigger:"blur",validator:i.C0}],alertContent:[{required:!0,trigger:"blur",message:"请输入"}],status:[{required:!0,trigger:"blur",message:"请输入"}],points:[{required:!0,trigger:"blur",message:"请输入"}]}}}}},created(){(0,n.mA)().then((e=>this.deviceTypeOpts=e.data)),(0,o.D4)().then((e=>this.alertLevelOpts=e.data)),this.handleQuery()},mounted(){},methods:{handleClose(){this.dialogVisible=!1,this.handleQuery()},dialogSubmitRule(e,t){this.$refs[`ruleForm${t}`][0].validate(((r,l)=>{if(!r)return!1;{let r=null;const l=this.cdForm.forms.alertRuleList[t];this.$set(l,"diabledSave",!0),""===l.filterTime&&delete l.filterTime,""===l.continueTime&&delete l.continueTime,e?(delete this.cdForm.forms.alertRuleList[t].createTime,r=o.G):r=o.dm,this.cdForm.forms.alertRuleList[t].pointTypeId=this.cdForm.forms.id,r(this.cdForm.forms.alertRuleList[t]).then((e=>{l.diabledSave=!1,e.data&&e.data.id&&(this.cdForm.forms.alertRuleList[t].id=e.data.id),this.$message.success("操作成功!")})).catch((e=>{l.diabledSave=!1}))}}))},handleQuery(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},handleDialog(e){e&&(0,o.nc)({id:e.id}).then((e=>{this.cdForm.forms=e.data,this.cdForm.forms.alertRuleList.length<1&&(this.cdForm.forms.alertRuleList=[{status:1,diabledSave:!1}])})),this.dialogVisible=!0},handleDeleteRule(e,t){e?this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,o.rl)({id:e}).then((e=>{this.cdForm.forms.alertRuleList.splice(t,1),this.$message.success("删除成功!")}))})).catch((()=>{})):this.cdForm.forms.alertRuleList.splice(t,1)},getList(){this.listLoading=!0,(0,o.F_)(this.filterForm).then((e=>{this.hasAuth=!0,this.listData=e.data.list,this.listTotal=e.data.total,this.listLoading=!1})).catch((e=>{this.hasAuth=!1})).finally((e=>{this.showPage=!0}))}}},d=m,u=r(35471),c=(0,u.Z)(d,l,a,!1,null,"19a4950c",null),p=c.exports}}]);