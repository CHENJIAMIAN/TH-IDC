(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[8236],{53741:function(e,t,n){var a=n(28887),l=Math.floor;e.exports=Number.isInteger||function(e){return!a(e)&&isFinite(e)&&l(e)===e}},16544:function(e,t,n){var a=n(32538),l=n(53741);a({target:"Number",stat:!0},{isInteger:l})},41849:function(e,t,n){"use strict";n.d(t,{C0:function(){return s},Mj:function(){return r},Uz:function(){return u},eW:function(){return o},ed:function(){return i}});var a,l=n(20638),r=(n(16544),n(24238),n(48503),[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}]),i=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],o=(a={id:1,name:"母联柜"},(0,l.Z)(a,"id",2),(0,l.Z)(a,"name","直流操作电源柜"),(0,l.Z)(a,"id",3),(0,l.Z)(a,"name","变压器"),(0,l.Z)(a,"id",4),(0,l.Z)(a,"name","低压进线柜"),(0,l.Z)(a,"id",5),(0,l.Z)(a,"name","配电柜"),(0,l.Z)(a,"id",6),(0,l.Z)(a,"name","柴油发电机组"),(0,l.Z)(a,"id",7),(0,l.Z)(a,"name","蓄电池"),(0,l.Z)(a,"id",8),(0,l.Z)(a,"name","UPS主机"),(0,l.Z)(a,"id",9),(0,l.Z)(a,"name","UPS变换器"),(0,l.Z)(a,"id",10),(0,l.Z)(a,"name","UPS逆变器"),(0,l.Z)(a,"id",11),(0,l.Z)(a,"name","列头柜"),(0,l.Z)(a,"id",12),(0,l.Z)(a,"name","空调"),(0,l.Z)(a,"id",13),(0,l.Z)(a,"name","温湿度"),(0,l.Z)(a,"id",14),(0,l.Z)(a,"name","氢气探测器"),(0,l.Z)(a,"id",15),(0,l.Z)(a,"name","水浸"),[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}]),s=function(e,t,n){e.required||void 0!==t&&""!==t||n(),""===t||!Number.isInteger(+t)||+t<0?n(new Error("请输入整数值")):n()},u=function(e,t,n){""===t||isNaN(t)||Number(t)<0?n(new Error("请输入非负数字")):n()}},78236:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.showPage?n("div",{staticClass:"app-container menu-manage"},[e.hasAuth?e._e():n("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?n("div",{staticClass:"head"},[n("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[n("el-form-item",{attrs:{prop:"noteLevel"}},[n("el-select",{attrs:{clearable:"",placeholder:"通知等级"},model:{value:e.filterForm.noteLevel,callback:function(t){e.$set(e.filterForm,"noteLevel",t)},expression:"filterForm.noteLevel"}},e._l(e.alertLevelOpts,(function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),n("el-form-item",{attrs:{prop:"noteMode"}},[n("el-select",{attrs:{clearable:"",placeholder:"通知方式"},model:{value:e.filterForm.noteMode,callback:function(t){e.$set(e.filterForm,"noteMode",t)},expression:"filterForm.noteMode"}},e._l(e.noteModeOpts,(function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),n("el-form-item",{attrs:{prop:"sendTarget"}},[n("el-input",{attrs:{placeholder:"目标邮箱/号码"},model:{value:e.filterForm.sendTarget,callback:function(t){e.$set(e.filterForm,"sendTarget",t)},expression:"filterForm.sendTarget"}})],1),n("el-form-item",{attrs:{prop:"sendContent"}},[n("el-input",{attrs:{placeholder:"告警内容"},model:{value:e.filterForm.sendContent,callback:function(t){e.$set(e.filterForm,"sendContent","string"===typeof t?t.trim():t)},expression:"filterForm.sendContent"}})],1),n("el-form-item",{attrs:{prop:"status"}},[n("el-select",{attrs:{clearable:"",placeholder:"状态"},model:{value:e.filterForm.status,callback:function(t){e.$set(e.filterForm,"status",t)},expression:"filterForm.status"}},[n("el-option",{attrs:{"text-color":"#55fb55",label:"成功",value:1}}),n("el-option",{attrs:{"text-color":"gray",label:"失败",value:2}})],1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}}),n("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1)],1)],1):e._e(),e.hasAuth?n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[n("el-table-column",{attrs:{prop:"noteId",label:"通知ID"}}),n("el-table-column",{attrs:{prop:"noteLevel",label:"通知等级"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s(e.alertLevelOpts.find((function(e){return e.id==n.noteLevel}))&&e.alertLevelOpts.find((function(e){return e.id==n.noteLevel})).name)+" ")]}}],null,!1,1021023058)}),n("el-table-column",{attrs:{sortable:"",prop:"noteMode",label:"通知方式"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s(e.noteModeOpts.find((function(e){return e.id==n.noteMode}))&&e.noteModeOpts.find((function(e){return e.id==n.noteMode})).name)+" ")]}}],null,!1,1086436786)}),n("el-table-column",{attrs:{prop:"toUser",label:"接收者用户ID"}}),n("el-table-column",{attrs:{prop:"userName",label:"接收者用户名称",width:"160"}}),n("el-table-column",{attrs:{prop:"sendTarget",label:"目标邮箱/号码"}}),n("el-table-column",{attrs:{prop:"sendContent",label:"告警内容"}}),n("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1==a.status?n("span",{staticStyle:{color:"#55fb55"}},[e._v("成功")]):n("span",{staticStyle:{color:"gray"}},[e._v("失败")])]}}],null,!1,1749058218)})],1):e._e(),e.hasAuth?n("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e()],1):e._e()},l=[],r=(n(23087),n(41849)),i=n(87130),o=n(97595),s={components:{pagination:i.Z},data:function(){return{showPage:!1,hasAuth:!0,noteModeOpts:r.ed,alertLevelOpts:[],depOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{noteLevel:null,noteMode:null,sendTarget:"",sendContent:"",status:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0}},watch:{},created:function(){var e=this;(0,o.D4)().then((function(t){return e.alertLevelOpts=t.data})),this.handleQuery()},mounted:function(){},methods:{handleQuery:function(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset:function(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},handleResumeStatus:function(e){var t=this;this.$confirm("确认恢复状态?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){alertNotificationDelete({id:e}).then((function(e){t.getList(),t.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var e=this;this.listLoading=!0,(0,o.HE)(this.filterForm).then((function(t){e.hasAuth=!0,e.listData=t.data.list,e.listTotal=t.data.total,e.listLoading=!1})).catch((function(t){e.hasAuth=!1})).finally((function(t){e.showPage=!0}))}}},u=s,d=n(35471),c=(0,d.Z)(u,a,l,!1,null,"55c2814a",null),m=c.exports}}]);