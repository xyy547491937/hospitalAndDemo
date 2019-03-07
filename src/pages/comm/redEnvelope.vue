<template>
  <div class="mask" v-if="item.id&&status">
    <div class="redenvelope">
      <img class="img2" src="http://img.meiduduo.com/images/mine/laxin2.png" alt>
      <img class="img3" src="http://img.meiduduo.com/images/mine/laxin3.png" alt>
       <!-- 未拆到红包 -->
      <div class="whiteBox"  v-if="fail==1">
        <div class="yellowBox">
          <img class="failure" src="http://img.meiduduo.com/images/h5/upper.png" alt="">
          <span class="word_content2">抱歉，您未成功拆到红包哦~ </span>
        </div>
      </div>

      <div class="whiteBox" v-else>
        <div class="yellowBox">
          <span
            :class="redenvelopeData.content? 'word_title' : 'word_title margintop'"
          >{{redenvelopeData.title}}</span>
          <div class="word_price">
            <span>{{redenvelopeData.price}}</span>
            <span class="span1">元</span>
          </div>
          <span class="word_content">{{redenvelopeData.content}}</span>
        </div>
      </div>
      <div class="btnBox">
        <img src="http://img.meiduduo.com/images/mine/laxin4.png" alt>
        <div class="btnBoxbttom">
          <div v-if="item.redPacketJoinState==0" class="btn" @click="onOk(item)">{{redenvelopeData.btnText}}</div>
          <button v-if="item.redPacketJoinState==1" open-type="share"  class="btn">{{redenvelopeData.btnText}}</button>
          <button v-if="item.redPacketJoinState==2" @click="getMoney(item)" class="btn">{{redenvelopeData.btnText}}</button>
          <button v-if="fail==1" open-type="share" class="btn">邀请好友帮拆</button>
        </div>
      </div>
      <span class="close" @click="onCancel">×</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default:{
        id: ''
      }
    }
  },
  data() {
    return {
      redenvelopeData:{},
      // 组件的显隐
      status: true,
      fail: 0
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    'item.redPacketJoinState': {
      handler(val){
        console.log(val,'**********************************')
        if (val==1) {
          this.$set(this,'redenvelopeData',{
            title: '您已获得红包',
            price: this.item.getRedMoney,
            content: '再拆'+this.item.remainMoney +'元即可提现',
            btnText: '邀请好友帮拆'
          })
          //自拆以后，发现拆的红包为0
          if( parseInt(this.item.singlePacketAmount) == parseInt(this.item.remainMoney)){
            this.fail = 1;
            return false;
          }
        } else if(val==0){
          this.$set(this,'redenvelopeData',{
            title: '您有一个新人红包',
            price: this.item.singlePacketAmount,
            content: '',
            btnText: '点击领取'
          })
        }else if(val==2){
           this.$set(this,'redenvelopeData',{
            title: '恭喜您，获得奖励！',
            price: this.item.singlePacketAmount,
            content: '',
            btnText: '立即查看'
          })
        }
      }
    }
  },
  methods: {
    onOk(item) {
      if (item.redPacketJoinState == 0) {
        this.changeJump('/pagesMine/pullNew',{title:item.activityTitle,imageUrl:item.activityImg.split(',')[0],time:item.endTime,singlePacketAmount:item.singlePacketAmount,id:item.id,custId:item.custId,headUrl:this.user.avatarUrl,nickName:this.user.nickName})
      }
    },
    onCancel() {
      this.status = false
      wx.showTabBar()
    },
    getMoney(item){
      if (item.redPacketJoinState == 2) {
        this.changeJump('/pagesMine/myInvitation',{})
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
.redenvelope {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560rpx;
  height: 596rpx;
  background: #fd6f65;
  border-radius: 20rpx;
  .img2 {
    width: 80rpx;
    position: absolute;
    right: -10px;
    top: 105rpx;
    z-index: 998;
    height: 134rpx;
  }
  .img3 {
    width: 70rpx;
    position: absolute;
    left: -10px;
    top: 105rpx;
    z-index: 998;
    height: 134rpx;
  }
  .failure{
    width: 140rpx;
    height: 140rpx;
    position: absolute;
    top: 20rpx;
    left: 50%;
    transform: translate(-50%, 0%);
  }
}
.whiteBox {
  width: 512rpx;
  height: 545rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20rpx;
}
.yellowBox {
  width: 453rpx;
  height: 469rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20rpx;
  border: 1px solid #f1c481;
  span {
    display: block;
  }
  .word_title {
    color: #fd6f65;
    font-size: 36rpx;
    text-align: center;
    line-height: 40rpx;
    margin-top: 38rpx;
  }
  .margintop {
    margin-top: 60rpx;
  }
  .word_price {
    color: #fd6f65;
    font-size: 100rpx;
    text-align: center;
    letter-spacing: -20;
    line-height: 136rpx;
    font-weight: bold;
    span{
      display: inline-block;
    }
    .span1 {
      font-size: 50rpx;
      line-height: 36rpx;
      font-weight: normal;
    }
  }
  .word_content {
    color: #f1c481;
    font-size: 36rpx;
    text-align: center;
    line-height: 49rpx;
  }
  .word_content2{
    color: #f1c481;
    font-size: 32rpx;
    text-align: center;
    line-height: 49rpx;
    margin-top: 190rpx;
  }
}

.btnBox {
  width: 560rpx;
  height: 310rpx;
  position: absolute;
  top: 305rpx;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 999;
  & > img {
    width: 560rpx;
    height: 137rpx;
    position: absolute;
    left: 0;
  }
  .btnBoxbttom {
    width: 560rpx;
    height: 193rpx;
    background: #fe5e60;
    margin-top: 137rpx;
    border-radius: 0 0 20rpx 20rpx;
  }
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
  top: 173rpx;
  left: 50%;
  transform: translate(-50%, 0%);
}
.close {
  display: block;
  width: 60rpx;
  height: 60rpx;
  line-height:1;
  text-align: center;
  font-size: 54rpx;
  color: rgba(255, 255, 255, 1);
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  position: absolute;
  bottom: -165rpx;
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>
