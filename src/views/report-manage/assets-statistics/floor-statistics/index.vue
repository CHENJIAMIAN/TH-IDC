
<template>
  <div class="app-container">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <bar-chart v-if="hasAuth" chartName="楼层统计" :listData="listData" />
  </div>
</template>

<script>
import { assetGetDeviceByFloor } from "@/api/report-manage.js";
import BarChart from "./BarChart";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      hasAuth: true,
      listData: [],
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
};
</script>

<style lang="scss" scoped>
.app-container {
  display: grid;
  background: url(../../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
  align-items: center;
}
</style>
