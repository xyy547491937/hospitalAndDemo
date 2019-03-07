<template>
  <div class="inputNumber">
    <!-- 数量加加 -->
    <div class="c-num">
      <span class="add-num" @click="addNumc(-1)">-</span>
      <input type="number" v-model="num">
      <span class="sub-num" @click="addNumc(1)">+</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isShow: 0
    };
  },
  mounted() {},
  onShow() {
    if (!this.q) {
      this.num = 1;
    }
  },
  computed: {},

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
      this.$emit("addnum", this.num);
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

