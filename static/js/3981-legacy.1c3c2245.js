(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[3981],{53741:function(t,e,i){var a=i(28887),l=Math.floor;t.exports=Number.isInteger||function(t){return!a(t)&&isFinite(t)&&l(t)===t}},16544:function(t,e,i){var a=i(32538),l=i(53741);a({target:"Number",stat:!0},{isInteger:l})},72802:function(t,e,i){"use strict";i.d(e,{P:function(){return l}});i(63810);var a="",l=a+"/admin/uploadFile/upload"},41849:function(t,e,i){"use strict";i.d(e,{C0:function(){return n},Mj:function(){return o},Uz:function(){return d},eW:function(){return s},ed:function(){return r}});var a,l=i(20638),o=(i(16544),i(24238),i(48503),[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}]),r=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],s=(a={id:1,name:"母联柜"},(0,l.Z)(a,"id",2),(0,l.Z)(a,"name","直流操作电源柜"),(0,l.Z)(a,"id",3),(0,l.Z)(a,"name","变压器"),(0,l.Z)(a,"id",4),(0,l.Z)(a,"name","低压进线柜"),(0,l.Z)(a,"id",5),(0,l.Z)(a,"name","配电柜"),(0,l.Z)(a,"id",6),(0,l.Z)(a,"name","柴油发电机组"),(0,l.Z)(a,"id",7),(0,l.Z)(a,"name","蓄电池"),(0,l.Z)(a,"id",8),(0,l.Z)(a,"name","UPS主机"),(0,l.Z)(a,"id",9),(0,l.Z)(a,"name","UPS变换器"),(0,l.Z)(a,"id",10),(0,l.Z)(a,"name","UPS逆变器"),(0,l.Z)(a,"id",11),(0,l.Z)(a,"name","列头柜"),(0,l.Z)(a,"id",12),(0,l.Z)(a,"name","空调"),(0,l.Z)(a,"id",13),(0,l.Z)(a,"name","温湿度"),(0,l.Z)(a,"id",14),(0,l.Z)(a,"name","氢气探测器"),(0,l.Z)(a,"id",15),(0,l.Z)(a,"name","水浸"),[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}]),n=function(t,e,i){t.required||void 0!==e&&""!==e||i(),""===e||!Number.isInteger(+e)||+e<0?i(new Error("请输入整数值")):i()},d=function(t,e,i){""===e||isNaN(e)||Number(e)<0?i(new Error("请输入非负数字")):i()}},63981:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return f}});var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.showPage?a("div",{staticClass:"app-container floor-manage"},[t.hasAuth?t._e():a("h2",{staticClass:"auth-tip"},[t._v("权限不足,请联系管理员")]),t.hasAuth?a("div",{staticClass:"head"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,size:"medium",model:t.filterForm}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.handleDialog()}}},[a("i",{staticClass:"el-icon-plus"})])],1)],1)],1):t._e(),t.hasAuth?a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:t.listData}},[a("el-table-column",{attrs:{prop:"floorCode",label:"楼层编号"}}),a("el-table-column",{attrs:{prop:"name",label:"楼层名称"}}),a("el-table-column",{attrs:{prop:"imgUrl",label:"预览图"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){t.dialogImgVisible=!0,t.dialogImgUrl=i.imgUrl}}},[t._v("查看")])]}}],null,!1,2063936953)}),a("el-table-column",{attrs:{sortable:"",prop:"sort",label:"排序"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"161"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(e){return t.handleDialog(i)}}}),a("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(e){return t.handleDel(i.id)}}})]}}],null,!1,1998501215)})],1):t._e(),t.hasAuth?a("pagination",{attrs:{hidden:!(t.listTotal>0),total:t.listTotal,page:t.filterForm.pageNo,limit:t.filterForm.pageSize},on:{"update:page":function(e){return t.$set(t.filterForm,"pageNo",e)},"update:limit":function(e){return t.$set(t.filterForm,"pageSize",e)},pagination:t.getList}}):t._e(),a("el-dialog",{attrs:{"custom-class":"dialog-img",visible:t.dialogImgVisible},on:{"update:visible":function(e){t.dialogImgVisible=e}}},[a("img",{staticClass:"preview-img",attrs:{src:t.dialogImgUrl,alt:"加载失败"}})]),a("el-dialog",{attrs:{visible:t.dialog.visible},on:{"update:visible":function(e){return t.$set(t.dialog,"visible",e)}}},[a("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"title-txt"},[t._v(t._s(t.dialog.forms.id?"编辑":"新增"))]),a("img",{attrs:{src:i(1612)}})]),a("el-form",{ref:"dialogForm",attrs:{model:t.dialog.forms,rules:t.dialog.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"楼层编号",prop:"floorCode"}},[a("el-input",{attrs:{disabled:!!t.dialog.forms.id},model:{value:t.dialog.forms.floorCode,callback:function(e){t.$set(t.dialog.forms,"floorCode",e)},expression:"dialog.forms.floorCode"}})],1),a("el-form-item",{attrs:{label:"楼层名称",prop:"name"}},[a("el-input",{model:{value:t.dialog.forms.name,callback:function(e){t.$set(t.dialog.forms,"name",e)},expression:"dialog.forms.name"}})],1),a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{model:{value:t.dialog.forms.sort,callback:function(e){t.$set(t.dialog.forms,"sort",e)},expression:"dialog.forms.sort"}})],1),t.dialog.visible?a("el-form-item",{attrs:{label:"预览图",prop:"imgUrl"}},[a("div",{staticClass:"preview-grid"},[a("el-upload",{ref:"upload",staticClass:"upload-container",attrs:{name:"attach",headers:t.headers,action:t.uploadUrl,data:t.uploadData,"on-success":t.uploadSuccess,"on-remove":t.fileRemove,limit:1,drag:""}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[t._v(" 点击 "),a("em",[t._v("上传文件")]),t._v(" 或拖拽上传 ")])]),t.dialog.forms.imgUrl?a("img",{staticClass:"preview-img",attrs:{src:t.dialog.forms.imgUrl,alt:"图片加载失败"}}):t._e()],1)]):t._e()],1),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:t.dialogSubmit}},[t._v("保 存")])],1)],1)],1):t._e()},l=[],o=(i(17822),i(23087),i(41849)),r=i(87130),s=i(5211),n=i(72802),d=i(41730),m={components:{pagination:r.Z},data:function(){return{showPage:!1,hasAuth:!0,uploadedFileUrl:"",headers:{token:(0,d.LP)()},uploadData:{type:1},uploadUrl:n.P,filterForm:{pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialogImgVisible:!1,dialogImgUrl:"",dialog:{id:"",visible:!1,forms:{},rules:{floorCode:[{required:!0,trigger:"blur",message:"请输入"}],name:[{required:!0,trigger:"blur",message:"请输入"}],imgUrl:[{required:!0,message:"请上传图片"}],sort:[{required:!0,trigger:"blur",validator:o.C0}]}}}},created:function(){this.handleQuery()},mounted:function(){},methods:{uploadSuccess:function(t,e,i){0===t.res?(this.dialog.forms.imgUrl=t.data.filePath,this.$message.success("上传成功!")):this.$message.error(t.msg),this.$refs["dialogForm"].validateField("imgUrl")},fileRemove:function(t,e){this.dialog.forms.imgUrl="",this.$refs["dialogForm"].validateField("imgUrl")},dialogSubmit:function(){var t=this;this.$refs["dialogForm"].validate((function(e,i){if(!e)return!1;var a=null;a=t.dialog.forms.id?s.oW:s.Ch,a(t.dialog.forms).then((function(e){t.$message.success("操作成功!"),t.$refs["dialogForm"].resetFields(),t.dialog.visible=!1,t.getList()}))}))},handleQuery:function(){this.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset:function(t){document.activeElement.blur(),this.$refs[t].resetFields(),this.handleQuery()},handleDialog:function(t){var e=this;this.dialog.forms=t?JSON.parse(JSON.stringify(t)):{imgUrl:""},this.dialog.visible=!0,this.$nextTick((function(t){return e.$refs["dialogForm"].clearValidate()}))},handleDel:function(t){var e=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){(0,s.Jd)({id:t}).then((function(t){e.getList(),e.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var t=this;this.listLoading=!0,(0,s.fB)(this.filterForm).then((function(e){t.hasAuth=!0,t.listData=e.data.list,t.listTotal=e.data.total,t.listLoading=!1})).catch((function(e){t.hasAuth=!1})).finally((function(e){t.showPage=!0}))}}},u=m,c=i(35471),g=(0,c.Z)(u,a,l,!1,null,"49607f30",null),f=g.exports}}]);