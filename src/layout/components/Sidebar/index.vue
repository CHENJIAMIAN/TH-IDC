<template>
  <div :class="{ 'has-logo': showLogo }" v-show="!isCollapse">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in filtered_permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    filtered_permission_routes() {
      // 仅显示当前页面的路由
      return this.permission_routes.filter(i =>
        this.$route.path.includes(i.path)
      );
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-menu {
    background-color: transparent;
    border: none;
  }
  .el-menu-item:hover,
  .el-menu-item:focus,
  .el-submenu__title:hover {
    outline: none;
    background-color: #ebb40033;
  }
  .el-menu-item.is-active {
    color: #e39f40;
  }
  .el-submenu__title,
  .el-menu-item {
    font-size: 1.2rem;
  }
}
</style>
