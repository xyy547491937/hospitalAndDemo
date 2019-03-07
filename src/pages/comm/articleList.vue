<template>
  <div class="c" @click="toVideo">
    <div class="acvideo-list">
      <!-- editor xyy 问答的模块 -->
      <div class="quest-box">
        <!-- 头像以及关注标签 -->
        <div class="quest-message flex-r s-padding">
          <div class="flex-r user-message">
            <!-- <img src="http://img.meiduduo.com/images/index/pt_bg.png" alt=""> -->
            <div class="img-b">
              <img :src="video.authorIcon" alt>
              <span class="member-user"></span>
            </div>

            <div class="user-name xyy-ellipsis-1">
              <span>{{video.authorName}}</span>
              <!-- <span>啾啾mie</span> -->
            </div>
          </div>
          <!-- 关注 -->
          <div class="gz" v-if="!isSelf">
            <div class="focus-btn" v-if="!video.isFollow" @click.stop="clickFollow(1)">+关注</div>
            <div class="active-focus-btn" v-if="video.isFollow" @click.stop="clickFollow(-1)">
              <i-icon type="right" color="#999"/>已关注
            </div>
            <!-- <div>已关注</div> -->
            <!-- <i-button bind:click="handleClick" shape="circle" size="small" i-class="colors"> +关注</i-button> -->
          </div>
          <!--  -->
        </div>
      </div>
      <!-- <p class="label"> <span>
      <i-icon type="label" /></span></p>-->
      <!--  视屏区域 -->
      <div class="live-box">
        <!-- 视屏 -->
        <div class="live">
          <!-- <img src="http://img.meiduduo.com/images/index/ad_01.png" mode="widthFix" alt=""> -->
          <p :style="{backgroundImage:'url('+poster +')'}" class="bg_img"></p>
          <!-- <img :src="poster" mode="aspectFill" alt> -->
        </div>
        <span class="pause"></span>
      </div>
      <div class="video-title">{{video.title}}</div>
      <div class="read-num-box flex-r">
        <div class="c">
          <span>{{video.shortTimeString}}</span>
        </div>
        <div class="flex-r read-num">
          <p style="display:flex;align-item:center">
            <i-icon type="browse" size="16" style="display:flex;align-item:center"/>
            <span class="pa">{{video.readNum}}</span>
          </p>
          <p style="display:flex;align-item:center">
            <i-icon type="message" size="16"/>
            <span class="pa">{{video.commentNum}}</span>
          </p>
          <p class="thumbbox" style="display:flex;align-item:center">
            <span class="pa">赞{{video.fabulousNum}}</span>
          </p>
        </div>
        <!-- <div class="da">
          <i-button bind:click="handleClick" shape="circle" size="small" i-class="colors1" >我要答</i-button>
        </div>-->
      </div>
      <!-- 评论区域 -->
      <!-- <div class="cv" v-if="item.childList&&item.childList.length > 0">
        <div class="eve"  v-for="(item1, index1) of item.childList" :key="index1" track-by="$index1" v-if="index1<item.len">
          <div class="flex-r user-avr-box">
            <div class="flex-r user-avr">
              <img :src="item1.icon" alt="">
              <span>{{item1.nickName}}</span>
            </div>
            <div class="c" @click="customerRecordSave(item1)">
              {{item1.fabulousNum}}
            </div>

      </div>-->
      <!-- inner -->
      <!-- <p class="aws">
            <rich-text class="richText" :nodes="'答:'+ item1.content"></rich-text>
          </p>
      </div>-->
      <!-- sy -->
      <!-- <p class="sy" v-if="item.childList.length>2" @click="showAll(index, item.len)"> 查看最新{{item.childList.length < 5 ? item.childList.length : 5}}条回答</p>
      </div>-->
    </div>
    <div class="writeComment1" v-if="isShow">
      <input name="input1" v-model="content" :focus="true">
      <span class="send" @click="comment">发布</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      item: {},
      isSelf: true
    };
  },
  props: {
    video: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },

  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    poster() {
      return this.video.cover.split(",")[0];
    }
    //  isSelf(){
    //    return this.video.author == this.$store.state.userInfo.custId
    //  }
  },
  onLoad() {
    let video = this.video;
    video.fabulousNum = video.fabulousNum ? video.fabulousNum : 0;
    this.isSelf =
      this.video.author == this.$store.state.userInfo.custId ? true : false;
  },
  onShow() {},
  methods: {
    show(item) {
      this.item = item;
      this.isShow = true;
    },
    toVideo() {
      console.log(this.index);
      this.$store.state.backItem.read = "";
      this.$store.commit("backIndexChange", this.index);
      this.$router.push({
        path: "/pagesShow/video_info.1",
        query: {
          id: this.video.id,
          type: this.video.modelType
        }
      });
    },
    // 关注
    clickFollow(state) {
      if (this.video.author == this.$store.state.userInfo.custId) {
        return;
      }
      let type = "";
      if (this.video.createType == 0 && this.video.authorType == 0) {
        type = 2;
      } else {
        type = 6;
      }
      // wx.showLoading({
      //   mask: true,
      //   title: "加载中"
      // });
      this.$http
        .post("/focusRecord/save", {
          recordId: this.video.author,
          custId: this.$store.state.userInfo.custId,
          recordType: type,
          state
        })
        .then(res => {
          // console.log(res);
          // wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.video.isFollow = 1;
              // this.video.isfollowAuthor = 1;
            } else {
              this.video.isFollow = 0;
            }
            this.$emit("followBus", this.video.author, state);
          }
        });
    },
    // 视频点赞
    changeThumbs() {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = this.video.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: this.video.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "9",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.video.fabulousNum += 1;
              this.video.isThumbsUp = 1;
            } else {
              this.video.fabulousNum -= 1;
              this.video.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    save(item) {
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: item.isFocus == 1 ? -1 : 1,
        recordType: 8
      };
      this.$http.post("/focusRecord/save", option).then(res => {
        this.$emit("getList");
      });
    },
    showAll(index, len) {
      if (len == 2) {
        this.$emit("changeLen", index);
      }
    },
    comment() {
      var option = {
        id: "", // id，新增时为空，修改时必输
        contentId: this.item.id,
        custId: this.custId,
        criticId: this.item.custId,
        content: this.content,
        commentId: 0,
        commentType: 8
      };
      this.$http.post("/comment/save", option).then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2000
          });
          this.$emit("getList");
        }
      });
    },
    customerRecordSave(item) {
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: 8,
        crType: 1,
        state: item.isThumbsUp == 0 ? 1 : -1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        wx.hideLoading();
        if (res.code == 1) {
          this.$emit("getList");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
// @import url("../../css/style.less");

.writeComment1 {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
.thumbbox.active {
  color: #ff4691;
}
.colors {
  border: 1px solid @baseColor !important;
  height: 50rpx !important;
  color: @baseColor !important;
  line-height: 50rpx !important;
  margin: 0 !important;
}

.colors1 {
  background-color: @baseColor !important;
  height: 50rpx !important;
  color: @base-white !important;
  line-height: 50rpx !important;
}

.s-padding {
  padding: 0;
}

.video-handle {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 12rpx;
}

.acvideo-list {
  margin-bottom: 10px;
  font-size: @baseSize;
  color: @baseTextColor-c;
  background-color: @base-white;
  // padding: @basePadding 0;
  padding: 30rpx 0 !important;
  border-radius: 20rpx;
  & > .quest-box {
    padding: 0 30rpx 20rpx 30rpx;
    & > .quest-message {
      justify-content: space-between;
      align-items: center;
      // padding: 0 30rpx;
      padding: 0;
      & > .user-message {
        align-items: center;
        width: 65%;

        > .img-b {
          display: block;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          position: relative;
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          & > .member-user {
            width: 15px;
            height: 15px;
            display: block;
            background-image: url("http://img.meiduduo.com/images/index/member_user.png");
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            top: -10rpx;
            right: -10rpx;
            display: none;
          }
        }

        & > .user-name {
          margin-left: 10px;
          font-weight: bold;
          font-size: 30rpx;
          & span:first-child {
            // color: @baseSconedTitleColor;
            color: #333;
          }
        }
      }

      // 关注
      & > .gz {
        & > .colors {
          border: 1px solid @baseColor !important;
          //   width: 1.1rem !important;
          height: 0.4rem !important;
          color: @baseColor !important;
          line-height: 0.4rem !important;
        }
        & > .focus-btn {
          color: #ff2692;
          border: 2rpx solid #ff2692;
          padding: 4rpx 16rpx;
          font-size: 24rpx;
          border-radius: 20rpx;
        }
      }
    }
  }

  & > .title {
    color: @baseFirstTitleColor;
    font-weight: bold;
    padding: 10px 0;
  }

  & > .inner {
    // &:extend(.s-padding);
    line-height: 20px;
    // padding: 10px @basePadding;
  }

  & > .live-box {
    max-height: 165px;
    width: 100%;
    position: relative;
    overflow: hidden;
    & > .pause {
      width: 60px;
      height: 60px;
      display: block;
      background-image: url("http://img.meiduduo.com/images/info/play.png");
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -30px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    & > .live {
      width: 100%;
      height: 100%;
      position: relative;

      & > .bg_img {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 330rpx;
        display: block;
        border-radius: 10rpx;
      }
    }
  }

  & > .label {
    color: @baseColor;
    padding: 10px 0;
  }

  & > .read-num-box {
    color: #999;
    font-size: 0.25rem;
    align-content: center;
    justify-content: space-between;
    padding: 0 @basePadding;
    margin-top: @basePadding;

    .read-num {
      width: 50%;
      justify-content: space-between;

      //   justify-content: space-around;
      & > p {
        &:extend(.flex-r);
        align-items: center;
        &.active {
          color: #ff2692;
        }
        & > .pa {
          margin-left: 5px;
        }
      }
    }
  }

  //   评论区域
  & .cv {
    background: rgba(240, 245, 246, 1);
    padding: 10px;
  }

  & .eve {
    margin-bottom: 30rpx;

    & > .user-avr-box {
      justify-content: space-between;
      margin-bottom: 10px;

      & > .user-avr {
        & > img {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
        }

        & > span {
          margin-left: 10px;
        }
      }
    }

    & > .aws {
      line-height: 0.36rem;
      color: @baseFirstTitleColor;
    }
  }

  & .sy {
    color: @baseColor;
  }
}
.video-title {
  font-size: 30rpx;
  color: #333;
  padding: 32rpx 30rpx 0;
  box-sizing: border-box;
}
</style>
