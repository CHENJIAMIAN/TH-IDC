(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[3704],{53741:function(e,t,i){var r=i(28887),o=Math.floor;e.exports=Number.isInteger||function(e){return!r(e)&&isFinite(e)&&o(e)===e}},61194:function(e,t,i){"use strict";var r=i(32538),o=i(35565).find,a=i(35707),l="find",n=!0;l in[]&&Array(1)[l]((function(){n=!1})),r({target:"Array",proto:!0,forced:n},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),a(l)},16544:function(e,t,i){var r=i(32538),o=i(53741);r({target:"Number",stat:!0},{isInteger:o})},72802:function(e,t,i){"use strict";i.d(t,{P:function(){return o}});i(63810);var r="",o=r+"/admin/uploadFile/upload"},41849:function(e,t,i){"use strict";i.d(t,{C0:function(){return s},Mj:function(){return a},Uz:function(){return d},eW:function(){return n},ed:function(){return l}});var r,o=i(20638),a=(i(16544),i(24238),i(48503),[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}]),l=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],n=(r={id:1,name:"母联柜"},(0,o.Z)(r,"id",2),(0,o.Z)(r,"name","直流操作电源柜"),(0,o.Z)(r,"id",3),(0,o.Z)(r,"name","变压器"),(0,o.Z)(r,"id",4),(0,o.Z)(r,"name","低压进线柜"),(0,o.Z)(r,"id",5),(0,o.Z)(r,"name","配电柜"),(0,o.Z)(r,"id",6),(0,o.Z)(r,"name","柴油发电机组"),(0,o.Z)(r,"id",7),(0,o.Z)(r,"name","蓄电池"),(0,o.Z)(r,"id",8),(0,o.Z)(r,"name","UPS主机"),(0,o.Z)(r,"id",9),(0,o.Z)(r,"name","UPS变换器"),(0,o.Z)(r,"id",10),(0,o.Z)(r,"name","UPS逆变器"),(0,o.Z)(r,"id",11),(0,o.Z)(r,"name","列头柜"),(0,o.Z)(r,"id",12),(0,o.Z)(r,"name","空调"),(0,o.Z)(r,"id",13),(0,o.Z)(r,"name","温湿度"),(0,o.Z)(r,"id",14),(0,o.Z)(r,"name","氢气探测器"),(0,o.Z)(r,"id",15),(0,o.Z)(r,"name","水浸"),[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}]),s=function(e,t,i){e.required||void 0!==t&&""!==t||i(),""===t||!Number.isInteger(+t)||+t<0?i(new Error("请输入整数值")):i()},d=function(e,t,i){""===t||isNaN(t)||Number(t)<0?i(new Error("请输入非负数字")):i()}},13704:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return g}});var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showPage?r("div",{staticClass:"app-container device-group-manage"},[e.hasAuth?e._e():r("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?r("div",{staticClass:"head"},[r("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[r("el-form-item",{attrs:{prop:"floorCode"}},[r("el-select",{attrs:{clearable:"",placeholder:"楼层"},on:{change:function(t){return e.$set(e.dialog.forms,"roomCode","")}},model:{value:e.filterForm.floorCode,callback:function(t){e.$set(e.filterForm,"floorCode",t)},expression:"filterForm.floorCode"}},e._l(e.floorOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),r("el-form-item",{attrs:{prop:"roomCode"}},[r("el-select",{attrs:{clearable:"",placeholder:"房间"},model:{value:e.filterForm.roomCode,callback:function(t){e.$set(e.filterForm,"roomCode",t)},expression:"filterForm.roomCode"}},e._l(e.roomOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),r("el-form-item",{attrs:{prop:"deviceGroupCode"}},[r("el-input",{attrs:{placeholder:"设备组编号"},model:{value:e.filterForm.deviceGroupCode,callback:function(t){e.$set(e.filterForm,"deviceGroupCode","string"===typeof t?t.trim():t)},expression:"filterForm.deviceGroupCode"}})],1),r("el-form-item",{attrs:{prop:"name"}},[r("el-input",{attrs:{placeholder:"设备组名称"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"===typeof t?t.trim():t)},expression:"filterForm.name"}})],1),r("el-form-item",{attrs:{prop:"deviceType"}},[r("el-select",{attrs:{clearable:"",placeholder:"设备组类型","popper-class":"three-column"},model:{value:e.filterForm.deviceType,callback:function(t){e.$set(e.filterForm,"deviceType",t)},expression:"filterForm.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{prop:"groupType"}},[r("el-select",{attrs:{clearable:"",placeholder:"设备组分类"},model:{value:e.filterForm.groupType,callback:function(t){e.$set(e.filterForm,"groupType",t)},expression:"filterForm.groupType"}},e._l(e.groupTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialog()}}},[r("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[r("el-table-column",{attrs:{prop:"deviceGroupCode",label:"设备组编号"}}),r("el-table-column",{attrs:{prop:"name",label:"设备组名称"}}),r("el-table-column",{attrs:{prop:"deviceType",label:"设备组类型"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[r("span",[e._v(e._s(e.deviceTypeOpts.find((function(e){return e.id===i.deviceType}))&&e.deviceTypeOpts.find((function(e){return e.id===i.deviceType})).name))])]}}],null,!1,749874441)}),r("el-table-column",{attrs:{prop:"imgUrl",label:"预览图"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){return e.handleImgDialog(i)}}},[e._v("编辑")])]}}],null,!1,826107909)}),r("el-table-column",{attrs:{prop:"groupType",label:"分类"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[r("span",[e._v(e._s(e.groupTypeOpts.find((function(e){return e.id===i.groupType}))&&e.groupTypeOpts.find((function(e){return e.id===i.groupType})).name))])]}}],null,!1,247876105)}),r("el-table-column",{attrs:{prop:"parentName",label:"父级设备组名称"}}),r("el-table-column",{attrs:{prop:"roomName",label:"房间名称"}}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[1==i.groupType?r("el-button",{attrs:{title:"绑定设备",icon:"el-icon-bdsb",type:"primary",plain:""},on:{click:function(t){return e.handleSBDialog(i)}}}):e._e(),2==i.groupType?r("el-button",{attrs:{title:"逻辑设备组绑定实体设备组",icon:"el-icon-guide",type:"primary",plain:""},on:{click:function(t){return e.handleLJDialog(i)}}}):e._e(),r("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(i)}}}),r("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(i.id)}}})]}}],null,!1,77931800)})],1):e._e(),e.hasAuth?r("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),r("el-dialog",{staticClass:"dialog-img",attrs:{visible:e.dialogImg.visible,width:"95%"},on:{"update:visible":function(t){return e.$set(e.dialogImg,"visible",t)}}},[r("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-txt"},[e._v("图片采点 - "+e._s(e.dialog.forms.name))]),r("img",{attrs:{src:i(1612)}})]),r("div",{staticClass:"content-head"},[r("div"),r("div",[e._v(" 图片类型 "),r("el-select",{model:{value:e.dialogImg.imgType,callback:function(t){e.$set(e.dialogImg,"imgType",t)},expression:"dialogImg.imgType"}},e._l(e.imgTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("div",[e._v(" 测点类型 "),r("el-select",{on:{change:function(t){return e.handleImgDialog()}},model:{value:e.dialog.forms.pointType,callback:function(t){e.$set(e.dialog.forms,"pointType",t)},expression:"dialog.forms.pointType"}},e._l(e.pointTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("div",[e._v("未绑测点")])]),r("div",{staticClass:"grid"},[r("div",{staticClass:"left"},[e.dialogImg.visible?r("div",{ref:"preiviewImgContainer",staticStyle:{position:"relative"}},[r("img",{ref:"preiviewImg",staticClass:"preview-img",style:{cursor:e.dialogImg.forms.selectedNotBind?"crosshair":"unset"},attrs:{src:e.dialogImg.forms.imgUrl,alt:"加载失败"},on:{click:e.addToBindPointLocation}})]):e._e()]),r("div",{staticClass:"right"},[r("div",{staticClass:"radios"},e._l(e.listDataCDNotBind,(function(t){return r("el-radio",{key:t.id,attrs:{label:t,border:""},model:{value:e.dialogImg.forms.selectedNotBind,callback:function(t){e.$set(e.dialogImg.forms,"selectedNotBind",t)},expression:"dialogImg.forms.selectedNotBind"}},[e._v(e._s(t.name))])})),1),r("div",{staticClass:"table"},[r("el-table",{staticClass:"btm-table",staticStyle:{overflow:"auto"},attrs:{"empty-text":" ",stripe:"",border:"",data:e.listDataCDBind}},[r("el-table-column",{attrs:{sortable:"",prop:"pointCode",label:"测点编号",width:"150"}}),r("el-table-column",{attrs:{sortable:"",prop:"name",label:"测点名称"}}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[r("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.removeToNotBindPointLocation(i)}}})]}}],null,!1,3734692064)})],1)],1)])]),r("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogImgSubmit}},[e._v("保 存")])],1)]),r("el-dialog",{attrs:{visible:e.dialog.visible,top:"10vh"},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[r("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-txt"},[e._v(e._s(e.dialog.forms.id?"编辑":"新增"))]),r("img",{attrs:{src:i(1612)}})]),r("el-form",{ref:"dialogForm",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"设备组编号",prop:"deviceGroupCode"}},[r("el-input",{attrs:{disabled:!!e.dialog.forms.id},model:{value:e.dialog.forms.deviceGroupCode,callback:function(t){e.$set(e.dialog.forms,"deviceGroupCode",t)},expression:"dialog.forms.deviceGroupCode"}})],1),r("el-form-item",{attrs:{label:"设备组名称",prop:"name"}},[r("el-input",{model:{value:e.dialog.forms.name,callback:function(t){e.$set(e.dialog.forms,"name",t)},expression:"dialog.forms.name"}})],1),r("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr"}},[r("el-form-item",{attrs:{label:"设备组类型",prop:"deviceType"}},[r("el-select",{attrs:{"popper-class":"three-column"},model:{value:e.dialog.forms.deviceType,callback:function(t){e.$set(e.dialog.forms,"deviceType",t)},expression:"dialog.forms.deviceType"}},e._l(e.deviceTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{label:"楼层",prop:"floorCode"}},[r("el-select",{on:{change:function(t){return e.$set(e.dialog.forms,"roomCode","")}},model:{value:e.dialog.forms.floorCode,callback:function(t){e.$set(e.dialog.forms,"floorCode",t)},expression:"dialog.forms.floorCode"}},e._l(e.floorOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1)],1),r("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr"}},[r("el-form-item",{attrs:{label:"房间",prop:"roomCode"}},[r("el-select",{model:{value:e.dialog.forms.roomCode,callback:function(t){e.$set(e.dialog.forms,"roomCode",t)},expression:"dialog.forms.roomCode"}},e._l(e.roomOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.roomCode}})})),1)],1),r("el-form-item",{attrs:{label:"设备组分类",prop:"groupType"}},[r("el-select",{model:{value:e.dialog.forms.groupType,callback:function(t){e.$set(e.dialog.forms,"groupType",t)},expression:"dialog.forms.groupType"}},e._l(e.groupTypeOpts,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),e.dialog.visible?r("el-form-item",{attrs:{label:"预览图",prop:"imgUrl"}},[r("div",{staticClass:"preview-grid"},[r("el-upload",{ref:"upload",staticClass:"upload-container",attrs:{name:"attach",headers:e.headers,action:e.uploadUrl,data:e.uploadData,"on-success":e.uploadSuccess,"on-remove":e.fileRemove,drag:""}},[r("i",{staticClass:"el-icon-upload"}),r("div",{staticClass:"el-upload__text"},[e._v(" 点击 "),r("em",[e._v("上传文件")]),e._v(" 或拖拽上传 ")])]),e.dialog.forms.imgUrl?r("img",{staticClass:"preview-img",attrs:{src:e.dialog.forms.imgUrl,alt:"图片加载失败"}}):e._e()],1)]):e._e()],1),r("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSubmit}},[e._v("保 存")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogSB.visible,width:"80%"},on:{"update:visible":function(t){return e.$set(e.dialogSB,"visible",t)}}},[r("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-txt"},[e._v("绑定设备 - "+e._s(e.dialogSB.forms.name))]),r("img",{attrs:{src:i(1612)}})]),r("el-form",{ref:"dialogSBForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogSB.forms,rules:e.dialogSB.rules}},[r("el-form-item",{attrs:{label:"",prop:""}},[r("el-transfer",{staticClass:"transfer-cd",attrs:{filterable:"","filter-method":function(e,t){return t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allDeviceOpts},model:{value:e.dialogSB.forms.deviceIdArray,callback:function(t){e.$set(e.dialogSB.forms,"deviceIdArray",t)},expression:"dialogSB.forms.deviceIdArray"}})],1)],1),r("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSBSubmit}},[e._v("保 存")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogLJ.visible,width:"80%"},on:{"update:visible":function(t){return e.$set(e.dialogLJ,"visible",t)}}},[r("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-txt"},[e._v("逻辑设备组绑定实体设备组 - "+e._s(e.dialogLJ.forms.name))]),r("img",{attrs:{src:i(1612)}})]),r("el-form",{ref:"dialogLJForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogLJ.forms,rules:e.dialogLJ.rules}},[r("el-form-item",{attrs:{label:"",prop:""}},[r("el-transfer",{staticClass:"transfer-cd",attrs:{filterable:"","filter-method":function(e,t){return t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allDeviceGroupLJOpts},model:{value:e.dialogLJ.forms.deviceGroupIdArray,callback:function(t){e.$set(e.dialogLJ.forms,"deviceGroupIdArray",t)},expression:"dialogLJ.forms.deviceGroupIdArray"}})],1)],1),r("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogLJSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},o=[],a=i(12516),l=(i(98469),i(81173),i(91753),i(61194),i(23087),i(11490),i(48397),i(5485),i(30162),i(61942),i(17822),i(10405),i(87130)),n=i(5211),s=i(72802),d=i(41730),c=i(41849),u={components:{pagination:l.Z},data:function(){return{showPage:!1,hasAuth:!0,imgTypeOpts:c.eW,uploadedFileUrl:"",headers:{token:(0,d.LP)()},uploadData:{type:3},uploadUrl:s.P,groupTypeOpts:[{id:1,name:"实体设备组"},{id:2,name:"逻辑设备组"}],pointTypeOpts:[],floorOpts:[],roomOpts:[],roomAllOpts:[],deviceTypeOpts:[],pointBindDeviceGroupOpts:[],pointNotBindDeviceGroupOpts:[],allPointOpts:[],deviceBindDeviceGroupOpts:[],deviceNotBindDeviceGroupOpts:[],allDeviceOpts:[],deviceGroupLJBindDeviceGroupOpts:[],deviceGroupLJNotBindDeviceGroupOpts:[],allDeviceGroupLJOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{floorCode:"",roomCode:"",deviceGroupCode:"",name:"",deviceType:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{},rules:{floorCode:[{required:!0,trigger:"blur",message:"请输入"}],roomCode:[{required:!0,trigger:"blur",message:"请输入"}],deviceGroupCode:[{required:!0,trigger:"blur",message:"请输入"}],name:[{required:!0,trigger:"blur",message:"请输入"}],deviceType:[{required:!0,trigger:"blur",message:"请输入"}],groupType:[{required:!0,trigger:"blur",message:"请输入"}]}},dialogImg:{visible:!1,forms:{},rules:{}},dialogSB:{visible:!1,forms:{},rules:{}},dialogLJ:{visible:!1,forms:{},rules:{}},listDataCDBind:[],listDataCDNotBind:[],imgMarkerIdDivMaps:[],currentRow:null}},watch:{"filterForm.floorCode":function(e,t){var i=this;return(0,a.Z)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return i.roomOpts=[],t.next=5,(0,n.RE)({floorCode:e});case 5:r=t.sent,i.roomOpts=r.data;case 7:case"end":return t.stop()}}),t)})))()},"dialog.forms.floorCode":function(e,t){var i=this;return(0,a.Z)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return i.roomOpts=[],t.next=5,(0,n.RE)({floorCode:e});case 5:r=t.sent,i.roomOpts=r.data;case 7:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;(0,n.aJ)().then((function(t){return e.floorOpts=t.data})),(0,n.RE)().then((function(t){return e.roomAllOpts=t.data})),(0,n.mA)().then((function(t){return e.deviceTypeOpts=t.data})),this.handleQuery()},mounted:function(){},methods:{addToBindPointLocation:function(e){var t=this,r=this.dialogImg,o=r.imgType,a=r.forms;if(""!==o&&void 0!==o){var l=a.selectedNotBind;if(this.$set(a,"selectedNotBind",""),l){e=e||window.event;var n=e.offsetX||e.layerX,s=e.offsetY||e.layerY,d=document.createElement("img");d.src=i(27297)("./open".concat(o,".png")),d.title=l.name,d.className="marker";var c="";switch(+o){case 1:case 2:case 3:case 4:c="transform: translate(-50%, -50%);";break;case 5:c="transform: translate(-50%, -50%);";break}d.style=c,d.onclick=function(){t.$refs["preiviewImgContainer"].removeChild(d);var e=t.imgMarkerIdDivMaps.findIndex((function(e){return e.div==d}));e>-1&&t.imgMarkerIdDivMaps.splice(e,1);var i=t.listDataCDBind.find((function(e){return e.id==l.id}));t.removeToNotBindPointLocation(i)},d.style.left=n+"px",d.style.top=s+"px",this.$refs["preiviewImgContainer"].appendChild(d),this.imgMarkerIdDivMaps.push({id:l.id,div:d});var u=this.$refs["preiviewImg"],m=u.clientWidth,p=u.clientHeight,f=n/m,g=s/p;l.location=g+","+f,l.imgType=this.dialogImg.imgType,this.listDataCDBind.push(l);var v=this.listDataCDNotBind.indexOf(l);v>-1&&this.listDataCDNotBind.splice(v,1)}}else this.$message.error("请选择绑定测点的图片类型")},removeToNotBindPointLocation:function(e){var t=this.listDataCDBind.indexOf(e);t>-1&&this.listDataCDBind.splice(t,1),this.listDataCDNotBind=this.listDataCDNotBind.concat(e);var i=this.imgMarkerIdDivMaps.find((function(t){return t.id==e.id}));if(i){this.$refs["preiviewImgContainer"].removeChild(i.div);var r=this.imgMarkerIdDivMaps.indexOf(i);r>-1&&this.imgMarkerIdDivMaps.splice(r,1)}},handleImgDialog:function(e){var t=this;return(0,a.Z)(regeneratorRuntime.mark((function r(){var o,a,l,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.listLoading=!0,e){r.next=8;break}return e=t.currentRow,r.next=5,(0,n.fe)({deviceGroupId:e.id,pointType:t.dialog.forms.pointType||null});case 5:return o=r.sent,t.listDataCDNotBind=o.data,r.abrupt("return");case 8:return t.currentRow=e,t.dialog.forms.name=e.name,t.pointTypeOpts=[],r.next=13,(0,n.W3)({deviceTypeId:e.deviceType});case 13:return a=r.sent,t.pointTypeOpts=a.data,r.next=17,(0,n.j7)({deviceGroupId:e.id});case 17:return l=r.sent,t.listDataCDBind=l.data,r.next=21,(0,n.fe)({deviceGroupId:e.id,pointType:t.dialog.forms.pointType||null});case 21:s=r.sent,t.listDataCDNotBind=s.data,t.imgMarkerIdDivMaps=[],t.dialogImg.visible=!0,t.listLoading=!1,t.dialogImg.forms.deviceGroupId=e.id,t.dialogImg.forms.imgUrl=e.imgUrl,t.$nextTick((function(e){var r=t.$refs["preiviewImg"],o=function(){t.listDataCDBind.forEach((function(e){var o=e.location.split(",");if(o&&!(o.length<2)){var a=r.clientWidth,l=r.clientHeight,n=o[0],s=o[1],d=document.createElement("img");d.src=i(27297)("./open".concat(e.imgType,".png")),d.title=e.name,d.className="marker";var c="";switch(+e.imgType){case 1:case 2:case 3:case 4:c="transform: translate(-50%, -50%);";break;case 5:c="transform: translate(-50%, -50%);";break}d.style=c,d.onclick=function(){t.$refs["preiviewImgContainer"].removeChild(d);var i=t.imgMarkerIdDivMaps.findIndex((function(e){return e.div==d}));i>-1&&t.imgMarkerIdDivMaps.splice(i,1);var r=t.listDataCDBind.find((function(t){return t.id==e.id}));t.removeToNotBindPointLocation(r)},console.log("location",o,n,s),console.log("currWidth,currHeight",a,l);var u=a*s,m=l*n;d.style.left=u+"px",d.style.top=m+"px",t.$refs["preiviewImgContainer"].appendChild(d),t.imgMarkerIdDivMaps.push({id:e.id,div:d})}}))};r.onload=function(){o()},r.complete&&o()}));case 29:case"end":return r.stop()}}),r)})))()},handleSBDialog:function(e){var t=this;return(0,a.Z)(regeneratorRuntime.mark((function i(){var r,o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!e){i.next=12;break}return t.dialogSB.forms={id:e.id,name:e.name},i.next=4,(0,n.GM)({id:e.id});case 4:return r=i.sent,t.deviceNotBindDeviceGroupOpts=r.data,i.next=8,(0,n.MW)({id:e.id});case 8:o=i.sent,t.deviceBindDeviceGroupOpts=o.data,t.$set(t.dialogSB.forms,"deviceIdArray",o.data.map((function(e){return e.id}))),t.allDeviceOpts=t.deviceNotBindDeviceGroupOpts.concat(t.deviceBindDeviceGroupOpts);case 12:t.dialogSB.visible=!0,t.$nextTick((function(e){return t.$refs["dialogSBForm"].clearValidate()}));case 14:case"end":return i.stop()}}),i)})))()},handleLJDialog:function(e){var t=this;return(0,a.Z)(regeneratorRuntime.mark((function i(){var r,o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!e){i.next=12;break}return t.dialogLJ.forms={id:e.id,name:e.name},i.next=4,(0,n.lA)({id:e.id});case 4:return r=i.sent,t.deviceGroupLJNotBindDeviceGroupOpts=r.data,i.next=8,(0,n.Pt)({id:e.id});case 8:o=i.sent,t.deviceGroupLJBindDeviceGroupOpts=o.data,t.$set(t.dialogLJ.forms,"deviceGroupIdArray",o.data.map((function(e){return e.id}))),t.allDeviceGroupLJOpts=t.deviceGroupLJNotBindDeviceGroupOpts.concat(t.deviceGroupLJBindDeviceGroupOpts);case 12:t.dialogLJ.visible=!0,t.$nextTick((function(e){return t.$refs["dialogLJForm"].clearValidate()}));case 14:case"end":return i.stop()}}),i)})))()},uploadSuccess:function(e,t,i){0===e.res?(this.dialog.forms.imgUrl=e.data.filePath,this.$message.success("上传成功!")):this.$message.error(e.msg),this.$refs["dialogForm"].validateField("imgUrl")},fileRemove:function(e,t){this.dialog.forms.imgUrl="",this.$refs["dialogForm"].validateField("imgUrl")},dialogImgSubmit:function(){var e=this;this.dialogImg.forms.pointList=this.listDataCDBind,this.dialogImg.forms.pointList=this.dialogImg.forms.pointList.map((function(e){return e.pointId=e.id,delete e.id,e}));var t=this.dialogImg.forms,i=t.deviceGroupId,r=t.pointList;(0,n.zS)({deviceGroupId:i,pointList:r}).then((function(t){e.$message.success("操作成功!"),e.dialogImg.visible=!1,e.getList()}))},dialogSBSubmit:function(){var e=this;this.$refs["dialogSBForm"].validate((function(t,i){if(!t)return!1;(0,n.O7)(e.dialogSB.forms).then((function(t){e.$message.success("操作成功!"),e.$refs["dialogSBForm"].resetFields(),e.dialogSB.visible=!1,e.getList()}))}))},dialogSubmit:function(){var e=this;this.$refs["dialogForm"].validate((function(t,i){if(!t)return!1;var r=null;r=e.dialog.forms.id?n.uv:n.C8,r(e.dialog.forms).then((function(t){e.$message.success("操作成功!"),e.$refs["dialogForm"].resetFields(),e.dialog.visible=!1,e.getList()}))}))},handleQuery:function(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset:function(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},handleDialog:function(e){var t=this;return(0,a.Z)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:t.dialog.forms=e?Object.assign(JSON.parse(JSON.stringify(e))):{imgUrl:"",roomCode:""},t.dialog.visible=!0,t.$nextTick((function(e){return t.$refs["dialogForm"].clearValidate()}));case 3:case"end":return i.stop()}}),i)})))()},dialogLJSubmit:function(){var e=this;this.$refs["dialogLJForm"].validate((function(t,i){if(!t)return!1;(0,n.li)(e.dialogLJ.forms).then((function(t){e.$message.success("操作成功!"),e.$refs["dialogLJForm"].resetFields(),e.dialogLJ.visible=!1,e.getList()}))}))},handleDel:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){(0,n.e9)({id:e}).then((function(e){t.getList(),t.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var e=this;this.listLoading=!0,(0,n.bg)(this.filterForm).then((function(t){e.hasAuth=!0,e.listData=t.data.list,e.listTotal=t.data.total,e.listLoading=!1})).catch((function(t){e.hasAuth=!1})).finally((function(t){e.showPage=!0}))}}},m=u,p=i(35471),f=(0,p.Z)(m,r,o,!1,null,"fc264dd6",null),g=f.exports}}]);