<template>
  <div class="c" @click="toInfomation(article)">
    <div class="riji">
      <!-- editor xyy 问答的模块 -->
      <div class="quest-box">
        <!-- 头像以及关注标签 -->
        <div class="quest-message flex-r s-padding">
          <div class="flex-r user-message">
            <div class="img-b">
              <img :src="article.authorIcon" alt>
              <!-- <img src="http://img.meiduduo.com/images/index/nav_yiye.png" alt> -->
              <span class="member-user"></span>
            </div>
            <div class="user-name xyy-ellipsis-1">
              <span class>{{article.authorName}}</span>
            </div>
          </div>
          <!-- 关注 -->
          <!-- <div class="gz" v-if="!isSelf">
            <div class="focus-btn" v-if="!article.isFollow" @click.stop="clickFollow(1)">+关注</div>
            <div
              class
              v-if="article.isFollow"
              :class="{'active-focus-btn':article.isFollow}"
              @click.stop="clickFollow(-1)"
            >
              <i-icon type="right" color="#999"/>已关注
            </div>
          </div>-->
        </div>
        <!-- <p class="inner s-padding acticle-title">
          <wxparse :content="article.title ? removeBr(article.title) : ''" noData></wxparse>
        </p>-->
      </div>
      <!--  视屏区域 -->
      <!--  视屏区域 -->
      <div class="live-box" v-if="img[0] || img[1]||img[2]">
        <!--  文章图片 -->
        <div class="article-img flex-r" v-if="img[0] || img[1] || img[2]">
          <div class="gride-2">
            <img :src="img[0]" alt mode="widthFix">
          </div>
          <div style="width:9px" v-if="img[0] && img[1] &&img[2]"></div>
          <div class="gride-2" v-if="img[0] && img[1] &&img[2]">
            <img :src="img[1]" alt mode="widthFix">
          </div>
          <div style="width:9px" v-if="img[0] && img[1]&&img[2]"></div>
          <div class="gride-2" v-if="img[0] && img[1]&&img[2]">
            <img :src="img[2]" alt mode="widthFix">
          </div>
        </div>
      </div>
      <div class="live-ttile-abstract">
        <p class="live-title-p">
          <wxparse :content="article.title ? removeBr(article.title) : ''" noData></wxparse>
        </p>
        <p class="live-abstract-p overflow-3-lines">{{article.abstractContent}}</p>
      </div>
      <div class="read-num-box flex-r">
        <div class="c">
          <span class="advert-tag">广告</span>
          <span>{{article.shortTimeString}}</span>
        </div>
        <div class="flex-r read-num">
          <p style="display:flex;align-item:center">
            <i-icon type="browse" size="16" style="display:flex;align-item:center"/>
            <span class="pa">{{article.readNum}}</span>
          </p>
          <p style="display:flex;align-item:center">
            <i-icon type="message" size="16" style="display:flex;align-item:center"/>
            <span class="pa">{{article.commentNum}}</span>
          </p>
          <p class="thumbbox" style="display:flex;align-item:center">
            <span class="pa">赞{{article.fabulousNum}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wxparse from "mpvue-wxparse";
import { removeBrTag } from "../../utils/util.js";
export default {
  props: ["data", "article", "index"],
  data() {
    return {
      item: {}
    };
  },
  components: {
    wxparse
  },
  onLoad() {
    let article = this.article;
    article.fabulousNum = article.fabulousNum ? article.fabulousNum : 0;
  },
  onShow() {},
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    img() {
      let str = this.article.cover;
      return [str.split(",")[0], str.split(",")[1], str.split(",")[2]];
    },
    isSelf() {
      return this.article.author == this.$store.state.userInfo.custId;
    },
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str);
    },
    //点击广告位
    toInfomation(item) {
      const { skipParam } = item;
      this.$http
        .post(this.httpUrl + "/sys/advertCost/updateAdvertClickNumber", {
          advertId: item.advertId
        })
        .then(res => {
          if (res.code == 1) {
            this.$store.state.backItem.read = "";
            this.$store.commit("backIndexChange", this.index);
            this.$router.push({
              path: "/pagesShow/information",
              query: {
                id: JSON.parse(skipParam).id,
                type: JSON.parse(skipParam).type
              }
            });
          }
        });
    },
    // 关注
    clickFollow(state) {
      if (this.article.author == this.$store.state.userInfo.custId) {
        return;
      }
      let type = "";
      if (this.article.createType == 0 && this.article.authorType == 0) {
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
          recordId: this.article.author,
          custId: this.$store.state.userInfo.custId,
          recordType: type,
          state
        })
        .then(res => {
          // console.log(res);
          // wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.article.isFollow = 1;
            } else {
              this.article.isFollow = 0;
            }
            this.$emit("followBus", this.article.author, state);
          }
        });
    },
    // 点赞
    changeThumbs() {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = this.article.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: this.article.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "10",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.article.fabulousNum += 1;
              this.article.isThumbsUp = 1;
            } else {
              this.article.fabulousNum -= 1;
              this.article.isThumbsUp = 0;
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
<style lang="css">
.wxParse {
  font-size: 16px !important;
  color: #333 !important;
}
</style>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.acticle-title {
  margin-top: 14rpx;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.writeComment1 {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
.thumbbox.active {
  color: #ff4691 !important;
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

.riji {
  margin-bottom: 10px;
  font-size: @baseSize;
  color: @baseTextColor-c;
  background-color: @base-white;
  padding: 30rpx 0 !important;
  border-radius: 20rpx;

  & > .quest-box {
    padding: 0 30rpx 20rpx 30rpx;

    & > .quest-message {
      justify-content: space-between;
      align-items: center;
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
          // border: 1rpx solid #000;
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
          font-size: 32rpx;

          & span:first-child {
            color: @baseSconedTitleColor;
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
    padding: 0;
  }

  & > .live-box {
    max-height: 165px;
    width: 100%;

    & > .live {
      width: 100%;
      height: 100%;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }

      & > .pause {
        width: 60px;
        height: 60px;
        display: block;
        background-image: url("http://img.meiduduo.com/images/info/play.png");
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        margin-top: -30px;
        margin-left: -30px;
        background-position: center;
        background-size: 100%;
      }
    }
    & > .article-img {
      width: 100%;
      & > .gride-2 {
        // width: 50%;
        flex: 1;
        border-radius: 10rpx;
        max-height: 165px;
        overflow: hidden;
        & > img {
          //   box-shadow: 10px 10px 5px #888888;
          border-radius: 10rpx;
          display: block;
          width: 100%;
        }
      }
    }
  }

  & > .label {
    color: @baseColor;
    padding: 10px 0;
  }

  & > .read-num-box {
    font-size: 25rpx !important;
    align-content: center;
    justify-content: space-between;
    padding: 0 @basePadding;
    margin-top: @basePadding;

    .read-num {
      width: 50%;
      justify-content: space-between;
      // justify-content: flex-end;

      //   justify-content: space-around;
      & > p {
        &:extend(.flex-r);
        align-items: right;
        justify-content: flex-end;

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
.live-ttile-abstract {
  color: #333;
  padding: 30rpx;
  box-sizing: border-box;
  > .live-title-p {
    font-size: 30rpx;
    margin-bottom: 28rpx;
  }
  > .live-abstract-p {
    font-size: 28rpx;
  }
}
.overflow-3-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.advert-tag {
  color: #ea526c;
  border: 1rpx solid #ea526c;
  padding: 0 6rpx;
  font-size: 20rpx;
  text-align: center;
  line-height: 20rpx;
  margin-right: 15px;
}
</style>
