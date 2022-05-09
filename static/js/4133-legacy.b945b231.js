"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[4133],{44133:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return e.showPage?o("div",{staticClass:"app-container device-manage"},[e.hasAuth?e._e():o("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?o("div",{staticClass:"head"},[o("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[o("el-form-item",{attrs:{prop:"floorCode"}},[o("el-select",{attrs:{clearable:"",placeholder:"楼层"},on:{change:function(t){e.$set(e.filterForm,"roomCode",""),e.$set(e.filterForm,"deviceGroupCode","")}},model:{value:e.filterForm.floorCode,callback:function(t){e.$set(e.filterForm,"floorCode",t)},expression:"filterForm.floorCode"}},e._l(e.floorOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),o("el-form-item",{attrs:{prop:"roomCode"}},[o("el-select",{attrs:{clearable:"",placeholder:"房间"},on:{change:function(t){return e.$set(e.filterForm,"deviceGroupCode","")}},model:{value:e.filterForm.roomCode,callback:function(t){e.$set(e.filterForm,"roomCode",t)},expression:"filterForm.roomCode"}},e._l(e.roomOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),o("el-form-item",{attrs:{prop:"deviceGroupCode"}},[o("el-select",{attrs:{clearable:"",placeholder:"设备组"},model:{value:e.filterForm.deviceGroupCode,callback:function(t){e.$set(e.filterForm,"deviceGroupCode",t)},expression:"filterForm.deviceGroupCode"}},e._l(e.deviceGroupOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.deviceGroupCode}})})),1)],1),o("el-form-item",{attrs:{prop:"name"}},[o("el-input",{attrs:{placeholder:"设备名称"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"===typeof t?t.trim():t)},expression:"filterForm.name"}})],1),o("el-form-item",{attrs:{prop:"deviceCode"}},[o("el-input",{attrs:{placeholder:"设备编号"},model:{value:e.filterForm.deviceCode,callback:function(t){e.$set(e.filterForm,"deviceCode","string"===typeof t?t.trim():t)},expression:"filterForm.deviceCode"}})],1),o("el-form-item",{attrs:{prop:"deviceType"}},[o("el-select",{attrs:{clearable:"",placeholder:"设备类型","popper-class":"three-column"},model:{value:e.filterForm.deviceType,callback:function(t){e.$set(e.filterForm,"deviceType",t)},expression:"filterForm.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialog()}}},[o("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[o("el-table-column",{attrs:{prop:"deviceCode",label:"设备编号"}}),o("el-table-column",{attrs:{prop:"name",label:"设备名称"}}),o("el-table-column",{attrs:{prop:"deviceType",label:"设备类型"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[o("span",[e._v(e._s(e.deviceTypeOpts.find((function(e){return e.id===r.deviceType}))&&e.deviceTypeOpts.find((function(e){return e.id===r.deviceType})).name))])]}}],null,!1,749874441)}),o("el-table-column",{attrs:{prop:"deviceGroupName",label:"设备组名称"}}),o("el-table-column",{attrs:{prop:"roomName",label:"房间名称"}}),o("el-table-column",{attrs:{prop:"floorName",label:"楼层名称"}}),o("el-table-column",{attrs:{label:"操作",align:"center",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[o("el-button",{attrs:{title:"绑定测点",icon:"el-icon-bdcd",type:"primary",plain:""},on:{click:function(t){return e.handleCDDialog(r)}}}),o("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(r)}}}),o("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(r.id)}}})]}}],null,!1,2191441141)})],1):e._e(),e.hasAuth?o("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),o("el-dialog",{attrs:{visible:e.dialog.visible},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[o("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[o("span",{staticClass:"title-txt"},[e._v(e._s(e.dialog.forms.id?"编辑":"新增"))]),o("img",{attrs:{src:r(1612)}})]),o("el-form",{ref:"dialogForm",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"设备编号",prop:"deviceCode"}},[o("el-input",{attrs:{disabled:!!e.dialog.forms.id},model:{value:e.dialog.forms.deviceCode,callback:function(t){e.$set(e.dialog.forms,"deviceCode",t)},expression:"dialog.forms.deviceCode"}})],1),o("el-form-item",{attrs:{label:"设备名称",prop:"name"}},[o("el-input",{model:{value:e.dialog.forms.name,callback:function(t){e.$set(e.dialog.forms,"name",t)},expression:"dialog.forms.name"}})],1),o("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},[o("el-form-item",{attrs:{label:"楼层",prop:"floorCode"}},[o("el-select",{on:{change:function(t){e.$set(e.dialog.forms,"roomCode",""),e.$set(e.dialog.forms,"deviceGroupCode","")}},model:{value:e.dialog.forms.floorCode,callback:function(t){e.$set(e.dialog.forms,"floorCode",t)},expression:"dialog.forms.floorCode"}},e._l(e.floorOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),o("el-form-item",{attrs:{label:"房间",prop:"roomCode"}},[o("el-select",{on:{change:function(t){return e.$set(e.dialog.forms,"deviceGroupCode","")}},model:{value:e.dialog.forms.roomCode,callback:function(t){e.$set(e.dialog.forms,"roomCode",t)},expression:"dialog.forms.roomCode"}},e._l(e.roomOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),o("el-form-item",{attrs:{label:"设备组",prop:"deviceGroupCode"}},[o("el-select",{model:{value:e.dialog.forms.deviceGroupCode,callback:function(t){e.$set(e.dialog.forms,"deviceGroupCode",t)},expression:"dialog.forms.deviceGroupCode"}},e._l(e.deviceGroupOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.deviceGroupCode}})})),1)],1)],1),o("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},[o("el-form-item",{attrs:{label:"设备类型",prop:"deviceType"}},[o("el-select",{attrs:{"popper-class":"three-column"},model:{value:e.dialog.forms.deviceType,callback:function(t){e.$set(e.dialog.forms,"deviceType",t)},expression:"dialog.forms.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1),o("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSubmit}},[e._v("保 存")])],1)],1),o("el-dialog",{attrs:{visible:e.dialogCD.visible,width:"80%"},on:{"update:visible":function(t){return e.$set(e.dialogCD,"visible",t)}}},[o("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[o("span",{staticClass:"title-txt"},[e._v("绑定测点 - "+e._s(e.dialogCD.forms.name))]),o("img",{attrs:{src:r(1612)}})]),o("el-form",{ref:"dialogCDForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogCD.forms,rules:e.dialogCD.rules}},[o("el-form-item",{attrs:{label:"",prop:""}},[o("el-transfer",{staticClass:"transfer-cd",attrs:{filterable:"","filter-method":function(e,t){return t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allPointOpts},model:{value:e.dialogCD.forms.pointIdArray,callback:function(t){e.$set(e.dialogCD.forms,"pointIdArray",t)},expression:"dialogCD.forms.pointIdArray"}})],1)],1),o("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogCDSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},i=[],l=r(12516),a=(r(17822),r(98469),r(61942),r(11490),r(23087),r(10405),r(87130)),n=r(5211),s={components:{pagination:a.Z},data:function(){return{showPage:!1,hasAuth:!0,floorOpts:[],deviceGroupOpts:[],roomOpts:[],roomAllOpts:[],deviceTypeOpts:[],pointBindDeviceGroupOpts:[],pointNotBindDeviceGroupOpts:[],allPointOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{floorCode:"",roomCode:"",deviceGroupCode:"",name:"",deviceCode:"",deviceType:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{},rules:{floorCode:[{required:!0,trigger:"blur",message:"请输入"}],roomCode:[{required:!0,trigger:"blur",message:"请输入"}],deviceGroupCode:[{required:!0,trigger:"blur",message:"请输入"}],name:[{required:!0,trigger:"blur",message:"请输入"}],deviceCode:[{required:!0,trigger:"blur",message:"请输入"}],deviceType:[{required:!0,trigger:"blur",message:"请输入"}]}},dialogCD:{visible:!1,forms:{},rules:{}}}},watch:{"filterForm.floorCode":function(e,t){var r=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return r.roomOpts=[],r.deviceGroupOpts=[],t.next=6,(0,n.RE)({floorCode:e});case 6:o=t.sent,r.roomOpts=o.data;case 8:case"end":return t.stop()}}),t)})))()},"filterForm.roomCode":function(e,t){var r=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return r.deviceGroupOpts=[],t.next=5,(0,n.w8)({roomCode:e});case 5:o=t.sent,r.deviceGroupOpts=o.data;case 7:case"end":return t.stop()}}),t)})))()},"dialog.forms.floorCode":function(e,t){var r=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return r.roomOpts=[],r.deviceGroupOpts=[],t.next=6,(0,n.RE)({floorCode:e});case 6:o=t.sent,r.roomOpts=o.data;case 8:case"end":return t.stop()}}),t)})))()},"dialog.forms.roomCode":function(e,t){var r=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return r.deviceGroupOpts=[],t.next=5,(0,n.w8)({roomCode:e});case 5:o=t.sent,r.deviceGroupOpts=o.data;case 7:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;(0,n.aJ)().then((function(t){return e.floorOpts=t.data})),(0,n.RE)().then((function(t){return e.roomAllOpts=t.data})),(0,n.mA)().then((function(t){return e.deviceTypeOpts=t.data})),this.handleQuery()},mounted:function(){},methods:{dialogCDSubmit:function(){var e=this;this.$refs["dialogCDForm"].validate((function(t,r){if(!t)return!1;(0,n.Iz)(e.dialogCD.forms).then((function(t){e.$message.success("操作成功!"),e.$refs["dialogCDForm"].resetFields(),e.dialogCD.visible=!1,e.getList()}))}))},dialogSubmit:function(){var e=this;this.$refs["dialogForm"].validate((function(t,r){if(!t)return!1;var o=null;o=e.dialog.forms.id?n.ml:n.P2,o(e.dialog.forms).then((function(t){e.$message.success("操作成功!"),e.$refs["dialogForm"].resetFields(),e.dialog.visible=!1,e.getList()}))}))},handleQuery:function(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset:function(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},handleDialog:function(e){var t=this;return(0,l.Z)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.dialog.forms=e?Object.assign(JSON.parse(JSON.stringify(e))):{roomCode:"",deviceGroupCode:""},t.dialog.visible=!0,t.$nextTick((function(e){return t.$refs["dialogForm"].clearValidate()}));case 3:case"end":return r.stop()}}),r)})))()},handleCDDialog:function(e){var t=this;return(0,l.Z)(regeneratorRuntime.mark((function r(){var o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e){r.next=12;break}return t.dialogCD.forms={id:e.id,name:e.name},r.next=4,(0,n.eM)({id:e.id});case 4:return o=r.sent,t.pointNotBindDeviceGroupOpts=o.data,r.next=8,(0,n.q$)({id:e.id});case 8:i=r.sent,t.pointBindDeviceGroupOpts=i.data,t.$set(t.dialogCD.forms,"pointIdArray",i.data.map((function(e){return e.id}))),t.allPointOpts=t.pointNotBindDeviceGroupOpts.concat(t.pointBindDeviceGroupOpts);case 12:t.dialogCD.visible=!0,t.$nextTick((function(e){return t.$refs["dialogCDForm"].clearValidate()}));case 14:case"end":return r.stop()}}),r)})))()},handleDel:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){(0,n.AP)({id:e}).then((function(e){t.getList(),t.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var e=this;this.listLoading=!0,(0,n.qE)(this.filterForm).then((function(t){e.hasAuth=!0,e.listData=t.data.list,e.listTotal=t.data.total,e.listLoading=!1})).catch((function(t){e.hasAuth=!1})).finally((function(t){e.showPage=!0}))}}},d=s,c=r(35471),u=(0,c.Z)(d,o,i,!1,null,"0ef512e8",null),m=u.exports}}]);