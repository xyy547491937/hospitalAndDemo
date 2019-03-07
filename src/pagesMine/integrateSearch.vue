<template>
  <div class="vo">
    <div class="c">
      <div class="make-bean flex-r">
        <ul class="bean-box flex-r">
          <!-- 我的豆芽 -->
          <li class="bean-list">
            <p class="c">{{pointDetail.currentPoint}}</p>
            <span>我的豆芽</span>
          </li>
          <!-- 已完成的任务 -->
          <li class="bean-list">
            <p class="c">{{overTask}}</p>
            <span>已完成的任务</span>
          </li>
          <!-- 待完成的任务 -->
          <li class="bean-list">
            <p class="c">{{onOverTask}}</p>
            <span>待完成的任务</span>
          </li>
        </ul>
      </div>
      <!-- 签到 -->
      <div class="sign-box" v-if="pointDetail.signPageState ==1">
        <!-- set sign -->
        <p class="triangle_border_up"></p>
        <div class="sign-inner">
          <ul class="sign-i flex-r">
            <li v-for="(v,i) in 7" :key="v" class="flex-c">
              <p class="flex-c">
                <!-- 已签到的样式 -->
                <img
                  src="http://img.meiduduo.com/images/jifen/jf8.png"
                  alt
                  v-if="i< pointDetail.dayNum"
                >
                <!-- 未签到的样式 -->
                <img src="http://img.meiduduo.com/images/jifen/jf9.png" alt v-else>
                <!-- 忘记签到图片 -->
                <!-- <img src="http://img.meiduduo.com/images/jifen/jf11.png" alt=""> -->
                <em></em>
              </p>
              <span class="sign-date">{{i+1}}天</span>
            </li>
          </ul>
          <div
            class="PD-sub-btn sign-message"
            :class="{'active':pointDetail.isSigned}"
            @click="saveSign"
          >{{pointDetail.isSigned?"今日已签到":'签到领'+pointDetail.dayPoint+'豆芽'}}</div>
        </div>
      </div>
    </div>
    <!--  新手任务 -->
    <!-- <div class="new-work">
      <div class="new-work-title flex-r">
        <p> 新手任务</p>
        <span>美女们都完成了任务</span>
      </div>

    <ul class="integrate-box">-->
    <!-- 一个item -->
    <!-- <li class="integrate-item flex-r" v-for=" v in newPeopleArr" :key="v">
          <div class="item-inner flex-r">
            <img :src="v.icon" alt="">
            <div class="cv flex-c">
              <p class="i-title">{{v.title}}</p>
    <p class="f-title">{{v.titleInfo}}</p>-->
    <!-- </div>
          </div>
          <div class="item-go flex-r">
           <span class="bn" :class="{'activeColor':v.isOver}">{{v.isOver?"已完成":"去完成"}}</span>
            <i-icon type="enter" v-if="!v.isOver"/>
          </div>

    </li>-->
    <!--  -->
    <!-- 更多任务 -->
    <!-- <li class="more-work flex-r" @click="moreTask1(newPeopleTask)">
          <span class="c">{{newPeopleTask.isShow?"收起":"更多攒豆任务"}} </span>
          <i-icon type="unfold" v-if="!newPeopleTask.isShow" />
          <i-icon type="packup" v-else/>
        </li>
      </ul>
    </div>-->
    <!-- seconed -->
    <!--  每日任务 -->
    <div class="new-work" v-if="someDayArr.length>0">
      <div class="new-work-title flex-r">
        <p>每日任务</p>
        <span>每天都可以收豆芽哦</span>
      </div>

      <ul class="integrate-box">
        <!-- 一个item -->
        <li
          class="integrate-item flex-r"
          v-for=" v in someDayArr"
          :key="v"
          @click="goTaskPage(v)"
          v-if="v.isRemove"
        >
          <div class="item-inner flex-r">
            <img :src="v.icon" alt>
            <div class="cv flex-c">
              <p class="i-title">{{v.title}}</p>
              <p class="f-title">{{v.titleInfo}}</p>
              <!-- <p>+50</p> -->
            </div>
          </div>
          <div class="item-go flex-r">
            <span class="bn" :class="{'activeColor':v.isOver}">{{v.isOver?"已完成":"去完成"}}</span>
            <i-icon type="enter" v-if="!v.isOver"/>
          </div>
        </li>
        <!--  -->
        <!-- 更多任务 -->
        <li class="more-work flex-r" @click="moreTask2(someDayTask)" v-if="someDayArr.length>=2">
          <span class="c">{{someDayTask.isShow?"收起":"更多攒豆任务"}}</span>
          <i-icon type="unfold" v-if="!someDayTask.isShow"/>
          <i-icon type="packup" v-else/>
          <!-- <i-icon type="packup" />   -->
        </li>
      </ul>
    </div>
    <!-- seconed -->
    <!--  涨粉任务 -->
    <div class="new-work" v-if="taskStateVO.replyComments">
      <div class="new-work-title flex-r">
        <p>涨粉任务</p>
        <span>每个女人都是女王</span>
      </div>

      <ul class="integrate-box" v-if="taskStateVO.replyComments">
        <li class="integrate-item flex-r" @click="jump">
          <div class="item-inner flex-r">
            <img src="http://img.meiduduo.com/images/jifen/jf5.png" alt>
            <div class="cv flex-c">
              <p class="i-title">回复评论</p>
              <p class="f-title">每天开启美美的一天</p>
              <!-- <p>+50</p> -->
            </div>
          </div>
          <div class="item-go flex-r">
            <span
              class="bn"
              :class="{'activeColor':pointTaskStateVo.replyComments }"
            >{{pointTaskStateVo.replyComments ?"已完成":"去完成"}}</span>
            <i-icon type="enter" v-if="!pointTaskStateVo.replyComments"/>
          </div>
        </li>

        <!-- 更多任务 -->
        <!-- <li class="more-work flex-r">
          <span class="c">更多攒豆任务</span>
          <i-icon type="unfold" />
          <i-icon type="packup" />
        </li>-->
      </ul>
    </div>
    <div class="cover" @touchmove="''" v-if="pointOver">
      <div class="point_message">
        <img src="http://img.meiduduo.com/images/xyy/message_point.png" alt mode="widthFix">
        <div class="point_box_status">
          <p class="point_status">签到成功</p>
          <p class="point_num">+{{pointDetail.dayPoint}}豆芽</p>
        </div>
      </div>
      <!-- <p class="close" @click.stop="pointOver=!pointOver">
        <img src="http://img.meiduduo.com/images/xyy/close.png" alt mode="widthFix">
      </p>-->
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      pointDetail: {
        // dayNum: 0
      },
      pointOver: false,
      pointTaskStateVo: {},
      taskStateVO: {},
      newPeopleArr: [],
      originArr: [],
      newPeopleTask: {
        isShow: false,
        limit: 2,
        arr: [
          {
            title: "完善头像",
            icon: "http://img.meiduduo.com/images/jifen/jf2.png",
            titleInfo: "秀出最美丽的自己",
            isOver: 1
          },
          {
            title: "补充信息",
            icon: "http://img.meiduduo.com/images/jifen/jf6.png",
            titleInfo: "需要一个可靠的身份哦",
            isOver: 1
          },
          {
            title: "首次注册",
            icon: "http://img.meiduduo.com/images/jifen/jf2.png",
            titleInfo: "快来加入我们吧",
            isOver: 1
          },
          {
            title: "设置用户昵称",
            icon: "http://img.meiduduo.com/images/jifen/jf2.png",
            titleInfo: "需要一个可爱的称呼",
            isOver: 1
          }
        ]
      },
      someDayArr: [],
      someDayTask: {
        isShow: false,
        limit: 2,
        arr: [
          {
            id: 0,
            title: "每日签到",
            icon: "http://img.meiduduo.com/images/jifen/jf4.png",
            titleInfo: "连续签到豆芽翻倍，快去",
            url: "",
            isRemove: 0, //不删除
            isTab: false,
            isOver: 0
          },
          {
            id: 1,
            title: "发布小视频",
            icon: "http://img.meiduduo.com/images/jifen/jf3.png",
            titleInfo: "开启美美的一天",
            url: "/pagesShow/creatVideo",
            isTab: false,
            isRemove: 1,
            isOver: 1
          },
          {
            id: 2,
            title: "查看小视频",
            icon: "http://img.meiduduo.com/images/jifen/jf12.png",
            titleInfo: "体验身边的喜悦",
            url: "/pages/show",
            isTab: true,
            isRemove: 0,
            isOver: 1
          },
          {
            id: 3,
            title: "分享小视频",
            icon: "http://img.meiduduo.com/images/jifen/jf13.png",
            titleInfo: "分享美好的生活 ",
            url: "/pages/index",
            isTab: true,
            isRemove: 0,
            isOver: 1
          },
          {
            id: 4,
            title: "关注喜欢的人",
            icon: "http://img.meiduduo.com/images/jifen/jf5.png",
            titleInfo: "为精彩的人点赞",
            url: "/pages/show",
            isTab: true,
            isRemove: 0,
            isOver: 1
          },
          {
            id: 5,
            title: "发表评论",
            icon: "http://img.meiduduo.com/images/jifen/jf7.png",
            titleInfo: "说说内心的喜悦",
            url: "/pages/show",
            isTab: true,
            isRemove: 0,
            isOver: 1
          },
          {
            id: 6,
            title: "发表日记",
            icon: "http://img.meiduduo.com/images/jifen/jf6.png",
            titleInfo: "记录点点滴滴",
            url: "/pagesShow/selectDiaryBook",
            isTab: false,
            isRemove: 0,
            isOver: 1
          },
          {
            id: 7,
            title: "阅读资讯",
            icon: "http://img.meiduduo.com/images/jifen/jf12.png",
            titleInfo: "了解身边的事情",
            url: "/pages/index",
            isTab: true,
            isRemove: 0,
            isOver: 1
          }
        ]
      }
    };
  },

  onShow() {
    this.getPointDetail();
    this.someDayTask.isShow = false;
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     this.getPointDetail();
  //   });
  // },
  computed: {
    overTask() {
      let n = 0;
      this.someDayTask.arr.forEach(v => {
        if (v.isRemove && v.isOver) {
          n++;
        }
      });
      if (
        this.pointTaskStateVo.replyComments &&
        this.taskStateVO.replyComments
      ) {
        n + 1;
      }
      return n;
    },
    onOverTask() {
      let n = 0,
        newArr;
      newArr = this.someDayTask.arr.filter(v => {
        return v.isOver == 0 && v.isRemove;
      });
      if (
        this.pointTaskStateVo.replyComments == 0 &&
        this.taskStateVO.replyComments
      ) {
        n = newArr.length + 1;
      } else {
        n = newArr.length;
      }
      return n;
    },
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["toVideoFun"]),
    //获取签到详情
    getPointDetail() {
      this.$http
        .post("customerPointRecord/customerSignList", {
          custId: this.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.pointDetail = res.data;
            const { pointTaskStateVo, taskStateVO } = res.data;
            this.pointTaskStateVo = pointTaskStateVo;
            this.taskStateVO = taskStateVO;
            this.changeState(this.someDayTask.arr);
          }
        });
    },
    //签到
    saveSign() {
      // if(this.pointDet)
      this.$http
        .post("customerPointRecord/customerSign", {
          custId: this.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          let n = this.pointDetail.dayNum;
          n++;
          if (res.code == 1) {
            this.$set(this.pointDetail, "dayNum", n);
            this.$set(this.pointDetail, "isSigned", 1);
            this.$set(
              this.pointDetail,
              "currentPoint",
              this.pointDetail.currentPoint + this.pointDetail.dayPoint
            );

            this.$set(this.pointTaskStateVo, "signInEveryDay", 1);
            // TODO 后期优化代码 现请求接口
            this.getPointDetail();
            // 签到展示
            this.pointOver = true;
            let timer = setTimeout(() => {
              this.pointOver = false;
            }, 3000);
          }
        });
    },
    filterTask(taskArr, obj) {
      let a = [...obj.arr],
        newArr;
      newArr = a.filter(v => {
        return v.isRemove == 1;
      });

      this.originArr = newArr;
      // console.log("5555555555555555555555555555");
      // console.log(this.originArr);
      if (!obj.isShow) {
        taskArr = newArr.splice(0, obj.limit);
      } else {
        taskArr = newArr;
      }
      return taskArr;
    },
    changeState(arr) {
      // 每日签到
      arr[0].isOver = this.pointTaskStateVo.signInEveryDay;
      arr[0].isRemove = this.taskStateVO.signInEveryDay;
      // 发布小视频 releaseSmallVideo
      arr[1].isOver = this.pointTaskStateVo.releaseSmallVideo;
      arr[1].isRemove = this.taskStateVO.releaseSmallVideo;
      // 查看小视频
      arr[2].isOver = this.pointTaskStateVo.viewSmallVideos;
      arr[2].isRemove = this.taskStateVO.viewSmallVideos;
      // 分享小视频
      arr[3].isOver = this.pointTaskStateVo.shareSmallVideos;
      arr[3].isRemove = this.taskStateVO.shareSmallVideos;
      // 关注喜欢的人
      arr[4].isOver = this.pointTaskStateVo.focusOnPeopleYouLike;
      arr[4].isRemove = this.taskStateVO.focusOnPeopleYouLike;
      // 发表评论
      arr[5].isOver = this.pointTaskStateVo.releaseComments;
      arr[5].isRemove = this.taskStateVO.releaseComments;

      // 发表日记
      arr[6].isOver = this.pointTaskStateVo.releaseAdiary;
      arr[6].isRemove = this.taskStateVO.releaseAdiary;

      // 阅读资讯
      arr[7].isOver = this.pointTaskStateVo.readingInformation;
      arr[7].isRemove = this.taskStateVO.readingInformation;
      // 先改变状态在便利

      this.someDayArr = this.filterTask(this.someDayArr, this.someDayTask);
    },
    moreTask1(obj) {
      obj.isShow = !obj.isShow;
      // console.log(obj.isShow);
      this.newPeopleArr = this.filterTask(this.newPeopleArr, obj);
    },
    moreTask2(obj) {
      obj.isShow = !obj.isShow;
      // console.log(obj.isShow);
      this.someDayArr = this.filterTask(this.someDayArr, obj);
    },
    goTaskPage(item) {
      if (!item.isOver) {
        if (item.id == 2) {
          //查看小视屏
          this.toVideoFun(2);
        } else if (item.id == 4 || item.id == 5) {
          //  if (!this.pointTaskStateVo.focusOnPeopleYouLike) {
          this.toVideoFun(1);
          // }
        }
        // 关注我喜欢的

        this.$router.push({
          path: item.url,
          isTab: item.isTab
        });
      }
    },
    // 回复品论单写
    //0 不显示 1显示
    jump() {
      // console.log(this.pointTaskStateVo.replyComments);
      if (
        !this.pointTaskStateVo.replyComments &&
        this.taskStateVO.replyComments
      ) {
        this.$router.push({
          path: "/pages/index",
          isTab: true
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @import url("../css/style.less");
.vo {
  padding-top: 0;
  font-size: @baseSize;
  color: @baseTextColor-c;
  padding-bottom: 10px;
}

.make-bean {
  padding: @basePadding 0;
  background-image: linear-gradient(#e1bbff, #ff9fd8);
  height: 203px/2;
  align-items: center;

  & > .bean-box {
    color: @base-white;
    width: 100%;
    justify-content: space-around;

    & > .bean-list {
      flex: 1;
      text-align: center;

      & > p {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}

// 签到
.sign-box {
  padding: 0 @basePadding;
  margin-top: -30px;

  & > .sign-inner {
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 6px;
    background-color: @base-white;

    & > .sign-i {
      padding: 15px 0;

      & > li {
        flex: 1;
        justify-content: center;
        align-items: center;

        & > p {
          position: relative;
          width: 66rpx;
          height: 66rpx;
          & > img {
            width: 100%;
            height: 100%;
          }

          & > em {
            position: absolute;
            font-style: normal;
            color: @baseColor;
            left: 25%;
            top: 25%;
            width: 33rpx;
            height: 33rpx;
            display: block;
          }
        }

        & > .sign-date {
          padding: 5px 0;
          font-size: 10px;
        }
      }
    }

    & > .sign-message {
      width: 50%;
      height: 32px;
      background-color: #ff66a4;
      line-height: 32px;
    }
  }
}

// 新手任务
.new-work {
  padding: 0 @basePadding;
  margin-bottom: 10px;

  // background-color: #ffe4f4;
  & > .new-work-title {
    background-color: #ffe4f4;
    align-items: center;
    // justify-content: space-around;
    padding: 0 15px;
    height: 48px;

    & > p {
      color: @baseColor;
      font-size: 31rpx;
      font-weight: bold;
    }

    & > span {
      color: #fe86b8;
      font-size: 12px;
      margin-left: 20px;
    }
  }
}

//
.integrate-box {
  // font-size: @baseSize;
  color: @baseTextColor-c;
  // width: 95%;
  margin: 0 auto;

  & > .integrate-item {
    border-bottom: 1rpx solid #ddd;
    padding: 15px 10px;
    // border-radius: 6px;
    background-color: #fff;
    justify-content: space-between;

    & > .item-inner {
      align-items: center;

      & img {
        width: 30px;
        height: 30px;
      }

      & > .cv {
        margin-left: 20px;
        justify-content: space-around;

        & > .i-title {
          // font-weight: bold;
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
        }

        & > .f-title {
          font-size: 12px;
          color: @baseTextColor-c;
        }
      }
    }

    // 去认证
    & > .item-go {
      align-items: center;
      color: @baseColor;

      & > .bn {
        margin-right: 10px;
      }
    }
  }

  & > .more-work {
    color: @baseFirstTitleColor;
    // font-weight: bold;
    background-color: #fff;
    height: 96rpx;
    align-items: center;
    justify-content: center;
  }
}

.triangle_border_down {
  width: 0;
  height: 0;
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: #999 transparent transparent;
  position: relative;
}

.triangle_border_up {
  width: 0;
  height: 0;
  border-width: 0 15rpx 15rpx;
  border-style: solid;
  border-color: transparent transparent @base-white;
  position: relative;
  margin: 0 auto;
}

// 已签到
.active {
  background-color: #ddd !important;
  pointer-events: none;
}
.activeColor {
  color: #ddd;
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
//签到提示
.point_message {
  width: 149px;
  height: 163px;
  // overflow: hidden;
  margin: 0 auto;
  position: relative;
  & > img {
    width: 100%;
  }
  & > .point_box_status {
    position: absolute;
    bottom: 5px;
    width: 100%;

    & > .point_status {
      font-size: 14px;
      color: @baseColor;
      text-align: center;
      margin-bottom: 10px;
    }
    & > .point_num {
      text-align: center;
      font-size: 15px;
      color: @baseColor;
      margin-bottom: 10px;
    }
  }
}
.close {
  margin-top: 23px;
  width: 29px;
  height: 29px;
  & > img {
    width: 100%;
  }
}
</style>
