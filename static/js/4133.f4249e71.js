"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[4133],{44133:function(e,t,o){o.r(t),o.d(t,{default:function(){return m}});var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.showPage?i("div",{staticClass:"app-container device-manage"},[e.hasAuth?e._e():i("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?i("div",{staticClass:"head"},[i("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[i("el-form-item",{attrs:{prop:"floorCode"}},[i("el-select",{attrs:{clearable:"",placeholder:"楼层"},on:{change:function(t){e.$set(e.filterForm,"roomCode",""),e.$set(e.filterForm,"deviceGroupCode","")}},model:{value:e.filterForm.floorCode,callback:function(t){e.$set(e.filterForm,"floorCode",t)},expression:"filterForm.floorCode"}},e._l(e.floorOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),i("el-form-item",{attrs:{prop:"roomCode"}},[i("el-select",{attrs:{clearable:"",placeholder:"房间"},on:{change:function(t){return e.$set(e.filterForm,"deviceGroupCode","")}},model:{value:e.filterForm.roomCode,callback:function(t){e.$set(e.filterForm,"roomCode",t)},expression:"filterForm.roomCode"}},e._l(e.roomOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),i("el-form-item",{attrs:{prop:"deviceGroupCode"}},[i("el-select",{attrs:{clearable:"",placeholder:"设备组"},model:{value:e.filterForm.deviceGroupCode,callback:function(t){e.$set(e.filterForm,"deviceGroupCode",t)},expression:"filterForm.deviceGroupCode"}},e._l(e.deviceGroupOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.deviceGroupCode}})})),1)],1),i("el-form-item",{attrs:{prop:"name"}},[i("el-input",{attrs:{placeholder:"设备名称"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"===typeof t?t.trim():t)},expression:"filterForm.name"}})],1),i("el-form-item",{attrs:{prop:"deviceCode"}},[i("el-input",{attrs:{placeholder:"设备编号"},model:{value:e.filterForm.deviceCode,callback:function(t){e.$set(e.filterForm,"deviceCode","string"===typeof t?t.trim():t)},expression:"filterForm.deviceCode"}})],1),i("el-form-item",{attrs:{prop:"deviceType"}},[i("el-select",{attrs:{clearable:"",placeholder:"设备类型","popper-class":"three-column"},model:{value:e.filterForm.deviceType,callback:function(t){e.$set(e.filterForm,"deviceType",t)},expression:"filterForm.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialog()}}},[i("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[i("el-table-column",{attrs:{prop:"deviceCode",label:"设备编号"}}),i("el-table-column",{attrs:{prop:"name",label:"设备名称"}}),i("el-table-column",{attrs:{prop:"deviceType",label:"设备类型"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[i("span",[e._v(e._s(e.deviceTypeOpts.find((function(e){return e.id===o.deviceType}))&&e.deviceTypeOpts.find((function(e){return e.id===o.deviceType})).name))])]}}],null,!1,749874441)}),i("el-table-column",{attrs:{prop:"deviceGroupName",label:"设备组名称"}}),i("el-table-column",{attrs:{prop:"roomName",label:"房间名称"}}),i("el-table-column",{attrs:{prop:"floorName",label:"楼层名称"}}),i("el-table-column",{attrs:{label:"操作",align:"center",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[i("el-button",{attrs:{title:"绑定测点",icon:"el-icon-bdcd",type:"primary",plain:""},on:{click:function(t){return e.handleCDDialog(o)}}}),i("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(o)}}}),i("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(o.id)}}})]}}],null,!1,2191441141)})],1):e._e(),e.hasAuth?i("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),i("el-dialog",{attrs:{visible:e.dialog.visible},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[i("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[i("span",{staticClass:"title-txt"},[e._v(e._s(e.dialog.forms.id?"编辑":"新增"))]),i("img",{attrs:{src:o(1612)}})]),i("el-form",{ref:"dialogForm",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"设备编号",prop:"deviceCode"}},[i("el-input",{attrs:{disabled:!!e.dialog.forms.id},model:{value:e.dialog.forms.deviceCode,callback:function(t){e.$set(e.dialog.forms,"deviceCode",t)},expression:"dialog.forms.deviceCode"}})],1),i("el-form-item",{attrs:{label:"设备名称",prop:"name"}},[i("el-input",{model:{value:e.dialog.forms.name,callback:function(t){e.$set(e.dialog.forms,"name",t)},expression:"dialog.forms.name"}})],1),i("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},[i("el-form-item",{attrs:{label:"楼层",prop:"floorCode"}},[i("el-select",{on:{change:function(t){e.$set(e.dialog.forms,"roomCode",""),e.$set(e.dialog.forms,"deviceGroupCode","")}},model:{value:e.dialog.forms.floorCode,callback:function(t){e.$set(e.dialog.forms,"floorCode",t)},expression:"dialog.forms.floorCode"}},e._l(e.floorOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),i("el-form-item",{attrs:{label:"房间",prop:"roomCode"}},[i("el-select",{on:{change:function(t){return e.$set(e.dialog.forms,"deviceGroupCode","")}},model:{value:e.dialog.forms.roomCode,callback:function(t){e.$set(e.dialog.forms,"roomCode",t)},expression:"dialog.forms.roomCode"}},e._l(e.roomOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),i("el-form-item",{attrs:{label:"设备组",prop:"deviceGroupCode"}},[i("el-select",{model:{value:e.dialog.forms.deviceGroupCode,callback:function(t){e.$set(e.dialog.forms,"deviceGroupCode",t)},expression:"dialog.forms.deviceGroupCode"}},e._l(e.deviceGroupOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.deviceGroupCode}})})),1)],1)],1),i("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},[i("el-form-item",{attrs:{label:"设备类型",prop:"deviceType"}},[i("el-select",{attrs:{"popper-class":"three-column"},model:{value:e.dialog.forms.deviceType,callback:function(t){e.$set(e.dialog.forms,"deviceType",t)},expression:"dialog.forms.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1),i("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSubmit}},[e._v("保 存")])],1)],1),i("el-dialog",{attrs:{visible:e.dialogCD.visible,width:"80%"},on:{"update:visible":function(t){return e.$set(e.dialogCD,"visible",t)}}},[i("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[i("span",{staticClass:"title-txt"},[e._v("绑定测点 - "+e._s(e.dialogCD.forms.name))]),i("img",{attrs:{src:o(1612)}})]),i("el-form",{ref:"dialogCDForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogCD.forms,rules:e.dialogCD.rules}},[i("el-form-item",{attrs:{label:"",prop:""}},[i("el-transfer",{staticClass:"transfer-cd",attrs:{filterable:"","filter-method":function(e,t){return t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allPointOpts},model:{value:e.dialogCD.forms.pointIdArray,callback:function(t){e.$set(e.dialogCD.forms,"pointIdArray",t)},expression:"dialogCD.forms.pointIdArray"}})],1)],1),i("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogCDSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},l=[],r=o(87130),a=o(5211),s={components:{pagination:r.Z},data(){return{showPage:!1,hasAuth:!0,floorOpts:[],deviceGroupOpts:[],roomOpts:[],roomAllOpts:[],deviceTypeOpts:[],pointBindDeviceGroupOpts:[],pointNotBindDeviceGroupOpts:[],allPointOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{floorCode:"",roomCode:"",deviceGroupCode:"",name:"",deviceCode:"",deviceType:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{},rules:{floorCode:[{required:!0,trigger:"blur",message:"请输入"}],roomCode:[{required:!0,trigger:"blur",message:"请输入"}],deviceGroupCode:[{required:!0,trigger:"blur",message:"请输入"}],name:[{required:!0,trigger:"blur",message:"请输入"}],deviceCode:[{required:!0,trigger:"blur",message:"请输入"}],deviceType:[{required:!0,trigger:"blur",message:"请输入"}]}},dialogCD:{visible:!1,forms:{},rules:{}}}},watch:{async"filterForm.floorCode"(e,t){if(!e)return;this.roomOpts=[],this.deviceGroupOpts=[];const o=await(0,a.RE)({floorCode:e});this.roomOpts=o.data},async"filterForm.roomCode"(e,t){if(!e)return;this.deviceGroupOpts=[];const o=await(0,a.w8)({roomCode:e});this.deviceGroupOpts=o.data},async"dialog.forms.floorCode"(e,t){if(!e)return;this.roomOpts=[],this.deviceGroupOpts=[];const o=await(0,a.RE)({floorCode:e});this.roomOpts=o.data},async"dialog.forms.roomCode"(e,t){if(!e)return;this.deviceGroupOpts=[];const o=await(0,a.w8)({roomCode:e});this.deviceGroupOpts=o.data}},created(){(0,a.aJ)().then((e=>this.floorOpts=e.data)),(0,a.RE)().then((e=>this.roomAllOpts=e.data)),(0,a.mA)().then((e=>this.deviceTypeOpts=e.data)),this.handleQuery()},mounted(){},methods:{dialogCDSubmit(){this.$refs["dialogCDForm"].validate(((e,t)=>{if(!e)return!1;(0,a.Iz)(this.dialogCD.forms).then((e=>{this.$message.success("操作成功!"),this.$refs["dialogCDForm"].resetFields(),this.dialogCD.visible=!1,this.getList()}))}))},dialogSubmit(){this.$refs["dialogForm"].validate(((e,t)=>{if(!e)return!1;{let e=null;e=this.dialog.forms.id?a.ml:a.P2,e(this.dialog.forms).then((e=>{this.$message.success("操作成功!"),this.$refs["dialogForm"].resetFields(),this.dialog.visible=!1,this.getList()}))}}))},handleQuery(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},async handleDialog(e){this.dialog.forms=e?Object.assign(JSON.parse(JSON.stringify(e))):{roomCode:"",deviceGroupCode:""},this.dialog.visible=!0,this.$nextTick((e=>this.$refs["dialogForm"].clearValidate()))},async handleCDDialog(e){if(e){this.dialogCD.forms={id:e.id,name:e.name};const t=await(0,a.eM)({id:e.id});this.pointNotBindDeviceGroupOpts=t.data;const o=await(0,a.q$)({id:e.id});this.pointBindDeviceGroupOpts=o.data,this.$set(this.dialogCD.forms,"pointIdArray",o.data.map((e=>e.id))),this.allPointOpts=this.pointNotBindDeviceGroupOpts.concat(this.pointBindDeviceGroupOpts)}this.dialogCD.visible=!0,this.$nextTick((e=>this.$refs["dialogCDForm"].clearValidate()))},handleDel(e){this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,a.AP)({id:e}).then((e=>{this.getList(),this.$message.success("删除成功!")}))})).catch((()=>{}))},getList(){this.listLoading=!0,(0,a.qE)(this.filterForm).then((e=>{this.hasAuth=!0,this.listData=e.data.list,this.listTotal=e.data.total,this.listLoading=!1})).catch((e=>{this.hasAuth=!1})).finally((e=>{this.showPage=!0}))}}},d=s,n=o(35471),c=(0,n.Z)(d,i,l,!1,null,"0ef512e8",null),m=c.exports}}]);