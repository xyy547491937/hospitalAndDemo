<template>
  <div>
    <div class="typeDiary-kuang">
      <div class="dbox">
        <div class="typeDiary-title">
          <div class="dwrap">
            <div class="dauthor">
              <img :src="item.authorIcon" alt>
              <p class="dname xyy-ellipsis-1">{{ item.authorName }}</p>
            </div>
            <div class="dstatu">
              <span class @click="focus(item)">
                <!-- <i-icon v-if="!item.isFollow" type="add" />
                <i-icon v-else type="right" />-->
                <span v-if="item.isFollow==1" class="active-focus-btn">
                  <i-icon type="right" color="#999"/>已关注
                </span>
                <span v-if="item.isFollow==0" class="focus-btn">+关注</span>
              </span>
            </div>
          </div>
          <!-- <i-row span="24">
                <i-col span="2">
                    <div class="typeDiary-img">
                    <img :src="item.authorIcon" alt="">
                    </div>
                </i-col>
                <i-col span="10" class="typeDiary-name">
                  <div class="dname">
                    {{ item.authorName }}
                  </div>
                </i-col>

                <i-col span="4" class="typeDiary-name" v-if="!isSelf">
                    <span class="add_btn" @click="focus(item)">
                    <span v-if="!item.isFollow"> 关注</span>
                    <span v-else> 已关注</span>
                    </span>
                </i-col>
          </i-row>-->
        </div>
      </div>

      <div>
        <div class="PD-row" @click="jump(item)">
          <div class="gride-2">
            <div class="typeDiary-before">
              <!-- :src="diaryValue.preFirstPhoto" -->
              <!-- <img :src="beforImg" class="typeDiary-before-img"> -->
              <p
                :style="{backgroundImage:'url('+diaryValue.preFirstPhoto+')'}"
                class="typeDiary-before-img"
              ></p>
              <img
                src="http://img.meiduduo.com/images/index/Before.png"
                class="typeDiary-pos"
                mode="widthFix"
              >
            </div>
          </div>
          <div style="width:9px"></div>
          <div class="gride-2">
            <div class="typeDiary-before">
              <!-- <img :src="diaryValue.afterFirstPhoto" class="typeDiary-before-img" mode="widthFix"> -->
              <p
                :style="{backgroundImage:'url('+diaryValue.afterFirstPhoto+')'}"
                class="typeDiary-before-img"
              ></p>
              <img src="http://img.meiduduo.com/images/index/After.png" class="after">
            </div>
          </div>
        </div>
        <!-- <div>
          <span class="typeDiary-details" v-html="item.diaryContent">
            {{ item.diaryContent }}
          </span>
        </div>-->
        <div class="dbox">
          <div class="div-type" @click="jump(item)">
            <i-icon type="label" color="#FF4892" size="20"/>
            <span class="typeDiary-type">{{item.title}}</span>
          </div>
          <div class="div-hos">
            <i-row span="24">
              <i-col span="20">
                <div class="div-hos-left">
                  <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt>
                  <span
                    style="color:#555;font-size:22rpx;margin-left:10rpx"
                  >{{ item.commName }} ▪ {{item.organName }}</span>
                </div>
              </i-col>
              <i-col span="4" style="color:#EA5690;font-size:26rpx;">
                <div class="typeDiary-price">￥{{ item.rulePrice }}</div>
              </i-col>
            </i-row>
          </div>
          <div class="typeDiary-bottom">
            <div class="between">
              <div>{{item.shortTimeString}}</div>
              <div class="iconbox">
                <div style="display:flex;align-item:center;">
                  <i-icon type="browse" size="16"/>
                  <span class="pp">{{ item.readNum }}</span>
                </div>
                <div @click="jump(item)" style="display:flex;align-item:center;">
                  <i-icon
                    type="message"
                    size="16"
                    style="display:flex;align-item:center;text-align: center;"
                  />
                  <span class="pp">{{ item.commentNum }}</span>
                </div>
                <div style="display:flex;align-item:center;" class="thumbbox">
                  <!-- <i-icon
                    type="praise"
                    size="16"
                    style="display:flex;align-item:center;text-align: center;"
                    color="#ff4691"
                    v-if="item.isThumbsUp"
                  />
                  <i-icon
                    type="praise"
                    size="16"
                    style="display:flex;align-item:center;text-align: center;"
                    v-else
                  />-->
                  <span class="pp">赞{{ item.fabulousNum }}</span>
                </div>
              </div>
            </div>
            <!-- <i-row>
            <i-col span="12">
                <span>{{item.shortTimeString}}</span>
            </i-col>
            <i-col span="4">
              <i-icon type="browse" size="14" />
              <span class="pp">{{ item.readNum }}</span>
            </i-col>
            <i-col span="4" @click="jump(item)">
              <i-icon type="message" size="14" style="text-align: center;" />
              <span class="pp">{{ item.commentNum }}</span>
            </i-col>
            <i-col span="4" @click="giveGoods(item)">
              <i-icon type="praise" size="14" style="text-align: center;" color="#ff4691" v-if="item.isThumbsUp" />
              <i-icon type="praise" size="14" style="text-align: center;" v-else />
              <span class="pp">{{ item.fabulousNum }}</span>
            </i-col>
            </i-row>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 数据加载完毕 -->
  </div>
</template>

<script>
export default {
  props: ["diaryValue", "commType", "index"],
  data() {
    return {
      item: {},
      isFollow: 0, // 是否关注
      list: []
    };
  },
  watch: {
    "diaryValue.isFollow": {
      handler(val) {
        console.log(val);
        this.$set(this.item, "isFollow", val);
      }
    }
  },
  mounted() {
    this.item = this.diaryValue;
  },
  computed: {
    isSelf() {
      return this.diaryValue.author == this.$store.state.userInfo.custId;
    }
  },
  onload() {
    this.item = this.diaryValue;
  },
  methods: {
    jump(item) {
      console.log(this.index);
      this.$store.state.backItem.read = "";
      this.$store.commit("backIndexChange", this.index);
      console.log(this.$store.state);
      this.changeJump("/pagesShow/diary_info", {
        id: item.id,
        type: 7
      });
    },
    toFollow(item) {
      // 关注用户
      item.isFollow = item.isFollow == 1 ? 0 : 1;
      //POST /focusRecord/save
    },

    focus(item) {
      if (item.author == this.$store.state.userInfo.custId) {
        return;
      }
      let state = item.isFollow == 1 ? -1 : 1;
      this.$http
        .post("focusRecord/save", {
          recordId: item.author,
          custId: this.$store.state.userInfo.custId,
          recordType: 6,
          state: state
        })
        .then(res => {
          if (res.code == 1) {
            //   this.isFollow = false;
            // this.toFollow(item);
            if (state == 1) {
              item.isFollow = 1;
            } else {
              item.isFollow = 0;
            }
            this.$emit("followBus", item.author, state);
          }
        });
    },
    //点赞
    giveGoods(item) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http
        .post("customerRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 7,
          crType: 1,
          state: item.isThumbsUp ? "-1" : "1"
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == 1) {
            if (!item.isThumbsUp) {
              item.fabulousNum++;
              item.isThumbsUp = 1;
              // console.log(item.fabulousNum);
            } else {
              item.fabulousNum--;
              item.isThumbsUp = 0;
            }
            // item.isThumbsUp = !item.isThumbsUp;
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.PD-row {
  display: flex;
  flex-direction: row;
  & > .gride-2 {
    flex: 1;
  }
}
.dwrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dauthor {
  width: 60%;
  display: flex;

  align-items: center;
}
.dauthor img {
  max-width: 60rpx;
  max-height: 60rpx;
  border-radius: 50%;
}
.dstatu {
}
.typeDiary-bottom {
  padding: 0.18rem 0;
  font-size: 0.25rem;
  color: #acacac;
}
.thumbbox.active {
  color: #ff4691 !important;
}
/* .typeDiary-bottom {
		;
	} */

.typeDiary-price {
  font-size: 0.2rem;
}

.div-hos {
  margin: 25rpx 0;
  padding: 0.1rem 0 0.1rem 0.2rem;
  background-color: #f5f5f5;
  color: #555;
}

.div-hos img {
  vertical-align: sub;
  height: 0.3rem;
  width: 0.3rem;
}

.div-hos-left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: 0.22rem;
}

.typeDiary-type {
  color: #ff4691;
  margin-left: 0.1rem;
  font-size: 26rpx;
}

.typeDiary-details {
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
  margin: 30rpx 0;
}

.typeDiary-pos {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 0.3rem;
}
.typeDiary-before .after {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1rem;
  height: 0.3rem;
}

.typeDiary-before {
  /* width: 3.42rem; */
  width: 100%;
  height: 168px;
  /* border-radius: 0.1rem; */
  position: relative;
  overflow: hidden;
  border-radius: 10rpx;
}

.typeDiary-before-img {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.typeDiary-title {
  padding: 0.28rem 0 0.24rem;
  font-size: 26rpx;
  color: #555;
}

.typeDiary-name {
  font-size: 0.3rem;
  font-weight: bold;
}

.typeDiary-kuang {
  background: #fff;
  margin-bottom: 0.18rem;
  /* padding: 0 0.24rem; */
  width: 100%;
  box-sizing: border-box;
  border-radius: 20rpx;
}
.typeDiary-kuang .dbox {
  padding: 0 24rpx;
}

.typeDiary-img {
  width: 0.6rem;
  height: 0.6rem;
}

.typeDiary-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.dname {
  margin-left: 20rpx;
  /* display: flex; */
  align-items: center;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.add_btn {
  display: flex;
  align-items: center;
  color: #fa418c;
  height: 34rpx;
  border-radius: 17rpx;
  border: 2rpx solid #fa418c;
  line-height: 34rpx;
  justify-content: center;
  font-size: 22rpx;
  padding: 4rpx 16rpx;
  font-weight: normal;
}

.over_banner {
  font-size: 20rpx;
  color: #666666;
  text-align: center;
  padding: 17rpx;
}
.iconbox {
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
}
.between {
  display: flex;
  justify-content: space-between;
}
.pp {
  margin-left: 10rpx;
}

.no_data {
  width: 100%;
  height: 400rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
