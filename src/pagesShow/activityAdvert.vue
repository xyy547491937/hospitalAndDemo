<template>
  <div class="advert">
    <img
      v-for="(v,i) in 10"
      :key="i"
      :src="'http://img.meiduduo.com/images/xyy/adv_'+ (i+1) +'.png'"
      mode="widthFix"
      style="float:left"
    >
  </div>
</template>
<script>
export default {
  onLoad() {
    wx.showShareMenu();
  }
};
</script>
<style lang="less">
img {
  width: 100%;
}
</style>
