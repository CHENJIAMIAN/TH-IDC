<template>
  <div class="app-container menu-manage" v-if="showPage">       
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-if="hasAuth">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="noteLevel">
          <el-select
            clearable
            v-model="filterForm.noteLevel"
            placeholder="通知等级"
          >
            <el-option
              v-for="item in alertLevelOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="noteMode">
          <el-select
            clearable
            v-model="filterForm.noteMode"
            placeholder="通知方式"
          >
            <el-option
              v-for="item in noteModeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="sendTarget">
          <el-input
            v-model="filterForm.sendTarget"
            placeholder="目标邮箱/号码"
          />
        </el-form-item>
        <el-form-item prop="sendContent">
          <el-input
            v-model.trim="filterForm.sendContent"
            placeholder="告警内容"
          />
        </el-form-item>

        <el-form-item prop="status">
          <el-select clearable v-model="filterForm.status" placeholder="状态">
            <el-option text-color="#55fb55" label="成功" :value="1" />
            <el-option text-color="gray" label="失败" :value="2" />
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

    <el-table
            empty-text=" "
    v-if="hasAuth"
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column prop="noteId" label="通知ID" />
      <el-table-column prop="noteLevel" label="通知等级">
        <template slot-scope="{ row }">
          {{
            alertLevelOpts.find((i) => i.id == row.noteLevel) &&
            alertLevelOpts.find((i) => i.id == row.noteLevel).name
          }}
        </template>
      </el-table-column>
      <el-table-column sortable prop="noteMode" label="通知方式">
        <template slot-scope="{ row }">
          {{
            noteModeOpts.find((i) => i.id == row.noteMode) &&
            noteModeOpts.find((i) => i.id == row.noteMode).name
          }}
        </template>
      </el-table-column>
      <el-table-column prop="toUser" label="接收者用户ID" />
      <el-table-column prop="userName" label="接收者用户名称" width="160"/>
      <el-table-column prop="sendTarget" label="目标邮箱/号码" />
      <el-table-column prop="sendContent" label="告警内容" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">成功</span>
          <span style="color: gray" v-else>失败</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
    v-if="hasAuth"
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { noteModeOpts } from "@/common.js";
import pagination from "@/components/Pagination";
import {
  alertNotificationSendListByPage,
  alertLevelListAll,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
     return {
      showPage:false,
      hasAuth: true,
      noteModeOpts,
      alertLevelOpts: [],
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        noteLevel: null,
        noteMode: null,
        sendTarget: "",
        sendContent: "",
        status: null,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
    };
  },
  watch: {},
  created() {
    alertLevelListAll().then((r) => (this.alertLevelOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
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
    // 删除
    handleResumeStatus(id) {
      this.$confirm("确认恢复状态?", "提示", {
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
      alertNotificationSendListByPage(this.filterForm).then((res) => {
        this.hasAuth = true;
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      }).catch(e=>{
        this.hasAuth = false;
      }).finally(_=>{
        this.showPage = true;
      });;;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-manage {
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
