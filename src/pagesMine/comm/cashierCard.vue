<template>
  <div class="cashier-card">
    <div @click="goCashierDetail(data)" class="cashier-card-header">
      <img src="http://img.meiduduo.com/images/hos_icon.png" alt="">
      <span>{{ data.organName }}</span>
      <span><i-icon type="enter" size="12" /></span>
    </div>
    <div class="cashier-main">
      <span>订单号：{{ data.orderNumber }}</span>
      <span>订单金额：<span class="cashier-price">￥{{ data.orderMoney }}</span></span>
      <span>订单时间：{{ data.orderDate || data.createDate || data.orderTime }}</span>
      <span>订单状态：{{ data.confirmedTime ? '已确认' : '未确认' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index'],
  data () {
    return {

    }
  },
  methods: {
    goDetail (id) {
      this.$router.push({
        path: ''
      })
    },
    goCashierDetail (val) {
      let a = JSON.stringify(val)
      this.$router.push({
        path: '/pagesMine/cashierDetail',
        query: {
          data: a,
          index: this.index
        }
      })
    }
  }
}
</script>

<style scoped>
.cashier-card {
  width: 690rpx;
  height: 290rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  background: #fff;
  padding: 30rpx;
}
.cashier-card-header {
  width: 100%;
  font-size: 26rpx;
  color: #666666;
  height: 38rpx;
  line-height: 38rpx;
  display: flex;
  display: -webkit-flex;
  margin-bottom: 24rpx;
  position: relative;
}
.cashier-card-header > img {
  width: 40rpx;
  height: 38rpx;
  margin-right: 20rpx;
}
.cashier-card-header > span:last-child {
  margin-left: 20rpx;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.cashier-main {
  font-size: 26rpx;
  color: #333333;
  font-weight: bold;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
}
.cashier-main > span {
  line-height: 45rpx;
}
.cashier-price {
  color: #FF4691;
}
</style>
