<template>
  <div>
    <span style="display:block;" @click="dialogVisble = true">修改密码</span>

    <el-dialog append-to-body v-if="dialogVisble" :visible.sync="dialogVisble">
      <span slot="title">
        <span style="font-size: 1.5rem;font-weight: bold;">修改密码</span>
        <img style="margin-left: 1rem;" src="@/assets/img/hl.png" />
      </span>
      <el-form :rules="rules" :model="forms" ref="dialogForm">
        <el-form-item prop="oldPassword" label="原密码" label-width="100px">
          <el-input
            v-model="forms.oldPassword"
            placeholder="请输入原密码"
            show-password
          />
        </el-form-item>

        <el-form-item prop="newPassword" label="新密码" label-width="100px">
          <el-input
            v-model="forms.newPassword"
            placeholder="新密码（5-12大小写字母、数字）"
            show-password
          />
        </el-form-item>

        <el-form-item prop="newPassword2" label="确认密码" label-width="100px">
          <el-input
            v-model="forms.newPassword2"
            placeholder="确认密码（5-12大小写字母、数字）"
            show-password
          />
        </el-form-item>
      </el-form>

      <div slot="footer" style="text-align: center;">
        <el-button
          style="width: 200px;"
          type="primary"
          @click="dialogSubmit('forms')"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sysUserUpdatePassword } from "@/api/system-manage.js";
/* 
oldPassword	[string]	是	旧密码		
newPassword	[string]	是	新密码
*/
export default {
  data() {
    var checkPwd = (rule, value, callback) => {
      if (value !== this.forms.newPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      dialogVisble: false,
      forms: {},
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value == this.forms.oldPassword) {
                callback(new Error("新密码与旧密码一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        newPassword2: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          sysUserUpdatePassword(this.forms).then(res => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.logout();
            this.dialogVisble = false;
          });
        } else {
          return false;
        }
      });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>
