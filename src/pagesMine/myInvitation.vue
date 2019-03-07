<template>
  <div class="invitation-page">
    <div class="invitation-header">
      <div class="c">
        <p>可提现金额 </p>
        <p class="invitation-price-info" @click="jump2()">
        <img src="http://img.meiduduo.com/images/xyy/question.png" alt="">
        <span >规则说明</span>
      </p>
      </div>

      <div>
        <span><span class="draw-price">{{txAccount }}</span> 元</span>
        <span class="draw-btn" @click="goDeposit">提现</span>
      </div>
    </div>

    <!-- <div class="invitation-cell invitation-bottom">
      <div>
        <img class="invitation-cell-icon" src="http://img.meiduduo.com/images/xyy/wallet.png" alt="">
        <span >代言费明细</span>
      </div>
      <div>
        <span class="invitation-cell-aside"></span>
        <span><i-icon type="enter" color="#CCCCCC" size="18" /></span>
      </div>
    </div> -->

    <div class="invitation-price invitation-bottom">
      <div class="invitation-price-box flex-r">
        <div>
          <span class="invitation-price-label">预收金额（元）</span>
          <span class="invitation-price-value">{{ysAccount }}</span>
        </div>
        <div>
          <span class="invitation-price-label">累计到账（元）</span>
          <span class="invitation-price-value">{{accumulatedAccount  }}</span>
        </div>
        <div @click.stop="toMyRecommendation" class="c">
          <span class="invitation-price-label">我的推荐</span>
          <span class="invitation-price-value">{{account.recommendedUserNum }}人</span>
        </div>
      </div>

    </div>
    <!--  tab -->
    <div class="c">


    <!-- tab -->
    <ul class="tab-deposit flex-r">
        <li class="flex-r" :class="{'active':isTab==0}" @click="isTab=0"> 获取明细</li>
        <li class="flex-r " :class="{'active':isTab==1}" @click="isTab=1"> 提现记录</li>
    </ul>
      <!--  推荐好友列表 -->
       <!-- 列表 提现记录 -->
    <ul class="tab-list" v-if="isTab==0">
      <li class="flex-r co" v-for="v in shareArr " :key="v" v-if="shareArr.length>0">
        <div class="deposit-inner ">
          <p class=" lir"> <span>{{v.matter}}</span> <span></span></p>
          <!-- <p class=" lir cio"> <span>支付宝账号：</span> <span>12344566556@qq.com</span></p> -->
          <p class=" lir cio"> <span>{{v.createDate}}</span> <span></span></p>
        </div>
        <!-- <p>{{v.isAdd}}</p> -->
        <div class="deposit-num">
          {{v.isAdd==1?"+"+v.amount:"-"+v.amount}}
        </div>
      </li>
      <li class="noData" v-if="shareArr.length==0" :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''">
          </li>
    </ul>
    <!-- 列表 提现记录 -->
    <ul class="tab-list" v-if="isTab==1">
      <li class="flex-r co" v-for="v in accountFee " :key="v" v-if="accountFee.length>0">
        <div class="deposit-inner ">
          <p class=" lir"> <span>{{v.auditState}}</span> <span></span></p>
          <!-- <p class=" lir cio"> <span>微信账号：</span> <span>暂时拿不到</span></p> -->
          <p class=" lir cio"> <span> 提现号:</span> <span>{{v.applyNo}}</span></p>
          <p class=" lir cio"> <span>{{v.createDate}}</span> <span></span></p>
        </div>
        <div class="deposit-num">
          {{'-'+v.withdrawAmount}}
        </div>
      </li>
       <li class="noData" v-if="accountFee.length==0" :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''">
          </li>
    </ul>
    </div>
    <!-- <div v-if="false" class="share-order invitation-bottom">
      <p>分享订单</p>
      <div class="share-order-box">
        <div class="share-order-item">
          <img class="share-order-item-icon" src="http://img.meiduduo.com/images/mine/item1.png" alt="">
          <span>全部订单</span>
        </div>
        <div class="share-order-item">
          <img class="share-order-item-icon" src="http://img.meiduduo.com/images/mine/item1.png" alt="">
          <span>待使用</span>
        </div>
        <div class="share-order-item">
          <img class="share-order-item-icon" src="http://img.meiduduo.com/images/mine/item1.png" alt="">
          <span>已使用</span>
        </div>
        <div class="share-order-item">
          <img class="share-order-item-icon" src="http://img.meiduduo.com/images/mine/item1.png" alt="">
          <span>退款</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      isTab: 0,
      isShow: false,
      accountFee: [],
      account: {
        txAccount: 0,
        ysAccount: 0,
        accumulatedAccount: 0
      },
      shareArr: [],
      overCount: 0, //当前能体现的最低限制
      pageSize: 15,
      pageNum: 1,
      isOver: false,
      pageNum1: 1,
      pageSize1: 15
    };
  },
  onShow() {
    this.loaded = false
    this.getAccountDetail();
    this.getSharePeopleMessage();
    this.getFee();
  },
  computed: {
    txAccount() {
      return this.isZero(this.account.txAccount);
    },
    ysAccount() {
      return this.isZero(this.account.ysAccount);
    },
    accumulatedAccount() {
      return this.isZero(this.account.accumulatedAccount);
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
    jump2() {
      this.$router.push({
        path: "/pagesMine/rulebook"
        // query: {
        //   id:this.video.id,
        //   type:this.video.modelType
        //   }
      });
    },
    toMyRecommendation() {
      this.$router.push({
        path: "/pagesMine/myRecommendation",
        query: {}
      });
    },
    //提现
    goDeposit() {
      // 返回是for有在申请的状态
      //如果a.length>0 说明有 否则没有
      let a = this.accountFee.filter(v => {
        return v.auditState == 0;
      });
      //

      if (this.account.txAccount >= this.overCount && a.length <= 0) {
        this.changeJump("/pagesMine/deposit", { account: this.txAccount });
      } else if (a.length > 0) {
        wx.showToast({
          title: "后台通过以后在才可以再提现哦",
          icon: "none"
        });
      } else {
        wx.showToast({
          title: "您当前的账户余额不能提现，请再分享给好友",
          icon: "none"
        });
      }
    },
    //xyycode
    //获取用户的分享信息
    getAccountDetail() {
      this.$http
        .post("customer/getShareAccountInfoById", {
          id: this.userInfo.custId
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.account = res.data;
          }
        });
    },
    //数字后面加.00
    isZero(n) {
      n = n.toString();
      let arr = n.split(".");
      if (arr.length == 1) {
        return n + ".00";
      } else {
        return n;
      }
    },
    //根据用户id 获取当前分享人的信息
    getSharePeopleMessage() {
      this.$http
        .post("customerAccountRecord/list4Page", {
          custId: this.userInfo.custId,
          pageNum: this.pageNum1,
          pageSize: this.pageSize1
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let a = res.data.data;
            this.loaded = true
            if (res.data.pageNum == 1 || res.data.pageNum == 0) {
              this.shareArr = a;
            } else {
              this.shareArr = this.shareArr.concat(a);
            }
            if (this.pageNum1 == res.data.pages || a.length < this.pageSize1) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
          }
        });
    },
    getFee() {
      this.$http
        .post("withdraw/list4Page", {
          proposer: this.userInfo.custId,
          proposerType: 2,
          // auditState: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            let a = res.data.data;
            console.log(a);
            this.loaded = true
            if (res.data.pageNum == 1 || res.data.pageNum == 0) {
              this.accountFee = a;
            } else {
              this.accountFee = this.accountFee.concat(a);
            }
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
          }

          this.accountFee.forEach(v => {
            v.auditState = this.caseState(v.auditState);
          });
        });
    },
    caseState(n) {
      switch (n) {
        case 0:
          return "审核中";
        case 1:
          return "已通过";
        case 2:
          return "已驳回";
      }
    }
  },
  onReachBottom() {
    // console.log("到底了");
    if (!this.isOver) {
      // this.getList();
      if (this.isTab) {
        this.getFee();
      } else {
        this.getSharePeopleMessage();
      }
    }
  }
};
</script>

<style scoped lang="less">
.invitation-page {
  min-height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
}
.invitation-header {
  width: 100%;
  height: 220rpx;
  box-sizing: border-box;
  padding: 40rpx 33rpx 58rpx 31rpx;
  font-size: 30rpx;
  color: #fff;
  margin-bottom: 10px;
  background: linear-gradient(
    48deg,
    rgba(250, 106, 164, 0.8) 0%,
    rgba(248, 192, 152, 0.59) 53%,
    rgba(183, 50, 252, 0.4) 100%
  );
}
.invitation-header > p {
  margin-bottom: 20rpx;
}
.invitation-header > div {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.draw-price {
  font-size: 72rpx;
}
.draw-btn {
  width: 140rpx;
  height: 54rpx;
  display: inline-block;
  text-align: center;
  line-height: 54rpx;
  border-radius: 27rpx;
  border: 1rpx solid #fff;
  box-sizing: border-box;
}
.invitation-cell {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 30rpx;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}
.invitation-bottom {
  margin-bottom: 20rpx;
}
.invitation-cell > div {
  display: flex;
  align-items: center;
}
.invitation-cell-icon {
  width: 40rpx;
  height: 37rpx;
  margin-right: 10rpx;
}
.invitation-cell-aside {
  margin-right: 10rpx;
}
.invitation-price {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 30rpx 30rpx 19rpx 30rpx;
}
.invitation-price-box {
  width: 100%;
  height: 125rpx;
  box-sizing: border-box;
  /* padding-bottom: 18rpx; */
  display: flex;
  align-items: center;
  /* border-bottom: 1rpx solid #dddddd; */
  /* margin-bottom: 15rpx; */
}
.invitation-price-box > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.invitation-price-label {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 39rpx;
}
.invitation-price-value {
  font-size: 30rpx;
  color: #333333;
}
.invitation-price-info {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #999;
}
.invitation-price-info > img {
  width: 30rpx;
  height: 30rpx;
  border-radius: 100%;
  margin-right: 11rpx;
}
.share-order {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 30rpx;
}
.share-order > p {
  font-size: 28rpx;
  color: #333;
  padding-bottom: 23rpx;
  border-bottom: 1rpx solid #f5f5f5;
  margin-bottom: 19rpx;
}
.share-order-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}
.share-order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.share-order-item-icon {
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 24rpx;
}
.invitation-list {
  width: 100%;
  box-sizing: border-box;
  background: #fcfbfb;
  font-size: 26rpx;
  // padding: 36rpx 69rpx 36rpx 79rpx;
}
.invitation-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}
.invitation-list-item:last-child {
  margin-bottom: 0;
}
.invitation-list-user {
  display: flex;
  align-items: center;
}
.invitation-list-user > img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin-right: 12rpx;
}
.invitation-list-user > span {
  color: #333333;
}
.invitation-list-item > span {
  color: #ff5f6d;
}
.tab-deposit {
  height: 40px;
  font-size: @baseSize;
  background-color: @base-white;
  margin-bottom: 10px;
  color: @baseFirstTitleColor;
  & > li {
    flex: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid transparent;
  }
}
.tab-list {
  min-height: 400px;
  padding: 0 @basePadding;
  background-color: @base-white;
  & > .co {
    border-bottom: 1rpx solid #ddd;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }

  font-size: @baseSize;
  color: @baseFirstTitleColor;
  & .deposit-inner {
    & .lir {
      margin-bottom: 5rpx;
      & > span:first-child {
        text-align: left;
      }
      & > span:last-child {
        margin-left: 5px;
      }
    }
    & > .cio {
      color: @baseTextColor-c;
    }
  }
  & .deposit-num {
    font-size: 15px;
  }
}
.invitation-peo {
  font-size: @baseSize;
  padding: 0 @basePadding;
}
.active {
  border-bottom: 2px solid @baseColor!important;
  font-weight: bold;
}
</style>
