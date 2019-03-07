<template>
  <div class="search">
    <i-row>
      <i-col span="5">
        <div class="index-address" @click="jump">{{currentCity}}</div>
      </i-col>
      <i-col span="19">
        <div @click.stop="goSearch" class="search-address">
          <input type="text" class="index-input" disabled placeholder="搜索服务项目">
        </div>
      </i-col>
    </i-row>
  </div>
</template>
<script>
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js";
export default {
  props: ["currentCity", "source"],
  data() {
    return {
      qqmap: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    },
    city() {
      return this.$store.state.userInfo.city;
    }
  },
  onLoad() {
    console.log('search on load')
    this.qqmap = new QQMapWX({
      key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
    });
    var _this = this;
    // console.log('顶部城市显示1')

    if (_this.currentCity == "全国") {
      wx.getSetting({
        success(res) {
          console.log("授权位置" + res);
          if (res.authSetting["scope.userLocation"]) {
            // console.log(res)
            _this.init();
          }
        }
      });
    } else {
      _this.initChange();
    }
  },
  onShow() {
    console.log("search顶部城市显示");
    this.$emit("curCityMth", this.$store.state.curCityId);
    var _this = this;
    if (_this.currentCity == "全国") {
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userLocation"]) {
            // console.log(res)
            _this.init();
          }
        }
      });
    } else {
      _this.initChange();
    }
  },
  methods: {
    initChange() {
      console.log('search init change')
      var _this = this;
      if (_this.$store.state.latitude && _this.$store.state.longitude) {
        return
      }
      _this.qqmap.geocoder({
        address: this.currentCity,
        success: function(res) {
          _this.$store.commit("updateLatitude", res.result.location.lat);
          _this.$store.commit("updateLongitude", res.result.location.lng);
          // console.log('提回去数据', _this.$store.state)
          _this.$emit("upLats", res.result.location);
        }
      });
    },
    init() {
      var _this = this;
      wx.getLocation({
        type: "wgs84",
        success: function(res) {
          // console.log(res, 2);
          var latitude = res.latitude;
          var longitude = res.longitude;
          _this.qqmap.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function(res) {
              console.log("++++++++++++++++++++++++++++++++++++++");
              console.log(res, 4);
              _this.$set(_this.user, "city", res.result.address_component.city);
              _this.$set(_this.user, "latitude", latitude);
              _this.$set(_this.user, "longitude", longitude);
              _this.$set(
                _this.user,
                "province",
                res.result.address_component.province
              );
              _this.$store.commit("updateLatitude", latitude);
              _this.$store.commit("updateLongitude", longitude);
              _this.$store.commit(
                "updateCity",
                res.result.address_component.city
              );
              _this.$http
                .post("/common/getCityId", {
                  areaName: res.result.address_component.city
                })
                .then(res => {
                  _this.$store.commit("updateCityId", res.data);
                  _this.$set(_this.user, "cityId", res.data);
                  _this.$store.commit("updateUser", _this.user);
                  // console.log('授权更改之后state数据', _this.$store.state)
                });
            }
          });
        }
      });
    },
    goSearch() {
      // 去搜索页
      this.$set(this.$store.state, "isInit", true);
      this.$router.push({
        path: "/pagesMine/search",
        query: { source: this.source }
      });
    },
    jump() {
      this.$router.push({ path: "/pagesShow/global/citySelect" });
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 0.88rem;
  box-sizing: border-box;
  overflow: hidden;
}
.search-address {
  height: 64rpx;
  line-height: 64rpx;
  box-sizing: border-box;
  border-radius: 1.2rem;
  background: #f5f5f5 url("http://img.meiduduo.com/images/search.png") no-repeat
    11px center;
  background-size: 0.28rem 0.3rem;
  padding-left: 70rpx;
  color: #999;
  margin-top: 12rpx;
}
.index-address {
  font-size: 0.28rem;
  height: 0.88rem;
  text-align: center;
  line-height: 0.88rem;
  padding-right: 24rpx;
  background: url("http://img.meiduduo.com/images/cityIcon.png") no-repeat right
    center;
  background-size: 0.2rem 0.12rem;
  margin-right: 0.21rem;
  overflow: hidden;
  color: #333;
}
.index-input {
  height: 100%;
  display: block;
  font-size: 0.28rem;
}
.index-search {
  margin-top: 0.05rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>
