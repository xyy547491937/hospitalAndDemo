<template>
  <div class="comments">
    <div v-if="comments.length > 0" v-for="(item, index) of comments" :key="index" class="doctor-comment box">
      <!-- <div class="doctor-comment-fen">
        <div>
          <i-rate :value="4" size="22"></i-rate>
          <span class="comment-fen">4分</span>
        </div>
        <span>{{commentNumber}}条评价></span>
      </div> -->
      <div class="doctor-comment-item">
        <div class="doctor-comment-item-base">
          <img :src="item.icon" alt="">
          <div class="doctor-comment-item-main">
            <p>
              <span class="comment-user-name">{{ item.custName }}</span>
              <span class="comment-time">{{ item.createDate }}</span>
            </p>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="nolist" v-if="comments.length < 1">
      <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
    <div v-if="isOver && comments.length > 0">
      <load-over></load-over>
    </div>
  </div>
</template>
<script>
import loadOver from '../pages/comm/loadOver'
export default {
  components: {
    'load-over': loadOver
  },
  data () {
    return {
      loaded: false,
      comments: [],
      params: {
        pageNum: 1,
        pageSize: 15
      },
      isOver: false
    }
  },
  onShow () {
    this.loaded = false
    this.initQuery()
    this.comments = []
    if (this.$route.query.id) {
      this.getComments()
    }
  },
  onReachBottom () {
    if (!this.isOver) {
      this.getComments()
    }
  },
  onPullDownRefresh () {
    this.initQuery()
    this.getComments(true)
  },
  methods: {
    initQuery () {
      this.params = {
        pageNum: 1,
        pageSize: 15
      }
      this.isOver = false
    },
    getComments (refresh) {
      if (this.isOver) {
        return
      }
      if (this.$route.query.id) {
        this.params.id = this.$route.query.id
      }
      this.$http.post('servicePersonal/getEvaluateInfo', this.params).then(res => {
        if (res.code === 1) {
          this.loaded = true
          const a = res.data.data.map(el => {
            if (el.createDate) {
              el.createDate = `${el.createDate.slice(0, 4)}年${el.createDate.slice(5, 7)}月${el.createDate.slice(8, 10)}日`
            }
            return el
          })
          if (res.data.data.length < this.params.pageSize || this.params.pageNum >= res.data.pages) {
            this.isOver = true
          } else {
            this.params.pageNum++
          }
          if (refresh) {
            this.comments = a
          } else {
            this.comments = [...this.comments, ...a]
          }
        }
      })
    },
  }
}
</script>
<style scoped>
.comments {
  min-height: 100%;
  background: #f5f5f5;
}
.doctor-comment {
  background: #fff;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}
.doctor-comment:last-child {
  border-bottom: 0;
}
.doctor-comment-fen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22rpx;
  color: #FF4691;
}
.doctor-comment-fen > div {
  display: flex;
  align-items: center;
}
.comment-fen {
  color: #FEB259;
  font-size: 30rpx;
  margin-bottom: -10rpx;
  display: inline-block;
}
.doctor-comment-item {
  /* margin-top: 47rpx; */
}
.doctor-comment-item-base {
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.doctor-comment-item-base > img {
  width: 66rpx;
  height: 66rpx;
  border-radius: 100%;
  display: block;
  margin-right: 20rpx;
}
.doctor-comment-item-main {
  flex: 1;
}
.doctor-comment-item-main > p:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34rpx;
}
.comment-user-name {
  font-size: 26rpx;
  color: #3F6BA6;
}
.comment-time {
  font-size: 22rpx;
  color: #999999;
}
.doctor-comment-item-main > p:last-child, .doctor-comment-item-follow > p:last-child {
  font-size: 24rpx;
  color: #333333;
  line-height: 38rpx;
}
.doctor-comment-item-follow {
  padding-top: 19rpx;
  margin-top: 19rpx;
  border-top: 1rpx solid #f1f1f1;
  width: 100%;
  box-sizing: border-box;
  padding-left: 86rpx;
}
.doctor-comment-item-follow > p:first-child {
  margin-bottom: 20rpx;
}
.doctor-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
