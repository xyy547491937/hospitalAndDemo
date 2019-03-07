<template>
<div>	<!-- <div style="background-color: #FFFFFF;"> -->
		<div style="z-index:-1;" >
			<video  id="myvideo" :src="videoSrc" enable-play-gesture="true" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" class="videostyle" ></video>


			<!-- <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>
			<span class="ico ico-skip"></span> -->
			<!-- <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span> -->
			<!-- <span class="ico ico-video"  :class="{ hide: isPlay }"></span> -->
		</div>
	</div>

</template>

<script>
export default {
  props: ["videoSrc"],
  data() {
    return {
      _dom: "",
      // videoSrc: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
      videoImg:
        "http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg",
      playStatus: "",
      muteStatus: "",
      isMute: true,
      isPlay: false
    };
  },

  mounted() {},
  methods: {
    playClick() {
      this.isPlay = !this.isPlay;
      this.playStatus = "autoplay";
    },
    closeSoundClick() {
      this.isMute = !this.isMute;
      if (this.isMute) {
        this.muteStatus = "";
      } else {
        this.muteStatus = "muted";
      }
    }
  }
};
</script>

<style scoped>
.videostyle {
  width: 100%;
  height: 4rem;
  border-radius: 0.1rem;
}
</style>
