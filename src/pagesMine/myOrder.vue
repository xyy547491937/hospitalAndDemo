<template>
  <div style="background-color: #f5f5f5;min-height:100%;;width:100%;">
    <div>
      <tab :titledata="titledata" @clickactive="clickactive" :activeIndex="activeIndex"></tab>
    </div>
    <div v-if="orderList" style="margin-bottom: 56rpx;">&nbsp;</div>
    <div style="margin-top: 18rpx;" v-for="(item,index) in orderList" :key="index">
      <!-- 普通订单 item.orderType != 2 -->
      <div v-if="item.orderType != 2" class="order-kuang" @click.stop="jump(item.id, 1)">
        <div class="order-title">
          <!-- <div>胚豆订单号：{{item.orderNo}}</div> -->
          <div class="organ_info">
            <img class="organ_icon" src="http://img.meiduduo.com/images/mine/ic_info_un.png" alt>
            <span style="margin-left: 10rpx;">{{ item.organName }}</span>
          </div>
          <div class="default-title-label-color" :class="{'state-pending-payment': item.osId == 1, 'state-paid': item.osId == 2, 'state-comment': item.osId == 6 || item.osId == 8, 'state-refunding': item.osId == 10 || item.osId == 9 || item.osId == 3}">
            <span v-if="item.checkState != ''">{{ arr2[item.checkState] }}</span>
            <span v-else>{{ arr1[item.osId] }}</span>
          </div>
        </div>
        <div class="item">
          <div class="item-top">
            <div class="item-img">
              <img :src="item.commImg[0]" alt>
            </div>
            <div class="info">
              <div>
                <h5>
                  [{{item.commodityName}}]
                  <span>{{item.remark}}</span>
                </h5>
              </div>
              <div class="price">
                <span v-if="item.prepayType == 0">
                  <span class="price-span down-payment-span">预付订金：<span class="down-payment-price-span">¥{{item.downPayment}}</span></span>
                  <span class="price-span pay-hospital">到院再付：¥{{item.payHospital}}</span>
                </span>
                <span v-else>
                  <span class="price-span down-payment-span">全额付：<span class="down-payment-price-span">¥{{item.downPayment}}</span></span>
                </span>
              </div>
              <!-- <p class="addr">{{item.organName}}</p> -->
              <div class="service_info">
                <div>
                  <span v-if="item.isStage" class="serviec_item bg-color-type-one">分</span>
                  <span v-if="item.isInsurance" class="serviec_item bg-color-type-two">保</span>
                </div>
                <span>x{{item.buyNum}}</span>
              </div>
              <!-- <p class="addr_num">x{{item.buyNum}}</p> -->
            </div>
          </div>
          <hr style="border:none;border-top:1px solid #EEEEEE;">
        </div>
        <div class="product-order-bottom">
          <div class="order-bottom-price-info">
            <span class="order-bottom-num-style">共 {{item.buyNum}} 件</span>
            <span>合计 </span>
            <span class="order-bottom-price-style">￥{{item.payPrice}}</span>
          </div>
          <div v-if="item.osId == 1" class="footer_btns">
            <span class="footer_button my-order-cancel-order product-cancel-order" @click.stop="cancelOrder(item)">取消订单</span>
            <span class="footer_button footer_button1 my-order-pay-immediately product-pay-immediately" @click.stop="goPay(item)">立即支付</span>
          </div>
          <div v-if="item.osId == 6" class="footer_btns">
            <span
              class="footer_button footer-message-btn"
              @click.stop="toEvaluate(item)"
            >
              去评价
            </span>
          </div>
          <div v-if="item.osId == 2 || item.checkState == '待使用'" class="footer_btns">
            <span
              class="footer_button ticket-code-btn"
              @click.stop="toTicketCode(item)"
            >
              查看券码
            </span>
          </div>
          <!-- 普通商品不能退款 -->
          <!-- <div v-if="true" class="footer_btns">
							<span class="footer_button" @click.stop="requestARefund">申请退款</span>
							<span class="footer_button" @click.stop="goAppointment">快去预约</span>
          </div>-->
          <!-- <div v-if="false" class="reimburse">
							<div class="reimburse-first">
								<div class="reimburse-first-first">申请退款时间</div>
								<div>2018-08-15 16:45:00</div>
							</div>
							<div class="reimburse-right">
								<div class="reimburse-first-first">退款时间</div>
								<div>2018-08-15 16:45:00</div>
							</div>
          </div>-->
        </div>
      </div>

      <!-- 拼团订单 -->
      <div v-else @click.stop="jump(item.id, 2)" class="order-kuang">
        <div class="order-title">
          <div class="organ_info">
            <img class="organ_icon" src="http://img.meiduduo.com/images/mine/ic_info_un.png" alt>
            <span style="margin-left: 10rpx;">{{ item.organName }}</span>
          </div>
          <div class="default-title-label-color" :class="{'state-pending-payment': item.osId == 1, 'state-paid': item.osId == 2, 'state-comment': item.osId == 6 || item.osId == 8, 'state-refunding': item.osId == 10 || item.osId == 9 || item.osId == 3}">
            <span class="div-after-dot">{{ arr[item.gosId] }}</span>
            <span v-if="item.checkState != ''">{{ arr2[item.checkState]}}</span>
            <span v-else>{{arr1[item.osId]}}</span>
          </div>
        </div>
        <div class="item">
          <div class="item-top">
            <div class="item-img">
              <img :src="item.commImg[0]" alt>
            </div>
            <div class="info">
              <div>
                <h5>
                  [{{item.commodityName}}]
                  <span>{{item.remark}}</span>
                </h5>
              </div>
              <div class="price_info">
                <span>￥{{ item.payPrice }}</span>
                <span>单买：￥{{ item.rulePrice }}</span>
              </div>
              <div class="service_info">
                <div>
                  <span v-if="item.isStage" class="serviec_item bg-color-type-one">分</span>
                  <span v-if="item.isInsurance" class="serviec_item bg-color-type-two">保</span>
                </div>
                <span>x1</span>
              </div>
            </div>
          </div>
          <hr style="border:none;border-top:1px solid #EEEEEE;">
        </div>
        <div class="usre_info" style="margin-bottom: 0;padding-bottom: 15rpx;">
          <div v-if="item.osId == 3 || item.osId == 8 || item.osId == 9 || item.osId == 10" class="user_icons">
            <img
              v-for="(label, inx) of item.icons"
              :key="inx"
              v-if="inx < 5"
              class="user_info_item"
              :src="label"
              alt
            >
          </div>
          <div v-else></div>
          <div>
            <span class="order-bottom-num-style">共 1 件</span>
            <span>合计 </span>
            <span style="color:#333333">￥{{ item.payPrice }}</span>
          </div>
        </div>
        <hr v-if="item.osId == 3 || item.osId == 8 || item.osId == 9 || item.osId == 10" style="border:none;border-top:1px solid #EEEEEE;margin:0 30rpx;">
        <div v-if="item.osId == 1 || item.osId == 2 || item.osId == 3 || item.osId == 6 || item.osId == 8 || item.osId == 9 || item.osId == 10" class="order-bottom">
          <div v-if="item.osId != 3 && item.osId != 8 && item.osId != 9 && item.osId != 10" class="user_icons">
            <img
              v-for="(label, inx) of item.icons"
              :key="inx"
              v-if="inx < 5"
              class="user_info_item"
              :src="label"
              alt
            >
          </div>
          <!-- 已付款 -->
          <div v-if="item.osId == 2" class="compay">
            <div v-if="item.gosId == 1" @click.stop="inviteFriends(item)" class="order-refund my-order-invite-friends">邀请好友</div>
            <div
              v-if="item.gosId == 2 && item.checkState == ''"
              @click.stop="seeTicketCode(item)"
              class="order-pay my-order-request-refund see-ticket-code"
            >查看券码</div>
            <div
              v-if="item.gosId == 2 && item.checkState == ''"
              @click.stop="apply(item)"
              class="order-pay my-order-request-refund"
            >申请退款</div>
          </div>
          <div v-if="item.osId==1" class="compay">
            <div @click.stop="cancelOrder(item)" class="order-refund my-order-cancel-order">取消订单</div>
            <div @click.stop="goPay(item)" class="order-pay my-order-pay-immediately">立即支付</div>
          </div>
          <div
            v-if="item.osId == 3 || item.osId == 8 || item.osId == 9 || item.osId == 10"
            class="reimburse"
          >
            <div class="reimburse-first">
              <div class="reimburse-first-first">申请退款时间</div>
              <div v-if="item.reqredTime">{{ item.reqredTime }}</div>
            </div>
            <div class="reimburse-right">
              <div v-if="item.refundTime" class="reimburse-first-first">退款时间</div>
              <div v-if="item.refundTime">{{ item.refundTime }}</div>
              <div v-else class="isReimburse">正在退款中...</div>
            </div>
          </div>
          <div v-if="item.osId == 6" class="compay">
            <div
              style="border-color: #D29DFF;color: #D29DFF;"
              @click.stop="toEvaluate(item)"
              class="order-refund my-order-go-evaluation"
            >快去评价</div>
          </div>
        </div>
      </div>
    </div>
    <div id="nolist" v-if="orderList.length < 1">
      <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
    <div v-if="isOver && orderList.length > 0">
      <load-over></load-over>
    </div>
  </div>
</template>

<script>
import tab from "../pages/comm/tab.vue";
import loadOver from "../pages/comm/loadOver.vue";
export default {
  components: {
    tab,
    "load-over": loadOver
  },
  data() {
    return {
      loaded: false,
      titledata: [
        {
          title: "全部",
          badgeNum: ""
        },
        {
          title: "待付款",
          badgeNum: ""
        },
        {
          title: "待使用",
          badgeNum: ""
        },
        {
          title: "待评价",
          badgeNum: ""
        },
        {
          title: "退款",
          badgeNum: ""
        }
      ],
      orderList: [],
      arr2: ["审核通过", "未审核", "审核未通过"],
      // arr1: ['', '待付款', '已付款', '申请退款', '订单取消', '已发货', '待评价', '订单完成', '已退款', '待退款', '退款中'],
      arr1: [
        "",
        "待付款",
        "已付款",
        "申请退款",
        "订单取消",
        "已发货",
        "待评价",
        "订单完成",
        "已退款",
        "待退款",
        "退款中"
      ], // 没有评价功能
      arr: ["拼团无效", "拼团中", "拼团成功", "拼团失败"],
      activeIndex: null, // 活跃index
      pageNum: 1,
      pageSize: 10,
      isOver: false, // 是否加载完毕
      params: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  onLoad() {
    this.init();
    console.log(this.$route.query)
    if (this.$route.query.index != null) {
      this.activeIndex = this.$route.query.index;
      if (this.$route.query.index == 1) {
        this.params.osId = 1;
      }
      if (this.$route.query.index == 2) {
        this.params.osId = 2;
      }
      if (this.$route.query.index == 4) {
        this.params.osId = 11;
      }
      if (this.$route.query.index == 3) {
        // 待评价
        this.params.osId = 6;
      }
    } else {
      delete this.params.osId;
    }
  },
  onShow() {
    this.loaded = false
    console.log('on show')
    if (this.$route.query.isDiscuess) {
      this.activeIndex = this.$route.query.index;
    }
    this.orderList = [];
    this.isOver = false;
    this.pageNum = 1;
    this.getList();
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getList();
    }
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.isOver = false;
    this.orderList = [];
    this.getList();
  },
  methods: {
    seeTicketCode (obj) {
      this.$router.push({
        path: '/pagesShop/lookCode',
        query: {
          code: obj.vertifyCode,
          id: obj.id,
          type: obj.orderType
        }
      })
    },
    init() {
      this.isOver = false;
      this.pageNum = 1;
      this.orderList = [];
      this.params = {};
    },
    apply(item) {
      // 申请退款
      this.$router.push({
        path: "/pagesMine/request_refund",
        query: {
          orderNo: item.orderNo,
          orderId: item.id,
          orderType: item.orderType,
          organId: item.organId
        }
      });
    },
    inviteFriends(item) {
      this.$router.push({
        path: "/pagesShow/global/invite_friends",
        query: {
          id: item.id, // 订单id
          commodityId: item.commodityId, // 商品id
          from: "myOrder" // 来源
        }
      });
    },
    jump(id, type) {
      if (type == 1) {
        this.$router.push({
          path: "/pagesShop/orderDetail",
          query: {
            id: id
          }
        });
      }
      if (type == 2) {
        this.$router.push({
          path: "/pagesShop/groupOrderDetail",
          query: {
            id: id
          }
        });
      }
    },
    cancelOrder(item) {
      // 取消订单
      this.$http
        .post("order/cancelOrder", {
          id: item.id,
          orderType: item.orderType ? item.orderType : 1
        })
        .then(res => {
          if (res.code === 1) {
            this.isOver = false;
            this.pageNum = 1;
            this.orderList = [];
            // this.init();
            // this.params.osId = 1;
            this.getList();
          } else {
            wx.showModal({
              title: "操作失败",
              content: "取消订单失败",
              showCancel: false
            });
          }
        });
    },
    goPay(item) {
      // 去付款
      this.$router.replace({
        path: "/pagesShop/payOrder",
        query: {
          orderId: item.id,
          pin: item.orderType == 2 ? true : false,
          commType: 1,
          proId: item.commodityId, // 商品id
          shopType: 1,
          organIds: item.organId,
          isOrder: 1
        }
      });
    },
    requestARefund() {
      // 申请退款
    },
    goAppointment() {
      // 快去预约
    },
    getList(osId) {
      // 获取订单列表
      this.params.pageNum = this.pageNum;
      this.params.pageSize = this.pageSize;
      this.params.custId =
        this.user.custId || this.$store.state.userInfo.custId;
      if (osId) {
        this.params.osId = osId;
      }
      this.$http.post("order/list4Page", this.params).then(res => {
        wx.stopPullDownRefresh();
        if (res.code === 1) {
          let a = res.data.data;
          for (let i = 0, j = a.length; i < j; i++) {
            if (a[i].commImg) {
              a[i].commImg = a[i].commImg.split(",");
            } else {
              a[i].commImg = [];
            }
            if (a[i].icons) {
              a[i].icons = a[i].icons.split(",");
            } else {
              a[i].icons = [];
            }
            if (a[i].payPrice && a[i].buyNum) {
              a[i].downPayment = Number(a[i].payPrice) / Number(a[i].buyNum)
              a[i].payHospital = Number(a[i].unpaid) / Number(a[i].buyNum)
            }
            // 处理退款时间
            // if (a[i].refundTime) {
            // 	a[i].refundTime = `${a[i].refundTime.slice(0, 10)} ${a[i].refundTime.slice(10, 19)}`
            // }
            // if (a[i].reqredTime) {
            // 	a[i].reqredTime = `${a[i].reqredTime.slice(0, 10)} ${a[i].reqredTime.slice(10, 19)}`
            // }
          }
          if (res.pageNum == 1) {
            this.orderList = a;
          } else {
            this.orderList = this.orderList.concat(a);
          }
          this.loaded = true
          if (this.pageNum == res.data.pages || a.length < this.pageSize) {
            this.isOver = true;
          } else {
            this.pageNum++;
            this.isOver = false;
          }
        }
      });
    },
    clickactive(val) {
      this.loaded = false
      this.init();
      if (val.title == "待付款") {
        this.getList(1);
      }
      if (val.title == "待使用") {
        this.getList(2);
      }
      if (val.title == "退款") {
        this.getList(11);
      }
      if (val.title == "全部") {
        delete this.params.osId;
        this.getList();
      }
      if (val.title == "待评价") {
        this.getList(6);
      }
    },
    toEvaluate(item) {
      // 去评价
      this.$router.push({
        path: "/pagesMine/orderDiscuess",
        query: {
          id: item.id
        }
      });
    },
    toTicketCode (item) {
      // 查看券码
      this.$router.push({
        path: '/pagesShop/lookCode',
        query: {
          code: item.vertifyCode,
          id: item.id,
          type: item.orderType
        }
      })
    }
  }
};
</script>

<style scoped>
.reimburse {
  font-size: 0.24rem;
  margin: 0.05rem 0;
  width: 100%;
}
.reimburse-first {
  width: 47%;
  display: inline-block;
  border-right: solid #eeeeee 1px;
  color: #a9a9a9;
}
.reimburse-right {
  width: 47%;
  display: inline-block;
  margin-left: 0.2rem;
  color: #a9a9a9;
}
.reimburse-first-first {
  margin-bottom: 0.1rem;
}
.reimburse-last {
  width: 47%;
  display: inline-block;
  /* margin: auto; */
  text-align: center;
  color: #ff82b5;
}

.compay {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.nopay {
  margin-left: 55%;
}
.appraise {
  margin-left: 72%;
}
.appraisebutton {
  font-size: 0.3rem;
  display: inline-block;
  background-color: #fef0a2;
  color: #f36006;
  padding: 0.1rem 0.3rem;
  border-radius: 60px 60px 60px 60px;
  text-align: center;
  margin-left: 0.4rem;
  border: solid #fef0a2 1px;
}
.order-bottom {
  width: 100%;
  padding: 17rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  -webkit-display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.product-order-bottom {
  width: 100%;
  padding: 17rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  -webkit-display: flex;
  flex-direction: column;
  -webkit-flex-direction: column;
}
.order-cancal {
  font-size: 0.28rem;
  display: inline-block;
  color: #acacac;
  text-align: right;
}
.order-pay {
  font-size: 26rpx;
  display: inline-block;
  background-color: #ff4691;
  color: #ffffff;
  width: 150rpx;
  height: 56rpx;
  line-height: 56rpx;
  /* padding: 0.1rem 0.3rem; */
  border-radius: 60px 60px 60px 60px;
  text-align: center;
  margin-left: 20rpx;
  border: solid #ff4691 1px;
}
.see-ticket-code {
  color: #74DEC4 !important;
  border-color: #74DEC4 !important;
}

.order-refund {
  font-size: 0.3rem;
  display: inline-block;
  color: #ff4691;
  padding: 0.1rem 0.3rem;
  border-radius: 60px 60px 60px 60px;
  text-align: center;
  border: solid #ff4691 1px;
}
.order-title {
  font-size: 0.24rem;
  color: #b8b8b8;
  width: 94%;
  margin-left: 3%;
  border-bottom: solid #eeeeee 1px;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-title div:first-child {
  width: 70%;
}
.order-title div:last-child {
  width: 35%;
  display: inline-block;
  text-align: right;
  /* color: #ff65a3; */
}
.order-kuang {
  background-color: #ffffff;
  padding-top: 0.2rem;
}
.price-old {
  text-decoration: line-through;
  font-weight: normal;
}

.price-span {
  color: #ff5097;
  font-weight: bold;
  margin-right: 0.28rem;
}

.item {
  width: 100%;
  padding: 10rpx 30rpx;
  box-sizing: border-box;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  padding-bottom: 0.17rem;
  margin-bottom: 0.1rem;
}

.item .item-img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  height: 100%;
  width: 100%;
}

.item .info {
  padding-left: 0.29rem;
  width: 5rem;
  font-weight: bold;
}

.item .info h5 {
  width: 4.35rem;
  font-size: 0.28rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}

.item .info h5 span {
  font-size: 0.28rem;
  font-weight: normal;
}

.item .info .addr {
  font-size: 0.24rem;
  color: #999;
  line-height: 0.6rem;
}

.item .price {
  font-size: 0.24rem;
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
.count-c {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.15rem;
}
.item .count-buy {
  font-size: 0.24rem;
  color: #bbbbbb;
  text-align: left;
  font-weight: 100;
}

.count-collection-btn,
.count-collection-btn1 {
  text-align: right;
}

.count-collection-btn > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #ffa6da;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #fb84bc;
  line-height: 0.41rem;
}

.count-collection-btn1 > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #eeeeee;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #999999;
  line-height: 0.41rem;
}

.count-collection-btn > span > img {
  width: 0.2rem;
  height: 0.17rem;
}

.count-collection-btn > span > em {
  font-size: 0.24rem;
}

.item .active {
  font-size: 0.25rem;
  color: #555555;
  margin-bottom: 0.2rem;
}

.item .active span {
  color: #fff;
  padding: 0.02rem 0.05rem;
  border-radius: 0.06rem;
}

.item .active span.red {
  background: #ff96be;
  margin-right: 0.2rem;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.item .active span.green {
  background: #69e1d7;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.count {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  color: #cccccc;
  line-height: 0.6rem;
  padding-left: 0.1rem;
}

.count .praise {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.count img {
  width: 0.22rem;
  vertical-align: initial;
}

.count span {
  padding: 0 0.1rem 0 0;
}
.footer_btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.footer_button {
  height: 60rpx;
  line-height: 60rpx;
  margin: 0 42rpx 0 40rpx;
  border-radius: 30rpx;
  font-size: 30rpx;
  text-align: center;
  box-sizing: border-box;
}
.footer_button1 {
  margin: 0;
  padding: 0 42rpx 0 40rpx;
}
.footer_btns > span:first-child {
  color: #999999;
  background: #fff;
}
.footer_btns > span:last-child {
  color: #fff;
  background: #ff4691;
}
.organ_icon {
  width: 40rpx;
  height: 38rpx;
  display: block;
}
.organ_info {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #666666;
}
.price_info {
  font-size: 24rpx;
  color: #999999;
  margin-top: 15rpx;
}
.price_info > span:first-child {
  font-size: 30rpx;
  color: #fc4396;
  margin-right: 19rpx;
}
.service_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22rpx;
  color: #333333;
  margin-top: 10rpx;
}
.serviec_item {
  color: #fff;
  padding: 4rpx 5rpx 6rpx 6rpx;
  border-radius: 5rpx;
}
.service_info > span:first-child {
  margin-right: 8rpx;
}
.user_info_item {
  display: block;
  width: 72rpx;
  height: 72rpx;
  border-radius: 100%;
  margin-left: -30rpx;
}
.user_icons {
  display: flex;
  align-items: center;
}
.user_icons > img:first-child {
  margin-left: 0;
}
.usre_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26rpx;
  color: #999999;
  padding: 5rpx 30rpx;
  margin-bottom: 17rpx;
}
.over_banner {
  font-size: 20rpx;
  color: #a9a9a9;
  text-align: center;
  padding: 17rpx;
  background: #fff;
}
.no_data {
  width: 100%;
  height: 900rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #a9a9a9;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.isReimburse {
  color: #ffb99d;
  text-align: center;
}
.addr_num {
  font-size: 22rpx;
  color: #333;
  text-align: right;
}
.evaluate {
  width: 37rpx;
  height: 34rpx;
  display: inline-block;
  margin-right: 13rpx;
}
.evaluate-btn {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
.my-order-cancel-order {
  border:1px solid rgba(221,221,221,1);
  color:rgba(51,51,51,1);
  font-size: 26rpx;
}
.my-order-pay-immediately {
  border:1px solid rgba(255,70,145,1);
  color:rgba(255,70,145,1);
  font-size: 26rpx;
  background-color: #fff;
  margin-left: 20rpx;
}
.my-order-invite-friends {
  border:1px solid rgba(116,222,196,1);
  color:rgba(116,222,196,1);
  font-size: 26rpx;
}
.my-order-request-refund {
  border:1px solid rgba(221,221,221,1);
  color:rgba(51,51,51,1);
  font-size: 26rpx;
  background: #fff;
}
.my-order-go-evaluation {
  border:1px solid rgba(210,157,255,1);
  color:rgba(210,157,255,1);
  font-size: 26rpx;
  background: #fff;
}
.bg-color-type-one {
  background: #FA97E6;
  margin-right: 8rpx;
}
.bg-color-type-two {
  background: #74DEC4;
}
.order-bottom-price-info {
  font-size: 26rpx;
  color: #999999;
  text-align: right;
  width: 100%;
  margin-bottom: 20rpx;
}
.order-bottom-num-style {
  margin-right: 20rpx;
}
.order-bottom-price-style {
  color: #333333;
}
.div-after-dot {
  position: relative;
}
.div-after-dot::after {
  content: ' . ';
  width: 20rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  display: inline-block;
  font-size: 26rpx;
  transform: translateY(-25%);
}
.state-pending-payment {
  color: #FF4691 !important;
}
.state-paid {
  color: #74DEC4 !important;
}
.state-comment {
  color: #999999 !important;
}
.state-refunding {
  color: #FFB99D !important;
}
.default-title-label-color {
  color: #999;
}
.pay-hospital {
  font-size: 24rpx;
  color: #999999;
}
.down-payment-span {
  color: #FF4691;
  font-size: 24rpx;
}
.down-payment-price-span {
  color: #FC4396;
  font-size: 30rpx;
  font-weight: 500;
}
.product-cancel-order {
  width: 150rpx;
  color: #333;
  margin-right: 20rpx;
}
.product-pay-immediately {
  width: 150rpx;
  background: #fff !important;
  font-size: 26rpx;
  margin-left: 0;
  padding: 0;
  color: #FF4691 !important;
}
.footer-message-btn {
  width: 150rpx;
  border:1px solid rgba(221,221,221,1);
  background: #fff !important;
  color: #333 !important;
  font-size: 26rpx;
  text-align: center !important;
  margin: 0;
}
.ticket-code-btn {
  width: 150rpx;
  border:1px solid rgba(116,222,196,1);
  background: #fff !important;
  color: #74DEC4 !important;
  font-size: 26rpx;
  text-align: center !important;
  margin: 0;
}
</style>
