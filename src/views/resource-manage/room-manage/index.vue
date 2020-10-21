<template>
  <div class="app-container menu-auth-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        ref="filterForm"
        :inline="true"
        size="medium"
        :model="filterForm"
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
        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="房间名称" />
        </el-form-item>
        <el-form-item prop="roomType">
          <el-select v-model="filterForm.roomType" placeholder="房间类型">
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
      <el-table-column sortable prop="roomType" label="房间类型">
        <template slot-scope="{ row }">
          <span>{{ row.roomType | capitalize }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="name" label="房间名称" />
      <el-table-column sortable prop="roomCode" label="房间编号" />
      <el-table-column sortable prop="floorName" label="楼层名称" />
      <el-table-column sortable prop="floorCode" label="楼层编号" />
      <el-table-column sortable prop="imgUrl" label="房间预览图地址" />
      <el-table-column sortable prop="sort" label="排序" />
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
        <el-form-item label="房间编号" prop="roomCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.roomCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <el-form-item label="房间类型" prop="roomType">
          <el-select v-model="dialog.forms.roomType">
            <el-option
              v-for="item in roomTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="房间预览图地址" prop="imgUrl">
          <el-input v-model="dialog.forms.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="楼层编号" prop="floorCode">
          <el-select v-model="dialog.forms.floorCode">
            <el-option
              v-for="item in floorOpts"
              :key="item.id"
              :label="item.name"
              :value="item.floorCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dialog.forms.sort"></el-input>
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
import { roomTypeOpts, sortValidator } from "@/views/resource-manage/common.js";
import pagination from "@/components/Pagination";
import {
  spaceFloorListAll,
  spaceRoomDelete,
  spaceRoomEdit,
  spaceRoomAdd,
  spaceRoomListByPage,
  spaceRoomListAll,
  // 没用到
  spaceRoomQueryById,
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
      roomOpts: [],
      roomTypeOpts: roomTypeOpts,
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        floorCode: "",
        roomCode: "",
        name: "",
        roomType: null,
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
          floorCode: [{ required: true, trigger: "blur", message: "请输入" }],
          roomCode: [{ required: true, trigger: "blur", message: "请输入" }],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          roomType: [{ required: true, trigger: "blur", message: "请输入" }],
          imgUrl: [{ required: true, trigger: "blur", message: "请上传图片" }],
          sort: [{ required: true, trigger: "blur", validator: sortValidator }],
        },
      },
    };
  },
  watch: {},
  created() {
    spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    spaceRoomListAll().then((r) => (this.roomOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = spaceRoomEdit;
          } else {
            callAPI = spaceRoomAdd;
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
          spaceRoomDelete({
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
      spaceRoomListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-auth-manage {
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
