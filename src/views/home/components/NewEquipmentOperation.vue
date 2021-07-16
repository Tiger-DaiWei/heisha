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
        <span>{{ key }}：</span>
        <div
          v-for="childItem in value"
          :key="childItem.label"
          @click="setInvokeServiceDevice(childItem)">
          {{ childItem.label }}
        </div>
      </li>
    </ul>
    <h4>Position Bar Module</h4>
    <ul>
      <li
        v-for="(value, key, index) in positionBarModule"
        :key="index">
        <span>{{ key }}：</span>
        <div
          v-for="childItem in value"
          :key="childItem.label"
          @click="setInvokeServiceDevice(childItem)">
          {{ childItem.label }}
        </div>
      </li>
    </ul>
    <h4>Canopy Bar Module</h4>
    <ul>
      <li
        v-for="(value, key, index) in canopyBarModuleValue"
        :key="index">
        <span>{{ key }}：</span>
        <div
          v-for="childItem in value"
          :key="childItem.label"
          @click="setInvokeServiceDevice(childItem)">
          {{ childItem.label }}
        </div>
      </li>
    </ul>
    <h4>Charge Module</h4>
    <ul>
      <li
        v-for="(value, key, index) in chargeValue"
        :key="index">
        <span>{{ key }}：</span>
        <div
          v-for="childItem in value"
          :key="childItem.label"
          @click="setInvokeServiceDevice(childItem)">
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
        Remote: [
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
        Sys_reset: [
          { label: 'sys_reset', value: '{ "sys_reset":1 }', identifier: 'sys_service' },
        ],
      },
      positionBarModule: {
        Bar: [
          { label: 'reset', value: '{ "reset_bar":1 }', identifier: 'position_bar:GZService' },
          { label: 'take', value: '{ "takebar":1 }', identifier: 'position_bar:GZService' },
          { label: 'release', value: '{ "releasebar":1 }', identifier: 'position_bar:GZService' },
        ],
      },
      canopyBarModuleValue: {
        Canopy: [
          { label: 'reset', value: '{ "Canopyreset":1 }', identifier: 'canopy:GTService' },
          { label: 'open', value: '{ "Canopyopen":1 }', identifier: 'canopy:GTService' },
          { label: 'off', value: '{ "Canopyoff":1 }', identifier: 'canopy:GTService' },
        ],
      },
      chargeValue: {
        Charge: [
          { label: 'start', value: '{ "startcharge":1 }', identifier: 'charge:CDService' },
          { label: 'stop', value: '{ "stopcharge":1 }', identifier: 'charge:CDService' },
        ],
        Battery: [
          { label: 'open', value: '{ "openbattery":1 }', identifier: 'charge:CDService' },
          { label: 'off', value: '{ "offbattery":1 }', identifier: 'charge:CDService' },
        ],
      },
    };
  },
  mounted() {
    this.getDeviceMessageInterface();
  },
  methods: {
    /**
     * @description 设备服务调用
     * @param deviceName 设备名称
     * @param identifier 操作类型
     * @param parameters 操作参数，json格式
     * @param productKey 产品key
    */
    setInvokeServiceDevice(obj) {
      const { value, identifier } = obj;
      this.pageLoding = true;
      const { deviceName, productKey } = this.deviceDetails;
      invokeServiceDevice({
        deviceName,
        productKey,
        identifier,
        parameters: JSON.parse(value),
      }).then(({ code, message }) => {
        if (code === 200) {
          this.$message({
            type: 'success',
            message: message || '操作成功',
          })
          this.getDeviceMessageInterface();
        } else {
          this.$message({
            type: 'error',
            message: message || '操作失败',
          })
        }
      }).finally(() => {
        this.pageLoding = false;
      });
    },
    /**
     * @description 设备状态接口数据获取
     * @param deviceName 设备名称
     * @param productKey 设备对应产品的key
    */
    getDeviceMessageInterface() {
      this.pageLoding = true;
      const { deviceName, productKey } = this.deviceDetails;
      getDeviceMessage({
        deviceName,
        productKey,
      }).then(({ code, data, message }) => {
        if (code === 200) {
          console.log(data);
          const { status } = data;
          this.systemState = status;
        } else {
          this.$message({
            type: 'error',
            message: message || '获取设备状态失败',
          })
        }
      }).finally(() => {
        this.pageLoding = false;
      });
    },
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
      margin-bottom: 14px;
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
