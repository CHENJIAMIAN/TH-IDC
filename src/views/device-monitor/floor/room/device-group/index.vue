<template>
  <div
    class="device-group-index"
    :style="
      isLeftRightLayout
        ? isHideLeft
          ? 'grid-template-columns: auto;'
          : 'grid-template-columns: 40% auto;'
        : isHideTop
        ? 'grid-template-rows: 1fr 220px;'
        : 'grid-template-rows: unset;'
    "
  >
    <!-- 图片 if else-->
    <!-- 上布局 -->
    <div
      class="row1"
      :style="{
        position: isTopBottomLayout && 'absolute',
        top: isTopBottomLayout && (!isHideTop ? '0' : '-570px'),
      }"
      v-if="isTopBottomLayout"
    >
      <!-- 空调 -->
      <div class="kts">
        <div class="kt" v-for="kt in listData" :key="kt.deviceCode">
          <el-popover
            transition=""
            :close-delay="0"
            placement="right-start"
            trigger="hover"
            width="160"
            popper-class="untransparent"
          >
            <el-form class="kt-pop-form" :model="kt">
              <el-form-item label="设备编号">
                {{ kt.deviceCode }}
              </el-form-item>
              <el-form-item label="开关状态">
                {{ kt.onOff ? "开" : "关" }}
              </el-form-item>
              <el-form-item label="工作模式">
                <span v-if="kt.workMode == 1">通风</span>
                <span v-if="kt.workMode == 2">制冷</span>
                <span v-if="kt.workMode == 3">加热</span>
                <span v-if="kt.workMode == 4">除湿</span>
              </el-form-item>
              <el-form-item label="电流">
                {{ kt.current }}
              </el-form-item>
              <el-form-item label="电压">
                {{ kt.voltage }}
              </el-form-item>
              <el-form-item label="送风温度">
                {{ kt.supplyAirTemp }}
              </el-form-item>
              <el-form-item label="回风温度">
                {{ kt.returnAirTemp }}
              </el-form-item>
              <el-form-item label="送风湿度">
                {{ kt.supplyAirHumidity }}
              </el-form-item>
              <el-form-item label="回风湿度">
                {{ kt.returnAirHumidity }}
              </el-form-item>
              <el-form-item label="过滤器状态">
                {{ kt.filterMachine ? "开" : "关" }}
              </el-form-item>
              <el-form-item label="风机状态">
                <span v-if="kt.airMachine == 0">关</span>
                <span v-if="kt.airMachine == 1">开</span>
              </el-form-item>
              <el-form-item label="压缩机状态">
                <span v-if="kt.compressMachine == 0">关</span>
                <span v-if="kt.compressMachine == 1">开</span>
              </el-form-item>
            </el-form>
            <template slot="reference">
              <img
                :src="
                  kt.onOff
                    ? require('@/assets/img/kt1.png')
                    : require('@/assets/img/kt2.png')
                "
                class="img-kt"
              />
              <img
                :src="
                  kt.onOff
                    ? require('@/assets/img/fs1.png')
                    : require('@/assets/img/fs2.png')
                "
                class="img-fs"
                :class="kt.onOff && 'spin'"
              />
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- 左布局 -->
    <div
      v-else
      class="dc-tab"
      :style="{
        left: isHideLeft ? '-40%' : '0',
      }"
    >
      <el-tabs
        type="border-card"
        stretch
        v-model="imgActiveName"
        @tab-click="handleImgTabClick"
      >
        <el-tab-pane label="设备组" name="device" lazy>
          <div
            class="device-group-tab"
            :style="{
              'grid-template-rows': isDcRoom ? '1fr 150px' : '1fr',
            }"
          >
            <div ref="preiviewImgContainer1" style="position: relative">
              <img
                ref="preiviewImg1"
                style="cursor: pointer"
                @click="
                  dialogImgUrl = deviceGroupImg;
                  handleImgDialog();
                "
                class="preview-img"
                :src="deviceGroupImg"
                alt="加载失败"
              />
            </div>
            <div class="card-group" v-if="isDcRoom">
              <el-card class="card">
                <span>电池组电压</span>
                <span>{{ dc.voltageSum || "无" }}</span>
              </el-card>
              <el-card class="card">
                <span>电池组充放电电流</span>
                <span>{{ dc.currentSum || "无" }}</span>
              </el-card>
              <el-card class="card">
                <span>电池组平均温度</span>
                <span>{{ dc.temperatureAverage || "无" }}</span>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间" name="room" v-if="!isOnlyOneDeviceGroup" lazy>
          <div class="device-group-tab">
            <img
              style="cursor: pointer"
              @click="
                dialogImgUrl = roomImage;
                handleImgDialog();
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
    <div
      class="right-tables"
      :style="{
        'margin-left': !isHideLeft && !isTopBottomLayout ? '40%' : '0',
        width: !isHideLeft && !isTopBottomLayout ? '60%' : '100%',
        position: 'absolute',
        top: isTopBottomLayout && (isHideTop ? '0' : 'calc(40vh + 22px)'),
      }"
    >
      <!-- 收缩图标 -->
      <img
        :src="togglerImgSrc"
        v-show="isLeftRightLayout || isTopBottomLayout"
        title="切换图片显示"
        :class="{
          'side-toggler1': isLeftRightLayout,
          'side-toggler2': isTopBottomLayout,
        }"
        @click="
          isLeftRightLayout && (isHideLeft = !isHideLeft);
          isTopBottomLayout && (isHideTop = !isHideTop);
        "
      />
      <div class="row2">
        <el-tabs
          :class="
            isLeftRightLayout
              ? 'right-el-tabs'
              : !isHideTop
              ? !isHideTopDelay
                ? 'btm1-el-tabs'
                : 'btm2-el-tabs'
              : isHideTopDelay
              ? 'btm2-el-tabs'
              : 'btm1-el-tabs'
          "
          type="border-card"
          v-model="tableActiveName"
          @tab-click="handleTableTabClick"
        >
          <el-tab-pane label="数据信息" name="data-info" lazy>
            <!-- 列表 -->
            <div style="display: grid; height: 100%">
              <!-- 电池是图表 -->
              <template v-if="isDcRoom">
                <bar-chart
                  @clickBar="handleCellDataHistory"
                  chartName="温度"
                  typeName="temperature"
                  :listData="listData"
                />
                <bar-chart
                  @clickBar="handleCellDataHistory"
                  chartName="充电电流"
                  typeName="chargeCurrent"
                  :listData="listData"
                />
                <bar-chart
                  @clickBar="handleCellDataHistory"
                  chartName="放电电流"
                  typeName="dischargeCurrent"
                  :listData="listData"
                />
                <bar-chart
                  @clickBar="handleCellDataHistory"
                  chartName="电压"
                  typeName="voltage"
                  :listData="listData"
                />
                <bar-chart
                  @clickBar="handleCellDataHistory"
                  chartName="内阻"
                  typeName="internalResistance"
                  :listData="listData"
                />
              </template>
              <el-table
                v-else
                class="arrange-work-table"
                style="width: 100%"
                stripe
                v-loading="listLoading"
                border
                :data="listData"
                :cell-class-name="tableCellClassName"
                @cell-click="cellClick"
              >
                <el-table-column
                  prop="deviceCode"
                  label="设备编号"
                  width="100"
                />
                <el-table-column prop="deviceType" label="设备类型">
                  <template slot-scope="{ row }">
                    <span>{{
                      deviceTypeOpts.find((i) => i.id === deviceType) &&
                      deviceTypeOpts.find((i) => i.id === deviceType).name
                    }}</span>
                  </template>
                </el-table-column>
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
                <template v-if="[1, 2, 4, 5, 6, 11, 12].includes(deviceType)">
                  <el-table-column prop="onOff" label="开关状态" width="90">
                    <template slot-scope="{ row }">
                      <div v-if="row.onOff">开</div>
                      <div v-else style="color: red">关</div>
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
          <el-tab-pane label="参数状态" name="param-status" lazy> </el-tab-pane>
          <el-tab-pane label="告警记录" name="alert-record" lazy>
            <!-- <alert-notify /> -->
            <panel-alert-record :deviceGroupCode="deviceGroupCode" />
          </el-tab-pane>
          <el-tab-pane label="资产信息" name="asset-info" lazy>
            <!-- <device-manage /> -->
            <panel-asset-info :deviceGroupCode="deviceGroupCode" />
          </el-tab-pane>
          <el-tab-pane label="设备控制" name="equipment-control" lazy>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 图片弹窗 -->
    <el-dialog
      width="95%"
      custom-class="dialog-img"
      :visible.sync="dialogImgVisible"
      @close="imgMarkerIdDivMaps2 = []"
    >
      <div
        v-if="dialogImgVisible"
        ref="preiviewImgContainer2"
        style="position: relative"
      >
        <img
          ref="preiviewImg2"
          class="preview-img"
          :src="dialogImgUrl"
          alt="加载失败"
        />
      </div>
    </el-dialog>

    <!-- 点击数据cell，显示历史曲线 -->
    <el-dialog :visible.sync="dialogCellDataHistory.visible" width="80%">
      <div slot="title" class="el-dialog-title-custom">
        <div class="title-txt">数据历史</div>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialogCellDataHistory.forms"
        :rules="dialogCellDataHistory.rules"
        ref="dialogCellDataHistoryForm"
        label-width="80px"
      >
        <div
          style="
            margin-left: 40px;
            display: grid;
            grid-template-columns: auto auto;
            justify-content: start;
            justify-items: start;
            gap: 1rem;
            align-items: start;
          "
        >
          <el-form-item prop="startDate_endDate" label="时间范围">
            <el-date-picker
              style="width: 240px"
              v-model="dialogCellDataHistory.forms.startDate_endDate"
              type="daterange"
              placeholder="时间范围"
              unlink-panels
              value-format="yyyy-MM-dd"
            />
            <!-- <el-date-picker

            v-model="dialogCellDataHistory.forms.startDate_endDate"
            type="date"
            placeholder="选择日期"
            :picker-options="dialogCellDataHistory.pickerOptions"
          >
          </el-date-picker> -->
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>
        </div>

        <LineChart
          :resData="this.dialogCellDataHistory.resData"
          :typeName="dialogCellDataHistory.forms.key"
        />
      </el-form>
      <div slot="footer" style="text-align: center"></div>
    </el-dialog>
  </div>
</template>


<script>
import LineChart from "@/views/device-monitor/floor/room/device-group/LineChart.vue";
import { mapState, mapGetters } from "vuex";
import fecha from "element-ui/src/utils/date";
import {
  deviceGroupListAll,
  deviceGroupTypeGetData,
  historyGetData,
} from "@/api/device-monitor.js";
import { deviceTypeListAll } from "@/api/resource-manage.js";
import panelAssetInfo from "./panelAssetInfo.vue";
import panelAlertRecord from "./panelAlertRecord.vue";
import BarChart from "./BarChart";
import getPageTitle from "@/utils/get-page-title";
export default {
  name: "device-group",
  components: {
    panelAssetInfo,
    panelAlertRecord,
    BarChart,
    LineChart,
  },
  data() {
    return {
      deviceTypeOpts: [],
      isHideLeft: false,
      isHideTop: false,
      isHideTopDelay: false,
      deviceType: NaN,
      imgActiveName: "device",
      tableActiveName: "data-info",
      floorId: "",
      floorName: "",
      roomId: "",
      roomName: "",
      deviceGroupId: "",
      deviceGroupName: "",
      temperature: "",
      alarmCount: "",
      deviceGroupList: [],
      //
      listLoading: false,
      listData: [{},{},{}],
      //
      dialogImgVisible: false,
      dialogImgUrl: "",
      // 电池的三个变量
      dc: {
        voltageSum: "",
        currentSum: "",
        temperatureAverage: "",
      },
      dialogCellDataHistory: {
        visible: false,
        forms: {
          startDate_endDate: [],
          startTime: null,
          endTime: null,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              },
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              },
            },
          ],
        },
        resData: [],
        rules: {},
      },
      //
      imgMarkerIdDivMaps1: [],
      imgMarkerIdDivMaps2: [],
    };
  },
  watch: {
    "dialogCellDataHistory.forms.startDate_endDate"(n, o) {
      this.dialogCellDataHistory.forms.startTime = n ? n[0] : null;
      this.dialogCellDataHistory.forms.endTime = n ? n[1] : null;
    },
    isHideTop(n, o) {
      if (n) {
        this.isHideTopDelay = n;
      } else {
        // 为了让动画el-tab的高度在动画结束时才改变
        setTimeout(() => {
          this.isHideTopDelay = n;
        }, 700);
      }
    },
  },
  computed: {
    ...mapState({
      roomImage: (state) => state.app.roomImage,
      deviceGroupImg: (state) => state.app.currentDeviceGroup.imgUrl,
      deviceGroupCode: (state) => state.app.currentDeviceGroup.deviceGroupCode,
      groupType: (state) => state.app.currentDeviceGroup.groupType,
    }),
    isDcRoom() {
      return this.roomName.includes("电池");
    },
    isOnlyOneDeviceGroup() {
      return this.roomName.includes("IDC");
    },
    isTopBottomLayout() {
      return this.roomName.includes("空调");
    },
    isLeftRightLayout() {
      return !this.roomName.includes("空调");
    },
    togglerImgSrc() {
      let src = "";
      if (this.isLeftRightLayout)
        !this.isHideLeft
          ? (src = require("@/assets/img/shou.png"))
          : (src = require("@/assets/img/fang.png"));
      if (this.isTopBottomLayout)
        !this.isHideTop
          ? (src = require("@/assets/img/shou.png"))
          : (src = require("@/assets/img/fang.png"));
      return src;
    },
  },
  created() {
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));

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
    // 下一次会显示上一次设置的名字，怎么解决？
    this.$route.meta.title = deviceGroupName.trim();
    // this.$route.meta.title设置比在router.beforeEach设置标题要慢,要重新设一遍
    document.title = getPageTitle(this.$route.meta.title);

    this.getList();
    const interval = setInterval(() => {
      this.getList();
    }, 6 * 1000);
    this.$on("hook:beforeDestroy", (_) => {
      clearInterval(interval);
    });
  },
  methods: {
    handleImgDialog() {
      this.dialogImgVisible = true;
      this.loadOnOffMarker("2");
    },
    loadOnOffMarker(type) {
      // 加载marker
      this.$nextTick((_) => {
        // 在此才能取到图片要素
        const myImg = this.$refs[`preiviewImg${type}`];
        if (!myImg) return;
        const loadMarker = () => {
          // 只是测点搜索,即重载时,移除图片上对应的marker
          (type == "1"
            ? this.imgMarkerIdDivMaps1
            : this.imgMarkerIdDivMaps2
          ).forEach((o) => {
            if (!o) return;
            this.$refs[`preiviewImgContainer${type}`].removeChild(o.div);
          });
          type == "1"
            ? (this.imgMarkerIdDivMaps1 = [])
            : (this.imgMarkerIdDivMaps2 = []); //初始化

          this.listData.forEach((i) => {
            const { pointLocations } = i;
            pointLocations.forEach((pointLocation) => {
              const {
                id,
                imgType,
                location: location2,
                name,
                pointCode,
                value,
              } = pointLocation;
              const location = location2.split(",");
              if (!location || location.length < 2) return;
              //获取图片的高度和宽度
              const currWidth = myImg.clientWidth;
              const currHeight = myImg.clientHeight;
              const ProportionHeightInImg = location[0]; //鼠标所选位置相对于所选图片高度的比例
              const ProportionWidthInImg = location[1]; //鼠标所选位置相对于所选图片宽度的比例
              // 还原marker位置
              const div = document.createElement("img");
              div.src = value
                ? require(`@/assets/img/open${imgType}.png`)
                : require(`@/assets/img/close${imgType}.png`);
              div.title = name;
              div.className = "marker";
              let openStyle = "";
              switch (+imgType) {
                case 1:
                  openStyle = "transform: translate(-77%, -50%);";
                  break;
                case 2:
                  openStyle = "transform: translate(-77%, -50%);";
                  break;
                case 3:
                  openStyle = "transform: translate(-50%, -23%);";
                  break;
                case 4:
                  openStyle = "transform: translate(-23%, -50%);";
                  break;
                case 5:
                  openStyle = "transform: translate(-50%, -50%);";
                  break;
              }
              div.style = value
                ? "transform: translate(-50%, -50%);"
                : openStyle;

              div.onclick = () => {
                // 点击时修修改该测点的状态
              };

              let x = currWidth * ProportionWidthInImg;
              let y = currHeight * ProportionHeightInImg;
              div.style.left = x + "px";
              div.style.top = y + "px";
              this.$refs[`preiviewImgContainer${type}`].appendChild(div);
              (type == "1"
                ? this.imgMarkerIdDivMaps1
                : this.imgMarkerIdDivMaps2
              ).push({ id, div });
            });
          });
        };
        myImg.onload = () => {
          loadMarker();
        };
        myImg.complete && loadMarker();
      });
    },

    handleQuery() {
      historyGetData(this.dialogCellDataHistory.forms).then((r) => {
        const { deviceCode, list } = r.data;
        this.dialogCellDataHistory.resData = r.data;
        // console.log("historyGetData", { deviceCode, list });
      });
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex;
      column.index = columnIndex;
      if (
        column.index > 0 &&
        !column.label.includes("状态") &&
        !column.label.includes("模式") &&
        !column.label.includes("类型") &&
        !column.label.includes("方式")
      )
        return "week-day";
    },
    cellClick(row, column, cell, event) {
      console.log({ row, column, cell, event });
      // this.clickedRow = row;
      // this.clickedColumn = column;
      if (
        column.index > 0 &&
        !column.label.includes("状态") &&
        !column.label.includes("模式") &&
        !column.label.includes("类型") &&
        !column.label.includes("方式")
      )
        this.handleCellDataHistory({ row, column, cell, event });
    },
    async handleCellDataHistory({ row, column, cell, event }) {
      // dialog显示时获取一级菜单列表
      // 编辑
      this.dialogCellDataHistory.forms = this.$options.data().dialogCellDataHistory.forms;
      this.dialogCellDataHistory.forms = Object.assign(
        this.dialogCellDataHistory.forms,
        {
          deviceCode: row.deviceCode,
          key: column.property,
        }
      );
      this.dialogCellDataHistory.visible = true;
      this.$nextTick((_) => {
        this.$refs["dialogCellDataHistoryForm"].clearValidate();
        this.handleQuery();
      });
    },
    handleImgTabClick(tab, event) {
      // console.log(tab,event); //tab.name
    },
    handleTableTabClick(tab, event) {},
    getList() {
      this.listLoading = true;
      deviceGroupTypeGetData({
        id: this.deviceGroupId,
        groupType: this.groupType,
      }).then((res) => {
        // console.log("GetData", res.data);
        if (!res.data) {
          this.listLoading = false;
          this.deviceType = 5;
          return;
        }
        const {
          deviceGroupId,
          deviceType,
          temperature,
          alarmCount,
          voltageSum,
          currentSum,
          temperatureAverage,
          list,
        } = res.data;

        this.deviceType = deviceType;
        this.dc.voltageSum = voltageSum;
        this.dc.currentSum = currentSum;
        this.dc.temperatureAverage = temperatureAverage;
        // list              [array]	是	数据列表，有15种数据返回，请参考 数据返回说明目录下的文档，对应deviceType的值有不同的返回不同的结果
        this.$parent.temperature = temperature;
        this.$parent.alarmCount = alarmCount;

        this.listData = list;
        this.listLoading = false;
        this.dialogImgVisible
          ? this.loadOnOffMarker("2")
          : this.loadOnOffMarker("1");
        // console.log(list.filter(i=>i.onOff==0).map(i=>i.deviceCode));
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
  position: relative;

  .row1 {
    transition: all 0.78s;
    display: grid;
    grid-template-columns: 40fr auto;
    border: solid #119aca;
    // 图片多大都不会撑开
    padding: 2rem;
    height: 40vh;
  }
  .row2 {
    display: grid;
    // background: url(../../../../../assets/img/btmwk.png) 0 0 / 100% 100%
    //   no-repeat;
    height: 100%;
  }
}
.dc-tab {
  position: absolute;
  width: calc(40% - 20px);
  height: 100%;
  transition: all 0.8s;
}
.right-tables {
  transition: all 0.8s;
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
  align-items: center;
  height: calc(100vh - 280px);
}
.card-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
}

.side-toggler1 {
  position: absolute;
  left: -18px;
  cursor: pointer;
  color: #31c6f1;
  z-index: 1;
  width: 1rem;
  top: 50%;
}
.side-toggler2 {
  position: absolute;
  top: -18px;
  cursor: pointer;
  color: #31c6f1;
  z-index: 1;
  width: 1rem;
  left: 50%;
  transform: rotate(90deg);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.kts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  overflow: auto;

  .kt {
    position: relative;
    width: 222px;
    height: 100px;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
    .img-kt {
    }
    .img-fs {
      width: 20%;
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
    .spin {
      animation: spin 1s linear infinite;
    }
  }
}

::v-deep {
  .marker {
    position: absolute;
  }

  .el-table th:first-child {
    //切掉第一个表头列的一个角
    // background: linear-gradient(-217deg, transparent 17px, #0838698c 0);
  }

  .btm2-el-tabs {
    .el-tabs__content {
      height: calc(100vh - 255px);
    }
  }

  .btm1-el-tabs {
    .el-tabs__content {
      overflow: auto;
      height: calc(100vh - 40vh - 275px);
    }
  }
  .right-el-tabs {
    .el-tabs__content {
      overflow: auto;
      height: calc(100vh - 250px);
    }
  }
  .card .el-card__body {
    display: grid;
    justify-items: center;
    gap: 2rem;
  }
  .dialog-img {
    height: 95%;
    background: #0b2a52;
    .el-dialog__body {
      display: grid;
      padding: 0 20px 30px 30px;
      margin-top: -20px;
    }
    .el-dialog__header {
      // display: none;
    }
  }

  .arrange-work-table th.is-leaf,
  .arrange-work-table tr,
  .arrange-work-table td {
    border: 1px solid;
  }

  .week-day {
    cursor: pointer;
  }

  td:hover {
    background: #0d708c !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: unset;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
    background: #0838698c;
  }
}
</style>
<style lang="scss">
// popover是在body下的,要全局声明
.untransparent {
  background: #0b2a52;
}
.kt-pop-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
