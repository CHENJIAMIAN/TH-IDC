<template>
  <div class="room-index">
    <div class="room-index-self">
      <div class="row1">
        <div class="btns">
          <!-- {{ deviceGroupList.length }}
          {{ showBtns }} -->
          <template v-if="showBtns">
            <el-button
              class="el-button-custom"
              :class="{
                active: deviceGroup.name == $route.params.deviceGroupName,
              }"
              v-for="deviceGroup in deviceGroupList.slice(0, 5)"
              :key="deviceGroup.id"
              @click="
                $router.push(
                  `/device-monitor/floor/${floorId}/${floorName}/room/${roomId}/${roomName}/device-group/${deviceGroup.id}/${deviceGroup.name}?deviceGroupImg=${deviceGroup.imgUrl}&deviceGroupCode=${deviceGroup.deviceGroupCode}`
                )
              "
              >{{ deviceGroup.name }}</el-button
            >
            <el-popover
              placement="bottom-end"
              trigger="hover"
              v-if="deviceGroupList.slice(5).length > 0"
              v-model="moreBtnsVisible"
            >
              <div class="btns-fake">
                <span
                  class="btn-as-txt"
                  :class="{
                    'active-txt':
                      deviceGroup.name == $route.params.deviceGroupName,
                  }"
                  v-for="deviceGroup in deviceGroupList.slice(5)"
                  :key="deviceGroup.id"
                  @click="
                    $router.push(
                      `/device-monitor/floor/${floorId}/${floorName}/room/${roomId}/${roomName}/device-group/${deviceGroup.id}/${deviceGroup.name}?deviceGroupImg=${deviceGroup.imgUrl}&deviceGroupCode=${deviceGroup.deviceGroupCode}`
                    )
                  "
                  >{{ deviceGroup.name }}</span
                >
              </div>
              <!-- <i slot="reference" class="el-icon-arrow-down el-icon--right"></i> -->
              <img
                slot="reference"
                width="10"
                src="@/assets/img/sjx.png"
                style="cursor: pointer"
                :style="
                  moreBtnsVisible
                    ? 'transform: rotate(225deg)'
                    : 'transform: rotate(45deg)'
                "
              />
            </el-popover>
          </template>
        </div>

        <div class="img-container">
          <img width="20" src="@/assets/img/wd.png" /><span>
            {{ temperature }}</span
          >
        </div>
        <div class="img-container">
          <img width="25" src="@/assets/img/gj.png" /><span
            >告警 <span style="color: #ea2d2a">{{ alarmCount }}</span> 条</span
          >
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>


<script>
import { deviceGroupListAll } from "@/api/device-monitor.js";

export default {
  name: "room",
  data() {
    return {
      moreBtnsVisible: false,
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
  computed: {
    /* 
    1 IT机房           无设备组 布局
    2 UPS配电室       有设备组 布局
    3 低压配电室       有设备组 布局
    4 变压器房         有设备组 布局
    5 柴油发电机       无设备组 布局
    6 电池房           电池房   布局
    7 精密空调房  
    8 高压配电房       有设备组 布局
    */
    showBtns() {
      const b =
        this.roomName.includes("UPS配电") ||
        this.roomName.includes("低压配电") ||
        this.roomName.includes("高压配电") ||
        this.roomName.includes("变压器");
      return b;
    },
  },
  created() {
    const { floorId, floorName, roomId, roomName } = this.$route.params;
    Object.assign(this, { floorId, floorName, roomId, roomName });
    this.$route.meta.title = roomName;

    deviceGroupListAll({ id: this.roomId }).then((r) => {
      let { id, name, roomCode, roomImage, roomType, deviceGroupList } = r.data;
      if (!deviceGroupList) deviceGroupList = [];
      Object.assign(this, {
        roomImage,
        deviceGroupList,
      });
      if (deviceGroupList.length == 1 || !this.$route.params.deviceGroupName) {
        // 只有一个,默认就那一个  , 刚进来,没有设备组,自动选一个
        const deviceGroup = deviceGroupList[0];
        // deviceGroupName包含#号,需要用encodeURIComponent编码一下
        this.$router.push(
          `/device-monitor/floor/${floorId}/${floorName}/room/${roomId}/${roomName}/device-group/${
            deviceGroup.id
          }/${encodeURIComponent(
            deviceGroup.name
          )}?roomImage=${roomImage}&deviceGroupImg=${
            deviceGroup.imgUrl
          }&deviceGroupCode=${deviceGroup.deviceGroupCode}`
        );
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.room-index {
  height: 100%;
}
.room-index-self {
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100%;
  .row1 {
    display: grid;
    grid-auto-flow: column;
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

.btns {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
}

.btns-fake {
  display: grid;
  gap: 1rem;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.btn-as-txt {
  border: none;
  color: white;
  font-size: 1.1rem;
  width: 150px;
  text-align: center;
  cursor: pointer;
}
.active {
  color: #e39f40;
  border: none;
  background: url(../../../../assets/img/jx2.png) 0 0 / 100% 100% no-repeat;
}

.active-txt {
  color: #e39f40;
  border: none;
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

.img-container {
  color: #00f7ff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
