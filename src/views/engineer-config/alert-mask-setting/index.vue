<template>
  <div class="role-manage">
    <!-- 筛选条件 -->
    <div class="head">
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
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column prop="floorCode" label="楼层编号" />
      <el-table-column prop="roomCode" label="房间编号" />
      <el-table-column prop="maskType" label="屏蔽方式">
        <template slot-scope="{ row }">
          <div>
            {{
              maskTypeOpts.find((i) => i.id == row.maskType) &&
              maskTypeOpts.find((i) => i.id == row.maskType).name
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="屏蔽对象">
        <template slot-scope="{ row }">
          <div
            v-for="item in row.points ||
            row.devices ||
            row.deviceGroups ||
            row.pointTypes ||
            row.deviceTypes"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column  prop="deviceTypes" label="设备类型">
        <template slot-scope="{ row }">
          <div v-for="item in row.deviceTypes" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column  prop="pointTypes" label="测点类型">
        <template slot-scope="{ row }">
          <div v-for="item in row.pointTypes" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column  prop="deviceGroups" label="指定设备组">
        <template slot-scope="{ row }">
          <div v-for="item in row.deviceGroups" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column  prop="devices" label="指定设备">
        <template slot-scope="{ row }">
          <div v-for="item in row.devices" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column  prop="points" label="指定测点">
        <template slot-scope="{ row }">
          <div v-for="item in row.points" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        prop="maskPeriod"
        label="屏蔽时段"
        width="300"
      >
        <template slot-scope="{ row }">
          <div v-for="item in row.maskPeriod.split(',')" :key="item">
            {{ item }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="{ row }">
          <span style="color: #55fb55" v-if="row.status == 1">启用</span>
          <span style="color: gray" v-else>禁用</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="{ row }">
          <el-button
            title = "编辑"
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
      style="margin-top: -10px;"
      :hidden="listTotal > 0 ? false : true"
      :total="listTotal"
      :page.sync="filterForm.pageNo"
      :limit.sync="filterForm.pageSize"
      @pagination="getList"
    />

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible" top="25vh">
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
        <!-- <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item> -->

        <el-form-item label="楼层" prop="floorCode">
          <el-select
            v-model="dialog.forms.floorCode"
            @change="$set(dialog.forms, 'roomCode', '')"
          >
            <el-option
              v-for="item in floorOpts"
              :key="item.id"
              :label="item.name"
              :value="item.floorCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="房间" prop="roomCode">
          <el-select v-model="dialog.forms.roomCode" @change="handleRoomChange">
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="屏蔽方式" prop="maskType">
          <el-select v-model="dialog.forms.maskType">
            <el-option
              v-for="item in maskTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备类型"
          prop="deviceTypes"
          v-show="dialog.forms.maskType == 2"
        >
          <el-select
            multiple
            v-model="dialog.forms.deviceTypes"
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

        <!-- 用来筛选备类类型的,单选 -->
        <el-form-item
          label="设备类型"
          prop="deviceTypes"
          v-show="dialog.forms.maskType == 3"
        >
          <el-select
            v-model="dialog.forms.deviceTypes2"
            popper-class="three-column"
            @change="handleDeviceTypeChange"
          >
            <el-option
              v-for="item in deviceTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="测点类型"
          prop="pointTypes"
          v-show="dialog.forms.maskType == 3"
        >
          <el-select
            multiple
            v-model="dialog.forms.pointTypes"
            popper-class="three-column"
          >
            <el-option
              v-for="item in pointTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备组"
          prop="deviceGroups"
          v-show="dialog.forms.maskType == 4"
        >
          <el-select multiple v-model="dialog.forms.deviceGroups">
            <el-option
              v-for="item in deviceGroupOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备"
          prop="devices"
          v-show="dialog.forms.maskType == 5"
        >
          <el-select multiple v-model="dialog.forms.devices">
            <el-option
              v-for="item in deviceOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 用来筛选测点的,单选 -->
        <el-form-item
          label="设备"
          prop="devices"
          v-show="dialog.forms.maskType == 6"
        >
          <el-select
            v-model="dialog.forms.devices2"
            popper-class="three-column"
            @change="handleDeviceChange"
          >
            <el-option
              v-for="item in deviceOpts"
              :key="item.id"
              :label="item.name"
              :value="item.deviceCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="测点"
          prop="points"
          v-show="dialog.forms.maskType == 6"
        >
          <el-select multiple v-model="dialog.forms.points">
            <el-option
              v-for="item in pointOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="屏蔽时段" prop="maskPeriod2">
          <template v-for="(item, index) in dialog.forms.maskPeriod2">
            <div
              :key="index + Math.random()"
              style="display: flex; gap: 10px; margin: 5px"
            >
              <el-date-picker
                v-model="dialog.forms.maskPeriod2[index]"
                type="datetimerange"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm"
              />
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-minus"
                plain
                @click="dialog.forms.maskPeriod2.splice(index, 1)"
              ></el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="" prop="">
          <div style="display: grid">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              plain
              @click="dialog.forms.maskPeriod2.push('')"
            ></el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group
            class="radio-status"
            v-model="dialog.forms.status"
            style="width: 100%"
          >
            <el-radio border :label="1" style="color: #55fb55">启用</el-radio>
            <el-radio border :label="2" style="color: gray">禁用</el-radio>
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
import pagination from "@/components/Pagination";
import {
  alertMaskDelete,
  alertMaskEdit,
  alertMaskQueryById,
  alertMaskListByPage,
  alertMaskAdd,
} from "@/api/engineer-config.js";

import {
  pointListAll,
  pointTypeListAll,
  spaceFloorListAll,
  deviceTypeListAll,
  deviceListAll,
  deviceGroupListAll,
  spaceRoomListAll,
} from "@/api/resource-manage.js";
export default {
  components: { pagination },
  data() {
    return {
      teststr: "",
      filterForm: {
        // 筛选条件
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页限制数量
      },
      maskTypeOpts: [
        { id: 1, name: "所有" },
        { id: 2, name: "指定设备类型" },
        { id: 3, name: "指定测点类型" },
        { id: 4, name: "指定设备组" },
        { id: 5, name: "指定设备" },
        { id: 6, name: "指定测点" },
      ],
      floorOpts: [],
      roomOpts: [],

      pointOpts: [],
      pointTypeOpts: [],
      deviceGroupOpts: [],
      deviceTypeOpts: [],
      deviceOpts: [],
      pointTypesOpts: [],
      deviceGroupsOpts: [],
      devicesOpts: [],
      pointsOpts: [],
      listLoading: true,
      listData: [], // 列表数据
      listTotal: 0, // 列表总条数
      treeDataQX: [],
      treeDataFJ: [],
      defaultCheckedIdsQX: [],
      // defaultCheckedIdsFJ: [],
      dialog: {
        id: "",
        visible: false,
        forms: { maskPeriod2: [""] },
        rules: {
          floorCode: [{ required: true, trigger: "blur", message: "请输入" }],
          roomCode: [{ required: true, trigger: "blur", message: "请输入" }],
          maskType: [{ required: true, trigger: "blur", message: "请输入" }],
          status: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
    };
  },
  watch: {
    async "dialog.forms.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
  },
  created() {
    spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handleRoomChange(n) {
      pointListAll({ roomCode: n }).then((r) => (this.pointOpts = r.data));
      deviceListAll({ roomCode: n }).then((r) => (this.deviceOpts = r.data));
      deviceGroupListAll({ roomCode: n }).then(
        (r) => (this.deviceGroupOpts = r.data)
      );
    },
    handleDeviceChange(n) {
      this.dialog.forms.points = [];
      pointListAll({
        roomCode: this.dialog.forms.roomCode,
        deviceCode: n,
      }).then((r) => {
        this.pointOpts = r.data;
      });
    },
    handleDeviceTypeChange(n) {
      this.dialog.forms.pointTypes = [];
      pointTypeListAll({ deviceTypeId: n }).then(
        (r) => (this.pointTypeOpts = r.data)
      );
    },
    dialogSubmit() {
      this.dialog.forms.maskPeriod = this.dialog.forms.maskPeriod2
        .filter((i) => i)
        .map((i) => i.join(" - "));
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = alertMaskEdit;
          } else {
            callAPI = alertMaskAdd;
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
    async handleDialog(row) {
      if (row) {
        // 编辑
        const r = await alertMaskQueryById({ id: row.id });
        this.dialog.forms = r.data;
        this.floorOpts = r.data.spaceFloorList;
        const floor = r.data.spaceFloorList.find((i) => i.has);
        if (floor) this.dialog.forms.floorCode = floor.floorCode;

        this.roomOpts = r.data.spaceRoomList;
        const room = r.data.spaceRoomList.find((i) => i.has);
        if (room) this.dialog.forms.roomCode = room.roomCode;

        if (r.data.deviceTypes) this.deviceTypeOpts = r.data.deviceTypes;
        else deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));

        this.dialog.forms.deviceTypes =
          r.data.deviceTypes &&
          r.data.deviceTypes.filter((i) => i.has).map((i) => i.id);

        this.deviceGroupOpts = r.data.deviceGroups;
        this.dialog.forms.deviceGroups =
          r.data.deviceGroups &&
          r.data.deviceGroups.filter((i) => i.has).map((i) => i.id);

        this.pointOpts = r.data.points;
        this.dialog.forms.points =
          r.data.points && r.data.points.filter((i) => i.has).map((i) => i.id);

        this.pointTypeOpts = r.data.pointTypes;
        this.dialog.forms.pointTypes =
          r.data.pointTypes &&
          r.data.pointTypes.filter((i) => i.has).map((i) => i.id);
        this.$set(
          this.dialog.forms,
          "maskPeriod2",
          r.data.maskPeriod.split(",").map((i) => i.split(" - "))
        );
      } else {
        this.dialog.forms = { status: 1, maskPeriod2: [""] };
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
          alertMaskDelete({
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
      alertMaskListByPage(this.filterForm).then((res) => {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.role-manage {
  display: grid;
  grid-template-rows: 60px auto 25px;
  // background: url(../../../assets/img/mpbg.png) 0 0 / 100% 100% no-repeat;
  height: calc(100vh - 260px);
}
.head {
  display: grid;
  justify-content: end;
}

::v-deep {
  .rooms-form-item {
    .el-form-item__label {
      font-size: 1.4rem;
    }
    .rooms-el-checkbox-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 10px;
      .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0;
      }
      .el-checkbox:last-of-type {
        margin-right: 30px;
      }
    }
  }
}
</style>
