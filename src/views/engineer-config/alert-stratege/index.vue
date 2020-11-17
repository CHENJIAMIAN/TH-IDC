<template>
  <div class="components-container board">
    <Kanban
      :key="1"
      :list="list1"
      :group="group"
      class="kanban todo"
      header-text="Todo"
    />
    <Kanban
      :key="2"
      :list="list2"
      :group="group"
      class="kanban working"
      header-text="Working"
    />
    <Kanban
      :key="3"
      :list="list3"
      :group="group"
      class="kanban done"
      header-text="Done"
    />
    <el-button @click="list3 = deepClone(noteModeOpts)">恢复默认3</el-button>
  </div>
</template>
<script>
import Kanban from "@/components/Kanban";
import { isIntNumber, noteModeOpts } from "@/views/resource-manage/common.js";
import {deepClone} from "@/utils"
export default {
  name: "DragKanbanDemo",
  components: {
    Kanban,
  },
  data() {
    return {
      deepClone,
      noteModeOpts,
      group: "mission",
      list1: [
        { id: 1, name: "邮箱" },
        { id: 2, name: "短信" },
        { id: 3, name: "语音" },
        { id: 4, name: "微信" },
        { id: 5, name: "钉钉" },
        { id: 6, name: "声光" },
      ],
      list2: [
        { id: 1, name: "邮箱" },
        { id: 2, name: "短信" },
        { id: 3, name: "语音" },
        { id: 4, name: "微信" },
        { id: 5, name: "钉钉" },
        { id: 6, name: "声光" },
      ],
      list3: [
        { id: 1, name: "邮箱" },
        { id: 2, name: "短信" },
        { id: 3, name: "语音" },
        { id: 4, name: "微信" },
        { id: 5, name: "钉钉" },
        { id: 6, name: "声光" },
      ],
    };
  },
};
</script>
<style lang="scss">
.board {
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  color: black;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

