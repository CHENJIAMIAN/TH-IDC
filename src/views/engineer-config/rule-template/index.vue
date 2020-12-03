<template>
  <div class="app-container department-manage">
        
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-auth="1029">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
      >
        <el-form-item prop="name">
          <el-input v-model.trim="filterForm.name" placeholder="模板名称" />
        </el-form-item>
        <el-form-item prop="pointTypeId">
          <el-select
            clearable
            v-model="filterForm.pointTypeId"
            placeholder="测点类型"
            popper-class="three-column"
          >
            <el-option
              v-for="item in pointAllTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
      v-auth="1029"
    >
      <el-table-column sortable prop="name" label="模板名称" />
      <!-- <el-table-column sortable prop="deviceTypeId" label="设备类型ID" /> -->
      <!-- <el-table-column sortable prop="pointTypeId" label="测点类型ID" /> -->
      <el-table-column sortable prop="pointTypeName" label="测点类型" />
      <el-table-column sortable prop="alertAlgorithm" label="告警算法">
        <template slot-scope="{ row }">
          <div>
            {{
              alertAlgorithmOpts.find((i) => i.id == row.alertAlgorithm) &&
              alertAlgorithmOpts.find((i) => i.id == row.alertAlgorithm).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="alertOperator" label="告警运算符">
        <template slot-scope="{ row }">
          <span v-if="row.alertOperator == 1">大于</span>
          <span v-if="row.alertOperator == 2">小于</span>
          <span v-if="row.alertOperator == 3">等于</span>
        </template>
      </el-table-column>

      <el-table-column sortable prop="alertOperatorValue" label="告警运算值" />
      <el-table-column sortable prop="recoverOperator" label="恢复运算符">
        <template slot-scope="{ row }">
          <span v-if="row.alertOperator == 1">大于</span>
          <span v-if="row.alertOperator == 2">小于</span>
          <span v-if="row.alertOperator == 3">等于</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="recoverOperatorValue"
        label="恢复运算值"
      />
      <el-table-column sortable prop="alertType" label="告警类型">
        <template slot-scope="{ row }">
          <div>
            {{
              alertTypeOpts.find((i) => i.id == row.alertType) &&
              alertTypeOpts.find((i) => i.id == row.alertType).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="alertLevelId" label="告警等级">
        <template slot-scope="{ row }">
          <div>
            {{
              alertLevelOpts.find((i) => i.id == row.alertLevelId) &&
              alertLevelOpts.find((i) => i.id == row.alertLevelId).name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="filterTime" label="闪烁过滤时间(秒)" />
      <el-table-column sortable prop="continueTime" label="持续超限时间(秒)" />
      <el-table-column sortable prop="alertContent" label="告警内容" />
      <el-table-column sortable prop="handlerAdvise" label="处理建议" />
      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: gray" v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="points" label="指定测点" />

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
    v-auth="1029"
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
        label-width="120px"
      >
        <el-form-item prop="name" label="模板名称">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item prop="pointTypeId" label="测点类型">
          <el-select
            clearable
            v-model="dialog.forms.pointTypeId"
            popper-class="three-column"
          >
            <el-option
              v-for="item in pointAllTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="告警算法" prop="alertAlgorithm">
          <el-select v-model="dialog.forms.alertAlgorithm" style="width: 100%">
            <el-option border label="阈值算法" :value="1"></el-option>
            <el-option border label="中断算法" :value="2"></el-option>
            <el-option border label="故障算法" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="alertOperator" label="告警运算符">
          <el-select v-model="dialog.forms.alertOperator" style="width: 100%">
            <el-option border label="大于" :value="1"></el-option>
            <el-option border label="小于" :value="2"></el-option>
            <el-option border label="等于" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="alertOperatorValue" label="告警运算值">
          <el-input v-model="dialog.forms.alertOperatorValue"></el-input>
        </el-form-item>
        <el-form-item prop="recoverOperator" label="恢复运算符">
          <el-select v-model="dialog.forms.recoverOperator" style="width: 100%">
            <el-option border label="大于" :value="1"></el-option>
            <el-option border label="小于" :value="2"></el-option>
            <el-option border label="等于" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="recoverOperatorValue" label="恢复运算值">
          <el-input v-model="dialog.forms.recoverOperatorValue"></el-input>
        </el-form-item>

        <el-form-item prop="alertType" label="告警类型">
          <el-select v-model="dialog.forms.alertType" style="width: 100%">
            <el-option
              v-for="item in alertTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="alertLevelId" label="告警等级">
          <el-select v-model="dialog.forms.alertLevelId" style="width: 100%">
            <el-option
              v-for="item in alertLevelOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="filterTime" label="闪烁过滤时间(秒)">
          <el-input v-model="dialog.forms.filterTime"></el-input>
        </el-form-item>
        <el-form-item prop="continueTime" label="持续超限时间(秒)">
          <el-input v-model="dialog.forms.continueTime"></el-input>
        </el-form-item>
        <el-form-item prop="alertContent" label="告警内容">
          <el-input v-model="dialog.forms.alertContent"></el-input>
        </el-form-item>
        <el-form-item prop="handlerAdvise" label="处理建议">
          <el-input v-model="dialog.forms.handlerAdvise"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group
            class="radio-status"
            v-model="dialog.forms.status"
            style="width: 100%"
          >
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="2" style="color: gray">禁用</el-radio>
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
import {
  valueTypeOpts,
  isIntNumber,
} from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  alertRuleTemplateDelete,
  alertRuleTemplateEdit,
  alertRuleTemplateAdd,
  alertRuleTemplateListByPage,
  //  alertRuleTemplateListAll,
  alertRuleTemplateQueryById,
  alertLevelListAll,
} from "@/api/engineer-config.js";
import { pointTypeListAll } from "@/api/resource-manage.js";
export default {
  components: { pagination },
  data() {
     return {
      hasAuth: true,
      valueTypeOpts,
      alertLevelOpts: [],
      pointAllTypeOpts: [],
      filterForm: {
        // 筛选条件
        name: "",
        pointTypeId: null,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      alertAlgorithmOpts: [
        { id: 1, name: "阈值算法" },
        { id: 2, name: "中断算法" },
        { id: 3, name: "故障算法" },
      ],
      alertTypeOpts: [
        { id: 1, name: "过高" },
        { id: 2, name: "过低" },
        { id: 3, name: "中断" },
        { id: 4, name: "故障" },
        { id: 5, name: "事件" },
        { id: 6, name: "其他" },
      ],

      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          pointTypeId: [{ required: true, trigger: "blur", message: "请输入" }],
          alertAlgorithm: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          // alertOperator: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          // alertOperatorValue: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          // recoverOperator: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          // recoverOperatorValue: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          // alertType: [{ required: true, trigger: "blur", message: "请输入" }],
          // alertLevelId: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          // filterTime: [{ required: true, trigger: "blur", message: "请输入" }],
          // continueTime: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          alertContent: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          handlerAdvise: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          status: [{ required: true, trigger: "blur", message: "请输入" }],
          // points: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  created() {
    alertLevelListAll().then((r) => (this.alertLevelOpts = r.data));
    pointTypeListAll().then((r) => (this.pointAllTypeOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = alertRuleTemplateEdit;
          } else {
            callAPI = alertRuleTemplateAdd;
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
          alertRuleTemplateDelete({
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
      alertRuleTemplateListByPage(this.filterForm).then((res) => {
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
.department-manage {
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
