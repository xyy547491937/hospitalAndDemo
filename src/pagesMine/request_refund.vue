<template>
  <div class="request_refund">
    <i-panel title="退款原因">
        <i-radio-group :current="current" @change="handleFruitChange">
            <i-radio v-for="item of fruit" position="right" :key="item.id" :value="item.name"></i-radio>
        </i-radio-group>
    </i-panel>
    <i-panel v-if="current == '个人原因'" title="选择具体退款原因">
        <i-radio-group :current="ressonDetail" @change="handleFruitChange1">
            <i-radio v-if="item.resonType == 1" v-for="item of reason" position="right" :key="item.id" :value="item.reson"></i-radio>
        </i-radio-group>
    </i-panel>
    <i-panel v-if="current == '医院原因'" title="选择具体退款原因">
        <i-radio-group :current="ressonDetail" @change="handleFruitChange1">
            <i-radio v-if="item.resonType == 0" v-for="item of reason" position="right" :key="item.id" :value="item.reson"></i-radio>
        </i-radio-group>
    </i-panel>
    <p class="footer_info">
      <span>退款说明：</span>
      <span>退款申请提交后，支付的款项将原路退回</span>
    </p>
    <button @click="apply" class="footer_btn">申请退款</button>
  </div>
</template>

<script>
export default {
  name: 'requestRefund',
  data () {
    return {
      current: null,
      fruit: [
        {
            id: 1,
            name: '个人原因',
        },
        {
            id: 0,
            name: '医院原因'
        }
      ],
      reason: [], // 退款原因
      ressonDetail: null, // 具体退款原因
      data: {}, // 申请退款的订单数据
      selectId: null, // 选择的退款原因id
    }
  },
  onLoad () {
    this.queryReason()
  },
  onShow () {
    // this.data = this.$route.query.data

  },
  mounted () {

  },
  onUnload () {
    this.current = null
    this.reason = []
    this.ressonDetail = null
    this.data = {}
    this.selectId = null
  },
  methods: {
    queryReason () {
      let self = this
      this.$http.post('returnReson/listByCondition', {}).then(res => {
        this.dealData(res)
      })
    },
    handleFruitChange (val) {
      this.ressonDetail = null
      this.selectId = null
      this.current = val.target.value
    },
    handleFruitChange1 (val) {
      this.ressonDetail = val.target.value
      let a = this.reason
      for (let i = 0, j = a.length; i < j; i++) {
        if (a[i].reson == this.ressonDetail) {
          this.selectId = a[i].id
        }
      }
    },
    dealData (res) {
      if (res.code == 1) {
        this.reason = res.data
      }
    },
    apply () { // 申请退款
      this.$http.post('resonRecord/save', {
        resonId: this.ressonDetail,
        orderNo: this.$route.query.orderNo,
        clustId: this.$store.state.userInfo.custId,
        orderId: this.$route.query.orderId,
        orderType: this.$route.query.orderType || 2,
      }).then(res => {
        this.dealApply(res)
      })
    },
    dealApply (res) {
      console.log('申请退款成功')
      if (res.code === 1) {
        this.$http.post('order/updateCheckStatu', {
          payOrderId: this.$route.query.orderId,
          organId: this.$store.state.organId || this.$route.query.organId,
          orderNo: this.$route.query.orderNo,
          osId: '9',
          customId: this.$store.state.userInfo.custId,
          checkState: '1'
        }).then(res => {})
        wx.showToast({
          title: '申请退款成功'
        })
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
.footer_info {
  background: #F1F1F1;
  color: #666;
  font-size: 24rpx;
  display: flex;
  flex-direction: column;
  padding: 31rpx;
}
.footer_btn {
  background: #FF4691;
  font-size: 32rpx;
  color: #fff;
  height: 80rpx;
  width: 600rpx;
  border-radius: 40rpx;
  margin: 0 auto;
  margin-top: 60rpx;
  margin-bottom: 30rpx;
}
</style>
