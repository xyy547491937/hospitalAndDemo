<template>
	<div class="z-width-100-percent">
    <div class="cityL">
      <scroll-view scroll-y style="height:calc(100vh);" scroll-with-animation scroll-top="0" :scroll-into-view=currView>
        <dl class="ub-box ub-col">
          <dd class="z-width-100-percent z-margin-bottom-5-px z-bg-color-fff ub-box ub-ver">
            <div class="search ub-box ub-ver-v">
              <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>
              <input
                class="ub-flex-1 z-font-size-14 z-color-666 z-padding-v-5-px z-margin-left-8-px"
                placeholder="城市/拼音" v-model="searchText" @change="searchFn(searchText)"/>
            </div>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box banner-info">
            <span id="cc" class="z-font-size-14 z-color-333 z-padding-all-8-px now-area">当前：{{currentCity}}{{currentArea}}</span>
            <!-- <span class="select-area" v-if="cityFlag==1" @click.stop="changeArea">切换区县 <i-icon type="unfold" color="#999999" size="13" /></span> -->
          </dd>
          <dd v-if="showArea" class="z-width-100-percent z-bg-color-fff ub-box hot-area-box">
            <ul class="ub-box ub-wrap z-padding-all-8-px">
              <li @click.stop="clickArea(city.label,city.id)" v-for="(city, idx) in dealedAreaList" :key="idx" class="hotcity hot-city-item z-font-size-14 z-color-333">{{city.label}}</li>
            </ul>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box hot-citys label-style">
            <span>位置/最近访问</span>
            <!-- <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">定位/最近访问</span> -->
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box hot-city-box">
            <ul class="ub-box ub-wrap z-padding-all-8-px">
              <!-- <li @click.stop="clickCity(city)" v-for="(city, idx) in visitCityList" :key="idx" class="hotcity z-font-size-14 z-color-333">{{city.name}}</li> -->
              <li @click.stop="clickCity(position, positionId)" class="hotcity z-font-size-14 z-color-333 hot-city-item location-city">
                <img class="location-city-logo" src="http://img.meiduduo.com/images/mine/location_log.png" alt="">
                {{position}}
              </li>
              <li @click.stop="clickCity(item.name, item.id,true)" v-if="index < 2" v-for="(item, index) of historyCitys" :key="index" class="hotcity z-font-size-14 z-color-333 hot-city-item">{{item.name}}</li>
            </ul>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box hot-citys">
            <span id="hot">热门城市</span>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box hot-city-box">
            <ul class="ub-box ub-wrap z-padding-all-8-px">
              <li @click.stop="clickCity(city.name,city.id,true)" v-for="(city, idx) in hotCityList" :key="idx" class="hotcity hot-city-item z-font-size-14 z-color-333">{{city.name}}</li>
            </ul>
          </dd>
          <!-- <dd class="z-width-100-percent z-bg-color-fff ub-box" v-if="search">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">所有城市</span>
          </dd> -->
          <dd class="ub-box ub-col all-city-list" v-if="search">
            <div v-for="(val, idx) in cityList" :key="idx" class="z-width-100-percent z-bg-color-fff ub-box ub-col">
              <span :id="val.initial" class="ub-flex-1 z-padding-all-8-px z-font-size-14 z-color-888 codeBK all-city-label">{{val.initial}}</span>
              <ul class="ub-box ub-col">
                <li @click.stop="clickCity(city.name,city.id,true)" v-for="(city, i) in val.list" :key="i" class="city ub-flex-1 z-font-size-14 z-color-666">{{city.name}}</li>
              </ul>
            </div>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box" v-if="!search">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">搜索结果</span>
          </dd>
          <dd class="ub-box ub-col" v-if="!search">
            <div v-for="(val, idx) in searchList" :key="idx" class="z-width-100-percent z-bg-color-fff ub-box ub-col">
              <span :id="val.initial" class="ub-flex-1 z-padding-all-8-px z-font-size-14 z-color-888 codeBK">{{val.initial}}</span>
              <ul class="ub-box ub-col">
                <li @click.stop="clickCity(city.name,city.id,true)" v-for="(city, i) in val.list" :key="i" class="city ub-flex-1 z-font-size-14 z-color-666">{{city.name}}</li>
              </ul>
            </div>
          </dd>
        </dl>
      </scroll-view>
      <!--fixed部分-->
      <dl class="fixList ub-box ub-col ub-ver-v">
        <dt @click.stop="goHotCity()" class="z-font-size-12 z-margin-bottom-3-px" style="color:#999999;padding: 0 30rpx;">#</dt>
        <dd @click.stop="clickCode(val)" v-for="(val, idx) in cityList" :key="idx" class="z-font-size-12" style="margin-bottom:2px;color:#999999;padding:0 30rpx;">{{val.initial}}</dd>
      </dl>
    </div>
	</div>
</template>
<script>
import QQMapWX from "../utils/qqmap-wx-jssdk.min.js";
export default {
  data() {
    return {
      currView: "",
      search: true,
      searchText: '',
      searchList: [],
      visitCityList: [
        { zip: "010", name: "北京" },
        { zip: "021", name: "上海" }
      ],
      hotCityList: [
        {
          zip: "110000",
          pinyin: "B",
          name: "北京市",
          id: 2
        },
        {
          zip: "310000",
          pinyin: "S",
          name: "上海市",
          id: 10
        },
        {
          zip: "440100",
          pinyin: "G",
          name: "广州市",
          id: 232
        },
        {
          zip: "440300",
          pinyin: "S",
          name: "深圳市",
          id: 234
        },
        {
          zip: "330100",
          pinyin: "H",
          name: "杭州市",
          id: 122
        },
        {
          zip: "130100",
          pinyin: "S",
          name: "石家庄市",
          id: 37
        },
        {
          zip: "420100",
          pinyin: "W",
          name: "武汉市",
          id: 204
        },
        {
          zip: "411300",
          pinyin: "N",
          name: "南阳市",
          id: 199
        },
        {
          zip: "510100",
          pinyin: "C",
          name: "成都市",
          id: 273
        }
      ],
      cityList: [],
      selectCity: {},
      qqmap: '',
      showArea: false,
      areaList: [],
      cityFlag: 2
    };
  },
  computed:{
    currentCity(){
      return this.$store.state.curCity
    },
    currentArea () {
      return this.$store.state.curArea
    },
    cityList1(){
      return this.$store.state.cityList
    },
    position(){
      return this.$store.state.userInfo.city
    },
    user() {
      return this.$store.state.userInfo;
    },
    // cityFlag() {
    //   console.log(this.$store.state.cityFlag)
    //   return this.$store.state.cityFlag;
    // },
    positionId(){
      return this.$store.state.userInfo.cityId
    },
    dealedAreaList () {
      return this.areaList.filter(el => {
        if (el.label == '市辖区' || el.label == '县') {
          return false
        } else {
          return true
        }
      })
    },
    historyCitys () {
      return this.$store.state.historyCity
    }
  },
  onShow() {
    this.searchText = ''
    this.search = true
    this.showArea = false
    this.areaList = []
    console.log(this.cityFlag)
  },
  onLoad() {
    var qqmapsdk = new QQMapWX({
      key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
    });
    this.qqmap = qqmapsdk
    // console.log(this.cityList1,this.currentCity)
    if(this.cityList1.length==0){
      this.initCityList();
    } else {
      this.cityList = this.cityList1
    }
    this.currView = "";
    var _this = this
    if (_this.currentCity == '全国') {
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userLocation"]) {
            // console.log(res)
            _this.init();
          }
        }
      });
    }
  },
  methods: {
    init() {
      var _this = this
      wx.getLocation({
        type: "wgs84",
        success: function(res) {
          // console.log(res, 2);
          var latitude = res.latitude;
          var longitude = res.longitude;
          this.qqmap.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function(res) {
              // console.log(res, 4);
              _this.$set(
                _this.user,
                "city",
                res.result.address_component.city
              );
              _this.$set(
                _this.user,
                "province",
                res.result.address_component.province
              );
              _this.$store.commit("updateUser", _this.user);
            }
          });
        }
      });
    },
    searchFn (text) {
      if (text && text.length > 0) {
        this.$set(this, 'search', false)
        this.$http.post("/common/getCityArea", {areaName: text}).then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.$set(this, 'searchList', res.data)
          }
        });
      } else {
        this.$set(this, 'search', true)
      }
    },
    initCityList() {
      this.$http.post("/common/getCityArea", {areaName: ''}).then(res => {
        if (res.code==1) {
          this.$store.commit('updateCityList', res.data)
          this.cityList = res.data
        }
      });
    },
    clickCode(obj) {
      if (obj.list.length < 1) return;
      this.currView = obj.initial;
    },
    clickCity(city, id,status) {
      console.log(city,id, '石家庄回选')
      this.$emit("cityService", {name: city, id: id,status:status?status:false});
      console.log(status)
      if (status) {
        this.$store.commit("cityFlagChange", 1);
        this.cityFlag = 1
      } else {
        this.$store.commit("cityFlagChange", 2);
        this.cityFlag = 2
      }
    },
    clickArea (city, id) {
      this.$emit("areaService", {name: city, id: id});
      this.$store.commit("cityFlagChange", 2);
      this.cityFlag = 2
    },
    changeArea () {
      this.currView = ''
      if (!this.showArea) {
        this.$http.post('/common/getAreaTree', {
          pId: this.$store.state.curCityId
        }).then(res => {
          if (res.code == 1) {
            this.areaList = res.data
            res.data.map((el, inx) => {
              if (el.label == '市辖区') {
                this.$http.post('/common/getAreaTree', {
                  pId: el.id
                }).then(res => {
                  if (res.code == 1) {
                    this.areaList = this.areaList.concat(res.data)
                  }
                })
              }
              if (el.label == '县') {
                this.$http.post('/common/getAreaTree', {
                  pId: el.id
                }).then(res => {
                  if (res.code == 1) {
                    this.areaList = this.areaList.concat(res.data)
                  }
                })
              }
            })
          }
        })
      }
      this.showArea = !this.showArea
    },
    goHotCity () {
      this.currView = 'hot'
    }
  }
};
</script>
<style scoped>
.search {
  background: #f5f5f5;
  width: 90%;
  border-radius: 15px;
  padding: 0 10px;
}
.codeBK {
  background: #f5f5f5;
}
.hotcity {
  border: 1px solid #f5f5f5;
  padding: 6px 12px;
  margin: 0 8px 8px 0;
}
.city {
  padding: 30rpx 27rpx;
  border-bottom: 1px solid #dddddd;
  background-color: #f5f5f5;
  color: #333;
  font-size: 26rpx;
}
.fixList {
  position: fixed;
  right: 5px;
  top: 12%;
  z-index: 10;
  width: 30px;
  background: transparent;
}
.all-city-list {
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 44rpx;
  background: #f5f5f5;
}
.all-city-label {
  font-size: 24rpx;
  color: #333;
}
.hot-citys {
  background-color: #f5f5f5;
  font-size: 26rpx;
  color: #999;
  padding-left: 30rpx;
  padding-right: 44rpx;
}
.hot-city-box {
  background-color: #f5f5f5;
  font-size: 26rpx;
  color: #333;
  padding-left: 30rpx;
  padding-right: 44rpx;
}
.hot-city-item {
  width: 190rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 5rpx;
  background-color: #fff;
  border: 1rpx solid rgba(229, 229, 229, 1);
  text-align: center;
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.select-area {
  font-size: 26rpx;
  color: #999999;
}
.banner-info {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  padding-left: 30rpx;
  padding-right: 44rpx;
  padding-bottom: 27rpx;
  padding-top: 28rpx;
}
.now-area {
  padding: 0;
}
.label-style {
  padding-top: 37rpx;
}
.hot-area-box {
  background-color: #fff;
  font-size: 26rpx;
  color: #333;
  padding-left: 30rpx;
  padding-right: 44rpx;
}
.location-city {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}
.location-city-logo {
  display: inline-block;
  width: 32rpx;
  height: 38rpx;
  margin-right: 10rpx;
}
</style>
