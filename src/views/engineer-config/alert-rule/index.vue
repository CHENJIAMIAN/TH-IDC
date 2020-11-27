<template>
  <div class="app-container department-manage">
    <div class="page1" v-if="!dialogVisible">
      <!-- 筛选条件 -->
      <div class="head">
        <el-form
          ref="filterForm"
          :inline="true"
          size="medium"
          :model="filterForm"
        >
          <el-form-item prop="name">
            <el-input
              v-model.trim="filterForm.name"
              placeholder="测点类型名称"
            />
          </el-form-item>
          <el-form-item prop="deviceTypeId">
            <el-select
              clearable
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
        style="width: 100%"
        height="100%"
        stripe
        v-loading="listLoading"
        border
        :data="listData"
      >
        <el-table-column prop="name" label="测点类型名称" />
        <!-- <el-table-column sortable prop="deviceTypeId" label="设备类型ID" /> -->
        <el-table-column prop="units" label="单位" width="80"/>
        <el-table-column prop="valueType" label="值类型">
          <template slot-scope="{ row }">
            {{
              valueTypeOpts.find((i) => i.id == row.valueType) &&
              valueTypeOpts.find((i) => i.id == row.valueType).name
            }}
          </template>
        </el-table-column>
        <el-table-column prop="columnName" label="字段名" />
        <el-table-column prop="deviceTypeName" label="设备类型名称" />
        <el-table-column prop="count" label="告警规则条数" />

        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="{ row }">
            <el-button
              title = "编辑"
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
    </div>

    <div v-else class="page2">
      <div class="dialog-content">
        <div class="measure-point-info">
          <el-card class="custom-card">
            <el-form
              :model="cdForm.forms"
              :rules="cdForm.rules"
              ref="cdForm"
              style="pointer-events: none"
              size="mini"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: -20px;
                "
              >
                <el-form-item label="测点类型名称" prop="name">
                  <!-- <el-input v-model="cdForm.forms.name"></el-input> -->
                  {{ cdForm.forms.name }}
                </el-form-item>

                <el-form-item label="设备类型" prop="deviceTypeId">
                  {{
                    deviceTypeOpts.find(
                      (i) => i.id == cdForm.forms.deviceTypeId
                    ) &&
                    deviceTypeOpts.find(
                      (i) => i.id == cdForm.forms.deviceTypeId
                    ).name
                  }}
                  <!-- <el-select
                    v-model="cdForm.forms.deviceTypeId"
                    popper-class="three-column"
                  >
                    <el-option
                      v-for="item in deviceTypeOpts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select> -->
                </el-form-item>

                <el-form-item label="值类型" prop="valueType">
                  {{
                    valueTypeOpts.find((i) => i.id == cdForm.forms.valueType) &&
                    valueTypeOpts.find((i) => i.id == cdForm.forms.valueType)
                      .name
                  }}
                  <!-- <el-select v-model="cdForm.forms.valueType">
                    <el-option
                      v-for="item in valueTypeOpts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select> -->
                </el-form-item>

                <el-form-item label="单位" prop="units">
                  <!-- <el-input v-model="cdForm.forms.units"></el-input> -->
                  {{ cdForm.forms.units || "无" }}
                </el-form-item>
                <el-form-item label="字段名" prop="columnName">
                  <!-- <el-input v-model="cdForm.forms.columnName"></el-input> -->
                  {{ cdForm.forms.columnName || "无" }}
                </el-form-item>
              </div>
            </el-form>
          </el-card>
        </div>

        <div class="rule-list">
          <el-card
            class="custom-card"
            style="width: 340px"
            v-for="(alertRule, index) in cdForm.forms.alertRuleList"
            :key="index"
          >
            <el-form
              :model="cdForm.forms.alertRuleList[index]"
              :rules="cdForm.ruleForm.rules"
              :ref="`ruleForm${index}`"
              label-width="120px"
              size="mini"
              class="custom-rule-form"
            >
              <el-form-item label="告警算法" prop="alertAlgorithm">
                <el-select
                  v-model="cdForm.forms.alertRuleList[index].alertAlgorithm"
                  style="width: 100%"
                >
                  <el-option border label="阈值算法" :value="1"></el-option>
                  <el-option border label="中断算法" :value="2"></el-option>
                  <el-option border label="故障算法" :value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="alertOperator" label="告警运算符">
                <el-select
                  v-model="cdForm.forms.alertRuleList[index].alertOperator"
                  style="width: 100%"
                >
                  <el-option border label="大于" :value="1"></el-option>
                  <el-option border label="小于" :value="2"></el-option>
                  <el-option border label="等于" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="alertOperatorValue" label="告警运算值">
                <el-input
                  v-model="cdForm.forms.alertRuleList[index].alertOperatorValue"
                ></el-input>
              </el-form-item>
              <el-form-item prop="recoverOperator" label="恢复运算符">
                <el-select
                  v-model="cdForm.forms.alertRuleList[index].recoverOperator"
                  style="width: 100%"
                >
                  <el-option border label="大于" :value="1"></el-option>
                  <el-option border label="小于" :value="2"></el-option>
                  <el-option border label="等于" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="recoverOperatorValue" label="恢复运算值">
                <el-input
                  v-model="
                    cdForm.forms.alertRuleList[index].recoverOperatorValue
                  "
                ></el-input>
              </el-form-item>

              <el-form-item prop="alertType" label="告警类型">
                <el-select
                  v-model="cdForm.forms.alertRuleList[index].alertType"
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

              <el-form-item prop="alertLevelId" label="告警等级">
                <el-select
                  v-model="cdForm.forms.alertRuleList[index].alertLevelId"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in alertLevelOpts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="filterTime" label="闪烁过滤时间(秒)">
                <el-input
                  v-model="cdForm.forms.alertRuleList[index].filterTime"
                ></el-input>
              </el-form-item>
              <el-form-item prop="continueTime" label="持续超限时间(秒)">
                <el-input
                  v-model="cdForm.forms.alertRuleList[index].continueTime"
                ></el-input>
              </el-form-item>
              <el-form-item prop="alertContent" label="告警内容">
                <el-input
                  v-model="cdForm.forms.alertRuleList[index].alertContent"
                ></el-input>
              </el-form-item>
              <el-form-item prop="handlerAdvise" label="处理建议">
                <el-input
                  v-model="cdForm.forms.alertRuleList[index].handlerAdvise"
                ></el-input>
              </el-form-item>

              <el-form-item label="状态" prop="status">
                <el-radio-group
                  class="radio-status"
                  v-model="cdForm.forms.alertRuleList[index].status"
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
                type="primary"
                plain
                size="mini"
                @click="
                  handleDeleteRule(cdForm.forms.alertRuleList[index].id, index)
                "
                >删除规则</el-button
              >
              <el-button
                type="primary"
                :disabled="cdForm.forms.alertRuleList[index].diabledSave"
                size="mini"
                @click="
                  dialogSubmitRule(cdForm.forms.alertRuleList[index].id, index)
                "
                >保存规则</el-button
              >
            </div>
          </el-card>
          <el-button
            style="width: 200px"
            icon="el-icon-plus"
            type="primary"
            size="medium"
            @click="
              cdForm.forms.alertRuleList.push({ status: 1, diabledSave: false })
            "
          >
            添加规则
          </el-button>
        </div>
      </div>

      <div style="text-align: center; transform: translate(0px, 10px)">
        <el-button style="width: 200px" @click="handleClose">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { valueTypeOpts, isIntNumber } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  alertRuleDelete,
  alertRuleEdit,
  alertRuleAdd,
  alertRuleListByPage,
  // 未用到
  alertRuleListByPointTypeId,
  alertRuleQueryById,
  alertLevelListAll,
} from "@/api/engineer-config.js";
import {
  deviceTypeListAll,
  pointTypeQueryById,
} from "@/api/resource-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      valueTypeOpts,
      dialogVisible: false,
      pointTypeOpts: [],
      alertLevelOpts: [],
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

      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数

      cdForm: {
        forms: {
          alertRuleList: [{ status: 1, diabledSave: false }],
        },
        rules: {},
        ruleForm: {
          forms: {},
          rules: {
            pointTypeId: [
              { required: true, trigger: "blur", message: "请输入" },
            ],
            alertAlgorithm: [
              { required: true, trigger: "blur", message: "请输入" },
            ],
            alertOperator: [
              { required: true, trigger: "blur", message: "请输入" },
            ],
            alertOperatorValue: [
              { required: true, trigger: "blur", message: "请输入" },
              {
                pattern: /^-?\d+\.?\d*$/,
                message: "只能输入数字和小数",
                trigger: "blur",
              },
            ],
            recoverOperator: [
              { required: true, trigger: "blur", message: "请输入" },
            ],
            recoverOperatorValue: [
              { required: true, trigger: "blur", message: "请输入" },
              {
                pattern: /^-?\d+\.?\d*$/,
                message: "只能输入数字和小数",
                trigger: "blur",
              },
            ],
            // alertType: [{ required: true, trigger: "blur", message: "请输入" }],
            alertLevelId: [
              { required: true, trigger: "blur", message: "请输入" },
            ],
            filterTime: [
              { required: false, trigger: "blur", validator: isIntNumber },
            ],
            continueTime: [
              { required: false, trigger: "blur", validator: isIntNumber },
            ],
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
      },
    };
  },
  created() {
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    alertLevelListAll().then((r) => (this.alertLevelOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.handleQuery();
    },
    dialogSubmitRule(id, index) {
      this.$refs[`ruleForm${index}`][0].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          const rule = this.cdForm.forms.alertRuleList[index];
          this.$set(rule, "diabledSave", true);
          if (rule.filterTime === "") delete rule.filterTime;
          if (rule.continueTime === "") delete rule.continueTime;
          if (id) {
            delete this.cdForm.forms.alertRuleList[index].createTime;
            callAPI = alertRuleEdit;
          } else {
            callAPI = alertRuleAdd;
          }
          this.cdForm.forms.alertRuleList[
            index
          ].pointTypeId = this.cdForm.forms.id;
          callAPI(this.cdForm.forms.alertRuleList[index])
            .then((res) => {
              rule.diabledSave =false;
              this.cdForm.forms.alertRuleList[index].id = res.data.id;
              this.$message.success("操作成功!");
              // this.dialogVisible = false;
              // this.$refs["dialogForm"].resetFields();
              // this.getList();
            })
            .catch((e) => {
              rule.diabledSave =false;
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
        // pointTypeQueryById({ id: row.id }).then(
        //   (r) => (this.cdForm.forms = r.data)
        // );
        alertRuleListByPointTypeId({ id: row.id }).then((r) => {
          this.cdForm.forms = r.data;
          if (this.cdForm.forms.alertRuleList.length < 1) {
            this.cdForm.forms.alertRuleList = [
              { status: 1, diabledSave: false },
            ]; //默认显示一个
          }
        });
      }
      this.dialogVisible = true;
      // this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleDeleteRule(id, index) {
      if (!id) {
        this.cdForm.forms.alertRuleList.splice(index, 1);
        return;
      }
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          alertRuleDelete({
            id: id,
          }).then((res) => {
            this.cdForm.forms.alertRuleList.splice(index, 1);
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
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
  .page1 {
    display: grid;
    grid-template-rows: 60px auto 55px;
    height: 100%;
  }
  .page2 {
    display: grid;
    grid-template-rows: auto 60px;
    align-items: center;
    height: 100%;
  }
}
.head {
  display: grid;
  justify-content: end;
}
.dialog-content {
  display: grid;
  gap: 10px;
  height: 100%;
  overflow: auto;
  padding-right: 5px;
  .rule-list {
    display: flex;
    gap: 40px 10px;
    flex-flow: wrap;
  }
}

::v-deep {
  .custom-rule-form {
    .el-form-item--mini.el-form-item {
      margin-bottom: 13px;
    }
  }

  .custom-card {
    .el-card__body {
      padding: 10px;
    }
  }
}
</style>
