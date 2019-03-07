<style>
.recomm {
  padding: 30rpx;
}
.recomm .arttype {
  margin-bottom: 18rpx;
}
.nolist-container {
  position: fixed;
  top: 208rpx;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.nolist-container1 {
  top: 788rpx;
}
</style>
<template>
  <div class="activeRecomm">
    <div class="recomm">
      <div class="arttype" v-for="(item,i) in list[activeIndex]" :key="i">
        <!-- 视频：9  资讯4   文章10 -->
        <arti v-if="item.modelType == '4'" :index="i" @followBus="followBus" :arti="item"></arti>
        <articleList v-if="item.modelType == '9'" :index="i" @followBus="followBus" :video="item"></articleList>
        <activeArticle
          v-if="item.modelType == '10'"
          :index="i"
          @followBus="followBus"
          :article="item"
        ></activeArticle>
        <advertList v-if="item.modelType==-1" :article="item"/>
        <!-- <randomAd v-if="item.modelType == '0'"></randomAd> -->
      </div>
      <!-- 推荐文章 -->
      <!-- <div class="arttype">
          <arti></arti>
      </div>-->
      <!-- <div class="arttype">
          <randomAd></randomAd>
        </div>
        <div class="arttype">
          <articleList></articleList>
        </div>
        <div class="arttype">
          <articleListTwo></articleListTwo>
      </div>-->
      <div v-if="(isover && list[activeIndex].length > 0)">
        <loadover classs="list_over"></loadover>
      </div>
      <i-load-more v-if="load&&list[activeIndex].length>0&&!isover"/>
    </div>
    <div
      :class="activeIndex==0?'nolist-container nolist-container1': 'nolist-container'"
      v-if="list[activeIndex]==0"
    >
      <div
        class="noData-mode"
        :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
      ></div>
    </div>
  </div>
</template>

<script>
import advertising from "../../pages/comm/advertising"; //中间导航
import activebox from "../../pages/comm/activeBox"; //中间导航
import arti from "../../pages/comm/activeNews"; //资讯
import randomAd from "../../pages/comm/randomAd"; //广告
import advertList from "../../pages/comm/advertList"; //广告 xyy editor
import activeArticle from "../../pages/comm/activeArticle"; //文章
import articleList from "../../pages/comm/articleList"; //视频
import loadover from "../../pages/comm/loadOver"; // 数据加载完毕展示组件

export default {
  data() {
    return {
      loaded: false,
      pageNumList: [1],
      list: [[]],
      overList: [0],
      areaIdStatus: true,
      load: false
    };
  },
  props: ["code", "activeIndex", "areaId"],
  components: {
    advertising,
    activebox,
    arti,
    randomAd,
    articleList,
    activeArticle,
    loadover,
    advertList
  },
  computed: {
    isover() {
      return this.overList[this.activeIndex];
    },
    httpUrl() {
      return this.$store.state.httpUrl1;
    }
  },
  watch: {
    code(val) {
      this.code = val;
      this.getList(val, this.areaId, false, false);
    },
    load(val) {
      if (val && !this.isover) {
        console.log(val);
        setTimeout(() => {
          this.getList(this.code, this.areaId, true);
        }, 200);
      }
    },
    areaId(val) {
      this.areaId = val;
      this.$set(this, "areaIdStatus", false);
      this.pageNumList.forEach((element, index) => {
        this.pageNumList.splice(index, 1, 1);
      });
      this.getList(this.code, this.areaId, false, true);
    },
    activeIndex(val) {
      this.loaded = false;
      this.activeIndex = val;
    }
  },
  methods: {
    compareNum(temp, total) {
      if (temp <= total) {
        this.overList.splice(this.activeIndex, 1, 0);
      } else {
        this.overList.splice(this.activeIndex, 1, 1);
      }
    },

    getList(channelCode, id, flag, areaChange) {
      let options = {
        custId: this.$store.state.userInfo.custId,
        pageNum: this.pageNumList[this.activeIndex],
        pageSize: 5,
        appType: 1
      };
      if (id) {
        options = Object.assign({}, options, {
          areaIds: id
        });
      }

      if (!this.activeIndex) {
        options = Object.assign({}, options, {
          isRecommend: 1
        });
      } else {
        options = Object.assign({}, options, {
          channelCode
        });
      }
      // if (
      //   this.list[this.activeIndex] &&
      //   this.list[this.activeIndex].length > 0 &&
      //   !flag &&
      //   !areaChange
      // ) {
      //   return;
      // }
      this.$http.post("/wxIndex/list4Page", options).then(res => {
        if (res.code == 1) {
          let ret = res.data.data ? res.data.data : [];
          if (flag) {
            if (ret && ret.length == 0) {
              this.overList.splice(this.activeIndex, 1, 1);
              return;
            }
            this.compareNum(
              this.pageNumList[this.activeIndex] * 5,
              res.data.total
            );
            console.log(this.list[this.activeIndex].length);
            this.load = false;
            if (this.list[this.activeIndex].length > 100) {
              this.list[this.activeIndex].splice(30, 40).push(...ret);
              this.$set(
                this.pageNumList,
                this.activeIndex,
                this.pageNumList[this.activeIndex] - 1
              );
              // this.getList(this.code, this.areaId, true);
            } else {
              this.list[this.activeIndex].push(...ret);
            }
          } else {
            this.loaded = true;
            this.list.splice(this.activeIndex, 1, ret);
            let temp = this.pageNumList[this.activeIndex] * 5;
            this.compareNum(temp, res.data.total);
          }
          // 插入广告
          // 广告埋点【李克凡】
        }
      });
    },
    followBus(author, state) {
      state = state == 1 ? 1 : 0;
      this.list.forEach((item, index) => {
        item.forEach(v => {
          if (v.author == author) {
            v.isFollow = state;
          }
        });
        this.list.splice(index, 1, item);
        this.$store.commit("backauthorChange", { id: -1, status: "" });
      });
    }
  },
  onLoad() {
    this.activeIndex = 0;
    let listNum = this.$store.state.topNavNum;
    for (let i = 0; i < listNum; i++) {
      this.list.push([]);
      this.pageNumList.push(1);
      this.overList.push(0);
    }
    this.getList("", this.areaId, false);
  },
  onShow() {
    console.log(this.$store.state.backItem, this.$store.state.backIndex);
    this.overList.splice(this.activeIndex, 1, 0);
    this.pageNumList.splice(this.activeIndex, 1, 1);
    // this.getList(this.code, this.areaId, false, true);
    if (this.$store.state.backAuthor.id != -1) {
      this.followBus(
        this.$store.state.backAuthor.id,
        this.$store.state.backAuthor.status
      );
    }
    var item = this.list[this.activeIndex][this.$store.state.backIndex];
    console.log("onshow");
    if (this.$store.state.backIndex != -1) {
      item.readNum = item.readNum + 1;
      item.commentNum = this.$store.state.backItem.len;
      item.fabulousNum = this.$store.state.backItem.num;
      this.$store.state.backIndex = -1;
    }
  },
  onPullDownRefresh() {
    this.overList.splice(this.activeIndex, 1, 0);
    this.pageNumList.splice(this.activeIndex, 1, 1);
    this.getList(this.code, this.areaId, false, true);
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    this.load = true;
    if (this.overList[this.activeIndex]) return;
    this.pageNumList[this.activeIndex] += 1;
  }
};
</script>
