<template>
<div>
  <loading v-if="show"></loading>
	<div v-else class="project-info">
		<div class="box">
			<div class="loop">
				<!-- <banner></banner> -->
				<swiper :indicator-dots="true" :autoplay="true" :circular="true" class="banner">
					<block v-for="(item, index) of comm.commImg" :key="index">
						<swiper-item>
							<image :src="item" mode="widthFix" class="slide-image"/>
						</swiper-item>
					</block>
				</swiper>
			</div>
			<div class="project">
				<h5>
					<span>[{{ comm.commName }}]</span>
          <span style="font-weight: 200;">{{ comm.remark }}</span>
        </h5>
				<p class="project_price">
          <span>￥{{ comm.groupPrice }}</span>&nbsp;&nbsp;
          <span>单买：￥{{ comm.rulePrice }}</span>
        </p>
				<p class="position">
					<span></span>
					<span>{{ clusterNo }}人拼单</span>
				</p>
			</div>
		</div>
		<div class="box server">
			<div class="name">服务</div>
			<div class="item">
				<div class="link">
					<span>闪电退</span>
					<span v-if="comm.isInsurance == 1">保险</span>
					<span v-if="comm.isStage == 1">分期</span>
				</div>
			</div>
		</div>
    <div v-if="groupState == '拼团中'" class="join_list after_line">
      <i-cell :title="joinInfo" @click="showMore" :only-tap-footer="true">
				<span @click="showMore" slot="footer">查看更多 ></span>
			</i-cell>
      <div>
        <div v-if="index < 2" v-for="(item, index) of joinList" :key="index" class="spell_details_join_items" @click.stop="go(index, item)">
            <div>
                <img class="spell_details_join_item" :src="item.icon">
                <p style="margin-left: .17rem;">{{ item.nickName }}</p>
            </div>
            <div>
                <div class="join_details_infos">
                    <span>还差<span style="color: #FF4691;">{{ item.gapNo }}人</span>拼成</span>
                    <span style="color: #aaa;font-size: 22rpx;">剩余{{ item.time }}</span>
                </div>
                <div>
                    <button v-if="item.custId == user.custId" class="spell_btn">去邀请</button>
                    <button v-else class="spell_btn">去拼单</button>
                </div>
            </div>
        </div>
      </div>
    </div>
		<div class="addr-box after_line">
			<div @click="goOrgan" class="address">
				<div class="addr-img">
					<img :src="organ.logo">
				</div>
				<div class="addr-p">
					<div>
						<p>{{ organ.organName }}</p>
						<p>资质：{{ organ.aptitude }}</p>
						<p>地址：{{ organ.address }}</p>
					</div>
				</div>
			</div>
      <!-- <i-cell :title="doctor.personalName" :value="doctorInfo" is-link></i-cell> -->
			<div @click="goDoctorDetail" class="doctor_info">
				<span>{{ doctor.personalName }}</span>
				<span class="doctor_msg">{{ doctorInfo }}</span>
				<i-icon type="enter" size="18" />
			</div>
		</div>
		<!-- <div class="reply_main">
			<i-cell title="项目评价（450）" is-link url="/pages/index"></i-cell>
			<div class="score_main">
				<span class="score_item">效果4.9</span>
				<span class="score_item">环境4.9</span>
				<span class="score_item">专业4.9</span>
			</div>
			<div>
				<evaluationCard></evaluationCard>
				<evaluationCard></evaluationCard>
			</div>
			<div class="reply_footer_btn">
				<span>
					<span>查看全部评价</span>
					<i-icon type="enter" color="#FF4691" size="18" />
				</span>
			</div>
		</div> -->
		<div class="box box1">
			<div class="order-tab">
				<i-tabs :current="current" color="#f759ab" @change="handleChange">
            <i-tab v-for="(item, index) of orderArr" :key="index" :title="item"></i-tab>
        </i-tabs>
			</div>
			<div class="tab-item tab-item2" v-show="orderTabIndex==0">
				<div class="tab-title">服务介绍</div>
				<rich-text class="richText" :nodes="comm.commInfo"></rich-text>
				<!-- <div ref="commInfo" class="item-block">
          {{ doctor.commInfo }}
        </div> -->
				<!-- <div class="tab-title">医生介绍</div>
				<div class="item-block">
					<div class="item-banner">
						<img mode="widthFix" v-for="(item, index) of doctor.photo" :key="index" :src="item">
					</div>
					<rich-text class="richText" :nodes="doctor.introduce"></rich-text> -->
					<!-- <p ref="doctorIntro">{{ doctor.introduce }}</p> -->
				<!-- </div> -->
				<!-- <div class="tab-title">医院介绍</div>
				<h2>{{ organ.organName }}</h2> -->
				<!-- <div class="item-banner">
					<img :src="organ.completePicture">
				</div> -->
				<!-- <rich-text class="richText" :nodes="organ.introduce"></rich-text> -->
				<div class="tab-title">版权声明</div>
				<div class="item-block">
					<p>如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请相关权利人或利害关系人与胚豆网联系。</p>
				</div>
				<div class="tab-title">免责声明</div>
				<div class="item-block">
					<!-- <p>任何信息都不能替代职业医师面对面的诊断和治疗，本网站所载的内容信息和数据仅供参考。</p> -->
          <p v-if="organ.organType == 1">该服务项目需您与医生当面沟通咨询方能最终确定治疗方案，本站所载内容仅供参考。</p>
          <p v-else>该服务为线下服务，本站所载内容仅供参考。</p>
				</div>
			</div>
			<div class="tab-item tab-item1" v-show="orderTabIndex==1" style="color:#999">
				<evaluationCard></evaluationCard>
			</div>
		</div>
		<!-- <hr style="height:0.4rem;border:none;border-top:0.4rem solid #F1F1F1;" />
		<div class="box phone">
				<img src="http://img.meiduduo.com/images/productDetails/big_phone.png" alt="">
				<p><a>免费拨打咨询热线</a></p>
		</div> -->
		<hr style="height:1.4rem;border:none;border-top:1.4rem solid #F1F1F1;" />
		<div class="footer">
			<div class="footer-left">
				<div @click="toCall">
					<img src="http://img.meiduduo.com/images/shop/call.png" alt="">
					<span>电话</span>
				</div>
            	<div class="customer_box">
					<img src="http://img.meiduduo.com/images/shop/message_b.png" alt="">
					<!-- <span>客服</span> -->
					<button class="customer_service" open-type="contact">客服</button>
            	</div>
			</div>
			<div class="footer-right">
				<!-- <div>加入购物车</div>
				<div  @click="jump">立即购买</div> -->
            	<button @click="jump(1)" class="footer_right_btn">发起拼单</button>
			</div>
		</div>

    <div v-if="modal1" class="modal">
      <div class="modal_main">
        <p class="modal_title">
          <span>正在拼单</span>
          <span @click="cancelModal">
            <img class="modal_cancel" src="http://img.meiduduo.com/images/shop/cancel.png" alt="">
          </span>
        </p>
        <scroll-view scroll-y style="height: 600rpx;" @scrolltolower="lower">
          <div v-if="joinList.length > 0 && index < 10" v-for="(item, index) of joinList" :key="index" class="join-item-box"  @click.stop="go(index, item)">
              <div>
                  <img class="join-item-img modal_img" :src="item.icon">
              </div>
              <div class="join-item-main">
                  <p>
										<span class="join-item-user">{{ item.nickName }} </span>
										<span> 还差{{ item.gapNo }}人</span>
									</p>
									<p>剩余{{ item.time }}</p>
              </div>
							<div class="join-item-btn">
								<!-- <button class="spell_btn">去拼单</button> -->
                <button v-if="item.custId == user.custId" class="spell_btn">去邀请</button>
                <button v-else class="spell_btn">去拼单</button>
							</div>
          </div>
		  <div class="join_list_no" v-if="joinList.length < 1">
			  <p>没有数据！</p>
		  </div>
        </scroll-view>
        <p class="modal_footer">最多显示10个正在拼单的人</p>
      </div>
    </div>

    <div v-if="modal2" class="modal">
      <div class="modal2_main">
        <span @click="cancelModal2">
          <img class="modal_cancel" src="http://img.meiduduo.com/images/shop/cancel.png" alt="">
        </span>
        <p>参与{{ joinList[nowIndex].nickName }}的拼单</p>
        <p class="modal2_info">仅剩<span class="modal2_color">{{ joinList[nowIndex].gapNo }}</span>个名额，{{ joinList[nowIndex].time }}后结束</p>
        <div class="modal2_imgs">
          <div class="modal2_master">
						<img class="modal2_img modal2_master_icon" :src="joinList[nowIndex].icon" alt="">
						<span class="modal2_user">拼主</span>
					</div>
          <img class="modal2_img" src="http://img.meiduduo.com/images/shop/other.png" alt="">
        </div>
        <button @click="jump(0)" class="footer_btn">参与拼单</button>
      </div>
    </div>


	</div>
</div>
</template>

<script>
	import typeDiary from '../comm/typeDiary' //日记列表
  import evaluationCard from '../comm/evaluation_card'
  import loading from "../../pages/comm/loading";
	export default {
		data() {
			return {
        show: true,
				orderArr: ["详情"], // '评价', "科普", "流程", "日记"
				orderTabIndex: "0",
				commodity: [],
				doctor: [],
				organ: [],
				projectId: "",
				doctorId: '',
				organId: '',
				caseParames: {
					areaId: 37,
					verifyState: 'Y'
				},
				dialogMask: false,
				dialogContent: '',
				beforePath: '/',
				explainList: [],
        explainContent: [],
        current: 0,
        modal1: false,
				modal2: false,
				comm: {}, // 商品信息
				doctor: {}, // 医生信息
				organ: {}, // 机构信息
				joinList: [], // 拼团列表
				clusterNo: 0, // 成团人数
				groupState: '未开始',
				joinInfo: '',
				timer: null,
				imgUrls: [
					'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
					'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
					'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
				],
				nowIndex: null, // joinList中当前查看的活动index
				phoneNumber: null, // 电话号码
				doctorInfo: '', // 医生介绍
			}
		},
		components: {
			// banner,
      typeDiary,
      loading,
			evaluationCard
			//             homeCase,
			//             dialogList
		},
		created() {},
		computed: {
			baseUrlImg() {
				return this.$store.state.baseUrlImg
			},
			user() {
				return this.$store.state.userInfo
			}
		},
		mounted() {},
		onShow () {
      this.show = true
			this.init()
			console.log(this.$route)
			this.clusterNo = this.$route.query.clusterNo
			this.groupState = this.$route.query.groupState
			this.getDetail()
			this.getJoinList()
		},
		onUnload () {
			clearInterval(this.timer)
			this.timer = null
			this.modal1 = false
			this.modal2 = false
			this.joinList = []
			this.nowIndex = null
		},
		onPullDownRefresh () {
			this.init()
			this.getDetail()
			this.getJoinList()
			wx.stopPullDownRefresh()
		},
		methods: {
			init () {
				clearInterval(this.timer)
				this.timer = null
				this.modal1 = false
				this.modal2 = false
				this.joinList = []
				this.nowIndex = null
			},
			goOrgan () { // 跳转到医院主页
				this.$router.push({
					path: '/pagesShop/orgin',
					query: {
						id: this.organ.id
					}
				})
			},
			goDoctorDetail () { // 去医生主页
				this.$router.push({
					path: '/pagesShop/doctor_detail',
					query: {
						id: this.doctor.id
					}
				})
			},
			toCall () { // 拨打电话
				if (this.phoneNumber) {
					wx.makePhoneCall({
						phoneNumber: this.phoneNumber
					})
				}
			},
			jump(val){
				if (this.groupState == '未开始') {
					wx.showToast({
						title: '活动未开始',
						image: 'http://img.meiduduo.com/images/shop/cancel.png'
					})
					return
				}
				this.modal1 = false
				this.modal2 = false
				if (!val) {
					console.log('goid的值')
					console.log(this.joinList[this.nowIndex])
					this.$router.push({path:"/pagesShop/pin/submit_order", query: {
						id: this.$route.query.id,
						groupId: this.$route.query.commId,
						clusterNo: this.clusterNo,
						isOwner: val,
						goId: this.joinList[this.nowIndex].id
					}})
				} else {
					this.$router.push({path:"/pagesShop/pin/submit_order", query: {
						id: this.$route.query.id,
						groupId: this.$route.query.commId,
						clusterNo: this.clusterNo,
						isOwner: val
					}})
				}
			},
			changeActive(index) {
				this.orderTabIndex = index
				// this.$refs.reserveProcess.innerHTML = index==1?this.commodity.reserveProcess:null


      },
      handleChange (e) {
				this.current = e.target.key
				this.orderTabIndex = e.target.key
			},
      cancelModal () {
        this.modal1 = false
      },
      showMore () {
        this.modal1 = true
      },
      cancelModal2 () {
        this.modal2 = false
      },
      go (index, item) {
        this.nowIndex = index
        if (item.custId == this.user.custId) {
          this.modal1 = false
          this.modal2 = false
          this.$router.push({
            path: '/pagesShow/global/invite_friends',
            query: {
              id: item.orderId, // 订单id
              commodityId: item.commodityId, // 商品id
              from: "myOrder" // 来源
            }
          })
        } else {
          this.modal1 = false
          this.modal2 = true
        }
			},
			getDetail () {
				let self = this
				this.$http.post('commodity/queryOneGroupCommidityByPk', {
					id: this.$route.query.id,
					commType: 'P'
				}).then(res => {
					if (res.code === 1) {
            this.show = false
						let a = res.data
						if (a.comm.commImg) {
							a.comm.commImg = a.comm.commImg.split(',')
						} else {
							a.comm.commImg = []
						}
						this.comm = a.comm ? a.comm : {}
						this.doctor = a.servicePersonal ? a.servicePersonal : {}
						this.organ = a.organ ? a.organ : {}
						if (this.comm.commInfo) {
							this.comm.commInfo = this.dealRichOl(this.dealRichP(this.dealRichText(this.comm.commInfo)))
						}
						if (this.organ.introduce) {
							this.organ.introduce = this.dealRichOl(this.dealRichP(this.dealRichText(this.organ.introduce)))
						}
						if (this.doctor.introduce) {
							this.doctor.introduce = this.dealRichOl(this.dealRichP(this.dealRichText(this.doctor.introduce)))
            }
            if (this.doctor.photo) {
              this.doctor.photo = this.doctor.photo.split(',')
            } else {
              this.doctor.photo = []
            }
						this.phoneNumber = a.organ.tel
						this.doctorInfo = a.servicePersonal.technicalName + ' ' + '擅长：' + a.servicePersonal.fields
					}
				})
			},
			dealRichText (text) {
				return text.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
			},
			dealRichP (text) { // 处理 rich-text 中的 p
				return text.replace(/\<p/gi, '<p style="font-size:14px;color:#999;word-wrap:break-word;line-height: 24px;" ')
			},
			dealRichList (text) {
				return text.replace(/\<li/gi, '<li style="font-size:14px;color:#999;word-wrap:break-word;line-height: 24px;" ')
			},
			dealRichOl (text) {
				return text.replace(/\<ol/gi, '<ol style="font-size:14px;color:#999;word-wrap:break-word;padding-left: 15px;line-height: 24px;" ')
			},
			getJoinList () {
				let self = this
				this.$http.post('groupOrder/listJoinVersion4', {
					groupCommId: this.$route.query.groupCommId
				}).then(res => {
					if (res.code === 1) {
						this.joinList = []
						let a = res.data
						this.joinList = res.data
						let self = this
						if (res.data.length) {
							this.timer = setInterval(function () {
								for (var i = 0, j = a.length; i < j; i++) {
										a[i].time = self.dealEndTime(a[i].endTime)
										self.$set(self.joinList, i, a[i])
								}
							}, 1000)
						} else {
							clearInterval(this.timer)
							this.timer = null
						}

						if (this.joinList.length) {
							this.joinInfo = `${this.joinList[0].groupNo}人在拼单，可直接参与`
						} else {
							this.joinInfo = '0人在拼单，可直接参与'
						}
					}
				})
			},
			dealEndTime (value) {
					let times = value.slice(0, 19)
					let val = times.replace(/-/g,"/")
					let a = new Date().getTime()
					let b = new Date(val).getTime()
					let c = b - a
					let j = Math.floor(c / (24 * 60 * 60 * 1000)) // 天
					let d = Math.floor((c - j*24*60*60*1000) / (60 * 60 * 1000)) // 时
					let e = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000) / (60 * 1000)) // 分
					let f = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000 - e * 60 * 1000) / 1000) // 秒
					let g = d > 9 ? d : '0' + d
					let h = e > 9 ? e : '0' + e
					let i = f > 9 ? f : '0' + f
					return `${j}天${g}:${h}:${i}`
			},
		}
	}
</script>

<style scoped>
	.join_list_no {
		box-sizing: border-box;
		width: 100%;
		padding: 250rpx 0;
		text-align: center;
		font-size: 24rpx;
		color: #999;
	}
	.project-info {
		padding-bottom: .9rem;
		background-color: #F1F1F1;
		height: 100%;
		width: 100%;
    position: relative;
	}

	.box {
		margin-bottom: .17rem;
		background: #fff;
	}
	.after_line {
		border-bottom: 17rpx solid #f1f1f1;
		background: #fff;
	}

	.box1 {
		background: transparent;
	}

	.loop {
		/* height: 7.3rem; */
		position: relative;
	}

	.loop .title {
		height: .51rem;
		width: 100%;
		position: absolute;
		top: .5rem;
		z-index: 55;
	}

	.loop .title .content {
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		padding: 0 .25rem;
	}

	.loop .title .content .right {
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		/* width: 1.2rem;*/
	}

	.loop .title .content .ball {
		width: .51rem;
		height: .51rem;
		background-color: #000;
		border-radius: 50%;
		opacity: .5;
		background-size: 80% 80%;
		background-position: center center;
		background-repeat: no-repeat;
	}

	.loop .title .content .back {
		background-image: url("http://img.meiduduo.com/img/projectInfo/back.png");
		background-size: 60% 60%;
		background-repeat: no-repeat;
	}

	.loop .title .content .right div:first-child {
		background-image: url("http://img.meiduduo.com/img/projectInfo/che.png");
	}

	.loop .title .content .right div:last-child {
		background-image: url("http://img.meiduduo.com/img/projectInfo/dian.png");
	}

	.loop img {
		height: 100%;
	}

	.project {
		padding: .2rem .25rem;
	}

	.project h5 {
		font-weight: normal;
		font-size: .3rem;
		color: #333;
		margin-bottom: .1rem;
	}

	.project h5 span {
		font-weight: bolder;
	}

	.project p {
		color: #666;
		font-size: .24rem;
	}

	.project .price {
		margin-bottom: .05rem;
	}

	.project .price span:first-child {
		font-size: .48rem;
		color: #FF4691;
		margin-right: .1rem;
	}

	.project .price span:first-child a {
		font-size: .36rem;
	}

	.project .price .line {
		font-size: .24rem;
		color: #999;
		text-decoration: line-through
	}

	.project .price i {
		font-size: .3rem;
	}

	.project .price span:last-child {
		font-size: .14rem;
		line-height: 1;
		padding: .01rem .05rem;
		background: #FF4691;
		color: #fff;
		font-weight: 100;
		border-radius: .03rem;
		position: relative;
		bottom: .1rem;
	}

	.project .position {
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
	}

	.server {
		display: flex;
		display: -webkit-flex;
		padding: .2rem .25rem;
		font-size: .24rem;
	}

	.server .name {
		width: .73rem;
		color: #000;
		font-weight: 500;
		line-height: .6rem;
	}

	/* .link { */
		/*background: url("http://img.meiduduo.com/img/projectInfo/link.png") no-repeat right center;
        background-size: .14rem .19rem;*/
	/* } */

	.server .item div {
		width: 6.32rem;
		font-size: .24rem;
		line-height: .6rem;
	}

	.server .item div:nth-child(1) span {
		padding: 0 .15rem 0 .33rem;
		background: url("http://img.meiduduo.com/images/productDetails/yes.png") no-repeat left center;
		background-size: .22rem .22rem;
	}

	.server .item div:nth-child(2) span:first-child {
		padding-left: .33rem;
		background: url("http://img.meiduduo.com/images/productDetails/fen.png") no-repeat left center;
		background-size: .27rem .27rem;
	}

	.addr-box {
		padding: .26rem;
	}

	.address {
		display: flex;
		display: -webkit-flex;
	}

	.addr-img {
		width: .92rem;
		height: .92rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}

	.addr-img img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}

	.addr-p {
		padding-left: .16rem;
		font-size: .24rem;
	}

	.addr-p p {
		font-size: .24rem;
		color: #666;
		margin-bottom: .05rem;
	}

	.addr-p p:first-child {
		font-size: .24rem;
	}

	.addr-p p:not(:first-child) {
		color: #999999;
	}

	.contact {
		width: 5.5rem;
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		padding: .2rem 0;
	}

	.contact div {
		width: 1.8rem;
		height: .54rem;
		border: 1px solid #FF4691;
		border-radius: .27rem;
		color: #FF4691;
		line-height: .54rem;
		padding-left: 1.1rem;
		margin-right: 0.1rem;
	}

	.contact div:first-child {
		background: url("http://img.meiduduo.com/images/productDetails/phone.png") no-repeat .4rem center;
		background-size: .31rem .31rem;
	}

	.contact div:last-child {
		background: url("http://img.meiduduo.com/images/productDetails/message.png") no-repeat .4rem center;
		background-size: .31rem .25rem;
	}

	.addr-box .doctor {
		line-height: .4rem;
		font-size: .24rem;
		width: 100%;
		overflow: hidden;
		/*文本不换行*/
		white-space: nowrap;
		/*文字超出用省略号*/
		text-overflow: ellipsis;
	}

	.addr-box .doctor span {
		color: #666;
		margin-right: .1rem;
	}

	.order {
		padding: .1rem .32rem;
		font-size: .24rem;
		color: #999999;
		background: #FFFFFF;
	}

	.order .link {
		color: #333;
		font-weight: bolder;
		line-height: .6rem;
		border-bottom: 1px solid #eee;
	}

	.order-title {
		padding-top: .2rem;
		color: #333;
		line-height: .4rem;
	}

	.order p span {
		color: #FF4691;
		margin-right: .2rem;
	}

	.order-tab {
		width: 7.5rem;
		height: .7rem;
		background: #f1f1f1;
	}

	.order-tab ul {
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		line-height: .7rem;
		font-size: .26rem;
		color: #555;
		font-weight: bolder;
		padding: 0 .57rem;
	}

	.order-tab ul li {
		padding: 0 0.16rem;
	}

	.order-tab ul li.active {
		color: #FF4691;
		border-bottom: 2px solid #FF4691;
	}

	.tab-item {
		padding: .2rem;
		/* background: #FFFFFF; */
	}
  .tab-item2 {
    background-color: #fff;
  }

	.tab-item1 {
		background: transparent;
		padding: 0;
	}

	.tab-item1>div {
		background: #FFFFFF;
		padding: .2rem;
	}

	.tab-item1>.comm_explain {
		background: #FFFFFF;
		padding: .2rem;
		margin-top: 0.2rem;
	}

	.tab-item1>.comm_explain1 {
		background: #FFFFFF;
		padding: .2rem 0.5rem;
		margin-top: 0.2rem;
	}

	.comm_explain>p {

		background: url("http://img.meiduduo.com/images/productDetails/comm_logo.png") no-repeat left center;
		padding: 0 .15rem 0 .42rem;
		background-size: .32rem .32rem;
		font-size: 0.28rem;
		color: #555555;
	}

	.exp_abstract {
		margin-top: 0.2rem;
	}

	.exp_abstract>p {
		font-size: 0.26rem;
		color: #666666;
	}

	.exp_abstract>span {
		font-size: 0.24rem;
		display: inline-block;
		line-height: 0.4rem;
		margin-top: 0.1rem;
	}

	.explain_tit {
		text-align: center;
		font-size: 0.36rem;
		color: #333333;
		font-weight: 600;
		margin-top: 0.3rem;
	}

	.explain_tit>img {
		width: 0.29rem;
		height: 0.34rem;
		margin-right: 0.16rem;
		margin-top: -0.08rem;
	}

	.comm_explain1>ul {
		border: 1px solid #EEEEEE;
		margin: 0.4rem 0;
	}

	.comm_explain1>ul>li {
		display: flex;
		display: -webkit-flex;
		font-size: 0.24rem;
		color: #666666;
	}

	.comm_explain1>ul>li:not(:last-child) {
		border-bottom: 1px solid #EEEEEE;
	}

	.comm_explain1 li>span {
		flex: 0.4;
		-webkit-flex: 0.4;
		text-align: center;
		background: #F5F5F5;
		display: flex;
		justify-content: center;
		align-items: Center;
	}

	.comm_explain1 li>div {
		flex: 0.6;
		-webkit-flex: 0.6;
		padding: 0.2rem;
	}

	.tab-title {
		padding-left: .2rem;
		border-left: 3px solid #FF4691;
		font-size: 26rpx;
		height: .26rem;
		line-height: 1;
		color: #333;
		margin-bottom: .1rem;
		margin-top: .1rem;
	}

	.title-title {
		font-size: .24rem;
		color: #555;
		line-height: .6rem;
	}

	.item-block p {
		color: #999;
		font-size: 24rpx;
		line-height: .36rem;
		margin-bottom: .2rem;
	}

	.item-block-img {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		width: 100%;
		margin-bottom: .1rem;
	}

	.item-block-img img {
		width: 3.43rem;
		height: 3.7rem;
		border-radius: .1rem;
	}

	.item-banner img {
		width: 100%;
		height: 3.75rem;
		margin-bottom: .2rem;
	}

	.tab-item h2 {
		font-size: .3rem;
		line-height: .6rem;
	}

	.phone {
		height: 1.6rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
	}

	.phone p {
		font-size: .3rem;
		color: #999;
		line-height: .5rem;
	}

	.phone p span {
		font-size: .36rem;
		color: #FF4691;
	}

	.phone img {
		width: .93rem;
		height: .93rem;
		margin-right: .3rem;
	}

	.footer {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		font-size: .3rem
	}

	.footer-left {
		/* width: 70%; */
    flex: 1;
		display: flex;
		display: -webkit-flex;
		background: #FFFFFF;
    font-size: 22rpx;
    color: #666;
	}
  .footer-left img {
    width: 36rpx;
    height: 36rpx;
  }

	.footer-left div {
		flex: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	}

	.footer-left div span {
		margin-top: 0.1rem;
	}

	.footer-right {
		flex: 1;
		display: flex;
		display: -webkit-flex;
	}

	.footer-right div {
		width: 100%;
		font-size: .3rem;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
	}

	.footer-right div:first-child {
		background: #FE86D8;
	}

	.footer-right div:last-child {
		background: #FF4691;
	}
  .project_price span:first-child {
    font-size: 36rpx;
    color: #FF4691;
  }
  .project_price span:last-child {
    font-size: 24rpx;
    color: #333;
  }

.spell_details_join_item {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
}
.spell_details_join_items {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    padding: .17rem;
    border-top: 1px solid #EEEEEE;
    font-size: 26rpx;
}
.spell_details_join_items > div:first-child {
  display: flex;
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
}
.spell_details_join_items > div:last-child {
  display: flex;
  display: -webkit-flex;
  flex: 1;
  -webkit-flex: 1;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  align-items: center;
  -webkit-align-items: center;
}
.join_details_infos {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  margin-right: .17rem;
}
.spell_btn {
  background: #FF4691;
  padding: 0;
  color: #fff;
  height: 58rpx;
  width: 136rpx;
  text-align: center;
  font-size: 26rpx;
  line-height: 58rpx;
}
.footer_right_btn {
  background: #FF4691;
  color: #fff;
  padding: 0;
  box-sizing: border-box;
  font-size: 28rpx;
  text-align: center;
  line-height: 100rpx;
  width: 100%;
  border-radius: 0;
}
.modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal_main {
  width: 580rpx;
  height: 780rpx;
  background: #fff;
  border-radius: 4rpx;
  position: relative;
}
.modal_title {
  font-size: 36rpx;
  color: #333;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
  position: relative;
}
.modal_footer {
  font-size: 22rpx;
  color: #999;
  text-align: center;
  height: 73rpx;
  line-height: 73rpx;
  border-top: 1rpx solid #f1f1f1;
}
.modal_img {
  width: 92rpx;
  height: 92rpx;
}
.modal_cancel {
  width: 58rpx;
  height: 58rpx;
  position: absolute;
  top: -29rpx;
  right: -29rpx;
}
.modal2_main {
  width: 580rpx;
  height: 450rpx;
  border-radius: 4rpx;
  padding: 40rpx;
  background: #fff;
  position: relative;
  box-sizing: border-box;
}
.modal2_imgs {
  display: flex;
  justify-content: space-around;
  width: 500rpx;
}
.modal2_master {
	position: relative;
}
.modal2_user {
	font-size: 20rpx;
	color: #fff;
	background: #FF4691;
	width: 56rpx;
	height: 32rpx;
	border-radius: 32rpx;
	box-sizing: border-box;
	border: 2rpx solid #fff;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
}
.modal2_img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
	box-sizing: border-box;
}
.modal2_master_icon {
	border: 2rpx solid #FF4691;
}
.footer_btn {
  background: #FF4691;
  font-size: 32rpx;
  color: #fff;
  height: 80rpx;
  width: 500rpx;
  border-radius: 40rpx;
  margin: 0 auto;
  margin-top: 45rpx;
}
.modal2_main {
  color: #666;
  font-size: 28rpx;
}
.modal2_main p {
  text-align: center;
}
.modal2_main > p:first-child {
  color: #333;
  font-size: 32rpx;
}
.modal2_info {
  margin-top: 25rpx;
  margin-bottom: 42rpx;
}
.modal2_color {
  color: #FF4691;
}
.banner {
	height: 730rpx;
	width: 100%;
}
.slide-image {
	width: 100%;
	height: 100%;
}
.score_main {
	padding: 0 30rpx;
}
.score_item {
	font-size: 24rpx;
	color: #666;
	background: #F1F1F1;
	border-radius: 25rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 27rpx;
	margin-right: 18rpx;
	border-bottom: 1rpx solid #f1f1f1;
}
.reply_footer_btn {
	color: #FF4691;
	font-size: 24rpx;
	text-align: center;
	border-top: 1rpx solid #f1f1f1;
	border-bottom: 1rpx solid #f1f1f1;
	padding: 26rpx 0 31rpx 0;
}
.reply_footer_btn > span {
	display: flex;
	align-items: center;
	justify-content: center;
}
.doctor_info {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #666666;
	margin-top: 30rpx;
}
.doctor_info span:first-child {
	width: 100rpx;
	text-align: center;
}
.doctor_msg {
	flex: 1;
}
.customer_box {
	position: relative;
	background: #fff;
}
.customer_box > img {
	position: absolute;
	/* top: 18rpx; */
	top: 50%;
	/* bottom: 0; */
	left: 50%;
	/* right: 0; */
	transform: translate(-50%, -100%);
}
.customer_service {
	padding: 0;
	font-size: 22rpx;
	color: #666666;
	width: 100%;
	height: 100rpx;
	border: 0;
	background: transparent;
	border-radius: 0;
	outline: 0;
	line-height: 6.5;
}
.customer_service::after {
	border: 0;
}
.join-item-box {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	padding: 19rpx 19rpx 14rpx;
}
.join-item-img {
	border-radius: 100%;
	margin-right: 19rpx;
}
.join-item-main {
	font-size: 22rpx;
	color: #666;
	flex: 1;
}
.join-item-user {
	font-size: 26rpx;
	color: #333;
}
.join-item-btn {
	width: 137rpx;
	margin-left: 10rpx;
}

</style>
