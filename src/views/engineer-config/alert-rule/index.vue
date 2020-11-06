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
        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="测点类型名称" />
        </el-form-item>
        <el-form-item prop="deviceTypeId">
          <el-select
            placeholder="设备类型"
            v-model="filterForm.deviceTypeId"
            popper-class="three-column"
          >
            <el-option
              v-for="item in deviceTypeOpts"
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
      <el-table-column sortable prop="name" label="测点类型名称" />
      <!-- <el-table-column sortable prop="deviceTypeId" label="设备类型ID" /> -->
      <el-table-column sortable prop="units" label="单位" />
      <el-table-column sortable prop="valueType" label="值类型">
        <template slot-scope="{ row }">
          {{
            valueTypeOpts.find((i) => i.id == row.valueType) &&
            valueTypeOpts.find((i) => i.id == row.valueType).name
          }}
        </template>
      </el-table-column>
      <el-table-column sortable prop="columnName" label="字段名" />
      <el-table-column sortable prop="deviceTypeName" label="设备类型名称" />
      <el-table-column sortable prop="count" label="告警规则条数" />

      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row)"
            >规则</el-button
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
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      custom-class="dialog-img"
    >
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">基本设置</span>
        <!-- <img src="@/assets/img/hl.png" /> -->
      </div>

      <div class="dialog-content">
        <div class="measure-point-info">
          <el-card>
            <el-form
              :model="dialogCD.forms"
              :rules="dialogCD.rules"
              ref="dialogCDForm"
              label-width="150px"
              style="pointer-events: none"
            >
              <div
                style="
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                "
              >
                <el-form-item label="测点类型名称" prop="name">
                  <el-input v-model="dialogCD.forms.name"></el-input>
                </el-form-item>

                <el-form-item label="设备类型" prop="deviceTypeId">
                  <el-select
                    v-model="dialogCD.forms.deviceTypeId"
                    popper-class="three-column"
                  >
                    <el-option
                      v-for="item in deviceTypeOpts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="值类型" prop="valueType">
                  <el-select v-model="dialogCD.forms.valueType">
                    <el-option
                      v-for="item in valueTypeOpts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="单位" prop="units">
                  <el-input v-model="dialogCD.forms.units"></el-input>
                </el-form-item>
                <el-form-item label="字段名" prop="columnName">
                  <el-input
                    @keyup.enter.native="dialogCDSubmit"
                    v-model="dialogCD.forms.columnName"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-card>
        </div>

        <div class="rule-list">
          <el-card
            style="min-width: 340px"
            v-for="(alertRule, index) in alertRuleList"
            :key="alertRule"
          >
            <el-form
              :model="dialogRule.forms"
              :rules="dialogRule.rules"
              ref="dialogForm"
              label-width="120px"
            >
              <el-form-item label="测点类型ID" prop="pointTypeId">
                <el-select
                  clearable
                  v-model="filterForm.pointTypeId"
                  placeholder="测点类型"
                  popper-class="three-column"
                >
                  <el-option
                    v-for="item in pointTypeOpts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="告警算法" prop="alertAlgorithm">
                <el-select
                  v-model="dialogRule.forms.alertAlgorithm"
                  style="width: 100%"
                >
                  <el-option border label="阈值算法" :value="1"></el-option>
                  <el-option border label="中断算法" :value="2"></el-option>
                  <el-option border label="故障算法" :value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="alertOperator" label="告警运算符">
                <el-select
                  v-model="dialogRule.forms.alertOperator"
                  style="width: 100%"
                >
                  <el-option border label="大于" :value="1"></el-option>
                  <el-option border label="小于" :value="2"></el-option>
                  <el-option border label="等于" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="alertOperatorValue" label="告警运算值">
                <el-input
                  v-model="dialogRule.forms.alertOperatorValue"
                ></el-input>
              </el-form-item>
              <el-form-item prop="recoverOperator" label="恢复运算符">
                <el-select
                  v-model="dialogRule.forms.recoverOperator"
                  style="width: 100%"
                >
                  <el-option border label="大于" :value="1"></el-option>
                  <el-option border label="小于" :value="2"></el-option>
                  <el-option border label="等于" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="recoverOperatorValue" label="恢复运算值">
                <el-input
                  v-model="dialogRule.forms.recoverOperatorValue"
                ></el-input>
              </el-form-item>

              <el-form-item prop="alertType" label="告警类型">
                <el-select
                  v-model="dialogRule.forms.alertType"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in alertTypeOpts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="alertLevelId" label="告警等级Id">
                <el-input v-model="dialogRule.forms.alertLevelId"></el-input>
              </el-form-item>

              <el-form-item prop="filterTime" label="闪烁过滤时间(秒)">
                <el-input v-model="dialogRule.forms.filterTime"></el-input>
              </el-form-item>
              <el-form-item prop="continueTime" label="持续超限时间(秒)">
                <el-input v-model="dialogRule.forms.continueTime"></el-input>
              </el-form-item>
              <el-form-item prop="alertContent" label="告警内容">
                <el-input v-model="dialogRule.forms.alertContent"></el-input>
              </el-form-item>
              <el-form-item prop="handlerAdvise" label="处理建议">
                <el-input v-model="dialogRule.forms.handlerAdvise"></el-input>
              </el-form-item>

              <el-form-item label="状态" prop="status">
                <el-radio-group
                  v-model="dialogRule.forms.status"
                  style="width: 100%"
                >
                  <el-radio border :label="1" style="color: #55fb55"
                    >启用</el-radio
                  >
                  <el-radio border :label="2" style="color: gray"
                    >禁用</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button
                icon="el-icon-delete"
                type="primary"
                plain
                @click="handleDeleteRule(dialogRule.forms.id, index)"
                >删除规则</el-button
              >
              <el-button type="primary" @click="dialogSubmit"
                >保存规则</el-button
              >
            </div>
          </el-card>
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="medium"
            @click="alertRuleList.push('')"
          >
            添加规则
          </el-button>
        </div>
      </div>

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
  sortValidator,
} from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  // alertRuleDelete,
  alertRuleEdit,
  alertRuleAdd,
  alertRuleListByPage,
  // 未用到
  alertRuleListAll,
  alertRuleQueryById,
} from "@/api/engineer-config.js";
import {
  deviceTypeListAll,
  pointTypeQueryById,
} from "@/api/resource-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      dialogVisible: true,
      pointTypeOpts: [],
      valueTypeOpts,
      deviceTypeOpts: [],
      filterForm: {
        // 筛选条件
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
      alertRuleList: ["1", "2"],

      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

      dialogRule: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          pointTypeId: [{ required: true, trigger: "blur", message: "请输入" }],
          alertAlgorithm: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          alertOperator: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          alertOperatorValue: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          recoverOperator: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          recoverOperatorValue: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          alertType: [{ required: true, trigger: "blur", message: "请输入" }],
          alertLevelId: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          // filterTime: [{ required: true, trigger: "blur", message: "请输入" }],
          // continueTime: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          alertContent: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          // handlerAdvise: [
          //   { required: true, trigger: "blur", message: "请输入" },
          // ],
          status: [{ required: true, trigger: "blur", message: "请输入" }],
          points: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
      dialogCD: {
        id: "",
        visible: false,
        forms: {},
      },
    };
  },
  created() {
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialogRule.forms.id) {
            callAPI = alertRuleEdit;
          } else {
            callAPI = alertRuleAdd;
          }
          callAPI(this.dialogRule.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.dialogVisible = false;
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
        pointTypeQueryById({ id: row.id }).then(
          (r) => (this.dialogCD.forms = r.data)
        );
        // 编辑
        this.dialogRule.forms = JSON.parse(JSON.stringify(row));
      }
      this.dialogVisible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleDeleteRule(id, index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          alertRuleDelete({
            id: id,
          }).then((res) => {
            this.dialogRule.forms.alertRuleList.splice(index, 1);
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
.dialog-content {
  display: grid;
  gap: 20px;
  .rule-list {
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    overflow: auto;
  }
}

::v-deep {
  .dialog-img {
    background: #0b2a52;
    .el-dialog__body {
    }
    .el-dialog__header {
    }
  }
}
</style>
