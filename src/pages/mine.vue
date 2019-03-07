<template>
	<div class="mine">
		<div class="qrcode-box" v-show="qrcodeShow" @click="hideQrcode">
			<div class="p-container">
				<div class="p-outer">
					<img src="http://img.meiduduo.com/images/mine/user2.png" alt="">
					<div class="p-box">
						<div class="p-name">昵称</div>
						<div class="p-city">石家庄</div>
					</div>
				</div>
				<img class="qrcode-img" :src="qrcodeSrc" alt="">
				<p class="p-tip">扫描二维码即可查看诊疗信息</p>
			</div>
		</div>
      <div class="banner"  :style="{backgroundImage: 'url(' + banner1 + ')'}">
			<div class="banner-title">
				<!-- <div  class="ball">
					<img class="alarm" src="../../static/images/mine/alarm2.png" alt="">
				</div>  -->
				<div class="ball" @click="showQrcode">
					<img class="qrcode"   src="http://img.meiduduo.com/images/mine/xiaoxi_icon.png?10" alt="">
				</div>
			</div>
			<div class="person">
				<span class="pimg">
					<!--↓ formidcollect -->
						<!-- <form @submit="createFormids" report-submit="true"> -->
							<!-- <button plain="true" formType="submit" class="hideform"> -->
					<!--↑ formidcollect -->
								<img @click="codeBtn" :src="user.avatarUrl">
					<!--↓ formidcollect -->
							<!-- </button> -->
						<!-- </form> -->
					<!--↑ formidcollect -->
				</span>
				<span class="nickName ellipsis">{{user.nickName}}</span>
            <span class="qiandao" @click.stop="changeJump('/pagesMine/integrateSearch')">签到</span>
				<!-- <div>600积分</div> -->
			</div>
			<!--fmc子组件收集formid 2018年9月14日 15:14:30 zx  -->
			<!-- <fmc ref="fmc"></fmc> -->
		</div>
    <div class="content-top">
      <div class="top-box">
        <div class="top-item" @click="changeJump('/pagesMine/myInvitation')">
          <div class="title">账户余额(元)</div>
          <div class="txt">{{account}}</div>
        </div>
        <div class="top-item" @click="changeJump('/pagesMine/integrateSearch')">
          <div class="title">豆芽</div>
          <div class="txt">{{point}}</div>
        </div>
        <div class="top-item" @click="changeJump('/pagesShop/myCoupon')">
          <div class="title">优惠券</div>
          <div class="txt">{{couponNum}}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="bkContent">
        <div class="content-item">
          <div class="box boxtop">
            <div
              class="box-item"
              v-for="(item, index) in mine"
              :key="index"
              @click="item.toUrl ? changeJump(item.toUrl): null"
            >
              <div class="item-top">
                <div class="badge-box">
                  <img :src="item.src" alt>
                  <span class="badge" v-if="index==1 && signNum > 0">{{signNum}}</span>
                </div>
              </div>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
        <div class="content-item jfBoard" @click="changeJump('/pagesShop/pointsMall')">
          <div class="boardL">
            <span class="top">积分商城</span>
            <span class="btm">赚积分 兑好礼 享优惠</span>
          </div>
          <div class="boardR" @click.stop="changeJump('/pagesShop/allOn')">兑换记录</div>
        </div>
        <div class="content-item">
          <div class="box-title">
            <span>我的订单</span>
            <div class="arrow" @click.stop="goJump('/pagesMine/myOrder', '全部')">
              <span>全部订单</span>
              <i-icon style="display:flex;align-item:center;" type="enter" size="16"></i-icon>
            </div>
          </div>
          <div class="box">
            <div
              class="box-item"
              @click.stop="goJump('/pagesMine/myOrder', item.name)"
              v-for="(item, index) in navArr"
              :key="index"
            >
              <div class="item-top">
                <div class="badge-box">
                  <img :src="item.src" alt>
                  <span class="badge" v-if="index==0 && orderNum > 0">{{orderNum}}</span>
                </div>
                <!-- <img :src="item.src" alt=""> -->
              </div>
              <p>
                {{item.name}}
                <span v-if="item.num !=''">{{item.num}}</span>
                <!-- <span v-if="index==0" style="color:#FF4691;font-size:26rpx">1</span> -->
              </p>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="box">
            <div
              class="box-item"
              style="padding-bottom:20rpx"
              v-for="(item, index) in item"
              :key="index"
              @click="item.toUrl ? changeJump(item.toUrl): null"
            >
              <div class="item-top">
                <img :src="item.src" alt>
              </div>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loginsuccess :item="getPacketData"></loginsuccess>
    <!-- <mine-mask v-if="isMask"></mine-mask>
		<code-mask v-if="isCode" @codeMain="codeMain" :icon="personal.icon"></code-mask>
    <dialogList v-if='dialogMask' :dialogC='dialogContent'></dialogList>-->
  </div>
</template>

<script>
// 	import mineMask from "./sign_in"
// 	import codeMask from "./qr_code"

// import fmc子组件收集formid 2018年9月14日 15:15:08 zx
// import fmc from "./comm/formIdCollector.vue";
import loginsuccess from "./comm/loginSuccess.vue";
export default {
  components: {
    loginsuccess
  },
  data() {
    return {
      mine: [
        {
          name: "我的预约",
          src: "http://img.meiduduo.com/images/mine/item1.png?7",
          toUrl: "/pagesMine/myAppoint",
          badge: "",
          imgUrl: ""
        },
        {
          name: "手签确认",
          src: "http://img.meiduduo.com/images/mine/item4.png?7",
          toUrl: "/pagesMine/signatureList",
          badge: "",
          imgUrl: ""
        },
        {
          name: "服务评价",
          src: "http://img.meiduduo.com/images/mine/item11.png?7",
          toUrl: "/pagesMine/serverDiscuess",
          badge: "",
          imgUrl: ""
        }
      ],
      navArr: [
        {
          name: "待付款",
          src: "http://img.meiduduo.com/images/mine/nav1.png?7",
          num: ""
        },
        {
          name: "待使用",
          src: "http://img.meiduduo.com/images/mine/nav2.png?7",
          num: ""
        },
        {
          name: "待评价",
          src: "http://img.meiduduo.com/images/mine/daipingjia.png?7",
          num: ""
        },
        {
          name: "退款",
          src: "http://img.meiduduo.com/images/mine/tuikuan.png?7",
          num: ""
        }
      ],
      item: [
        {
          name: "用户确认",
          src: "http://img.meiduduo.com/images/mine/shouyin.png?7",
          toUrl: "/pagesMine/cashier",
          badge: "",
          numIn: ""
        },
        {
          name: "我的收藏",
          src: "http://img.meiduduo.com/images/mine/item12.png?7",
          toUrl: "/pagesMine/collect",
          badge: "",
          numIn: ""
        },
        {
          name: "我的关注",
          src: "http://img.meiduduo.com/images/mine/item13.png?7",
          toUrl: "/pagesMine/myAttention",
          badge: "",
          numIn: ""
        },
        {
          name: "去过的店",
          src: "http://img.meiduduo.com/images/mine/item8.png?7",
          toUrl: "/pagesMine/myStore",
          badge: "",
          numIn: ""
        },
        {
          name: "全民领钱",
          src: "http://img.meiduduo.com/images/quanmin/qm_5.png",
          toUrl: "/pagesMine/allPeopleGetMoney",
          badge: "",
          numIn: ""
        },
        {
          name: "我的反馈",
          src: "http://img.meiduduo.com/images/xyy/marvel_icon_2.png",
          toUrl: "/pagesMine/myComplaints",
          badge: "",
          numIn: ""
        },

        {
          name: "关于我们",
          src: "http://img.meiduduo.com/images/mine/aboutus.png?7",
          toUrl: "/pagesMine/aboutUs",
          badge: "",
          numIn: ""
        },
        // {
        //   name: "扫码领红包",
        //   src: "http://img.meiduduo.com/images/mine/aboutus.png?7",
        //   toUrl: "/pagesMine/collarRedEnvelope",
        //   badge: "",
        //   numIn: ""
        // },
        // {
        //   name: '登录页',
        //   src: "http://img.meiduduo.com/images/mine/aboutus.png?7",
        //   toUrl: "/pagesShow/global/authorizationOne",
        //   badge: "",
        //   numIn: ""
        // }
      ],
      isMask: false,
      isCode: false,
      signNum: 0,
      orderNum: 0,
      personal: [],
      iconUrl: "",
      listParames: {
        areaId: 37,
        isRecommend: "Y"
      },
      pointNum: 0,
      dialogMask: false,
      dialogContent: "",
      signText: "",
      qrcodeSrc: "http://img.meiduduo.com/images/mine/user2.png",
      custId: 123,
      qrcodeShow: false,
      user: {},
      account: 0,
      point: 0,
      couponNum: 0,
      getPacketData:{},
      banner1: '',//背景
    };
  },
  onLoad() {
    this.user = this.$store.state.userInfo;
    // this.getData();
    // this.getData1();
    this.sign();
  },
  onShow() {
    console.log(this.$store.state);
    this.getAccount();
    this.sign();
    this.getPacket();
    this.getADList1();
  },
  methods: {
    getADList1(){
      this.$http.post("/advertRecord/getAdvertRecord", { place: 1545033676009 }).then(res => {
        // console.log("广告：", res);
        if (res.code == 1 && res.data.data&&res.data.data[0]&&res.data.data[0].pictureUrl) {
          this.banner1 = res.data.data[0].pictureUrl
        }else{
          this.banner1 = 'http://img.meiduduo.com/images/mine/banner.png?7'
        }
      });
    },
    getPacket(){
      var params = {
        custId: this.$store.state.userInfo.custId,
        activityType: 2,
        clientType: 1
      };
      this.$store.state.userInfo.pCustId
        ? (params.originCustId = this.$store.state.userInfo.pCustId)
        : "";
      this.$http
        .post("/customerPacket/loginAndShareEnvelope", params)
        .then(res => {
          if (res.code === 1) {
            this.getPacketData = res.data;
            this.$set(this, "getPacketData", res.data);
          }
          console.log("this.getPacketData", this.getPacketData);
        });
    },
    getAccount() {
      this.$http
        .post("/customer/queryOneByCondition", {
          id: this.$store.state.userInfo.custId
        })
        .then(res => {
          if (res.code == 1) {
            this.account = res.data.account ? res.data.account : 0;
            this.point = res.data.point ? res.data.point : 0;
            this.couponNum = res.data.couponNum ? res.data.couponNum : 0;
          }
        });
    },
    sign() {
      var params = {
        isSignature: 1,
        pageSize: 1000,
        peopleId: this.$store.state.userInfo.peopleId,
        // peopleId: 1544,
        // peopleId: 1165,
        pageNum: 1
      };
      this.$http
        .post(
          this.$store.state.httpUrl + "/basics/basicSign/getSignList",
          params
        )
        .then(res => {
          if (res.code == 1) {
            this.signNum = res.data.data.length;
          }
        });
      this.$http
        .post("order/list4Page", {
          pageNum: 1,
          pageSize: 1000,
          custId: this.$store.state.userInfo.custId,
          osId: 1
        })
        .then(res => {
          this.orderNum = res.data.data.length;
        });
    },
    // this.$router.push({path:"/pagesMine/index"})
    //收集formid fmc子组件收集父页面formid写入子组件data.formIdKey 2018年9月14日 15:16:37 zx
    createFormids(e) {
      //  let fomrid = e.mp.detail.formId;
      //  this.$refs.fmc.createFormids(fomrid);
      //  this.isCode = true;
      //  this.$router.push({path:"/pagesMine/index"})
      this.$router.push({
        path: "/pagesMine/index",
        query: {
          custId: this.$store.state.userInfo.custId,
          status: true
        }
      });
      return;
      if (this.$store.state.userInfo.custId) {
        this.isCode = true;
        this.$router.push({
          path: "/pagesMine/index",
          query: {
            custId: this.$store.state.userInfo.custId,
            status: true
          }
        });
      } else {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
      }
    },
    getData() {
      // 				var parames = {
      // 					id:this.user.id
      // 				}
      // 				this.axios.post("/customer/queryOneByPk",parames)
      //                 .then( res => {
      //                     this.personal = res.data.data;
      //                     this.mine[1].imgUrl = this.personal.icon;
      //                 })
      //                 this.axios.post("/preregistration/list",{userId:this.user.id})
      // 				.then( res => {
      // 					this.mine[0].badge = res.data.data.length;
      // 				})
      /*var parames = {
					isSignature:1,
					peopleId:this.user.peopleId,
					pageNum:1,
					pageSize:7,
				}
				this.axios.post("/basics/basicSign/getSignList",parames)
                .then( res => {
                    this.signList = res.data.data.data;
                })*/
    },
    getData1() {
      // 				this.axios.post("/pointRecord/queryOneByCust",{userId:this.user.id})
      //                 .then( res => {
      //                    	this.pointNum = res.data.data;
      //                 })
    },
    changeMask() {
      // 				this.axios.post('/pointRecord/saveCheck',{'userId':this.user.id})
      // 				.then( res => {
      // 					if(res.data.code==1){
      // 						this.isMask = true
      // 						setTimeout( ()=>{
      // 							this.isMask = false;
      // 							this.getData1();
      // 							this.signText='已签到';
      // 							this.$store.commit('SET_USERCHECK', '已签到');
      // 						}, 1000)
      // 					} else {
      // 						this.showmsg('error',res.data.msg)
      // 						/*this.$dialog.toast({
      // 							mes: res.data.msg,
      // 							timeout: 1500,
      // 							icon: 'error'
      // 						});*/
      // 					}
      // 				})
    },
    hideQrcode() {
      this.qrcodeShow = false;
    },
    showQrcode() {
      if (!this.$store.state.userInfo.custId) {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
        return;
      }
      this.$router.push("/pagesMine/qrcode");
      // this.qrcodeSrc = this.$store.state.httpUrl+ '/shop4/qr/genQR?width=100&height=100&format=png&content=' + this.custId
      // this.qrcodeShow = true
    },
    jump(item) {
      this.$router.push(item.path);
    },
    codeBtn() {
      this.$router.push({
        path: "/pagesMine/index",
        query: {
          custId: this.$store.state.userInfo.custId,
          status: true
        }
      });
      return;
      if (this.$store.state.userInfo.pelpleId) {
        this.isCode = true;
        this.$router.push({
          path: "/pagesMine/index",
          query: {
            custId: this.$store.state.userInfo.custId,
            status: true
          }
        });
      }
      // if (this.$store.state.userInfo.pelpleId) {
      //   this.isCode = true;
      //   this.$router.push({
      //     path: "/pagesMine/index",
      //     query: {
      //       custId: this.$store.state.userInfo.custId,
      //       status: true
      //     }
      //   });
      // } else {
      //   wx.showToast({
      //     title: "未登录",
      //     mask: true,
      //     icon: "none"
      //   });
      // }
    },
    codeMain() {
      this.isCode = false;
    },
    showmsg: function(state, msg, timeout) {
      var _this = this;
      var time;
      timeout ? (time = timeout) : (time = 1500);
      this.dialogContent = msg;
      this.dialogMask = true;
      setTimeout(() => {
        this.dialogMask = false;
      }, time);
    },
    goJump(path, name) {
      let index = null;
      if (name == "全部") {
        index = 0;
      }
      if (name == "待付款") {
        index = 1;
      }
      if (name == "待使用") {
        index = 2;
      }
      if (name == "退款售后") {
        index = 4;
      }
      if (name == "待评价") {
        index = 3;
      }
      this.$router.push({
        path: path,
        query: {
          index: index,
          page: "myOrder"
        }
      });
    },
    toSign() {
      this.$http
        .post("customerPointRecord/customerSign", {
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: "签到成功",
              icon: "none",
              mask: true
            });
            this.isSigned = 1;
          }
        });
    }
  }
};
</script>

<style scoped>
.qiandao {
  color:#fff;
  border-radius:200rpx;
  font-size:28rpx;
  padding:0rpx 20rpx 0 60rpx;
  float:right;
  margin:35rpx 40rpx;
  border:1rpx solid #fff;
  height:50rpx;
  line-height:50rpx;
  background:url("http://img.meiduduo.com/images/mine/qdIcon.png?11") no-repeat 20rpx center;
  background-size:24rpx 24rpx;
  font-size:28rpx;
}
.already {
  color: #666;
  padding: 6rpx 18rpx;
  font-size: 22rpx;
  float: right;
}
.content-top {
  background: #fff;
  padding: 30rpx 30rpx 10rpx;
  position: relative;
  top: -65rpx;
  width: 80%;
  margin: 0 auto;
  background: #fff;
  border-radius:8px;
  -moz-box-shadow: 0 0 20px 0 #efbfff;
  -webkit-box-shadow: 0 0 20px 0 #efbfff;
  box-shadow: 0 0 20px 0 #efbfff;
  z-index: 20;
}
.top-box {
  display: flex;
  justify-content: space-between;
}
.top-box .top-item {
  text-align: center;
  width: 25%;
}
.top-box .top-item .title {
  color: #999;
  font-size: 24rpx;
}
.top-box .top-item .txt {
  margin-top: 14rpx;
  color: #333;
  font-size: 30rpx;
}
.box.boxtop {
  justify-content: space-between;
  width: 630rpx;
  margin: 0 auto;
}
.badge-box {
  position: relative;
  width: 40rpx;
  margin: 0 auto;
}
.badge {
  position: absolute;
  top: -14rpx;
  right: -28rpx;
  width: 28rpx;
  height: 28rpx;
  background: #ff4691;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 28rpx;
  font-size: 22rpx;
}
.qrcode-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  text-align: center;
  /* display: none; */
}
.p-container {
  width: 450rpx;
  height: 450rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.p-outer {
  text-align: left;
}
.p-outer img {
  width: 120rpx;
  height: 120rpx;
  vertical-align: middle;
}
.p-outer .p-box {
  display: inline-block;
  vertical-align: middle;
  height: 120rpx;
  line-height: 60rpx;
  margin-left: 20rpx;
}
.p-box .p-name {
  font-size: 30rpx;
  color: #333;
}
.p-box .p-city {
  font-size: 26rpx;
  color: #999;
}
.qrcode-img {
  width: 100%;
  height: 100%;
  /* width: 450rpx;
		height:450rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%); */
}
/* 临时添加cssclass .hideform 收集formid用 */
.hideform {
  border: 0;
  padding: 0;
}
.mine {
  background-color: #f1f1f1;
}
.banner {
  width: 100%;
  height: 350rpx;
  /* background: url("http://img.meiduduo.com/images/mine/banner.png?7") no-repeat; */
  background-size: 100% 100%;
  position: relative;
}
.banner-title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding: 1.1rem 0.3rem 0 0.3rem;
  position: relative;
  z-index: 5;
}
.banner-title .ball {
  height: 0.6rem;
  width: 0.6rem;
  opacity: 0.5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-title .ball .alarm {
  width: 28rpx;
  height: 32rpx;
}
.banner-title .ball .qrcode {
  width: 36rpx;
  height: 36rpx;
}
.banner-title .ball {
  position: absolute;
  top: 30rpx;
  right: 24rpx;
}
.person {
  position: absolute;
  top: 1.1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}
.person .pimg {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  border: 2px solid #fff;
  margin: 0 0.26rem 0 45rpx;
  float: left;
}
.person img {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
}
.nickName {
  color: #ffffff;
  font-size: 34rpx;
  float: left;
  height: 120rpx;
  line-height: 120rpx;
  font-weight: 700;
  width: 288rpx;
  text-align: left;
}
.person p {
  font-weight: bolder;
  color: #fff;
  font-size: 0.34rem;
}
.person > div {
  color: #fff;
  font-size: 0.28rem;
  line-height: 0.6rem;
}
.sign {
  font-size: 0.26rem;
  font-weight: normal;
  color: #fff;
  background: #fc4396;
  padding: 0.05rem 0.4rem;
  border-radius: 0.3rem 0 0 0.3rem;
  position: absolute;
  right: 0;
  top: 2.5rem;
}
.content {
  top: 348rpx;
  width: 100%;
  position: absolute;
  padding-top: 70rpx;
  background: #fff;
}
.bkContent {
  background: #f5f5f5;
}
.content-item {
  background: #fff;
  padding: 0.3rem 0.3rem;
  margin-bottom: 0.2rem;
}
.jfBoard {
  padding: 12rpx 30rpx 0rpx 12rpx;
  background: linear-gradient(to right, #fed7e9, #ffe8f3);
  height: 140rpx;
  box-sizing: border-box;
}
.jfBoard .boardL {
  float: left;
  padding-left: 196rpx;
  height: 127rpx;
  color: #ff74b1;
  background: url("http://img.meiduduo.com/images/mine/jficon.png") no-repeat
    left bottom;
  background-size: 169rpx 127rpx;
}
.jfBoard .boardL .top {
  height: 56rpx;
  line-height: 40rpx;
  font-size: 33rpx;
  padding-top: 20rpx;
  font-weight: 700;
  display: block;
}
.jfBoard .boardL .btm {
  height: 23rpx;
  line-height: 23rpx;
  display: block;
  font-size: 23rpx;
}
.jfBoard .boardR {
  float: right;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 23rpx;
  font-size: 23rpx;
  color: #fff;
  background: #ff74b1;
  border-radius: 500rpx;
  margin-top: 36rpx;
}
.box {
  display: flex;
  display: -webkit-flex;
  /* justify-content: space-between;
  -webkit-justify-content: space-between; */
  text-align: center;
  -webkit-text-align: center;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}
.box-title {
  color: #333;
  font-size: 26rpx;
  line-height: 26rpx;
  padding-bottom: 0.3rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-title .arrow {
  display: flex;
  align-items: center;
  color: #999;
}
.box-title .i-icon {
  vertical-align: baseline;
}
.box .item-top {
  color: #fc4396;
  text-align: center;
  line-height: 0.4rem;
  height: 0.4rem;
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
}
.box .item-top img {
  width: 0.4rem;
  /* height: 100%; */
  height: 0.4rem;
}
.content .content-item:first-child .box-item {
  width: 210rpx;
}
.content .content-item:nth-child(2) .box-item {
  width: 25%;
  margin: 0.1rem 0;
}
.content .content-item:nth-child(3) .box-item {
  width: 25%;
  margin: 0.2rem 0 0.1rem;
}
.content .content-item:last-child .box-item {
  width: 25%;
  margin: 0.1rem 0;
}
.box-item p {
  color: #333;
  font-size: 25rpx;
}
.box-item p span {
  color: #ff4691;
}
.item-top {
  position: relative;
}
.item_badge {
  position: absolute;
  right: 12px;
  top: -9px;
  padding: 0.03rem 0.09rem;
}
.hot-poject .title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin: 0 0.24rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  border-bottom: 1px solid #eeeeee;
}
.hot-poject {
  width: 100%;
}
.hot-poject .title span {
  color: #999999;
  font-size: 0.22rem;
}
.hot-poject .title img {
  width: 0.14rem;
  height: 0.22rem;
  margin-top: -0.07rem;
  margin-left: 0.1rem;
}
.items {
  padding: 0.24rem;
}
.box {
  background: #fff;
}
</style>
