"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[6490],{26490:function(t,e,i){i.r(e),i.d(e,{default:function(){return k}});var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.showPage?i("div",{staticClass:"app-container auth-manage"},[t.hasAuth?t._e():i("h2",{staticClass:"auth-tip"},[t._v("权限不足,请联系管理员")]),!t.dialog.visible&&t.hasAuth?i("div",{staticClass:"page1"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",border:"",data:t.listData}},[i("el-table-column",{attrs:{prop:"levelId",label:"告警等级",width:"120",align:"center"}}),i("el-table-column",{attrs:{prop:"levelName",label:"告警等级名称",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",[t._v(" "+t._s(a.levelName||"无")+" ")])]}}],null,!1,454000258)}),i("el-table-column",{attrs:{prop:"step1",label:"步骤1",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.step1,(function(e){return i("div",{key:e+Math.random()},[i("div",[t._v(" "+t._s(t.noteModeOpts.find((function(t){return t.id==e}))&&t.noteModeOpts.find((function(t){return t.id==e})).name)+" ")])])}))}}],null,!1,1517336139)}),i("el-table-column",{attrs:{prop:"step2",label:"步骤2",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.step2,(function(e){return i("div",{key:e+Math.random()},[i("div",[t._v(" "+t._s(t.noteModeOpts.find((function(t){return t.id==e}))&&t.noteModeOpts.find((function(t){return t.id==e})).name)+" ")])])}))}}],null,!1,2190177640)}),i("el-table-column",{attrs:{prop:"step3",label:"步骤3",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.step3,(function(e){return i("div",{key:e+Math.random()},[i("div",[t._v(" "+t._s(t.noteModeOpts.find((function(t){return t.id==e}))&&t.noteModeOpts.find((function(t){return t.id==e})).name)+" ")])])}))}}],null,!1,222587401)}),i("el-table-column",{attrs:{prop:"step4",label:"步骤4",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.step4,(function(e){return i("div",{key:e+Math.random()},[i("div",[t._v(" "+t._s(t.noteModeOpts.find((function(t){return t.id==e}))&&t.noteModeOpts.find((function(t){return t.id==e})).name)+" ")])])}))}}],null,!1,3500937518)}),i("el-table-column",{attrs:{label:"操作",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("el-button",{attrs:{title:"编辑",icon:"el-icon-edit-outline",type:"primary",plain:""},on:{click:function(e){return t.handleDialog(a)}}})]}}],null,!1,784708273)})],1),i("pagination",{attrs:{hidden:!(t.listTotal>0),total:t.listTotal,page:t.filterForm.pageNo,limit:t.filterForm.pageSize},on:{"update:page":function(e){return t.$set(t.filterForm,"pageNo",e)},"update:limit":function(e){return t.$set(t.filterForm,"pageSize",e)},pagination:t.getList}})],1):t._e(),t.dialog.visible&&t.hasAuth?i("div",{staticClass:"page2"},[i("div",{staticClass:"page2-form"},[i("el-form",{ref:"dialogForm",attrs:{model:t.dialog.forms,rules:t.dialog.rules,"label-width":"100px"}},[i("div",{staticStyle:{"text-align":"center"}},[i("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"告警等级",prop:"levelId"}},[i("el-select",{attrs:{disabled:"",filterable:""},model:{value:t.dialog.forms.levelId,callback:function(e){t.$set(t.dialog.forms,"levelId",e)},expression:"dialog.forms.levelId"}},t._l(t.alertLevelOpts,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),i("div",{staticClass:"drag-content"},[i("div",{staticClass:"left"},[i("el-form-item",{attrs:{label:"步骤1",prop:"step1"}},[t.dialog.visible?i("DragStep",{key:1,staticClass:"kanban todo",attrs:{hasArrow:"",deleteable:"",list:t.dialog.forms.step1,group:"mission",x:""}}):t._e()],1),i("el-form-item",{attrs:{label:"步骤2",prop:"step2"}},[t.dialog.visible?i("DragStep",{key:2,staticClass:"kanban",attrs:{hasArrow:"",deleteable:"",list:t.dialog.forms.step2,group:"mission"}}):t._e()],1),i("el-form-item",{attrs:{label:"步骤3",prop:"step3"}},[t.dialog.visible?i("DragStep",{key:3,staticClass:"kanban done",attrs:{hasArrow:"",deleteable:"",list:t.dialog.forms.step3,group:"mission"}}):t._e()],1),i("el-form-item",{attrs:{label:"步骤4",prop:"step4"}},[t.dialog.visible?i("DragStep",{key:4,staticClass:"kanban working",attrs:{hasArrow:"",deleteable:"",list:t.dialog.forms.step4,group:"mission"}}):t._e()],1)],1),i("div",{staticClass:"right"},[i("div",{staticClass:"el-form-item__label",staticStyle:{"text-align":"center","font-size":"1.2rem","font-weight":"bold"}},[t._v(" 可选项(拖动) ")]),t.dialog.visible?i("DragStep",{key:0,staticClass:"kanban todo",attrs:{list:t.step0,group:"mission"},on:{end:function(e){t.step0=t.deepClone(t.noteModeOpts)}}}):t._e()],1)])])],1),i("div",{staticStyle:{"text-align":"center",transform:"translate(0px, 10px)"}},[i("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:t.dialogSubmit}},[t._v("保 存")]),i("el-button",{staticStyle:{width:"200px"},on:{click:t.handleClose}},[t._v("关闭")])],1)]):t._e()]):t._e()},s=[],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"board-column"},[i("draggable",t._g(t._b({staticClass:"board-column-content",attrs:{list:t.list,"set-data":t.setData}},"draggable",t.$attrs,!1),t.$listeners),t._l(t.list,(function(e,a){return i("div",{key:a+Math.random(),attrs:{title:"点击移除"},on:{click:function(e){t.deleteable&&t.list.splice(a,1)}}},[i("span",{staticClass:"board-item"},[t._v(t._s(e.name))]),t.hasArrow?i("span",{staticStyle:{color:"#31c6f1"}},[t._v(t._s(a===t.list.length-1?"":"➡"))]):t._e()])})),0)],1)},n=[],o=i(72719),r=i.n(o),d={name:"DragStep",components:{draggable:r()},props:{deleteable:{type:Boolean,default:!1},hasArrow:{type:Boolean,default:!1},options:{type:Object,default(){return{}}},list:{type:Array,default(){return[]}}},methods:{log:function(t){window.console.log(t)},setData(t){t.setData("Text","")}}},p=d,u=i(1001),c=(0,u.Z)(p,l,n,!1,null,"40ca4524",null),m=c.exports,g=i(98803),f=i(72217),h=i(94685),v=i(99009),b={components:{pagination:h.Z,DragStep:m},data(){return{showPage:!1,hasAuth:!0,deepClone:f.I8,noteModeOpts:g.ed,step0:(0,f.I8)(g.ed),depOpts:[],alertLevelOpts:[],noteContentOpts:[{id:"1",name:"时间"},{id:"2",name:"位置"},{id:"3",name:"内容"},{id:"4",name:"告警值"}],secondMenuOpts:[],thirdMenuOpts:[],filterForm:{pageNo:1,pageSize:10},listLoading:!0,listData:[],listTotal:0,dialog:{id:"",visible:!1,forms:{step1:[],step2:[],step3:[],step4:[]},rules:{levelId:[{required:!0,trigger:"blur",validator:g.C0}],step1:[{required:!0,trigger:"blur",message:"未设置"}],step2:[{required:!0,trigger:"blur",message:"未设置"}],step3:[{required:!0,trigger:"blur",message:"未设置"}],step4:[{required:!0,trigger:"blur",message:"未设置"}]}}}},watch:{},async created(){(0,v.D4)().then((t=>this.alertLevelOpts=t.data)),this.handleQuery()},mounted(){},methods:{handleClose(){this.dialog.visible=!1,this.handleQuery()},dialogSubmit(){this.$refs["dialogForm"].validate(((t,e)=>{if(!t)return!1;this.dialog.forms.step1=this.dialog.forms.step1.map((t=>t.id)),this.dialog.forms.step2=this.dialog.forms.step2.map((t=>t.id)),this.dialog.forms.step3=this.dialog.forms.step3.map((t=>t.id)),this.dialog.forms.step4=this.dialog.forms.step4.map((t=>t.id)),(0,v.Jc)(this.dialog.forms).then((t=>{this.$message.success("操作成功!"),this.handleDialog({levelId:this.dialog.forms.levelId})})).catch((t=>{this.handleDialog({levelId:this.dialog.forms.levelId})}))}))},handleQuery(){this.dialog.forms.listTotal=0,this.filterForm.pageNo=1,this.getList()},handleReset(t){document.activeElement.blur(),this.$refs[t].resetFields(),this.handleQuery()},async handleDialog(t){if(t){const e=await(0,v.Mu)({levelId:t.levelId});this.dialog.forms=e.data;const{step1:i,step2:a,step3:s,step4:l}=this.dialog.forms,n=i.map((t=>g.ed.find((e=>e.id===t)))),o=a.map((t=>g.ed.find((e=>e.id===t)))),r=s.map((t=>g.ed.find((e=>e.id===t)))),d=l.map((t=>g.ed.find((e=>e.id===t))));this.$set(this.dialog.forms,"step1",n),this.$set(this.dialog.forms,"step2",o),this.$set(this.dialog.forms,"step3",r),this.$set(this.dialog.forms,"step4",d)}else this.dialog.forms=this.$options.data().dialog.forms;this.dialog.visible=!0,this.$nextTick((t=>this.$refs["dialogForm"].clearValidate()))},handleDel(t){this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{alertStrategyDelete({id:t}).then((t=>{this.getList(),this.$message.success("删除成功!")}))})).catch((()=>{}))},getList(){this.listLoading=!0,(0,v.vc)(this.filterForm).then((t=>{this.hasAuth=!0,this.listData=t.data.list,this.listTotal=t.data.total,this.listLoading=!1})).catch((t=>{this.hasAuth=!1})).finally((t=>{this.showPage=!0}))}}},_=b,y=(0,u.Z)(_,a,s,!1,null,"2786f515",null),k=y.exports},98803:function(t,e,i){i.d(e,{C0:function(){return n},Mj:function(){return a},Uz:function(){return o},eW:function(){return l},ed:function(){return s}});i(21703);const a=[{id:1,name:"整型"},{id:2,name:"长整型"},{id:3,name:"浮点型"},{id:4,name:"布尔型"},{id:5,name:"字符串"},{id:6,name:"时间戳"}],s=[{id:1,name:"邮箱"},{id:2,name:"短信"},{id:3,name:"语音"},{id:4,name:"微信"},{id:5,name:"钉钉"},{id:6,name:"声光"}],l=[{id:1,name:"北向开关"},{id:2,name:"东向开关"},{id:3,name:"西向开关"},{id:4,name:"南向开关"},{id:5,name:"温度计"}],n=(t,e,i)=>{t.required||void 0!==e&&""!==e||i(),""===e||!Number.isInteger(+e)||+e<0?i(new Error("请输入整数值")):i()},o=(t,e,i)=>{""===e||isNaN(e)||Number(e)<0?i(new Error("请输入非负数字")):i()}}}]);