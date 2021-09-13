<template>
  <div class="tree-mock-node">
    <div
      :class="[{ 'isTips': isWarning }, 'list']"
      slot="reference"
      v-if="!isWarning"
    >
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
    <!-- 报错提示 -->
    <el-popover
      v-else
      placement="right"
      width="300"
      trigger="hover"
    >
      <div class="tree-log">
        <p>故障代码：{{ contentTips.code || '--' }} </p>
        <p>上报时间：{{ toReturnTime(contentTips.date) }} </p>
        <p>故障描述：{{ contentTips.desc || '--' }} </p>
        <p>维护建议：{{ contentTips.recommend || '--' }} </p>
        <div class="btn">消除</div>
      </div>
      <div
        :class="[{ 'isTips': isWarning }, 'list']"
        slot="reference"
      >
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
    </el-popover>
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
import moment from 'moment';
export default {
  name: 'TreeMockNode',
  props: {
    treeData: {
      type: Object,
      default: () => ({
        name: '',
        show: false,
        content: '',
        childNode: [],
      }),
    },
  },
  data() {
    return {};
  },
  computed: {
    // 是否有子节点
    isHasChildren() {
      return this.treeData.childNode && this.treeData.childNode.length;
    },
    // 当前节点是否需要预警提示
    isWarning() {
      return this.treeData.eventStatus === 'alert' || this.treeData.eventStatus === 'error';
    },
    // 预警内容提示
    contentTips() {
      if (!this.treeData.content) return '';
      const objTips = JSON.parse(this.treeData.content);
      return objTips || {};
    },
  },
  methods: {
    // 返回满足要求的日期
    toReturnTime(str) {
      return str ? moment(str).format('YYYY-MM-DD HH:mm:ss') : '--';
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
  .isTips {
    color: red;
    .only {
      border-color: red;
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
.tree-log {
  padding: 20px;
  .btn {
    line-height: 28px;
    width: 100px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: rgb(222, 222, 222);
    cursor: pointer;
    margin: 20px auto 0;
  }
}
</style>
