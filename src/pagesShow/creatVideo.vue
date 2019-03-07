<style>
.img-box .img {
  position: relative;
}
.poster {
  width: 100%;
  height: 100%;
}
.playbtn {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.video-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 11;
  background: rgba(0, 0, 0, 0.3);
}
.prew_video {
  margin-top: 200rpx;
  width: 100%;
  /* position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
}
.cancelbtn {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  width: 50rpx;
  height: 50rpx;
  background: gray;
  color: #000;
}
.tj-video {
  margin: 0 20rpx;
  background: #ff4691;
  color: #fff;
  font-size: 32rpx;
  border-radius: 40rpx;
}
</style>
<style scoped>
  .img-item-box {
    position: relative;
    width: 156rpx;
    height: 156rpx;
  }
  .img-item-box > .img {
    width: 156rpx;
    height: 156rpx;
    border-radius: 20rpx;
  }
  .img-item-btn {
    width: 40rpx;
    height: 40rpx;
    display: block;
    position: absolute;
    right: 0;
  }
  .img-item-cancel {
    top: 0;
    background-image: url('http://img.meiduduo.com/images/show/video_delete.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .img-item-edit {
    bottom: 0;
    background-image: url('http://img.meiduduo.com/images/show/video_caiqie.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .img-box > .photo {
    width: 156rpx;
    height: 156rpx;
    border-radius: 20rpx;
  }
  .img-box > .video-img {
    width: 156rpx;
    height: 156rpx;
  }
</style>


<template>
  <div style="padding-bottom:40rpx;">
    <div class="clear"></div>
    <div class="qu-body">
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title" style="margin-right: 14rpx;margin-left: 0;">标题</span>
        </div>
        <input
          class="input"
          type="text"
          v-model="title"
          maxlength="20"
          placeholder="请输入标题（必须大于10字并且最多20字）"
        >
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title" style="margin-right: 14rpx;margin-left: 0;">内容</span>
        </div>
        <textarea
          class="input input-content"
          style="height:120rpx"
          maxlength="50"
          id
          v-model="content"
          placeholder="文字内容必须大于10字并且最多不能超过50字奥"
        ></textarea>
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title">上传封面</span>
          <span class="tip1" v-if="imgList.length">(长按图片删除)</span>
        </div>
        <div class="img-box">
          <div
            class="img-item-box"
            v-for="(item,index) in imgList"
            :key="index">
            <img
              class="img"
              @click="preViewImg(item)"
              @longpress="deleImg(item,index)"
              :src="item"
              alt
            >
            <span @click.stop="deleImg(item,index)" class="img-item-btn img-item-cancel"></span>
            <span @click.stop="crop(item, index)" class="img-item-btn img-item-edit"></span>
          </div>
          <div class="photo img" v-if="!imgListUrls.length" @click="chooseImg"></div>
        </div>
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title">上传视频</span>
          <span class="tip1" v-if="videoListUrl">(长按删除)</span>
          <!-- <span class="tip">最多可上传2张</span> -->
        </div>
        <div class="img-box">
          <!-- <div class="imglist">
                 <img src="http://img.meiduduo.com/images/index/ad_01.png" alt="">
          </div>-->
          <div
            class="img video-img"
            @click="preView(item)"
            @longpress="deleVideo(item,index)"
            v-if="videoListUrl"
          >
            <img class="poster" :src="poster" alt>
            <img class="playbtn" src="http://img.meiduduo.com/images/info/play.png" alt>
          </div>
          <div class="photo img" v-if="!videoListUrl" @click="chooseVideo"></div>
        </div>
      </div>

      <div class="video-box" v-if="showVideo" @click="cancelPlay">
        <video
          class="prew_video"
          enable-play-gesture="true"
          autoplay
          controls
          :src="videoSrc"
          @click.stop
        >
          <cover-image
            class="cancelbtn"
            @click="cancelPlay"
            src="http://img.meiduduo.com/images/cancel-pre.png"
          />
          <!-- <cover-view class="cancelbtn" @click="cancelPlay">+</cover-view> -->
        </video>
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title">请选择栏目</span>
        </div>
        <div class="lanmu-box">
          <div class="item-box" v-for="(item,index) in lanmu" :key="index" @click="changeLm(index)">
            <span class="item" :class="{active:lmIndex==index}">{{item.detailName}}</span>
          </div>
        </div>
      </div>
    </div>
    <button class="tj-video" @click="save">提交</button>
    <!-- <button class="tj" @click="login">登录</button> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      videoList: "",
      poster: "",
      videoListUrl: "",
      lanmu: [],
      lmIndex: -1,
      columnId: "",
      title: "",
      content: "",
      showVideo: false,
      videoSrc: "",
      videoContext: "",
      imgList: [],
      imgListUrls: []
    };
  },
  components: {},
  methods: {
    ...mapMutations(['setNewCropUrl']),
    crop(item, index) {
      console.log(item, index)
      this.setNewCropUrl('')
      this.$router.push({
        // path: "/pagesShow/global/crop",
        path: "/pagesShow/global/cropTwo",
        query: {
          url: item
        }
      });
    },
    login() {
      wx.login({
        success(res) {
          console.log(res);
        }
      });
    },
    getChannelRecord() {
      this.$http
        .post("/common/dictList", {
          masterCode: "column_type"
        })
        .then(res => {
          if (res.code == 1) {
            this.lanmu = res.data;
          }
        });
    },
    chooseVideo() {
      if (!this.poster) {
        wx.showToast({
          title: "请先上传封面",
          icon: "none",
          mask: true
        });
        return;
      }
      let that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        success(res) {
          console.log(res);

          // that.poster = res.thumbTempFilePath
          wx.showLoading({
            title: "加载中",
            icon: "none",
            mask: true
          });
          wx.uploadFile({
            url: that.$store.state.httpUrl + "/shop4/uploadVideo/upload",
            filePath: res.tempFilePath,
            name: "file",
            formData: {
              user: "test"
            },
            success(result) {
              console.log(result);
              let data = result.data;
              data = JSON.parse(data);
              if (data.code == 1) {
                that.videoList = res.tempFilePath;
                that.videoListUrl = data.data;
                wx.hideLoading();
              }
            }
          });
        }
      });
    },
    deleVideo(item, index) {
      let that = this;
      wx.showModal({
        title: "确定删除视频?",
        success(res) {
          if (res.confirm) {
            that.videoList = "";
            that.videoListUrl = "";
            that.videoSrc = "";
          }
        }
      });
    },
    preView(item) {
      console.log(this.videoContext);
      this.showVideo = true;
      this.videoSrc = this.videoList;
      this.videoContext.seek(0);
      this.videoContext.play();
      this.videoContext.requestFullScreen();
    },
    chooseImg() {
      let that = this;
      if (this.imgList.length >= 1) {
        wx.showToast({
          title: "已有封面图",
          icon: "none",
          mask: true
        });
        return;
      }
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          console.log(res);
          let img = res.tempFilePaths[0];
          wx.showLoading({
            title: "加载中",
            icon: "none",
            mask: true
          });
          wx.uploadFile({
            url: that.$store.state.httpUrl + "/shop4/uploadImgs/upload",
            filePath: img,
            name: "file",
            formData: {
              user: "test"
            },
            success(res) {
              console.log(res);
              let data = res.data;
              data = JSON.parse(data);
              if (data.code == 1) {
                that.imgList.push(img);
                that.poster = data.data;
                that.imgListUrls.push(data.data);
                wx.hideLoading();
              }
            }
          });
        }
      });
    },
    deleImg(item, index) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "确定删除封面?",
        success(res) {
          if (res.confirm) {
            that.imgList.splice(index, 1);
            that.poster = "";
            that.imgListUrls.splice(index, 1);
          }
        }
      });
    },
    preViewImg(item) {
      let that = this;
      wx.previewImage({
        urls: that.imgList,
        current: item
      });
    },
    cancelPlay() {
      this.showVideo = false;
    },
    changeLm(index) {
      this.lmIndex = index;
      this.columnId = this.lanmu[index].detailCode;
      console.log(this.columnId);
    },
    save() {
      if (this.title.length < 10) {
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.content.length < 10) {
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return false;
      }
      if (
        !this.columnId |
        !this.title |
        !this.content |
        !this.videoListUrl |
        !this.poster
      ) {
        wx.showToast({
          title: "请填写完整",
          icon: "none",
          mask: true
        });
        return;
      }
      this.$http
        .post("/smallVideo/save", {
          title: this.title,
          content: this.content,
          areaIds: this.$store.state.curCityId
            ? JSON.stringify([this.$store.state.curCityId])
            : JSON.stringify([1]),
          cover: this.poster,
          videoUrl: this.videoListUrl,
          columnId: this.columnId,
          author: this.$store.state.userInfo.custId,
          authorType: 1,
          state: 1
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: "发布成功",
              mask: true,
              icon: "none"
            });
            setTimeout(() => {
              this.title = "";
              this.content = "";
              this.videoList = "";
              this.videoListUrl = "";
              this.imgList = [];
              this.lmIndex = -1;
              this.columnId = "";
              this.$router.go(-1);
            }, 1000);
          } else {
            wx.showToast({
              title: res.msg,
              mask: true,
              icon: "none"
            });
          }
        });
    },
    init() {
      this.videoContext = wx.createVideoContext("prew_video");
      this.showVideo = false;
      this.videoList = "";
      this.videoListUrl = "";
      this.imgList = [];
      this.imgListUrls = [];
      this.poster = "";
      this.videoSrc = "";
      this.title = "";
      this.content = "";
      this.lmIndex = -1;
      this.columnId = "";
    }
  },
  onLoad() {
    this.init();
    this.getChannelRecord();
  },
  onReady() {
    if (this.$route.query.init) {
      this.init()
    }
  },
  onShow() {
    if (this.$store.state.nowCropImgUrl) {
      this.poster = this.$store.state.nowCropImgUrl
      this.imgList = []
      this.imgList.push(this.poster)
    }
    console.log('create video page on show')
  }
};
</script>

