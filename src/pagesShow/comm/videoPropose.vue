<style scoped>
.activeArticle {
  background: #fff;
  /* border-radius: 20rpx; */
  padding: 30rpx;
  display: flex;
  /* margin-bottom: 20rpx; */
  border-bottom: 1rpx solid #f1f1f1;
  font-weight: normal;
}
.activeArticle .activeArticle-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  /* padding: 16rpx 6rpx 8rpx 0; */
}

.img-box {
  width: 220rpx;
  height: 160rpx;
  position: relative;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.activeArticle .ac-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.activeArticle .y-title {
  font-size: 32rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 48rpx;
  font-weight: normal;
}
.ac-bottom {
  font-size: 24rpx;
  padding-bottom: 6rpx;
}

.ac-bottom .from {
  margin-right: 10rpx;
  color: #999;
  max-width: 140rpx;
  height: 32rpx;
}
.ac-bottom {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #999;
  flex-direction: row;
}
.bd-l {
  margin-left: 15px;
}
.bd-l span {
  margin-left: 5px;
  font-size: 12px;
  color: #999;
}
.author-name {
  width: 40%;
}
.video-play {
  background-image: url("http://img.meiduduo.com/images/info/play.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -30rpx;
  margin-left: -30rpx;
}
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
<template>
  <div class="activeArticle" @click="toInfomation(arti)">
    <div class="activeArticle-content">
      <div class="y-title ellipsis-3">{{arti.title}}</div>
      <div class="ac-bottom">
        <div class="ellipsis author-name">{{arti.authorName}}</div>
        <div class="bd-l">
          <i-icon type="browse" size="14" color="#999"/>
          <span>{{arti.fabulousNum}}</span>
        </div>
        <div class="num bd-l" style="display:flex;align-item:center;text-align: center;">
          <i-icon
            type="praise"
            size="14"
            style="display:flex;align-item:center;text-align: center;"
          />
          <span>{{arti.isThumbsUp}}</span>
        </div>
      </div>
    </div>
    <div class="img-box">
      <img class="art-img" :src="cover" alt>
      <!-- http://img.meiduduo.com/images/info/play.png -->
      <p class="video-play"></p>
    </div>

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
      // console.log(this.index);
      // this.$store.state.backItem.read = "";
      // this.$store.commit("backIndexChange", this.index);
      // this.$router.push({
      //   path: "/pagesShow/information",
      //   query: {
      //     id: item.id,
      //     type: item.modelType
      //   }
      // });
      this.$emit("videoDetail", item);
    }
  },
  onShow() {
    console.log(this.arti);
  }
};
</script>
