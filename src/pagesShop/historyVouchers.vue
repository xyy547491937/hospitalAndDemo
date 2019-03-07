<style>
.vou-nav {
  display: flex;
  justify-content: space-around;
  position: fixed;
  z-index: 20;
  width: 100%;
  top: 0;
}
.vou-item {
  display: flex;
  flex: 1;
  justify-content: center;
  background: #fff;
  color: #333;
  font-size: 28rpx;
}
.vou-item .voulink {
  padding: 24rpx;
}
.vou-item.active .voulink {
  color: #ff4691;
  border-bottom: 2rpx solid #ff4691;
}
.voulist {
  margin-top:88rpx;
  padding:9rpx 30rpx;
}
.voulist-box {
  margin-bottom: 18rpx;
}
</style>

<template>
 <div style="height:100%;background:#f1f1f1;">
     <div class="vou-nav">
        <div class="vou-item" v-for="(item,index) in navArr" :key="index" @click="changeIndex(index)" :class="{active:activeIndex == index}">
          <span class="voulink">{{item.name}} </span>
        </div>

     </div>
     <div class="voulist">
       <div id="nolist"  v-if="(activeIndex==0&&usedList.length==0) || (activeIndex==1&&timeoutList.length==0)">
		      <div  class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
       </div>
      </div>
       <div class="list-used" v-show="activeIndex==0">
          <div class="voulist-box" v-for="(ret,index) in usedList" :key="index" @click.stop="toDetail(ret)">
           <Voucher :voucher="ret"></Voucher>
         </div>
       </div>
       <div class="list-timeout" v-show="activeIndex==1">
         <div class="voulist-box" v-for="(v,index) in timeoutList" :key="index" @click.stop="toDetail(v)">
           <Voucher :voucher="v"></Voucher>
         </div>
       </div>

     </div>
</template>

<script>
import Voucher from "./comm/voucher";

export default {
  data() {
    return {
      loaded: false,
      navArr: [{ index: 0, name: "已使用" }, { index: 1, name: "已失效" }],
      activeIndex: 0,
      usedNum: 1,
      timeoutNum: 1,
      usedList: [
        //  {
        //     voucherId:1,
        //     storeName:'青青草原美甲店',
        //     money:30,
        //     vStatus:2
        //  }
      ],
      timeoutList: [
        //  {
        //     voucherId:1,
        //     storeName:'青青草原美甲店2',
        //     money:40,
        //     vStatus:3
        //  }
      ],
      voucher: {
        voucherId: 1,
        storeName: "青青草原美甲店",
        money: 30,
        vStatus: 3
      }
    };
  },
  components: {
    Voucher
  },
  methods: {
    changeIndex(index) {
      this.loaded = false
      this.activeIndex = index;
      let state = index == 0 ? 1 : -2;
      let pageNum = index == 0 ? this.usedNum : this.timeoutNum;
      console.log(state, pageNum);
      this.getVouList(state, pageNum);
    },
    getVouList(state, pageNum) {
      let options = {
        custId: this.$store.state.userInfo.custId,
        pageNum,
        pageSize: 10
      };
      if (!this.activeIndex) {
        options = Object.assign({}, options, {
          state
        });
      } else {
        options = Object.assign({}, options, {
          couponState: -2
        });
      }

      this.$http.post("/customerCoupon/list4Page", options).then(res => {
        console.log("优惠券列表：", res);
        if (res.code == "1") {
          let arr = res.data.data;
          this.loaded = true
          if (this.activeIndex == 0) {
            // this.usedList = [];
            arr.forEach((item, index) => {
              item.state = 1;
              item.reductionPrice = parseInt(item.reductionPrice)
              // this.usedList.splice(index, 1, item);
            });
            this.usedList = arr;
          } else {
            // this.timeoutList = [];
            arr.forEach(element => {
              //  element.state = element.couponState
              element.state = -2;
              element.reductionPrice = parseInt(element.reductionPrice)
            });
            this.timeoutList = arr;
          }
        }
      });
    },
    toDetail(item) {
      this.changeJump("/pagesShop/voucherDetail", {
        couponItem: JSON.stringify(item)
      });
    }
  },
  onLoad() {
    this.loaded = false
    this.changeIndex(0);
  }
};
</script>
