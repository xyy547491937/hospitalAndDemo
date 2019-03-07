<template>
  <div class="confir-order">
    <!--  传来数据格式为数组，必传contenType -->
    <hr style="height:0.3rem;border:none;border-top:0.3rem solid #F1F1F1;">
    <!-- 选择地址 -->
    <!-- 如果是服务类的产品地址栏不出现，否则出现 -->
    <!-- v-if="commType==2" -->
    <!-- <div class="pay-address" @click="changeJump('../shop/address_management',{})">
      <div class="cap"  v-if="defaultAddress.isDefaults">
        <div class="pay-address-first">
          <div>收货人：{{defaultAddress.custName }}</div>
          <div>{{defaultAddress.tel}}</div>
        </div>
        <div class="pay-address-two">
          <span class="c">收货地址：{{address}}</span>
          <i-icon type="enter" size="16" color="#80848f" />
        </div>
    </div>-->
    <!-- 地址为空时 -->
    <!-- <div class="c" v-else>
        <i-cell-group>
          <i-cell title="请选择收货地址" is-link></i-cell>

        </i-cell-group>
      </div>
    </div>-->
    <div class="content">
      <div class="content-top">
        <!-- 立即购买便利列表 -->
        <div class="project" v-if="shopType==2">
          <img :src="comm.commImg" alt="comm.commName">
          <div>
            <h4>{{comm.commName }}</h4>
            <p class="hos">{{organ.organName}}</p>
            <p class="price">
              <span>¥{{comm.rulePrice}}</span>
              <span>¥{{comm.price}}</span>
            </p>
          </div>
        </div>
        <!-- 导入购物车模块 -->
        <!-- 接受传过来的类型shopType，购物车1，立即购买2，拼单3， -->
        <div class="c" v-if="shopType==1">
          <!-- 加入购物车的时候用这个组件 -->
          <!-- 是否需要点控件isSelect -->
          <cartList :cartArr="cartArr" :isSelect="isSelect" :isCartShow="isCartShow"/>
        </div>

        <div class="chioce" v-if="commType==1 && shopType==2">
          <inputNumber :sel="sel" :comm="comm" :isnum="isnum" :issel="buyType" @payType="payType"/>
          <!-- issel 全款0 定金1 -->
        </div>
        <!-- 数量 -->
        <div class="chiose-num chioce-title" v-if="shopType==2">
          <span class="c-num-title">数量</span>
          <div class="c-num">
            <span class="add-num" @click="addNum(-1)">-</span>
            <input type="number" :value="num" v-model="num">
            <span class="sub-num" @click="addNum(1)">+</span>
          </div>
        </div>
        <!-- 快递 -->
        <!-- 快递暂时不要 -->
        <!-- <div class="chiose-num chioce-title">
          <span class="c-num-title"> 快递</span>
          <span style="color:#FF4691;font-weight:bold;"> ￥{{totalMoney}}</span>
        </div>-->
        <!-- 小计 -->
        <div class="chiose-num chioce-title">
          <span class="c-num-title">小计</span>
          <span style="color:#FF4691;font-weight:bold;">￥{{totalMoney}}</span>
        </div>
      </div>
      <div class="phone">
        <a>手机号：{{phone}}</a>
      </div>
    </div>
    <div class="footer">
      <p class="bmoney">
        实付：
        <span>¥{{totalMoney}}</span>
      </p>
      <div class="sub" v-if="shopType==2" @click="quickSubmit">确认订单</div>
      <div class="sub" v-if="shopType==1" @click="cartSubmit">确认订单</div>
      <div class="sub" v-if="shopType==3" @click="pingSubmit">确认订单</div>
    </div>
  </div>
</template>

<script>
import inputNumber from "./comm/inputNumber";
import cartList from "./comm/cartList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCartShow: true,
      color: "#FF4691",
      isShow: 0,
      price: "1",
      commodityId: "",
      commodity: [],
      organ: [],
      payPrice: "",
      mobile: "",
      unbind: true,
      comm: {},
      organ: {},
      severPersonal: {},
      num: 1,
      commType: "",
      // addNum: true,
      sel: true,
      cartArr: [],
      isnum: false,
      isSelect: false,
      shopType: null,
      buyType: 0, //是全款还是定金,
      defaultAddress: {},
      isOnce: 1
    };
  },
  created() {
    // console.log(this.$route.query.id);
  },
  onShow() {
    // TODO 支付完成返回我的页面没有实现
    // let self = this;
    // console.log(123233);
    // getCurrentPages({
    //   success: res => {
    //     console.log(res);
    //     if (res.name == "pagesMyOrder") {
    //       self.changeJump("/pages/mine", {});
    //     }
    //   }
    // });
  },

  onLoad(options) {
    // console.log(this.userInfo);
    // console.log(options);
    this.getDetail(options.id);
    // console.log(this.$root.$mp.query);
    this.commType = options.commType;

    this.shopType = options.shopType;
    this.buyType = options.buyType;
    this.num = options.num;
    this.isOnce = 1;
  },

  components: {
    inputNumber,
    cartList
  },
  computed: {
    totalMoney() {
      return this.isALLMoney(this.buyType).toFixed(2);
    },
    phone() {
      return this.$store.state.userInfo.mobile;
    },
    // {{defaultAddress.provinceName }}{{defaultAddress.cityName  }}{{defaultAddress.areaName }}{{defaultAddress.address }}
    address() {
      return `${this.defaultAddress.provinceName +
        this.defaultAddress.cityName +
        this.defaultAddress.areaName +
        this.defaultAddress.address}`;
    },
    cartids() {
      let arr = [];
      this.cartArr.forEach(v => {
        v.cartList.forEach(el => {
          if (el.isChecked) {
            arr.push(el.id);
          }
        });
      });
      return JSON.stringify(arr);
    },
    organIds() {
      let n = [];
      if (this.$root.$mp.query.shopType == 1) {
        this.cartArr.forEach(v => {
          // v.cartList.forEach(el=>{
          n.push(v.organId);
          // })
        });
        return n.join();
      } else if (this.$root.$mp.query.shopType == 2) {
        return this.organ.id;
      }
    }
  },
  mounted() {
    // this.getDefaultAddress();
    if (wx.getStorageSync("cartData")) {
      let a = JSON.parse(wx.getStorageSync("cartData"));
      a.forEach(v => {
        let newArr = [];
        newArr = v.cartList.filter(el => {
          return el.isChecked == 1;
        });
        v.cartList = newArr;
      });
      // console.log(a);
      this.cartArr = a.filter(v => {
        // let newArr=[]
        return v.cartList.length > 0;
      });
      // console.log(this.cartArr);
    }
  },
  methods: {
    jump() {
      this.$router.push({
        path: "./payOrder",
        query: {
          commType: this.commType
        }
      });
    },

    payType(msg) {
      // 接受子组件的数值，全款and 定金
      this.buyType = msg;
    },
    //获取默认地址
    getDefaultAddress() {
      this.$http
        .post("address/list4Page", {
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == "1") {
            if (res.data.data.length != 0) {
              res.data.data.forEach(v => {
                if (v.isDefaults) {
                  this.defaultAddress = v;
                }
              });
            }
          }
        });
    },
    // 获取商品详情
    getDetail(id) {
      console.log(this.$root.$mp.query.shopType);
      if (this.$root.$mp.query.shopType == 2) {
        this.$http
          .post("commodity/getCommodityInfo", {
            id: id,
            custId: this.$store.state.userInfo.custId
          })
          .then(res => {
            //   console.log(res.data.data);
            if (res.code == 1) {
              // this.detailArr = res.data.data;
              const { comm, organ, servicePersonal } = res.data;
              this.comm = comm;
              this.comm.commImg = comm.commImg.split(",")[0];
              this.organ = organ;
              this.severPersonal = servicePersonal;
              // this.imgsrc = comm.commImg;
            }
          });
      }
    },
    //判断是全款还是定金
    isALLMoney(n) {
      let money = 0;
      if (this.$root.$mp.query.shopType == 2) {
        //假如是立即购买
        // console.log(n);
        if (n == 1) {
          money = this.comm.rulePrice * this.num;
        } else {
          money = this.comm.depositPrice * this.num;
        }
        return money;
      } else if (this.$root.$mp.query.shopType == 1) {
        //假如时加入购物车
        this.cartArr.forEach(v => {
          v.cartList.forEach(el => {
            // console.log(el);
            money += el.oldPrice * el.quantity;
          });
        });
        console.log(money);
        return money;
      } else {
        //否则是平团
        return money;
      }
    },
    //判断用户是否注册绑定手机号
    isPhone() {},
    //数量++ --
    addNum(n) {
      if (n > 0) {
        this.num++;
      } else {
        if (this.num <= 1) {
          this.num = 1;
        } else {
          this.num--;
        }
      }
    },
    subOrder(params) {
      // if (!this.defaultAddress.isDefaults) {
      //   wx.showToast({
      //     title: "请选择地址",
      //     icon: "none"
      //   });
      // } else {
      if (this.isOnce) {
        //避免用户多次点击提交订单， 但是如果由于网络原因就没有办法再次提交，只能点击一次
        this.isOnce = 0;

        this.$http.post("order/save", params).then(res => {
          if (res.code == 1) {
            this.$router.replace({
              path: "/pagesShop/payOrder",
              query: {
                orderId: res.data,
                commType: this.commType,
                proId: this.$root.$mp.query.shopType == 2 ? this.comm.id : "",
                shopType: this.$root.$mp.query.shopType,
                pin: false,
                organIds: this.organIds,
                isOrder: 0
              }
            });
          }
          // console.log(res);
        });
      } else {
        this.changeJump("/pagesMine/myOrder", {});
      }

      // }
    },
    // 立即购买
    quickSubmit() {
      let params = {
        // remark: "",
        customName: this.$store.state.userInfo.nickName,
        customTel: this.$store.state.userInfo.mobile,
        // customAddress: this.address,
        customId: this.$store.state.userInfo.custId,
        // nickName: "",
        orderType: "1",
        payPrice: this.totalMoney,
        // cartIds:'',
        prepayType: this.buyType,
        commodityId: this.comm.id,
        quantity: this.num
      };
      this.subOrder(params);
    },
    //购物车提交
    cartSubmit() {
      let params = {
        // remark: this.comm.remark,
        customName: this.$store.state.userInfo.nickName,
        customTel: this.$store.state.userInfo.mobile,
        // customAddress: this.address,
        customId: this.$store.state.userInfo.custId,
        nickName: this.$store.state.userInfo.nickName,
        orderType: "1",
        payPrice: this.totalMoney,
        cartIds: this.cartids

        // prepayType: this.buyType,
        // commodityId: this.comm.id,
        // quantity: this.num
      };
      this.subOrder(params);
    }
  }
};
</script>

<style scoped>
.pay-address {
  background-color: #ffffff;
  padding: 0.2rem 0;
  margin-bottom: 0.2rem;
  /* background-image: url("http://img.meiduduo.com/images/arrow.png");
  background-position: 7rem center;
  background-repeat: no-repeat;
  background-size: 0.12rem 0.2rem; */
}

.pay-address-two {
  margin-left: 0.2rem;
  font-size: 0.26rem;
  margin: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.pay-address-first {
  font-size: 0.26rem;
}

.pay-address-first div:first-child {
  display: inline-block;
  width: 60%;
  padding-left: 0.2rem;
}

.pay-address-first div:last-child {
  display: inline-block;
  width: 30%;
  text-align: right;
}

.chiose-num {
  padding: 0.2rem 0.2rem;
  color: #333;
  font-size: 0.3rem;
  /* line-height: 1rem; */
  background: #fff;
  border-top: 1rpx solid #eee;
  justify-content: space-between;
  /* background-image: url("http://img.meiduduo.com/images/arrow.png");
  background-position: 7rem center;
  background-repeat: no-repeat;
  background-size: 0.12rem 0.2rem; */
}

.c-num {
  width: 1.7rem;
  height: 0.5rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.c-num span,
.c-num input {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 0.5rem;
  border: 1px solid #bbb;
  /* border-radius: 6px; */
  font-size: 15px;
  color: #999;
  min-height: 0;
}

.c-num span:first-child {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.c-num span:last-child {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.c-num input {
  padding-left: 0.3rem;
  width: 0.7rem;
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.c-num-title {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.56rem;
}

.active {
  color: #ff4691;
}

.noSlect {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 50%;
  margin-right: 0.2rem;
}

.chioce-title {
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chioce-pay {
  font-size: 0.24rem;
  /* margin-left: 0.2rem; */
  margin: 0.1rem 0.4rem;
  color: #a6a6a6;
}

.chioce-title div {
  /* display: inline-block; */
}

.chioce-title img {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
  margin-right: 0.2rem;
}

.confir-order {
  background-color: #f1f1f1;
  height: 100%;
  width: 100%;
  /* padding-top: 1.44rem; */
}

.content-top {
  /* padding:0 .2rem; */
  background: #fff;
  margin-bottom: 0.17rem;
}

.project {
  display: flex;
  display: -webkit-flex;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.project div {
  margin-top: 0.2rem;
}

.project img {
  width: 1.8rem;
  height: 1.8rem;
  margin: 0.15rem;
}

.project h4 {
  color: #333;
  font-size: 0.26rem;
  font-weight: bold;
}

.project .hos {
  font-size: 0.24rem;
  color: #999;
  line-height: 0.6rem;
}

.price span:first-child {
  font-size: 0.24rem;
  color: #fc4396;
  margin-right: 0.1rem;
}

.price span:last-child {
  font-size: 0.24rem;
  color: #999999;
  text-decoration: line-through;
}

.price del {
  font-size: 0.18rem;
  color: #999999;
}

.chioce {
  padding: 0 0.2rem;
}

.chioce-item {
  padding: 0.2rem 0;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.chioce-item:last-child {
  border: none;
}

.choice-info {
  padding-left: 0.5rem;
  line-height: 0.6rem;
  font-size: 0.25rem;
  color: #999;
}

.money {
  display: inline-block;
}

.phone {
  padding: 0 0.2rem;
  color: #333;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #fff;
  /* background-image: url("http://img.meiduduo.com/images/arrow.png"); */
  background-position: 7rem center;
  background-repeat: no-repeat;
  background-size: 0.12rem 0.2rem;
}

.phone a {
  color: #333;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  display: -webkit-flex;
  background: #fff;
  justify-content: flex-end;
  align-items: center;
  /* -webkit-justify-content: space-between; */
}

.footer > div {
  /* height: 1rem; */
}

.sub {
  width: 2.1rem;
  line-height: 1rem;
  color: #fff;
  background: #fc4396;
  text-align: center;
  font-size: 0.32rem;
}

.bmoney {
  margin-right: 0.5rem;
  /* color: #ff4691; */
  /* font-size: 0.26rem;
  font-weight: bold;
  line-height: 0.5rem;
  padding-left: 0.2rem; */
}

.bmoney span {
  color: #ff4691;
}

.smoney {
  color: #999;
  font-size: 0.22rem;
  padding-left: 0.2rem;
}
</style>
