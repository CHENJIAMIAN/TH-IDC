"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[7609],{72802:function(e,t,l){l.d(t,{P:function(){return o}});l(63810);const i="",o=i+"/admin/uploadFile/upload"},41849:function(e,t,l){l.d(t,{C0:function(){return r},Mj:function(){return i},Uz:function(){return s},eW:function(){return a},ed:function(){return o}});l(48503);const i=[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}],o=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],a=[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}],r=(e,t,l)=>{e.required||void 0!==t&&""!==t||l(),""===t||!Number.isInteger(+t)||+t<0?l(new Error("请输入整数值")):l()},s=(e,t,l)=>{""===t||isNaN(t)||Number(t)<0?l(new Error("请输入非负数字")):l()}},87609:function(e,t,l){l.r(t),l.d(t,{default:function(){return g}});var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.showPage?i("div",{staticClass:"app-container room-manage"},[e.hasAuth?e._e():i("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?i("div",{staticClass:"head"},[i("el-form",{ref:"filterForm",staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium",model:e.filterForm}},[i("el-form-item",{attrs:{prop:"floorCode"}},[i("el-select",{attrs:{clearable:"",placeholder:"楼层"},model:{value:e.filterForm.floorCode,callback:function(t){e.$set(e.filterForm,"floorCode",t)},expression:"filterForm.floorCode"}},e._l(e.floorOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),i("el-form-item",{attrs:{prop:"name"}},[i("el-input",{attrs:{placeholder:"房间名称"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"===typeof t?t.trim():t)},expression:"filterForm.name"}})],1),i("el-form-item",{attrs:{prop:"roomType"}},[i("el-select",{attrs:{clearable:"",placeholder:"房间类型"},model:{value:e.filterForm.roomType,callback:function(t){e.$set(e.filterForm,"roomType",t)},expression:"filterForm.roomType"}},e._l(e.roomTypeOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",plain:""},on:{click:function(t){return e.handleReset("filterForm")}}},[e._v("重置")])],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialog()}}},[i("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:e.listData}},[i("el-table-column",{attrs:{prop:"roomCode",label:"房间编号"}}),i("el-table-column",{attrs:{prop:"name",label:"房间名称"}}),i("el-table-column",{attrs:{prop:"roomType",label:"房间类型"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[i("span",[e._v(e._s(e._f("capitalize")(l.roomType)))])]}}],null,!1,3987805006)}),i("el-table-column",{attrs:{prop:"imgUrl",label:"预览图"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){e.dialogImgVisible=!0,e.dialogImgUrl=l.imgUrl}}},[e._v("查看")])]}}],null,!1,2063936953)}),i("el-table-column",{attrs:{sortable:"",prop:"sort",label:"排序"}}),i("el-table-column",{attrs:{prop:"floorName",label:"楼层名称"}}),i("el-table-column",{attrs:{label:"操作",align:"center",width:"161"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[i("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(t){return e.handleDialog(l)}}}),i("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(l.id)}}})]}}],null,!1,1998501215)})],1):e._e(),e.hasAuth?i("pagination",{attrs:{hidden:!(e.listTotal>0),total:e.listTotal,page:e.filterForm.pageNo,limit:e.filterForm.pageSize},on:{"update:page":function(t){return e.$set(e.filterForm,"pageNo",t)},"update:limit":function(t){return e.$set(e.filterForm,"pageSize",t)},pagination:e.getList}}):e._e(),i("el-dialog",{attrs:{"custom-class":"dialog-img",visible:e.dialogImgVisible},on:{"update:visible":function(t){e.dialogImgVisible=t}}},[i("img",{staticClass:"preview-img",attrs:{src:e.dialogImgUrl,alt:"加载失败"}})]),i("el-dialog",{attrs:{visible:e.dialog.visible},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[i("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[i("span",{staticClass:"title-txt"},[e._v(e._s(e.dialog.forms.id?"编辑":"新增"))]),i("img",{attrs:{src:l(1612)}})]),i("el-form",{ref:"dialogForm",attrs:{model:e.dialog.forms,rules:e.dialog.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"房间编号",prop:"roomCode"}},[i("el-input",{attrs:{disabled:!!e.dialog.forms.id},model:{value:e.dialog.forms.roomCode,callback:function(t){e.$set(e.dialog.forms,"roomCode",t)},expression:"dialog.forms.roomCode"}})],1),i("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[i("el-input",{model:{value:e.dialog.forms.name,callback:function(t){e.$set(e.dialog.forms,"name",t)},expression:"dialog.forms.name"}})],1),i("div",{staticStyle:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},[i("el-form-item",{attrs:{label:"楼层",prop:"floorCode"}},[i("el-select",{model:{value:e.dialog.forms.floorCode,callback:function(t){e.$set(e.dialog.forms,"floorCode",t)},expression:"dialog.forms.floorCode"}},e._l(e.floorOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.floorCode}})})),1)],1),i("el-form-item",{attrs:{label:"房间类型",prop:"roomType"}},[i("el-select",{model:{value:e.dialog.forms.roomType,callback:function(t){e.$set(e.dialog.forms,"roomType",t)},expression:"dialog.forms.roomType"}},e._l(e.roomTypeOpts,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),i("el-form-item",{attrs:{label:"排序",prop:"sort"}},[i("el-input",{model:{value:e.dialog.forms.sort,callback:function(t){e.$set(e.dialog.forms,"sort",t)},expression:"dialog.forms.sort"}})],1)],1),e.dialog.visible?i("el-form-item",{attrs:{label:"预览图",prop:"imgUrl"}},[i("div",{staticClass:"preview-grid"},[i("el-upload",{ref:"upload",staticClass:"upload-container",attrs:{name:"attach",headers:e.headers,action:e.uploadUrl,data:e.uploadData,"on-success":e.uploadSuccess,"on-remove":e.fileRemove,limit:1,drag:""}},[i("i",{staticClass:"el-icon-upload"}),i("div",{staticClass:"el-upload__text"},[e._v(" 点击 "),i("em",[e._v("上传文件")]),e._v(" 或拖拽上传 ")])]),e.dialog.forms.imgUrl?i("img",{staticClass:"preview-img",attrs:{src:e.dialog.forms.imgUrl,alt:"图片加载失败"}}):e._e()],1)]):e._e()],1),i("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},o=[],a=l(41849),r=l(87130),s=l(5211),n=l(72802),m=l(41730);let d=[];var u={components:{pagination:r.Z},filters:{capitalize:function(e){if(!e)return"";e=e.toString();const t=d.find((t=>t.id==e));return t?t.name:"错误数据,找不到对应类型"}},data(){return{showPage:!1,hasAuth:!0,uploadedFileUrl:"",headers:{token:(0,m.LP)()},uploadData:{type:2},uploadUrl:n.P,floorOpts:[],roomOpts:[],roomTypeOpts:[],firstMenuOpts:[],secondMenuOpts:[],filterForm:{floorCode:"",name:"",roomType:null,pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialogImgVisible:!1,dialogImgUrl:"",dialog:{id:"",visible:!1,forms:{},rules:{floorCode:[{required:!0,trigger:"blur",message:"请输入"}],roomCode:[{required:!0,trigger:"blur",message:"请输入"}],name:[{required:!0,trigger:"blur",message:"请输入"}],roomType:[{required:!0,trigger:"blur",message:"请输入"}],imgUrl:[{required:!0,message:"请上传图片"}],sort:[{required:!0,trigger:"blur",validator:a.C0}]}}}},watch:{},async created(){(0,s.aJ)().then((e=>this.floorOpts=e.data)),(0,s.RE)().then((e=>this.roomOpts=e.data));const e=await(0,s.D9)();d=this.roomTypeOpts=e.data,this.handleQuery()},mounted(){},methods:{uploadSuccess(e,t,l){0===e.res?(this.dialog.forms.imgUrl=e.data.filePath,this.$message.success("上传成功!")):this.$message.error(e.msg),this.$refs["dialogForm"].validateField("imgUrl")},fileRemove(e,t){this.dialog.forms.imgUrl="",this.$refs["dialogForm"].validateField("imgUrl")},dialogSubmit(){this.$refs["dialogForm"].validate(((e,t)=>{if(!e)return!1;{let e=null;e=this.dialog.forms.id?s.OZ:s.Hc,e(this.dialog.forms).then((e=>{this.$message.success("操作成功!"),this.$refs["dialogForm"].resetFields(),this.dialog.visible=!1,this.getList()}))}}))},handleQuery(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset(e){document.activeElement.blur(),this.$refs[e].resetFields(),this.handleQuery()},async handleDialog(e){this.dialog.forms=e?Object.assign(JSON.parse(JSON.stringify(e))):{imgUrl:""},this.dialog.visible=!0,this.$nextTick((e=>this.$refs["dialogForm"].clearValidate()))},handleDel(e){this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,s.Kl)({id:e}).then((e=>{this.getList(),this.$message.success("删除成功!")}))})).catch((()=>{}))},getList(){this.listLoading=!0,(0,s.EA)(this.filterForm).then((e=>{this.hasAuth=!0,this.listData=e.data.list,this.listTotal=e.data.total,this.listLoading=!1})).catch((e=>{this.hasAuth=!1})).finally((e=>{this.showPage=!0}))}}},c=u,p=l(35471),f=(0,p.Z)(c,i,o,!1,null,"2bc2681e",null),g=f.exports}}]);