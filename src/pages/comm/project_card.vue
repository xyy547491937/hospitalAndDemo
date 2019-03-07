<template>
	<div>
		<div class="item" @click="jump">
			<div class="item-top">
				<div class="item-img">
					<img :src="data.cover" alt="">
				</div>
				<div class="info">
					<div class="z-lines-2-overflow-hidden">
						<h5>[{{ data.commName }}]
							<span>{{ data.remark }}</span>
						</h5>
					</div>
					<p class="addr">{{ data.organName }}</p>
					<div class="price">
						<span>
							<span class="price-span">¥{{ data.groupPrice }}</span>
							<span class="price-old">单买：¥{{ data.price }}</span>
						</span>
					</div>
					<div class="count-c">
						<div class="active">
              <span v-if="data.isStage == 'Y'" class="red">分</span>
							<span v-if="data.isInsurance == 'Y'" class="green">保</span>
              <!-- <span class="count-number">剩余{{ data.count }}</span> -->
						</div>
						<p class="count-info">
              <span v-if="data.onState == 1">距结束：{{ time1 }}</span>
							<span v-if="data.onState == 0">距开始：{{ time2 }}</span>
						</p>
					</div>
				</div>
			</div>
			<hr style="border:none;border-top:1px solid #EEEEEE;" />
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {
				time1: '00天00:00:00',
				time2: '00天00:00:00',
        timer: null,
        timeData: 0
			}
		},
		mounted() {
			if (this.data.commImg) {
				this.data.commImg = this.data.commImg.split(',')
			} else {
				this.data.commImg = []
			}
			let self = this
      let val = new Date(this.data.nowDate.slice(0, 19).replace(/-/g, "/")).getTime()
      let val1 = new Date(this.data.endTime.slice(0, 19).replace(/-/g, "/")).getTime()
      let val2 = new Date(this.data.beginTime.slice(0, 19).replace(/-/g, "/")).getTime()
      if (this.data.onState == 1) {
        this.timeData = val1 - val
        this.timer = setInterval(function () {
					self.time1 = self.dealTime(self.timeData)
				}, 1000)
			}
			if (this.data.onState == 0) {
        this.timeData = val - val2
        this.timer = setInterval(function () {
					self.time2 = self.dealTime(self.timeData)
				}, 1000)
			}
		},
		onShow () {
			// this.data.commImg = this.data.commImg.split(',')
			// let self = this
			// if (this.data.onState == 1) {
			// 	this.timer = setInterval(function () {
			// 		self.time1 = self.dealTime(self.data.endTime)
			// 	}, 1000)
			// }
			// if (this.data.onState == 0) {
			// 	this.timer = setInterval(function () {
			// 		self.time2 = self.dealTime(self.data.beginTime)
			// 	}, 1000)
			// }
		},
		onUnload () {
			clearInterval(this.timer)
			// console.log(this.timer)
		},
		methods: {
			jump(){
				this.$router.push({
					path:"/pagesShop/pin/project_detail",
					query: {
						id: this.data.id, // 拼团活动id
						clusterNo: this.data.clusterNo, // 成团人数
						groupState: this.data.groupState, // 拼团状态
						onState: this.data.onState, // 活动进行状态
						groupCommId: this.data.groupCommId, // 拼团商品id
						commId: this.data.commId, // 商品id
					}
				})
			},
			dealTime (times) {
        // let val = times.slice(0, 19).replace(/-/g, "/")
        // let val1 = nowdata.slice(0, 19).replace(/-/g, "/")
				// let a = nowdata ? new Date(val1).getTime() : new Date().getTime()
				// let b = new Date(val).getTime()
        // let c = b - a - 1000
        this.timeData = times - 1000
        let c = times - 1000
				c = Math.abs(c)
				let j = Math.floor(c / (24 * 60 * 60 * 1000)) // 天
				let d = Math.floor((c - j*24*60*60*1000) / (60 * 60 * 1000)) // 时
				let e = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000) / (60 * 1000)) // 分
				let f = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000 - e * 60 * 1000) / 1000) // 秒
				let k = j > 9 ? j : '0' + j
				let g = d > 9 ? d : '0' + d
				let h = e > 9 ? e : '0' + e
				let i = f > 9 ? f : '0' + f
				return `${k}天${g}:${h}:${i}`
			}
		},
		destroyed () {
			clearInterval(this.timer)
		}
	};
</script>

<style scoped>
	.price-old {
		font-weight: normal;
    font-size: 24rpx;
    color: #999;
	}

	.price-span {
		color: #FF5097;
		font-weight: bold;
		margin-right: 0.2rem;
    font-size: 30rpx;
	}

	.item {
		margin-bottom: .3rem;
		/* border-bottom: 1px solid #EEEEEE; */
		width: 94%;
		margin-left: 3%;
	}

	.item-top {
		display: flex;
		display: -webkit-flex;
		padding-bottom: .17rem;
		margin-bottom: .1rem;
	}

	.item .item-img {
		width: 2rem;
		height: 2rem;
		border-radius: .2rem;
	}

	.item .item-img img {
		height: 100%;
		width: 100%;
	}

	.item .info {
		padding-left: .29rem;
		width: 5rem;
		font-weight: bold;
	}

	.item .info h5 {
		width: 4.35rem;
		font-size: .28rem;
		color: #333;
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
		font-weight: normal;
	}

	.item .info h5 span {
		font-size: .28rem;
		font-weight: normal;
	}

	.item .info .addr {
		font-size: .24rem;
		color: #999;
		line-height: .6rem;
	}

	.item .price {
		font-size: .24rem;
		color: #999;
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}



	.item .price em {
		font-size: .3rem;
		color: #FF4691;
		font-weight: 500;
	}

	.item .price em>i {
		font-size: .26rem;
		font-weight: normal;
	}

	.item .price em>b {
		font-size: .2rem;
		font-weight: normal;
	}

	.item .price del {
		font-weight: normal;
		color: #bbbbbb;
		font-size: .24rem;
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
		font-size: .24rem;
		color: #bbbbbb;
		text-align: left;
		font-weight: 100;
	}

	.count-collection-btn,
	.count-collection-btn1 {
		text-align: right;
	}

	.count-collection-btn>span {
		width: 1.2rem;
		height: 0.41rem;
		border: 1px solid #FFA6DA;
		display: inline-block;
		text-align: center;
		border-radius: 0.2rem;
		color: #FB84BC;
		line-height: 0.41rem;
	}

	.count-collection-btn1>span {
		width: 1.2rem;
		height: 0.41rem;
		border: 1px solid #EEEEEE;
		display: inline-block;
		text-align: center;
		border-radius: 0.2rem;
		color: #999999;
		line-height: 0.41rem;
	}

	.count-collection-btn>span>img {
		width: 0.2rem;
		height: 0.17rem;
	}

	.count-collection-btn>span>em {
		font-size: 0.24rem;
	}

	.item .active {
		font-size: .25rem;
		color: #555555;
		margin-bottom: .2rem;
	}

	.item .active span {
		color: #fff;
		padding: .02rem .05rem;
		border-radius: .06rem;
	}

	.item .active span.red {
		background: #ff96be;
		margin-right: 0.2rem;
		padding: 3rpx 6rpx;
	}

	.item .active span.green {
		background: #69e1d7;
		padding: 3rpx 6rpx;
    /* margin-right: 0.2rem; */
	}

	.count {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		color: #CCCCCC;
		line-height: .6rem;
		padding-left: .1rem;
	}

	.count .praise {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}

	.count img {
		width: .22rem;
		vertical-align: initial;
	}

	.count span {
		padding: 0 .1rem 0 0;
	}
  .count-info {
    color: #333;
    font-size: 24rpx;
  }
  .count-number {
    color: #999 !important;
    font-size: 24rpx;
    font-weight: normal;
  }
</style>
