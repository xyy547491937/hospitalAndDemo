<template>
  <div class="qm_share">
    <div v-if="isHome" @click.stop="backHome" class="back_home">
      <img src="/static/images/tab1.png" mode="aspectFit" alt>
    </div>
    <div class="titlebox">
      <p class="title1">我在“胚豆”</p>
      <p class="title2">看别人的故事，写自己的日记</p>
      <p class="title3">
        赚了
        <span>{{getMoney}}元</span>
      </p>
    </div>
    <div :class="isShowenvelope?'content':'content tops'">
      <p v-show="isShowenvelope">
        <span>{{envelopeMoney}}</span>元新人红包
      </p>
      <p>首单消费返现</p>
      <p>登录领零花钱</p>
    </div>
    <div class="ewm">
      <figure class="img">
        <img :src="ewmImage" alt @click="getpreviewImage">
      </figure>
    </div>
  </div>
</template>
<script>
import LOGIN from "../utils/login.js";
export default {
  data() {
    return {
      getMoney: null,
      envelopeMoney: null,
      isShowenvelope: true,
      title: "",
      custId: "",
      taskId: null,
      // 是否进行分享进行返回显示
      onShow: "",
      ewmImage: "",
      isReturn: false,
      isHome: false
    };
  },
  onShareAppMessage(res) {
    this.onShow = true;
    this.getloginAndShare();
    this.getsaveUser();
    return {
      title: this.title,
      path:
        '/pagesMine/qmShare?share=1&shareType=7&shareUrl="/pageMine/qmshare"&custId=' +
        this.custId +
        "&taskId=" +
        this.taskId
    };
  },
  onShow() {
    this.goRegiest();
    if (this.$route.query.share == 1) {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
    if (this.isReturn) {
      this.isReturn = false;
      return false;
    }
    console.log("抖onShow");
    if (!this.onShow) {
      this.title = "";
      this.custId = "";
    }
    if (this.$route.query.custId) {
      this.custId = this.$route.query.custId;
    } else {
      this.custId = this.$store.state.userInfo.custId;
    }
    console.log(this.$route.query);
    //方法调用顺序不能乱
    this.getShareEnvelopeDeta();
    this.getshareTasksave();
    this.queryActivityByCustId();
  },
   computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    goRegiest() {
      if (Number(this.$route.query.share)) {
        if (!this.user.openid || !this.user.custId) {
          this.$store.commit("setInvited", {
            invited: true
          });
          console.log("商品页判断是否已注册");
          LOGIN("/pagesMine/qmShare", this.$route.query);
        } else {
          if (this.$route.query.custId) {
            this.custId = this.$route.query.custId;
          } else {
            this.custId = this.user.custId;
          }
          this.getShareEnvelopeDeta();
          this.getshareTasksave();
          this.queryActivityByCustId();
          this.getsaveUser(this.$route.query.custId);
        }
      }
      console.log("商品详情页登录状态查看", this.$store.state.isLogin);
      console.log("商品详情页，邀请状态", this.$store.state.invited);
    },
    backHome() {
      // 回到首页
      wx.switchTab({
        url: "/pages/index"
      });
    },
    getsaveUser(pCustId = 0) {
      //小程序-APP-用户关系记录保存（顶级用户关系绑定）
      setTimeout(() => {
        var obj = {
          pCustId,
          custId: this.$store.state.userInfo.custId,
          taskId: this.taskId,
          custRelation: 1
        };
        // console.log('用户关系参数',obj)
        this.$http.post("/customerRelation/save", obj).then(res => {
          console.log("用户关系", res);
          if (res.code === 1) {
            console.log("用户关系保存成功", res);
          }
        });
      }, 2000);
    },
    queryActivityByCustId(cityId) {
      //新人红包
      var obj = {
        custId: this.$store.state.userInfo.custId
      };
      this.$http
        .post("/redPacketActivity/queryActivityByCustId", obj)
        .then(res => {
          if (res.code === 1) {
            this.$set(
              this,
              "envelopeMoney",
              parseFloat(res.data.singlePacketAmount)
            );
            this.$set(this, "title", res.data.activityTitle);
            this.isShowenvelope = true;
          } else if (res.code === 0) {
            this.isShowenvelope = false;
          }
        });
    },
    getpreviewImage(e) {
      //图片放大
      console.log("触发了 longpress");
      this.isReturn = true;
      wx.previewImage({
        current: this.ewmImage,
        urls: [this.ewmImage]
      });
    },
    getShareEnvelopeDeta() {
      //晒收入详细页面信息
      var obj = {
        custId: this.custId
      };
      this.$http
        .post("/customerPacket/getShareEnvelopeDetails", obj)
        .then(res => {
          if (res.code === 1) {
            this.getMoney = res.data.totalEnvelopeIncome;
            console.log("晒收入详细页面信息", res);
          }
        });
    },
    getshareTasksave() {
      //二维码获取
      var params = {
        custId: this.custId,
        path: "pages/index",
        packetActivityId: null
      };
      var obj = {
        custId: this.custId
      };
      this.$http.post("/customerPacket/allReceiveMoneyList", obj).then(res => {
        if (res.code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].activityType == 5) {
              params.packetActivityId = res.data[i].id;
            }
          }
          this.$http.post("/shareTask/saveForShareIncome", params).then(res => {
            if (res.code === 1) {
              console.log("用户分享", res);
              this.ewmImage = res.data.qrcodePath;
              this.taskId = res.data.taskId;
            }
          });
        }
      });
    },
    getloginAndShare() {
      //转发后
      var params = {
        custId: this.$store.state.userInfo.custId,
        // originCustId: this.$store.state.userInfo.pCustId,
        packetActivityId: null,
        activityType: 5,
        clientType: 1
      };
      var obj = {
        custId: this.$store.state.userInfo.custId
      };
      this.$http.post("/customerPacket/allReceiveMoneyList", obj).then(res => {
        if (res.code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].activityType == 5) {
              params.packetActivityId = res.data[i].id;
            }
          }
          this.$http
            .post("/customerPacket/loginAndShareEnvelope", params)
            .then(res => {
              if (res.code === 1) {
                // console.log('转发成功',this.getPacketData)
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.qm_share {
  width: 100%;
  height: 100%;
  background: url("http://img.meiduduo.com/images/quanmin/qm_3.png") no-repeat;
  background-size: 100% 100%;
  font-size: PingFangSC-Semibold;
  .titlebox {
    width: 100%;
    color: #ffffff;
    font-size: 38rpx;
    text-align: center;
    line-height: 55rpx;
    font-weight: bold;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    span {
      background: #fee26f;
      color: #ff94be;
      padding: 0 5rpx;
      margin-left: 3rpx;
    }
  }
  .content {
    color: #ff4691;
    text-align: center;
    font-size: 34rpx;
    line-height: 50rpx;
    letter-spacing: 3rpx;
    font-weight: bold;
    position: absolute;
    top: 30%;
    left: 53%;
    transform: translate(-50%, 0%);
  }
  .tops {
    top: 33%;
  }
  .ewm {
    width: 330rpx;
    height: 330rpx;
    background: #f5f5f5;
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
    .img {
      width: 290rpx;
      height: 290rpx;
      margin-top: 20rpx;
      margin-left: 20rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
