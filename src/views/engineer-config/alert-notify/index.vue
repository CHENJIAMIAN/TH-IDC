<template>
  <div class="app-container menu-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
      >
        <el-form-item>
          <!-- <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>-->
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          >
          <el-button type="primary" size="medium" @click="handleDialog()">
            <!-- 不能写未handleDialog否则第一个参数会自动传鼠标事件 -->
            <i class="el-icon-plus" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      style="overflow: auto"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable label="位置" width="200">
        <template slot-scope="{ row }">
          <div>楼层编号:{{ row.floorCode || "无" }}</div>
          <div>房间编号:{{ row.roomCode || "无" }}</div>
          <div>设备组编号:{{ row.deviceGroupCode || "无" }}</div>
          <div>设备编号:{{ row.deviceCode || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column sortable label="测点" width="200">
        <template slot-scope="{ row }">
          <div>测点编号:{{ row.pointCode || "无" }}</div>
          <div>测点名称:{{ row.pointName || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column sortable label="数值">
        <template slot-scope="{ row }">
          <div>触发值:{{ row.triggerValue || "无" }}</div>
          <div>当前值:{{ row.currentValue || "无" }}</div>
        </template>
      </el-table-column>
      <el-table-column sortable label="通知">
        <template slot-scope="{ row }">
          <div>通知等级:{{ row.noteLevel || "无" }}</div>
          <div>通知内容:{{ row.noteContent || "无" }}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column sortable prop="floorCode" label="楼层编号" />
      <el-table-column sortable prop="roomCode" label="房间编号" />
      <el-table-column sortable prop="deviceGroupCode" label="设备组编号" />
      <el-table-column sortable prop="deviceCode" label="设备编号" /> -->
      <!-- <el-table-column sortable prop="pointCode" label="测点编号" />
      <el-table-column sortable prop="pointName" label="测点名称" /> -->
      <!-- <el-table-column sortable prop="triggerValue" label="触发值" />
      <el-table-column sortable prop="currentValue" label="当前值" /> -->
      <!-- <el-table-column sortable prop="noteLevel" label="通知等级" />
      <el-table-column sortable prop="noteContent" label="通知内容" /> -->
      <el-table-column sortable prop="status" label="状态" width="80">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">待处理</div>
          <div v-if="row.status == 2">已受理</div>
          <div v-if="row.status == 3">取消</div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="告警时间"
        width="170"
        align="center"
      />
      <el-table-column sortable label="受理信息">
        <template slot-scope="{ row }">
          <div>受理人:{{ row.handlerUserName || "无" }}</div>
          <div>受理时间:{{ row.handlerTime || "无" }}</div>
          <div>受理备注:{{ row.handlerRemark || "无" }}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column sortable prop="handlerUserName" label="受理人" /> -->
      <!-- <el-table-column sortable prop="handlerTime" label="受理时间" /> -->
      <!-- <el-table-column sortable prop="handlerUserId" label="受理人ID" /> -->
      <!-- <el-table-column sortable prop="handlerRemark" label="受理备注" /> -->
      <el-table-column sortable prop="resumeStatus" label="恢复状态">
        <template slot-scope="{ row }">
          <div v-if="row.resumeStatus == 1">已经恢复</div>
          <div v-else>未恢复</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="resumeTime" label="恢复时间" />

      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="{ row }">
          <el-button
            title="告警受理"
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row, 1)"
          ></el-button>
          <el-button
            title="恢复状态"
            icon="el-icon-refresh-left"
            type="primary"
            plain
            @click="handleDialog(row, 2)"
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
        <span class="title-txt">{{ dialog.type == 1 ? "告警受理" : "告警恢复" }}</span>
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
              <el-radio border :label="1">待受理</el-radio>
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
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  // 没用到
  alertNotificationEditResumeStatus,
  alertNotificationEditStatus,
  alertNotificationListByPage,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
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
    };
  },
  watch: {
    async "dialog.forms.firstMenuId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.secondMenuOpts = [];
      const r = await alertNotificationListAll({ parentId: n, menuType: 2 });
      this.secondMenuOpts = r.data;
    },
  },
  created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
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
  grid-template-rows: 60px auto 70px;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}
</style>
