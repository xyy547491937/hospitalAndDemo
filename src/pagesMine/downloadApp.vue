<template>
  <div class="box">
    <img
      v-for="(v,i) in 20"
      :key="i"
      :src="'http://img.meiduduo.com/images/mineItem/install-'+ (i+1)+'.png'"
      mode="widthFix"
      style="float:left"
      alt
    >
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  img {
    width: 100%;
  }
}
</style>
