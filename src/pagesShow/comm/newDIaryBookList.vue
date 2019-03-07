<template>
  <div class="v">
    <div class="flex-c diary-book" :class="{'isBorder':isShowIcon}" v-for="(v,i) in orderList" :key="i">
      <div class="sel-btn" v-if="isShowSel" @click="getOrderId(v,i)">
        <span class=" no-ac" :class="{'active':cur==i}" ></span>
      </div>
      <div class="diary-list flex-r">
          <div class="diary-img">
               <img :src="v.commImg" :alt="v.commodityName">
          </div>

        <div class="diary-title">
          <p class=""> [{{v.commodityName}}］<span class="c"> {{v.commRemark}}</span></p>
              <!--  副标题 -->
              <p class="flex-r diary-organ"> <span>{{v.organName}}</span>  <span class="c" v-if="isShowIcon"><i-icon type="enter" /></span> </p>
              <!--  价格 -->
              <p class="flex-r"> <span class="price"> ￥ {{v.rulePrice}}</span> <a class="hos-price"> 指导价 ￥ {{v.price}}</a></p>
              <!-- <p class="flex-r"> <span class="price"> ￥ {{v.rulePrice}}</span> <a class="hos-price"> 医院价 ￥ {{v.price}}</a></p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isShowIcon", "isShowSel", "orderList"],
  data() {
    return {
      cur: 0
    };
  },
  mounted() {
    // this.$emit("orderId", this.orderList[this.cur].id);
  },
  methods: {
    getOrderId(item, i) {
      this.cur = i;
      this.$emit("orderId", item);
    }
  }
};
</script>
<style scoped lang="less">
// @import url("../../css/style.less");
.v {
  padding: @basePadding;
  background-color: #fff;
}
.isBorder {
  border-bottom-color: transparent !important;
}
.no-ac {
  display: block;
  width: 0.36rem;
  height: 0.36rem;
  background-color: @base-white;
  border-radius: 50%;
  border: 1px solid @baseTextColor-c;
}
.active {
  background-color: @baseColor;
  border-color: transparent;
}
.diary-book {
  padding: 10px 0;
  background-color: @base-white;
  color: @baseTextColor-c;
  font-size: 14px;
  line-height: 45rpx;
  border-bottom: 1px solid @baseBackground-c;
  & .sel-btn {
    padding: 0 0 @basePadding 0;
  }
  & .diary-list {
    justify-items: baseline;
    & > .diary-img {
      width: 30%;
      height: 2rem;
      & > img {
        width: 1.8rem;
        height: 1.84rem;
        display: block;
        margin: 0 auto;
      }
    }

    & > .diary-title {
      width: 70%;
      // align-items: center;
      justify-content: space-between;
      padding-left: 15px;
      & > p:first-child {
        color: @baseFirstTitleColor;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      & > .diary-organ {
        font-size: 12px;
        justify-content: space-between;
        margin: 8px 0;
      }
      & > p:last-child {
        font-size: 10px;
        & > .price {
          color: @baseColor;
          font-weight: bold;
          font-size: 14px;
        }
        & > .hos-price {
          text-decoration: line-through;
          color: @baseTextColor-c;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
