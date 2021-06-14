<template>
  <div
    class="app-container"
    v-loading="pageLoding">
    <ul class="product-list">
      <li
        v-for="(item, index) in shopLists"
        :key="index"
        :class="['status' + index]"
      >
        <img
          :src="theDefaultImage"
          @click="goDetails(item)"
          />
        <div>
          <i class="el-icon-warning" />
          <p>设备名称：{{item.deviceName}}</p>
          <p>设备昵称：{{item.nickname}}</p>
          <p>设备标识：{{item.iotId}}</p>
          <p>设备状态：{{item.status}}</p>
          <el-button @click="goDetails(item)">查看详情</el-button>
        </div>
      </li>
    </ul>
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
  </div>
</template>

<script>
import { deviceList } from '@/api/heiShaProduct';
import product1 from '@/assets/images/product/product1.jpeg';
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
        deviceList({
          pageNum: 1,
          pageSize: 50,
        }).then(response => {
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
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      height: 430px;
      border: 2px solid #ccc;
      border-radius: 6px;
      margin: 10px;
      padding: 10px;
      position: relative;
      width: 400px;
      i {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      img {
        height: 200px;
        width: 300px;
        cursor: pointer;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          line-height: 26px;
        }
        .el-button {
          margin-top: 14px;
        }
      }
      &.status3 {
        border-color: #ccc;
        animation: fade 3000ms infinite;
        i {
          color: #ccc;
        }
      }
      &.status2 {
        border-color: #000;
        animation: fade 3000ms infinite;
        i {
          color: #000;
        }
      }
      &.status1 {
        border-color: yellow;
        animation: fade 3000ms infinite;
        i {
          color: yellow;
        }
      }
      &.status0 {
        border-color: red;
        animation: fade 3000ms infinite;
        i {
          color: red;
        }
      }
    }
  }
}
@keyframes fade {
  from { opacity: 1.0; }
  50% { opacity: 0.4; }
  to { opacity: 1.0; }
}
 
@-webkit-keyframes fade {
  from { opacity: 1.0; }
  50% { opacity: 0.4; }
  to { opacity: 1.0; }
}
</style>
