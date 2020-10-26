<template>
  <div class="app-container user-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="userName">
          <el-input v-model="filterForm.userName" placeholder="用户账号" />
        </el-form-item>
        <el-form-item prop="realName">
          <el-input v-model="filterForm.realName" placeholder="用户名称" />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="filterForm.phone" placeholder="电话" />
        </el-form-item>
        <el-form-item prop="departmentId">
          <el-select
            clearable
            v-model="filterForm.departmentId"
            placeholder="部门"
          >
            <el-option
              v-for="item in depOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="status">
          <!-- <el-radio-group  v-model="filterForm.status" style="width: 100%">
            <el-radio border :label="1">启用</el-radio>
            <el-radio border :label="0">禁用</el-radio>
          </el-radio-group> -->
          <el-select
            clearable
            v-model="filterForm.status"
            placeholder="状态"
          >
            <el-option      label="启用"       :value="1"            />
            <el-option      label="禁用"       :value="0"            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          >
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
      <el-table-column sortable prop="userName" label="用户账号" />
      <el-table-column sortable prop="realName" label="用户名称" />
      <el-table-column sortable prop="roleNameList" label="角色" />
      <el-table-column sortable prop="phone" label="电话" />
      <el-table-column sortable prop="email" label="邮箱" />
      <el-table-column sortable prop="wechat" label="微信" />
      <el-table-column sortable prop="status" label="账号状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: red" v-else>禁用</span>
          <!-- <el-switch
            disabled
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch> -->
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
    <pagination
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible" top="5vh">
      <span slot="title">
        <span style="font-size: 1.5rem; font-weight: bold">{{
          dialog.forms.id ? "编辑" : "新增"
        }}</span>
        <img style="margin-left: 1rem" src="@/assets/img/hl.png" />
      </span>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="100px"
      >
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="dialog.forms.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!dialog.forms.id">
          <el-input v-model="dialog.forms.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="realName">
          <el-input v-model="dialog.forms.realName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="dialog.forms.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialog.forms.email"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="dialog.forms.wechat"></el-input>
        </el-form-item>
        <el-form-item label="钉钉" prop="dingtalk">
          <el-input v-model="dialog.forms.dingtalk"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input v-model="dialog.forms.remarks"></el-input>
        </el-form-item>
        <el-form-item label="部门ID" prop="departmentId">
          <el-select v-model="dialog.forms.departmentId">
            <el-option
              v-for="item in depOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
  
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <!-- 传参 roleIdStr ,隔开 -->
          <!-- <el-select multiple v-model="dialog.forms.roles">
            <el-option
              v-for="item in roleOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
                :value="item.id"
          </el-select> -->
          <el-checkbox-group v-model="dialog.forms.roles">
              <el-checkbox 
                v-for="item in roleOpts"
                :key="item.id"
                :label="item.name"
                 border
              ></el-checkbox>
        </el-checkbox-group>

        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-radio-group v-model="dialog.forms.status" style="width: 100%">
            <el-radio border :label="1">启用</el-radio>
            <el-radio border :label="0">禁用</el-radio>
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
  sysRoleListAll,
  sysDepartmentListAll,
  sysUserAdd,
  sysUserDelete,
  sysUserEdit,
  sysUserListByPage,
  // 未用到
  sysUserUpdatePassword,
  sysUserQueryById,
} from "@/api/system-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      depOpts: [],
      roleOpts: [],
      filterForm: {
        // 筛选条件
        userName: "",
        realName: "",
        phone: "",
        departmentId: null,
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
        forms: {},
        rules: {
          userName: [{ required: true, trigger: "blur", message: "请输入" }],
          password: [{ required: true, trigger: "blur", message: "请输入" }],
          realName: [{ required: true, trigger: "blur", message: "请输入" }],
          phone: [{ required: true, trigger: "blur", message: "请输入" }],
          departmentId: [
            { required: true, trigger: "change", message: "请输入" },
          ],
          roles: [{ required: true, trigger: "blur", message: "请输入" }],
          status: [{ required: true, trigger: "change", message: "请输入" }],
        },
      },
    };
  },
  created() {
    sysDepartmentListAll().then((r) => (this.depOpts = r.data));
    sysRoleListAll().then((r) => (this.roleOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          this.dialog.forms.roleIdStr = this.dialog.forms.roles.join(",");
          if (this.dialog.forms.id) {
            // 没有编辑密码的
            this.dialog.forms.password = null;
            callAPI = sysUserEdit;
          } else {
            callAPI = sysUserAdd;
          }
          // const templateObj = {
          //   id: 0,
          //   realName: "",
          //   phone: "",
          //   email: "",
          //   wechat: "",
          //   dingtalk: "",
          //   remarks: "",
          //   departmentId: 0,
          //   status: "",
          //   roleIdStr: "",
          // };
          // Object.keys(templateObj).forEach((key) => {
          //   templateObj[key] = this.dialog.forms[key] || "";
          // });
          // delete templateObj.id;
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
    handleDialog(row) {
      if (row) {
        // 编辑
        row.roles = row.roleNameList ? row.roleNameList.split(",") : [];
        this.dialog.forms = JSON.parse(JSON.stringify(row));
      } else {
        this.dialog.forms = {};
      }
      this.dialog.visible = true;      this.$nextTick(_=>this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sysUserDelete({
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
      sysUserListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-manage {
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
