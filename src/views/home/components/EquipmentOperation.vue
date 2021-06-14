<template>
  <div class="equipment-operation">
    <h4>System State</h4>
    <ul>
      <li><span>System State:</span>Online</li>
      <li><span>Operation Mode:</span>Normal</li>
      <li>
        <span>Normal</span>
        <div class="status">Test Mode</div>
        <div>Normal Mode</div>
      </li>
    </ul>
    <h4>Position Bar Module</h4>
    <ul>
      <li><span>Position Bar State:</span>Unlocked</li>
      <li>
        <div class="status">Lock</div>
        <div>Unlock</div>
        <div>Reset</div>
      </li>
    </ul>
    <h4>Canopy Bar Module</h4>
    <ul>
      <li><span>Canopy State:</span>Open</li>
      <li>
        <div class="status">Close</div>
        <div>Open</div>
        <div>Reset</div>
      </li>
    </ul>
    <h4>Charge Module</h4>
    <ul>
      <li><span>Charge State:</span>Uncharged</li>
      <li>
        <div class="status">Start Charge</div>
        <div>Stop Charge</div>
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
        <div class="status">Turn On</div>
        <div>Turn Off</div>
      </li>
    </ul>
    <h4>Edge Computer Module</h4>
    <ul>
      <li><span>Android Power State:</span>Power On</li>
      <li>
        <div>Turn On</div>
        <div class="status">Turn Off</div>
      </li>
    </ul>
    <ul>
      <li><span>Nvidia Power State::</span>Power On</li>
      <li>
        <div>Turn On</div>
        <div class="status">Turn Off</div>
      </li>
    </ul>
    <ul>
      <li><span>Remote Controller Operate</span></li>
      <li>
        <div class="status" style="padding: 0 100px;">Turn On/Off</div>
      </li>
    </ul>
    <h4>System Log</h4>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px;">
      <el-table-column
        type="index"
        label="Index"
        width="220">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Time"
        width="300">
      </el-table-column>
      <el-table-column
        prop="Type"
        label="Type"
        width="300">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Description">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EquipmentOperation',
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
.equipment-operation {
  h4 {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding: 0 30px;
    background-color: rgb(11, 247, 235);
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
          background: rgb(11, 247, 235);
        }
      }
    }
  }
}
</style>
