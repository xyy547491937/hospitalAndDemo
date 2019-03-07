<template>
  <div class="doctor">
    <div class="doctor_image box">
      <img :src="detail.photo[0]?detail.photo[0]:''" alt>
      <div class="doctor_image_info">
        <div class="doctor-user-info">
          <span class="doctor_name">{{ detail.personalName }}</span>
          <span
            v-if="!detail.isFollow"
            @click.stop="focus(detail.isFollow)"
            class="focus-btn"
            style="background:#ff4691; color:#fff"
          >
            <i-icon type="add" color="#fff" size="14"/>关注
          </span>
          <span
            v-else
            @click.stop="focus(detail.isFollow)"
            class="active-focus-btn"
            style="background:#fff"
          >
            <i-icon type="right" color="#999" size="14"/>已关注
          </span>
        </div>
        <p>
          <span>{{ detail.technicalName }}</span>
          <span>从业{{ detail.workingSeniority }}</span>
        </p>
      </div>
    </div>
    <div class="doctor_info box">
      <div v-if="detail.fieldsName && detail.fieldsName.length > 0" class="doctor_info_tag">
        <p class="aside_lable aside-fields">擅长：</p>
        <div>
          <span
            v-for="(item, index) of detail.fieldsName"
            :key="index"
            class="aside_lable_item"
          >{{ item }}</span>
        </div>
      </div>
      <!-- <div class="doctor_info_tag">
        <p class="aside_lable">评分：</p>
        <div class="doctor-comment-fen">
          <div>
            <i-rate :value="4" size="22"></i-rate>
            <span class="comment-fen">4分</span>
          </div>
        </div>
      </div>-->
      <div class="doctor_info_intro">
        <p class="aside_lable aside_lable_default">简介：</p>
        <div
          v-if="detail.introduce"
          class="floatL richText"
          :style="richAll && detail.introduce ? 'height: 120rpx' : ''"
        >
          <!-- <rich-text v-if="detail.introduce" :nodes="detail.introduce"></rich-text> -->
          <wxparse :content="detail.introduce ? removeBr(detail.introduce) : ''" noData></wxparse>
        </div>
      </div>
      <div v-if="richAll" class="doctor_info_footer" @click="richAllMth">
        <span>查看全部简介</span>
      </div>
      <div v-else class="doctor_info_footer" @click="richAllMth">
        <span>收起</span>
      </div>
    </div>
    <div v-if="comments.length > 0 && detail.staffId" class="doctor-comment box">
      <div class="doctor-comment-fen">
        <div>
          <i-rate :value="star" size="22"></i-rate>
          <span class="comment-fen">{{ star }}分</span>
        </div>
        <span @click.stop="goComments">{{commentNumber}}条评价></span>
      </div>
      <div class="doctor-comment-item">
        <div class="doctor-comment-item-base">
          <img :src="comments[0].icon" alt>
          <div class="doctor-comment-item-main">
            <p>
              <span class="comment-user-name">{{ comments[0].custName }}</span>
              <span class="comment-time">{{ comments[0].createDate }}</span>
            </p>
            <p>{{ comments[0].content }}</p>
          </div>
        </div>
        <!-- <div class="doctor-comment-item-follow">
          <p class="comment-time">2018年10月25日发布追评</p>
          <p>胸小的姐妹真的要找一个靠谱的医生来做，我真的推荐张智勋医生。</p>
        </div>-->
      </div>
    </div>
    <div @click.stop="toOrganPage" class="doctor_organ box">
      <img src="http://img.meiduduo.com/images/hos_icon.png" alt>
      <span>{{ detail.organName }}</span>
      <i-icon type="enter" color="#666666" size="18"/>
    </div>
    <div class="doctor_example box">
      <span class="example_label">客户案例</span>
      <div
        @click.stop="goExamplePage(item)"
        v-if="index < 1"
        v-for="(item, index) of exampleList"
        :key="index"
      >
        <div class="example_imgs">
          <div class="example_img">
            <img :src="item.preFirstPhoto" alt>
            <img style="right: 0;" src="http://img.meiduduo.com/images/index/Before.png" alt>
          </div>
          <div class="example_img">
            <img :src="item.afterFirstPhoto" alt>
            <img style="left: 0;" src="http://img.meiduduo.com/images/index/After.png" alt>
          </div>
        </div>
        <div class="example_user">
          <img :src="item.authorIcon" alt>
          <span>{{ item.authorName }}</span>
        </div>
        <!-- <p class="example_content">{{ item.diaryContent }}</p> -->
        <rich-text :nodes="item.diaryContent" class="example_content"></rich-text>
        <p class="example_tag">
          <i-icon type="label" color="#FF4892" size="20"/>
          <span>{{ item.tagName }}</span>
        </p>
        <div class="example_price">
          <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt>
          <span class="example_price_content">{{ item.commName }}</span>
          <span>￥{{ item.rulePrice }}</span>
        </div>
        <div class="footer_btns">
          <div class="footer_btn_item">
            <i-icon type="browse" size="14"/>
            <span>{{ item.readNum }}</span>
          </div>
          <div class="footer_btn_item">
            <i-icon type="message" size="14"/>
            <span>{{ item.commentNum }}</span>
          </div>
          <div class="footer_btn_item">
            <i-icon type="praise" size="14"/>
            <span>{{ item.fabulousNum }}</span>
          </div>
        </div>
      </div>
      <div @click="goExamples" class="example_btns">
        <span>查看全部</span>
        <span>
          {{ exampleTotal }}个案例
          <i-icon type="enter" color="#FC4396" size="20"/>
        </span>
      </div>
    </div>
    <div style="margin-bottom: 50px;" class="doctor_example box">
      <span class="example_label">我的热卖</span>
      <div v-if="hotList.length > 0">
        <hotCard v-if="index < 3" v-for="(item, index) of hotList" :key="index" :data="item"></hotCard>
      </div>
      <div @click="goOffer" class="example_btns">
        <span>查看全部</span>
        <span>
          {{ hotTotal }}个特惠
          <i-icon type="enter" color="#FC4396" size="20"/>
        </span>
      </div>
    </div>
    <!-- TODO: 在线预约和咨询 -->
    <!-- <div class="fixed_btn">
      <span><i-icon type="time" color="#ffffff" size="24" /> 在线预约</span>
      <div class="serrvice_box">
        <span class="customer_icon"><i-icon type="message" color="#ffffff" size="24" /></span>
        <button class="customer_service" open-type="contact">咨询</button>
      </div>
    </div>-->
  </div>
</template>

<script>
import hotCard from "./comm/hot_card";
import wxparse from "mpvue-wxparse";
import { removeBrTag } from "../utils/util.js";

export default {
  components: {
    hotCard,
    wxparse
  },
  data() {
    return {
      hotList: [], // 热卖商品列表
      detail: {},
      exampleList: [], // 案例列表
      isFollow: false, // 是否关注
      exampleTotal: 0, // 案列总数
      richAll: true,
      hotTotal: 0, // 特惠总数
      comments: [], // 评论列表
      commentNumber: 0, // 评论数量
      star: 0
    };
  },
  onShow() {
    this.init();
    this.getDocterHot();
    this.getDocterDetail();
    this.getDocterExample();
  },
  // onUnload() {
  //   this.init();
  // },
  methods: {
    removeBr(str) {
      return removeBrTag(str);
    },
    init() {
      this.hotList = [];
      this.exampleList = [];
      // this.detail = {};
      this.isFollow = false;
      this.exampleTotal = 0; // 案列总数
      this.hotTotal = 0; // 特惠总数
      this.richAll = true;
    },
    richAllMth() {
      this.richAll = !this.richAll;
    },
    goExamplePage(val) {
      this.$router.push({
        path: "/pagesShow/diary_info",
        query: {
          id: val.id,
          type: 7
        }
      });
    },
    getDocterDetail() {
      this.$http
        .post("servicePersonal/queryOneByPk", {
          id: this.$route.query.id,
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          let a = res.data;
          if (a.introduce) {
            a.introduce = this.dealRichP(this.dealRichText(a.introduce));
          }
          if (a.fieldsName) {
            a.fieldsName = a.fieldsName.split(",");
          } else {
            a.fieldsName = [];
          }
          if (a.photo) {
            a.photo = a.photo.split(",");
          } else {
            a.photo = [];
          }
          this.detail = a;
          if (a.staffId) {
            this.getComments(a.staffId);
            this.getStarts(a.staffId);
          }
        });
    },
    dealRichText(text) {
      // 处理 rich-text 中的 img
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto" '
      );
    },
    dealRichP(text) {
      // 处理 rich-text 中的 p
      return text.replace(/\<p/gi, '<p style="font-size:14px;color:#666666" ');
    },
    getDocterHot() {
      let params = {
        pageNum: 1,
        pageSize: 10
      };
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id;
      }
      this.$http.post("commodity/commodityList", params).then(res => {
        if (res.code === 1) {
          this.hotList = res.data.data;
          this.hotTotal = res.data.total;
        }
      });
    },
    getDocterExample() {
      let params = {
        pageNum: 1,
        pageSize: 3,
        auditState: 1
      };
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id;
      }
      this.$http.post("diaryBook/list4PageForDiaryBook", params).then(res => {
        if (res.code === 1) {
          this.exampleList = res.data.data;
          this.exampleTotal = res.data.total;
        }
      });
    },
    goExamples() {
      this.$router.push({
        path: "/pagesShop/doctor_example",
        query: {
          id: this.$route.query.id,
          total: this.exampleTotal
        }
      });
    },
    goOffer() {
      this.$router.push({
        path: "/pagesShop/special_offer",
        query: {
          id: this.$route.query.id,
          total: this.hotTotal
        }
      });
    },
    focus(val) {
      this.$http
        .post("focusRecord/save", {
          recordId: this.detail.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 1,
          state: val ? -1 : 1
        })
        .then(res => {
          if (res.code == 1) {
            this.getDocterDetail();
          }
        });
    },
    toOrganPage() {
      this.$router.push({
        path: "/pagesShop/orgin",
        query: {
          id: this.detail.organId
        }
      });
    },
    getComments(id) {
      this.$http
        .post("servicePersonal/getEvaluateInfo", {
          id: id,
          pageNum: 1,
          pageSize: 5
        })
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.comments = res.data.data.map(el => {
              let a = el;
              if (a.createDate) {
                a.createDate = `${a.createDate.slice(
                  0,
                  4
                )}年${a.createDate.slice(5, 7)}月${a.createDate.slice(
                  8,
                  10
                )}日`;
              }
              return a;
            });
            this.commentNumber = res.data.total;
          }
        });
    },
    goComments() {
      this.$router.push({
        path: "/pagesShop/comments",
        query: {
          id: this.detail.staffId
        }
      });
    },
    getStarts(id) {
      this.$http
        .post("servicePersonal/getEvaluationById", {
          id: id
        })
        .then(res => {
          if (res.code === 1) {
            this.star = Number(res.data.star);
          }
        });
    }
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.doctor {
  background: #f1f1f1;
}
.box {
  margin-bottom: 17rpx;
}
.doctor_image {
  width: 100%;
  box-sizing: border-box;
  height: 440rpx;
  position: relative;
}
.doctor_image > img {
  display: block;
  width: 100%;
  height: 100%;
}
.doctor_image_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120rpx;
  background: rgba(85, 85, 85, 0.32);
  padding: 27rpx 33rpx 21rpx 33rpx;
  box-sizing: border-box;
  font-size: 22rpx;
  color: #fff;
}
.doctor_name {
  font-size: 30rpx;
}
.follow_btn {
  font-size: 26rpx;
  padding: 7rpx 24rpx 8rpx 24rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 20rpx;
  background: #fc4396;
  margin-left: 28rpx;
}
.doctor_info {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.aside_lable {
  font-size: 28rpx;
  color: #333333;
  margin-right: 37rpx;
  line-height: 50rpx;
  height: 50rpx;
  display: block;
  float: left;
  width: 160rpx;
}
.aside_lable_default {
  width: 85rpx;
}
.aside-fields {
  width: 160rpx;
}
.richText {
  width: 510rpx;
  overflow: hidden;
  position: relative;
}
.doctor_info_tag,
.doctor_info_intro {
  padding: 30rpx;
  overflow: hidden;
}
.doctor_info_tag {
  display: flex;
}
.doctor_info_tag > div {
  display: flex;
  flex-wrap: wrap;
}
.aside_lable_item {
  font-size: 24rpx;
  color: #fc4396;
  background: #fdd2ec;
  padding: 9rpx 26rpx 8rpx 30rpx;
  border-radius: 20rpx;
  margin: 0 19rpx 20rpx 0;
}
.doctor_info_content {
  font-size: 24rpx;
  color: #666666;
  line-height: 40rpx;
}
.doctor_info_footer {
  border-top: 1rpx solid #f1f1f1;
  font-size: 24rpx;
  color: #fc4396;
  text-align: center;
  padding: 24rpx 0;
}
.doctor_organ {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333333;
  padding: 30rpx;
  background: #fff;
}
.doctor_organ > img {
  width: 40rpx;
  height: 50rpx;
  display: block;
}
.doctor_organ > span {
  flex: 1;
  margin: 0 17rpx;
}
.doctor_example {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.example_label {
  font-size: 28rpx;
  color: #333333;
  border-left: 4rpx solid #fc4396;
  margin-bottom: 29rpx;
  display: block;
  padding: 0 16rpx;
}
.example_imgs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}
.example_img {
  position: relative;
  width: 344rpx;
  height: 330rpx;
  border-radius: 4rpx;
  box-sizing: border-box;
}
.example_img > img:first-child {
  width: 100%;
  height: 100%;
  display: block;
}
.example_img > img:last-child {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100rpx;
  height: 30rpx;
}
.example_user {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 32rpx;
}
.example_user > img {
  width: 57rpx;
  height: 57rpx;
  display: block;
  border-radius: 100%;
  margin-right: 29rpx;
}
.example_content {
  font-size: 26rpx;
  color: #666666;
  margin-bottom: 39rpx;
}
.example_tag {
  font-size: 26rpx;
  color: #ff4691;
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
}
/* .example_tag > img {
  display: block;
  width: 20rpx;
  height: 20rpx;
  margin-right: 5rpx;
} */
.example_price {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 13rpx 17rpx 15rpx 17rpx;
  border-radius: 3rpx;
  font-size: 22rpx;
  color: #555555;
  margin-bottom: 26rpx;
}
.example_price > img {
  display: block;
  width: 26rpx;
  height: 26rpx;
  margin-right: 10rpx;
}
.example_price_content {
  flex: 1;
}
.example_price > span:last-child {
  color: #ff4691;
}
.footer_btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24rpx;
  color: #999;
}
.footer_btn_item {
  display: flex;
  align-items: center;
  margin-left: 50rpx;
  margin-bottom: 21rpx;
}
.example_btns {
  border-top: 1rpx solid #f1f1f1;
  padding: 25rpx 0 28rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
}
.example_btns > span:first-child {
  margin-right: 10rpx;
}
.example_btns > span:last-child {
  display: flex;
  align-items: center;
  color: #fc4396;
}
.fixed_btn {
  width: 100%;
  height: 98rpx;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  font-size: 30rpx;
  color: #ffffff;
  position: fixed;
  bottom: 0;
}
.fixed_btn span {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fixed_btn > span:first-child {
  background: #fa97e6;
}
.serrvice_box {
  flex: 1;
  background: #fc4396;
  position: relative;
}
.customer_service {
  padding: 0;
  font-size: 30rpx;
  color: #fff;
  width: 100%;
  height: 98rpx;
  border: 0;
  background: transparent;
  border-radius: 0;
  outline: 0;
  line-height: 3.5;
}
.customer_service::after {
  border: 0;
}
.customer_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-80rpx, -20rpx);
}
.show-all {
  overflow: hidden;
  height: 100rpx;
  width: 100%;
  box-sizing: border-box;
}
.doctor-comment {
  background: #fff;
  padding: 30rpx;
}
.doctor-comment-fen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22rpx;
  color: #ff4691;
}
.doctor-comment-fen > div {
  display: flex;
  align-items: center;
}
.comment-fen {
  color: #feb259;
  font-size: 30rpx;
  margin-bottom: -10rpx;
  display: inline-block;
}
.doctor-comment-item {
  margin-top: 47rpx;
}
.doctor-comment-item-base {
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.doctor-comment-item-base > img {
  width: 66rpx;
  height: 66rpx;
  border-radius: 100%;
  display: block;
  margin-right: 20rpx;
}
.doctor-comment-item-main {
  flex: 1;
}
.doctor-comment-item-main > p:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34rpx;
}
.comment-user-name {
  font-size: 26rpx;
  color: #3f6ba6;
}
.comment-time {
  font-size: 22rpx;
  color: #999999;
}
.doctor-comment-item-main > p:last-child,
.doctor-comment-item-follow > p:last-child {
  font-size: 24rpx;
  color: #333333;
  line-height: 38rpx;
}
.doctor-comment-item-follow {
  padding-top: 19rpx;
  margin-top: 19rpx;
  border-top: 1rpx solid #f1f1f1;
  width: 100%;
  box-sizing: border-box;
  padding-left: 86rpx;
}
.doctor-comment-item-follow > p:first-child {
  margin-bottom: 20rpx;
}
.doctor-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduce-style {
  font-size: 24rpx;
  color: #666;
}
</style>
