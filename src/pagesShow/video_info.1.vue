<template>
  <div>
    <loading v-if="show"></loading>
    <div v-else class="video-info">
      <div class="top">
        <div
          class="video"
          @tap="videoPause"
          :class="{fullScreen:videofullScreen,nofullScreen:!videofullScreen}"
        >
          <video
            id="video"
            ref="video"
            enable-play-gesture="true"
            @play="beginPlay"
            @error="videoError"
            @waiting="waiting"
            autoplay
            @timeupdate="timeChange"
            :src="videoInfo.videoUrl"
          >
            <!-- <cover-image v-if="!videoPlaying" @click.stop="videoPlay" class="playing" src="http://img.meiduduo.com/images/info/play.png" /> -->
            <cover-view class="coverview" v-if="videofullScreen">
              <cover-view class="video-detail">
                <!-- 头像 昵称 -->
                <cover-view style="overflow:hidden;margin-bottom:10rpx">
                  <!-- <img class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                  <cover-image class="avatar" :src="videoInfo.authorIcon"/>
                  <!-- <cover-image class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" /> -->
                  <cover-view class="nickname ellipsis">{{videoInfo.authorName}}</cover-view>
                  <!-- <cover-view class="more" @click="switchFullScreen(false)">更多</cover-view> -->
                </cover-view>
                <!-- video介绍 -->
                <cover-view style="overflow:hidden;margin: 30rpx 0 30rpx 0;">
                  <cover-view class="detail-text">{{videoInfo.title}}</cover-view>
                  <cover-view class="more" @click="switchFullScreen(false)">更多</cover-view>
                </cover-view>
                <!-- 赞 收藏 -->
                <cover-view class="video-bottom">
                  <cover-view class="zan" @click.stop="changeThumbs(videoInfo.id)">
                    <!-- @click="clickThumbs(videoInfo.isThumbsUp)" -->
                    <cover-image
                      class="video-handle"
                      v-if="videoInfo.isThumbsUp == 0"
                      src="http://img.meiduduo.com/images/info/zan1.png"
                    />
                    <cover-image
                      class="video-handle"
                      v-if="videoInfo.isThumbsUp != 0"
                      src="http://img.meiduduo.com/images/info/zan2.png"
                    />
                    <cover-view class="count">赞 {{videoInfo.fabulousNum}}</cover-view>
                  </cover-view>

                  <cover-view class="zan" @click.stop="changeCollect(videoInfo.id)">
                    <!-- @click="clickCollect(videoInfo.isCollection)" -->
                    <cover-image
                      class="video-handle"
                      v-if="videoInfo.isCollection == 0"
                      src="http://img.meiduduo.com/images/info/details4.png?10"
                    />
                    <cover-image
                      class="video-handle"
                      v-if="videoInfo.isCollection != 0"
                      src="http://img.meiduduo.com/images/mine/item121.png"
                    />
                    <!-- span -->
                    <cover-view class="count">收藏 {{videoInfo.favouriteNum}}</cover-view>
                  </cover-view>
                </cover-view>
              </cover-view>
            </cover-view>
            <cover-view
              v-show="!videofullScreen"
              class="video-bottom2"
              @click.stop="switchFullScreen(true)"
            >全屏</cover-view>
          </video>
        </div>
        <!-- 视频详情描述 -->
      </div>
      <div class="btm" v-show="!videofullScreen">
        <div class="box">
          <div class="title">
            <div class="person">
              <!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
              <img :src="videoInfo.authorIcon" alt>
              {{videoInfo.authorName}}
            </div>
            <div
              class="focus-btn"
              v-show="!videoInfo.isFollow&&!isSelf"
              @click="clickFollow(videoInfo.author,1)"
            >+关注</div>
            <div
              class="active-focus-btn"
              v-show="videoInfo.isFollow&&!isSelf"
              @click="clickFollow(videoInfo.author,-1)"
            >
              <i-icon type="right" color="#999"/>已关注
            </div>
          </div>
          <div class="content">
            <!-- <rich-text :nodes="videoInfo.content"></rich-text>    -->
            <wxparse :content="videoInfo.content ? removeBr(videoInfo.content) : ''" noData></wxparse>
            <!-- {{videoInfo.content}} -->
          </div>
          <!-- 底部点赞 -->
          <div class="content-bottom">
            <!-- <div>{{videoInfo.releaseTime}}</div>
            <div>{{videoInfo.fabulousNum}}次赞 {{videoInfo.favouriteNum}}次收藏</div>-->
            <div style="display:flex;align-item:center;" class="lb-r">
              <i-icon type="browse" size="16"/>
              <span class="pp">{{ videoInfo.readNum }}</span>
            </div>
            <div style="display:flex;align-item:center;" class="lb-r">
              <i-icon
                type="message"
                size="16"
                style="display:flex;align-item:center;text-align: center;"
              />
              <span class="pp">{{ commentTotal}}</span>
            </div>
            <div
              style="display:flex;align-item:center;"
              class="thumbbox lb-r"
              @click="changeThumbs(videoInfo.id)"
            >
              <i-icon
                type="praise_fill"
                size="16"
                style="display:flex;align-item:center;text-align: center;"
                color="#ff4691"
                v-if="videoInfo.isThumbsUp"
              />
              <i-icon
                type="praise"
                size="16"
                style="display:flex;align-item:center;text-align: center;"
                v-else
              />
              <span class="pp">{{ videoInfo.fabulousNum }}</span>
            </div>
          </div>
        </div>
        <!-- 广告图片 -->
        <div class="advert" v-if="adList.length>0">
          <img
            :src="skipParam1.pictureUrl"
            style="width:100%"
            alt
            mode="widthFix"
            @click="advertGo(skipParam1)"
          >
        </div>

        <!-- 相关视频 -->
        <div class="relevant" v-if="relevantList.length>0">
          <div class="retitle">相关视频</div>
          <div class="relevant-list">
            <videoPropose
              v-for="(v,i) in relevantList"
              :key="i"
              :arti="v"
              @videoDetail="videoDetail"
            />
          </div>
        </div>
        <!-- 评论 -->
        <div class="box comment">
          <div class="comment-title">
            <div class="title-bold">评论</div>
            <div @click="toAllComment()" style="display:flex;align-items:center;color:#999;">
              <div class="comment-num">共{{commentTotal}}条评论</div>
              <i-icon type="enter" size="16"/>
            </div>
          </div>
          <div class="comment-list">
            <div v-show="commenList&&commenList.length==0" style="padding:10rpx 15rpx">暂无评论</div>
            <div
              class="comment-item"
              v-for="(item,index) in commenList"
              :key="index"
              v-if="index<2"
            >
              <div class="item-img">
                <img :src="item.icon" alt>
              </div>
              <div style="display:flex;flex:1;flex-direction:column;">
                <div class="item-name">
                  <div class="recommend-name">{{item.nickName}}</div>

                  <div class="item-social" @click="changeCommThumbs(item)">
                    <img
                      class="video-handle"
                      v-show="!item.isThumbsUp"
                      src="http://img.meiduduo.com/images/info/zan1.png"
                      alt
                    >
                    <img
                      class="video-handle"
                      v-show="item.isThumbsUp"
                      src="http://img.meiduduo.com/images/info/zan2.png"
                      alt
                    >
                    <span style="color:#999;margin-left:10rpx">{{item.fabulousNum}}</span>
                  </div>
                </div>
                <div class="item-content">
                  <div>{{item.content}}</div>
                  <div class="child-content" v-show="item.children && item.children.length>0">
                    <div
                      class="child-content-item"
                      v-for="(child,i) in item.children"
                      :key="i"
                      v-if="i<10"
                    >
                      <span class="child-name ellipsis">{{child.nickName}}</span>
                      <span style="float:left">：</span>
                      <span class="child-text">{{child.content}}</span>
                    </div>
                  </div>
                </div>
                <div class="item-time">
                  {{item.createDate}}
                  <span class="reply detailC" @click="reply(item)">回复</span>
                </div>
              </div>
            </div>
          </div>
          <writeComment
            v-if="writeCommentS"
            v-bind:writeItem="writeItem"
            @send="refreshComm"
            @sendStatusM="sendStatusM"
            @blurChange="blurChange"
          ></writeComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import writeComment from "../comm/writeComment";
import writeComment from "../pages/comm/writeComment";
import loading from "../pages/comm/loading";
import wxparse from "mpvue-wxparse";
import videoPropose from "./comm/videoPropose";
import { removeBrTag } from "../utils/util.js";
import LOGIN from "../utils/login.js";

export default {
  data() {
    return {
      show: true,
      custId: this.$store.state.userInfo.custId,
      id: "",
      videoContext: "",
      videofullScreen: true,
      currentTime: "",
      duration: "",
      waiting: true,
      videoPlaying: true,
      playingIcon: {
        yes: "http://img.meiduduo.com/images/info/play.png",
        no: ""
      },
      controls: true,
      fullScreen: false,
      showPlayBtn: false,
      focus: false,
      placeholder: "写评论...",
      videoInfo: {},
      commenList: [],
      relevantList: [],
      writeItem: {
        write1: true,
        write2: false,
        sendStatus: false,
        contentId: "",
        custId: "",
        criticId: "",
        commentId: "",
        commentType: ""
      },
      writeCommentS: false,
      commentTotal: 0,
      adList: [],
      skipParam1: {}
    };
  },
  components: {
    writeComment,
    wxparse,
    loading,
    videoPropose
  },
  computed: {
    isSelf() {
      return this.videoInfo.author == this.$store.state.userInfo.custId;
    }
  },
  onPullDownRefresh() {
    this.refreshComm();
  },
  //监听分享的回调
  onShareAppMessage(res) {
    return {
      title: `${this.videoInfo.title}`,
      path: `/pagesShow/video_info?id=${this.videoInfo.id}&custId=${
        this.$store.state.userInfo.custId
      } &share=1`,
      imageUrl: this.videoInfo.cover,
      success: res => {
        console.log("分享成功");
        console.log(res);
      },
      fail: res => {
        console.log("转发失败", res);
      }
    };
  },
  methods: {
    advertGo(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertCost/updateAdvertClickNumber",
          {
            advertId: item.advertId
          }
        )
        .then(res => {
          if (res.code == 1) {
            this.changeJump(item.skipParam.url, {
              id: item.skipParam.id,
              type: item.skipParam.wordtype,
              custId: this.$store.state.userInfo.custId
            });
          }
        });
    },

    //获取头条医美数据流的广告
    //获取头条医美数据流的广告
    getAdvert() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2PX30",
            areaId: this.$store.state.curCityId
          }
        )
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            let b = res.data;
            b.forEach(v => {
              v.skipParam = JSON.parse(v.skipParam);
              let info = "";
              let wordtype = 0;
              switch (Number(v.advertType)) {
                case 0:
                  info = "/pagesShow/activityAdvert";
                  break;
                case 1:
                  info = "/pagesShop/orgin";
                  break;
                case 2:
                  info = "/pagesShop/doctor_detail";
                  break;
                case 3:
                  info = "/pagesShop/productDetails";
                  break;
                case 4:
                  info = "/pagesShow/information";
                  wordtype = 10;
                  break;
                case 5:
                  info = "/pagesShow/information";
                  wordtype = 4;
                  break;
                case 6:
                  info = "/pagesMine/index";
                  break;
                case 7:
                  info = "";
                  wordtype = 4;
                  break;
              }

              v.skipParam.url = info;
              v.skipParam.wordtype = wordtype;
            });
            this.adList = b;
            this.skipParam1 = b[0];
          }
        });
    },
    removeBr(str) {
      return removeBrTag(str);
    },
    videoDetail(msg) {
      // console.log(msg);
      this.$router.replace({
        path: "/pagesShow/video_info.1",
        query: {
          id: msg.id,
          columnId: msg.columnId
        }
      });
    },
    // xyy editor
    goRegiest() {
      if (this.$route.query.share) {
        if (!this.user.openid || !this.user.custId) {
          this.$store.commit("setInvited", {
            invited: true
          });
          console.log("商品页判断是否已注册");
          LOGIN("/pagesShow/video_info", this.$route.query);
        } else {
          // this.getDetail();
          this.getCommenList(this.$route.query.id, "9", 1, 15);
        }
      }
    },
    toAllComment() {
      if (this.commentTotal == 0) {
        return;
      }
      this.$router.push({
        path: "/pagesShow/global/allComment",
        query: {
          id: this.videoInfo.id,
          commentType: 9
        }
      });
    },
    videoError() {
      this.videoPlaying = true;
    },
    waiting() {
      this.videoPlaying = true;
      this.waiting = true;
    },
    beginPlay() {
      console.log("beginPlay");
      this.waiting = false;
      this.videoPlaying = true;
    },
    videoPlay() {
      this.videoContext.play();
      this.videoPlaying = true;
    },
    // 暂停
    videoPause() {
      // this.videoContext.pause();
      // this.videoPlaying = !this.videoPlaying;
      // if(!this.waiting){
      //     this.videoContext.pause()
      //     this.videoPlaying =  false
      // }

      if (this.videoPlaying) {
        this.videoContext.pause();
        this.videoPlaying = false;
      } else {
        this.videoPlay();
      }
    },
    timeChange(e) {
      this.currentTime = e.mp.detail.currentTime;
      this.duration = e.mp.detail.duration;
    },
    switchFullScreen(flag) {
      this.$set(this, "videofullScreen", flag);
    },
    getVideoInfo(id) {
      this.$http
        .post("/smallVideo/queryOneByPkAndUserId", {
          id,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          console.log("视频信息:", res);
          if (res.code == "1") {
            this.show = false;
            this.videoInfo = res.data;
            this.writeCommentS = true;
            this.getRelevantVideo(res.data.columnId);
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    clickThumbs(flag) {
      flag
        ? (this.videoInfo.fabulousNum -= 1)
        : (this.videoInfo.fabulousNum += 1);
      this.videoInfo.isThumbsUp = !flag;
    },
    // 视频点赞
    changeThumbs(id) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = this.videoInfo.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: id,
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
              this.videoInfo.fabulousNum += 1;
              this.videoInfo.isThumbsUp = 1;
            } else {
              this.videoInfo.fabulousNum -= 1;
              this.videoInfo.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    // 评论点赞
    changeCommThumbs(item) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = item.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "11",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              item.fabulousNum += 1;
              item.isThumbsUp = 1;
            } else {
              item.fabulousNum -= 1;
              item.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    // 收藏
    changeCollect(id) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = this.videoInfo.isCollection ? -1 : 1;
      this.$http
        .post("/storeRecord/save", {
          recordId: id,
          custId: this.$store.state.userInfo.custId,
          recordType: "9",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.videoInfo.favouriteNum += 1;
              this.videoInfo.isCollection = 1;
            } else {
              this.videoInfo.favouriteNum -= 1;
              this.videoInfo.isCollection = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    clickCollect(flag) {
      flag
        ? (this.videoInfo.favouriteNum -= 1)
        : (this.videoInfo.favouriteNum += 1);
      this.videoInfo.isCollection = !flag;
    },
    // 关注
    clickFollow(author, state) {
      let type = "";
      if (this.videoInfo.createType == 0 && this.videoInfo.authorType == 0) {
        type = 2;
      } else {
        type = 6;
      }
      console.log(author);
      // wx.showLoading({
      //   mask: true,
      //   title: "加载中"
      // });
      this.$http
        .post("/focusRecord/save", {
          recordId: author,
          custId: this.$store.state.userInfo.custId,
          recordType: type,
          state
        })
        .then(res => {
          // console.log(res);
          // wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.videoInfo.isFollow = 1;
            } else {
              this.videoInfo.isFollow = 0;
            }
            this.$store.commit("backauthorChange", {
              id: author,
              status: state
            });
          }
        });
    },
    // 获取评论列表
    getCommenList(contentId, commentType, pageNum, pageSize) {
      this.$http
        .post("/comment/list4Page", {
          custId: this.$store.state.userInfo.custId,
          contentId,
          commentType,
          pageNum,
          pageSize
        })
        .then(res => {
          console.log("评论列表:", res);
          if (res.code == "1") {
            this.writeCommentS = true;
            this.commenList = res.data.data ? res.data.data : [];
            this.commentTotal = res.data.total ? res.data.total : 0;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    // 回复评论
    reply(item) {
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "focus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.custId);
      this.$set(this.writeItem, "place", "回复" + item.nickName);
    },
    refreshComm() {
      this.getCommenList(this.videoInfo.id, "9", 1, 15);
    },
    sendStatusM(data) {
      console.log(data);
      this.$set(this.writeItem, "sendStatus", false);
      console.log(this.writeItem.sendStatus);
    },
    blurChange() {
      this.$set(this.writeItem, "focus", false);
      this.$set(this.writeItem, "place", "");
    },
    // 相关视频
    getRelevantVideo(columnId) {
      this.$http
        .post("/smallVideo/list4PageForApp", {
          columnId
        })
        .then(res => {
          // console.log('相关视频:',res);
          if (res.code == "1") {
            let ret = res.data.data ? res.data.data : [];
            ret.forEach(element => {
              if (element.id != this.videoInfo.id) {
                this.relevantList.push(element);
              }
            });
            // console.log(this.relevantList);
            // this.relevantList = res.data.data
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    clickToVideoinfo(item) {
      this.$router.replace({
        path: "/pagesShow/video_info",
        query: {
          id: item.id,
          channelCode: item.channelCode
        }
      });
      // wx.navigateTo({
      //   url:'/pagesShow/video_info?id='+item.id
      // })
      // this.$router.push({
      //   path: "./video_info",
      //   query: {
      //     id: item.id,
      //     channelCode: item.channelCode
      //   }
      // });
    }
  },
  onUnload() {
    this.writeCommentS = false;
    console.log(
      this.commentTotal,
      this.videoInfo.isFollow && !this.isSelf,
      this.videoInfo.fabulousNum
    );
    this.$store.commit("backItemChange", {
      len: this.commentTotal,
      num: this.videoInfo.fabulousNum,
      colNum: this.videoInfo.favouriteNum,
      colStatus: this.videoInfo.isCollection,
      read: ""
    });
  },
  onLoad(options) {
    this.custId = this.$store.state.userInfo.custId;
    // this.$set(this,'videofullScreen', true)
    this.videoPlaying = true;
    // 记录回复视频id
    this.$set(this.writeItem, "contentId", options.id);
    // 记录评论类型
    this.$set(this.writeItem, "commentType", 9);
    this.$set(this.writeItem, "custId", this.$store.state.userInfo.custId);
    this.videoContext = wx.createVideoContext("video");
    this.relevantList = [];
    this.getVideoInfo(options.id);
    //获取评论
    this.getCommenList(options.id, "9", 1, 15);
    // setTimeout(() => {
    //   this.getRelevantVideo(options.columnId);
    // }, 300);

    // xyy editor
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onShow() {
    this.videoInfo = {};
    this.videofullScreen = true;
    this.getVideoInfo(this.writeItem.contentId);
    //获取评论
    this.getCommenList(this.writeItem.contentId, "9", 1, 15);
    this.getAdvert();
  },
  watch: {
    focus(val) {
      this.placeholder = val ? "回复" : "写评论...";
    }
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
/* .relevant .video-item .desc{
    padding: 10rpx;
} */
.desc {
  padding: 0 10rpx;
  height: 76rpx;
  line-height: 38rpx;
  overflow: hidden;
}
.desc,
.desc .wxParse {
  /* word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: auto;
  max-height: 76rpx;
  line-height: 38rpx;
}
.item-social {
  font-size: 26rpx;
  width: 40%;
  text-align: right;
}
.item-social img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 4rpx;
}
.relevant {
  overflow: hidden;
}
.relevant .retitle {
  height: 90rpx;
  padding: 0 24rpx;
  border-bottom: 1rpx solid #f1f1f1;
  line-height: 90rpx;
  background: #fff;
  color: #333;
  font-size: 15px;
  font-weight: bold;
}
.relevant-list {
  padding: 15rpx 13rpx;
  overflow: hidden;
  background: #fff;
  font-weight: bold;
}
.video.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  /* height:100%; */
}
.video.nofullScreen {
  height: 650rpx;
}
.video video {
  height: 100%;
  /* height:auto;
    bottom:300rpx;
    position:absolute;
    top:0; */
}
.video.nofullScreen video {
  bottom: 14rpx;
}
.video-bo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background: #000;
}
.nofullScreen .video-bo {
  height: 20rpx;
}
.video video .playing {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90rpx;
  height: 90rpx;
  z-index: 10;
  /* background: red; */
}
.relevant .video-item {
  width: 355rpx;
  margin: 5rpx;
  /* width: 50%; */
  float: left;
  /* padding: 11rpx; */
  box-sizing: border-box;
  border-radius: 8rpx;
  border: 1rpx solid #f1f1f1;
}
.relevant .video-top {
  position: relative;
}
.relevant .video-top .playbtn {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}
.relevant .video-top .postimg {
  display: inline-block;
  width: 100%;
  /* height: 400rpx; */
  min-height: 280rpx;
  max-height: 400rpx;
}

.relevant .video-item .author {
  padding: 10rpx;
  overflow: hidden;
}

.author .author-box {
  float: left;
}
.author .author-box2 {
  float: right;
}
.author .desc {
  font-size: 16rpx;
}
.author .avatar {
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 14rpx;
  vertical-align: middle;
}
.author .nicknamer {
  display: inline-block;
  color: #333;
  font-size: 22rpx;
}
.author .collect {
  display: inline-block;
  width: 28rpx;
  height: 24rpx;
  vertical-align: middle;
}
.author .count {
  font-size: 24rpx;
  color: #999;
  margin-left: 6rpx;
  font-weight: normal;
}
.video-box {
  width: 50%;
  float: left;
}
.video-info {
  background: #f1f1f1;
  font-size: 14px;
  color: #333;
  padding-bottom: 90rpx;
}
.box {
  background: #fff;
  margin-bottom: 0.18rem;
}
.top {
  position: relative;
}
.coverview {
  position: absolute;
  bottom: 110rpx;
  left: 30rpx;
  right: 30rpx;
  color: #fff;
}
.video-info .video {
  cursor: pointer;
}
.video-info .video video {
  cursor: pointer;
  width: 100%;
}
.video-info .video-detail .avatar {
  display: inline-block;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  vertical-align: middle;
}
.video-detail .nickname {
  display: inline-block;
  color: #fff !important;
  font-size: 30rpx;
  vertical-align: middle;
  width: 400rpx;
}
.video-detail .detail-text {
  float: left;
  height: 36rpx;
  width: 564rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-detail .more {
  float: right;
  height: 36rpx;
  padding: 10rpx;
  /* margin-top:26rpx; */
}
.video-bottom2 {
  position: absolute;
  right: 30rpx;
  bottom: 100rpx;
  color: #fff;
  font-size: 26rpx;
  padding: 10rpx;
}
.video-bottom .zan {
  display: inline-block;
  margin-right: 60rpx;
}
.video-bottom .zan .count {
  display: inline-block;
  vertical-align: middle;
  padding-right: 12rpx;
}
.video-info .video-bottom .video-handle {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 12rpx;
}
.title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  border-bottom: 1px solid #dddddd;
  margin: 0 0.3rem 30rpx;
}
.person {
  width: 500rpx;
  height: 0.88rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 32rpx;
  color: #333;
  white-space: nowrap;
}
.person img {
  width: 0.88rem;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 0.3rem;
}
.follow {
  width: 1.2rem;
  height: 0.56rem;
  line-height: 0.56rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  background: #ff4691;
  border-radius: 0.1rem;
}

.content {
  margin: 0 0.3rem;
  margin-bottom: 0.5rem;
}
.content-bottom {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  font-size: 0.24rem;
  color: #999999;
  margin: 0 0.3rem;
  padding-bottom: 0.2rem;
}
.lb-r {
  margin-right: 15px;
}
.lb-r span {
  margin-left: 5px;
}
.comment-title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  height: 0.9rem;
  padding: 0 0.24rem;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 0.2rem;
}
.title-bold {
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
}
.comment-list {
  margin: 0 0.3rem 0 0.2rem;
  padding-bottom: 20rpx;
}
.comment-num {
  font-size: 0.24rem;
  color: #999;
}
.comment-item {
  display: flex;
  display: -webkit-flex;
  margin-bottom: 0.24rem;
}
.item-img {
  margin-right: 0.2rem;
}
.item-img img {
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 50%;
}
.item-name {
  font-size: 0.28rem;
  color: #1a518b;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.item-name .recommend-name {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #3f6ba6;
  font-size: 14px;
}
.item-time {
  color: #999;
  font-size: 0.24rem;
}
.reply {
  padding: 18rpx 18rpx 18rpx 0;
  color: #ff4691;
}
.reply.detailC {
  font-size: 22rpx !important;
}
.item-content {
  font-size: 0.32rem;
  line-height: 0.42rem;
  color: #333;
  margin-bottom: 0.1rem;
  margin-top: 10rpx;
}
.comment-input {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  height: 0.82rem;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 50rpx;
  border-top: 1px solid #eee;
  position: relative;
}
.comment-input img {
  width: 0.34rem;
  height: 0.34rem;
  vertical-align: middle;
}
.comment-input .place {
  position: absolute;
  left: 75rpx;
  top: 28rpx;
  width: 28rpx;
  height: 20rpx;
}
.comment-input input {
  box-sizing: border-box;
  /* width: 5.13rem; */
  width: 100%;
  height: 0.54rem;
  border-radius: 0.26rem;
  padding: 0 0.5rem 0 0.6rem;
  background: #f1f1f1;
  /* background: url('http://img.meiduduo.com/images/info/input_bg.png') no-repeat left center #F1F1F1; */
}
.input-right {
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  width: 2rem;
  padding: 0 0.5rem;
}
.message {
  position: relative;
}
.message span {
  position: absolute;
  display: inline-block;
  /* width: 100%; */
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: #ff4691;
  color: #fff;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
}
.advert {
  width: 100%;
  height: 220rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}
</style>
