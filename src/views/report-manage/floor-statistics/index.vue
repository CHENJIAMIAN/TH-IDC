
<template>
  <div class="app-container">
    <bar-chart chartName="楼层统计" :listData="listData" />
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
      listData: [],
    };
  },
  created() {
    assetGetDeviceByFloor().then((r) => {
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
