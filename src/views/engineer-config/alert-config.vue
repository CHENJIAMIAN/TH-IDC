<template>
  <div class="alert-config">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="告警等级" name="alert-level" lazy>
        <alert-level />
      </el-tab-pane>
      <el-tab-pane label="告警显示" name="alert-display" lazy>
        <alert-display />
      </el-tab-pane>
      <el-tab-pane label="屏蔽设置" name="alert-mask-setting"  lazy>
        <alert-mask-setting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import alertLevel from "@/views/engineer-config/alert-level/index";
import alertDisplay from "@/views/engineer-config/alert-display/index";
import alertMaskSetting from "@/views/engineer-config/alert-mask-setting/index";

export default {
  components: {
    alertLevel,
    alertDisplay,
    alertMaskSetting,
  },
  data() {
    return {
      activeName: "alert-level",
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
