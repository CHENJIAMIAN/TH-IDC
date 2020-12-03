<template>
  <el-breadcrumb class="app-breadcrumb" separator="" ref="sdfdsf">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!-- <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        > -->
      <!-- v-else  -->
      <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  mounted() {
    window.sdfdsf = this.$refs.sdfdsf;
  },
  methods: {
    getBreadcrumb() {
      //仅显示带有meta.title的路线
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
      //     matched
      //   );
      // }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      console.log(item);
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      // 解决设备监控页面,闪烁残留上一个设备组名称的问题,会造成刚进去面包屑没有最后一个,为什么? 
      // 因为src/views/device-monitor/floor/room/device-group/index.vue给this.$route.meta.title 赋值太慢了,赋值时已经生成好了
      if (this.$route.path.includes("/device-group"))
        this.$route.meta.title = " ";
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    cursor: text;
  }
}

::v-deep {
  .el-breadcrumb__separator {
    background: url("../../assets/img/jt.png");
    width: 30px;
    height: 26px;
    display: inline-block;
    transform: translate(0px, 6px);
  }
}
</style>
