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
      <span>防雨盖状态</span>
      <el-table
        border
        :data="tableData.canopy_GTpost"
        style="width: 100%">
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
      <span>充电板状态</span>
      <el-table
        border
        :data="tableData.charge_CDpost"
        style="width: 100%">
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
      },
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
      const { deviceName, productKey } = this.deviceDetails;
      getDeviceInfo({
        deviceName, // 设备名称
        productKey, // 操作类型
      }).then(({ code, message, data }) => {
        if (code === 200 && data) {
          this.tableData.canopy_GTpost = this.toSetDataStyle(JSON.parse(data['canopy:GTpost']).value || {});
          this.tableData.charge_CDpost = this.toSetDataStyle(JSON.parse(data['charge:CDpost']).value || {});
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
