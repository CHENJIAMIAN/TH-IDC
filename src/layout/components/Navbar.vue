<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->

    <div class="right-menu">
      <!-- <template v-if="device !== 'mobile'"> -->
      <!-- <search id="header-search" class="right-menu-item" /> -->

      <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

      <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

      <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      <!-- </template> -->

      <div class="avatar-wrapper">
        <el-badge :value="notifyCount" class="item" :hidden="notifyCount < 1">
          <a title="告警通知" @click="drawer = true"
            ><img src="@/assets/img/xx.png"
          /></a>
        </el-badge>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="mine">
            <img title="我的" src="@/assets/img/dlr.png" />
            <div class="name">{{ this.realName }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <user-info />
            </el-dropdown-item>
            <el-dropdown-item divided>
              <change-password />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a title="退出登录"
          ><img src="@/assets/img/zxdl.png" @click="logout"
        /></a>
      </div>
    </div>

    <el-drawer title="告警通知" :visible.sync="drawer" direction="btt"  size="80%">
      <alert-notify />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChangePassword from "@/components/ChangePassword.vue";
import UserInfo from "@/components/UserInfo.vue";
import Cookies from "js-cookie";
import alertNotify from "@/views/engineer-config/alert-notify/index";
import { alertNotificationGetAllCount } from "@/api/engineer-config.js";
export default {
  components: {
    ChangePassword,
    UserInfo,
    alertNotify,
  },
  data() {
    return {
      drawer: false,
      notifyCount: "",
      realName: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  created() {
    alertNotificationGetAllCount().then(
      (r) => (this.notifyCount = r.data.count)
    );
    this.realName = Cookies.get("realName");
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  float: right;
  top: 10px;
  position: absolute;
  right: 0;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-wrapper {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
      align-items: center;

      img:hover {
        filter: hue-rotate(206deg);
      }

      .user {
        display: flex;
        align-items: center;
        width: 58px;
        justify-content: space-between;
      }

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.mine {
  display: grid;
  grid-auto-flow: column;
  align-items: baseline;
  gap: 5px;
  color: #37d3ff;
  .name {
    transform: translate(0px, -5px);
    &:hover {
      filter: hue-rotate(206deg);
    }
  }
}
</style>
