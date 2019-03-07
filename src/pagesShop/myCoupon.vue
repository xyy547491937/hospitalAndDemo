<template>
  <div class="vo">
    <div id="nolist" v-if="myCoupon.length <1">
      <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
    <div class="pay flex-r">
      <!-- 加入组件 -->
      <div class="gride flex-r" v-for="v in myCoupon" :key="v">
        <couponList :couponItem="v" :couponState="1"/>
      </div>
    </div>
    <div class="coupon-history flex-r" @click="changeJump('/pagesShop/historyVouchers')">
      <div class="PD-sub-btn coupon-btn">优惠券历史记录</div>
    </div>
  </div>
</template>
<script>
import couponList from "./comm/couponList";
export default {
  data() {
    return {
      loaded: false,
      couponArr: [],
      pageNum: 1,
      pageSize: 15,
      myCoupon: [],
      isOver: false
    };
  },
  components: {
    couponList
  },
  mounted() {
    this.loaded= false
    this.getCouponList();
  },
  methods: {
    getCouponList() {
      this.$http
        .post("customerCoupon/list4Page", {
          custId: this.$store.state.userInfo.custId,
          state: 0,
          couponState: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let a = res.data.data;

            if (res.data.pageNum == 1) {
              this.myCoupon = a;
            } else {
              this.myCoupon = this.myCoupon.concat(a);
            }
            this.loaded=true
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
            this.myCoupon.forEach(v => {
              v.reductionPrice = parseInt(v.reductionPrice);
            });
          }
        });
    }
  },
  onReachBottom() {
    // console.log("到底了");
    if (!this.isOver) {
      // this.getList();
      this.getCartDetail();
    }
  }
};
</script>
<style lang="less">
// @import url("../css/style.less");
.vo {
  min-height: 100%;
  // padding-bottom: 100rpx;
  padding-bottom: 100rpx;
}
.pay {
  padding: 0 @basePadding;
  justify-content: space-between;
  flex-wrap: wrap;
  // margin-bottom: 100rpx;

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

.coupon-history {
  //   padding: 0 @basePadding;
  height: 100rpx;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: flex-end;
  align-items: center;
  z-index: 20;
  & > .coupon-btn {
    margin-right: @basePadding;
    width: 30%;
    background-color: transparent;
    border: 1px solid @baseTextColor-c;
    color: @baseTextColor-c;
    height: 30px;
    line-height: 30px;
  }
}
</style>
