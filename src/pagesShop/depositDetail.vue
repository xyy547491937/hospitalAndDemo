<template>
  <div class="vo deposit-container">
    <!-- banner -->
    <div class="c">
      <shopBanner :imgsrc="imgsrc"/>
    </div>
    <div class="deposit-inner">
      <!-- 标题 -->
      <p class="deposit-title xyy-ellipsis-2">
        <span class="pro-title">[{{pointDetail.commName }}]</span>
        <!-- <span>{{pointDetail.commDesc }}</span> -->
      </p>
      <!-- 价格 -->
      <div class="flex-r deposit-price">
        <div class="PD-num flex-r">
          <p>
            <span class="price-b">{{pointDetail.sproutPrice }}</span>
            <span class="price-item">豆芽</span>
          </p>
          <a class="c c-price">￥{{pointDetail.price }}</a>
        </div>
        <p>
          <span>购买</span>
          <span>{{pointDetail.exchangeNum }}</span>份
        </p>
      </div>
      <!-- 我的豆芽 -->
      <!-- <div class="flex-r my-bean">
        <p> <span> 我的豆芽：</span> <span> 1500</span></p>
        <p> <span>购买</span> <span>{{pointDetail.stock }} </span> 份</p>
      </div>-->
    </div>
    <!-- 地址 -->
    <div class="addr">
      <!-- addr -->
      <h4 class="depost-addr">{{pointDetail.organName }}</h4>
      <!-- 定位 -->
      <div
        class="deposit-source flex-r"
        @click="changeJump('/pagesShop/orgin',{id:pointDetail.organId})"
      >
        <p>
          <span>地址:</span>
          <span>{{pointDetail.address}}</span>
        </p>
        <p class="felx-r location-addr">
          <i-icon type="coordinates"/>
          <span class="c">{{pointDetail.distance }}</span>
        </p>
      </div>
      <!-- 有效期 -->
      <div class="c" v-if="pointDetail.isLimitTime=='1'">
        <span>有效期:</span>
        <span class="c">{{pointDetail.beginTime }}至{{pointDetail.endTime}}</span>
      </div>
    </div>
    <!-- 服务介绍 -->
    <div class="server-intro">
      <!-- 服务介绍 -->
      <div class="co point-img">
        <h4 class="server-title">服务介绍</h4>
        <!-- <wxParse :content="pointDetail.commDesc" @preview="preview" @navigate="navigate" noData/> -->
        <rich-text class="richText" :nodes="pointDetail.commDesc"></rich-text>
      </div>
      <!-- 温馨提示 -->
      <div class="co">
        <h4 class="server-title">温馨提示</h4>
        <p class="co-p">1.同一ID仅限兑换领取一次，新老用户均可领取</p>
        <p class="co-p">2.领取后请在有效期到门店进行兑换使用</p>
        <p class="co-p">3.请妥善保管自己的核销码，凭核销码到门店</p>
      </div>
      <!-- 版权声明 -->
      <div class="co">
        <h4 class="server-title">版权声明</h4>
        <p class="c co-p">如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请相关权利人或利害关系人与胚豆网联系。</p>
      </div>
      <!-- 免责声明 -->
      <div class="co">
        <h4 class="server-title">免责声明</h4>
        <!-- 1是医美 2其他行业 -->
        <p class="c co-p" v-if="pointDetail.organType == 1">该服务项目需您与医生当面沟通咨询方能最终确定治疗方案，本站所载内容仅供参考。</p>
        <p class="c co-p" v-else>该服务为线下服务，本站所载内容仅供参考。</p>
      </div>
    </div>
    <div class="quickChange" :class="{ 'quick-change-disabled': isNoShow }" @click="go">
      <div class="PD-sub-btn btnChange">{{btnText}}</div>
    </div>

    <i-modal title="温馨提示" :visible="visible1" @iclick="modalClick" :actions="actions">
      <view class="modal-info">此次兑换将消耗
        <text class="c" style="color:#ff4691">{{pointDetail.sproutPrice}}</text>豆芽
      </view>
      <view class="modal-info">请确认兑换吗？</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible2" :show-cancel="false" @ok="handleOk">
      <view class="modal-info">不在活动时间内，无法兑换</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible3" :show-cancel="false" @ok="handleOk1">
      <view class="modal-info">{{ infoMessage }}</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible4" :show-cancel="false" @ok="visible4 = false">
      <view class="modal-info">商品库存不足，无法兑换</view>
    </i-modal>
  </div>
</template>
<script>
import wxParse from "mpvue-wxparse";
import { mapState } from "vuex";
import shopBanner from "./comm/shopBanner";
import { dealNumber1, removeHtmlTags } from "../utils/util.js";
export default {
  data() {
    return {
      imgsrc: [],
      pointDetail: {},
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      infoMessage: "",
      actions: [
        {
          name: "取消",
          color: "#007AFF"
        },
        {
          name: "确定",
          color: "#007AFF"
        }
      ],
      isNoShow: false,
      btnText: "立即兑换"
    };
  },
  components: {
    shopBanner,
    wxParse
  },
  computed: {
    ...mapState(["userInfo"])
  },
  onShow() {
    this.visible1 = false;
    console.log(this.$route.query);
    if (this.$route.query.isNoShow == "true") {
      this.isNoShow = true;
    } else {
      this.isNoShow = false;
    }

    this.getPointDetail();
  },
  methods: {
    go() {
      // isNoShow ? alertInfo() : alertBox()
      console.log(typeof this.$root.$mp.query.isNoShow);
      console.log(this.isNoShow);
      if (this.$root.$mp.query.point <= this.pointDetail.sproutPrice) {
        // this.btnText = "积分不足,去攒积分";
        this.changeJump("/pagesMine/integrateSearch");
      } else {
        if (this.pointDetail.exchangeNum == this.pointDetail.stock) {
          this.alertWarning();
          // this.btnText = "库存不足";
        } else {
          if (this.isNoShow) {
            this.alertInfo();
          } else {
            this.alertBox();
          }
        }
      }
    },
    // 获取商品详情
    getPointDetail() {
      this.$http
        .post("pointCommodity/queryById", {
          isLimitTime: this.$root.$mp.query.isLimitTime,
          activityId: this.$root.$mp.query.activityId,
          id: this.$root.$mp.query.id,
          longitude: this.$store.state.longitude,
          latitude: this.$store.state.latitude
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data.commDesc) {
              res.data.commDesc = this.dealRichText(
                this.dealRichP(res.data.commDesc)
              );
            }
            if (res.data.activityRule) {
              res.data.activityRule = this.dealRichText(
                this.dealRichP(
                  this.dealRichList(this.dealRichOl(res.data.activityRule))
                )
              );
            }
            this.pointDetail = res.data;
            // this.imgSet(this.pointDetail.commDesc).then(res => {
            //   this.pointDetail.commDesc = res;
            // });
            this.imgsrc = this.pointDetail.commImg.split(",");
            this.pointDetail.distance = this.pointDetail.distance
              ? dealNumber1(Number(this.pointDetail.distance)) + "km"
              : "距离太远";
            console.log(this.$root.$mp.query.point);
            if (this.$root.$mp.query.point <= this.pointDetail.sproutPrice) {
              this.btnText = "豆芽不足,去攒豆芽";
            } else {
              if (this.pointDetail.exchangeNum >= this.pointDetail.stock) {
                // this.alertWarning();
                this.btnText = "库存不足";
              } else {
                this.btnText = "立即兑换";
              }
            }
          }
        });
    },
    // imgSet(text) {
    //   return new Promise((resolve, reject) => {
    //     dealHtmlStyle(text, "p", "font-size:12px;color:#555;").then(res => {
    //       dealHtmlStyle(res, "ul", "font-size:12px;color:#555;").then(res => {
    //         dealHtmlStyle(res, "img", "max-width:100%;height:auto").then(
    //           res => {
    //             resolve(res);
    //           }
    //         );
    //       });
    //     });
    //   });
    // },

    //保存积分订单
    savePointOrder() {
      const {
        organId,
        price,
        sproutPrice,
        commType,
        commImg,
        commName,
        isLimitTime,
        organPointActivity,
        unit,
        pointActivityId
      } = this.pointDetail;
      this.$http
        .post("pointOrder/save", {
          organId,
          custId: this.userInfo.custId,
          pointCommodityId: this.pointDetail.id,
          price,
          commImg,
          exchangePoint: sproutPrice,
          commType,
          commName,
          isLimitTime,
          organPointActivity,
          unit,
          mobile: this.userInfo.mobile,
          pointActivityId
        })
        .then(res => {
          console.log(res);
          if (res.code == -2) {
            this.infoMessage = res.msg;
            this.visible3 = true;
          }
          if (res.code === 1) {
            this.$router.push({
              path: "/pagesShop/exchangeDetail",
              query: {
                id: res.data
              }
            });
          }
        });
    },
    alertBox() {
      this.visible1 = true;
      // wx.showModal({
      //   title: "温馨提示",
      //   content: "此次兑换将消耗2000豆芽 请确认兑换吗？",
      //   success(res) {
      //     if (res.confirm) {
      //       console.log("用户点击确定");
      //     } else if (res.cancel) {
      //       console.log("用户点击取消");
      //     }
      //   }
      // });
    },
    handleClose1() {
      console.log("你点击确定按钮");
      this.visible1 = !this.visible1;
      this.savePointOrder();
    },
    handleClose2() {
      this.visible1 = !this.visible1;
      console.log("你点击了取消");
    },
    modalClick(event) {
      if (event.target.index) {
        this.handleClose1();
      } else {
        this.handleClose2();
      }
    },
    alertInfo() {
      this.visible2 = true;
    },
    handleOk() {
      this.visible2 = false;
    },
    handleOk1() {
      this.visible3 = false;
    },
    dealRichText(text) {
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto";display:block;margin:0 auto; '
      );
    },
    dealRichP(text) {
      // 处理 rich-text 中的 p
      return text.replace(
        /\<p/gi,
        '<p style="font-size:12px;color:#555;word-wrap:break-word;" '
      );
    },
    dealRichList(text) {
      return text.replace(
        /\<li/gi,
        '<li style="font-size:12px;color:#555;word-wrap:break-word;" '
      );
    },
    dealRichOl(text) {
      return text.replace(
        /\<ol/gi,
        '<ol style="font-size:12px;color:#555;word-wrap:break-word;padding-left: 15px;" '
      );
    },
    alertWarning() {
      this.visible4 = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.baseconfig {
  padding: 10px @basePadding;
  background-color: @base-white;
  margin-bottom: 10px;
}

.deposit-container {
  padding-top: 0;
  font-size: @baseSize;
  color: @co6;
  padding-bottom: 80rpx;

  & > .deposit-inner {
    &:extend(.baseconfig);

    & .deposit-title {
      margin-bottom: 10px;
      color: @baseFirstTitleColor;

      & > .pro-title {
        font-weight: bold;
      }
    }

    & .deposit-price {
      // margin-bottom: 10px;
      color: @baseTextColor-c;

      font-size: 12px;
      justify-content: space-between;
      align-items: flex-end;
      & > .PD-num {
        align-items: flex-end;
        font-size: 24rpx;
        color: #999999;
        & > p {
          color: @baseColor;

          & > .price-b {
            font-size: 48rpx;
          }
        }

        & > a {
          // font-size: 12px;
          text-decoration: line-through;
          color: @baseTextColor-c;
          margin-left: 15px;
        }
      }

      & > a {
        // font-size: 12px;
        text-decoration: line-through;
        color: @baseTextColor-c;
        margin-left: 15px;
      }
    }

    // 我的豆芽
    & .my-bean {
      margin-bottom: 10px;
      font-size: 12px;
      justify-content: space-between;
      color: @baseTextColor-c; //#999
    }
  }

  // 地址
  & > .addr {
    &:extend(.baseconfig);
    font-size: 12px;

    & > .depost-addr {
      font-size: @baseSize;
      // color: @baseFirstTitleColor;
      color: #333;
      font-weight: bold;
    }

    & > .deposit-source {
      justify-content: space-between;
      border-bottom: 1rpx solid #ddd;
      padding: 10px 0;
      margin-bottom: 10px;
      font-size: 24rpx;
      color: #666;
      & > .location-addr {
        align-items: center;
        width: 30%;
        text-align: right;
      }
    }
  }

  & > .server-intro {
    margin-bottom: 40rpx;
    &:extend(.baseconfig);

    & > .co {
      margin-bottom: 50rpx;
      color: @baseSconedTitleColor; //#555
      line-height: 22px;

      & > .server-title {
        color: @baseFirstTitleColor; //#333
        font-weight: bold;
        padding-left: 10px;
        border-left: 3px solid @baseColor;
        line-height: 1;
        margin-bottom: 30rpx;
        font-size: 26rpx;
      }
    }
  }
  // 立即兑换
  & .quickChange {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    & > .btnChange {
      width: 100%;
      border-radius: 0;
      height: 100rpx;
      line-height: 100rpx;
    }
  }
}

.server-title {
  color: @baseFirstTitleColor;
}
.c-price {
  color: #999999;
  text-decoration: line-through;
}
.price-item {
  display: inline-block;
  margin: 0 23rpx 0 11rpx;
}
.co-p {
  color: #555;
  font-size: 24rpx;
}
.modal-info {
  font-size: 28rpx;
  color: #333;
  font-weight: 400;
  line-height: 48rpx;
}
.quick-change-disabled {
  background: rgba(255, 70, 145, 0.6) !important;
}
.active {
  background-color: #ddd;
}
</style>
