<template>
  <div class="search">
    <div class="search-header">
      <div class="search-input">
        <img v-if="!isFocus" src="http://img.meiduduo.com/images/search.png" alt>
        <input
          v-model="value"
          @focus="focus"
          @confirm="done"
          type="text"
          confirm-type="搜索"
          :placeholder="placeholder"
        >
      </div>
      <span @click.stop="cancel" class="cancel-btn">取消</span>
    </div>

    <div v-if="!queryed" class="search-hot-words">
      <p v-if="hotWords.length > 0" class="hot-woeds-label">最近搜索</p>
      <span
        @click.stop="done(value)"
        class="hot-words-item"
        v-for="(value, index) of hotWords"
        v-if="index<8"
        :key="index"
      >{{ value }}</span>
      <p v-if="hotWordsByApi.length > 0" class="hot-woeds-label">热门搜索</p>
      <span
        @click.stop="done(item.searchWord)"
        class="hot-words-item"
        v-for="(item, index) of hotWordsByApi"
        v-if="item.state == 1&&index<8"
        :key="index"
      >{{ item.searchWord }}</span>
    </div>

    <div v-if="queryed && !source" class="search-main">
      <div class="search-main-tabs">
        <i-tabs :current="current" color="#FF4691" @change="handleChange">
          <i-tab key="tab5" title="机构"></i-tab>
          <i-tab key="tab1" title="项目"></i-tab>
          <i-tab key="tab2" title="日记"></i-tab>
          <i-tab key="tab3" title="问答"></i-tab>
          <i-tab key="tab4" title="服务者"></i-tab>
        </i-tabs>
      </div>
      <div class="search-main-content">
        <div v-if="list.length > 0">
          <div v-if="current == 'tab1'" class="project-cards">
            <search-project-card
              @jumpProject="jumpProject"
              v-for="(item, index) of list"
              :key="index"
              :data="item"
            ></search-project-card>
          </div>
          <div v-if="current == 'tab3'" class="question-cards">
            <questList :data="list"></questList>
          </div>
          <div v-if="current == 'tab2'" class="diary-cards">
            <search-diary-card v-for="(item, index) of list" :key="index" :data="item"></search-diary-card>
          </div>
          <div v-if="current == 'tab4'" class="doctor-cards">
            <search-doctor-card v-for="(item, index) of list" :key="index" :data="item"></search-doctor-card>
          </div>
          <div v-if="current == 'tab5'" class="hospital-cards">
            <search-hospital-card :data="list"></search-hospital-card>
          </div>
        </div>
        <div id="nolist" v-if="list.length == 0">
          <div class="noData-mode noData-init" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
        </div>
        <load-over v-if="list.length > 0"></load-over>
      </div>
    </div>
    <div v-if="queryed && source" class="search-main" style="padding-top:94rpx;">
      <exchange :list="list" :point="point"></exchange>
      <div id="nolist" v-if="list.length == 0">
        <div class="noData-mode noData-init" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store/index.js";
import searchDoctorCard from "./comm/searchDoctorCard";
import searchProjectCard from "./comm/searchProjectCard";
import searchDiaryCard from "./comm/searchDiaryCard";
import questList from "../pages/comm/questList";
import searchhospitalCard from "./comm/searchhospitalCard";
import loadOver from "../pages/comm/loadOver";
import exchange from "../pages/comm/exchange";
export default {
  components: {
    "search-doctor-card": searchDoctorCard,
    "search-project-card": searchProjectCard,
    "search-diary-card": searchDiaryCard,
    questList: questList,
    "search-hospital-card": searchhospitalCard,
    "load-over": loadOver,
    exchange
  },
  data() {
    return {
      loaded: false,
      placeholder: "鼻综合",
      value: "",
      isFocus: false, // 输入框是否focus
      hotWordsByApi: [], // 接口返回的热门搜索数据
      current: "tab", // 选项卡
      queryed: false, // 是否搜索
      list: [], // 接口返回的列表数据
      params: {
        // 请求数据的参数
        pageSize: 15,
        type: "commodity",
        param: ""
      },
      source: null,
      isOver: false, // 数据是否加载完毕
      pageNum: 1, // 请求页数
      point: ""
    };
  },
  onShow() {
    this.loaded = false
    console.log(this.$route.query.source);
    this.source = this.$route.query.source == "true" ? true : false;
    if (Store.state.isInit) {
      // 是否初始化
      this.init();
      this.$set(this.$store.state, "isInit", false);
      if (this.source) {
        // this.queryListByJiFen()
        this.getPoint();
      } else {
        this.queryHotWord();
      }
    }
  },
  computed: {
    hotWords() {
      return Store.state.hotWords;
    }
  },
  onReachBottom() {
    // 页面触底触发事件
    if (this.source) {
      this.queryListByJiFen();
      return;
    }
    this.params = { ...this.params, pageNum: this.pageNum };
    this.query();
  },
  methods: {
    getPoint() {
      this.$http
        .post("/customer/queryOneByCondition", {
          id: this.$store.state.userInfo.custId
        })
        .then(res => {
          if (res.code == 1) {
            this.point = res.data.point;
          }
        });
    },
    done(event) {
      // 点击手机输入法 完成（或者换行）按钮 触发

      let a = Store.state.hotWords;
      var index;
      if (event.target) {
        if (!this.value) {
          this.value = this.placeholder;
        }
        index = a.indexOf(this.value);
      } else {
        index = a.indexOf(event);
      }

      // 去重
      if (index > -1) {
        a.splice(index, 1);
      }
      this.value = this.value || event;
      this.$set(Store.state, "hotWords", [`${this.value}`, ...a]);
      this.queryed = true;
      this.current = "tab5";
      this.params = {
        ...this.params,
        param: this.value,
        type: "organ",
        pageNum: 1
      };
      this.list = [];
      this.isOver = false;
      if (this.source) {
        this.queryed = true;

        this.queryListByJiFen();
      } else {
        this.query();
      }
    },
    cancel() {
      // 取消当前搜索
      this.value = "";
      this.isFocus = false;
      this.queryed = false;
    },
    focus() {
      // 输入框聚焦
      this.isFocus = true;
    },
    init() {
      // 初始化
      this.placeholder = "鼻综合";
      this.value = "";
      this.isFocus = false;
      this.hotWordsByApi = [];
      this.queryed = false;
      this.list = [];
      this.params = {
        // 请求数据的参数
        pageSize: 15,
        pageNum: 1,
        type: "organ",
        param: ""
      };
      this.isOver = false;
      this.pageNum = 1;
    },
    handleChange(event) {
      this.loaded = false
      // 切换tab时的处理
      this.current = event.target.key;
      this.isOver = false;
      if (event.target.key == "tab1") {
        this.list = [];
        this.params = { ...this.params, type: "commodity", pageNum: 1 };
        this.query();
      }
      if (event.target.key == "tab4") {
        this.list = [];
        this.params = { ...this.params, type: "doctor", pageNum: 1 };
        this.query();
      }
      if (event.target.key == "tab2") {
        this.list = [];
        this.params = { ...this.params, type: "diary", pageNum: 1 };
        this.query();
      }
      if (event.target.key == "tab3") {
        this.list = [];
        this.params = { ...this.params, type: "question", pageNum: 1 };
        this.query();
      }
      if (event.target.key == "tab5") {
        this.list = [];
        this.params = { ...this.params, type: "organ", pageNum: 1 };
        this.query();
      }
    },
    query() {
      // 请求数据
      if (this.isOver) {
        return;
      }
      // wx.showLoading({
      //   title: '加载中...',
      //   mask: true
      // })
      // TODO: 全文搜索添加区域id
      if (this.$store.state.curCityId) {
        this.params = { ...this.params, areaId: this.$store.state.curCityId }
      } else {
        delete this.params.areaId
      }
      this.$http
        .post("elasticSearch/findByCondition", this.params)
        .then(res => {
          // wx.hideLoading()
          console.log(res);
          if (res.code === 1) {
            let a = res.data.data;
            for (let i = 0, j = a.length; i < j; i++) {
              if (a[i].commImg) {
                a[i].commImg = a[i].commImg.split(",");
              } else {
                a[i].commImg = [];
              }
              if (a[i].afterPhoto) {
                a[i].afterPhoto = a[i].afterPhoto.split(",");
              } else {
                a[i].afterPhoto = [];
              }
            }
            if (this.pageNum < res.data.pages && a.length == 15) {
              this.isOver = false;
              this.pageNum++;
            } else {
              this.isOver = true;
            }
            this.list = this.list.concat(a);
            this.loaded = true
            console.log(this.list);
          }
        });
    },
    jumpProject(val) {
      // 跳转到项目详情页
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id: val
        }
      });
    },
    queryHotWord() {
      // 请求热搜词
      this.$http
        .post("searchHistory/listByConditionHotkeyword", {
          showNum: 8
        })
        .then(res => {
          if (res.code === 1) {
            this.hotWordsByApi = res.data;
          }
        });
    },
    queryListByJiFen() {
      // 请求活动商品
      this.$http
        .post("/pointCommodity/queryAll", {
          pageNum: this.pageNum,
          pageSize: 15,
          longitude: this.$store.state.longitude,
          latitude: this.$store.state.latitude,
          areaId: this.$store.state.curCityId,
          isLimitTime: 0,
          commName: this.value ? this.value : this.placeholder
        })
        .then(res => {
          if (res.code === 1) {
            let a = res.data.data ? res.data.data : [];
            a.forEach(element => {
              if (element.distance != "距离过远") {
                var v = parseFloat(element.distance);
                element.distance = v.toFixed(3);
              }
              element.commImg = element.commImg.split(",");
              console.log(element.commImg);
            });
            this.list = a;
          }
        });
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.search {
  background: #f5f5f5;
  min-height: 100%;
  box-sizing: border-box;
}
.search-header {
  width: 100%;
  background: #fff;
  padding: 17rpx 0 21rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-item: center;
  position: fixed;
  top: 0;
  z-index: 5;
}
.search-input {
  width: 585rpx;
  height: 56rpx;
  border-radius: 6rpx;
  background: #f5f5f5;
  font-size: 24rpx;
  margin-left: 30rpx;
  padding: 0 31rpx;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-item: center;
}
.search-input > img {
  width: 24rpx;
  height: 24rpx;
  margin-right: 31rpx;
}
.search-input > input {
  flex: 1;
}
.cancel-btn {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #ff4691;
}
.search-hot-words {
  height: 1195rpx;
  width: 100%;
  background: #fff;
  padding: 58rpx 30rpx;
  padding-top: 151rpx;
}
.hot-woeds-label {
  color: #333333;
  font-size: 28rpx;
  margin-bottom: 35rpx;
}
.hot-words-item {
  width: 160rpx;
  display: inline-block;
  height: 50rpx;
  border-radius: 25rpx;
  background: #f5f5f5;
  color: #333333;
  font-size: 24rpx;
  text-align: center;
  line-height: 50rpx;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10rpx;
  margin-bottom: 18rpx;
  box-sizing: border-box;
}
.search-main {
  background: #f5f5f5;
}
.search-main-tabs {
  width: 100%;
  margin-bottom: 19rpx;
  position: fixed;
  top: 92rpx;
  z-index: 5;
}
.search-main-content {
  padding-top: 195rpx;
}
.doctor-cards {
  background: #fff;
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
}
</style>
