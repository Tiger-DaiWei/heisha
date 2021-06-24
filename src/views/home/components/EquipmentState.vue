<template>
  <div class="equipment-state">
    <div class="list">
      <div class="some-one position-left">
        <h5>Production Bar Module</h5>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
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
          :data="tableData"
          border
          style="width: 100%">
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
          :data="tableData"
          border
          style="width: 100%">
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
          :data="tableData"
          border
          style="width: 100%">
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
          :data="tableData"
          :show-header="false"
          border
          style="width: 100%">
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
          :data="tableData"
          :show-header="false"
          border
          style="width: 100%">
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
  </div>
</template>

<script>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    };
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
