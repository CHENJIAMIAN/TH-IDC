<template>
  <div class="device-group-index">
    <div class="row1">
      <div>
        <img class="preview-img" :src="imgUrl" alt="加载失败" />
      </div>
      <div>
        <img class="preview-img" :src="imgUrl" alt="加载失败" />
      </div>
    </div>
    <div>
      <div class="row2">
        <!-- 列表 -->
        <el-table
          style="overflow: auto"
          stripe
          v-loading="listLoading"
          border
          :data="listData"
        >
          <el-table-column sortable prop="deviceCode" label="设备编号" />
          <el-table-column sortable prop="switchCode" label="开关编号" />
          <el-table-column sortable prop="switchStatus" label="开关状态" />
          <el-table-column sortable prop="voltageA" label="A相电压" />
          <el-table-column sortable prop="voltageB" label="B相电压" />
          <el-table-column sortable prop="voltageC" label="C相电压" />
          <el-table-column sortable prop="voltageAB" label="AB相电压" />
          <el-table-column sortable prop="voltageAC复制" label="AC相电压" />
          <el-table-column sortable prop="voltageBC" label="BC相电压" />
          <el-table-column sortable prop="currentA" label="A相电流" />
          <el-table-column sortable prop="currentB" label="B相电流" />
          <el-table-column sortable prop="currentC" label="C相电流" />
          <el-table-column sortable prop="frequency" label="频率" />
          <el-table-column sortable prop="power" label="功率" />
          <el-table-column sortable prop="kilowatt" label="电度参数" />
        </el-table>
        <!-- <pagination
            :hidden="listTotal > 0 ? false : true"
            :total="listTotal"
            :page.sync="filterForm.pageNo"
            :limit.sync="filterForm.pageSize"
            @pagination="getList"
          /> -->
      </div>
    </div>
  </div>
</template>


<script>
import { deviceGroupListAll } from "@/api/device-monitor.js";

export default {
  data() {
    return {
      floorId: "",
      floorName: "",
      roomId: "",
      roomName: "",
      roomImage: "",
      deviceGroupId: "",
      deviceGroupName: "",
      temperature: "",
      alarmCount: "",
      deviceGroupList: [],
      //
      imgUrl: "",
      //
      listLoading: false,
      listData: [],
    };
  },
  created() {
    const {
      floorId,
      floorName,
      roomId,
      roomName,
      deviceGroupId,
      deviceGroupName,
    } = this.$route.params;
    Object.assign(this, {
      floorId,
      floorName,
      roomId,
      roomName,
      deviceGroupId,
      deviceGroupName,
    });
    this.imgUrl = this.$route.query.imgUrl;

    this.$route.meta.title = deviceGroupName;
  },
};
</script>
<style lang="scss" scoped>
.device-group-index {
  display: grid;
  grid-template-rows: 1fr 220px;
  .row1 {
    display: grid;
    grid-template-columns: 10fr 8fr;
  }
  .row2 {
    display: grid;
    background: url(../../../../../assets/img/btmwk.png) 0 0 / 100% 100%
      no-repeat;
    height: 100%;
  }
}

::v-deep {
  .el-table th:first-child {
    //切掉第一个表头列的一个角
    background: linear-gradient(-217deg, transparent 17px, #0838698c 0);
  }
}

.preview-img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  justify-self: center;
  align-self: center;
  overflow: auto;
}
</style>