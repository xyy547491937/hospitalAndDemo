<template>
  <div class="about">
    <img src="http://img.meiduduo.com/images/mine/mineLogo.png" alt="">
    <span class="about-content z-textIndent-7-percent">
      <span>胚豆</span>
      <span>，国内著名医美行业移动互联网平台。在此平台上，您可以看到专业的整形百科知识，可以直接与医生私信问答，可以在线预约美容项目、整形等相关服务。还可以看到来自全国各地的爱美人士的变美分享日记......</span>
    </span>
    <span class="about-info">
      <span>欢迎爱美的亲们来到这里，</span><br />
      <span>绽放你的美！</span>
    </span>
    <span class="about-line">技术支持: 石家庄德尚网络技术开发有限公司</span>

    <!-- <web-view src="https://t.bestsign.info/9u8U/cB23/NBrF/"></web-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.about {
  height: 100%;
  box-sizing: border-box;
  border-top: 18rpx solid #f1f1f1;
  text-align: center;
  position: relative;
  background: #fff;
}
.about > img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100%;
  margin-top: 55rpx;
  margin-bottom: 77rpx;
}
.about-content {
  font-size: 28rpx;
  color: #999999;
  width: 587rpx;
  display: inline-block;
  text-align: justify;
  margin-bottom: 150rpx;
  line-height: 72rpx;
}
.about-content > span:first-child {
  color: #ff4691;
}
.about-info {
  color: #ff4691;
  width: 435rpx;
  display: inline-block;
  margin-bottom: 150rpx;
  line-height: 72rpx;
}
.about-info > span:first-child {
  font-size: 36rpx;
}
.about-info > span:last-child {
  font-size: 48rpx;
}
.about-line {
  font-size: 24rpx;
  color: #999999;
  width: 100%;
  display: inline-block;
  position: absolute;
  bottom: 48rpx;
  left: 0;
}
</style>
