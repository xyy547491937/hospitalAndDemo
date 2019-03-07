<template>
  <div class="vo">
    <div class="col flex-r">
      <span>提现金额</span>
      <p class="deposit-money flex-r">
        <span>￥{{account}}</span>
        <!-- <input type="text"  v-model="account" autofocus disabled> -->
      </p>
    </div>
    <div class="deposit-btn">
      <div class="PD-sub-btn" @click="withdraw">申请提现</div>
    </div>
    <!-- 模态框 -->
    <!-- 账户绑定 梦莹先让去掉 -->
    <!-- <div class="cover" v-if="isShow" @click="isShow=!isShow">
            <div class="test-phone-box">
                    <p class="test-phone-title">为了您的账户安全，请验证您的手机号</p>
                    <div class="test-col-box flex-c">
                        <div class="col-phone flex-r">
                            <p> 预留手机号</p>
                            <input type="text" class="c" :value="phone" style="text-align:right;color:#333;" placeholder-style="color:#999;text-align:right" disabled>
                        </div>
                         <div class="col-phone flex-r">

                            <input type="text" class="c" placeholder="请输入验证码" placeholder-style="color:#999;">
                            <p class="code" @click.stop="getCode($event)" data-id="cv" :class="{'active':isClick==0}"> {{codeBtn}}</p>
                        </div>
                    </div>
                    <div class="PD-sub-btn cv-btn" >确定</div>
            </div>
    </div>-->
    <i-modal
      title="温馨提示"
      :visible="visible1"
      @ok="selectDownload"
      @cancel="cancle"
      ok-text="确定"
      cancle-text="取消"
    >
      <view class="modal-info">你必须到APP才能提现
        <text class="c" style="color:#ff4691"></text>
      </view>
      <view class="modal-info">请确认跳转到下载页面吗？</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible2" :show-cancel="false" @ok="handleOk">
      <view class="modal-info">请到appStore或者应用市场</view>
      <view class="modal-info">下载胚豆APP提现</view>
    </i-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      account: 0,
      codeBtn: "获取验证码",
      isClick: 1,
      visible1: false,
      visible2: false,
      actions: [
        {
          name: "取消",
          color: "#007AFF"
        },
        {
          name: "确定",
          color: "#007AFF"
        }
      ]
    };
  },
  mounted() {
    this.account = this.$root.$mp.query.account;
    // this.withdraw();
  },
  computed: {
    phone() {
      return this.$store.state.userInfo.mobile;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  methods: {
    handleOk() {
      this.visible2 = false;
    },
    selectDownload(e) {
      this.visible1 = false;
      this.changeJump("/pagesMine/downloadApp", {});
    },
    cancle() {
      this.visible1 = false;
    },
    withdraw() {
      let a = Number(this.account);
      this.visible1 = true;
      if (a <= 0) {
        wx.showToast({
          title: "提现金额必须大于0",
          icon: "none"
        });
      } else {
        this.visible1 = true;
      }
      // if (a < 100) {
      //   wx.showToast({
      //     title: "提现金额必须大于等于100",
      //     icon: "none"
      //   });
      // } else {
      //   if (a > this.$root.$mp.query.account && a <= 100000) {
      //     wx.showToast({
      //       title: "提现金额不能大于余额",
      //       icon: "none"
      //     });
      //   } else {
      //     this.$http
      //       .post("withdraw/save", {
      //         proposer: this.userInfo.custId,
      //         proposerType: 2,
      //         withdrawAmount: this.account
      //       })
      //       .then(res => {
      //         // console.log(res);
      //         if (res.code == 1) {
      //           wx.showToast({
      //             title: "你的申请已经提交，请耐心等待",
      //             icon: "none"
      //           });
      //         } else {
      //           wx.showToast({
      //             title: res.msg,
      //             icon: "none"
      //           });
      //         }
      //         //this.account = 0;
      //       });
      //   }
      // }
    },
    getCode(e) {
      // console.log(e);
      if (this.isClick) {
        // 禁止点击
        this.isClick = 0;
        let n = 60;
        let timer = setInterval(() => {
          n--;
          n = n < 10 ? "0" + n : n;
          this.codeBtn = `0:${n}`;

          if (n <= 0) {
            clearInterval(timer);
            this.codeBtn = "重新获取";
            //60s 以后重新可以点击
            this.isClick = 1;
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less">
// @import url("../css/style.less");
.col {
  font-size: @baseSize;
  color: RGBA(51, 51, 51, 1);
  height: 58px;
  justify-content: space-between;
  padding: 0 15px;
  background-color: @base-white;
  align-items: center;
  & > .deposit-money {
    font-weight: bold;
    align-items: center;
    & > input {
      font-size: 18px;
      width: 100px;
    }
  }
}
.deposit-btn {
  margin-top: 50px;
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.test-phone-box {
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
  color: RGBA(51, 51, 51, 1);
  height: 225px;
  font-size: 13px;
  color: #999;
  background-color: #fff;
  border-radius: 8px;
  top: 50%;
  margin-top: -225rpx;
  left: 10%;
  position: fixed;
  & > .test-phone-title {
    font-size: 14px;
    color: #999;
    // font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin: 10px 0;
    padding: 10px 0;
  }
  & .test-col-box {
    padding: 0 15px;
    & > .col-phone {
      border-bottom: 1rpx solid RGBA(228, 162, 193, 1);
      padding: 10px 0;
      justify-content: space-between;
      align-items: center;
      & > .code {
        font-size: 15px;
        font-weight: bold;
        color: @baseColor;
        text-align: center;
        padding-left: 20px;
        border-left: 1rpx solid RGBA(228, 162, 193, 1);
        width: 30%;
      }
    }
  }
  & > .cv-btn {
    margin-top: 20px;
  }
}
.active {
  font-weight: normal !important;
  color: #ccc !important;
}
</style>
