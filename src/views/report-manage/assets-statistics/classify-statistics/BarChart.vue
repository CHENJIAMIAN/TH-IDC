<template>
  <div :style="{ height: `calc(${height} + 4rem)`, width: width }">
    <h2 style="margin-left: 3rem">{{ chartName }}</h2>
    <div
      ref="chart"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    chartName: {
      type: String,
    },
    listData: {
      type: Array,
      default: [],
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
    listData: {
      deep: true,
      handler() {
        this.setOptions();
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
      this.chart = echarts.init(this.$refs.chart, "macarons");
      this.chart.on("click", (params) => {
        // 在用户点击后控制台打印数据的名称
        this.$emit("clickBar");
      });
    },
    setOptions() {
      // console.log(this.listData);
      const seriesData = this.listData.map((i) => i.num);
      const xAxisData = this.listData.map((i) => i.deviceTypeName);
      // console.log(seriesData);
      // console.log(xAxisData);
      const series = [
        {
          // name: "设备" + i.deviceCode,
          // stack: "vistors",
          type: "bar",
          barWidth: "60%",
          data: seriesData,
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
            axisLabel: {
              interval: 0,
              rotate:20
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
