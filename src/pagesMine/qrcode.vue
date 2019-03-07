<template>
 <div class="qrcode-page">
    <div class="qrcode-box"  >
        <div class="p-container">
            <div class="p-outer">
                <img :src="info.avator" alt="">
                <div class="p-box">
                    <div class="p-name">{{info.name}}</div>
                    <div class="p-city">{{info.city}}</div>
                </div>
            </div>
            <canvas id="canvas-qrcode" canvas-id='canvas-qrcode' style="width: 460rpx; height: 440rpx"></canvas>
            <p class="p-tip">扫描二维码即可查看诊疗信息</p>
        </div>

    </div>
 </div>
</template>

<script>
import QRCode from '../utils/qrCode'
import upng from 'upng'

export default {
  data() {
    return {
      qrcodeSrc: "",
      info: {
        avator: "",
        name: "",
        city: ""
      }
    };
  },
  onReady:function(e){
    var that = this
    wx.createSelectorQuery().select('#canvas-qrcode').fields({
      size: true,
    }, function(res){
      if(res&&res.width){
        that.createQrcode(res.height,res.width)
      }
    }).exec()
  },
  methods: {
    createQrcode (height ,width) {
      console.log(this.$store.state.userInfo.peopleId);
      let text = this.$store.state.userInfo.peopleId.toString()
      var object = {
        text: text,
        width: width,
        height: height,
        colorDark: "#000000",
        colorLight: "#ffffff"
      }
      let qrcode = new QRCode('canvas-qrcode', object)
      console.log(qrcode)
    }
  },
  onLoad() {
    //  var qrcode = new QRCode('canvas-qrcode', {
    //     text: '123',
    //     width: '460rpx',
    //     height: '440rpx'
    // });

    if (this.$store.state.userInfo.avatarUrl) {
      this.info.avator = this.$store.state.userInfo.avatarUrl;
    }
    console.log(this.$store.state.userInfo);

    this.info.name = this.$store.state.userInfo.nickName
      ? this.$store.state.userInfo.nickName
      : "";
    this.info.city = this.$store.state.userInfo.city
      ? this.$store.state.userInfo.city
      : "";

    // this.qrcodeSrc =
    //   this.$store.state.httpUrl +
    //   "/shop4/qr/genQR?width=100&height=100&format=png&content=" +
    //   this.$store.state.userInfo.peopleId;
  }
};
</script>

<style>
.qrcode-page {
  background: url('http://img.meiduduo.com/images/mine/qrcude_bg.png') no-repeat;
  background-size: cover;
  height: 100%;
}
.qrcode-box {
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100; */
  text-align: center;
  /* display: none; */
}
.p-container {
  /* margin-top: 200rpx; */
  width: 560rpx;
  height: 660rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 6rpx;
  padding-top: 30rpx;
}
.p-outer {
  text-align: left;
  width: 440rpx;
  margin: 0 auto;
  margin-bottom: 6rpx;
}
.p-outer img {
  width: 120rpx;
  height: 120rpx;
  vertical-align: middle;
}
.p-outer .p-box {
  display: inline-block;
  vertical-align: middle;
  height: 120rpx;
  line-height: 60rpx;
  margin-left: 20rpx;
}
.p-box .p-name {
  font-size: 30rpx;
  color: #333;
}
.p-box .p-city {
  font-size: 26rpx;
  color: #999;
}
.p-tip {
  margin-top: 14rpx;
  font-size: 30rpx;
  color: #999;
}
.qrcode-img {
  width: 500rpx;
  height: 440rpx;
  /* width: 450rpx;
		height:450rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%); */
}
#canvas-qrcode{
  margin: 0 auto;
  /* width: 440rpx;
  height: 440rpx;  */
}
</style>
