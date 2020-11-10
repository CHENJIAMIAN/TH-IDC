<template>
  <div class="device-group-index">
    <div class="row1">
      <div class="row1-col1">
        <img class="preview-img" :src="deviceGroupImg" alt="加载失败" />
      </div>
      <div class="row1-col2">
        <img class="preview-img" :src="$parent.roomImage" alt="加载失败" />
      </div>
    </div>
    <div>
      <div class="row2">
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="数据信息" name="data-info">
            <!-- 列表 -->
            <el-table
              style="overflow: auto"
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
                  roomName.includes('IDC机') ||
                  roomName.includes('变压器') ||
                  roomName.includes('电池') ||
                  roomName.includes('高压配电') ||
                  roomName.includes('低压配电') ||
                  roomName.includes('UPS配电')
                "
              >
                <el-table-column sortable prop="inUa" label="IN_UA" />
                <el-table-column sortable prop="inUb" label="IN_UB" />
                <el-table-column sortable prop="inUc" label="IN_UC" />
                <el-table-column sortable prop="inUab" label="IN_UAB" />
                <el-table-column sortable prop="inUbc" label="IN_UBC" />
                <el-table-column sortable prop="inUac" label="IN_UAC" />
                <el-table-column sortable prop="inFrequency" label="输入频率" />
                <el-table-column sortable prop="outUa" label="OUT_UA" />
                <el-table-column sortable prop="outUb" label="OUT_UB" />
                <el-table-column sortable prop="outUc" label="OUT_UC" />
                <el-table-column sortable prop="outUab" label="OUT_UAB" />
                <el-table-column sortable prop="outUbc" label="OUT_UBC" />
                <el-table-column sortable prop="outUac" label="OUT_UAC" />
                <el-table-column sortable prop="outIa" label="OUT_IA" />
                <el-table-column sortable prop="outIb" label="OUT_IB" />
                <el-table-column sortable prop="outIc" label="OUT_IC" />
                <el-table-column
                  sortable
                  prop="outFrequency"
                  label="输出频率"
                />
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
        </el-tabs>
      </div>
    </div>
  </div>
</template>
            </el-table>
            <!-- <pagination
            :hidden="listTotal > 0 ? false : true"
            :total="listTotal"
            :page.sync="filterForm.pageNo"
            :limit.sync="filterForm.pageSize"
            @pagination="getList"
          /> -->
          </el-tab-pane>
          <el-tab-pane label="参数状态" name="param-status"> </el-tab-pane>
          <el-tab-pane label="告警记录" name="alert-record"> </el-tab-pane>
          <el-tab-pane label="资产信息" name="asset-info"> </el-tab-pane>
          <el-tab-pane label="设备控制" name="equipment-control"> </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
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

export default {
  name: "device-group",
  data() {
    return {
      activeName: "data-info",
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
    handleTabClick(tab, event) {},
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
  grid-template-rows: 1fr 220px;
  align-items: center;

  .row1 {
    display: grid;
    grid-template-columns: 40fr 10fr;
    gap: 20px;
    &-col1 {
      display: grid;
      border: solid #119aca;
    }
    &-col2 {
      display: grid;
      border: solid #119aca;
    }
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