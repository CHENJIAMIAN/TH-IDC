<template>
  <div class="app-container building-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
      >
        <el-form-item>
          <el-button icon="el-icon-upload2" type="primary" @click="handleDialog()" title="上传/修改建筑物图片"
            ></el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 图片弹窗 -->
    <img class="preview-img" :src="imgUrl" alt="加载失败" />

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible">
      <span slot="title">
        <span style="font-size: 1.5rem; font-weight: bold">建筑物图片</span>
        <img style="margin-left: 1rem" src="@/assets/img/hl.png" />
      </span>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="150px"
      >
        <el-form-item label="图片" prop="cValue" v-if="dialog.visible">
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
              v-if="dialog.forms.cValue"
              :src="dialog.forms.cValue"
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
import { sortValidator } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  configGetBuilding_bg,
  configAddOrEdit_building_bg,
} from "@/api/resource-manage.js";

// 上传
import { uploadUrl } from "@/api/common";
import { getToken } from "@/utils/auth";

export default {
  components: { pagination },
  data() {
    return {
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
      imgUrl: "",
      dialog: {
        visible: false,
        forms: {},
        rules: {
          cValue: [{ required: true, message: "请上传图片" }],
        },
      },
    };
  },
  created() {
    configGetBuilding_bg().then((r) => (this.imgUrl = r.data.imgUrl));
  },
  mounted() {},
  methods: {
    // 附件上传成功
    uploadSuccess(response, file, fileList) {
      if (response.res === 0) {
        this.dialog.forms.cValue = response.data.filePath;
        this.$message.success("上传成功!");
      } else {
        this.$message.error(response.msg);
      }
      this.$refs["dialogForm"].validateField("cValue");
    },
    // 附件删除
    fileRemove(file, fileList) {
      this.dialog.forms.cValue = "";
      this.$refs["dialogForm"].validateField("cValue");
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          configAddOrEdit_building_bg(this.dialog.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.dialog.visible = false;
            configGetBuilding_bg().then(
              (r) => (this.imgUrl = r.data.imgUrl)
            );
          });
        } else {
          return false;
        }
      });
    },
    // 查看
    handleDialog(row) {
      if (row) {
        // 编辑
        this.dialog.forms = JSON.parse(JSON.stringify(row));
      } else {
        this.dialog.forms = { cValue: "" }; //让cValue变响应式validateField才有效
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
  },
};
</script>

<style lang="scss" scoped>
.building-manage {
  display: grid;
  grid-template-rows: 60px auto 70px;
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
  overflow: auto;
}

::v-deep {
  .dialog-img {
    background: #0b2a52;
    .el-dialog__body {
      display: grid;
      padding: 30px 20px 30px;
    }
    .el-dialog__header {
      display: none;
    }
  }
}
</style>