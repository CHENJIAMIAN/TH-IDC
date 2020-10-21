<template>
  <div class="app-container measure-point-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item prop="floorCode">
          <el-select v-model="filterForm.floorCode" placeholder="楼层">
            <el-option
              v-for="item in floorOpts"
              :key="item.id"
              :label="item.name"
              :value="item.floorCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="roomCode">
          <el-select v-model="filterForm.roomCode" placeholder="房间">
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="deviceGroupCode">
          <el-input
            v-model="filterForm.deviceGroupCode"
            placeholder="设备组编号"
          />
        </el-form-item>
        <el-form-item prop="deviceCode">
          <el-input v-model="filterForm.deviceCode" placeholder="设备编号" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="测点名称" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="filterForm.pointCode" placeholder="测点编号" />
        </el-form-item>
        <el-form-item prop="deviceType">
          <el-select v-model="filterForm.pointType" placeholder="测点类型	">
            <el-option
              v-for="item in roomTypeOpts"
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
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset('filterForm')"
            >重置</el-button
          >
          <el-button type="primary" size="medium" @click="handleDialog()">
            <!-- 不能写未handleDialog否则第一个参数会自动传鼠标事件 -->
            <i class="el-icon-plus" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table
      style="overflow: auto"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="name" label="测点名称" />
      <el-table-column sortable prop="pointCode" label="测点编号" />
      <el-table-column sortable prop="pointType" label="测点类型" />
      <el-table-column sortable prop="name" label="设备名称" />
      <el-table-column sortable prop="deviceCode" label="设备编号" />
      <el-table-column sortable prop="deviceGroupName" label="设备组名称" />
      <el-table-column sortable prop="deviceGroupCode" label="设备组编号" />
      <el-table-column sortable prop="roomName" label="房间名称" />
      <el-table-column sortable prop="roomCode" label="房间编号" />
      <el-table-column sortable prop="floorName" label="楼层名称" />
      <el-table-column sortable prop="floorCode" label="楼层编号" />
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
        label-width="150px"
      >
        <el-form-item label="测点编号" prop="pointCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.pointCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="测点名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item label="测点类型" prop="pointType">
          <el-select v-model="dialog.forms.pointType">
            <el-option
              v-for="item in roomTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备组编号" prop="deviceGroupCode">
          <el-select v-model="dialog.forms.deviceGroupCode">
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceCode">
          <el-select v-model="dialog.forms.deviceCode">
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
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
import { roomTypeOpts } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  spaceFloorListAll,
  spaceRoomListAll,
  pointListByPage,
  pointDelete,
  pointEdit,
  pointAdd,
} from "@/api/resource-manage.js";

export default {
  components: { pagination },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return roomTypeOpts.find((i) => i.id == value).name;
    },
  },
  data() {
    return {
      floorOpts: [],
      deviceGroupOpts: [],
      roomOpts: [],
      roomTypeOpts: roomTypeOpts,
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        floorCode: "",
        roomCode: "",
        deviceGroupCode: "",
        deviceCode: "",
        name: "",
        pointCode: "",
        pointType: null,
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
        rules: {
          deviceGroupCode: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          pointCode: [{ required: true, trigger: "blur", message: "请输入" }],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceCode: [{ required: true, trigger: "blur", message: "请输入" }],
          pointType: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {},
  created() {
    spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    spaceRoomListAll().then((r) => (this.roomOpts = r.data));
    // deviceGroupListAll().then((r) => (this.deviceGroupOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = pointEdit;
          } else {
            callAPI = pointAdd;
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
          pointDelete({
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
      pointListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.measure-point-manage {
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
