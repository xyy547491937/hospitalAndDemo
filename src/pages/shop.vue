<template>
  <div class="voo">
    <!--搜索框-->
    <!-- :animation="animationData" -->
    <div class="fixation" :animation="animationData">
      <!-- :animation="animationData1" -->
      <div
        style="padding:0 30rpx;background-color:#FFFFFF;height:88rpx;"
        class="searchbox"
        v-if="toTop"
      >
        <search v-bind:currentCity="curArea || currentCity" v-bind:source="false" @upLats="upLats"></search>
      </div>
      <!--导航栏-->
      <!-- :animation="animationData2" -->
      <div v-if="toTop" class="navbox" style="background:#FFFFFF;">
        <PdTabs
          :tabArr="tabArr"
          :cur="current_scroll"
          :tabColor="tabColor"
          :defaultColor="defaultColor"
          @tabItem="tabItem"
        />
      </div>
      <!-- 商品筛选框 -->
      <div v-if="current_scroll != 0 && current_scroll != 1" class="select-box">
        <div @click.stop="selectFProject('item1')" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItemProject == 'item1' }"
          >{{ selectProject }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItemProject == 'item1','f-color': activeItemProject == 'item1'}"
          ></span>
        </div>
        <div @click.stop="selectFProject('item2')" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItemProject == 'item2' }"
          >{{ selectArea }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItemProject == 'item2','f-color': activeItemProject == 'item2'}"
          ></span>
        </div>
        <div @click.stop="selectFProject('item3')" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItemProject == 'item3' }"
          >{{ selectSorts }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItemProject == 'item3','f-color': activeItemProject == 'item3'}"
          ></span>
        </div>
        <div @click.stop="selectFProject('item4')" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItemProject == 'item4' }"
          >{{ selectInfo }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItemProject == 'item4','f-color': activeItemProject == 'item4'}"
          ></span>
        </div>
      </div>

      <div v-if="activeItemProject == 'item1'" class="item1_select select_item box-shadow">
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_left">
          <span
            @click="projectSelect(index, item)"
            :class="{ 'project_left': projectActive === index }"
            class="item_span"
            v-for="(item, index) of arrs"
            :key="index"
          >{{ item.cateName }}</span>
        </scroll-view>
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_right">
          <span
            @click="projectItemSelect(index, item)"
            :class="{ 'project_left': projectItemActive === index }"
            class="item_span"
            v-for="(item, index) of arrs2"
            :key="index"
          >{{ item.cateName }}</span>
        </scroll-view>
      </div>
      <!-- 选择区域 -->
      <!-- // ! 新的全城筛选 -->
      <div class="item1_select select_item box-shadow" v-if="activeItemProject == 'item2'">
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_left">
          <span
            @click="countySelect(index, item)"
            :class="{ 'project_left': countyActive === index }"
            class="item_span"
            v-for="(item, index) of dealCountyList"
            :key="index"
          >{{ item.label }}</span>
        </scroll-view>
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_right">
          <span
            @click="countyItemSelect(index, item)"
            :class="{ 'project_left': countyItemActive === index }"
            class="item_span"
            v-for="(item, index) of countyItemList"
            :key="index"
          >{{ item.label }}</span>
        </scroll-view>
      </div>
      <!-- TODO: 旧的全城筛选 -->
      <!-- <div v-if="activeItemProject == 'item2'" class="select-box-main-item box-shadow" @click.stop="selectDistanceTwoF">
        <span v-for="(value, i) in distanceNumberList" :key="i" :id="value.type" :data-label="value.label" class="item_span" :class="{ 'project_left': selectDistanceTwo == value.type }">{{ value.label }}</span>
      </div>-->
      <!-- 选择排序 -->
      <div v-if="activeItemProject == 'item3'" class="select-box-main-item box-shadow">
        <span
          @click="sortSelect('S')"
          :class="{ 'project_left': sortItemActive == 'S' }"
          class="item_span"
        >销量最多</span>
        <span
          @click="sortSelect('N')"
          :class="{ 'project_left': sortItemActive == 'N' }"
          class="item_span"
        >最新上架</span>
        <span
          @click="sortSelect('PU')"
          :class="{ 'project_left': sortItemActive == 'PU' }"
          class="item_span"
        >价格从高到低</span>
        <span
          @click="sortSelect('PD')"
          :class="{ 'project_left': sortItemActive == 'PD' }"
          class="item_span"
        >价格从低到高</span>
      </div>
      <!-- 筛选 -->
      <div v-if="activeItemProject == 'item4'" class="item3_select box-shadow">
        <span
          @click="serveSelect('isStage')"
          :class="{ 'project_left': selectItemActive == 'isStage' }"
          class="item_span"
        >支持分期</span>
        <span
          @click="serveSelect('isInsurance')"
          :class="{ 'project_left': selectItemActive == 'isInsurance' }"
          class="item_span"
        >支持保险</span>
      </div>

      <!-- 附近和口碑筛选框 -->
      <div v-if="current_scroll == 0 || current_scroll == 1" class="select-box">
        <div @click.stop="selectF(0)" class="select-box-itme" v-if="current_scroll == 1">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItem == 0 }"
          >{{ wholeCity ? wholeCity : selectArr[0] }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItem == 0,'f-color': activeItem == 0}"
          ></span>
        </div>
        <div @click.stop="selectF(1)" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItem == 1 }"
          >{{ intelligentSorting ? intelligentSorting : selectArr[1] }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItem == 1,'f-color': activeItem == 1}"
          ></span>
        </div>
        <div @click.stop="selectF(2)" class="select-box-itme">
          <span
            class="label-over-hide"
            :class="{ 'active': activeItem == 2 }"
          >{{ filter ? filter : selectArr[2] }}</span>
          <span
            class="triangle_border_down"
            :class="{'triangle_border_up': activeItem == 2,'f-color': activeItem == 2}"
          ></span>
        </div>
      </div>
      <!-- // ! 新的全城筛选 -->
      <div class="item1_select select_item box-shadow" v-if="activeItem == 0">
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_left">
          <span
            @click="countySelect(index, item)"
            :class="{ 'project_left': countyActive === index }"
            class="item_span"
            v-for="(item, index) of dealCountyList"
            :key="index"
          >{{ item.label }}</span>
        </scroll-view>
        <scroll-view scroll-y style="height: 600rpx;" class="item1_select_right">
          <span
            @click="countyItemSelect(index, item)"
            :class="{ 'project_left': countyItemActive === index }"
            class="item_span"
            v-for="(item, index) of countyItemList"
            :key="index"
          >{{ item.label }}</span>
        </scroll-view>
      </div>
      <div class="select-box-main box-shadow">
        <!-- TODO: 旧的全城筛选 -->
        <!-- <div @click.stop="selectDistanceF" class="select-box-main-item" v-if="activeItem == 0">
          <span v-for="(value, i) in distanceNumber" :key="i" :id="value + 1" class="item_span" :class="{ 'project_left': selectDistance == value + 1 }">{{ value + 1 }}千米内</span>
        </div>-->
        <div @click.stop="selectSortF" class="select-box-main-item" v-if="activeItem == 1">
          <!-- // ! 新的全城筛选 -->
          <span
            id="0"
            class="item_span"
            :class="{ 'project_left': selectSort == 0 }"
          >{{ intelligentSortingArr[0] }}</span>
          <span
            id="1"
            class="item_span"
            :class="{ 'project_left': selectSort == 1 }"
          >{{ intelligentSortingArr[1] }}</span>
          <span
            id="2"
            class="item_span"
            :class="{ 'project_left': selectSort == 2 }"
          >{{ intelligentSortingArr[2] }}</span>
        </div>
        <div @click.stop="selectOrganF" class="select-box-main-item" v-if="activeItem == 2">
          <!-- // ! 新的全城筛选 -->
          <span
            id="0"
            class="item_span"
            :class="{ 'project_left': selectOrgan == 0 }"
          >{{ filterArr[0] }}</span>
          <span
            id="1"
            class="item_span"
            :class="{ 'project_left': selectOrgan == 1 }"
          >{{ filterArr[1] }}</span>
          <span
            id="2"
            class="item_span"
            :class="{ 'project_left': selectOrgan == 2 }"
          >{{ filterArr[2] }}</span>
        </div>
      </div>
    </div>
    <div v-if="current_scroll != 0 && current_scroll != 1" class="product-list">
      <div class="product-list-left">
        <commodity-card
          v-for="(item, index) of productListOne"
          :key="index"
          :data="item"
          :shop="true"
          @jump="jump"
        ></commodity-card>
      </div>
      <div class="product-list-right">
        <commodity-card
          v-for="(item, index) of productListTwo"
          :key="index"
          :data="item"
          :shop="true"
          @jump="jump"
        ></commodity-card>
      </div>
    </div>

    <!-- 附近和口碑展示列表 -->
    <div v-show="current_scroll == 0 || current_scroll == 1" class="organ-list">
      <div v-for="(item, index) of organList" :key="index">
        <shop-organ-card :data="item"></shop-organ-card>
      </div>
    </div>
    <div v-if="(isOver && organList.length > 0) || (isOver && list.length > 0)">
      <load-over classs="list_over"></load-over>
    </div>
    <div id="nolist" v-if="organList.length < 1 && list.length < 1">
      <div
        class="noData-mode"
        :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
      ></div>
    </div>
    <div class="cart-icon" @click="changeJump('/pagesShop/cart',{})">
      <i class="c"></i>
    </div>
    <!-- 用户if 没有授权地址时，重新让用户授权地址 -->
    <button open-type="getUserInfo"/>
  </div>
</template>

<script>
import QQMapWX from "../utils/qqmap-wx-jssdk.min.js";
import search from "./comm/search.vue"; //顶部搜索框
import shopOrganCard from "./comm/shopOrganCard"; // 展示机构的组件
import commodityCard from "./comm/commodity_card";
import loadOver from "./comm/loadOver"; // 数据加载完毕展示组件
import PdTabs from "./comm/PdTabs";
import { dealNumber1 } from "../utils/util.js";
export default {
  components: {
    search,
    "shop-organ-card": shopOrganCard,
    "commodity-card": commodityCard,
    PdTabs,
    "load-over": loadOver
  },
  data() {
    return {
      loaded: false,
      productArr: [],
      isRefrensh: false,
      current_scroll: 0,
      tabArr: [],
      pageNum: 1,
      pageSize: 15,
      productItem: {},
      tabArrItem: {},
      tabColor: "#FF4691",
      defaultColor: "#333",
      tier: 2,
      categoryArr: [], //第一栏筛选类目数组
      isnearby: {
        label: "附近",
        id: 1
      },
      wordOfMouth: {
        label: "口碑",
        id: 2
      },
      filterArr: [
        {
          title: "玻尿酸",
          isShow: 0
        },
        {
          title: "全城",
          isShow: 0
        },
        {
          title: "智能排序",
          isShow: 0
        },
        {
          title: "筛选",
          isShow: 0
        }
      ],
      isSel: false,
      pulled: false,

      organList: [], // 接口返回的机构列表数据
      isOver: false, // 数据是否已全部加载
      organPageNum: 1, // 请求的分页
      organPageSize: 10, // 分页数
      selectArr: ["全城", "智能排序", "筛选"], // 口碑和附近的筛选名称
      activeItem: null, // 口碑和附近选择的排序类型
      selectDistance: null, // 口碑和附近选择的距离参数
      selectSort: null, // 口碑和附近选择的智能排序参数
      selectOrgan: null, // 口碑和附近选择的机构筛选参数
      distanceNumber: 6, // 距离
      // distanceNumberList: ['1千米', '3千米', '5千米', '10千米', '全城'], // 美购筛选距离列表
      distanceNumberList: [
        {
          type: 1,
          label: "1千米"
        },
        {
          type: 3,
          label: "3千米"
        },
        {
          type: 5,
          label: "5千米"
        },
        {
          type: 10,
          label: "10千米"
        },
        {
          type: 0,
          label: "全城"
        }
      ], // 美购筛选距离列表
      distanceNumberCountyList: [
        {
          type: 1,
          label: "1千米"
        },
        {
          type: 3,
          label: "3千米"
        },
        {
          type: 5,
          label: "5千米"
        },
        {
          type: 10,
          label: "10千米"
        }
      ], // 口碑全城距离列表

      activeItemProject: "",
      selectProject: "全部项目", // 选择的项目
      activeSelectProject: "",
      selectArea: "全城", // 选择的区域
      selectSorts: "智能排序", // 选择的排序
      selectInfo: "筛选", // 筛选条件
      arrs: [], // 项目分类
      arrs2: [], // 项目
      projectItemActive: null, // 选择的项目index
      projectActive: null,
      sortItemActive: null, // 选择的排序index
      areaList: [], // 区域id
      projectActive1: null,
      firstLeavlId: null,
      tier: null, // 选择项目的层级
      firstLeavlTier: null,
      list: [],
      channelCode: null, // 频道编码
      id: null, // 分类id
      params: {
        pageSize: 15
      },
      tabType: 2,
      selectDistanceTwo: 0, // 商品选择的距离参数
      selectItemActive: "", // 选择的服务参数
      productListOne: [], // 商品列表一
      productListTwo: [], // 商品列表二
      scrollTop: 0,
      toTop: true,
      searchboxH: "",
      navboxH: "",
      animationData: {},
      animationData1: {},
      animationData2: {},
      cityId: null,
      latitude: this.$store.state.latitude,
      longitude: this.$store.state.longitude,
      wholeCity: "", // 全城label
      intelligentSorting: "", // 智能排序label
      filter: "", // 筛选label
      allItems: "", // 全部项目
      intelligentSortingArr: ["不限", "销量最多", "最新上架"],
      filterArr: ["不限", "民营机构", "公立机构"],
      intelligentSortingObj: {
        S: "销量最多",
        N: "最新上架",
        PU: "价格从高到低",
        PD: "价格从低到高"
      },
      filterObj: {
        isStage: "支持分期",
        isInsurance: "支持保险"
      },
      countyList: [], // 口碑附近一级列表
      countyItemList: [], // 口碑附近二级列表
      countyActive: 0, // 口碑附近一级列表选择的index
      countyItemActive: null, // 口碑附近二级列表选择的index
      countyActiveLabel: "", // 口碑附近一级列表选择的label
      selectCountyId: null, // 口碑附近一级列表选择的id
      nowTabName: "附近" // 当前点击的tab的名称
    };
  },
  onPageScroll: function(res) {
    let h = this.searchboxH + this.navboxH;
    let tempH = 170;
    if (res.scrollTop - tempH > this.scrollTop) {
      this.scrollTop = res.scrollTop;
      this.animation.translateY(-h).step();
      this.animationData = this.animation.export();
    } else if (res.scrollTop + tempH < this.scrollTop) {
      this.scrollTop = res.scrollTop;
      this.animation.translateY(0).step();
      this.animationData = this.animation.export();
    }
  },
  onHide() {
    this.closeSelect();
  },
  mounted() {
    this.loaded = false;
    this.initQuery();
    this.getTabs();
    this.initAni();
    console.log("执行情景");
    this.upLats();
    this.getLocation();
  },
  computed: {
    currentCity() {
      return this.$store.state.curCity;
    },
    curArea() {
      return this.$store.state.curArea;
    },
    dealCountyList() {
      return this.countyList.filter(el => {
        if (el.label == "市辖区" || el.label == "县") {
          return false;
        } else {
          return true;
        }
      });
    }
  },
  methods: {
    initLabel() {
      this.wholeCity = ""; // 全城label
      this.intelligentSorting = ""; // 智能排序label
      this.filter = ""; // 筛选label
      this.allItems = ""; // 全部项目
      this.selectProject = "全部项目"; // 选择的项目
      this.activeSelectProject = "";
      this.selectArea = "全城"; // 选择的区域
      this.selectSorts = "智能排序"; // 选择的排序
      this.selectInfo = "筛选"; // 筛选条件
    },
    //进入页面加载
    upLats(data) {
      console.log("进来了");
      this.latitude = data ? data.lat : this.$store.state.latitude;
      this.longitude = data ? data.lng : this.$store.state.longitude;
      if (this.cityId != this.$store.state.curCityId) {
        this.initQuery();
        this.cityId = this.$store.state.curCityId;
      }

      if (this.current_scroll == 0 || this.current_scroll == 1) {
        this.queryOrganList(this.latitude, this.longitude);
      } else {
        this.getList(this.latitude, this.longitude);
      }
    },

    getLocation() {
      if (this.$store.state.curCityId == 1) {
        let that = this;
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.userLocation"]) {
              wx.showModal({
                title: "是否授权当前位置",
                content:
                  "您的位置信息获取失败，请到系统设置授权定位权限或检查网络后重试",
                success: function(res) {
                  if (res.cancel) {
                    wx.showToast({
                      title: "授权失败",
                      // icon: "cancle",
                      duration: 1000
                    });
                  } else if (res.confirm) {
                    wx.openSetting({
                      success: function(dataAu) {
                        console.log("openSetting:" + dataAu);
                        console.log(dataAu);
                        if (dataAu.authSetting["scope.userLocation"] == true) {
                          wx.showToast({
                            title: "授权成功",
                            icon: "success",
                            duration: 1000
                          });
                          //再次授权，调用getLocationt的API
                          // getLocation(that);
                          that.getLocation2(that);
                        } else {
                          wx.showToast({
                            title: "授权失败",
                            icon: "success",
                            duration: 1000
                          });
                        }
                      }
                    });

                    //
                  }
                }
              });
            }
          },
          fail(res) {
            console.log(res);
          }
        });
      }
    },
    getLocation2(_this) {
      wx.getLocation({
        type: "wgs84",
        success: function(res) {
          console.log(res);
          var latitude = res.latitude;
          _this.$store.commit("updateLatitude", latitude);
          var longitude = res.longitude;
          _this.$store.commit("updateLongitude", longitude);
          var speed = res.speed;
          var accuracy = res.accuracy;
          // _this.$set(_this.user, "latitude", latitude);
          // _this.$set(_this.user, "longitude", longitude);
          // _this.$set(_this.state, "latitude", latitude);
          // _this.$set(_this.state, "longitude", longitude);
          var qqmapsdk = new QQMapWX({
            key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
          });
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function(res) {
              // _this.$set(
              //   _this.user,
              //   "city",
              //   // res.result.address_component.district
              //   res.result.address_component.city
              // );
              _this.$store.commit(
                "updateCity",
                res.result.address_component.city
              );
              _this.$http
                .post("/common/getCityId", {
                  areaName: res.result.address_component.city
                })
                .then(res => {
                  console.log(res, "data定位");
                  if (_this.$route.query.source != 1) {
                    // _this.queryActivityByCustId(res.data);
                  }

                  _this.$store.commit("updateCityId", res.data);
                  _this.$store.commit("cityFlagChange", 2);

                  // 重新请求列表
                  _this.upLats();
                });
            },
            fail: function(res) {
              console.log(res, "解析失败");
              _this.$store.commit("updateCity", "全国");
              _this.$store.commit("updateCityId", 1);
            }
          });
        },
        fail: function(res) {
          _this.$store.commit("updateCity", "全国");
          // _this.user.city = "全国";
          _this.$store.commit("updateCityId", 1);
          // _this.areaId = 1;
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "请到应用管理打开微信地理授权",
            success(res) {}
          });
          console.log(res, "local失败");
        }
      });
      console.log(_this.$store.state.curCityId);
    },
    initAni() {
      //初始化动画
      let that = this;
      wx
        .createSelectorQuery()
        .select(".searchbox")
        .fields(
          {
            size: true
          },
          function(res) {
            console.log(res);
            if (res && res.width) {
              that.searchboxH = res.height;
            }
          }
        )
        .exec();
      wx
        .createSelectorQuery()
        .select(".navbox")
        .fields(
          {
            size: true
          },
          function(res) {
            console.log(res);
            if (res && res.width) {
              that.navboxH = res.height;
            }
          }
        )
        .exec();
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      this.animation = animation;
    },
    //获取tab列表
    getTabs() {
      this.$http
        .post("common/dictList", {
          masterCode: "channel_type"
        })
        .then(res => {
          if (res.code == 1 && res.data) {
            res.data.unshift(this.isnearby, this.wordOfMouth);
            this.$set(this, "tabArr", res.data);
            this.$set(this, "tabArrItem", res.data[this.current_scroll]);
          }
        });
    },
    queryOrganList(latitude, longitude) {
      //进入页面判断是否有areaId

      // 请求机构列表数据
      // 是否全部数据请求完毕
      if (this.isOver) {
        return;
      }
      // wx.showLoading({
      //   title: "正在加载中..."
      // });
      // 处理请求参数
      let params = {
        pageNum: this.organPageNum,
        pageSize: this.organPageSize,
        isCoop: 0,
        areaId: this.selectCountyId || this.$store.state.curCityId
      };
      if (latitude) {
        params.lat = latitude;
      } else {
        delete params.lat;
      }
      if (longitude) {
        params.lng = longitude;
      } else {
        delete params.lng;
      }
      console.log('----经纬度----')
      console.log(latitude, longitude)
      console.log('----经纬度----')
      if (this.selectDistance) {
        params.distType = Number(this.selectDistance);
      } else {
        delete params.distType;
      }
      if (this.selectSort != 0 && this.selectSort != null) {
        params.sortType = Number(this.selectSort) - 1;
      } else {
        delete params.sortType;
      }
      if (this.selectOrgan != null && this.selectOrgan != 0) {
        params.nature = Number(this.selectOrgan) - 1;
      } else {
        delete params.nature;
      }
      if (this.tabType) {
        params.tabType = this.tabType;
      } else {
        delete params.tabType;
      }

      this.$http.post("organ/list4PageWxMp", params).then(res => {
        // wx.hideLoading();
        if (res.code === 1 && res.data.data) {
          this.loaded = true;
          if (res.data.pageNum == 1) {
            this.organList = res.data.data ? res.data.data : [];
          } else {
            this.organList = this.organList.concat(
              res.data.data ? res.data.data : []
            );
          }
          if (
            this.organPageNum == res.data.pages ||
            (res.data.data && res.data.data.length < this.organPageSize)
          ) {
            this.isOver = true;
          } else {
            this.isOver = false;
            this.organPageNum++;
          }
        }
      });
    },
    tabItem(msg) {
      console.log(msg);
      this.loaded = false;
      this.current_scroll = msg.i;
      this.productItem = msg.item;
      this.initLabel();
      this.initQuery();
      this.initSelect();
      this.nowTabName = msg.item.label;
      this.selectCountyId = null;
      if (msg.item.label == "附近" || msg.item.label == "口碑") {
        if (msg.item.label == "附近") {
          this.tabType = 2;
        } else if (msg.item.label == "口碑") {
          this.tabType = 3;
          this.queryArea();
        }
        this.queryOrganList(this.latitude, this.longitude);
      } else {
        this.channelCode = msg.item.detailCode ? msg.item.detailCode : "";
        this.tier = 2;
        this.tabType = null;
        this.queryDiaryType();
        this.queryArea();
        this.getList(this.latitude, this.longitude);
      }
      wx.pageScrollTo({
        // 将页面滚动到顶部
        scrollTop: 0
      });
    },
    initQuery() {
      // 口碑和附近初始化请求数据
      this.organPageNum = 1;
      this.organList = [];
      this.isOver = false;
      this.pageNum = 1;
      this.list = [];
    },
    initSelect() {
      // 口碑和附近初始化筛选数据
      this.activeItem = null;
      this.selectDistance = null;
      this.selectSort = null;
      this.selectOrgan = null;
      this.selectDistanceTwo = 0;

      this.activeItemProject = "";
      this.projectItemActive = null;
      this.projectActive = null;
      this.sortItemActive = null;
      this.projectActive1 = null;
      this.firstLeavlId = null;
      this.tier = null;
      this.firstLeavlTier = null;
      this.id = null;

      this.arrs = [];
      this.arrs2 = [];

      this.countyActive = 0;
      this.countyItemActive = null;
      this.countyList = [];
      this.countyItemList = [];
    },
    selectF(index) {
      // 口碑和附近选择筛选类型触发的函数
      this.activeItem = this.activeItem == index ? null : index;
    },
    selectDistanceF(event) {
      // 口碑和附近选择的距离参数
      this.wholeCity =
        this.selectDistance == event.target.id
          ? ""
          : `${event.target.id}千米内`;
      this.selectDistance =
        this.selectDistance == event.target.id ? null : event.target.id;
      this.activeItem = null;
      this.initQuery();
      this.queryOrganList(this.latitude, this.longitude);
    },
    selectSortF(event) {
      // 口碑和附近选择的智能排序参数
      this.intelligentSorting =
        this.selectSort == event.target.id
          ? ""
          : this.intelligentSortingArr[event.target.id];
      this.selectSort =
        this.selectSort == event.target.id ? null : event.target.id;
      this.activeItem = null;
      this.initQuery();
      this.queryOrganList(this.latitude, this.longitude);
    },
    selectOrganF(event) {
      // 口碑和附近选择的机构分类参数
      this.filter =
        this.selectOrgan == event.target.id
          ? ""
          : this.filterArr[event.target.id];
      this.selectOrgan =
        this.selectOrgan == event.target.id ? null : event.target.id;
      this.activeItem = null;
      this.initQuery();
      this.queryOrganList(this.latitude, this.longitude);
    },
    selectFProject(val) {
      if (this.activeItemProject == val) {
        this.activeItemProject = "";
      } else {
        this.activeItemProject = val;
      }
    },
    projectSelect(val, item) {
      // 选择一级分类，请求二级分类
      this.initQuery();
      this.firstLeavlId = item.id;
      this.firstLeavlTier = item.tier;
      if (this.projectActive == val) {
        this.projectActive = null;
        this.id = null;
        this.tier = null;
        this.arrs2 = [];
        delete this.params.categoryId;
        delete this.params.tier;
        this.activeItemProject = "";
        this.selectProject = "全部项目";
        this.activeSelectProject = "";
      } else {
        this.projectActive = val;
        this.id = item.id;
        this.tier = item.tier;
        this.projectItemActive = null;
        this.selectProject = item.cateName;
        this.activeSelectProject = item.cateName;
        if (item.channelCode) {
          this.$http
            .post("projectCate/listByCondition", {
              pId: item.id,
              tier: item.tier + 1,
              channelCode: this.channelCode
            })
            .then(res => {
              if (res.code === 1) {
                this.arrs2 = res.data;
                if (res.data.length < 1) {
                  this.activeItemProject = "";
                }
              }
            });
        }
      }
      this.getList(this.latitude, this.longitude);
    },
    getList(latitude, longitude) {
      // 请求数据
      if (this.isOver) {
        return;
      }
      // wx.showLoading({
      //   title: "正在加载中..."
      // });
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        areaId: this.selectCountyId || this.$store.state.curCityId
      };
      // if (this.$store.state.curCityId) {
      //   this.params.areaId = this.$store.state.curCityId;
      // } else {
      //   delete this.params.areaId
      // }
      if (latitude) {
        params.lat = latitude;
      }
      if (longitude) {
        params.lng = longitude;
      }
      if (this.id) {
        params.categoryId = this.id;
      } else {
        delete params.categoryId;
      }
      if (this.tier) {
        params.tier = this.tier;
      } else {
        delete params.tier;
      }
      if (this.channelCode) {
        params.channelCode = this.channelCode;
      }
      if (this.selectDistanceTwo) {
        params.distType = this.selectDistanceTwo;
      } else {
        delete params.distType;
      }

      delete params.isStage;
      delete params.isInsurance;
      if (this.selectItemActive) {
        params[this.selectItemActive] = 1;
      }

      this.$http.post("/commodity/commodityList", params).then(res => {
        // wx.hideLoading();
        if (res.code === 1) {
          this.loaded = true;
          let a = res.data.data;
          for (let i = 0, j = a.length; i < j; i++) {
            if (a[i].commImg) {
              a[i].commImg = a[i].commImg.split(",");
            } else {
              a[i].commImg = [];
            }
            if (a[i].distance) {
              a[i].distance = dealNumber1(a[i].distance);
            }
          }
          this.productListOne = [];
          this.productListTwo = [];
          if (this.pageNum == 1) {
            this.list = [];
          }
          this.list = this.list.concat(a);
          for (let i = 0, j = this.list.length; i < j; i++) {
            if (i % 2) {
              this.productListTwo.push(this.list[i]);
            } else {
              this.productListOne.push(this.list[i]);
            }
          }
          if (this.pageNum == res.data.pages || res.data.data.length < 15) {
            this.isOver = true;
          } else {
            this.isOver = false;
            this.pageNum++;
          }
        }
      });
    },
    projectSelect1(index, item) {
      this.initQuery();
      if (this.projectActive1 == index) {
        this.projectActive1 = null;
        delete this.params.areaId;
      } else {
        this.projectActive1 = index;
        this.params.areaId = item.id;
      }
      this.getList(this.latitude, this.longitude);
    },
    jump(val) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id: val
        }
      });
    },
    sortSelect(val) {
      // 选择排序规则
      if (this.sortItemActive == val) {
        this.sortItemActive = "";
        this.selectSorts = "智能排序";
        delete this.params.sortState;
      } else {
        this.sortItemActive = val;
        this.params.sortState = val;
        this.selectSorts = this.intelligentSortingObj[val];
      }
      this.initQuery();
      this.getList(this.latitude, this.longitude);
      this.activeItemProject = "";
    },
    projectItemSelect(val, item) {
      // 选择二级分类
      this.initQuery();
      if (this.projectItemActive == val) {
        this.projectItemActive = null;
        this.id = this.firstLeavlId;
        this.tier = this.firstLeavlTier;
        this.selectProject = this.activeSelectProject;
      } else {
        this.projectItemActive = val;
        this.id = item.id;
        this.tier = item.tier;
        this.selectProject = this.activeSelectProject + "/" + item.cateName;
      }
      this.getList(this.latitude, this.longitude);
      this.activeItemProject = "";
    },
    query() {
      this.getList(this.latitude, this.longitude);
    },
    queryDiaryType() {
      let params = {
        tier: this.tier,
        channelCode: this.channelCode
      };
      if (this.id) {
        params.pId = this.id;
      } else {
        delete params.pId;
      }
      this.$http.post("projectCate/listByCondition", params).then(res => {
        console.log(res);
        this.arrs = res.data;
      });
    },
    selectDistanceTwoF(event) {
      if (this.selectDistanceTwo == event.target.id) {
        this.selectDistanceTwo = 0;
        this.selectArea = "全城";
      } else {
        this.selectDistanceTwo = event.target.id;
        this.selectArea = event.target.dataset.label;
      }
      this.initQuery();
      this.getList(this.latitude, this.longitude);
      this.activeItemProject = "";
    },
    serveSelect(val) {
      if (this.selectItemActive == val) {
        this.selectItemActive = "";
        this.selectInfo = "筛选";
      } else {
        this.selectItemActive = val;
        this.selectInfo = this.filterObj[val];
      }
      this.initQuery();
      this.getList(this.latitude, this.longitude);
      this.activeItemProject = "";
    },
    closeSelect() {
      this.activeItemProject = "";
      this.activeItem = null;
    },
    queryArea() {
      this.$http
        .post("/common/getAreaTree", {
          pId: this.$store.state.curCityId
        })
        .then(res => {
          if (res.code == 1) {
            this.countyList = res.data;
            this.countyList.unshift({
              label: "附近",
              id: 0
            })
            this.countyList.unshift({
              label: '全城',
              id: -1
            })
            res.data.map((el, inx) => {
              if (el.label == "市辖区") {
                this.$http
                  .post("/common/getAreaTree", {
                    pId: el.id
                  })
                  .then(res => {
                    if (res.code == 1) {
                      this.countyList = this.countyList.concat(res.data);
                    }
                  });
              }
              if (el.label == "县") {
                this.$http
                  .post("/common/getAreaTree", {
                    pId: el.id
                  })
                  .then(res => {
                    if (res.code == 1) {
                      this.countyList = this.countyList.concat(res.data);
                    }
                  });
              }
            });
            console.log(this.countyList);
          }
        });
    },
    countySelect(val, item) {
      this.countyItemActive = null;
      if (this.countyActive == val) {
        this.countyActive = 0;
        this.countyActiveLabel = "";
        this.selectCountyId = null;
        if (this.nowTabName == "口碑") {
          this.wholeCity = "";
        } else {
          this.selectArea = "全城";
        }
        this.countyItemList = [];
      } else {
        this.countyActive = val;
        if (this.nowTabName == "口碑") {
          this.wholeCity = item.label;
        } else {
          this.selectArea = item.label;
        }
        this.countyActiveLabel = item.label;
        if (item.label == "附近") {
          this.countyItemList = this.distanceNumberCountyList;
        } else {
          this.countyItemList = [];
          this.selectCountyId = item.id != -1 ? item.id : null;
        }
      }
      if (this.countyActiveLabel != "附近") {
        if (this.nowTabName == "口碑") {
          this.activeItem = null;
          this.selectDistance = null;
        } else {
          this.activeItemProject = null;
          this.selectDistanceTwo = null;
        }
        this.initQuery();
        if (this.nowTabName == "口碑") {
          this.queryOrganList(this.latitude, this.longitude);
        } else {
          this.getList(this.latitude, this.longitude);
        }
      }
    },
    countyItemSelect(val, item) {
      if (this.countyItemActive == val) {
        this.countyActive = 0;
        this.countyItemActive = null;
        if (this.nowTabName == "口碑") {
          this.wholeCity = "";
          this.selectDistance = null;
        } else {
          this.selectArea = "全城";
          this.selectDistanceTwo = null;
        }
      } else {
        this.countyItemActive = val;
        if (this.nowTabName == "口碑") {
          this.selectDistance = item.type;
          this.wholeCity = this.countyActiveLabel + "/" + item.label;
        } else {
          this.selectDistanceTwo = item.type;
          this.selectArea = this.countyActiveLabel + "/" + item.label;
        }
      }
      if (this.nowTabName == "口碑") {
        this.activeItem = null;
      } else {
        this.activeItemProject = null;
      }
      this.initQuery();
      if (this.nowTabName == "口碑") {
        this.queryOrganList(this.latitude, this.longitude);
      } else {
        this.getList(this.latitude, this.longitude);
      }
    }
  },
  onReachBottom() {
    // 触底加载
    if (!this.isOver) {
      if (this.current_scroll == 0 || this.current_scroll == 1) {
        this.queryOrganList(this.latitude, this.longitude);
      } else {
        this.getList(this.latitude, this.longitude);
      }
    }
  }
};
</script>

<style scoped lang="less">
@import url("../css/style.less");

.voo {
  background-color: #f5f5f5;
  height: 100%;
  padding-top: 258rpx;
  box-sizing: border-box;
}

.cart-icon {
  width: 1rem;
  height: 1rem;
  background: rgba(0, 0, 0, 1);
  opacity: 0.85;
  border-radius: 50%;
  position: fixed;
  right: 30rpx;
  bottom: 25rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  z-index: 5;
}

.cart-icon i {
  background: url("http://img.meiduduo.com/images/shop/cart.png");
  width: 0.48rem;
  height: 0.4rem;
  background-size: contain;
  margin: 0 auto;
  display: block;
}

.fixation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background-color: #f1f1f1;
}

.triangle_border_down {
  width: 0;
  height: 0;
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: #999 transparent transparent;
  position: relative;
}
.triangle_border_up {
  width: 0;
  height: 0;
  border-width: 0 5px 5px;
  border-style: solid;
  border-color: transparent transparent @baseColor;
  position: relative;
}
.f-color {
  color: @baseColor;
}
.organ-list {
  margin-bottom: 0.2rem;
}
.organ-list > div {
  border-bottom: 18rpx solid #f5f5f5;
}
.organ-list > div:last-child {
  border-bottom: 0;
}

.select-box {
  height: 84rpx;
  width: 100%;
  line-height: 64rpx;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  font-size: 26rpx;
  color: #555;
  background: #f5f5f5;
  border: 2rpx solid #ddd;
  padding: 10rpx 0;
}
.select-box-itme {
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  display: flex;
  -webkit-display: flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  text-align: center;
  border-right: 2rpx solid #ddd;
}
.label-over-hide {
  width: 150rpx;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.select-box-itme:last-child {
  border-right: 0;
}
.active {
  color: #fc4396;
}
.select-box-main {
  position: absolute;
  background: #fff;
  width: 100%;
}
.item_span {
  height: 88rpx;
  width: 100%;
  text-align: center;
  line-height: 88rpx;
  font-size: 26rpx;
  color: #333333;
  display: block;
  padding: 0 26rpx;
  box-sizing: border-box;
}
.project_left {
  background: #f5f5f5;
  color: #fc4396;
}
.selcet_box {
  width: 100%;
  display: flex;
  align-items: stretch;
  font-size: 26rpx;
  color: #555555;
  background: #fff;
  border-bottom: 1rpx solid #f1f1f1;
  height: 80rpx;
  position: fixed;
  top: 0;
  z-index: 5;
}
.selcet_box > div {
  flex: 1;
  border-right: 1rpx solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selcet_box > div:last-child {
  border: none;
}

.item1_select {
  display: flex;
}
.select_item {
  width: 100%;
  height: 600rpx;
  box-sizing: border-box;
}
.item1_select_left {
  flex: 1;
  min-width: 260rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.item3_select {
  width: 100%;
  height: 176rpx;
  box-sizing: border-box;
  background: #fff;
}
.item3_select {
  border-top: 1rpx solid #f1f1f1;
}

.list_over {
  font-size: 20rpx;
  text-align: center;
  padding: 17rpx 0;
}
.select-box-main-item {
  background: #fff;
}
.product-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  display: -webkit-flex;
  -webkit-align-items: flex-start;
  box-sizing: border-box;
  padding: 0 30rpx;
}
.product-list-left,
.product-list-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}
.product-list-right {
  align-items: flex-end;
}
.product-list {
  background: #f1f1f1;
  padding-top: 20rpx;
}
.box-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.shop-organ-card-item {
  margin-bottom: 18rpx;
}
</style>
