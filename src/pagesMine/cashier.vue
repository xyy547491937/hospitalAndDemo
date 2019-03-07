<template>
 <div class="cashier">
  <div class="cashier-main" v-if="list.length > 0">
    <cashier-card :data="item" :index="index" v-for="(item, index) of list" :key="index"></cashier-card>
  </div>
  <div id="nolist" v-if="list.length < 1">
    <div class="noData-mode"
      :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
  </div>
  <div v-if="isOver && list.length > 0">
    <load-over></load-over>
  </div>
 </div>
</template>

<script>
import cashierCard from './comm/cashierCard'
import loadOver from '../pages/comm/loadOver'
import Bus from '../utils/event-bus.js'
 export default {
  data () {
    return {
      loaded: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        chargeStatus: 'Y',
        customerPeopleId: this.$store.state.userInfo.peopleId
      },
      list: [],
      isOver: false
    }
  },
  components: {
    'cashier-card': cashierCard,
    'load-over': loadOver
  },
  mounted () {
    this.loaded = false
    this.init()
    this.queryList()
  },
  created () {
    Bus.$on('confirmSuccess', this.confirmSuccess)
  },
  // onShow () {
  //   console.log('onShow')
  //   this.queryList()
  // },
  onPullDownRefresh () { // 下拉刷新
    this.initRefresh()
    this.queryList()
  },
  onReachBottom () { // 触底加载
    this.isOver = false
    this.queryList()
  },
  methods: {
    queryList () {
      if (this.isOver) {
        return
      }
      // wx.showLoading({
      //   title: '加载中'
      // })
      this.$http.post(`${this.$store.state.httpUrl}/his/chargeRecord/getCustomerList`, this.params).then(res => {
        // wx.hideLoading()
        if (res.code === 1) {
          if (this.params.pageNum == 1) {
            this.list = []
            this.list = res.data.data
          } else {
            this.list = this.list.concat(res.data.data)
          }
          this.loaded=true
          if (res.data.data.length < this.params.pageSize || this.params.pageNum >= res.data.pages) {
            this.isOver = true
          } else {
            this.params.pageNum++
          }
        }
      })
    },
    init () {
      this.list = []
      this.params = {
        pageNum: 1,
        pageSize: 10,
        chargeStatus: 'Y',
        customerPeopleId: this.$store.state.userInfo.peopleId
      }
      this.isOver = false
    },
    initRefresh () {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        chargeStatus: 'Y',
        customerPeopleId: this.$store.state.userInfo.peopleId
      }
      this.isOver = false
    },
    confirmSuccess (val) {
      this.list[val].confirmedTime = new Date().toISOString()
    }
  }
}
</script>

<style>
.cashier {
  display: flex;
  -webkit-display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding-bottom: 20rpx;
  box-sizing: border-box;
}
.cashier-main > div {
  margin-top: 20rpx;
}
</style>
