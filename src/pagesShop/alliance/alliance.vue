<template>
  <div class="alliance">
    <div class="alliance-banner">
      <!-- <Carousel
        :cWidth="640"
        :cHeight="400"
        :imgData="adList"
        typeclass="carousel-img-type-one"
        @advertGo="advertGo"
      ></Carousel>-->
      <CarouselTwo
        :cWidth="640"
        :cHeight="400"
        :imgData="adList"
        typeclass="carousel-img-type-one"
        @advertGo="advertGo"
      ></CarouselTwo>
    </div>
    <!-- <div class="alliance-banner">
      <div :style="{ width: bannerList.length * 670 + 30 + 'rpx' }">
        <img v-if="index < 6" class="alliance-banner-item" mode="aspectFill" v-for="(value, index) of bannerList" :key="index" :src="value" alt="">
      </div>
    </div>-->
    <div class="alliance-title">
      <span class="alliance-label">热门推荐</span>
      <!-- <span class="alliance-aside-label">更多</span> -->
    </div>
    <!--  -->
    <div v-if="popularRecommendationList.length > 0" class="alliance-product">
      <div :style="{ width: popularRecommendationList.length * 317 + 30 + 'rpx' }">
        <div
          @click="goDetailPage(item.id)"
          v-for="(item, index) of popularRecommendationList"
          :key="index"
          class="alliance-product-item"
        >
          <div class="alliance-product-img">
            <img class="alliance-produce-logo" :mode="widthFix" :src="item.commImg[0]" alt>
            <!-- <img @click.stop="toFavourite(item)" v-if="item.favourite" class="alliance-icon" src="http://img.meiduduo.com/images/favourite.png" alt="">
            <img @click.stop="toFavourite(item)" v-else class="alliance-icon" src="http://img.meiduduo.com/images/favourite.png" alt="">-->
          </div>
          <div class="alliance-product-info">
            <p class="info-title z-oneline-overflow-hidden">
              <span>[{{ item.commName }}]</span>
              <span>{{ item.remark }}</span>
            </p>
            <p class="info-address z-oneline-overflow-hidden">{{ item.organName }}</p>
            <p class="info-price">
              <span>￥{{ item.rulePrice }}</span>
              <!-- <span>医院价：￥{{ item.price }}</span> -->
              <span>指导价：￥{{ item.price }}</span>
            </p>
            <p class="info-footer">
              <span v-if="item.isStage" class="info-footer-item-bgc1">分</span>
              <span v-if="item.isInsurance" class="info-footer-item-bgc2">保</span>
              <span class="info-footer-item-bgc3">联</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="alliance-title">
      <span class="alliance-label">精选好店</span>
      <!-- <span class="alliance-aside-label">更多</span> -->
    </div>

    <div
      @click="goOrgan(item.id)"
      v-if="featuredStoreList.length > 0"
      class="alliance-organ"
      v-for="(item, i) of featuredStoreList"
      :key="i"
    >
      <div class="alliance-organ-info">
        <img :src="item.logo" alt>
        <div>
          <p class="organ-info-title z-oneline-overflow-hidden">{{ item.organName }}</p>
          <p class="organ-info-address">
            {{ item.areaName }}
            <span v-if="item.distance">{{ item.distance }}km</span>
          </p>
          <div class="organ-info-type organ-info-type-adjustment" style="padding: 2rpx 0;">
            <p class="z-oneline-overflow-hidden">
              <span>{{ item.channelName }}</span>
            </p>
            <span
              v-if="item.favourite == false"
              @click.stop="toCollectionAgency(item)"
              class="info-btn"
            >
              <i-icon :size="12" color="#FF4691" type="add"/>关注
            </span>
            <span v-else @click.stop="toCollectionAgency(item)" class="info-btn">
              <i-icon :size="12" color="#FF4691" type="right"/>已关注
            </span>
          </div>
        </div>
      </div>
      <div class="alliance-organ-ticket">
        <span class="ticket-label">促销</span>
        <div class="ticket-list">
          <div
            v-if="index < 3"
            v-for="(value, index) of item.couponChild"
            :key="index"
            class="ticket-item"
            @click.stop="jump(value)"
          >
            <img src="http://img.meiduduo.com/images/xyy/coupon.png" alt>
            <p
              class="z-oneline-overflow-hidden"
            >购买后可赠送价值{{ value.reductionPrice }}元{{ value.couponName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dealNumber1 } from "../../utils/util.js";
import Carousel from "../comm/Carousel";
import CarouselTwo from "../comm/CarouselTwo";
export default {
  components: {
    Carousel,
    CarouselTwo
  },
  data() {
    return {
      // bannerList: [
      //   "http://img.meiduduo.com/images/banner001.png?" + Math.random() / 9999,
      //   "http://img.meiduduo.com/images/shop/pt.png?" + Math.random() / 9999,
      //   "http://img.meiduduo.com/images/banner001.png?" + Math.random() / 9999,
      //   "http://img.meiduduo.com/images/shop/pt.png?" + Math.random() / 9999,
      //   "http://img.meiduduo.com/images/banner001.png?" + Math.random() / 9999
      // ],
      bannerList: [],
      n: 6,
      popularRecommendationList: [], // 热门推荐列表
      featuredStoreList: [], // 精选好店列表
      adList: []
    };
  },
  onShow() {
    this.queryPopularRecommendation();
    this.queryFeaturedStore();
    this.getAdvert();
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl1;
    }
  },
  methods: {
    advertGo(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(this.httpUrl + "/sys/advertCost/updateAdvertClickNumber", {
          advertId: item.advertId
        })
        .then(res => {
          if (res.code == 1) {
            this.changeJump(item.skipParam.url, {
              id: item.skipParam.id,
              type: item.skipParam.wordtype,
              custId: this.$store.state.userInfo.custId
            });
          }
        });
    },

    //获取头条医美数据流的广告
    //获取头条医美数据流的广告
    getAdvert() {
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertConfig/findAdvertByPlaceCode",
          {
            placeCode: "2BT50",
            areaId: this.$store.state.curCityId
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
    },
    jump(val) {
      this.$router.push({
        path: "/pagesShop/voucherDetail",
        query: {
          couponItem: JSON.stringify(val)
        }
      });
    },
    queryPopularRecommendation() {
      // 请求热门推荐商品
      this.$http.post("organCooperate/queryHotCommodity", {}).then(res => {
        if (res.code === 1) {
          this.popularRecommendationList = res.data.map(el => {
            if (el.commImg) {
              el.commImg = el.commImg.split(",");
            } else {
              el.commImg = [];
            }
            return el;
          });
        }
      });
    },
    goDetailPage(id) {
      // 去商品详情页
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id: id
        }
      });
    },
    toFavourite(data) {
      // 收藏商品
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http
        .post("storeRecord/save", {
          recordId: data.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 3,
          state: data.favourite ? -1 : 1
        })
        .then(res => {
          wx.hideLoading();
          if (res.code === 1) {
            wx.showToast({
              title: data.favourite ? "取消成功" : "收藏成功",
              icon: "none"
            });
            this.queryPopularRecommendation();
          }
        });
    },
    queryFeaturedStore() {
      // 请求精选好店数据
      this.$http
        .post("organ/list4PageWxMp", {
          lat: this.$store.state.latitude ? this.$store.state.latitude : "",
          lng: this.$store.state.longitude ? this.$store.state.longitude : "",
          pageNum: 1,
          pageSize: 25,
          custId: this.$store.state.userInfo.custId,
          isCoop: 1
        })
        .then(res => {
          if (res.code === 1) {
            if (!res.data.data) return;
            this.featuredStoreList = res.data.data.map(el => {
              if (el.distance) {
                el.distance = dealNumber1(el.distance);
              }
              return el;
            });
          }
        });
    },
    toCollectionAgency(data) {
      // 关注机构
      this.$http
        .post("focusRecord/save", {
          recordId: data.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 2,
          state: data.favourite ? -1 : 1
        })
        .then(res => {
          if (res.code === 1) {
            wx.showToast({
              title: data.favourite ? "取消成功" : "关注成功",
              icon: "none"
            });
            this.queryFeaturedStore();
          }
        });
    },
    goOrgan(id) {
      // 去机构详情页
      this.$router.push({
        path: "/pagesShop/orgin",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.alliance {
  background: #f5f5f5;
}
.alliance-banner {
  /* display: flex;
  display: -webkit-flex; */
  /* background: url('http://img.meiduduo.com/images/shop/banner1.png') no-repeat; */
  background: linear-gradient(
    48deg,
    rgba(250, 106, 164, 0.8) 0%,
    rgba(248, 192, 152, 0.59) 53%,
    rgba(183, 50, 252, 0.4) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 326rpx;
  width: 100%;
  height: 460rpx;
  padding: 30rpx 0;
  overflow-x: scroll;
}
.alliance-banner-item {
  width: 640rpx;
  height: 400rpx;
  border-radius: 20rpx;
  margin-right: 30rpx;
}
img.alliance-banner-item:first-child {
  margin-left: 30rpx;
}
.alliance-title {
  width: 100%;
  height: 110rpx;
  padding: 30rpx;
  position: relative;
  font-size: 26rpx;
  color: #fff;
}
.alliance-label {
  width: 165rpx;
  height: 50rpx;
  background: #fb5ca9;
  text-align: center;
  line-height: 50rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-style: dashed;
  border-width: 2rpx;
}
.alliance-aside-label {
  font-size: 24rpx;
  color: #333333;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30rpx;
}
.alliance-product {
  background: #fff;
  padding: 30rpx 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.alliance-product-item {
  margin-left: 30rpx;
  width: 287rpx;
  box-sizing: border-box;
  display: inline-block;
}
div.alliance-product-item:last-child {
  margin-right: 30rpx;
}
.alliance-product-img {
  width: 287rpx;
  height: 286rpx;
  border-radius: 4rpx;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 40rpx;
}
.alliance-produce-logo {
  width: 100%;
  height: 100%;
}
.alliance-icon {
  width: 38rpx;
  height: 38rpx;
  border-radius: 100%;
  position: absolute;
  right: 17rpx;
  bottom: 16rpx;
  /* background: #fff; */
}
.info-title {
  font-size: 26rpx;
  color: #333333;
}
.alliance-product-info > p {
  width: 287rpx;
  box-sizing: border-box;
}
.info-address {
  font-size: 24rpx;
  color: #999999;
}
.info-price > span:first-child {
  font-size: 28rpx;
  color: #ff4691;
  margin-right: 10rpx;
}
.info-price > span:last-child {
  font-size: 18rpx;
  color: #999999;
  text-decoration: line-through;
}
.info-footer > span {
  font-size: 22rpx;
  color: #ffffff;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 4rpx;
  margin-right: 8rpx;
  padding: 0 5rpx;
  text-align: center;
}
.info-footer-item-bgc1 {
  background: #fa97e6;
}
.info-footer-item-bgc2 {
  background: #74dec4;
}
.info-footer-item-bgc3 {
  background: #81bcff;
  margin-right: 0;
}
.alliance-organ-ticket {
  display: flex;
  display: -webkit-flex;
  margin-top: 30rpx;
}
.ticket-label {
  font-size: 24rpx;
  color: #333;
  font-weight: bold;
}
.ticket-list {
  margin-left: 30rpx;
  width: 610rpx;
}
.ticket-item {
  margin-bottom: 20rpx;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
.ticket-item > img {
  width: 96rpx;
  height: 30rpx;
  margin-right: 17rpx;
}
.ticket-item > p {
  font-size: 24rpx;
  color: #666666;
  width: 500rpx;
}
.organ-info-type-adjustment {
  height: 48rpx;
}
</style>
