<template>
  <div class="tree-mock-node">
    <div class="list">
      <el-checkbox
        v-if="isHasChildren"
        v-model="treeData.show"
      >
        {{ treeData.name }}
      </el-checkbox>
      <template v-else>
        <span class="only" />
        {{ treeData.name }}
      </template>
    </div>
    <div
      v-if="isHasChildren && treeData.show"
      class="line">
      <TreeMockNode
        v-for="(item, index) in treeData.childNode"
        :key="index"
        :treeData="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeMockNode',
  props: {
    treeData: {
      type: Object,
      default: () => ({
        name: '',
        show: false,
        childNode: [],
      }),
    },
  },
  data() {
    return {};
  },
  computed: {
    isHasChildren() {
      return this.treeData.childNode && this.treeData.childNode.length;
    },
  },
}
</script>

<style lang="scss" scoped>
.tree-mock-node {
  padding-left: 30px;
  line-height: 24px;
  .list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .only {
      width: 14px;
      height: 14px;
      border-radius: 100%;
      border: 1px solid #ccc;
      margin-right: 10px;
    }
  }
  .line {
    position: relative;
    &::before {
      display: block;
      content: '';
      position: absolute;
      left: 6px;
      top: 0;
      height: 100%;
      border: 0.5px dashed #ccc;
    }
  }
}
</style>
