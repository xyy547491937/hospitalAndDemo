<template>
  <div class="carousel">
    <swiper
      class="carousel-swiper"
      autoplay
      circular>
      <swiper-item
        v-for="(item, index) of cData"
        class="carousel-swiper-item"
        :key="index">
        <div class="carousel-swiper-img-box" @click="advertJump(item)">
          <img class="carousel-swiper-img-item" mode="aspectFill" :src="item.pictureUrl" alt>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ["cWidth", "cHeight", "imgData", "typeclass"],
  data() {
    return {
      imgBoxLeft: 0,
      i: 0,
      timer: null,
      data: [],
      transitionValue: "left 1s", // css 过渡的值
      touchDot: null, // 触摸点
      time: 0,
      done: false,
      interval: null,
      timeOuter: null,
      timeOuterTwo: null
    };
  },
  mounted() {
    console.log("mounted");
    // this.timerStart();
    console.log(this.cData);
  },
  // onShow () {
  //   console.log('onShow')
  //   this.timerStart()
  // },
  // onUnload () {
  //   clearInterval(this.timer)
  //   this.timer = null
  //   clearTimeout(this.timeOuter)
  //   this.timeOuter = null
  //   clearTimeout(this.timeOuterTwo)
  //   this.timeOuterTwo = null
  //   this.init()
  // },
  // onHide () {
  //   console.log('onHide')
  // },
  computed: {
    cData() {
      let a = this.imgData;
      // a.push(a[0])
      // a.push(a[1])
      return a;
    },
    classs() {
      return this.typeclass;
    }
  },

  methods: {
    advertJump(item) {
      this.$emit("advertGo", item);
    },
    dealLeft() {
      if (this.i == this.cData.length - 1) {
        this.transitionValue = "left 0.5s";
        this.imgBoxLeft = 0;
        this.i = 0;
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(this.dealLeft, 2500);
      } else {
        this.transitionValue = "left 1s";
        this.i++;
        this.imgBoxLeft = -(this.cWidth + 30) * this.i;
      }
    },
    timerStart() {
      this.timer = setInterval(this.dealLeft, 2500);
    },
    timerEnd() {
      clearInterval(this.timer);
      this.timer = null;
    },
    init() {
      this.imgBoxLeft = 0;
      this.i = 0;
      this.timer = null;
      this.timeOuter = null;
      this.timeOuterTwo = null;
      this.data = [];
      this.transitionValue = "left 1s";
    },
    touchstart(event) {
      // 触摸开始
      this.timerEnd();
      console.log(event.touches[0].pageX);
      console.log(event);
      let self = this;
      this.touchDot = event.touches[0].pageX;
      this.interval = setInterval(function() {
        self.time += 1;
      }, 100);
      // this.transitionValue = ''
      // this.i = Number(event.currentTarget.id) + 1
      // this.timer = setInterval(this.dealLeft, 2500)
    },
    touchmove(event) {
      let self = this;
      let touchMoveValue = event.touches[0].pageX;
      let touchDot = this.touchDot;
      let time = this.time;
      clearTimeout(this.timeOuter);
      this.timeOuter = null;
      clearTimeout(this.timeOuterTwo);
      this.timeOuterTwo = null;
      if (touchMoveValue - touchDot <= -40 && time < 10 && !this.done) {
        console.log("向左滑动");
        this.done = true;
        if (this.i >= this.cData.length - 2) {
          this.transitionValue = "";
          this.imgBoxLeft = 0;
          this.i = 0;
          this.timeOuter = setTimeout(function() {
            self.transitionValue = "left 1s";
          }, 50);
          this.timeOuterTwo = setTimeout(function() {
            self.i++;
            self.imgBoxLeft = -(self.cWidth + 30) * self.i;
          }, 100);
        } else {
          this.transitionValue = "left 1s";
          this.i++;
          this.imgBoxLeft = -(this.cWidth + 30) * this.i;
        }
      }
      if (touchMoveValue - touchDot >= 40 && time < 10 && !this.done) {
        console.log("向右滑动");
        this.done = true;
        if (this.i == 0) {
          this.transitionValue = "";
          this.imgBoxLeft = -(this.cWidth + 30) * (this.cData.length - 2);
          this.i = this.cData.length - 2;
          this.timeOuter = setTimeout(function() {
            self.transitionValue = "left 1s";
          }, 50);
          this.timeOuterTwo = setTimeout(function() {
            self.i--;
            self.imgBoxLeft = -(self.cWidth + 30) * self.i;
          }, 100);
        } else {
          this.transitionValue = "left 1s";
          this.i--;
          this.imgBoxLeft = -(this.cWidth + 30) * this.i;
        }
      }
    },
    touchend() {
      // 触摸结束
      clearInterval(this.interval);
      this.interval = null;
      this.time = 0;
      this.done = false;
      this.timerStart();
      // console.log(this.i)
      // this.imgBoxLeft = -(this.cWidth + 30) * this.i
    },
    touchItem() {
      console.log(this.i);
      // 如果i = this.cData.length - 2 ，此时活跃的是第一张图片
      // if (this.i == this.cData.length - 2) {
      //   this.i = 0
      // }
    }
  }
};
</script>

<style scoped>
.carousel {
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: transparent;
  position: relative;
}
.carousel-swiper {
  width: 100%;
  height: 400rpx;
}
.carousel-swiper-item {
  width: 670rpx !important;
}
.carousel-swiper-img-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 30rpx;
}
.carousel-swiper-img-item {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}
</style>
