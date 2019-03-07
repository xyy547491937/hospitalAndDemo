<template>
	<div class="banner">
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
			<block v-for="(item, index) in imgsrc" :index="index" :key="index">
				<swiper-item>
					<image :src="item" class="slide-image" mode="widthFix" />
				</swiper-item>
			</block>
		</swiper>
    <div class="back_home" v-if="reciveTaskid" @click.stop="jump">
      <img src="/static/images/tab1.png" mode="aspectFit">
    </div>
      <!-- <span class="re-left" v-if="reciveTaskid" @click="jump"><i-icon type="return" size="25"/></span> -->
	</div>
</template>

<script>
export default {
  props: {
    imgsrc: {
      type: Array,
      default: [
        "http://img.meiduduo.com/images/index/ad_02.png",
        "http://img.meiduduo.com/images/index/ad_02.png",
        "http://img.meiduduo.com/images/index/ad_02.png"
      ]
    },
    reciveTaskid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  onShow() {},
  mounted() {},
  methods: {
    jump() {
      this.$router.push({ path: "/pages/index", query: {}, isTab: true });
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 7.5rem;
}
.slide-image {
  width: 100%;
  height: 180px;
}
.banner {
  position: relative;
}
.re-left {
  position: absolute;
  top: 0;
  left: 0;
}
.back_home {
  position: fixed;
  top: 5rpx;
  left: 20rpx;
  background-color: rgba(241,241,241,.5);
  z-index: 999;
  padding: 10rpx;
  border-radius: 100%;
  height: 60rpx;
  width: 60rpx;
  box-sizing: border-box;
}
.back_home > img {
  width: 40rpx;
  height: 40rpx;
  border-radius: 100%;
}
</style>
