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
          <el-select
            clearable
            v-model="filterForm.floorCode"
            @change="$set(filterForm,'roomCode','');$set(filterForm,'deviceGroupCode','');$set(filterForm,'deviceCode','');"
            placeholder="楼层"
          >
            <el-option
              v-for="item in floorOpts"
              :key="item.id"
              :label="item.name"
              :value="item.floorCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="roomCode">
          <el-select clearable v-model="filterForm.roomCode" 
            @change="$set(filterForm,'deviceGroupCode','');$set(filterForm,'deviceCode','');"
          placeholder="房间">
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="deviceGroupCode">
          <el-select clearable v-model="filterForm.deviceGroupCode" placeholder="设备组"
            @change="$set(filterForm,'deviceCode','');"
          >
            <el-option
              v-for="item in deviceGroupOpts"
              :key="item.id"
              :label="item.name"
              :value="item.deviceGroupCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item  prop="deviceCode" >
          <el-select clearable v-model="filterForm.deviceCode" placeholder="设备">
            <el-option
              v-for="item in deviceOpts"
              :key="item.id"
              :label="item.name"
              :value="item.deviceCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="测点名称" />
        </el-form-item>
        <el-form-item prop="pointCode">
          <el-input v-model="filterForm.pointCode" placeholder="测点编号" />
        </el-form-item>
        <el-form-item prop="pointType">
          <el-select
            clearable
            v-model="filterForm.pointType"
            placeholder="测点类型"
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
      style="overflow: auto"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column sortable prop="pointCode" label="测点编号" />
      <el-table-column sortable prop="name" label="测点名称" />
      <el-table-column sortable prop="pointType" label="测点类型">
        <template slot-scope="{ row }">
          <span>{{
            pointAllTypeOpts.find((i) => i.id === row.pointType) && pointAllTypeOpts.find((i) => i.id === row.pointType).name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="deviceName" label="设备名称" />
      <!-- <el-table-column sortable prop="deviceCode" label="设备编号" /> -->
      <el-table-column sortable prop="deviceGroupName" label="设备组名称" />
      <!-- <el-table-column sortable prop="deviceGroupCode" label="设备组编号" /> -->
      <el-table-column sortable prop="roomName" label="房间名称" />
      <!-- <el-table-column sortable prop="roomCode" label="房间编号" /> -->
      <el-table-column sortable prop="floorName" label="楼层名称" />
      <!-- <el-table-column sortable prop="floorCode" label="楼层编号" /> -->
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
        <el-form-item label="测点编号" prop="pointCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.pointCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="测点名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>      

        <div style="display: grid; grid-template-columns: 310fr 280fr 300fr;">
        <el-form-item label="楼层" prop="floorCode">
          <el-select
            v-model="dialog.forms.floorCode"
            @change="
              () => {
                $set(dialog.forms, 'roomCode', '');
                $set(dialog.forms, 'deviceGroupCode', '');
              }
            "
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
          <el-select
            v-model="dialog.forms.roomCode"
            @change="$set(dialog.forms, 'deviceGroupCode', '')"
          >
            <el-option
              v-for="item in roomOpts"
              :key="item.id"
              :label="item.name"
              :value="item.roomCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备"
          prop="deviceCode"
          v-if="true || dialog.forms.actionType == 2"
        >
          <el-select v-model="dialog.forms.deviceCode">
            <el-option
              v-for="item in deviceOpts"
              :key="item.id"
              :label="item.name"
              :value="item.deviceCode"
            />
          </el-select>
        </el-form-item>
        </div>

        <div style="display: grid; grid-template-columns: 310fr 280fr 300fr;">
          <el-form-item label="设备类型" prop="deviceTypeId">
            <el-select
              v-model="dialog.forms.deviceTypeId"
              popper-class="three-column"
                @change="$set(dialog.forms, 'pointType', '')"
            >
              <el-option
                v-for="item in deviceTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>     
          <el-form-item label="测点类型" prop="pointType">
            <el-select v-model="dialog.forms.pointType">
              <el-option
                v-for="item in pointTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
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
import pagination from "@/components/Pagination";
import {
  deviceTypeListAll,
  pointTypeListAll,
  deviceListAll,
  deviceGroupListAll,
  spaceFloorListAll,
  spaceRoomListAll,
  pointListByPage,
  pointDelete,
  pointEdit,
  pointAdd,
} from "@/api/resource-manage.js";

export default {
  components: { pagination },
  data() {
    return {
      floorOpts: [],
      deviceGroupOpts: [],
      deviceOpts: [],
      pointTypeOpts: [],
      pointAllTypeOpts: [],
      roomOpts: [],
      deviceTypeOpts: [],
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

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          floorCode: [{ required: true, trigger: "blur", message: "请输入" }],
          roomCode: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceGroupCode: [
            { required: true, trigger: "blur", message: "请输入" },
          ],
          deviceTypeId: [{ required: true, trigger: "blur", message: "请输入" }],
          pointCode: [{ required: true, trigger: "blur", message: "请输入" }],
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          deviceCode: [{ required: true, trigger: "blur", message: "请输入" }],
          pointType: [{ required: true, trigger: "blur", message: "请输入" }],
          actionType: [
            { required: true, trigger: "change", message: "请输入" },
          ],
        },
      },
    };
  },
  watch: {
     async "dialog.forms.deviceTypeId"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.pointTypeOpts = [];
      const r = await pointTypeListAll({ deviceTypeId: n });
      this.pointTypeOpts = r.data;
    },
    async "filterForm.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      this.deviceGroupOpts = [];
      this.deviceOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
    async "filterForm.roomCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.deviceGroupOpts = [];
      this.deviceOpts = [];
      const r1 = await deviceListAll({ roomCode: n });
      const r2 = await deviceGroupListAll({ roomCode: n });
      this.deviceOpts = r1.data;
      this.deviceGroupOpts = r2.data;
    },
    async "filterForm.deviceGroupCode"(n, o) {
      if (!n) return;
    },
    async "dialog.forms.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      this.deviceGroupOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
    async "dialog.forms.roomCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.deviceOpts = [];
      this.deviceGroupOpts = [];
      const r1 = await deviceListAll({ roomCode: n });
      const r2 = await deviceGroupListAll({ roomCode: n });
      this.deviceOpts = r1.data;
      this.deviceGroupOpts = r2.data;
    },
  },
  created() {
    spaceFloorListAll().then((r) => (this.floorOpts = r.data));
    // spaceRoomListAll().then((r) => (this.roomOpts = r.data));
    // deviceGroupListAll().then((r) => (this.deviceGroupOpts = r.data));
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    pointTypeListAll().then((r) => (this.pointAllTypeOpts = r.data));

    this.handleQuery();
  },
  mounted() {},
  methods: {
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          switch (this.dialog.forms.actionType) {
            case 1: //设备组
              delete this.dialog.forms.deviceCode;
              break;
            case 2: //设备
              delete this.dialog.forms.deviceGroupCode;
              break;
          }
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
        row.deviceTypeId = row.deviceType;
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = { roomCode: "", deviceGroupCode: "" };
        /* 
          this.dialog.forms ={ roomCode: ""}; 下拉选择才有反应???
          下拉选择时会触发  this.$emit('input', value); 进而触发ast生成的代码: callback: function($$v) { _vm.$set(_vm.dialog.forms, "roomCode", $$v)},
                为什么? 因为渲染时 createComponent->是v-model的话会触发transformModel->on[event] = data.model.callback  'input'事件的接受器就是callback
          而之前运行了 dialog.forms.roomCode = ''; 它不是响应式的,
          而 _vm.$set在dialog.forms.roomCode已存在的时候,会直接返回(不存在就会调用defineReactive$$1(ob.value, key, val)去定义响应式的变量)
          所以dialog.forms.roomCode虽然确实被改变了,但是不过它不是响应式的,所以视图没有更新   
        */
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
