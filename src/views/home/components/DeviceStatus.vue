<template>
  <div class="device-status">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <div
      class="table"
      v-loading="tableLoading">
      <div
        v-for="item in tableList"
        :key="item.key">
        <span>{{ item.label }}</span>
        <el-table
          border
          :data="tableData[item.key]"
          style="width: 100%"
          height="400">
          <el-table-column
            prop="status"
            align="center"
            label="状态名">
          </el-table-column>
          <el-table-column
            prop="value"
            align="center"
            label="状态值">
          </el-table-column>
          <el-table-column
            prop="unit"
            align="center"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="note"
            align="center"
            label="备注">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeviceInfo } from '@/api/heiShaProduct';
export default {
  name: 'DeviceStatus',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: {
        // 防雨盖
        canopy_GTpost: [],
        // 充电板
        charge_CDpost: [],
        // 空调
        air_condition: [],
        // 归中
        position_bar: [],
        // 系统
        sys_post: [],
        // 天气传感
        atmosphere: [],
      },
      tableList: [
        {
          label: '防雨盖状态',
          key: 'canopy_GTpost',
        },
        {
          label: '充电板状态',
          key: 'charge_CDpost',
        },
        {
          label: '空调状态',
          key: 'air_condition',
        },
        {
          label: '归中状态',
          key: 'position_bar',
        },
        {
          label: '天气传感状态',
          key: 'atmosphere',
        },
        {
          label: '系统状态',
          key: 'sys_post',
        },
      ],
      tableLoading: false,
    };
  },
  mounted() {
    this.getDeviceInfoData();
  },
  methods: {
    /**
     * @description 设备设备状态
     * @param obj(Object) 当前操作相关数据对象
     * @param str(String)
    */
    getDeviceInfoData() {
      this.tableLoading = true;
      this.tableData.canopy_GTpost = [];
      this.tableData.charge_CDpost = [];
      this.tableData.air_condition = [];
      this.tableData.position_bar = [];
      this.tableData.sys_post = [];
      this.tableData.atmosphere = [];
      const { deviceName, productKey } = this.deviceDetails;
      getDeviceInfo({
        deviceName, // 设备名称
        productKey, // 操作类型
      }).then(({ code, message, data }) => {
        if (code === 200 && data) {
          this.tableData.canopy_GTpost = this.toSetDataStyle(JSON.parse(data['canopy:GTpost']).value || {});
          this.tableData.charge_CDpost = this.toSetDataStyle(JSON.parse(data['charge:CDpost']).value || {});
          this.tableData.air_condition = this.toSetDataStyle(JSON.parse(data['air_condition:A100post']).value || {});
          this.tableData.position_bar = this.toSetDataStyle(JSON.parse(data['position_bar:GZPost']).value || {});
          this.tableData.sys_post = this.toSetDataStyle(JSON.parse(data['sys_post']).value || {});
          this.tableData.atmosphere = this.toSetDataStyle(JSON.parse(data['atmosphere:AtmosPost']).value || {});
        } else {
          this.$message({
            type: 'error',
            message: message || '操作失败',
          })
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    // 数据格式处理
    toSetDataStyle(obj) {
      let endData = [];
      for(let key in obj) {
        endData.push(
          {
            status: key,
            value: obj[key],
            unit: '--',
            note: '--',
          }
        );
      }
      return endData;
    },
  },
}
</script>

<style lang='scss' scoped>
.device-status {
  padding: 0 20px;
  font-size: 14px;
  .title {
    border-bottom: 1px solid rgb(194, 194, 194);
    line-height: 40px;
    span {
      margin-right: 18px;
    }
    margin-bottom: 30px;
  }
  .table {
    span {
      display: inline-block;
      padding: 10px 14px;
      background: rgb(220, 220, 220);
      color: rgb(95, 95, 95);
    }
    .el-table {
      /deep/ th {
        background: rgb(220, 220, 220);
      }
      margin-bottom: 20px;
    }
    .el-table--border, .el-table--group {
      border-color: rgb(220, 220, 220);
    }
  }
}
</style>
