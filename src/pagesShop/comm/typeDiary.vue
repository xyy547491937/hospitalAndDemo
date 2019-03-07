<template>
  <div>
    <div v-for="(item, index) of diaryValue" :key="index" class="typeDiary-kuang">
      <div class="typeDiary-title">
        <i-row span="24">
          <i-col span="2">
            <div class="typeDiary-img">
              <img :src="item.authorIcon" alt="">
            </div>
          </i-col>
          <i-col span="18" class="typeDiary-name">
            {{ item.authorName }}
          </i-col>
          <div>

          </div>
          <i-col span="4" class="typeDiary-name">
            <span class="add_btn" @click="focus(item)">
              <i-icon v-if="!item.isFollow" type="add" />
              <i-icon v-else type="right" />
              <span v-if="!item.isFollow"> 关注</span>
              <span v-else> 已关注</span>
            </span>
          </i-col>
        </i-row>
      </div>
      <div>
        <i-row span="24" @click="jump(item)">
          <i-col span="12">
            <div class="typeDiary-before">
              <img :src="item.preFirstPhoto" class="typeDiary-before-img">
              <img src="http://img.meiduduo.com/images/index/Before.png" class="typeDiary-pos">
            </div>

          </i-col>
          <i-col span="12">
            <div class="typeDiary-before">
              <img :src="item.afterFirstPhoto" class="typeDiary-before-img">
              <img src="http://img.meiduduo.com/images/index/After.png" class="typeDiary-pos">
            </div>
          </i-col>
        </i-row>
        <div>
          <span class="typeDiary-details" v-html=" item.diaryContent">
            <!-- {{ item.diaryContent }} -->
          </span>
        </div>
        <div class="div-type" @click="jump(item)">
          <i-icon type="label" color="#FF4892" size="20" />
          <span class="typeDiary-type">{{item.title}}</span>
        </div>
        <div class="div-hos">
          <i-row span="24">
            <i-col span="20">
              <div class="div-hos-left">
                <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt=""> {{ item.commName }}
              </div>
            </i-col>
            <i-col span="4">
              <div class="typeDiary-price">￥{{ item.rulePrice }}</div>
            </i-col>
          </i-row>

        </div>
        <div class="typeDiary-bottom">
          <i-row>
            <i-col span="12">
              <!-- <i-icon type="browse" size="14" />
							<span>{{ item.readNum }}</span> -->
            </i-col>
            <i-col span="4">
              <i-icon type="browse" size="14" />
              <span>{{ item.readNum }}</span>
            </i-col>
            <i-col span="4" @click="jump(item)">
              <i-icon type="message" size="14" style="text-align: center;" />
              <span>{{ item.commentNum }}</span>
            </i-col>
            <i-col span="4" @click="giveGoods(item)">
              <i-icon type="praise" size="14" style="text-align: center;" color="#ff4691" v-if="item.isThumbsUp" />
              <i-icon type="praise" size="14" style="text-align: center;" v-else />
              <span>{{ item.fabulousNum }}</span>
            </i-col>
            <!-- <i-col span="4">
							<i-icon type="like" size="14" style="text-align: center;" />
							<span>1320</span>
						</i-col> -->
          </i-row>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["diaryValue", "commType"],
  data() {
    return {
      isFollow: false, // 是否关注
      list: []
    };
  },

  mounted() {
    console.log(this.diaryValue);

  },
  methods: {
    jump(item) {
      this.changeJump("/pagesShow/diary_info", {
        id: item.id,
        type: 7
      });
    },
    toFollow(item) {
      // 关注用户
      item.isFollow = !item.isFollow;
      //POST /focusRecord/save
    },

    focus(item) {
      this.$http
        .post("focusRecord/save", {
          recordId: item.author,
          custId: this.$store.state.userInfo.custId,
          recordType: 6,
          state: item.isFollow ? "-1" : "1"
        })
        .then(res => {
          if (res.code == 1) {
            //   this.isFollow = false;
            this.toFollow(item);
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
          wx.hideLoading();
          // console.log(res);
          if (res.code == 1) {
            if (!item.isThumbsUp) {
              item.fabulousNum++;
              // console.log(item.fabulousNum);
            } else {
              item.fabulousNum--;
            }
            item.isThumbsUp = !item.isThumbsUp;
          }
        });
    }
  }
};
</script>

<style scoped>
.typeDiary-bottom {
  padding: 0.18rem 0;
  font-size: 0.25rem;
  color: #acacac;
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

.typeDiary-before {
  width: 3.42rem;
  height: 3.7rem;
  border-radius: 0.1rem;
  position: relative;
  overflow: hidden;
}

.typeDiary-before-img {
  height: 100%;
  width: 100%;
}

.typeDiary-title {
  padding: 0.28rem 0 0.24rem;
  font-size: 26rpx;
  color: #555;
}

.typeDiary-name {
  font-size: 0.3rem;
}

.typeDiary-kuang {
  background: #fff;
  margin-bottom: 0.18rem;
  padding: 0 0.24rem;
  width: 100%;
  box-sizing: border-box;
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

.add_btn {
  display: flex;
  align-items: center;
  color: #fa418c;
  height: 34rpx;
  border-radius: 17rpx;
  border: 1rpx solid #fa418c;
  line-height: 34rpx;
  justify-content: center;
  font-size: 22rpx;
}

.over_banner {
  font-size: 20rpx;
  color: #666666;
  text-align: center;
  padding: 17rpx;
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
