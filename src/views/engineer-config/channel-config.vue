<template>
  <div class="alert-config">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="邮箱配置" name="mail-config">
        <mail-config />
      </el-tab-pane>
      <el-tab-pane label="短信配置" name="sms-config">
      </el-tab-pane>
      <el-tab-pane label="语音配置" name="voice-config">
        <alert-mask-setting />
      </el-tab-pane>
      <el-tab-pane label="微信配置" name="wechat-config">
        <alert-mask-setting />
      </el-tab-pane>
      <el-tab-pane label="钉钉配置" name="dingding-config">
        <alert-mask-setting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import alertLevel from "@/views/engineer-config/alert-level/index";
import alertDisplay from "@/views/engineer-config/alert-display/index";
import alertMaskSetting from "@/views/engineer-config/alert-mask-setting/index";
import mailConfig from "@/views/engineer-config/mail-config/index.vue"
export default {
  components: {
    alertLevel,
    alertDisplay,
    alertMaskSetting,
    mailConfig,
  },
  data() {
    return {
      activeName: "mail-config",
    };
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(this.activeName,tab, event);
      //   this.$router.push(`/engineer-config/alert-config/${this.activeName}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.alert-config {
  display: grid;
  background: url(../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
</style>
