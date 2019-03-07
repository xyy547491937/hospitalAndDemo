<template>
	<div class="basic">
    <div id="nolist" v-if="stores.length == 0">
    <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
	</div>
		<div style="background-color: #FFFFFF;">
		<div class="item" >
			<div class="item-top" @click="jump(store.organId)" v-for="(store,index) in stores" :key="index">
				<div class="item-img">
					<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" > -->
					<img :src="store.logo" >
				</div>
				<div class="info">
					<div class="info-title">{{store.organName}}</div>
					<div class="info-addr">{{store.address}}</div>
					<div class="balance">
						<div class="balance-title">可用余额</div>
						<div class="balance-money">￥{{store.balance + store.rechargeMoney }}</div>
						<div class="info-money">
							<div class="info-money-title">剩余余额：￥{{store.balance}}</div>
							<div class="info-money-two">增值金：￥{{store.rechargeMoney}}</div>
						</div>
					</div>
					<div class="info-bottom">服务项目：<span>{{store.chineseName}}</span></div>
				</div>
			</div>
			<!-- <div class="item-top">
				<div class="item-img">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" >
				</div>
				<div class="info">
					<div class="info-title">石家庄贵美人医疗美容医院</div>
					<div class="info-addr">石家庄新华区</div>
					<div class="balance">
						<div class="balance-title">可用余额</div>
						<div class="balance-money">￥2000</div>
						<div class="info-money">
							<div class="info-money-title">剩余余额：￥6000</div>
							<div class="info-money-two">增值金：￥2000</div>
						</div>
					</div>
					<div class="info-bottom">服务项目：<span>脱毛</span></div>
				</div>
			</div> -->

		</div>
		</div>
    <div v-if="isOver && stores.length > 0">
      <load-over classs="list_over"></load-over>
    </div>
	</div>
</template>

<script>
import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件
export default {
  data() {
    return {
      loaded: false,
      custId: "",
      pageNum: 1,
      peopleId: '',
      stores: [],
      isOver: false
    };
  },
  components: {
    "load-over": loadOver
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getList(this.pageNum);
    }
  },
  onPullDownRefresh(){
    this.pageNum = 1
    this.isOver = false
    this.stores = []
    this.getList(1);
    wx.stopPullDownRefresh()
  },
  onLoad() {
    this.loaded = false
    this.loaded= false
    this.custId = this.$store.state.userInfo.custId;
    this.peopleId = this.$store.state.userInfo.peopleId;
    this.getList(1);
  },
  computed:{
    httpUrl(){
      return this.$store.state.httpUrl
    }
  },
  methods: {
    jump(organId) {
      this.$router.push({
        path: "/pagesMine/storeDetail?organId=" + organId
      });
    },
    getList(pageNum) {
      this.$http
        .post(this.httpUrl + '/his/serviceEvaluation/getArrivedShop', {
          peopleId: this.peopleId,
          pageNum,
          pageSize: 15
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let a = res.data.data ? res.data.data : [];
            if (res.data.pageNum == 1) {
              this.stores = a;
            } else {
              this.stores = this.stores.concat(a);
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
    }
  }
};
</script>

<style scoped>
.info-bottom {
  font-size: 0.24rem;
  color: #bababa;
  margin: 0.1rem 0;
}
.info-bottom span {
  color: #333;
}
.info-money {
  font-size: 0.24rem;
  background-color: #eeeeee;
  margin-top: 0.05rem;
  padding: 0.1rem 0.2rem;
}
.info-money-title {
  display: inline-block;
  margin-right: 0.2rem;
}
.info-money-two {
  display: inline-block;
}
.balance-money {
  display: inline-block;
  font-size: 0.24rem;
  color: #ff4691;
  margin-left: 0.2rem;
}
.balance-title {
  font-size: 0.24rem;
  color: #c0c0c0;
  display: inline-block;
}
.info {
  margin-left: 0.1rem;
}
.info-title {
  font-size: 0.32rem;
  font-weight: bold;
  margin: 0.1rem 0 0.2rem 0;
}
.info-addr {
  font-size: 0.24rem;
}
.basic {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
}

.item {
  width: 94%;
  margin-left: 3%;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  /* padding: 0.17rem 0.17rem 0.17rem 0; */
  border-bottom: 1px solid #eeeeee;
  padding:10rpx 0;
}
.item-top:last-child {
  border: none;
}
.item .item-img {
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
</style>
