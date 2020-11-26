<template>
  <el-form class="kt-pop-form" :model="kt">
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
      {{ kt.compressMachine }}
    </el-form-item>
  </el-form>
</template>
<script>
export default {};
</script>