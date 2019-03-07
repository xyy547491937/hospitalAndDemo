<template>
  <div class="examples">
    <div @click="goExamplePage(item)" v-for="(item, index) of list" :key="index" class="doctor_example box">
      <div class="example_imgs">
        <div class="example_img">
          <img :src="item.preFirstPhoto" alt="">
          <img style="right: 0;" src="http://img.meiduduo.com/images/index/Before.png" alt="">
        </div>
        <div class="example_img">
          <img :src="item.afterFirstPhoto" alt="">
          <img style="left: 0;" src="http://img.meiduduo.com/images/index/After.png" alt="">
        </div>
      </div>
      <div class="example_user">
        <img :src="item.authorIcon" alt="">
        <span>{{ item.authorName }}</span>
      </div>
      <!-- <p class="example_content"></p> -->
      <rich-text :nodes="item.diaryContent" class="example_content richText"></rich-text>
      <p class="example_tag">
        <i-icon type="label" color="#FF4892" size="20" />
        <span>{{ item.tagName }}</span>
      </p>
      <div class="example_price">
        <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt="">
        <span class="example_price_content">{{ item.commName }}</span>
        <span>￥{{ item.rulePrice }}</span>
      </div>
      <div class="footer_btns">
        <div class="footer_btn_item">
          <i-icon type="browse" size="14" />
          <span> {{ item.readNum }}</span>
        </div>
        <div class="footer_btn_item">
          <i-icon type="message" size="14" />
          <span> {{ item.commentNum }}</span>
        </div>
        <div class="footer_btn_item">
          <i-icon type="praise" size="14" />
          <span> {{ item.fabulousNum }}</span>
        </div>
      </div>
    </div>
    <div id="nolist" v-if="list.length ==0">
    <div class="noData-mode list_none" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false,
      list: [],
    }
  },
  onShow () {
    this.loaded = false
    this.getDocterExample()
  },
  onUnload () {
    this.list = []
  },
  methods: {
    getDocterExample () {
      let params = {
        pageNum: 1,
        pageSize: this.$route.query.total,
        auditState: 1
      }
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id
      }
      this.$http.post('diaryBook/list4PageForDiaryBook', params).then(res => {
        if (res.code === 1) {
          this.list = res.data.data
          this.loaded = true
        }
      })
    },
    goExamplePage (val) {
      this.$router.push({
        path: '/pagesShow/diary_info',
        query: {
          id: val.id,
          type: 7,
        }
      })
    }
  }
}
</script>

<style scoped>
.examples {
  background: #f1f1f1;
  min-height: 100vh;
}
.doctor {
  background: #F1F1F1;
}
.box {
  margin-bottom: 17rpx;
}
.doctor_image {
  width: 100%;
  box-sizing: border-box;
  height: 440rpx;
  position: relative;
}
.doctor_image > img {
  display: block;
  width: 100%;
  height: 100%;
}
.doctor_image_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120rpx;
  background: rgba(85,85,85,.32);
  padding: 27rpx 33rpx 21rpx 33rpx;
  box-sizing: border-box;
  font-size: 22rpx;
  color: #fff;
}
.doctor_name {
  font-size: 30rpx;
}
.follow_btn {
  font-size: 26rpx;
  padding: 7rpx 24rpx 8rpx 24rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 20rpx;
  background: #FC4396;
  margin-left: 28rpx;
}
.doctor_image_info > p {
  margin-top: 14rpx;
}
.doctor_info {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.aside_lable {
  font-size: 28rpx;
  color: #333333;
  width: 160rpx;
  display: block;
}
.doctor_info_tag, .doctor_info_intro {
  display: flex;
  margin-bottom: 30rpx;
}
.aside_lable_item {
  font-size: 24rpx;
  color: #FC4396;
  background: #FDD2EC;
  padding: 9rpx 26rpx 8rpx 30rpx;
  border-radius: 20rpx;
  margin: 0 19rpx 20rpx 0;
}
.doctor_info_content {
  font-size: 24rpx;
  color: #666666;
  line-height: 40rpx;
}
.doctor_info_footer {
  border-top: 1rpx solid #f1f1f1;
  font-size: 24rpx;
  color: #FC4396;
  text-align: center;
  padding: 24rpx 0;
}
.doctor_organ {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333333;
  padding: 30rpx;
  background: #fff;
}
.doctor_organ > img {
  width: 40rpx;
  height: 50rpx;
  display: block;
}
.doctor_organ > span {
  flex: 1;
  margin: 0 17rpx;
}
.doctor_example {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.example_label {
  font-size: 28rpx;
  color: #333333;
  border-left: 4rpx solid #FC4396;
  margin-bottom: 29rpx;
  display: block;
  padding: 0 16rpx;
}
.example_imgs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}
.example_img {
  position: relative;
  width: 344rpx;
  height: 330rpx;
  border-radius: 4rpx;
  box-sizing: border-box;
}
.example_img > img:first-child {
  width: 100%;
  height: 100%;
  display: block;
}
.example_img > img:last-child {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100rpx;
  height: 30rpx;
}
.example_user {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 32rpx;
}
.example_user > img {
  width: 57rpx;
  height: 57rpx;
  display: block;
  border-radius: 100%;
  margin-right: 29rpx;
}
.example_content {
  font-size: 26rpx;
  color: #666666;
  margin-bottom: 39rpx;
}
.example_tag {
  font-size: 26rpx;
  color: #FF4691;
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
}
/* .example_tag > img {
  display: block;
  width: 20rpx;
  height: 20rpx;
  margin-right: 5rpx;
} */
.example_price {
  display: flex;
  align-items: center;
  background: #F5F5F5;
  padding: 13rpx 17rpx 15rpx 17rpx;
  border-radius: 3rpx;
  font-size: 22rpx;
  color: #555555;
  margin-bottom: 26rpx;
}
.example_price > img {
  display: block;
  width: 26rpx;
  height: 26rpx;
  margin-right: 10rpx;
}
.example_price_content {
  flex: 1;
}
.example_price > span:last-child {
  color: #FF4691;
}
.footer_btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24rpx;
  color: #999;
}
.footer_btn_item {
  display: flex;
  align-items: center;
  margin-left: 50rpx;
  margin-bottom: 21rpx;
}
.example_btns {
  border-top: 1rpx solid #f1f1f1;
  padding: 25rpx 0 28rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
}
.example_btns > span:first-child {
  margin-right: 10rpx;
}
.example_btns > span:last-child {
  display: flex;
  align-items: center;
  color: #FC4396;
}

.list_none {
  height: 1200rpx;
}
</style>
