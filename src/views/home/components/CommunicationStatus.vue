<template>
  <div class="device-status">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <!-- 通讯状态图 -->
    <ul
      class="tree-status"
      v-loading="treeLoading"
      >
      <li class="flex1 left">
        <dl class="lists">
          <dd>
            风速仪
            <TwoWayArrow
              class="position1"
              :virtualReality="communicateData[4]"
              />
          </dd>
          <dd>
            温湿度计1
            <TwoWayArrow
              class="position1"
              :virtualReality="communicateData[5]"
              />
          </dd>
          <dd>
            温湿度计2
            <TwoWayArrow
              class="position1"
              :virtualReality="communicateData[6]"
              />
          </dd>
          <dd>
            GPS
            <TwoWayArrow
              class="position1"
              :virtualReality="communicateData[7]"
              />
          </dd>
        </dl>
        <div class="line">
          <div class="line-top">
            <em></em>
          </div>
          <div class="text">4<br>8<br>5<br>总<br>线</div>
          <div class="line-bottom">
            <em></em>
          </div>
        </div>
      </li>
      <li class="secode">
        <div>
          <TwoWayArrow
            class="position5"
            :arrowWidth="168"
            :rotatingDegree="45"/>
          互联网
          <TwoWayArrow
            class="position6"
            :arrowWidth="168"
            :rotatingDegree="-45"/>
          <div class="position-left">视频流服务器</div>
          <div class="position-right">业务服务器</div>
        </div>
        <div>
          <TwoWayArrow class="position1"/>
          T100
          <TwoWayArrow class="position2"/>
          <TwoWayArrow
            class="position3"
            :arrowWidth="30"
            :rotatingDegree="90"/>
          <TwoWayArrow
            class="position4"
            :arrowWidth="30"
            :rotatingDegree="90"/>
        </div>
        <div>摄像头</div>
      </li>
      <li class="flex1 right">
        <div class="line">
          <div class="line-top">
            <em></em>
          </div>
          <div class="text">C<br>A<br>N<br>总<br>线</div>
          <div class="line-bottom">
            <em></em>
          </div>
        </div>
        <dl class="lists">
          <dd>
            K100-GT
            <TwoWayArrow
              class="position2"
              :virtualReality="communicateData[3]"
              />
          </dd>
          <dd>
            K100-GZ
            <TwoWayArrow
              class="position2"
              :virtualReality="communicateData[1]"
              />
          </dd>
          <dd>
            K100-CD
            <TwoWayArrow
              class="position2"
              :virtualReality="communicateData[0]"
              />
          </dd>
          <dd>
            K100-KT
            <TwoWayArrow
              class="position2"
              :virtualReality="communicateData[2]"
              />
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLinkview } from '@/api/heiShaProduct'
import TwoWayArrow from '@/components/TwoWayArrow';
export default {
  name: 'CommunicationStatus',
  props: {
    deviceDetails: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    TwoWayArrow
  },
  data() {
    return {
      treeLoading: false,
      communicateData: [],
    };
  },
  mounted() {
    this.getLinkviewData();
  },
  methods: {
    /**
     * @description 查询状态树形数据
     * @param deviceName 设备名称
    */
    getLinkviewData() {
      this.treeLoading = true;
      this.communicateData = [];
      const { deviceName, productKey  } = this.deviceDetails;
      getLinkview({
        deviceName,
        productKey,
      }).then(({ code, message, data }) => {
        if (code === 200 && data) {
          this.communicateData = data;
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
  },
}
</script>

<style lang='scss' scoped>
.device-status {
  padding: 20px;
  .title {
    font-size: 14px;
    border-bottom: 1px solid rgb(194, 194, 194);
    line-height: 40px;
    span {
      margin-right: 18px;
    }
  }
  .tree-status {
    padding: 160px 10px 40px;
    display: flex;
    flex-direction: row;
    .flex1 {
      flex: 1;
    }
    li {
      &.left {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .line {
          width: 18px;
          height: 238px;
          border-left: 2px solid #000;
          border-right: 2px solid #000;
          text-align: center;
          position: relative;
          background: #fff;
          .line-top {
            position: absolute;
            left: -5px;
            top: -24px;
            width: 24px;
            height: 24px;
            &::before {
              display: block;
              content: '';
              border-top: 20px solid transparent;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 20px solid #000;
              position: absolute;
              left: -8px;
              top: -16px;
              z-index: 10;
            }
            &::after {
              display: block;
              content: '';
              border-top: 14px solid transparent;
              border-left: 14px solid transparent;
              border-right: 14px solid transparent;
              border-bottom: 14px solid #fff;
              position: absolute;
              left: -2px;
              top: -6px;
              z-index: 20;
            }
            // 白线
            em {
              width: 14px;
              height: 4px;
              background: #fff;
              position: absolute;
              left: 5px;
              bottom: 0;
              z-index: 30;
            }
          }
          .line-bottom {
            position: absolute;
            left: -5px;
            bottom: -24px;
            width: 24px;
            height: 24px;
            &::before {
              display: block;
              content: '';
              border-top: 20px solid #000;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 20px solid transparent;
              position: absolute;
              left: -8px;
              top: 0px;
              z-index: 10;
            }
            &::after {
              display: block;
              content: '';
              border-top: 14px solid #fff;
              border-left: 14px solid transparent;
              border-right: 14px solid transparent;
              border-bottom: 14px solid transparent;
              position: absolute;
              left: -2px;
              top: 2px;
              z-index: 20;
            }
            // 白线
            em {
              width: 14px;
              height: 4px;
              background: #fff;
              position: absolute;
              left: 5px;
              top: 0;
              z-index: 30;
            }
          }
          .text {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
      &.secode {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 100px;
        > div {
          padding: 10px 18px;
          border: 2px solid #000;
          border-radius: 4px;
          margin-bottom: 30px;
          position: relative;
        }
        > div:last-child {
          margin-bottom: 0;
        }
      }
      &.right {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .line {
          width: 18px;
          height: 238px;
          border-left: 2px solid #000;
          border-right: 2px solid #000;
          text-align: center;
          position: relative;
          background: #fff;
          .line-top {
            position: absolute;
            left: -5px;
            top: -24px;
            width: 24px;
            height: 24px;
            &::before {
              display: block;
              content: '';
              border-top: 20px solid transparent;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 20px solid #000;
              position: absolute;
              left: -8px;
              top: -16px;
              z-index: 10;
            }
            &::after {
              display: block;
              content: '';
              border-top: 14px solid transparent;
              border-left: 14px solid transparent;
              border-right: 14px solid transparent;
              border-bottom: 14px solid #fff;
              position: absolute;
              left: -2px;
              top: -6px;
              z-index: 20;
            }
            // 白线
            em {
              width: 14px;
              height: 4px;
              background: #fff;
              position: absolute;
              left: 5px;
              bottom: 0;
              z-index: 30;
            }
          }
          .line-bottom {
            position: absolute;
            left: -5px;
            bottom: -24px;
            width: 24px;
            height: 24px;
            &::before {
              display: block;
              content: '';
              border-top: 20px solid #000;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 20px solid transparent;
              position: absolute;
              left: -8px;
              top: 0px;
              z-index: 10;
            }
            &::after {
              display: block;
              content: '';
              border-top: 14px solid #fff;
              border-left: 14px solid transparent;
              border-right: 14px solid transparent;
              border-bottom: 14px solid transparent;
              position: absolute;
              left: -2px;
              top: 2px;
              z-index: 20;
            }
            // 白线
            em {
              width: 14px;
              height: 4px;
              background: #fff;
              position: absolute;
              left: 5px;
              top: 0;
              z-index: 30;
            }
          }
          .text {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
      .lists {
        padding: 0 100px;
        dd {
          padding: 10px;
          border: 2px solid #000;
          border-radius: 4px;
          text-align: center;
          margin-bottom: 30px;
          position: relative;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .position1 {
    position: absolute;
    top: 12.5px;
    right: -100px;
  }
  .position2 {
    position: absolute;
    top: 12.5px;
    left: -100px;
  }
  .position3 {
    position: absolute;
    top: -21px;
    left: 15px;
  }
  .position4 {
    position: absolute;
    bottom: -21px;
    left: 15px;
  }
  .position5 {
    position: absolute;
    bottom: 94px;
    left: -124px;
  }
  .position6 {
    position: absolute;
    bottom: 94px;
    right: -124px;
  }
  .position-left {
    padding: 16px 20px;
    border: 2px solid #000;
    position: absolute;
    bottom: 134px;
    left: -220px;
    border-radius: 4px;
  }
  .position-right {
    padding: 16px 26px;
    border: 2px solid #000;
    position: absolute;
    bottom: 134px;
    right: -220px;
    border-radius: 4px;
  }
}
</style>
