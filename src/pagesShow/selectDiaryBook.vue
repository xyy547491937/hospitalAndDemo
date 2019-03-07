<style>
.clear {
  height: 10rpx;
  background: #f1f1f1;
}
.books-box {
  padding-bottom: 180rpx;
}
.book {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  margin: 0 24rpx;
  font-size: 24rpx;
  border-bottom: 1rpx solid #eee;
}
.left {
  flex: 1;
  flex-direction: row;
}
.icon-diary {
  width: 44rpx;
  height: 44rpx;
  margin: 0 20rpx;
}
.middle {
  display: flex;
  flex-direction: column;
}
.right {
  display: flex;
  align-items: center;
  color: #999;
}
.time {
  color: #999;
  text-align: left;
}
.title {
  color: #333;
}
.btn-box {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: #FF4691; */
  background: #fff;
  color: #fff;
  text-align: center;
  padding: 18rpx 10rpx 60rpx 10rpx;
  border-radius: 50rpx;
}
.btn-inner {
  margin: 0 80rpx;
  padding: 18rpx 10rpx;
  border-radius: 50rpx;
  background: #ff4691;
}
.btn-box img {
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
}
.new {
  display: inline;
  font-size: 32rpx;
  margin-left: 10rpx;
}
.books {
  height: 100%;
  background: #fff;
  overflow-y: auto;
}
</style>
<template>
  <div class="books">
    <div class="clear"></div>
    <div class="books-box">
      <div id="nolist" v-if="list.length==0">
        <div
          class="noData-mode"
          :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
        ></div>
      </div>
      <div class="book" @click="toWriteDiary(item)" v-for="(item,index) in list" :key="index">
        <img class="icon-diary" src="http://img.meiduduo.com/images/info/icon_diary.png" alt>
        <div class="left">
          <div class="middle">
            <div class="time">{{item.createDate}}</div>
            <div class="title">{{item.title}}</div>
          </div>
        </div>
        <div class="right">
          <div class="count">共{{item.diaryNum}}篇日记</div>
          <i-icon type="enter" size="16"/>
        </div>
      </div>
      <!-- <div class="book">
            <img class="icon-diary" src="http://img.meiduduo.com/images/info/icon_diary.png" alt="">
             <div class="left">
                 <div class="middle">
                    <div class="time">2018-8-18</div>
                    <div class="title">玻尿酸去黑眼圈</div>
                 </div>
             </div>
             <div class="right">
               <div class="count">共2篇日记</div>
               <i-icon type="enter" size="16" />
             </div>
      </div>-->
    </div>

    <div class="btn-box" @click="toWDiaryBook()">
      <div class="btn-inner">
        <img class="btn-img" src="http://img.meiduduo.com/images/info/icon_diary.png" alt>
        <div class="new">新的日记本</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      list: []
    };
  },
  components: {},
  methods: {
    toWriteDiary(item) {
      this.$router.push({
        path: "/pagesShow/writeDiary",
        query: {
          id: item.id,
          title: item.title,
          time: item.createDate,
          afterPhoto: item.afterPhoto,
          areaId: item.areaId
        }
      });
    },
    toWDiaryBook() {
      this.$router.push({
        path: "/pagesShow/newDiaryBook"
      });
    },
    getDiaryBookList() {
      this.$http
        .post("/diaryBook/list4PageForChooseDiaryBook", {
          author: this.$store.state.userInfo.custId,
          pageNum: 1,
          pageSize: 15
        })
        .then(res => {
          console.log("日记本信息:", res);
          if (res.code == "1") {
            this.loaded = true;
            this.list = res.data.data;
            this.list.forEach(item => {
              item.createDate = item.createDate.substring(0, 10);
            });
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    }
  },
  onLoad() {
    this.getDiaryBookList();
  },
  onShow() {
    this.loaded = false;
    this.getDiaryBookList();
  }
};
</script>

