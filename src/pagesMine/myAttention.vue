<template>
	<div class="basic">
		<hr style="border:none;border-top:18rpx solid #f5f5f5;" />
		<div style="background-color: #FFFFFF; padding:15px 0">
      <div class="all-focus" v-if="list&&list.length > 0">
          全部关注
      </div>
		<div class="item" v-if="list&&list.length > 0" v-for="(item,index) in list" :key="index" @click="jump(item)">
			<div class="item-top">
				<div class="item-img flex-r">
					<img :src="item.icon" alt="">
				</div>
				<div class="info">
					<div class="title-yy">
						{{item.name}}
					</div>
          <!-- technical -->
          <!-- 医生是职称 ，医院是医院等级， 达人就是内容 -->
					<div class="addr" v-if="item.recordType==1"><div class="addr-item"> {{item.technical}}</div>  </div>
          <div class="addr" v-else><div class="addr-item"><rich-text class='richText' :nodes="item.content"></rich-text></div>  </div>
					<div class="price">
             <!-- 类型(1:医生--; 2:医院--; 3:商品; 4:资讯; 5:日记; 6:达人--; 7:日记本; 8:问答;9:小视频;10:文章;11:评论) , -->
						<span class="count-buy" v-if="item.recordType==2">已约 <span>{{item.number?item.number:0}}</span></span>
            <span class="count-buy" v-else-if="item.recordType==1"> {{item.areaName}}<span></span></span>
            <span class="count-buy" v-else>粉丝 <span>{{item.number?item.number:0}}</span></span>
					</div>
				</div>
        <!-- 已关注 -->
        <span @click.stop="del(item,index)" class="focus-btn"> <i-icon type="right" color="#999"/>已关注</span>
			</div>
		</div>
		</div>
    <div id="nolist" v-if="list && list.length == 0">
    <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
    </div>
    <div v-if="isOver &&list&& list.length > 0">
      <load-over classs="list_over"></load-over>
    </div>
	</div>
</template>

<script>
import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件
export default {
  data() {
    return {
      loaded: false,
      list: [],
      isOver: false,
      pageNum: 1,
      pageSize: 10
    };
  },
  components: {
    "load-over": loadOver
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getList();
    }
  },
  onLoad(){
    this.list = []
  },
  onShow() {
    this.loaded = false
    this.pageNum = 1;
    this.list = [];
    this.isOver = false;
    this.getList();
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.list = [];
    this.isOver = false;
    this.getList();
    wx.stopPullDownRefresh();
  },
  methods: {
    getList() {
      this.$http
        .post("/focusRecord/list4Page", {
          custId: this.user.custId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.code == 1&&res.data.data) {
            if (res.data.data.length == 0) {
              this.list = [];
              this.pageNum = 1;
              this.isOver = false;
            } else {
              let a = res.data.data;
              if (res.data.pageNum == 1) {
                this.list = a;
              } else {
                this.list = this.list.concat(a);
              }
              console.log(
                this.pageNum == res.data.pages,
                a && a.length < this.pageSize
              );
              if (
                this.pageNum == res.data.pages ||
                (a && a.length < this.pageSize)
              ) {
                this.isOver = true;
              } else {
                this.pageNum++;
                this.isOver = false;
              }
            }
            this.loaded = true
          }
        });
    },
    jump(item) {
      switch (item.recordType) {
        case 1: //医生
          this.changeJump("/pagesShop/doctor_detail", { id: item.recordId });
          break;
        case 2: //医院
          this.changeJump("/pagesShop/orgin", { id: item.recordId });
          break;
        case 6: //达人
          this.changeJump("/pagesMine/index", {
            custId: item.recordId,
            status: false
          });
          break;
      }
    },
    del(item, index) {
      this.$http
        .post("/focusRecord/save", {
          recordType: item.recordType,
          recordId: item.recordId,
          custId: item.custId,
          state: "-1"
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: "已取消关注",
              icon: "none",
              success: r => {
                // console.log(r);
                this.list.splice(index, 1);
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
/*xyy editor*/
// @import url("../css/style.less");
.item-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.focus-btn {
  display: block;
  width: 1.4rem;
  height: 0.4rem;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 16px;
  font-size: 0.22rem;
  color: #999;
  text-align: center;
  line-height: 0.4rem;
}
.all-focus {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.3rem;
  width: 94%;
  margin-left: 3%;
}
.addr span {
  border: solid #eeeeee 1px;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  margin-left: 2rem;
  float: right;
}
.basic {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
}
.price-old {
  text-decoration: line-through;
  font-weight: normal;
}

.price-span {
  color: #ff5097;
  font-weight: bold;
  margin-right: 0.2rem;
}

.item {
  margin-bottom: 0.3rem;

  width: 94%;
  margin-left: 3%;
  border-top:1rpx solid #f5f5f5;
}

.item .item-img {
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 1.9rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  margin: 0 auto;
}

.item .info {
  /* padding-top: 0.2rem; */
  padding-left: 0.29rem;
  /* width: 80%; */
  font-weight: bold;
  width: 394rpx;
}

.item .info .title-yy {
  font-size: 0.28rem;
  font-weight: bold;
}

.item .info .addr {
  font-size: 0.24rem;
  color: #999;
  /* line-height: 0.6rem; */
  /* margin: 0.1rem 0; */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* height: .5rem;
		line-height: .5rem; */
}
.item .info .addr .addr-item {
  display: inline-block;
  width: 3rem;
  overflow: hidden;
  height: 0.6rem;
  /* line-height: 0.6rem; */
  font-size: 0.24rem;
  color: #555;
  line-height: 0.6rem;
}
.item .price {
  font-size: 0.24rem;
  color: #999;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.item .price em > i {
  font-size: 0.26rem;
  font-weight: normal;
}

.item .price em > b {
  font-size: 0.2rem;
  font-weight: normal;
}

.item .price del {
  font-weight: normal;
  color: #bbbbbb;
  font-size: 0.24rem;
}
.count-c {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.15rem;
}
.item .count-buy {
  font-size: 0.24rem;
  color: #bbbbbb;
  text-align: left;
  font-weight: 100;
}
.item .count-buy span {
  color: #ff4691;
}
.count-collection-btn,
.count-collection-btn1 {
  text-align: right;
}

.count-collection-btn > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #ffa6da;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #fb84bc;
  line-height: 0.41rem;
}

.count-collection-btn1 > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #eeeeee;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #999999;
  line-height: 0.41rem;
}

.count-collection-btn > span > img {
  width: 0.2rem;
  height: 0.17rem;
}

.count-collection-btn > span > em {
  font-size: 0.24rem;
}

.item .active {
  font-size: 0.25rem;
  color: #555555;
  margin-bottom: 0.2rem;
}

.item .active span {
  color: #fff;
  padding: 0.02rem 0.05rem;
  border-radius: 0.06rem;
}

.item .active span.red {
  background: #ff96be;
  margin-right: 0.2rem;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.item .active span.green {
  background: #69e1d7;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.count {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  color: #cccccc;
  line-height: 0.6rem;
  padding-left: 0.1rem;
}

.count .praise {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.count img {
  width: 0.22rem;
  vertical-align: initial;
}

.count span {
  padding: 0 0.1rem 0 0;
}
.over_banner {
  font-size: 20rpx;
  color: #a9a9a9;
  text-align: center;
  padding: 17rpx;
  /* background: #fff; */
}
.no_data {
  width: 100%;
  height: 900rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #a9a9a9;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
