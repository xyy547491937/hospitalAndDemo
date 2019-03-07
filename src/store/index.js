import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cityFlag: 1, // 当前选择市：1   当前选择区是2
    curCity: '', // 当前选择的区/市
    curCityId: '', // 当前选择的区/市id
    curArea: '', // 区域名称
    curAreaId: '', // 区域id
    historyCity: [], // 最近访问
    // 选择城市的经纬度
    latitude: '',
    longitude: '',
    isLogin: false,
    invited: false, // 是否被邀请
    hotWords: [], // 搜索的热词
    isInit: false, // 搜索页面是否初始化
    diaryTag: [],
    diaryType: [],
    signatureList: [], // 手签确认接口
    diaryState: 0,
    topNavNum: '', //秀场导航栏数量
    loadActiveRecommend: false,
    cityList: [],
    organId: '',
    toPage: 1,
    userInfo: {
      avatarUrl: '',
      city: '',
      cityId: '', // 当前市/区的id
      gender: '',
      nickName: '',
      mobile: '',
      latitude: '',
      longitude: '',
      province: '',
      peopleId: '',
      openid: '',
      unionid: '',
      custId: '',
      session_key: '',
      token: '',
      pCustId: '',
      newTaskId: ''
    },
    backAuthor: {
      id: -1,
      status: ''
    }, // 详情用户关注改变状态
    backIndex: -1, // 详情返回列表的当前index值
    backItem: { // 详情页各项操作变量保存
      len: '', // 评论量
      num: '', // 点赞数
      colNum: '', // 收藏数量
      colStatus: '', // 收藏状态
      read: ''
    },
    // httpUrl1: 'http://192.168.1.14:8200',
    httpUrl1: 'http://api.meiduduo.com',

    httpUrl: 'http://api.meiduduo.com',
    // httpUrl: 'http://192.168.1.49:8200',
    // httpUrl: 'http://192.168.1.14:8200',
    // httpUrl: 'http://192.168.1.91:9500',
    // httpUrl: 'https://s.meiduduo.com',

    route: {
      url: '',
      data: {}
    },
    nowCropImgUrl: '', // 裁剪图片后生成的url
  },
  mutations: {
    cityFlagChange: (state, change) => {
      state.cityFlag = change
    },
    backIndexChange: (state, change) => {
      state.backIndex = change
    },
    backauthorChange: (state, change) => {
      state.backAuthor = change
    },
    backItemChange: (state, change) => {
      state.backItem = change
    },
    signatureList: (state, change) => {
      console.log(change, '手签')
      state.signatureList = change
    },
    updateCityList: (state, change) => {
      state.cityList = change
    },
    updateCity: (state, change) => {
      state.curCity = change
    },
    updateCityId: (state, change) => {
      state.curCityId = change
    },
    updateArea: (state, change) => {
      state.curArea = change
    },
    updateAreaId: (state, change) => {
      state.curAreaId = change
    },
    updateHistoryCity: (state, change) => {
      state.historyCity = state.historyCity.filter(el => {
        if (el.name == change.name) {
          return false
        } else {
          return true
        }
      })
      state.historyCity.unshift(change)
    },
    updateLatitude: (state, change) => {
      console.log(change)
      state.latitude = change
    },
    updateLongitude: (state, change) => {
      console.log(change)
      state.longitude = change
    },
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    cleanUserInfo: (state, change) => {
      // change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    },
    updateUser: (state, change) => {
      state.userInfo = change
    },
    setInvited: (state, params) => {
      state.invited = params.invited
    },
    setHotWords: (state, params) => { // 设置热词
      let a = state.hotWords
      a.unshift(params)
      state.hotWords = a
    },
    getDiaryTag: (state, change) => {
      state.diaryTag = change

    },
    getDiaryType: (state, change) => {
      state.diaryType = change
    },
    diaryState: (state, change) => {
      state.diaryState = change.state
    },
    updateTopNavNum: (state, change) => {
      state.topNavNum = change
      state.loadActiveRecommend = true
    },
    saveOrganId: (state, change) => {
      state.organId = change
    },
    updateUserInfo: (state, change) => {
      const value = {
        ...state.userInfo,
        ...change
      }
      state.userInfo = value
    },
    updateRouterData: (state, change) => {
      const value = {
        ...state.route,
        ...change
      }
      state.route = value
    },
    toVideoFun: (state, change) => {
      console.log(change)
      state.toPage = change
    },
    topCustId: (state, change) => {
      console.log(change)
      state.userInfo.pCustId = change
    },
    setnewTaskId: (state, change) => {
      console.log(change)
      state.userInfo.newTaskId = change
    },
    setNewCropUrl: (state, change) => {
      state.nowCropImgUrl = change
    }
  }
})
export default store
