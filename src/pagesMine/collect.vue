<template>
	<div style="background-color: #f5f5f5;width:100%;height:100%;">
    <tab :titledata="titledata" @clickactive="clickactive"></tab>
		<div class="collect-kuang">
			<!-- 不带频道的小视频 -->
			<div v-if="onclick=='3'">
        <div id="nolist" v-if="projectList.length==0">
            <div  class="noData-mode"
            :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
        </div>
				<project moreshow="false" titlesize="0.7rem" titleColor="#A8A8A8" >
					<typeProject :list="projectList"></typeProject>
				</project>
			</div>
			<div v-if="onclick=='9'" >
        <div id="nolist" v-if="videoList.length==0">
            <div  class="noData-mode"
            :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
        </div>
        <div v-for="(item,index) of videoList" :key="index" @click="videoInfo(item)">
          <div style="background-color: #FFFFFF;">
            <div class="smallVideo-kuang">
              <div style="z-index: 0;" class="video-box">
                <img class="video-img" :src="item.cover[0]" alt="">
                <span class="pause"></span>
              </div>
              <div>
                <span class="smallVideo-details">
                  <rich-text class="richText" :nodes=" item.content"></rich-text>
                </span>
              </div>
              <div class="typeDiary-bottom">
                <i-row>
                  <i-col span="12">
                    <i-col span="4">
                      <div class="typeDiary-img">
                        <img :src="item.icon" alt="">
                      </div>
                    </i-col>
                    <i-col span="20" class="typeDiary-name">
                      <div style="margin-top: .1rem;">{{ item.nickName }}</div>
                    </i-col>
                  </i-col>
                  <i-col span="4">
                    <i-icon type="message" size="17" style="text-align: center;" />
                    <span>{{ item.commentNum }}</span>
                  </i-col>
                  <i-col span="4" :class="{active:item.isThumbsUp}" @click.stop="changeThumbs(item)">
                    <i-icon  type="praise" size="17" style="text-align: center;" />
                    <span>{{ item.fabulousNum }}</span>
                  </i-col>
                  <i-col span="4" class="active" >
                    <i-icon type="like_fill" @click.stop="delItem=item;delIndex=index;visible2=true" size="17" style="text-align: center;" />
                    <span @click.stop="delItem=item;delIndex=index;visible2=true">{{ item.favouriteNum }}</span>
                  </i-col>
                </i-row>
              </div>
            </div>

          </div>
          <!-- <smallVideo :data="item">
            <videoPlay :videoSrc="item.cover[0]"></videoPlay>


          </smallVideo> -->
        </div>
			</div>
			<div v-if="onclick=='4'" >
        <div id="nolist" v-if="informationList.length==0">
            <div  class="noData-mode"
            :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"></div>
        </div>
				<project v-else  moreshow="false" titlesize="0.7rem" titleColor="#A8A8A8" >
					<typeArticle :list="informationList"></typeArticle>
				</project>
			</div>
      <div v-if="(isOver && projectList.length > 0) || (isOver && videoList.length > 0) || (isOver && informationList.length > 0)">
      <load-over classs="list_over"></load-over>
    </div>
    <i-modal title="取消确认" :visible="visible2" :actions="actions2" @iclick="handleClick2">
      <view>确认取消收藏？</view>
    </i-modal>
		</div>
	</div>
</template>

<script>
import tab from "../pages/comm/tab.vue";
import videoPlay from "./comm/videoPlay"; //视频主体
import project from "../pages/comm/project.vue"; //不带频道名字外部框
import typeProject from "./comm/typeProject"; //项目列表
import { dealRichP, dealRichH1, dealHtmlStyle } from "../utils/util.js";
import typeArticle from "./comm/typeArticle.vue"; //文章列表
import loadOver from "../pages/comm/loadOver"; // 数据加载完毕展示组件

export default {
  components: {
    tab,
    videoPlay,
    // smallVideo,
    project,
    typeProject,
    typeArticle,
    "load-over": loadOver
  },
  data() {
    return {
      loaded: false,
      listD: false,
      pageNumP: 1,
      pageNumV: 1,
      pageNumN: 1,
      isOver: false,
      titledata: [
        {
          title: "项目",
          badgeNum: "3"
        },
        // {
        //   title: "小视频",
        //   badgeNum: "9"
        // },
        {
          title: "资讯",
          badgeNum: "4"
        }
      ],
      onclick: "3",
      projectList: [],
      videoList: [],
      informationList: [],
      delItem: {},
      delIndex: '',
      visible2: false,
      actions2: [
        {
          name: "取消"
        },
        {
          name: "确定",
          color: "#ed3f14",
          loading: false
        }
      ],
      isHide: false, // 是否隐藏视频
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  onShow() {
    this.loaded = false
    this.queryNav()
    this.getDate(this.onclick, false);
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getDate(this.onclick, true);
    }
  },
  onPullDownRefresh() {
    this.getDate(this.onclick, false);
    wx.stopPullDownRefresh();
  },
  methods: {
    queryNav () {
      this.$http.post('/setDisplay/listByCondition', {
        displayType: 1
      }).then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0 && res.data[0].isHide == 1) {
            this.isHide = true
            this.titledata = [
              {
                title: "项目",
                badgeNum: "3"
              },
              // {
              //   title: "小视频",
              //   badgeNum: "9"
              // },
              {
                title: "资讯",
                badgeNum: "4"
              }
            ]
          } else {
            this.isHide = false
            this.titledata = [
              {
                title: "项目",
                badgeNum: "3"
              },
              {
                title: "小视频",
                badgeNum: "9"
              },
              {
                title: "资讯",
                badgeNum: "4"
              }
            ]
          }
        }
      })
    },
    handleClick2({mp}) {
      if (mp.detail.index === 0) {
        this.visible2 = false
      } else {
        this.del(this.delItem,this.delIndex)
      }
    },
    clickactive(out) {
      this.loaded = false
      // console.log(JSON.stringify(out))
      this.onclick = out.badgeNum;
      this.getDate(this.onclick, false);
    },
    getDate(index, status) {
      var index = index || "3";
      var pageNum;
      if (index == 3) {
        pageNum = this.pageNumP;
      } else if (index == 9) {
        pageNum = this.pageNumV;
      } else {
        pageNum = this.pageNumN;
      }
      console.log(this.pageNumP);
      this.$http
        .post("/storeRecord/list4Page", {
          custId: this.$store.state.userInfo.custId,
          recordType: index,
          pageNum: pageNum,
          pageSize: 10
        })
        .then(res => {
          console.log(res, 6);
          if (res.code == 1) {
            this.listD = false;
            this.loaded = true
            var a;
            if (res.data.data && res.data.data.length > 0) {
              res.data.data.forEach(ele => {
                ele.cover = ele.cover.split(",");
              });
              a = res.data.data ? res.data.data : [];
              console.log(a);
              if (index === "3") {
                if (this.pageNumP == 1 && !status) {
                  this.$set(this, "projectList", a);
                } else {
                  this.$set(this, "projectList", this.projectList.concat(a));
                }

              } else if (index === "4") {
                console.log(this.pageNumN == 1, status == 1, "888");
                if (this.pageNumN == 1 && !status) {
                  this.$set(this, "informationList", a);
                } else {
                  this.$set(
                    this,
                    "informationList",
                    this.informationList.concat(a)
                  );
                }

              } else if (index === "9") {
                a.map(el => {
                  el.content = dealRichP(dealRichH1(el.content));
                  return el;
                });
                if (this.pageNumV == 1 && !status) {
                  this.$set(this, "videoList", a);
                } else {
                  this.$set(this, "videoList", this.videoList.concat(a));
                }

              }
              if (pageNum == res.data.pages || a.length < this.pageSize) {
                this.isOver = true;
              } else {
                if (index == 3 && status) {
                  this.pageNumP++;
                } else if (index == 9 && status) {
                  this.pageNumV++;
                } else if (index == 4 && status) {
                  this.pageNumN++;
                }
                console.log(index, status, status != 1, this.pageNumN);
                this.isOver = false;
              }
            }
          } else {
            this.listD = true;
          }
        });
    },
    videoInfo(item) {
      console.log(item.columnId);
      // return
      this.$router.push({
        path: "/pagesShow/video_info",
        query: {
          id: item.recordId,
          columnId: item.columnId
        }
      });
    },
    // 视频点赞
    changeThumbs(item) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      let state = item.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: item.recordId,
          custId: this.$store.state.userInfo.custId,
          // custId: 27,
          recordType: "9",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == "1") {
            if (state == 1) {
              item.fabulousNum += 1;
              item.isThumbsUp = 1;
            } else {
              item.fabulousNum -= 1;
              item.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    del(item, index) {
      let params = {
        custId: this.$store.state.userInfo.custId,
        recordType: "9",
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
          this.visible2 = false
          this.videoList.splice(index, 1);
          if (this.videoList.length == 0) {
            this.listD = false;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.collect-kuang {
  padding-top: 108rpx;
  height: 100%;
  box-sizing: border-box;
}
.video-img {
  width: 100%;
  border-radius: 15px;
}
.smallVideo-kuang {
  width: 94%;
  margin: auto;
  padding: 0.2rem 0;
  border-bottom:1rpx solid #eee;
}
.smallVideo-details {
  margin: 0.15rem;
  color: #666666;
  font-size: 0.26rem;
  /* margin-bottom: .1rem; */
  width: 100%;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  max-height:92rpx;
}
.typeDiary-bottom {
  margin: 0.2rem 0 0.1rem 0.2rem;
  font-size: 0.25rem;
  color: #acacac;
}
.typeDiary-img {
  width: 0.4rem;
  height: 0.4rem;
}
.typeDiary-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.active {
  color: #ff4691;
}
.pause {
  width: 60px;
  height: 60px;
  display: block;
  background-image: url("http://img.meiduduo.com/images/info/play.png");
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  margin-top: -30px;
  margin-left: -30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size:100%;
}
.video-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.pause {
  width: 60px;
  height: 60px;
  display: block;
  background-image: url("http://img.meiduduo.com/images/info/play.png");
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  margin-top: -30px;
  margin-left: -30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size:100%;
}
.video-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
