
<template>
  <div class="app-container">
    <bar-chart chartName="分类统计" :listData="listData" />
  </div>
</template>

<script>
import { assetGetDeviceByDeviceType } from "@/api/report-manage.js";
import BarChart from "./BarChart";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      listData: [],
    };
  },
  created() {
    assetGetDeviceByDeviceType().then((r) => {
      this.listData = r.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: grid;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
  align-items: center;
}
</style>
