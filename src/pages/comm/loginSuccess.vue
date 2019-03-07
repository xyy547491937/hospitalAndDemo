<template>
    <div class="mask" v-if="item.receivedDrawAmount && status && item.receivedDrawAmount!=0">
        <div class="redenvelope">
          <div class="close"  @click="onCancel">×</div>
          <div class="title">登录成功</div>
          <div class="pricebox">恭喜你获得<span>{{item.receivedDrawAmount }}元</span></div>
          <div class="img">
            <img :src="activityImg">
          </div>
          <div class="btnBox">
            <div @click="changeJump('/pagesShow/creatVideo',{})">发视频</div>
            <div @click="changeJump('/pagesShow/selectDiaryBook',{})">发日记</div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props:{
    item:{
      type: Object
    }
  },
  data(){
    return{
      status: true,
      activityImg: ''
    }
  },
   watch: {
    'item': {
      handler(val){
        if(val.receivedDrawAmount){
          this.status = true;
          this.activityImg = val.activityImg;
        }else{
          this.status = false;
        }
      }
    }
   },
  onShow(){
    // console.log(this.$store)
    // this.item = this.$store

  },
  methods:{
    onCancel() {
      this.status = false
    },
  }
}
</script>
<style scoped lang="less">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
}
.redenvelope {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560rpx;
  height: 596rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 0 25px;
  .close{
    position: absolute;
    right: 15px;
    top: 5px;
    color: #999999;
    font-size: 30px;
  }
  .title{
    font-size: 23px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(255,102,164,1);
    line-height:51px;
    text-align: center;
    margin-top: 20px;
  }
  .pricebox{
    color: #333333;
    font-size: 15px;
    text-align: center;
    width: 100%;
    span{
      color:rgba(255,102,164,1);
    }
  }
  .img{
    width: 259px;
    height: 99px;
    background: #F5F5F5;
    position: relative;
    top: 15px;
    left: 50%;
    transform: translate(-50%,0%);
    img{
      width: 245px;
      height: 85px;
      margin-top: 7px;
      margin-left: 7px;
    }
  }
  .btnBox{
    width: 259px;
    height: 45px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    top: 30px;
    left: 50%;
    transform: translate(-50%,0%);
    div{
      width: 48%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border-radius: 5px;
      float: left;
      color: #fff;
    }
    div:nth-child(1){
      background: #FFA066;
      margin-right: 10px;
    }
    div:nth-child(2){
      background: #FF66A4;
    }
  }
}
</style>
