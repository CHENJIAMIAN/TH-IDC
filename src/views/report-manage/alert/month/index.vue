
<template>
  <div class="app-container">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <div class="top-bar">
      <el-date-picker
        v-if="hasAuth"
        v-model="startDate_endDate"
        type="monthrange"
        unlink-panels
        placeholder="时间范围"
        value-format="yyyy-MM"
      />
      <!-- 
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份" -->
      <el-button
        type="primary"
        icon="el-icon-download"
        plain
        @click="handleExport('filterForm')"
        >导出</el-button
      >
    </div>
    <line-chart
      v-if="hasAuth"
      chartName="月份统计"
      :listData="listData"
      seriesDataName="num"
      xAxisDataName="warnMonth"
    />
  </div>
</template>

<script>
import { warnQueryByMonth, warnExcelByMonth } from "@/api/report-manage.js";
import LineChart from "../LineChart";
import { downloadFileByBlobResponse } from "@/utils";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      showPage: false,
      hasAuth: true,
      startDate_endDate: [],
      listData: [],
      filterForm: {
        startTime: null,
        endTime: null,
      },
    };
  },
  watch: {
    startDate_endDate(n, o) {
      this.filterForm.startTime = n ? n[0] : null;
      this.filterForm.endTime = n ? n[1] : null;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      warnQueryByMonth(this.filterForm)
        .then((r) => {
          this.hasAuth = true;
          this.listData = r.data;
        })
        .catch((e) => {
          this.hasAuth = false;
        })
        .finally((_) => {
          this.showPage = true;
        });
    },
    handleExport(form) {
      document.activeElement.blur();
      warnExcelByMonth(this.filterForm).then((r) => {
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
  position: relative;
  grid-template-rows: auto 1fr;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-left: 50px;
}
</style>
