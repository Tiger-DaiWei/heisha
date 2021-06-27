<template>
  <div class="equipment-state">
    <div
      class="list"
      v-loading="tableStateLoading">
      <div class="some-one position-left">
        <h5>Production Bar Module</h5>
        <el-table
          :data="tableData.position_bar"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'position_bar')">
          <el-table-column
            prop="date"
            label="Position Bar">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Locked">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line1" />
      <div class="some-one position-top">
        <h5>Charge Module</h5>
        <el-table
          :data="tableData.charge"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'charge')">
          <el-table-column
            prop="date"
            label="Charge State">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Power Off Charge">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line2" />
      <div class="some-one position-right">
        <h5>Canopy Module</h5>
        <el-table
          :data="tableData.canopy"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'canopy')">
          <el-table-column
            prop="date"
            label="Canopy State">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Close">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line3" />
      <div class="some-one position-bottom-left">
        <h5>Air Condition Module</h5>
        <el-table
          :data="tableData.air_condition"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'air_condition')">
          <el-table-column
            prop="date"
            label="Operation State">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Fault">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line4" />
     <div class="some-one position-bottom-center">
        <h5>Atmosphere Module</h5>
        <el-table
          :data="tableData.atmosphere"
          :show-header="false"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'atmosphere')">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line5" />
      <div class="some-one position-bottom-right">
        <h5>Edge Compiter Module</h5>
        <el-table
          :data="tableData.edge_computer"
          :show-header="false"
          border
          style="width: 100%"
          @row-click="rowDetails($event, 'edge_computer')">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="status"
            width="60px">
          </el-table-column>
        </el-table>
      </div>
      <div class="line6" />
      <div class="main-title">
        DeviceName:{{ deviceDetails.deviceName }}<br />
        State:{{ deviceDetails.status }}&nbsp;&nbsp;WorkingMode: {{ deviceDetails.deviceRunStatus }}<br />
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="dialogClose"
      width="980px">
      <el-table
        v-loading="dialogLoading"
        :data="detalisLists"
        border
        center
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productKey"
          label="productKey"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="deviceName"
          align="center">
        </el-table-column>
        <el-table-column
          prop="identifier"
          label="identifier"
          align="center">
        </el-table-column>
        <el-table-column
          prop="eventValue"
          label="eventValue"
          align="center">
        </el-table-column>
        <el-table-column
          prop="eventStatus"
          label="eventStatus"
          align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-show="scope.row.eventStatus === 'pending'"
              @click="toProcessEventMessageStatus(scope.row.id)">
              处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getPendingEventMessage, getEventMessageDayDetails, processEventMessageStatus } from '@/api/heiShaProduct';
import moment from 'moment';
export default {
  name: 'EquipmentState',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableStateLoading: false,
      tableData: {
        charge: [],
        position_bar: [],
        canopy: [],
        charge: [],
        atmosphere: [],
        edge_computer: [],
        default: [],
      },
      dialogTitle: '详情',
      dialogVisible: false,
      detalisLists: [],
      dialogLoading: false,
    };
  },
  mounted() {
    this.getPendingEventMessageList();
  },
  methods: {
    /**
     * @description 获取设备状态
     * @param deviceName 设备名称
     * @param productKey 产品key
    */
    getPendingEventMessageList() {
      this.tableStateLoading = true;
      this.tableData = {
        charge: [],
        position_bar: [],
        canopy: [],
        air_condition: [],
        atmosphere: [],
        edge_computer: [],
        default: [],
      };
      const { deviceName, productKey } = this.deviceDetails;
      getPendingEventMessage({
        deviceName,
        productKey,
      }).then(({ code, message, data }) => {
        if (code === 200) {
          this.setDateStyle(data);
        } else {
          this.$message({
            type: 'error',
            message: message || '获取数据失败',
          })
        }
      }).finally(() => {
        this.tableStateLoading = false;
      });
    },

    /**
     * @description 表格数据处理
     * @param obj 需要处理的数据
    */
    setDateStyle(obj) {
      if (!obj) return false;
      for(let key in obj) {
        const objDatas = obj[key];
        let endData = [];
        if (Object.keys(objDatas).length !== 0) {
          for (let key1 in objDatas) {
            endData.push({
              date: key1,
              name: objDatas[key1],
            });
          }
        }
        this.tableData[key] = endData.sort((a, b) => {
          return a.date - b.date ? 1 : -1;
        });
      }
    },

    /**
     * @description 表格某行点击事件
    */
    rowDetails(row, str) {
      this.dialogVisible = true;
      this.getEventMessageDayDetailsInf(row, str);
    },
    /**
     * @description 获取设备状态表格一行的详情
     * @param deviceName 设备名称
     * @param productKey 产品key
     * @param day 时间
     * @param moduleIdentifier 状态
    */
    getEventMessageDayDetailsInf(obj, str) {
      const { deviceName, productKey } = this.deviceDetails;
      const { date } = obj;
      this.dialogLoading = true;
      getEventMessageDayDetails({
        deviceName,
        productKey,
        moduleIdentifier: str,
        day: date,
      }).then(({ code, message, data }) => {
        if (code === 200) {
          this.detalisLists = data;
        } else {
          this.$message({
            type: 'error',
            message: message || '获取数据失败',
          })
        }
      }).finally(() => {
        this.dialogLoading = false;
      });
    },
    dialogClose() {
      this.dialogVisible = false;
      this.detalisLists = [];
    },
    /**
     * @description 将未处理设备处理
     * @param id 唯一标识
    */
    toProcessEventMessageStatus(str) {
      processEventMessageStatus({
        id: str,
      }).then(({ code, message, data }) => {
        if (code === 200) {
          this.getPendingEventMessageList();
          this.dialogClose();
        } else {
          this.$message({
            type: 'error',
            message: message || '处理失败',
          })
        }
      }).finally(() => {
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.equipment-state {
  height: 100%;
  .list {
    height: 1300px;
    position: relative;
    .some-one {
      width: 400px;
      border: 2px solid #000;
      border-radius: 1px;
      padding: 8px;
      height: 253px;
      h5 {
        line-height: 40px;
      }
    }
    .position-left {
      position: absolute;
      left: 20px;
      top: 320px;
    }
    .line1 {
      width: calc(50% - 390px);
      height: 86px;
      border-bottom: 2px dashed black;
      position: absolute;
      left: 220px;
      top: 571px;
      border-radius: 0 0 0 100%;
    }
    .position-top {
      position: absolute;
      left: calc(50% - 160px);
      top: 4px;
      &.some-one {
        border-color: rgb(17, 245, 226);
      }
    }
    .line2 {
      width: 80px;
      height: 354px;
      border-right: 2px solid rgb(241, 245, 17);
      position: absolute;
      left: calc(50% - 60px);
      top: 256px;
      border-radius: 0 0 100% 0;
    }
    .position-right {
      position: absolute;
      right: 10px;
      top: 320px;
      &.some-one {
        border-color: rgb(17, 245, 226);
      }
    }
    .line3 {
      width: calc(50% - 400px);
      height: 80px;
      border-bottom: 2px solid rgb(17, 245, 226);
      position: absolute;
      left: calc(50% + 170px);
      top: calc(50% - 80px);
      border-radius: 0 0 100% 0;
    }
    .position-bottom-left {
      position: absolute;
      left: 10px;
      bottom: 280px;
      &.some-one {
        border-color: red;
      }
    }
    .line4 {
      width: calc(50% - 430px);
      height: 240px;
      border-right: 2px solid red;
      position: absolute;
      left: 406px;
      bottom: 370px;
      border-radius: 0 0 100% 0;      
    }
    .position-bottom-center {
      position: absolute;
      left: calc(50% - 230px);
      bottom: 40px;
      height: 205px;
    }
    .line5 {
      width: 80px;
      height: 364px;
      border-right: 2px dashed #000;
      position: absolute;
      left: calc(50% - 60px);
      bottom: 244px;
      border-radius: 0 0 100% 0;      
    }
    .position-bottom-right {
      position: absolute;
      right: 10px;
      bottom: 260px;
      height: 205px;
      &.some-one {
        border-color: rgb(17, 245, 226);
      }
    }
    .line6 {
      width: calc(50% - 440px);
      height: 210px;
      border-bottom: 2px solid rgb(17, 245, 226);
      position: absolute;
      left: calc(50% + 30px);
      bottom: 400px;
      border-radius: 0 0 0 100%;
    }
    .main-title {
      border: 1px solid #000;
      border-radius: 10px;
      width: 340px;
      padding: 10px 20px;
      line-height: 30px;
      height: 82px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
