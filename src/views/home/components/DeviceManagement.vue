<template>
  <div
    class="device-manage"
    v-loading="treeLoading"
  >
    <TreeMockNode
      v-for="(item, index) in theTreeData"
      :key="index"
      :treeData="item"
    />
  </div>
</template>

<script>
import bus from '@/utils/bus.js';
import { selectTree } from '@/api/heiShaProduct';
export default {
  name: 'DeviceInfo',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    TreeMockNode: () => import('@/views/home/components/TreeMockNode'),
  },
  data() {
    return {
      // 设备树数据
      theTreeData: [],
      // 设备树加载
      treeLoading: false,
    };
  },
  created() {
    bus.$off('toEliminateTheFault');
    bus.$on('toEliminateTheFault', () => {
      this.getDeviceTree();
    })
  },
  mounted() {
    this.getDeviceTree();
  },
  methods: {
    /**
     * @description 查询状态树形数据
     * @param deviceName 设备名称
    */
    getDeviceTree() {
      this.treeLoading = true;
      this.theTreeData = [];
      console.log(this.deviceDetails + 'new date' + new Date());
      const { deviceName } = this.deviceDetails;
      selectTree({
        deviceName,
      }).then(({ code, message, data }) => {
        if (code === 200 && data) {
          this.theTreeData = this.toSetTreeKey(data.list || []);
        } else {
          this.$message({
            type: 'error',
            message: message || '获取数据失败',
          })
        }
      }).finally(() => {
        this.treeLoading = false;
      });
    },
    /**
     * @description 给树节点添加属性
     * @param obj 要操作的数据
    */
    toSetTreeKey(obj) {
      obj.forEach(el => {
        if (el.childNode && el.childNode.length) {
          el.show = true;
          this.toSetTreeKey(el.childNode);
        }
      })
      return obj;
    },
  },
}
</script>

<style lang="scss" scoped>
.device-manage {
  padding: 20px 0;
  height: 100%;
  overflow-y: auto;
}
</style>
