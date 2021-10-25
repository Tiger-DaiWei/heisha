<template>
  <div class="event-status">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="createTime"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="deviceType"
        align="center"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="eventName"
        align="center"
        label="代号">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        label="描述">
      </el-table-column>
    </el-table>
    <div style="height: 52px;">
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15,20,50,100,500]"
          :current-page.sync="listQuery.pageNum"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { eventMessageList } from '@/api/heiShaProduct';
export default {
  name: 'EventStatus',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 5
      },
      pageLoding: false,
      tableData: [],
      total: 0,
    };
  },
  created(){
    this.getEventMessageList();
  },
  methods: {
    getEventMessageList() {
      this.pageLoding = true;
      this.tableData = [];
      const { deviceName, productKey } = this.deviceDetails;
      eventMessageList({deviceName, productKey, ...this.listQuery}).then(response => {
        const { list, total } = response.data
        this.total = total;
        this.tableData = list;
      }).finally(() => {
        this.pageLoding = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getEventMessageList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getEventMessageList();
    },
  },
}
</script>

<style lang='scss' scoped>
.event-status {
  padding: 20px;
  .title {
    font-size: 14px;
    border-bottom: 1px solid rgb(194, 194, 194);
    line-height: 40px;
    span {
      margin-right: 18px;
    }
    margin-bottom: 24px;
  }
}
</style>
