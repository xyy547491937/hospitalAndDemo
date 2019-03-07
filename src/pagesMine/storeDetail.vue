<template>
	<div class="basic">
		<hr style="border:none;border-top:0.1rem solid #EEEEEE;" />
		<div class="store-top" style="background-color: #FFFFFF;">
			<div class="item" >
				<div class="item-top">
					<div class="item-img">
						<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" > -->
						<img :src="storeInfo.logo" >

					</div>
					<div class="info">
						<div class="info-title">{{storeInfo.organName}}</div>
						<div class="info-addr">{{storeInfo.address}}</div>
						<div class="balance">
							<div class="balance-title">可用余额</div>
							<div class="balance-money">￥{{storeInfo.balance + storeInfo.rechargeMoney}}</div>
							<div class="info-money">
								<div class="info-money-title">剩余余额：￥{{storeInfo.balance}}</div>
								<div class="info-money-two">增值金：￥{{storeInfo.rechargeMoney}}</div>
							</div>
						</div>
						<div class="info-bottom">服务项目：<span>{{storeInfo.chineseName}}</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="zixun">
            <div class="clear1 zxs zixun-item">
				<span>咨询师：{{storeInfo.counselorName}}</span>
			</div>
			<div class="clear1 zixun-item">
				<div class="tag-title">剩余项目：</div>
				<div class="tag-item">{{storeInfo.executionProjectName}}</div>
			</div>
		</div>
		<!-- <div class="yuyue">
             <div class="yuyue-item" @click="call">
				 <img src="http://img.meiduduo.com/images/productDetails/phone.png" alt="">
				 <span>电话预约</span>
			 </div>
			 <div class="yuyue-item" open-type="contact">
				 <img src="http://img.meiduduo.com/images/productDetails/message.png" alt="">
				 <span>在线咨询</span>
			 </div>
		</div> -->
		<div class="pass-item" v-if="servicedItems&&servicedItems.length">
             <div class="pass-title">
				   <!-- <span></span> -->
                   <div class="pass-item-text">
					   <span class="before"></span>
					   服务过的项目
					   <span class="after"></span>
				   </div>
			 </div>
			 <div class="pass-content">
                 <div class="item" v-for="(item,index) in servicedItems" :key="index">
					<div class="item-top">
						<div class="item-img">
							<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" alt=""> -->
							<img :src="item.commImg" alt="">
						</div>
						<div class="info">
							<div>
								<h5>{{item.commodityName }}
											<!-- <span>[瘦身美体套餐］网红脸套餐（芭比眼综合＋ 鼻综合＋全面部自体脂肪填充）</span> -->
										</h5>
							</div>
							<p class="addr">{{item.commodityName }}</p>
							<p class="price-spans">¥{{item.price?item.price:0}}
								<span style="text-decoration:line-through">指导价：¥{{item.rulePrice?item.rulePrice:0}}</span>
							</p>
							<div class="price-nub">
								<div class="">
									<span id="" class="fenqi" v-if="item.isStage">分</span>
									<span id="" class="baoxian" v-if="item.isInsurance">保</span>
									</div>
									<div class="">
										<span>{{item.buyNum ? item.buyNum :0}}人购买</span>
									</div>
								</div>
						</div>
					</div>
				 </div>

			 </div>
		</div>

	</div>
</template>

<script>
 export default {
   data () {
     return {
        custId:'',
		peopleId:'',
		organId:'',
		storeInfo:{},
		servicedItems:[]
     }
   },
   computed:{
    httpUrl(){
      return this.$store.state.httpUrl
    }
  },
   methods:{
    getStoreInfo(){
			this.$http.post(this.httpUrl + '/his/serviceEvaluation/getArrivedShopDetail',{
					peopleId:this.peopleId,
					organId:this.organId
				}
			).then(res=>{
				console.log(res);
				if(res.code == 1){
					this.storeInfo = res.data
				}
			})
	   },
	   call(){
		   wx.makePhoneCall({
			   phoneNumber:this.storeInfo.tel
		   })
	   },
       getServicedItems(pageNum){
           this.$http.post('/order/list4Page',{
			   		custId:this.custId,
					organId:10,
					osId:7,
					pageNum,
					pageSize:15
				}
			).then(res=>{
				console.log(res);
				if(res.code == 1){
					this.servicedItems = res.data.data
				}
			})
	   }

   },
   onLoad(options){
	   this.custId = this.$store.state.userInfo.custId
	   this.peopleId = this.$store.state.userInfo.peopleId
	   this.organId = options.organId
	   this.getStoreInfo()
       this.getServicedItems(1)
   }

 }
</script>

<style>
	.info-bottom{
		font-size: 0.24rem;
		color:#BABABA;
		margin:0.1rem 0;

	}
	.info-bottom span{
		color: #333;
	}
	.info-money{
		font-size: 0.24rem;
		background-color: #EEEEEE;
		margin-top: 0.05rem;
		padding: 0.1rem 0.2rem;
	}
	.info-money-title{
		display: inline-block;
		margin-right: 0.2rem;
	}
	.info-money-two{
		display: inline-block;
	}
	.balance-money{
		display: inline-block;
		font-size: 0.24rem;
		color:#FF4691;
		margin-left: 0.2rem;
	}
	.balance-title{
		font-size: 0.24rem;
		color:#C0C0C0;
		display: inline-block;

	}
	.info{
		 margin-left: 32rpx;
		 flex: 1;
	}
	.info-title{
		font-size: 0.32rem;
		font-weight: bold;
		margin: 0.1rem 0 0.2rem 0;
	}
	.info-addr{
		font-size: 0.24rem;
	}
	.basic{
		background-color: #F1F1F1;
		height: 100%;
		width:100%;

	}
	.store-top .item {
		/* width: 94%;
		margin-left: 3%; */
		padding: 44rpx 20rpx 32rpx 50rpx;
	}
	.store-top .item-top {
		display: flex;
		display: -webkit-flex;
		/* padding: 0.17rem 0.17rem 0.17rem 0; */
		/* border-bottom: 1px solid #EEEEEE; */
	}
	.store-top .item .item-img {
		padding: 0.2rem  0.1rem 0.1rem 0.1rem;
		width: 180rpx;
		height: 180rpx;
		border-radius: .2rem;
	}
	.store-top .item .item-img img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
	/* 咨询师 */
	.zixun{
		margin: 20rpx 0;
		padding: 0rpx 32rpx;
		font-size: 28rpx;
		color: #333;
		background: #fff;
	}
	.zixun .zxs{
		border-bottom: 1rpx solid #EEEEEE;
	}
	.clear1{
		overflow: hidden;
	}
	.zixun .zixun-item{
        padding: 30rpx 0 30rpx 10rpx;
	}
	.zixun .tag-title{
		float: left;
	}
	.zixun .tag-item{
		float: left;
		margin-left: 30rpx;
	}
    /* 预约 */
    .yuyue{
        padding: 60rpx;
		display: flex;
		justify-content: space-between;
		background: #fff;
		margin-bottom: 18rpx;
	}
	.yuyue .yuyue-item{
		margin-right:14rpx;
		width: 260rpx;
		height: 60rpx;
		line-height: 60rpx;
		border: 2rpx solid #FF4691;
		border-radius: 30rpx;
		color: #FF4691;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.yuyue .yuyue-item img{
		width: 32rpx;
		height: 32rpx;
		margin-right: 10rpx;
	}
	/* 服务过的项目 */
	.pass-item{
		padding: 0 22rpx;
		background: #fff;
	}
	.pass-item .pass-title{
		font-size: 24rpx;
		color: #333;
		text-align: center;
		padding: 26rpx 0;
		border-bottom: 2rpx solid #eee;
	}
	.pass-item  .pass-item-text{
		position: relative;
		display: inline-block;
	}
	.pass-item  .pass-item-text span{
        position: absolute;
		top: 50%;
		height: 2rpx;
		width: 60rpx;
		background: #333;
	}
	.pass-item  .pass-item-text span.before{
		left: -70rpx;
	}
	.pass-item  .pass-item-text span.after{
		right: -70rpx;
	}

	.collect-kuang {
		margin-top: 1.5rem;
	}

	.pass-item .mine {
		background-color: #F1F1F1;
	}
	.pass-item .guanzhu {
		position: absolute;
		right: 0.2rem;
		bottom: 0.5rem;
	}

	.pass-item .fenqi{
		background: #FA97E6;
		padding: 2px 4px;
		color: #fff;
		border-radius: 0.1rem;
		margin-right: 0.1rem;
	}
	.pass-item .baoxian{
		background: #7BDBCF;
		padding: 2px 4px;
		color: #fff;
		border-radius: 0.1rem;
	}
	.pass-item .item-top {
		display: flex;
		display: -webkit-flex;
		/* padding-bottom: .17rem; */
		padding:20rpx 0;
	}

	.pass-item .pass-content .item .item-img {
		width: 2.6rem;
		height: 1.8rem;
		border-radius: .2rem;
	}

	.pass-item .pass-content .item .item-img img {
		height: 100%;
		width: 100%;
		border-radius: 0.1rem;
	}
	.pass-item .pass-content .item .info h5 {
		width: 4.35rem;
		font-size: .28rem;
		color: #333;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pass-item .pass-content .item .info h5 span {
		font-size: .28rem;
		font-weight: bold;
	}

	.pass-item .pass-content .item .info .addr {
		font-size: .24rem;
		color: #999;
		line-height: 2;
	}

	.pass-item .pass-content .item .price {
		font-size: .24rem;
		color: #999;
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-top: 0.15rem;
	}

	.pass-item .pass-content .item .price em {
		font-size: .3rem;
		color: #FF4691;
		font-weight: 500;
	}

	.pass-item .pass-content .item .price em>i {
		font-size: .26rem;
		font-weight: normal;
	}

	.pass-item .pass-content .item .price em>b {
		font-size: .2rem;
		font-weight: normal;
	}

	.pass-item .pass-content .item .price del {
		font-weight: normal;
		color: #bbbbbb;
		font-size: .24rem;
	}
	.price-spans {
		color: #FF5097;
		font-size: 28rpx;
		margin-right: 0.28rem;
	}
	.price-spans span{
		color: #999;
		font-size: 0.24rem;
		margin-right: 0.28rem;
		margin-left: 0.2rem;
	}
	.price-nub{
		font-size: 0.24rem;
		color: #999;
		margin-top: 10rpx;
	}
	.price-nub div:first-child{
		color: #fff;
		width: 70%;
		display: inline-block;
	}
	.price-nub div:last-child{
		width: 30%;
		display: inline-block;
		text-align: right;
	}


</style>
