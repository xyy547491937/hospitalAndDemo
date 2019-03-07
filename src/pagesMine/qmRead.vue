<template>
  <div class="content" :class="{'tripList_root':isqmrmask}">
    <div class="head_price">
      <div class="head_price1">阅读红包总计(元)</div>
      <div class="head_price_num">{{totalAmount}}</div>
    </div>
    <div class="section">
      <div class="sectionLeft">
        <div>
          本期阅读红包(元)
          <span>{{activityAmount}}</span>
        </div>
        <div v-show="activityState==1">有效期：{{start}} - {{end}}</div>
      </div>
      <div class="sectionRight">
        <span @click="open" v-if="activityState==1">活动说明</span>
        <span v-else class="newspan">活动说明</span>
      </div>
    </div>
    <div class="new-work">
      <div class="new-work-title flex-r">
        <p>本期邀请好友</p>
      </div>
      <ul class="integrate-box">
        <!-- 一个item -->
        <li class="integrate-item flex-r" v-for="(v,i) in dataList" :key="i">
          <div class="item-inner flex-r">
            <img :src="v.icon" v-if="v.icon" :data-id="i" alt @error="errorFunction">
            <img src="http://img.meiduduo.com/images/h5/default_icon.png" v-else alt>
            <div class="cv flex-c">
              <p class="i-title xyy-ellipsis">{{v.nickName}}</p>
              <p class="f-title">分享时间：{{v.createDate}}</p>
            </div>
          </div>
          <div class="item-go flex-r">
            <span class="bn">已阅读+{{v.drawAmount}}元</span>
          </div>
        </li>
        <!-- 更多任务 -->
        <li class="more-work" v-if="dataList.length>0 && isOver">没有更多数据</li>
        <li class="more-work" v-if="dataList.length<1">你还没有邀请过好友哦</li>
      </ul>
    </div>
    <div class="btn" v-if="activityState==1" @click="getTabshow">邀请好友阅读</div>
    <div class="btn color" v-else>敬请期待</div>
    <div class="qmReadmask" v-if="isqmrmask" @touchmove.stop="''"></div>
    <div class="qmrBox" v-if="isqmrmask">
      <div class="qmrTitle">活动说明</div>
      <div class="qmrContent">
        <p v-html="activityTitle"></p>
      </div>
      <div class="qmrBtn" @click="close">知道了</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isqmrmask: false,
      dataList: [],
      activityAmount: null,
      activityTitle: "",
      end: "",
      start: "",
      totalAmount: null,
      activityState: 0,
      pageSize: 10,
      pageNum: 1,
      readList: [],
      activityText: {},
      isOver: false
    };
  },
  onShow() {
    this.dataList = [];
    this.getData();
  },
  onPullDownRefresh() {
    // if (this.isqmrmask) {
    //   wx.stopPullDownRefresh();
    // } else {
    //   wx.startPullDownRefresh();
    // }
    if (!isqmrmask) {
      this.pageNum = 1;
      if (this.activityText.packetActivityId) {
        this.getinvite(this.activityText.packetActivityId);
      }
    }
    wx.stopPullDownRefresh();
  },
  //   到底了
  onReachBottom() {
    console.log("到底了");
    if (!this.isOver) {
      this.pageNum++;
      if (this.activityText.packetActivityId) {
        this.getinvite(this.activityText.packetActivityId);
      }
    }
  },
  methods: {
    errorFunction(event) {
      this.dataList[event.target.dataset.id].icon =
        "http://img.meiduduo.com/images/h5/default_icon.png";
    },
    getData() {
      var obj = {
        custId: this.$store.state.userInfo.custId
      };
      this.$http
        .post("/customerPacket/getTotalDrawAmountByCustId", obj)
        .then(res => {
          if (res.code === 1) {
            // console.log(res.data);
            this.activityText = res.data;
            this.activityAmount = res.data.activityAmount;
            this.activityTitle = res.data.activityTitle.replace(
              /\n/gi,
              "<br/>"
            );
            this.end = res.data.end.slice(0, 16).replace(/\-/g, ".");
            this.start = res.data.start.slice(0, 16).replace(/\-/g, ".");
            this.totalAmount = res.data.totalAmount;
            // console.log(this.totalAmount);
            this.activityState = res.data.activityState;
            // 调邀请好友的接口
            //活动存在掉接口
            if (res.data.packetActivityId) {
              this.getinvite(res.data.packetActivityId);
            }
          }
        });
    },
    //获取 邀请的列表
    getinvite(packetActivityId = "") {
      this.$http
        .post("packetInviteRecord/getListByCustIdAndActivityId", {
          custId: this.$store.state.userInfo.custId,
          packetActivityId,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            let a = res.data.data;
            if (this.pageNum == 1) {
              this.dataList = a;
              return false;
            }
            if (this.pageNum * this.pageSize < res.data.total) {
              this.dataList = this.dataList.concat(a);
              this.isOver = false;
            } else {
              this.dataList = this.dataList.concat(a);
              this.isOver = true;
            }
          }
        });
    },
    close() {
      this.isqmrmask = false;
    },
    open() {
      this.isqmrmask = true;
    },
    //跳转头条
    getTabshow() {
      wx.switchTab({
        url: "../pages/index"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content{
  min-height: 100%;
  background: #fff;
  border-top:1px solid #fff;
}
.qmReadmask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //   width: 100%;
  //   height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9998;
}
.qmrBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560rpx;
  height: 596rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 0 25px;
  z-index: 9999;
  .qmrTitle {
    text-align: center;
    line-height: 100rpx;
  }
  .qmrContent {
    max-height: 340rpx;
    overflow: auto;
    font-size: 33rpx;
    line-height: 45rpx;
  }
  .qmrBtn {
    width: 460rpx;
    height: 80rpx;
    background: #ff66a4;
    text-align: center;
    line-height: 80rpx;
    border-radius: 10rpx;
    color: #fff;
    font-size: 32rpx;
    font-family: PingFangSC-Semibold;
    position: fixed;
    left: 50%;
    bottom: 40rpx;
    transform: translate(-50%, 0%);
  }
}
.head_price {
  width: 690rpx;
  height: 180rpx;
  background: url("http://img.meiduduo.com/images/quanmin/qm_4.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  border-radius: 10rpx;
  margin: 28rpx;
  color: #fff;
  .head_price1 {
    font-size: 28rpx;
    padding-top: 20rpx;
  }
  .head_price_num {
    font-size: 80rpx;
    margin-top: -5rpx;
  }
}
.section {
  margin-top: 30rpx;
  padding: 28rpx;
  border-bottom: 20rpx solid #f5f5f5;
  display: flex;
  .sectionLeft {
    flex: 1;
    div:nth-child(1) {
      color: #333333;
      font-size: 28rpx;
      span {
        font-size: 32rpx;
        font-weight: bold;
        margin-left: 10rpx;
      }
    }
    div:nth-child(2) {
      color: #999999;
      font-size: 24rpx;
      margin-top: 24rpx;
    }
  }
  .sectionRight {
    span {
      display: block;
      min-width: 15rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      background: #ffa066;
      border-radius: 30rpx;
      color: #fff;
      font-size: 26rpx;
      padding: 0 25rpx;
    }
    .newspan {
      background: #999999;
    }
  }
}
.new-work {
  margin-bottom: 20rpx;
  & > .new-work-title {
    align-items: center;
    padding: 0 30rpx;
    height: 96rpx;
    & > p {
      color: #333333;
      font-size: 30rpx;
      font-weight: bold;
      border-left: 12rpx solid #ff66a4;
      padding-left: 10rpx;
    }
  }
}
.integrate-box {
  color: @baseTextColor-c;
  margin: 0 auto;
  & > .integrate-item {
    border-bottom: 1rpx solid #f1f1f1;
    padding: 30rpx 0rpx;
    margin: 0 20rpx;
    background-color: #fff;
    justify-content: space-between;
    & > .item-inner {
      align-items: center;
      & img {
        width: 60rpx;
        height: 60rpx;
        border-radius: 100%;
      }
      & > .cv {
        margin-left: 40rpx;
        justify-content: space-around;
        & > .i-title {
          max-width: 330rpx;
          font-size: 28rpx;
          color: #333;
          margin-bottom: 10rpx;
        }
        & > .f-title {
          color: #999999;
          font-size: 24rpx;
          color: @baseTextColor-c;
        }
      }
    }
    // 去认证
    & > .item-go {
      align-items: center;
      color: @baseColor;
      font-size: @baseSize;
      & > .bn {
        margin-right: 20rpx;
      }
    }
  }
  & > .more-work {
    font-size: 24rpx;
    color: #cccccc;
    background-color: #fff;
    text-align: center;
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    padding-bottom: 170rpx;
    padding-top: 30rpx;
  }
}
.btn {
  width: 460rpx;
  height: 100rpx;
  background: #ff66a4;
  text-align: center;
  line-height: 100rpx;
  border-radius: 10rpx;
  color: #fff;
  font-size: 32rpx;
  font-family: PingFangSC-Semibold;
  position: fixed;
  left: 50%;
  bottom: 53rpx;
  transform: translate(-50%, 0%);
}
.color {
  background: #999999;
  color: #fff;
}
::-webkit-scrollbar {
  display: none;
}
.tripList_root {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 0;
}
</style>
