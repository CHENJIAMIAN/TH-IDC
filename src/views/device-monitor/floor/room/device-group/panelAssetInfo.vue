<template>
  <div class="device-manage">
    <el-table
            empty-text=" "
      style="width: 100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="deviceCode" label="设备编号" />
      <el-table-column sortable prop="name" label="设备名称" />
      <el-table-column sortable prop="deviceType" label="设备类型">
        <template slot-scope="{ row }">
          <span>{{
            deviceTypeOpts.find((i) => i.id === row.deviceType) &&
            deviceTypeOpts.find((i) => i.id === row.deviceType).name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="deviceGroupName" label="设备组名称" />
      <!-- <el-table-column sortable prop="deviceGroupCode" label="设备组编号" /> -->
      <el-table-column sortable prop="roomName" label="房间名称" />
      <!-- <el-table-column sortable prop="roomCode" label="房间编号" /> -->
      <el-table-column sortable prop="floorName" label="楼层名称" />
      <!-- <el-table-column sortable prop="floorCode" label="楼层编号" /> -->
      <el-table-column label="操作" align="center" width="161">
        <template slot-scope="{ row }">
          <el-button
            title="绑定测点"
            icon="el-icon-bdcd"
            type="primary"
            plain
            @click="handleCDDialog(row)"
          ></el-button>
          <el-button
            title = "编辑"
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row)"
          ></el-button>
          <el-button
            title="删除"
            icon="el-icon-delete"
            type="primary"
            plain
            @click="handleDel(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">{{ dialog.forms.id ? "编辑" : "新增" }}</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="100px"
      >
        <el-form-item label="设备编号" prop="deviceCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.deviceCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
          <el-form-item label="楼层" prop="floorCode">
            <el-select
              v-model="dialog.forms.floorCode"
              @change="
                $set(dialog.forms, 'roomCode', '');
                $set(dialog.forms, 'deviceGroupCode', '');
              "
            >
              <el-option
                v-for="item in floorOpts"
                :key="item.id"
                :label="item.name"
                :value="item.floorCode"
              />
            </el-select>
          </el-form-item>
          <!-- style="transform: translate(-50px, 0px)" -->
          <el-form-item label="房间" prop="roomCode">
            <el-select
              v-model="dialog.forms.roomCode"
              @change="$set(dialog.forms, 'deviceGroupCode', '')"
            >
              <el-option
                v-for="item in roomOpts"
                :key="item.id"
                :label="item.name"
                :value="item.roomCode"
              />
            </el-select>
          </el-form-item>
          <!-- style="transform: translate(-100px, 0px)" -->
          <el-form-item label="设备组" prop="deviceGroupCode">
            <el-select v-model="dialog.forms.deviceGroupCode">
              <el-option
                v-for="item in deviceGroupOpts"
                :key="item.id"
                :label="item.name"
                :value="item.deviceGroupCode"
              />
            </el-select>
          </el-form-item>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
          <el-form-item label="设备类型" prop="deviceType">
            <el-select
              v-model="dialog.forms.deviceType"
              popper-class="three-column"
            >
              <el-option
                v-for="item in deviceTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 绑定测点弹窗 -->
    <el-dialog :visible.sync="dialogCD.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">绑定测点</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogCD.forms"
        :rules="dialogCD.rules"
        ref="dialogCDForm"
      >
        <el-form-item label="" prop="">
          <el-transfer
            filterable
            :filter-method="
              (query, item) => {
                return item.name.indexOf(query) > -1;
              }
            "
            :titles="['未绑定', '已绑定']"
            :props="{
              key: 'id',
              label: 'name',
            }"
            filter-placeholder="请输入"
            v-model="dialogCD.forms.pointIdArray"
            :data="allPointOpts"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogCDSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  deviceQueryAllNotBindForDevice,
  deviceQueryAllBindForDevice,
  deviceAddPointToDevice,
  deviceGroupListAll,
  deviceTypeListAll,
  spaceFloorListAll,
  spaceRoomListAll,
  deviceListByPage,
  deviceQueryById,
  deviceDelete,
  deviceEdit,
  deviceAdd,
} from "@/api/resource-manage.js";

export default {
  components: { pagination },
  props: {
    deviceGroupCode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      floorOpts: [],
      deviceGroupOpts: [],
      roomOpts: [],
      deviceTypeOpts: [],
      pointBindDeviceGroupOpts: [],
      pointNotBindDeviceGroupOpts: [],
      allPointOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        floorCode: "",
        roomCode: "",
        deviceGroupCode: "",
        name: "",
        deviceCode: "",
        deviceType: null,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [{},{},{}], // 列表数据
      listTotal: 0, // 列表总条数

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          floorCode: [{ required: true, trigger: "blur", message: "请输入" }],
          roomCode: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceGroupCode: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceCode: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceType: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },

      dialogCD: {
        visible: false,
        forms: {},
        rules: {},
      },
    };
  },
  watch: {
    deviceGroupCode: {
      immediate: true,
      handler(n) {
        this.filterForm.deviceGroupCode = n;
        this.handleQuery();
      },
    },
    async "filterForm.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      this.deviceGroupOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
    async "filterForm.roomCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.deviceGroupOpts = [];
      const r = await deviceGroupListAll({ roomCode: n });
      this.deviceGroupOpts = r.data;
    },
    async "dialog.forms.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      this.deviceGroupOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
    async "dialog.forms.roomCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.deviceGroupOpts = [];
      const r = await deviceGroupListAll({ roomCode: n });
      this.deviceGroupOpts = r.data;
    },
  },
  created() {
    spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
  },
  mounted() {},
  methods: {
    dialogCDSubmit() {
      this.$refs["dialogCDForm"].validate((valid, obj) => {
        if (valid) {
          deviceAddPointToDevice(this.dialogCD.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogCDForm"].resetFields();
            this.dialogCD.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = deviceEdit;
          } else {
            callAPI = deviceAdd;
          }
          callAPI(this.dialog.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.dialog.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    // 查询
    handleQuery() {
      this.listTotal = 0;
      this.filterForm.pageNo = 1;
      this.getList();
    },
    // 查看
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = { roomCode: "", deviceGroupCode: "" };
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    async handleCDDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialogCD.forms = { id: row.id };
        const r1 = await deviceQueryAllNotBindForDevice({ id: row.id });
        this.pointNotBindDeviceGroupOpts = r1.data;
        const r2 = await deviceQueryAllBindForDevice({ id: row.id });
        this.pointBindDeviceGroupOpts = r2.data;
        // this.dialogCD.forms.pointIdArray = r2.data.map((i) => i.id);
        this.$set(
          this.dialogCD.forms,
          "pointIdArray",
          r2.data.map((i) => i.id)
        );
        this.allPointOpts = this.pointNotBindDeviceGroupOpts.concat(
          this.pointBindDeviceGroupOpts
        );
      }
      this.dialogCD.visible = true;
      this.$nextTick((_) => this.$refs["dialogCDForm"].clearValidate());
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deviceDelete({
            id: id,
          }).then((res) => {
            this.getList();
            this.$message.success("删除成功!");
          });
        })
        .catch(() => {});
    },
    // 获取列表
    getList() {
      this.listLoading = true;
      deviceListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.device-manage {
  display: grid;
  grid-template-rows: auto 55px;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}

::v-deep {
  .el-icon-bdcd {
    background: url("../../../../../assets/img/bdcd.png");
    width: 14px;
    height: 12px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: -5px;
  }
}
</style>
