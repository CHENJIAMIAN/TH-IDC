<template>
  <div class="app-container auth-manage">
    <!-- 筛选条件 -->
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
      <el-table-column prop="level" label="告警等级">
        <template slot-scope="{ row }">
          <div>
            {{
              levelOpts.find((i) => i.id == row.level) &&
              levelOpts.find((i) => i.id == row.level).name
            }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="levelName" label="告警等级名称" /> -->

      <el-table-column prop="step1" label="步骤1">
        <template slot-scope="{ row }">
          <div v-for="item in row.step1" :key="item+Math.random()">
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
          <div v-for="item in row.step2" :key="item+Math.random()">
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
          <div v-for="item in row.step3" :key="item+Math.random()">
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
          <div v-for="item in row.step4" :key="item+Math.random()">
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

    <el-dialog :visible.sync="dialog.visible" top="20vh">
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
        <el-form-item label="告警等级" prop="level">
          <el-select filterable v-model="dialog.forms.level">
            <el-option
              v-for="item in levelOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="可选项(拖动)" prop="step1">
          <DragStep
            :key="1"
            :list="list0"
            group="mission"
            class="kanban todo"
            @end="list0 = deepClone(noteModeOpts)"
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
          <DragStep :key="1" :list="list1" group="mission" class="kanban todo" />
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
          <DragStep :key="2" :list="list2" group="mission" class="kanban" />
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
          <DragStep :key="3" :list="list3" group="mission" class="kanban done" />
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
            :key="4"
            :list="list4"
            group="mission"
            class="kanban working"
          />
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
} from "@/api/engineer-config.js";
export default {
  components: { pagination, DragStep },
  data() {
    return {
      deepClone,
      noteModeOpts,
      list0: deepClone(noteModeOpts),
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      depOpts: [],
      levelOpts: [
        { id: 1, name: "紧急" },
        { id: 2, name: "严重" },
        { id: 3, name: "重要" },
        { id: 4, name: "次要" },
        { id: 5, name: "预警" },
      ],
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
        forms: {},
        rules: {
          level: [{ required: true, trigger: "blur", validator: isIntNumber }],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          noteType: [{ required: true, trigger: "blur", message: "请输入" }],
          noteContent: [{ required: true, trigger: "blur", message: "请输入" }],
          status: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {},
  async created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          this.dialog.forms.step1 = this.list1.map((i) => i.id);
          this.dialog.forms.step2 = this.list2.map((i) => i.id);
          this.dialog.forms.step3 = this.list3.map((i) => i.id);
          this.dialog.forms.step4 = this.list4.map((i) => i.id);

          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = alertStrategyEdit;
          } else {
            callAPI = alertStrategyAdd;
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
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
        this.list1 = this.dialog.forms.step1.map((i) =>
          noteModeOpts.find((ii) => ii.id === i)
        );
        this.list2 = this.dialog.forms.step2.map((i) =>
          noteModeOpts.find((ii) => ii.id === i)
        );
        this.list3 = this.dialog.forms.step3.map((i) =>
          noteModeOpts.find((ii) => ii.id === i)
        );
        this.list4 = this.dialog.forms.step4.map((i) =>
          noteModeOpts.find((ii) => ii.id === i)
        );
      } else {
        this.dialog.forms = { status: 1 };
        this.$set(this.dialog.forms, "noteContent", []);
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
