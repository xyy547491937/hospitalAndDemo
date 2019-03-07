<template>
  <div>
    <div>
      <div class="cart-set flex" v-if="isManger">
        <span class="cart-set-btn cart-cancle" @click="deleteCart">删除</span>
        <span class="cart-set-btn cart-fav" @click="goStore">移入收藏夹</span>
      </div>
      <div class="cart" v-for="(item,i) in cartArr" :key="item" :index="i">
        <div class="cart-title flex">
          <!-- 选择按钮 -->
          <span
            class="er-circle er-circle-organ"
            :class="{'cart-active':item.isShopChecked}"
            @click="selectShop(item)"
            v-if="isSelect"
          ></span>
          <img src="http://img.meiduduo.com/images/xyy/hospital-y.png" alt=" " class="organ-icon">
          <div class="organ-title">{{item.organName}}</div>
        </div>
        <!-- 产品 -->
        <div class="c" v-if="!isCartShow">
          <div class="cart-body flex" v-for=" v in item.cartList" :key="v">
            <!-- 选择按钮 -->
            <div class="no-sle flex" v-if="isSelect">
              <span
                class="er-circle"
                :class="{'cart-active':v.isChecked}"
                @click="singleChecked(item,v)"
              ></span>
            </div>
            <!--  模块 -->
            <div class="flex-c">
              <div class="flex">
                <img :src="v.commImg" :alt="v.commName">
                <div class="cart-body-title">
                  <p class="mui-ellipsis-2">
                    <span>[{{v.commName}}］{{v.commRemark}}</span>
                  </p>
                  <p class="all-money">
                    <span>{{v.buyType==0?'定金付':"全款付"}}</span>
                    <span style="margin-left:10px; ">
                      ¥{{v.oldPrice
                      }}
                    </span>
                    <span
                      style="color:#999;margin-left:10px;"
                      v-if="item.buyType==0"
                    >到院再付：¥{{v.rulePrice-v.oldPrice}}</span>
                  </p>
                  <div class="server-list flex">
                    <div class="icon-box flex">
                      <span class="icon-title" v-if="v.isStage " style="background:#ff96be">分</span>
                      <span class="icon-title" v-if="v.isPrefer">优</span>
                      <span class="icon-title" v-if="v.isRecommend  " style="background:#69e1d7">推</span>
                      <span class="icon-title" v-if="v.isHot">热</span>
                      <span class="icon-title" v-if="v.isInsurance " style="background:#69e1d7">保</span>
                    </div>
                    <!-- 引入组件 -->
                    <div class="c" v-if="!isnum">x{{v.quantity}}</div>
                    <inputNumber :addNum="addNum" :q="v" @addnum="addnum" v-if="isnum" ref="f"/>
                  </div>
                </div>
              </div>
              <!-- 引入模块 -->
              <div class="coupon-add">
                <sales :couponList="v.couponChild"/>
              </div>
            </div>
          </div>
        </div>
        <!-- second -->
        <!-- 确认订单 -->
        <div class="c" v-if="isCartShow">
          <div class="cart-body flex" v-for=" v in item.cartList" :key="v" v-if="v.isChecked">
            <!-- 选择按钮 -->
            <div class="no-sle flex" v-if="isSelect">
              <span
                class="er-circle"
                :class="{'cart-active':v.isChecked}"
                @click="singleChecked(item,v)"
              ></span>
            </div>
            <div class="flex-c">
              <div class="flex">
                <img :src="v.commImg" :alt="v.commName">
                <div class="cart-body-title">
                  <p class="mui-ellipsis-2">
                    <span>[{{v.commName}}］{{v.commRemark}}</span>
                  </p>
                  <p class="all-money">
                    <span>{{v.buyType==0?'定金付':"全款付"}}</span>
                    <span style="margin-left:10px; ">
                      ¥{{v.oldPrice
                      }}
                    </span>
                    <span
                      style="color:#999;margin-left:10px;"
                      v-if="item.buyType==0"
                    >到院再付：¥{{v.rulePrice-v.oldPrice}}</span>
                  </p>
                  <div class="server-list flex">
                    <div class="icon-box flex">
                      <span class="icon-title" v-if="v.isStage " style="background:#ff96be">分</span>
                      <span class="icon-title" v-if="v.isPrefer">优</span>
                      <span class="icon-title" v-if="v.isRecommend  " style="background:#69e1d7">推</span>
                      <span class="icon-title" v-if="v.isHot">热</span>
                      <span class="icon-title" v-if="v.isInsurance " style="background:#69e1d7">保</span>
                    </div>
                    <!-- 引入组件 -->
                    <div class="c" v-if="!isnum">x{{v.quantity}}</div>
                    <inputNumber :addNum="addNum" :q="v" @addnum="addnum" v-if="isnum" ref="f"/>
                  </div>
                </div>
              </div>
              <!--add module  -->
              <div class="coupon-add">
                <sales :couponList="v.couponChild"/>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>
<script>
import inputNumber from "./inputNumber";
import sales from "./sales";
export default {
  props: ["cartArr", "isManger", "isnum", "isSelect", "isCartShow"],
  data() {
    return {
      addNum: true,
      sel: false,
      quantity: null,
      cartNum: null,
      cartArr2: {
        data: []
      }
    };
  },
  components: {
    inputNumber,
    sales
  },
  computed: {
    c() {
      if (this.cartArr.length == 0) this.isManger = false;
    }
  },

  mounted() {
    console.log(this.isCartShow);
  },
  beforeUpdate() {
    // this.allSelect();
  },
  methods: {
    //单选
    singleChecked(item, vl) {
      let n = 0;
      vl.isChecked = !vl.isChecked;

      item.cartList.forEach(v => {
        if (v.isChecked) {
          n += 1;
        }
      });
      if (n >= item.cartList.length) {
        item.isShopChecked = true;
      } else {
        item.isShopChecked = false;
      }

      this.isShopAllSelect();
      this.$emit("cartChangeArr", this.cartArr);
    },

    //点击店铺所中选中所有的产品
    selectShop(item) {
      item.isShopChecked = !item.isShopChecked;
      item.cartList.forEach(v => {
        v.isChecked = item.isShopChecked;
      });
      this.$emit("cartChangeArr", this.cartArr);
      // 假如选中的所有的店铺，全选默认选中
      this.isShopAllSelect();
    },
    isShopAllSelect() {
      let n = 0;
      this.cartArr.forEach(v => {
        if (v.isShopChecked) {
          n += 1;
        }
      });
      if (n >= this.cartArr.length) {
        this.$emit("allSelect", true);
      } else {
        this.$emit("allSelect", false);
      }
      this.$emit("cartChangeArr", this.cartArr);
    },
    addnum(msg) {
      this.cartNum = msg;
      console.log(this.cartNum);
      this.$emit("cartNum", this.cartNum);
    },

    //移入收藏夹
    goStore() {
      // 获取recordIDS
      let cartIds = [];
      this.cartArr.forEach(v => {
        v.cartList.forEach(el => {
          if (el.isChecked) {
            cartIds.push(parseInt(el.commodityId));
          }
        });
      });
      // 请求网络
      if (cartIds.length != 0) {
        wx.showLoading({
        mask: true,
        title: "加载中"
      });
        this.$http
          .post("storeRecord/save", {
            recordIds: JSON.stringify(cartIds),
            custId: this.$store.state.userInfo.custId,
            recordType: 3,
            state: 1
          })
          .then(res => {
            wx.hideLoading();
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "成功移入收藏夹，你可以在我的收藏找到",
                icon: "none"
              });
              let a = this.cartArr,
                aa = [];
              a.forEach(v => {
                let arr = [];
                arr = v.cartList.filter(el => {
                  return el.isChecked == false;
                });
                v.cartList = arr;
              });
              a = a.filter(v => {
                return v.cartList.length != 0;
              });
              this.$emit("a", a);
            }
          });
      } else {
        wx.showToast({
          title: "请选择商品",
          icon: "none"
        });
      }
    },

    // 购物车删除
    deleteCart() {
      let that = this;
      let cartIds = [];
      that.cartArr.forEach(v => {
        v.cartList.forEach(el => {
          if (el.isChecked) {
            cartIds.push(parseInt(el.id));
          }
        });
      });

      // console.log(cartIds);
      if (cartIds.length > 0) {
        wx.showModal({
          content: "你确定要删除吗",
          success(r) {
            if (r.confirm) {
              that.$http
                .post("cart/deleteBatch", {
                  ids: JSON.stringify(cartIds)
                })
                .then(res => {
                  // console.log(res);
                  if (res.code == 1) {
                    wx.showToast({
                      title: "删除成功",
                      icon: "none"
                    });
                    // this.cartArr.forEach\
                    //重新请求购物车列表改变父组件的值
                    // that.getCartDetail();
                    let a = that.cartArr,
                      aa = [];
                    a.forEach(v => {
                      let arr = [];
                      arr = v.cartList.filter(el => {
                        return el.isChecked == false;
                      });
                      v.cartList = arr;
                    });
                    a = a.filter(v => {
                      return v.cartList.length != 0;
                    });
                    // console.log(a);
                    that.$emit("a", a);
                  }
                });
            }
            if (r.cancel) {
              wx.showToast({
                title: "你已取消",
                icon: "none"
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: "请选择商品",
          icon: "none"
        });
      }
    }
  }
};
</script>
<style>
.cart-set {
  padding: 20rpx;
  justify-content: space-between;
}

.cart-set-btn {
  display: block;
  /* width: 0.74rem; */
  /* height: 0.35rem; */
  padding: 2px 5px;
  border: 1px solid rgba(255, 70, 145, 1);
  border-radius: 16px;
  color: rgba(255, 70, 145, 1);
  font-size: 0.26rem;
}

.flex {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
}

.flex-c {
  display: flex;
  flex-direction: column;
}

.coupon-add {
  margin-left: 20rpx;
  margin-top: 20rpx;
}

.no-sle {
  height: 1.84rem;
  align-items: center;
  justify-content: flex-start;
}

.er-circle {
  background-image: url("http://img.meiduduo.com/images/mine/nosel.png");
  background-size: contain;

  display: block;
  width: 0.36rem;
  height: 0.36rem;
  /* border: 2px solid rgba(191, 191, 191, 1);
  border-radius: 50%; */
}

.cart-active {
  background-image: url("http://img.meiduduo.com/images/mine/yessel.png");
}

.cart {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 20rpx;
  color: #555;
  font-size: 0.26rem;
  display: flex;
  flex-direction: column;
}

.cart-title {
  /* justify-content: space-between; */
  border-bottom: 1rpx solid #ccc;
  padding: 5px 0;
  align-items: center;
}

.cart-title .organ-icon {
  width: 0.4rem;
  height: 0.47rem;
  margin: 0 10px;
}

.cart-body {
  padding: 10px 0;
}

.cart-body img {
  width: 1.8rem;
  height: 1.84rem;
  margin: 0 10px;
}

.cart-body-title {
  width: 4.28rem;
  /* height: 0.61rem; */
}

.cart-body-title p:first-child span {
  font-size: 0.26rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
}

.all-money {
  color: #ff4691;
  font-weight: 400;
  margin: 10rpx 0;
  font-style: normal;
}

.all-money span:nth-child(2) {
  font-size: 0.35rem;
  font-weight: 700;
}

.server-list {
  justify-content: space-between;
}

.server-list .icon-title {
  /* display: block; */
  /* width: 0.32rem;
  height: 0.32rem; */
  padding: 0 10rpx;
  background: rgba(250, 151, 230, 1);
  border-radius: 4px;
  color: #fff;
}

.icon-box {
  align-items: center;
}

.icon-box span:not(:nth-child(1)) {
  margin-left: 10rpx;
}

/*两行超出显示。。。。*/
.mui-ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
</style>
