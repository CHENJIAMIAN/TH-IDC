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
          <el-input v-model="filterForm.userName" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="realName">
          <el-input v-model="filterForm.realName" placeholder="姓名" />
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
          <el-select
            clearable
            v-model="filterForm.status"
            placeholder="状态"
          >
            <el-option   text-color="#55fb55"   label="启用"       :value="1"            />
            <el-option   text-color="gray"   label="禁用"       :value="0"            />
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
            style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
      size="medium"
    >
      <el-table-column sortable prop="userName" label="账号" />
      <el-table-column sortable prop="realName" label="姓名" />
      <el-table-column sortable prop="roleNameList" label="角色" />
      <el-table-column sortable prop="departmentName" label="部门" />
      <el-table-column sortable prop="phone" label="电话" />
      <el-table-column sortable prop="email" label="邮箱" />
      <el-table-column sortable prop="wechat" label="微信" />
      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: gray"    v-else>禁用</span>
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
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">{{
          dialog.forms.id ? "编辑" : "新增"
        }}</span>
        <img  src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="100px"
      >
        <el-form-item label="账号" prop="userName">
          <el-input v-model="dialog.forms.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!dialog.forms.id">
          <el-input v-model="dialog.forms.password"></el-input>
        </el-form-item>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="dialog.forms.realName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="dialog.forms.phone"></el-input>
        </el-form-item>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialog.forms.email"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="dialog.forms.wechat"></el-input>
        </el-form-item>
        <el-form-item label="钉钉" prop="dingtalk">
          <el-input v-model="dialog.forms.dingtalk"></el-input>
        </el-form-item>
        </div>

        <el-form-item label="描述" prop="remarks">
          <el-input  type="textarea" v-model="dialog.forms.remarks"></el-input>
        </el-form-item>
        <el-form-item class="rooms-form-item" label="角色" prop="roleIdArray">
          <el-checkbox-group
            class="rooms-el-checkbox-group"
           v-model="dialog.forms.roleIdArray">
              <el-checkbox 
                v-for="item in roleOpts"
                :key="item.id"
                :label="item.id"
                 border
              >{{item.name}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>


        <div style="display: grid; grid-template-columns: 1fr 1fr">
        <el-form-item label="部门" prop="departmentId">
          <el-select v-model="dialog.forms.departmentId">
            <el-option
              v-for="item in depOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group class="radio-status" v-model="dialog.forms.status" style="width: 100%">
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="0" style="color: gray"    >禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        </div>


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
          roleIdArray: [{ required: true, trigger: "blur", message: "请输入" }],
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
          if (this.dialog.forms.id) {
            // 没有编辑密码的
            this.dialog.forms.password = null;
            callAPI = sysUserEdit;
          } else {
            callAPI = sysUserAdd;
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
      if (row) {
        // 编辑
        const r=await sysUserQueryById({id:row.id})
        this.dialog.forms=r.data;
        this.$set(this.dialog.forms,"roleIdArray",r.data.roleList.filter(i=>i.has=='1').map(i=>i.id))
        // this.dialog.forms = JSON.parse(JSON.stringify(row));
      } else {
        this.dialog.forms = {status:1};
        this.$set(this.dialog.forms,"roleIdArray",[])
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

::v-deep {
  .rooms-form-item {
    .rooms-el-checkbox-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 10px;
      .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0;
      }
      .el-checkbox:last-of-type {
        margin-right: 30px;
      }
    }
  }
}
</style>
