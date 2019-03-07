<template>
  <div class="exchangeDetail">
    <div style="height:10rpx">
      <img class="topimg" src="http://img.meiduduo.com/images/jifen/duihuan6.png" alt="">
    </div>
    <div class="state" v-if="item.poState==3">
      <img class="timeout" src="http://img.meiduduo.com/images/jifen/duihuan1.png" alt="">
      <div class="out-tip">亲！已经过期了</div>
    </div>
    <div class="state" v-if="item.poState!=3">
      <img class="timeout" src="http://img.meiduduo.com/images/jifen/duihuan3.png" alt="">
      <div  v-if="item.poState==1" class="cont">恭喜您领取成功</div>
      <div v-if="item.poState==2" class="cont">核销成功</div>
    </div>
    <div style="height: 40rpx">
      <img class="midline" src="http://img.meiduduo.com/images/jifen/duihuan4.png" alt="">
    </div>
    <div class="line"></div>
    <div class="code-box">
      <div :class="item.poState==3  ? 'offCode deep': 'offCode'">
        <div class="codeName">您的核销码为</div>
        <div class="code">{{item.exchangeCode}}</div>
        <img v-if="item.poState==3" class="timeout-img" src="http://img.meiduduo.com/images/jifen/duihuan2.png" alt="">
      </div>
    </div>
    <div class="detail">
      <div class="weight">{{item.commName}}</div>
      <div class="weight solid">{{item.organName}}</div>
      <div><span class="weight">有效日期：</span>{{item.newExchangeTime}}至{{item.invalidTime}}</div>
      <div><span class="weight">支付豆芽：</span>{{item.exchangePoint}}</div>
      <div><span class="weight">订单编号：</span>{{item.orderNo}}</div>
      <div><span class="weight">兑换时间：</span>{{item.exchangeTime}}</div>
      <div class="weight attend">注意事项</div>
      <div class="dtip">1、请您截图保存核销码，凭核销码到商家核销</div>
      <div class="dtip">2、请在有效期内到门店核销，过期将不再享受服务</div>
      <div class="dtip">3、不要把核销码泄露，如有泄露本平台将不承担任何责任</div>
      <!-- <div class="dtip">4、如有任何疑问请致电：400-123-8888</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      item: {}
    }
  },
  onShow() {
    this.id = this.$route.query.id
    console.log(this.id)
    this.init(this.id)
  },
  methods: {
    init(id) {
      this.$http.post("/pointOrder/queryOneByPk", {id}).then(res => {
        if (res.code == 1) {
          this.item = res.data
          this.item.newExchangeTime = this.item.exchangeTime.slice(0, 10)
          this.item.invalidTime = this.item.invalidTime.slice(0, 10)
        }
      });
    },
  }
}
</script>

<style scoped>

.exchangeDetail{
  width: 100%;
  height: 100%;
  background: url('http://img.meiduduo.com/images/jifen/duihuan5.png') repeat;
  background-color: #fff;
  padding: 68rpx 20rpx;
  box-sizing: border-box;
  color: #333;
  font-size: 24rpx;
  line-height: 46rpx;
}
.topimg{
  width: 100%;
  height: 10rpx;
  vertical-align: top;
}
.timeout{
  width: 92rpx;
  height: 92rpx;
  margin-bottom:18rpx;
}
.out-tip{
  color: #CCCCCC;
  font-size: 46rpx;
}
.cont{
  font-size: 46rpx;
  color: #FF66A4;
}
.midline{
  width: 100%;
  height: 40rpx;
}
.exchangeDetail .state{
  background: #fff;
  text-align: center;
  padding:49rpx 0 26rpx;
}
.exchangeDetail .code-box{
  padding: 0rpx 50rpx;
  background: #fff;
  overflow:hidden;
}
.attend{
  padding-top:23rpx;
}
.solid{
  border-bottom:1rpx dashed #ccc;
  padding-bottom:10rpx;
  margin-bottom:10rpx;
}
.exchangeDetail .offCode{
  /* width: 560rpx; */
  height: 170rpx;
  background: #F0F0F0;
  text-align: center;
  margin: 40rpx auto;
  position: relative;
}
.exchangeDetail .offCode.deep{
  background: #d1d1d1;
  color: #fff;
}
.timeout-img{
  position: absolute;
  top: -16rpx;
  right: -20rpx;
  width:184rpx;
  height:130rpx;
}
.exchangeDetail .codeName{
  /* color: #666; */
  line-height: 82rpx;
  height: 82rpx;
  width: 100%;
  font-size: 30rpx;
  padding-top:10rpx
}
.exchangeDetail .code{
  /* color: #666; */
  line-height: 54rpx;
  width: 100%;
  font-size: 54rpx;
}
.exchangeDetail .deep .codeName{
  color: #fff;
}
.exchangeDetail .deep .code{
  color: #fff;
}
.detail{
  padding: 0rpx 40rpx 20rpx;
  background: #fff;
  color: #333;
  font-size: 24rpx;
}
.detail .dtip{
  color: #666;
}
.weight{
  font-weight: 600;
}
</style>
