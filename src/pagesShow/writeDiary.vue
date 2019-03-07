<style>
.clear{
  height: 10rpx;
  background: #f1f1f1;
}
.books-box{
  background: #fff;
}
.book{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:24rpx 0;
  margin: 0 24rpx;
  font-size: 24rpx;
  border-bottom: 1rpx solid #eee;
}
.left{
  flex: 1;
  flex-direction: row;
}
.icon-diary{
  width: 60rpx;
  height: 60rpx;
  margin: 0 20rpx;
}
.middle{
  display: flex;
  flex-direction: column;
}
.right{
  display: flex;
  align-items: center;
   color: #999;
}
.time{
  color: #999;
  font-size: 24rpx;
  text-align: left;
}
.middle .title{
  color: #333;
  font-size: 26rpx;
  margin: 4rpx 0;
}
.after{
  text-align: center;
  padding: 24rpx 28rpx;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 26rpx;
}
.after .af{
   color: #333;
}
.after .afnum{
  text-align: left;
  padding-left: 10rpx;
}
.tian{
  display: inline-block;
  font-size: 30rpx;
  color: #FA418C;
}
.enter{
  margin-left: 10rpx;
}
.enter view{
  transform: rotate(90deg);
  color:#999;
}
.diary-content{
  padding: 10rpx 30rpx;
  background: #fff;
}
 .diary-content .title{
  font-size: 26rpx;
  color: #333;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #eee;
 }
 .align .tip1{
  font-size: 24rpx;
  color: #FF4691;
  margin-left: 10rpx;
}
 .title .tip{
   margin-left:10rpx;
   font-size:22rpx;
   color:#FF4691;
 }
.diary-content .content{
  width: 100%;
  font-size: 24rpx;
  color: #999;
  padding: 10rpx 0;
}
.img-box{
  margin-top: 10rpx;
  overflow: hidden;
}
.img-box .img{
  width: 180rpx;
  height: 180rpx;
  float: left;
  margin:0 10rpx 10rpx 0;
}
.pic-box{
  color: #FD4385;
  font-size: 22rpx;
  margin-left: 10rpx;
  padding: 6rpx 20rpx 40rpx 20rpx;
  background: #fff;
}
.pic-box .title{
  padding: 16rpx 0;
  color: #333;
  font-size: 26rpx;
}
.pic-box .photo{
  float: left;
  width: 180rpx;
  height: 180rpx;
  background: #F2F2F2;
  border: 1rpx dashed #ccc;
  border-radius: 20rpx;
  position: relative;
}
.photo::before{
  width: 4rpx;
  height: 46rpx;
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  background-color: #ccc;
}
.photo::after{
  width: 46rpx;
  height: 4rpx;
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  background-color: #ccc;
}
.fb{
  position: fixed;
  bottom: 40rpx;
  background: #FF4691;
  color: #fff;
  font-size: 32rpx;
  /* padding: 10rpx 20rpx; */
  border-radius:50rpx;
  left: 80rpx;
  right: 80rpx;
  padding: 18rpx 10rpx;
  text-align: center;
  /* transform: translate(-50%,-50%); */
}
</style>

<template>
 <div style="height:100%;background:#fff;padding-bottom:80rpx;">
   <div class="clear"></div>
    <div class="books-box">
        <div class="book" >
            <img class="icon-diary" src="http://img.meiduduo.com/images/info/icon_diary.png" alt="">
             <div class="left">
                 <div class="middle">
                    <div class="time">{{time}}</div>
                    <div class="title">{{title}}</div>
                 </div>
             </div>
        </div>
        <div class="after">
           <span class="af">美后天数:</span>
           <input type="number" class="afnum" v-model="num" placeholder="请输入术后天数" >
             <!-- <div class="tian" >术后第<span>1</span>天</div>
             <i-icon class="enter"  type="enter" size="16" /> -->
        </div>
    </div>
    <div class="clear"></div>
    <div class="diary-content">
        <div class="title">填写日记内容</div>
        <textarea name="" class="content" v-model="content" placeholder="写日记分享变美过程，还有机会获得日记奖励哦~" maxlength="400" @input="wordNumber($event)"></textarea>
    </div>
    <div class="clear"></div>
    <div class="pic-box">
        <div class="title">
          上传美后照片
          <span class="tip1" v-if="imgList.length">(长按图片删除)</span>
           <span class="tip">至少上传一张照片，最多上传9张</span>
        </div>
        <div class="img-box">
          <img class="img" @click="preView(item)" @longpress="deleImg(item,index)" v-for="(item,index) in imgList" :key="index" :src="item" alt="">
          <div class="photo" v-if="imgListUrls.length<9" @click="chooseImg"></div>
        </div>

    </div>
    <div class="fb" @click="save">发表</div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        bookid:'',
        title:'',
        time:'',
        afterPhoto:'',
        imgList:[],
        imgListUrls:[],
        content:'',
        num:''
     }
   },
   components: {

   },
   onLoad(options){
    console.log(options)
    this.bookid = options.id
    this.title = options.title
    this.time = options.time
    this.afterPhoto = options.afterPhoto
    this.content = ''
    this.num = ''
    this.imgListUrls = []
    this.imgList = []
   },
   methods:{
     preView(item){
       let that = this
        wx.previewImage({
          urls:that.imgList,
          current:item
        })
     },
    wordNumber({mp}){
      // console.log(mp.detail.value);
      console.log(mp.detail.value.length);
      let wordLength=mp.detail.value.length
      if(wordLength>=400){
        wx.showToast({
          title: '最多四百字',
          icon: "none"
        })
      }
    },
     deleImg(item,index){
        let that = this
         wx.showModal({
           title:'确定删除图片?',
            success(res){
              if(res.confirm){
                 that.imgList.splice(index,1)
                 that.imgListUrls.splice(index,1)
              }
            }
         })
     },
     chooseImg(){
       let that = this
       if(this.imgList.length>=9){
             wx.showToast({
              title: "最多传9张，不能再多了",
              icon: "none",
              mask:true
            });
            return
       }
       let n = 9 - this.imgList.length
       if(n==0) return
       wx.chooseImage({
         count: n,
         sizeType: ['original', 'compressed'],
         sourceType: ['album', 'camera'],
         success(res){
          console.log(res);
             let arr = res.tempFilePaths
             wx.showLoading({
               title:'加载中',
               icon:'none',
               mask:true
             })
             for (let i = 0; i < arr.length; i++) {
              (function(){
                let item = arr[i]
                wx.uploadFile({
                  url: that.$store.state.httpUrl+"/shop4/uploadImgs/upload",
                  filePath: item,
                  name: "file",
                  formData: {
                    user: "test"
                  },
                  success(res) {
                    // console.log(res);
                    let data = res.data;
                    data = JSON.parse(data);
                    if(data.code == 1){
                      that.imgList.push(item);
                      that.imgListUrls.push(data.data);
                      console.log(data.data);
                      if(i==arr.length-1){
                         wx.hideLoading()
                      }
                    }
                  }
                })
              })(i)
            }

         }
       })

     },
     save(){
      if(this.content.length<10){
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return false;
      }
      if(!this.num|!this.content|this.imgListUrls.length==0){
            wx.showToast({
              title: "请填写完整",
              icon: "none",
              mask:true
            });
            return
       }
      this.$http.post("/diary/save", {
          diaryBookId:this.bookid,
          afterDay:this.num,
          content:this.content,
          afterPhoto:this.imgListUrls.join(),
          author: this.$store.state.userInfo.custId
          // custId: 1099
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
           wx.showToast({
              title: "发布成功",
              mask:true,
              icon: "none"
            });
            this.num = ''
            this.content = ''
            this.imgList = []
            this.imgListUrls = []
            setTimeout(() => {
              wx.navigateBack({
                delta:1
              })
            }, 1000);

          }
        });




     }
   }
 }
</script>


