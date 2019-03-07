<template>
  <div>
    <loading v-if="!item.id"></loading>
    <div v-else id="info">
      <div class="box top">
        <div class="photo-c">
          <div>
            <img class="first-photo" :src="item.preFirstPhoto" alt>
            <img class="before" src="http://img.meiduduo.com/images/index/Before.png" alt>
          </div>
          <div>
            <img class="last-photo" :src="item.afterFirstPhoto" alt>
            <img class="after" src="http://img.meiduduo.com/images/index/After.png" alt>
          </div>
        </div>

        <div class="person">
          <div class="person-info">
            <img :src="item.authorIcon" alt>
            {{item.authorName}}
          </div>
          <span
            v-if="isFollow !== -1 && !isSelf"
            :class="isFollow == 1? 'active-focus-btn' : 'focus-btn'"
            @click="follow(focusRecordSave,item)"
          >
            <i-icon type="right" color="#999" v-if="isFollow==1"/>
            {{isFollow == 1? '已关注' : '+关注'}}
          </span>
        </div>
        <div class="time">{{ item.createDate }}</div>
        <div class="project" @click="jump1(item.commId)">
          <div class="left">
            <img src="http://img.meiduduo.com/images/diaryshop1.png" alt>
          </div>
          <div class="middle"></div>
          <div class="right">
            <div class="title">{{item.commName}}</div>
            <div class="position">{{item.organName}}</div>
            <div class="doctor">
              <span>{{item.personalName}} {{item.detailName}}</span>
              <span>￥{{item.rulePrice}}</span>
            </div>
          </div>
        </div>
        <div class="tag-names" v-if="item.tagName!=''">
          <span class="label" v-for="(item, index) of item.tagName" :key="index">{{ item }}</span>
        </div>
      </div>
      <div class="box Preoperative">
        <span>美前</span>
        <div class="img-list">
          <div class="img-box" :style="{width:imgBoxW}">
            <!-- imgbox -->
            <img v-for="(one, index) in item.prePhoto" :key="index" :src="one" alt>
          </div>
          <!-- <div v-if="item.prePhoto&&item.prePhoto.length > 3" class="pubMark">{{item.prePhoto.length}}</div> -->
        </div>
      </div>
      <div class="diary-sort">
        <div class="x-diary-title xyy-ellipsis-1">{{item.title}}</div>
        <div class="diary-time">时间由新到旧</div>
      </div>
      <div class="box Postoperatively" v-for="(diary, index1) in diaryList" :key="index1">
        <span>美后{{diary.afterDay}}天</span>
        <div class="img-list" @click="jump(diary.id, 5,index1)">
          <img v-for="(one, index) in diary.afterPhoto" v-if="index<3" :key="index" :src="one" alt>
          <div
            v-if="diary.afterPhoto&& diary.afterPhoto.length > 3"
            class="pubMark"
          >{{diary.afterPhoto.length}}</div>
        </div>
        <div :class="hign[index1] ? 'content': 'content high'">
          <wxParse :content="diary.content ? removeBr(diary.content) : ''" noData/>
        </div>
        <div class="operation">
          <div class="operation-l">
            <div v-if="!hign[index1]" @click="expandMth(index1, hign)">
              展开
              <img src="http://img.meiduduo.com/images/upArrow.png" alt>
            </div>
            <div v-else @click="expandMth(index1, hign)">
              收起
              <img
                style="transform:rotate(180deg);margin-bottom:10rpx;"
                src="http://img.meiduduo.com/images/upArrow.png"
                alt
              >
            </div>
          </div>
          <div class="operation-r">
            <div>
              <i-icon type="browse" size="16"/>
              {{diary.readNum}}
            </div>
            <div>
              <i-icon type="message" size="16"/>
              {{diary.commentNum}}
            </div>
            <div @click.stop="diaryZan(diary,index1)">
              <i-icon type="praise_fill" size="16" color="#ff4691" v-if="diary.isThumbsUp"/>
              <i-icon type="praise" size="16" v-else/>
              {{diary.fabulousNum}}
            </div>
          </div>
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
        <div class="comment-item" v-for="(item, index) of comments" :key="index">
          <div class="item-img">
            <img :src="item.icon" alt>
          </div>
          <div class="item-p">
            <div class="item-hos">
              <div class="nickname">{{item.nickName}}</div>
              <div class="item-num" @click="customerRecordSave2(item)">
                <i-icon type="praise" size="16" v-if="!item.isThumbsUp"/>
                <i-icon type="praise_fill" size="16" color="#ff4691" v-else/>
                <span :style="{'color':item.isThumbsUp?'#ff4691':'#999'} ">{{item.fabulousNum }}</span>
              </div>
            </div>
            <div class="item-content">
              <wxParse :content="item.content ? removeBr(item.content) : ''" noData/>
              <!-- 回复 -->
              <div class="child-content" v-show="item.children && item.children.length>0">
                <div
                  class="child-content-item"
                  v-for="(child,i) in item.children"
                  :key="i"
                  :track-by="i"
                  v-if="i < (item.isShow ? item.children.length : 2)"
                >
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
                  v-if="item.children.length>2 && !item.isShow"
                >
                  共{{
                  item.children.length }}条回复>
                </div>
              </div>
            </div>
            <div class="item-footer">
              <div class="item-time">{{item.createDate}}</div>
              <span @click="writeShow(item)" class="item-right">回复</span>
              <!-- <div class="item-right">
              <div
                class="item-follow"
                @click="expandMth(index, customerRecords, item, customerRecordSave, 11)"
              >
                <img
                  :src="customerRecords[index]? 'http://img.meiduduo.com/images/info/item-follow1.png': 'http://img.meiduduo.com/images/info/item-follow.png'"
                  alt
                >
                {{customerRecords[index]? '已赞' : '赞'}}
              </div>
              <div class="item-message" @click="writeShow(item)">
                <img src="http://img.meiduduo.com/images/info/item-message.png" alt>回复
              </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="toTop" v-if="topShow" @click="toTop">顶部</div>
      <writeComment
        :writeItem="writeItem"
        @sendStatusM="sendStatusM"
        @blurChange="blurChange"
        @send="getList(id)"
        v-if="writeCommentS"
      ></writeComment>
    </div>
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import { removeBrTag } from "../utils/util.js";
// import writeComment from "../comm/writeComment.vue"; //广告位
import writeComment from "../pages/comm/writeComment";
import loading from "../pages/comm/loading";
export default {
  data() {
    return {
      topShow: false,
      type: "",
      id: "",
      item: {},
      comments: [],
      hign: [],
      diaryList: [],
      isFollow: true,
      diaryThumbsUp: [],
      customerRecords: [],
      writeCommentS: false,
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
      imgBoxW: "100%"
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    isSelf() {
      return this.item.author == this.$store.state.userInfo.custId;
    }
    // ,
    // imgBoxW(){
    //   return this.item.prePhoto.length*180 + 'rpx'
    // }
  },
  onPageScroll(param) {
    if (param.scrollTop > 2000) {
      this.topShow = true;
    } else {
      this.topShow = false;
    }
  },
  onPullDownRefresh() {
    this.queryOneForDiaryBook(this.id);
    this.getList(this.id);
    wx.stopPullDownRefresh();
  },
  components: {
    writeComment,
    wxParse,
    loading
  },
  onShow() {
    this.item = {};
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.writeItem.commentType = this.type;
    this.writeItem.contentId = this.$route.query.id;
    this.writeItem.custId = this.custId;
    this.queryOneForDiaryBook(this.id);
    this.getList(this.id);
  },
  onUnload() {
    this.topShow = false;
    this.writeCommentS = false;
    console.log(this.commentTotal, this.item.isFollow, this.item.fabulousNum);
    this.$store.commit("backItemChange", {
      len: this.comments.length,
      num: this.item.fabulousNum,
      colNum: "",
      colStatus: "",
      read: ""
    });
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str);
    },
    expandMth(index, name, diary, mth, type) {
      if (mth) {
        if (name[index] == undefined) {
          this.$set(name, index, diary["isThumbsUp"] > 0 ? false : true);
          mth(diary, name[index], type);
        } else {
          this.$set(name, index, !name[index]);
          console.log(this.item["diaryList"][index], name[index]);
          if (type == 5) {
            this.$set(
              this.item["diaryList"][index],
              "fabulousNum",
              name[index]
                ? this.item["diaryList"][index].fabulousNum + 1
                : this.item["diaryList"][index].fabulousNum - 1
            );
          }
          mth(diary, name[index], type);
        }
      } else {
        this.$set(name, index, !name[index]);
      }
    },
    sendStatusM(data) {
      this.$set(this.writeItem, "sendStatus", false);
    },
    blurChange() {
      this.$set(this.writeItem, "focus", false);
      this.$set(this.writeItem, "place", "");
    },
    toTop() {
      this.topShow = false;
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    queryOneForDiaryBook(id) {
      var option = {
        custId: this.custId,
        id
      };
      this.$http.post("/diaryBook/queryOneForDiaryBook", option).then(res => {
        res.data.prePhoto = res.data.prePhoto.split(",");
        res.data.afterPhoto = res.data.afterPhoto.split(",");
        res.data.tagName = res.data.tagName.split(",");
        console.log(res.data);
        this.diaryThumbsUp = [];
        if (res.data.createDate) {
          res.data.createDate = res.data.createDate.slice(5, 10);
        }
        this.item = res.data;
        const { diaryList } = res.data;
        this.diaryList = diaryList;
        console.log(this.diaryList);
        res.data.diaryList.forEach((ele, index) => {
          ele.afterPhoto = ele.afterPhoto.split(",");
          this.$set(
            this.diaryThumbsUp,
            index,
            ele.isThumbsUp > 0 ? true : false
          );
        });
        this.isFollow = this.item.isFollow;
        this.imgBoxW = this.item.prePhoto.length * 180 + "rpx";
        this.writeCommentS = true;
      });
    },
    getList(id) {
      this.comments = [];
      console.log(this.comments);
      var option = {
        custId: this.custId,
        contentId: id,
        commentType: this.type,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        this.customerRecords = [];
        console.log(res);
        if (res.data && res.data.data) {
          this.writeCommentS = true;
          res.data.data.forEach((ele, index) => {
            this.$set(
              this.customerRecords,
              index,
              ele.isThumbsUp > 0 ? true : false
            );
            ele.isShow = false;
          });
        }
        this.comments = res.data.data;
        console.log(this.comments);
      });
    },
    customerRecordSave(item, status, type) {
      var option = {
        recordId: item.id,
        recordType: type,
        custId: this.custId,
        crType: 1,
        state: status ? 1 : -1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        wx.hideLoading();
        // this.queryOneForDiaryBook(this.id)
        // this.getList(this.id)
      });
    },

    customerRecordSave2(item) {
      var option = {
        recordId: item.id,
        recordType: 11,
        custId: this.custId,
        crType: 1,
        state: item.isThumbsUp ? -1 : 1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        // this.queryOneForDiaryBook(this.id)
        // this.getList(this.id)
        wx.hideLoading();
        console.log(res.code);
        if (res.code == 1) {
          item.fabulousNum = item.isThumbsUp
            ? item.fabulousNum - 1
            : item.fabulousNum + 1;
          console.log(item.fabulousNum);
          item.isThumbsUp = !item.isThumbsUp;
        }
      });
    },

    diaryZan(item, index) {
      var option = {
        recordId: item.id,
        recordType: 5,
        custId: this.custId,
        crType: 1,
        state: item.isThumbsUp ? -1 : 1
      };
      console.log(item);
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        wx.hideLoading();
        if (res.code == 1) {
          item.fabulousNum = item.isThumbsUp
            ? item.fabulousNum - 1
            : item.fabulousNum + 1;
          item.isThumbsUp = !item.isThumbsUp;
        }
      });
    },
    follow(mth, item) {
      this.$set(this, "isFollow", !this.isFollow);
      mth(item, this.isFollow);
    },
    focusRecordSave(item, status) {
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: status ? 1 : -1,
        recordType: 6
      };
      this.$http.post("/focusRecord/save", option).then(res => {
        this.$store.commit("backauthorChange", {
          id: item.author,
          status: option.state
        });
        console.log(this.$store.state);
      });
    },
    writeShow(item) {
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "focus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.custId);
      this.$set(this.writeItem, "place", "回复" + item.nickName);
    },
    jump(id, type, index) {
      this.$router.push({
        path: "/pagesShow/diary",
        query: {
          id,
          type
        }
      });
    },
    jump1(id) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id
        }
      });
    },
    showMore(index) {
      this.$set(this.comments[index], "isShow", true);
    }
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.clearfix {
  display: table;
  content: "";
  clear: both;
}
.list-comment {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#info {
  background: #f1f1f1;
}

.box {
  background: #fff;
  margin-bottom: 0.18rem;
}

.top {
  padding-bottom: 0.2rem;
}

.photo-c {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0.24rem;
}

.photo-c div {
  width: 3.5rem;
  height: 3.1rem;
  position: relative;
}

.photo-c img {
  width: 100%;
  height: 100%;
}

.first-photo {
  border-radius: 4px 0px 0px 4px;
}
.last-photo {
  border-radius: 0px 4px 4px 0px;
}

.photo-c .before,
.photo-c .after {
  position: absolute;
  height: 0.3rem;
  width: 1rem;
  bottom: 0;
}

.photo-c .before {
  right: 0;
}
.photo-c .after {
  left: 0;
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

.project {
  width: 7rem;
  height: 1.42rem;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #ffd35c;
  background-color: #fefdef;
  color: #999;
  font-size: 0.24rem;
  border-radius: 0.1rem;
  padding-right: 0.22rem;
  margin-bottom: 0.15rem;
  position: relative;
}

.project .left {
  float: left;
}

.project .right {
  width: 5.5rem;
  float: right;
}

.project .right div {
  height: 35rpx;
  line-height: 35rpx;
}

.project .left {
  width: 0.96rem;
  height: 1.42rem;
  background: #ffd35c;
  margin-right: 0.25rem;
}

.project .middle {
  width: 0.14rem;
  height: 1.5rem;
  position: absolute;
  background: url("http://img.meiduduo.com/images/diaryshop4.png") no-repeat
    right top;
  background-size: 0.14rem 1.5rem;
  top: -0.042rem;
  left: 0.86rem;
}

.project .left img {
  display: block;
  width: 0.46rem;
  height: 0.5rem;
  margin: 0.44rem auto 0;
}

.project .title {
  color: #333;
  font-size: 0.28rem;
  padding-top: 0.15rem;
  margin-bottom: 0.1rem;
}

.doctor {
  display: flex;
  justify-content: space-between;
}

.label {
  /* width: 1.68rem; */
  height: 0.48rem;
  color: #333;
  background: #f1f1f1;
  border-radius: 0.24rem;
  font-size: 0.24rem;
  line-height: 0.48rem;
  text-align: center;
  /* margin:0 .24rem; */
  margin-right: 24rpx;
  margin-bottom: 10rpx;
}

.diary-sort {
  display: flex;
  justify-content: space-between;
  padding: 0.22rem;
  background: #fff;
  color: #333;
  font-size: 0.28rem;
}
.x-diary-title {
  width: 65%;
}
.diary-time {
  color: #999;
}

.Preoperative {
  position: relative;
  padding-top: 0.94rem;
}

.Preoperative span {
  position: absolute;
  top: 0.25rem;
  left: 0;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.4rem;
  background: #ff4691;
  padding: 0 0.2rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}

.Preoperative .img-list {
  /* display: flex;
  display: -webkit-flex; */
  padding: 0.22rem;
  overflow-x: scroll;
}
.img-list .img-box {
  overflow-x: scroll;
}
.img-list::-webkit-scrollbar {
  display: none;
}
.img-box::-webkit-scrollbar {
  display: none;
}
.Preoperative .img-list img {
  /* width: 1.65rem;
        height: 1.65rem; */
  /* width: 2.2rem;
        height: 2.2rem; */
  float: left;
  width: 164rpx;
  height: 165rpx;
  margin-right: 16rpx;
}

.Postoperatively .img-list {
  display: flex;
  display: -webkit-flex;
  padding: 0.22rem;
}

.Postoperatively {
  position: relative;
  padding-top: 0.74rem;
}

.Postoperatively span {
  position: absolute;
  top: 0.22rem;
  left: 0;
  color: #fff;
  line-height: 0.4rem;
  padding: 0 0.3rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  font-size: 0.24rem;
  background: #ff4691;
}

.Postoperatively .img-list img {
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.22rem;
}

.Postoperatively .content {
  color: #333;
  font-size: 0.32rem;
  line-height: 0.4rem;
  padding: 0 0.22rem;
  overflow: hidden;
}

.Postoperatively .content.high {
  max-height: 1.2rem;
}

.Postoperatively .content.expand {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.Preoperative .img-list img:last-of-type,
.Postoperatively .img-list img:last-of-type {
  margin-right: 0;
}

.Preoperative .img-list .pubMark,
.Postoperatively .img-list .pubMark {
  position: absolute;
  right: 10rpx;
  /* top: 2.64rem; */
  bottom: 22rpx;
  font-size: 0.26rem;
  height: 0.32rem;
  width: 36rpx;
  line-height: 0.32rem;
  text-align: center;
  padding: 4rpx 28rpx 4rpx 0rpx;

  background: rgba(255, 255, 255, 0.5)
    url("http://img.meiduduo.com/images/info/icon_num.png") no-repeat 36rpx
    center;
  background-size: 24rpx 24rpx;
}

.Postoperatively .img-list .pubMark {
  top: 2.64rem;
}

.operation {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  font-size: 0.24rem;
  color: #999;
  padding: 0.2rem 0.22rem;
}

.operation img {
  vertical-align: sub;
  margin-right: 0.1rem;
}

.operation-l {
  width: 50%;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
}

.operation-l img {
  width: 0.12rem;
  height: 0.08rem;
  display: inline-block;
  margin-left: 0.1rem;
  padding-bottom: 0.1rem;
}

.operation-l .img1 {
  width: 0.26rem;
  height: 0.2rem;
  padding-bottom: 0.04rem;
}

.operation-r {
  width: 50%;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
}

.operation-r img {
  width: 0.26rem;
  height: 0.24rem;
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
  padding: 0 0.2rem 2.32rem 0.2rem;
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
  margin: 4rpx 0 0rpx;
}

.item-num {
  color: #999;
  display: flex;
  align-items: center;
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
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.item-time {
  color: #999;
  font-size: 0.24rem;
}

.item-right {
  margin-left: 15px;
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

.tag-names {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25rpx 0 22rpx;
  display: flex;
  flex-wrap: wrap;
}

.tag-names > span {
  padding: 0 23rpx 0 26rpx;
}
</style>
