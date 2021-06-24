<template>
  <div
    class="app-container"
    v-loading="pageLoding">
    <ul class="product-list">
      <li
        v-for="(item, index) in shopLists"
        :key="index"
        :class="[item.status, item.deviceRunStatus]"
      >
        <img
          :src="theDefaultImage"
          @click="goDetails(item)"
          />
        <div>
          <p>名称：{{item.deviceName}}</p>
          <p>昵称：{{item.nickname}}</p>
          <p>标识：{{item.iotId}}</p>
          <p>状态：{{item.status}}</p>
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
import product1 from '@/assets/images/device/device1.png';
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
        localStorage.removeItem('deviceDetails');
        localStorage.setItem('deviceDetails', JSON.stringify(val));
        this.$router.push('/deviceDetails');
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
      height: 410px;
      border-radius: 2px;
      margin: 10px;
      padding: 0 10px 10px;
      position: relative;
      width: 400px;
      color: #fff;
      border: 1px solid transparent;
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
      // 显示就四种
      // 1、灰色(OFFLINE不在线, DISABLE设备已禁用, UNACTIVE设备未激活)
      // 2、在线、正常显示(ONLINE)
      // 3、警告，黄色闪烁
      // 4、故障，红色闪烁
      &.OFFLINE, &.DISABLE, &.UNACTIVE {
        background: #ccc;
      }
      &.ONLINE {
        background: #fff;
        color: #000;
        border-color: #ccc;
        // normal-正常 alert-报警 error-故障
        &.error {
          animation: fadeRed 500ms infinite;
        }
        &.alert {
          animation: fadeYellow 500ms infinite;
        }
      }
    }
  }
}
@keyframes fadeRed {
  from { background: red;}
  50% { background: #ccc;}
  to { background: red;}
}
 
@-webkit-keyframes fadeRed {
  from { background: red;}
  50% { background: #ccc;}
  to { background: red;}
}
@keyframes fadeYellow {
  from { background: yellow;}
  50% { background: #ccc;}
  to { background: yellow;}
}
 
@-webkit-keyframes fadeYellow {
  from { background: yellow;}
  50% { background: #ccc;}
  to { background: yellow;}
}
</style>
