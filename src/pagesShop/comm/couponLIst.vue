<template>
  <div class="coupon-box">
    <div class="coupon-list" @click="isGoDetail(couponItem)">
      <div class="coupon-top flex-c">
        <p class="money">
          <span>￥</span>
          <span>{{couponItem.reductionPrice}}</span>
        </p>
        <p class="title">{{couponItem.couponName}}</p>
        <p class="addr xyy-ellipsis-1">{{couponItem.couponOrganName}}</p>
        <!-- <p class="addr xyy-ellipsis-1" v-if="couponState==1">{{couponItem.organName}}</p> -->
        <div class="flex-r lo left-icon">
          <i></i>
        </div>
        <div class="lo right-icon">
          <i></i>
        </div>
      </div>
      <!-- 立即领取 -->
      <div class="coupon-bottom flex-r" v-if="couponState==0" @click.stop="saveCoupon(couponItem)">
        <p class="coupon-btn flex-r">{{couponItem.isReceived==1?"去使用":"立即领取"}}</p>
      </div>
      <!--  立即使用 -->
      <div
        class="coupon-bottom flex-r"
        v-if="couponState==1"
        @click.stop="changeJump('/pagesShop/voucherDetail',{couponItem:JSON.stringify(couponItem) })"
      >
        <p class="coupon-btn flex-r">去使用</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    couponItem: {
      type: Object,
      default: {}
    },
    couponState: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //领取优惠券 0未领取
    saveCoupon(item) {
      console.log(item.isReceived);
      if (item.isReceived == 0) {
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
            cooperateOrganId: item.cooperateOrganId //item.cooperateOrganId //合作机构
          })
          .then(res => {
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "领取成功"
              });
              item.isReceived = 1;
            }
          });
      } else {
        // wx.showToast({
        //   title: "已领取",
        //   icon: "none"
        // });
        this.$emit("couponCode", { item });
      }
    },
    isGoDetail(item) {
      // if (item.isReceived || this.couponState) {
      this.changeJump("/pagesShop/voucherDetail", {
        couponItem: JSON.stringify(item),
        get: 1
      });
      // }
    }
  }
};
</script>
<style lang="less" scoped>
// @import url("../../css/style.less");

.coupon-box {
  color: @baseFirstTitleColor;
  font-size: @baseSize;
  width: 3.2rem;
  overflow: hidden;
  //   height: 2.6rem;
  padding: 0.1rem;
  background-color: #fff;
  & > .coupon-list {
    padding: 5px 15px;
    // height: 100%;
    border: 1px dashed #f19ec2;
    border-radius: 5px;

    & .coupon-top {
      justify-content: center;
      align-items: center;
      border-bottom: 1px dashed #f19ec2;
      padding: 10px 0;
      position: relative;
      //   height: 80%;
      & > .money {
        & span:first-child {
          font-size: 0.19rem;
        }
        & span:last-child {
          font-size: 30px;
          font-weight: bold;
        }
      }
      & > .title {
        font-size: 12px;
        color: @baseTextColor-c;
        padding: 10px 0;
      }
      & > .addr {
        font-weight: bold;
        width: 100%;
        text-align: center;
      }

      & > .lo {
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        justify-content: center;
        align-items: center;
        // -webkit-border-radius: 80%;
        border-radius: 50%;
        background-color: @base-white;
        padding: 3px;

        & > i {
          // content: "";

          border: 3px solid #fff;
          display: block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: @baseBackground;
        }
      }
      & > .left-icon {
        // &:extend(.lo);
        bottom: -0.25rem;
        left: -0.7rem;
        border-right: 1px dashed #f19ec2;
      }
      & > .right-icon {
        bottom: -0.25rem;
        right: -0.6rem;
        border-left: 1px dashed #f19ec2;
      }
    }
    & > .coupon-bottom {
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      //   height: 20%;
      & > .coupon-btn {
        width: 1.6rem;
        height: 0.44rem;
        background: rgba(251, 92, 169, 1);
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }
}
.isOverdue {
  background-color: #f5f5f5 !important;
  color: #333 !important;
}
</style>
