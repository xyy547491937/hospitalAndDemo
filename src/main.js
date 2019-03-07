import Vue from "vue";
import App from "@/App";
import store from "@/store";
import Qs from "qs";
import MD5 from "js-md5";
import FMC from "./utils/fidcollector";
// import LOGIN from './utils/login'
import './utils/mtj-wx-sdk';

import "./css/common.css";
import "./css/resetUI.css";
import "./css/iconfont.css";
import MpvueRouterPatch from "mpvue-router-patch";
import "mpvue-wxparse/src/wxParse.css"

Vue.use(MpvueRouterPatch);
// LOGIN()

var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

//配置请求基地址
fly.config.timeout = 20000;
fly.config.baseURL = "http://api.meiduduo.com/shop4/"; // 测试地址
// fly.config.baseURL = "http://192.168.1.200:8200/shop4/"; // 开发地址
// fly.config.baseURL = "http://192.168.1.91:8200/shop4/"; // 开发地址
// fly.config.baseURL = "http://192.168.1.49:8200/shop4/"; // 开发地址
// fly.config.baseURL = "https://s.meiduduo.com/shop4/"; // 正式地址
fly.config.headers["Content-Type"] = "application/x-www-form-urlencoded";
fly.config.headers["Access-Control-Allow-Origin"] = "*";

fly.interceptors.request.use(request => {
  if (request.url.indexOf('/wxIndex/list4Page') < 0 &&
    request.url.indexOf('/jscode2Session/getUserInfoV2') < 0 &&
    request.url.indexOf('/auth/login/loginV2') < 0 &&
    request.url.indexOf('/common/dictList') < 0 &&
    request.url.indexOf('/advertRecord/list4Page') < 0 &&
    request.url.indexOf('/queryActivityByCustId') < 0 &&
    request.url.indexOf('https://apis.map.qq.com') < 0 &&
    request.url.indexOf('/common/getCityId') < 0) {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
  }
  request.headers["X-Tag"] = "flyio";
  // request.body.secret = 'deshangwangmeirenhui'
  let a1 = request.url.indexOf('/jscode2Session/getUserInfoV2')
  let a2 = request.url.indexOf('/auth/login/loginV2')
  let a3 = request.url.indexOf('/common/sendSms')
  let a4 = request.url.indexOf('/customer/saveCustomerInfoFromWeixinV2')
  let a5 = request.url.indexOf('/customer/checkIsNewByMobile')
  if (a1 < 0 && a2 < 0 && a3 < 0 && a4 < 0 && a5 < 0 && !store.state.userInfo.unionid) {
    console.log('state', store.state.userInfo.unionid, store.state.userInfo.openid)
    // console.log('触发请求拦截，路由转到首页')
    // wx.navigateTo({
    //   url: '/pagesShow/global/authorization'
    // })
    wx.switchTab({
      url: '/pages/index'
    })
  }
  if (store.state.userInfo.token) {
    request.body.token = store.state.userInfo.token
  }
  request.body.clientType = 1
  // ! secret校验 start
  let paramsArr = request.body
  paramsArr['terminalType'] = 'shop4'
  paramsArr.timestamp = (Date.parse(new Date()) + "").substr(0, 10)
  let keyArr = []
  let secret = ""
  for (let key in paramsArr) {
    keyArr.push(key)
  }
  keyArr = keyArr.sort()
  keyArr.forEach(function (key) {
    secret += paramsArr[key]
  })
  secret = MD5(secret)
  secret = MD5('deshangwang' + secret + 'meirenhui')
  request.body.secret = secret
  // ! secret校验 end
});

fly.interceptors.response.use(
  response => {
    // console.log(response)
    wx.hideLoading();
    if (response.data.msg && response.data.msg != '登录失败, 当前微信用户未注册') {
      // wx.showToast({
      //   title: response.data.msg,
      //   icon: "none"
      // });
    }
    return response.data;
  },
  err => {
    // console.log(err, '错误码')
    wx.hideLoading();
    wx.showToast({
      title: "哦哦~网络离家出走了",
      icon: "none"
    });
  }
);

Vue.prototype.$http = fly;

Vue.prototype.changeJump = function (path, query) {
  //changeData是函数名
  this.$router.push({
    path: path,
    query: query
  });
};

Vue.config.productionTip = false;
App.store = store;
App.mpType = "app";

const app = new Vue(App);
app.$mount();
let vm = new Vue({});
Vue.prototype.vm = vm;
