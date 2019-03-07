<template>
  <div class="vo" :class="{ 'no-more-data': initNoData }">
    <div class="bg-show fixation" :style="{backgroundImage: 'url(' + banner1 + ')'}"></div>
    <div class="innerfix" :style="{backgroundImage: 'url(' + banner1 + ')'}">
      <!-- 搜索框 -->
      <div style="padding:0 30rpx;background-color:#FFFFFF;height:88rpx;">
        <search
          v-bind:currentCity="curArea || currentCity"
          v-bind:source="false"
          @curCityMth="curCityMth"
        />
      </div>
      <!--导航栏-->
      <div style="margin-bottom: 0.2rem; background-color: transparent;">
        <PdTabs
          :tabArr="tabList"
          :cur="activeIndex"
          :bgColor="'transparent'"
          :tabColor="tabColor"
          :defaultColor="defaultColor"
          @tabItem="tabItem"
        />
      </div>
    </div>
    <div class="cle">
      <div class="pos">
        <!-- 内容栏 -->
        <div style="padding:0 30rpx;background:transparent">
          <!-- tab -->
          <div :class="detailCode" v-show="detailCode==1">
            <div class="nolist-container" v-if="focusList.length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <div v-for="(item,i) in focusList" :key="i">
              <articleList
                v-if="item.modelType == '9'"
                :index="i"
                @followBus="followBus"
                :video="item"
              ></articleList>
              <activeDiary
                v-if="item.modelType == '7'"
                :index="i"
                @followBus="followBus"
                :diaryValue="item"
              ></activeDiary>
              <activeArticle
                v-if="item.modelType == '10'"
                :index="i"
                @followBus="followBus"
                :article="item"
              ></activeArticle>
              <activeQuestion
                @followBus="followBus"
                :index="i"
                v-if="item.modelType == '8'"
                :question="item"
              />
              <advertList v-if="item.modelType==-1" :article="item"/>
            </div>
            <i-load-more v-if="(load&&!isover && focusList.length > 0)"/>
            <div style="background: #fff;" v-if="(isover && focusList.length > 0)">
              <loadover classs="list_over"></loadover>
            </div>
          </div>
          <!-- 推荐 -->
          <div :class="detailCode" v-if="detailCode==2">
            <div class="nolist-container" v-if="recommList.length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <div v-for="(item,i) in recommList" :key="i">
              <activeDiary
                v-if="item.modelType == '7'"
                :index="i"
                @followBus="followBus"
                :diaryValue="item"
              ></activeDiary>
              <articleList
                v-if="item.modelType == '9'"
                :index="i"
                @followBus="followBus"
                :video="item"
              ></articleList>
              <activeArticle
                v-if="item.modelType == '10'"
                :index="i"
                @followBus="followBus"
                :article="item"
              ></activeArticle>
              <activeQuestion
                @followBus="followBus"
                :index="i"
                :detailCode="2"
                v-if="item.modelType == '8'"
                :question="item"
              ></activeQuestion>
              <advertList v-if="item.modelType==-1" :article="item"/>
            </div>
            <i-load-more v-if="(load&&!isover && recommList.length > 0)"/>
            <div style="background: #fff;" v-if="(isover && recommList.length > 0)">
              <loadover classs="list_over"></loadover>
            </div>
          </div>
          <!-- 视频 -->
          <div :class="detailCode" v-if="detailCode==3">
            <div class="nolist-container" v-if="videolist.length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <videoList :videolist="videolist"/>
            <!-- <advertList v-if="item.modelType==-1" :article="item"/> -->
            <i-load-more v-if="(load&&!isover && videolist.length > 0)"/>
            <div style="background: #fff;" v-if="(isover && videolist.length > 0)">
              <loadover classs="list_over"></loadover>
            </div>
          </div>
          <!-- 日记本 -->
          <div :class="detailCode" v-if="detailCode==4">
            <div class="nolist-container" v-show="diaryList.length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <div v-for="(item ,index) in diaryList" :key="index">
              <activeDiary @followBus="followBus" :index="index" :diaryValue="item"></activeDiary>
              <advertList v-if="item.modelType==-1" :article="item"/>
            </div>
            <i-load-more v-if="(load&&!isover && diaryList.length > 0)"/>
            <div style="background: #fff;" v-if="(isover && diaryList.length > 0)">
              <loadover classs="list_over"></loadover>
            </div>
          </div>
          <!-- 问答 -->
          <div :class="detailCode" v-if="detailCode==5">
            <div class="nolist-container" v-if="questionList.length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <div v-for="(item,index) in questionList" :key="index">
              <activeQuestion @followBus="followBus" :index="index" :question="item"/>
              <advertList v-if="item.modelType==-1" :article="item"/>
            </div>
            <i-load-more v-if="(load&&!isover && questionList.length > 0)"/>
            <div style="background: #fff;" v-if="(isover && questionList.length > 0)">
              <loadover classs="list_over"></loadover>
            </div>
          </div>
          <!-- 栏目 v-show="activeIndex>=tabLength&& index==activeIndex"-->
          <div
            class="arttype"
            :class="activeIndex +' '+ i"
            v-for="(item,i) in list[activeIndex]"
            :key="i"
          >
            <div class="nolist-container" v-show="list[activeIndex].length==0">
              <div
                class="noData-mode"
                :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
              ></div>
            </div>
            <!-- 视频：9  资讯4   文章10 -->
            <articleList
              v-if="item.modelType == '9'"
              :index="i"
              @followBus="followBus"
              :video="item"
            ></articleList>
            <activeDiary
              v-if="item.modelType == '7'"
              :index="i"
              @followBus="followBus"
              :diaryValue="item"
            ></activeDiary>
            <activeQuestion
              v-if="item.modelType == '8'"
              :index="i"
              @followBus="followBus"
              :question="item"
            />
            <activeArticle
              v-if="item.modelType == '10'"
              :index="i"
              @followBus="followBus"
              :article="item"
            ></activeArticle>
            <advertList v-if="item.modelType==-1" :article="item"/>

            <i-load-more v-if="(load&&!isover && list[activeIndex].length > 0)"/>
          </div>
          <div style="background: #fff;" v-if="(isover && list[activeIndex].length > 0)">
            <loadover classs="list_over"></loadover>
          </div>
        </div>
      </div>
    </div>
    <div class="aws-box" :class="{'active':isTogg}">
      <ul class="aws flex-c">
        <li
          class="flex-r"
          v-if="isTogg && !isHide"
          @click="changeJump('/pagesShow/creatVideoTwo',{init: true})"
        >
          <p>发视频</p>
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_6.png" alt>
        </li>
        <li class="flex-r" v-if="isTogg" @click="changeJump('/pagesShow/selectDiaryBook',{})">
          <p>发日记</p>
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_2.png" alt>
        </li>
        <li class="flex-r" v-if="isTogg" @click="changeJump('/pagesShow/creatQuestion',{})">
          <p>发问答</p>
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_3.png" alt>
        </li>
        <li class="flex-r" v-if="isTogg" @click="changeJump('/pagesShow/creatArticle',{})">
          <p>发文章</p>
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_1.png" alt>
        </li>

        <li class="flex-r" @click="isTogg=!isTogg">
          <p class="no-style"></p>
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_4.png" alt v-if="isTogg">
          <img src="http://img.meiduduo.com/images/xyy/xc_icon_5.png" alt v-else>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import search from "./comm/search.vue"; //顶部搜索框
import activeDiary from "./comm/activeDiary"; //日记样式
import articleList from "./comm/articleList"; //推荐视屏样式
import activeArticle from "./comm/activeArticle"; //文章样式
import activeQuestion from "./comm/activeQuestion"; //问答
import videoList from "./comm/videoList"; //视屏模块
import PdTabs from "./comm/PdTabs";
import advertList from "./comm/advertList";
import loadover from "./comm/loadOver"; // 数据加载完毕展示组件
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      loaded: false,
      current_scroll: 0,
      activeIndex: 1,
      tabLength: 4,
      tabList: [
        {
          label: "关注",
          detailCode: "1"
        },
        {
          label: "推荐",
          detailCode: "2"
        },
        // {
        //   label: "视频",
        //   detailCode: "3"
        // },
        {
          label: "日记",
          detailCode: "4"
        },
        {
          label: "问答",
          detailCode: "5"
        }
      ],
      isTogg: false,
      tabColor: "#FF4691",
      defaultColor: "#fff",
      diaryValue: [],
      overList: [0, 0, 0, 0],
      pageNumList: [1, 1, 1, 1],
      list: [[], [], [], []],
      focusList: [], //关注列表
      recommList: [], //推荐列表
      videolist: [],
      diaryList: [], //日记列表
      questionList: [],
      areaId: "",
      height2: 0,
      load: false,
      screenH: 0,
      isHide: false, // 是否隐藏视频
      initNoData: false,
      banner1: "" //背景图
    };
  },
  components: {
    search,
    activeDiary,
    articleList,
    activeArticle,
    activeQuestion,
    videoList,
    PdTabs,
    loadover,
    advertList
  },

  computed: {
    currentCity() {
      return this.$store.state.curCity;
    },
    curArea() {
      return this.$store.state.curArea;
    },
    pageHeight() {
      return this.height1 + this.height2;
    },
    isover() {
      return this.overList[this.activeIndex];
    },
    detailCode() {
      return this.tabList[this.activeIndex].detailCode;
    }
  },
  onShow() {
    this.loaded = false;
    console.log(this.$store.state.backItem, this.$store.state.backIndex);
    this.queryNav();
    // this.getChanList();
    this.activeIndex = this.$store.state.toPage;
    this.isTogg = false;
    this.pageNumList[this.activeIndex] = 1;
    let columnId = this.tabList[this.activeIndex].detailCode;
    this.getList(
      this.tabList[this.activeIndex].detailCode,
      false,
      true,
      true,
      false
    );
    this.getADList1();
    if (this.$store.state.backAuthor.id != -1) {
      console.log(this.$store.state.backAuthor);
      this.followBus(
        this.$store.state.backAuthor.id,
        this.$store.state.backAuthor.status
      );
    }
    var item = {};
    if (columnId == "1") {
      item = this.focusList[this.$store.state.backIndex];
    } else if (columnId == "2") {
      item = this.recommList[this.$store.state.backIndex];
    } else if (columnId == "3") {
      item = this.videolist[this.$store.state.backIndex];
    } else if (columnId == "4") {
      item = this.diaryList[this.$store.state.backIndex];
    } else if (columnId == "5") {
      item = this.questionList[this.$store.state.backIndex];
    } else {
      item = this.list[this.activeIndex][this.$store.state.backIndex];
    }
    console.log("onshow");
    console.log(this.$store.state.backItem, item, this.$store.state.backIndex);
    if (this.$store.state.backIndex != -1) {
      item.readNum = item.readNum + 1;
      item.commentNum = this.$store.state.backItem.len;
      item.fabulousNum = this.$store.state.backItem.num;
      item.favouriteNum = this.$store.state.backItem.colNum;
      item.isCollection = this.$store.state.backItem.colStatus;
      this.$store.state.backIndex = -1;
    }
    console.log(item);
  },
  onLoad() {
    // this.activeIndex = this.$store.state.toPage;
    console.log("onload");
    this.areaId = this.$store.state.curCityId;
    this.getChanList();
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.screenH = res.windowHeight;
      }
    });
    wx
      .createSelectorQuery()
      .select(".innerfix")
      .fields(
        {
          size: true
        },
        function(res) {
          if (res && res.width) {
            that.height1 = res.height;
          }
        }
      )
      .exec();
  },
  onPullDownRefresh() {
    let columnId = this.tabList[this.activeIndex].detailCode;
    this.pageNumList.splice(this.activeIndex, 1, 1);
    this.overList.splice(this.activeIndex, 1, 0);
    this.getList(columnId, false, true, true, false);
    wx.stopPullDownRefresh();
  },
  watch: {
    load(val) {
      if (val && !this.isover) {
        console.log(val, 1);
        setTimeout(() => {
          console.log(this.tabList[this.activeIndex].detailCode, 2);
          this.getList(
            this.tabList[this.activeIndex].detailCode,
            true,
            false,
            false,
            false
          );
        }, 200);
      }
    },
    areaId() {
      this.getList(
        this.tabList[this.activeIndex].detailCode,
        false,
        false,
        true,
        false
      );
    }
  },
  onReachBottom() {
    this.load = true;
    if (this.overList[this.activeIndex]) return;
    this.pageNumList[this.activeIndex] += 1;
  },
  methods: {
    ...mapMutations(["toVideoFun"]),
    getADList1() {
      this.$http
        .post("/advertRecord/getAdvertRecord", { place: 1545033676008 })
        .then(res => {
          if (
            res.code == 1 &&
            res.data.data &&
            res.data.data[0] &&
            res.data.data[0].pictureUrl
          ) {
            this.banner1 = res.data.data[0].pictureUrl;
          } else {
            this.banner1 = "http://img.meiduduo.com/images/xyy/order-title.png";
          }
        });
    },
    queryNav() {
      this.$http
        .post("/setDisplay/listByCondition", {
          displayType: 1
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data && res.data.length > 0 && res.data[0].isHide == 1) {
              this.isHide = true;
            } else {
              this.isHide = false;
            }
          }
        });
    },
    curCityMth(id) {
      this.$set(this, "areaId", id);
      this.pageNumList.splice(this.activeIndex, 1, 1);
    },
    jump() {
      this.$router.push("/pagesShow/newDiaryBook");
    },
    tabItem(msg) {
      this.loaded = false;
      // this.list[this.activeIndex] = []
      this.initNoData = false;
      this.toVideoFun(msg.i);
      this.activeIndex = msg.i;
      this.pageNumList[this.activeIndex] = 1;
      this.list.splice(this.activeIndex, []);
      this.$set(
        this.tabList[this.activeIndex],
        "detailCode",
        msg.item.detailCode
      );
      this.getList(
        this.tabList[this.activeIndex].detailCode,
        false,
        false,
        false,
        true
      );
    },
    getList(columnId, flag, refresh, areaChange, isTab) {
      console.log(columnId, flag, refresh, areaChange, isTab);
      //code,是否加载更多,刷新,areaid变化,tab切换,
      if (columnId == "1") {
        this.getFocusList(flag, refresh, areaChange, isTab);
        return;
      }
      if (columnId == "3") {
        this.getVideoList(flag, refresh, areaChange, isTab);
        return;
      }
      if (columnId == "4") {
        this.getDiaryBook(flag, refresh, areaChange, isTab);
        return;
      }
      if (columnId == "5") {
        this.getQuestList(flag, refresh, areaChange, isTab);
        return;
      }

      // if (this.activeIndex < this.pageNumList.length && columnId !=2) {
      //   return;
      // }
      // if (this.activeIndex == 1 && this.recommList.length > 0 && isTab) {
      //   return;
      // }
      // if (
      //   this.list[this.activeIndex] &&
      //   this.list[this.activeIndex].length > 0 &&
      //   isTab
      // ) {
      //   return;
      // }
      let areaIds = this.areaId;
      let options = {
        custId: this.$store.state.userInfo.custId,
        pageNum: this.pageNumList[this.activeIndex],
        pageSize: 5,
        auditState: 1,
        appType: 1
      };
      if (areaIds) {
        options = Object.assign({}, options, {
          areaIds: areaIds
        });
      }
      if (this.activeIndex == 1) {
        options = Object.assign({}, options, {
          isRecommend: 1
        });
      } else {
        options = Object.assign({}, options, {
          columnId
        });
      }
      this.$http.post("/wxIndex/list4PageShow", options).then(res => {
        if (res.code == 1) {
          var arr = res.data.data ? res.data.data : [];
          if (res.data.pageNum == 1 && arr.length == 0) {
            this.initNoData = true;
          }
          if (this.activeIndex == 1) {
            if (flag) {
              if (arr.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              // let ret = this.list[this.activeIndex].concat(arr);
              this.compareNum(
                this.pageNumList[this.activeIndex] * 5,
                res.data.total
              );
              // this.recommList.push(...arr);
              this.load = false;
              console.log(this.recommList.length);
              if (this.recommList.length > 100) {
                this.recommList.splice(30, 40).push(...arr);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
              } else {
                this.recommList.push(...arr);
              }
              this.loaded = true;
            } else {
              // this.recommList = [];
              // setTimeout(() => {
              this.$set(this, "recommList", arr);
              this.compareNum(
                this.pageNumList[this.activeIndex] * 5,
                res.data.total
              );
              // }, 20);
              this.loaded = true;
            }
          } else {
            if (flag) {
              if (arr.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              // let ret = this.list[this.activeIndex].concat(arr);
              // let ret = this.list[this.activeIndex].push(...arr);
              // this.list.splice(this.activeIndex, 1, ret);
              this.load = false;
              console.log(this.list[this.activeIndex].length);
              if (this.list[this.activeIndex].length > 100) {
                this.list[this.activeIndex].splice(30, 40).push(...arr);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
                // this.list.splice(this.activeIndex, 1, this.list[this.activeIndex]);
              } else {
                this.list[this.activeIndex].push(...arr);
              }
            } else {
              this.list[this.activeIndex] = arr;
              this.loaded = true;
            }
            this.compareNum(
              this.pageNumList[this.activeIndex] * 5,
              res.data.total
            );
          }
        }
      });
    },
    compareNum(temp, total) {
      if (temp <= total) {
        this.overList.splice(this.activeIndex, 1, 0);
      } else {
        this.overList.splice(this.activeIndex, 1, 1);
      }
    },
    getChanList() {
      this.$http
        .post("/setDisplay/listByCondition", { displayType: 1 })
        .then(res => {
          if (res.code == 1) {
            if (res.data && res.data.length > 0 && res.data[0].isHide == 1) {
              this.tabList = [
                {
                  label: "关注",
                  detailCode: "1"
                },
                {
                  label: "推荐",
                  detailCode: "2"
                },
                // {
                //   label: "视频",
                //   detailCode: "3"
                // },
                {
                  label: "日记",
                  detailCode: "4"
                },
                {
                  label: "问答",
                  detailCode: "5"
                }
              ];
              this.overList = [0, 0, 0, 0];
              this.pageNumList = [1, 1, 1, 1];
              this.list = [[], [], [], []];
              this.tabLength = 4;
            } else {
              this.tabList = [
                {
                  label: "关注",
                  detailCode: "1"
                },
                {
                  label: "推荐",
                  detailCode: "2"
                },
                {
                  label: "视频",
                  detailCode: "3"
                },
                {
                  label: "日记",
                  detailCode: "4"
                },
                {
                  label: "问答",
                  detailCode: "5"
                }
              ];
              this.overList = [0, 0, 0, 0, 0];
              this.pageNumList = [1, 1, 1, 1, 1];
              this.list = [[], [], [], [], []];
              this.tabLength = 5;
            }
          }
          this.$http
            .post("/common/dictList", {
              masterCode: "column_type"
            })
            .then(res => {
              if (res.code == 1) {
                wx.hideLoading();
                let data = res.data ? res.data : [];
                //  this.tabList = data
                data.forEach(element => {
                  this.pageNumList.push(1);
                  this.tabList.push(element);
                  this.list.push([]);
                  this.overList.push(0);
                });
                this.getList(
                  this.tabList[this.activeIndex].detailCode,
                  false,
                  true,
                  true,
                  true
                );
              }
            });
        });
    },
    // 获取关注
    getFocusList(flag, refresh, areaChange, isTab) {
      // if (this.focusList.length && !areaChange && isTab) {
      //   return;
      // }
      this.$http
        .post("/wxIndex/list4PageFocus", {
          custId: this.$store.state.userInfo.custId,
          // areaIds: this.areaId, // 关注列表
          pageNum: this.pageNumList[this.activeIndex],
          pageSize: 10,
          auditState: 1,
          appType: 1
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data.pageNum == 1 && res.data.data.length == 0) {
              this.initNoData = true;
            }
            let arr = res.data.data ? res.data.data : [];
            if (flag) {
              if (arr.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              this.load = false;
              console.log(this.focusList.length);
              if (this.focusList.length > 100) {
                this.focusList.splice(30, 40).push(...arr);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
              } else {
                this.focusList.push(...arr);
              }
              // this.focusList.push(...arr);
              this.compareNum(
                this.pageNumList[this.activeIndex] * 5,
                res.data.total
              );
            } else {
              this.focusList = [];
              setTimeout(() => {
                this.focusList = arr;
                this.loaded = true;
                this.compareNum(
                  this.pageNumList[this.activeIndex] * 5,
                  res.data.total
                );
              }, 50);
            }
          }
        });
    },
    getVideoList(flag, refresh, areaChange, isTab) {
      // if (this.videolist.length && !areaChange && isTab) {
      //   return;
      // }
      this.$http
        .post("/smallVideo/list4PageForApp", {
          userId: this.$store.state.userInfo.custId,
          areaId: this.areaId,
          pageNum: this.pageNumList[this.activeIndex],
          pageSize: 10,
          createType: 1,
          auditState: 1
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data.pageNum == 1 && res.data.data.length == 0) {
              this.initNoData = true;
            }
            if (flag) {
              if (res.data.data.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              let ret = res.data.data ? res.data.data : [];
              this.load = false;
              console.log(this.videolist.length);
              if (this.videolist.length > 100) {
                this.videolist.splice(30, 40).push(...ret);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
              } else {
                this.videolist.push(...ret);
              }
              // this.videolist.push(...ret);
              let isover = ret.length < 10 ? 1 : 0;
              this.overList.splice(this.activeIndex, 1, isover);
            } else {
              this.videoList = [];
              setTimeout(() => {
                this.videolist = res.data.data ? res.data.data : [];
                this.loaded = true;
                let isover = this.videolist.length < 10 ? 1 : 0;
                this.overList.splice(this.activeIndex, 1, isover);
              }, 20);
            }
          }
        });
    },
    //获取日记本
    getDiaryBook(flag, refresh, areaChange, isTab) {
      // if (this.diaryList.length && !areaChange && isTab) {
      //   return;
      // }
      this.$http
        .post("/diaryBook/list4PageForDiaryBook", {
          custId: this.$store.state.userInfo.custId,
          areaIds: this.areaId,
          auditState: 1,
          pageNum: this.pageNumList[this.activeIndex],
          pageSize: 10
          // createType: 1
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data.pageNum == 1 && res.data.data.length == 0) {
              this.initNoData = true;
            }
            if (flag) {
              if (res.data.data.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              this.load = false;
              console.log(this.diaryList.length);
              if (this.diaryList.length > 100) {
                this.diaryList.splice(30, 40).push(...res.data.data);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
              } else {
                this.diaryList.push(...res.data.data);
              }
              // this.diaryList.push(...res.data.data);
              let isover = res.data.data.length < 10 ? 1 : 0;
              this.overList.splice(this.activeIndex, 1, isover);
            } else {
              this.diaryList = res.data.data;
              this.loaded = true;
              let isover = this.diaryList.length < 10 ? 1 : 0;
              this.overList.splice(this.activeIndex, 1, isover);
            }
          }
        });
    },
    getQuestList(flag, refresh, areaChange, isTab) {
      // if (this.questionList.length && isTab && !areaChange) {
      //   return;
      // }
      this.$http
        .post("/question/list4Page4App", {
          custId: this.$store.state.userInfo.custId,
          pageNum: this.pageNumList[this.activeIndex],
          pageSize: 10,
          auditState: 1
        })
        .then(res => {
          if (res.code == 1) {
            if (res.data.pageNum == 1 && res.data.data.length == 0) {
              this.initNoData = true;
            }
            if (flag) {
              let ret = res.data.data ? res.data.data : [];
              if (ret.length == 0) {
                this.overList.splice(this.activeIndex, 1, 1);
                return;
              }
              this.load = false;
              console.log(this.questionList.length);
              if (this.questionList.length > 100) {
                this.questionList.splice(30, 40).push(...ret);
                this.$set(
                  this.pageNumList,
                  this.activeIndex,
                  this.pageNumList[this.activeIndex] - 1
                );
                // this.getList(this.tabList[this.activeIndex].detailCode, true, false, false, false);
              } else {
                this.questionList.push(...ret);
              }
              // this.questionList.push(...ret);
              let isover = ret.length < 10 ? 1 : 0;
              this.overList.splice(this.activeIndex, 1, isover);
            } else {
              // this.questionList = [];
              setTimeout(() => {
                let ret = res.data.data ? res.data.data : [];
                this.$set(this, "questionList", ret);
                this.loaded = true;
                let isover = ret.length < 10 ? 1 : 0;
                this.overList.splice(this.activeIndex, 1, isover);
              }, 20);
            }
          }
        });
    },
    followBus(authorId, state) {
      state = state == 1 ? 1 : 0;
      this.list.forEach((item, index) => {
        item.forEach(v => {
          if (v.author == authorId) {
            v.isFollow = state;
          }
        });
        this.list.splice(index, 1, item);
        // this.$store.commit("backauthorChange", { id: -1, status: "" });
      });
      this.focusList.forEach((item, index) => {
        if (item.author == authorId) {
          item.isFollow = state;
          this.focusList.splice(index, 1, item);
        }
      });
      this.recommList.forEach((item, index) => {
        if (item.author == authorId) {
          item.isFollow = state;
          this.recommList.splice(index, 1, item);
        }
      });
      this.diaryList.forEach((item, index) => {
        console.log(
          item,
          "*******************************************************************"
        );
        if (item.author == authorId) {
          console.log(
            item.author == authorId,
            state,
            "*******************************************************************"
          );
          item.isFollow = state;
          this.diaryList.splice(index, 1, item);
        }
      });
      this.questionList.forEach((item, index) => {
        if (item.author == authorId) {
          item.isFollow = state;
          this.questionList.splice(index, 1, item);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
// @import url("../css/style.less");
.nolist-container {
  position: fixed;
  top: 300rpx;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.no-more-data {
  background: #f5f5f5 !important;
  position: relative;
}
.no-more-data::after {
  content: "";
  display: block;
  width: 100%;
  height: 300rpx;
  // padding-top: 1400rpx;
  background: url("http://img.meiduduo.com/images/nodata.png?1") no-repeat
    center center;
  background-size: 220rpx 270rpx;
  background-position: center 40%;
  text-align: center;
  font-size: 26rpx;
  color: #aaaaaa;
  position: absolute;
  top: 400rpx;
}
.cle {
  width: 100%;
  position: absolute;
  top: 178rpx;
  left: 0;
  z-index: 10;
  // height: 500rpx;
  overflow-y: scroll;
  // bottom: 0;
}

.cle::-webkit-scrollbar {
  display: none;
}

.ads {
  background-color: #f00 !important;
}

.vo {
  padding-top: 0;
  background: #f5f5f5;
}

.co {
  padding: 0 @basePadding;
  // margin-top: 170px;
}

.bg-show {
  width: 100%;
  height: 150px;
  // background-image: url("http://img.meiduduo.com/images/xyy/order-title.png");
  background-repeat: no-repeat;
}

.fixation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-size: 100% 282rpx;
}
.innerfix {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 11;
  height: 178rpx;
  background-size: 100% 282rpx;
  // background-image: url("http://img.meiduduo.com/images/xyy/order-title.png");
  background-repeat: no-repeat;
  // background-color: #f5f5f5;
}
.aws-box {
  .aws {
    padding: 0 0 10rpx 0;
    position: fixed;
    right: 15px;
    bottom: 0;
    z-index: 12;

    & > li {
      margin-bottom: 15rpx;
      justify-content: space-between;
      align-items: center;

      & > img {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
      }

      & > p {
        margin-right: 14rpx;
        width: 50px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        color: @baseFirstTitleColor;
        background-color: @baseBackground-c;
        border-radius: 6px;
      }

      & > .no-style {
        background-color: transparent;
      }
    }
  }
}

.active {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 11;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
