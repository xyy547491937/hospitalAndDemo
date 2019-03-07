<template>
    <!-- 优惠券界面 -->
    <!-- xyy editor -->
    <div class="sales flex-r" >
        <ul class="sales-list" v-if="couponList.length>0">
            <li class="flex-r" v-for="v in couponList" :key="v"> <span class="MY-v"></span>   <span class="MY-title xyy-ellipsis-1">购买后可赠送价值{{v.reductionPrice}}元{{v.couponName}}</span> </li>
        </ul>
        <div class="sales-icon flex-r" v-if="isShow">
            <i-icon type="enter" />
        </div>
    </div>
</template>
<script>
export default {
  props: {
    //enter 是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    couponList: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../css/style.less");
.sales {
  font-size: 12px;
  width: 100%;
  & > .sales-list {
    width: 90%;
    & > li {
      margin-bottom: 10px;
      & .MY-v {
        width: 48px;
        height: 15px;
        display: block;
        background-image: url("http://img.meiduduo.com/images/xyy/coupon.png");
        background-repeat: no-repeat;
        background-size: contain;
      }
      & .MY-title {
        display: block;
        color: #666;
        margin-left: 10px;
        width: 70%;
      }
    }
  }
  & > .sales-icon {
    justify-content: flex-end;
    width: 10%;
  }
}
</style>




