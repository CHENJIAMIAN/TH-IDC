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
    <!-- <div class="side-breadcrumb" style="margin-left: 2rem;">
      <img
        src="@/assets/img/dw.png"
        style="transform: translate(0px, -13px);"
      />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div> -->
    <div class="side">
      <!-- 次级路由，从路由$route获取 -->
      <sidebar />
    </div>
    <div class="main-container">
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Layout",
  components: {
    Breadcrumb,
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
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
    //background: url(../assets/img/top.png) center no-repeat;
    .btn-group {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
  }

  .side {
    position: fixed;
    top: calc(#{$headhei} + 5em);
    width: 200px;
    bottom: 60px;
    border-style: solid;
    border-image-source: url(../assets/img/sideborder.png);
    border-image-slice: 47 92 47 87;
    border-image-width: 47px 92px 47px 90px;
    border-image-outset: 35px 37px 37px 35px;
    border-image-repeat: stretch stretch;
    left: 60px;
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

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
