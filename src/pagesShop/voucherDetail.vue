<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.page {
  height: 100%;
  background: #f5f5f5;
  padding-top: 30rpx;
  box-sizing: border-box;
}
.vou {
  margin: 0 30rpx 30rpx 30rpx;
}
.vou-tips {
  padding: 18rpx 30rpx;
  font-size: 24rpx;
  color: #333;
}
.vou-tips .title {
  font-weight: bold;
  margin: 10rpx 0;
}
.vou-tips .wxParse {
  font-size: 24rpx;
}
.vou-tips ul li {
  margin-bottom: 10rpx;
}
.qrcode-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);
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
#canvas-qrcode {
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

#canvasQrcode {
  position: fixed;
  top: 0;
  left: 0;
  width: 440rpx;
  height: 440rpx;
  z-index: -1;
}
</style>
<template>
  <div class="page">
    <div class="vou">
      <Voucher @getVoucher="getVoucher" @useVoucher="useVoucher" :get="get" :voucher="voucher"></Voucher>
    </div>
    <div class="vou-tips">
      <div class="title">使用说明:</div>
      <ul>
        <wxparse :content="voucher.couponDesc ? removeBr(voucher.couponDesc) : ''"/>
        <!-- {{voucher.couponDesc}} -->
        <!-- <li>1、有效期为兑换后1个月内；</li>
             <li>2、同一手机号、微信号视为同一账号；</li>
        <li>3、兑换后可到“我的-优惠券”中查看；</li>-->
      </ul>
    </div>
    <canvas id="canvasQrcode" canvas-id="canvas-qrcode2" style="width: 440rpx; height: 440rpx"></canvas>
    <div class="qrcode-container" @click="hideQrcode" v-show="qrcodeShow">
      <div class="qrcode-box">
        <div class="qrcode">
          <!-- <img :src="qrcodeSrc" alt=""> -->
          <canvas
            id="canvas-qrcode"
            canvas-id="canvas-qrcode"
            style="width: 440rpx; height: 440rpx"
          ></canvas>
        </div>
        <!-- <div class="code">{{FJAGE564SDFNJSNF12}}</div> -->
        <div class="code">{{voucher.couponCode}}</div>
        <div class="qrcode-tips">到店后请出示二维码给商家进行确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "../utils/qrCode";
import Voucher from "./comm/voucher";
import wxparse from "mpvue-wxparse";
import { removeBrTag } from "../utils/util.js";
export default {
  data() {
    return {
      qrcodeShow: false,
      qrcodeSrc: "",
      voucher: {
        // voucherId:1,
        // storeName:'青青草原美甲店',
        // money:30,
        // vStatus:1
      },
      get: 0,
      width: "",
      height: ""
    };
  },
  components: {
    Voucher,
    wxparse
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str)
    },
    hideQrcode() {
      this.qrcodeShow = false;
    },
    useVoucher() {
      // this.qrcodeSrc =
      //   this.$store.state.httpUrl +
      //   "/shop4/qr/genQR?width=200&height=200&format=png&content=" +
      //   this.voucher.couponId;
      // let text = this.voucher.id.toString();
      // this.createQrcode(text)
      this.qrcodeShow = true;
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
    getVoucher(item) {
      if (this.get) {
        this.$http
          .post("customerCoupon/save", {
            // id: item.id,
            couponName: item.couponName,
            custId: this.$store.state.userInfo.custId,
            couponOrganId: item.couponOrganId,
            recommendPrice: item.recommendPrice,
            reductionPrice: item.reductionPrice, //减免值
            // commodityId: "",
            state: 0,
            couponId: item.couponId, //优惠券id
            cooperateOrganId: item.cooperateOrganId //合作机构
          })
          .then(res => {
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "领取成功"
              });
              item.isReceived = 1;
              this.voucher.isReceived = 1;
            }
          });
      } else {
        wx.showToast({
          title: "购买后可领取",
          icon: "none",
          mask: true
        });
      }
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
  },
  onShow() {
    this.qrcodeShow = false;
  },
  onLoad(options) {
    let vou = "";
    if (options.couponItem) {
      vou = JSON.parse(options.couponItem);
      // console.log(vou);
      this.voucher = vou;
      this.voucher.reductionPrice = parseInt(this.voucher.reductionPrice);
      this.voucher.couponDesc = this.voucher.couponDesc.replace(
        /(\n)/g,
        "<br>"
      );
    }
    if (options.get) {
      this.get = 1;
    }
  },
  onReady() {
    this.init();
  }
};
</script>
