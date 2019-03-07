<template>
  <div class="authorize">
    <div class="active-bg-border">
      <div class="active-bg-padding">
        <span class="active-bg"></span>
      </div>
    </div>
    <div class="inputBox">
      <div class="inputItem">
        <span>手机号</span>
        <input class="input auth-input" v-model="user.mobile" type="number" title="手机号" placeholder="请输入手机号"  maxlength="11"/>
      </div>
      <div class="inputItem">
        <span>验证码</span>
        <input class="input input1 auth-input" v-model="phoneY" type="number" title="验证码" placeholder="请输入验证码" maxlength="6" />
        <!-- <i-button :i-class="status?'button1': 'button1 button2'"  @click.stop="handleClick()"  size="default ">{{time}}</i-button> -->
        <view
          :class="status ? 'view-btn' : 'view-btn view-btn-two'"
          @click.stop="handleClick()">{{time}}</view>
      </div>
    </div>
    <button
      :disabled="!(phoneY&&user.mobile&& user.mobile.length >= 11) && timeStatus!=-1"
      :class="(phoneY&&user.mobile && user.mobile.length >= 11)? 'author' : 'author author1'"
      open-type="getUserInfo"
      v-if="canIUse"
      @getuserinfo="userInfo">授权并登录</button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      phoneY: '',
      status: true,
      index: 0,
      num: 0,
      saveNum: 0,
      timeStatus: 1,
      loginNum: 0,
      i: 60,
      encryptedData: '',
      iv: '',
      time:'获取验证码',
      loging: true,
      loadRecommend: false,
      encryptionOrganId: '', // 加密后的organId
      decryptOrganId: '', // 解密后的organId
      newOrOld: null, // 1代表老用户，2代表新用户
    };
  },
  computed:{
    user(){
      return this.$store.state.userInfo
    },
    state() {
      return this.$store.state
    }
  },
  onLoad: function (options) { // 获取二维码传入的参数，获取机构id
    console.log('onLoad')
    console.log(options)
    this.encryptionOrganId = decodeURIComponent(options.scene)
    // this.encryptionOrganId = decodeURIComponent('tSrOZGd4LQFITvNvZKZkGA%3D%3D')
    console.log(this.encryptionOrganId)
  },
  onShow() {
    console.log('onShow')
    if (this.state.isLogin && this.loging) {
      this.$set(this, 'loging', false)
      this.loadRecommend = true
    }
    // if (!this.$store.state.isLogin) {
    //   this.getUserInfo('automatic')
    // }
    this.getUserInfo('automatic')
  },
  methods: {
    phone(event) {
      this.$set(this.user,'mobile', event.target.detail.value)
    },
    phoneCode(event) {
      this.phoneY = event.target.detail.value
    },
    handleClick(){
      var reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
      if (!this.user.mobile) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000
        });
      } else if(!reg.test(this.user.mobile)){
        wx.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 2000
        });
      } else {
        this.$set(this,'status', false)
        if(this.i==60 && this.index == 0){
          this.index = this.index + 1
          this.Countdown()
          var option = {
            mobile:this.user.mobile,
            templateCode: 'SMS_137390046'
          }
          this.$http.post('/common/sendSms', option).then((res) => {
          })
          this.checkNewUser(this.user.mobile)
        }
      }
    },
    Countdown() {
      var _this = this
      _this.$set(_this, 'time', _this.i + '秒后')
      var timer = ''
      clearInterval(timer)
      timer = setInterval(function () {
        if(_this.i<=0){
          _this.status = true
          _this.time = '重新获取'
          _this.$set(_this, 'i', 60)
          clearInterval(timer);
          _this.index = 0
        }else{
          _this.$set(_this, 'i', _this.i - 1)
          _this.$set(_this, 'time', _this.i + '秒后')
        }
      }, 1000)
    },
    userInfo: function(e) {
      console.log(e,'..............................')
      this.$set(this,'encryptedData', e.mp.detail.encryptedData)
      this.$set(this,'iv', e.mp.detail.iv)
      var _this = this;
      this.timeStatus = -1
      if(e.mp.detail.rawData) {
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
      _this.getUserInfo()
      if (state == true) {
        _this.$store.commit(
          "updateCity",
          '全国'
        );
        _this.$store.commit("updateCityId", '')
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
                _this.$set(_this.user, "city", res.result.address_component.city);
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
                console.log(res, '解析失败')
                _this.$store.commit("updateCity", "全国");
                _this.user.city = "全国";
                _this.$store.commit("updateCityId", "");
                _this.areaId = ''
              }
            });
          },
          fail: function(res) {
            _this.$store.commit("updateCity", "全国");
            _this.user.city = "全国";
            _this.$store.commit("updateCityId", "");
            _this.areaId = ''
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '请到应用管理打开微信地理授权',
              success (res) {
              }
            })
            console.log(res,'local失败')
          }
        });
      }
    },
    getUserInfo (type) {
      var _this = this;
      wx.login({
        success: function(loginRes) {
          if (loginRes.code) {
            _this.jscode2Session(loginRes.code, type)
          }
        },
        fail() {
          _this.getUserInfo(type)
        }
      });
    },
    jscode2Session(code, type) {
      var obj = {
        jsCode: code,
        // encryptedData: this.encryptedData,
        // iv: this.iv
      }
      if (this.encryptedData) {
        obj.encryptedData = this.encryptedData
      }
      if (this.iv) {
        obj.iv = this.iv
      }
      this.$http.get("/jscode2Session/getUserInfoV2", obj).then(res=>{
        console.log(res)
        if (res.data&&res.data.openid) {
          console.log(res, 6);
          this.$set(this.user, "openid", res.data.openid);
          this.$set(this.user, "session_key", res.data.session_key);
          if (res.data.unionid) { // 已注册过或者发起注册
            this.$set(this.user, "unionid", res.data.unionid);
            if (type == 'automatic') { // 自动登录
              this.newOrOld = 1
              this.authLogin(res.data.unionid, res.data.openid)
            } else { // 点击按钮登录
              var obj = {
                openID: res.data.openid,
                unionId: res.data.unionid,
                // regSource: 1,
                nickName:this.user.nickName,
                avatarUrl:this.user.avatarUrl,
                mobile:this.user.mobile,
                verify:this.phoneY,
                gender:this.user.gender,
                regSource: 1
              }
              this.loginMth(obj)
            }
          } else { // 未注册过
            return
          }
        }
      }).catch(err=>{
        this.num++
        if (this.num < 4) {
          this.getUserInfo()
        } else {
          wx.showToast({
            title: '网络开小差啦',
            icon: 'none'
          })
        }
        console.log(err,'后台jscode2Session接口报错')
      })
    },
    loginMth(obj) {
      this.$http.post('/customer/saveCustomerInfoFromWeixinV2', obj).then((res) => {
        console.log(res, '短信', obj)
        if (res.code === 1) {
          this.authLogin(obj.unionId, obj.openID)
        } else{
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
        }
      }).catch(err=>{
        this.saveNum++
        if (this.saveNum < 4) {
          this.loginMth(obj)
        } else {
          wx.showToast({
            title: '网络开小差啦',
            icon: 'none'
          })
        }
      })
    },
    authLogin(unionid, openid) {
      var _this = this
      this.$http.post( this.$store.state.httpUrl + "/auth/login/loginV2",{
        loginName: unionid,
        unionId:unionid,
        openID:openid||'',
        platform: "shop4",
        terminalType: "shop4",
        regSource: 1
      }).then(res=>{
        if (res.code == 1) {
          wx.hideLoading();

          _this.user.avatarUrl = res.data.user.icon;
          _this.user.gender = res.data.user.sex == "M" ? 1 : 0;
          _this.user.nickName = res.data.user.username;
          _this.user.mobile = res.data.user.mobile;
          _this.$set(_this, "loging", false);
          _this.loadRecommend = true;

          this.timeStatus = 1
          this.$set(this.user, 'custId', res.data.user.id)
          this.$set(this.user, 'peopleId', res.data.user.userId)
          this.$set(this.user, 'token', res.data.user.token)
          this.$set(this.user, 'peopleId', res.data.user.userId)
          this.$store.commit("updateUser", this.user);
          this.$store.commit("updateIsLogin", true);
          console.log(this.$store.state, '注册登陆了')
          console.log('注册页，被邀请参数', this.$store.state.invited)
          // ! 登录后跳入扫码领红包页面
          // this.queryOrganId('Ka723EGMGF4h6Z/BXFTrCQ==' || this.encryptionOrganId)
          this.queryOrganId(this.encryptionOrganId)
        }
      }).catch(err=>{
        this.loginNum++
        if (this.loginNum < 4) {
          this.authLogin(unionid, openid)
        } else {
          wx.showToast({
            title: '网络开小差啦',
            icon: 'none'
          })
        }
      })
    },
    checkNewUser(mobile) { // 判断是否为新用户
      this.$http.post('/customer/checkIsNewByMobile', {
        mobile: mobile
      }).then(res => {
        if (res.code == 1) { // 老用户
          this.newOrOld = 1
        } else if (res.code == 0) { // 新用户
          this.newOrOld = 2
        }
      })
    },
    checkHasRedEnvelope() { // 判断老用户是否有未使用红包
      this.$http.post('/useScanPacket/queryOneByCondition', {
        custId: this.user.custId,
        organId: this.decryptOrganId, // TODO: 传入机构id
      }).then(res => {
        if (res.code >= 1) { // 有未使用红包
          wx.reLaunch({ // TODO: 传入机构id和红包id
            url: `/pagesMine/scanCodePayment?packetAmount=${res.data.packetAmount}&organId=${this.decryptOrganId}&packetId=${res.data.id}`
          })
        } else { // 没有未使用红包
          wx.reLaunch({ // TODO: 传入机构id
            url: `/pagesMine/collarRedEnvelope?old=true&organId=${this.decryptOrganId}`
          })
        }
      })
    },
    queryOrganId(organIdString, stateCode) { // 获取解密后的商家主键
      this.$http.post('/underScanPacket/getOrganIdByAESEncodedOne', {
        AESEncodedOrganId: organIdString
      }).then(res => {
        if (res.code == 1) {
          this.decryptOrganId = res.data
          // this.decryptOrganId = 109
          // this.newOrOld = 2
          console.log(this.decryptOrganId)
          console.log('请求商家主键成功', this.newOrOld)
          if (this.newOrOld == 1) { // 老用户
            this.checkHasRedEnvelope()
          } else if (this.newOrOld == 2) { // 新用户
            wx.reLaunch({ // TODO: 传入机构id
              url: `/pagesMine/collarRedEnvelope?newUser=true&organId=${this.decryptOrganId}`
            })
          }
        }
      })
    },
  }
};
</script>

<style scoped>

.inputBox{
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 54rpx;
}
.inputItem{
  overflow: hidden;
  border-bottom:1px solid #DDDDDD;
  margin-bottom: 20rpx;
  position: relative;
  height:70rpx;
}
.inputItem span, .inputItem input{
  float: left;
}

.inputBox .input, .inputItem span{
  padding: 0;
  color: #333333;
  margin: 7rpx 0 20rpx;
  height:44rpx;
  line-height: 44rpx;
}
.inputItem span{
  display: block;
  margin-right: 20rpx;
}
.inputBox .input{
  width: 400rpx;
}
.inputBox .input1{
  width: 300rpx;
}

.authorize {
  /* background: #fff url("http://img.meiduduo.com/images/author.png") no-repeat center 77rpx; */
  /* background-size: 603rpx 491rpx; */
  /* padding: 606rpx 60rpx 0; */
  padding: 10rpx 60rpx 0;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 32rpx;
  color: #333333;
}
/* .authorize>span {
  display: block;
  height: 32rpx;
  line-height: 32rpx;
  margin-bottom: 56rpx;
  text-align: center;
} */

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
.active-bg-border {
  padding: 4rpx;
  margin: 0 auto;
  border: 2rpx solid #000;
  width: 583rpx;
  height: 718rpx;
  box-sizing: border-box;
  margin-bottom: 40rpx;
}
.active-bg-padding {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10rpx;
  border: 1rpx solid #000;
}
.active-bg {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url('http://img.meiduduo.com/images/mine/active_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.view-btn {
  width: 180rpx;
  height: 70rpx;
  box-sizing: border-box;
  line-height: 70rpx;
  border: 1rpx solid #FF4691;
  border-radius: 10rpx;
  color: #FF4691;
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
