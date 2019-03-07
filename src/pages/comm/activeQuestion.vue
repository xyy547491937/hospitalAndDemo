<template>
  <div class="c" @click="toInfo">
    <div class="question-list">
      <!-- editor xyy 问答的模块 -->
      <!-- 头像以及关注标签 -->
      <div class="quest-message flex-r s-padding">
        <div class="flex-r user-message">
          <!-- <img src="http://img.meiduduo.com/images/index/pt_bg.png" alt=""> -->
          <img :src="question.authorIcon" alt>
          <div class="user-name xyy-ellipsis-1">
            <span>{{question.authorName}}</span>
            <!-- <span>啾啾mie</span> -->
          </div>
        </div>
        <!-- 关注 -->
        <div class="gz" v-if="!isSelf">
          <div
            class="focus-btn"
            v-if="!question.isFollow && !isSelf"
            @click.stop="clickFollow(1)"
          >+关注</div>
          <div
            :class="{'active-focus-btn':question.isFollow && !isSelf}"
            v-if="question.isFollow && !isSelf"
            @click.stop="clickFollow(-1)"
          >
            <i-icon type="right" color="#999"/>已关注
          </div>
          <!-- <div>已关注</div> -->
          <!-- <i-button bind:click="handleClick" shape="circle" size="small" i-class="colors"> +关注</i-button> -->
        </div>
      </div>
      <!-- <p class="title">生日属相解答你们是否合适？</p> -->
      <p class="inner s-padding">
        <wxparse v-if="detailCode==2" :content="question.title ? removeBr(question.title) : ''" noData></wxparse>
        <wxparse v-else :content="question.content ? removeBr(question.content) : ''" noData></wxparse>
        <!-- {{video.content}} -->
      </p>
      <!-- <p class="label"> <span>
      <i-icon type="label" /></span></p>-->
      <div class="article-img flex-r" v-if="imgBefore || imgAfter">
        <div class="gride">
          <img :src="imgBefore" mode="widthFix" alt>
        </div>
        <div style="width:9px" v-if="imgBefore&&imgAfter"></div>
        <div class="gride" v-if="imgAfter">
          <img :src="imgAfter" mode="widthFix" alt>
          <!-- <img src="http://img.meiduduo.com/images/index/pt_bg.png" alt=""> -->
        </div>
      </div>

      <div class="read-num-box flex-r">
        <div class="c">
          <span>{{question.shortTimeString}}</span>
        </div>
        <div class="flex-r read-num">
          <p style="display:flex;align-item:center">
            <i-icon type="browse" size="16" style="display:flex;align-item:center"/>
            <span class="pa">{{question.readNum}}</span>
          </p>
          <p style="display:flex;align-item:center">
            <i-icon type="message" size="16" style="display:flex;align-item:center"/>
            <span class="pa">{{question.commentNum}}</span>
          </p>
          <p
            style="display:flex;align-item:center"
          >
            <!-- <i-icon type="praise" size="16" style="display:flex;align-item:center"/> -->
            <span class="pa">赞{{question.fabulousNum}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="writeComment1" v-if="isShow">
      <input name="input1" v-model="content" :focus="true">
      <span class="send" @click="comment">发布</span>
    </div>
  </div>
</template>
<script>
import wxparse from "mpvue-wxparse";
import { removeBrTag } from "../../utils/util.js";
export default {
  data() {
    return {
      isShow: false,
      item: {},
      isSelf: false
    };
  },
  props: {
    question: {
      type: Object,
      default: {}
    },
    detailCode: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    }
  },
  components: {
    wxparse
  },
  onLoad() {
    let question = this.question;
    question.fabulousNum = question.fabulousNum ? question.fabulousNum : 0;
    this.isSelf = this.question.author == this.$store.state.userInfo.custId;
  },
  onShow() {
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    imgBefore() {
      let str = this.question.cover ? this.question.cover.split(",")[0] : "";
      return str;
    },
    imgAfter() {
      let str = this.question.cover.split(",")[1]
        ? this.question.cover.split(",")[1]
        : "";
      return str;
    }
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str);
    },
    show(item) {
      this.item = item;
      this.isShow = true;
    },
    toInfo() {
      console.log(this.index)
      this.$store.state.backItem.read = ''
      this.$store.commit('backIndexChange',this.index)
      this.$router.push({
        path: "/pagesShow/information",
        query: {
          id: this.question.id,
          type: 8
        }
      });
    },
    // 关注
    clickFollow(state) {
      if (this.question.author == this.$store.state.userInfo.custId) {
        return;
      }
      // wx.showLoading({
      //   mask: true,
      //   title: "加载中"
      // });
      this.$http
        .post("/focusRecord/save", {
          recordId: this.question.author,
          custId: this.$store.state.userInfo.custId,
          recordType: 6,
          state
        })
        .then(res => {
          // console.log(res);
          // wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.question.isFollow = 1;
            } else {
              this.question.isFollow = 0;
            }
            this.$emit("followBus", this.question.author, state);
          }
        });
    },
    changeThumbs() {
      let state = this.question.isThumbsUp ? -1 : 1;
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http
        .post("/customerRecord/save", {
          recordId: this.question.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "8",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              this.question.fabulousNum += 1;
              this.question.isThumbsUp = 1;
            } else {
              this.question.fabulousNum -= 1;
              this.question.isThumbsUp = 0;
            }
          }
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
@import url("~mpvue-wxparse/src/wxParse.css");
.article-img {
  display: flex;
  justify-content: space-around;
  margin-top: 6rpx;
}
.article-img .gride {
  flex: 1;
  max-height: 350rpx;
  overflow: hidden;
  border-radius: 10rpx;
}
.article-img .gride img {
  width: 100%;
  height: 350rpx;
  border-radius: 10rpx;
}
.writeComment1 {
  position: fixed;
  bottom: 0;
  z-index: 100;
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
.video-handle {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 12rpx;
}

.question-list {
  margin-bottom: 10px;
  font-size: @baseSize;
  color: @baseTextColor-c;
  background-color: @base-white;
  padding: @basePadding 0;
  border-radius: 10px;

  & > .quest-message {
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    & > .user-message {
      align-items: center;
      width: 65%;

      & > img {
        display: block;
        max-width: 0.6rem;
        max-height: 0.6rem;
        border-radius: 50%;
      }

      & > .user-name {
        margin-left: 10px;
        font-size: 30rpx !important;
        color: #333 !important;
        font-weight: bold;
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

  & > .title {
    color: @baseFirstTitleColor;
    font-weight: bold;
    padding: 10px 0;
  }

  & > .inner {
    // &:extend(.s-padding);
    line-height: 20px;
    padding: 14rpx 30rpx 10rpx 30rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  & > .label {
    color: @baseColor;
    padding: 10px 0;
  }

  & > .read-num-box {
    font-size: #999;
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
</style>
