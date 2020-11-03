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
      <el-table-column sortable prop="level" label="级别" />
      <el-table-column sortable prop="name" label="自定义名称" />
      <el-table-column sortable prop="noteType" label="通知方式1.语音2." />
      <el-table-column sortable prop="noteContent" label="通知内容1时间2位置3内容4告警值" />
      <el-table-column sortable prop="status" label="状态1启用2停用" />

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

    <!-- 
name	[string]	是	菜单名称 （最大长度64）		
parentId	[int]	是	父级菜单编号ID		
menuType	[short]	是	菜单类型  1 一级菜单 2 二级菜单 3 三级菜单 -->
    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible" top="20vh">
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
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标签" prop="permission">
          <el-input v-model="dialog.forms.permission"></el-input>
        </el-form-item>
        <el-form-item label="子系统" prop="firstMenuId">
          <el-select
            v-model="dialog.forms.firstMenuId"
            @change="
              () => {
                $set(dialog.forms, 'secondMenuId', '');
                $set(dialog.forms, 'thirdMenuId', '');
              }
            "
          >
            <el-option
              v-for="item in firstMenuOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="模块"
          prop="secondMenuId"
          v-show="dialog.forms.firstMenuId"
        >
          <el-select
            v-model="dialog.forms.secondMenuId"
            @change="$set(dialog.forms, 'thirdMenuId', '')"
          >
            <el-option
              v-for="item in secondMenuOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="菜单"
          prop="thirdMenuId"
          v-show="dialog.forms.secondMenuId"
        >
          <el-select v-model="dialog.forms.thirdMenuId">
            <el-option
              v-for="item in thirdMenuOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
  alertLevelQueryById,
  // alertLevelListByPage,
  // alertLevelDelete,
  // alertLevelEdit,
  alertLevelAdd,
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
  watch: {
  },
  async created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          // 根据 menuType 确定父级id编号 parentId
          if (!this.dialog.forms.thirdMenuId) {
            this.$message.error("请选择父级菜单");
            return;
          }
          this.dialog.forms.menuId = this.dialog.forms.thirdMenuId;
          if (this.dialog.forms.id) {
            callAPI = alertLevelEdit;
          } else {
            callAPI = alertLevelAdd;
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
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = {};
      }
      this.dialog.visible = true;      
      this.$nextTick(_=>this.$refs["dialogForm"].clearValidate());
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
      alertLevelListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
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
