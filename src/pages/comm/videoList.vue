<style scoped>
.count-buy {
  font-size: 0.24rem;
  padding-right: 0.15rem;
  color: #666;
  text-align: left;
  font-weight: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  justify-content: flex-end;
}
.count-buy.active {
  color: #ff4691;
}
.user-collection {
  width: 35%;
}
.FL-bottom {
  display: flex;
  flex-direction: row;
  width: 96%;
  margin-left: 2%;
  margin-bottom: 0.1rem;
  justify-content: space-between;
}
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 60%;
}
.FL-name {
  font-size: 0.25rem;
  margin-left: 10px;
}

.FL-img {
  min-width: 0.4rem;
  height: 0.4rem;
}

.FL-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.FL-details {
  margin: 0.15rem;
  font-size: 0.26rem;
  /* margin-bottom: .1rem; */
  width: 100%;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.FLdetails {
  padding: 0rem 0.1rem 0.1rem 0.1rem;
  font-size: 0.25rem;
}
.FLtitle {
  font-size: 0.25rem;
  padding: 0.1rem;
  font-weight: bold;
  margin: 0.1rem 0;
}
.FLkuang {
  /* margin: 0.1rem 0.1rem; */
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1rpx solid #dddee1;
  border-radius: 8rpx;
}
.FLkuang.left {
  margin: 0rpx 10rpx 10rpx 0;
}
.FLkuang.right {
  margin: 0rpx 0rpx 10rpx 10rpx;
}
.FL-details {
  padding: 0 10rpx;
  max-height: 76rpx;
  line-height: 38rpx;
  overflow: hidden;
  width: auto;
}
.FL-details,
.FL-details .rich-text {
  /* padding: 0 10rpx;
		height: 76rpx;
		line-height: 38rpx; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
image.classimg {
  width: 100%;
  max-height: 400rpx;
  min-height: 280rpx;
}
.videolist {
  /* background: #f5f5f5; */
  overflow: hidden;
  height: 100%;
  border-radius: 8rpx;
  /* column-count:2; */
}
.FLkuang {
  position: relative;
}
.FLkuang .playbtn {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}
</style>


<template>
  <!-- import func from './vue-temp/vue-editor-bridge'; -->
  <!-- style="background-color: #F1F1F1;padding-top:20rpx" -->
  <div class="videolist">
    <!-- <i-row>
    <i-col span="12">-->
    <!-- <div class="videolist">
					<div class="FLkuang" v-for="(item,index) in videolist" :key="index" @click="jump">

						<img :src="item.cover"  class="classimg">
						<div class="FL-details">{{item.authorName}}</div>

						<div class="FL-bottom">

							<i-row span="24">
								<i-col span="4">
									<div class="FL-img">
										<img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt="">
									</div>
								</i-col>
								<i-col span="13" class="FL-name">
									{{item.auditorName}}
								</i-col>
								<i-col span="7">
									<span class="count-buy">
										<i-icon type="like" size="17" />
										<div style="margin-left: 0.05rem;display: inline-block;">{{item.commentNum}}</div>
									</span>
								</i-col>
							</i-row>
						</div>
					</div>
    </div>-->
    <!-- </i-col> -->
    <scroll-view
      style="height:100%;"
      :scroll-y="true"
      lower-threshold="10"
      @scrolltolower="loadMore"
    >
      <i-col span="12">
        <!-- style="padding-left:8rpx" -->
        <div>
          <div
            class="FLkuang left"
            v-for="(item,index) in videolist"
            v-if="index % 2 == 0 "
            :key="index"
            @click="jump(item,index)"
          >
            <img class="playbtn" src="http://img.meiduduo.com/images/info/play.png" alt>
            <img :src="item.cover" mode="aspectFill" class="classimg">
            <div class="FL-details">
              {{item.title}}
              <!-- <rich-text class="richText" :nodes="item.content"></rich-text> -->
            </div>
            <!-- <rich-text class="FL-details richText" :nodes="item.content"></rich-text> -->
            <div class="FL-bottom">
              <div class="user-info">
                <div class="FL-img">
                  <img :src="item.authorIcon" alt>
                  <!-- <img mode="widthFix" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                </div>
                <div span="13" class="FL-name xyy-ellipsis-1">{{item.authorName}}</div>
              </div>

              <div
                class="count-buy"
                :class="{active:item.isCollection}"
                @click.stop="collect(item)"
              >
                <i-icon :type="item.isCollection?'like_fill':'like'" size="17"/>
                <div
                  style="margin-left: 0.05rem;display: inline-block; "
                  class="xyy-ellipsis-1"
                >{{item.favouriteNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </i-col>
      <i-col span="12">
        <!-- style="padding-right:8rpx" -->
        <div>
          <div
            class="FLkuang right"
            v-for="(item,index) in videolist"
            v-if="index % 2 != 0 "
            :key="index"
            @click="jump(item,index)"
          >
            <!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530184357137.png"  class="classimg"> -->
            <img class="playbtn" src="http://img.meiduduo.com/images/info/play.png" alt>
            <img :src="item.cover" mode="aspectFill" class="classimg">
            <div class="FL-details">
              {{item.title}}
              <!-- <rich-text class="richText" :nodes="item.content"></rich-text> -->
            </div>

            <div class="FL-bottom">
              <div class="user-info">
                <div class="FL-img">
                  <img :src="item.authorIcon" alt>
                  <!-- <img mode="widthFix" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                </div>
                <div span="13" class="FL-name xyy-ellipsis-1">{{item.authorName}}</div>
              </div>

              <div
                class="count-buy"
                :class="{active:item.isCollection}"
                @click.stop="collect(item)"
              >
                <i-icon :type="item.isCollection?'like_fill':'like'" size="17"/>
                <div
                  style="margin-left: 0.05rem;display: inline-block; "
                  class="xyy-ellipsis-1"
                >{{item.favouriteNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </i-col>
    </scroll-view>
    <!-- </i-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // videolist: [],
      scid: ""
    };
  },
  props: {
    videolist: {
      type: Array,
      default: []
    }
  },
  onShow() {},
  methods: {
    collect(item) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = item.isCollection == 1 ? -1 : 1;
      this.$http
        .post("/storeRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "9",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              item.isCollection = 1;
              item.favouriteNum++;
            } else {
              item.isCollection = 0;
              item.favouriteNum--;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    jump(item, index) {
      console.log(index);
      this.$store.state.backItem.read = "";
      this.$store.commit("backIndexChange", index);
      this.scid = item.id;
      this.$router.push({
        path: "/pagesShow/video_info.1",
        query: {
          id: item.id,
          columnId: item.columnId
        }
      });
    },
    getVideoList(pageNum, pageSize) {
      this.$http
        .post(
          "/smallVideo/list4PageForApp",
          {
            pageNum,
            pageSize
          },
          {
            headers: { "content-type": "application/json" }
          }
        )
        .then(res => {
          // console.log(res);
          this.videolist = res.data.data;
        });
    },
    loadMore() {
      console.log(666);
    }
  },
  onLoad() {
    // this.getVideoList(1, 15);
  }
};
</script>
