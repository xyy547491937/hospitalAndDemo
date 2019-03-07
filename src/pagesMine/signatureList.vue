<template>
	<div style="background-color: #f5f5f5;width:100%;min-height:100%;">
		<tab :titledata="titledata" :activeIndex="activeIndex" @clickactive="change"></tab>
		<div>&nbsp;</div>
		<div class="sign-list">
      <div id="nolist" v-if="list&&list.length==0">
        <div class="noData-mode" :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
      </div>
			<div class="list-item" style="background-color: #FFFFFF;" @click="signRoute(index,item.signType,item.userSignUrl)" v-for="(item,index) in list" :key="index">
			<!-- <div class="list-item" style="background-color: #FFFFFF;" @click="signRoute(index,'','')" v-for="(item,index) in list" :key="index"> -->
				<div class="sign-kuang">
					<div class="sign-title">
						<img :src="item.logo"> {{item.organName}}
					</div>
					<div class="conten-kuang">
						<i-row>
							<i-col span="20"><div class="sign-middle-left">{{item.documentName}}</div></i-col>
							<i-col span="4"><div class="sign-middle-right">{{item.isSignature==1?'待签字':'已签字'}}</div></i-col>
							<!-- <i-col span="4"><div class="index-search">搜索</div> </i-col> -->
						</i-row>
						<i-row><div class="sign-content-title" style="color:#999">{{item.createDateStr}}</div></i-row>
            <!-- 之后完善接口再处理 -->
						<!-- <i-row><div class="sign-content-title">隆胸手术</div></i-row>
						<i-row><div class="sign-content">可能出现的危险：填充物可能破裂、渗漏或缩小、感染， 填充物周围的结疤组织变硬，乳房变得僵硬、疼痛。</div></i-row> -->
					</div>
          <!-- 之后完善接口再处理 -->
					<i-row>
						<!-- <i-col span="22"><div class="sign-bottom"> <span>刘卓达 副主任医师 </span></div></i-col>
						<i-col span="2"><i-icon type="enter" /></i-col> -->
					</i-row>
				</div>
			</div>
		</div>
    <div v-if="isOver &&list&& list.length > 0">
      <load-over classs="list_over"></load-over>
    </div>

	</div>
</template>

<script>
  import tab from './../pages/comm/tab.vue'
  import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件
	export default {
		components: {
      tab,
      "load-over": loadOver
		},
		data() {
			return{
        loaded: false,
        pageNum: 1,
				titledata:[
          {
						title: "全部",
						isSignature: '',
					},
          {
						title: "待签字",
						isSignature: '1',
					},
					{
						title: "已签字",
						isSignature: '2',
					}
        ],
        activeIndex: '',
				params:{
          isSignature:'',
          pageSize: 10
				},
				list:[],
        isOver: false,
        pageNum: 1
			}
		},
		computed:{
			user(){
				return this.$store.state.userInfo
      },
      httpUrl(){
        return this.$store.state.httpUrl
      }
    },
    onPullDownRefresh(){
      this.pageNum = 1
      this.list = []
      this.isOver = false
      this.getData()
      wx.stopPullDownRefresh()
    },
    onReachBottom() {
      console.log(!this.isOver)
      if (!this.isOver) {
        this.getData();
      }
    },
    onReady() {
      this.loaded = false
      if (this.$route.query.isSignature) {
        this.getData(this.$route.query.isSignature)
        this.$set(this,'activeIndex',this.$route.query.isSignature)
      } else {
        this.getData()
      }
		},
		methods: {
			getData(isSignature){
        this.params['peopleId'] = this.user.peopleId
        // this.params['peopleId'] = 864
        if (isSignature) {
          this.params['isSignature'] = isSignature
        }
        // this.params['peopleId'] = 1165
        this.params['pageNum'] = this.pageNum
				this.$http.post(this.httpUrl + '/basics/basicSign/getSignList', this.params
				).then(res=>{
          if (res.code == 1) {
            let a = res.data.data ? res.data.data : [];
            if (res.data.pageNum == 1) {
              this.list = a;
            } else {
              this.list = this.list.concat(a);
            }
            this.loaded = true
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
              this.$store.commit('signatureList', this.list)
            // this.splitArr();
            // this.queryDiaryType()
          }
				})
			},
			signRoute (index,type,userSignUrl) {
        if (type==1) {
          this.$router.push({path: '/pagesMine/signView', query: {index}});
        } else {
          this.$router.push({path:"/pagesMine/signConfirm",query:{index}})
        }
			},
			change(obj){
        this.loaded = false
        this.params.isSignature = obj.isSignature
        this.pageNum = 1
        this.list = []
        this.isOver = false
				this.getData()
			}
		}
	};
</script>

<style scoped>
	.signa-box{
		height: 100%;
		overflow: auto;
	}
	.sign-kuang {
		width: 94%;
		margin-left: 3%;
	}

	.sign-list {
		margin-top: 58rpx;
	}

	.sign-title {
		border-bottom: solid #EEEEEE 1px;
		font-size: .32rem;
		padding: 0.2rem 0 0.1rem 0;
		font-weight: 900;
	}

	.sign-title img {
		width: 0.62rem;
		height: 0.66rem;
		vertical-align: middle;
		margin-right: 0.1rem;
	}
	.sign-middle-left{
		margin-left: 0.72rem;
		font-size: 0.28rem;
		font-weight: 600;
	}
	.sign-middle-right{
		font-size: 0.24rem;
		text-align: right;
		color:#FF4691;
	}
	.conten-kuang{
		margin-top: 0.2rem;
		border-bottom: solid #EEEEEE 1px;
    padding-bottom:20rpx;
	}
	.sign-content-title{
		margin-left: 0.72rem;
		font-size: 0.26rem;
		padding: 0.2rem 0 0.1rem 0;
	}
	.sign-content{
		margin-left: 0.72rem;
		font-size: 0.24rem;
		color:#BDBDBD;
		margin-bottom: 0.2rem;
	}
	.sign-bottom{
		font-size: 0.24rem;
		color: #BEBEBE;
		padding: 0.15rem 0 0.15rem 0.72rem ;
	}
	.sign-bottom span {
		color: #333;
	}
	.list-item{
		margin-bottom: .2rem;
  }
  .list-item:last-of-type{
    margin:0;
  }
	/* .sign-middle{
	width:100%;

	margin: 0.1rem 0;
}
.sign-middle-left{
	display: inline-block;
	width:80%;
	font-size: 0.28rem;
	font-weight: 600;

}
.sign-middle-right{
	display: inline-block;
	width:20%;
	text-align: right;
	font-size: 0.24rem;
	color:#FF4691;


}
.sign-content-title{
	font-size: 0.28rem;
}
.sign-content{
	font-size: 0.24rem;
	color:#EEEEEE
}
.contents{
	width:72%;
	padding-left:14%;
	margin: 0.1rem 0;

} */
</style>
