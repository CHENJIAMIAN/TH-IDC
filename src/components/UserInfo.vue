<template>
  <div>
    <span style="display: block" @click="dialog.visible = true">用户信息</span>

    <!-- 详情弹窗 -->
    <el-dialog append-to-body :visible.sync="dialog.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">用户信息</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        :model="dialog.forms"
        :rules="dialog.rules"
        ref="dialogForm"
        label-width="100px"
      >
        <el-form-item label="用户账号" prop="userName">
          <el-input disabled v-model="dialog.forms.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!dialog.forms.id">
          <el-input disabled v-model="dialog.forms.password"></el-input>
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
        <el-form-item label="部门ID" prop="departmentId">
          <el-select v-model="dialog.forms.departmentId">
            <el-option
              v-for="item in depOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-radio-group
            class="radio-status"
            v-model="dialog.forms.status"
            style="width: 100%"
          >
            <el-radio border :label="1">启用</el-radio>
            <el-radio border :label="0">禁用</el-radio>
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
import {
  sysDepartmentListAll,
  sysUserQueryLoginUser,
  sysUserEditSelf,
} from "@/api/system-manage.js";
/* 
oldPassword	[string]	是	旧密码		
newPassword	[string]	是	新密码
*/
export default {
  data() {
    return {
      depOpts: [],
      dialog: {
        id: "",
        visible: false,
        forms: { status: 1 },
        rules: {
          userName: [{ required: true, trigger: "blur", message: "请输入" }],
          password: [{ required: true, trigger: "blur", message: "请输入" }],
          realName: [{ required: true, trigger: "blur", message: "请输入" }],
          phone: [
            { required: true, trigger: "blur", message: "请输入" },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
          departmentId: [
            { required: true, trigger: "change", message: "请输入" },
          ],
          status: [{ required: true, trigger: "change", message: "请输入" }],
        },
      },
    };
  },
  watch: {
    "dialog.visible"(n, o) {
      if (!n) return;
      sysDepartmentListAll().then((r) => (this.depOpts = r.data));
      sysUserQueryLoginUser().then((r) => (this.dialog.forms = r.data));
    },
  },
  created() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          sysUserEditSelf(this.dialog.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogForm"].resetFields();
            this.dialog.visible = false;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
