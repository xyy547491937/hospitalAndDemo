<style>
.exchangeList{
  height: 100%;
  background: #f5f5f5;
}
.jf-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background: #fff;
}
.jf-tabs {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
}
.jf-tabs .item {
  display: flex;
  flex: 1;
  font-size: 28rpx;
  color: #333;
  padding: 0 44rpx;
}
.jf-tabs .item.left {
  justify-content: flex-end;
}
.jf-tabs .item.right {
  justify-content: flex-start;
}
.jf-tabs .item.active {
  color: #ff4691;
}
.jf-tabs .item .text {
  padding: 18rpx 0;
}
.jf-tabs .item.active .text {
  border-bottom: 1px solid #ff4691;
}
.exlist {
  background: #f5f5f5;
  padding-top: 165rpx;
}
.boex {
  position: fixed;
  bottom: 30rpx;
  right: 30rpx;
  z-index: 10;
  background: #000;
  color: #fff;
  font-size: 26rpx;
  padding: 4rpx;
  border-radius: 50%;
  width: 110rpx;
  height: 110rpx;
  line-height: 110rpx;
  text-align: center;
}
</style>

<template>
 <div class="exchangeList">
     <div class="jf-top">
        <div style="padding: 0.2rem;background-color:#FFFFFF;">
            <!-- v-bind:currentCity="state.curCity" @curCityMth="curCityMth" -->
            <search v-bind:currentCity="state.curCity" v-bind:source="true" @curCityMth="curCityMth"></search>
        </div>
        <div class="jf-tabs">
            <div class="item left" :class="{active:activeIndex==0}" @click="change(0)">
                <span class="text">全部兑换</span>
            </div>
            <div class="item right" :class="{active:activeIndex==1}" @click="change(1)">
                <span class="text">我能兑换</span>
            </div>
        </div>

     </div>
     <div class="exlist">
          <div class="all-list" v-if="activeIndex==0" style="padding-top:6rpx;">
              <div id="nolist" v-if="listAll.length==0">
                  <div  class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
              </div>
              <exchange :list="listAll" :point='point'></exchange>
              <div v-if="isOver && listAll.length > 0">
                <load-over classs="list_over"></load-over>
              </div>
          </div>
          <div class="mylist" v-if="activeIndex==1" style="padding-top:6rpx;">
              <div id="nolist" v-if="mylist.length==0">
                  <div  class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
              </div>
              <exchange :list="mylist"  :point='point'></exchange>
              <div v-if="isOver && mylist.length > 0">
                <load-over classs="list_over"></load-over>
              </div>
          </div>
     </div>
     <div class="boex" @click="changeJump('/pagesShop/allOn')" >
        已兑换
     </div>
 </div>
</template>

<script>
import search from "../pages/comm/search"; //顶部搜索框
import exchange from "../pages/comm/exchange";
import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件

export default {
  data() {
    return {
      loaded: false,
      tabList: ["全部兑换", "我能兑换"],
      pageNum: [1, 1],
      activeIndex: 0,
      listAll: [],
      mylist: [],
      point: "",
      isOver: false
    };
  },
  components: {
    search,
    exchange,
    "load-over": loadOver
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    },
    areaId() {
      console.log(this.$store.state.curCityId);
      return this.$store.state.curCityId;
    },
    state(value) {
      return this.$store.state;
    }
  },
  onShow() {
    this.loaded = false
    this.getPoint();
    if (this.activeIndex == 0) {
      this.getAllList();
    } else {
      this.getMyList();
    }
  },
  onReachBottom() {
    if (!this.isOver) {
      if (this.activeIndex == 0) {
        this.getAllList();
      } else {
        this.getMyList();
      }
    }
  },
  onPullDownRefresh() {
    this.isOver = false;
    if (this.activeIndex == 0) {
      this.pageNum[0] = 1;
      this.getAllList();
    } else {
      this.pageNum[1] = 1;
      this.getMyList();
    }
    wx.stopPullDownRefresh();
  },
  methods: {
    curCityMth(id) {
      console.log(id, "改变");
      this.$set(this, "areaId", id);
    },
    change(index) {
      this.loaded = false
      this.activeIndex = index;
      this.isOver = false;
      if (!index) {
        this.pageNum[0] = 1;
        this.getAllList();
      } else {
        this.pageNum[1] = 1;
        this.getMyList();
      }
    },
    getAllList() {
      this.$http
        .post("/pointCommodity/queryAll", {
          longitude: this.$store.state.longitude,
          latitude: this.$store.state.latitude,
          areaId: this.areaId,
          pageNum: this.pageNum[0],
          isLimitTime: 0,
          pageSize: 10,
          commName: ""
        })
        .then(res => {
          let a = res.data.data ? res.data.data : [];
          console.log(a, 1231231)
          a.forEach(element => {
            if (element.distance!='距离过远') {
              var v = parseFloat(element.distance)
              element.distance = v.toFixed(3)
            }
            element.commImg = element.commImg.split(',')
            console.log(element.commImg)
          });
          if (res.data.pageNum == 1) {
            this.listAll = a;
          } else {
            this.listAll = this.listAll.concat(a);
          }
          this.loaded = true
          if (this.pageNum[0] == res.data.pages || a.length < this.pageSize) {
            this.isOver = true;
          } else {
            this.pageNum[0] = this.pageNum[0] + 1;
            this.isOver = false;
          }
        });
    },
    getMyList() {
      this.$http
        .post("/pointCommodity/queryCommoidty", {
          longitude: this.$store.state.longitude,
          latitude: this.$store.state.latitude,
          areaId: this.areaId,
          isLimitTime: 0,
          pageNum: this.pageNum[0],
          pageSize: 10,
          point: this.point
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let a = res.data.data ? res.data.data : [];
            a.forEach(element => {
              if (element.distance!='距离过远') {
                var v = parseFloat(element.distance)
                element.distance = v.toFixed(3)
              }
              element.commImg = element.commImg.split(',')
            });
            if (res.data.pageNum == 1) {
              this.mylist = a;
            } else {
              this.mylist = this.mylist.concat(a);
            }
            this.loaded = true
            if (this.pageNum[1] == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum[0] = this.pageNum[0] + 1;
              this.isOver = false;
            }
          }
        });
    },
    getPoint() {
      this.$http
        .post("/customer/queryOneByCondition", {
          id: this.$store.state.userInfo.custId
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.point = res.data.point;
          }
        });
    }
  }
};
</script>

