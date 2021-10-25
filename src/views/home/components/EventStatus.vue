<template>
  <div class="event-status">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'EventStatus',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  }
}
</script>

<style lang='scss' scoped>
.event-status {
  padding: 20px;
  .title {
    font-size: 14px;
    border-bottom: 1px solid rgb(194, 194, 194);
    line-height: 40px;
    span {
      margin-right: 18px;
    }
  }
}
</style>