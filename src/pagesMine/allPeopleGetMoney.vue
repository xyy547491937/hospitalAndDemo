<template>
  <div class="vo">
    <img class="qm_nodata" v-if="qm_nodata" src="http://img.meiduduo.com/images/quanmin/qm_8.png" />
    <div v-if="!qm_nodata">
    <div class="advert-box" v-if="isShowenvelope||isNew||_nodata">
      <div class="advert"  v-show="isShowenvelope" @click="onOk(queryActivity)">
        <img src="http://img.meiduduo.com/images/quanmin/qm_1.png" mode="widthFix" alt>
        <span class="giveMoney">新人专享{{envelopeMoney}}元红包</span>
      </div>
      <div class="board flex-r"  v-if="!qm_nodata && isNew">
        <div class="board-icon-box">
          <span class="board-icon"></span>
        </div>
        <div class="notice">
          <swiper :autoplay="true" :circular="true" :vertical="1" interval="5000" style="width:100%;height:100%;">
            <block>
              <swiper-item v-for="item in tablist" :key="item.id">
                <!-- <image src="{{item}}" class="slide-image" width="355" height="150"> -->
                <div class="banner" height="150">{{item.tip}}</div>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
    </div>
    </div>
    <!--  现金任务 -->
    <div class="new-work"  v-if="!qm_nodata">
      <div class="new-work-title flex-r">
        <p>现金任务</p>
      </div>
      <ul class="integrate-box">
        <li class="integrate-item flex-r" v-for=" v in activeList" :key="v" >
          <div class="item-inner flex-r">
            <img :src="v.icon"  alt>
            <div class="cv flex-c">
              <p class="i-title">{{v.activityTitle}}<span v-if="v.singlePacketAmount!='0.00'">+{{v.singlePacketAmount}}元</span></p>
              <p class="f-title">{{v.eventDescription}}</p>
            </div>
          </div>
          <div class="item-go flex-r">
            <!-- 有金额，有领取次数 -->
            <span v-if="v.effectiveB == 1 && v.fullAmountB == 1" >
              <span class="bn"  @click="nextPage(v.activityType)" >{{v.word}}</span>
              <i-icon type="enter"/>
            </span>
            <!-- 红包金额已领完，但是还有领取次数，字体变灰 -->
            <span  v-if="v.fullAmountB == 0 && v.effectiveB == 1" >
              <span class="bn" style="color:#999;padding-right:10rpx;" >{{v.word}}</span>
            </span>
            <!-- 领取次数没有了就是完成了 -->
            <span  v-if="v.effectiveB == 0"  class="bn">已完成</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tablist: [],//滚动获奖列表
      activeList: [],//全民领钱活动列表
      activeListicon:[ //全民领钱活动列表icon
        {id:2,icon:'http://img.meiduduo.com/images/jifen/jf2.png',word:"登录"},
        {id:3,icon:'http://img.meiduduo.com/images/jifen/jf3.png',word:"发视频"},
        {id:4,icon:'http://img.meiduduo.com/images/jifen/jf6.png',word:"发日记"},
        {id:5,icon:'http://img.meiduduo.com/images/jifen/jf12.png',word:"去炫耀"},
        {id:6,icon:'http://img.meiduduo.com/images/quanmin/qm_6.png',word:"我要返现"},
        {id:7,icon:'http://img.meiduduo.com/images/quanmin/qm_7.png',word:"邀请好友阅读"}
      ],
      envelopeMoney: null,//红包钱
      isShowenvelope: false,//是否展示红包活动
      queryActivity:{},//新人红包数据
      user: {},
      qm_nodata: false,//没数据
      isNew: false
    }
  },
  onShow(){
    this.getTablist();
    this.getActiveList();
    this.queryActivityByCustId();
    this.user = this.$store.state.userInfo
  },
  methods: {
    onOk(item){
      this.changeJump('/pagesMine/pullNew',{title:item.activityTitle,imageUrl:item.activityImg.split(',')[0],time:item.endTime,singlePacketAmount:item.singlePacketAmount,id:item.id,custId:item.custId,headUrl:this.user.avatarUrl,nickName:this.user.nickName})
    },
    getTablist(){
      this.$http.post("/customerPacket/queryTaskMoneyHistory", {}).then(res => {
        if (res.code === 1) {
          this.tablist = res.data;
         if(JSON.stringify(this.tablist) == '[]') {
           this.isNew = false;
         }else{
           this.isNew = true;
         }
        }else{
          this.isNew = false;
        }
      });
    },
    getActiveList(){
      var obj={
        custId: this.$store.state.userInfo.custId
      }
      this.$http.post("/customerPacket/allReceiveMoneyList", obj).then(res => {
        if (res.code === 1) {
          for(let i=0;i<res.data.length;i++){
            for(let j=0;j<this.activeListicon.length;j++){
              if(res.data[i].activityType == this.activeListicon[j].id){
                res.data[i].icon = this.activeListicon[j].icon
                res.data[i].word = this.activeListicon[j].word
              }
            }
          }
          this.activeList = res.data;
          if(JSON.stringify(this.activeList) === '[]'){
            this.qm_nodata = true
          }else{
            this.qm_nodata = false
          }
        }
      });
    },
    queryActivityByCustId(cityId) {//新人红包
      var obj = {
        custId: this.$store.state.userInfo.custId
      }
      this.$http.post("/redPacketActivity/queryActivityByCustId", obj).then(res => {
        if (res.code === 1) {
          this.$set(this,'queryActivity',res.data)
          this.$set(this,'envelopeMoney',parseFloat(res.data.singlePacketAmount))
          this.isShowenvelope = true;
        }else if(res.code === 0){
          this.isShowenvelope = false;
        }
      });
    },
    //跳转页面
    nextPage(activityType){
      if(activityType == 3){//视频
        this.changeJump('/pagesShow/creatVideo',{})
      }else if(activityType == 4){//发布日记
        this.changeJump('/pagesShow/selectDiaryBook',{})
      }else if(activityType == 5){//晒收入
        this.changeJump('/pagesMine/qmShare',{})
      }else if(activityType == 6){//消费返现
        wx.switchTab({
          url: '../pages/shop'
        });
      }else if(activityType == 7){//好友阅读领钱
      console.log('/pagesMine/qmRead');

        this.changeJump('/pagesMine/qmRead',{})
      }
    }
  },
};
</script>
<style lang="less">
@fontSzie: 14px;
.qm_nodata{
  width:378rpx;
  height:316rpx;
  position:fixed;
  left:50%;
  top:30%;
  transform:translate(-50%,-50%);
}
.baseConfig {
  font-size: @fontSzie;
  background-color: @base-white;
}
.advert-box {
  &:extend(.baseConfig);
    padding: 30rpx;
    border-bottom: 20rpx solid #f5f5f5;
  & > .advert {
    position: relative;
    height: 70px;
    width: 690rpx;
    border-radius: 30px;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 20px;
    & img {
      width: 100%;
      height: 100%;
    }
    & > .giveMoney {
      position: absolute;
      color: #cf4745;
      font-size: 22rpx;
      left: 16.6%;
      bottom: 16rpx;
    }
  }
  & > .board {
    padding: 10rpx 40rpx 10rpx 0rpx;;
    & > .board-icon-box {
      width: 10%;
      position: relative;
      top: -6rpx;
      & > .board-icon {
        display: block;
        width: 25px;
        height: 22px;
        background-image: url("http://img.meiduduo.com/images/quanmin/qm_2.png");
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
      }
    }

    & > .notice {
      width: 90%;
      height: 22px;
      overflow: hidden;
      font-size: 30rpx;
    }
  }
}
.new-work {
  //   padding: 0 @basePadding;
  margin-bottom: 10px;

  // background-color: #ffe4f4;
  & > .new-work-title {
    background-color: #fff;
    align-items: center;
    // justify-content: space-around;
    padding: 0 15px;
    height: 48px;

    & > p {
      border-left: 4px solid @baseColor;
      color: @baseFirstTitleColor;
      font-size: 16px;
      padding-left: 15px;
      font-weight: bold;
    }

    & > span {
      color: #fe86b8;
      font-size: 12px;
      margin-left: 20px;
    }
  }
}

.integrate-box {
  // font-size: @baseSize;
  color: @baseTextColor-c;
  // width: 95%;
  margin: 0 auto;

  & > .integrate-item {
    border-bottom: 1rpx solid #ddd;
    padding: 15px 10px;
    // border-radius: 6px;
    background-color: #fff;
    justify-content: space-between;

    & > .item-inner {
      align-items: center;

      & img {
        width: 30px;
        height: 30px;
      }

      & > .cv {
        margin-left: 20px;
        justify-content: space-around;

        & > .i-title {
          // font-weight: bold;
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
          span{
            color: #FF4691;
          }
        }

        & > .f-title {
          font-size: 12px;
          color: @baseTextColor-c;
        }
      }
    }

    // 去认证
    & > .item-go {
      align-items: center;
      color: @baseColor;
      font-size: @baseSize;
      & > .bn {
        margin-right: 10px;
      }
    }
  }
}
</style>
