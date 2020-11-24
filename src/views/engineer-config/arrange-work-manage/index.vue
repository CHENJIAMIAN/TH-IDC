<template>
  <div class="app-container user-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        :inline="true"
        size="medium"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item>
          <!-- <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset()"
            >重置</el-button
          > -->
          <el-button type="primary" size="medium" @click="handleAdd">
            <i class="el-icon-plus" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table
      class="arrange-work-table"
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      :data="listData"
      :cell-class-name="tableCellClassName"
      @cell-click="cellClick"
    >
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="week1List" label="星期一" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week1List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week1List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week2List" label="星期二" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week2List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week2List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week3List" label="星期三" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week3List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week3List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week4List" label="星期四" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week4List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week4List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week5List" label="星期五" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week5List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week5List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week6List" label="星期六" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week6List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week6List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="week7List" label="星期日" align="center">
        <template slot-scope="{ row, column, $index }">
          <div v-if="row.week7List.length < 1" style="color: #a7a7a7">
            待排班
          </div>
          <div v-for="i in row.week7List" :key="i.id">{{ i.name }}</div>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="{ row }">
          <el-switch
            @change="handleStatusChange($event, row)"
            v-model="row.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="{ row }">
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

    <!-- 绑定排班人员弹窗 -->
    <el-dialog :visible.sync="dialogRY.visible">
      <div slot="title" class="el-dialog-title-custom">
        <div class="title-txt">绑定排班人员</div>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogRY.forms"
        :rules="dialogRY.rules"
        ref="dialogRYForm"
        label-width="50"
      >
        <el-form-item label="" prop="">
          <el-transfer
            filterable
            :filter-method="
              (query, item) => {
                return item.name.indexOf(query) > -1;
              }
            "
            :titles="['未绑定', '已绑定']"
            :props="{
              key: 'id',
              label: 'name',
            }"
            filter-placeholder="请输入"
            v-model="dialogRY.forms.personIdArray"
            :data="allRYOpts"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogRYSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  arrangeWorkListAllUserNotBind,
  arrangeWorkListAllUserBind,
  arrangeWorkAdd,
  arrangeWorkDelete,
  arrangeWorkEdit,
  arrangeWorkListAll,
  arrangeWorkUpdatePassword,
  arrangeWorkQueryById,
  arrangeWorkUpdateStatus,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      userNotBindOpts: [],
      userBindOpts: [],
      listLoading: true,
      listData: [], // 列表数据

      allRYOpts: [],
      clickedRow: {},
      clickedColumn: {},
      dialogRY: {
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
    dialogRYSubmit() {
      const row = this.clickedRow;
      const column = this.clickedColumn;
      console.log(row, column);
      console.log(this.dialogRY.forms);
      this.$refs["dialogRYForm"].validate((valid, obj) => {
        if (valid) {
          this.dialogRY.forms;
          arrangeWorkEdit({
            id: row.id,
            week: column.index,
            userIdArray: this.dialogRY.forms.personIdArray,
          }).then((r) => {
            this.$set(row, `week${column.index}ListAll`, r.data);

            this.$message.success("操作成功!");
            this.$refs["dialogRYForm"].resetFields();
            this.dialogRY.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    async handleRYDialog({ row, column, cell, event }) {
      // dialog显示时获取一级菜单列表
      // 编辑
      this.dialogRY.forms = { id: row.id };
      const r1 = await arrangeWorkListAllUserNotBind({
        id: row.id,
        week: column.index,
      });
      this.userNotBindOpts = r1.data;
      const r2 = await arrangeWorkListAllUserBind({
        id: row.id,
        week: column.index,
      });
      this.userBindOpts = r2.data;

      this.$set(
        this.dialogRY.forms,
        "personIdArray",
        r2.data.map((i) => i.id)
      );
      this.allRYOpts = this.userNotBindOpts.concat(this.userBindOpts);
      this.dialogRY.visible = true;
      this.$nextTick((_) => this.$refs["dialogRYForm"].clearValidate());
    },
    handleStatusChange(v, row) {
      arrangeWorkUpdateStatus({ id: row.id, status: v }).then((r) => {
        this.getList();
      });
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex;
      column.index = columnIndex;
      if (column.index > 0 && column.index < 8) return "week-day";
    },
    cellClick(row, column, cell, event) {
      this.clickedRow = row;
      this.clickedColumn = column;
      column.index > 0 &&
        column.index < 8 &&
        this.handleRYDialog({ row, column, cell, event });
    },
    handlePersonSelectVisibleChange(v, { row, column, $index }) {
      if (v && column.index > 0 && column.index < 8) {
        arrangeWorkListAllUserNotBind({ id: row.id, week: column.index }).then(
          (r) => {
            this.$set(row, `week${column.index}ListAll`, r.data);
          }
        );
      }
    },
    // 查询
    handleQuery() {
      this.getList();
    },
    handleAdd() {
      arrangeWorkAdd().then((r) => {
        this.getList();
      });
    },
    // 重置
    handleReset(form) {
      this.handleQuery();
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          arrangeWorkDelete({
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
      arrangeWorkListAll().then((res) => {
        this.listData = res.data;
        this.listData.map((i, index) => {
          i.week1IdList = i.week1List.map((i) => i.name);
          i.week2IdList = i.week2List.map((i) => i.name);
          i.week3IdList = i.week3List.map((i) => i.name);
          i.week4IdList = i.week4List.map((i) => i.name);
          i.week5IdList = i.week5List.map((i) => i.name);
          i.week6IdList = i.week6List.map((i) => i.name);
          i.week7IdList = i.week7List.map((i) => i.name);
        });
        console.log(this.listData);
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-manage {
  display: grid;
  grid-template-rows: 60px auto;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}

::v-deep {
  .arrange-work-table th.is-leaf,
  .arrange-work-table tr,
  .arrange-work-table td {
    border: 1px solid;
  }

  .week-day {
    cursor: pointer;
  }

  td:hover {
    background: #0d708c !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: unset;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
    background: #0838698c;
  }
}
</style>
