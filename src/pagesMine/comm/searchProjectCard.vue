<template>
  <div @click.stop="jumpProject" class="search-priject-card">
    <img v-if="data.commImg" :src="data.commImg[0]" alt="" srcset="">
    <div>
      <span class="title z-lines-2-overflow-hidden">[{{ data.commName }}]{{ data.remark }}</span>
      <span class="address" style>{{ data.organName }}</span>
      <span>
        <span class="pay-price">￥{{ data.rulePrice }}</span>
        <span style="text-decoration:line-through;">￥{{ data.price }}</span>
      </span>
      <div class="info-box">
        <div class="infos">
          <!-- <span v-if="data.distance" class="info-distance">{{ data.distance }}m</span> -->
          <span v-if="data.isStage == 1" class="info-branch">分</span>
          <span v-if="data.isInsurance == 1" class="info-insurance">保</span>
        </div>
        <!-- <span>{{ data.buyNum }}人购买</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    jumpProject () {
      this.$emit('jumpProject', this.data.id)
    }
  }
}
</script>

<style scoped>
.search-priject-card {
  width: 100%;
  box-sizing: border-box;
  padding: 29rpx 30rpx 30rpx 30rpx;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-bottom: 20rpx;
}
.search-priject-card:last-child {
  margin-bottom: 0;
}
.search-priject-card > img {
  width: 180rpx;
  height: 180rpx;
  border-radius: 5rpx;
  margin-right: 25rpx;
}
.search-priject-card > div {
  flex: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999999;
  padding-left:10rpx;
}
.address{
  line-height:40rpx;
  height:40rpx;
}
.title {
  color: #333333;
  font-size: 26rpx;
}
.pay-price {
  color: #FC4396;
  font-size: 30rpx;
  margin-right: 14rpx;
}
.infos {
  color: #fff;
}
.infos > span {
  padding: 3rpx 6rpx 4rpx 6rpx;
  border-radius: 5rpx;
  margin-right: 9rpx;
}
.info-distance {
  background: #D29DFF;
}
.info-branch {
  background: #FA97E6;
}
.info-insurance {
  background: #74DEC4;
}
.info-box {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
</style>
