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
          <!-- <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          > -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleDialog()">
            <!-- 不能写未handleDialog否则第一个参数会自动传鼠标事件 -->
            <i class="el-icon-plus" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table
      style="overflow: auto"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="smtp" label="邮箱服务器" />
      <el-table-column sortable prop="auth" label="是否验证">
        <template slot-scope="{ row }">
          <span v-if="row.auth == 1">验证</span>
          <span v-else>不验证</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="email" label="邮箱地址" />
      <el-table-column sortable prop="username" label="邮箱用户名" />
      <!-- <el-table-column sortable prop="password" label="密码" /> -->
      <el-table-column sortable prop="remark" label="描述" />
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="{ row }">
          <el-switch
            @change="handleStatusChange($event, row)"
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row)"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            type="primary"
            plain
            @click="handleDel(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    /> -->

    <el-dialog :visible.sync="dialog.visible" top="20vh">
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
        <el-form-item label="邮箱服务器" prop="smtp">
          <el-input v-model="dialog.forms.smtp"></el-input>
        </el-form-item>
        <el-form-item label="是否验证" prop="auth">
          <el-radio-group v-model="dialog.forms.auth" style="width: 100%">
            <el-radio border :label="1">验证</el-radio>
            <el-radio border :label="2">不验证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="dialog.forms.email"></el-input>
        </el-form-item>
        <el-form-item label="邮箱用户名" prop="username">
          <el-input v-model="dialog.forms.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="dialog.forms.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" v-if="!dialog.forms.id">
          <el-radio-group
            class="radio-status"
            v-model="dialog.forms.status"
            style="width: 100%"
          >
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="0" style="color: gray">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="dialog.forms.remark"></el-input>
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
  configEmailUpdateState,
   configEmailQueryById,
  configEmailListAll,
  configEmailListByPage,
  configEmailDelete,
  configEmailEdit,
  configEmailAdd,
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

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          smtp: [{ required: true, trigger: "blur", message: "请输入" }],
          auth: [{ required: true, trigger: "blur", message: "请输入" }],
          email: [{ required: true, trigger: "blur", message: "请输入" }],
          username: [{ required: true, trigger: "blur", message: "请输入" }],
          password: [{ required: true, trigger: "blur", message: "请输入" }],
          status: [{ required: true, trigger: "blur", message: "请输入" }],
          // remark: [{ required: true, trigger: "blur", message: "请输入" }],
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
    handleStatusChange(v, row) {
      configEmailUpdateState({ id: row.id, status: v }).then((r) => {
        this.getList();
      });
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = configEmailEdit;
          } else {
            callAPI = configEmailAdd;
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
    // 重置
    handleReset(form) {
      this.$refs[form].resetFields();
      this.handleQuery();
    },
    // 查看
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        const r = await configEmailQueryById({id:row.id})
        // 编辑
        this.dialog.forms = r.data;
      } else {
        this.dialog.forms = { status: 1 };
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
          configEmailDelete({
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
      configEmailListAll().then((res) => {
        this.listData = res.data;
        // this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
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
