<template>
  <div class="app-container auth-manage">
    <!-- 筛选条件 -->
    <div class="page1" v-if="!dialog.visible">
      <div class="head">
        <el-form
          ref="filterForm"
          :inline="true"
          size="medium"
          :model="filterForm"
          style="display: grid; grid-auto-flow: column"
        >
          <el-form-item>
            <!-- <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          > -->
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
        style="width: 100%"
        height="100%"
        stripe
        v-loading="listLoading"
        border
        :data="listData"
      >
        <el-table-column prop="levelId" label="告警等级" />
        <el-table-column prop="levelName" label="告警等级名称">
          <template slot-scope="{ row }">
            <div>
              {{ row.levelName || "无" }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="step1" label="步骤1">
          <template slot-scope="{ row }">
            <div v-for="item in row.step1" :key="item + Math.random()">
              <div>
                {{
                  noteModeOpts.find((i) => i.id == item) &&
                  noteModeOpts.find((i) => i.id == item).name
                }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="step2" label="步骤2">
          <template slot-scope="{ row }">
            <div v-for="item in row.step2" :key="item + Math.random()">
              <div>
                {{
                  noteModeOpts.find((i) => i.id == item) &&
                  noteModeOpts.find((i) => i.id == item).name
                }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="step3" label="步骤3">
          <template slot-scope="{ row }">
            <div v-for="item in row.step3" :key="item + Math.random()">
              <div>
                {{
                  noteModeOpts.find((i) => i.id == item) &&
                  noteModeOpts.find((i) => i.id == item).name
                }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="step4" label="步骤4">
          <template slot-scope="{ row }">
            <div v-for="item in row.step4" :key="item + Math.random()">
              <div>
                {{
                  noteModeOpts.find((i) => i.id == item) &&
                  noteModeOpts.find((i) => i.id == item).name
                }}
              </div>
            </div>
          </template>
        </el-table-column>

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
    </div>

    <div v-else class="page2">
      <div class="page2-form">
        <el-form
          :model="dialog.forms"
          :rules="dialog.rules"
          ref="dialogForm"
          label-width="100px"
        >
          <el-form-item label="告警等级" prop="levelId">
            <el-select filterable v-model="dialog.forms.levelId">
              <el-option
                v-for="item in alertLevelOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="可选项(拖动)" prop="step1">
            <DragStep
              v-if="dialog.visible"
              :key="0"
              :list="step0"
              group="mission"
              class="kanban todo"
              @end="step0 = deepClone(noteModeOpts)"
            />
          </el-form-item>

          <el-form-item label="步骤1" prop="step1">
            <!-- <el-select multiple v-model="dialog.forms.step1">
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select> -->
            <DragStep
              v-if="dialog.visible"
              :key="1"
              :list="dialog.forms.step1"
              group="mission"
              class="kanban todo"
            />
          </el-form-item>
          <el-form-item label="步骤2" prop="step2">
            <!-- <el-select multiple v-model="dialog.forms.step2">
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select> -->
            <DragStep
              v-if="dialog.visible"
              :key="2"
              :list="dialog.forms.step2"
              group="mission"
              class="kanban"
            />
          </el-form-item>
          <el-form-item label="步骤3" prop="step3">
            <!-- <el-select multiple v-model="dialog.forms.step3">
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select> -->
            <DragStep
              v-if="dialog.visible"
              :key="3"
              :list="dialog.forms.step3"
              group="mission"
              class="kanban done"
            />
          </el-form-item>
          <el-form-item label="步骤4" prop="step4">
            <!-- <el-select multiple v-model="dialog.forms.step4">
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select> -->
            <DragStep
              v-if="dialog.visible"
              :key="4"
              :list="dialog.forms.step4"
              group="mission"
              class="kanban working"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center; transform: translate(0px, 10px)">
        <el-button style="width: 200px" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
        <el-button style="width: 200px" @click="handleClose">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DragStep from "@/components/DragStep";
import { isIntNumber, noteModeOpts } from "@/views/resource-manage/common.js";
import { deepClone } from "@/utils";
import pagination from "@/components/Pagination";
import {
  alertStrategyQueryById,
  alertStrategyListByPage,
  alertStrategyDelete,
  alertStrategyEdit,
  alertStrategyAdd,
  alertLevelListAll,
} from "@/api/engineer-config.js";
export default {
  components: { pagination, DragStep },
  data() {
    return {
      deepClone,
      noteModeOpts,
      step0: deepClone(noteModeOpts),
      depOpts: [],
      alertLevelOpts: [],
      noteContentOpts: [
        { id: "1", name: "时间" },
        { id: "2", name: "位置" },
        { id: "3", name: "内容" },
        { id: "4", name: "告警值" }, //后台返回的id是用string的
      ],
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
        forms: {
          step1: [],
          step2: [],
          step3: [],
          step4: [],
        },
        rules: {
          levelId: [
            { required: true, trigger: "blur", validator: isIntNumber },
          ],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {},
  async created() {
    alertLevelListAll().then((r) => (this.alertLevelOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handleClose() {
      this.dialog.visible = false;
      this.handleQuery();
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          this.dialog.forms.step1 = this.dialog.forms.step1.map((i) => i.id);
          this.dialog.forms.step2 = this.dialog.forms.step2.map((i) => i.id);
          this.dialog.forms.step3 = this.dialog.forms.step3.map((i) => i.id);
          this.dialog.forms.step4 = this.dialog.forms.step4.map((i) => i.id);

          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = alertStrategyEdit;
          } else {
            callAPI = alertStrategyAdd;
          }
          callAPI(this.dialog.forms)
            .then((res) => {
              this.$message.success("操作成功!");
              this.$refs["dialogForm"].resetFields();
              this.dialog.visible = false;
              this.getList();
            })
            .catch((e) => {
              // 为防止异常,step1又被替换了,会异常
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
      this.dialog.forms.listTotal = 0;
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
        const { step1, step2, step3, step4 } = this.dialog.forms;
        const step11 = step1.map((i) => noteModeOpts.find((ii) => ii.id === i));
        const step22 = step2.map((i) => noteModeOpts.find((ii) => ii.id === i));
        const step33 = step3.map((i) => noteModeOpts.find((ii) => ii.id === i));
        const step44 = step4.map((i) => noteModeOpts.find((ii) => ii.id === i));
        this.$set(this.dialog.forms, "step1", step11);
        this.$set(this.dialog.forms, "step2", step22);
        this.$set(this.dialog.forms, "step3", step33);
        this.$set(this.dialog.forms, "step4", step44);
      } else {
        this.dialog.forms = this.$options.data().dialog.forms;
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
          alertStrategyDelete({
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
      alertStrategyListByPage(this.filterForm).then((res) => {
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
  height: 100%;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;

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
    &-form {
      margin-right: 50%;
      transform: translate(70%, 0px);
    }
  }
}
.head {
  display: grid;
  justify-content: end;
}
</style>
