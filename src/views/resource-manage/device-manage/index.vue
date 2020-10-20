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
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >设备管理重置</el-button
          >
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
      <!-- <el-table-column label="操作" align="center" width="240">
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
      </el-table-column> -->
    </el-table>
    <pagination
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

    <!-- 详情弹窗 -->
    <el-dialog v-if="dialog.visible" :visible.sync="dialog.visible">
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
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="dialog.forms.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!dialog.forms.id">
          <el-input v-model="dialog.forms.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="realName">
          <el-input v-model="dialog.forms.realName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="dialog.forms.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialog.forms.email"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="dialog.forms.wechat"></el-input>
        </el-form-item>
        <el-form-item label="钉钉" prop="dingtalk">
          <el-input v-model="dialog.forms.dingtalk"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input v-model="dialog.forms.remarks"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-radio-group v-model="dialog.forms.status" style="width: 100%">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
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
import { sysLogQueryById, sysLogListByPage } from "@/api/resource-manage.js";

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
      // 收款信息弹窗
      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {},
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
