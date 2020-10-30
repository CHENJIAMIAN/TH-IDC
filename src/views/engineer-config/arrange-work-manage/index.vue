<template>
  <div class="app-container user-manage">
    <!-- 筛选条件 -->
    <div class="head">
      <el-form
        :inline="true"
        size="medium"
        style="display: grid; grid-auto-flow: column"
      >
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset()"
            >重置</el-button
          >
            <el-button type="primary" size="medium" @click="handleAdd">
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
      :cell-class-name="tableCellClassName" 
      @cell-click="cellClick"
    >
        <!-- <el-table-column      type="index"     label="编号">    </el-table-column> -->
      <el-table-column sortable prop="id" label="编号" />
      <el-table-column sortable prop="week1List" label="星期一" >
        <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week1IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week1ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week2List" label="星期二" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week2IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week2ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week3List" label="星期三" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week3IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week3ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week4List" label="星期四" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week4IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week4ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week5List" label="星期五" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week5IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week5ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week6List" label="星期六" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week6IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week6ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column sortable prop="week7List" label="星期日" >
              <template slot-scope="{ row, column, $index }">
          <el-select
           v-model="row.week7IdList"
           multiple
           @visible-change="handleASDF($event,{ row, column, $index })"
@change="handlePersonChange($event,{ row, column, $index })"
          >
            <el-option
              v-for="item in row.week7ListAll"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-delete"
            type="primary"
            plain
            @click="handleDel(row.id)"
          ></el-button>
        </template>
      </el-table-column>
        <el-table-column label="状态" align="center" width="240">
        <template slot-scope="{ row }">
          <el-switch
            @change="handleStatusChange($event,row)"
            v-model="row.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {
  arrangeWorkListAllUserNotBind,
  arrangeWorkListAllUserBind,
  arrangeWorkAdd,
  arrangeWorkDelete,
  arrangeWorkEdit,
  arrangeWorkListAll,
  arrangeWorkUpdatePassword,
  arrangeWorkQueryById,
  arrangeWorkUpdateStatus,
} from "@/api/engineer-config.js";
export default {
  components: { pagination },
  data() {
    return {
      userNotBindOpts: [],
      userBindOpts: [],
      listLoading: true,
      listData: [], // 列表数据

      dialog: {
        id: "",
        visible: false,
        forms: {},
        rules: {
          userName: [{ required: true, trigger: "blur", message: "请输入" }],
          password: [{ required: true, trigger: "blur", message: "请输入" }],
          realName: [{ required: true, trigger: "blur", message: "请输入" }],
          phone: [{ required: true, trigger: "blur", message: "请输入" }],
          departmentId: [
            { required: true, trigger: "change", message: "请输入" },
          ],
          roleIdArray: [{ required: true, trigger: "blur", message: "请输入" }],
          status: [{ required: true, trigger: "change", message: "请输入" }],
        },
      },
    };
  },
  created() {
    arrangeWorkListAllUserNotBind().then((r) => (this.userNotBindOpts = r.data));
    arrangeWorkListAllUserBind().then((r) => (this.userBindOpts = r.data));
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handlePersonChange(v,{ row, column, $index }){
       arrangeWorkEdit({id:row.id,week:column.index,userIdArray:row[`week${column.index}IdList`]}).then(r=>{
          this.$set(row,`week${column.index}ListAll`,r.data)
        })
    },
    handleStatusChange(v,row){
      arrangeWorkUpdateStatus({id:row.id,status:v});
    },
     tableCellClassName({row, column, rowIndex, columnIndex}){//注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index=rowIndex;
      column.index=columnIndex;
    },
    cellClick(row, column, cell, event){
        console.log(row.index);
        console.log(column.index);      
    },
    handleASDF(v,{ row, column, $index }){
        if(v && column.index >0 && column.index <8){
            arrangeWorkListAllUserNotBind({id:row.id,week:column.index}).then(r=>{
                this.$set(row,`week${column.index}ListAll`,r.data)
            })
        }
    },
    // 查询
    handleQuery() {
      this.getList();
    },
    handleAdd(){
      arrangeWorkAdd();
      this.getList();
    },
    // 重置
    handleReset(form) {
      this.handleQuery();
    },
    // 删除
    handleDel(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          arrangeWorkDelete({
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
      arrangeWorkListAll().then((res) => {
        this.listData = res.data;
        this.listData.map((i,index)=>{
            i.week1IdList = i.week1List.map(i=>i.name);
            i.week2IdList = i.week2List.map(i=>i.name);
            i.week3IdList = i.week3List.map(i=>i.name);
            i.week4IdList = i.week4List.map(i=>i.name);
            i.week5IdList = i.week5List.map(i=>i.name);
            i.week6IdList = i.week6List.map(i=>i.name);
            i.week7IdList = i.week7List.map(i=>i.name);
        })
        console.log(this.listData);
        this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-manage {
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
