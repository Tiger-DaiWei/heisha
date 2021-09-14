<template>
  <div class="device-operate">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <!-- 视频流相关 -->
    <div class="operate-btn flex-row">
      <ol class="width300">
        <li
          v-for="(item, index) in operateList"
          :key="index"
          >
          <span
            v-for="item1 in item.value"
            :key="item1.key"
            >{{ item1.title }}</span>
          <div>操作</div>
        </li>
      </ol>
      <div class="flex5"></div>
    </div>
    <!-- 充电相关 -->
    <div class="operate-btn flex-row">
      <ol class="width300">
        <li
          v-for="(item, index) in voltageList"
          :key="index"
          >
          <span
            v-for="item1 in item.value"
            :key="item1.key"
            >{{ item1.title }}</span>
          <div>操作</div>
        </li>
      </ol>
      <div class="flex5"></div>
    </div>
  </div>
</template>

<script>
import { getDeviceMessage } from '@/api/heiShaProduct';
export default {
  name: 'DeviceOperation',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 视频流相关操作
      operateList: [
        { value: [{ title: '防雨盖状态：', key: '1' }] },
        { value: [{ title: '安卓供电状态：', key: '11' }] },
        { value: [{ title: '无人机状态：', key: '12' }] },
        { value: [{ title: '归中杆状态：', key: '13' }] },
        { value: [{ title: '英伟达供电状态：', key: '14' }] },
        { value: [{ title: '遥控器操作：', key: '15' }] },
      ],
      // 视频流相关数据
      operateData: {},
      // 电压相关操作
      voltageList: [
        { 
          value: [
            { title: '充电状态：关机充电', key: '1' },
            { title: '电池类型：4S', key: '111' },
          ]
        },
        {
          value: [
            { title: '电压：17.2V', key: '11' },
            { title: '电流：2.3A', key: '113' },
          ]
        },
        {
          value: [
            { title: ' 充电时长：20分钟', key: '12' }
          ]
        },
      ],
      // 电压相关数据
      voltageData: {},
    };
  },
  mounted() {
    this.getDeviceMessageInterface();
  },
  methods: {
    /**
     * @description 设备状态接口数据获取
     * @param deviceName 设备名称
     * @param productKey 设备对应产品的key
    */
    getDeviceMessageInterface() {
      const { deviceName, productKey } = this.deviceDetails;
      getDeviceMessage({
        deviceName,
        productKey,
      }).then(({ code, data, message }) => {
        if (code === 200) {
          console.log(data);
        } else {
          this.$message({
            type: 'error',
            message: message || '获取设备状态失败',
          })
        }
      }).finally(() => {
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.device-operate {
  padding: 20px;
  .title {
    font-size: 14px;
    border-bottom: 1px solid rgb(194, 194, 194);
    line-height: 40px;
    span {
      margin-right: 18px;
    }
  }
  .operate-btn {
    padding: 20px 0;
    margin-bottom: 16px;
    ol {
      margin-right: 16px;
      li {
        margin-bottom: 10px;
        height: 32px;
        line-height: 32px;
        span {
          margin-right: 10px;
        }
        div {
          padding: 6px 20px;
          line-height: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: rgb(222, 222, 222);
          cursor: pointer;
          float: right;
        }
      }
    }
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .width300 {
    width: 300px;
  }
  .flex5 {
    flex: 5;
  }
}
</style>
