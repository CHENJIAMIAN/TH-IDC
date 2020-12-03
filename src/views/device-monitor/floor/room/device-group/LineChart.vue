<template>
  <div
    ref="chart"
    :class="className"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import fecha from "element-ui/src/utils/date";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    typeName: {
      type: String,
      require: true,
    },
    resData: {
      type: [Array, Object],
      require: true,
    },
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    resData: {
      deep: true,
      handler() {
        console.log(this.resData);
        const { deviceCode, list } = this.resData;
        this.setOptions({ deviceCode, list });
        this.chart.resize();
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
    },
    setOptions({ deviceCode, list }) {
      const seriesData = list.map((i) => i[this.typeName]);
      const xAxisData = list.map((i) => new Date(i.ts).toLocaleString());
      console.log(seriesData);
      console.log(xAxisData);
      const series = [
        {
          // name: "设备" + i.deviceCode,
          // stack: "vistors",
          type: "line",
          smooth: true,
          data: seriesData,
          // barWidth: "60%",
          // [
          // i.temperature,
          // i.chargeCurrent,
          // i.dischargeCurrent,
          // i.voltage,
          // i.internalResistance,
          // ]
        },
      ];

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        // xAxis: {
        //   type: "category",
        //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        // },
        // yAxis: {
        //   type: "value",
        // },
        // series: [
        //   {
        //     data: [120, 200, 150, 80, 70, 110, 130],
        //     type: "bar",
        //   },
        // ],
        xAxis: [
          {
            type: "category",
            // data: ["温度", "充电电流", "放电电流", "电压", "内阻"],
            data: xAxisData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: series,
      });
    },
  },
};
</script>
