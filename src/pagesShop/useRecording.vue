<template>
  <div class="vo">
    <div class>
      <div class="total-use">
        <p class="c">共使用{{totalUse}}份</p>
      </div>

      <div class="use-list" v-for="(v,i) in useArr" :key="i">
        <div class="flex-r pro-detail">
          <div class="img-box flex-r">
            <img :src="v.commodityImg" alt mode="widthFix">
          </div>
          <div class="use-remark flex-r">
            <p class="xyy-ellipsis-2">
              <span class="bold">[{{v.commodityName}}］</span>
              <span class="remark">{{v.remark}}</span>
            </p>
          </div>
        </div>
        <!-- 时间 -->
        <div class="pay-date flex-r">
          <p>
            <span>消费时间：</span>
            <span class="c">{{v.createDate}}</span>
          </p>
          <p>使用{{v.vertifyNum}}份</p>
        </div>
      </div>
      <loadOver v-if="isOver"/>
      <!-- 没有数据 -->
      <div id="nolist" v-if="useArr.length <= 0">
        <div
          class="noData-mode"
          :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
// 4396
import loadOver from "../pages/comm/loadOver.vue";
export default {
  data() {
    return {
      loaded: false,
      pageNum: 1,
      pageSize: 15,
      useArr: [],
      isOver: false,
      total: 0,
      totalUse: 0
    };
  },
  components: {
    loadOver
  },
  computed: {},
  onShow() {
    this.loaded = false;
    this.getUseList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.pageNum = 1;
    this.useArr = [];
    this.getUseList();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.isOver) {
      this.pageNum++;
      this.getUseList();
    }
  },
  methods: {
    getUseList() {
      this.$http
        .post("vertifyOrderRecord/list4PageForApp", {
          custId: this.$store.state.userInfo.custId, //49, //
          orderId: this.$route.query.id,
          pageSzie: this.pageSize,
          pageNum: this.pageNum
        })
        .then(res => {
          // console.log(res);
          this.loaded = true;
          if (res.code == 1) {
            if (res.data.data.length > 0) {
              this.totalUse = res.data.data[0].vertifyNumTotal;
            } else {
              this.totalUse = 0;
            }

            this.total = res.data.total;
            var a = res.data.data;
            if (
              this.pageNum == 1 &&
              this.pageNum * this.pageSize >= this.total
            ) {
              this.useArr = a;
              this.isOver = true;
              return false;
            }
            if (this.pageNum * this.pageSize < res.data.total) {
              this.useArr = this.useArr.concat(a);
              this.isOver = false;
            } else {
              this.useArr = this.useArr.concat(a);
              this.isOver = true;
            }
          }
        });
    }
  }
};
</script>
<style lang="less">
#nolist {
  top: 60px;
}
@fz: 13px;
.baseConfig {
  font-size: @fz;
  background-color: @base-white;
  padding: 15px;
}
.total-use {
  // &:extend(.baseConfig);
  color: @baseTextColor-c;
  font-size: @fz+1;
  padding: 0 15px;
  background-color: @base-white;
  & > p {
    padding: 15px 0;
    border-bottom: 1rpx solid #f5f5f5;
  }
}

.use-list {
  &:extend(.baseConfig);
  margin-bottom: 10px;

  & > .pro-detail {
    color: @baseFirstTitleColor;
    border-bottom: 1px solid #f5f5f5;
    & > .img-box {
      //   align-items: center;

      min-width: 60px;
      height: 60px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    & > .use-remark {
      margin-left: 15px;
      line-height: 20px;
      flex-wrap: wrap;
      & > p {
        & > .bold {
          font-weight: bold;
        }
        & > .remark {
          color: @baseFirstTitleColor;
        }
      }
    }
  }
  & > .pay-date {
    justify-content: space-between;
    color: @baseTextColor-c;
    &:extend(.baseConfig);
    padding-bottom: 0;
    padding-left: 0;
  }
}
</style>
