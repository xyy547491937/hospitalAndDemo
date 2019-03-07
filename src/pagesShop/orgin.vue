<template>
  <div class="c-bom">
    <!-- <img :src="imgUrl" alt=""> -->
    <div class="mine">
      <div
        class="banner"
        :style="{backgroundImage:'url('+ organData.organ.completePicture+') '}"
        style="background-size:cover;background-repeat:no-repeat;"
      >
        <div class="banner-navs"></div>
        <div class="banner-page flex-c">
          <div class="banner-page-h">
            <h3>{{organData.organ.organName}}</h3>
          </div>
          <div class="banner-pingfen">
            <!-- <i-rate disabled :value="organData.organ.starScore"></i-rate>
            <span class="banner-pingfen-s">{{organData.organ.starScore}} .0分</span>-->
            <span id class="banner-pingfen-s">{{organData.organ.natureName}}</span>
          </div>
        </div>
        <div
          class="guanzhu"
          :class="organData.isFollow?'active-focus-btn active-focus-btn1':'focus-btn'"
          @click="followHospital"
        >
          <span id class="weii">
            <i-icon type="right" color="#333" v-if="organData.isFollow==1"/>
            {{organData.isFollow?"已关注":"+关注"}}
          </span>
        </div>
        <!-- <div class="guanzhu">
					<span id="" class="yi">
						已关注
					</span>
        </div>-->
        <span class="home-index" v-if="isActive" @click="goIndex">
          <img src="/static/images/tab1.png" alt>
        </span>
      </div>
      <div class="infor">
        <!-- <tab :titledata="nav" @clickactive="clickactive"></tab> -->
        <ul class="content-item tabs">
          <li class="tab-item" v-for="(v,i) in nav1" :key="i" @click="clickactive(v,i)">
            <span class="tab-icon" :class="[{'cnm':cur==i},v.icon]"></span>
            <p>
              <span class="bord-d" :class="{'active':cur==i}">{{v.title}}</span>
            </p>
          </li>
        </ul>
      </div>

      <!-- 机构地址 -->
      <div
        class="organ-addr flex-r"
        @click="changeJump('/pagesShop/organMap',{lat:organData.organ.lat,lng:organData.organ.lng,organName:organData.organ.organName,address:organData.organ.address})"
      >
        <p class="flex-r addr-inner">
          <span>
            <i-icon type="coordinates" color="#FF4691"/>
          </span>
          <span style="margin-left:10px;">{{organData.organ.address}}</span>
        </p>
        <p>
          <i-icon type="enter" color="#999"/>
        </p>
      </div>
      <div class="content">
        <!-- 服务 -->
        <div class="content-item" v-if="activeIcon==1">
          <div
            class="item"
            v-for="(v,i) in organData.commodityList"
            :key="i"
            @click="changeJump('./productDetails',{id:v.id})"
          >
            <div class="item-top">
              <div class="item-img">
                <img :src="v.commImg" :alt="v.commName">
              </div>
              <div class="info">
                <div>
                  <h5>
                    [{{v.commName}}]
                    <span v-if="v.projectName">[{{v.projectName}}］</span>
                    <span>{{v.remark}}</span>
                  </h5>
                </div>
                <p class="addr">{{v.organName}}</p>
                <p class="price-spans">
                  <i class="c">¥{{v.rulePrice}}</i>
                  <!-- <span style="text-decoration:line-through">医院价：¥{{v.price}}</span> -->
                  <span style="text-decoration:line-through">指导价：¥{{v.price}}</span>
                </p>
                <div class="price-nub">
                  <div class>
                    <span id class="fenqi" v-if="v.isStage">分</span>
                    <span id class="baoxian" v-if="v.isInsurance">保</span>
                    <span id class="fenqi" v-if="v.isRecommend">推</span>
                  </div>
                  <div class>
                    <span>{{v.buyNum}}人购买</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- nodata -->
          <div
            class="noData"
            v-if="organData.commodityList.length<=0"
            :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''"
          ></div>
        </div>
        <!-- 视讯 -->
        <div class="content-item" v-if="activeIcon==2">
          <live :liveList="organData.videoAndArticleVOList"></live>
          <!-- nodata -->
          <div
            class="noData"
            v-if="organData.videoAndArticleVOList.length<=0"
            :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''"
          ></div>
        </div>

        <!-- 医生 -->
        <div class="doc" v-if="activeIcon==3">
          <div class="c content-item2" v-for="(v,i) in doctorers" :key="i">
            <doctorList :doctorers="v"></doctorList>
            <!-- nodata -->
            <div
              class="noData"
              v-if="doctorers.length<=0"
              :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''"
            >
              <!-- 暂无数据 -->
            </div>
            <div class="line" v-if="doctorers.length>1"></div>
          </div>
        </div>

        <!-- 简介 -->
        <div class="organ-summary" v-if="activeIcon==4 ">
          <div class="organ-content content-item">
            <p class="organ-introduce">{{organData.organ.organName}}</p>
            <p>
              <span>资质：</span>
              <span>{{organData.organ.aptitude}}</span>
            </p>
            <p>
              <span>电话：</span>
              <span>{{organData.organ.tel}}</span>
            </p>
            <p>
              <span>地址：</span>
              <span>{{organData.organ.address}}</span>
            </p>
          </div>
          <div class="c content-item">
            <p class="organ-title organ-introduce">机构简介</p>
            <p v-html="organData.organ.introduce"></p>
            <!-- <div class="wx-inner">
              <wxparse
                :content="organData.organ.introduce"
                noData
                :imageProp="{mode:'widthFix',lazyLoad:true}"
                className="wxInner"
              ></wxparse>
            </div>-->
          </div>
        </div>
        <!-- 尾部 -->
      </div>
      <div class="footer-og">
        <div class="footer-og-lf" @click="callPhone(organData.organ.tel)">
          <img src="http://img.meiduduo.com/images/mineItem/phon.png">电话预约
        </div>
        <div class="footer-og-rh">
          <img src="http://img.meiduduo.com/images/mineItem/infro.png">在线咨询
          <button class="go-server" open-type="contact"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import tab from "./comm/tabsOrgin.vue";
import live from "./comm/live.vue";
import wxparse from "mpvue-wxparse";
import doctorList from "./comm/doctorList";
export default {
  components: {
    // tab,
    live,
    doctorList,
    wxparse
  },
  data() {
    return {
      loaded: false,
      imgUrl: "",
      starIndex4: 5,
      nav1: [],
      isActive: 0,
      nav: [
        {
          id: 1,
          title: "服务",
          badgeNum: "3",
          icon: "shop-no"
        },
        {
          id: 2,
          title: "视讯",
          badgeNum: "0",
          icon: "live-no"
        },
        {
          id: 3,
          title: "医生",
          badgeNum: "0",
          icon: "doctor-no"
        },
        {
          id: 4,
          title: "简介",
          badgeNum: "",
          icon: "hospital-no"
        }
      ],
      cur: 0,
      organData: {
        commodityList: [],
        diaryBookList: [],
        servicePersonalList: [],
        organ: {
          introduce: 1
        },
        videoAndArticleVOList: []
      },
      doctorers: [],
      activeIcon: 1
      // b: { "background-image": url(this.organData.organData.logo) }
    };
  },
  mounted() {
    // this.getOrganDetail();
    this.getDoctorList();
  },
  onShow() {
    this.loaded = false;
    this.getOrganDetail();
    this.cur = 0;
    this.activeIcon = 1;
    if (this.$root.$mp.query.isActive) {
      this.isActive = new Number(this.$root.$mp.query.isActive);
    }
  },
  methods: {
    clickactive(v, i) {
      this.cur = i;
      this.activeIcon = v.id;
    },
    goIndex() {
      this.$router.push({
        path: "/pages/index",
        isTab: true
      });
    },
    getOrganDetail() {
      this.$http
        .post("organ/queryOneByPk", {
          id: this.$root.$mp.query.id,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            // if (res.data.length > 0) {

            this.organData = res.data;
            res.data.commodityList.forEach(v => {
              v.commImg = v.commImg.split(",")[0];
            });
            this.loaded = true;
            this.organData.commodityList = res.data.commodityList;
            this.organData.organ.introduce = this.imgSet(
              this.organData.organ.introduce
            );

            this.doctorIcons(this.organData.organ.channelCode).then(res => {
              if (res.code == 1) {
                this.nav.forEach(v => {
                  if (v.id == 3) {
                    v.title = res.data[0].detailName;
                  }
                });
                if (this.organData.organ.createType == 1) {
                  let a = [...this.nav];
                  a.splice(1, 1);
                  this.nav1 = a;
                } else {
                  this.nav1 = this.nav;
                }
              }
            });
          }
        });
    },
    //关注医院
    followHospital() {
      this.$http
        .post("focusRecord/save", {
          recordId: this.organData.organ.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "2",
          state: this.organData.isFollow ? "-1" : "1"
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: this.organData.isFollow ? "已取消" : "已成功",
              icon: "none"
            });
            this.organData.isFollow = !this.organData.isFollow;
          }
        });
    },

    //获取机构医生列表
    getDoctorList() {
      this.$http
        .post("servicePersonal/getServicePersonalList", {
          organId: this.$root.$mp.query.id,
          lat: this.$store.state.latitude,
          lng: this.$store.state.longitude
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            res.data.forEach(v => {
              v.photo = v.photo.split(",")[0];
              if (v.distance) v.distance = v.distance.toFixed(2);
            });
            this.doctorers = res.data;
            this.loaded = true;
          }
        });
    },
    //打电话
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item,
        success: res => {
          console.log(res);
        }
      });
    },
    dealRichImg(text) {
      // this.dealRichText(text)
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto" '
      );
    },
    dealRichText(text) {
      return text.replace(/\<p/gi, '<p style=" font-size:12px;color:#999;"');
    },
    imgSet(text) {
      return this.dealRichImg(this.dealRichText(text));
    },
    //医生图标调换

    doctorIcons(channelCode) {
      return this.$http.post("common/getDictListByCondition", {
        masterCode: "service_type",
        superId: channelCode
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@cover: 58px;
.active-focus-btn.active-focus-btn1 {
  color: #333 !important;
  background: #fff !important;
  padding: 4rpx 16rpx 4rpx 10rpx;
}
.c-bom {
  padding-bottom: 120rpx;
}
.line {
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem;
  color: #333;
}
.tabs .tab-item {
  text-align: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  /* border-bottom: 1px solid #ff4691; */
  // border-bottom: 1px solid transparent;
  padding: 0 10px 10px 10px;
}
.bord-d {
  border-bottom: 1px solid transparent;
  padding-bottom: 15px;
}
.active {
  border-bottom: 3px solid #ff4691 !important;
  color: #ff4691;
}
.tab-item .tab-icon {
  width: 0.55rem;
  height: 0.55rem;
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  margin-bottom: 5px;
}
.shop-no {
  background-image: url("http://img.meiduduo.com/images/xyy/shop-n.png");
}
.live-no {
  background-image: url("http://img.meiduduo.com/images/xyy/live-n.png");
}
.cnm.live-no {
  background-image: url("http://img.meiduduo.com/images/xyy/live-y.png");
}

.cnm.shop-no {
  background-image: url("http://img.meiduduo.com/images/xyy/shop-y.png");
}
.doctor-no {
  background-image: url("http://img.meiduduo.com/images/xyy/doctor-n.png");
}
.cnm.doctor-no {
  background-image: url("http://img.meiduduo.com/images/xyy/doctor-y.png");
}
.hospital-no {
  background-image: url("http://img.meiduduo.com/images/xyy/hospital-n.png");
}
.cnm.hospital-no {
  background-image: url("http://img.meiduduo.com/images/xyy/hospital-y.png");
}
.content {
  margin-top: 10px;
  /* padding-bottom: 1.2rem; */
  /* margin-bottom: 140rpx; */
}

.content-item {
  background: #fff;
  padding: 0.3rem 0.2rem 0.3rem;
}
.content-item2 {
  background: #fff;
  padding: 0.3rem 0 0.3rem;
}

.banner-page-h {
  padding: 0 0.2rem;
}

.banner-pingfen {
  display: flex;
  font-size: 0.26rem;
  padding: 0 0.2rem;
}

.banner-pingfen-s {
  font-size: 0.26rem;
  margin-left: 0.2rem;
  line-height: 2;
  position: relative;
  top: 4px;
}

.banner-page-h h3 {
  font-size: 0.32rem;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.banner-page {
  height: @cover;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  justify-content: space-around;
}

.banner-navs {
  height: @cover;
  background: #000;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.collect-kuang {
  margin-top: 1.5rem;
}

.mine {
  background-color: #f1f1f1;
  /* padding-bottom: 140rpx; */
}

.guanzhu {
  position: absolute;
  right: 0.2rem;
  bottom: 0.5rem;
  background: #fc4396;
  color: #fff;
}

.guanzhu .yi {
  background: #999;
  color: #fff;
  font-size: 0.26rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
}
.doc-mag {
  margin-bottom: 0.2rem;
}
.guanzhu .wei {
  background: #fc4396;
  color: #fff;
  font-size: 0.26rem;
  padding: 5rpx 0.3rem;
  border-radius: 0.3rem;
}

.banner {
  position: relative;
  width: 100%;
  height: 246px;
  /* background: url("http://img.meiduduo.com/images/mine/banner.png") no-repeat; */
  /* background-size: 100% 100%; */
  /* position: relative; */
}
.home-index {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  display: block;
  left: 15px;
  top: 15px;
}
.home-index img {
  width: 100%;
  height: 100%;
}
/**/
.item-footer ul li {
  font-size: 0.24rem;
  line-height: 2.3;
  color: #555555;
}

.item-footer {
  padding-bottom: 0.2rem;
}

.item-footer em {
  color: #fc4396;
  display: inline-block;
}

.fenqi {
  background: #fa97e6;
  padding: 2px 4px;
  color: #fff;
  border-radius: 0.1rem;
  margin-right: 0.1rem;
}

.baoxian {
  background: #7bdbcf;
  padding: 2px 4px;
  color: #fff;
  border-radius: 0.1rem;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  padding-bottom: 0.17rem;
}

.item .item-img {
  min-width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
}

.item .item-img img {
  height: 100%;
  width: 100%;
  border-radius: 0.1rem;
}

.item .info {
  padding-left: 0.29rem;
  width: 100%;
}

.item .info h5 {
  width: 4.35rem;
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item .info h5 span {
  font-size: 0.3rem;
  font-weight: bold;
}

.item .info .addr {
  font-size: 0.26rem;
  color: #999;
  line-height: 2;
}

.item .price {
  font-size: 0.28rem;
  color: #999;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.15rem;
}

.item .price em {
  font-size: 0.3rem;
  color: #ff4691;
  font-weight: 500;
}

.item .price em > i {
  font-size: 0.26rem;
  font-weight: normal;
}

.item .price em > b {
  font-size: 0.2rem;
  font-weight: normal;
}

.item .price del {
  font-weight: normal;
  color: #bbbbbb;
  font-size: 0.24rem;
}

.price-spans {
  display: flex;
  align-items: center;
  color: #ff5097;
  font-size: 28rpx;
  margin-right: 0.28rem;
}
.price-spans i {
  font-weight: bold;
  font-style: normal;
}
.price-spans span {
  color: #999;
  font-size: 24rpx;
  margin-right: 0.28rem;
  margin-left: 0.2rem;
}

.price-nub {
  font-size: 0.24rem;
  color: #999;
  margin-top: 10rpx;
}

.price-nub div:first-child {
  color: #fff;
  width: 70%;
  display: inline-block;
}

.price-nub div:last-child {
  width: 30%;
  display: inline-block;
  text-align: right;
}

.footer-og {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  font-size: 14px;
}

.footer-og .footer-og-lf {
  background: #fa97e6;
}

.footer-og-lf img,
.footer-og-rh img {
  width: 22px;
  height: 22px;
  margin-right: 0.2rem;
  position: relative;
  top: 5px;
}

.footer-og .footer-og-rh {
  background: #fc4396;
  position: relative;
}
.footer-og-rh button {
  padding: 0;
  font-size: 22rpx;
  color: #666666;
  width: 100%;
  height: 0.9rem;
  border: 0;
  background: transparent;
  border-radius: 0;
  outline: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
}
.footer-og .footer-og-lf,
.footer-og .footer-og-rh {
  color: #fff;
  width: 50%;
  display: inline-block;
  line-height: 49px;
  text-align: center;
}
.organ-summary {
  font-size: 14px;
  color: #999;
  line-height: 20px;
}
.organ-introduce {
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
.organ-addr {
  font-size: 30rpx;
  margin-top: 20rpx;
  background-color: #fff;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #333;
  & > .addr-inner {
    align-items: center;
  }
}
.wxInner {
  font-size: 12px;
  color: #999;
}
</style>
