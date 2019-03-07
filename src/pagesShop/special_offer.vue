<template>
  <div v-if="hotList.length > 0" class="special_offer">
    <div v-for="(item, index) of hotList" :key="index" class="offer">
      <hotCard :data="item"></hotCard>
    </div>
    <div id="nolist"  v-if="hotList.length < 1">
    <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
  </div>
</template>

<script>
import hotCard from './comm/hot_card'
export default {
  components: {
    hotCard
  },
  data () {
    return {
      loaded: false,
      hotList: []
    }
  },
  onShow () {
    this.loaded = false
    this.getDocterHot()
  },
  onUnload () {
    this.hotList = []
  },
  methods: {
    getDocterHot () {
      let params = {
        pageNum: 1,
        pageSize: this.$route.query.total || 15
      }
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id
      }
      this.$http.post('commodity/commodityList', params).then(res => {
        if (res.code === 1) {
          this.hotList = res.data.data
          this.loaded = true
        }
      })
    }
  }
}
</script>

<style scoped>
.special_offer {
  background: #f1f1f1;
  min-height: 100vh;
}
.offer {
  background: #fff;
  margin-bottom: 17rpx;
}
</style>
