<template>
  <div class="product-details">
    <el-tabs :tab-position="tabPosition" class="meau-style">
      <el-tab-pane label="设备状态"><EquipmentState /></el-tab-pane>
      <el-tab-pane label="设备操作">
        <EquipmentOperation
          :deviceDetails="deviceDetails"
          />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import product1 from '@/assets/images/product/product1.jpeg';
import moment from 'moment';
import EquipmentState from './components/EquipmentState';
import EquipmentOperation from './components/EquipmentOperation';
export default {
  name: 'deviceDetails',
  components: {
    EquipmentState,
    EquipmentOperation,
  },
  data() {
    return {
      imgUrl: product1,
      tabPosition: 'top'
    };
  },
  computed: {
    deviceDetails() {
      return JSON.parse(localStorage.getItem('deviceDetails'));
    },
  },
  mounted() {},
  methods: {
    /**
     * @method getProductDetails
     * @description 查询产品详情
    */
    getProductDetails() {
    },
    setTimeStyle(val) {
      return moment(val).format('YYYY-MM-DD');
    },
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
}
</style>
