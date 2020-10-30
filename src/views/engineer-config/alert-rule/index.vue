<template>
  <div class="app-container department-manage">
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
      <el-table-column sortable prop="pointTypeId" label="测点类型ID" />
      <el-table-column sortable prop="alertAlgorithm" label="告警算法 1阈值算法 2中断算法 3故障算法" />
      <el-table-column sortable prop="alertOperator" label="告警运算符" />
      <el-table-column sortable prop="alertOperatorValue" label="告警运算值" />
      <el-table-column sortable prop="recoverOperator" label="恢复运算符" />
      <el-table-column sortable prop="recoverOperatorValue" label="恢复运算值" />
      <el-table-column sortable prop="alertType" label="告警类型 1过高 2过低 3中断 4故障 5事件 6其他" />
      <el-table-column sortable prop="alertLevelId" label="告警等级Id" />
      <el-table-column sortable prop="filterTime" label="闪烁过滤时间(秒)" />
      <el-table-column sortable prop="continueTime" label="持续超限时间(秒)" />
      <el-table-column sortable prop="alertContent" label="告警内容" />
      <el-table-column sortable prop="handlerAdvise" label="处理建议" />
      <el-table-column sortable prop="status" label="状态 1启用 2停用" />
      <el-table-column sortable prop="points" label="指定测点" />

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
        <!-- name	[string]	是	部门名称 （最大长度64） -->
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <!-- <template v-if="dialog.forms.id">
          <el-form-item label="创建时间" prop="createTime">
            <el-input disabled v-model="dialog.forms.createTime"></el-input>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input disabled v-model="dialog.forms.updateTime"></el-input>
          </el-form-item>
          <el-form-item label="创建人ID" prop="createUserId">
            <el-input disabled v-model="dialog.forms.createUserId"></el-input>
          </el-form-item>
          <el-form-item label="修改人ID" prop="updateUserId">
            <el-input disabled v-model="dialog.forms.updateUserId"></el-input>
          </el-form-item>
        </template> -->
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
  alertRuleDelete,
  alertRuleEdit,
  alertRuleAdd,
  alertRuleListByPage,
  // 未用到
  alertRuleListAll,
  alertRuleQueryById,
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
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

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
            callAPI = alertRuleEdit;
          } else {
            callAPI = alertRuleAdd;
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
          alertRuleDelete({
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
      alertRuleListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.department-manage {
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
