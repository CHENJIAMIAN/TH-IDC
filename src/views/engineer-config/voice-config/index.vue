<template>
  <div class="auth-manage" v-if="showPage">       
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-if="hasAuth" >
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-card> -->
    <el-form
    v-if="hasAuth" 
      ref="forms"
      :model="forms"
      :rules="rules"
      v-loading="listLoading"
      inline
      label-width="200px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="应用ID" prop="sound_appid">
            <el-input v-model="forms.sound_appid" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模板ID" prop="sound_template_id">
            <el-input v-model="forms.sound_template_id" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="AppKey" prop="sound_appkey">
            <el-input v-model="forms.sound_appkey" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="语音请求地址" prop="sound_url">
            <el-input v-model="forms.sound_url" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- </el-card> -->
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  phoneSoundConfigGetSoundConfig,
  phoneSoundConfigAddOrEdit_sound,
} from "@/api/engineer-config.js";
import { valueTypeOpts, isIntNumber } from "@/common.js";
export default {
  components: { pagination },
  data() {
    return {
      showPage:false,
      hasAuth: true,
      depOpts: [],
      firstMenuOpts: [],
      secondMenuOpts: [],
      thirdMenuOpts: [],
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      listLoading: true,
      listData: [{},{},{}], // 列表数据
      listTotal: 0, // 列表总条数

      remouldAspirationOption: [],
      forms: {},
      rules: {
        // 表单验证
        sound_appid: [
          { required: true, tiggter: "blur", validator: isIntNumber },
        ],
        sound_template_id: [
          { required: true, tiggter: "blur", validator: isIntNumber },
        ],
        sound_appkey: [{ required: true, tiggter: "blur", message: "请输入" }],
        sound_url: [{ required: true, tiggter: "blur", message: "请输入" }],
      },

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          permission: [{ required: true, trigger: "blur", message: "请输入" }],
          menuType: [{ required: true, trigger: "change", message: "请输入" }],
          firstMenuId: [{ required: true, trigger: "blur", message: "请输入" }],
          secondMenuId: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          thirdMenuId: [{ required: true, trigger: "blur", message: "请输入" }],
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
    handleSubmit() {
      this.$refs["forms"].validate((valid, obj) => {
        if (valid) {
          phoneSoundConfigAddOrEdit_sound(this.forms).then((r) => {
            this.$message.success("操作成功!");
            this.handleQuery();
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
    // 查看
    async handleDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = {};
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
      phoneSoundConfigGetSoundConfig()
        .then((res) => {
          this.hasAuth = true;
          this.forms = res.data;
          this.listLoading = false;
        })
        .catch((e) => {
          this.hasAuth = false;
        }).finally(_=>{
          this.showPage = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
  display: grid;
  grid-template-rows: 60px auto;
  // background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: calc(100vh - 260px);
}
.head {
  display: grid;
  justify-content: end;
}
</style>
