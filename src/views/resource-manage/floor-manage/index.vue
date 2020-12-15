<template>
  <div class="app-container floor-manage" v-if="showPage">       
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-if="hasAuth">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
      >
        <el-form-item>
          <!-- <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          ></el-button>-->
          <!-- <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          > -->
          <el-button type="primary" size="medium" @click="handleDialog()">
            <!-- 不能写未handleDialog否则第一个参数会自动传鼠标事件 -->
            <i class="el-icon-plus" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
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
      <el-table-column prop="floorCode" label="楼层编号" />
      <el-table-column prop="name" label="楼层名称" />
      <el-table-column prop="imgUrl" label="预览图">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="mini"
            @click="
              dialogImgVisible = true;
              dialogImgUrl = row.imgUrl;
            "
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column sortable prop="sort" label="排序" />
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
    v-if="hasAuth"
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />
    <!-- 图片弹窗 -->
    <el-dialog custom-class="dialog-img" :visible.sync="dialogImgVisible">
      <img class="preview-img" :src="dialogImgUrl" alt="加载失败" />
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">{{ dialog.forms.id ? "编辑" : "新增" }}</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="150px"
      >
        <el-form-item label="楼层编号" prop="floorCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.floorCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="楼层名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dialog.forms.sort"></el-input>
        </el-form-item>
        <el-form-item label="预览图" prop="imgUrl" v-if="dialog.visible">
          <!-- v-if="dialog.visible" 文件上传独立于表单,需手动销毁重生 -->
          <div class="preview-grid">
            <el-upload
              ref="upload"
              name="attach"
              class="upload-container"
              :headers="headers"
              :action="uploadUrl"
              :data="uploadData"
              :on-success="uploadSuccess"
              :on-remove="fileRemove"
              :limit="1"
              drag
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                点击 <em>上传文件</em> 或拖拽上传
              </div>
            </el-upload>
            <img
              class="preview-img"
              v-if="dialog.forms.imgUrl"
              :src="dialog.forms.imgUrl"
              alt="图片加载失败"
            />
          </div>
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
import { isIntNumber } from "@/common.js";
import pagination from "@/components/Pagination";
import {
  spaceFloorListByPage,
  spaceFloorDelete,
  spaceFloorEdit,
  spaceFloorAdd,
  // 未用到
  spaceFloorListAll,
  spaceFloorQueryById,
} from "@/api/resource-manage.js";

// 上传
import { uploadUrl } from "@/api/common";
import { getToken } from "@/utils/auth";

export default {
  components: { pagination },
  data() {
     return {
      showPage:false,
      hasAuth: true,
      // 上传
      uploadedFileUrl: "", // 附件ID数组
      headers: {
        token: getToken(),
      },
      uploadData: {
        type: 1 /*  type 1是楼层图片，2是房间图片，3是设备组图片 */,
      },
      uploadUrl,
      /* --- */
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
      dialogImgVisible: false,
      dialogImgUrl: "",
      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          floorCode: [{ required: true, trigger: "blur", message: "请输入" }],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          imgUrl: [{ required: true, message: "请上传图片" }],
          sort: [{ required: true, trigger: "blur", validator: isIntNumber }],
        },
      },
    };
  },
  created() {
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
            callAPI = spaceFloorEdit;
          } else {
            callAPI = spaceFloorAdd;
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
      document.activeElement.blur();
      this.$refs[form].resetFields();
      this.handleQuery();
    },
    // 查看
    handleDialog(row) {
      if (row) {
        // 编辑
        this.dialog.forms = JSON.parse(JSON.stringify(row));
      } else {
        this.dialog.forms = { imgUrl: "" }; //让imgUrl变响应式validateField才有效
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
          spaceFloorDelete({
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
      spaceFloorListByPage(this.filterForm).then((res) => {
        this.hasAuth = true;
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      }).catch(e=>{
        this.hasAuth = false;
      }).finally(_=>{
        this.showPage = true;
      });;
    },
  },
};
</script>

<style lang="scss" scoped>
.floor-manage {
  display: grid;
  grid-template-rows: 60px auto 55px;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
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
  border-radius: 5px;
}

::v-deep {
  .dialog-img {
    background: #0b2a52;
    .el-dialog__body {
      display: grid;
      padding: 0 20px 30px 30px;
      margin-top: -20px;
    }
    .el-dialog__header {
      // display: none;
    }
  }
}
</style>
