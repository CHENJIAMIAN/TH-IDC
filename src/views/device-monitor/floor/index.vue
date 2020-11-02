<template>
  <div class="floor-index">
    <div class="floor-index-self" v-if="!$route.path.includes('/room')">
      <div class="col1">
        <el-button
          v-for="room in roomList"
          :key="room.id"
          @click="
            $router.push(
              `/device-monitor/floor/${floorId}/${floorName}/room/${room.id}/${room.name}`
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

export default {
  data() {
    return {
      floorId: "",
      floorName: "",
      floorImage: "",
      roomList: [],
    };
  },
  created() {
    const {floorId,floorName}=this.$route.params;
    Object.assign(this, { floorId,floorName });
    this.$route.meta.title = floorName;

    roomListAll({ id: this.floorId }).then((r) => {
      const { id, name, floorCode, floorImage, roomList } = r.data;
      Object.assign(this, { floorImage, roomList });
    });
  },
};
</script>
<style lang="scss" scoped>
.floor-index{
  height:100%;
}
.floor-index-self {
  display: grid;
  grid-template-columns: 230px 1fr;
  margin-left: 30px;
  .col1 {
    display: grid;
    align-items: center;
    align-content: center;
    gap: 2rem;
    ::v-deep {
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