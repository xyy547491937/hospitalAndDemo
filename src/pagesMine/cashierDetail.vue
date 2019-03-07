<template>
  <div class="cashier-detail">
    <div class="cashier-header">
      <img src="http://img.meiduduo.com/images/order_detail_icon.png" alt="">
      <p>订单金额：<span class="order-price">￥{{ value.orderMoney }}</span></p>
    </div>
    <div class="cashier-main">
      <div>
        <p class="order-content-title">订单信息</p>
        <p class="order-content-header-item">
          <span>订单号：</span>
          <span>{{ value.orderNumber }}</span>
        </p>
        <p class="order-content-header-item">
          <span>订单时间：</span>
          <span>{{ value.orderDate || value.createDate || value.orderTime }}</span>
        </p>
        <p class="order-content-header-item">
          <span>开发人：</span>
          <span>{{ value.developerName }}</span>
        </p>
      </div>
      <div v-for="(item, index) of value.detailDTOList" :key="index" class="order-content">
        <p>
          <span>消费名称：</span>
          <span>【{{item.typeName}}】{{ item.goodsName }}</span>
        </p>
        <p class="order-product-infos">
          <span>规格：</span>
          <span class="order-product-info">
            <span>{{ item.specification }}</span>
            <span>数量：{{ item.goodsNumber }}</span>
          </span>
        </p>
      </div>
      <div class="border-style">
        <p class="order-content-header-item">
          <span>线上订单名称：</span>
          <span>{{ value.onlineName }}</span>
        </p>
      </div>
      <!-- <div class="order-content">
        <p>
          <span>消费名称：</span>
          <span>【产品】玻尿酸水面膜</span>
        </p>
        <p class="order-product-infos">
          <span>规格：</span>
          <span class="order-product-info">
            <span>30ml/片</span>
            <span>数量：1</span>
          </span>
        </p>
      </div> -->
    </div>
    <div class="order-detail">
      <div class="order-detail-header">
        <span>收银员：{{ orderDetail.chargerName }}</span>
        <span>{{ orderDetail.createDate }}</span>
      </div>
      <div class="order-detail-table">
        <div class="tabel-header">
          <span>支付方式</span>
          <span>金额</span>
          <span>合计</span>
        </div>
        <div class="tabel-main">
          <div class="table-main-list">
            <div v-if="orderDetail.gatheringDetail.length > 0" class="table-main-list-item" v-for="(item, index) of orderDetail.gatheringDetail" :key="index">
              <span>{{ item.pay_type_name }}</span>
              <span>￥{{ item.pay_money }}</span>
            </div>
            <div v-if="orderDetail.gatheringDetail.length < 1" class="table-main-list-item">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="table-main-all">
            <span>￥{{ orderDetail.discountMoney }}</span>
          </div>
        </div>
      </div>
      <p class="footer-text" style="margin-bottom: 20rpx;">本次应收金额：<span class="footer-price">￥{{ orderDetail.discountMoney }}</span></p>
      <p v-if="value.onlineMoneyTotal != null" class="footer-text" style="margin-bottom: 20rpx;">线上金额：<span class="footer-price">￥{{ value.onlineMoneyTotal }}</span></p>
      <p v-if="orderDetail.cardTicketMoney != null" class="footer-text" style="margin-bottom: 20rpx;">优惠券：<span class="footer-price">￥{{ orderDetail.cardTicketMoney }}</span></p>
      <p class="footer-text">欠款金额：<span class="footer-price">￥{{ orderDetail.arrearsMoney }}</span></p>
    </div>
    <div class="order-btn">
      <span @click.stop="confirm(value.chargeRecordId)">{{ isShow ? '确认' : '已确认' }}</span>
    </div>
  </div>
</template>

<script>
import Bus from '../utils/event-bus.js'
export default {
  data () {
    return {
      value: {},
      orderDetail: {},
      isShow: true
    }
  },
  onShow () {
    this.isShow = true
    if (this.$route.query.data) {
      this.value = JSON.parse(this.$route.query.data)
      if (this.value.confirmedTime) {
        this.isShow = false
      }
    }
    this.queryOrderDetail()
  },
  methods: {
    confirm (id) {
      if (!this.isShow) {
        return
      }
      this.$http.post(`${this.$store.state.httpUrl}/his/chargeRecord/saveConfirm`, {
        id: id
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.isShow = false
          Bus.$emit('confirmSuccess', this.$route.query.index)
        }
      })
    },
    queryOrderDetail () { // 请求订单详情
      this.$http.post(`${this.$store.state.httpUrl}/his/chargeRecord/selectDetailByChargeId`, {
        OrderId: this.value.id,
        customerId: this.value.customerId
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          for (let i = 0, j = res.data.length; i < j; i++) {
            res.data[i].gatheringDetail = JSON.parse(res.data[i].gatheringDetail)
          }
          this.orderDetail = res.data[0]
        }
      })
    }
  }
}
</script>

<style scoped>
.cashier-detail {
  min-height: 100%;
  background: #F5F5F5;
  box-sizing: border-box;
  padding-bottom: 25rpx;
}
.cashier-header {
  width: 100%;
  text-align: center;
  font-size: 30rpx;
  color: #000000;
  font-weight: 600;
  padding: 40rpx 0 69rpx 0;
  background: transparent;
  box-sizing: border-box;
}
.cashier-header > img {
  width: 103rpx;
  height: 103rpx;
  margin-bottom: 30rpx;
}
.order-price {
  color: #FF4691;
}
.cashier-main {
  font-size: 26rpx;
  color: #333;
  background: #FCEEF5;
  width: 100%;
  padding: 29rpx 144rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.order-content-title {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 29rpx;
}
.order-content-header-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 19rpx;
}
.order-content {
  border-top: 1rpx solid #CCCCCC;
  padding: 39rpx 0;
  font-weight: 600;
}
.order-content p > span:first-child {
  width: 135rpx;
  display: inline-block;
  text-align: right;
}
.order-product-infos {
  display: flex;
  align-items: center;
  margin-top: 19rpx;
}
.order-product-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-detail {
  width: 100%;
  box-sizing: border-box;
  padding: 37rpx 81rpx 37rpx 77rpx;
  background: #fff;
  font-size: 26rpx;
  color: #333;
}
.order-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}


.order-btn {
  text-align: center;
}
.order-btn > span {
  font-size: 32rpx;
  color: #fff;
  width: 320rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background: #FF4691;
  margin-top: 20rpx;
  display: inline-block;
}

.order-detail-table {
  width: 100%;
  box-sizing: border-box;
  /* border: 1rpx solid #000; */
  font-size: 26rpx;
  color: #333;
  margin-bottom: 39rpx;
  border-left: 1rpx solid rgba(51,51,51,1);
  border-top: 1rpx solid rgba(51,51,51,1);
}
.tabel-header {
  width: 100%;
  height: 65rpx;
  line-height: 65rpx;
  box-sizing: border-box;
  display: flex;
}
.tabel-header > span {
  flex: 1;
  text-align: center;
  font-weight: 600;
  background: #DCDCDC;
}
.tabel-main {
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.table-main-list {
  flex: 2;
}
.table-main-list-item {
  display: flex;
}
.table-main-list-item > span {
  flex: 1;
}
.table-main-all {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-main-all > span {
  text-align: center;
}
.table-main-list span {
  height: 65rpx;
  line-height: 65rpx;
  display: inline-block;
  text-align: center;
}
.footer-text {
  font-size: 26rpx;
  color: #333;
}
.footer-price {
  color: #FF4691;
}
.table-main-list span, .tabel-header span, .table-main-all {
  border-right: 1rpx solid rgba(51,51,51,1);
  border-bottom: 1rpx solid rgba(51,51,51,1);
}
.order-detail div, .order-detail span {
  box-sizing: border-box;
}
.border-style {
  border-top: 1rpx solid #CCCCCC;
  padding-top: 39rpx;
}
</style>
