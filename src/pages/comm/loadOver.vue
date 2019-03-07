<template>
  <div :class="classs" class="load-over">
    <span>— 没有更多了哦 —</span>
  </div>
</template>

<script>
export default {
  props: ['classs'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.load-over {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  color: #999999;
  font-size: 24rpx;
  padding: 30rpx;
  background: #f5f5f5;
}
</style>
