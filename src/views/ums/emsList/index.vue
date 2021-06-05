<template>
  <div
    class="app-container"
    v-loading="pageLoding"> 
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">用户设备</span>
      <el-button
        class="btn-add"
        @click="productVisible = true"
        size="mini">
        绑定设备
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
        prop="deviceName"
        label="设备名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="设备昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productKey"
        label="产品Key"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="设备状态"
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
      <el-table-column
        prop="gmtModified"
        label="更新时间"
        align="center">
        <template slot-scope="scope">
          <span>{{ setTimeStyle(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="userDeviceDelete(scope.row)">解绑
            </el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- <div class="pagination-container">
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
    </div> -->
    <el-dialog
      title="绑定设备"
      :visible.sync="productVisible"
      :before-close="handleDialogClose"
      width="600px">
      <el-form
        :model="currentProduct"
        ref="roleForm1"
        label-width="180px"
        size="small"
      >
        <el-form-item label="隶属的产品ProductKey:">
          <el-select
            v-model="currentProduct.iotId"
            placeholder="隶属的产品ProductKey"
             style="width: 250px">
            <el-option
              v-for="item in productKeyList"
              :key="item.iotId"
              :label="item.deviceName"
              :value="item.iotId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userDeviceList, userDeviceCreate, userDeviceDelete, deviceList } from '@/api/heiShaProduct';
import moment from 'moment';
  export default {
    name: 'home',
    data() {
      return {
        pageLoding: false,
        // 产品数据
        shopLists: [],
        total: null,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        // 绑定设备弹窗
        productVisible: false,
        // 弹窗展现的产品
        currentProduct: {
          iotId: '',
        },
        // 设备产品key列表
        productKeyList: [],
      }
    },
    created(){
      this.getListProduct();
      this.getDeviceList();
    },
    methods:{
      // 获取所有产品key
      getDeviceList() {
        this.productKeyList = [];
        deviceList({
          pageNum: 1,
          pageSize: 50,
        }).then(response => {
          // const { list, pageNum, pageSize, total, totalPage } = response.data;
          const { list } = response.data
          this.productKeyList = list;
        }).finally(() => {
          this.pageLoding = false;
        });
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
        // const { name } = this.$store.state.user;
        console.log(this.$store.state);
        this.pageLoding = true;
        this.shopLists = [];
        userDeviceList({
          userId: 3,
        }).then(response => {
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
      // 绑定设备弹窗确定
      handleDialogConfirm() {
        const { iotId } = this.currentProduct;
        if (!iotId) {
          this.$message({
            type: 'error',
            message: '请选择绑定的设备',
          });
          return false;
        }
        userDeviceCreate({userId: 3, iotId }).then(() => {
          this.$message({
            type: 'success',
            message: '绑定设备成功',
          })
          this.productVisible = false;
          this.pageLoding = true;
          setTimeout(() => {this.getListProduct()}, 4000);
        }); 
      },
      // 弹窗关闭
      handleDialogClose() {
        this.productVisible = false;
        this.currentProduct = {
          iotId: '',
        };
      },
      // 解绑设备
      userDeviceDelete(val) {
        this.$confirm('是否解除设备', '提示', {
          confirmBUttonText: '确定',
          cancelButtonText: '取消',
          showClose: true,
        }).then(() => {
          userDeviceDelete({userDeviceId : val.userDeviceId }).then(() => {
            this.$message({
              type: 'success',
              message: '解除设备成功',
            })
            this.productVisible = false;
            this.pageLoding = true;
            setTimeout(() => {this.getListProduct()}, 4000);
          }); 
        })
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
