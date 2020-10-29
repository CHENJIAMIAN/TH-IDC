<template>
  <div class="room-index">
    <div class="room-index-self">
      <div class="row1">
        <div>
            <el-button
              class="el-button-custom active"
              v-for="deviceGroup in deviceGroupList"
              :key="deviceGroup.id"
              @click="
                $router.push(
                  `/device-monitor/floor/${floorId}/${floorName}/room/${roomId}/${roomName}/device-group/${deviceGroup.id}/${deviceGroup.name}?imgUrl=${deviceGroup.imgUrl}`
                )
              "
              >{{ deviceGroup.name }}</el-button
            >
        </div>
          
        <div style="color:#00f7ff;font-size:1.2rem;display: flex;align-items: center;gap: 4px;"><img width="20" src="@/assets/img/wd.png" /><span> {{temperature}}</span></div>
        <div style="color:#00f7ff;font-size:1.2rem;display: flex;align-items: center;gap: 4px;"><img width="25" src="@/assets/img/gj.png" /><span>告警 <span style="color:#ea2d2a;">{{alarmCount}}</span> 条</span></div>
      </div>
      <router-view />
    </div>

  </div>
</template>


<script>
import { deviceGroupListAll } from "@/api/device-monitor.js";

export default {
  data() {
    return {
      floorId: "",
      floorName: "",
      roomId: "",
      roomName: "",
      roomImage: "",
      temperature: "",
      alarmCount: "",
      deviceGroupList: [],
    };
  },
  created() {
    const {floorId,floorName,roomId,roomName}=this.$route.params;
    Object.assign(this, { floorId,floorName,roomId,roomName });
    this.$route.meta.title = roomName;

    deviceGroupListAll({ id: this.roomId }).then((r) => {
      const {
        id,
        name,
        roomCode,
        roomImage,
        roomType,
        temperature,
        alarmCount,
        deviceGroupList,
      } = r.data;
      Object.assign(this, { temperature,alarmCount,roomImage, deviceGroupList });

      const deviceGroup = deviceGroupList[0];
      this.$router.push(
              `/device-monitor/floor/${floorId}/${floorName}/room/${roomId}/${roomName}/device-group/${deviceGroup.id}/${deviceGroup.name}?imgUrl=${deviceGroup.imgUrl}`
            )
    });
  },
};
</script>
<style lang="scss" scoped>
.room-index{
  height:100%;
}
.room-index-self {
  display: grid;
  grid-template-rows: 50px 1fr;
  height:100%;
  .row1 {
    display: grid;
    grid-auto-flow:column;
    align-items: center;
    align-content: center;
    grid-template-columns: 1fr 120px 140px;
    justify-items: start;
    gap: 2rem;
    ::v-deep {
      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
  .row2 {
    display: grid;
  }
}

.active {
      color: #e39f40;
      border: none;
      background: url(../../../../assets/img/jx2.png) 0 0 / 100% 100% no-repeat;
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