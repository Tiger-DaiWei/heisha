<template>
  <div
    class="app-container"
    v-loading="pageLoding"> 
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">设备列表</span>      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        注册
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
      <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.row)">重置
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)">删除
            </el-button>
            <el-button
              size="mini"
              @click="handleDisable(scope.row)">
              {{ scope.row.status !== 'DISABLE' ? '禁用' : '启用'}}
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
      :title="operateType === 'add' ? '注册设备' : '重置设备'"
      :visible.sync="productVisible"
      :before-close="handleDialogClose"
      width="40%">
      <el-form
        :model="currentProduct"
        ref="roleForm1"
        label-width="180px"
        size="small"
      >
        <el-form-item label="设备名称:">
          <el-input v-model="currentProduct.deviceName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="设备备注名称:">
          <el-input v-model="currentProduct.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="隶属的产品ProductKey:">
          <el-input v-model="currentProduct.productKey" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deviceList, deviceCreate, deviceDelete, deviceDisable, deviceEnable, listProduct, creatProduct, updateProduct, deleteProduct } from '@/api/heiShaProduct';
import {strLength} from '@/utils/index';
import moment from 'moment';
  export default {
    name: 'device',
    data() {
      return {
        pageLoding: false,
        // 设备数据
        shopLists: [],
        total: null,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        // 设备详情弹窗
        productVisible: false,
        // 弹窗展现的设备
        currentProduct: {
          deviceName: '',
          nickname: '',
          productKey: '',
        },
        operateType: 'add',
      }
    },
    created(){
      this.getListDevice();
    },
    methods:{
      handleAddProductCate() {},
      handleUpdate() {},
      handleDelete(val) {
        this.$confirm('是否删除设备', '提示', {
          confirmBUttonText: '确定',
          cancelButtonText: '取消',
          showClose: true,
        }).then(() => {
          deviceDelete({iotId: val.iotId}).then(({code}) => {
            this.$message({
              type: 'success',
              message: '删除设备成功',
            })
            this.pageLoding = true;
            setTimeout(() => {this.getListDevice()}, 4000);
          }); 
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getListDevice();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getListDevice();
      },
      getListDevice() {
        this.pageLoding = true;
        this.shopLists = [];
        deviceList(this.listQuery).then(response => {
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
          deviceCount,
          authType,
          productKey,
          nodeType,
        } = val;
        this.currentProduct = {
          productName,
          deviceCount,
          authType,
          productKey,
          nodeType,
        }
        this.productVisible = true;
        this.operateType = 'update';
      },
      handleDialogConfirm() {
        const {
          deviceName,
          nickname,
          productKey,
        } = this.currentProduct;
        if (
          !strLength(deviceName)
          || !strLength(nickname)
          || !strLength(productKey)
        ) {
          this.$message({
            type: 'error',
            message: '请将信息填写完全',
          })
          return false;
        }
        deviceCreate(this.currentProduct).then(({code}) => {
          this.$message({
            type: 'success',
            message: '注册设备成功',
          })
          this.pageLoding = true;
          setTimeout(() => {this.getListDevice()}, 2000);
          }).finally(() => {
          this.productVisible = false;
        });
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
      // 启用禁用设备
      handleDisable(val) {
        const str = val.status !== 'DISABLE' ? '禁用设备' : '启用设备';
        this.$confirm(str, '提示', {
          confirmBUttonText: '确定',
          cancelButtonText: '取消',
          showClose: true,
        }).then(() => {
          (
            val.status !== 'DISABLE'
            ? deviceDisable({iotId: val.iotId})
            : deviceEnable({iotId: val.iotId})).then(({code}) => {
            this.$message({
              type: 'success',
              message: str + '成功',
            })
            this.pageLoding = true;
            setTimeout(() => {this.getListDevice()}, 4000);
          }); 
        })
      }
    }
  }
</script>

<style scoped>
</style>
