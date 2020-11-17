<template>
  <div class="app-container auth-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <!-- <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >恢复默认值</el-button
          >
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content" style="overflow: auto; padding-right: 5px">
      <el-form
        ref="forms1"
        :model="forms"
        :rules="rules"
        v-loading="listLoading"
        inline
        label-width="120px"
      >
        <!-- <el-card> -->
        <h3 style="color: #31c6f1">实时数据存储方式</h3>
        <el-row>
          <el-col :span="16">
            <el-form-item label="实时存储方式" prop="realtime_store_type">
              <el-radio-group
                class="new-el-radio-group"
                v-model="forms.realtime_store_type"
                style="width: 100%"
              >
                <el-radio border label="1">组合存储</el-radio>
                <el-radio border label="2">全量实时存储</el-radio>
                <el-radio border label="3">不存储</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card v-if="forms.realtime_store_type == 1">
          <el-col :span="12">
            <el-form-item label="周期存储(分钟)" prop="cyclestore">
              <el-input v-model="forms.cyclestore" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="" prop="cyclestore_has">
              <el-checkbox
                @change="$refs['forms1'].clearValidate()"
                v-model="forms.cyclestore_has"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变化率存储(%)" prop="changerate">
              <el-input v-model="forms.changerate" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="" prop="changerate_has">
              <el-checkbox
                @change="$refs['forms1'].clearValidate()"
                v-model="forms.changerate_has"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变化大小存储" prop="changesize">
              <el-input v-model="forms.changesize" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="" prop="changesize_has">
              <el-checkbox
                @change="$refs['forms1'].clearValidate()"
                v-model="forms.changesize_has"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测点实时存储" prop="points_has">
              <el-checkbox
                v-model="forms.points_has"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button
                title="测点选择"
                icon="el-icon-circle-plus-outline"
                type="primary"
                plain
                @click="handleCDDialog"
                >测点选择</el-button
              >
            </el-form-item>
          </el-col>
        </el-card>
      </el-form>
      <el-form
        ref="forms"
        :model="forms"
        :rules="rules"
        v-loading="listLoading"
        inline
        label-width="180px"
      >
        <!-- </el-card> -->
        <el-divider style="margin: 10px 0" />
        <!-- <el-card> -->
        <h3 style="color: #31c6f1">存储时间</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="全量实时数据(月)" prop="all_realtime_data">
              <el-input
                v-model="forms.all_realtime_data"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组合实时数据(月)" prop="union_realtime_data">
              <el-input
                v-model="forms.union_realtime_data"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规整数据(年)" prop="regular_data">
              <el-input v-model="forms.regular_data" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="告警事件(年)" prop="alert_data">
              <el-input v-model="forms.alert_data" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作日志(年)" prop="action_log">
              <el-input v-model="forms.action_log" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-card> -->

        <el-divider style="margin: 10px 0" />
        <!-- <el-card> -->
        <h3 style="color: #31c6f1">磁盘</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="磁盘总容量(GB)" prop="store_all_size">
              <el-input v-model="forms.store_all_size" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="磁盘已使用容量(GB)" prop="store_use_size">
              <el-input v-model="forms.store_use_size" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="磁盘空间占用报警阀值(%)"
              prop="store_use_alert"
            >
              <el-input v-model="forms.store_use_alert" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="磁盘容量告警" prop="store_alert_switch">
              <el-checkbox
                v-model="forms.store_alert_switch"
                true-label="1"
                false-label="0"
                >当磁盘空间占用达到设定阈值时报警</el-checkbox
              >
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据删除" prop="delete_data_switch">
              <el-checkbox
                v-model="forms.delete_data_switch"
                true-label="1"
                false-label="0"
                >基于存储时间要求自动删除</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-card> -->
      </el-form>
    </div>

    <!-- 绑定测点弹窗 -->
    <el-dialog :visible.sync="dialogCD.visible">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">绑定测点</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogCD.forms"
        :rules="dialogCD.rules"
        ref="dialogCDForm"
      >
        <el-form-item label="" prop="">
          <el-transfer
            filterable
            :filter-method="
              (query, item) => {
                if (!item.name) return false;
                return item.name.indexOf(query) > -1;
              }
            "
            :titles="['未绑定', '已绑定']"
            :props="{
              key: 'id',
              label: 'name',
            }"
            filter-placeholder="请输入"
            v-model="dialogCD.forms.poindIdArray"
            :data="allPointOpts"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogCDSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  storeconfigAddOrEdit_store_params,
  storeconfigGetStoreConfigParams,
  storePointAdd,
  storePointListAllNotBindPoint,
  storePointListAllBindPoint,
} from "@/api/engineer-config.js";
import { isBiggerThanZero } from "@/views/resource-manage/common.js";
export default {
  components: { pagination },
  data() {
    const isBetween0To100 = (rule, value, callback) => {
      if (
        value === "" ||
        isNaN(value) ||
        Number(value) < 0 ||
        Number(value) > 100
      ) {
        callback(new Error("请输入小于100的非负数字"));
      } else {
        callback();
      }
    };
    return {
      depOpts: [],
      firstMenuOpts: [],
      allPointOpts: [],
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

      remouldAspirationOption: [],
      forms: {},
      rules: {
        // 表单验证
        realtime_store_type: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],

        cyclestore: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!+this.forms.cyclestore_has) callback();
              if (value === "" || isNaN(value) || Number(value) < 0) {
                callback(new Error("请输入非负数字"));
              } else {
                callback();
              }
            },
          },
        ],
        changerate: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!+this.forms.changerate_has) callback();
              if (value === "" || isNaN(value) || Number(value) < 0) {
                callback(new Error("请输入非负数字"));
              } else {
                callback();
              }
            },
          },
        ],
        changesize: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!+this.forms.changesize_has) callback();
              if (value === "" || isNaN(value) || Number(value) < 0) {
                callback(new Error("请输入非负数字"));
              } else {
                callback();
              }
            },
          },
        ],
        // cyclestore_has: [
        //   { required: false, trigger: "blur", validator: isBiggerThanZero },
        // ],
        // changerate_has: [
        //   { required: false, trigger: "blur", validator: isBiggerThanZero },
        // ],
        // changesize_has: [
        //   { required: false, trigger: "blur", validator: isBiggerThanZero },
        // ],
        // points_has: [
        //   { required: false, trigger: "blur", validator: isBiggerThanZero },
        // ],
        all_realtime_data: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        union_realtime_data: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        regular_data: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        alert_data: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        action_log: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        store_all_size: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        store_use_size: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        store_use_alert: [
          { required: false, trigger: "blur", validator: isBetween0To100 },
        ],
        store_alert_switch: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
        delete_data_switch: [
          { required: false, trigger: "blur", validator: isBiggerThanZero },
        ],
      },

      dialogCD: {
        visible: false,
        forms: {},
        rules: {},
      },
    };
  },
  watch: {},
  async created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
    async handleCDDialog() {
      // dialog显示时获取一级菜单列表
      // 编辑
      this.dialogCD.forms = {};
      const r1 = await storePointListAllNotBindPoint();
      this.pointNotBindDeviceGroupOpts = r1.data;
      const r2 = await storePointListAllBindPoint();
      this.pointBindDeviceGroupOpts = r2.data;
      // this.dialogCD.forms.poindIdArray = r2.data.map((i) => i.id);
      this.$set(
        this.dialogCD.forms,
        "poindIdArray",
        r2.data.map((i) => i.id)
      );
      this.allPointOpts = this.pointNotBindDeviceGroupOpts.concat(
        this.pointBindDeviceGroupOpts
      );
      this.dialogCD.visible = true;
      this.$nextTick((_) => this.$refs["dialogCDForm"].clearValidate());
    },
    dialogCDSubmit() {
      this.$refs["dialogCDForm"].validate((valid, obj) => {
        if (valid) {
          storePointAdd(this.dialogCD.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogCDForm"].resetFields();
            this.dialogCD.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    handleSubmit() {
      this.$refs["forms"].validate((valid, obj) => {
        if (valid) {
          this.$refs["forms1"].validate((valid, obj) => {
            if (valid) {
              storeconfigAddOrEdit_store_params(this.forms).then((r) => {
                this.$message.success("操作成功!");
                this.handleQuery();
              });
            } else {
              return false;
            }
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
    // // 重置
    // handleReset(form) {
    //   this.$confirm("是否恢复默认设置 ? ", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.$refs[form].resetFields();
    //       alertconfigAlertparam_reset().then((r) => {
    //         this.handleQuery();
    //       });
    //     })
    //     .catch(() => {});
    // },
    // 查看
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
      storeconfigGetStoreConfigParams().then((res) => {
        this.forms = res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
  display: grid;
  grid-template-rows: 60px auto;
  background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: 100%;
}
.head {
  display: grid;
  justify-content: end;
}

.new-el-radio-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
  .el-radio:last-of-type {
    margin-right: 30px;
  }
}
</style>
