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
import fecha from "element-ui/src/utils/date";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    chartName: {
      type: String,
    },
    seriesDataName: {
      type: String,
      require: true,
    },
    xAxisDataName: {
      type: String,
      require: true,
    },
    listData: {
      type: [Array],
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
    // 会造成切换页面时闪烁
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, "macarons");
    },
    setOptions() {
      const seriesData = this.listData.map((i) => i[this.seriesDataName]);
      const xAxisData = this.listData.map((i) => i[this.xAxisDataName]);
      // console.log(seriesData);
      // console.log(xAxisData);
      const series = [
        {
          // name: "设备" + i.deviceCode,
          // stack: "vistors",
          type: "line",
          smooth: true,
          data: seriesData,
          // barWidth: "60%",
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
