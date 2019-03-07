<template>
  <div @click="jump" class="commodity">
    <img class="commodity_img" :src="data.commImg[0]" alt="">
    <div class="commodity_main">
      <div class="title_box z-lines-2-overflow-hidden">
        <span class="commodity_title">[{{ data.commName }}]</span>
        <span class="commodity_content">{{ data.remark }}</span>
      </div>
      <!-- <div class="content_box z-lines-2-overflow-hidden">
        <span class="commodity_content">{{ data.remark }}</span>
      </div> -->
      <span class="commodity_rule_price"><span class="commodity_rule_label">￥</span>{{ data.rulePrice }}</span>
      <div class="commodity_info">
        <!-- <span>￥{{ data.rulePrice }}</span> -->
        <span style="text-decoration:line-through;">￥{{ data.price }}</span>
        <span>{{ data.buyNum }}人购买</span>
      </div>
      <div class="commodity-organ-style z-lines-1-overflow-hidden" v-if="shop">{{ data.organName }}</div>
      <div class="commodity_footer">
        <div v-if="share" class="commodity_dot">
          <span style="background: #D29DFF;">分享赚{{ data.endorsementFee }}代言费</span>
        </div>
        <div v-else class="commodity_dot">
          <span v-if="data.distance" style="background: #D29DFF;">{{ data.distance }}km</span>
          <span v-if="data.isStage" class="commodity-footer-item" style="background: #FA97E6;">分</span>
          <span v-if="data.isInsurance" class="commodity-footer-item" style="background: #74DEC4;">保</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'share', 'shop'],
  data () {
    return {

    }
  },
  methods: {
    jump () {
      this.$emit('jump', this.data.id)
    },
  }
}
</script>

<style scoped>
.commodity {
  /* break-inside: avoid; */
  width: 334rpx;
  box-sizing: border-box;
  /* margin: 20rpx; */
  margin-bottom: 20rpx;
  /* margin-left: 10rpx; */
}
.commodity_img {
  display: block;
  width: 334rpx;
  height: 350rpx;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.commodity_main {
  padding: 20rpx 17rpx;
  background: #fff;
  border-radius: 0 0 8rpx 8rpx;
}
.commodity_title {
  font-size: 28rpx;
  height: 40rpx;
  line-height: 40rpx;
  font-weight: 700;
  color: #333333;
}
.commodity_content {
  font-size: 28rpx;
  color: #666666;
  height: 40rpx;
  line-height: 40rpx;
}
.commodity_info {
  font-size: 24rpx;
  color: #999999;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10rpx;
}
.commodity_info span:first-child {
  font-size: 24rpx;
  color: #999999;
  margin-right: 14rpx;
}
.commodity_info span:last-child {
  flex: 1;
  text-align: right;
}
.commodity_footer {
  display: flex;
  /* justify-content: space-between; */
  font-size: 22rpx;
  color: #fff;
}
.commodity_dot > span {
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 4rpx;
  margin-right: 8rpx;
}
.commodity_dot > span:first-child {
  padding: 0 11rpx;
}
.commodity_dot > span:last-child {
  margin-right: 0;
}
.commodity_footer > img {
  display: block;
  width: 72rpx;
  height: 32rpx;
}
.content_box {
  font-size: 24rpx;
  color: #666666;
}
.title_box {
  font-weight: 400;
  font-size: 28rpx;
  color: #333333;
}
span.commodity-footer-item {
  /* width: 60rpx; */
  padding: 0 5rpx;
  text-align: center;
}
.commodity_rule_price {
  color: #FF4691;
  font-size: 32rpx;
  font-weight: 600;
}
.commodity_rule_label {
  font-size: 24rpx;
  font-weight: 400;
}
.commodity-organ-style {
  font-size: 24rpx;
  color: #999999;
}
</style>
