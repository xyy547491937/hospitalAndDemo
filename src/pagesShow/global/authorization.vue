<template>
  <div class="authorize">
    <span>登录后发现更多精彩～</span>
    <div class="inputBox">
      <div class="inputItem">
        <span>手机号</span>
        <input
          class="input auth-input"
          v-model="user.mobile"
          type="number"
          title="手机号"
          placeholder="请输入手机号"
          maxlength="11"
        >
      </div>
      <div class="inputItem">
        <span>验证码</span>
        <input
          class="input input1 auth-input"
          v-model="phoneY"
          type="number"
          title="验证码"
          placeholder="请输入验证码"
          maxlength="6"
        >
        <!-- <i-button :i-class="status?'button1': 'button1 button2'"  @click="handleClick()"  size="default ">{{time}}</i-button> -->
        <view :class="status ? 'view-btn' : 'view-btn view-btn-two'" @click="handleClick()">{{time}}</view>
      </div>
    </div>
    <button
      :disabled="!(phoneY&&user.mobile&& user.mobile.length >= 11) && timeStatus!=-1"
      :class="(phoneY&&user.mobile && user.mobile.length >= 11)? 'author' : 'author author1'"
      open-type="getUserInfo"
      v-if="canIUse"
      @getuserinfo="userInfo"
    >授权并登录</button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      phoneY: "",
      status: true,
      index: 0,
      num: 0,
      saveNum: 0,
      timeStatus: 1,
      loginNum: 0,
      i: 60,
      encryptedData: "",
      iv: "",
      time: "获取验证码"
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    phone(event) {
      this.$set(this.user, "mobile", event.target.detail.value);
    },
    phoneCode(event) {
      this.phoneY = event.target.detail.value;
    },
    handleClick() {
      var reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if (!this.user.mobile) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000
        });
      } else if (!reg.test(this.user.mobile)) {
        wx.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 2000
        });
      } else {
        this.$set(this, "status", false);
        if (this.i == 60 && this.index == 0) {
          this.index = this.index + 1;
          this.Countdown();
          var option = {
            mobile: this.user.mobile,
            templateCode: "SMS_137390046"
          };
          this.$http.post("/common/sendSms", option).then(res => {});
        }
      }
    },
    Countdown() {
      var _this = this;
      _this.$set(_this, "time", _this.i + "秒后");
      var timer = "";
      clearInterval(timer);
      timer = setInterval(function() {
        if (_this.i <= 0) {
          _this.status = true;
          _this.time = "重新获取";
          _this.$set(_this, "i", 60);
          clearInterval(timer);
          _this.index = 0;
        } else {
          _this.$set(_this, "i", _this.i - 1);
          _this.$set(_this, "time", _this.i + "秒后");
        }
      }, 1000);
    },
    userInfo: function(e) {
      console.log(e, "..............................");
      this.$set(this, "encryptedData", e.mp.detail.encryptedData);
      this.$set(this, "iv", e.mp.detail.iv);
      var _this = this;
      this.timeStatus = -1;
      if (e.mp.detail.rawData) {
        _this.$set(_this.user, "avatarUrl", e.mp.detail.userInfo.avatarUrl);
        _this.$set(_this.user, "gender", e.mp.detail.userInfo.gender);
        _this.$set(_this.user, "nickName", e.mp.detail.userInfo.nickName);
        wx.authorize({
          scope: "scope.userLocation",
          success() {
            _this.getLocation(false);
          },
          fail() {
            _this.getLocation(true);
          }
        });
      }
    },
    getLocation(state) {
      var _this = this;
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      _this.getUserInfo();
      if (state == true) {
        _this.$store.commit("updateCity", "全国");
        _this.$store.commit("updateCityId", "");
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
            _this.$store.commit("updateLatitude", latitude);
            _this.$store.commit("updateLongitude", longitude);
            var qqmapsdk = new QQMapWX({
              key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
            });
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function(res) {
                // _this.$set(_this.user, "city", res.result.address_component.district);
                _this.$set(
                  _this.user,
                  "city",
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
                    _this.$store.commit("cityFlagChange", 2);
                    _this.$store.commit("updateCityId", res.data);
                    _this.$set(_this.user, "cityId", res.data);
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
                _this.$store.commit("updateCityId", "");
                _this.areaId = "";
              }
            });
          },
          fail: function(res) {
            _this.$store.commit("updateCity", "全国");
            _this.user.city = "全国";
            _this.$store.commit("updateCityId", "");
            _this.areaId = "";
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
    },
    getUserInfo() {
      var _this = this;
      wx.login({
        success: function(loginRes) {
          if (loginRes.code) {
            // console.log(loginRes.code)
            _this.jscode2Session(loginRes.code);
          }
        },
        fail() {
          _this.getUserInfo();
        }
      });
    },
    jscode2Session(code) {
      var obj = {
        jsCode: code,
        encryptedData: this.encryptedData,
        iv: this.iv
      };
      this.$http
        .get("/jscode2Session/getUserInfoV2", obj)
        .then(res => {
          console.log(res);
          if (res.data && res.data.openid) {
            console.log(res, 6);
            this.$set(this.user, "openid", res.data.openid);
            this.$set(this.user, "session_key", res.data.session_key);
            this.$set(this.user, "unionid", res.data.unionid);
            var obj = {
              openID: res.data.openid,
              unionId: res.data.unionid,
              // regSource: 1,
              nickName: this.user.nickName,
              avatarUrl: this.user.avatarUrl,
              mobile: this.user.mobile,
              verify: this.phoneY,
              gender: this.user.gender,
              regSource: 1
            };
            this.loginMth(obj);
          }
        })
        .catch(err => {
          this.num++;
          if (this.num < 4) {
            this.getUserInfo();
          } else {
            wx.showToast({
              title: "网络开小差啦",
              icon: "none"
            });
          }
          console.log(err, "后台jscode2Session接口报错");
        });
    },
    loginMth(obj) {
      this.$http
        .post("/customer/saveCustomerInfoFromWeixinV2", obj)
        .then(res => {
          console.log(res, "短信", obj);
          if (res.code === 1) {
            this.authLogin(obj.unionId, obj.openID);
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.saveNum++;
          if (this.saveNum < 4) {
            this.loginMth(obj);
          } else {
            wx.showToast({
              title: "网络开小差啦",
              icon: "none"
            });
          }
        });
    },
    authLogin(unionid, openid) {
      this.$http
        .post(this.$store.state.httpUrl + "/auth/login/loginV2", {
          loginName: unionid,
          unionId: unionid,
          openID: openid || "",
          platform: "shop4",
          terminalType: "shop4",
          regSource: 1
        })
        .then(res => {
          if (res.code == 1) {
            wx.hideLoading();
            this.timeStatus = 1;
            this.$set(this.user, "custId", res.data.user.id);
            this.$set(this.user, "peopleId", res.data.user.userId);
            this.$set(this.user, "token", res.data.user.token);
            this.$set(this.user, "peopleId", res.data.user.userId);
            this.$store.commit("updateUser", this.user);
            this.$store.commit("updateIsLogin", true);
            console.log(this.$store.state, "注册登陆了");
            console.log("注册页，被邀请参数", this.$store.state.invited);
            if (!this.$store.state.invited) {
              wx.reLaunch({
                url: "/pages/index?source=1"
              });
            } else {
              console.log("跳回原页面");
              if (this.$store.state.route.data.share) {
                this.$router.replace({
                  path: this.$store.state.route.url,
                  query: this.$store.state.route.data
                });
              } else {
                this.$router.go(-1);
              }
            }
          }
        })
        .catch(err => {
          this.loginNum++;
          if (this.loginNum < 4) {
            this.authLogin(unionid, openid);
          } else {
            wx.showToast({
              title: "网络开小差啦",
              icon: "none"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.inputBox {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 54rpx;
}
.inputItem {
  overflow: hidden;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 20rpx;
  position: relative;
  height: 70rpx;
}
.inputItem span,
.inputItem input {
  float: left;
}

.inputBox .input,
.inputItem span {
  padding: 0;
  color: #333333;
  margin: 7rpx 0 20rpx;
  height: 44rpx;
  line-height: 44rpx;
}
.inputItem span {
  display: block;
  margin-right: 20rpx;
}
.inputBox .input {
  width: 400rpx;
}
.inputBox .input1 {
  width: 300rpx;
}

.authorize {
  background: #fff url("http://img.meiduduo.com/images/author.png") no-repeat
    center 77rpx;
  background-size: 603rpx 491rpx;
  padding: 606rpx 60rpx 0;
  font-size: 32rpx;
  color: #333333;
}
.authorize > span {
  display: block;
  height: 32rpx;
  line-height: 32rpx;
  margin-bottom: 56rpx;
  text-align: center;
}

.authorize .author {
  display: block;
  height: 88rpx;
  line-height: 88rpx;
  background: #00bf00;
  width: 100%;
  color: #fff;
  border-radius: 6rpx;
  text-align: center;
}
.authorize .author.author1 {
  background: #ccc;
}
.auth-input {
  border-radius: 0;
  border: 0;
}
.view-btn {
  width: 180rpx;
  height: 70rpx;
  box-sizing: border-box;
  line-height: 70rpx;
  border: 1rpx solid #ff4691;
  border-radius: 10rpx;
  color: #ff4691;
  font-size: 28rpx;
  background-color: #fff;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
}
.view-btn-two {
  border: 1rpx solid #ccc;
  color: #ccc;
}
</style>
