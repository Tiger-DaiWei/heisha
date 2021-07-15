<template>
  <div
    class="equipment-operation"
    v-loading="pageLoding"
  >
    <h4>System State</h4>
    <ul>
      <li><span>System State:</span>{{ systemState }}</li>
      <li
        v-for="(value, key, index) in systemStateValue"
        :key="index">
        <span>{{ key }}</span>
        <div
          v-for="childItem in value"
          :key="childItem.label"
          @click="setInvokeServiceDevice(item, 'operationMode')">
          {{ childItem.label }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDeviceMessage, invokeServiceDevice } from '@/api/heiShaProduct';
export default {
  name: 'NewEquipmentOperation',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      pageLoding: false,
      systemState: '',
      systemStateValue: {
        remote: [
          { label: 'off', value: '{ "remote_off":1 }', identifier: 'sys_service' },
          { label: 'open', value: '{ "remote_open":1 }', identifier: 'sys_service' },
        ],
        AndroidPower: [
          { label: 'off', value: '{ "AndroidPowerOff":1 }', identifier: 'sys_service' },
          { label: 'open', value: '{ "AndroidPowerOpen":1 }', identifier: 'sys_service' },
        ],
        NvidiaPower: [
          { label: 'off', value: '{ "NvidiaPowerOff":1 }', identifier: 'sys_service' },
          { label: 'open', value: '{ "NvidiaPowerOpen":1 }', identifier: 'sys_service' },
        ],
        sys_reset: [
          { label: 'sys_reset', value: '{ "sys_reset":1 }', identifier: 'sys_service' },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    /**
     * @description 设备服务调用
     * @param deviceName 设备名称
     * @param identifier 操作类型
     * @param parameters 操作参数，json格式
     * @param productKey 产品key
    */
    setInvokeServiceDevice() {},
  },
}
</script>

<style lang="scss" scoped>
.equipment-operation {
  h4 {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding: 0 30px;
    background-color: rgb(5, 163, 155);
    color: #fff;
  }
  > ul {
    padding: 20px;
    li {
      margin-right: 50px;
      span {
        margin-right: 20px;
        display: inline-block;
        width: 110px;
      }
      div {
        display: inline-block;
        height: 40px;
        line-height: 36px;
        border: 2px solid #000;
        border-radius: 6px;
        margin-right: 14px;
        padding: 0 16px;
        background-color: #ccc;
        cursor: pointer;
        &.status {
          background: rgb(5, 163, 155);
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
