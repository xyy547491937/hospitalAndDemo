<template>
  <div>
    <div class="exchange" v-for="(item, index) in list" :key="index"  @click="jump(item)">
      <div class="cover floatL"><img :src="item.commImg[0]" alt=""></div>
      <div class="ondetail floatR">
        <div class="title">{{item.commName}}</div>
        <div class="name"><span class="channel">{{item.detailName}}</span><span>{{item.organName}}</span></div>
        <div v-if="(point|| point==0) && item.distance!='距离过远'" class="position">{{item.distance}} km</div>
        <div v-else class="position">{{item.distance}}</div>
        <div class="priceItem" :style="(point|| point==0)? '' : 'margin-top:40rpx'"  @click.stop="(point|| point==0 || !item.poState)?changeJump('/pagesShop/depositDetail',{id:item.pointCommodityId?item.pointCommodityId:item.id,isLimitTime:item.isLimitTime,activityId:item.pointActivityId,point: point}):changeJump('/pagesShop/exchangeDetail',{id: item.id})">
          <span v-if="(point|| point==0)" class="price1 floatL">{{item.sproutPrice}}</span>
          <span v-else class="price1 floatL">{{item.exchangePoint}}</span>
          <span class="floatL"> 豆芽 </span>
          <span class="throu floatL">￥{{item.price}}</span>
          <span v-if="item.poState == 1" class="state floatR">查看核销码</span>
          <span v-if="item.poState == 3" class="floatR">已过期</span>
          <span v-if="item.poState == 2" class="floatR">已核销</span>
          <span v-if="(point|| point==0)&& item.sproutPrice > point" class="state state1 floatR" @click.stop="changeJump('/pagesMine/integrateSearch',{})">去攒豆芽</span>
          <span v-if="(point|| point==0)&& item.sproutPrice<=point" class="state state2 floatR" :style="item.exchangeNum >= item.stock ? 'background: #ccc;' : ''" @click.stop="item.exchangeNum < item.stock ? save(item):null">{{item.exchangeNum >= item.stock ? '已兑完': '立即兑换'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list','point'],
  data() {
    return {
    };
  },
  wacth:{
    list (value) {
      console.log(this.list)
      var arr = value
      arr.forEach((ele,index) => {
        if(ele.isLimitTime == 1){
          // ele.isNoShow =
        }
      });
    }
  },
  methods: {
    jump(item) {
      if (item.isNoShow==true || item.isNoShow==false) {
        this.changeJump('/pagesShop/depositDetail',{isNoShow:item.isNoShow,id:item.pointCommodityId?item.pointCommodityId:item.id,isLimitTime:item.isLimitTime,activityId:item.pointActivityId,point: this.point})
      } else {
        this.changeJump('/pagesShop/depositDetail',{id:item.pointCommodityId?item.pointCommodityId:item.id,isLimitTime:item.isLimitTime,activityId:item.pointActivityId,point: this.point})
      }
    },
    save(item) {
      var that = this
      wx.showModal({
        title: '温馨提示',
        content: '此次兑换将消耗'+ item.sproutPrice +'豆芽\r\n 请确认兑换吗？',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            console.log(item.commImg)
            that.$http.post("pointOrder/save", {
              organId: item.organId,
              custId: that.$store.state.userInfo.custId,
              pointCommodityId: item.id,
              pointActivityId: item.pointActivityId,
              price: item.price,
              exchangePoint: item.sproutPrice,
              commName: item.commName,
              commType:item.commType,
              commImg:item.commImg,
              isLimitTime:item.isLimitTime,
              organPointActivity:item.organPointActivity,
              unit: item.unit
            }).then(res=>{
              if(res.code == 1){
                that.changeJump('/pagesShop/exchangeDetail',{id:res.data})
              } else if (res.code == -2) {
                wx.showModal({
                  title: '温馨提示',
                  content: res.msg,
                  showCancel: false
                })
              }
            })
          }
        }
      })
    }
  }
};
</script>
<style>
.exchange{
  margin-top: 20rpx;
  width: 750rpx;
  background: #fff;
  font-size: 24rpx;
  color: #999999;
  line-height: 42rpx;
  padding: 30rpx;
  box-sizing: border-box;
  overflow: hidden;
}
.exchange .cover{
  width: 180rpx;
  height: 180rpx;
  margin-right: 25rpx;

}
.exchange .cover img{
  width: 100%;
  height: 100%;
}
.exchange .ondetail{
  width: 480rpx;
}
.ondetail .title{
  font-size: 28rpx;
  color: #333;
  line-height: 28rpx;
  margin-bottom: 10rpx;
  font-weight: 600;
}
.ondetail .channel{
  color:#FEB259;
  padding: 0 10rpx;
  border:1rpx solid #FEB259;
  border-radius: 200rpx;
  display: inline-block;
  box-sizing: border-box;
  margin-right: 10rpx;
}
.ondetail .priceItem{
  color:#FC4396;
  overflow: hidden;
}
.priceItem span{
  margin-right: 6rpx;
}
.ondetail .price1{
  font-size: 34rpx;
  font-weight: 600;
}
.ondetail .throu{
  color: #999999;
  font-size: 20rpx;
  font-weight: normal;
  margin-left: 10rpx;
  padding-top: 4rpx;
  text-decoration:line-through;
}
.ondetail .state{
  padding:0 20rpx;
  border: 1rpx solid #FC4396;
  border-radius: 200rpx;
  font-weight: normal;
  margin: 0;
}
.ondetail .state1{
  border: 0;
  color: #fff;
  background: linear-gradient(to right, #ffb6c9 , #ffcc9a)
}
.ondetail .state2{
  border: 0;
  color: #fff;
  background: linear-gradient(to right, #ddb2fe , #fe9fd9)
}
</style>
