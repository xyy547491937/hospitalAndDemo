<template>
  <div class="invite_friends">
    <div v-if="inviteActive == 2 || inviteActive == 3" @click.stop="backHome" class="back_home">
      <img src="/static/images/tab1.png" mode="aspectFit" alt="">
    </div>
    <div class="invite_header">
      <img src="http://img.meiduduo.com/images/shop/tbanner.png" mode="aspectFit" alt="">
      <div>
        <div class="header_content">
          <img v-if="data.commImg" mode="aspectFit" :src="data.commImg[0]" alt="">
          <div class="header_info">
            <div class="content_box">
              <span>[{{ data.commodityName }}]{{ data.remark }}</span>
            </div>
            <span>{{ data.organName }}</span>
            <span>
              <span class="header_price">￥{{ data.groupPrice }}</span>
              <span>单买：￥{{ data.price }}</span>
            </span>
          </div>
        </div>
        <div class="header_main">
          <div>
            <p class="main_title">
              <img mode="aspectFit" class="line" src="http://img.meiduduo.com/images/shop/line_left.png" alt="">
              <span>距结束</span>
              <img mode="aspectFit" class="line line_right" src="http://img.meiduduo.com/images/shop/line_left.png" alt="">
            </p>
            <p v-if="day == '00' && hour == '00' && minute == '00' && second == '00'" class="main_time time_end">
              已结束
            </p>
            <p v-else class="main_time">
              <span class="main_time_text">{{ day }}</span>
              <span class="main_time_dot">天</span>
              <span class="main_time_text">{{ hour }}</span>
              <span class="main_time_dot">:</span>
              <span class="main_time_text">{{ minute }}</span>
              <span class="main_time_dot">:</span>
              <span class="main_time_text">{{ second }}</span>
            </p>
            <p class="main_info">
              <span>{{ data.clusterNo }}</span>人成团，还差<span>{{ data.gapNo }}</span>人
            </p>
            <div class="main_user">
              <img :src="data.icon" alt="">
              <img v-for="(item, index) of data.icons" :key="index" v-if="index < 4" :src="item" alt="">
            </div>
            <button v-if="inviteActive == 1" open-type="share" class="footer_btn">邀请好友参团</button>
            <button v-if="inviteActive == 2" @click="joinP" class="footer_btn">一键参团</button>
            <button v-if="inviteActive == 3" class="footer_btn">组团成功，查看其它拼团</button>
            <div class="main_footer">
              <p>拼团流程</p>
              <i-steps>
                  <i-step>
                      <view slot="title">
                            开团
                      </view>
                      <view slot="content">
                          或者参团
                      </view>
                  </i-step>
                  <i-step>
                      <view slot="title">
                          邀请
                      </view>
                      <view slot="content">
                          好友拼团
                      </view>
                  </i-step>
                  <i-step>
                      <view slot="title">
                          人满
                      </view>
                      <view slot="content">
                          分别发货
                      </view>
                  </i-step>
                  <i-step>
                      <view slot="title">
                          人不满
                      </view>
                      <view slot="content">
                          自动退款
                      </view>
                  </i-step>
              </i-steps>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="invite_list">
      <p class="main_title">
        <img mode="aspectFit" class="line" src="http://img.meiduduo.com/images/shop/line_left.png" alt="">
        <span>正在热拼的商品</span>
        <img mode="aspectFit" class="line line_right" src="http://img.meiduduo.com/images/shop/line_left.png" alt="">
      </p>
      <div v-if="itemList.length > 0">
        <projectCard v-for="(item, index) of itemList" :key="index" :data="item"></projectCard>
      </div>
    </div>
  </div>
</template>

<script>
import projectCard from '../../pages/comm/project_card'
export default {
  name: 'inviteFriends',
  components: {
    projectCard
  },
  data () {
    return {
      id: null, // 订单id
      commodityId: null, // 商品id
      data: {},
      day: '00', // 天
      hour: '00', // 时
      minute: '00', // 分
      second: '00', // 秒
      isDeal: false, // 是否已处理时间
      timer: null, // 计时器
      itemList: [],
      inviteActive: 1, // 1 邀请，2 参团，3 成功
      infoText: '邀请好友参团'
    }
  },
  onShow () {
    console.log('onshow')
    // if (this.$route.query.id) {
    //   this.id = this.$route.query.id
    // }
    // if (this.$route.query.commodityId) {
    //   this.commodityId = this.$route.query.commodityId
    // }
    // if (this.$route.query.inviteActive) {
    //   this.inviteActive = this.$route.query.inviteActive
    // } else {
    //   this.inviteActive = 1
    // }
    if (this.$route.query.from != 'myOrder') {
      this.isSuccess()
    }
    // this.isSuccess()
    // switch (this.inviteActive) {
    //   case 1:
    //     this.infoText = '邀请好友参团'
    //     break;
    //   case 2:
    //     this.infoText = '一键参团'
    //     break;
    //   case 3:
    //     this.infoText = '组团成功，查看其它拼团'
    //     break;
    // }
    // this.loadList()
    // this.getPDetail()
  },
  mounted () {
    console.log('mounted')
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    if (this.$route.query.commodityId) {
      this.commodityId = this.$route.query.commodityId
    }
    if (this.$route.query.inviteActive) {
      this.inviteActive = this.$route.query.inviteActive
      this.$store.commit('setInvited', { // 从邀请页进入，将被邀请状态置为true
        invited: true
      })
    } else {
      this.inviteActive = 1
    }
    if (this.$store.state.userInfo.custId && this.$store.state.userInfo.mobile) {

    } else {
      this.$router.push('/pagesShow/global/authorization')
    }
    if (this.$route.query.from != 'myOrder') {
      this.isSuccess()
    }
    switch (this.inviteActive) {
      case 1:
        this.infoText = '邀请好友参团'
        break;
      case 2:
        this.infoText = '一键参团'
        break;
      case 3:
        this.infoText = '组团成功，查看其它拼团'
        break;
    }
    this.loadList()
    this.getPDetail()
  },
  onUnload () {
    this.isDeal = false
    clearInterval(this.timer)
  },
  computed: {

  },
  methods: {
    isSuccess () { // 被邀请人是否下单成功
      if (this.$store.state.userInfo.custId) {
        this.$http.post('groupOrder/inviteJoinSuccess', {
          id: this.id,
          custId: this.$store.state.userInfo.custId
        }).then(res => {
          if (res.code === 1) {
            if (res.data == 2) { // 拼团成功
              this.inviteActive = 3
            }
          }
        })
      }
    },
    backHome () { // 回到首页
      wx.switchTab({
        url: '/pages/index'
      })
    },
    joinP () {
      if (!this.data.gapNo) {
        wx.showModal({
          title: '人员已满，无法参与！',
          showCancel: false
        })
        return
      }
      this.$router.push({
        path: '/pagesShop/pin/submit_order',
        query: {
          goId: this.data.id, // 拼团订单id
          commodityId: this.commodityId, // 商品id
          id: Number(this.data.fightGroupId), // 拼团活动id
          clusterNo: this.data.clusterNo, // 成团所需要的人数
          isOwner: 0, // 拼单类型 参与拼单
        }
      })
    },
    loadList() {
      var parames = {
        pageNum: 1,
        pageSize: 10,
        // TODO: 区域id
        // areaId: this.areaId,
        onState: 1
      }
      this.$http.post("fightGroup/list4PageGroup",parames)
      .then( res => {
          this.itemList = res.data.data
      })
    },
    shareF () {
      wx.showShareMenu({

      })
    },
    getPDetail () { // 获取拼团活动详情和商品详情
      this.$http.post('groupOrder/inviteJoin', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          console.log('拼团活动详情和商品详情')
          console.log(res)
          let a = res.data
          if (a.commImg) {
            a.commImg = a.commImg.split(',')
          } else {
            a.commImg = []
          }
          if (a.icons) {
            a.icons = a.icons.split(',')
          } else {
            a.icons = []
          }
          this.data = a
          if (this.data.endTime) {
            this.timer = setInterval(this.countdown, 1000, this.data.endTime)
            // var self = this
            // this.timer = setInterval(function () {
            //   console.log('deal time')
            //   self.countdown(self.data.endTime)
            // }, 1000)
          }
        }
      })
    },
    countdown (endTime) {
      let val = endTime.slice(0, 19).replace(/-/g,"/") // 处理时间格式，兼容ios
      var time = Date.parse(val) - Date.parse(new Date())
      var a = null
      if (time > 0) {
        a = time
      } else {
        a = 0
      }
      var seconds = Math.floor((a / 1000) % 60)
      var minutes = Math.floor((a / 1000 / 60) % 60)
      var hours = Math.floor((a / (1000 * 60 * 60)) % 24)
      var days = Math.floor(a / (1000 * 60 * 60 *24))
      this.day = days > 9 ? days : '0' + days // 天
      this.hour = hours > 9 ? hours : '0' + hours // 时
      this.minute = minutes > 9 ? minutes : '0' + minutes // 分
      this.second = seconds > 9 ? seconds : '0' + seconds // 秒
    },
  },
  onShareAppMessage () {
    return {
      title: this.data.commodityName,
      path: `/pagesShow/global/invite_friends?inviteActive=2&id=${this.id}&commodityId=${this.commodityId}`,
      imageUrl: this.data.commImg[0]
    }
  }
}
</script>

<style scoped>
.invite_header {
  width: 100%;
  height: 1126rpx;
  background: #FFF4F9;
  position: relative;
}
.invite_header > img {
  width: 100%;
  height: 327rpx;
}
.invite_header > div {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 60rpx 0;
}
.header_content {
  width: 690rpx;
  height: 258rpx;
  margin: 0 auto;
  background: #fff;
  border-radius: 4rpx;
  box-sizing: border-box;
  padding: 24rpx;
  display: flex;
}
.header_content > img {
  width: 210rpx;
  height: 210rpx;
  margin-right: 24rpx;
}
.header_content > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header_info {
  font-size: 24rpx;
  color: #999;
}
.header_price {
  font-size: 30rpx;
  color: #FC4396;
}
.header_info > span:last-child {
  margin-top: 69rpx;
}
.header_main {
  height: 712rpx;
  width: 100%;
}
.header_main > div {
  width: 690rpx;
  height: 712rpx;
  margin: 0 auto;
  padding: 30rpx;
  background: #fff;
  border-radius: 4rpx;
  border-top: 1rpx dotted #aaa;
  box-sizing: border-box;
}
.line_right {
  transform: rotate(180deg);
}
.main_title {
  font-size: 32rpx;
  color: #FF4691;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14rpx;
}
.main_title > span {
  margin: 0 33rpx;
}
.line {
  width: 36rpx;
  height: 32rpx;
}
.main_time {
  font-size: 30rpx;
  color: #fff;
  text-align: center;
  margin-bottom: 29rpx;
}
.main_time_text {
  background: #FC4396;
  border-radius: 4rpx;
  padding: 0 10rpx;
  height: 40rpx;
  width: 44rpx;
}
.main_time_dot {
  color: #FC4396;
  margin: 0 10rpx;
}
.main_info {
  font-size: 32rpx;
  color: #333;
  text-align: center;
  margin-bottom: 54rpx;
}
.main_info > span {
  color: #FC4396;
}
.main_user {
  height: 100rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
}
.main_user > img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
}
.footer_btn {
  background: #FF4691;
  font-size: 32rpx;
  color: #fff;
  height: 80rpx;
  width: 600rpx;
  border-radius: 40rpx;
  margin: 30rpx auto;
}
.main_footer > p {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}
.invite_list {
  padding: 30rpx 0;
}
.time_end {
  color: #FC4396;
  font-size: 30rpx;
}
.content_box {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* height: 108rpx; */
  /* margin-bottom: 24rpx; */
  font-size: 26rpx;
  color: #333;
}

</style>
