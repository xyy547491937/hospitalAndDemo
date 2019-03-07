<template>
  <div class="alliance-organ" style="margin-bottom: 0;" :style="data.commList.length > 0 ? 'padding-bottom: 0;' : 'padding-bottom: 30rpx;'">
    <div class="alliance-organ-info" @click="goOrgan(data.id)">
      <img class="shop-organ-card-img" :src="data.logo" alt="">
      <div>
        <p class="organ-info-title z-oneline-overflow-hidden">{{ data.organName }}</p>
        <div class="organ-info-score">
          <i-rate :count="5" :value="score" :disabled="true"></i-rate>
          <span style="margin-bottom: 2rpx;"> {{ data.starScore }} 分</span>
        </div>
        <div class="organ-info-type organ-info-types">
          <p class="z-oneline-overflow-hidden">
            <span style="color:#ff4691;">{{ data.channelName }}</span>
          </p>
          <p>{{ data.areaName }} <span v-if="distanceNumber">{{ distanceNumber }}</span></p>
        </div>
      </div>
    </div>
    <div class="alliance-organ-ticket shop-organ-tickets">
      <div class="ticket-list shop-organ-ticket">
        <div @click.stop="goDetail(value.id)" v-for="(value, i) of data.commList" :key="i" v-if="i < showLength" class="ticket-item shop-organ-ticket-item">
          <p class="z-oneline-overflow-hidden ticket-item-info no-padding-left">
            <span class="shop-organ-price">￥{{ value.rulePrice }}</span>
            <span>{{ value.commName }}</span>
          </p>
          <p style="margin-left: 10rpx;">已售{{ value.buyNum }}</p>
        </div>
      </div>
    </div>
    <div v-if="data.commList.length > 2" @click.stop="showAll" class="alliance-footer-btn">
      <span>
        <span v-if="!isShowAll">查看其它{{ (data.commList.length - 2) >= 5 ? 5 : data.commList.length - 2}}个优惠 </span>
        <span v-else>收起 </span>
        <i-icon v-if="!isShowAll" type="unfold" size="12" />
        <i-icon v-else type="packup" size="12" />
      </span>
    </div>
  </div>
</template>

<script>
import { dealNumber1, dealDistanceNumber } from "../../utils/util.js";
export default {
  props: ["data"],
  data() {
    return {
      n: 6,
      showLength: 2,
      isShowAll: false
    };
  },
  computed: {
    score() {
      return Number(this.data.starScore);
    },
    distanceNumber() {
      return dealDistanceNumber(this.data.distance);
    }
  },
  mounted() {
    this.init();
  },
  onShow() {
    this.init();
  },
  methods: {
    showAll() {
      this.isShowAll = !this.isShowAll;
      if (this.isShowAll) {
        this.showLength =
          this.data.commList.length >= 7 ? 7 : this.data.commList.length;
      } else {
        this.showLength = 2;
      }
    },
    init() {
      this.isShowAll = false;
      this.showLength = 2;
    },
    goOrgan(id) {
      this.$router.push({
        path: "/pagesShop/orgin",
        query: {
          id: id
        }
      });
    },
    goDetail(id) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.alliance-organ-info {
  border-bottom: 0;
  padding-bottom: 0;
}
.alliance-organ-info > div {
  flex: 1;
  -webkit-flex: 1;
}
.organ-info-types,
.organ-info-types > p > span {
  font-size: 24rpx;
  color: #333;
}
.organ-info-score {
  font-size: 24rpx;
  color: #feb259;
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  -webkit-align-items: flex-end;
}
.alliance-organ-ticket {
  display: flex;
  display: -webkit-flex;
}
.ticket-label {
  font-size: 24rpx;
  color: #333;
  font-weight: bold;
}
.ticket-list {
  margin-left: 128rpx;
  /* width: 512rpx; */
  width: 100%;
}
.ticket-item {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justufy-content: space-between;
  border-bottom: 1rpx solid #f1f1f1;
}
.ticket-item > img {
  width: 96rpx;
  height: 30rpx;
  margin-right: 17rpx;
}
.ticket-item > p {
  font-size: 26rpx;
  color: #999999;
}
.ticket-item-info {
  width: 400rpx;
  padding-left: 35rpx;
}
.alliance-footer-btn {
  font-size: 24rpx;
  color: #aaaaaa;
  text-align: center;
  height: 69rpx;
  line-height: 69rpx;
  border-top: 1rpx solid #f1f1f1;
}
div.ticket-item:last-child {
  border-bottom: 0;
}
.shop-organ-card-img {
  width: 174rpx;
  height: 114rpx;
  border-radius: 6rpx;
  margin-right: 20rpx;
}
.shop-organ-ticket {
  margin-left: 0;
}
.shop-organ-price {
  width: 174rpx;
  margin-right: 20rpx;
  color: #FF4691;
  text-align: right;
  display: inline-block;
}
.no-padding-left {
  padding-left: 0;
  width: 500rpx;
}
.shop-organ-ticket-item {
  border-top: 1rpx solid #f1f1f1;
  border-bottom: 0;
}
.shop-organ-tickets {
  margin-top: 20rpx;
}
</style>
