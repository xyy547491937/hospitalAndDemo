<template>
    <div class="show-box" v-if="isShow">
         <view class="show-box-c" >
            <div class="set">
                <span class="cancle" @click="cancleBtn"> 取消</span>
                <span class="confirm" @click="confirmBtn"> 确定</span>
            </div>
          <!-- <view>{{year}}年{{month}}月{{day}}日</view> -->
          <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange($event)">
            <picker-view-column>
              <view v-for="item in years" style="line-height: 50px" :key="item">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in months" style="line-height: 50px" :key="item">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in days" style="line-height: 50px" :key="item">{{item}}日</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in hours" style="line-height: 50px" :key="item">{{item}}时</view>
            </picker-view-column>
             <picker-view-column>
              <view v-for="item in minutes" style="line-height: 50px" :key="item">{{item}}分</view>
            </picker-view-column>
          </picker-view>
        </view>
    </div>
</template>
<script>
export default {
  props: ["isShow"],

  data() {
    return {
      years: [],
      year: 2018,
      months: [],
      month: 2,
      days: [],
      day: 2,
      value: [],
      hours: [],
      hour: 0,
      minutes: [],
      minute: []
      //   isShow: true
    };
  },
  onShow() {
    this.getDefaultTime();
  },
  mounted() {
    this.showTime();
    // console.log(this.isShow);
    this.getDefaultTime();
  },
  methods: {
    getDefaultTime() {
      // console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
      const date = new Date();
      //默认时间
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const H = date.getHours();
      const Min = date.getMinutes();
      // console.log(M, D, H, Min);
      this.value = [0, M - 1, D - 1, H, Min];
    },
    showTime() {
      const date = new Date();
      const years = [];
      const months = [];
      const days = [];
      const hours = [];
      const minutes = [];
      const timer = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
      for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
        years.push(i);
      }
      // console.log(date.getMonth());
      for (let i = 1; i <= 12; i++) {
        if (i < 10) i = "0" + i;
        months.push(i);
      }

      for (let i = 1; i <= 31; i++) {
        if (i < 10) i = "0" + i;
        days.push(i);
      }
      for (let i = 0; i <= 23; i++) {
        if (i < 10) i = "0" + i;
        hours.push(i);
      }
      for (let i = 0; i <= 59; i++) {
        if (i < 10) i = "0" + i;
        minutes.push(i);
      }
      this.years = years;
      this.months = months;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
    },
    confirmBtn() {
      this.isShow = false;
      this.$emit("changeShow", this.isShow);
    },
    cancleBtn() {
      this.isShow = false;
      this.$emit("changeShow", this.isShow);
    },
    getCountDays(time) {
      var curDate = new Date(time);
      /* 获取当前月份 */
      var curMonth = curDate.getMonth();
      // console.log(curMonth);
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1);
      /* setDate 传0 返回上个月的天数 eg setDate(2018,2,0)* 二月份的天数/
      curDate.setDate(0);
      /* 返回当月的天数 */
      return curDate.getDate();
    },
    mGetDate(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    bindChange({ mp }) {
      this.value = mp.detail.value;
      this.year = this.years[this.value[0]];
      this.month = this.months[this.value[1]];
      this.day = this.days[this.value[2]];
      this.hour = this.hours[this.value[3]];
      this.minute = this.minutes[this.value[4]];
      let time = `${this.year}-${this.month}-${this.day} ${this.hour}:${
        this.minute
      }:00`;
      let D = [];
      for (let i = 1; i <= 31; i++) {
        if (i < 10) i = "0" + i;
        D.push(i);
      }

      this.days = D.splice(0, this.mGetDate(this.year, this.month));

      this.$emit("selTime", time);
    }
  }
};
</script>
<style>
.show-box {
  z-index: 10;
  box-shadow: 0 0 16rpx 0 #ccc;
  border-top: 1rpx solid #eee;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.show-box-c {
  padding: 10px 15px;
}
.show-box .set {
  font-size: 14px;
  color: #72ace3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

