<template>
  <div class="app-container auth-manage">
        
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-auth="1007">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="level1Id">
          <el-select clearable placeholder="子系统名称"
            v-model="filterForm.level1Id"
            @change="
              () => {
                $set(filterForm, 'level2Id', null);
                $set(filterForm, 'menuId', null);
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
        <el-form-item prop="level2Id">
           <el-select clearable placeholder="模块名称"
              v-model="filterForm.level2Id"
              @change="$set(filterForm, 'menuId', null)"
           >
            <el-option
              v-for="item in secondMenuOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="menuId">
          <el-select clearable placeholder="菜单名称" v-model="filterForm.menuId">
            <el-option
              v-for="item in thirdMenuOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model.trim="filterForm.name" placeholder="权限名称" />
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
    v-auth="1007"
            style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="name" label="权限名称" />
      <el-table-column prop="permission" label="标签" />
      <!-- <el-table-column sortable prop="menuId" label="所属菜单id" /> -->
      <el-table-column prop="level1Name" label="所属模块名称" />
      <el-table-column prop="level2Name" label="所属子系统名称" />
      <el-table-column prop="level3Name" label="所属菜单名称" />
      <!-- <el-table-column sortable prop="level2Id" label="所属子系统id" /> -->
      <!-- <el-table-column sortable prop="level1Id" label="所属模块id" /> -->
      <el-table-column label="操作" align="center" width="161">
        <template slot-scope="{ row }">
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
    v-auth="1007"
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

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
  sysPermissionListByPage,
  sysPermissionQueryById,
  sysPermissionDelete,
  sysPermissionEdit,
  sysPermissionAdd,
  sysMenuListAll,
} from "@/api/system-manage.js";
export default {
  components: { pagination },
  data() {
     return {
      hasAuth: true,
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      thirdMenuOpts: [],
      filterForm: {
        // 筛选条件
        name: "",
        menuId: null,
        level2Id: null,
        level1Id: null,
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
    async "filterForm.level1Id"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.secondMenuOpts = [];
      this.thirdMenuOpts = [];
      const r = await sysMenuListAll({ parentId: n, menuType: 2 });
      this.secondMenuOpts = r.data;
    },
    async "filterForm.level2Id"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.thirdMenuOpts = [];
      const r = await sysMenuListAll({ parentId: n, menuType: 3 });
      this.thirdMenuOpts = r.data;
    },
    async "dialog.forms.firstMenuId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.secondMenuOpts = [];
      this.thirdMenuOpts = [];
      const r = await sysMenuListAll({ parentId: n, menuType: 2 });
      this.secondMenuOpts = r.data;
    },
    async "dialog.forms.secondMenuId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.thirdMenuOpts = [];
      const r = await sysMenuListAll({ parentId: n, menuType: 3 });
      this.thirdMenuOpts = r.data;
    },
  },
  async created() {
       const r1 = await sysMenuListAll({ menuType: 1 });
      this.firstMenuOpts = r1.data;
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
            callAPI = sysPermissionEdit;
          } else {
            callAPI = sysPermissionAdd;
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
      document.activeElement.blur();
      this.$refs[form].resetFields();
      this.handleQuery();
    },
    // 查看
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      const r1 = await sysMenuListAll({ menuType: 1 });
      this.firstMenuOpts = r1.data;
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
        console.log(this.dialog.forms);
        // 根据menuId复原三级菜单
        // 二级菜单的id是row.menuId
        // 此时二级菜单需要手动获取,而不是通过选一级触发
        const r3 = await sysMenuListAll({ menuType: 3 });
        const r2 = await sysMenuListAll({ menuType: 2 });
        this.thirdMenuOpts = r3.data;
        this.secondMenuOpts = r2.data;
        // 找到三级菜单的该项
        const thirdMenu = this.thirdMenuOpts.find((i) => i.id === row.menuId);
        // 找到二级菜单的该项
        const secondMenu = this.secondMenuOpts.find(
          (i) => i.id === thirdMenu.parentId
        );
        // 找到一级菜单的该项
        const firstMenu = this.firstMenuOpts.find(
          (i) => i.id === secondMenu.parentId
        );
        // 自动选上三级菜单
        this.$set(this.dialog.forms, "thirdMenuId", row.menuId);
        // this.dialog.forms.thirdMenuId = row.menuId;
        // 自动选上二级菜单
        this.$set(this.dialog.forms, "secondMenuId", secondMenu.id);
        // this.dialog.forms.secondMenuId = secondMenu.id;
        // 自动选上一级菜单
        this.$set(this.dialog.forms, "firstMenuId", firstMenu.id);
        // this.dialog.forms.firstMenuId = firstMenu.id; //得到一级菜单的id
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
          sysPermissionDelete({
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
      sysPermissionListByPage(this.filterForm).then((res) => {
        this.hasAuth = true;
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      }).catch(e=>{
        this.hasAuth = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
  display: grid;
  grid-template-rows: 60px auto 55px;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}
</style>
