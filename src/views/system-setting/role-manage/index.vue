<template>
  <div class="app-container role-manage">
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
          <!-- <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          > -->
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
    >
      <el-table-column sortable prop="name" label="角色名称" />
      <el-table-column sortable prop="createTime" label="创建时间" />
      <el-table-column sortable prop="createUserName" label="创建人" />
      <!-- <el-table-column sortable prop="updateTime" label="修改时间" /> -->
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="{ row }">
          <el-button
            title="分配房间"
            icon="el-icon-circle-plus-outline"
            type="primary"
            plain
            @click="handleFJDialog(row)"
          ></el-button>
          <el-button
            title="分配权限"
            icon="el-icon-circle-plus"
            type="primary"
            plain
            @click="handleQXDialog(row)"
          ></el-button>
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
    <el-dialog :visible.sync="dialog.visible" top="25vh">
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 绑定房间弹窗 -->
    <el-dialog :visible.sync="dialogFJ.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">绑定房间</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialogFJ.forms"
        :rules="dialogFJ.rules"
        ref="dialogFJForm"
        label-position="top"
        style="padding: 0 1rem"
      >
        <!-- <el-tree
            default-expand-all
             node-key="id"
            :default-checked-keys="defaultCheckedIdsFJ"
            ref="treeFJ"
            :data="treeDataFJ"
            :props="{
              children: 'roomList',
              label: 'name',
            }"
            show-checkbox
          /> -->
        <el-form-item
          class="rooms-form-item"
          v-for="item in treeDataFJ"
          :key="item.id"
          :label="item.name"
          prop="name"
        >
          <el-checkbox-group
            class="rooms-el-checkbox-group"
            v-model="dialogFJ.forms.roomIdArray"
          >
            <el-checkbox
              v-for="i in item.roomList"
              :key="i.id"
              :label="i.id"
              border
              >{{ i.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogFJSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 绑定权限弹窗 -->
    <el-dialog :visible.sync="dialogQX.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">绑定权限</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogQX.forms"
        :rules="dialogQX.rules"
        ref="dialogQXForm"
      >
        <el-tree
          default-expand-all
          node-key="id"
          :default-checked-keys="defaultCheckedIdsQX"
          ref="treeQX"
          :data="treeDataQX"
          :props="{
            children: 'child',
            label: 'name',
          }"
          show-checkbox
        />
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogQXSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  sysRoleDelete,
  sysRoleEdit,
  sysRoleAdd,
  sysRoleListByPage,
  //
  sysRoleMenuAdd,
  sysRoleMenuListAll,
  sysRoleRoomListAll,
  sysRoleRoomAdd,
} from "@/api/system-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
      treeDataQX: [],
      treeDataFJ: [],
      defaultCheckedIdsQX: [],
      // defaultCheckedIdsFJ: [],
      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },

      dialogFJ: {
        visible: false,
        forms: {},
        rules: {},
      },
      dialogQX: {
        visible: false,
        forms: {},
        rules: {},
      },
    };
  },
  created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    findRoot(items, childname) {
      let result = [];
      function find(items) {
        for (let i of items) {
          if (!i[childname]) i.has == "1" && result.push(i);
          else find(i[childname]);
        }
      }
      find(items);
      return result;
    },
    dialogFJSubmit() {
      this.$refs["dialogFJForm"].validate((valid, obj) => {
        if (valid) {
          // this.dialogFJ.forms.roomIdArray=this.$refs['treeFJ'].getCheckedNodes(true).map(i=>i.id)
          sysRoleRoomAdd(this.dialogFJ.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogFJForm"].resetFields();
            this.dialogFJ.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    dialogQXSubmit() {
      this.$refs["dialogQXForm"].validate((valid, obj) => {
        if (valid) {
          this.dialogQX.forms.permissionIdArray = this.$refs["treeQX"]
            .getCheckedNodes()
            .filter((i) => i.has)
            .map((i) => i.id);
          sysRoleMenuAdd(this.dialogQX.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogQXForm"].resetFields();
            this.dialogQX.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = sysRoleEdit;
          } else {
            callAPI = sysRoleAdd;
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
    handleDialog(row) {
      if (row) {
        // 编辑
        this.dialog.forms = JSON.parse(JSON.stringify(row));
      } else {
        this.dialog.forms = {};
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    handleFJDialog(row) {
      sysRoleRoomListAll({ roleId: row.id }).then((r) => {
        this.treeDataFJ = r.data;
        const checkedIds = this.findRoot(this.treeDataFJ, "roomList").map(
          (i) => i.id
        );
        this.$set(this.dialogFJ.forms, "roomIdArray", checkedIds);
      });
      if (row) {
        // 编辑
        this.dialogFJ.forms = JSON.parse(JSON.stringify({ roleId: row.id }));
        this.$set(this.dialogFJ.forms, "roomIdArray", []);
        // el-checkbox-group v-model源码过程中为什么没有触发自动$set,反而el-checkbox会报错?
        // 因为自动$set只在$emit input时, el-checkbox作为儿子先渲染,渲染时用到他爸,发现他爸的:value(即v-model)是undefined
        // 自然报错
      } else {
        this.dialogFJ.forms = {};
      }
      this.dialogFJ.visible = true;
      // this.$nextTick((_) => window.treeFJ=this.$refs['treeFJ']);
    },
    handleQXDialog(row) {
      sysRoleMenuListAll({ roleId: row.id }).then((r) => {
        this.treeDataQX = r.data;
        this.defaultCheckedIdsQX = this.findRoot(this.treeDataQX, "child").map(
          (i) => i.id
        );
      });
      if (row) {
        // 编辑
        this.dialogQX.forms = JSON.parse(JSON.stringify({ roleId: row.id }));
      } else {
        this.dialogQX.forms = {};
      }
      this.dialogQX.visible = true;
      // this.$nextTick((_) => window.treeQX=this.$refs['treeQX']);
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sysRoleDelete({
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
      sysRoleListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.role-manage {
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
    .el-form-item__label {
      font-size: 1rem;
      line-height: 16px;
    }
    .el-form-item__content {
      border: 1px solid;
      padding: 1rem;
      border-radius: 5px;
    }
    .rooms-el-checkbox-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
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
