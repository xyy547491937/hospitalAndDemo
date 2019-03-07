<template>
  <div class="collarRedEnvelope">
    <div class="info-label">
      <div v-if="success" class="get-success">特惠福利  领取成功</div>
      <div v-if="success" class="info-red-envelope">
        <span class="info-red-envelope-price"><span>￥</span>{{ packetAmountNumber }}</span>
        <span class="info-red-envelope-price-info">现金红包</span>
        <span class="info-red-envelope-label">限本店当日使用</span>
      </div>
      <div v-if="isOld" class="info-label-text-new"></div>
      <div v-if="isOver" class="info-label-text-no"></div>
    </div>
    <span @click.stop="goPay" class="pay-btn"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOld: false, // 是否老用户
      isOver: false, // 是否已领完
      success: false, // 领取成功
      packetAmountNumber: 0, // 领取的红包金额
      organId: null, // 红包活动的机构id
      packetId: -1, // 红包id
      activityId: null, // 机构红包活动id
    }
  },
  computed: {
    user(){
      return this.$store.state.userInfo
    }
  },
  onShow () {
    this.initParams()
    this.organId = this.$route.query.organId
    if (this.$route.query.newUser) { // 如果新用户，则去领红包
      this.queryOrginActiveId()
    } else if (this.$route.query.old) {
      this.isOld = true
    }
  },
  methods: {
    initParams () {
      this.isOld = false
      this.isOver = false
      this.success = false
      this.packetAmountNumber = 0
      this.organId = null
      this.packetId = -1
      this.activityId = null
    },
    goPay () { // 去支付页面
      this.$router.replace({
        path: `/pagesMine/scanCodePayment?packetAmount=${this.packetAmountNumber}&organId=${this.organId}&packetId=${this.packetId}`
      })
    },
    collarRedEnvelope() { // 领红包
      this.$http.post('/useScanPacket/insert', {
        activityId: this.activityId,
        organId: this.organId,
        custId: this.user.custId
      }).then(res => {
        console.log(res)
        if (res.code == 1) { // 领取成功
          this.packetId = res.data
          this.queryPacketAmount(res.data)
        } else { // 领取失败
          this.isOver = true
        }
      })
    },
    queryPacketAmount(packetId) { // 查询已领红包的金额
      this.$http.post('/useScanPacket/queryOneByPk', {
        id: packetId
      }).then(res => {
        if (res.code == 1) {
          this.packetAmountNumber = res.data.packetAmount
          this.success = true
        }
      })
    },
    queryOrginActiveId() {
      this.$http.post('/underScanPacket/queryOneByOrganId', {
        organId: this.organId
      }).then(res => {
        if (res.code == 1) {
          console.log(res.data)
          this.activityId = res.data.id
          this.collarRedEnvelope()
        } else {
          this.isOver = true
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
.collarRedEnvelope {
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope.png');
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
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope_pay_btn.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.info-label {
  width: 577rpx;
  height: 27%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
}
.info-red-envelope {
  text-align: center;
  background-color: #332C56;
  width: 315rpx;
  height: 228rpx;
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope_quan.png');
  background-size: 113rpx 113rpx;
  background-position: -20rpx -20rpx;
  background-repeat: no-repeat;
  > span {
    display: block;
    margin-bottom: 20rpx;
  }
}
.info-red-envelope-price {
  font-size: 80rpx;
  color: #fff;
  font-weight: bold;
  height: 81rpx;
  line-height: 77rpx;
  > span {
    font-size: 35rpx;
    position: relative;
    top: -35rpx;
  }
}
.info-red-envelope-price-info {
  font-size: 34rpx;
  height: 34rpx;
  line-height: 55rpx;
  font-weight: bold;
  color: #FDB8CB;
}
.info-red-envelope-label {
  font-size: 19rpx;
  height: 19rpx;
  line-height: 55rpx;
  font-weight: bold;
  color: #fff;
}
.get-success {
  font-size: 30rpx;
  font-weight: bold;
  text-align: center;
  color: #fff;
  width: 467rpx;
  height: 64rpx;
  line-height: 64rpx;
  box-sizing: border-box;
  background-image: url('http://img.meiduduo.com/images/mine/collar_red_envelope_label.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: -20rpx;
  left: 50%;
  transform: translateX(-50%);
}
.info-label-text-new {
  width: 428rpx;
  height: 191rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background-image: url('http://img.meiduduo.com/images/mine/new_user_get.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.info-label-text-no {
  width: 428rpx;
  height: 191rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background-image: url('http://img.meiduduo.com/images/mine/red_envelope_no.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
