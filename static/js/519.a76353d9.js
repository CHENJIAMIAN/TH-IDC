"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[519],{50519:function(e,t,i){i.r(t),i.d(t,{default:function(){return m}});var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.showPage?s("div",{staticClass:"app-container menu-manage"},[e.hasAuth?e._e():s("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?s("div",{staticClass:"head"},[s("el-form",{ref:"filterForm",attrs:{inline:!0,size:"medium",model:e.filterForm}},[s("el-form-item",{attrs:{prop:"searchName"}},[s("el-input",{attrs:{placeholder:"名称"},model:{value:e.filterForm.searchName,callback:function(t){e.$set(e.filterForm,"searchName","string"===typeof t?t.trim():t)},expression:"filterForm.searchName"}})],1),s("el-form-item",{attrs:{prop:"menuType"}},[s("el-select",{attrs:{clearable:""},model:{value:e.filterForm.menuType,callback:function(t){e.$set(e.filterForm,"menuType",t)},expression:"filterForm.menuType"}},[s("el-option",{attrs:{label:"子系统",value:1}}),s("el-option",{attrs:{label:"模块",value:2}}),s("el-option",{attrs:{label:"菜单",value:3}})],1)],1),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}}),s("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")]),s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialog()}}},[s("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[s("el-table-column",{attrs:{sortable:"",prop:"name",label:"菜单名称"}}),s("el-table-column",{attrs:{prop:"menuType",label:"菜单类型"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[1==i.menuType?s("span",[e._v("子系统")]):2==i.menuType?s("span",[e._v("模块")]):3==i.menuType?s("span",[e._v("菜单")]):e._e()]}}],null,!1,3810809062)}),s("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),s("el-table-column",{attrs:{prop:"createUserName",label:"创建人"}}),s("el-table-column",{attrs:{label:"操作",align:"center",width:"161"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[s("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(i)}}}),s("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(i.id)}}})]}}],null,!1,1998501215)})],1):e._e(),e.hasAuth?s("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),s("el-dialog",{attrs:{visible:e.dialog.visible,top:"25vh"},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[s("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[s("span",{staticClass:"title-txt"},[e._v(e._s(e.dialog.forms.id?"编辑":"新增"))]),s("img",{attrs:{src:i(1612)}})]),s("el-form",{ref:"dialogForm",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[s("el-input",{model:{value:e.dialog.forms.name,callback:function(t){e.$set(e.dialog.forms,"name",t)},expression:"dialog.forms.name"}})],1),s("el-form-item",{attrs:{label:"菜单类型",prop:"menuType"}},[s("el-radio-group",{staticStyle:{width:"100%"},attrs:{disabled:!!e.dialog.forms.id},model:{value:e.dialog.forms.menuType,callback:function(t){e.$set(e.dialog.forms,"menuType",t)},expression:"dialog.forms.menuType"}},[s("el-radio",{attrs:{border:"",label:1}},[e._v("子系统")]),s("el-radio",{attrs:{border:"",label:2}},[e._v("模块")]),s("el-radio",{attrs:{border:"",label:3}},[e._v("菜单")])],1)],1),2==e.dialog.forms.menuType||3==e.dialog.forms.menuType?s("el-form-item",{attrs:{label:"子系统",prop:"firstMenuId"}},[s("el-select",{on:{change:function(t){return e.$set(e.dialog.forms,"secondMenuId","")}},model:{value:e.dialog.forms.firstMenuId,callback:function(t){e.$set(e.dialog.forms,"firstMenuId",t)},expression:"dialog.forms.firstMenuId"}},e._l(e.firstMenuOpts,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1):e._e(),3==e.dialog.forms.menuType?s("el-form-item",{attrs:{label:"模块",prop:"secondMenuId"}},[s("el-select",{model:{value:e.dialog.forms.secondMenuId,callback:function(t){e.$set(e.dialog.forms,"secondMenuId",t)},expression:"dialog.forms.secondMenuId"}},e._l(e.secondMenuOpts,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1):e._e()],1),s("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},a=[],l=i(87130),r=i(42070),o={components:{pagination:l.Z},data(){return{showPage:!1,hasAuth:!0,depOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{searchName:"",menuType:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{},rules:{name:[{required:!0,trigger:"blur",message:"请输入"}],menuType:[{required:!0,trigger:"change",message:"请输入"}],firstMenuId:[{required:!0,trigger:"change",message:"请输入"}],secondMenuId:[{required:!0,trigger:"change",message:"请输入"}],thirdMenuId:[{required:!0,trigger:"change",message:"请输入"}]}}}},watch:{async"dialog.forms.firstMenuId"(e,t){if(!e)return;this.secondMenuOpts=[];const i=await(0,r.Ee)({parentId:e,menuType:2});this.secondMenuOpts=i.data}},created(){this.handleQuery()},mounted(){},methods:{dialogSubmit(){this.$refs["dialogForm"].validate(((e,t)=>{if(!e)return!1;{let e=null;switch(this.dialog.forms.menuType){case 1:this.dialog.forms.parentId=null;break;case 2:if(this.dialog.forms.parentId=this.dialog.forms.firstMenuId,!this.dialog.forms.firstMenuId)return void this.$message.error("请选择父级菜单");break;case 3:if(this.dialog.forms.parentId=this.dialog.forms.secondMenuId,!this.dialog.forms.secondMenuId)return void this.$message.error("请选择父级菜单");break}delete this.dialog.forms.firstMenuId,delete this.dialog.forms.secondMenuId,e=this.dialog.forms.id?r.DE:r.TQ,e(this.dialog.forms).then((e=>{this.$message.success("操作成功!"),this.$refs["dialogForm"].resetFields(),this.dialog.visible=!1,this.getList()}))}}))},handleQuery(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},async handleDialog(e){const t=await(0,r.Ee)({menuType:1});if(this.firstMenuOpts=t.data,e)switch(this.dialog.forms=Object.assign(JSON.parse(JSON.stringify(e)),{firstMenuId:null,
//!!!!!让这两个变量变响应式
secondMenuId:null}),console.log(this.dialog.forms),e.menuType){case 1:break;case 2:this.dialog.forms.firstMenuId=e.parentId;break;case 3:const t=await(0,r.Ee)({menuType:2});this.secondMenuOpts=t.data,this.dialog.forms.secondMenuId=e.parentId;const i=this.secondMenuOpts.find((t=>t.id===e.parentId)),s=this.firstMenuOpts.find((e=>e.id===i.parentId));this.dialog.forms.firstMenuId=s.id;break}else this.dialog.forms={};this.dialog.visible=!0,this.$nextTick((e=>this.$refs["dialogForm"].clearValidate()))},handleDel(e){this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,r.v)({id:e}).then((e=>{this.getList(),this.$message.success("删除成功!")}))})).catch((()=>{}))},getList(){this.listLoading=!0,(0,r.Yf)(this.filterForm).then((e=>{this.hasAuth=!0,this.listData=e.data.list,this.listTotal=e.data.total,this.listLoading=!1})).catch((e=>{this.hasAuth=!1})).finally((e=>{this.showPage=!0}))}}},n=o,d=i(35471),u=(0,d.Z)(n,s,a,!1,null,"5b1055c1",null),m=u.exports}}]);