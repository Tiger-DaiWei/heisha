<template>
  <div class="product-details">
    <img
      :src="imgUrl"
      class="is-image"
    />
    <div class="reference">
      <el-row>
        <el-col :span="8">
        <i class="iconfont hs-chanpinmingcheng" />
        <p>产品名称</p>
        <p>{{ productDetails.productName }}</p>
        </el-col>
        <el-col :span="8">
        <i class="iconfont hs-shebeishuliang" />
        <p>设备数量</p>
        <p>{{ productDetails.deviceCount }}</p>
        </el-col>
        <el-col :span="8">
        <i class="iconfont hs-renzhengfangshi" />
        <p>认证方式</p>
        <p>{{ productDetails.authType }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
        <i class="iconfont hs-key" />
        <p>产品Key</p>
        <p>{{ productDetails.productKey }}</p>
        </el-col>
        <el-col :span="8">
        <i class="iconfont hs-gongshi" />
        <p>节点类型</p>
        <p>{{ productDetails.nodeType }}</p>
        </el-col>
        <el-col :span="8">
        <i class="iconfont hs-chuangjianshijian" />
        <p>创建时间</p>
        <p>{{ setTimeStyle(productDetails.gmtCreate) }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import product1 from '@/assets/images/product/product1.jpeg';
import moment from 'moment';
export default {
  name: 'productDetails',
  data() {
    return {
      imgUrl: product1,
    };
  },
  computed: {
    productDetails() {
      return JSON.parse(localStorage.getItem('productDetails'));
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
}
</style>
