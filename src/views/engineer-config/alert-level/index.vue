<template>
  <div class="auth-manage">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    
    <!-- 筛选条件 -->
    <div class="head"  v-auth="1023">
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
     v-auth="1023"
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column prop="level" label="级别" />
      <!-- <template slot-scope="{ row }">
          <div>
            {{
              levelOpts.find((i) => i.id == row.level) &&
              levelOpts.find((i) => i.id == row.level).name
            }}
          </div>
        </template>
      </el-table-column> -->

      <el-table-column prop="name" label="自定义名称" />
      <el-table-column prop="noteType" label="通知方式">
        <template slot-scope="{ row }">
          <span v-if="row.noteType == 1">语音</span>
          <span v-else>文字</span>
        </template>
      </el-table-column>
      <el-table-column prop="noteContent" label="通知内容">
        <template slot-scope="{ row }">
          <div v-for="item in row.noteContent" :key="item">
            {{
              noteContentOpts.find((i) => i.id == item) &&
              noteContentOpts.find((i) => i.id == item).name
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: gray" v-else>禁用</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="161">
        <template slot-scope="{ row }">
          <el-button
            title="编辑"
            icon="el-icon-edit-outline"
            type="primary"
            plain
            @click="handleDialog(row)"
          ></el-button>
          <el-button
            v-if="!(row.level > 0 && row.level < 6)"
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
     v-auth="1023"
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
        <el-form-item label="级别" prop="level">
          <el-input
            :disabled="dialog.forms.level < 6 && dialog.forms.level > 0"
            v-model="dialog.forms.level"
          ></el-input>
          <!-- <el-select
            filterable
            allow-create
            default-first-option
            v-model="dialog.forms.level"
          >
            <el-option
              v-for="item in levelOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select> -->
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input
            :disabled="dialog.forms.level < 6 && dialog.forms.level > 0"
            v-model="dialog.forms.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="通知方式" prop="noteType">
          <el-radio-group v-model="dialog.forms.noteType" style="width: 100%">
            <el-radio border :label="1">语音</el-radio>
            <el-radio border :label="2">文字</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="通知内容" prop="noteContent">
          <el-checkbox-group
            class="rooms-el-checkbox-group"
            v-model="dialog.forms.noteContent"
          >
            <el-checkbox
              v-for="item in noteContentOpts"
              :key="item.id"
              :label="item.id"
              border
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group
            class="radio-status"
            v-model="dialog.forms.status"
            style="width: 100%"
          >
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="0" style="color: gray">禁用</el-radio>
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
import { isIntNumber } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  alertLevelQueryById,
  alertLevelListByPage,
  alertLevelDelete,
  alertLevelEdit,
  alertLevelAdd,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      hasAuth: false,
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
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = alertLevelEdit;
          } else {
            callAPI = alertLevelAdd;
          }
          this.dialog.forms.level = +this.dialog.forms.level;
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
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
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
          alertLevelDelete({
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
      alertLevelListByPage(this.filterForm).then((res) => {
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
.auth-manage {
  display: grid;
  grid-template-rows: 60px auto 55px;
  // background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: calc(100vh - 260px);
}
.head {
  display: grid;
  justify-content: end;
}
</style>
