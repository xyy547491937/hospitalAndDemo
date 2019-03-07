<template>
    <div class="c">
        <!-- 视屏list -->
        <!-- 机构详情里面 -->
        <div class="live-picture" v-for="(v,i) in liveList" :key="i" @click="changeJump('/pagesShow/video_info',{id:v.id,channelCode:v.channelCode})">
            <div class="video-picture">
                 <img :src="v.cover" alt="">
                 <span></span>
            </div>
            <div class="live-content">
              <p v-html="v.content"></p>
            </div>

            <div class="flex-r co">
                <p class="flex-r organ-logo">
                    <img :src="v.authorIcon" :alt="v.authorName">
                    <span style="margin-left:10px"> {{v.authorName}}</span>
                </p>
                <div class="flex-r cv">
                    <p> <i-icon type="message" /> <span>{{v.commentNum}}</span></p>
                      <p style="margin-left:10px"> <i-icon type="praise" /> <span>{{v.fabulousNum}}</span></p>
                        <p style="margin-left:10px"> <i-icon type="like" /> <span>{{v.favouriteNum}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["liveList"],
  data() {
    return {};
  }
};
</script>
<style scoped>
.flex-r {
  display: flex;
  flex-direction: row;
}
.flex-c {
  display: flex;
  flex-direction: column;
}
.organ-logo img {
  width: 40rpx;
  height: 40rpx;
  display: block;
  border-radius: 50%;
  display: block;
}
.live-picture {
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}
.live-content {
  padding: 10px 0;
}
.live-picture .video-picture {
  display: block;
  position: relative;
  width: 100%;
}
.video-picture img {
  display: block;
  width: 100%;
  border-radius: 6px;
  height: 400rpx;
}
.video-picture span {
  background-image: url("http://img.meiduduo.com/images/info/play.png");
  background-repeat: no-repeat;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90rpx;
  height: 90rpx;
  /* z-index: 10; */
  /* margin-left: -45rpx;
  margin-top: -45rpx; */
  background-size:100%;
}
.co {
  align-items: center;
  justify-content: space-between;
}
.cv {
  width: 50%;
  justify-content: space-around;
}
</style>

