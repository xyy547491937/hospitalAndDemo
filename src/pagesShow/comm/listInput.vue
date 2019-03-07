<template>
    <div class="lo">
      <div class="list flex-r">
          <div class="left-inner"> {{leftInner}}</div>
        <div class="co">
          <!-- <input type="text" placeholder-style="color:#999" placeholder="请输入日记本名称" :value=" inputValue" v-if="isInput">  -->
        <slot></slot>
        <span v-if="isInput" >{{inputValue}}</span>
        </div>
        <div class="cl" v-if="isIcon"> <i-icon type="enter" /></div>
      </div>
      
    </div>
</template>
<script>
export default {
  props: ["leftInner", "isInput", "inputValue", "isIcon"],
  data() {
    return {};
  },
  onShow() {},
  onLoad() {
    this.inputValue = "";
  },
  inheritAttrs: false,
  created() {
    console.log(this.$attrs);
  }
};
</script>
<style lang="less">
@import url("../../css/style.less");
.lo {
  padding: 0 @basePadding;
  background-color: @base-white;
}
.list {
  // padding: 0 @basePadding;
  background-color: @base-white;
  height: 3.38rem/4;
  // justify-content: space-between;
  align-items: center;
  font-size: @baseSize;
  color: @baseTextColor-c;
  border-bottom: 1rpx solid @baseBackground;
  border-top: 1rpx solid @baseBackground;

  & > .left-inner {
    width: 30%;
    text-align: left;
    color: @baseFirstTitleColor;
    font-weight: bold;
  }
  & > .co {
    width: 70%;
    text-align: left;
  }
  & > .cl {
    text-align: right;
    width: 10%;
  }
}
</style>

