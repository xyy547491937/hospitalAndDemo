<template>
  <div class="fight_group">
    <div class="tabs">
      <i-tabs :current="current" color="#f759ab" @change="handleChange">
        <i-tab key="tab1" title="正在热拼"></i-tab>
        <i-tab key="tab2" title="即将开始"></i-tab>
      </i-tabs>
    </div>
    <div v-if="current == 'tab1'" class="group_list">
      <!-- 广告位 -->
      <!-- <img  mode="scaleToFill" :src="banner1" @click="changeJump(skipParam1.url,{id:skipParam1.id,type:skipParam1.wordtype})" alt=""> -->
      <img
        mode="scaleToFill"
        :src="skipParam1.pictureUrl"
        alt
        @click="advertGo(skipParam1)"
        v-if="adList.length>0"
      >
      <div v-if="list.length > 0" class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <load-over v-if="isOver && list.length > 0"></load-over>
      <div id="nolist" v-if="list.length < 1">
        <div
          class="noData-mode"
          :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
        ></div>
      </div>
    </div>
    <div v-if="current == 'tab2'" class="group_list">
      <!-- 广告位 -->
      <!-- <img  mode="scaleToFill" :src="banner1" @click="changeJump(skipParam1.url,{id:skipParam1.id,type:skipParam1.wordtype})" alt=""> -->
      <img
        mode="scaleToFill"
        :src="skipParam2.pictureUrl"
        alt
        @click="advertGo(skipParam2)"
        v-if="adList1.length>0"
      >
      <div v-if="list.length > 0" class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <load-over v-if="isOver && list.length > 0"></load-over>
      <div id="nolist" v-if="list.length < 1">
        <div
          class="noData-mode"
          :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import projectCard from "../../pages/comm/project_card";
import loadOver from "../../pages/comm/loadOver";
export default {
  data() {
    return {
      loaded: false,
      current: "tab1",
      list: [],
      pageNum: 1, // 页数
      pageSize: 10, // 每页条数
      isOver: false, // 是否加载完毕
      banners: [
        "http://img.meiduduo.com/images/shop/pt.png?" + Math.random() / 9999,
        "http://img.meiduduo.com/images/shop/banner1.png?" +
          Math.random() / 9999
      ], // 拼团banner图
      banner1: "",
      banner2: "",
      skipParam1: {},
      skipParam2: {},
      adList: [],
      adList1: []
    };
  },
  components: {
    projectCard,
    "load-over": loadOver
  },
  mounted() {
    // this.query(1)
  },
  onShow() {
    this.loaded = false;
    this.isOver = false;
    this.pageNum = 1;
    this.list = [];
    if (this.current == "tab1") {
      this.query(1);
    }
    if (this.current == "tab2") {
      this.query(0);
    }
    // this.getADList1();
    this.getAdvert();
  },
  onUnload() {
    this.isOver = false;
    this.list = [];
    this.pageNum = 1;
  },
  onReachBottom() {
    this.lower();
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.isOver = false;
    this.list = [];
    if (this.current == "tab1") {
      this.query(1);
    }
    if (this.current == "tab2") {
      this.query(0);
    }
  },
  methods: {
    advertGo(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertCost/updateAdvertClickNumber",
          {
            advertId: item.advertId
          }
        )
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
    getAdvert() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2PT20",
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
    getAdvert1() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2PT21",
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
            this.adList1 = b;
            this.skipParam2 = b[0];
          }
        });
    },
    handleChange(val) {
      this.loaded = false;
      this.current = val.target.key;
      this.isOver = false;
      this.list = [];
      this.pageNum = 1;
      if (this.current == "tab1") {
        this.query(1);
      }
      if (this.current == "tab2") {
        this.query(0);
        // this.getADList2();
        this.getAdvert1();
      }
    },
    lower() {
      if (this.isOver) {
        // 如果数据加载完毕，不再触发请求
        return;
      }
      if (this.current == "tab1") {
        this.query(1);
      }
      if (this.current == "tab2") {
        this.query(0);
      }
    },
    query(val) {
      let self = this;
      this.$http
        .post("fightGroup/list4PageGroupVersion4", {
          onState: val,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.dealData(res);
        });
    },
    dealData(res) {
      if (res.code === 1 && res.data.data !== null) {
        if (
          this.pageNum >= res.data.pages ||
          res.data.data.length < this.pageSize
        ) {
          this.isOver = true;
        } else {
          this.pageNum++;
        }
        this.list = this.list.concat(res.data.data);
        this.loaded = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.fight_group {
  min-height: 100%;
  background: #f5f5f5;
}
.img {
  width: 100%;
  height: 2.1rem;
}
.isOver {
  font-size: 22rpx;
  color: #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 17rpx 0;
}
.tabs {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.no_data {
  width: 100%;
  height: 400rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #d9d9d9;
  text-align: center;
}
.group_list {
  margin-top: 90rpx;
  & > img {
    height: 210rpx;
    width: 100%;
    display: block;
  }
}
.content {
  background: #fff;
}
</style>
