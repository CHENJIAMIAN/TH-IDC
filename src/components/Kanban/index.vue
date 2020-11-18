<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      v-on="$listeners"
      class="board-column-content"
      :set-data="setData"
    >
      <div
        v-for="(element, index) in list"
        :key="element.id"
        class="board-item"
      >
        {{ element.name }} {{ element.id }}
        {{ index === list.length - 1 ? "" : "➡" }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DragKanbanDemo",
  components: {
    draggable,
  },
  props: {
    headerText: {
      type: String,
      default: "Header",
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    },
  },
};
</script>
<style lang="scss" scoped>
.board-column {
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  display: grid;
  grid-auto-flow: column;

  .board-column-header {
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
    line-height: 90px;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-direction: row;

    .board-item {
      cursor: pointer;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }
}
</style>

