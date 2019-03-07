module.exports = [{
    path: 'pages/index',
    name: 'index',
    config: {
      navigationBarTitleText: '胚豆',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-sticky": "../../dist/sticky/index",
        "i-sticky-item": "../../dist/sticky-item/index",
        "i-icon": "../../dist/icon/index",
        "i-rate": "../../dist/rate/index",
        "i-cell": "../../dist/cell/index",
        "i-load-more": "../../dist/load-more/index"
      }
    }
  },
  {
    path: 'pagesShow/global/citySelect',
    name: 'citySelect',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '选择城市',
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/video_info',
    name: 'video_info',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/video_info.1',
    name: 'video_info',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/global/allComment',
    name: 'allComment',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '全部评论',
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/global/authorization',
    name: 'authorization',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '用户授权',
      "usingComponents": {
        "i-button": "../../dist/button/index"
      }
    }
  },
  {
    path: 'pagesShow/global/authorizationOne',
    name: 'authorizationOne',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '用户授权',
      "usingComponents": {
        "i-button": "../../dist/button/index"
      }
    }
  },
  {
    path: 'pagesShow/information',
    name: 'information',
    root: 'pagesShow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/diary_info',
    name: 'diaryInfo',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '日记本详情',
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/diary',
    name: 'diary',
    root: 'pagesShow',
    config: { // 日记详情
      navigationBarTitleText: '内容',
      usingComponents: {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: "pagesMine/search",
    name: "search",
    root: 'pagesMine',
    config: {
      navigationBarTitleText: "搜索",
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShow/global/invite_friends',
    name: 'inviteFriends',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '邀请好友',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index",
        "i-steps": "../../dist/steps/index",
        "i-step": "../../dist/step/index"
      }
    }
  },
  {
    path: 'pagesShop/payOrder',
    name: 'payOrder',
    root: 'pagesShop',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '支付订单',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  // 秀场路由配置
  {
    path: 'pages/show',
    name: 'show',
    config: {
      navigationBarTitleText: '秀场',
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-button": "../../dist/button/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-card": "../../dist/card/index",
        "i-sticky": "../../dist/sticky/index",
        "i-sticky-item": "../../dist/sticky-item/index",
        "i-rate": "../../dist/rate/index",
        "i-cell": "../../dist/cell/index",
        "i-load-more": "../../dist/load-more/index"
      }
    }
  },
  {
    path: 'pagesShow/selectDiaryBook',
    name: 'selectDiaryBook',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '选择日记本',
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-button": "../../dist/button/index"
      }
    }
  },
  {
    path: 'pagesShow/writeDiary',
    name: 'writeDiary',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '写日记',
    }
  },
  {
    path: 'pagesShow/creatQuestion',
    name: 'creatQuestion',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '提问题',
    }
  },
  {
    path: 'pagesShow/creatArticle',
    name: 'creatArticle',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '发布文章',
    }
  },
  {
    path: 'pagesShow/creatVideo',
    name: 'creatVideo',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '发布视频',
    }
  },
  {
    path: 'pagesShow/creatVideoTwo',
    name: 'creatVideoTwo',
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '发布视频',
    }
  },
  // 美淘路由配置
  {
    path: 'pages/shop',
    name: 'shop',
    config: {
      navigationBarTitleText: '美购',
      // enablePullDownRefresh: true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-rate": "../../dist/rate/index"
      }
    }
  },
  {
    path: 'pagesShop/productDetails',
    name: 'productDetails',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '详情',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        // "i-divider": "../../dist/divider/index"
      }
    }
  }, {
    path: 'pagesShop/successOrder',
    name: 'successOrder',
    root: 'pagesShop',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '确认订单',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index",
      }
    }
  },
  {
    path: 'pagesShop/orgin',
    name: 'orgin',
    root: 'pagesShop',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '机构主页',
      "usingComponents": {
        "i-rate": "../../dist/rate/index",
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index",
        "i-tab-bar": "../../dist/tab-bar/index",
        "i-tab-bar-item": "../../dist/tab-bar-item/index"
      }
    }
  },
  {
    path: "pagesShop/cart",
    name: 'cart',
    root: "pagesShop",
    config: {
      navigationBarTitleText: '购物车',
      "enablePullDownRefresh": true,
      usingComponents: {}
    }
  }, {
    path: "pagesShop/myAppointment",
    name: "myAppointment",
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "在线预约"
    }
  },
  {
    path: "pagesShop/exchangeList",
    name: 'exchangeList',
    root: "pagesShop",
    config: {
      navigationBarTitleText: '',
      enablePullDownRefresh: true,
      usingComponents: {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-sticky": "../../dist/sticky/index",
        "i-sticky-item": "../../dist/sticky-item/index",
        "i-icon": "../../dist/icon/index",
        "i-rate": "../../dist/rate/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pagesMine/index',
    name: 'pagesIndex',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/myAttention',
    name: 'myAttention',
    root: 'pagesMine',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的关注',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: "pagesShow/newDiaryBook",
    name: "newDiaryBook",
    root: 'pagesShow',
    config: {
      navigationBarTitleText: "创建日记本",
      usingComponents: {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  }, {
    path: "pagesShow/editorDiary",
    name: "editorDiary",
    root: 'pagesShow',
    config: {
      navigationBarTitleText: "写日记本",
      usingComponents: {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  }, {
    path: "pagesShow/labelDiary",
    name: "labelDiary",
    root: 'pagesShow',
    config: {
      navigationBarTitleText: "添加标签",
      usingComponents: {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShop/pin/fight_group',
    name: 'fightGroup',
    root: 'pagesShop',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '拼团',
      enablePullDownRefresh: true,
      "usingComponents": {
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index"
      }
    }
  },
  {
    path: 'pagesShop/pin/project_detail',
    name: 'projectDetail',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '详情',
      enablePullDownRefresh: true,
      "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index",
        "i-cell": "../../dist/cell/index",
        "i-card": "../../dist/card/index",
        "i-button": "../../dist/button/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShop/pin/submit_order',
    name: 'submitOrder',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '购买信息',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pagesShop/special_offer',
    name: 'special_offer',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '医生商品列表',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pagesShop/doctor_detail',
    name: 'doctorDetail',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '医生主页',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-rate": "../../dist/rate/index"
      }
    }
  },
  {
    path: 'pagesShop/doctor_example',
    name: 'doctorExample',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '医生的案例',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pagesShop/groupOrderDetail',
    name: 'groupOrderDetail',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '订单详情',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index",
        // "i-steps": "../../dist/steps/index",
        "i-steps-diy": "../../dist/steps-diy/index",
        "i-step-diy": "../../dist/step-diy/index"
      }
    }
  },
  {
    path: "pagesShop/orderDetail",
    name: "shopOrderDetail",
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "订单详情",
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShop/alliance/alliance',
    name: 'alliance',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "商家联盟",
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-rate": "../../dist/rate/index"
      }
    }
  },
  {
    path: 'pagesShop/voucherDetail',
    name: 'voucherDetail',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "代金券详情",
      usingComponents: {}
    }
  },
  {
    path: 'pagesShop/historyVouchers',
    name: 'historyVouchers',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "我的卡券",
      usingComponents: {}
    }
  },
  {
    path: "pagesShow/labelType",
    name: "labelType",
    root: 'pagesShow',
    config: {
      navigationBarTitleText: '日记类型',
      usingComponents: {
        "i-button": "../../dist/button/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  }, {
    path: "pagesShop/payAndCoupon",
    name: 'payAndCoupon',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '订单信息',
      usingComponents: {

      }
    }
  }, {
    path: "pagesShop/myCoupon",
    name: 'myCoupon',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '我的优惠券',
      usingComponents: {

      }
    }
  },
  {
    path: 'pagesShop/pointsMall',
    name: 'pointsMall',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '积分商城',
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesShop/pointsDetails',
    name: 'pointsDetails',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: '积分明细',
      usingComponents: {
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
      }
    }
  },
  // 我的路由配置
  {
    path: 'pages/mine',
    name: 'mine',
    config: {
      navigationBarTitleText: '我的',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index"
      }
    }
  },
  {
    path: "pagesMine/qrcode",
    name: "qrcode",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "我的二维码",
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: "pagesMine/signView",
    name: "signView",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "手签确认"
    }
  },
  {
    path: 'pagesMine/myAppoint',
    name: 'myAppoint',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '我的预约',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index",
        "i-modal": "../../dist/modal/index"
      }
    }
  },
  {
    path: 'pagesMine/signatureList',
    name: 'signatureList',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '我的手签',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/signConfirm',
    name: 'signConfirm',
    root: "pagesMine",
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '手签确认',
      "usingComponents": {
        "i-button": "../../dist/button/index"
      }
    }
  },
  {
    path: "pagesMine/serverDiscuess",
    name: "serverDiscuess",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "服务评价",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-rate": "../../dist/rate/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/myOrder',
    name: 'myOrder',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '订单列表',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/myStore',
    name: 'myStore',
    root: "pagesMine",
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '去过的店',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/collect',
    name: 'collect',
    root: "pagesMine",
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '收藏',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"
      }
    }
  },
  {
    path: 'pagesMine/cashier',
    name: 'cashier',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '用户确认',
      "enablePullDownRefresh": true,
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/cashierDetail',
    name: 'cashierDetail',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '收银详情',
      "usingComponents": {}
    }
  },
  {
    path: 'pagesMine/aboutUs',
    name: 'aboutUs',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '关于我们',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index"
      }
    }
  },
  {
    path: 'pagesMine/pullNew',
    name: 'pullNew',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '拼人气拆红包',
    }
  },
  {
    path: 'pagesMine/rule',
    name: 'rule',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '规则说明',
    }
  },
  {
    path: 'pagesMine/request_refund',
    name: 'requestRefund',
    root: "pagesMine",
    config: {
      navigationBarTitleText: '申请退款',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index"
      }
    }
  },
  {
    path: "pagesMine/storeDetail",
    name: "storeDetail",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "门店信息",
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  }, {
    path: "pagesMine/orderDiscuess",
    name: "orderDiscuess",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "我的订单",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-rate": "../../dist/rate/index"
      }
    }
  }, {
    path: "pagesMine/deposit",
    name: "deposit",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "提现详情",
      usingComponents: {
        "i-modal": "../../dist/modal/index"
      }
    }
  },
  {
    path: 'pagesMine/myInvitation',
    name: 'myInvitation',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '我的邀请',
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pagesMine/myRecommendation',
    name: 'myRecommendation',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '我的推荐',
      usingComponents: {}
    }
  },
  {
    path: 'pagesMine/rulebook',
    name: 'rulebook',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '规则说明',
      usingComponents: {}
    }
  },
  {
    path: 'pagesMine/sharingByAll',
    name: 'sharingByAll',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '全民分享',
      usingComponents: {
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
      }
    }
  }, {
    path: 'pagesMine/integrateSearch',
    name: 'integrateSearch',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '赚豆芽',
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: "pagesShop/depositDetail",
    name: "depositDetail",
    root: "pagesShop",
    config: {
      navigationBarTitleText: "商品详情",
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"

      }
    }
  },
  {
    path: "pagesShop/organMap",
    name: "organMap",
    root: "pagesShop",
    config: {
      navigationBarTitleText: "机构地址"
    }
  },
  {
    path: "pagesShop/allOn",
    name: "allOn",
    root: "pagesShop",
    config: {
      navigationBarTitleText: "已兑换商品",
      "enablePullDownRefresh": true
    }
  },
  {
    path: "pagesShop/exchangeDetail",
    name: "exchangeDetail",
    root: "pagesShop",
    config: {
      navigationBarTitleText: "兑换详情"
    }
  },
  {
    path: 'pagesShop/comments',
    name: 'comments',
    root: 'pagesShop',
    config: {
      navigationBarTitleText: "评论列表",
      "enablePullDownRefresh": true
    }
  }, {
    path: "pagesMine/downloadApp",
    name: "downloadApp",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "下载",
      "enablePullDownRefresh": true
    }

  }, {
    path: "pagesMine/allPeopleGetMoney",
    name: "allPeopleGetMoney",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "全民领钱",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"

      }

    }
  }, {
    path: "pagesMine/qmShare",
    name: "qmShare",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "全民领钱",
      "enablePullDownRefresh": false,
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"
      }
    }
  }, {
    path: "pagesMine/qmRead",
    name: "qmRead",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "好友阅读领钱",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"
      }
    }
  }, {
    path: "pagesMine/pageH5",
    name: "pageH5",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "广告页",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-icon": "../../dist/icon/index",
        "i-modal": "../../dist/modal/index"
      }
    }
  }, {
    path: "/pagesShow/activityAdvert",
    name: "activityAdvert",
    root: "pagesShow",
    config: {
      navigationBarTitleText: "活动详情",
      usingComponents: {

      }
    }
  }, {
    path: "/pagesMine/myComplaints",
    name: "myComplaints",
    root: "pagesMine",
    config: {
      navigationBarTitleText: "我的反馈",
      "enablePullDownRefresh": true,
      usingComponents: {
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  }, {
    path: "/pagesShop/useRecording",
    name: "useRecording",
    root: "pagesShop",
    "enablePullDownRefresh": true,
    config: {
      navigationBarTitleText: "使用记录"
    }
  }, {
    path: "/pagesShop/lookCode",
    name: "lookCode",
    root: "pagesShop",
    config: {
      navigationBarTitleText: "查看券码",
      usingComponents: {
        "i-icon": "../../dist/icon/index",
      }
    }
  },
  {
    path: "/pagesShow/global/crop",
    name: "crop",
    root: "pagesShow",
    config: {
      navigationBarTitleText: "裁剪图片"
    }
  },
  {
    path: "/pagesShow/global/cropTwo",
    name: "cropTwo",
    root: "pagesShow",
    config: {
      navigationBarTitleText: "裁剪图片"
    }
  },
  {
    path: '/pagesMine/collarRedEnvelope',
    name: 'collarRedEnvelope',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '扫码领红包'
    }
  },
  {
    path: '/pagesMine/scanCodePayment',
    name: 'scanCodePayment',
    root: 'pagesMine',
    config: {
      navigationBarTitleText: '扫码付款'
    }
  }
]
