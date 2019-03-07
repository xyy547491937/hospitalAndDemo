<template>
  <div class="indexpage">
    <!--搜索框-->
    <div class="fixation">
      <!-- <div v-if="loging==false" style="padding:0 30rpx;height:88rpx;background-color:#FFFFFF;"> -->
      <div style="padding:0 30rpx;height:88rpx;background-color:#FFFFFF;">
        <search
          v-bind:currentCity="state.curArea || state.curCity"
          v-bind:source="false"
          @curCityMth="curCityMth"
        ></search>
      </div>
      <!--导航栏-->
      <!-- <div class="nav" v-if="loging==false" style="z-index:2000;height:90rpx;background:#fff;" :class="{none:none}"> -->
      <div class="nav" style="z-index:2000;height:90rpx;background:#fff;" :class="{none:none}">
        <activeNav @changeCode="changeCode" @changeActiveIndex="changeActiveIndex"></activeNav>
      </div>
    </div>

    <!-- <div
      @click="changeJump('/pagesShop/payAndCoupon',{})"
      style="position:absolute;top:110px;left:20px;z-index:9999;background:red;"
    >使用记录</div>-->
    <!-- <div @click="changeJump('/pagesMine/qmRead',{})" style="position:absolute;top:150px;left:20px;z-index:9999;background:red;">好友阅读领钱</div>  -->
    <!-- <div class="content"  v-if="loadActiveRecommend && loadRecommend && loging==false"> -->
    <div class="content" v-if="loadActiveRecommend&& loging==false">
      <advertising v-if="activeIndex==0" :src="adList"></advertising>
      <!-- 中间导航栏 -->
      <activebox v-if="activeIndex==0"></activebox>
      <activeRecommend :code="code" :areaId="areaId" :activeIndex="activeIndex"></activeRecommend>
    </div>
    <redenvelope :item="queryActivity" @customerPacketId="customerPacketId"></redenvelope>
    <div class="redPock" @click="showRed()" v-if="showRedflag&&queryActivity.id"></div>
  </div>
</template>

<script>
import QQMapWX from "../utils/qqmap-wx-jssdk.min.js";
import advertising from "./comm/advertising"; //中间导航
import activebox from "./comm/activeBox"; //中间导航
import search from "./comm/search.vue"; //顶部搜索框
import activeNav from "./comm/activeNav.vue"; //顶部频道导航
import activeRecommend from "./comm/activeRecommend.vue"; //推荐
import redenvelope from "./comm/redEnvelope.vue"; //红包
export default {
  components: {
    advertising,
    activebox,
    search,
    activeNav,
    activeRecommend,
    redenvelope
  },
  data() {
    return {
      itemData: {},
      code: "",
      activeIndex: 0,
      index: 0,
      loginIndex: 0,
      loadRecommend: false,
      loging: true,
      updataList: false,
      customerPacketId: "",
      queryActivity: {},
      showRedflag: true,
      qmParams: {
        pCustId: null,
        taskId: null
      },
      adList: []
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    },
    state(value) {
      return this.$store.state;
    },
    areaId() {
      return this.$store.state.curCityId;
    },
    loadActiveRecommend() {
      return this.$store.state.loadActiveRecommend;
    }
  },
  watch: {
    "qmParams.taskId": {
      handler(val) {
        console.log(val, 6);
        console.log(
          this.$store.state.userInfo.newTaskId,
          this.$store.state.userInfo.custId,
          456
        );
        if (
          this.$store.state.userInfo.newTaskId != "undefined" &&
          this.$store.state.userInfo.newTaskId &&
          this.$store.state.userInfo.custId
        ) {
          console.log("onload****************************111111");
          this.getpCustId();
        }
      }
    },
    loging(value) {
      if (value) {
        //  wx.hideTabBar()
      } else {
        wx.showTabBar();
        console.log(
          this.$store.state.userInfo.newTaskId,
          this.$store.state.userInfo.custId,
          456
        );
        if (
          this.$store.state.userInfo.newTaskId != "undefined" &&
          this.$store.state.userInfo.newTaskId &&
          this.$store.state.userInfo.custId
        ) {
          console.log("onload****************************22222");
          this.getpCustId();
        }
      }
    },
    loadActiveRecommend(value) {
      this.loadActiveRecommend = true;
    }
  },
  onShareAppMessage(res) {
    console.log(res, 122);
    return {
      title: this.queryActivity.activityTitle,
      imageUrl: this.queryActivity.activityImg.split(",")[0],
      path:
        "/pagesMine/pullNew?originCustId=" +
        this.queryActivity.custId +
        "&headUrl=" +
        this.queryActivity.headUrl +
        "&customerPacketId=" +
        this.queryActivity.customerPacketId +
        "&nickName=" +
        this.queryActivity.nickName +
        "&id=" +
        this.queryActivity.id +
        "&time=" +
        this.queryActivity.endTime +
        "&singlePacketAmount=" +
        this.queryActivity.singlePacketAmount +
        "&share=" +
        true
    };
  },
  onLoad: function(options) {
    console.log(options);
    const scene = decodeURIComponent(options.scene);
    this.qmParams.taskId = scene;
    console.log(this.qmParams.taskId);
    console.log("扫描二维码得到的taskid", this.qmParams.taskId);
    if (
      !this.$store.state.userInfo.newTaskId ||
      this.$store.state.userInfo.newTaskId == "undefined" ||
      this.qmParams.taskId != "undefined"
    ) {
      this.$store.commit("setnewTaskId", this.qmParams.taskId);
      console.log("修改store的taskid数据");
    }
    console.log("提交store的taskid后", this.$store.state);
    console.log(this.$store.state.userInfo.custId);
  },
  onShow() {
    // setTimeout(() => {
    //   console.log(1);
    //   this.qmParams.taskId = 999
    //   this.$store.commit("setnewTaskId", 999);
    // }, 10000);
    if (this.state.isLogin && this.loging) {
      this.$set(this, "loging", false);
      this.loadRecommend = true;
    }
    if (!this.$store.state.isLogin) {
      console.log(this.$store.state.isLogin, 101);
      this.getLogin();
      // wx.hideTabBar()
    }
    // this.getAdvert();
  },
  methods: {
    getpCustId() {
      var obj = {
        taskId: this.$store.state.userInfo.newTaskId
      };
      console.log(obj, "关联关系接口调用参数1");
      this.$http.post("/shareTask/queryOneByTaskId", obj).then(res => {
        console.log("44444444444444444444444444444444444");
        if (res.code === 1) {
          console.log(res.data);
          this.qmParams.pCustId = res.data.custId;
          console.log(this.qmParams);
          this.$store.commit("topCustId", parseInt(this.qmParams.pCustId));
          this.getsaveUser();
        }
      });
    },
    getsaveUser() {
      //保存商城-用户关系记录表信息
      // let user = this.user
      // setTimeout(()=>{              00
      var obj = {
        pCustId: parseInt(this.qmParams.pCustId),
        custId: this.$store.state.userInfo.custId,
        taskId: this.qmParams.taskId,
        custRelation: 1
      };
      console.log("用户关系参数", obj);
      this.$http.post("/customerRelation/save", obj).then(res => {
        console.log("用户关系", res);
        if (res.code === 1) {
          console.log("用户关系保存成功", res);
        }
      });
      // },2000)
    },
    showRed() {
      var obj = {
        custId: this.user.custId
      };
      this.$http
        .post("/redPacketActivity/queryActivityByCustId", obj)
        .then(res => {
          if (res.code === 1) {
            var item = res.data;
            clearInterval(this.timeInterval);
            this.timeInterval = "";
            this.helpSuccess = false;
            this.share = "";
            this.shared = "";
            this.sharedPrice = "";
            this.ind = "";
            this.customerPacketId = "";
            this.item = {};
            this.originCustId = null;
            this.custId = "";
            this.countDT = [];
            this.redList = [];
            this.timeOut2 = false;
            this.timeOuts = false;
            this.timeOut = false;
            if (item && item.redPacketJoinState == 0) {
              this.changeJump("/pagesMine/pullNew", {
                title: item.activityTitle,
                imageUrl: item.activityImg.split(",")[0],
                time: item.endTime,
                singlePacketAmount: item.singlePacketAmount,
                id: item.id,
                custId: item.custId,
                headUrl: this.user.avatarUrl,
                nickName: this.user.nickName
              });
            } else if (item && item.redPacketJoinState == 1) {
              this.changeJump("/pagesMine/pullNew", {
                title: item.activityTitle,
                imageUrl: item.activityImg.split(",")[0],
                time: item.endTime,
                singlePacketAmount: item.singlePacketAmount,
                id: item.id,
                custId: item.custId,
                headUrl: item.headUrl,
                nickName: item.nickName,
                customerPacketId: item.customerPacketId
              });
            }
          } else if (res.code === 0) {
            this.showRedflag = false;
          }
        });
    },
    customerPacketId(customerPacketId) {
      this.customerPacketId = customerPacketId;
    },
    queryActivityByCustId(cityId) {
      var obj = {
        custId: this.user.custId
      };
      this.$http
        .post("/redPacketActivity/queryActivityByCustId", obj)
        .then(res => {
          if (res.code === 1) {
            this.$set(this, "queryActivity", res.data);

            if (res.data.redPacketJoinState == 2) {
              this.showRedflag = false;
            } else {
              this.showRedflag = true;
            }
          } else if (res.code === 0) {
            this.showRedflag = false;
          }
        });
    },
    curCityMth(id) {
      this.$set(this, "areaId", id);
      this.queryActivityByCustId(id);
    },
    changeCode(code) {
      this.code = code;
    },
    changeActiveIndex(index) {
      this.activeIndex = index;
      this.updataList = true;
    },
    router(res) {
      if (res.confirm) {
        wx.reLaunch({
          url: "/pagesShow/global/authorization"
        });
      }
      if (!res.cancel) {
        wx.reLaunch({
          url: "/pagesShow/global/authorization"
        });
      }
    },
    initData(state) {
      var _this = this;
      if (state) {
        _this.$store.commit("updateCity", "全国");
        _this.user.city = "全国";
        _this.$store.commit("updateCityId", 1);
        _this.areaId = 1;
        if (_this.$route.query.source != 1) {
          _this.queryActivityByCustId("");
        }
        _this.getAdvert();
      } else {
        wx.getLocation({
          type: "wgs84",
          success: function(res) {
            var latitude = res.latitude;
            var longitude = res.longitude;
            var speed = res.speed;
            var accuracy = res.accuracy;
            _this.$set(_this.user, "latitude", latitude);
            _this.$set(_this.user, "longitude", longitude);
            _this.$set(_this.state, "latitude", latitude);
            _this.$set(_this.state, "longitude", longitude);
            var qqmapsdk = new QQMapWX({
              key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
            });
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function(res) {
                _this.$set(
                  _this.user,
                  "city",
                  // res.result.address_component.district
                  res.result.address_component.city
                );
                _this.$store.commit(
                  "updateCity",
                  // res.result.address_component.district
                  res.result.address_component.city
                );
                _this.$http
                  .post("/common/getCityId", {
                    // areaName: res.result.address_component.district
                    areaName: res.result.address_component.city
                  })
                  .then(res => {
                    console.log(res, "data定位");
                    if (_this.$route.query.source != 1) {
                      _this.queryActivityByCustId(res.data);
                    }
                    wx.showShareMenu({
                      withShareTicket: true
                    });
                    _this.$store.commit("updateCityId", res.data);
                    _this.$store.commit("cityFlagChange", 2);
                    _this.$set(_this, "areaId", res.data);
                    _this.$set(_this.user, "cityId", res.data);
                    console.log("地理位置id", res.data, _this.user.cityId);
                    _this.getAdvert();
                  });
                _this.$set(
                  _this.user,
                  "province",
                  res.result.address_component.province
                );
              },
              fail: function(res) {
                console.log(res, "解析失败");
                _this.$store.commit("updateCity", "全国");
                _this.user.city = "全国";
                _this.$store.commit("updateCityId", 1);
                _this.areaId = 1;
              }
            });
          },
          fail: function(res) {
            _this.$store.commit("updateCity", "全国");
            _this.user.city = "全国";
            _this.$store.commit("updateCityId", 1);
            _this.areaId = 1;
            wx.showModal({
              title: "提示",
              showCancel: false,
              content: "请到应用管理打开微信地理授权",
              success(res) {}
            });
            console.log(res, "local失败");
          }
        });
      }
      console.log(_this.$store.state, "初始石家庄定位");
      _this.$store.commit("updateUser", _this.user);
    },
    getLogin() {
      var _this = this;
      wx.login({
        success: function(loginRes) {
          console.log(loginRes, 2);
          if (loginRes.code) {
            // console.log(loginRes.code)
            _this.jscode2Session(loginRes.code);
          }
        },
        fail() {
          _this.getLogin();
        }
      });
    },
    jscode2Session(code) {
      var _this = this;
      this.$http
        .get("/jscode2Session/getUserInfoV2", { jsCode: code })
        .then(res => {
          console.log(res, "data");
          if (res.data && res.data.openid) {
            this.$set(this.user, "openid", res.data.openid);
            this.$set(this.user, "session_key", res.data.session_key);
            if (res.data.unionid) {
              this.$set(this.user, "unionid", res.data.unionid);
              this.loginMth(res.data.unionid, res.data.openid);
            } else {
              wx.showModal({
                showCancel: false,
                title: "提示",
                content: "你还未登录，登录后可获得完整体验 ",
                confirmText: "一键登录",
                success(res) {
                  // 点击一键登录，去授权页面
                  // _this.$router.push({
                  //   path: '/pagesShow/global/authorizationOne'
                  // })
                  // return
                  _this.router(res);
                },
                fail(res) {
                  _this.router(res);
                }
              });
            }
          }
        })
        .catch(err => {
          this.index++;
          if (this.index < 4) {
            this.getLogin();
          }
          console.log(err, "后台jscode2Session接口报错");
        });
    },
    loginMth(unionid, openid) {
      var _this = this;
      this.$http
        .post(_this.$store.state.httpUrl + "/auth/login/loginV2", {
          loginName: unionid,
          unionId: unionid,
          openID: openid || "",
          platform: "shop4",
          terminalType: "shop4",
          regSource: 1
        })
        .then(res => {
          console.log(res, "data1");
          if (res.code == 1) {
            _this.user.avatarUrl = res.data.user.icon;
            _this.user.gender = res.data.user.sex == "M" ? 1 : 0;
            _this.user.nickName = res.data.user.username;
            _this.user.mobile = res.data.user.mobile;
            _this.user.peopleId = res.data.user.userId;
            _this.user.custId = res.data.user.id;
            _this.user.token = res.data.user.token;
            _this.$set(_this, "loging", false);
            _this.$store.commit("updateIsLogin", true);
            _this.loadRecommend = true;
            console.log("首页展示登录状态", _this.$store.state.invited);
            if (_this.$store.state.route.data.share) {
              console.log(
                "各种状态",
                _this.$store.state.invited,
                _this.$store.state.route.data.share
              );
              console.log("首页已登录执行跳转语句");
              // _this.$router.go(-1);
              _this.$router.push({
                path: _this.$store.state.route.url,
                query: _this.$store.state.route.data
              });
            }
            wx.authorize({
              scope: "scope.userLocation",
              success(res) {
                console.log("城市信息1", res);
                _this.initData(false);
              },
              fail(res) {
                console.log("城市信息2", res);
                _this.initData(true);
              }
            });
          } else if (res.code == 271) {
            // 修改部分
            wx.showModal({
              showCancel: false,
              title: "提示",
              content: "你还未登录，登录后可获得完整体验 ",
              confirmText: "一键登录",
              success(res) {
                // 点击一键登录，去授权页面
                // _this.$router.push({
                //     path: '/pagesShow/global/authorizationOne'
                //   })
                //   return
                _this.router(res);
              },
              fail(res) {
                _this.router(res);
              }
            });
          }
        })
        .catch(err => {
          _this.loginIndex++;
          if (_this.loginIndex < 4) {
            _this.relogin(unionid);
          }
          console.log(err.status, err.message, "后台auth/login接口报错");
        });
    },
    relogin(unionid) {
      wx.showToast({
        title: "网络开小差啦",
        icon: "none"
      });
      this.loginMth(unionid, openid);
    },
    //获取头条医美数据流的广告
    getAdvert() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2BT00",
            areaId: this.areaId
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
          }
        });
    }
  }
};
</script>

<style scoped>
.indexpage {
  background: #f5f5f5;
  height: 100%;
}
.nav.none {
  display: none;
}
.content {
  padding-top: 178rpx;
  background-color: #f5f5f5;
}
.redPock {
  position: fixed;
  right: 30rpx;
  bottom: 24rpx;
  width: 110rpx;
  height: 110rpx;
  z-index: 3000;
  background: url("http://img.meiduduo.com/images/lhb.png") no-repeat left top;
  background-size: 110rpx 110rpx;
}
.fixation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background-color: #f1f1f1;
}
</style>
