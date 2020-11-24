<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="false" />
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <!-- 多级菜单默认是折叠的,要设置默认展开菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        :default-openeds="[
          '/system-setting/organization/organization',
          '/system-setting/system-operation/system-operation',
          '/system-setting',
          '/resource-manage/space-device/space-device',
          '/resource-manage/basic-type/basic-type',
          '/resource-manage',
          '/engineer-config/alert-config/alert-config',
          '/engineer-config/rule-manage/rule-manage',
          '/engineer-config/host-config/host-config',
          '/engineer-config',
        ]"
      >
        <sidebar-item
          v-for="route in filtered_permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    <!-- </el-scrollbar> -->
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
      const arr = this.permission_routes.filter(i =>
        i.path!=='/' && this.$route.path.includes(i.path)
      );
      // .map(i=>i.children).flat();//过滤出仅二级菜单
      return arr;
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
    font-size: 20px;
  }
}
</style>
