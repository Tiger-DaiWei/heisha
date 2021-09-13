<template>
  <div class="device-info">
    <!-- tab栏 -->
    <ul class="tab">
      <li
        v-for="item in tabList"
        :key="item.name"
        :class="{ active: activeName === item.name }"
        @click="handleClick(item.name)">
        {{ item.label }}
      </li>
    </ul>
    <!-- tab栏对应下的组件内容 -->
    <div class="detail">
      <DeviceManagement :deviceDetails="deviceDetails"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfo',
  components: {
    DeviceManagement: () => import('@/views/home/components/DeviceManagement'),
  },
  data() {
    return {
      // tab栏
      tabList: [
        { name: 'DeviceManagement', label: '设备管理' },
        { name: 'DeviceStatus', label: '设备状态' },
        { name: 'DeviceOperation', label: '设备操作' },
        { name: 'CommunicationStatus', label: '通讯状态' },
        { name: 'EventStatus', label: '事件状态' },
      ],
      activeName: 'DeviceStatus',
    };
  },
  computed: {
    deviceDetails() {
      return JSON.parse(localStorage.getItem('deviceDetails'));
    }
  },
  methods: {
    /***
     * @method tab栏点击事件
     * @params str(String)当前点击tab
     */
    handleClick(str) {
      if (this.activeName === str) return false;
      this.activeName = str;
    }
  },
}
</script>

<style lang="scss" scoped>
.device-info {
  padding: 10px;
  font-size: 12px;
  .tab {
    li {
      display: inline-block;
      line-height: 30px;
      height: 34px;
      border: 2px solid rgb(146, 146, 146);
      border-radius: 6px 6px 0 0;
      padding: 0 16px;
      margin-right: -2px;
      background: rgb(235, 235, 235);
      color: rgb(76, 76,76);
      cursor: pointer;
      &.active {
        border-bottom-color: transparent;
        background: #fff;
      }
    }
  }
  .detail {
    border: 2px solid rgb(146, 146, 146);
    margin-top: -2px;
    min-height: 300px;
    background: #fff;
  }
}
</style>
