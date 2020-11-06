<template>
  <div class="app-container auth-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >恢复默认值</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <el-form
        ref="forms"
        :model="forms"
        :rules="rules"
        v-loading="listLoading"
        inline
        style="align-self: center; justify-self: center"
      >
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item label="实时告警显示条数" prop="realtimeCount">
              <el-input v-model="forms.realtimeCount" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="实时告警确认后是否还显示"
              prop="realtimeIsConfirmShow"
            >
              <el-checkbox
                v-model="forms.realtimeIsConfirmShow"
                :true-label="1"
                :false-label="2"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实时告警最低级别" prop="realtimeLowlevelShow">
              <el-input
                v-model="forms.realtimeLowlevelShow"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="空间告警最低级别" prop="spaceLowlevelShow">
              <el-input
                v-model="forms.spaceLowlevelShow"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="空间告警确认后是否还显示"
              prop="spaceIsConfirmShow"
            >
              <el-checkbox
                v-model="forms.spaceIsConfirmShow"
                :true-label="1"
                :false-label="2"
              ></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  alertconfigGetAlertConfigParams,
  alertconfigAlertparam_reset,
  alertconfigAddOrEdit_alert_params,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      thirdMenuOpts: [],
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

      remouldAspirationOption: [],
      forms: {},
      rules: {
        // 表单验证
        clanGroundNum: [{ required: true, tiggter: "blur", message: "请输入" }],
        clanCode: [{ required: true, tiggter: "blur", message: "请输入" }],
      },

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          permission: [{ required: true, trigger: "blur", message: "请输入" }],
          menuType: [{ required: true, trigger: "change", message: "请输入" }],
          firstMenuId: [{ required: true, trigger: "blur", message: "请输入" }],
          secondMenuId: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          thirdMenuId: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {},
  async created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handleSubmit() {
      this.$refs["forms"].validate((valid, obj) => {
        if (valid) {
          alertconfigAddOrEdit_alert_params(this.forms).then((r) => {
            this.handleQuery();
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
    // 重置
    handleReset(form) {
      this.$confirm("是否恢复默认设置 ? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs[form].resetFields();
          alertconfigAlertparam_reset().then((r) => {
            this.handleQuery();
          });
        })
        .catch(() => {});
    },
    // 查看
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = {};
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          alertLevelDelete({
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
      alertconfigGetAlertConfigParams().then((res) => {
        this.forms = res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
  display: grid;
  grid-template-rows: 60px auto;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: calc(100vh - 260px);
}
.head {
  display: grid;
  justify-content: end;
}
</style>
