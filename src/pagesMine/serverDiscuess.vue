<template>
  <div class="c server-discuess">
    <div class="tab">
      <!-- 引入组件 -->
      <tab :titledata="nav" @clickactive="clickactive"></tab>
    </div>
    <div class="co">
      <!-- 引入组件 -->
      <serverDiscuessList :rateArr="rateArr" :isDisabled="false" @isRefrensh="isRefrensh"></serverDiscuessList>
    </div>
    <!-- <div class="no_data" v-if="rateArr.length < 1">
			<p>没有数据</p>
    </div>-->
    <!-- <div class="over_banner" v-if="isOver && rateArr.length > 0">
			<p>数据加载完毕</p>
    </div>-->
    <div id="nolist" v-if="rateArr.length <= 0">
      <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
  </div>
</template>
<script>
import tab from "./../pages/comm/tab";
import serverDiscuessList from "./comm/serverDiscuessList";
export default {
  data() {
    return {
      loaded: false,
      nav: [
        // {
        //   title: "全部",
        //   badgeNum: "3"
        // },
        {
          title: "待评价",
          badgeNum: ""
        },
        {
          title: "已评价",
          badgeNum: ""
        }
      ],
      count: 5,
      startIndex: 1,
      discuessText: "",
      stating: {},
      rateArr: [],
      isRequest: false,
      pageNum: 1,
      pageSize: 15,
      eState: 0,
      isOver: true
    };
  },
  components: {
    tab,
    serverDiscuessList
  },
  onShow() {
    this.loaded = false
    this.rateArr = [];
    this.getDiscuess();
  },
  mounted() {
    // this.getDiscuess();
  },

  onReachBottom() {
    if (!this.isOver) {
      this.getDiscuess(this.eState);
    }
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },
  methods: {
    getDiscuess(evaluationState = 0) {
      this.$http
        .post(this.httpUrl + "/basics/basicServiceEvaluation/list4Page", {
          evaluationState,
          peopleId: this.$store.state.userInfo.peopleId, //2882
          isShop: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            // conosle.log(this.rateArr);
            let a = res.data.data;
            a.forEach(v => {
              this.$set(v, "qt", "");
              this.$set(v, "wt", "");
              this.$set(v, "et", "");
            });
            if (res.data.pageNum == 1 || res.data.pageNum == 0) {
              this.rateArr = a;
            } else {
              this.rateArr = this.rateArr.concat(a);
            }
            this.loaded = true
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
            //遍历赋值
            this.rateArr.forEach(v => {
              this.$set(v, "isShow", 0);
              v.children.forEach(el => {
                console.log(el.starNum);
                if (el.starNum == null || el.starNum == 0) {
                  this.$set(el, "discuessText", "");
                } else {
                  this.$set(el, "discuessText", this.iswei(el.starNum));
                }
              });
            });
          }
        });
    },
    iswei(index) {
      index = Number(index);
      switch (index) {
        case 1:
          return "差";

        case 2:
          return "一般";

        case 3:
          return "一般";
        case 4:
          return "好";
        case 5:
          return "很好";
        default:
          return "很差";
      }
    },
    clickactive(msg) {
      this.loaded = false
      this.stating = msg;
      //   console.log(this.stating);
      switch (this.stating.title) {
        case "全部":
          this.getDiscuess();
          break;
        case "待评价":
          this.getDiscuess();
          this.eState = 0;
          break;
        default:
          this.getDiscuess(1);
          this.eState = 1;
          break;
      }
    },
    isRefrensh(msg) {
      this.isRequest = msg;
      if (this.isRequest) {
        this.getDiscuess();
        return false;
      }
    }
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.isOver = false;
    this.rateArr = [];
    this.getDiscuess(this.eState);
    wx.stopPullDownRefresh();
  }
};
</script>
<style>
.tab {
  height: 87rpx;
}
.server-discuess {
  /* padding: 0 0.5rem; */
  font-size: 0.24rem;
  color: #333;
  font-family: PingFangSC-Medium;
  /* padding-top: 10px; */
  background: #f5f5f5;
}
.over_banner {
  font-size: 20rpx;
  color: #666666;
  text-align: center;
  padding: 17rpx;
}
.no_data {
  width: 100%;
  height: 900rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
