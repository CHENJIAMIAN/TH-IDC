<template>
  <div
    class="device-group-index"
    :style="
      isDcLayout
        ? 'grid-template-columns: 40% auto;'
        : 'grid-template-rows: 1fr 220px;'
    "
  >
    <!-- 图片 -->
    <div
      class="row1"
      :style="{ gap: showRoomImg ? '20px' : 'initial' }"
      v-if="!isDcLayout"
    >
      <div class="row1-col1">
        <img
          style="cursor: pointer"
          @click="
            dialogImgVisible = true;
            dialogImgUrl = deviceGroupImg;
          "
          class="preview-img"
          :src="deviceGroupImg"
          alt="加载失败"
        />
      </div>
      <div class="row1-col2" v-if="showRoomImg">
        <img
          style="cursor: pointer"
          @click="
            dialogImgVisible = true;
            dialogImgUrl = roomImage;
          "
          class="preview-img"
          :src="roomImage"
          alt="加载失败"
        />
      </div>
    </div>
    <div v-else class="dc-tab">
      <el-tabs stretch v-model="imgActiveName" @tab-click="handleImgTabClick">
        <el-tab-pane label="设备组" name="device">
          <div
            class="device-group-tab"
            :style="{
              'grid-template-rows': roomName.includes('电池')
                ? '1fr 150px'
                : '1fr',
            }"
          >
            <img
              style="cursor: pointer"
              @click="
                dialogImgVisible = true;
                dialogImgUrl = deviceGroupImg;
              "
              class="preview-img"
              :src="deviceGroupImg"
              alt="加载失败"
            />
            <div class="card-group" v-if="roomName.includes('电池')">
              <el-card class="card">
                <span>电池组电压</span>
                <span>{{ "无" }}</span>
              </el-card>
              <el-card class="card">
                <span>电池组电流</span>
                <span>{{ "无" }}</span>
              </el-card>
              <el-card class="card">
                <span>环境温度</span>
                <span>{{ "无" }}</span>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间" name="room">
          <div style="display: grid; height: calc(100vh - 340px)">
            <img
              style="cursor: pointer"
              @click="
                dialogImgVisible = true;
                dialogImgUrl = roomImage;
              "
              class="preview-img"
              :src="roomImage"
              alt="加载失败"
            />
          </div>
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
    <!-- 表格 -->
    <div>
      <div class="row2">
        <el-tabs
          :class="isDcLayout ? 'right-el-tabs' : 'btm-el-tabs'"
          type="border-card"
          v-model="tableActiveName"
          @tab-click="handleTableTabClick"
        >
          <el-tab-pane label="数据信息" name="data-info">
            <!-- 列表 -->
            <div style="display: grid; height: 100%">
              <!-- style="width: calc(100vw - 60px)"-->
              <el-table
                style="width: 100%"
                stripe
                v-loading="listLoading"
                border
                :data="listData"
              >
                <template v-if="[3, 7, 13].includes(deviceType)">
                  <el-table-column prop="temperature" label="温度" />
                </template>

                <template v-if="[4].includes(deviceType)">
                  <el-table-column prop="cityElectric" label="市电状态">
                    <template slot-scope="{ row }">
                      <div v-if="row.cityElectric">开</div>
                      <div v-else>关</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="activePower" label="有功功率" />
                  <el-table-column prop="apparentPower" label="视在功率" />
                  <el-table-column prop="reactivePower" label="无功功率" />
                  <el-table-column prop="electricalDegree" label="电度" />
                </template>
                <template v-if="[1, 2, 4, 6, 11, 12].includes(deviceType)">
                  <el-table-column prop="onOff" label="开关状态">
                    <template slot-scope="{ row }">
                      <div v-if="row.onOff">开</div>
                      <div v-else>关</div>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="[3, 4, 8].includes(deviceType)">
                  <el-table-column prop="frequency" label="频率" />
                </template>
                <template v-if="[3, 4].includes(deviceType)">
                  <el-table-column prop="pa" label="pa" />
                  <el-table-column prop="pb" label="pb" />
                  <el-table-column prop="pc" label="pc" />
                  <el-table-column prop="pfa" label="pfa" />
                  <el-table-column prop="pfb" label="pfb" />
                  <el-table-column prop="pfc" label="pfc" />
                </template>
                <template v-if="[1, 3, 5, 6, 8, 11].includes(deviceType)">
                  <el-table-column prop="ua" label="UA" />
                  <el-table-column prop="ub" label="UB" />
                  <el-table-column prop="uc" label="UC" />
                  <el-table-column prop="uab" label="UAB" />
                  <el-table-column prop="ubc" label="UBC" />
                  <el-table-column prop="uac" label="UAC" />
                  <el-table-column prop="ia" label="IA" />
                  <el-table-column prop="ib" label="IB" />
                  <el-table-column prop="ic" label="IC" />
                </template>
                <template v-if="[2].includes(deviceType)">
                  <el-table-column prop="list" label="数据列表" />
                  <el-table-column prop="storedVoltage" label="贮能电压" />
                  <el-table-column prop="controlVoltage" label="控制电压" />
                  <el-table-column prop="floatingVoltage" label="浮充电压" />
                  <el-table-column prop="batteryVoltage" label="电池电压" />
                  <el-table-column prop="chargeCurrent" label="充电电流" />
                </template>
                <template v-if="[6].includes(deviceType)">
                  <el-table-column prop="rotateSpeed" label="转速" />
                  <el-table-column prop="waterTemp" label="水温" />
                  <el-table-column
                    prop="lubricateOilPressure"
                    label="润滑油油压"
                    width="110"
                  />
                  <el-table-column
                    prop="lubricateOilTemp"
                    label="润滑油油温"
                    width="110"
                  />
                  <el-table-column
                    prop="startBatteryVoltage"
                    label="启动电池电压"
                    width="120"
                  />
                  <el-table-column prop="outputPower" label="输出功率" />
                  <el-table-column prop="outputVoltage" label="输出电压" />
                  <el-table-column prop="oilLevel" label="液(油)位" />
                  <el-table-column prop="workState" label="工作状态">
                    <template slot-scope="{ row }">
                      <div v-if="row.workState == 0">停机</div>
                      <div v-if="row.workState == 1">运行</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="workMode" label="工作方式">
                    <template slot-scope="{ row }">
                      <div v-if="row.workMode == 0">手动</div>
                      <div v-if="row.workMode == 1">自动</div>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="[7].includes(deviceType)">
                  <el-table-column prop="chargeCurrent" label="充电电流" />
                  <el-table-column prop="dischargeCurrent" label="放电电流" />
                  <el-table-column prop="voltage" label="电压" />
                  <el-table-column prop="internalResistance" label="内阻" />
                </template>
                <template v-if="[9].includes(deviceType)">
                  <el-table-column prop="inVoltage" label="输入电压" />
                  <el-table-column prop="inCurrent" label="输入电流" />
                  <el-table-column prop="outVoltage" label="输出电压" />
                  <el-table-column prop="outCurrent" label="输出电流" />
                </template>
                <template v-if="[10].includes(deviceType)">
                  <el-table-column
                    prop="directInVoltage"
                    label="直流输入电压"
                  />
                  <el-table-column
                    prop="directInCurrent"
                    label="直流输入电流"
                  />
                  <el-table-column prop="outUa" label="outUa" />
                  <el-table-column prop="outUb" label="outUb" />
                  <el-table-column prop="outUc" label="outUc" />
                  <el-table-column prop="outUab" label="outUab" />
                  <el-table-column prop="outUbc" label="outUbc" />
                  <el-table-column prop="outUac" label="outUac" />
                  <el-table-column prop="outIa" label="outIa" />
                  <el-table-column prop="outIb" label="outIb" />
                  <el-table-column prop="outIc" label="outIc" />
                  <el-table-column prop="outFrequency" label="频率" />
                </template>
                <template v-if="[12].includes(deviceType)">
                  <el-table-column prop="workMode" label="工作模式">
                    <template slot-scope="{ row }">
                      <span v-if="row.workMode == 1">通风</span>
                      <span v-if="row.workMode == 2">制冷</span>
                      <span v-if="row.workMode == 3">加热</span>
                      <span v-if="row.workMode == 4">除湿</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="current" label="电流" />
                  <el-table-column prop="voltage" label="电压" />
                  <el-table-column prop="supplyAirTemp" label="送风温度" />
                  <el-table-column prop="returnAirTemp" label="回风温度" />
                  <el-table-column prop="supplyAirHumidity" label="送风湿度" />
                  <el-table-column prop="returnAirHumidity" label="回风湿度" />
                  <el-table-column prop="filterMachine" label="过滤器状态">
                    <template slot-scope="{ row }">
                      <span v-if="row.filterMachine">开</span>
                      <span v-else>关</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="airMachine" label="风机状态">
                    <template slot-scope="{ row }">
                      <div v-if="row.airMachine == 0">关</div>
                      <div v-if="row.airMachine == 1">开</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="compressMachine" label="压缩机状态">
                    <template slot-scope="{ row }">
                      <div v-if="row.compressMachine == 0">关</div>
                      <div v-if="row.compressMachine == 1">开</div>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="[13].includes(deviceType)">
                  <el-table-column prop="humidity" label="湿度" />
                </template>
                <template v-if="[14].includes(deviceType)">
                  <el-table-column
                    prop="hydrogenConcentration"
                    label="氢气浓度"
                  />
                </template>
                <template v-if="[15].includes(deviceType)">
                  <el-table-column prop="leak" label="漏水状态">
                    <template slot-scope="{ row }">
                      <span v-if="row.leak">异常</span>
                      <span v-else>正常</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="参数状态" name="param-status"> </el-tab-pane>
          <el-tab-pane label="告警记录" name="alert-record">
            <!-- <alert-notify /> -->
            <panel-alert-record :deviceGroupCode="deviceGroupCode" />
          </el-tab-pane>
          <el-tab-pane label="资产信息" name="asset-info">
            <!-- <device-manage /> -->
            <panel-asset-info :deviceGroupCode="deviceGroupCode" />
          </el-tab-pane>
          <el-tab-pane label="设备控制" name="equipment-control"> </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 图片弹窗 -->
    <el-dialog
      width="80%"
      custom-class="dialog-img"
      :visible.sync="dialogImgVisible"
      :show-close="false"
    >
      <img class="preview-img" :src="dialogImgUrl" alt="加载失败" />
    </el-dialog>
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
  deviceGroupTypeGetData,
} from "@/api/device-monitor.js";
import panelAssetInfo from "./panelAssetInfo.vue";
import panelAlertRecord from "./panelAlertRecord.vue";
export default {
  name: "device-group",
  components: {
    panelAssetInfo,
    panelAlertRecord,
  },
  data() {
    return {
      deviceType: NaN,
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
      deviceGroupCode: "",
      //
      listLoading: false,
      listData: [],
      //
      dialogImgVisible: false,
      dialogImgUrl: "",
    };
  },
  watch:{
  },
  computed: {
    isDcLayout() {
      return (
        this.roomName.includes("电池") ||
        this.roomName.includes("高压配电") ||
        this.roomName.includes("UPS配电") ||
        this.roomName.includes("低压配电") ||
        this.roomName.includes("变压器") ||
        this.roomName.includes("电池")
      );
    },
    showRoomImg() {
      return this.roomName.includes("空调");
    },
  },
  created() {
    console.log('device-group',this._uid);
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
    const { roomImage, currentDeviceGroup } = this.$parent;
    this.roomImage = roomImage || this.$route.query.roomImage;
    this.deviceGroupImg = currentDeviceGroup.imgUrl || this.$route.query.deviceGroupImg;
    this.deviceGroupCode = currentDeviceGroup.deviceGroupCode || this.$route.query.deviceGroupCode;
    //
    this.$route.meta.title = deviceGroupName;
    // 下一次会显示上一次设置的名字，怎么解决？

    this.getList();
  },
  methods: {
    handleImgTabClick(tab, event) {
      // console.log(tab,event); //tab.name
    },
    handleTableTabClick(tab, event) {},
    getList() {
      this.listLoading = true;
      deviceGroupTypeGetData({ id: this.deviceGroupId }).then((res) => {
        console.log("GetData", res.data);
        const {
          deviceGroupId,
          deviceType,
          temperature,
          alarmCount,
          list,
        } = res.data;
        this.deviceType = deviceType;
        /* 
        deviceGroupId	        [int]	是	设备组id		
        deviceType	        [int]	是	15种设备类型,对应15种不同数据结构的list项
        temperature	        [string]	是	房间温度		
        alarmCount	        [int]	是	房间告警数		
        list              [array]	是	数据列表，有15种数据返回，请参考 数据返回说明目录下的文档，对应deviceType的值有不同的返回不同的结果	
        */
        this.$parent.temperature = temperature;
        this.$parent.alarmCount = alarmCount;

        this.listData = list;
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

.preview-img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  justify-self: center;
  align-self: center;
  overflow: auto;
  border-radius: 5px;
}

.arrow {
  position: absolute;
  top: 50%;

  cursor: pointer;
  color: #119aca;
  font-weight: bold;
  font-size: 2rem;
}

.device-group-tab {
  display: grid;
  height: calc(100vh - 340px);
}
.card-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
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
  .right-el-tabs {
    .el-tabs__content {
      overflow: auto;
      height: calc(100vh - 300px);
    }
  }
  .card .el-card__body {
    display: grid;
    justify-items: center;
    gap: 2rem;
  }
  .dialog-img {
    height: 80%;
    background: #0b2a52;
    .el-dialog__body {
      display: grid;
      padding: 30px 20px 30px;
    }
    .el-dialog__header {
      display: none;
    }
  }
}
</style>
