"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[9253],{79253:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.showPage?i("div",{staticClass:"app-container user-manage"},[e.hasAuth?e._e():i("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),e.hasAuth?i("div",{staticClass:"head"},[i("el-form",{staticStyle:{display:"grid","grid-auto-flow":"column"},attrs:{inline:!0,size:"medium"}},[i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.handleAdd}},[i("i",{staticClass:"el-icon-plus"})])],1)],1)],1):e._e(),e.hasAuth?i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticClass:"arrange-work-table",staticStyle:{width:"100%"},attrs:{"empty-text":" ",height:"100%",stripe:"",data:e.listData,"cell-class-name":e.tableCellClassName},on:{"cell-click":e.cellClick}},[i("el-table-column",{attrs:{prop:"id",label:"编号",align:"center"}}),i("el-table-column",{attrs:{prop:"week1List",label:"星期一",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week1List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week1List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,1484009718)}),i("el-table-column",{attrs:{prop:"week2List",label:"星期二",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week2List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week2List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,3790495958)}),i("el-table-column",{attrs:{prop:"week3List",label:"星期三",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week3List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week3List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,907564342)}),i("el-table-column",{attrs:{prop:"week4List",label:"星期四",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week4List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week4List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,3072354582)}),i("el-table-column",{attrs:{prop:"week5List",label:"星期五",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week5List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week5List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,1812629878)}),i("el-table-column",{attrs:{prop:"week6List",label:"星期六",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week6List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week6List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,790022486)}),i("el-table-column",{attrs:{prop:"week7List",label:"星期日",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;t.column,t.$index;return[n.week7List.length<1?i("div",{staticStyle:{color:"#a7a7a7"}},[e._v(" 待排班 ")]):e._e(),e._l(n.week7List,(function(t){return i("div",{key:t.id},[e._v(e._s(t.name))])}))]}}],null,!1,2309416374)}),i("el-table-column",{attrs:{label:"状态",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("el-switch",{attrs:{"active-value":1,"inactive-value":2},on:{change:function(t){return e.handleStatusChange(t,n)}},model:{value:n.status,callback:function(t){e.$set(n,"status",t)},expression:"row.status"}})]}}],null,!1,83028734)}),i("el-table-column",{attrs:{label:"操作",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("el-button",{attrs:{title:"删除",icon:"el-icon-delete",type:"primary",plain:""},on:{click:function(t){return e.handleDel(n.id)}}})]}}],null,!1,2849497724)})],1):e._e(),i("el-dialog",{attrs:{visible:e.dialogRY.visible},on:{"update:visible":function(t){return e.$set(e.dialogRY,"visible",t)}}},[i("div",{staticClass:"el-dialog-title-custom",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title-txt"},[e._v("绑定排班人员")]),i("img",{attrs:{src:n(1612)}})]),i("el-form",{ref:"dialogRYForm",staticStyle:{display:"grid","justify-content":"center"},attrs:{model:e.dialogRY.forms,rules:e.dialogRY.rules,"label-width":"50"}},[i("el-form-item",{attrs:{label:"",prop:""}},[i("el-transfer",{attrs:{filterable:"","filter-method":function(e,t){return t.name.indexOf(e)>-1},titles:["未绑定","已绑定"],props:{key:"id",label:"name"},"filter-placeholder":"请输入",data:e.allRYOpts},model:{value:e.dialogRY.forms.personIdArray,callback:function(t){e.$set(e.dialogRY.forms,"personIdArray",t)},expression:"dialogRY.forms.personIdArray"}})],1)],1),i("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{width:"200px"},attrs:{type:"primary"},on:{click:e.dialogRYSubmit}},[e._v("保 存")])],1)],1)],1):e._e()},l=[],a=n(12516),s=(n(10405),n(61942),n(11490),n(23087),n(98469),n(87130)),o=n(97595),r={components:{pagination:s.Z},data:function(){return{showPage:!1,hasAuth:!0,userNotBindOpts:[],userBindOpts:[],listLoading:!0,listData:[],allRYOpts:[],clickedRow:{},clickedColumn:{},dialogRY:{visible:!1,forms:{},rules:{}}}},created:function(){this.handleQuery()},mounted:function(){},methods:{dialogRYSubmit:function(){var e=this,t=this.clickedRow,n=this.clickedColumn;console.log(t,n),console.log(this.dialogRY.forms),this.$refs["dialogRYForm"].validate((function(i,l){if(!i)return!1;e.dialogRY.forms,(0,o.lm)({id:t.id,week:n.index,userIdArray:e.dialogRY.forms.personIdArray}).then((function(i){e.$set(t,"week".concat(n.index,"ListAll"),i.data),e.$message.success("操作成功!"),e.$refs["dialogRYForm"].resetFields(),e.dialogRY.visible=!1,e.getList()}))}))},handleRYDialog:function(e){var t=this;return(0,a.Z)(regeneratorRuntime.mark((function n(){var i,l,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.row,l=e.column,e.cell,e.event,t.dialogRY.forms={id:i.id},n.next=4,(0,o.gO)({id:i.id,week:l.index});case 4:return a=n.sent,t.userNotBindOpts=a.data,n.next=8,(0,o.yr)({id:i.id,week:l.index});case 8:s=n.sent,t.userBindOpts=s.data,t.$set(t.dialogRY.forms,"personIdArray",s.data.map((function(e){return e.id}))),t.allRYOpts=t.userNotBindOpts.concat(t.userBindOpts),t.dialogRY.visible=!0,t.$nextTick((function(e){return t.$refs["dialogRYForm"].clearValidate()}));case 14:case"end":return n.stop()}}),n)})))()},handleStatusChange:function(e,t){var n=this;(0,o.Xc)({id:t.id,status:e}).then((function(e){n.getList()})).catch((function(n){t.status=2===e?1:2}))},tableCellClassName:function(e){var t=e.row,n=e.column,i=e.rowIndex,l=e.columnIndex;if(t.index=i,n.index=l,n.index>0&&n.index<8)return"week-day"},cellClick:function(e,t,n,i){this.clickedRow=e,this.clickedColumn=t,t.index>0&&t.index<8&&this.handleRYDialog({row:e,column:t,cell:n,event:i})},handlePersonSelectVisibleChange:function(e,t){var n=this,i=t.row,l=t.column;t.$index;e&&l.index>0&&l.index<8&&(0,o.gO)({id:i.id,week:l.index}).then((function(e){n.$set(i,"week".concat(l.index,"ListAll"),e.data)}))},handleQuery:function(){this.getList()},handleAdd:function(){var e=this;(0,o.i9)().then((function(t){e.getList()}))},handleDel:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){(0,o.Dv)({id:e}).then((function(e){t.getList(),t.$message.success("删除成功!")}))})).catch((function(){}))},getList:function(){var e=this;this.listLoading=!0,(0,o.Jr)().then((function(t){e.hasAuth=!0,e.listData=t.data,e.listData.map((function(e,t){e.week1IdList=e.week1List.map((function(e){return e.name})),e.week2IdList=e.week2List.map((function(e){return e.name})),e.week3IdList=e.week3List.map((function(e){return e.name})),e.week4IdList=e.week4List.map((function(e){return e.name})),e.week5IdList=e.week5List.map((function(e){return e.name})),e.week6IdList=e.week6List.map((function(e){return e.name})),e.week7IdList=e.week7List.map((function(e){return e.name}))})),console.log(e.listData),e.listLoading=!1})).catch((function(t){e.hasAuth=!1})).finally((function(t){e.showPage=!0}))}}},c=r,u=n(35471),d=(0,u.Z)(c,i,l,!1,null,"07da9501",null),f=d.exports}}]);