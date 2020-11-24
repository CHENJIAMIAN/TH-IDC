import Cookies from 'js-cookie'

const state = {
  sidebar: {
    showSide: false,
    opened: true,//Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  // 
  roomImage: "",
  currentDeviceGroup: {
    deviceGroupImg: "",
    deviceGroupCode: "",
  },
}

const mutations = {
  SET_CURRENT_DEVICEGROUP: (state, { roomImage, deviceGroup }) => {
    state.roomImage = roomImage;
    state.currentDeviceGroup = deviceGroup;
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  OPEN_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = true;
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_SIDE: (state) => {
    state.sidebar.showSide = !state.sidebar.showSide;
  },
  CLOSE_SIDE: (state) => {
    state.sidebar.showSide = false
  },
  OPEN_SIDE: (state) => {
    state.sidebar.showSide = true;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  openSideBar({ commit }, { withoutAnimation }) {
    commit('OPEN_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
