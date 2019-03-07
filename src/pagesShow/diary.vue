<template>
<div>
  <loading v-if="!item.id"></loading>
  <div v-else id="info">
    <div class="info-top">
      <div class="author">
        <img class="fl avatar" :src="item.authorIcon" alt>
        <div class="fl name-time">
          <div class="name xyy-ellipsis-1">{{item.authorName}}</div>
          <div class="timer">{{item.createDate}}</div>
        </div>
        <div class="fr follow-box" v-if="!isSelf">
          <div class>
            <span @click="follow(item,1)" v-show="item.isFollow!=1 && !isSelf" class="focus-btn">+关注</span>
            <span
              @click="follow(item,-1)"
              v-show="item.isFollow==1 && !isSelf"
              class="active-focus-btn"
            >
              <i-icon type="right" color="#999" v-if="item.isFollow==1 && !isSelf"/>已关注
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="seemore" v-if="total>=1" @click="toDiaryBook(item)">
      <img class="book" src="http://img.meiduduo.com/images/info/book.png" alt>
      <span class="moretext">查看其余{{total}}篇日记</span>
      <img class="arrow" src="http://img.meiduduo.com/images/link.png" alt>
    </div>
    <div class="detail-box">
      <div @click.stop="jump(item.id)" class="detail">
        <img class="detailimg" src="http://img.meiduduo.com/images/info/diary_img1.png" alt>
        <div class="detail-text">
          <div class="title">{{item.commName }}</div>
          <div class="place">{{item.organName }}</div>
          <div class="name">
            {{item.personalName}} {{item.detailName}}
            <span class="money">￥{{item.rulePrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info-content">
      <wxParse :content="item.content ? removeBr(item.content) : ''" noData/>
      <!-- {{item.content}} -->
      <div class="afterimgs">
        <img v-for="(img,index) in afterimgs" :key="index" :src="img" alt>
      </div>
    </div>
    <div class="remain-box">
      <div class="remain" v-if="total>=1" @click="toDiaryBook(item)">
        <span class="remain-text">查看其余{{total}}篇日记</span>
        <i-icon class="enter" type="enter"/>
      </div>
    </div>

    <!-- <div class="box">
            <div class="consum">消费项目</div>
            <div class="project">
                <div class="title">切开双眼皮 切开法双眼皮 切开法割双眼皮</div>
                <div class="position">石家庄贵美人医疗美容医院</div>
                <div class="doctor">刘卓达 副主任医师 <span>￥2333</span></div>
            </div>
            <div class="consum-btn">
                <div>医院主页</div>
                <div>我要咨询</div>
            </div>
    </div>-->
    <div class="box comment">
      <div class="commnet-title">评论</div>
      <div class style="font-size:24rpx;color:#333;text-align:center;" v-show="comments && comments.length==0">暂无评论</div>
      <div class="comment-item" v-for="(items,index) of comments" :key="index">
        <div class="item-img">
          <img :src="items.icon" alt>
        </div>
        <div class="item-p">
          <div class="item-hos">
            <div class="nickname">{{items.nickName}}</div>
            <div class="item-num" @click="changeCommThumbs(items)">
              <img
                :src="items.isThumbsUp==1 ? 'http://img.meiduduo.com/images/info/zan2.png' : 'http://img.meiduduo.com/images/info/zan1.png'"
                alt
              >
              <span>{{items.fabulousNum}}</span>
            </div>
          </div>
          <div class="item-content">
            <!-- <div>{{items.content}}</div> -->
            <wxParse :content="items.content ? removeBr(items.content) : ''"/>
            <!-- 回复 -->
            <div class="child-content" v-show="items.children && items.children.length>0">
              <div class="child-content-item" v-for="(child,i) in items.children" :key="i" v-if="i<(items.isShow ? items.children.length : 2)">
                <span class="child-name ellipsis">{{child.nickName}}</span>
                <span style="float:left">：</span>
                <span class="child-text">
                  {{child.content}}
                  <!-- <wxParse :content="child.content ? removeBr(child.content) : ''" noData=""/> -->
                </span>
              </div>
              <div
                class="show-more"
                @click.stop="showMore(index)"
                v-if="items.children.length>2 && !items.isShow"
              >共{{ items.children.length }}条回复></div>
            </div>
          </div>
          <div class="item-footer">
            <div class="item-time">{{items.createDate}}</div>
            <span class="reply detailC" @click="reply(items)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <div class="toTop" v-if="topShow" @click="toTop">顶部</div>
    <writeComment
      :writeItem="writeItem"
      v-if="writeCommentS"
      @send="getComment"
      @blurChange="blurChange"
      @sendStatusM="sendStatusM"
    ></writeComment>
  </div>
</div>
</template>

<script>
import wxParse from "mpvue-wxparse";
//   import writeComment from '../comm/writeComment.vue' //广告位
import writeComment from "../pages/comm/writeComment";
import { removeBrTag } from "../utils/util.js";
import { timeBackMMDD } from "../utils/util.js";
import loading from "../pages/comm/loading";
export default {
  data() {
    return {
      topShow: false,
      type: "",
      id: "",
      item: {},
      afterimgs: [],
      comments: [],
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
      total: 0
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    isSelf() {
      return this.item.author == this.$store.state.userInfo.custId;
    }
  },
  onPageScroll(param) {
    if (param.scrollTop > 2000) {
      this.topShow = true;
    } else {
      this.topShow = false;
    }
  },
  components: {
    writeComment,
    wxParse,
    loading
  },
  onLoad() {
    // console.log(this.$store.state.userInfo.custId);
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getDiaryinfo();
    this.getComment();
    this.writeItem.commentType = 5;
    // 记录回复日记id
    this.writeItem.contentId = this.id;
    // 记录评论类型
    this.writeItem.custId = this.custId;
    // this.queryOneForDiaryBook(this.id)
    // this.getList(this.id)
  },
  onUnload() {
    this.writeCommentS = false;
    this.topShow = false;
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str);
    },
    toTop() {
      this.topShow = false;
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    toDiaryBook(item) {
      //    console.log(this.item.diaryBookId)
      this.$router.push({
        path: "/pagesShow/diary_info",
        query: {
          id: item.diaryBookId,
          type: 7
        }
      });
    },
    follow(item, state) {
      let option = {
        recordId: item.author,
        custId: this.$store.state.userInfo.custId,
        state,
        recordType: 6
      };
      // console.log(option);
      // return
      // wx.showLoading({
      //     mask:true,
      //     title:'加载中'
      // })
      this.$http.post("/focusRecord/save", option).then(res => {
        console.log(res);
        // wx.hideLoading()
        if (res.code == "1") {
          if (state == 1) {
            this.item.isFollow = 1;
          } else {
            this.item.isFollow = 0;
          }
          // this.$store.commit('backauthorChange',{id:item.author,status:option.state})
        }
      });
    },
    getDiaryinfo() {
      let option = {
        id: this.id,
        type: 1,
        userId: this.$store.state.userInfo.custId
      };
      this.$http.post("/diary/queryOneByPkAndUserId", option).then(res => {
        console.log("日记详情:", res);
        if (res.code == "1") {
          this.writeCommentS = true;
          res.data.createDate = timeBackMMDD(res.data.createDate);
          this.item = res.data;
          this.total = res.data.diaryBookNum;
          this.afterimgs = res.data.afterPhoto.split(",");
          // this.item.authorIcon = this.$store.state.userInfo.avatarUrl ?this.$store.state.userInfo.avatarUrl:''
        }
      });
    },
    getComment() {
      let option = {
        custId: this.$store.state.userInfo.custId,
        contentId: this.id,
        commentType: 5,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        console.log("comment:", res);
        this.writeCommentS = true;
        if (res.code == "1") {
          if (res.data.length == 0) {
            return;
          }
          res.data.data.forEach((ele, index) => {
            ele.isShow = false;
            ele.createDate = ele.createDate.slice(0, 10)
          });
          this.comments = res.data.data;
          // this.total = res.total
          // let arr = []
          // res.data.forEach(element => {
          //     arr.push(element)
          //     if(element.children.length>0){
          //         element.children.forEach(value=>{
          //             arr.push(value)
          //         })
          //     }
          // });
          // this.comments = arr
        }
      });
    },
    // 评论点赞
    changeCommThumbs(item) {
      let state = item.isThumbsUp ? -1 : 1;
      wx.showLoading({
          mask:true,
          title:'加载中'
      })
      this.$http
        .post("/customerRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "11",
          crType: "1",
          state
        })
        .then(res => {
          wx.hideLoading()
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
    // 回复评论
    reply(item) {
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "focus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.custId);
      this.$set(this.writeItem, "place", '回复'+item.nickName);
    },
    sendStatusM() {
      this.$set(this.writeItem, "sendStatus", false);
    },
    blurChange() {
      this.$set(this.writeItem, "focus", false);
      this.$set(this.writeItem, "place", '');
    },
    writeShow() {},
    showMore(index) {
      this.$set(this.comments[index], "isShow", true);
    },
    jump(id) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+" lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
/* .wxParse image{
    width: 200rpx!important;
    height: 200rpx!important;
} */
.afterimgs img {
  width: 100%;
  /* max-height: 200px; */
}
.wxParse .p {
  margin: 0;
}
#info {
  background: #f1f1f1;
}
/* 顶部信息 */
.info-top {
  padding: 10rpx 32rpx;
  background: #fff;
}
.info-top .author {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #f5f5f5;
}
.info-top .author .fl {
  float: left;
}
.info-top .author .fr {
  float: right;
}
.info-top .avatar {
  display: inline-block;
  width: 90rpx;
  height: 90rpx;
  margin-right: 24rpx;
  border-radius: 50%;
}
.info-top .name-time {
  height: 90rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  flex: 1;
}
.info-top .name {
  color: #333;
  font-size: 32rpx;
  font-weight: bold;
  max-width: 160px;
}
.info-top .timer {
  color: #999;
  font-size: 24rpx;
}
.info-top .follow-box .follow-text {
  color: #fa418c;
  font-size: 26rpx;
  border: 2rpx solid #fa418c;
  border-radius: 16rpx;
  padding: 4rpx 14rpx;
}
/* 查看更多 */
.seemore {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: #fff;
}
.seemore .book {
  display: inline-block;
  width: 24rpx;
  height: 28rpx;
}
.seemore .moretext {
  font-size: 28rpx;
  flex: 1;
  margin-left: 22rpx;
  color: #666;
}
.seemore .arrow {
  float: right;
  width: 14rpx;
  height: 18rpx;
}
/* 内容顶部栏 */
.detail-box {
  padding: 0 32rpx 32rpx;
  background: #fff;
}
.detail-box .detail {
  background: #fefdef;
  border: 2rpx solid #ffd35c;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
}
.detail-box .detail .detailimg {
  width: 96rpx;
  height: 142rpx;
}
.detail-box .detail .detail-text {
  display: inline-block;
  padding: 6rpx 14rpx;
  height: 130rpx;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
}
.detail-box .detail .title {
  color: #333;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-box .detail .title {
  color: #333;
  font-size: 28rpx;
}
.detail-box .detail .place {
  color: #999;
  font-size: 24rpx;
}
.detail-box .detail .name {
  color: #999;
  font-size: 24rpx;
}
.detail-box .detail .name .money {
  float: right;
}
/* 富文本 */
.info-content {
  padding: 10rpx 32rpx;
  color: #333;
  font-size: 24rpx;
  background: #fff;
}
/* 查看剩余 */
.remain-box {
  padding-top: 24rpx;
  background: #fff;
  text-align: center;
}
.remain {
  display: inline-block;
  margin: 0 auto;
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 21rpx 0 28rpx;
  background: #ff8bcd;
  border-radius: 32rpx;
}
.remain .remain-text {
  color: #fff;
  font-size: 28rpx;
}
.remain .enter {
  color: #fff;
}
.box {
  background: #fff;
  margin-bottom: 0.18rem;
}
.top {
  padding-bottom: 0.2rem;
}
.photo {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0.24rem;
}
.photo div {
  width: 3.5rem;
  height: 3.1rem;
  position: relative;
}
.photo img {
  width: 100%;
  height: 100%;
}
.photo .before,
.photo .after {
  position: absolute;
  height: 0.3rem;
  width: 1rem;
  bottom: 0;
  right: 0;
}
.person {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  font-size: 0.26rem;
  color: #555;
  padding: 0 0.24rem;
}
.person img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.follow {
  display: inline-block;
  width: 1.1rem;
  height: 0.36rem;
  border: 1px solid #ff4691;
  border-radius: 0.18rem;
  text-align: center;
  line-height: 0.36rem;
}
.person-info {
  display: flex;
  align-items: center;
}
.time {
  font-size: 0.24rem;
  color: #999;
  line-height: 0.6rem;
  padding-left: 0.8rem;
  text-align: left;
}

.doctor {
  display: flex;
  justify-content: space-between;
}
.label {
  width: 1.68rem;
  height: 0.48rem;
  color: #333;
  background: #f1f1f1;
  border-radius: 0.24rem;
  font-size: 0.24rem;
  line-height: 0.48rem;
  text-align: center;
  margin: 0 0.24rem;
}
.diary-sort {
  display: flex;
  justify-content: space-between;
  padding: 0.22rem;
  background: #fff;
  color: #333;
  font-size: 0.24rem;
}
.diary-time {
  color: #999;
}
.consum {
  padding: 0.22rem;
  font-size: 0.24rem;
  color: #020202;
}
.consum-btn {
  display: flex;
  justify-content: space-between;
  padding: 0 0.64rem;
}
.consum-btn div {
  box-sizing: border-box;
  width: 2.98rem;
  height: 0.48rem;
  border: 1px solid #cccccc;
  border-radius: 0.24rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.48rem;
}

.comment {
  padding: 0 0.2rem 2rem 0.2rem;
}
.commnet-title {
  color: #333;
  font-size: 0.24rem;
  line-height: 0.6rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.12rem;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
}
.item-img {
  width: 0.8rem;
  height: 0.8rem;
}
.item-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.item-hos {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-size: 0.24rem;
  /* margin-bottom: .6rem; */
}
.nickname {
  font-size: 28rpx;
  color: #3F6BA6;
}
.item-num {
  color: #999;
}
.item-num img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 6rpx;
}
.item-p {
  width: 6rem;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.84rem;
  text-align: center;
  line-height: 0.84rem;
  background: #f1f1f1;
  font-size: 0.3rem;
  color: #555;
  z-index: 5;
}
.footer img {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  margin-right: 0.1rem;
}
.item-content {
  color: #333;
  font-size: 0.28rem;
  line-height: 0.48rem;
  margin-bottom: 0.1rem;
  margin-top: 10rpx;
}
.item-footer {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  color: #999;
  font-size: 0.24rem;
}
.item-time {
  color: #999;
  font-size: 0.24rem;
}
.item-footer .detailC {
  font-size: 24rpx !important;
  padding: 6rpx 12rpx;
  color: #333 !important;
}
.item-right {
  display: flex;
  justify-content: space-between;
}
.item-right img {
  width: 0.26rem;
  height: 0.26rem;
  margin-right: 0.1rem;
}
.item-right div {
  width: 1.35rem;
  height: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.24rem;
  box-sizing: border-box;
  border-radius: 0.22rem;
  margin-left: 0.2rem;
}
.item-follow {
  background: #fecc56;
}
.item-message {
  background: #ff8bcd;
}
.show-more {
  color: #3f6ba6;
}
</style>
