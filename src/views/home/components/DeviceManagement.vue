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
import { selectTree, processEventMessageStatus } from '@/api/heiShaProduct';
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
      theTreeData: [
        {
          label: 'DNEST（HEISHADNEST2021080001)',
          children: [
            {
              label: '边缘计算',
              children: [],
            },
            {
              label: '防雨盖',
              children: [
                {
                  label: '传动系统',
                  children: [],
                },
                {
                  label: '温控系统',
                  children: [
                    {
                      label: '传动系统',
                      children: [],
                    },
                    {
                      label: '温控系统',
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              label: '充电板',
              children: [],
            },
          ],
        },
        {
          label: 'DNEST（HEISHADNEST2021080001)',
          // children: [
          //   {
          //     label: '边缘计算',
          //     children: [],
          //   },
          //   {
          //     label: '防雨盖',
          //     children: [
          //       {
          //         label: '传动系统',
          //         children: [],
          //       },
          //       {
          //         label: '温控系统',
          //         children: [],
          //       },
          //     ],
          //   },
          //   {
          //     label: '充电板',
          //     children: [],
          //   },
          // ],
        },
      ],
      // 设备树加载
      treeLoading: false,
    };
  },
  created() {
    bus.$on('toEliminateTheFault', (str) => {
      this.toProcessEventMessageStatus(str);
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
      const { deviceName } = this.deviceDetails;
      selectTree({
        deviceName,
      }).then(({ code, message, data }) => {
        if (code === 200 && data) {
          this.theTreeData = data.list || [];
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
     * @description 将未处理设备处理
     * @param id 唯一标识
    */
    toProcessEventMessageStatus(str) {
      if (!str) return false;
      processEventMessageStatus({
        id: str,
      }).then(({ code, message, data }) => {
        if (code === 200) {
          this.getDeviceTree();
        } else {
          this.$message({
            type: 'error',
            message: message || '处理失败',
          })
        }
      }).finally(() => {
      });
    }
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
