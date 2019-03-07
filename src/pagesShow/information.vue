<template>
  <div>
    <loading v-if="show"></loading>
    <div v-else class="information">
      <div class="main">
        <!-- <div class="back_home" v-if="share" @click.stop="jump">
          <img src="/static/images/tab1.png" mode="aspectFit">
        </div>-->
        <div class="title" v-if="type!=8">{{information.title}}</div>
        <div class="infor_top_detail">
          <span class="detail_left">
            <img :src="information.authorIcon ? information.authorIcon : ''">
            <div>
              <em class="detail_source">{{information.authorName}}</em>
              <em class="detail_fromNow">{{information.releaseTime}}</em>
            </div>
          </span>
          <span
            v-if="type!=4 && information.author!=custId"
            :class="isFollow ? 'active-focus-btn': 'focus-btn'"
            @click="publicMth('isFollow',focusRecordSave,information)"
          >
            <i-icon type="right" color="#999" v-if="isFollow==1"/>
            {{isFollow==1 ? '已关注' : '+关注'}}
          </span>
        </div>
        <!-- <div class="information-figures" v-if="(type == 8 || type == 10)&& information.cover">
          <img
            v-for="(item, index) of information.cover"
            :key="index"
            :src="item"
            v-if="index<2"
            mode="widthFix"
          >
        </div>-->
        <div class="content">
          <div v-if="type!=10">
            <video
              style="margin:0 auto;display:block;width:100%"
              v-if="type==4&&information.isVideo==1"
              id="video"
              ref="video"
              autoplay
              controls
              :src="information.videoUrl"
            ></video>
            <wxParse v-else :content="information.content" @preview="preview" noData/>
          </div>
          <div v-else>
            <div v-if="contentArrayOne.length > 0">
              <div v-for="label in contentArrayOne" :key="label">
                <rich-text style="user-select:text" :nodes="label"></rich-text>
              </div>
            </div>
            <div v-if="contentArrayTwo.length > 0">
              <div v-for="label in contentArrayTwo" :key="label">
                <rich-text style="user-select:text" :nodes="label"></rich-text>
              </div>
            </div>
          </div>
        </div>
        <div class="operation">
          <span class="fabulous" @click="publicMth('isThumbsUp',customerRecordSave,information)">
            <img :src="isThumbsUp ? img.zan.yes : img.zan.no" alt>
            {{information.fabulousNum}}
          </span>
          <span style="width:120rpx;height:6rpx;border:none" v-if="type!=8&&type!=10"></span>
          <span
            class="collection"
            v-if="type!=8&&type!=10"
            @click="publicMth('isFavourite',storeRecordSave,information)"
          >
            <img :src="isFavourite ? img.collection.yes : img.collection.no" alt>
            {{information.favouriteNum}}
          </span>
        </div>
        <!-- <div class="operation1">
                <span class="fabulous" @click="publicMth('isThumbsUp',customerRecordSave,information)">
                    <img :src="isThumbsUp? img.zan.yes : img.zan.no" alt="">{{information.fabulousNum}}
                </span>
        </div>-->
        <!-- 推荐阅读 -->
        <!-- <div class="propose-read" v-if="type!=8 && recommendInfoDTOList.length>0 "> -->
        <div class="propose-read" v-if="recommendInfoDTOList.length>0">
          <div class="read-box">
            <!-- jumpInformation  changeJump('/pagesShow/information',{type:type,id:v.id})-->
            <div
              class="read-list"
              v-for="(v,i) in recommendInfoDTOList"
              :key="i"
              @click.stop="jumpInformation(v)"
            >
              <p class="xyy-ellipsis-2">{{v.title}}</p>
              <div class="propose-img" :style="{backgroundImage:'url('+ v.cover[0]+')'}">
                <!-- <img
                  src="http://fs.meiduduo.com/sys//sys/article/singleCover//1551074895281.jpg"
                  mode="widthFix"
                  :alt="v.title"
                >-->
              </div>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="information_review" v-for="(item, index) of comments" :key="index">
          <div>
            <div class="review_main">
              <div class="review_head">
                <img :src="item.icon">
              </div>
              <div class="review_content">
                <div class="review_title">
                  <span class="review_name ellipsis">{{item.nickName}}</span>
                  <span
                    class="review_num"
                    @click="publicMth(customerRecords, customerRecordSave, item, index)"
                  >
                    <img :src="item.isThumbsUp > 0 ? img.zan.yes : img.zan.no" alt>
                    <em>{{item.fabulousNum}}</em>
                  </span>
                </div>
                <div class="review_matter2">
                  <div class="review_matter">
                    {{item.content}}
                    <!-- <wxParse :content="item.content ? removeBr(item.content) : ''" noData=""/> -->
                  </div>
                  <!-- 回复 -->
                  <div class="child-content" v-show="item.children && item.children.length>0">
                    <div
                      class="child-content-item"
                      v-for="(child,i) in item.children"
                      :key="i"
                      v-if="i<10"
                    >
                      <span class="child-name ellipsis">{{child.nickName}}</span>
                      <span style="float:left">：</span>
                      <span class="child-text">
                        {{child.content}}
                        <!-- <wxParse :content="child.content ? removeBr(child.content) : ''" noData=""/> -->
                      </span>
                    </div>
                  </div>
                </div>
                <p class="review_other">
                  <span>{{item.createDate}}</span>
                  <span @click="writeShow(item)" class="detailC">回复</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="toTop" v-if="topShow" @click="toTop">顶部</div>
      <div class="c" v-if="type==4||type==10">
        <writeComment1
          @send="getList(id)"
          @shareInfoDetail="shareInfoDetail"
          @sendStatusM="sendStatusM"
          @blurChange="blurChange"
          v-bind:writeItem="writeItem"
          v-if="writeCommentS "
        />
      </div>
      <div class="c" v-else>
        <writeComment
          @send="getList(id)"
          @sendStatusM="sendStatusM"
          @blurChange="blurChange"
          v-bind:writeItem="writeItem"
          v-if="writeCommentS "
        />
      </div>
      <!-- 4.1新增分享代言费 -->
      <!-- 阻止默认滑动 -->
      <div class="cover" v-if="explainShow" @touchmove.stop="''">
        <div class="consultative">
          <h2 class="consultative-title">温馨提示</h2>
          <p class="consultative-content flex-r">你今日的阅读分享领钱次数已达到上限，本次分享没有返钱</p>
          <div class="PD-sub-btn consultative-btn" @click.stop="freeShare">
            去分享
            <button class="hide-btn" open-type="share"></button>
          </div>
          <div class="close-btn" @click.stop="explainShow=!explainShow">&times;</div>
        </div>
      </div>
      <!-- 阅读给积分提示 -->
      <!-- 1首先判断活动是否存在 -->
      <!-- 活动存在  -->
      <!-- 1在页面呆30s -->
      <!-- 2页面拉到底 -->
      <!-- 阅读返现 需求更改-->
      <!-- <div
      class="cover1"
      @touchmove.stop="''"
      @click="closePoint"
      v-if="pointDetail.signPageState ==1 && timeOver &&bottomOver"
    >
      <div class="point_message">
        <img src="http://img.meiduduo.com/images/xyy/message_point.png" alt mode="widthFix">
        <div class="point_box_status">
          <p class="point_status">签到成功</p>
          <p class="point_num">+{{pointDetail.dayPoint}}豆芽</p>
        </div>
      </div>
      <p class="close" @click.stop="closePoint">
        <img src="http://img.meiduduo.com/images/xyy/close.png" alt mode="widthFix">
      </p>
      </div>-->
    </div>
  </div>
</template>
<script>
import wxParse from "mpvue-wxparse";
import writeComment1 from "../pages/comm/writeComment1";
import writeComment from "../pages/comm/writeComment";
import loading from "../pages/comm/loading";
import LOGIN from "../utils/login.js";
import { removeBrTag } from "../utils/util.js";
export default {
  data() {
    return {
      show: true,
      id: "",
      type: "",
      topShow: false,
      writeCommentS: false,
      isFollow: "",
      isFavourite: "",
      isThumbsUp: "",
      comments: [],
      customerRecords: [],
      pointOver: false,
      writeItem: {
        write1: false,
        write2: true,
        sendStatus: false,
        contentId: "",
        custId: "",
        criticId: "",
        commentId: "",
        commentType: "",
        moneyShare: 0,
        overShare: 0 //当前分享次数已经超出
      },
      information: {},
      hcArticle: {},
      explainShow: false,
      statusTime: 10, //当前在页面浏览的时间
      img: {
        zan: {
          no: "http://img.meiduduo.com/images/info/zan1.png",
          yes: "http://img.meiduduo.com/images/info/zan2.png"
        },
        collection: {
          no: "http://img.meiduduo.com/images/info/details4.png?10",
          yes: "http://img.meiduduo.com/images/mine/item121.png"
        }
      },
      taskWork: "", // 任务id
      customerPacketId: "",
      isShare: {},
      comm1: 0,
      moneyShare: 0,
      contentLength: 0, // 内容长度
      contentArrayOne: [], // 内容数组1
      contentArrayTwo: [], // 内容数组1
      share: 0,
      pointDetail: {
        // dayNum: 0
      },
      pointTaskStateVo: {},
      taskStateVO: {},
      timeOver: false, //页面是否进入30s
      bottomOver: false, //是否到底
      recommendInfoDTOList: []
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    },
    user() {
      return this.$store.state.userInfo;
    },
    //够30s ,2 拉倒地
    pointOver() {
      if (this.timeOver && this.bottomOver) {
        return true;
      }
    },
    backItem() {
      return this.$store.state.backItem;
    },
    statusMoney() {
      const { timeOver, bottomOver } = this;
      return {
        timeOver,
        bottomOver
      };
    }
  },
  components: {
    writeComment1,
    writeComment,
    wxParse,
    loading
  },
  onPullDownRefresh() {
    this.getList(this.id);
    wx.stopPullDownRefresh();
  },
  onPageScroll(param) {
    if (param.scrollTop > 2000) {
      this.topShow = true;
    } else {
      this.topShow = false;
    }
  },
  onShow() {
    this.show = true;
    this.timeOver = false; //页面是否进入30s 默认false
    this.bottomOver = false; //是否到底
    this.information = {};
    this.initContent();
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.share = this.$route.query.share;
    this.$set(this.writeItem, "commentType", this.type);
    this.$set(this.writeItem, "sendStatus", false);
    this.$set(this.writeItem, "contentId", this.$route.query.id);
    this.$set(this.writeItem, "custId", this.custId);
    if (this.type == 10) {
      this.queryOneByPkAndUserId(this.id);
    } else {
      this.infoQueryOneByPkAndUserId(this.id);
    }

    this.getList(this.id, true);
    this.goRegiest();
    // this.getPointDetail(); //获取当前活动是否还存在
    this.initTime(); //页面是否进入30s
    //不是问答可以请求
    if (this.type != 8) {
      //被邀请人进入时的接口
      //定时监测this.timerOver this.bottomOver 的状态值
      // let timer = setInterval(() => {
      //   if (this.timeOver && this.bottomOver) {
      //     // console.log("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈");
      //     this.customerRead();
      //     if (this.timeOver && this.bottomOver) {
      //       clearInterval(timer);
      //     }
      //   }
      // }, 1000);

      //判断是否可以继续分享
      this.isMoney();
    }
  },

  onLoad() {
    // xyy editor
    wx.showShareMenu();
  },
  watch: {
    statusMoney(val, oldVal) {
      if (this.type != 8) {
        //被邀请人进入时的接口
        //定时监测this.timerOver this.bottomOver 的状态值
        if (val.timeOver && val.bottomOver) {
          this.customerRead();
        }
      }
    }
  },
  onUnload() {
    this.topShow = false;
    this.writeCommentS = false;
    // console.log(this.comments.length, this.information.fabulousNum);
    this.$store.commit("backItemChange", {
      len: this.comments.length,
      num: this.information.fabulousNum,
      colNum: "", //无列表相关展示，故不传
      colStatus: "", // 无列表相关展示，故不传
      read: ""
    });
  },
  // 监听分享的回调
  onShareAppMessage(res) {
    return {
      title: `${
        this.isShare.activityTitle
          ? this.isShare.activityTitle
          : this.information.title
      }`,
      path: `/pagesShow/information?id=${this.information.id}&type=${
        this.type
      }&custId=${this.$store.state.userInfo.custId}&share=1&taskId=${
        this.taskWork.taskId
      }&customerPacketId=${this.customerPacketId.customerPacketId}`,
      imageUrl: this.isShare.activityImg
        ? this.isShare.activityImg
        : this.information.cover[0]
    };
  },
  // 监测页面是否到底
  onReachBottom() {
    console.log("到底了");
    this.bottomOver = true;
  },
  methods: {
    jump() {
      this.$router.push({ path: "/pages/index", query: {}, isTab: true });
    },
    // 关闭弹出框
    closePoint() {
      this.timeOver = false;
      this.bottomOver = false;
    },
    shareInfoDetail(msg) {
      // this.explainShow = msg;
      this.$set(this, "explainShow", msg);
    },
    freeShare() {
      this.explainShow = !this.explainShow;
    },
    initContent() {
      this.contentLength = 0;
      this.contentArrayOne = [];
      this.contentArrayTwo = [];
    },
    // xyy editor
    goRegiest() {
      if (Number(this.$route.query.share)) {
        if (!this.user.openid || !this.user.custId) {
          this.$store.commit("setInvited", {
            invited: true
          });
          // console.log("商品页判断是否已注册");
          LOGIN("/pagesShow/information", this.$route.query);
        } else {
          if (this.type == 10) {
            this.queryOneByPkAndUserId(this.id);
          } else {
            this.infoQueryOneByPkAndUserId(this.id);
          }
        }
      }
    },
    preview(src, e) {
      wx.previewImage({
        urls: [src]
      });
    },
    publicMth(data, mth, item, index) {
      if (index >= 0) {
        this.$set(data, index, !data[index]);
        mth(item, data[index], index);
      } else {
        this.$set(this, data, !this[data]);
        if (data == "isThumbsUp") {
          this.$set(
            item,
            "fabulousNum",
            this[data] ? item.fabulousNum + 1 : item.fabulousNum - 1
          );
        }
        if (data == "isFavourite") {
          this.$set(
            item,
            "favouriteNum",
            this[data] ? item.favouriteNum + 1 : item.favouriteNum - 1
          );
        }
        mth(item, this[data]);
      }
    },
    toTop() {
      this.topShow = false;
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    sendStatusM() {
      // console.log(this.writeItem);
      this.$set(this.writeItem, "sendStatus", false);
    },
    blurChange() {
      this.$set(this.writeItem, "focus", false);
      this.$set(this.writeItem, "place", "");
    },
    //文章的类型
    queryOneByPkAndUserId(id) {
      var option = {
        type: this.type,
        id,
        custId: this.custId
      };
      this.$http.post("/article/queryOneByPkAndUserId", option).then(res => {
        if (res.code == 1) {
          this.show = false;
          //推荐阅读
          const { recommendInfoDTOList } = res.data;
          recommendInfoDTOList.forEach(v => {
            v.cover = v.cover.split(",");
          });
          this.recommendInfoDTOList = recommendInfoDTOList;

          res.data.content = res.data.content.replace(
            /<br\s*\/?>/gi,
            '<p class="_br"></p>'
          );
          res.data.content = res.data.content.replace(/<section/gi, "<p");
          res.data.content = res.data.content.replace(/\/section>/gi, "/p>");
          // var reg = /<img(.+?)src=""*([^\s]+?)""*(\s|>)/ig
          // var imgsrcArr = [];
          // console.log(reg.match(res.data.content))
          // while (var tem = ) {
          //     imgsrcArr.push(tem[2]);
          // }
          // console.log(imgsrcArr)
          res.data.content = res.data.content.replace(/<img[^>]*>/gi, function(
            match,
            capture
          ) {
            let value = match.replace(
              /style=\"(.*)\"/gi,
              'style="max-width:100% !important;height:auto"'
            );
            return value;
          });
          // ! TODO: 处理不兼容的html标签
          res.data.content = res.data.content.replace(/<..../gi, function(
            match,
            capture
          ) {
            let value = match.slice(1);
            let indexOne = value.indexOf("/");
            let indexTwo = value.indexOf(" ");
            let indexThere = value.indexOf(">");
            let tagValue = "";
            if (indexOne > -1) {
              return match;
            } else {
              if (indexTwo > -1) {
                tagValue = value.slice(0, indexTwo);
                if (tagValue != "img" && tagValue != "div" && tagValue != "p") {
                  return "<div" + value.slice(indexTwo + 1);
                } else {
                  return match;
                }
              } else if (indexThere > -1) {
                tagValue = value.slice(0, indexThere);
                if (tagValue != "img" && tagValue != "div" && tagValue != "p") {
                  return "<div>" + value.slice(indexThere + 1);
                } else {
                  return match;
                }
              }
              if (value != "span") {
                return "<div ";
              }
            }
            return match;
          });
          res.data.content = res.data.content.replace(/<\/...../gi, function(
            match,
            capture
          ) {
            let value = match.slice(2);
            let index = value.indexOf(">");
            let valueOne = "";
            if (index > -1) {
              valueOne = value.slice(0, index);
              if (
                valueOne != "img" &&
                valueOne != "div" &&
                valueOne != "span"
              ) {
                return "</div>" + value.slice(index + 1);
              } else {
                return match;
              }
            } else {
              return match;
            }
          });
          res.data.content = res.data.content.replace(
            /\<img/gi,
            '<img style="max-width:100% !important;height:auto" '
          );
          // console.log(res.data.content);
          res.data.content = res.data.content.replace(
            /ql-align-center"/gi,
            'ql-align-center" style="text-align: center;padding:16px 0;" '
          );
          // console.log(res.data.content);
          if (res.data.cover) {
            res.data.cover = res.data.cover.split(",");
          } else {
            res.data.cover = [];
          }
          if (res.data.content.indexOf("/p><p")) {
            this.contentArrayOne.push(res.data.content);
          } else {
            let content = res.data.content.split("/p><p");
            this.contentLength = content.length;
            let contents = content.map((el, index) => {
              if (index == 0) {
                el =
                  '<div style="font-size:16px;color:#333;"></div>' + el + "/p>";
              } else if (index == this.contentLength - 1) {
                el = "<p" + el + "</div>";
              } else {
                el = "<p" + el + "/p>";
              }
              if (index < 5) {
                this.contentArrayOne.push(el);
              } else {
                this.contentArrayTwo.push(el);
              }
              return el;
            });
          }
          for (var k in res.data) {
            if (k != "content") {
              this.$set(this.information, k, res.data[k]);
            }
          }
          // 获取任务id
          // if (!this.$route.query.share) {
          /**分享关系
           * 例如 甲-->乙-->丙-->丁
           *  乙进入再分享需要再次获取分享关系，调用分享的接口
           *
           *  */
          this.getTaskId(this.information);
          // }
          this.writeCommentS = true;
          if (res.data.isFollow === 1) {
            this.$set(this, "isFollow", true);
          } else {
            this.$set(this, "isFollow", false);
          }
          this.isFavourite = res.data.isFavourite > 0 ? true : false;
          this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
        }
      });
    },
    //问答
    infoQueryOneByPkAndUserId(id) {
      if (this.type == 8) {
        this.$http
          .post("/question/queryOneByPk", { id, custId: this.custId })
          .then(res => {
            if (res.code == 1) {
              this.show = false;
              if (res.data.cover) {
                res.data.cover = res.data.cover.split(",");
              } else {
                res.data.cover = [];
              }
              res.data.content = removeBrTag(res.data.content);
              this.information = res.data; // 获取任务id
              // if (!this.$route.query.share) {
              //   this.getTaskId(this.information);
              // }
              this.writeCommentS = true;
              if (res.data.isFollow === 1) {
                this.$set(this, "isFollow", true);
              } else {
                this.$set(this, "isFollow", false);
              }
              // console.log(this.information);
              this.isFavourite = res.data.isFavourite > 0 ? true : false;
              this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
            }
          });
      } else {
        //资讯
        var option = {
          type: this.type,
          id,
          custId: this.custId
        };
        this.$http.post("/info/queryOneByPkAndUserId", option).then(res => {
          if (res.code == 1) {
            this.show = false;
            //推荐阅读
            const { recommendInfoDTOList } = res.data;
            recommendInfoDTOList.forEach(v => {
              v.cover = v.cover.split(",");
            });
            this.recommendInfoDTOList = recommendInfoDTOList;
            if (res.data.cover) {
              res.data.cover = res.data.cover.split(",");
            } else {
              res.data.cover = [];
            }
            res.data.content = removeBrTag(res.data.content);
            // 处理 rich-text 中的 li
            // res.data.content = res.data.content.replace(
            //   /\<iframe/gi,
            //   "<video "
            // );
            // res.data.content = res.data.content.replace(
            //   /\<\/iframe/gi,
            //   "</video "
            // );
            this.information = res.data;
            // 获取任务id
            //假如用户是分享进入的话不调用此接口、
            //或者是用户已经分享大于某一个值
            // if (!this.$route.query.share) {
            /**分享关系
             * 例如 甲-->乙-->丙-->丁
             *  乙进入再分享需要再次获取分享关系，调用分享的接口
             *
             *  */
            this.getTaskId(this.information);
            // }
            this.writeCommentS = true;
            if (res.data.isFollow === 1) {
              this.$set(this, "isFollow", true);
            } else {
              this.$set(this, "isFollow", false);
            }
            this.isFavourite = res.data.isFavourite > 0 ? true : false;
            this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
          }
        });
      }
    },
    getList(id, type) {
      // type 初始调用获取评论列表
      var option = {
        contentId: id,
        custId: this.custId,
        commentType: this.type,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        this.customerRecords = [];
        this.writeCommentS = true;
        if (res.data.data) {
          res.data.data.forEach((ele, index) => {
            this.$set(
              this.customerRecords,
              index,
              ele.isThumbsUp > 0 ? true : false
            );
            // this.hcArticle.isThumbsUp = ele.isThumbsUp  > 0 ? 1 : 0
          });
        }
        this.comments = res.data.data;
        if (type) {
          this.comm1 = this.comments.length;
        }
      });
    },
    customerRecordSave(item, status, index) {
      //点赞
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: index >= 0 ? 11 : this.type,
        crType: 1,
        state: status ? 1 : -1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        wx.hideLoading();
        if (index >= 0) {
          this.getList(this.id);
        }
      });
    },
    storeRecordSave(item, status) {
      var option = {
        custId: this.custId,
        recordId: item.id,
        recordType: this.type,
        state: status ? 1 : -1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/storeRecord/save", option).then(res => {
        wx.hideLoading();
        // if (this.type == 10) {
        //   this.queryOneByPkAndUserId(this.id)
        // } else {
        //   this.infoQueryOneByPkAndUserId(this.id)
        // }
      });
    },
    focusRecordSave(item, status) {
      let type = 6;
      // if(item.createType==0&&item.authorType==0){
      //       type = 2
      // }else{
      //     type = 6
      // }
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: status ? 1 : -1,
        recordType: type
      };
      this.$http.post("/focusRecord/save", option).then(res => {
        this.$store.commit("backauthorChange", {
          id: option.recordId,
          status: option.state
        });
      });
    },
    writeShow(item) {
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.custId);
      this.$set(this.writeItem, "focus", true);
      this.$set(this.writeItem, "place", "回复" + item.nickName);
    },
    //获取任务id
    getTaskId(comm) {
      return this.$http
        .post("shareTask/save", {
          custId: this.$store.state.userInfo.custId,
          shareType: this.type == 4 ? 2 : 3,
          recordId: comm.id,
          shareUrl: "/pagesShow/information",
          state: 1
        })
        .then(res => {
          if (res.code == 1) {
            this.taskWork = res.data;
            this.goShare(this.taskWork);
          }
        });
    },
    //分享的时候调用【周鑫接口】
    goShare(task) {
      this.$http
        .post("customerPacket/saveForReadCashBackWhenShare", {
          custId: this.$store.state.userInfo.custId,
          shareTaskId: task.taskId
        })
        .then(res => {
          if (res.code == 1) {
            this.customerPacketId = res.data;
          }
        });
    },
    customerRead() {
      if (this.$route.query.share == 1) {
        this.$http
          .post("customerPacket/saveForReadCashBackWhenRead", {
            customerPacketId: this.$route.query.customerPacketId, //用户点击分享链接进入
            inviteCustId: this.$store.state.userInfo.custId,
            recordType: this.$route.query.type == 4 ? 2 : 3
          })
          .then(res => {});
      }
    },
    //当前是否是赏金分享
    isMoney() {
      this.$http
        .post("redPacketActivity/queryActivityIsEnabled", {
          custId: this.user.custId
        })
        .then(res => {
          if (res.code == 1) {
            this.isShare = res.data;
            // this.isShare.isUpper = 1;
            // this.isShare.isUpper = 1;
            if (this.isShare.isUpper == 1) {
              this.writeItem.overShare = 1; //证明硬件超出当天的分享次数
              // return false;
            }
            this.writeItem.moneyShare = 1;
            //假如用户分享的次数大于十次，不能再分享赏金任务，改为普通任务
          } else if (res.code == -2) {
            //活动不存在
            this.writeItem.moneyShare = 0;
          }
        });
    },
    //获取签到详情
    getPointDetail() {
      this.$http
        .post("customerPointRecord/customerSignList", {
          custId: this.user.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.pointDetail = res.data;
            const { pointTaskStateVo, taskStateVO } = res.data;
            this.pointTaskStateVo = pointTaskStateVo;
            this.taskStateVO = taskStateVO;
          }
        });
    },
    //页面初始化进入定时器30s
    initTime() {
      let n = 0;
      let timer = setInterval(() => {
        n++;
        if (n >= this.statusTime) {
          console.log("时间到了");
          clearInterval(timer);
          this.timeOver = true;
        }
      }, 1000);
    },
    jumpInformation(item) {
      // wx.navigateTo({
      //   url: `/pagesShow/information?type=${this.$route.query.type}&id=${
      //     item.id
      //   }`
      // });
      this.$router.replace({
        path: "/pagesShow/information",
        query: { type: this.$route.query.type, id: item.id }
      });
    }
  }
};
</script>
<style >
.wxParse {
  font-size: 32rpx !important;
  color: #333 !important;
}
</style>
<style scoped lang="less">
.back_home {
  position: fixed;
  top: 5rpx;
  left: 20rpx;
  background-color: rgba(241, 241, 241, 0.5);
  z-index: 999;
  padding: 10rpx;
  border-radius: 100%;
  height: 60rpx;
  width: 60rpx;
  box-sizing: border-box;
}
.back_home > img {
  width: 40rpx;
  height: 40rpx;
  border-radius: 100%;
}
@import url("~mpvue-wxparse/src/wxParse.css");
.information {
  background: #fff;
  font-family: PingFangSC-Regular;
}
.main {
  padding: 0 0.24rem 82rpx;
}
.title {
  font-size: 0.48rem;
  color: #333;
  font-weight: bold;
  font-family: PingFangSC-Regular;
  margin-bottom: 0.44rem;
}
.infor_top_detail {
  padding-top: 0.4rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-bottom: 0.48rem;
  justify-content: space-between;
  align-items: center;
}
/* .infor_top_detail>span {
        -webkit-box-flex: 0.5;
        -webkit-flex: 0.5;
        flex: 0.5;
    } */
.detail_left {
  /* width: 3rem; */
  display: flex;
  align-items: center;
}
.detail_left > img {
  width: 112rpx;
  height: 112rpx;
  float: left;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.detail_source {
  font-size: 36rpx;
  display: block;
  color: #333333;
  font-weight: 700;
}
.detail_fromNow {
  padding: 4rpx;
  font-size: 0.26rem;
  display: block;
  color: #999;
}
.content {
  font-family: PingFangSC;
  font-size: 32rpx;
}
.content .richtext {
  width: 100%;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}
.content p {
  font-size: 0.24rem;
  line-height: 0.5rem;
  margin-bottom: 0.5rem;
}
.operation {
  display: flex;
  display: -webkit-flex;
  /* justify-content: space-between; */
  justify-content: center;
  padding: 20rpx 1rem;
}
.operation1 {
  width: 1.52rem;
  height: 0.55rem;
  padding: 0 1rem 0.6rem;
  margin: 0 auto;
}
.operation span,
.operation1 span {
  display: inline-block;
  width: 1.52rem;
  height: 0.55rem;
  border: 1px solid #ccc;
  border-radius: 0.28rem;
  font-size: 0.24rem;
  color: #999;
  line-height: 0.55rem;
  text-align: center;
}
.operation .fabulous {
  /* margin-right: 120rpx; */
}
.operation span img,
.operation1 span img {
  width: 0.26rem;
  height: 0.27rem;
  vertical-align: middle;
  margin-right: 0.11rem;
}
.follow {
  width: 110rpx;
  height: 36rpx;
  background: rgba(255, 70, 145, 1);
  border-radius: 20rpx;
  border: 1px solid rgba(255, 70, 145, 1);
  font-size: 28rpx;
  padding: 8rpx;
  color: #fff;
  text-align: center;
  line-height: 36rpx;
}
.follow.focus {
  background: #fff;
  color: rgba(255, 70, 145, 1);
}
.information_content {
  background: #ffffff;
  width: 100%;
  min-height: 100%;
  display: inline-block;
  padding: 0 0.26rem 1rem;
}
.review_main {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.review_head,
.review_head > img {
  width: 0.67rem;
  height: 0.68rem;
  border-radius: 50%;
}
.review_content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 0.25rem;
}
.review_title {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.review_matter2 {
  margin-top: 0.1rem;
}
.review_title > span {
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
}
.review_name {
  font-size: 0.28rem;
  color: #0f5893;
  height: 29rpx;
  line-height: 29rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 400rpx;
}
.review_title > .review_num {
  text-align: right;
  height: 29rpx;
  line-height: 29rpx;
}
.review_num > img {
  width: 0.26rem;
  height: 0.26rem;
}
.review_num > em {
  color: #999;
  line-height: 0.29rem;
  display: inline-block;
  padding-left: 5px;
  font-size: 26rpx;
}
.review_matter {
  font-size: 0.32rem;
  color: #333333;
  line-height: 0.45rem;
}
.review_other span {
  display: inline-block;
  height: 52rpx;
  line-height: 52rpx;
  color: #b4b4b4;
  font-size: 0.24rem;
}
.review_other span.detailC {
  padding: 0 0.22rem;
}
.child-text .wxParse {
  line-height: 1;
}
.information-figures {
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
}
.information-figures > img {
  flex: 1;
  -webkit-flex: 1;
}
.information-figures > img:last-child {
  margin-left: 9rpx;
}
.information-figures > img:first-child {
  margin-right: 9rpx;
}
.consultative {
  padding: 10px 0;
  width: 70%;
  margin: 0 auto;
  color: RGBA(51, 51, 51, 1);
  height: 225px;
  font-size: 13px;
  color: #999;
  background-color: #fff;
  border-radius: 8px;
  top: 50%;
  margin-top: -225rpx;
  left: 15%;
  position: fixed;
  & > .consultative-title {
    font-size: 17px;
    color: #000;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin: 10px 0;
    padding: 10px 0;
  }
  & > .consultative-content {
    align-items: center;
    text-align: center;
    margin: 10px 30px;
    min-height: 100px;
    line-height: 20px;
  }
  @h: 29px;
  & > .close-btn {
    width: @h;
    height: @h;
    line-height: @h;
    text-align: center;
    border-radius: 50%;
    background-color: transparent; //RGBA(224, 224, 224, 1);
    color: RGBA(102, 102, 102, 1);
    top: 0;
    right: 0;
    position: absolute;
  }
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.hide-btn {
  padding: 0;
  font-size: 22rpx;
  color: #666666;
  width: 100%;
  height: 0.9rem;
  border: 0;
  background: transparent;
  border-radius: 0;
  outline: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
}
.consultative-btn {
  position: relative;
}
.cover1 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
//签到提示
.point_message {
  width: 149px;
  height: 163px;
  // overflow: hidden;
  margin: 0 auto;
  position: relative;
  & > img {
    width: 100%;
  }
  & > .point_box_status {
    position: absolute;
    bottom: 5px;
    width: 100%;
    & > .point_status {
      font-size: 14px;
      color: @baseColor;
      text-align: center;
      margin-bottom: 10px;
    }
    & > .point_num {
      text-align: center;
      font-size: 15px;
      color: @baseColor;
      margin-bottom: 10px;
    }
  }
}
.close {
  margin-top: 23px;
  width: 29px;
  height: 29px;
  & > img {
    width: 100%;
  }
}
.child-content-item {
  line-height: 29rpx;
  line-height: 38rpx;
  overflow: hidden;
  padding-top: 10rpx;
}
.propose-read {
  // padding: 15px;
  & > .read-box {
    // background-color: #f5f5f5;
    // padding: 12px;
    & > .read-list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
      color: #333;
      padding: 10px 0;
      line-height: 21px;
      align-items: center;
      & > .propose-img {
        min-width: 160rpx;
        height: 100rpx;
        margin-left: 15px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        // background-image: url("http://fs.meiduduo.com/sys//sys/article/singleCover//1551074895281.jpg");
      }
    }

    & > .read-list:not(:last-child) {
      border-bottom: 1rpx solid #eee;
    }
  }
}
</style>
