<template>
  <div class="building-index">
    <div class="col1">
      <el-button
        v-for="i in floorList"
        :key="i.id"
        @click="$router.push(`/device-monitor/floor/${i.id}/${i.name}`)"
        >{{ i.name }}</el-button
      >
    </div>
    <div class="col2">
      <img
        style="height: calc(100vh - 110px - 6rem);"
        class="preview-img"
        :src="buidingImage"
        alt="加载失败"
      />
    </div>
  </div>
</template>

<script>
import { floorListAll } from "@/api/device-monitor.js";

export default {
  data() {
    return {
      buidingImage: "",
      floorList: [],
    };
  },
  created() {
    floorListAll().then((r) => {
      const { buidingImage, floorList } = r.data;
      Object.assign(this, { buidingImage, floorList });
    });
  },
};
</script>
<style lang="scss" scoped>
.building-index {
  display: grid;
  grid-template-columns: 300px 1fr;
  .col1 {
    display: grid;
    align-items: center;
    align-content: center;
    gap: 2rem;
    ::v-deep{
      .el-button + .el-button {
          margin-left: 0;
      }
    }
  }
  .col2 {
    display: grid;
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