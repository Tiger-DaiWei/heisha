<template>
  <div
    class="equipment-operation"
    v-loading="pageLoding"
  >
    <h4>System State</h4>
    <ul>
      <li><span>System State:</span>{{ systemState }}</li>
      <li><span>Operation Mode:</span>{{ operationModeList[operationMode] }}</li>
      <li>
        <span>Normal</span>
        <div
          v-for="item in systemStateValue"
          :key="item.label"
          :class="{ status: operationMode === item.number }"
          @click="setInvokeServiceDevice(item, 'operationMode')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Position Bar Module</h4>
    <ul>
      <li><span>Position Bar State:</span>{{ posiTionBarStateList[posiTionBarState] }}</li>
      <li>
        <div
          v-for="item in positionBarModule"
          :key="item.label"
          :class="{ status: posiTionBarState === item.number }"
          @click="setInvokeServiceDevice(item, 'posiTionBarState')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Canopy Bar Module</h4>
    <ul>
      <li><span>Canopy State:</span>{{ canopyStateList[canopyState] }}</li>
      <li>
        <div
          v-for="item in canopyBarModuleValue"
          :key="item.label"
          :class="{ status: canopyState === item.number }"
          @click="setInvokeServiceDevice(item, 'canopyState')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Charge Module</h4>
    <ul>
      <li><span>Charge State:</span>{{ chargeStateList[chargeState] }}</li>
      <li>
        <div
          v-for="item in chargeValue"
          :key="item.label"
          :class="{ status: chargeState === item.number }"
          @click="setInvokeServiceDevice(item, 'chargeState')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <ul>
      <li><span>Charge Voltage:</span>{{ chargeVoltage }}V</li>
      <li><span>Charge Current:</span>{{ chargeCurrent }}A</li>
      <li><span>Battery Temperature:</span>{{ batteryTemperature }}°C</li>
    </ul>
    <ul>
      <li><span>Battery State:</span>{{ batteryStateList[batteryState] }}</li>
      <li>
        <div
          v-for="item in batteryValue"
          :key="item.label"
          :class="{ status: batteryState === item.number }"
          @click="setInvokeServiceDevice(item, 'batteryState')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <h4>Edge Computer Module</h4>
    <ul>
      <li><span>Android Power State:</span>{{ onOrOffList[androidPowerState] }}</li>
      <li>
        <div
          v-for="item in androidPowerValue"
          :key="item.label"
          :class="{ status: androidPowerState === item.number }"
          @click="setInvokeServiceDevice(item, 'androidPowerState')">
          {{ item.label }}
        </div>
      </li>
    </ul>
    <ul>
      <li><span>Nvidia Power State:</span>{{ onOrOffList[nvidiaPowerState] }}</li>
      <li>
        <div
          v-for="item in nvidiaPowerValue"
          :key="item.label"
          :class="{ status: nvidiaPowerState === item.number }"
          @click="setInvokeServiceDevice(item, 'nvidiaPowerState')">
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
        { label: 'Test Mode', value: '{ "mode": 1 }', identifier: 'set_working_mode', number: 1 },
        { label: 'Normal Mode', value: '{ "mode": 0 }', identifier: 'set_working_mode', number: 0 },
      ],
      positionBarModule: [
        { label: 'Lock', value: '{ "code":1 }', identifier: 'position_bar:position_bar_operate', number: 1 },
        { label: 'Unlock', value: '{ "code":2 }', identifier: 'position_bar:position_bar_operate', number: 2 },
        { label: 'Reset', value: '{ "code":0 }', identifier: 'position_bar:position_bar_operate', number: 0 },
      ],
      canopyBarModuleValue: [
        { label: 'Close', value: '{ "code":1 }', identifier: 'canopy:canopy_operate', number: 1 },
        { label: 'Open', value: '{ "code":2 }', identifier: 'canopy:canopy_operate', number: 2 },
        { label: 'Reset', value: '{ "code":0 }', identifier: 'canopy:canopy_operate', number: 0 },
      ],
      chargeValue: [
        { label: 'Start Charge', value: '{ "code":1 }', identifier: 'charge:charge_operate', number: 1 },
        { label: 'Stop Charge', value: '{ "code":2 }', identifier: 'charge:charge_operate', number: 2 },
      ],
      batteryValue: [
        { label: 'Turn On', value: '{ "code":0 }', identifier: 'charge:battery_operate', number: 1 },
        { label: 'Turn Off', value: '{ "code":1 }', identifier: 'charge:battery_operate', number: 0 },
      ],
      androidPowerValue: [
        { label: 'Turn On', value: '{ "channel":0, "op":1 }', identifier: 'edge_computer:power_operate', number: 1 },
        { label: 'Turn Off', value: '{ "channel":0, "op":0 }', identifier: 'edge_computer:power_operate', number: 0 },
      ],
      nvidiaPowerValue: [
        { label: 'Turn On', value: '{ "channel":1, "op":1 }', identifier: 'edge_computer:power_operate', number: 1 },
        { label: 'Turn Off', value: '{ "channel":1, "op":0 }', identifier: 'edge_computer:power_operate' , number: 0 },
      ],
      remoteControllerOperate: [
        { label: 'Turn On', value: '{ "op":0 }', identifier: 'edge_computer:rc_operate' },
        { label: 'Turn Off', value: '{ "op":1 }', identifier: 'edge_computer:rc_operate' },
      ],
      // 页面数据
      systemState: '--',
      operationMode: '--',
      posiTionBarState: '--',
      canopyState: '--',
      chargeState: '--',
      chargeVoltage: '--',
      chargeCurrent: '--',
      batteryTemperature: '--',
      batteryState: '--',
      androidPowerState: '--',
      nvidiaPowerState: '--',
      operationModeList: {
        1: 'Test',
        0: 'Normal',
        '--': '--'
      },
      posiTionBarStateList: {
        0: 'Reset',
        1: 'Lock',
        2: 'Unlock',
        '--': '--'
      },
      canopyStateList: {
        0: 'Reset',
        1: 'Close',
        2: 'Open',
        '--': '--'        
      },
      chargeStateList: {
        0: 'Uncharge',
        1: 'Charge_init',
        2: 'Power_off_charge',
        3: 'Power_on_charge',
        4: 'Charge_complete',
        8: 'Fault',
        '--': '--'        
      },
      batteryStateList: {
        0: 'Unknown',
        1: 'On',
        2: 'Off',
        '--': '--'        
      },
      onOrOffList: {
        0: 'Off',
        1: 'On',
        '--': '--'        
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
    setInvokeServiceDevice(obj, str) {
      const { value, identifier, number } = obj;
      if (number === this[str]) {
        return false;
      }
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
      this.systemState = '--';
      this.operationMode = '--';
      this.posiTionBarState = '--';
      this.canopyState = '--';
      this.chargeState = '--';
      this.chargeVoltage = '--';
      this.chargeCurrent = '--';
      this.batteryTemperature = '--';
      this.batteryState = '--';
      this.androidPowerState = '--';
      this.nvidiaPowerState = '--';
      getDeviceMessage({
        deviceName,
        productKey,
      }).then(({ code, data, message }) => {
        if (code === 200) {
          this.systemState = data.status || '--';
          this.operationMode = this.toSetDateStyle(data, 'working_mode');
          this.posiTionBarState = this.toSetDateStyle(data, 'position_bar:position_bar_status');
          this.canopyState =  this.toSetDateStyle(data, 'canopy:canopy_status');
          this.chargeState =  this.toSetDateStyle(data, 'charge:battery_status');
          this.chargeVoltage =  this.toSetDateStyle(data, 'charge:charge_voltage');
          this.chargeCurrent =  this.toSetDateStyle(data, 'stacharge:charge_currenttus');
          this.batteryTemperature =  this.toSetDateStyle(data, 'charge:battery_temperature');
          this.batteryState =  this.toSetDateStyle(data, 'charge:battery_status');
          this.androidPowerState =  this.toSetDateStyle(data, 'edge_computer:android_power_status');
          this.nvidiaPowerState =  this.toSetDateStyle(data, 'edge_computer:nvidia_power_status');
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
    // 处理数据格式
    toSetDateStyle(obj, str) {
      return obj[str] ? JSON.parse(obj[str]).value : '--';
    }
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
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
