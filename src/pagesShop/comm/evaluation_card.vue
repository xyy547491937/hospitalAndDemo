<template>
  <div class="eva">
    <img class="eva_icon" src="http://img.meiduduo.com/images/shop/pt.png" alt="">
    <div class="eva_main">
      <div class="eva_user">
        <span>用户名</span>
        <span>
          <i-icon v-if="false" type="praise" size="18" />
          <i-icon v-else type="praise_fill" color="#FF4691" size="18" />
          <span>11</span>
        </span>
      </div>
      <div class="eva_content">
        内容
      </div>
      <div class="eva_info">
        review info
      </div>
      <div v-if="true" class="eva_images" :class="{ 'eva_images_all': imgs.length == 3 ? true : false }">
        <img v-for="(item, index) of imgs" :key="index" class="eva_images_item" :src="item">
      </div>
      <div class="eva_reply">
        <span>机构回复：</span>
        <span>谢谢您的好评！</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evaluationCard',
  data () {
    return {
      imgs: [
        'http://img.meiduduo.com/images/shop/pt.png',
        'http://img.meiduduo.com/images/shop/pt.png',
        'http://img.meiduduo.com/images/shop/pt.png'
      ]
    }
  }
}
</script>

<style scoped>
.eva {
  padding: 47rpx 35rpx 37rpx 29rpx;
  box-sizing: border-box;
  display: flex;
}
.eva_icon {
  display: block;
  width: 66rpx;
  height: 66rpx;
  border-radius: 100%;
  margin-right: 18rpx;
}
.eva_main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.eva_user {
  font-size: 26rpx;
  color: #3F6BA6;
  margin-bottom: 34rpx;
  display: flex;
}
.eva_user span:first-child {
  flex: 1;
}
.eva_user span:last-child {
  display: flex;
  align-items: center;
  justify-content: center;
}
.eva_content {
  margin-bottom: 19rpx;
  font-size: 24rpx;
  color: #333333;
}
.eva_info {
  font-size: 22rpx;
  color: #999;
}
.eva_images {
  display: flex;
  margin: 22rpx 0 24rpx 0;
}
.eva_images_item {
  display: block;
  width: 186rpx;
  height: 186rpx;
  border-radius: 8rpx;
}
.eva_reply {
  background: #F1F1F1;
  padding: 22rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #666666;
  display: flex;
  flex-direction: column;
}
.eva_reply > span:first-child {
  margin-bottom: 17rpx;
}
.eva_images_all {
  justify-content: space-between;
}
</style>
