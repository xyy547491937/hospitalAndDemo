<template>
  <div class="search-doctor-card" @click="jump(data)">
    <img :src="data.icon" alt="">
    <div>
      <span style="fotn-size: 28rpx;color: #333333;">{{ data.personalName }}</span>
      <span>{{ data.organName }}</span>
      <span>{{ data.areaName }}</span>
    </div>
    <!-- <span><i-icon :size="20" color="#FF4691" type="add" /> 关注</span> -->
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
    jump (item) {
      this.changeJump("/pagesShop/doctor_detail", { id: item.id });
    }
  }
}
</script>

<style scoped>
.search-doctor-card {
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx 0;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1rpx solid #F1F1F1;
}
.search-doctor-card > img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 100%;
  margin-right: 31rpx;
}
.search-doctor-card > div {
  flex: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  font-size: 24rpx;
  color: #999999;
  line-height:40rpx;
}
.search-doctor-card > span {
  width: 110rpx;
  height: 40rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  margin-left: 31rpx;
  color: #FF4691;
  font-size: 22rpx;
  display: inline-flex;
  display: -webkit-inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  border: 1rpx solid #FF4691;
}
.search-doctor-card:last-child {
  border-bottom: 0;
}
</style>
