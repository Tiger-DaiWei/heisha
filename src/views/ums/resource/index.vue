<template>
  <div
    class="app-container"
    v-loading="pageLoding"> 
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">产品列表</span>      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
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
      <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>
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
    <el-dialog
      :title="operateType === 'add' ? '增加产品' : '修改产品'"
      :visible.sync="productVisible"
      :before-close="handleDialogClose"
      width="40%">
      <el-form
        :model="currentProduct"
        ref="roleForm1"
        label-width="150px"
        size="small"
      >
        <el-form-item label="产品名称:">
          <el-input v-model="currentProduct.productName" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备数量:">
          <el-input v-model="currentProduct.deviceCount" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="认证方式:">
          <el-input v-model="currentProduct.authType" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="产品Key:">
          <el-input v-model="currentProduct.productKey" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="节点类型:">
          <el-input v-model="currentProduct.nodeType" style="width: 250px"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listProduct, creatProduct, updateProduct, deleteProduct } from '@/api/heiShaProduct';
import {strLength} from '@/utils/index';
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
        currentProduct: {
          productName: '',
          // deviceCount: '',
          // authType: '',
          productKey: '',
          // nodeType: '',
          // gmtCreate: '',
        },
        operateType: 'add',
      }
    },
    created(){
      this.getListProduct();
    },
    methods:{
      handleAddProductCate() {},
      handleUpdate() {},
      handleDelete(val) {
        this.$confirm('是否删除产品', '提示', {
          confirmBUttonText: '确定',
          cancelButtonText: '取消',
          showClose: true,
        }).then(() => {
          deleteProduct({productKey: val.productKey}).then(({code}) => {
            this.$message({
              type: 'success',
              message: '删除产品成功',
            })
            this.pageLoding = true;
            setTimeout(() => {this.getListProduct()}, 1000);
          }); 
        })
      },
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
      // 添加
      handleAddProduct() {
        this.productVisible = true;
        this.operateType = 'add';
      },
      // 修改
      handleUpdate(val) {
        const {
          productName,
          productKey,
          // deviceCount,
          // authType,
          // nodeType,
        } = val;
        this.currentProduct = {
          productName,
          productKey,
          // deviceCount,
          // authType,
          // nodeType,
        }
        this.productVisible = true;
        this.operateType = 'update';
      },
      handleDialogConfirm() {
        const {
          productName,
          // deviceCount,
          // authType,
          // productKey,
          // nodeType,
        } = this.currentProduct;
        if (!strLength(productName)) {
          this.$message({
            type: 'error',
            message: '请将信息填写完全',
          })
          return false;
        }
        if (this.operateType === 'add') {
          creatProduct(this.currentProduct).then(() => {
            this.$message({
              type: 'success',
              message: '添加产品成功',
            })
            this.pageLoding = true;
            setTimeout(() => {this.getListProduct()}, 1000);
          }).finally(() => {
            this.productVisible = false;
          });
        } else {
          updateProduct(this.currentProduct).then(() => {
            this.$message({
              type: 'success',
              message: '修改产品成功',
            })
            this.pageLoding = true;
            setTimeout(() => {this.getListProduct()}, 1000);
          }).finally(() => {
            this.productVisible = false;
          });
        }
      },
      handleDialogClose() {
        this.productVisible = false;
        this.currentProduct = {
          productName: '',
          deviceCount: '',
          authType: '',
          productKey: '',
          nodeType: '',
          gmtCreate: '',
        };
      },
    }
  }
</script>

<style scoped>
  .app-container {
    margin: 30px;
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
