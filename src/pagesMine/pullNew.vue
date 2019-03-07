<template>
  <div class="pullNew" :style="helpSuccess?'max-height:100%':''">
    <div  v-if="share||homeShow" @click.stop="backHome" class="back_home">
      <img src="/static/images/tab1.png" mode="aspectFit" alt="">
    </div>
    <div class="headImg">
      <img :src="headUrl" alt="">
    </div>
    <div class="content">
      <div class="name xyy-ellipsis-1">{{nickName}}</div>
      <div class="tip">拆的红包达到<span style="color:#FB5C6C;">{{singlePacketAmount}}</span>元即可拿下全部红包，立即提现！</div>
      <!-- 需要拆红包的组件 -->
      <div class="pockets" v-if="!timeOuts&&((share&&!shared&&customerPacketIdRouter)|| (!share&&!customerPacketIdRouter))">
        <div v-if="(redList&&redList.length==0 )|| (redList&&redList.length==0)" v-for="(ele,index) in 3" :key="index" @click="share?dismantleEnvelope(index):saveForClient(index)" class="pocket"></div>
        <div v-if="(redList&&redList.length>0 )|| (redList&&redList.length>0)" v-for="(ele,index) in redList" :key="index" @click="share?dismantleEnvelope(index):saveForClient(index)" :class="(ind==index||timeOut)? 'pocket pocket1': 'pocket'">
          <span v-if="ind==index||timeOut" :class="ind==index? 'money size pocked' : 'money size pocked1'">{{ele}}</span><span  :class="ind==index? 'money pocked' : 'money pocked1'" v-if="ind==index||timeOut">元</span>
        </div>
      </div>
      <!-- 刚自拆进入显示的帮拆按钮 -->
      <button class="invite" v-if="item.list&&item.list.length>0&&timeOuts&&!share" open-type="share">喊好友帮我拆红包</button>
      <!-- 自拆之后再次进入显示的帮拆按钮 -->
      <button class="invite" v-if="item.list&&item.list.length>0&&customerPacketIdRouter&&!share&&!timeOuts" open-type="share">喊好友帮我拆红包</button>
      <!--<button class="invite" v-if="item.list&&item.list.length>0&&customerPacketIdRouter&&share&&!timeOuts" open-type="share">喊好友帮我拆红包</button> -->

      <div class="invite" v-if="!singlePacketAmount" @click="onOk">谢谢您!</div>
      <div class="invite" v-if="share&&!sharedZ&&!shared&&timeOuts&&singlePacketAmount" @click="onOk">谢谢您，我也奖励您{{singlePacketAmount}}元</div>
      <div class="invite" v-if="share&&!sharedZ&&shared&&singlePacketAmount" @click="onOk">谢谢您，我也奖励您{{singlePacketAmount}}元</div>
      <!-- <div class="invite invited" v-if="share&&!shared&&sharedZ&&timeOuts">感谢您帮我拆了{{sharedPrice}}元</div> -->
      <div class="invite invited" v-if="share&&shared&&sharedZ">感谢您帮我拆了{{sharedPrice}}元</div>

      <!-- 需要拆红包的组件 -->
      <div class="tip" v-if="!timeOuts&&((share&&!shared&&customerPacketIdRouter&&redList&&redList.length>0 )|| (!share&&!customerPacketIdRouter&&redList&&redList.length>0))">请点击其中一个红包，拆开的金额将计入拆红包总额</div>
      <div class="contDown" v-if="countDT&&countDT.length > 0">
        倒计时：剩余<span v-if="countDT[0]!=0">{{countDT[0]}}天</span>{{countDT[1]}}:{{countDT[2]}}:{{countDT[3]}}结束
      </div>
      <div class="contDown" v-if="timeOut2&&countDT&&countDT.length == 0">
        活动结束
      </div>
    </div>
    <opens v-bind:item="item" ></opens>
    <div class="bangchai" v-if="helpSuccess&&timeOuts&&share&&!sharedZ">
      <div class="box">
        <img :src="headUrl" alt="">
        <div class="cha" @click="helpSuccess=false">×</div>
        <div class="nick nick1">{{nickName}}</div>
        <div class="ctn nick">感谢您帮我拆了{{redList[ind]}}元</div>
        <div class="invite" @click="onOk">谢谢您，我也奖励您{{singlePacketAmount}}元</div>
      </div>
    </div>
    <!-- 帮拆次数达上线/ 已经自拆过红包 -->
    <div class="mask" v-if="exceed.flag">
      <div class="redenvelope2">
          <img class="failure" src="http://img.meiduduo.com/images/h5/upper.png" alt="" style="margin-top:20rpx;margin-bottom:50rpx;">
          <span class="redenvelope2Close"  @click="onCancel">×</span>
          <span class="failureText">{{exceed.msg}}</span>
          <button  class="btn" @click="getopenRed">我也要拿{{singlePacketAmount}}元</button>
      </div>
    </div>
  </div>
</template>

<script>
import opens from './comm/opens'
import LOGIN from "../utils/login.js";
import redenvelope from "../pages/comm/redEnvelope";
export default {
  components: {
    opens,
    redenvelope
  },
  data() {
    return {
      packetActivityId: '', //
      time: '', //
      title: '',
      imageUrl: '',
      share: '',
      // 从帮拆到自拆的首页按钮显示
      shareS: '',
      // 已帮拆
      shared: '',
      // 已自拆
      sharedZ: '',
      sharedPrice: '',
      singlePacketAmount: '',  //
      ind: '',
      customerPacketId: '',
      customerPacketIdRouter: '',
      // share页面已自拆
      item: {},
      headUrl: '', //
      nickName: '',//
      originCustId: null,
      timeInterval: '',
      custId: '',
      countDT: [],
      redList: [],
      timeOut2: false,
      timeOuts: false,
      //自拆上线
      exceed: {
        flag: 0,
        msg: '',
        show: false
      },
      // 帮拆成功
      helpSuccess: false,
      // 点击事件之后2秒展示其他参数
      timeOut: false,
      // 是否进行分享进行返回显示
      onShow: '',
      queryActivity: {},//登陆者个人信息
      showBox: false,
      homeShow: true//跳转首页的小房子
    }
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  onShareAppMessage(res) {
    // console.log('分享',res,133)
    this.onShow = true
    return {
      title: this.title,
      imageUrl: this.imageUrl,
      path: '/pagesMine/pullNew?originCustId=' + this.custId + '&headUrl=' + this.headUrl + '&customerPacketId=' + this.customerPacketId + '&nickName=' + this.nickName + '&id=' + this.packetActivityId + '&time=' + this.time + '&singlePacketAmount=' + this.singlePacketAmount + '&share=' + true
    }
  },
  onUnload() {
    clearInterval(this.timeInterval)
    this.timeInterval = ''
  },
  onShow() {
    if (!this.onShow) {
      clearInterval(this.timeInterval)
      this.packetActivityId = ''
      this.singlePacketAmount = ''
      this.customerPacketIdRouter = ''
      this.headUrl = ''
      this.nickName = ''
      this.timeInterval = ''
      this.helpSuccess = false
      this.imageUrl= ''
      this.title= ''
      this.shared= ''
      this.sharedZ= ''
      this.sharedPrice= ''
      this.ind= ''
      this.customerPacketId= ''
      this.item= {}
      this.originCustId= null
      this.custId= ''
      this.countDT= []
      this.redList= []
      this.timeOut2= false
      this.timeOuts= false
      this.timeOut= false
    }
    var obj = {
      custId: this.user.custId
    }
    this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
      console.log('红包包内容',res)
      if(res.data.redPacketJoinState==0){
        wx.hideShareMenu();
      }
      if (res.code === 1&&res.data.customerPacketId) {
          console.log(res,'kakakanakank')
          this.$set(this,'sharedZ',true)  
      }else{
          console.log(res,'没自拆')
          this.$set(this,'sharedZ',false)  
      }
    });
    
    this.$set(this,'share',this.$route.query.share)//初始化是分享过来的
    this.$set(this,'shared',false)//初始化 帮拆
    this.$set(this,'redList',[])//初始化 帮拆
    if(this.share){
      this.homeShow = true;
    }else{
      this.homeShow = false;
    }
    // console.log('onshow',this.$route.query.share)
    if (this.$route.query.share) {
      if (!this.user.openid || !this.user.custId) {
        this.$store.commit("setInvited", {
          invited: true
        });
        console.log("商品页判断是否已注册");
        LOGIN("/pagesMine/pullNew", this.$route.query);
      } else {
        this.init(true)
      }
    } else {
      this.init()
    }
  },
  methods: {
    queryActivityByCustId() {
      var obj = {
        custId: this.user.custId
      }
      this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
        if (res.code === 1&&res.data.customerPacketId) {
          console.log(res,'kakakanakank')
          this.$set(this,'sharedZ',true)  
          //自己打开自己的帮拆红包链接，应该显示“喊好友帮我拆红包”
          if(this.$route.query.share.toString() == 'true' && this.$route.query.originCustId == this.user.custId && this.$route.query.customerPacketId != ''){
            this.share = false;
            this.homeShow = true;
            console.log('自己打开自己的帮拆红包链接，应该显示“喊好友帮我拆红包”',this.share)
          }else{
            this.homeShow = false;
          }

        }
      });
    },
    backHome () { // 回到首页
      wx.switchTab({
        url: '/pages/index'
      })
    },
    init (status) {
      // console.log(this.$route)
      // console.log(this.user )
      this.shareS = this.$route.query.shareS?this.$route.query.shareS:''
      if (status) {
        this.originCustId = this.$route.query.originCustId
        this.share = this.$route.query.share
        this.custId = this.user.custId
        this.queryActivityByCustId()
      } else {
        this.custId = this.$route.query.custId
      }
      if (this.$route.query.customerPacketId) {
        this.$set(this,'customerPacketIdRouter',this.$route.query.customerPacketId)
        this.$set(this,'customerPacketId',this.$route.query.customerPacketId)
        this.openedList(this.customerPacketId)
      }
      this.packetActivityId = this.$route.query.id
      this.title = this.$route.query.title
      this.imageUrl = this.$route.query.imageUrl
      this.headUrl = this.$route.query.headUrl
      this.nickName = this.$route.query.nickName
      this.$set(this.item,'id', this.$route.query.id)
      this.singlePacketAmount = this.$route.query.singlePacketAmount
      this.time = this.$route.query.time
      this.count(this.time)
      var that = this

      // console.log(!timeOuts&&((share&&!shared&&customerPacketIdRouter)|| (!share&&!customerPacketIdRouter)))
      // console.log('this.$route.query.share',this.$route.query.share)
      // console.log('***','timeOuts',this.timeOuts,'share',this.share,'shared',this.shared,'customerPacketIdRouter',this.customerPacketIdRouter)
      setTimeout(() => {
        that.timeOut2 = true
      }, 1000);
    },
    onOk() {
      var obj = {
        custId: this.user.custId
      }
      this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
        if (res.code === 1) {
          // console.log('item',res.data)
          var item = res.data
          clearInterval(this.timeInterval)
          this.timeInterval = ''
          this.helpSuccess = false
          this.share= ''
          this.imageUrl= ''
          this.title= ''
          this.shared= ''
          this.sharedPrice= ''
          this.ind= ''
          this.customerPacketId= ''
          this.item= {}
          this.originCustId= null
          this.custId= ''
          this.countDT= []
          this.redList= []
          this.timeOut2= false
          this.timeOuts= false
          this.timeOut= false
          if (item&&item.redPacketJoinState == 0) {
            this.changeJump('/pagesMine/pullNew',{title:item.activityTitle,imageUrl:item.activityImg.split(',')[0],time:item.endTime,singlePacketAmount:item.singlePacketAmount,id:item.id,custId:this.user.custId,headUrl:this.user.avatarUrl,nickName:this.user.nickName,shareS: true})
          }
        }
      });
    },
    getopenRed(){
      var item = {};
      var obj = {
        custId: this.user.custId,
      }
      this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
        if (res.code === 1) {
          this.exceed.flag = false;
          item = res.data;
          // console.log('红包内容',item)
          if (item&&item.redPacketJoinState == 0) {
            this.changeJump('/pagesMine/pullNew',{title:item.activityTitle,imageUrl:item.activityImg.split(',')[0],time:item.endTime,singlePacketAmount:item.singlePacketAmount,id:item.id,custId:this.user.custId,headUrl:this.user.avatarUrl,nickName:this.user.nickName})
          } else if (item&&item.redPacketJoinState == 1) {
            this.changeJump('/pagesMine/pullNew',{title:item.activityTitle,imageUrl:item.activityImg.split(',')[0],time:item.endTime,singlePacketAmount:item.singlePacketAmount,id:item.id,custId:this.user.custId,headUrl:item.headUrl,nickName:item.nickName,customerPacketId:item.customerPacketId})
          }
        }
      });
    },
    // 用户自拆红包
    saveForClient(index) {
      console.log('用户自拆红包')
      if(this.showBox){
        return
      }
      this.showBox = true;
      
      this.ind = index
      var obj = {
        custId: this.$store.state.userInfo.custId,
        packetActivityId: this.packetActivityId,
        areaId: this.$store.state.userInfo.cityId,
      }
      if (this.originCustId) {
        obj.originCustId= this.originCustId
      }
      console.log(obj)
      this.$http.post("/customerPacket/saveForClient", obj).then(res => {
        console.log(res)
        if(res.code==1){
          console.log('自拆红包成功')
          wx.showShareMenu({
            withShareTicket: true
          })
          this.redShow(res,index);
        }
      });
    },
    dismantleEnvelope(index) {
      console.log('bangchai')
      if(this.showBox){
        return
      }
      this.showBox = true;

      this.ind = index
      this.$http.post("/packetInviteRecord/dismantleEnvelope", {
        customerPacketId: this.customerPacketId,
        inviteCustId: this.user.custId,
        areaId: this.user.cityId
      })
      .then(res => {
        this.redShow(res,index)
      });
    },
    redShow(res,index) {
      var obj = {
        custId: this.user.custId
      }
      this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
        // console.log('红包包内容',res)
        if (res.code === 1) {
          if(res.data.redPacketJoinState==0){
            this.exceed.show = true;
          }else{
            this.exceed.show = false;
          }
        }
      });

      if (res.code === 1) {
        this.helpSuccess = true
        if (index==2) {
          this.redList = [res.data.unreceivedDrawAmount1,res.data.unreceivedDrawAmount2,res.data.receivedDrawAmount]
        } else if(index==1){
          this.redList = [res.data.unreceivedDrawAmount1,res.data.receivedDrawAmount,res.data.unreceivedDrawAmount2]
        } else {
          this.redList = [res.data.receivedDrawAmount,res.data.unreceivedDrawAmount1,res.data.unreceivedDrawAmount2]
        }

        var that = this
        setTimeout(() => {
          that.timeOut = true
          that.showBox = false
        }, 2000);
        if (this.share) {
          setTimeout(() => {
            that.timeOuts = true
          }, 3000);
        } else {
          setTimeout(() => {
            that.timeOuts = true
          }, 6000);
        }
        setTimeout(() => {
          if (res.data.customerPacketId) {
            this.$set(this,'customerPacketId',res.data.customerPacketId)
            this.$emit('customerPacketId',res.data.customerPacketId)
          }
          this.openedList(this.customerPacketId)
        }, 6000);


      } else{
        // wx.showToast({
        //   title: res.msg,
        //   icon: "none"
        // });
        this.exceed.flag = 1;
        this.exceed.msg = res.msg;
      }
    },
    onCancel(){
      this.exceed.flag = 0;
    },
    openedList(customerPacketId) {
      this.$http.post("/packetInviteRecord/openedEnvelopeRecordList4Page", {
        customerPacketId: customerPacketId,
        pageNum: 1,
        pageSize: 100000
      })
      .then(res => {
        if (res.code === 1) {
          this.$set(this.item,'list',res.data.paginationVO.data)
          // console.log('条件拆包列表',this.item)
          //打开帮拆链接，判断是否是已经帮拆
          // console.log('this.shared',this.shared)
          res.data.paginationVO.data.forEach(element => {
            console.log(this.user.custId,element);
            if(element.custId == this.user.custId){
              this.shared = true;
              this.sharedPrice= element.drawAmount
              console.log('一帮差')
            }else{
              this.timeOuts = false;
            }
          });
          this.$set(this.item,'addUpAmount',res.data.addUpAmount)
        }
      });
    },
    count(timeStr) {
      var that = this
      this.timeInterval = setInterval(function () {
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var end = new Date(timeStr.replace(/-/g, "/")).getTime();
        //时间差
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间
        var d, h, m, s;
        if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          m = Math.floor(leftTime / 1000 / 60 % 60);
          s = Math.floor(leftTime / 1000 % 60);
          h = h.toString().length==2?h.toString() : '0'+h.toString()
          m = m.toString().length==2?m.toString() : '0'+m.toString()
          s = s.toString().length==2?s.toString() : '0'+s.toString()
          that.countDT = [d,h,m,s]
        } else {
          that.countDT = []
          clearInterval(that.timeInterval)
          that.timeInterval = ''
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.pullNew{
  background: #ffd4bf url("http://img.meiduduo.com/images/mine/lxbg.png") no-repeat left top;
  background-size: 100% 324rpx;
  padding: 204rpx 30rpx 0 30rpx;
  min-height:100%;
  box-sizing:border-box;
  .invite{
    margin: 66rpx auto;
    width: 450rpx;
    height: 100rpx;
    line-height: 100rpx;
    color: #FB5C6C;
    font-size: 32rpx;
    text-align: center;
    background:linear-gradient(to bottom, #FFF049, #FDBA16);
    border-radius: 10rpx;
    -moz-box-shadow: 0 10rpx 40rpx 0 #ccc;
    -webkit-box-shadow: 0 10rpx 40rpx 0 #ccc;
    box-shadow:0 10rpx 40rpx 0 #ccc;
    font-weight:700;
  }
  .invited{
    background: none;
    border-radius: 0;
    box-shadow:none;
  }
  .headImg{
    position:absolute;
    top:134rpx;
    left: 0;
    right:0;
    width: 140rpx;
    height: 140rpx;
    margin: 0 auto;
    box-sizing: border-box;
    border: 3rpx solid #fff;
    border-radius: 100%;
    overflow: hidden;
    img{
      width:100%;
      height:100%;
      border-radius: 100%;
    }
  }
  .content{
    padding:70rpx 0 36rpx 0;
    background:#fff;
    margin-bottom:20rpx;
    border-radius:10rpx;
    .name{
      width: 525rpx;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 34rpx;
      color: #FB5C6C;
      text-align: center;
      font-weight:700;
      margin:0 auto;
    }
    .tip{
      height: 24rpx;
      line-height: 24rpx;
      font-size: 24rpx;
      color: #333333;
      text-align: center;
      padding:0 0 27rpx 0;
    }
    .pockets{
      background: #FFEDED;
      width: 630rpx;
      height: 280rpx;
      font-size: 22rpx;
      margin:0 auto 27rpx;
      border-radius:10rpx;
      overflow: hidden;
      .pocket{
        margin:33rpx 0 0 33rpx;
        width: 168rpx;
        height: 204rpx;
        background: #FB6C78;
        background: url("http://img.meiduduo.com/images/mine/chaiing.png") no-repeat left top;
        float: left;
        background-size: 168rpx 204rpx;
        text-align:center;
      }
      .pocket1{
        margin: 22rpx 0 0 33rpx;
        height: 235rpx;
        background: url("http://img.meiduduo.com/images/mine/chaied.png") no-repeat left top;
        background-size: 168rpx 225rpx;
      }
      .pocked1{
        color:#F88C00;
      }
      .pocked{
        color:#F03E4F;
      }
      .money{
        height: 84rpx;
        line-height: 84rpx;
        font-size: 28rpx;
        display:inline-block;
        padding-top:12rpx;
      }
      .size{
        font-size: 38rpx;
      }
    }
    .contDown{
      height: 24rpx;
      line-height: 24rpx;
      font-size: 24rpx;
      color: #FB5C6C;
      text-align: center;
    }
  }
  .bangchai{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    .box{
      width: 620rpx;
      height: 430rpx;
      padding: 0 34rpx;
      box-sizing: border-box;
      position: absolute;
      text-align: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      color: #333;
      font-size: 34rpx;
      img{
        width: 140rpx;
        height: 140rpx;
        margin: 0 auto;
        position: absolute;
        top: -70rpx;
        left: 0;
        right: 0;
        border: 3rpx solid #fff;
        display: block;
        border-radius: 100%;
      }
      .cha{
        height: 96rpx;
        line-height: 96rpx;
        text-align: right;
        font-size:56rpx;
        color:#999999;
      }
      .nick{
        height: 34rpx;
        line-height: 34rpx;
      }
      .nick1{
        font-weight: 700;
      }
      .ctn{
        padding-top: 56rpx;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99998;
}
.redenvelope2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620rpx;
  height: 500rpx;
  background: #ffffff;
  border-radius: 20rpx;
  .failure{
    width: 140rpx;
    height: 140rpx;
    position: relative;
    top: 20rpx;
    left: 50%;
    transform: translate(-50%, 0%);
    margin-top: 88rpx;
  }
  .failureText{
    text-align: center;
    font-size:30rpx;
    width:100%;
    display:block;
  }
  .redenvelope2Close{
    position:absolute;
    right:30rpx;
    top:10rpx;
    font-size:40rpx;
  }
  .btn {
    width: 460rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    background: linear-gradient(
      0deg,
      rgba(253, 186, 22, 1),
      rgba(255, 240, 73, 1)
    );
    box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(64, 0, 1, 0.2);
    border-radius: 10rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(207, 94, 26, 1);
    position: absolute;
    top: 340rpx;
    left: 50%;
    transform: translate(-50%, 0%);
  }
}
</style>
