<template>
	<div class="gain">
			<div  v-if="orderList!=''" class="reserva_title">
				共 <span style="color: #FF4691;">{{orderList.length}}</span> 条预约
			</div>
			<div class="reserva_main">
				<div v-if="orderList!=''">
					<div v-for="(item, index) in orderList" :key="index" class="itemclass">
						<div class="rowKuang">
							<div  class="rowTitle" >
								<i-row >
									<i-col span="12">预约码：{{item.reservationServiceCode}}</i-col>
									<i-col span="12" class="rowTitle-right">{{item.createDate}} </i-col>
								</i-row>
							</div>
							<div class="row-two">
								<i-row >
									<i-col span="20" class="row-two-lift">{{item.organName}}</i-col>
									<!-- <i-col span="4" class="row-two-right">待使用 </i-col> -->
								</i-row>
							</div>
							<div class="row-three">

									<div class="row-three-left">预约项目：<span>{{item.appointmentProjectName}}</span></div>
									<!-- <div class="row-three-left">预约医师：<span>{{item.}}</span></div> -->
									<div class="row-three-left">到店时间：<span>{{item.appointmentTime}}</span></div>

							</div>
							<div class="numb">预约码：{{item.reservationServiceCode}}</div>
							<div class="reserva_consulting">
								<span @click="callPhone(item)"><img src="http://img.meiduduo.com/images/mineItem/my1.png"/><em>电话咨询</em></span>
								<div class="consul_tel" >
									<img  src="http://img.meiduduo.com/images/mineItem/my3.png"/>
									<!-- <span>在线咨询</span> -->
									<button class="customer_service" open-type="contact">在线咨询</button>
								</div>
								<div class="cancel_service">
									<span @click="visibleMth(item,index)"><img src="http://img.meiduduo.com/images/mineItem/my2.png"/><em>取消预约</em></span>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
      <div id="nolist" v-if="orderList.length==0">
          <div  class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
      </div>
      <i-modal title="取消确认" :visible="visible" :actions="actions" @iclick="handleClick">
        <view>确认取消预约？</view>
      </i-modal>
	</div>
</template>

<script>
// import reservaList from '../reserva_index'
export default {
  data() {
    return {
      loaded: false,
      title: "我的预约",
      orderList: "",
      beforePath: "/mine",
      orderList: [],
      delItem: {},
      delIndex: '',
      visible: false,
      actions: [
        {
          name: "取消"
        },
        {
          name: "确定",
          color: "#ed3f14",
          loading: false
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  onPullDownRefresh() {
    this.getList();
    wx.stopPullDownRefresh();
  },
  onLoad() {
    this.loaded = false
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .post("preregistration/list", {
          peopleId: this.user.peopleId
        })
        .then(res => {
          this.orderList = res.data;
          this.loaded = true
        });
    },
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item.tel, //此号码并非真实电话号码，仅用于测试
        success: function() {},
        fail: function() {}
      });
    },
    visibleMth(item,index) {
      this.visible = true;
      this.delItem = item;
      this.delIndex = index
    },
    handleClick({mp}) {
      if (mp.detail.index === 0) {
        this.visible = false
      } else {
        this.del()
      }
    },
    del() {
      this.$http.post("/preregistration/delete", { id: this.delItem.id }).then(res => {
        if (res.code == 1) {
          this.orderList.splice(this.delIndex, 1);
          this.visible = false
          wx.showToast({
            title: res.msg
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.rowKuang {
  font-size: 0.24rem;
  width: 94%;
  margin-left: 3%;
  /* border-bottom: #EEEEEE solid 1px; */
}
.rowTitle {
  color: #b0b0b0;
  border-bottom: #eeeeee solid 1px;
  padding: 0.2rem 0;
}
.row-two {
  margin: 0.2rem 0;
}
.row-two-lift {
  font-size: 0.3rem;
  font-weight: bold;
}
.row-two-right {
  color: #ff5e9f;
  text-align: right;
  font-size: 0.24rem;
}
.row-three {
  font-size: 0.26rem;
}
.row-three-left {
  padding-top: 0.1rem;
}
.row-three-left span {
  color: #aeaeae;
}
.itemclass {
  background: #ffffff;
  margin-bottom: 0.2rem;
}
.rowTitle-right {
  text-align: right;
}
.numb {
  margin: 0.66rem;
  background-color: #eeeeee;
  font-size: 0.36rem;
  font-weight: bold;
  padding: 0.48rem 0.84rem;
}
.gain {
  background-color: #f5f5f5;
  position: relative;
  top: 0;
  left: 0;
}
.reserva_title {
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  text-align: center;
  font-size: 0.24rem;
  border-top: solid #eeeeee 1px;
  border-bottom: solid #eeeeee 1px;
  position: fixed;
  z-index: 10;
}
.reserva_main {
  padding-top: 94rpx;
}
.reserva_consulting {
  width: 100%;
  border-top: 1px solid #eeeeee;
  font-size: 0.24rem;
  padding-bottom: 0.2rem;
  display: flex;
  align-items: center;
}

.reserva_consulting > span,
.cancel_service > span {
  padding: 0.06rem 0.2rem;
  display: inline-block;
  border: 1px solid #cccccc;
  border-radius: 0.3rem;
  margin-top: 0.15rem;
}

.reserva_consulting > span:last-child,
.cancel_service > span:last-child {
  float: right;
}

.reserva_consulting > span:first-child > img {
  width: 0.2rem;
  height: 0.32rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
}
.consul_tel {
  padding: 0.06rem 0.2rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 0.3rem;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
}
.reserva_consulting > .consul_tel > img {
  width: 0.3rem;
  height: 0.28rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
  display: inline-block;
  /* margin-top: 0.02rem; */
}

.reserva_consulting > span:last-child > img,
.cancel_service > span:last-child > img {
  width: 0.2rem;
  height: 0.25rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
}

.reserva_consulting > span:last-child > em,
.reserva_consulting > span:first-child > em,
.cancel_service > span:last-child > em {
  /* float: right; */
  display: inline-block;
}

.customer_service {
  padding: 0;
  background: #fff;
  font-size: 24rpx;
  height: 33rpx;
  line-height: 1.5;
}
.customer_service::after {
  border: 0;
}
.cancel_service {
  flex: 1;
}

/**页面宽度**/
/* .header {
		position: fixed;
		top: 0;
		left: 0;
		background: url(/static/img/tabbar/top_bg.png) no-repeat;
		background-size: 100% 100%;
		z-index: 88;
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
	}


	.header-l,
	.header-r {
		font-size: 0.25rem;
		text-align: left;
		padding-left: 0.1rem;
	}

	.header-l,.header-r {
		width: 2rem;
		color: #ffffff;
		font-size: 0.26rem;
	}

	.header-c{
		width:100%;
		height: 0.9rem;
		text-align: center;
		color: #ffffff;
		font-size: 0.32rem;
	}

	.reserva_main{
		margin-top: 1.27rem;
	}


	.reserva_title>span{
		color: #FF4691;
		padding: 0 0.1rem;
	}
*/
</style>
