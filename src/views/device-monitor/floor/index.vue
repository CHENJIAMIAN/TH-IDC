<template>
  <div class="floor-index">
    <div class="floor-index-self" v-if="!$route.path.includes('/room')">
      <div class="col1"
          :style="
            sidebar.showSide
              ? 'opacity:1;transition: all 1s ease-out;'
              : 'opacity:0;'
          "
      >
        <!-- v-show="sidebar.showSide" -->
        <el-button
          v-for="room in roomList"
          :key="room.id"
          @click="
            $router.push(
              `/device-monitor/floor/${floorId}/${floorName}/room/${
                room.id
              }/${encodeURIComponent(room.name)}`
            )
          "
          >{{ room.name }}</el-button
        >
      </div>
      <div class="col2">
        <img
          style="height: calc(100vh - 110px - 6rem)"
          class="preview-img"
          :src="floorImage"
          alt="加载失败"
        />
      </div>
    </div>

    <router-view />
  </div>
</template>


<script>
import { roomListAll } from "@/api/device-monitor.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      floorId: "",
      floorName: "",
      floorImage: "",
      roomList: [],
    };
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
    }),
  },
  created() {
    console.log("floor", this._uid);
    const { floorId, floorName } = this.$route.params;
    Object.assign(this, { floorId, floorName });
    this.$route.meta.title = floorName;

    roomListAll({ id: this.floorId }).then((r) => {
      const { id, name, floorCode, floorImage, roomList } = r.data;
      Object.assign(this, { floorImage, roomList });
    });
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.floor-index {
  display: grid;
  height: calc(100% + 20px);
  margin-top: -10px;
}
.floor-index-self {
  height: 100%;
  display: grid;

  .col1 {
    position: fixed;
    top: calc(110px + 5em);
    width: 200px;
    bottom: 60px;
    left: $sideBarWidth - 240px;
    display: grid;
    overflow: auto;
    padding-right: 5px;
    gap: 1rem;

    ::v-deep {
      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
  .col2 {
    display: grid;
    background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
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
  border-radius: 5px;
}
</style>
