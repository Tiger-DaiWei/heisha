<template>
  <div class="product-details">
    <el-tabs :tab-position="tabPosition" class="meau-style">
      <el-tab-pane label="设备状态">
        <EquipmentState
          :deviceDetails="deviceDetails"
          />
      </el-tab-pane>
      <el-tab-pane label="设备操作">
        <EquipmentOperation
          :deviceDetails="deviceDetails"
          />
      </el-tab-pane>
    </el-tabs>
    <div class="log">
      <h5>System Log</h5>
      <el-table
        v-loading="logLoding"
        :data="tableData"
        border
        style="width: 100%"
        max-height="300">
        <el-table-column
          type="index"
          label="Index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="Time"
          width="300">
          <template slot-scope="scope">
            <span>{{ setTimeStyle1(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="requestId"
          label="requestId"
          width="300">
        </el-table-column>
        <el-table-column
          prop="productKey"
          label="productKey">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="deviceName">
        </el-table-column>
        <el-table-column
          prop="eventValue"
          label="value">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import product1 from '@/assets/images/product/product1.jpeg';
import moment from 'moment';
import EquipmentState from './components/EquipmentState';
import EquipmentOperation from './components/EquipmentOperation';
import { getSysLogList } from '@/api/heiShaProduct';
export default {
  name: 'deviceDetails',
  components: {
    EquipmentState,
    EquipmentOperation,
  },
  data() {
    return {
      imgUrl: product1,
      tabPosition: 'top',
      tableData: [],
      theTimer: '',
      logLoding: false,
    };
  },
  computed: {
    deviceDetails() {
      return JSON.parse(localStorage.getItem('deviceDetails'));
    },
  },
  mounted() {
    this.getSysLogListData();
    this.theTimer = setInterval(this.getSysLogListData, 10000);
  },
  methods: {
    /**
     * @method getProductDetails
     * @description 查询产品详情
    */
    getProductDetails() {
    },
    setTimeStyle1(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * @description 获取系统日志
     * @param deviceName 设备名称
     * @param productKey 设备对应产品的key
    */
    getSysLogListData() {
      this.logLoding = true;
      const { deviceName, productKey } = this.deviceDetails;
      this.tableData = [];
      getSysLogList({
        deviceName,
        productKey,
      }).then(({ code, data, message }) => {
        if (code === 200) {
          this.tableData = data;
        } else {
          this.$message({
            type: 'error',
            message: message || '获取系统日志失败',
          })
        }
      }).finally(() => {
        this.logLoding = false;
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.theTimer);
  }
}
</script>

<style lang="scss" scoped>
.product-details {
  padding: 20px;
  .is-image {
    display: block;
    height: 200px;
    margin: 0 auto;
  }
  .reference {
    width: 660px;
    margin: 10px auto;
    text-align: center;
    .el-row {
      margin-bottom: 30px;
      .el-col {
        i {
          font-size: 32px;
        }
        p {
          font-size: 18px;
          line-height: 30px;
          margin-top: 10px;
        }
      }
    }
  }
  .meau-style {
    height: 100%;
  }
  .log {
    margin-top: 40px;
    h5 {
       line-height: 40px;
       font-size: 20px;
    }
  }
}
</style>
