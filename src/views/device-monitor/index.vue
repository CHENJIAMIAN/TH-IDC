<template>
  <div class="building-index">
    <div class="col1">
      <el-button
        v-show="sidebar.showSide"
        v-for="i in floorList"
        :key="i.id"
        @click="$router.push(`/device-monitor/floor/${i.id}/${i.name}`)"
        >{{ i.name }}</el-button
      >
    </div>
    <div class="col2">
      <img
        style="height: calc(100vh - 110px - 6rem)"
        class="preview-img"
        :src="buidingImage"
        alt="加载失败"
      />
    </div>
  </div>
</template>

<script>
import { floorListAll } from "@/api/device-monitor.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      buidingImage: "",
      floorList: [],
    };
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
    }),
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
  height: 100%;
}
.col1 {
  position: fixed;
  top: calc(110px + 5em);
  width: 200px;
  bottom: 60px;
  left: 60px;

  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 5px;
  justify-content: space-evenly;
  gap: 1rem;

  ::v-deep {
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
.col2 {
  display: grid;
  background: url(../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
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