<template>
  <div class="alert-config">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="房间类型" name="room-type-manage"   lazy>
        <room-type-manage />
      </el-tab-pane>
      <el-tab-pane label="设备类型" name="device-type-manage" lazy>
        <device-type-manage />
      </el-tab-pane>
      <el-tab-pane label="测点类型" name="measure-point-type-manage"   lazy>
        <measure-point-type-manage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import roomTypeManage from "@/views/resource-manage/room-type-manage/index";
import deviceTypeManage from "@/views/resource-manage/device-type-manage/index";
import measurePointTypeManage from "@/views/resource-manage/measure-point-type-manage/index";

export default {
  components: {
    roomTypeManage,
    deviceTypeManage,
    measurePointTypeManage,
  },
  data() {
    return {
      activeName: "room-type-manage",
    };
  },
  methods: {
    handleTabClick(tab, event) {
      //   console.log(this.activeName,tab, event);
      //   this.$router.push(`/engineer-config/alert-config/${this.activeName}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.alert-config {
  display: grid;
  // background: url(../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
</style>
