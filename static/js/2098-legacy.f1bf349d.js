"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[2098],{41084:function(e,t,o){o.d(t,{Be:function(){return n},gS:function(){return s},oK:function(){return c},p6:function(){return a},w8:function(){return i}});var r=o(63810);function i(e){return(0,r.Z)({url:"/admin/devicemonitor/deviceGroup/listAll",method:"post",data:e})}function n(e){return(0,r.Z)({url:"/admin/devicemonitor/room/listAll",method:"post",data:e})}function a(e){return(0,r.Z)({url:"/admin/devicemonitor/floor/listAll",method:"post",data:e})}function s(e){return(0,r.Z)({url:"/admin/devicemonitor/deviceGroupType/getData",method:"post",data:e})}function c(e){return(0,r.Z)({url:"/admin/devicemonitor/History/getData",method:"post",data:e})}},22098:function(e,t,o){o.r(t),o.d(t,{default:function(){return A}});var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showPage?r("div",{staticClass:"room-index"},[e.hasAuth?e._e():r("h2",{staticClass:"auth-tip"},[e._v("权限不足,请联系管理员")]),r("div",{staticClass:"room-index-self"},[r("div",{staticClass:"row1"},[r("div",{ref:"btnsOut",staticClass:"btns"},[e.showBtns&&!e.isOnlyOneDeviceGroup?[e._l(e.deviceGroupList.slice(0,4),(function(t){return r("el-button",{key:t.id,staticClass:"el-button-custom",class:{active:t.name==e.activeDeviceGroupName},on:{"hook:mounted":e.btnsOutUpdated,"hook:updated":e.btnsOutUpdated,click:function(o){return e.routeToDeviceGroup(t)}}},[e._v(e._s(t.name))])})),e.deviceGroupList.slice(4).length>0?r("el-popover",{attrs:{width:e.popoverWidth,placement:"bottom-end",trigger:"hover","popper-class":"untransparent"},model:{value:e.moreBtnsVisible,callback:function(t){e.moreBtnsVisible=t},expression:"moreBtnsVisible"}},[r("div",{staticClass:"btns-fake"},e._l(e.deviceGroupList.slice(4),(function(t){return r("span",{key:t.id,staticClass:"btn-as-txt",class:{"active-txt":t.name==e.activeDeviceGroupName},on:{click:function(o){return e.routeToDeviceGroup(t)}}},[e._v(e._s(t.name))])})),0),r("img",{staticStyle:{cursor:"pointer"},style:e.moreBtnsVisible?"transform: rotate(225deg)":"transform: rotate(45deg)",attrs:{slot:"reference",width:"10",src:o(75779)},slot:"reference"})]):e._e()]:e._e()],2),e.hasAuth?[r("div",{staticClass:"img-container"},[r("img",{attrs:{width:"20",src:o(35122)}}),r("span",[e._v(" "+e._s(e.temperature))])]),r("div",{staticClass:"img-container"},[r("img",{attrs:{width:"25",src:o(39414)}}),r("span",[e._v("告警 "),r("span",{staticStyle:{color:"#ea2d2a"}},[e._v(e._s(e.alarmCount))]),e._v(" 条")])])]:e._e()],2),r("router-view")],1)]):e._e()},i=[],n=o(12516),a=(o(10405),o(46930),o(6734),o(43926),o(89570),o(98469),o(11490),o(41084)),s={name:"room",data:function(){return{showPage:!1,hasAuth:!0,moreBtnsVisible:!1,floorId:"",floorName:"",roomId:"",roomName:"",roomImage:"",temperature:"",alarmCount:"",deviceGroupList:[],popoverWidth:300}},computed:{activeDeviceGroupName:function(){return this.$route.params.deviceGroupName?this.$route.params.deviceGroupName.trim():""},isOnlyOneDeviceGroup:function(){return this.roomName.includes("IDC")},showBtns:function(){return!this.roomName.includes("空调")},btnsFakeStye:function(){var e=this.deviceGroupList.slice(4).length,t="1fr ";if(e>4)t="1fr 1fr 1fr 1fr";else for(var o=0;o<e-1;o++)t+="1fr ";return{"grid-template-columns":t}}},created:function(){var e=this;return(0,n.Z)(regeneratorRuntime.mark((function t(){var o,r,i,n,s,c,u,m,A,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=e.$route.params,r=o.floorId,i=o.floorName,n=o.roomId,s=o.roomName,Object.assign(e,{floorId:r,floorName:i,roomId:n,roomName:s}),e.$route.meta.title=s,t.prev=3,t.next=6,(0,a.w8)({id:e.roomId});case 6:c=t.sent,u=c.data,u.id,u.name,u.roomCode,m=u.roomImage,u.roomType,A=u.deviceGroupList,e.hasAuth=!0,A||(e.$message("该房间未配置设备组"),A=[]),Object.assign(e,{roomImage:m,deviceGroupList:A}),0!==A.length&&(1!=A.length&&e.$route.params.deviceGroupName||(l=A[0],e.routeToDeviceGroup(l))),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](3),e.hasAuth=!1,console.log(t.t0);case 18:return t.prev=18,e.showPage=!0,t.finish(18);case 21:case"end":return t.stop()}}),t,null,[[3,14,18,21]])})))()},mounted:function(){},methods:{btnsOutUpdated:function(){var e=getComputedStyle(this.$refs.btnsOut).width.slice(0,-2);this.popoverWidth=+e+3},routeToDeviceGroup:function(e){this.$store.commit("app/SET_CURRENT_DEVICEGROUP",{roomImage:this.roomImage,deviceGroup:e}),this.$router.push("/device-monitor/floor/".concat(this.floorId,"/").concat(this.floorName,"/room/").concat(this.roomId,"/").concat(encodeURIComponent(this.roomName),"/device-group/").concat(e.id,"/").concat(encodeURIComponent(e.name),"\n        "))}}},c=s,u=o(35471),m=(0,u.Z)(c,r,i,!1,null,"3921e8ee",null),A=m.exports},39414:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAADEElEQVRIiaXWT4xdUxwH8M+beZ1atB11Nf7TqDBpmBuZG4RKK0rYsCASKhHSqmpEmghCwsaiFtX4E5KGWNSioguJBSHMghByF70LGm0TsRjCzBVRNVS1Fvc8c3rd1/fmzTe5ub/z+57f+b7fOb/fPa81MzFuAEziSkxjTZIXP/UbONSDX9PFfzVGcQmW18kyS28ps3R4PoIZPsKneLaBn43s4zWxe/A+vi2z9M5+BW/G+mA/g5U1fjq8/8aRSGwJXgnDVehbcCemojk7a/wEViBJ8mIq8j9mbot/x/39Cs5iS7A/wws1/ghmcLjm3403g/10khezNV4rVOlp+LNB+Cp8FewLcbcquzHVNk/hGxR4J8mL/VBm6RgOJHlxvL5ga2ZifDG+xwE8FBaoYzu2YaSBi7ELW5O8OBY7w9m+iLVD2IuzcD2+xvPR3HOC74kGsfp2woM4VGbpZZHYBnyHB7BqCGUt6NzwHkWO1RE3qTrbFMtwOjar2qCDi5CXWXpBGK/EmR2yc4br8TqWROQk1kULbcQbtR/3ZJIX20Mmd2AP2oE7mOTFpYE7hLOxpRV92trhV/+C2/FutPBteK8m9gluwHCnOMosTbEvmvNwkhevlVm6ApK8mI7b4lgQg+ci/8sNYo8HsbfiSkzyolD1YgdPdYSSvJimuQ/Pw+XB/qu2ANxlrrA+rgcnebEDP4bh+WWWXhvz7XoArovsL3A0Gl+Dt6PxjWWWLlIdxc9JXuwO/r14JNhr8fmpBMci+8vIvgkf1ubeGx7YGvl/iOxlcUCT4KLIjnstUTXvrzjDXAbwaJIXr0bj+AvT6iX4TxfxPeGBiyPBXUlevFRbI66NE92I+eC+8P4gyYvN8wkcVHCD6ka5db6BgwgOq4pp3QCxjWfYCydUGQ6EXhn+0eD73x3XZxx6Z7gcS081oczSbnEDCW5zckP3i64XdZNgvB2Lw7MQnPS/piMYb1vX7RgQo2WW/rd+a2ZifBN2RBNGLDyrGEdVtw4cbuMKPQpjgRgxd6ZL29ivunj7KfeFYAi//QtGu8KoP1Ll7gAAAABJRU5ErkJggg=="},75779:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPUlEQVQYlY3KyREAEBAAwSEp4a0cBcSLcuyh351K63yQ/JOAGkUBKoAXV/Likaz4JC2q6Y5m2qObZgwTwABv0QuT+RAjKwAAAABJRU5ErkJggg=="},35122:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAhCAYAAADZPosTAAAC20lEQVRIiaWWTUgVURTHf+++EmywXkIpZWGafWDWJiroYxFEhasIokVWlPaxatMqCIKytbiIlMKwosJVhPRBLSpaa1gUoYShqVRENdOnd16LOfM8M84zzQOXc+Y/5/7vuffMOXNTxrUkyCngJDA3hrcCRzVgHRNxSCUQNgEnklYRuQ/smCzhNuCBer4OPAaqY4ucA04DKaAe2AK4QFuc8DmwWux64LJ6txl4CBSEwQBbgUfK560mzACfxe4Dlo7bLLQDdWJXAb+Ap0Ax4AMtM5RzRtm9CWThQqGsBW5ax5SnPb8IyFrHuJpQ772AZClU9u/cRMd8C+1oisYkNQk8F0za82vSnl8RAf9D3gElac9/AiwT4qZ8EU5GBoHSkEykNl+E4dYywGGCb7OH6JargXvAcSH2gTv5CEdFtwB7gNfASoLPJJQiAOuYi3pivi2HhEtEF4v+qXyySRP/teWvor0YniNPe34DqvSmk+WXBGXaqrDt0yHMAENAP2Ol16EJ/SkSVgBdE5XexykSfgiNfKV3RNmLRMczOU/Z+5JWCQlXAM0KvyE6HfPXzbcB2JuP8K7CrgBnxbYx3UnQqXMLpz0/+t8xrt1tXJuV8cK4FhkHjGtHBPeMa8+od21qTnM2myUcGNfeVi93yoRahenRqEj/CDasCVPGtb1AJUFVzJHA+4HF8fMRKQVGCFr/JsEWWMcMhWc4S8AvalI+MoCFogcUluvkhrHvqVSRd09A+Er0GoV90oTPxJ4JHBP7kHZSchD4AawiaGcA3dYxud2ljGurgDfyPAqUE3TjIqBRIhkAzhM0BAj+ipVi11nHXMstKRlrV5nsMa4tU9nUo9C4tkP59ukMh1kOuYeBErEtcBW4RfAvng/sAvYTLb8y65hBfSaasAa4BKxLOLu4vCeo/c74ZUk/9QDrCa5yiXc8kQvAcoIyHCdJ1zmADcBGgq4zG/guUXURrftx17m/rRREYASS1UQAAAAASUVORK5CYII="}}]);