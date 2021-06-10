<template>
  <div
    class="app-container"
    v-loading="pageLoding"> 
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">产品列表</span>
    </el-card>
    <!-- <el-table
      :data="shopLists"
      border
      center
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="authType"
        label="认证方式"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="deviceCount"
        label="设备数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productKey"
        label="产品Key"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nodeType"
        label="节点类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          <span>{{ setTimeStyle(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetails(scope.row)">查看详情
            </el-button>
          </template>
        </el-table-column>
    </el-table> -->
    <ul class="product-list">
      <li
        v-for="(item, index) in shopLists"
        :key="index"
      >
        <img
          :src="theDefaultImage"
          @click="goDetails(item)"
          />
        <div>
          <i class="el-icon-warning" />
          <p>产品名称：{{item.productName}}</p>
          <p>设备数量：{{item.deviceCount}}</p>
          <p>节点类型：{{item.nodeType}}</p>
          <p>创建时间：{{setTimeStyle(item.gmtCreate)}}</p>
          <el-button @click="goDetails(item)">查看详情</el-button>
        </div>
      </li>
    </ul>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <!-- <el-dialog
      title="产品详情"
      :visible.sync="productVisible"
      width="30%">
      <p>产品名称: {{ currentProduct.productName }}</p>
      <p>产品数量: {{ currentProduct.deviceCount }}</p>
      <p>认证方式: {{ currentProduct.authType }}</p>
      <p>产品Key: {{ currentProduct.productKey }}</p>
      <p>节点类型: {{ currentProduct.nodeType }}</p>
      <p>创建时间: {{ setTimeStyle(currentProduct.gmtCreate) }}</p>
    </el-dialog> -->
  </div>
</template>

<script>
import { listProduct } from '@/api/heiShaProduct';
import product1 from '@/assets/images/product/product1.jpeg';
import moment from 'moment';
  export default {
    name: 'home',
    data() {
      return {
        pageLoding: false,
        // 产品数据
        shopLists: [
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('2021-05-31 10:59:37').format('YYYY-MM-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          }
        ],
        total: null,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        // 产品详情弹窗
        productVisible: false,
        // 弹窗展现的产品
        currentProduct: {},
        theDefaultImage: product1,
      }
    },
    created(){
      this.getListProduct();
    },
    methods:{
      handleAddProductCate() {},
      handleUpdate() {},
      handleDelete() {},
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getListProduct();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getListProduct();
      },
      getListProduct() {
        this.pageLoding = true;
        this.shopLists = [];
        listProduct(this.listQuery).then(response => {
          // const { list, pageNum, pageSize, total, totalPage } = response.data;
          const { list, total } = response.data
          this.total = total;
          this.shopLists = list;
        }).finally(() => {
          this.pageLoding = false;
        });
      },
      setTimeStyle(val) {
        return moment(val).format('YYYY-MM-DD');
      },
      handleDetails(str) {
        this.productVisible = true;
        this.currentProduct = JSON.parse(JSON.stringify(str));
      },
      goDetails(val) {
        localStorage.removeItem('productDetails');
        localStorage.setItem('productDetails', JSON.stringify(val));
        this.$router.push('/productDetails');
      },
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    ul.product-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      li {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 220px;
        border: 1px solid #ccc;
        border-radius: 2px;
        margin: 10px;
        padding: 10px;
        img {
          height: 200px;
          width: 300px;
          cursor: pointer;
        }
        div {
          width: 180px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          i {
            position: absolute;
            top: 0;
            right: 0;
          }
          p {
            line-height: 24px;
          }
          .el-button {
            margin-top: 10px;
          }
        }
      }
    }
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content {
    padding: 20px;
    font-size: 18px
  }
</style>
