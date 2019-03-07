<style>
.voucher-container {
  padding: 20rpx 16rpx 20rpx 26rpx;
  background: #fff;
  border-radius: 20rpx;
  position: relative;
}
.type {
  position: absolute;
  top: 0;
  right: 0;
  width: 150rpx;
  height: 150rpx;
}
.voucher-box {
  display: flex;
  overflow: hidden;
}
.voucher-detail {
  flex: 1;
  padding: 10rpx 12rpx;
  border: 2rpx solid #e5e5e5;
  /* width: 100%; */
  display: flex;
  border-radius: 20rpx;
  position: relative;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.voucher-detail .dbefore {
  position: absolute;
  top: -20rpx;
  right: 154rpx;
  width: 36rpx;
  height: 36rpx;
  background: #fff;
  z-index: 11;
  border-bottom: 2rpx solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
}
.voucher-detail .dafter {
  position: absolute;
  bottom: -20rpx;
  right: 154rpx;
  width: 36rpx;
  height: 36rpx;
  background: #fff;
  z-index: 11;
  border-top: 2rpx solid #e5e5e5;
  border-radius: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.detail-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
  height: 150rpx;
  border: 2rpx dashed #f19ec2;
  border-right: none;
  border-radius: 20rpx;
  text-align: center;
  align-items: center;
  position: relative;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /* overflow: hidden; */
}
.detail-left .before {
  position: absolute;
  top: -16rpx;
  right: -20rpx;
  width: 40rpx;
  height: 30rpx;
  background: #fff;
  z-index: 10;
  border-radius: 50%;
  border-bottom: 2rpx dashed #f19ec2;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.detail-left .after {
  position: absolute;
  bottom: -16rpx;
  right: -20rpx;
  width: 40rpx;
  height: 30rpx;
  background: #fff;
  z-index: 10;
  border-radius: 50%;
  border-top: 2rpx dashed #f19ec2;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.detail-left .before_out {
  position: absolute;
  top: -38rpx;
  right: -23rpx;
  width: 40rpx;
  height: 40rpx;
  background: #fff;
  z-index: 11;
  border-radius: 50%;
  border-bottom: 2rpx solid #eee;
}
.detail-left .after_out {
  position: absolute;
  bottom: -38rpx;
  right: -23rpx;
  width: 40rpx;
  height: 40rpx;
  background: #fff;
  z-index: 11;
  border-radius: 50%;
  border-top: 2rpx solid #eee;
}

.detail-left .storename {
  color: #333;
  font-size: 26rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  max-width:280rpx;
}
.detail-left .title {
  color: #999;
  font-size: 22rpx;
  margin-top: 10rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  max-width:100px;
}
.detail-right {
  width: 160rpx;
  height: 150rpx;
  line-height: 150rpx;
  border: 2rpx dashed #f19ec2;
  border-left: none;
  border-radius: 20rpx;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: center;
  position: relative;
}
.detail-right .money {
  font-size: 56rpx;
  color: #333;
}
.mb {
  vertical-align: top;
}
.dright {
  position: absolute;
  left: 0;
  top: 30rpx;
  bottom: 30rpx;
  width: 2rpx;
  border-right: 1rpx dashed #f19ec2;
}
.voucher-action {
  width: 150rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
}
.voucher-action .status {
  text-align: center;
  padding: 10rpx 6rpx;
  font-size: 24rpx;
  color: #ea5690;
  border-bottom: 1rpx solid #ea5690;
}
.voucher-action .btn {
  padding: 10rpx 28rpx;
  color: #fff;
  background: #ea5690;
  margin: 0 auto;
  margin-top: 10rpx;
  border-radius: 10rpx;
}
.notUse {
  background: lightgray !important;
  color: #666 !important;
}
.time {
  text-align: center;
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}
</style>

<template>
  <div style="height:100%">
    <div class="voucher-container">
      <div class="voucher-box">
        <div class="voucher-detail">
          <div class="dbefore"></div>
          <div class="dafter"></div>
          <div class="detail-left">
            <div class="before"></div>
            <div class="after"></div>
            <!-- <div class="before_out"></div>
            <div class="after_out"></div>-->
            <div class="storename">{{voucher.couponName}}</div>
            <div class="title">{{voucher.couponOrganName}}</div>
            <div class="time">{{start}}--{{end}}</div>
          </div>
          <div class="detail-right">
            <div class="dright"></div>
            <span class="mb">￥</span>
            <span class="money">{{voucher.reductionPrice}}</span>
          </div>
        </div>
        <!-- <div class="voucher-action" >
                <span class="status">已领取</span>
                <span class="btn" @click.stop="useVoucher">去使用</span>
        </div>-->
        <div class="voucher-action" v-if="vStatus==-3">
          <span class="status">正在疯抢</span>
          <span class="btn" @click.stop="getVoucher" :class="{'notUse':canUse}">领取</span>
        </div>
        <div class="voucher-action" v-if="vStatus==0">
          <span class="status">已领取</span>
          <span class="btn" @click.stop="useVoucher">去使用</span>
        </div>
        <div class="voucher-action" v-if="vStatus==1||vStatus==-2"></div>
      </div>
      <!-- 已使用 -->
      <img class="type" v-if="vStatus==1" src="http://img.meiduduo.com/images/shop/shiyong.png" alt>
      <!-- 已失效 -->
      <img
        class="type"
        v-if="vStatus==-2"
        src="http://img.meiduduo.com/images/shop/shixiao.png"
        alt
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voucherId: "",
      storeName: "",
      money: "",
      vStatus: "",
      // 1已使用 0未使用 -2已失效
      status: {
        unGet: -3,
        unUse: 0,
        used: 1,
        timeOut: -2
      }
      // status: {
      //   unGet: 0,
      //   unUse: 1,
      //   used: 2,
      //   timeOut: 3
      // }
    };
  },
  props: {
    voucher: {
      type: Object,
      default: {}
    },
    canUse: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "voucher.isReceived": {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.vStatus = 0;
        }
      },
      deep: true
    }
  },
  components: {},
  computed: {
    start() {
      let stime = "";
      //  if ( this.voucher.startime) {
      //    stime = this.voucher.startime
      //  }else if (this.voucher.startTime){

      //  }
      stime = this.voucher.startime ? this.voucher.startime : this.voucher.startTime;
      return stime.substring(0, 10);
    },
    end() {
      return this.voucher.endTime
        ? this.voucher.endTime.substring(0, 10)
        : "长期有效";
    }
  },
  methods: {
    getVoucher() {
      //领取
      this.$emit("getVoucher", this.voucher);
    },
    useVoucher() {
      //使用
      this.$emit("useVoucher", JSON.stringify(this.voucher));
    }
  },
  onLoad(options) {
    // isReceived  1 已领取 0 未领取
    let vou = "";
    this.vStatus = this.voucher.state;

    if (options.couponItem) {
      vou = JSON.parse(options.couponItem);
      // vou.reductionPrice = parseInt(vou.reductionPrice)
      this.voucher = vou;
      this.$set(this, "voucher", vou);
      this.voucherId = vou.id;
      this.storeName = vou.couponName;
      this.money = vou.reductionPrice;
      this.vStatus = vou.state;
    }
    // else {
    //   this.vStatus = 0;
    // }
    if (this.voucher.isReceived!=''&&this.voucher.isReceived == 1) {
      this.vStatus = 0; //0未使用
    } else if (this.voucher.isReceived == '0') {
      this.vStatus = -3; //未领取
    }

    this.voucher.reductionPrice = parseInt(this.voucher.reductionPrice);
  }
};
</script>
