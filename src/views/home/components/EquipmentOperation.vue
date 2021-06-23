<template>
  <div
    class="equipment-operation"
    v-loading="pageLoding"
  >
    <h4>System State</h4>
    <ul>
      <li><span>System State:</span>Online</li>
      <li><span>Operation Mode:</span>Normal</li>
      <li>
        <span>Normal</span>
        <div
          v-for="item in systemStateValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Position Bar Module</h4>
    <ul>
      <li><span>Position Bar State:</span>Unlocked</li>
      <li>
        <div
          v-for="item in positionBarModule"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Canopy Bar Module</h4>
    <ul>
      <li><span>Canopy State:</span>Open</li>
      <li>
        <div
          v-for="item in canopyBarModuleValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Charge Module</h4>
    <ul>
      <li><span>Charge State:</span>Uncharged</li>
      <li>
        <div
          v-for="item in chargeValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <ul>
      <li><span>Charge Voltage:</span>17.4V</li>
      <li><span>Charge Current:</span>2.5A</li>
      <li><span>Battery Temperature:</span>35 °C</li>
    </ul>
    <ul>
      <li><span>Battery State:</span>Power Off</li>
      <li>
        <div
          v-for="item in batteryValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Edge Computer Module</h4>
    <ul>
      <li><span>Android Power State:</span>Power On</li>
      <li>
        <div
          v-for="item in androidPowerValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <ul>
      <li><span>Nvidia Power State:</span>Power On</li>
      <li>
        <div
          v-for="item in nvidiaPowerValue"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <ul>
      <li><span>Remote Controller Operate</span></li>
      <li>
        <div
          v-for="item in remoteControllerOperate"
          :key="item.label"
          @click="setInvokeServiceDevice(item)">
          {{ item.label }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDeviceMessage, invokeServiceDevice } from '@/api/heiShaProduct';
export default {
  name: 'EquipmentOperation',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      pageLoding: false,
      systemStateValue: [
        { label: 'Test Mode', value: '{ "mode": 1 }', identifier: 'set_working_mode' },
        { label: 'Normal Mode', value: '{ "mode": 0 }', identifier: 'set_working_mode' },
      ],
      positionBarModule: [
        { label: 'Lock', value: '{ "code":1 }', identifier: 'position_bar:position_bar_operate' },
        { label: 'Unlock', value: '{ "code":2 }', identifier: 'position_bar:position_bar_operate' },
        { label: 'Reset', value: '{ "code":0 }', identifier: 'position_bar:position_bar_operate' },
      ],
      canopyBarModuleValue: [
        { label: 'Close', value: '{ "code":1 }', identifier: 'canopy:canopy_operate' },
        { label: 'Open', value: '{ "code":2 }', identifier: 'canopy:canopy_operate' },
        { label: 'Reset', value: '{ "code":0 }', identifier: 'canopy:canopy_operate' },
      ],
      chargeValue: [
        { label: 'Start Charge', value: '{ "code":1 }', identifier: 'charge:charge_operate' },
        { label: 'Stop Charge', value: '{ "code":2 }', identifier: 'charge:charge_operate' },
      ],
      batteryValue: [
        { label: 'Turn On', value: '{ "code":0 }', identifier: 'charge:battery_operate' },
        { label: 'Turn Off', value: '{ "code":1 }', identifier: 'charge:battery_operate' },
      ],
      androidPowerValue: [
        { label: 'Turn On', value: '{ "channel":0, "op":1 }', identifier: 'edge_computer:power_operate' },
        { label: 'Turn Off', value: '{ "channel":0, "op":0 }', identifier: 'edge_computer:power_operate' },
      ],
      nvidiaPowerValue: [
        { label: 'Turn On', value: '{ "channel":1, "op":1 }', identifier: 'edge_computer:power_operate' },
        { label: 'Turn Off', value: '{ "channel":1, "op":0 }', identifier: 'edge_computer:power_operate' },
      ],
      remoteControllerOperate: [
        { label: 'Turn On', value: '{ "op":0 }', identifier: 'edge_computer:rc_operate' },
        { label: 'Turn Off', value: '{ "op":1 }', identifier: 'edge_computer:rc_operate' },
      ],
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
      this.pageLoding = true;
      const { deviceName, productKey } = this.deviceDetails;
      const { value, identifier } = obj;
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
      }).then(({ code, message }) => {
        if (code !== 200) {
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
    padding: 20px 50px;
    li {
      display: inline-block;
      margin-right: 50px;
      span {
        margin-right: 20px;
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
        }
      }
    }
  }
}
</style>
