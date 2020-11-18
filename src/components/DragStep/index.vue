<template>
  <div class="board-column">
    <draggable
      :list="list"
      v-bind="$attrs"
      v-on="$listeners"
      class="board-column-content"
      :set-data="setData"
    >
      <template v-for="(element, index) in list">
        <div
          :key="element.id + Math.random()"
          @click="list.splice(index, 1)"
          title="点击移除"
          class="board-item"
        >
          {{ element.name }}
          <!-- {{ element.id }} -->
        </div>
        {{ index === list.length - 1 ? "" : "➡" }}
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DragStep",
  components: {
    draggable,
  },
  props: {
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
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

    .board-item {
      cursor: pointer;
      border-color: rgba(45, 180, 221, 0.96);
      border: 1px solid;
      padding: 0px 10px;
      border-radius: 5px;
    }
  }
}
</style>

