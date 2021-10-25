<template>
  <div
    :class="['two-way-arrow', {'virtual-reality': virtualReality}]"
    :style="{'width': `${arrowWidth}px`, 'transform': `rotate(${rotatingDegree}deg)`}">
    <div
      class="line"
      :style="{'width': `${arrowWidth - 12}px`}"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoWayArrow',
  props: {
    // 旋转度数
    rotatingDegree: {
      type: Number,
      default: 0,
    },
    // 长度
    arrowWidth: {
      type: Number,
      default: 100,
    },
    // 虚实(1: 实线；0虚线)
    virtualReality: {
      type: Number,
      default: 1,
    }
  },
}
</script>

<style lang="scss" scoped>
.two-way-arrow {
  height: 8px;
  position: relative;
  // 水平方向箭头
  &::before {
    display: block;
    content: '';
    border-left: 6px solid transparent;
    border-top: 4px solid transparent;
    border-right: 6px solid red;
    border-bottom: 4px solid transparent;
    position: absolute;
    left: -6px;
    top: 0;
    z-index: 20;
  }
  &::after {
    display: block;
    content: '';
    border-left: 6px solid red;
    border-top: 4px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 4px solid transparent;
    position: absolute;
    right: -6px;
    top: 0;
    z-index: 20;
  }
  .line {
    height: 0;
    border: 1px dashed red;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  &.virtual-reality {
    .line {
      border: 1px solid #000;
      background: #000;
    }
    &::before {
      border-right-color: #000;
    }
    &::after {
      border-left-color: #000;
    }
  }
}
</style>
