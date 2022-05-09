"use strict";(self["webpackChunkTH_IDC"]=self["webpackChunkTH_IDC"]||[]).push([[2246],{92246:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"big-title"},[t._v("潼湖数据中心")]),s("img",{staticStyle:{width:"100vw"},attrs:{src:n(83773)}}),s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[t._v("欢迎登录")])]),s("el-form-item",{attrs:{prop:"username"}},[s("span",{staticClass:"svg-container"},[s("img",{attrs:{src:n(54972)}})]),s("el-input",{ref:"username",attrs:{placeholder:"请输入登录ID",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),s("el-tooltip",{attrs:{content:"大写锁定已打开 ",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("img",{attrs:{src:n(78307)}})]),s("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"请输入密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}]},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),s("el-button",{staticClass:"login-btn",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")])],1)],1)},o=[],i=(n(48503),n(23087),n(29377),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"social-signup-container"},[n("div",{staticClass:"sign-btn",on:{click:function(e){return t.wechatHandleClick("wechat")}}},[n("span",{staticClass:"wx-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),t._v(" WeChat ")]),n("div",{staticClass:"sign-btn",on:{click:function(e){return t.tencentHandleClick("tencent")}}},[n("span",{staticClass:"qq-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),t._v(" QQ ")])])}),a=[],r={name:"SocialSignin",methods:{wechatHandleClick:function(t){alert("ok")},tencentHandleClick:function(t){alert("ok")}}},c=r,l=n(35471),u=(0,l.Z)(c,i,a,!1,null,"7309fbbb",null),p=u.exports,d={name:"Login",components:{SocialSign:p},data:function(){var t=function(t,e,n){n()},e=function(t,e,n){e.length<5?n(new Error("密码不能少于5位")):n()};return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(t){var e=t.key;this.capsTooltip=e&&1===e.length&&e>="A"&&e<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){t.$router.push({path:"/"}),t.loading=!1})).catch((function(){t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(e,n){return"redirect"!==n&&(e[n]=t[n]),e}),{})}}},g=d,h=(0,l.Z)(g,s,o,!1,null,"098a1632",null),f=h.exports},83773:function(t,e,n){t.exports=n.p+"static/img/dlt.89cc20b6.png"},54972:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAABbElEQVQ4ja3UMUiUYRgH8N8dF55gLYmYITbpooRJ0W0OGrQIiYsIIa61OkhQo6ODDYLQ0KBB2w0iirhFREJ0gy5uIooSKIeBZefwvUeHvAefV//lgf/zvv/neZ/n/32ZQqmiDnoxjUc4RRFzOKs99Kk3ibk6IsPhYh5H6AqCzzCI8tUL2YhIHu9xgadoQysWMIA3scoxoSG0YxargTvDC+xiIq3QvRA/X+H/4AvuoDmNUHVuF5HceYhNaYQaQkyorh9qzv9OI7QfYnck14MTKde/gZ+Ywd0aflLipWKs1Zghf0gc/RbbWEcHHuMQr9II9WFM4my4idGa/G0sh64/hEIgUyhVspjCS9wP/Dm28A17getAPx7iRuC+Yx7vchLLv8YvfAyV1kQGGnALTzCOESyiM1MoVXbCEx6EGVwH7fiKctbfL/y6InCAY+T/m7OrW2uR/GcaQUtVaEuy4s1/aGgph+dYkQy8EZSxdAmx/0hL2hF3ZAAAAABJRU5ErkJggg=="},78307:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABFklEQVQ4ja3Tv0oDQRDH8c/pGf80BlsbkWCVF0hAEB/CQm0sFKwUG1stLS0EUbBRGxtrO0HMAxhBbNKIrUVAQSXE4i5wnHdyhvxg2WV25ruzO7NBrdmVozr2MI8SnnCCI3R6To1qNA/lQFZxF0NucI4yDnGF4XRAmAGZxilesIhWbB/FGZaxjuNkUFZGSxjDTgICn9hAG2vpoCzQXDzfZ+y94wGzRUDjiQyy1MFI2th7oxImEmuYzAGFCESPr/7oo1H1FdSa3U1RNX6dUlDf2Apqze4zpnDZJ2gFb6GorK/Y7hO0gHJeQyZ1EY8/ldWQaVUL+OR+kX9rYKAiV7seFGi/KKiNCm6LBGSoglaIXRxgpk9QC7s/HrYwQTQIEfMAAAAASUVORK5CYII="}}]);