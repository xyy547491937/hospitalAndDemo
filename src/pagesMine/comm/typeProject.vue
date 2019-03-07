<template>
	<div>
		<div class="length" v-if="list.length>0" >共{{list.length}}条收藏</div>
		<div class="item" v-if="list.length>0"  @click="jump(item)" v-for="(item,index) in list" :key="index">
			<div class="item-top">
				<div class="item-img">
					<img :src="item.cover[0]" alt="">
				</div>
				<div class="info">
					<div>
						<h5>[{{item.commName}}]
							<!-- <span>{{item.remark}}</span> -->
						</h5>
					</div>
					<p class="addr">{{item.organName}}</p>
					<div class="price">
						<!-- <span><em><i>¥</i><span>1600</span><b >&nbsp;/&nbsp;{{item.unit}}</b>&nbsp;&nbsp;</em><del><i>¥</i>{{item.price}}</del></span> -->
						<span>
							<span class="price-span">¥{{item.rulePrice}}</span>
							<!-- <span class="price-old">医院价：¥{{item.price}}</span> -->
							<span class="price-old">指导价：¥{{item.price}}</span>
						</span>

						<span class="count-buy">{{item.buyNum}}人购买</span>
					</div>
					<div class="count-c">
						<div class="active">
							<span class="red" v-if="item.isInsurance">分期</span>
							<span class="green" v-if="item.isStage">保险</span>
						</div>
						<p class="count-collection-btn" @click.stop="delItem=item;delIndex=index;visible1=true">
							<span>
								<em>已收藏</em>
							</span>
						</p>
					</div>

				</div>
			</div>
			<hr style="border:none;border-top:1px solid #EEEEEE;" />
		</div>
    <i-modal title="取消确认" :visible="visible1" :actions="actions1" @iclick="handleClick1">
      <view>确认取消收藏？</view>
    </i-modal>
	</div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      delItem: {},
      delIndex: '',
      visible1: false,
      actions1: [
        {
          name: "取消"
        },
        {
          name: "确定",
          color: "#ed3f14",
          loading: false
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {},
  methods: {
    handleClick1({mp}) {
      if (mp.detail.index === 0) {
        this.visible1 = false
      } else {
        this.del(this.delItem,this.delIndex)
      }
    },
    jump(item) {
      this.$router.push({
        path: "/pagesShop/productDetails",
        query: { id: item.recordId }
      });
    },
    del(item, index) {
      let params = {
        custId: this.$store.state.userInfo.custId,
        recordType: "3",
        recordId: item.recordId,
        state: "-1"
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/storeRecord/save", params).then(res => {
        wx.hideLoading();
        if (res.code == 1) {
          this.visible1 = false
          this.list.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style scoped>
.length {
  padding: 10rpx 20rpx;
  color: #999;
  background: #fff;
  font-size: 28rpx;
  border-bottom: 1rpx solid #eee;
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
  /* margin-top:10px; */
  width: 100%;
  padding: 20rpx 20rpx 0 20rpx;
  background: #fff;
  box-sizing: border-box;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  padding-bottom: 0.17rem;
  margin-bottom: 0.1rem;
}

.item .item-img {
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 6rpx;
}

.item .info {
  padding-left: 0.29rem;
  width: 5rem;
  font-weight: bold;
}

.item .info h5 {
  width: 4.35rem;
  font-size: 0.28rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}

.item .info h5 span {
  font-size: 0.28rem;
  font-weight: normal;
}

.item .info .addr {
  font-size: 0.24rem;
  color: #999;
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

.item .price em {
  font-size: 0.3rem;
  color: #ff4691;
  font-weight: 500;
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
</style>
