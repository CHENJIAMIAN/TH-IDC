<template>
  <div class="app-container" v-if="showPage">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 列表 -->
    <el-table
      v-if="hasAuth"
      empty-text=" "
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
      size="medium"
    >
      <el-table-column prop="floorCode" label="楼层编号" width="85" />
      <el-table-column prop="name" label="楼层名称" width="85" />
      <!-- <el-table-column prop="sort" label="排序" width="55" /> -->
      <el-table-column prop="1" label="母联柜" width="70" />
      <el-table-column prop="2" label="直流操作电源柜" width="135" />
      <el-table-column prop="3" label="变压器" width="70" />
      <el-table-column prop="4" label="低压进线柜" width="100" />
      <el-table-column prop="5" label="配电柜" width="70" />
      <el-table-column prop="6" label="柴油发电机组" />
      <el-table-column prop="7" label="蓄电池" width="70" />
      <el-table-column prop="8" label="UPS主机" width="85" />
      <el-table-column prop="9" label="UPS变换器" />
      <el-table-column prop="10" label="UPS逆变器" />
      <el-table-column prop="11" label="列头柜" width="70" />
      <el-table-column prop="12" label="空调" width="55" />
      <el-table-column prop="13" label="温湿度" width="70" />
      <el-table-column prop="14" label="氢气探测器" width="100" />
      <el-table-column prop="15" label="水浸" width="55" />
    </el-table>
  </div>
</template>

<script>
import { assetGetDeviceByFloorAndDeviceType } from "@/api/report-manage.js";
import { deviceTypeListAll } from "@/api/resource-manage.js";
export default {
  components: {},
  data() {
    return {
      showPage: false,
      hasAuth: true,
      listData: [],
      listLoading: true,
      deviceTypeOpts: [],
    };
  },
  created() {
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));

    this.listLoading = true;
    assetGetDeviceByFloorAndDeviceType()
      .then((r) => {
        this.hasAuth = true;
        this.listData = r.data;
        this.listLoading = false;
      })
      .catch((e) => {
        this.hasAuth = false;
      })
      .finally((_) => {
        this.showPage = true;
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
