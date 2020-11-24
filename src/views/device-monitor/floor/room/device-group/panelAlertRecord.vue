<template>
  <div class="menu-manage">
    <el-table
      style="width: 100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column label="位置" width="250">
        <template slot-scope="{ row }">
          <div>楼层编号:{{ row.floorName || "无" }}</div>
          <div>房间编号:{{ row.roomName || "无" }}</div>
          <div>设备组编号:{{ row.deviceGroupName || "无" }}</div>
          <div>设备编号:{{ row.deviceName || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="测点" width="200">
        <template slot-scope="{ row }">
          <div>测点编号:{{ row.pointCode || "无" }}</div>
          <div>测点名称:{{ row.pointName || "无" }}</div> </template
        >ch
      </el-table-column>
      <el-table-column label="数值">
        <template slot-scope="{ row }">
          <div>触发值:{{ row.triggerValue || "无" }}</div>
          <div>当前值:{{ row.currentValue || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="通知">
        <template slot-scope="{ row }">
          <div>
            通知等级:
            {{
              alertLevelOpts.find((i) => i.id == row.noteLevel) &&
              alertLevelOpts.find((i) => i.id == row.noteLevel).name
            }}
          </div>
          <div>通知内容:{{ row.noteContent || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">待处理</div>
          <div v-if="row.status == 2">已受理</div>
          <div v-if="row.status == 3">取消</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="告警时间"
        width="170"
        align="center"
      />
      <el-table-column label="受理信息" width="150">
        <template slot-scope="{ row }">
          <div>受理人:{{ row.handlerUserName || "无" }}</div>
          <div>受理时间:{{ row.handlerTime || "无" }}</div>
          <div>受理备注:{{ row.handlerRemark || "无" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="恢复信息" width="150">
        <template slot-scope="{ row }">
          <div>
            恢复状态:{{ row.resumeStatus == 1 ? "已经恢复" : "未恢复" || "无" }}
          </div>
          <div>恢复时间:{{ row.resumeTime || "无" }}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="resumeStatus" label="恢复状态">
        <template slot-scope="{ row }">
          <div v-if="row.resumeStatus == 1">已经恢复</div>
          <div v-else>未恢复</div>
        </template>
      </el-table-column>
      <el-table-column prop="resumeTime" label="恢复时间" /> -->

      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.status == 1"
            title="告警受理"
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row, 1)"
          ></el-button>
          <el-button
            v-if="row.resumeStatus != 1"
            title="恢复状态"
            icon="el-icon-refresh-left"
            type="primary"
            plain
            @click="handleDialog(row, 2)"
          ></el-button>
          <el-button
            title="详情"
            icon="el-icon-view"
            type="primary"
            plain
            @click="handleDetailDialog(row)"
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

    <el-dialog :visible.sync="dialog.visible" top="25vh">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">{{
          dialog.type == 1 ? "告警受理" : "告警恢复"
        }}</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="100px"
      >
        <template v-if="dialog.type == 1">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="dialog.forms.status" style="width: 100%">
              <!-- <el-radio border :label="1">待受理</el-radio> -->
              <el-radio border :label="2">已受理</el-radio>
              <el-radio border :label="3">取消</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="受理说明" prop="handlerRemark">
            <el-input v-model="dialog.forms.handlerRemark"></el-input>
          </el-form-item>
        </template>

        <el-form-item label="恢复状态" prop="resumeStatus" v-else>
          <el-radio-group
            v-model="dialog.forms.resumeStatus"
            style="width: 100%"
          >
            <el-radio border :label="1">已恢复</el-radio>
            <el-radio border :label="0">未恢复</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="detailDialog.visible" top="25vh" center>
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">详情</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="detailDialog.forms"
        :rules="detailDialog.rules"
        ref="detailDialogForm"
        class="log-form"
        label-width="150px"
      >
        <el-form-item label="楼层编号 : " prop="floorCode">
          {{ detailDialog.forms.floorCode || "无" }}
        </el-form-item>
        <el-form-item label="房间编号 : " prop="roomCode">
          {{ detailDialog.forms.roomCode || "无" }}
        </el-form-item>
        <el-form-item label="设备组编号 : " prop="deviceGroupCode">
          {{ detailDialog.forms.deviceGroupCode || "无" }}
        </el-form-item>
        <el-form-item label="设备编号 : " prop="deviceCode">
          {{ detailDialog.forms.deviceCode || "无" }}
        </el-form-item>
        <el-form-item label="测点编号 : " prop="pointCode">
          {{ detailDialog.forms.pointCode || "无" }}
        </el-form-item>
        <el-form-item label="测点名称 : " prop="pointName">
          {{ detailDialog.forms.pointName || "无" }}
        </el-form-item>
        <el-form-item label="触发值 : " prop="triggerValue">
          {{ detailDialog.forms.triggerValue || "无" }}
        </el-form-item>
        <el-form-item label="当前值 : " prop="currentValue">
          {{ detailDialog.forms.currentValue || "无" }}
        </el-form-item>
        <el-form-item label="通知等级id : " prop="noteLevel">
          {{ detailDialog.forms.noteLevel || "无" }}
        </el-form-item>
        <el-form-item label="通知内容 : " prop="noteContent">
          {{ detailDialog.forms.noteContent || "无" }}
        </el-form-item>
        <el-form-item label="状态 : " prop="status">
          <template>
            <div v-if="detailDialog.forms.status == 1">待处理</div>
            <div v-if="detailDialog.forms.status == 2">已受理</div>
            <div v-if="detailDialog.forms.status == 3">取消</div>
          </template>
        </el-form-item>
        <el-form-item label="创建时间 : " prop="createTime">
          {{ detailDialog.forms.createTime || "无" }}
        </el-form-item>
        <el-form-item label="受理时间 : " prop="handlerTime">
          {{ detailDialog.forms.handlerTime || "无" }}
        </el-form-item>
        <el-form-item label="受理人ID : " prop="handlerUserId">
          {{ detailDialog.forms.handlerUserId || "无" }}
        </el-form-item>
        <el-form-item label="受理备注 : " prop="handlerRemark">
          {{ detailDialog.forms.handlerRemark || "无" }}
        </el-form-item>
        <el-form-item label="恢复状态 : " prop="resumeStatus">
          <template>
            <div v-if="detailDialog.forms.resumeStatus == 1">已经恢复</div>
            <div v-else>未恢复</div>
          </template>
        </el-form-item>
        <el-form-item label="恢复时间 : " prop="resumeTime">
          {{ detailDialog.forms.resumeTime || "无" }}
        </el-form-item>
        <el-form-item label="受理人 : " prop="handlerUserName">
          {{ detailDialog.forms.handlerUserName || "无" }}
        </el-form-item>
        <el-form-item label="楼层名称 : " prop="floorName">
          {{ detailDialog.forms.floorName || "无" }}
        </el-form-item>
        <el-form-item label="房间名称 : " prop="roomName">
          {{ detailDialog.forms.roomName || "无" }}
        </el-form-item>
        <el-form-item label="设备组名称 : " prop="deviceGroupName">
          {{ detailDialog.forms.deviceGroupName || "无" }}
        </el-form-item>
        <el-form-item label="设备名称 : " prop="deviceName">
          {{ detailDialog.forms.deviceName || "无" }}
        </el-form-item>

        <!-- <el-form-item label="日志类型 : " prop="logType">
          <template>
            <div v-if="detailDialog.forms.logType == 1">正常日志</div>
            <div v-if="detailDialog.forms.logType == 2">异常日志</div>
          </template>
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  pointListAll,
  deviceTypeListAll,
  pointTypeListAll,
  deviceListAll,
  deviceGroupListAll,
  spaceFloorListAll,
  spaceRoomListAll,
  pointListByPage,
  pointDelete,
  pointEdit,
  pointAdd,
} from "@/api/resource-manage.js";
import {
  alertNotificationEditResumeStatus,
  alertNotificationEditStatus,
  alertNotificationListByPage,
  alertLevelListAll,
  alertNotificationQueryById,
} from "@/api/engineer-config.js";
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
      alertLevelOpts: [],
      pointOpts: [],
      floorOpts: [],
      roomOpts: [],
      deviceGroupOpts: [],
      deviceOpts: [],
      pointTypeOpts: [],
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        floorCode: "",
        roomCode: "",
        deviceGroupCode: "",
        deviceCode: "",
        pointCode: "",
        pointName: "",
        noteLevel: null,
        status: null,
        resumeStatus: null,
        startDate: null,
        endDate: null,
        isRead: 0,
        startDate_endDate: [],
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

      dialog: {
        id: "",
        visible: false,
        type: 1, //type 1是受理 2是恢复
        forms: {},
        rules: {
          status: [{ required: true, trigger: "blur", message: "请输入" }],
          handlerRemark: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          resumeStatus: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
        },
      },

      detailDialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          // name: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {
    deviceGroupCode: {
      immediate: true,
      handler(n) {
        // this.filterForm.deviceGroupCode = n;
        this.handleQuery();
      },
    },
    "filterForm.startDate_endDate"(n, o) {
      this.filterForm.startDate = n ? n[0] : null;
      this.filterForm.endDate = n ? n[1] : null;
    },
    async "dialog.forms.deviceTypeId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.pointTypeOpts = [];
      const r = await pointTypeListAll({ deviceTypeId: n });
      this.pointTypeOpts = r.data;
    },
    async "filterForm.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      this.deviceGroupOpts = [];
      this.deviceOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
    async "filterForm.roomCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.deviceGroupOpts = [];
      this.deviceOpts = [];
      const r1 = await deviceListAll({ roomCode: n });
      const r2 = await deviceGroupListAll({ roomCode: n });
      this.deviceOpts = r1.data;
      this.deviceGroupOpts = r2.data;
    },
    async "filterForm.deviceGroupCode"(n, o) {
      if (!n) return;
    },
    async "dialog.forms.firstMenuId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.secondMenuOpts = [];
      const r = await alertNotificationListAll({ parentId: n, menuType: 2 });
      this.secondMenuOpts = r.data;
    },
  },
  created() {
    // spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    // spaceRoomListAll().then((r) => (this.roomOpts = r.data));
    // deviceGroupListAll().then((r) => (this.deviceGroupOpts = r.data));
    // deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    // pointTypeListAll().then((r) => (this.pointAllTypeOpts = r.data));
    alertLevelListAll().then((r) => (this.alertLevelOpts = r.data));
  },
  mounted() {},
  methods: {
    async handleDetailDialog(row) {
      if (row) {
        // 编辑
        const r = await alertNotificationQueryById({ id: row.id });
        this.detailDialog.forms = r.data;
      } else {
        this.detailDialog.forms = {};
      }
      this.detailDialog.visible = true;
    },
    handleRoomChange(n) {
      this.$set(this.filterForm, "deviceGroupCode", "");
      this.$set(this.filterForm, "deviceCode", "");
      if (!n) return;
      pointListAll({ roomCode: n }).then((r) => (this.pointOpts = r.data));
      // deviceListAll({ roomCode: n }).then((r) => (this.deviceOpts = r.data));
      // deviceGroupListAll({ roomCode: n }).then(
      //   (r) => (this.deviceGroupOpts = r.data)
      // );
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          if (this.dialog.type == 1) {
            const { status, id, handlerRemark } = this.dialog.forms;
            alertNotificationEditStatus({ status, id, handlerRemark }).then(
              (r) => {
                this.$message.success("操作成功!");
                this.$refs["dialogForm"].resetFields();
                this.dialog.visible = false;
                this.getList();
              }
            );
          } else if ((this.dialog.forms.type = 2)) {
            alertNotificationEditResumeStatus(this.dialog.forms).then((r) => {
              this.$message.success("操作成功!");
              this.$refs["dialogForm"].resetFields();
              this.dialog.visible = false;
              this.getList();
            });
          }
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
    // 重置
    handleReset(form) {
      this.$refs[form].resetFields();
      this.handleQuery();
    },
    // 查看
    async handleDialog(row, type) {
      this.dialog.type = type;
      this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)), {});
      console.log(this.dialog.forms);
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleResumeStatus(id) {
      this.$confirm("确认恢复状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          alertNotificationDelete({
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
      alertNotificationListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-manage {
  display: grid;
  grid-template-rows: auto 55px;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}

::v-deep {
  .log-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
