<template>
  <div class="sharing-all">
    <div class="sharing-ad-banner">
      <!-- 广告 -->
      <!-- <img :src="banner1" @click="changeJump(skipParam1.url,{id:skipParam1.id,type:skipParam1.wordtype})"  alt=""> -->
      <img :src="skipParam1.pictureUrl" alt @click="advertGo(skipParam1)" v-if="adList.length>0">
    </div>
    <div class="sharing-tabs" :class="{ 'follow-top': scrollTop > 500 }">
      <pd-tabs :tabArr="tabArr" :cur="current_scroll" @tabItem="tabItem"></pd-tabs>
    </div>
    <div v-if="list.length > 0" class="sharing-list">
      <div class="sharing-list-left">
        <commodity-card
          v-for="(item, index) of listLeft"
          share="true"
          :key="index"
          :data="item"
          @jump="jump"
        ></commodity-card>
      </div>
      <div class="sharing-list-right">
        <commodity-card
          v-for="(item, index) of listRight"
          share="true"
          :key="index"
          :data="item"
          @jump="jump"
        ></commodity-card>
      </div>
    </div>
    <div class="no-data-box" v-if="list.length < 1"></div>
    <div v-if="isOver && list.length > 4">
      <load-over classs="list_over"></load-over>
    </div>
  </div>
</template>

<script>
import PdTabs from "../pages/comm/PdTabs";
import commodityCard from "../pages/comm/commodity_card";
import LoadOver from "../pages/comm/loadOver";
export default {
  data() {
    return {
      tabArr: [],
      isRemoned: {
        label: "推荐",
        id: 0
      },
      current_scroll: 0,
      list: [],
      listLeft: [],
      listRight: [],
      params: {
        pageNum: 1,
        pageSize: 20,
        isRepresent: 1
      },
      channelCode: "",
      isOver: false,
      scrollTop: 0,
      banner:
        "http://img.meiduduo.com/images/index/banner.png?" +
        Math.random() / 9999, // banner图
      banner1: "",
      skipParam1: {},
      adList: []
    };
  },

  components: {
    "pd-tabs": PdTabs,
    "commodity-card": commodityCard,
    "load-over": LoadOver
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  mounted() {
    this.scrollTop = 0;
    this.getTabs();
    this.queryList();
    this.getAdvert();
  },
  onShow() {
    // this.getTabs()
    // this.queryList()
  },
  onReachBottom() {
    // 触底加载更多
    this.queryList();
  },
  onPageScroll(project) {
    // 监测滚动
    this.scrollTop = project.scrollTop;
  },
  methods: {
    advertGo(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(this.httpUrl + "/sys/advertCost/updateAdvertClickNumber", {
          advertId: item.advertId
        })
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
            placeCode: "2PT30",
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
                  wordtype = 4;
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
    jump(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(this.httpUrl + "advertCost/updateAdvertClickNumber", {
          advertId: placeId
        })
        .then(res => {
          if (res.code == 0) {
            this.changeJump(item.skipParam.url, {
              id: item.skipParam.id,
              type: item.skipParam.wordtype
            });
          }
        });
    },
    initQuery() {
      this.list = [];
      this.listRight = [];
      this.listLeft = [];
      this.params.pageNum = 1;
      this.isOver = false;
    },
    getTabs() {
      this.$http
        .post("common/dictList", {
          masterCode: "channel_type"
        })
        .then(res => {
          if (res.code == 1 && res.data) {
            res.data.unshift(this.isRemoned);
            this.tabArr = res.data;
          }
        });
    },
    tabItem(value) {
      console.log(value);
      this.current_scroll = value.i;
      if (value.i) {
        this.channelCode = value.item.detailCode;
      } else {
        this.channelCode = "";
      }
      this.initQuery();
      this.queryList();
    },
    jump(val) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id: val
        }
      });
    },
    queryList() {
      if (this.isOver) {
        return;
      }

      // wx.showLoading({
      //   title: '加载中...'
      // })

      if (this.channelCode) {
        this.params.channelCode = this.channelCode;
      } else {
        delete this.params.channelCode;
      }
      if (this.current_scroll == 0) {
        this.params.isRecommend = 1;
      } else {
        delete this.params.isRecommend;
      }

      this.$http.post("/commodity/commodityList", this.params).then(res => {
        // wx.hideLoading()
        if (res.code === 1) {
          if (
            this.params.pageNum >= res.data.pages ||
            res.data.data.length < this.params.pageSize
          ) {
            this.isOver = true;
          } else {
            this.params.pageNum++;
          }
          let a = res.data.data;
          for (let i = 0, j = a.length; i < j; i++) {
            if (a[i].commImg) {
              a[i].commImg = a[i].commImg.split(",");
            } else {
              a[i].commImg = [];
            }
          }
          this.list = this.list.concat(a);
          for (let i = 0, j = this.list.length; i < j; i++) {
            if (i % 2) {
              this.listRight.push(this.list[i]);
            } else {
              this.listLeft.push(this.list[i]);
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.sharing-all {
  min-height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
}
.sharing-ad-banner {
  width: 100%;
  height: 360rpx;
  box-sizing: border-box;
}
.follow-top {
  position: fixed;
  top: 0;
}
.sharing-ad-banner > img {
  width: 100%;
  height: 100%;
}
.sharing-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  display: -webkit-flex;
  -webkit-align-items: flex-start;
  box-sizing: border-box;
  padding: 24rpx 30rpx 0 30rpx;
}
.sharing-list-left,
.sharing-list-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}
.sharing-list-right {
  align-items: flex-end;
}
.no-data-box {
  flex: 1;
  background: #fff url("http://img.meiduduo.com/images/nodata.png?1") no-repeat
    center center;
  background-size: 220rpx 270rpx;
  background-position: center 40%;
  text-align: center;
}
.sharing-tabs {
  background-color: #fff;
}
</style>
