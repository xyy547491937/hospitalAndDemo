<template>
  <div class="my-recommendation">
    <div class="my-recommendation-list">
      <div class="list-item" v-for="(item, index) of list" :key="index">
        <img :src="item.icon" alt="">
        <span class="list-item-user">{{ item.nickName }}</span>
        <span class="price-color list-item-price">{{ item.recommendedFee ? item.recommendedFee : 0 }}代言费</span>
      </div>
    </div>
    <div id="nolist" v-if="list.length < 1" >
      <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false,
      list: []
    }
  },
  onShow () {
    this.loaded = false
    this.getList()
  },
  methods: {
    getList () {
      // wx.showLoading({
      //   title: '加载中...'
      // })
      this.$http.post('customer/getSharePersonInfoById', {
        id: this.$store.state.userInfo.custId
      }).then(res => {
        // wx.hideLoading()
        if (res.code == 1) {
          this.list = res.data
          this.loaded = true
        }
      })
    }
  }
}
</script>

<style scoped>
.my-recommendation {
  min-height: 100%;
  background: #FCFBFB;
  font-size: 26rpx;
  color: #333;
  padding-top: 38rpx;
  box-sizing: border-box;
}
.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 69rpx 0 79rpx;
}
.list-item > img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin-right: 12rpx;
}
.price-color {
  color: #FF5F6D;
}
.list-item-user {
  flex: 1;
}
</style>
