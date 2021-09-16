<template>
  <div
    class="device-operate"
    v-loading="operateLoading"
  >
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <!-- 视频流相关 -->
    <div class="operate-btn flex-row">
      <ol class="width360">
        <li
          v-for="(item, index) in operateList"
          :key="index"
          >
          <div class="text">
            <span
              v-for="item1 in item.value"
              :key="item1.key"
              >{{ item1.title }}{{ !item1.noNeedValue ? operateData[item1.key]['text'] : '' }}</span>
          </div>
          <dl class="btn">
            <dd
              v-for="item2 in item.button"
              :key="item2.label">
              <span
                v-show="item2.noNeedJudge || item2.status.includes(operateData[item2.key]['status'])"
                @click="setInvokeServiceDevice(item2)">
                {{ item2.label }}
              </span>
            </dd>
          </dl>
        </li>
      </ol>
      <div class="flex5"></div>
    </div>
    <!-- 充电相关 -->
    <div class="operate-btn flex-row">
      <ol class="width360">
        <li
          v-for="(item, index) in voltageList"
          :key="index"
          >
          <div class="text">
            <span
              v-for="item1 in item.value"
              :key="item1.key"
              >{{ item1.title }}{{ voltageData[item1.key]['text'] }}</span>
          </div>
          <dl class="btn">
            <dd
              v-for="item2 in item.button"
              :key="item2.label">
              <span
                v-show="item2.noNeedJudge || item2.status.includes(voltageData[item2.key]['status'])"
                @click="setInvokeServiceDevice(item2)">
                {{ item2.label }}
              </span>
            </dd>
          </dl>
        </li>
      </ol>
      <div class="flex5">
        <!-- <TrendEchart /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDeviceMessage, invokeServiceDevice } from '@/api/heiShaProduct';
export default {
  name: 'DeviceOperation',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    // TrendEchart: () => import('@/components/TrendChart'),
  },
  data() {
    return {
      // 加载
      operateLoading: false,
      // 视频流相关操作
      operateList: [
        {
          value: [{ title: '防雨盖状态：', key: 'canopystatus' }],
          button: [
            { label: '打开', value: '{ "Canopyopen":1 }', identifier: 'canopy:GTService', status: [1, 5], key: 'canopystatus' },
            { label: '关闭', value: '{ "Canopyoff":1 }', identifier: 'canopy:GTService', status: [2, 4], key: 'canopystatus' },
            { label: '复位', value: '{ "Canopyreset":1 }', identifier: 'canopy:GTService', status: [0, 6], key: 'canopystatus' },
          ],
        },
        {
          value: [{ title: '安卓供电状态：', key: 'AndroidPower' }],
          button: [
            { label: '打开', value: '{ "AndroidPowerOpen":1 }', identifier: 'sys_service', status: [0], key: 'AndroidPower' },
            { label: '断开', value: '{ "AndroidPowerOff":1 }', identifier: 'sys_service', status: [1], key: 'AndroidPower' },
          ],
        },
        {
          value: [{ title: '无人机状态：', key: 'cdstatus' }],
          button: [
            { label: '开机', value: '{ "openbattery":1 }', identifier: 'charge:CDService', status: [2], key: 'cdstatus' },
            { label: '关机', value: '{ "offbattery":1 }', identifier: 'charge:CDService', status: [1], key: 'cdstatus' },
          ],
        },
        {
          value: [{ title: '归中杆状态：', key: 'barstatus' }],
          button: [
            { label: '释放', value: '{ "releasebar":1 }', identifier: 'position_bar:GZService', status: [2, 3, 4], key: 'barstatus' },
            { label: '收紧', value: '{ "takebar":1 }', identifier: 'position_bar:GZService', status: [1, 5], key: 'barstatus' },
            { label: '复位', value: '{ "reset_bar":1 }', identifier: 'position_bar:GZService', status: [0, 6], key: 'barstatus' },
          ],
        },
        {
          value: [{ title: '英伟达供电状态：', key: 'NvidiaPower' }],
          button: [
            { label: '断开', value: '{ "NvidiaPowerOff":1 }', identifier: 'sys_service', status: [1], key: 'NvidiaPower' },
            { label: '接通', value: '{ "NvidiaPowerOpen":1 }', identifier: 'sys_service', status: [0], key: 'NvidiaPower' },
          ],
        },
        {
          value: [{ title: '遥控器操作：', key: '15', noNeedValue: true, }],
          button: [
            { label: '开/关', value: '{ "sys_reset":1 }', identifier: 'sys_service', noNeedJudge: true, status: [''], key: '15' },
          ],
        },
      ],
      // 视频流相关数据
      operateData: {
        // 防雨盖状态：canopy:GTpost:canopystatus-----0-未知，1-关闭，2-打开，4-开启中，5-关闭中，6-故障
        canopystatus: {
          text: '--',
          status: '--',
        },
        // 安卓供电状态：sys_post:AndroidPower-----0-断开，1-接通
        AndroidPower: {
          text: '--',
          status: '--',
        },
        // 无人机状态：charge:CDpost:cdstatus-----8bit有效数据，取最高2bit，0-未知，1-开机，2-关机
        cdstatus: {
          text: '--',
          status: '--',
        },
        // 归中杆状态：position_bar:GZPost:barstatus-----0-未知，1-释放，2-收紧，3-第一组收紧中，4-第二组收紧中，5-释放中，6-故障
        barstatus: {
          text: '--',
          status: '--',
        },
        // 英伟达供电状态：sys_post:NvidiaPower-----0-断开，1-接通
        NvidiaPower: {
          text: '--',
          status: '--',
        },
      },
      // 防雨盖状态状态码对应中文
      canopystatusText: {
        0: '未知',
        1: '关闭',
        2: '打开',
        4: '开启中',
        5: '关闭中',
        6: '故障',
      },
      // 安卓供电状态、英伟达供电状态状态码对应中文
      AndroidPowerText: {
        0: '断开',
        1: '接通',
      },
      // 无人机状态状态码对应中文
      cdstatusText: {
        0: '未知',
        1: '开机',
        2: '关机',
      },
      // 归中杆状态状态码对应中文
      barstatusText: {
        0: '未知',
        1: '释放',
        2: '收紧',
        3: '第一组收紧中',
        4: '第二组收紧中',
        5: '释放中',
        6: '故障',
      },
      // 电压相关操作
      voltageList: [
        {
          value: [
            { title: '充电状态：', key: 'cdstatus' },
            { title: '电池类型：', key: 'battery_type' },
          ]
        },
        {
          value: [
            { title: '电压：', key: 'cdvoltage' },
            { title: '电流：', key: 'cdcurrent' },
          ]
        },
        {
          value: [
            { title: '充电时长：', key: 'cdtim' }
          ],
          button: [
            { label: '停止充电', value: '{ "stopcharge":1 }', identifier: 'charge:CDService', status: [1, 2, 3, 4, 5, 8], key: 'cdstatus' },
            { label: '开始充电', value: '{ "startcharge":1 }', identifier: 'charge:CDService', status: [0], key: 'cdstatus' },
          ],
        },
      ],
      // 电压相关数据
      voltageData: {
        // 充电状态：charge:CDpost:cdstatus-----8bit有效数据，取低4bit，0-未充电，1-充电初始化，2-关机充电，3-开机充电，4-充电完成，5-冷却中，8-故障
        cdstatus: {
          text: '--',
          status: '--',
        },
        // 电池类型：charge:CD_set_post:battery_type-----0-未知，1-3S，2-4S
        battery_type: {
          text: '--',
          status: '--',
        },
        // 电压：charge:CDpost:cdvoltage-----电压*10 V
        cdvoltage: {
          text: '--',
          status: '--',
        },
        // 电流：charge:CDpost:cdcurrent-----电流*10 A
        cdcurrent: {
          text: '--',
          status: '--',
        },
        // 充电时长：charge:CDpost:cdtim-----分钟
        cdtim: {
          text: '--',
          status: '--',
        },
      },
      // 充电状态状态码对应中文
      voltageData_cdstatus_text: {
        0: '未充电',
        1: '充电初始化',
        2: '关机充电',
        3: '开机充电',
        4: '充电完成',
        5: '冷却中',
        8: '故障',
      },
      // 电池类型状态码对应中文
      battery_type_text: {
        0: '未知',
        1: '3S',
        2: '4S',
      },
      // 定时器
      theTimer: '',
    };
  },
  mounted() {
    this.getDeviceMessageInterface();
    this.theTimer = setInterval(this.getDeviceMessageInterface, 30000);
  },
  methods: {
    /**
     * @description 设备状态接口数据获取
     * @param deviceName 设备名称
     * @param productKey 设备对应产品的key
    */
    getDeviceMessageInterface() {
      let devoceData = {};
      this.operateLoading = true;
      const { deviceName, productKey } = this.deviceDetails;
      getDeviceMessage({
        deviceName,
        productKey,
      }).then(({ code, data, message }) => {
        if (code === 200) {
          devoceData = data;
        } else {
          this.$message({
            type: 'error',
            message: message || '获取设备状态失败',
          })
        }
      }).finally(() => {
        const { operateData, voltageData } = this.setDeviceData(devoceData);
        this.operateData = operateData;
        this.voltageData = voltageData;
        this.operateLoading = false;
        console.log(operateData);
        console.log(voltageData);
      });
    },
    /**
     * @description 接口设备数据处理
     * @param obj(Object) 处理的数据
     * @param endData(Object) 返回的数据
    */
    setDeviceData(obj) {
      let operateData = {
        canopystatus: {
          text: '--',
          status: '--',
        },
        AndroidPower: {
          text: '--',
          status: '--',
        },
        cdstatus: {
          text: '--',
          status: '--',
        },
        barstatus: {
          text: '--',
          status: '--',
        },
        NvidiaPower: {
          text: '--',
          status: '--',
        },
      };
        // 电压相关数据
      let voltageData = {
        cdstatus: {
          text: '--',
          status: '--',
        },
        battery_type: {
          text: '--',
          status: '--',
        },
        cdvoltage: {
          text: '--',
          status: '--',
        },
        cdcurrent: {
          text: '--',
          status: '--',
        },
        cdtim: {
          text: '--',
          status: '--',
        },
      };
      // // 防雨盖状态：canopy:GTpost:canopystatus-----0-未知，1-关闭，2-打开，4-开启中，5-关闭中，6-故障
      const { canopystatus } = this.toSetDateStyle(obj, 'canopy:GTpost');
      operateData.canopystatus = {
        text: this.canopystatusText[canopystatus] || '--',
        status: canopystatus,
      };
      // // 安卓供电状态：sys_post:AndroidPower-----0-断开，1-接通
      const { AndroidPower } = this.toSetDateStyle(obj, 'sys_post');
      operateData.AndroidPower = {
        text: this.AndroidPowerText[AndroidPower] || '--',
        status: AndroidPower,
      };
      // // 无人机状态：charge:CDpost:cdstatus-----8bit有效数据，取最高2bit，0-未知，1-开机，2-关机
      // // 充电状态：charge:CDpost:cdstatus-----8bit有效数据，取低4bit，0
      // cdstatus: '--',
      const { cdstatus } = this.toSetDateStyle(obj, 'charge:CDpost');
      // 十进制转二进制
      const endStatus = (cdstatus || 0).toString(2);
      // 判断是否是8位二进制数据（不够长度前面补，暂时不会有超出8位的）
      const bitStringLength = endStatus.length;
      let addStr = '';
      for(let i = 0; i < 8 - bitStringLength; i++) {
        addStr += '0';
      }
      const endStatusBit = `${addStr}${endStatus}`;
      // 二进制转十进制
      const text1 = parseInt(endStatusBit.slice(0, 2), 2);
      const text2 = parseInt(endStatusBit.substr(endStatusBit.length - 4), 2);
      operateData.cdstatus = {
        text: this.cdstatusText[text1],
        status: text1,
      };
      voltageData.cdstatus = {
        text: this.voltageData_cdstatus_text[text2],
        status: text2,
      };
      // // 归中杆状态：position_bar:GZPost:barstatus-----0-未知，1-释放，2-收紧，3-第一组收紧中，4-第二组收紧中，5-释放中，6-故障
      // barstatus: '--',
      const { barstatus } = this.toSetDateStyle(obj, 'position_bar:GZPost');
      operateData.barstatus = {
        text: this.barstatusText[barstatus] || '--',
        status: barstatus,
      };
      // // 英伟达供电状态：sys_post:NvidiaPower-----0-断开，1-接通
      // NvidiaPower: '--',
      const { NvidiaPower } = this.toSetDateStyle(obj, 'sys_post');
      operateData.NvidiaPower = {
        text: this.AndroidPowerText[NvidiaPower] || '--',
        status: NvidiaPower,
      };
      // // 电池类型：charge:CD_set_post:battery_type-----0-未知，1-3S，2-4S
      // battery_type: '--',
      const { battery_type } = this.toSetDateStyle(obj, 'charge:CD_set_post');
      voltageData.battery_type = {
        text: this.battery_type_text[battery_type] || '--',
        status: battery_type,
      };
      // // 电压：charge:CDpost:cdvoltage-----电压*10 V
      // cdvoltage: '--',
      const { cdvoltage } = this.toSetDateStyle(obj, 'charge:CDpost');
      voltageData.cdvoltage = {
        text: `${!isNaN(cdvoltage) ? (cdvoltage / 10).toFixed(1) :  '--'} V`,
        status: '--',
      };
      // // 电流：charge:CDpost:cdcurrent-----电流*10 A
      // cdcurrent: '--',
      const { cdcurrent } = this.toSetDateStyle(obj, 'charge:CDpost');
      voltageData.cdcurrent = {
        text: `${!isNaN(cdcurrent) ? (cdcurrent / 10).toFixed(1) :  '--'} A`,
        status: '--',
      };
      // // 充电时长：charge:CDpost:cdtim-----分钟
      // cdtim: '--',
      const { cdtim } = this.toSetDateStyle(obj, 'charge:CDpost');
      voltageData.cdtim = {
        text: `${!isNaN(cdtim) ? cdtim :  '--'}分钟`,
        status: '--',
      };
      return {
        operateData,
        voltageData,
      };
    },
    // 处理数据格式
    toSetDateStyle(obj, str) {
      return obj[str] && JSON.parse(obj[str]).value ? JSON.parse(obj[str]).value : {};
    },
    /**
     * @description 设备服务调用
     * @param obj(Object) 当前操作相关数据对象
     * @param str(String)
    */
    setInvokeServiceDevice(obj) {
      this.operateLoading = true;
      const { value, identifier } = obj;
      const { deviceName, productKey } = this.deviceDetails;
      invokeServiceDevice({
        deviceName, // 设备名称
        productKey, // 操作类型
        identifier, // 产品key
        parameters: JSON.parse(value), // 操作参数，json格式
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
        this.operateLoading = false;
      });
    },
  },
  beforeDestroy() {
    // 清空定时器
    clearInterval(this.theTimer);
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .text {
          span {
            margin-right: 10px;
          }
        }
        .btn {
          height: 32px;
          span {
            padding: 6px 0px;
            width: 100px;
            line-height: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: rgb(222, 222, 222);
            cursor: pointer;
            display: inline-block;
            text-align: center;
            margin-left: 6px;
          }
        }
      }
    }
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .width360 {
    width: 360px;
  }
  .flex5 {
    flex: 5;
  }
  .height240 {
    height: 240px;
  }
}
</style>
