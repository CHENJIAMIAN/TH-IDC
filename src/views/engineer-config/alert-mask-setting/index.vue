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
    <!-- 列表 -->
    <el-table
      style="overflow: auto"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="floorCode" label="楼层编号" />
      <el-table-column sortable prop="roomCode" label="房间编号" />
      <el-table-column sortable prop="maskType" label="屏蔽方式">
        <template slot-scope="{ row }">
          <div>
            {{
              maskTypeOpts.find((i) => i.id == row.maskType) &&
              maskTypeOpts.find((i) => i.id == row.maskType).name
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable prop="deviceTypes" label="设备类型[1,2,3]">
        <template slot-scope="{ row }">
          <div v-for="item in row.deviceTypes" :key="item">
            {{
              deviceTypesOpts.find((i) => i.id == item) &&
              deviceTypesOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="pointTypes" label="测点类型[1,2,3]">
        <template slot-scope="{ row }">
          <div v-for="item in row.pointTypes" :key="item">
            {{
              pointTypesOpts.find((i) => i.id == item) &&
              pointTypesOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="deviceGroups" label="指定设备组[1,2,3]">
        <template slot-scope="{ row }">
          <div v-for="item in row.deviceGroups" :key="item">
            {{
              deviceGroupsOpts.find((i) => i.id == item) &&
              deviceGroupsOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="devices" label="指定设备[1,2,3]">
        <template slot-scope="{ row }">
          <div v-for="item in row.devices" :key="item">
            {{
              devicesOpts.find((i) => i.id == item) &&
              devicesOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="points" label="指定测点[1,2,3]">
        <template slot-scope="{ row }">
          <div v-for="item in row.points" :key="item">
            {{
              pointsOpts.find((i) => i.id == item) &&
              pointsOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="maskPeriod" label="屏蔽时段">
        <template slot-scope="{ row }">
          <div v-for="item in row.maskPeriod" :key="item">
            {{
              maskPeriodOpts.find((i) => i.id == item) &&
              maskPeriodOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: gray" v-else>禁用</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="280">
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

        <el-form-item label="屏蔽方式" prop="maskType">
          <el-select v-model="dialog.forms.maskType">
            <el-option
              v-for="item in maskTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialog.forms.status" style="width: 100%">
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="0" style="color: gray">禁用</el-radio>
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
  alertMaskDelete,
  alertMaskEdit,
  alertMaskQueryById,
  alertMaskListByPage,
  alertMaskAdd,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      maskTypeOpts: [
        { id: 1, name: "所有" },
        { id: 2, name: "指定设备类型" },
        { id: 3, name: "指定测点类型" },
        { id: 4, name: "指定设备组" },
        { id: 5, name: "指定设备" },
        { id: 6, name: "指定测点" },
      ],
      deviceTypesOpts: [],
      pointTypesOpts: [],
      deviceGroupsOpts: [],
      devicesOpts: [],
      pointsOpts: [],
      maskPeriodOpts: [
        "2020-11-03 12:30 - 2020-11-04 13:30",
        "2020-11-04 12:30 - 2020-11-05 13:30",
      ],

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
    };
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
          if (this.dialog.forms.id) {
            callAPI = alertMaskEdit;
          } else {
            callAPI = alertMaskAdd;
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
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          alertMaskDelete({
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
      alertMaskListByPage(this.filterForm).then((res) => {
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
      font-size: 1.4rem;
    }
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
