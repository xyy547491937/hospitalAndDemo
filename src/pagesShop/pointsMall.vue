<template>
  <div class="points-mall">
    <div class="points-user">
      <img :src="userInfo.icon" alt>
      <span @click.stop="changeJump('/pagesShop/pointsDetails', {})" class="points-user-info">
        <span class="points-user-fen">{{ userInfo.point }}</span>
        <span>豆芽</span>
      </span>
      <span class="points-user-btn" @click.stop="changeJump('/pagesMine/integrateSearch',{})">攒豆芽</span>
    </div>
    <div class="points-banner">
      <swiper
        indicator-dots
        autoplay
        circular
        class="points-swiper"
        indicator-color="rgba(255, 255, 255, .3)"
        indicator-active-color="#fff"
      >
        <swiper-item v-for="(item, index) of adList" :key="index">
          <div class="swiper-item-box">
            <!-- 广告 -->
            <!-- <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==0"  @click="changeJump('/pagesMine/pageH5',{url:item.skipParam.url})" alt="">
            <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==1"  @click="changeJump('/pagesShop/orgin',{id:item.skipParam.id})" alt="">
            <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==2"  @click="changeJump('/pagesShop/doctor_detail',{id:item.skipParam.id})" alt="">
            <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==3"  @click="changeJump('/pagesShop/productDetails',{id:item.skipParam.id})" alt="">
            <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==4"  @click="changeJump('/pagesShow/information',{id:item.skipParam.id,type:10})" alt="">
            <img mode="aspectFill" class="slide-image" :src="item.pictureUrl" v-if="item.skipParam.type==5"  @click="changeJump('/pagesShow/information',{id:item.skipParam.id,type:4})" alt="">-->
            <img
              mode="aspectFill"
              class="slide-image"
              :src="item.pictureUrl"
              alt
              @click="jump(item)"
            >
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="points-title">
      <span class="points-title-label">豆芽限时兑</span>
      <img src="http://img.meiduduo.com/images/jifen/jf_title.png" alt>
      <!-- <span class="points-title-btn">更多 ></span> -->
    </div>
    <div class="points-time-limit">
      <div class="points-tabs">
        <div
          class="points-tabs-item"
          :class="current == 1 ? 'active' : ''"
          @click.stop="changeTabs(1)"
        >
          <span
            class="points-tabs-item-title"
          >{{ limitedTimeData.oneCalculationTime ? limitedTimeData.oneCalculationTime : limitedTimeData.oneStart }}</span>
          <span class="points-tabs-item-info">{{ arr[limitedTimeData.isOneOld] }}</span>
        </div>
        <div
          class="points-tabs-item"
          :class="current == 2 ? 'active' : ''"
          @click.stop="changeTabs(2)"
        >
          <span
            class="points-tabs-item-title"
          >{{ limitedTimeData.twoCalculationTime ? limitedTimeData.twoCalculationTime : limitedTimeData.twoStart }}</span>
          <span class="points-tabs-item-info">{{ arr[limitedTimeData.isTwoOld] }}</span>
        </div>
        <div
          class="points-tabs-item"
          :class="current == 3 ? 'active' : ''"
          @click.stop="changeTabs(3)"
        >
          <span
            class="points-tabs-item-title"
          >{{ limitedTimeData.threeCalculationTime ? limitedTimeData.threeCalculationTime : limitedTimeData.threeStart }}</span>
          <span class="points-tabs-item-info">{{ arr[limitedTimeData.isThreeOld] }}</span>
        </div>
      </div>
      <div class="points-time-limit-products">
        <div
          class="points-time-limit-box"
          :style="{ width: (306 * limitedTimeList.length + 10) + 'rpx' }"
        >
          <div
            v-if="index < 30"
            class="points-time-limit-item"
            v-for="(i, index) in limitedTimeList"
            @click.stop="changeJump('/pagesShop/depositDetail',{id:i.id, isNoShow: i.isNoShow, isLimitTime: 1, activityId: i.pointActivityId,point:userInfo.point})"
            :key="index"
          >
            <img :src="i.commImg[0]" alt>
            <div class="points-time-limit-item-infos">
              <span
                class="points-time-title z-oneline-overflow-hidden"
              >[{{ i.commName }}]{{ i.commDesc }}</span>
              <span class="points-time-footer">
                <span class="points-time-price">{{ i.sproutPrice }}豆芽</span>
                <span class="points-time-number">{{ i.exchangeNum }}人参与</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="points-title">
      <span class="points-title-label">大家都在兑</span>
      <img src="http://img.meiduduo.com/images/jifen/jf_title.png" alt>
      <span @click="changeJump('/pagesShop/exchangeList')" class="points-title-btn">更多 ></span>
    </div>
    <div class="points-all-boxs">
      <div class="points-all-left">
        <div
          class="all-item"
          v-for="(item, index) of everyoneIsRedeemingLeftList"
          @click="changeJump('/pagesShop/depositDetail',{id:item.id, isLimitTime: 0, activityId: item.pointActivityId,point:userInfo.point})"
          :key="index"
        >
          <img :src="item.commImg[0]" alt>
          <div class="all-item-infos">
            <div
              class="all-item-infos-label z-lines-2-overflow-hidden"
            >[{{ item.commName }}]{{ item.commDesc }}</div>
            <div class="all-item-info">
              <span class="all-item-info-number">{{ item.sproutPrice }}豆芽</span>
              <span class="all-item-info-price">￥{{ item.price }}</span>
              <span>已售{{ item.exchangeNum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="points-all-right">
        <div
          class="all-item"
          v-for="(item, index) of everyoneIsRedeemingRightList"
          @click="changeJump('/pagesShop/depositDetail',{id:item.id, isLimitTime: 0, activityId: item.pointActivityId,point:userInfo.point})"
          :key="index"
        >
          <img :src="item.commImg[0]" alt>
          <div class="all-item-infos">
            <div
              class="all-item-infos-label z-lines-2-overflow-hidden"
            >[{{ item.commName }}]{{ item.commDesc }}</div>
            <div class="all-item-info">
              <span class="all-item-info-number">{{ item.sproutPrice }}豆芽</span>
              <span class="all-item-info-price">￥{{ item.price }}</span>
              <span>已售{{ item.exchangeNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dealTime } from "../utils/util.js";
export default {
  data() {
    return {
      imgUrl: [
        "http://img.meiduduo.com/images/jifen/jf_banner.png?" +
          Math.random() / 9999,
        "http://img.meiduduo.com/images/index/ad_02.png?" +
          Math.random() / 9999,
        "http://img.meiduduo.com/images/index/ad_03.png?" + Math.random() / 9999
      ],
      adList: [],
      n: 6,
      current: null,
      userInfo: {},
      limitedTimeList: [], // 限时兑列表
      everyoneIsRedeemingList: [], // 大家都在兑列表
      everyoneIsRedeemingLeftList: [],
      everyoneIsRedeemingRightList: [],
      limitedTimeData: {}, // 限时兑时间数据
      arr: ["", "即将开抢", "距结束", "已结束"],
      timer: null, // 计时器
      i: 0, // 计数器
      activeCurrent: null
    };
  },
  onShow() {
    console.log("onShow");
    this.queryUserInfo();
    this.queryTime();
    this.queryUsList();
    // this.getADList2();
    this.getAdvert();
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  mounted() {
    console.log("mounted");
  },
  onHide() {
    console.log("onHide");
    clearInterval(this.timer);
    this.timer = null;
    this.i = 0;
  },
  onUnload() {
    console.log("onUnload");
    clearInterval(this.timer);
    this.timer = null;
    this.i = 0;
  },
  methods: {
    jump(item) {
      // 跳转类型，0:h5,1:机构首页，2:服务人员，3:商品页面，4:文章，5:资讯，6:达人，7:无跳转; ,
      this.$http
        .post(
          this.$store.state.httpUrl + "/sys/advertCost/updateAdvertClickNumber",
          {
            advertId: item.advertId
          }
        )
        .then(res => {
          if (res.code == 1) {
            this.changeJump(item.skipParam.url, {
              id: item.skipParam.id,
              type: item.skipParam.wordtype
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
            placeCode: "2BT40",
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
    changeTabs(val) {
      // 活动时间段切换处理
      this.current = val;
      let beginTime = "";
      let endTime = "";
      switch (val) {
        case 1:
          beginTime = this.limitedTimeData.firstBeginTime;
          endTime = this.limitedTimeData.firstEndTime;
          break;
        case 2:
          beginTime = this.limitedTimeData.secondBeginTime;
          endTime = this.limitedTimeData.secondEndTime;
          break;
        case 3:
          beginTime = this.limitedTimeData.thirdBeginTime;
          endTime = this.limitedTimeData.thirdEndTime;
          break;
        default:
          beginTime = this.limitedTimeData.firstBeginTime;
          endTime = this.limitedTimeData.firstEndTime;
          break;
      }
      this.queryTimeList(
        beginTime,
        endTime,
        this.activeCurrent == val ? "" : true
      );
    },
    queryList(params, isNoShow) {
      // 请求兑换商品 isNoShow 表示是否不在活动时间，true 表示不在活动时间内。
      this.$http.post("pointCommodity/queryEveryConvert", params).then(res => {
        if (res.code === 1) {
          res.data.map(el => {
            if (el.commDesc) {
              el.commDesc = el.commDesc.replace(/<[^>]+>/g, ""); // 去掉字符串中的html标签
            }
            if (isNoShow) {
              el.isNoShow = true;
            } else {
              el.isNoShow = false;
            }
            if (el.commImg) {
              el.commImg = el.commImg.split(",");
            } else {
              el.commImg = [];
            }
            return el;
          });
          if (params.isLimitTime == 1) {
            this.limitedTimeList = res.data;
          } else if (params.isLimitTime == 0) {
            this.everyoneIsRedeemingList = res.data;
            this.everyoneIsRedeemingLeftList = [];
            this.everyoneIsRedeemingRightList = [];
            for (let i = 0, j = res.data.length; i < j; i++) {
              if (i < 6) {
                if (i % 2) {
                  this.everyoneIsRedeemingRightList.push(res.data[i]);
                } else {
                  this.everyoneIsRedeemingLeftList.push(res.data[i]);
                }
              }
            }
          }
        }
      });
    },
    queryUsList() {
      // 请求大家都在兑
      let params = {
        isLimitTime: 0
      };
      this.queryList(params, false);
    },
    queryTimeList(beginTime, endTime, isNoShow) {
      // 请求限时兑
      let params = {
        isLimitTime: 1,
        beginTime: beginTime,
        endTime: endTime
      };
      this.queryList(params, isNoShow);
    },
    queryTime() {
      // 请求限时兑时间段
      const _this = this;
      this.$http.post("pointCommodity/queryTimePoint", {}).then(res => {
        if (res.code === 1) {
          if (!res.data) {
            return;
          }
          this.limitedTimeData = res.data;
          this.dealTimeData();
          this.timer = setInterval(function() {
            _this.dealTimeData();
          }, 1000);
        }
      });
    },
    dealActiveTime(time) {
      // 根据活动时间设置当前时间
      let a = new Date();
      a.setHours(Number(time.slice(0, 2)));
      a.setMinutes(Number(time.slice(3, 5)));
      a.setSeconds(Number(time.slice(6, 9)));
      return a.getTime();
    },
    dealCalculationTime(number) {
      // 处理倒计时数据
      let time = Number(number);
      let a = Math.floor(time / (60 * 60 * 1000)); // 小时
      let b = Math.floor((time - a * 1000 * 60 * 60) / (60 * 1000)); // 分钟
      let c = Math.floor((time - a * 1000 * 60 * 60 - b * 1000 * 60) / 1000); // 秒
      return `${a > 9 ? a : "0" + a}:${b > 9 ? b : "0" + b}:${
        c > 9 ? c : "0" + c
      }`;
    },
    dealTimeData() {
      // 处理返回的限时兑时间
      // nowStart 开始时间
      // is...Old 活动进行情况 1 未开始 2 进行中 3 已结束
      this.i++;

      let nowData = new Date().getTime();
      let oneStartTime = this.dealActiveTime(
        this.limitedTimeData.firstBeginTime
      );
      let oneEndTime = this.dealActiveTime(this.limitedTimeData.firstEndTime);
      let twoStartTime = this.dealActiveTime(
        this.limitedTimeData.secondBeginTime
      );
      let twoEndTime = this.dealActiveTime(this.limitedTimeData.secondEndTime);
      let threeStartTime = this.dealActiveTime(
        this.limitedTimeData.thirdBeginTime
      );
      let threeEndTime = this.dealActiveTime(this.limitedTimeData.thirdEndTime);

      this.limitedTimeData.oneStart = this.limitedTimeData.firstBeginTime.slice(
        0,
        5
      );
      this.limitedTimeData.twoStart = this.limitedTimeData.secondBeginTime.slice(
        0,
        5
      );
      this.limitedTimeData.threeStart = this.limitedTimeData.thirdBeginTime.slice(
        0,
        5
      );

      // 处理时间段中的数据展示和边界处理
      if (oneStartTime <= nowData && nowData <= oneEndTime) {
        this.limitedTimeData.isOneOld = 2;
        let a = this.dealCalculationTime(oneEndTime - nowData);
        this.limitedTimeData.oneCalculationTime = a == "00:00:00" ? "" : a;
        if (this.i == 1) {
          this.current = 1;
          this.activeCurrent = 1;
          this.queryTimeList(
            this.limitedTimeData.firstBeginTime,
            this.limitedTimeData.firstEndTime
          );
        }
      } else if (nowData < oneStartTime) {
        this.limitedTimeData.isOneOld = 1;
        if (this.i == 1) {
          this.current = 1;
          this.queryTimeList(
            this.limitedTimeData.firstBeginTime,
            this.limitedTimeData.firstEndTime,
            true
          );
        }
      } else if (nowData > oneEndTime) {
        this.limitedTimeData.isOneOld = 3;
      }

      if (twoStartTime <= nowData && nowData <= twoEndTime) {
        this.limitedTimeData.isTwoOld = 2;
        let b = this.dealCalculationTime(twoEndTime - nowData);
        this.limitedTimeData.twoCalculationTime = b == "00:00:00" ? "" : b;
        if (this.i == 1) {
          this.current = 2;
          this.activeCurrent = 2;
          this.queryTimeList(
            this.limitedTimeData.secondBeginTime,
            this.limitedTimeData.secondEndTime
          );
        }
      } else if (nowData < twoStartTime) {
        this.limitedTimeData.isTwoOld = 1;
      } else if (nowData > twoEndTime) {
        this.limitedTimeData.isTwoOld = 3;
      }

      if (threeStartTime <= nowData && nowData <= threeEndTime) {
        this.limitedTimeData.isThreeOld = 2;
        let c = this.dealCalculationTime(threeEndTime - nowData);
        this.limitedTimeData.threeCalculationTime = c == "00:00:00" ? "" : c;
        if (this.i == 1) {
          this.current = 3;
          this.activeCurrent = 3;
          this.queryTimeList(
            this.limitedTimeData.thirdBeginTime,
            this.limitedTimeData.thirdEndTime
          );
        }
      } else if (nowData < threeStartTime) {
        this.limitedTimeData.isThreeOld = 1;
      } else if (nowData > threeEndTime) {
        this.limitedTimeData.isThreeOld = 3;
        if (this.i == 1) {
          this.current = 3;
          this.queryTimeList(
            this.limitedTimeData.thirdBeginTime,
            this.limitedTimeData.thirdEndTime,
            true
          );
        }
      }

      // 处理两个时间段之间的数据展示
      if (oneEndTime < nowData && nowData < twoStartTime) {
        if (this.i == 1) {
          this.current = 1;
          this.queryTimeList(
            this.limitedTimeData.firstBeginTime,
            this.limitedTimeData.firstEndTime,
            true
          );
        }
      } else if (twoEndTime < nowData && nowData < threeStartTime) {
        if (this.i == 1) {
          this.current = 2;
          this.queryTimeList(
            this.limitedTimeData.secondBeginTime,
            this.limitedTimeData.secondEndTime,
            true
          );
        }
      }
    },
    queryUserInfo() {
      // 获取用户信息
      this.$http
        .post("customer/queryOneByCondition", {
          id: this.$store.state.userInfo.custId
        })
        .then(res => {
          if (res.code === 1) {
            this.userInfo = res.data;
          }
        });
    }
  }
};
</script>

<style scoped>
.points-mall {
  min-height: 100%;
  background: #f5f5f5;
  background-image: url("http://img.meiduduo.com/images/jifen/jf_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.points-user {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #333;
  padding: 16rpx 30rpx 20rpx 30rpx;
}
.points-user > img {
  width: 80rpx;
  height: 80rpx;
  border: 2rpx solid #fff;
  box-sizing: border-box;
  margin-right: 23rpx;
  border-radius: 100%;
}
.points-user-fen {
  font-size: 50rpx;
  font-weight: 500;
}
.points-user-btn {
  font-size: 22rpx;
  width: 100rpx;
  height: 40rpx;
  box-sizing: border-box;
  line-height: 40rpx;
  border: 2rpx solid #333333;
  margin-left: 23rpx;
  border-radius: 40rpx;
  text-align: center;
  position: relative;
}
.points-user-btn::after {
  content: "";
  position: absolute;
  left: -10px;
  top: -10px;
  right: -10px;
  bottom: -10px;
}
.points-user-info {
  flex: 1;
}
.points-banner {
  width: 100%;
  box-sizing: border-box;
}
.swiper-item-box {
  text-align: center;
}
.swiper-item-box > img {
  width: 690rpx;
  height: 390rpx;
  border-radius: 10rpx;
}
.points-swiper {
  width: 100%;
  height: 390rpx;
}
.points-title {
  width: 100%;
  padding: 0 30rpx;
  margin: 39rpx 0 33rpx 0;
  box-sizing: border-box;
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.points-title-label {
  margin-bottom: 10rpx;
}
.points-title > img {
  width: 32rpx;
  height: 7rpx;
}
.points-title-btn {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  color: #ff4691;
  font-size: 24rpx;
}
.all-item {
  width: 334rpx;
  box-sizing: border-box;
  margin-bottom: 22rpx;
}
.all-item > img {
  width: 334rpx;
  height: 334rpx;
  display: block;
  border-radius: 8rpx 8rpx 0 0;
}
.all-item-infos {
  background: #fff;
  font-size: 26rpx;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 16rpx 33rpx 16rpx;
  border-radius: 0 0 8rpx 8rpx;
}
.all-item-infos-label {
  line-height: 38rpx;
  margin-bottom: 41rpx;
  width: 100%;
}
.all-item-info {
  display: flex;
  align-items: flex-end;
  font-size: 22rpx;
  color: #999999;
}
.all-item-info-number {
  font-size: 30rpx;
  color: #ff4691;
  font-weight: 500;
}
.all-item-info-price {
  flex: 1;
  text-decoration: line-through;
  margin-left: 17rpx;
}
.points-all-boxs {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.points-all-left,
.points-all-right {
  display: flex;
  flex-direction: column;
}
.points-time-limit-item > img {
  display: block;
  width: 286rpx;
  height: 286rpx;
  border-radius: 10rpx 10rpx 0 0;
}
.points-time-limit-item {
  width: 286rpx;
  height: 420rpx;
  box-sizing: border-box;
  margin-right: 20rpx;
}
.points-time-limit-item:last-child {
  margin-right: 30rpx;
}
.points-time-limit-item-infos {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 27rpx 20rpx 28rpx 16rpx;
  border-radius: 0 0 10rpx 10rpx;
}
.points-time-title {
  font-size: 26rpx;
  color: #333;
  width: 250rpx;
  display: block;
}
.points-time-price {
  font-size: 26rpx;
  color: #ff4691;
  margin-right: 13rpx;
}
.points-time-number {
  font-size: 22rpx;
  color: #999999;
}
.points-time-footer {
  display: flex;
  align-items: flex-end;
}
.points-time-limit-box {
  display: flex;
}
.points-time-limit-products {
  width: 100%;
  height: 420rpx;
  box-sizing: border-box;
  padding-left: 30rpx;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.points-tabs {
  height: 108rpx;
  margin: 0 30rpx;
  background: #fff;
  background-clip: content-box;
  margin-bottom: 28rpx;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 10rpx;
}
.points-tabs-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10rpx;
  position: relative;
}
.active::after {
  content: "";
  display: block;
  border: 18rpx solid transparent;
  border-top: 18rpx solid #ff66a4;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -34rpx;
}
.points-tabs-item-title {
  font-size: 36rpx;
  color: #333333;
  font-weight: 600;
}
.points-tabs-item-info {
  font-size: 24rpx;
  color: #999;
}
.points-tabs-item-icon {
  position: absolute;
  bottom: -30rpx;
  transform: rotate(90deg);
}
.active {
  background: #ff66a4;
}
.active > span.points-tabs-item-title,
.active > span.points-tabs-item-info {
  color: #fff;
}
</style>
