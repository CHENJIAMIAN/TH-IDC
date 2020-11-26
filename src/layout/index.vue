<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div class="head">
      <navbar />
      <tags-view v-if="needTagsView" />
    </div>
    <div
      class="side-breadcrumb"
      style="
        margin-left: 2rem;
        position: absolute;
        transform: translate(0px, -10px);
        z-index: 1;
      "
    >
      <img src="@/assets/img/dw.png" style="transform: translate(0px, -13px)" />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <!-- 次级路由，从路由$route获取 -->
    <div class="side" :style="
          sidebar.showSide ? 'opacity:1;transition: all 1s ease-out;':'opacity:0;'
    ">
    <!-- 解决菜单从隐藏到显示，感觉怪怪的，被右边的盖着在上面出来似的，应该同步出来。所有的菜单都是这 -->
      <!-- side包含一个背景 -->
      <!-- sidebar的根据router生成的多级菜单 -->
      <sidebar v-show="sidebar.opened" />
    </div>
    <div class="main-container" 
    :style="{
          transition: $route.path.includes('/room/') 
          ?
          ''
          :
          'margin-left 0.28s'
      }">
      <img
        :src="sidebar.showSide ?  require('@/assets/img/shou.png'):require('@/assets/img/fang.png')"
        v-show="!$route.path.includes('/room/')"
        title="切换菜单显示"
        class="side-toggler"
        @click="$store.commit('app/TOGGLE_SIDE')"
      ></img>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState, mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Layout",
  components: {
    Breadcrumb,
    AppMain,
    Navbar,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSide: !this.sidebar.showSide,
        hideNavMenuInSide: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: url("../assets/img/mbg.png") no-repeat fixed;
  background-size: cover;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .head {
    position: relative;
    height: $headhei;
    background: url(../assets/img/top2.png) 0 0 / 100% 100% no-repeat;
    .btn-group {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
  }

  .side-toggler {
    position: absolute;
    top: 50%;
    left: -1px;
    cursor: pointer;
    color: #31c6f1;
    z-index: 1;
    width: 1rem;
  }

  .side {
    position: fixed;
    top: calc(#{$headhei} + 5em);
    left: $sideBarWidth - 240px;
    bottom: 60px;
    width: 200px;
    border-style: solid;

    border-image-source: url(../assets/img/sideborder.png);
    border-image-slice: 47 92 47 87;
    border-image-width: 47px 92px 47px 90px;
    border-image-outset: 35px 37px 37px 35px;
    border-image-repeat: stretch stretch;
    overflow-y: auto;
    overflow-x: hidden;    
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideNavMenuInSide .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
