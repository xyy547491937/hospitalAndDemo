<template>
  <div style="background-color: #FFFFFF;">
    <!-- <div>
        <i-row >
            <i-col span="24" class="index-advertising"> <img :src="src"  ></i-col>
        </i-row>
    </div>-->
    <div class="swiper-box" style="transform:translate3d(0,0,0);overflow:hidden;">
      <!-- indicator-color="#fff" indicator-active-color="#fff" -->
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        indicator-color="rgba(0,0,0,0.3)"
        indicator-active-color="#fff"
        :autoplay="autoplay"
        :interval="interval"
        :circular="circular"
        :duration="duration"
      >
        <block v-for="(item,index) in src" :key="index">
          <swiper-item>
            <!-- 广告 -->
            <img class="slide-image" :src="item.pictureUrl" @click="jump(item)" alt>
            <!-- <img class="slide-image" :src="item.pictureUrl" alt=""> -->
          </swiper-item>
        </block>
      </swiper>
      <!--重置小圆点的样式  -->
      <!-- <view class="dots">
                <block v-for=" ( item,index ) in imgUrls" :key="index">
                    <view class="dot" :class="index == currentSwiper ? ' active' : ''"></view>
                </block>
      </view>-->
    </div>
  </div>
</template>
<script>
export default {
  props: ["src"],
  data() {
    return {
      currentSwiper: 0,
      indicatorDots: true,
      autoplay: true,
      interval: 6000,
      duration: 300,
      circular: true,
      imgUrls: [
        "http://img.meiduduo.com/images/index/ad_01.png?" +
          Math.random() / 9999,
        "http://img.meiduduo.com/images/index/ad_02.png?" +
          Math.random() / 9999,
        "http://img.meiduduo.com/images/index/ad_03.png?" + Math.random() / 9999
      ],
      adList: []
    };
  },
  onLoad() {
    if (this.$store.state.isLogin) {
      // this.getADList(1, 15);
      // this.getADList2();
    }
    // this.getAdvert();src
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl1;
    }
  },

  methods: {
    jump(item) {
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
    swiperChange(e) {
      // console.log(e);
      // this.currentSwiper = e.target.current;
    },

    getADList(pageNum, pageSize) {
      let options = {
        pageNum,
        pageSize
      };
      this.$http.post("/advertRecord/list4Page", { ...options }).then(res => {
        console.log("广告：", res);
        if (res.code == "1") {
          this.adList = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.swiper-box {
  position: relative;
}
.swiper,
.slide-image {
  width: 100%;
  height: 360rpx;
}
/* .swiper .wx-swiper-dots::before {
  color: #fff;
}
.swiper .wx-swiper-dot-active::before {
  width: 60rpx;
  color: red;
} */
/*用来包裹所有的小圆点  */
.dots {
  height: 36rpx;
  /* width: 156rpx; */
  /* height: 36rpx;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 40rpx;
  bottom: 16rpx; */
}
/*未选中时的小圆点样式 */
.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  margin-right: 26rpx;
  background-color: white;
}
/*选中以后的小圆点样式  */
.active {
  width: 24rpx;
  height: 12rpx;
  border-radius: 5rpx;
  /* background-color: coral; */
}
.index-advertising {
  height: 2rem;
}
.index-advertising img {
  height: 2rem;
  width: 93%;
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
}
</style>
