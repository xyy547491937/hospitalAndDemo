<template>
  <div class="search-diary-card" @click="jump(data.id, 5)">
    <div class="search-diary-header">
      <img :src="data.authorIcon" alt="">
      <div class="header-user-info">
        <span class="user-name">{{data.nickName}}</span>
        <span class="user-tiem">{{data.createTime}}</span>
      </div>
    </div>
    <div class="diary-imgs" v-if="data.afterPhoto&&data.afterPhoto.length > 0">
      <img v-for="(img, index) in data.afterPhoto" :key="index" :src="img" alt="">
    </div>
    <p class="diary-content z-lines-2-overflow-hidden">{{data.content}}</p>
    <div class="diary-footer">
      <span><i-icon size="18" color="#CCCCCC" type="browse" />{{data.readNo}}</span>
      <span><i-icon size="18" color="#CCCCCC" type="message" />{{data.commentNum}}</span>
      <!-- <span><i-icon size="18" color="#CCCCCC" type="praise" />123</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  computed: {
    img(){
      // return data.afterPhoto
    }
  },
  methods: {
    jump(id, type) {
      this.$router.push({ path: "/pagesShow/diary", query: { id, type } });
    }
  }
};
</script>

<style scoped>
.search-diary-card {
  width: 100%;
  padding: 36rpx 30rpx 29rpx 30rpx;
  box-sizing: border-box;
  margin-bottom: 22rpx;
  background: #fff;
}
.search-diary-card:last-child {
  margin-bottom: 0;
}
.search-diary-header {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.search-diary-header > img {
  width: 55rpx;
  height: 55rpx;
  border-radius: 100%;
  margin-right: 15rpx;
}
.header-user-info {
  display: flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-around;
  -webkit-justify-content: space-around;
}
.user-name {
  font-size: 26rpx;
  color: #666666;
}
.user-tiem {
  font-size: 18rpx;
  color: #999999;
}
.diary-content-day {
  font-size: 26rpx;
  color: #333333;
}
.diary-content {
  font-size: 24rpx;
  color: #333333;
}
.diary-imgs {
  margin: 23rpx 0 25rpx 0;
}
.diary-imgs > img {
  width: 220rpx;
  height: 220rpx;
  margin-right: 10rpx;
}
.diary-footer {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  margin-top: 38rpx;
}
.diary-footer > span {
  margin-right: 45rpx;
}
.diary-footer > span:last-child {
  margin-right: 0;
}
</style>
