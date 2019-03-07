<style>
.activeArticle {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  padding-right: 0;
  display: flex;
  margin-bottom: 20rpx;
}
.activeArticle .activeArticle-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 43rpx 0 0;
}
.activeArticle .art-img {
  width: 260rpx;
  height: 124rpx;
  border-radius: 8rpx;
}
.activeArticle .ac-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.activeArticle .activeArticle-title {
  font-size: 30rpx;
  color: #333;
  /* font-weight: bold; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ac-bottom {
  font-size: 24rpx;
  padding-bottom: 6rpx;
}
.ac-bottom .tag {
  border: 1rpx solid #ff4069;
  color: #ff4069;
  border-radius: 4rpx;
  margin-right: 10rpx;
  margin-bottom: 2rpx;
  max-width: 84rpx;
  padding: 2rpx 4rpx;
  font-size: 18rpx;
  box-sizing: border-box;
  height: 32rpx;
}
.ac-bottom .from {
  margin-right: 10rpx;
  color: #999;
  max-width: 140rpx;
  height: 32rpx;
}
.ac-bottom .num {
  display: flex;
  align-items: center;
  color: #999;
}
</style>
<template>
  <div class="activeArticle" @click="toInfomation(arti)">
    <div class="activeArticle-content">
      <div class="activeArticle-title">{{arti.title}}</div>
      <div class="ac-bottom">
        <div class="tag ellipsis" v-if="arti.channelName">{{arti.channelName}}</div>
        <div class="from ellipsis">{{arti.source}}</div>
        <div class="num" style="display:flex;align-item:center;text-align: center;">
          <i-icon
            type="message"
            size="16"
            style="display:flex;align-item:center;text-align: center;"
          />
          <span>{{arti.commentNum}}</span>
        </div>
      </div>
    </div>
    <img mode="aspectFill" class="art-img" :src="cover" alt>
    <!-- <img class="art-img" src="http://img.meiduduo.com/images/index/kangshuai.png" alt=""> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    arti: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  components: {},
  computed: {
    cover() {
      return this.arti.cover.split(",")[0];
    }
  },
  methods: {
    toInfomation(item) {
      console.log(this.index)
      this.$store.state.backItem.read = ''
      this.$store.commit('backIndexChange',this.index)
      this.$router.push({
        path: "/pagesShow/information",
        query: {
          id: item.id,
          type: item.modelType
        }
      });
    }
  },
  onShow() {
  }
};
</script>

