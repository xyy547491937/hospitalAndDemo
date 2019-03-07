<template>
<div class="openBox">
  <div class="open" v-if="item.list&&item.list.length>0">
    <div class="openTop">大家帮忙拆了<span class="tipColor">{{item.addUpAmount}}</span>元红包</div>
    <ul>
      <li v-for="(ele,index) in item.list" :key="index">
        <div class="left">
          <img :src="ele.icon" alt="">
          <div>
            <span class="name ellipsis">{{ele.nickName}}</span>
            <span class="times" style="white-space:nowrap;">{{ele.createDate}}</span>
          </div>
        </div>
        <div class="right">帮忙拆了<span class="tipColor">{{ele.drawAmount}}元</span></div>
      </li>
    </ul>
  </div>
  <div class="rule" @click="changeJump('/pagesMine/rule',{id:item.id})">
    规则说明
  </div>
</div>
</template>

<script>
export default {
  props:['item'],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.openBox{
  overflow: hidden;
  border-radius:10rpx;
}
.rule{
  margin: 38rpx auto;
  width: 138rpx;
  height:48rpx;
  line-height:48rpx;
  color:#fff;
  font-size:23rpx;
  text-align: center;
  // padding: 0 22rpx;
  border-radius: 48rpx;
  background:linear-gradient(to bottom, #FF9C7B, #FF5467);
  // background: linear-gradient(top,#FF9C7B #FF5467);
}
.open{
  width: 690rpx;
  margin: 0 auto;
  background: #fff;
  color: #333;
  padding: 0 34rpx 9rpx;
  box-sizing:border-box;
  .tipColor{
    color: #fc8893;
  }
  .openTop{
    height: 99rpx;
    line-height: 99rpx;
    text-align: center;
    font-size: 34rpx;
    border-bottom: 1rpx solid #EEE;
  }
  ul>li{
    height: 99rpx;
    width: 100%;
    padding: 20rpx 0;
    display: flex;
    .left{
      overflow: hidden;
      float: left;
      img{
        width: 99rpx;
        height: 99rpx;
        float: left;
        margin-right: 22rpx;
        border-radius: 100%;
      }
      div{
        float: left;
        .name{
          width: 240rpx;
          font-size: 26rpx;
          line-height: 26rpx;
          padding: 20rpx 0 14rpx 0;
          display: block;
          text-align: left;
        }
        .times{
          width: 240rpx;
          font-size: 24rpx;
          line-height: 24rpx;
          color: #999999;
          display: block;
          text-align: left;
        }
      }
    }
    .right{
      float: right;
      padding: 36rpx 0 0 30rpx;
      font-size: 26rpx;
    }
  }
}
</style>
