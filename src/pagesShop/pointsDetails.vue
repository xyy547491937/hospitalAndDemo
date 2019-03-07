<template>
  <div class="points-details">
    <div class="points-header">
      <div class="points-header-user">
        <img :src="userInfo.icon" alt="">
        <span>{{ userInfo.nickName }}</span>
      </div>
      <span class="points-number">{{ userInfo.point }}</span>
      <span class="points-label">我的胚豆</span>
    </div>
    <div class="tabs-box">
      <i-tabs :current="current" @change="handleChange" color="#FF4691">
        <i-tab key="tab1" title="收入"></i-tab>
        <i-tab key="tab2" title="支出"></i-tab>
      </i-tabs>
    </div>
    <div class="list-boxs">
      <!-- <div v-if="list.length > 0" class="list-item" v-for="(item, index) of list" :key="index">
        <div class="list-item-label">
          <span v-if="item.detailName">{{ item.detailName }}</span>
          <span v-else-if="item.pointType == 1">{{ typeOfExpenditure[item.pointType] }}</span>
          <span>{{ item.createDate }}</span>
        </div>
        <span>{{ item.isAdd ? '+' : '-' }} {{ item.pointValue }}</span>
      </div> -->
      <div class="noData no-date" :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''">
      </div>
    </div>
  </div>
</template>

<script>
import LoadOver from '../pages/comm/loadOver'
export default {
  data () {
    return {
      loaded: false,
      current: 'tab1',
      params: {
        pageNum: 1,
        pageSize: 15,
        isAdd: 1,
        custId: this.$store.state.userInfo.custId
      },
      list: [],
      isOver: false,
      userInfo: {},
      typeOfExpenditure: ['', '兑换扣减']
    }
  },
  components: {
    'load-over': LoadOver
  },
  onShow () {
    this.loaded = false
    console.log('onShow')
    this.queryUserInfo()
    this.queryList()
  },
  mounted () {
    console.log('mounted')
  },
  onReachBottom () {
    this.queryList()
  },
  methods: {
    handleChange (event) { // 切换tab的处理
      this.current = event.target.key
      if (this.current == 'tab1') {
        this.params.isAdd = 1
      } else if (this.current == 'tab2') {
        this.params.isAdd = 0
      }
      this.initQuery()
      this.queryList()
    },
    queryList () { // 请求数据列表
      if (this.isOver) {
        return
      }
      this.$http.post('customerPointRecord/list4Page', this.params).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.loaded = true
          this.list = this.list.concat(res.data.data)
          if (this.params.pageNum >= res.data.pages || this.params.pageSize > res.data.data.length) {
            this.isOver = true
          } else {
            this.params.pageNum++
          }
        }
      })
    },
    initQuery () { // 初始化请求
      this.list = []
      this.params.pageNum = 1
      this.isOver = false
    },
    queryUserInfo () { // 获取用户信息
      this.$http.post('customer/queryOneByCondition', {
        id: this.$store.state.userInfo.custId
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.userInfo = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.points-details {
  color: #333;
  position: relative;
}
.points-header {
  height: 325rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 28rpx 34rpx 56rpx 34rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  /* background: #f1f1f1; */
  background-image: url('http://img.meiduduo.com/images/jifen/jf_detail_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
.points-header-user > img {
  width: 80rpx;
  height: 80rpx;
  box-sizing: border-box;
  border: 2rpx solid #fff;
  margin-right: 25rpx;
  border-radius: 100%;
}
.points-header-user {
  width: 100%;
  display: flex;
  align-items: center;
}
.points-header-user > span {
  font-size: 28rpx;
}
.points-number {
  font-size: 110rpx;
}
.points-label {
  font-size: 32rpx;
  font-weight: 500;
}
.tabs-box {
  width: 100%;
  box-sizing: border-box;
}
.list-boxs {
  border-top: 427rpx solid #F1F1F1;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 30rpx;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 25rpx;
  margin-bottom: 29rpx;
  border-bottom: 1rpx solid #F5F5F5;
}
.list-item-label {
  display: flex;
  flex-direction: column;
}
.list-item-label > span:first-child {
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
.list-item-label > span:last-child {
  font-size: 18rpx;
  color: #999999;
}
.list-item > span {
  font-size: 30rpx;
  font-weight: 600;
  color: #FF4691;
}
.points-header, .tabs-box {
  position: fixed;
}
.tabs-box {
  top: 325rpx;
}
.no-date {
  background-size: 160rpx 200rpx;
}
</style>
