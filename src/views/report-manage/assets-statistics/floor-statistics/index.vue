
<template>
  <div class="app-container">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <el-button
      class="top-bar"
      type="primary"
      icon="el-icon-download"
      plain
      @click="handleExport('filterForm')"
      >导出</el-button
    >
    <bar-chart v-if="hasAuth" chartName="楼层统计" :listData="listData" />
  </div>
</template>

<script>
import {
  assetGetDeviceByFloor,
  assetGetDeviceByFloorExcel,
} from "@/api/report-manage.js";
import BarChart from "./BarChart";
import { downloadFileByBlobResponse } from "@/utils";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      hasAuth: true,
      listData: [{},{},{}],
    };
  },
  created() {
    assetGetDeviceByFloor()
      .then((r) => {
        this.hasAuth = true;
        this.listData = r.data;
      })
      .catch((e) => {
        this.hasAuth = false;
      });
  },
  methods: {
    handleExport(form) {
      document.activeElement.blur();
      assetGetDeviceByFloorExcel().then((r) => {
        downloadFileByBlobResponse(r);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: grid;
  background: url(../../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
  align-items: center;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 35px;
  top: 70px;
}
</style>
