"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[9196],{41849:function(e,t,a){a.d(t,{C0:function(){return o},Mj:function(){return r},Uz:function(){return i},eW:function(){return s},ed:function(){return l}});a(48503);const r=[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}],l=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],s=[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}],o=(e,t,a)=>{e.required||void 0!==t&&""!==t||a(),""===t||!Number.isInteger(+t)||+t<0?a(new Error("请输入整数值")):a()},i=(e,t,a)=>{""===t||isNaN(t)||Number(t)<0?a(new Error("请输入非负数字")):a()}},99196:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showPage?r("div",{staticClass:"app-container auth-manage"},[e.hasAuth?e._e():r("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?r("div",{staticClass:"head"},[r("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.handleSubmit}},[e._v(" 保存 ")])],1)],1)],1):e._e(),e.hasAuth?r("div",{staticClass:"content",staticStyle:{overflow:"auto","padding-right":"5px"}},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"forms1",attrs:{model:e.forms,rules:e.rules,inline:"","label-width":"120px"}},[r("h3",{staticStyle:{color:"#31c6f1"}},[e._v("实时数据存储方式")]),r("el-row",[r("el-col",{attrs:{span:16}},[r("el-form-item",{attrs:{label:"实时存储方式",prop:"realtime_store_type"}},[r("el-radio-group",{staticClass:"new-el-radio-group",staticStyle:{width:"100%"},model:{value:e.forms.realtime_store_type,callback:function(t){e.$set(e.forms,"realtime_store_type",t)},expression:"forms.realtime_store_type"}},[r("el-radio",{attrs:{border:"",label:"1"}},[e._v("组合存储")]),r("el-radio",{attrs:{border:"",label:"2"}},[e._v("全量实时存储")]),r("el-radio",{attrs:{border:"",label:"3"}},[e._v("不存储")])],1)],1)],1)],1),1==e.forms.realtime_store_type?r("el-card",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"周期存储(分钟)",prop:"cyclestore"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.cyclestore,callback:function(t){e.$set(e.forms,"cyclestore",t)},expression:"forms.cyclestore"}})],1),r("el-form-item",{attrs:{label:"",prop:"cyclestore_has"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},on:{change:function(t){return e.$refs["forms1"].clearValidate()}},model:{value:e.forms.cyclestore_has,callback:function(t){e.$set(e.forms,"cyclestore_has",t)},expression:"forms.cyclestore_has"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"变化率存储(%)",prop:"changerate"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.changerate,callback:function(t){e.$set(e.forms,"changerate",t)},expression:"forms.changerate"}})],1),r("el-form-item",{attrs:{label:"",prop:"changerate_has"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},on:{change:function(t){return e.$refs["forms1"].clearValidate()}},model:{value:e.forms.changerate_has,callback:function(t){e.$set(e.forms,"changerate_has",t)},expression:"forms.changerate_has"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"变化大小存储",prop:"changesize"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.changesize,callback:function(t){e.$set(e.forms,"changesize",t)},expression:"forms.changesize"}})],1),r("el-form-item",{attrs:{label:"",prop:"changesize_has"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},on:{change:function(t){return e.$refs["forms1"].clearValidate()}},model:{value:e.forms.changesize_has,callback:function(t){e.$set(e.forms,"changesize_has",t)},expression:"forms.changesize_has"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"测点实时存储",prop:"points_has"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:e.forms.points_has,callback:function(t){e.$set(e.forms,"points_has",t)},expression:"forms.points_has"}})],1),r("el-form-item",[r("el-button",{attrs:{title:"测点选择",icon:"el-icon-circle-plus-outline",type:"primary",plain:""},on:{click:e.handleCDDialog}},[e._v("测点选择")])],1)],1)],1):e._e()],1),r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"forms",attrs:{model:e.forms,rules:e.rules,inline:"","label-width":"180px"}},[r("el-divider",{staticStyle:{margin:"10px 0"}}),r("h3",{staticStyle:{color:"#31c6f1"}},[e._v("存储时间")]),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"全量实时数据(月)",prop:"all_realtime_data"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.all_realtime_data,callback:function(t){e.$set(e.forms,"all_realtime_data",t)},expression:"forms.all_realtime_data"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"组合实时数据(月)",prop:"union_realtime_data"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.union_realtime_data,callback:function(t){e.$set(e.forms,"union_realtime_data",t)},expression:"forms.union_realtime_data"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"规整数据(年)",prop:"regular_data"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.regular_data,callback:function(t){e.$set(e.forms,"regular_data",t)},expression:"forms.regular_data"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"告警事件(年)",prop:"alert_data"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.alert_data,callback:function(t){e.$set(e.forms,"alert_data",t)},expression:"forms.alert_data"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"操作日志(年)",prop:"action_log"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.action_log,callback:function(t){e.$set(e.forms,"action_log",t)},expression:"forms.action_log"}})],1)],1)],1),r("el-divider",{staticStyle:{margin:"10px 0"}}),r("h3",{staticStyle:{color:"#31c6f1"}},[e._v("磁盘")]),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"磁盘总容量(GB)",prop:"store_all_size"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.store_all_size,callback:function(t){e.$set(e.forms,"store_all_size",t)},expression:"forms.store_all_size"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"磁盘已使用容量(GB)",prop:"store_use_size"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.store_use_size,callback:function(t){e.$set(e.forms,"store_use_size",t)},expression:"forms.store_use_size"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"磁盘空间占用报警阀值(%)",prop:"store_use_alert"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.forms.store_use_alert,callback:function(t){e.$set(e.forms,"store_use_alert",t)},expression:"forms.store_use_alert"}})],1)],1),r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"磁盘容量告警",prop:"store_alert_switch"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:e.forms.store_alert_switch,callback:function(t){e.$set(e.forms,"store_alert_switch",t)},expression:"forms.store_alert_switch"}},[e._v("当磁盘空间占用达到设定阈值时报警")])],1)],1),r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"数据删除",prop:"delete_data_switch"}},[r("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:e.forms.delete_data_switch,callback:function(t){e.$set(e.forms,"delete_data_switch",t)},expression:"forms.delete_data_switch"}},[e._v("基于存储时间要求自动删除")])],1)],1)],1)],1)],1):e._e(),r("el-dialog",{attrs:{visible:e.dialogCD.visible,width:"60%"},on:{"update:visible":function(t){return e.$set(e.dialogCD,"visible",t)}}},[r("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-txt"},[e._v("绑定测点")]),r("img",{attrs:{src:a(1612)}})]),r("el-form",{ref:"dialogCDForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogCD.forms,rules:e.dialogCD.rules,"label-width":"100px"}},[r("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr"}},[r("el-form-item",{attrs:{label:"楼层",prop:"floorCode"}},[r("el-select",{attrs:{clearable:""},on:{change:function(t){e.$set(e.dialogCD.forms,"roomCode",""),e.$set(e.dialogCD.forms,"deviceGroupCode","")}},model:{value:e.dialogCD.forms.floorCode,callback:function(t){e.$set(e.dialogCD.forms,"floorCode",t)},expression:"dialogCD.forms.floorCode"}},e._l(e.floorOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),r("el-form-item",{staticStyle:{"justify-self":"end"},attrs:{label:"房间",prop:"roomCode"}},[r("el-select",{attrs:{clearable:""},model:{value:e.dialogCD.forms.roomCode,callback:function(t){e.$set(e.dialogCD.forms,"roomCode",t)},expression:"dialogCD.forms.roomCode"}},e._l(e.roomOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1)],1),r("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr"}},[r("el-form-item",{attrs:{label:"设备类型",prop:"deviceTypeId"}},[r("el-select",{attrs:{clearable:"","popper-class":"three-column"},on:{change:function(t){return e.$set(e.dialogCD.forms,"pointType","")}},model:{value:e.dialogCD.forms.deviceTypeId,callback:function(t){e.$set(e.dialogCD.forms,"deviceTypeId",t)},expression:"dialogCD.forms.deviceTypeId"}},e._l(e.deviceTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{staticStyle:{"justify-self":"end"},attrs:{label:"测点类型",prop:"pointType"}},[r("el-select",{attrs:{clearable:""},model:{value:e.dialogCD.forms.pointType,callback:function(t){e.$set(e.dialogCD.forms,"pointType",t)},expression:"dialogCD.forms.pointType"}},e._l(e.pointTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),r("div",{staticStyle:{display:"grid","grid-template-columns":"1fr auto"}},[r("el-form-item",{attrs:{label:"设备编号",prop:"deviceCode"}},[r("el-input",{model:{value:e.dialogCD.forms.deviceCode,callback:function(t){e.$set(e.dialogCD.forms,"deviceCode",t)},expression:"dialogCD.forms.deviceCode"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQueryNotBind}})],1)],1),r("el-form-item",{attrs:{label:"",prop:"","label-width":"20px"}},[r("el-transfer",{directives:[{name:"loading",rawName:"v-loading",value:e.transferLoading,expression:"transferLoading"}],staticClass:"custom-transfer",attrs:{filterable:"","filter-method":function(e,t){return!!t.name&&t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allPointOpts},model:{value:e.dialogCD.forms.poindIdArray,callback:function(t){e.$set(e.dialogCD.forms,"poindIdArray",t)},expression:"dialogCD.forms.poindIdArray"}})],1)],1),r("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogCDSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},l=[],s=(a(48503),a(87130)),o=a(97595),i=a(5211),n=a(41849),d={components:{pagination:s.Z},data(){const e=(e,t,a)=>{""===t||isNaN(t)||Number(t)<0||Number(t)>100?a(new Error("请输入小于100的非负数字")):a()};return{showPage:!1,hasAuth:!0,floorOpts:[],roomOpts:[],deviceTypeOpts:[],pointTypeOpts:[],depOpts:[],firstMenuOpts:[],allPointOpts:[],secondMenuOpts:[],thirdMenuOpts:[],pointTypeOpts:[],filterForm:{pageNo:1,pageSize:10},transferLoading:!0,listLoading:!0,listData:[],listTotal:0,remouldAspirationOption:[],forms:{},rules:{realtime_store_type:[{required:!1,trigger:"blur",validator:n.Uz}],cyclestore:[{required:!0,trigger:"blur",validator:(e,t,a)=>{+this.forms.cyclestore_has||a(),""===t||isNaN(t)||Number(t)<0?a(new Error("请输入非负数字")):a()}}],changerate:[{required:!0,trigger:"blur",validator:(e,t,a)=>{+this.forms.changerate_has||a(),""===t||isNaN(t)||Number(t)<0?a(new Error("请输入非负数字")):a()}}],changesize:[{required:!0,trigger:"blur",validator:(e,t,a)=>{+this.forms.changesize_has||a(),""===t||isNaN(t)||Number(t)<0?a(new Error("请输入非负数字")):a()}}],all_realtime_data:[{required:!1,trigger:"blur",validator:n.Uz}],union_realtime_data:[{required:!1,trigger:"blur",validator:n.Uz}],regular_data:[{required:!1,trigger:"blur",validator:n.Uz}],alert_data:[{required:!1,trigger:"blur",validator:n.Uz}],action_log:[{required:!1,trigger:"blur",validator:n.Uz}],store_all_size:[{required:!1,trigger:"blur",validator:n.Uz}],store_use_size:[{required:!1,trigger:"blur",validator:n.Uz}],store_use_alert:[{required:!1,trigger:"blur",validator:e}],store_alert_switch:[{required:!1,trigger:"blur",validator:n.Uz}],delete_data_switch:[{required:!1,trigger:"blur",validator:n.Uz}]},dialogCD:{visible:!1,forms:{},rules:{}}}},watch:{async"dialogCD.forms.deviceTypeId"(e,t){if(!e)return;this.pointTypeOpts=[];const a=await(0,i.W3)({deviceTypeId:e});this.pointTypeOpts=a.data},async"dialogCD.forms.floorCode"(e,t){if(!e)return;this.roomOpts=[],this.deviceGroupOpts=[];const a=await(0,i.RE)({floorCode:e});this.roomOpts=a.data}},async created(){(0,i.aJ)().then((e=>this.floorOpts=e.data)),(0,i.mA)().then((e=>this.deviceTypeOpts=e.data)),this.handleQuery()},mounted(){},methods:{async handleCDDialog(){this.dialogCD.forms={},this.dialogCD.visible=!0,this.transferLoading=!0;const e=await(0,o.s4)();this.pointNotBindDeviceGroupOpts=e.data;const t=await(0,o.CP)();this.transferLoading=!1,this.pointBindDeviceGroupOpts=t.data,this.$set(this.dialogCD.forms,"poindIdArray",t.data.map((e=>e.id))),this.allPointOpts=this.pointNotBindDeviceGroupOpts.concat(this.pointBindDeviceGroupOpts),this.$nextTick((e=>this.$refs["dialogCDForm"].clearValidate()))},dialogCDSubmit(){this.$refs["dialogCDForm"].validate(((e,t)=>{if(!e)return!1;(0,o.VF)(this.dialogCD.forms).then((e=>{this.$message.success("操作成功!"),this.$refs["dialogCDForm"].resetFields(),this.dialogCD.visible=!1,this.getList()}))}))},handleSubmit(){this.$refs["forms"].validate(((e,t)=>{if(!e)return!1;this.$refs["forms1"].validate(((e,t)=>{if(!e)return!1;(0,o.Pt)(this.forms).then((e=>{this.$message.success("操作成功!"),this.handleQuery()}))}))}))},async handleQueryNotBind(){this.transferLoading=!0;const e=await(0,o.s4)(this.dialogCD.forms);this.transferLoading=!1,this.pointNotBindDeviceGroupOpts=e.data,this.allPointOpts=this.pointNotBindDeviceGroupOpts.concat(this.pointBindDeviceGroupOpts)},handleQuery(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleDel(e){this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{alertLevelDelete({id:e}).then((e=>{this.getList(),this.$message.success("删除成功!")}))})).catch((()=>{}))},getList(){this.listLoading=!0,(0,o.UD)().then((e=>{this.hasAuth=!0,this.forms=e.data,this.listLoading=!1})).catch((e=>{this.hasAuth=!1})).finally((e=>{this.showPage=!0}))}}},c=d,m=a(35471),p=(0,m.Z)(c,r,l,!1,null,"5d753377",null),f=p.exports}}]);