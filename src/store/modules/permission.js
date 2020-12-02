import { asyncRoutes, constantRoutes } from '@/router'

function hasAuthorization(auth, route) {
  if (route.meta && route.meta.auth) {
    return auth.some(auth => {
      return route.meta.auth.some(routeAuth => {
        return routeAuth == auth
      })
    })
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, auth) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasAuthorization(auth, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, auth)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const getters = {
  hasAuth: (state, getters, rootState) => authorization => {
    return rootState.user.auth.some(auth => {
      return auth == authorization
    })
  }
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, auth) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, auth)
      console.log('generateRoutes',accessedRoutes);
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}


export const authOpts = {
  1003: "部门管理",
  1004: "用户管理",
  1005: "角色管理",
  1006: "菜单管理",
  1007: "权限管理",
  1009: "系统日志",
  1012: "楼层管理",
  1013: "房间管理",
  1014: "设备组管理",
  1015: "设备管理",
  1016: "测点管理",
  1018: "空间视图",
  1019: "连接视图",
  1023: "告警等级",
  1024: "告警显示",
  1026: "告警通知",
  1027: "告警工单",
  1028: "屏蔽设置",
  1029: "规则模板",
  1032: "告警规则",
  1034: "楼幢管理",
  1037: "房间类型",
  1038: "设备类型",
  1039: "测点类型",
  1040: "排班管理",
  1047: "存储设置",
  1049: "邮箱配置",
  1050: "短信配置",
  1051: "语音通道",
  1052: "告警策略",
  1053: "告警通知记录,"
}