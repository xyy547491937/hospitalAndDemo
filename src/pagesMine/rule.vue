<template>
  <div class="rule">
        <div class="main">
            <div class="title">规则说明</div>
            <div class="content">
            <p v-for="(item,index) in content" :key="index">{{item}}</p>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: ''
    };
  },
  onReady() {
    this.init(this.$route.query.id)
  },
  methods:{
    init(id) {
      this.$http.post("/redPacketActivity/queryOneByPk", {id}).then(res => {
        if (res.code === 1) {
          var strArr = res.data.activityDesc.split('\n\n')
          this.$set(this,'content',strArr)
          console.log(res)
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.rule{
    background: #ffd4bf;
    width: 100%;
    height: 100%;
}
.main{
    padding: 47rpx;
    box-sizing:border-box;
}
.title {
  font-size: 34rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 50rpx;
  margin-bottom: 36rpx;
}
.content{
    font-size:24rpx;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:42rpx;
}
</style>
