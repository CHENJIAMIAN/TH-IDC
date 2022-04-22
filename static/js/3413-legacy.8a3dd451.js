"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[3413],{73413:function(e,t,l){l.r(t),l.d(t,{default:function(){return p}});var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showPage?a("div",{staticClass:"app-container system-log"},[e.hasAuth?e._e():a("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?a("div",{staticClass:"head"},[a("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[a("el-form-item",{attrs:{prop:"userName"}},[a("el-input",{attrs:{placeholder:"操作人账号"},model:{value:e.filterForm.userName,callback:function(t){e.$set(e.filterForm,"userName","string"===typeof t?t.trim():t)},expression:"filterForm.userName"}})],1),a("el-form-item",{attrs:{prop:"realName"}},[a("el-input",{attrs:{placeholder:"操作人姓名"},model:{value:e.filterForm.realName,callback:function(t){e.$set(e.filterForm,"realName","string"===typeof t?t.trim():t)},expression:"filterForm.realName"}})],1),a("el-form-item",{attrs:{prop:"moduleName"}},[a("el-input",{attrs:{placeholder:"模块名称"},model:{value:e.filterForm.moduleName,callback:function(t){e.$set(e.filterForm,"moduleName","string"===typeof t?t.trim():t)},expression:"filterForm.moduleName"}})],1),a("el-form-item",{attrs:{prop:"moduleMethod"}},[a("el-input",{attrs:{placeholder:"模块方法"},model:{value:e.filterForm.moduleMethod,callback:function(t){e.$set(e.filterForm,"moduleMethod","string"===typeof t?t.trim():t)},expression:"filterForm.moduleMethod"}})],1),a("el-form-item",{attrs:{prop:"logType"}},[a("el-select",{attrs:{clearable:"",placeholder:"日志类型"},model:{value:e.filterForm.logType,callback:function(t){e.$set(e.filterForm,"logType",t)},expression:"filterForm.logType"}},[a("el-option",{attrs:{label:"正常日志",value:1}}),a("el-option",{attrs:{label:"异常日志",value:2}})],1)],1),a("el-form-item",{attrs:{prop:"startDate_endDate"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{type:"daterange",placeholder:"时间范围","value-format":"yyyy-MM-dd"},model:{value:e.filterForm.startDate_endDate,callback:function(t){e.$set(e.filterForm,"startDate_endDate",t)},expression:"filterForm.startDate_endDate"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1)],1)],1):e._e(),e.hasAuth?a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[a("el-table-column",{attrs:{prop:"userName",label:"操作人账号"}}),a("el-table-column",{attrs:{prop:"realName",label:"操作人"}}),a("el-table-column",{attrs:{prop:"moduleName",label:"模块名称"}}),a("el-table-column",{attrs:{sortable:"",prop:"moduleMethod",label:"模块方法",width:"250"}}),a("el-table-column",{attrs:{prop:"userIp",label:"操作人IP"}}),a("el-table-column",{attrs:{prop:"description",label:"描述"}}),a("el-table-column",{attrs:{prop:"logType",label:"日志类型"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[1==l.logType?a("span",[e._v("正常日志")]):2==l.logType?a("span",[e._v("异常日志")]):e._e()]}}],null,!1,2697654919)}),a("el-table-column",{attrs:{sortable:"",prop:"createTime",label:"创建时间",width:"180"}}),a("el-table-column",{attrs:{prop:"takeTime",label:"耗时(毫秒)"}}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("el-button",{attrs:{title:"详情",icon:"el-icon-view",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(l)}}})]}}],null,!1,4093935913)})],1):e._e(),e.hasAuth?a("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),a("el-dialog",{staticClass:"log-detail-dialog",attrs:{visible:e.dialog.visible,top:"25vh",center:""},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[a("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"title-txt"},[e._v("详情")]),a("img",{attrs:{src:l(1612)}})]),a("el-form",{ref:"dialogForm",staticClass:"log-form",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"操作人ID : ",prop:"userId"}},[e._v(" "+e._s(e.dialog.forms.userId)+" ")]),a("el-form-item",{attrs:{label:"操作人账号 : ",prop:"userName"}},[e._v(" "+e._s(e.dialog.forms.userName)+" ")]),a("el-form-item",{attrs:{label:"操作人姓名 : ",prop:"realName"}},[e._v(" "+e._s(e.dialog.forms.realName)+" ")]),a("el-form-item",{attrs:{label:"模块名称 : ",prop:"moduleName"}},[e._v(" "+e._s(e.dialog.forms.moduleName)+" ")]),a("el-form-item",{attrs:{label:"模块方法 : ",prop:"moduleMethod"}},[e._v(" "+e._s(e.dialog.forms.moduleMethod)+" ")]),a("el-form-item",{attrs:{label:"操作人IP : ",prop:"userIp"}},[e._v(" "+e._s(e.dialog.forms.userIp)+" ")]),a("el-form-item",{attrs:{label:"描述 : ",prop:"description"}},[e._v(" "+e._s(e.dialog.forms.description)+" ")]),a("el-form-item",{attrs:{label:"日志类型 : ",prop:"logType"}},[[1==e.dialog.forms.logType?a("div",[e._v("正常日志")]):e._e(),2==e.dialog.forms.logType?a("div",[e._v("异常日志")]):e._e()]],2),a("el-form-item",{attrs:{label:"创建时间 : ",prop:"createTime"}},[e._v(" "+e._s(e.dialog.forms.createTime)+" ")]),a("el-form-item",{attrs:{label:"耗时(毫秒) : ",prop:"takeTime"}},[e._v(" "+e._s(e.dialog.forms.takeTime)+" ")])],1)],1)],1):e._e()},r=[],o=l(16198),i=(l(41539),l(35666),l(94685)),s=l(54625),n={components:{pagination:i.Z},data:function(){return{showPage:!1,hasAuth:!0,filterForm:{userName:"",realName:"",moduleName:"",moduleMethod:"",logType:null,startTime:null,endTime:null,startDate_endDate:[],pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{},rules:{}}}},watch:{"filterForm.startDate_endDate":function(e,t){this.filterForm.startTime=e?e[0]:null,this.filterForm.endTime=e?e[1]:null}},created:function(){this.handleQuery()},mounted:function(){},methods:{handleDialog:function(e){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function l(){var a;return regeneratorRuntime.wrap((function(l){while(1)switch(l.prev=l.next){case 0:if(!e){l.next=7;break}return l.next=3,(0,s.Sy)({id:e.id});case 3:a=l.sent,t.dialog.forms=a.data,l.next=8;break;case 7:t.dialog.forms={};case 8:t.dialog.visible=!0,t.$nextTick((function(e){return t.$refs["dialogForm"].clearValidate()}));case 10:case"end":return l.stop()}}),l)})))()},dialogSubmit:function(){this.$refs["dialogForm"].validate((function(e,t){if(!e)return!1}))},handleQuery:function(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset:function(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},handleDel:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){sysLogDelete({id:e}).then((function(e){t.getList(),t.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var e=this;this.listLoading=!0,(0,s.c6)(this.filterForm).then((function(t){e.hasAuth=!0,e.listData=t.data.list,e.listTotal=t.data.total,e.listLoading=!1})).catch((function(t){e.hasAuth=!1})).finally((function(t){e.showPage=!0}))}}},m=n,u=l(1001),d=(0,u.Z)(m,a,r,!1,null,"f0644438",null),p=d.exports}}]);