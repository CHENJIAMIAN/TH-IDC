<template>
  <div class="app-container room-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="测点类型名称" />
        </el-form-item>
        <el-form-item prop="deviceTypeId">
          <el-select
            clearable
            v-model="filterForm.deviceTypeId"
            placeholder="设备类型"
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
      <el-table-column sortable prop="name" label="测点类型名称" />
      <el-table-column sortable prop="deviceTypeName" label="设备类型名称" />
      <el-table-column sortable prop="units" label="单位" />
      <el-table-column sortable prop="valueType" label="值类型" >
          <template slot-scope="{ row }">
          <span>{{ row.valueType | capitalize }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="columnName" label="字段名" />


      
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
    <!-- 图片弹窗 -->
    <el-dialog custom-class="dialog-img"   :visible.sync="dialogImgVisible" :show-close="false">
          <img class="preview-img" :src="dialogImgUrl" alt="加载失败">
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">{{
          dialog.forms.id ? "编辑" : "新增"
        }}</span>
        <img  src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="150px"
      >
        <el-form-item label="测点类型名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
        <el-form-item label="设备类型" prop="deviceTypeId">
          <el-select v-model="dialog.forms.deviceTypeId"
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
          <el-select v-model="dialog.forms.valueType">
            <el-option
              v-for="item in valueTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
        <el-form-item label="单位" prop="units">
          <el-input v-model="dialog.forms.units"></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="columnName">
          <el-input @keyup.enter.native="dialogSubmit" v-model="dialog.forms.columnName"></el-input>
        </el-form-item>
        </div>

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
import { valueTypeOpts, isIntNumber } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  deviceTypeListAll,
  pointTypeDelete,
  pointTypeEdit,
  pointTypeAdd,
  pointTypeListByPage,
  pointTypeQueryById,
  spaceRoomTypeListAll,
} from "@/api/resource-manage.js";

// 上传
import { uploadUrl } from "@/api/common";
import { getToken } from "@/utils/auth";

export default {
  components: { pagination },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return valueTypeOpts.find(i=>i.id==value).name;
    },
  },
  data() {
    return {
      // 上传
      uploadedFileUrl: "", // 附件ID数组
      headers: {
        token: getToken(),
      },
      uploadData: {
        type: 2 /*  type 1是楼层图片，2是测点类型图片，3是设备组图片 */,
      },
      uploadUrl,
      /* --- */
      valueTypeOpts,
      deviceTypeOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        name: "",
        deviceTypeId: null,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
      dialogImgVisible:false,
      dialogImgUrl:"",
      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceTypeId: [{ required: true, trigger: "blur", message: "请输入" }],
          columnName: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {},
  created() {
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    // 附件上传成功
    uploadSuccess(response, file, fileList) {
      if (response.res === 0) {
        this.dialog.forms.imgUrl = response.data.filePath;
        this.$message.success("上传成功!");
      } else {
        this.$message.error(response.msg);
      }
      this.$refs["dialogForm"].validateField("imgUrl");
    },
    // 附件删除
    fileRemove(file, fileList) {
      this.dialog.forms.imgUrl = "";
      this.$refs["dialogForm"].validateField("imgUrl");
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = pointTypeEdit;
          } else {
            callAPI = pointTypeAdd;
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
      } else {
        this.dialog.forms = { imgUrl: "" }; //让imgUrl变响应式validateField才有效
      }
      this.dialog.visible = true;      this.$nextTick(_=>this.$refs["dialogForm"].clearValidate());
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          pointTypeDelete({
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
      pointTypeListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.room-manage {
  display: grid;
  grid-template-rows: 60px auto 70px;
  // background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: calc(100vh - 260px);
  // height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}

.preview-grid {
  display: grid;
  grid-template-columns: 50% auto;
  gap: 1rem;
  grid-template-rows: 200px;
}

.preview-img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  justify-self: center;
  align-self: center;
}

  ::v-deep{
.dialog-img{
  background: #0b2a52;
  .el-dialog__body{
    display: grid;
    padding: 30px 20px 30px;
  }
  .el-dialog__header{
    display: none;
  }
  }
}
</style>
