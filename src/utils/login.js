import store from "@/store";

let i = 0;
let isSuccess = false;

let baseUrl = 'http://api.meiduduo.com'
// let baseUrl = 'https://s.meiduduo.com'
// let baseUrl = "http://192.168.1.200:8200";
// let baseUrl = "http://192.168.1.49:8200";
// let baseUrl= 'http://192.168.1.91:9500'
let routeUrl = "";
let routeData = {};

function globalLogin(routeUrlValue, routeDataValue) {
  console.log("进入login函数中");
  console.log(routeUrlValue, routeDataValue);
  routeUrl = routeUrlValue;
  routeData = routeDataValue;
  store.commit("updateRouterData", {
    url: routeUrlValue,
    data: routeDataValue
  });
  if (i < 2 && !isSuccess) {
    wx.login({
      success: function (loginRes) {
        isSuccess = true;
        jscode2Session(loginRes.code);
        // console.log(loginRes, '全局登录函数中微信登录成功')
        // console.log(loginRes, '全局登录函数设置store数据中...')
        // store.commit('updateTest', '全局登录函数设置store数据成功')
        // console.log(store.state.test)
      },
      fail() {
        // console.log('登录失败')
      }
    });
  }
  i++;
}

function jscode2Session(code) {
  wx.request({
    url: `${baseUrl}/shop4/jscode2Session/getUserInfoV2`,
    data: {
      jsCode: code
    },
    method: "GET",
    success: function (res) {
      if (res.data.code === 1) {
        const {
          session_key,
          openid,
          unionid
        } = res.data.data;
        if (unionid) {
          store.commit("updateUserInfo", {
            session_key,
            openid,
            unionid
          });
          loginMth(unionid);
        } else {
          wx.navigateTo({
            url: "/pagesShow/global/authorization"
          });
        }
      }
    },
    fail: function () {}
  });
}

function loginMth(unionid) {
  wx.request({
    url: `${baseUrl}/auth/login/loginV2`,
    data: {
      loginName: unionid,
      platform: "shop4",
      terminalType: "shop4"
    },
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      // console.log('全局登录函数')
      // console.log(res)
      if (res.data.code === 1) {
        const {
          icon,
          username,
          mobile,
          userId,
          id,
          token
        } = res.data.data.user;
        store.commit("updateUserInfo", {
          avatarUrl: icon,
          nickName: username,
          mobile: mobile,
          peopleId: userId,
          custId: id,
          token: token
        });
        // store.commit('updateIsLogin', true)
        console.log("login已注册，跳转到首页登录");
        wx.switchTab({
          url: "/pages/index"
        });
      } else {
        wx.navigateTo({
          url: "/pagesShow/global/authorization"
        });
      }
    },
    fail: function () {
      wx.navigateTo({
        url: "/pagesShow/global/authorization"
      });
    }
  });
}

export default globalLogin;
