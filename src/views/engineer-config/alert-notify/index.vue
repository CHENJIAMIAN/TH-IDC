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
      <el-table-column sortable prop="floorCode" label="楼层编号" />
      <el-table-column sortable prop="roomCode" label="房间编号" />
      <el-table-column sortable prop="deviceGroupCode" label="设备组编号" />
      <el-table-column sortable prop="deviceCode" label="设备编号" />
      <el-table-column sortable prop="pointCode" label="测点编号" />
      <el-table-column sortable prop="pointName" label="测点名称" />
      <el-table-column sortable prop="triggerValue" label="触发值" />
      <el-table-column sortable prop="currentValue" label="当前值" />
      <el-table-column sortable prop="noteLevel" label="通知等级" />
      <el-table-column sortable prop="noteContent" label="通知内容" />
      <el-table-column sortable prop="status" label="状态 1待处理 2已受理 3取消" />
      <el-table-column sortable prop="createTime" label="创建时间" />
      <el-table-column sortable prop="handlerTime" label="受理时间" />
      <el-table-column sortable prop="handlerUserId" label="受理人ID" />
      <el-table-column sortable prop="handlerRemark" label="受理备注" />
      <el-table-column sortable prop="handlerUserName" label="受理人" />

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
    <el-dialog :visible.sync="dialog.visible" top="25vh">
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
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="dialog.forms.menuType" style="width: 100%">
            <el-radio border :label="1">一级菜单</el-radio>
            <el-radio border :label="2">二级菜单</el-radio>
            <el-radio border :label="3">三级菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="一级菜单"
          prop="firstMenuId"
          v-if="dialog.forms.menuType == 2 || dialog.forms.menuType == 3"
        >
          <el-select
            v-model="dialog.forms.firstMenuId"
            @change="$set(dialog.forms, 'secondMenuId', '')"
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
          label="二级菜单"
          prop="secondMenuId"
          v-if="dialog.forms.menuType == 3"
        >
          <el-select v-model="dialog.forms.secondMenuId">
            <el-option
              v-for="item in secondMenuOpts"
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
  alertNotificationDelete,
  alertNotificationEdit,
  alertNotificationAdd,
  alertNotificationListByPage,
  alertNotificationListAll,
  // 没用到
  alertNotificationQueryById,
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
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          menuType: [{ required: true, trigger: "change", message: "请输入" }],
                    firstMenuId: [{ required: true, trigger: "change", message: "请输入" }],
          secondMenuId: [
            { required: true, trigger: "change", message: "请输入" },
          ],
          thirdMenuId: [{ required: true, trigger: "change", message: "请输入" }],
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
          let callAPI = null;
          // 根据 menuType 确定父级id编号 parentId
          switch (this.dialog.forms.menuType) {
            case 1:
              this.dialog.forms.parentId = null;
              break;
            case 2:
              this.dialog.forms.parentId = this.dialog.forms.firstMenuId;
              if (!this.dialog.forms.firstMenuId) {
                this.$message.error("请选择父级菜单");
                return;
              }
              break;
            case 3:
              this.dialog.forms.parentId = this.dialog.forms.secondMenuId;
              if (!this.dialog.forms.secondMenuId) {
                this.$message.error("请选择父级菜单");
                return;
              }
              break;
          }
          delete this.dialog.forms.firstMenuId;
          delete this.dialog.forms.secondMenuId;
          if (this.dialog.forms.id) {
            callAPI = alertNotificationEdit;
          } else {
            callAPI = alertNotificationAdd;
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
      const r1 = await alertNotificationListAll({ menuType: 1 });
      this.firstMenuOpts = r1.data;
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)), {
          firstMenuId: null, //!!!!!让这两个变量变响应式
          secondMenuId: null, //!!!!!让这两个变量变响应式
        });
        console.log(this.dialog.forms);
        switch (row.menuType) {
          case 1:
            break;
          case 2:
            this.dialog.forms.firstMenuId = row.parentId;
            break;
          case 3:
            // 二级菜单的id是row.parentId
            // 此时二级菜单需要手动获取,而不是通过选一级触发
            const r2 = await alertNotificationListAll({ menuType: 2 });
            this.secondMenuOpts = r2.data;
            // 自动选上二级菜单
            this.dialog.forms.secondMenuId = row.parentId;
            // 找到二级菜单的该项
            const secondMenu = this.secondMenuOpts.find(
              (i) => i.id === row.parentId
            );
            // 超出与该二级菜单的父亲,也就是一级菜单的该项
            const firstMenu = this.firstMenuOpts.find(
              (i) => i.id === secondMenu.parentId
            );
            // 自动选上一级菜单
            this.dialog.forms.firstMenuId = firstMenu.id; //得到一级菜单的id
            break;
        }
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
