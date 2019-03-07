<template>
  <div class="all-on">
    <tab :titledata="nav" @clickactive="clickactive"></tab>
    <div class="exchangeList">
      <exchange :list="list"></exchange>
    </div>
     <div id="nolist" v-if="list.length==0">
				<div  class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
		</div>
    <div style="background: #fff;" v-if="isOver && list.length > 0">
      <load-over classs="list_over"></load-over>
    </div>
  </div>
</template>

<script>
import tab from "../pages/comm/tab.vue";
import exchange from "../pages/comm/exchange.vue";
import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件
export default {
  data () {
    return {
      loaded: false,
      nav:[
        {
          title: "全部",
          badgeNum: 0
        },
        {
          title: "已兑换",
          badgeNum: 1
        },
        {
          title: "已过期",
          badgeNum: 3
        },
        {
          title: "已核销",
          badgeNum: 2
        }
      ],
      onclick: 0,
      pageNum: 1,
      list: [],
      custId: '',
      isOver: false
    }
  },
  components: {
    tab,
    exchange,
    loadOver
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.list = [];
    this.isOver = false;
    this.getList(this.onclick);
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getList(this.onclick);
    }
  },
  onShow() {
    this.loaded = false
    this.custId = this.$store.state.userInfo.custId
    this.getList(this.onclick)
  },
  methods: {
    getList(onclick) {
      this.$http.post("/pointOrder/list4Page", {
        custId: this.custId,
        poState: onclick == 0 ? '' : onclick,
        pageNum: this.pageNum,
        pageSize: 15
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.loaded = true
          if (res.data.data.length == 0) {
            this.list = [];
            this.pageNum = 1;
            this.isOver = false;
          } else {
            res.data.data.forEach(ele => {
              ele.commImg = ele.commImg.split(',')
              if(ele.endTime){
                var end = new Date(ele.pointActivityEndTime +' '+ ele.endTime)
                var date = new Date(); //时间对象
                var str = date.getTime(); //转换成时间戳
                var str1 = end.getTime();
                if (str1>str) {
                  ele.isNoShow = true
                } else {
                  ele.isNoShow = false
                }
              }
            });
            let a = res.data.data;
            console.log(a)
            if (res.data.pageNum == 1) {
              this.list = a;
            } else {
              this.list = this.list.concat(a);
            }
            if (
              this.pageNum == res.data.pages ||
              (a && a.length < this.pageSize)
            ) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
          }
        }
      });
    },
    clickactive(out) {
      this.loaded = false
      this.onclick = out.badgeNum;
      this.getList(this.onclick)
    },
  }
}
</script>

<style scoped>
.all-on{
  padding-top: 90rpx;
  height:100%;
  box-sizing:border-box;
  background:#f5f5f5;
}
.exchangeList{
  overflow: hidden;
  background: #eee;
}
</style>
