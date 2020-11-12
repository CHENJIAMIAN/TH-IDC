<template>
  <div class="app-container menu-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="noteLevel">
          <el-input v-model="filterForm.noteLevel" placeholder="通知等级" />
        </el-form-item>
        <el-form-item prop="noteMode">
          <el-select
            clearable
            v-model="filterForm.noteMode"
            placeholder="通知方式"
          >
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="sendTarget">
          <el-input
            v-model="filterForm.sendTarget"
            placeholder="目标邮箱/号码"
          />
        </el-form-item>
        <el-form-item prop="sendContent">
          <el-input v-model="filterForm.sendContent" placeholder="告警内容" />
        </el-form-item>

        <el-form-item prop="status">
          <el-select clearable v-model="filterForm.status" placeholder="状态">
            <el-option text-color="#55fb55" label="成功" :value="1" />
            <el-option text-color="gray" label="失败" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          >
          <!-- <el-button type="primary" size="medium" @click="handleDialog()">
            <i class="el-icon-plus" />
          </el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <el-table
            style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="noteId" label="通知ID" />
      <el-table-column sortable prop="noteLevel" label="通知等级" />
      <el-table-column sortable prop="noteMode" label="通知方式">
        <template slot-scope="{ row }">
          {{
            noteModeOpts.find((i) => i.id == row.noteMode) &&
            noteModeOpts.find((i) => i.id == row.noteMode).name
          }}
        </template>
      </el-table-column>
      <el-table-column sortable prop="toUser" label="接收者用户ID" />
      <el-table-column sortable prop="userName" label="接收者用户名称" />
      <el-table-column sortable prop="sendTarget" label="目标邮箱/号码" />
      <el-table-column sortable prop="sendContent" label="告警内容" />
      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">成功</span>
          <span style="color: gray" v-else>失败</span>
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
import { noteModeOpts } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import { alertNotificationSendListByPage } from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      noteModeOpts,
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        noteLevel: null,
        noteMode: null,
        sendTarget: "",
        sendContent: "",
        status: null,
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
      alertNotificationSendListByPage(this.filterForm).then((res) => {
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
