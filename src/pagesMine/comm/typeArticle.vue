<template>
	<div class="article-kuang">
		<div class="length" v-if="list.length" >共{{list.length}}条收藏</div>
		<div class="article-all" v-for="(item,index) in list" :key="index" @click="jump(item)">
			<div class="article" v-if="item.templateType==1 || !item.templateType ">
				<i-row span="24" class="article-title">{{item.title}}</i-row>
				<!-- 一张图 -->
				<i-row span="24" class="article-img">
					<img :src="item.cover[0]" alt="">
				</i-row>
				<i-row class="article-bottom">
					<i-col span="12">来源:{{item.source}}
						<i-icon type="browse" size="17" />
						<span>{{item.readNum}}</span>
					</i-col>
					<i-col span="4">
						<i-icon type="message" size="17" style="text-align: center;" />
						<span>{{item.commentNum}}</span>
					</i-col>
					<i-col span="4" :class="{active:item.isThumbsUp}">
						<i-icon type="praise" @click.stop="changeThumbs(item)" size="17" style="text-align: center;" />
						<span @click.stop="changeThumbs(item)">{{item.fabulousNum}}</span>
					</i-col>
					<i-col span="4" style="color:#FF4691" >
						<i-icon type="like_fill" @click.stop="delItem=item;delIndex=index;visible=true" size="17" style="text-align: center;" />
						<span @click.stop="delItem=item;delIndex=index;visible=true">{{item.favouriteNum}}</span>
					</i-col>
				</i-row>
			</div>

			<div class="article" v-if="item.templateType==2">
				<i-row span="24" class="article-title">{{item.title}}</i-row>
				<!-- 两张图 -->
				<i-row span="24" class="article-img">
					<i-col span="12">
						<img :src="item.cover[0]" >
					</i-col>
					<i-col span="12">
						<img :src="item.cover[1]">
					</i-col>
				</i-row>
				<i-row class="article-bottom">
					<i-col span="12">来源:{{item.source}}
						<i-icon type="browse" size="17" />
						<span>{{item.readNum}}</span>
					</i-col>
					<i-col span="4">
						<i-icon type="message" size="17" style="text-align: center;" />
						<span>{{item.commentNum}}</span>
					</i-col>
					<i-col span="4" :class="{active:item.isThumbsUp}">
						<i-icon type="praise" @click.stop="changeThumbs(item)" size="17" style="text-align: center;" />
						<span @click.stop="changeThumbs(item)">{{item.fabulousNum}}</span>
					</i-col>
					<i-col span="4" style="color:#FF4691" >
						<i-icon type="like_fill" @click.stop="delItem=item;delIndex=index;visible=true" size="17" style="text-align: center;" />
						<span @click.stop="delItem=item;delIndex=index;visible=true">{{item.favouriteNum}}</span>
					</i-col>
				</i-row>
			</div>

			<div class="article" v-if="item.templateType==3">
				<i-row span="24" class="article-title">{{item.title}}</i-row>
				<!-- 三张图 -->
				<i-row span="24" class="article-img">
					<i-col span="8">
						<img :src="item.cover[0]" alt="">
					</i-col>
					<i-col span="8">
						<img :src="item.cover[1]" alt="">
					</i-col>
					<i-col span="8">
						<img :src="item.cover[2]" alt="">
					</i-col>
				</i-row>
				<i-row class="article-bottom">
					<i-col span="12">来源:{{item.source}}
						<i-icon type="browse" size="17" />
						<span>{{item.readNum}}</span>
					</i-col>
					<i-col span="4">
						<i-icon type="message" size="17" style="text-align: center;" />
						<span>{{item.commentNum}}</span>
					</i-col>
					<i-col span="4" :class="{active:item.isThumbsUp}">
						<i-icon type="praise" @click.stop="changeThumbs(item)" size="17" style="text-align: center;" />
						<span @click.stop="changeThumbs(item)">{{item.fabulousNum}}</span>
					</i-col>
					<i-col span="4" style="color:#FF4691" >
						<i-icon type="like_fill" size="17" @click.stop="delItem=item;delIndex=index;visible=true" style="text-align: center;" />
						<span @click.stop="delItem=item;delIndex=index;visible=true">{{item.favouriteNum}}</span>
					</i-col>
				</i-row>
			</div>
		</div>
    <i-modal title="取消确认" :visible="visible" :actions="actions" @iclick="handleClick">
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
      visible: false,
      actions: [
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
  methods: {
    handleClick({mp}) {
      if (mp.detail.index === 0) {
        this.visible = false
      } else {
        this.del(this.delItem,this.delIndex)
      }
    },
    jump(item) {
      // console.log(item)
      this.$router.push({
        path: "/pagesShow/information",
        query: { id: item.recordId, type: item.recordType }
      });
		},
		changeThumbs(item){
					wx.showLoading({
							mask:true,
							title:'加载中'
					})
					let state =  item.isThumbsUp ? -1 : 1
					this.$http.post('/customerRecord/save',{
							recordId:item.recordId,
							custId: this.$store.state.userInfo.custId,
							// custId: 27,
							recordType:'4',
							crType:'1',
							state
						}).then(res=>{
												// console.log(res);
								wx.hideLoading()
								if(res.code == '1'){
										if(state == 1){
												item.fabulousNum += 1
												item.isThumbsUp = 1
										}else{
												item.fabulousNum -= 1
												item.isThumbsUp = 0
										}
								}else{
										wx.showToast({
												title: '操作失败',
												icon: 'none'
										})
								}
						})
			},
    del(item, index) {
      let params = {
        custId: this.$store.state.userInfo.custId,
        recordType: "4",
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
          this.visible = false
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
.article {
  background: #fff;
  /* margin-bottom: 0.3rem; */
  padding: 0.34rem 0.26rem;
  /* margin-bottom: 0.18rem; */
  border-bottom:1rpx solid #eee;
}
.article-title {
  font-size: 0.3rem;
}

.article-img {
  height: 3rem;
}

.article-img img {
  margin: 0.2rem 0;
  height: 3rem;
  width: 100%;
}

.article-bottom {
  font-size: 0.25rem;
  color: #acacac;
}
	.active{
		color:#FF4691
	}
</style>
