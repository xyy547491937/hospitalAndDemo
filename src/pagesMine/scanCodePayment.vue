<template>
  <div class="scanCodePayment">
    <div class="info-label">
      <p>
        <span>消费金额</span>
        <span class="input-price"><input v-model="inputNumber" @blur="tapBlur" @confirm="tapDone" />元</span>
      </p>
      <p>
        <span>红包金额</span>
        <span>￥{{ packetAmountNumber }}</span>
      </p>
      <p>
        <span>实际支付</span>
        <span class="pay-price">￥{{ showNumber }}</span>
      </p>
    </div>
    <span @click.stop="goPay" class="pay-btn"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      packetAmountNumber: 0, // 要使用的红包金额
      actualPaymentNumber: 0, // 实际支付金额
      inputNumber: '', // 输入的支付金额
      organId: null, // 机构id
      packetId: null, // 红包id
      paying: false, // 请求支付中
    }
  },
  computed: {
    showNumber() { // 实际支付金额的展示
      if (this.inputNumber) {
        let a = Number(this.inputNumber) - Number(this.packetAmountNumber)
        return a >= 0 ? a.toFixed(2) : 0
      } else {
        return 0
      }
    },
    user(){
      return this.$store.state.userInfo
    }
  },
  onShow() {
    this.packetAmountNumber = this.$route.query.packetAmount
    this.organId = this.$route.query.organId
    this.packetId = this.$route.query.packetId
  },
  methods: {
    goPay() { // 发起微信支付
      if (!this.inputNumber) {
        wx.showModal({
          title: '提示',
          content: '请输入消费金额'
        })
        return
      } else {
        let a = Number(this.inputNumber) - Number(this.packetAmountNumber)
        let price = a >= 0 ? a.toFixed(2) : 0
        if (a == 0) {
          wx.showModal({
            title: '提示',
            content: '实际支付金额必须大于等于0.01元'
          })
        } else {
          this.saveOrder(price)
        }
      }
    },
    saveOrder(price) { // 生成支付订单
      if (this.paying) {
        return
      }
      this.paying = true
      this.$http.post('/payOrder/save', {
        customId: this.user.custId,
        nickName: this.user.nickName,
        payType: 1,
        orderType: 3,
        state: 1,
        payPrice: price
      }).then(res => {
        if (res.code == 1) {
          this.queryPay(res.data)
        } else {
          this.paying = false
        }
      })
    },
    queryPay(id) {
      const _this = this
      let params = {
        id: id,
        useScanPacketId: this.packetId > 0 ? this.packetId : -1, // 红包的id，没有传-1
        organId: this.organId,
        payType: 1,
        orderType: 3,
        // originType: 'small_program',
        isCart: 1
      }
      if (this.user.openid) {
        params.openid = this.user.openid
      }
      this.$http.post('wPay/goPay', params).then(res => {
        this.paying = false
        if (res.code == 1) {
          wx.requestPayment({
            timeStamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: "MD5",
            paySign: res.data.sign,
            success: function(res) {
              _this.$router.replace({ // 支付成功，跳转到机构主页，传机构id
                path: '/pagesShop/orgin',
                query: {
                  id: _this.organId,
                  isActive: 1
                }
              })
            },
            fail: function(res) {
              wx.showToast({
                title: "支付失败",
                image: "http://img.meiduduo.com/images/shop/cancel.png"
              })
            }
          })
        }
      })
    },
    tapDone(event) { // 点击完成按钮触发
      // console.log('点击完成按钮')
      // console.log(event)
      // console.log(event.target)
      // console.log(event.target.value)
    },
    tapBlur(event) { // input失焦触发
      let a = Number(this.inputNumber) - Number(this.packetAmountNumber)
      if (a == 0) {
        wx.showModal({
          title: '提示',
          content: '实际支付金额必须大于等于0.01元'
        })
      }
    }
  },
}
</script>
<style lang="less" scoped>
.scanCodePayment {
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope_pay.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.pay-btn {
  width: 541rpx;
  height: 101rpx;
  display: block;
  position: absolute;
  bottom: 176rpx;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope_wxpay_btn.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.info-label {
  width: 549rpx;
  height: 32%;
  position: absolute;
  top: 26%;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  font-size: 36rpx;
  font-weight: bold;
  color: #332C56;
  padding: 86rpx 66rpx 90rpx 44rpx;
  > p {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    margin-bottom: 40rpx;
    input {
      width: 197rpx;
      height: 65rpx;
      border-radius: 18rpx;
      border: 1rpx solid #959595;
      text-align: right;
      margin-right: 10rpx;
      box-sizing: border-box;
      padding: 0 10rpx;
    }
  }
  > p:last-child {
    margin-bottom: 0;
  }
}
.pay-price {
  font-size: 48rpx;
  font-weight: bold;
}
.input-price {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
</style>
