<template>
  <div class="app-container system-log">
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
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>

    <!-- 
id 复制[int]	是	日志ID		
userId	[int]	是	操作人ID	 展开	
userName	[string]	是	操作人账号		
realName	[string]	是	操作人姓名		
moduleName	[string]	是	模块名称		
moduleMethod	[string]	是	模块方法		
userIp	[string]		操作人IP		
description	[string]		描述		
logType	[short]	是	日志类型 。1是正常日志，2是异常日志		
createTime	[string]	是	创建时间		
takeTime	[long]	是	耗时时间（毫秒）  -->
    <!-- 列表 -->
    <el-table
      style="overflow: auto"
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
      <el-table-column sortable prop="takeTime" label="耗时（毫秒）" />

    </el-table>
    <pagination
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

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
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
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
