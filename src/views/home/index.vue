<template>
  <div class="app-container">
    <el-table
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
        label="设备名称"
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
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment';
  export default {
    name: 'home',
    data() {
      return {
        shopLists: [
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          },
          {
            authType: 'secret',
            deviceCount: 0,
            gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
            nodeType: 0,
            productKey: 'a1v5CSFONku',
            productName: ' product_test_bill',
          },
          {
             authType: 'secret',
             dataFormat: 0,
             deviceCount: 3,
             gmtCreate: moment('1622086082000').format('MMMM-YY-DD'),
             nodeType: 0,
             productKey: 'a1CWEsUjqsI',
             productName: 'DNEST',
          }
        ],
      }
    },
    created(){
    },
    methods:{
      handleUpdate() {},
      handleDelete() {},
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
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
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
