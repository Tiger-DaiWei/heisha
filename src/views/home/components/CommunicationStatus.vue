<template>
  <div class="device-status">
    <p class="title">
      <span>设备类型：DNEST</span>
      <span>设备号：{{ deviceDetails.deviceName }}</span>
      <span>连接状态：{{ deviceDetails.status }}</span>
    </p>
    <!-- 通讯状态图 -->
    <ul class="tree-status">
      <li class="flex1 left">
        <dl class="lists">
          <dd>风速仪</dd>
          <dd>雨量计</dd>
          <dd>温湿度计</dd>
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
        <div>互联网</div>
        <div>T100</div>
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
          <dd>K100-GT</dd>
          <dd>K100-GZ</dd>
          <dd>K100-CD</dd>
          <dd>K100-KT</dd>
        </dl>
      </li>
    </ul>
    <TwoWayArrow />
  </div>
</template>

<script>
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
    padding: 60px 10px 20px;
    border: 1px solid red;
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
          height: 172px;
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
        div {
          padding: 10px 18px;
          border: 2px solid #000;
          border-radius: 4px;
          margin-bottom: 30px;
        }
        div:last-child {
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
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>