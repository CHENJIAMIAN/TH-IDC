<template>
  <div
    class="device-group-index"
    :style="
      roomName.includes('电池')
        ? 'grid-template-columns: 500px auto;'
        : 'grid-template-rows: 1fr 220px;'
    "
  >
    <div
      class="row1"
      :style="{ gap: showRoomImg ? '20px' : 'initial' }"
      v-if="!roomName.includes('电池')"
    >
      <div class="row1-col1">
        <img class="preview-img" :src="deviceGroupImg" alt="加载失败" />
      </div>
      <div class="row1-col2" v-if="showRoomImg">
        <img class="preview-img" :src="$parent.roomImage" alt="加载失败" />
      </div>
    </div>
    <div v-else class="dc-tab">
      <el-tabs stretch v-model="imgActiveName" @tab-click="handleImgTabClick">
        <el-tab-pane label="设备组" name="device">
          <img class="preview-img" :src="deviceGroupImg" alt="加载失败" />
          <div>
            <span>电池组电压</span>
            <span>电池组电流</span>
            <span>环境温度</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间" name="room">
          <img class="preview-img" :src="$parent.roomImage" alt="加载失败" />
        </el-tab-pane>
      </el-tabs>
      <i
        @click="imgActiveName = 'room' ? (imgActiveName = 'device') : false"
        class="el-icon-arrow-left arrow"
        style="left: 1rem"
      />
      <i
        @click="imgActiveName = 'device' ? (imgActiveName = 'room') : false"
        class="el-icon-arrow-right arrow"
        style="right: 1rem;r"
      />
    </div>

    <div>
      <div class="row2">
        <el-tabs
          class="btm-el-tabs"
          type="border-card"
          v-model="tableActiveName"
          @tab-click="handleTableTabClick"
        >
          <el-tab-pane label="数据信息" name="data-info">
            <!-- 列表 -->
            <el-table
              style="width: 100%"
              height="100%"
              stripe
              v-loading="listLoading"
              border
              :data="listData"
            >
              <!-- 8 -->
              <template v-if="roomName.includes('柴油发电')">
                <el-table-column sortable prop="onOff" label="开关状态">
                  <template slot-scope="{ row }">
                    <span v-if="row.onOff">开</span>
                    <span v-else>关</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="ua" label="UA" />
                <el-table-column sortable prop="ub" label="UB" />
                <el-table-column sortable prop="uc" label="UC" />
                <el-table-column sortable prop="uab" label="UAB" />
                <el-table-column sortable prop="ubc" label="UBC" />
                <el-table-column sortable prop="uac" label="UAC" />
                <el-table-column sortable prop="ia" label="IA" />
                <el-table-column sortable prop="ib" label="IB" />
                <el-table-column sortable prop="ic" label="IC" />
                <el-table-column sortable prop="rotateSpeed" label="转速" />
                <el-table-column sortable prop="waterTemp" label="水温" />
                <el-table-column
                  sortable
                  prop="lubricateOilPressure"
                  label="润滑油油压"
                />
                <el-table-column
                  sortable
                  prop="lubricateOilTemp"
                  label="润滑油油温"
                />
                <el-table-column
                  sortable
                  prop="startBatteryVoltage"
                  label="启动电池电压"
                />
                <el-table-column sortable prop="outputPower" label="输出功率" />
                <el-table-column
                  sortable
                  prop="outputVoltage"
                  label="输出电压"
                />
                <el-table-column sortable prop="oilLevel" label="液（油）位" />
                <el-table-column sortable prop="workState" label="工作状态">
                  <template slot-scope="{ row }">
                    <span v-if="row.workState == 1">运行</span>
                    <span v-if="row.workState == 2">停机</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="workMode" label="工作方式">
                  <template slot-scope="{ row }">
                    <span v-if="row.workMode == 1">自动</span>
                    <span v-if="row.workMode == 2">手动</span>
                  </template>
                </el-table-column>
              </template>

              <!-- 1 -->
              <template v-if="roomName.includes('精密空调')">
                <el-table-column sortable prop="onOff" label="开关状态">
                  <template slot-scope="{ row }">
                    <span v-if="row.onOff">开</span>
                    <span v-else>关</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="workMode" label="工作模式">
                  <template slot-scope="{ row }">
                    <span v-if="row.workMode == 1">通风</span>
                    <span v-if="row.workMode == 2">制冷</span>
                    <span v-if="row.workMode == 3">加热</span>
                    <span v-if="row.workMode == 4">除湿</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="current" label="电流" />
                <el-table-column sortable prop="voltage" label="电压" />
                <el-table-column
                  sortable
                  prop="supplyAirTemp"
                  label="送风温度"
                />
                <el-table-column
                  sortable
                  prop="returnAirTemp"
                  label="回风温度"
                />
                <el-table-column
                  sortable
                  prop="supplyAirHumidity"
                  label="送风湿度"
                />
                <el-table-column
                  sortable
                  prop="returnAirHumidity"
                  label="回风湿度"
                />
                <el-table-column
                  sortable
                  prop="filterMachine"
                  label="过滤器状态"
                >
                  <template slot-scope="{ row }">
                    <span v-if="row.filterMachine">开</span>
                    <span v-else>关</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="airMachine" label="风机状态">
                  <template slot-scope="{ row }">
                    <span v-if="row.airMachine">开</span>
                    <span v-else>关</span>
                  </template>
                </el-table-column>
                <el-table-column
                  sortable
                  prop="compressMachine"
                  label="压缩机状态"
                >
                  <template slot-scope="{ row }">
                    <span v-if="row.compressMachine">开</span>
                    <span v-else>关</span>
                  </template>
                </el-table-column>
              </template>

              <!-- 2-7 -->
              <template
                v-if="
                  roomName.includes('UPS配电') ||
                  roomName.includes('低压配电') ||
                  roomName.includes('高压配电') ||
                  roomName.includes('变压器') ||
                  roomName.includes('IDC机') ||
                  roomName.includes('电池')
                "
              >
                <el-table-column sortable prop="ua" label="UA" />
                <el-table-column sortable prop="ub" label="UB" />
                <el-table-column sortable prop="uc" label="UC" />
                <el-table-column sortable prop="uab" label="UAB" />
                <el-table-column sortable prop="ubc" label="UBC" />
                <el-table-column sortable prop="uac" label="UAC" />
                <el-table-column sortable prop="ia" label="IA" />
                <el-table-column sortable prop="ib" label="IB" />
                <el-table-column sortable prop="ic" label="IC" />
                <el-table-column sortable prop="frequency" label="频率" />
                <el-table-column sortable prop="temperature" label="温度" />
                <el-table-column sortable prop="sync" label="同步状态">
                  <template slot-scope="{ row }">
                    <span v-if="row.sync == 1">同步</span>
                    <span v-if="row.sync == 2">不同步</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="powerMode" label="供电类型">
                  <template slot-scope="{ row }">
                    <span v-if="row.sync == 1">UPS</span>
                    <span v-if="row.sync == 2">旁路供电</span>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="outIc" label="OUT_IC" />
              </template>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="参数状态" name="param-status"> </el-tab-pane>
          <el-tab-pane label="告警记录" name="alert-record">
            <alert-notify />
          </el-tab-pane>
          <el-tab-pane label="资产信息" name="asset-info"> 
            <device-manage/>
          </el-tab-pane>
          <el-tab-pane label="设备控制" name="equipment-control"> </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
/* 
2. UPS配电房    有设备组 布局 
3.低压配电房    有设备组 布局 
4. 高压配电房   有设备组 布局 
6. 变压器房     有设备组 布局 
1. 精密空调房   无设备组 布局          
7. IDC机房      无设备组 布局
8.柴油发电机    无设备组 布局
5. 电池房       电池房   布局          

都有表格数据， 表格数据对应房间接口
*/
import {
  deviceGroupListAll,
  roomTypeDeviceGroupListAllRoomType8, // 8. 柴油发电机房
  /* 2-7返回字段相同 */
  roomTypeDeviceGroupListAllRoomType7, // 7. IDC机房
  roomTypeDeviceGroupListAllRoomType6, // 6. 变压器房
  roomTypeDeviceGroupListAllRoomType5, // 5. 电池房
  roomTypeDeviceGroupListAllRoomType4, // 4. 高压配电房
  roomTypeDeviceGroupListAllRoomType3, // 3. 低压配电房
  roomTypeDeviceGroupListAllRoomType2, // 2. UPS配电房
  /* 2-7返回字段相同 */
  roomTypeDeviceGroupListAllRoomType1, // 1. 精密空调房
} from "@/api/device-monitor.js";
import alertNotify from "@/views/engineer-config/alert-notify/index.vue";
import deviceManage from "@/views/resource-manage/device-manage/index.vue"
export default {
  name: "device-group",
  components: {
    alertNotify,deviceManage
  },
  data() {
    return {
      imgActiveName: "device",
      tableActiveName: "data-info",
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
      deviceGroupImg: "",
      //
      listLoading: false,
      listData: [],
    };
  },
  computed: {
    showRoomImg() {
      return (
        this.roomName.includes("UPS配电") ||
        this.roomName.includes("低压配电") ||
        this.roomName.includes("高压配电") ||
        this.roomName.includes("变压器") ||
        this.roomName.includes("电池")
      );
    },
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
    this.deviceGroupImg = this.$route.query.deviceGroupImg;

    this.$route.meta.title = deviceGroupName;

    this.getList();
  },
  methods: {
    handleImgTabClick(tab, event) {
      // console.log(tab,event); //tab.name
    },
    handleTableTabClick(tab, event) {},
    getList() {
      this.listLoading = true;
      roomTypeDeviceGroupListAllRoomType4({ id: this.roomId }).then((res) => {
        this.listData = res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.device-group-index {
  display: grid;
  height: 100%;
  gap: 20px;

  .row1 {
    display: grid;
    grid-template-columns: 40fr auto;
    &-col1 {
      display: grid;
      border: solid #119aca;
      // 图片多大都不会撑开
      height: calc(100vh - 460px);
    }
    &-col2 {
      display: grid;
      border: solid #119aca;
      // 图片多大都不会撑开
      height: calc(100vh - 460px);
    }
  }
  .row2 {
    display: grid;
    // background: url(../../../../../assets/img/btmwk.png) 0 0 / 100% 100%
    //   no-repeat;
    height: 100%;
  }
}
.dc-tab {
  position: relative;
  border: solid #119aca;
}

::v-deep {
  .el-table th:first-child {
    //切掉第一个表头列的一个角
    // background: linear-gradient(-217deg, transparent 17px, #0838698c 0);
  }
  .btm-el-tabs {
    .el-tabs__content {
      overflow: auto;
      height: 180px;
    }
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

.arrow {
  position: absolute;
  top: 50%;

  cursor: pointer;
  color: #119aca;
  font-weight: bold;
  font-size: 2rem;
}
</style>