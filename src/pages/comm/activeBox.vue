<style>
.activeBox {
  background: #fff;
  padding: 36rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.activeBox .item {
  width: 20%;
  text-align: center;
}
.activeBox .item img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
/**/
/* .activeBox .item  .pinimg{
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.activeBox .item  .daiyan{
    box-shadow: 0 5rpx 5rpx #FB7EEF;
}
.activeBox .item  .peidou{
    box-shadow: 0 5rpx 5rpx #C27CFF;
}
.activeBox .item  .yiye{
    box-shadow: 0 5rpx 5rpx #6F9CF5;
} */
.activeBox .title {
  color: #333;
  font-size: 28rpx;
  margin-top: 8rpx;
}
</style>
<template>
  <div>
    <div class="activeBox">
      <!-- 全民领钱 -->
      <div @click.stop="go('/pagesMine/allPeopleGetMoney')" class="item">
        <img class="pinimg" src="http://img.meiduduo.com/images/index/nav_getMoney.png" alt>
        <div class="title">全民领钱</div>
      </div>
      <div @click.stop="go('/pagesShop/pin/fight_group')" class="item">
        <img class="pinimg" src="http://img.meiduduo.com/images/index/nav_pintuan.png" alt>
        <div class="title">拼团</div>
      </div>
      <div class="item">
        <img
          class="daiyan"
          @click.stop="go('/pagesMine/sharingByAll')"
          src="http://img.meiduduo.com/images/index/nav_daiyan.png"
          alt
        >
        <div class="title">我要代言</div>
      </div>
      <div class="item">
        <img
          class="peidou"
          @click.stop="go('/pagesShop/pointsMall')"
          src="http://img.meiduduo.com/images/index/nav_peidou.png"
          alt
        >
        <div class="title">积分商城</div>
      </div>
      <div class="item" @click="go('/pagesShop/alliance/alliance')">
        <img class="yiye" src="http://img.meiduduo.com/images/index/nav_yiye.png" alt>
        <div class="title">商家联盟</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toYiYe() {
      this.$router.push({
        path: "/pagesShop/historyVouchers"
      });
    },
    go(routerValue) {
      this.$router.push({
        path: routerValue
      });
    }
  }
};
</script>
