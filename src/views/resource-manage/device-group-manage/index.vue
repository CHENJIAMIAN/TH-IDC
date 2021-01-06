<template>
  <div class="app-container device-group-manage" v-if="showPage">
    <h2 class="auth-tip" v-if="!hasAuth">权限不足,请联系管理员</h2>
    <!-- 筛选条件 -->
    <div class="head" v-if="hasAuth">
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
            @change="$set(dialog.forms, 'roomCode', '')"
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
          <el-select clearable v-model="filterForm.roomCode" placeholder="房间">
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
            v-model.trim="filterForm.deviceGroupCode"
            placeholder="设备组编号"
          />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model.trim="filterForm.name" placeholder="设备组名称" />
        </el-form-item>
        <el-form-item prop="deviceType">
          <el-select
            clearable
            v-model="filterForm.deviceType"
            placeholder="设备组类型"
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
        <el-form-item prop="groupType">
          <el-select
            clearable
            v-model="filterForm.groupType"
            placeholder="设备组分类"
          >
            <el-option
              v-for="item in groupTypeOpts"
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
      empty-text=" "
      v-if="hasAuth"
      style="width: 100%"
      height="100%"
      stripe
      v-loading="listLoading"
      border
      :data="listData"
    >
      <el-table-column prop="deviceGroupCode" label="设备组编号" />
      <el-table-column prop="name" label="设备组名称" />
      <el-table-column prop="deviceType" label="设备组类型">
        <template slot-scope="{ row }">
          <span>{{
            deviceTypeOpts.find((i) => i.id === row.deviceType) &&
            deviceTypeOpts.find((i) => i.id === row.deviceType).name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="imgUrl" label="预览图">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="handleImgDialog(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="groupType" label="分类">
        <template slot-scope="{ row }">
          <span>{{
            groupTypeOpts.find((i) => i.id === row.groupType) &&
            groupTypeOpts.find((i) => i.id === row.groupType).name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="parentName" label="父级设备组名称" />
      <el-table-column prop="roomName" label="房间名称" />
      <!-- <el-table-column sortable prop="roomCode" label="房间编号" /> -->
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.groupType == 1"
            title="绑定设备"
            icon="el-icon-bdsb"
            type="primary"
            plain
            @click="handleSBDialog(row)"
          ></el-button>
          <el-button
            v-if="row.groupType == 2"
            title="逻辑设备组绑定实体设备组"
            icon="el-icon-guide"
            type="primary"
            plain
            @click="handleLJDialog(row)"
          ></el-button>
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
    <!-- 图片采点弹窗 -->
    <el-dialog :visible.sync="dialogImg.visible" class="dialog-img" width="95%">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">图片采点 - {{ dialog.forms.name }}</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <div class="content-head">
        <!-- div布局占位用 -->
        <div></div>
        <div>
          图片类型
          <el-select v-model="dialogImg.imgType">
            <el-option
              v-for="item in imgTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div>
          测点类型
          <el-select
            v-model="dialog.forms.pointType"
            @change="handleImgDialog()"
          >
            <el-option
              v-for="item in pointTypeOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div>未绑测点</div>
      </div>
      <div class="grid">
        <div class="left">
          <div
            v-if="dialogImg.visible"
            ref="preiviewImgContainer"
            style="position: relative"
          >
            <img
              :style="{
                cursor: dialogImg.forms.selectedNotBind ? 'crosshair' : 'unset',
              }"
              ref="preiviewImg"
              class="preview-img"
              :src="dialogImg.forms.imgUrl"
              alt="加载失败"
              @click="addToBindPointLocation"
            />
          </div>
        </div>
        <div class="right">
          <div class="radios">
            <el-radio
              v-for="i in listDataCDNotBind"
              :key="i.id"
              v-model="dialogImg.forms.selectedNotBind"
              :label="i"
              border
              >{{ i.name }}</el-radio
            >
          </div>
          <div class="table">
            <el-table
              empty-text=" "
              class="btm-table"
              style="overflow: auto"
              stripe
              border
              :data="listDataCDBind"
            >
              <el-table-column
                sortable
                prop="pointCode"
                label="测点编号"
                width="150"
              />
              <el-table-column sortable prop="name" label="测点名称" />
              <!-- <el-table-column sortable prop="location" label="位置" /> -->
              <el-table-column label="操作" align="center" width="80">
                <template slot-scope="{ row }">
                  <el-button
                    title="删除"
                    icon="el-icon-delete"
                    type="primary"
                    plain
                    @click="removeToNotBindPointLocation(row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogImgSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog.visible" top="10vh">
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
        <el-form-item label="设备组编号" prop="deviceGroupCode">
          <el-input
            :disabled="!!dialog.forms.id"
            v-model="dialog.forms.deviceGroupCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备组名称" prop="name">
          <el-input v-model="dialog.forms.name"></el-input>
        </el-form-item>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <el-form-item label="设备组类型" prop="deviceType">
            <el-select
              v-model="dialog.forms.deviceType"
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
          <!-- style="transform: translate(-50px, 0px)" -->
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
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <!-- style="transform: translate(-100px, 0px)" -->
          <el-form-item label="房间" prop="roomCode">
            <el-select v-model="dialog.forms.roomCode">
              <el-option
                v-for="item in roomOpts"
                :key="item.id"
                :label="item.name"
                :value="item.roomCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="设备组分类" prop="groupType">
            <el-select v-model="dialog.forms.groupType">
              <el-option
                v-for="item in groupTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="预览图" prop="imgUrl" v-if="dialog.visible">
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

    <!-- 绑定设备弹窗 -->
    <el-dialog :visible.sync="dialogSB.visible" width="80%">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt">绑定设备 - {{ dialogSB.forms.name }}</span>
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogSB.forms"
        :rules="dialogSB.rules"
        ref="dialogSBForm"
      >
        <el-form-item label="" prop="">
          <el-transfer
            class="transfer-cd"
            filterable
            :filter-method="
              (query, item) => {
                return item.name.indexOf(query) > -1;
              }
            "
            :titles="['未绑定', '已绑定']"
            :props="{
              key: 'id',
              label: 'name',
            }"
            filter-placeholder="请输入"
            v-model="dialogSB.forms.deviceIdArray"
            :data="allDeviceOpts"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogSBSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 逻辑设备组绑定实体设备组弹窗 -->
    <el-dialog :visible.sync="dialogLJ.visible" width="80%">
      <div slot="title" class="el-dialog-title-custom">
        <span class="title-txt"
          >逻辑设备组绑定实体设备组 - {{ dialogLJ.forms.name }}</span
        >
        <img src="@/assets/img/hl.png" />
      </div>
      <el-form
        style="display: grid; justify-content: center"
        :model="dialogLJ.forms"
        :rules="dialogLJ.rules"
        ref="dialogLJForm"
      >
        <el-form-item label="" prop="">
          <el-transfer
            class="transfer-cd"
            filterable
            :filter-method="
              (query, item) => {
                return item.name.indexOf(query) > -1;
              }
            "
            :titles="['未绑定', '已绑定']"
            :props="{
              key: 'id',
              label: 'name',
            }"
            filter-placeholder="请输入"
            v-model="dialogLJ.forms.deviceGroupIdArray"
            :data="allDeviceGroupLJOpts"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button style="width: 200px" type="primary" @click="dialogLJSubmit"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  pointTypeListAll,
  deviceGroupAddPointToGroup,
  spaceFloorListAll,
  deviceTypeListAll,
  spaceRoomListAll,
  deviceGroupListByPage,
  deviceGroupQueryById,
  deviceGroupDelete,
  deviceGroupEdit,
  deviceGroupAdd,
  deviceGroupListAllBindDeviceForDeviceGroup,
  deviceGroupListAllNotBindDeviceForDeviceGroup,
  deviceGroupAddDeviceToGroup,
  deviceGroupPointLocationListAllByBindForDeviceGroup,
  deviceGroupPointLocationListAllByNotBindForDeviceGroup,
  deviceGroupPointLocationAdd,
  deviceGroupAddDeviceGroupToLogicGroup,
  deviceGroupListAllNotBindLogicGroup,
  deviceGroupListAllBindLogicGroup,
} from "@/api/resource-manage.js";

// 上传
import { uploadUrl } from "@/api/common";
import { getToken } from "@/utils/auth";
import { imgTypeOpts } from "@/common.js";

export default {
  components: { pagination },
  data() {
    return {
      showPage: false,
      hasAuth: true,
      imgTypeOpts,
      // 上传
      uploadedFileUrl: "", // 附件ID数组
      headers: {
        token: getToken(),
      },
      uploadData: {
        type: 3 /*  type 1是楼层图片，2是房间图片，3是设备组图片 */,
      },
      uploadUrl,
      /* --- */
      groupTypeOpts: [
        { id: 1, name: "实体设备组" },
        { id: 2, name: "逻辑设备组" },
      ],
      pointTypeOpts: [],
      floorOpts: [],
      roomOpts: [],
      roomAllOpts: [],
      deviceTypeOpts: [],
      pointBindDeviceGroupOpts: [],
      pointNotBindDeviceGroupOpts: [],
      allPointOpts: [],
      // 绑定设备
      deviceBindDeviceGroupOpts: [],
      deviceNotBindDeviceGroupOpts: [],
      allDeviceOpts: [],
      // 绑定逻辑设备组
      deviceGroupLJBindDeviceGroupOpts: [],
      deviceGroupLJNotBindDeviceGroupOpts: [],
      allDeviceGroupLJOpts: [],
      //
      firstMenuOpts: [],
      secondMenuOpts: [],
      filterForm: {
        // 筛选条件
        floorCode: "",
        roomCode: "",
        deviceGroupCode: "",
        name: "",
        deviceType: null,
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
          name: [{ required: true, trigger: "blur", message: "请输入" }],
          // imgUrl: [{ required: true, message: "请上传图片" }],
          deviceType: [{ required: true, trigger: "blur", message: "请输入" }],
          groupType: [{ required: true, trigger: "blur", message: "请输入" }],
        },
      },
      dialogImg: {
        visible: false,
        forms: {},
        rules: {},
      },
      dialogSB: {
        visible: false,
        forms: {},
        rules: {},
      },
      dialogLJ: {
        visible: false,
        forms: {},
        rules: {},
      },
      listDataCDBind: [],
      listDataCDNotBind: [],
      imgMarkerIdDivMaps: [],
      //
      currentRow: null,
    };
  },
  watch: {
    async "filterForm.floorCode"(n, o) {
      if (!n) return;
      // 一级变,二级也变
      this.roomOpts = [];
      const r = await spaceRoomListAll({ floorCode: n });
      this.roomOpts = r.data;
    },
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
    spaceRoomListAll().then((r) => (this.roomAllOpts = r.data));
    deviceTypeListAll().then((r) => (this.deviceTypeOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    addToBindPointLocation(e) {
      const { imgType, forms } = this.dialogImg;
      if (imgType === "" || imgType === undefined) {
        this.$message.error("请选择绑定测点的图片类型");
        return;
      }
      let currentValue = forms.selectedNotBind; //JSON.parse(JSON.stringify(this.dialogImg.forms.selectedNotBind));
      this.$set(forms, "selectedNotBind", "");
      if (!currentValue) return;
      // 获取测点在照片上的相对位置
      e = e || window.event;
      const x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY;

      const div = document.createElement("img");
      div.src = require(`@/assets/img/open${imgType}.png`);
      // div.src = require('@/assets/img/closeb.png');
      div.title = currentValue.name;
      div.className = "marker";
      let openStyle = "";
      switch (+imgType) {
        case 1:
        case 2:
        case 3:
        case 4:
          openStyle = "transform: translate(-50%, -50%);";
          break;
        case 5:
          openStyle = "transform: translate(-50%, -50%);";
          break;
      }
      div.style = openStyle;

      div.onclick = () => {
        // 点击标记时移除标记,取消绑定
        this.$refs["preiviewImgContainer"].removeChild(div);
        //  移除时也从映射表删除
        const index2 = this.imgMarkerIdDivMaps.findIndex((i) => i.div == div);
        if (index2 > -1) this.imgMarkerIdDivMaps.splice(index2, 1);
        const row = this.listDataCDBind.find((i) => i.id == currentValue.id);
        this.removeToNotBindPointLocation(row);
      };
      div.style.left = x + "px";
      div.style.top = y + "px";
      this.$refs["preiviewImgContainer"].appendChild(div);
      this.imgMarkerIdDivMaps.push({ id: currentValue.id, div: div });

      //获取图片的高度和宽度
      const myImg = this.$refs["preiviewImg"];
      const currWidth = myImg.clientWidth;
      const currHeight = myImg.clientHeight;
      const ProportionHeightInImg = x / currWidth; //鼠标所选位置相对于所选图片高度的比例
      const ProportionWidthInImg = y / currHeight; //鼠标所选位置相对于所选图片宽度的比例
      currentValue.location =
        ProportionWidthInImg + "," + ProportionHeightInImg;
      currentValue.imgType = this.dialogImg.imgType;
      // 添加到表
      this.listDataCDBind.push(currentValue);
      // 从radio列表移除
      const index = this.listDataCDNotBind.indexOf(currentValue);
      if (index > -1) this.listDataCDNotBind.splice(index, 1);
    },

    removeToNotBindPointLocation(row) {
      // 从表删除
      const index = this.listDataCDBind.indexOf(row);
      if (index > -1) this.listDataCDBind.splice(index, 1);
      // 添加到radio列表
      this.listDataCDNotBind = this.listDataCDNotBind.concat(row);
      // 移除图片上对应的marker
      const o = this.imgMarkerIdDivMaps.find((i) => i.id == row.id);
      if (!o) return;
      this.$refs["preiviewImgContainer"].removeChild(o.div);
      //  移除时也从映射表删除
      const index2 = this.imgMarkerIdDivMaps.indexOf(o);
      if (index2 > -1) this.imgMarkerIdDivMaps.splice(index2, 1);
    },

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
    dialogImgSubmit() {
      /* pointList	[array]	是	采集的测点位置数据
         pointId	[int]	是	测点id
         location [string]	是	位置信息
        */
      this.dialogImg.forms.pointList = this.listDataCDBind;
      this.dialogImg.forms.pointList = this.dialogImg.forms.pointList.map(
        (i) => {
          i.pointId = i.id;
          delete i.id;
          return i;
        }
      );
      const { deviceGroupId, pointList } = this.dialogImg.forms;
      deviceGroupPointLocationAdd({ deviceGroupId, pointList }).then((res) => {
        this.$message.success("操作成功!");
        this.dialogImg.visible = false;
        this.getList();
      });
    },
    dialogSBSubmit() {
      this.$refs["dialogSBForm"].validate((valid, obj) => {
        if (valid) {
          deviceGroupAddDeviceToGroup(this.dialogSB.forms).then((res) => {
            this.$message.success("操作成功!");
            this.$refs["dialogSBForm"].resetFields();
            this.dialogSB.visible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    dialogSubmit() {
      this.$refs["dialogForm"].validate((valid, obj) => {
        if (valid) {
          let callAPI = null;
          if (this.dialog.forms.id) {
            callAPI = deviceGroupEdit;
          } else {
            callAPI = deviceGroupAdd;
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
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialog.forms = Object.assign(JSON.parse(JSON.stringify(row)));
      } else {
        this.dialog.forms = { imgUrl: "", roomCode: "" }; //让imgUrl变响应式validateField才有效
      }
      this.dialog.visible = true;
      this.$nextTick((_) => this.$refs["dialogForm"].clearValidate());
    },
    async handleImgDialog(row) {
      this.listLoading = true;
      // 测点搜索相当于重新打开,currentRow用于存上一次打开的
      if (!row) row = this.currentRow;
      this.currentRow = row;
      this.dialog.forms.name = row.name;
      this.pointTypeOpts = [];
      const r = await pointTypeListAll({ deviceTypeId: row.deviceType });
      this.pointTypeOpts = r.data;
      const r1 = await deviceGroupPointLocationListAllByBindForDeviceGroup({
        deviceGroupId: row.id,
      });
      const r2 = await deviceGroupPointLocationListAllByNotBindForDeviceGroup({
        deviceGroupId: row.id,
        pointType: this.dialog.forms.pointType || null,
      });
      this.listDataCDBind = r1.data;
      this.listDataCDNotBind = r2.data;
      // 只是测点搜索,即重载时,移除图片上对应的marker
      this.imgMarkerIdDivMaps.forEach((o) => {
        if (!o || !this.dialogImg.visible) return;
        this.$refs["preiviewImgContainer"].removeChild(o.div);
      });
      //
      this.imgMarkerIdDivMaps = []; //初始化
      this.dialogImg.visible = true;
      this.listLoading = false;
      this.dialogImg.forms.deviceGroupId = row.id;
      this.dialogImg.forms.imgUrl = row.imgUrl;
      // 加载marker
      this.$nextTick((_) => {
        // 在此才能取到图片要素
        const myImg = this.$refs["preiviewImg"];
        const loadMarker = () => {
          this.listDataCDBind.forEach((i) => {
            const location = i.location.split(",");
            if (!location || location.length < 2) return;
            //获取图片的高度和宽度
            const currWidth = myImg.clientWidth;
            const currHeight = myImg.clientHeight;
            const ProportionHeightInImg = location[0]; //鼠标所选位置相对于所选图片高度的比例
            const ProportionWidthInImg = location[1]; //鼠标所选位置相对于所选图片宽度的比例
            // 还原marker位置
            const div = document.createElement("img");
            div.src = require(`@/assets/img/open${i.imgType}.png`);
            div.title = i.name;
            div.className = "marker";
            let openStyle = "";
            switch (+i.imgType) {
              case 1:
              case 2:
              case 3:
              case 4:
                openStyle = "transform: translate(-50%, -50%);";
                break;
              case 5:
                openStyle = "transform: translate(-50%, -50%);";
                break;
            }
            div.style = openStyle;

            div.onclick = () => {
              // 点击标记时移除标记,取消绑定
              this.$refs["preiviewImgContainer"].removeChild(div);
              //  移除时也从映射表删除
              const index2 = this.imgMarkerIdDivMaps.findIndex(
                (i) => i.div == div
              );
              if (index2 > -1) this.imgMarkerIdDivMaps.splice(index2, 1);
              const row = this.listDataCDBind.find((ii) => ii.id == i.id);
              this.removeToNotBindPointLocation(row);
            };

            console.log(
              "location",
              location,
              ProportionHeightInImg,
              ProportionWidthInImg
            );
            console.log("currWidth,currHeight", currWidth, currHeight);
            let x = currWidth * ProportionWidthInImg;
            let y = currHeight * ProportionHeightInImg;
            div.style.left = x + "px";
            div.style.top = y + "px";
            this.$refs["preiviewImgContainer"].appendChild(div);
            this.imgMarkerIdDivMaps.push({ id: i.id, div: div });
          });
        };
        // 第一次
        myImg.onload = () => {
          loadMarker();
        };
        // 第2到n次
        myImg.complete && loadMarker();
      });
    },
    async handleSBDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialogSB.forms = { id: row.id, name: row.name };
        const r1 = await deviceGroupListAllNotBindDeviceForDeviceGroup({
          id: row.id,
        });
        this.deviceNotBindDeviceGroupOpts = r1.data;
        const r2 = await deviceGroupListAllBindDeviceForDeviceGroup({
          id: row.id,
        });
        this.deviceBindDeviceGroupOpts = r2.data;
        this.$set(
          this.dialogSB.forms,
          "deviceIdArray",
          r2.data.map((i) => i.id)
        );
        this.allDeviceOpts = this.deviceNotBindDeviceGroupOpts.concat(
          this.deviceBindDeviceGroupOpts
        );
      }
      this.dialogSB.visible = true;
      this.$nextTick((_) => this.$refs["dialogSBForm"].clearValidate());
    },
    // 绑定逻辑设备组
    async handleLJDialog(row) {
      // dialog显示时获取一级菜单列表
      if (row) {
        // 编辑
        this.dialogLJ.forms = { id: row.id, name: row.name };
        const r1 = await deviceGroupListAllNotBindLogicGroup({
          id: row.id,
        });
        this.deviceGroupLJNotBindDeviceGroupOpts = r1.data;
        const r2 = await deviceGroupListAllBindLogicGroup({
          id: row.id,
        });
        this.deviceGroupLJBindDeviceGroupOpts = r2.data;
        this.$set(
          this.dialogLJ.forms,
          "deviceGroupIdArray",
          r2.data.map((i) => i.id)
        );
        this.allDeviceGroupLJOpts = this.deviceGroupLJNotBindDeviceGroupOpts.concat(
          this.deviceGroupLJBindDeviceGroupOpts
        );
      }
      this.dialogLJ.visible = true;
      this.$nextTick((_) => this.$refs["dialogLJForm"].clearValidate());
    },
    dialogLJSubmit() {
      this.$refs["dialogLJForm"].validate((valid, obj) => {
        if (valid) {
          deviceGroupAddDeviceGroupToLogicGroup(this.dialogLJ.forms).then(
            (res) => {
              this.$message.success("操作成功!");
              this.$refs["dialogLJForm"].resetFields();
              this.dialogLJ.visible = false;
              this.getList();
            }
          );
        } else {
          return false;
        }
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deviceGroupDelete({
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
      deviceGroupListByPage(this.filterForm)
        .then((res) => {
          this.hasAuth = true;
          this.listData = res.data.list;
          this.listTotal = res.data.total;
          this.listLoading = false;
        })
        .catch((e) => {
          this.hasAuth = false;
        })
        .finally((_) => {
          this.showPage = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.device-group-manage {
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
    .el-dialog__body {
      margin-top: -30px;
      overflow: hidden;
    }
    .el-dialog {
      // padding-bottom: 3rem;
    }
    .content-head {
      display: grid;
      grid-template-columns: 20fr 9fr 9fr auto;
      align-items: end;
      justify-items: center;
      margin-bottom: 10px;
    }
    .grid {
      display: grid;
      grid-template-columns: 4fr 350px;
      border: 1px solid;
      border-radius: 3px;
      height: 70vh;
      .left {
        border-right: 2px solid;
        display: grid;
        justify-content: center;
        align-items: center;
        overflow: auto;
        padding: 3px;
        .marker {
          position: absolute;
        }
      }
      .right {
        display: grid;
        grid-template-rows: 35vh 35vh;
        .radios {
          display: grid;
          gap: 10px;
          overflow: auto;
          padding: 1rem;
          margin-bottom: 1rem;
          .el-radio.is-bordered + .el-radio.is-bordered {
            margin-left: 0;
          }
        }
        .table {
          border-top: 2px solid;
          border-radius: 5px;
          overflow: auto;
        }
      }
    }
    // background: #0b2a52;
    // .el-dialog__body {
    //   display: grid;
    //   padding: 30px 20px 30px;
    // }
    // .el-dialog__header {
    //   display: none;
    // }
  }
}

::v-deep {
  .btm-table {
    .el-table__body-wrapper {
      // 会导致宽度无限增长
      // height: 170px;
      // overflow: auto;
    }
  }

  .el-icon-bdsb {
    background: url("../../../assets/img/bdsb.png");
    width: 14px;
    height: 12px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .transfer-cd {
    .el-transfer__buttons {
      padding: 0 5px;
    }
    .el-transfer-panel {
      width: 350px;
    }
  }
}
</style>
