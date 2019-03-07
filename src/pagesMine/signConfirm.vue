<template>
  <div class="signconfirm">
    <div class="headImg">
      <img class="head-img" :src="info.logo" alt>
    </div>
    <div class="signctn">
      <div class="originT">{{info.organName}}</div>
      <div class="originT1">{{info.documentName}}</div>
      <div class="signctn" v-if="info.signType ==1">
        <img style="display:block;margin:0 auto;" :src="info.documentUrl" alt mode="widthFix">
      </div>
      <div
        class="Signature"
        v-if="info.orderDetailList && info.signType==2"
        v-for="(item,index) in info.orderDetailList"
        :key="index"
      >
        <span class="Signature2">
          <span>商品名称</span>
          ： {{item.goodsName}}
        </span>
        <span class="Signature2">
          <span>商品数量</span>
          ： {{item.goodsNumber}}
        </span>
        <span class="Signature2">
          <span>商品规格</span>
          ： {{item.specification}}
        </span>
        <span class="Signature2">
          <span>商品价格</span>
          ： ￥{{item.goodsPrice}}
        </span>
        <span class="Signature2">
          <span>总价</span>
          ： ￥{{item.goodsNumber * item.goodsPrice}}
        </span>
      </div>
      <div class="Signature" v-if="info.treatmentRecordDTO && info.signType==3">
        <span class="Signature2">
          <span>治疗时间</span>
          ： {{info.createDateStr}}
        </span>
        <span class="Signature2">
          <span>治疗项目</span>
          ： {{info.treatmentRecordDTO.projectName}}
        </span>
        <span class="Signature2">
          <span>治疗次数</span>
          ： {{info.treatmentRecordDTO.treatmentNumUsed}}/{{info.treatmentRecordDTO.treatmentNum}}
        </span>
        <span class="Signature2">
          <span>参与人员</span>：
          <i
            style="display:inline;"
            v-for="(item,index) in info.treatmentRecordDTO.participantList"
            :key="index"
          >{{item['staff_name'] + ' '}}</i>
        </span>
      </div>
      <div
        class="Signature"
        v-if="info.children && info.signType>=4"
        v-for="(item,index) in info.children"
        :key="index"
      >
        <span class="Signature2">
          <span>商品名称</span>
          ： {{item.goodsName}}
        </span>
        <span class="Signature2">
          <span>商品数量</span>
          ： {{item.goodsNum}}
        </span>
        <span class="Signature2">
          <span>商品规格</span>
          ： {{item.goodsSpec}}
        </span>
        <span class="Signature2">
          <span>商品价格</span>
          ： ￥{{item.goodsPrice}}
        </span>
        <span class="Signature2">
          <span>总价</span>
          ： ￥{{item.goodsMoney}}
        </span>
      </div>
      <div class="originT3">{{info.createDateStr}}</div>
      <img
        class="sign"
        style="display:block;"
        v-if="info.signType !=1 &&info.isSignature!=1"
        :src="info.documentUrl"
        alt
      >
    </div>
    <div class="signbtm1" v-if="info.isSignature==1">
      <span class="signbtn" @click="show=true;">签署</span>
    </div>
    <div class="mock" v-show="show" @click="show=false">
      <div class="canvasBtm" @click.stop>
        <div class="tip">请仔细阅读上述资料，完成手签确认</div>
        <canvas
          v-if="info"
          class="sign"
          canvas-id="sign"
          @touchmove="move"
          @touchstart="start"
          @touchend="end"
          @touchcancel="cancel"
          @longtap="tap"
          disable-scroll="true"
          @error="error"
        ></canvas>
        <div class="signbtm" @click.stop>
          <span class="signbtn" @click="clearClick">重签</span>
          <span class="signbtn signbtn1" @click="saveClick">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import upng from "upng-js";
export default {
  data() {
    return {
      info: {},
      content: null,
      touchs: [],
      imgList: [],
      signImage: "",
      show: false,
      canvasw: "",
      canvash: "",
      status: false,
      base64: ""
    };
  },
  computed: {
    signatureList() {
      return this.$store.state.signatureList;
    },
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  watch: {
    show(value) {
      var that = this;
      // console.log(value)
      if (value) {
        that.status = false;
        setTimeout(() => {
          wx
            .createSelectorQuery()
            .select(".sign")
            .fields(
              {
                size: true
              },
              function(res) {
                if (res && res.width) {
                  console.log(res, value);
                  that.canvasw = res.width;
                  that.canvash = res.height;
                  // console.log(res, '.....................................')
                  //获得Canvas的上下文
                  that.content = wx.createCanvasContext("sign");
                  //设置线的颜色
                  that.content.setStrokeStyle("#000");
                  //设置线的宽度
                  that.content.setLineWidth(3);
                  //设置线两端端点样式更加圆润
                  that.content.setLineCap("round");
                  that.content.setLineJoin("round");
                  //设置两条线连接处更加圆润
                  that.content.setFillStyle("#ffffff");
                  that.content.fillRect(0, 0, res.width, res.height);
                  // that.content.stroke();
                  // that.content.draw(true);
                }
              }
            )
            .exec();
        }, 200);
      } else {
        that.clearClick();
      }
    }
  },
  onShow() {
    this.show = false;
    console.log(this.$route.query.index);
    this.$set(
      this,
      "info",
      this.$store.state.signatureList[this.$route.query.index]
    );
  },
  methods: {
    //绘制
    draw(touchs) {
      this.status = true;
      let point1 = touchs[0];
      let point2 = touchs[1];
      touchs.shift();
      this.content.moveTo(point1.x, point1.y);
      this.content.lineTo(point2.x, point2.y);
      this.content.stroke();
      this.content.draw(true);
    },
    //清除操作
    clearClick() {
      //清除画布
      this.content.clearRect(0, 0, this.canvasw, this.canvash);
      this.content.draw(true);
      this.content.setFillStyle("#ffffff");
      this.content.fillRect(0, 0, this.canvasw, this.canvash);
      this.content.draw(true);
    },
    //保存图片
    saveClick() {
      if (!this.status) {
        wx.showModal({
          title: "提示",
          content: "签名内容不能为空！",
          showCancel: false
        });
        return false;
      }
      var that = this;
      // console.log(that)
      wx.canvasGetImageData({
        canvasId: "sign",
        x: 0,
        y: 0,
        width: that.canvasw,
        height: that.canvash,
        success(res) {
          // console.log(res)
          // 3. png编码
          let pngData = upng.encode([res.data.buffer], res.width, res.height);
          // 4. base64编码
          let base64 = wx.arrayBufferToBase64(pngData);
          // console.log(base64)
          that.$set(that, "base64", "data:image/jpeg;base64," + base64);
          var parames = {
            base64Img: base64,
            id: that.info.id,
            signType: that.info.signType,
            documentUrl: that.info.documentUrl,
            token: that.$store.state.userInfo.token
          };
          that.$http
            .post(that.httpUrl + "/basics/basicSign/saveSign", parames)
            .then(res => {
              that.arrx = [];
              that.arry = [];
              that.arrz = [];
              that.content.clearRect(0, 0, that.canvasw, that.canvash);
              that.content.draw(true);
              wx.showToast({
                title: "手签成功",
                icon: "success",
                duration: 2000
              });
              that.$router.go(-1);
            });
        }
      });
    },
    start(event) {
      console.log("触摸开始", event.mp.changedTouches[0].x);
      console.log("触摸开始", event.mp.changedTouches[0].y);
      //获取触摸开始的 x,y
      let point = {
        x: event.mp.changedTouches[0].x,
        y: event.mp.changedTouches[0].y
      };
      this.touchs.push(point);
    },
    // 画布的触摸移动手势响应
    move(e) {
      let point = { x: e.touches[0].x, y: e.touches[0].y };
      this.touchs.push(point);
      if (this.touchs.length >= 2) {
        this.draw(this.touchs);
      }
    },
    // 画布的触摸移动结束手势响应
    end(e) {
      console.log("触摸结束", e);
      //清空轨迹数组
      for (let i = 0; i < this.touchs.length; i++) {
        this.touchs.pop();
      }
    },
    // 画布的触摸取消响应
    cancel(e) {
      console.log("触摸取消", e);
    },
    // 画布的长按手势响应
    tap(e) {
      console.log("长按手势", e);
    },
    error(e) {
      console.log("画布触摸错误", e);
    }
  }
};
</script>
<style scoped>
.signconfirm {
  width: 100%;
  background: #f0f0f0 url("http://img.meiduduo.com/images/signbg.png") no-repeat
    left top;
  background-size: 100% 3.44rem;
  overflow: hidden;
  font-size: 0.26rem;
  color: #555555;
  line-height: 0.54rem;
  height: 100%;
  overflow-y: auto;
}
.headImg {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 100%;
  border: 1px solid #fff;
  background-size: 100%;
  margin: 0.48rem auto 0.28rem;
}
.head-img {
  display: block;
  width: 87px;
  height: 87px;
  border-radius: 100%;
}
.signctn {
  box-sizing: border-box;
  width: 7rem;
  overflow: hidden;
  margin: 0 auto 0.18rem;
  /* padding:0 .36rem; */
  border-radius: 4px;
  background: #fff;
  -moz-box-shadow: 0.1rem 0.1rem 8% rgba(112, 105, 111, 23%);
  -webkit-box-shadow: 0.1rem 0.1rem 8% rgba(112, 105, 111, 23%);
  box-shadow: 0.1rem 0.1rem 8% rgba(112, 105, 111, 23%);
}
.signctn .originT {
  height: 1.06rem;
  line-height: 1.06rem;
  font-size: 0.32rem;
  color: #333333;
  font-weight: 700;
  padding-left: 0.8rem;
  border-bottom: 1px solid #ff4691;
  background: url("http://img.meiduduo.com/images/signIcon.png") no-repeat left
    center;
  background-size: 0.62rem 0.66rem;
  padding-bottom: 0.12rem;
}
.signctn .originT1 {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.36rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  /* border-bottom: 1px solid #eeeeee; */
  margin-bottom: 0.16rem;
}
.signctn .originT3 {
  height: 0.8rem;
  line-height: 0.8rem;
  border-top: 1px solid #eeeeee;
  padding: 0 36rpx;
}
.Signature {
  padding: 10rpx 36rpx;
  border-top: 0.5px dashed #999;
  margin: 10rpx 36rpx;
}
.Signature2 {
  height: 42rpx;
  line-height: 42rpx;
  font-size: 26rpx;
  color: #999;
  width: 100%;
  display: block;
}
.Signature2 span {
  min-width: 106rpx;
  display: inline-block;
}
.signbtm {
  color: #fff;
  width: 672rpx;
  margin: 0 auto;
  background: #fff;
  border-top: 1rpx solid #eee;
  padding: 18rpx 0;
  overflow: hidden;
}
.mock {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}
.mock .tip {
  font-size: 0.26rem;
  color: #fa9b0a;
  height: 0.86rem;
  line-height: 0.86rem;
  padding: 0 36rpx;
}
.sign {
  height: 320rpx;
  width: 672rpx;
  margin: 0 auto;
  background: #fff;
}
.canvasBtm {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
</style>
