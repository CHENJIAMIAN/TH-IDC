<template>
  <div class="app-container system-log">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="userName">
          <el-input v-model.trim="filterForm.userName" placeholder="操作人账号" />
        </el-form-item>
        <el-form-item prop="realName">
          <el-input v-model.trim="filterForm.realName" placeholder="操作人姓名" />
        </el-form-item>
        <el-form-item prop="moduleName">
          <el-input v-model.trim="filterForm.moduleName" placeholder="模块名称" />
        </el-form-item>
        <el-form-item prop="moduleMethod">
          <el-input v-model.trim="filterForm.moduleMethod" placeholder="模块方法" />
        </el-form-item>
        <el-form-item prop="logType">
          <el-select
            clearable
            v-model="filterForm.logType"
            placeholder="日志类型"
          >
            <el-option label="正常日志" :value="1" />
            <el-option label="异常日志" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item prop="startDate_endDate">
          <el-date-picker
            style="width: 240px"
            v-model="filterForm.startDate_endDate"
            type="daterange"
            placeholder="时间范围"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>
        </el-form-item>
        <el-form-item>
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
      <el-table-column sortable prop="userName" label="操作人账号" />
      <el-table-column sortable prop="realName" label="操作人" />
      <el-table-column sortable prop="moduleName" label="模块名称" />
      <el-table-column
        sortable
        prop="moduleMethod"
        label="模块方法"
        width="250"
      />
      <el-table-column sortable prop="userIp" label="操作人IP" />
      <el-table-column sortable prop="description" label="描述" />
      <el-table-column sortable prop="logType" label="日志类型">
        <template slot-scope="{ row }">
          <span v-if="row.logType == 1">正常日志</span>
          <span v-else-if="row.logType == 2">异常日志</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间"
        width="180"
      />
      <el-table-column sortable prop="takeTime" label="耗时(毫秒)" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-view"
            type="primary"
            plain
            @click="handleDialog(row)"
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
    <el-dialog :visible.sync="dialog.visible" top="25vh" center>
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">详情</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="150px"
      >
        <el-form-item label="操作人ID" prop="userId">
          {{ dialog.forms.userId }}
        </el-form-item>
        <el-form-item label="操作人账号" prop="userName">
          {{ dialog.forms.userName }}
        </el-form-item>
        <el-form-item label="操作人姓名" prop="realName">
          {{ dialog.forms.realName }}
        </el-form-item>
        <el-form-item label="模块名称" prop="moduleName">
          {{ dialog.forms.moduleName }}
        </el-form-item>
        <el-form-item label="模块方法" prop="moduleMethod">
          {{ dialog.forms.moduleMethod }}
        </el-form-item>
        <el-form-item label="操作人IP" prop="userIp">
          {{ dialog.forms.userIp }}
        </el-form-item>
        <el-form-item label="描述" prop="description">
          {{ dialog.forms.description }}
        </el-form-item>
        <el-form-item label="日志类型" prop="logType">
          <template>
            <div v-if="dialog.forms.logType == 1">正常日志</div>
            <div v-if="dialog.forms.logType == 2">异常日志</div>
          </template>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          {{ dialog.forms.createTime }}
        </el-form-item>
        <el-form-item label="耗时(毫秒)" prop="takeTime">
          {{ dialog.forms.takeTime }}
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogSubmit"
          >保 存</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { sysLogQueryById, sysLogListByPage } from "@/api/system-manage.js";

export default {
  components: { pagination },
  data() {
    return {
      filterForm: {
        // 筛选条件
        userName: "",
        realName: "",
        moduleName: "",
        moduleMethod: "",
        logType: null,
        startTime: null,
        endTime: null,
        startDate_endDate: [],
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
          // name: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {
    "filterForm.startDate_endDate"(n, o) {
      this.filterForm.startTime = n[0];
      this.filterForm.endTime = n[1];
    },
  },
  created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    // 查看
    async handleDialog(row) {
      if (row) {
        // 编辑
        const r = await sysLogQueryById({ id: row.id });
        this.dialog.forms = r.data;
      } else {
        this.dialog.forms = {};
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
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
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sysLogDelete({
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
      sysLogListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.system-log {
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
