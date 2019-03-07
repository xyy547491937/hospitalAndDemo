<template>
  <div class="vo">
    <div class>
      <!-- <div class="total-use">
        <p class="c">共使用2份</p>
      </div>-->
      <div @click.stop="goOrderDetail" class="use-list flex-r">
        <div class="flex-r pro-detail no-bottom-border">
          <div class="img-box flex-r">
            <img :src="orderDetail.commImg" mode="widthFix">
          </div>
          <div class="use-remark flex-r">
            <p class="xyy-ellipsis-2">
              <span class="bold">[{{orderDetail.commodityName}}]</span>
              <span class="remark">{{orderDetail.commRemark}}</span>
            </p>
          </div>
        </div>

        <div>
          <i-icon type="enter" color="#999"/>
        </div>
        <!-- 时间 -->
        <!-- <div class="pay-date flex-r">
          <p>
            <span>消费时间：</span>
            <span class="c">2019-01-20 14:00:00</span>
          </p>
          <p>使用1份</p>
        </div>-->
      </div>
      <!-- 二维码展示 -->
      <div class="show-code flex-c">
        <p class="code-title">
          <span class="c">核销码：</span>
          <span>{{orderDetail.vertifyCodeLong}}</span>
        </p>

        <div class="er-code">
          <canvas
            id="canvas-qrcode"
            canvas-id="canvas-qrcode"
            style="width: 280rpx; height: 280rpx"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "../utils/qrCode";
import upng from "upng";
export default {
  data() {
    return {
      orderDetail: {},
      writeOffCode: ""
    };
  },
  onShow() {
    this.getOrderDetail();
    this.writeOffCode = this.$route.query.code;
  },
  onReady() {
    var that = this;
    wx
      .createSelectorQuery()
      .select("#canvas-qrcode")
      .fields(
        {
          size: true
        },
        function(res) {
          if (res && res.width) {
            that.createQrcode(res.height, res.width);
          }
        }
      )
      .exec();
  },
  methods: {
    createQrcode(height, width) {
      let text = this.writeOffCode.toString();
      var object = {
        text: text,
        width: width,
        height: height,
        colorDark: "#000000",
        colorLight: "#ffffff"
      };
      let qrcode = new QRCode("canvas-qrcode", object);
    },
    getOrderDetail() {
      this.$http
        .post("order/queryOneByPk", {
          id: this.$route.query.id
        })
        .then(res => {
          if (res.code == 1) {
            this.orderDetail = res.data;
            this.orderDetail.commImg = this.orderDetail.commImg.split(",")[0];
          }
        });
    },
    goOrderDetail() {
      if (this.$route.query.type == 2) {
        this.$router.push({
          path: "/pagesShop/groupOrderDetail",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$router.push({
          path: "/pagesShop/orderDetail",
          query: {
            id: this.$route.query.id
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
@fz: 13px;
.baseConfig {
  font-size: @fz;
  background-color: @base-white;
  padding: 15px;
}
.total-use {
  // &:extend(.baseConfig);
  color: @baseTextColor-c;
  font-size: @fz+1;
  padding: 0 15px;
  background-color: @base-white;
  & > p {
    padding: 15px 0;
    border-bottom: 1rpx solid #f5f5f5;
  }
}

.use-list {
  &:extend(.baseConfig);
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;

  & > .pro-detail {
    color: @baseFirstTitleColor;
    border-bottom: 1px solid #f5f5f5;
    & > .img-box {
      //   align-items: center;

      min-width: 60px;
      height: 60px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    & > .use-remark {
      margin-left: 15px;
      line-height: 20px;
      flex-wrap: wrap;
      & > p {
        & > .bold {
          font-weight: bold;
        }
        & > .remark {
          color: @baseFirstTitleColor;
        }
      }
    }
  }
  & > .pay-date {
    justify-content: space-between;
    color: @baseTextColor-c;
    &:extend(.baseConfig);
    padding-bottom: 0;
    padding-left: 0;
  }
}

.show-code {
  align-items: center;
  justify-content: flex-start;
  background-color: @base-white;
  min-height: 500px;
  font-size: 20px;
  font-weight: bold;
  & > .code-title {
    margin-bottom: 30px;
    margin-top: 30px;
  }
  & > .er-code {
    background-color: @cof5;
    padding: 20rpx;
    width: 320rpx;
    height: 320rpx;
    box-sizing: border-box;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
.no-bottom-border {
  border-bottom: 0 !important;
}
</style>
