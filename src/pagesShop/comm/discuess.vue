<template>

  <div class="discuess flex-c">
    <!-- 评价的模块 -->
    <div class="discuess-num flex-r">
      <span>项目评价(450)</span>
      <span class="c">
        <i-icon type="enter" size="15" color="#80848f" /></span>
    </div>
    <!-- tag -->
    <div class="list-rate flex-r">
      <i>效果5.0</i> <i>环境5.0</i> <i>专业5.0</i> <i>服务5.0</i>
    </div>
    <div class="discuess-code-box flex-r">
      <!-- <div class="c"> -->
      <div class="user-arv"><img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg" alt=""></div>
      <div class="user-code flex-c">
        <p class="flex-r"> <span style="color:#3F6BA6">匿名用户22231</span> <span>
            <i-icon type="praise" size="15" color="#80848f" /></span></p>

        <p style="color:#333">用清水稀释后的白醋水可以用于洗脸。白醋本身有抑菌、
          美白、软化角质的作用，每天坚持用白醋洗脸可以让面
          部肌肤白白嫩嫩</p>
        <p class="flex-row" style="color:#999">
          <span class="c">
            20分钟前
          </span>
          <span class="c" style="margin-left:5px">
            浏览255865
          </span>
        </p>
        <!-- 图片列表 -->
        <div class="flex-r img-list">
          <img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg " alt="" class="c" v-for="v in 5" :key="v">
        </div>
        <!-- 机构回复 -->
        <div class="c organ-repeat">
            <p class="c"> 机构回复</p>
            <p class="c">谢谢亲的好评</p>
        </div>
      </div>
      <!-- </div> -->


    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.discuess {
  font-size: 30rpx;
  color: #666;
  padding: 0 32rpx;
}

.flex-c {
  display: flex;
  flex-direction: column;
}

.flex-r {
  display: flex;
  flex-direction: row;
}

.discuess-num {
  justify-content: space-between;
  margin-top: 10px;
}

.list-rate i {
  padding: 2px 3px;
  margin-left: 5px;
  background: #f1f1f1;
  border-radius: 10px;
}

.user-arv {
  width: 15%;
}
.list-rate {
  margin: 10px 0;
}
.user-arv img {
  width: 0.66rem;
  height: 0.66rem;
  border-radius: 50%;
}

.user-code {
  width: 85%;
}

.user-code p:first-child {
  padding: 0 0 10px 0;
  justify-content: space-between;
}

.user-code > p:nth-child(2) {
  padding: 5px 0;
  line-height: 25px;
}

.img-list {
  margin-top: 5px;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

.img-list img {
  width: 30%;
  height: 1.86rem;
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 6px;
}
.organ-repeat {
  margin-top: 5px;
  width: 100%;
  background: #f1f1f1;
  padding: 10px 0;
  border-radius: 6px;
}
.organ-repeat p {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
