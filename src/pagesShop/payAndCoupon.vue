<template>
  <div class="vo" :style="qrcodeShow? 'height:100%;overflow:hidden;': ''">
    <div class="pay-message flex-c">
      <p class="pay-title flex-r">
        <icon type="success" size="25" color="#fff"/>
        <span>支付成功</span>
      </p>
      <p class="PD-sub-btn look" @click="jump()">查看订单</p>
    </div>
    <div class="pay flex-r">
      <!-- 背景图片 -->
      <div class="advert" @click="advertGo(skipParam1)">
        <!-- <img src="http://img.meiduduo.com/images/shop/order.png" alt> -->
        <!-- 广告位 -->
        <!-- <img
          :src="banner1"
          @click="changeJump(skipParam1.url,{id:skipParam1.id,type:skipParam1.wordtype})"
          alt
        >-->
        <img :src="skipParam1.pictureUrl" alt>
      </div>
      <p class="coupon-title" v-if="couponList.length>0">优惠福利</p>
      <!-- 加入组件 -->
      <div class="gride flex-r" v-for="v in couponList" :key="v">
        <couponList :couponItem="v" @couponCode="getCode"/>
      </div>
    </div>

    <!-- <div class="code">{{FJAGE564SDFNJSNF12}}</div> -->
    <!-- <div class="code">{{voucher.id}}</div>
    <div class="qrcode-tips">到店后请出示二维码给商家进行确认</div>-->
    <!-- <div id="nolist" v-if="orderList.length <1">
          <div class="noData-mode"></div>
    </div>-->
    <div class="qrcode-container" @click="hideQrcode" v-show="qrcodeShow">
      <div class="qrcode-box">
        <div class="qrcode">
          <canvas
            id="canvas-qrcode"
            canvas-id="canvas-qrcode"
            style="width: 440rpx; height: 440rpx"
          ></canvas>
          <!-- <img :src="imgurl" alt=""> -->
        </div>
        <!-- <div class="code">{{FJAGE564SDFNJSNF12}}</div> -->
        <div class="code">{{voucher.couponCode}}</div>
        <div class="qrcode-tips">到店后请出示二维码给商家进行确认</div>
      </div>
    </div>
    <canvas id="canvasQrcode" canvas-id="canvas-qrcode2" style="width: 440rpx; height: 440rpx"></canvas>
  </div>
</template>
<script>
import { mapState } from "vuex";
import couponList from "./comm/couponList";
import QRCode from "../utils/qrCode";

export default {
  data() {
    return {
      couponList: [],
      pageNum: 1,
      pageSize: 15,
      imgurl: "",
      voucher: {},
      width: "",
      height: "",
      qrcodeShow: false,
      banner1: "",
      skipParam1: {},
      adList: [],
      skipParam1: {}
    };
  },
  onShow() {
    this.loaded = false;
    this.couponList = [];
    this.getCouponList();
    this.getAdvert();
  },
  components: {
    couponList
  },
  computed: {
    ...mapState(["organId"]),
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  methods: {
    advertGo(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(this.httpUrl + "/sys/advertCost/updateAdvertClickNumber", {
          advertId: item.advertId
        })
        .then(res => {
          if (res.code == 1) {
            this.changeJump(item.skipParam.url, {
              id: item.skipParam.id,
              type: item.skipParam.wordtype,
              custId: this.$store.state.userInfo.custId
            });
          }
        });
    },

    //获取头条医美数据流的广告
    //获取头条医美数据流的广告
    getAdvert() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2PMZ0",
            areaId: this.$store.state.curCityId
          }
        )
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            let b = res.data;
            b.forEach(v => {
              v.skipParam = JSON.parse(v.skipParam);
              let info = "";
              let wordtype = 0;
              switch (Number(v.advertType)) {
                case 0:
                  info = "/pagesShow/activityAdvert";
                  break;
                case 1:
                  info = "/pagesShop/orgin";
                  break;
                case 2:
                  info = "/pagesShop/doctor_detail";
                  break;
                case 3:
                  info = "/pagesShop/productDetails";
                  break;
                case 4:
                  info = "/pagesShow/information";
                  wordtype = 10;
                  break;
                case 5:
                  info = "/pagesShow/information";
                  wordtype = 4;
                  break;
                case 6:
                  info = "/pagesMine/index";
                  wordtype = 4;
                  break;
                case 7:
                  info = "";
                  wordtype = 4;
                  break;
              }

              v.skipParam.url = info;
              v.skipParam.wordtype = wordtype;
            });
            this.adList = b;
            this.skipParam1 = b[0];
          }
        });
    },
    jump() {
      this.$router.replace({
        path: "/pagesMine/myOrder"
      });
    },
    getCouponList() {
      this.$http
        .post("coupon/paySuccessShowCoupon", {
          organIds: this.organId,
          // organIds: 69,
          custId: this.$store.state.userInfo.custId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            let a = res.data.data;
            a.forEach(v => {
              this.$set(v, "isOverdue", 0);
            });
            this.couponList = a;
            console.log(this.couponList);
          }
        });
    },

    getCode(msg) {
      // console.log(msg);
      this.voucher = msg.item;
      this.init();
      // this.createQrcode(this.width,this.height,msg.item.couponId.toString())
      this.qrcodeShow = true;
      // this.imgurl =
      //   this.$store.state.httpUrl +
      //   "/shop4/qr/genQR?width=200&height=200&format=png&content=" +
      //   this.voucher.couponId;
      // this.qrcodeShow = true;
    },
    hideQrcode() {
      this.qrcodeShow = false;
    },
    createQrcode(width, height, text) {
      // let w = this.width
      // let h = this.height
      var object = {
        text: text,
        width: width,
        height: height,
        colorDark: "#000000",
        colorLight: "#ffffff"
      };
      let qrcode = new QRCode("canvas-qrcode", object);
      // console.log(qrcode)
      // console.log(w,h)
    },
    init() {
      let that = this;
      wx
        .createSelectorQuery()
        .select("#canvasQrcode")
        .fields(
          {
            size: true
          },
          function(res) {
            console.log(res);
            if (res && res.width) {
              that.width = res.width;
              that.height = res.height;
              that.createQrcode(
                res.width,
                res.height,
                that.voucher.couponId.toString()
              );
            }
          }
        )
        .exec();
    }
  }
};
</script>
<style lang="less">
#canvasQrcode {
  position: fixed;
  top: 0;
  left: 0;
  width: 440rpx;
  height: 440rpx;
  z-index: -1;
}
.vo {
  padding-top: 0;
}

// @import url("../css/style.less");

.pay-message {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 174rpx * 2;
  background-image: url("http://img.meiduduo.com/images/xyy/order-title.png");
  background-repeat: no-repeat;
  background-size: cover;

  & > .pay-title {
    margin-bottom: @basePadding;
    color: @base-white;
    justify-content: center;
    align-items: center;

    & > span {
      font-size: 25px;
      font-weight: bold;
      margin-left: 45rpx;
    }
  }

  & > .look {
    width: 30%;
    height: 30px;
    line-height: 30px;
    background-color: transparent;
    border: 1px solid @base-white;
    color: @base-white;
  }
}

.pay {
  padding: 0 @basePadding;
  justify-content: space-between;
  flex-wrap: wrap;

  & > .advert {
    width: 100%;
    height: 116rpx * 2;
    position: relative;

    & > img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      position: absolute;
      top: -30rpx;
    }
  }

  & > .gride {
    width: 50%;
    // justify-content: center;
    margin-bottom: 10px;
  }

  & > .gride:nth-child(odd) {
    justify-content: flex-start;
  }

  & > .gride:nth-child(even) {
    justify-content: flex-end;
  }
}

.coupon-title {
  text-align: center;
  width: 100%;
  margin-bottom: 15px;
}
.qrcode-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.qrcode-box {
  width: 560rpx;
  height: 650rpx;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 60rpx 20rpx 0 20rpx;
}
.qrcode {
  width: 440rpx;
  height: 440rpx;
  margin: 0 auto;
}
.qrcode img {
  width: 440rpx;
  height: 440rpx;
  margin: 0 auto;
}
.code {
  font-size: 32rpx;
  color: #003333;
  margin-top: 20rpx;
}
.qrcode-tips {
  font-size: 28rpx;
  color: RGBA(99, 97, 98, 0.4);
  margin-top: 14rpx;
}
</style>
