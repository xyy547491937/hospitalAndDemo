<template>
  <div class="inputNumber">
    <!-- 数量加加 -->
    <div class="c-num" v-if="addNum">
      <span class="add-num" @click="addNumc(-1)">-</span>
      <input type="number" v-model="q.quantity">
      
      <span class="sub-num" @click="addNumc(1)">+</span>
    </div>
    <!-- 选择方案 -->
    <div class="sel" v-if="sel">
      <p class="flex-r co" @click="isShowType(0)">
        <span class="er-circle" :class="{'cart-active':isShow==0}"></span>
        <span class="c" :class="{'active-font':isShow==0}">
          全款付：
          <span>￥{{comm.rulePrice }}</span>
        </span>
      </p>
      <p class="flex-r co" @click="isShowType(1)">
        <span class="c er-circle" :class="{'cart-active':isShow==1}"></span>
        <!-- <span>{{hospitalPay}}</span> -->
        <span class="c" :class="{'active-font':isShow==1}">
          预付定金
          <span class="c">￥{{comm.depositPrice}}</span>
          <span class="c" style="margin-left:10px;color:#999;">
            到{{organType==1?"院":"店"}}再付：
            <span class="c">￥{{hospitalPay}}</span>
          </span>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sel", "addNum", "comm", "q", "issel", "organType"],
  data() {
    return {
      num: 1,
      isShow: 0
    };
  },
  mounted() {},
  onShow() {
    if (!this.q) {
      this.num = 1;
    }
  },
  computed: {
    changeNum() {
      if (this.q) {
        this.num = this.q.quantity;
      } else {
        this.num = 1;
      }
    },
    isSelShow() {
      if (this.issel) {
        this.isShow = this.issel == 1 ? 0 : 1;
      }
    },
    hospitalPay() {
      if (this.sel)
        return (this.comm.rulePrice - this.comm.depositPrice).toFixed(2);
    }
  },

  methods: {
    addNumc(n) {
      if (n > 0) {
        this.num++;
      } else {
        if (this.num <= 1) {
          this.num = 1;
        } else {
          this.num--;
        }
      }
      // console.log(this.q);

      if (this.q) {
        // console.log(this.q.id);
        this.$http
          .post("cart/save", {
            organId: this.q.organId,
            commodityId: this.q.commodityId,
            custId: this.$store.state.userInfo.custId,
            quantity: this.num,
            buyType: this.q.buyType,
            id: this.q.id
          })
          .then(res => {
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "操作成功",
                icon: "none"
              });
            }
          });

        this.$emit("addnum", { id: this.q.id, num: this.num });
      } else {
        this.$emit("addnum", this.num);
      }
    },
    isShowType(n) {
      this.isShow = n;
      this.$emit("payType", this.isShow == 0 ? "1" : "0");
    }
  }
};
</script>
<style scoped>
input {
  margin: 0;
  padding: 0;
  min-height: 0;
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
  padding-right: 0.3rem;
  /* width: 0.7rem; */
  border-left: none;
  border-right: none;
  border-radius: 0;
}
/* sle*/
.sel {
  /* margin-top: 30px; */
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.28rem;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}
.sel .co {
  line-height: 50rpx;
  align-items: center;
}
.co span:first-child {
  margin-right: 10px;
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
.active-font {
  color: #ff4691;
}
.flex-r {
  display: flex;
  flex-direction: row;
}
</style>

