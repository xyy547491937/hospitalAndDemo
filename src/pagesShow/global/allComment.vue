
<style>
    .comment-title{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        height: .9rem;
        padding: 0 .24rem;
        border-bottom: 1px solid #DDDDDD;
        margin-bottom: .2rem;
    }
    .title-bold{
        font-size: .3rem;
        color: #333;
        font-weight: bold;
    }
    .comment-list{
        margin: 0 .3rem 0 .2rem;
        padding-bottom:20rpx;
    }
    .comment-num{
        font-size: .24rem;
        color: #999;
    }
    .comment-item{
        display: flex;
        display: -webkit-flex;
        margin-bottom: .24rem;
    }
    .item-img{
        margin-right: .2rem;
    }
    .item-img img{
        width: .66rem;
        height: .66rem;
        border-radius: 50%;
    }
    .item-name{
        font-size: .3rem;
        color: #1A518B;
    }
    .item-social{
        float: right;
        font-size: 26rpx;
    }
    .item-social img{
        width: 30rpx;
        height: 30rpx;
        vertical-align:top;
        margin-right:4rpx;
    }
    .item-time{
        color: #999;
        font-size: .24rem;
    }
    .reply{
        padding: 18rpx 18rpx 18rpx 0;
        color:#FF4691;
        font-size: 24rpx;
    }
    .reply.detailC{
        font-size: 22rpx!important;
    }
    .item-content{
        font-size: .28rem;
        line-height: .46rem;
        color: #333;
        margin-bottom: .3rem;
    }

    .comment-input{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: .82rem;
        align-items: center;
        padding-left: .5rem;
        padding-right:50rpx;
        border-top: 1px solid #eee;
        position: relative;
    }
    .comment-input img{
        width: .34rem;
        height: .34rem;
        vertical-align: middle;
    }
    .comment-input .place{
        position: absolute;
        left: 75rpx;
        top: 28rpx;
        width: 28rpx;
        height: 20rpx;
    }
    .comment-input input{
        box-sizing: border-box;
        /* width: 5.13rem; */
        width: 100%;
        height: .54rem;
        border-radius: .26rem;
        padding: 0 .5rem 0 0.6rem;
        background: #F1F1F1;
        /* background: url('http://img.meiduduo.com/images/info/input_bg.png') no-repeat left center #F1F1F1; */
    }
    .input-right{
        box-sizing: border-box;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        width: 2rem;
        padding: 0 .5rem;
    }

</style>

<template>
 <div style="background:#fff;min-height:100%">
        <div class="box comment">
            <div style="background:#F4F3F8;height:6rpx;"></div>
            <div class="comment-title">
                <div class="title-bold">评论</div>
                <div class="comment-num">共{{commentTotal}}条评论</div>
            </div>
            <div class="comment-list">
                <div v-show="commenList&&commenList.length==0" style="padding:10rpx 15rpx">暂无评论</div>
                <div class="comment-item" v-for="(item,index) in commenList" :key="index">
                    <div class="item-img">
                        <!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                        <img :src="item.icon" alt="">
                    </div>
                    <div style="display:flex;flex:1;flex-direction:column;">
                        <div class="item-name" >
                            <div style="overflow:hidden">
                                {{item.nickName}}
                                <div class="item-social" @click="changeCommThumbs(item)">
                                    <img class="video-handle" v-show="!item.isThumbsUp" src="http://img.meiduduo.com/images/info/zan1.png" alt="">
                                    <img class="video-handle" v-show="item.isThumbsUp" src="http://img.meiduduo.com/images/info/zan2.png" alt="">
                                    <span style="color:#999">{{item.fabulousNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-content">
                            <div>{{item.content}}</div>
                            <!-- 回复 -->
                            <div class="child-content" v-show="item.children && item.children.length>0">
                              <div class="child-content-item" v-for="(child,i) in item.children" :key="i" v-if="i<10">
                                <span class="child-name ellipsis">{{child.nickName}}</span>
                                <span style="float:left">：</span>
                                <span class="child-text">
                                  {{child.content}}
                                  <!-- <wxParse :content="child.content ? removeBr(child.content) : ''" noData=""/> -->
                                </span>
                              </div>
                            </div>
                        </div>
                        <div class="item-time">
                            {{item.createDate}}    <span class="reply detailC" @click="reply(item)">回复</span>
                        </div>
                    </div>
                </div>
            </div>

            <writeComment
             v-bind:writeItem="writeItem"
             v-if="writeCommentS"
             @blurChange="blurChange"
             @send="refreshComm"
             @sendStatusM="sendStatusM"
             ></writeComment>

        </div>
 </div>
</template>

<script>

 import writeComment from '../../pages/comm/writeComment'
 export default {
   data () {
     return {
        pageNum:1,
        commenList:[],
        writeItem: {
            write1: false,
            write2: true,
            sendStatus: false,
            contentId: '',
            custId: '',
            criticId: '',
            commentId: '',
            commentType: ''
        },
        writeCommentS:false,
        commentTotal:0
     }
   },
   components: {
        writeComment
   },
   onShow(){
       this.writeItem.sendStatus = false
   },
   onLoad(options){
       let videoId =  options.id
       let commentType = options.commentType
       this.videoId = videoId
       this.getCommenList(videoId,commentType,this.pageNum)
       // 记录回复视频id
       this.writeItem.contentId = videoId
        // 记录评论类型
        this.writeItem.commentType = 9
        this.writeItem.custId = this.$store.state.userInfo.custId
   },
   methods:{
       getCommenList(contentId,commentType,pageNum){
            this.$http.post('/comment/list4Page',{
                custId:this.$store.state.userInfo.custId,
                contentId,commentType,pageNum,pageSize:15
                }
            ).then(res=>{
                console.log('评论列表:',res);
                if(res.code == '1'){
                    this.commenList = res.data.data ? res.data.data :[]
                    this.commentTotal = res.data.total ? res.data.total :0
                }else{
                    wx.showToast({
                        title: '获取失败',
                        icon: 'none'
                    })
                }
                this.writeCommentS = true
            })
        },
         // 评论点赞
        changeCommThumbs(item){
            wx.showLoading({
                mask:true,
                title:'加载中'
            })
            let state =  item.isThumbsUp ? -1 : 1
            this.$http.post('/customerRecord/save',{
                recordId:item.id,
                custId:this.$store.state.userInfo.custId,
                recordType:'11',
                crType:'1',
                state
                }
            ).then(res=>{
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
        // 回复评论
        reply(item){
          this.$set(this.writeItem, "sendStatus", true);
          this.$set(this.writeItem, "focus", true);
          this.$set(this.writeItem, "commentId", item.id);
          this.$set(this.writeItem, "criticId", item.custId);
          this.$set(this.writeItem, "place", '回复'+item.nickName);
        },
        refreshComm(){
          this.getCommenList(this.videoId,'9',1)
        },
        sendStatusM() {
          this.$set(this.writeItem, "sendStatus", false);
        },
        blurChange() {
          this.$set(this.writeItem, "focus", false);
          this.$set(this.writeItem, "place", '');
        },
   }
 }
</script>

