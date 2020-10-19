<template>
  <div class="app-container user-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
      >
        <el-form-item prop="protocolNum">
          <el-input v-model="filterForm.protocolNum" placeholder="协议编号" />
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
          <el-button type="primary" size="medium" @click="handleDetail">
            <i class="el-icon-plus el-icon--right" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table v-loading="!listLoading" border :data="listData">
      <el-table-column prop="dealName" label="协议名称" />
      <el-table-column prop="family.protocolNum" label="协议编号" />
      <el-table-column prop="family.measureNum" label="测绘编号" />
      <el-table-column prop="concludeTime" label="签订日期" />
      <el-table-column prop="turnOverTime" label="预计移交日期" />
      <el-table-column prop="returnMigrationTime" label="预计返迁日期" />
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="handleDetail(row.id)"
            >查看</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="
              $router.push(`/contractManage/compensationDeal/edit/${row.id}`)
            "
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="handleDel(row.id)"
            >删除</el-button
          >
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
    <el-dialog v-if="dialog.visible" :visible.sync="dialog.visible">
      <span slot="title">
        <span style="font-size: 1.5rem;font-weight: bold;">新增</span>
        <img style="margin-left: 1rem;" src="@/assets/img/hl.png" />
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
        <el-form-item label="密码" prop="password">
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
        <el-form-item label="账号状态" prop="status">
          <el-radio-group v-model="dialog.forms.status" style="width: 100%">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button style="width: 200px;" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  sysDepartmentListAll,
  sysUserAdd,
  sysRoleListByPage,
  sysUserDelete,
  sysUserEdit,
  sysUserListByPage
} from "@/api/system-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      depOpts: [],
      filterForm: {
        // 筛选条件
        userName: "",
        realName: "",
        phone: "",
        departmentId: "",
        status: "",
        pageNo: 1, // 当前页码
        pageSize: 10 // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
      // 收款信息弹窗
      dialog: {
        visible: false,
        forms: {},
        rules: {
          userName: [{ required: true, trigger: "blur", message: "请输入" }],
          password: [{ required: true, trigger: "blur", message: "请输入" }],
          realName: [{ required: true, trigger: "blur", message: "请输入" }],
          phone: [{ required: true, trigger: "blur", message: "请输入" }],
          departmentId: [
            { required: true, trigger: "change", message: "请输入" }
          ],
          status: [{ required: true, trigger: "change", message: "请输入" }]
        }
      }
    };
  },
  created() {
    sysDepartmentListAll().then(r => {
      this.depOpts = r.data;
    });
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          sysUserAdd(this.dialog.forms).then(res => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.dialog.visible = false;
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
    handleDetail(id) {
      console.log("index.vue id", id);
      this.dialog.id = id;
      this.dialog.visible = true;
    },
    // 删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该拆赔协议, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCompensationDeal(id);
        })
        .catch(() => {});
    },
    // 启用/关闭
    changeStatus(id, val) {
      changeStatusCompensationPlan({
        id: id,
        startUsing: val
      })
        .then(res => {
          this.$message.success("操作成功!");
          this.getList();
        })
        .catch(() => {
          this.getList();
        });
    },
    // 获取列表
    getList() {
      this.listLoading = true;
      sysUserListByPage(this.filterForm).then(res => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
    // 拆赔协议删除
    deleteCompensationDeal(id) {
      deleteCompensationDeal({
        id: id
      }).then(res => {
        this.getList();
        this.$message.success("删除成功!");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-manage {
  // border-style: solid;
  // border-image-source: url(../../../assets/img/wk.png);
  // border-image-slice: 47 92 47 87;
  // border-image-width: 47px 92px 47px 90px;
  // border-image-outset: 35px 37px 37px 35px;
  // border-image-repeat: stretch stretch;
  background: #0d305cbf;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}
</style>
