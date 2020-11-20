<template>
  <div class="board-column">
    <draggable
      :list="list"
      v-bind="$attrs"
      v-on="$listeners"
      class="board-column-content"
      :set-data="setData"
    >
      <div
        v-for="(element, index) in list"
        :key="index + Math.random()"
        @click="deleteable && list.splice(index, 1)"
        title="点击移除"
      >
        <span class="board-item">{{ element.name }}</span>
        <!-- {{ element.id }} -->
        <span style="color: #31c6f1" v-if="hasArrow">{{
          index === list.length - 1 ? "" : "➡"
        }}</span>
      </div>
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
    deleteable: {
      type: Boolean,
      default: false,
    },
    hasArrow: {
      type: Boolean,
      default: false,
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
    log: function (evt) {
      window.console.log(evt);
    },
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
      height: 100%;

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
    font-size: 1.2rem;
        height: 100%;

    .board-item {
      cursor: pointer;
      border: 1px solid;
      padding: 0px 10px;
      border-radius: 5px;
      border-color: #31c6f1;
      color: #31c6f1;
    }
  }
}
</style>

