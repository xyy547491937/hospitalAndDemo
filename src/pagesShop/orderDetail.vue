<template>
  <div class="vo">
    <!-- 订单详情 -->
    <div class="item-order order-detail pay-methods">
      <p class="v">
        <span class="ce state-ce">{{orderState}}</span>
        <span class="c"></span>
      </p>
      <p class="v">
        <span class="ce">订单号：</span>
        <span class="c">{{orderList.orderNo}}</span>
      </p>
      <!-- <p class="v"> <span class="ce">订单状态：</span> <span class="c">{{orderState}}</span></p> -->
      <p class="v">
        <span class="ce">预定手机号：</span>
        <span class="c">{{phone}}</span>
      </p>
      <p class="v">
        <span class="ce">下单时间：</span>
        <span class="c">{{orderList.createDate}}</span>
      </p>
    </div>

    <!--  订单 -->
    <div class="c">
      <!-- 订单展示 -->
      <div class="fen-order order-detail">
        <div class="organ-hospital flex-r">
          <p class="organ-icon"></p>
          <p>{{orderList.organName}}</p>
        </div>
        <div
          class="flex-r order-list"
          @click="changeJump('/pagesShop/productDetails',{id:orderList.commodityId})"
        >
          <div class="img-box">
            <img :src="orderList.commImg" alt>
          </div>

          <div class="order-title">
            <p class="xyy-ellipsis-2">[{{orderList.commodityName}}］{{orderList.commRemark }}</p>
            <!-- <p class="xyy-ellipsis-1">{{orderList.organName}}</p> -->
            <p class="flex-r paysore">
              <!-- prepayType  -->
              <span style="color:#FC4396">{{orderList.prepayType?"全款付":"预付定金" }}</span>
              <span
                style="color:#FC4396"
                class="price"
                v-if="orderList.prepayType==0"
              >¥{{orderList.depositPrice}}</span>
              <a href class="rulePrice" v-if="orderList.prepayType==0">到院再付款：¥{{goHospitalPay}}</a>
              <!-- 全款付 -->
              <span
                style="color:#FC4396"
                class="price"
                v-if="orderList.prepayType==1"
              >¥{{orderList.rulePrice}}</span>
            </p>
            <div class="isStage flex-r">
              <p>
                <!-- <span class="bardge" v-if="orderList.isStage ">分期</span> -->
                <span class="bardge" v-if="orderList.isStage  ">分</span>
                <span class="bardge bardge-green" v-if="orderList.isInsurance ">保</span>
                <span class="bardge" v-if="orderList.isRepresent ">代</span>
              </p>

              <span class="c">x{{orderList.quantity}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单明细 -->
      <!-- class 订单详情 -->
      <div class="pay-list order-detail">
        <p class="flex-r pay-message-item">
          <span class="c">订单总额</span>
          <span>￥{{totalPay}}</span>
        </p>
        <p class="flex-r pay-message-item">
          <span class="c">店铺优惠券</span>
          <span>￥{{orderList.discountAmount }}</span>
        </p>
        <p class="flex-r pay-message-item">
          <span class="c">应付款额</span>
          <span style="color:#fc4396">￥{{orderList.payAble }}</span>
        </p>

        <!-- <p class="flex-r pay-message-item">
          <span class="c">实际支付</span>
          <span style="color:#fc4396">￥{{orderList.payPrice }}</span>
        </p>
        <p class="flex-r pay-message-item">
          <span class="c">待支付</span>
          <span style="color:#fc4396">￥{{orderList.payAble-orderList.payPrice }}</span>
        </p>-->
      </div>
      <span class="line"></span>
      <div class="total-money pay-methods flex-c">
        <p class="list-money flex-r">
          <span>共{{orderList.quantity }}件商品，实际支付：</span>
          <span>¥{{actualPay}}</span>
        </p>
        <p class="list-money flex-r" v-if="!orderList.prepayType">
          <span>待支付：</span>
          <span>¥{{waitPay}}</span>
        </p>
      </div>
    </div>
    <div class="address-box">
      <!-- 核销码 -->
      <div
        class="order-address pay-methods flex-r"
        @click="changeJump('/pagesShop/useRecording',{id:orderList.id})"
      >
        <p>
          核销码：
          <span>{{orderList.vertifyCode }}</span>
        </p>
        <p>
          <i-icon type="enter" color="#999"/>
        </p>
      </div>
      <!-- 医院地址 -->
      <div class="order-address pay-methods flex-r">
        <div class="flex-r hos-addr">
          <p class="hos-title flex-r">
            <span class="c">医院地址:</span>
          </p>
          <p style="display:inline-block">{{orderList.address }}</p>
        </div>
        <p>
          <i-icon type="enter" color="#999"/>
        </p>
      </div>
    </div>
    <div class="footer" v-if="orderList.osId==2">
      <div class="c flex-r footer-inner">
        <!-- <span class="bar-set">去评价</span>
        <span class="bar-set">写日记</span>-->
        <span
          class="bar-set"
          @click="changeJump('/pagesShop/lookCode',{id:orderList.id,code:orderList.vertifyCode})"
        >查看券码</span>
      </div>
    </div>
    <!-- <div class="cover" @touchmove.stop="''">
      <div class="cancel-order">
        <h3>取消订单</h3>
        <div class="reason-box flex-c">
          <div class="auto-height">
            <div
              class="item-reason flex-r"
              v-for="(v,i) in reasonArr"
              :key="i"
              @click.stop="v.active=!v.active"
            >
              <p>
                <span>{{i+1}}</span>
                <span>{{v.reason}}</span>
              </p>

              <div class="no-sel-btn" :class="{'sel-btn':v.active}"></div>
            </div>
          </div>
        </div>
        <div class="reason-btn flex-r">确定</div>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: {},
      orderState: "",
      reasonArr: [
        { id: 1, reason: "选错宝贝了", active: 1 },
        { id: 2, reason: "选错宝贝了", active: 0 },
        { id: 3, reason: "选错宝贝了", active: 0 },
        { id: 4, reason: "选错宝贝了", active: 0 },
        { id: 5, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 },
        { id: 6, reason: "选错宝贝了", active: 0 }
      ]
    };
  },
  onShow() {
    this.getOrderDetail();
  },
  mounted() {
    // this.getOrderDetail();
  },
  computed: {
    phone() {
      return this.$store.state.userInfo.mobile;
    },
    goHospitalPay() {
      return (this.orderList.rulePrice - this.orderList.depositPrice).toFixed(
        2
      );
    },
    totalPay() {
      return (this.orderList.rulePrice * this.orderList.quantity).toFixed(2);
    },
    // 实际支付
    actualPay() {
      return (this.orderList.payPrice - this.orderList.discountAmount).toFixed(
        2
      );
    },
    // 待支付
    waitPay() {
      let a = 0;
      if (!this.orderList.prepayType) {
        a = (
          this.orderList.rulePrice * this.orderList.quantity -
          this.orderList.discountAmount -
          this.orderList.payPrice
        ).toFixed(2);
      }
      return a;
    }
  },
  // 订单状态 1待付款，2已付款，3申请退款，4订单取消，5已发货，6待评价，7订单完成，8已退款，9待退款，10退款中， 11退款相关（包括8/9/10）
  methods: {
    getOrderDetail() {
      this.$http
        .post("order/queryOneByPk", { id: this.$root.$mp.query.id })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            // this.orderList = res.data;
            // cosnole.log(this.orderList);
            switch (res.data.osId.toString()) {
              case "1":
                this.orderState = "待付款";
                break;
              case "2":
                this.orderState = "已付款";
                break;
              case "3":
                this.orderState = "申请退款";
                break;
              case "4":
                this.orderState = "取消订单";
                break;
              case "5":
                this.orderState = "已发货";
                break;
              case "6":
                this.orderState = "待评价";
                break;
              case "7":
                this.orderState = "订单完成";
                break;
              case "8":
                this.orderState = "已退款";
                break;
              case "9":
                this.orderState = "待退款";
                break;
              case "10":
                this.orderState = "退款中";
                break;
              default:
                this.orderState = "退款相关";
                break;
            }
            this.orderList = res.data;
            this.orderList.commImg = this.orderList.commImg.split(",")[0];
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
.vo {
  margin-bottom: 43px;
}
.paysore {
  margin: 14px 0;
}
.organ-hospital {
  padding-bottom: 15px;
  border-bottom: 1rpx solid #f5f5f5;
  columns: #666;
  font-size: 13px;
  & > .organ-icon {
    width: 20px;
    height: 20px;
    background-image: url("http://img.meiduduo.com/images/xyy/hospital-n.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 15px;
  }
}
.state-ce {
  font-size: 15px;
  color: @baseColor;
}
.ce {
  display: inline-block;
  width: 25%;
  text-align: left;
}
.v {
  padding: 5px 0;
}
.flex-r {
  display: flex;
  flex-direction: row;
}
.order-detail {
  padding: 0.3rem 0.3rem;
  background-color: #fff;
}
.item-order {
  font-size: 14px;
  font-family: PingFangSC-Light;
  /* font-weight: 300; */
  color: @baseTextColor-c;
  line-height: 0.42rem;
}
.pay-methods {
  margin-bottom: 10px;
  background: #fff;
}

.order-list {
  border-bottom: 1rpx solid #f1f1f1;
  padding-top: 15px;
  padding-bottom: 15px;
  & > .img-box {
    width: 30%;
    // background-color: #f5f5f5;
    & > img {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 6px;
    }
  }
}

.order-title {
  display: flex;
  flex-direction: column;
  width: 70%;

  margin-left: 10px;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 0.36rem;
}
.rulePrice {
  // text-decoration: line-through;
  color: #999;
  margin-left: 5px;
}
.price {
  font-size: 15px;
  font-weight: bold;
}
.order-title p:first-child {
  font-size: 0.26rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
}
.order-title .isStage {
  justify-content: space-between;
  width: 100%;
}
//
.isStage p .bardge:not(:first-child) {
  margin-left: 5px;
}
.bardge {
  padding: 3px 5px;
  background-color: #fa97e6;
  border-radius: 5px;
  color: #fff;
}
.bardge-green {
  background-color: #7bdbcf;
}
.fen-y {
  font-size: 0.22rem;
  font-family: PingFangSC-Light;
  color: #555;
  line-height: 0.3rem;
  margin-bottom: 10px;
}
.order-address {
  justify-content: space-between;
  font-size: 14px;
  font-family: PingFangSC-Light;
  color: #333;
  padding: 15px;
}

.clearM::after {
  display: table;
  content: "";
}
.pay-list {
  font-size: 13px;
  color: #333;
}
.pay-message-item {
  color: #333;
  padding: 15rpx 0;
  justify-content: space-between;
  // border-bottom: 1rpx solid #f1f1f1;
}
.line {
  display: block;
  width: 100%;
  height: 1rpx;
  background-color: #f1f1f1;
  padding: 0 15px;
}
.address-box::after {
  display: table;
  content: "";
}
.footer {
  height: 43px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1rpx solid #f1f1f1;
  background-color: @base-white;
  > .footer-inner {
    padding: 0 15px;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    & > .bar-set {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // padding: 8px 19px;
      padding: 5px 19px;
      border: 1rpx solid @baseColor;
      font-size: 13px;
      color: #333;
      color: @baseColor;
      border-radius: 16px;
    }
    & > .bar-set:not(:first-child) {
      margin-left: 10px;
    }
  }
}
.total-money {
  padding: 15px 0;
  background-color: @base-white;
  font-size: 13px;

  > .list-money {
    padding: 15rpx 30rpx;
    justify-content: flex-end;
    > span:last-child {
      display: inline-block;
      // width: 20%;
      color: @baseColor;
    }
  }
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
@btn: 49px;
.cancel-order {
  height: 300px;
  // width: 100%;
  padding: 15px 15px 0 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  & > h3 {
    margin-bottom: 25px;
  }
  & > .reason-box {
    overflow: scroll;
    height: 200px;
    margin-bottom: @btn;
    overflow: scroll;
  }
  & .item-reason {
    padding: 10px 0;
    // border-bottom: 1px solid #ddd;
    font-size: 15px;
    color: #333;
    justify-content: space-between;
  }
  & .item-reason:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
  & > .reason-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: @baseColor;
    color: #fff;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    height: @btn;
  }
}
::-webkit-scrollbar {
  display: none;
}
.no-sel-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #999;
  background-color: #fff;
}
.sel-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #fc4396;
  background-color: #fa97e6;
}
.hos-addr {
  flex-wrap: nowrap;
  & > .hos-title {
    min-width: 60px;
    // align-items: center;
  }
}
</style>
