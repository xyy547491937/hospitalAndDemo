<template>
  <div class="vo" :class="{'fixedb':isQian}">
    <div class="tab">
      <!-- 引入组件 -->
      <tab :titledata="nav" @clickactive="clickactive"></tab>
    </div>
    <!-- <div class="c" style="background:#fff;">
      <img src="http://192.168.1.200:8200/shop4/SHOP/icon/1547447159183.png" alt>
    </div>-->
    <div class="c" @click="closeCanvas">
      <div class="total-complaints">共{{total}}条投诉</div>
      <div
        class="complaints-list"
        v-for="(item,index) of complaintsArr"
        :key="index"
        v-if="complaintsArr.length>0"
      >
        <!-- 投诉原因 -->
        <ul class="complaints-body">
          <li class="result-title">{{item.complainContent }}</li>
          <li>
            <span class="left-title">投诉类型：</span>
            <!-- （1术后 2电话 3上门 4网络 5纠纷 6修复） -->
            <span class="right-inner" v-if="item.complainType ==1">术后投诉</span>
            <span class="right-inner" v-if="item.complainType ==2">电话投诉</span>
            <span class="right-inner" v-if="item.complainType ==3">上门投诉</span>
            <span class="right-inner" v-if="item.complainType ==4">网络投诉</span>
            <span class="right-inner" v-if="item.complainType ==5">纠纷投诉</span>
            <span class="right-inner" v-if="item.complainType ==6">修复投诉</span>
          </li>
          <li>
            <span class="left-title">投诉时间：</span>
            <span class="right-inner">{{item.createDate }}</span>
          </li>
          <!-- <li>
          <span class="left-title">投诉项目：</span>
          <span class="right-inner">艾弗莱玻尿酸（0.5ml）补水面膜</span>
          </li>-->
        </ul>
        <!-- 处理结果 -->
        <div class="complaints-result">
          <!-- 处理结果标题 -->
          <p class="result-open">
            <span>处理结果：</span>
            <span>{{item.processingContent}}</span>
          </p>
          <!-- 图片
          -->
          <div class="PD-row">
            <div class="c" :style="{width:((145*2)+9)*item.agreementPhotos.length+'rpx'}">
              <!--  :style="{ backgroundImage:'url('+v+')'}" -->
              <div
                class="gride-2"
                @click="bigImg(item,v)"
                v-for="(v,i) in item.agreementPhotos"
                :key="i"
                :style="{ backgroundImage:'url('+v+')'}"
              >
                <!-- <img :src="v" alt> -->
              </div>
            </div>
          </div>
          <!-- 签字 -->
          <!--     :style="{backgroundImage:'url('+item.affirmUrl+')'}"-->
          <div class="cover-qian" v-if="item.isAffirm==1 ">
            <img :src="item.affirmUrl " mode="widthFix">
          </div>
        </div>
        <!-- <div style="width:100rpx;height:100rpx;border:1px solid #333;">
        <img :src="signImage" alt>
        </div>-->
        <!-- 客户结果 -->
        <div class="customer-result flex-r">
          <p class="flex-r customer-say">
            <!-- <span class="c">顾客反馈</span>
            <span class="c">满意</span>-->
          </p>
          <div
            class="flex-r go-sure"
            @click.stop="alertCover(item,index)"
            v-if="item.isAffirm==0 "
          >去确认</div>
          <div class="sure-text" v-else>已确认</div>
        </div>
      </div>
    </div>
    <!-- 没有数据 -->
    <div id="nolist" v-if="complaintsArr.length <= 0">
      <div
        class="noData-mode"
        :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
      ></div>
    </div>
    <loadOver v-if="isOver"/>
    <!-- <button @click="changeJump('/pagesMine/testqian',{})">go test</button> -->
    <div class="alert-qian" v-show="isQian">
      <view class="qian">
        <!-- <img :src="clickItem.affirmUrl " alt mode="widthFix"> -->
        <!-- <img src="http://192.168.1.200:8200/shop4/SHOP/other/1547195336553.jpg" alt> -->
        <canvas
          style="width:100%;height:100%;"
          class="sign"
          id="Sign"
          canvas-id="sign"
          @touchmove="move"
          @touchstart="start"
          @touchend="end"
          @touchcancel="cancel"
          @longtap="tap"
          disable-scroll="true"
          @error="error"
        ></canvas>
      </view>

      <div class="qian-btn flex-r">
        <p class="again-qian flex-r" @click.stop="clearClick">重签</p>
        <p class="sure-qian flex-r" @click.stop="saveClick">确认</p>
      </div>
    </div>
  </div>
</template>
<script>
import tab from "./../pages/comm/tab";
import upng from "upng-js";
import { mapState } from "vuex";
import loadOver from "../pages/comm/loadOver.vue";

export default {
  data() {
    return {
      loaded: false,
      nav: [
        {
          id: 1,
          title: "全部",
          badgeNum: "3"
        },
        {
          id: 2,
          title: "待确认",
          badgeNum: ""
        },
        {
          id: 3,
          title: "已确认",
          badgeNum: ""
        }
      ],
      complaintsArr: [],
      isQian: false,
      pageNum: 1,
      pageSize: 15,
      activityObj: {
        id: 1,
        title: "全部",
        badgeNum: "3"
      },
      clickItem: {},
      info: {},
      content: null,
      touchs: [],
      imgList: [],
      signImage: "",
      show: false,
      canvasw: "",
      canvash: "",
      status: false,
      base64: "",
      isOver: false,
      clickIndex: 0,
      total: 0
    };
  },
  components: {
    tab,
    upng,
    loadOver
  },
  computed: {
    ...mapState(["userInfo"])
  },

  onLoad() {
    this.canvasStyle();
  },
  onShow() {
    this.loaded = false;
    this.getList();
    this.isQian = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.pageNum = 1;
    this.complaintsArr = [];
    if (this.activityObj.id == 1) {
      this.getList();
    } else if (this.activityObj.id == 2) {
      this.getList(0);
    } else {
      this.getList(1);
    }
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log("到底了");
    if (!this.isOver) {
      this.pageNum++;
      if (this.activityObj.id == 1) {
        this.getList();
      } else if (this.activityObj.id == 2) {
        this.getList(0);
      } else {
        this.getList(1);
      }
    }
  },
  methods: {
    getList(isAffirm = "") {
      this.$http
        .post("customerComplaint/customerComplaintList4Page", {
          peopleId: this.userInfo.peopleId, //702, //
          isAffirm: isAffirm,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            // this.complaintsArr = res.data.data;
            this.total = res.data.total;
            res.data.data.forEach(v => {
              v.agreementPhotos = v.agreementPhotos
                ? JSON.parse(v.agreementPhotos)
                : [];
            });

            var a = res.data.data;
            this.loaded = true;
            if (
              this.pageNum == 1 &&
              this.pageNum * this.pageSize >= res.data.total
            ) {
              this.complaintsArr = a;
              this.isOver = true;
              return false;
            } else {
              if (this.pageNum * this.pageSize < res.data.total) {
                this.complaintsArr = this.complaintsArr.concat(a);
                this.isOver = false;
              } else {
                this.complaintsArr = this.complaintsArr.concat(a);
                this.isOver = true;
              }
            }
            console.log(this.complaintsArr);
          }
        });
    },
    // 签字POST /customerComplaint/customerConfirm
    customerConfirm(item, index, url, width, height) {
      // console.log(item);
      this.$http
        .post("customerComplaint/customerConfirmForHandSign", {
          recordId: item.id,
          affirmUrl: url, //url
          width,
          height
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.isQian = !this.isQian;
            this.complaintsArr = [];
            if (this.activityObj.id == 1) {
              this.getList();
            } else if (this.activityObj.id == 2) {
              this.getList(0);
            } else {
              this.getList(1);
            }
          }
        });
    },

    //点击弹起底部
    alertCover(item, index) {
      this.isQian = !this.isQian;

      this.clickItem = item;
      this.clickIndex = index;
      this.clearClick();
    },
    //当关闭签字矿的时后，清楚画布
    closeCanvas() {
      this.isQian = false;
      this.clearClick();
    },
    //画布笔加粗
    canvasStyle() {
      let that = this;
      //获得Canvas的上下文
      that.content = wx.createCanvasContext("sign");
      //设置线的颜色
      that.content.setStrokeStyle("#000");
      //设置线的宽度
      that.content.setLineWidth(3);
      //设置线两端端点样式更加圆润
      that.content.setLineCap("round");
      that.content.setLineJoin("round");
      //设置两条线连接处更加圆润
      that.content.setFillStyle("#ffffff");
    },

    //选择图片放大

    bigImg(item, v) {
      new Promise((resolve, reject) => {
        resolve({ item, v });
      }).then(res => {
        wx.previewImage({
          current: res.v, //当前显示图片的链接列表urls的第一张
          urls: res.item.agreementPhotos // 需要预览的图片http链接列表
        });
      });
    },
    clickactive(msg) {
      console.log(msg);
      this.loaded = false;
      this.activityObj = msg;
      this.complaintsArr = [];
      if (this.activityObj.id == 1) {
        this.getList();
      } else if (this.activityObj.id == 2) {
        this.getList(0);
      } else {
        this.getList(1);
      }
    },
    //绘制
    draw(touchs) {
      this.status = true;
      let point1 = touchs[0];
      let point2 = touchs[1];
      touchs.shift();
      this.content.moveTo(point1.x, point1.y);
      this.content.lineTo(point2.x, point2.y);
      this.content.stroke();
      this.content.draw(true);
    },
    //清除操作
    clearClick() {
      this.status = false;
      let that = this;
      //创建节点选择器
      var query = wx.createSelectorQuery();
      //选择id
      query
        .select("#Sign")
        .boundingClientRect(function(rect) {
          // console.log(rect);
          // resolve(rect);
          //清除画布
          that.content.clearRect(0, 0, rect.width, rect.height);
          that.content.draw(true);
          that.content.setFillStyle("#ffffff");
          // that.content.fillRect(0, 0, that.canvasw, that.canvash);
          that.content.draw(true);
        })
        .exec();
    },
    //保存图片
    saveClick() {
      // console.log(this.status);
      if (!this.status) {
        wx.showModal({
          title: "提示",
          content: "签名内容不能为空！",
          showCancel: false
        });
        return false;
      }
      var that = this;

      //创建节点选择器
      var query = wx.createSelectorQuery();
      //选择id
      query
        .select("#Sign")
        .boundingClientRect(function(rect) {
          // console.log(rect);

          wx.canvasGetImageData({
            canvasId: "sign",
            x: 0,
            y: 0,
            width: rect.width,
            height: rect.height,
            success(res) {
              // console.log("+++++++++++++++++++++++++++++++");
              // console.log(res);
              // 3. png编码
              let pngData = upng.encode(
                [res.data.buffer],
                res.width,
                res.height
              );

              // 4. base64编码
              let base64 = wx.arrayBufferToBase64(pngData).trim();
              // console.log(base64);
              that.$set(that, "base64", "data:image/jpeg;base64," + base64);
              var parames = {
                base64Img: base64,
                height: parseInt(rect.height),
                width: parseInt(rect.width)
              };
              that.$http
                .post("uploadImgs/uploadBase64Png", parames)
                .then(res => {
                  if (res.code == 1) {
                    that.customerConfirm(
                      that.clickItem,
                      that.clickIndex,
                      res.data,
                      rect.height,
                      rect.width
                    );
                  }
                });
            }
          });
        })
        .exec();
    },
    start(event) {
      this.canvasStyle();
      // console.log("触摸开始", event.mp.changedTouches[0].x);
      // console.log("触摸开始", event.mp.changedTouches[0].y);
      //获取触摸开始的 x,y
      let point = {
        x: event.mp.changedTouches[0].x,
        y: event.mp.changedTouches[0].y
      };
      this.touchs.push(point);
    },
    // 画布的触摸移动手势响应
    move(e) {
      let point = { x: e.touches[0].x, y: e.touches[0].y };
      this.touchs.push(point);
      if (this.touchs.length >= 2) {
        this.draw(this.touchs);
      }
    },
    // 画布的触摸移动结束手势响应
    end(e) {
      // console.log("触摸结束", e);
      //清空轨迹数组
      for (let i = 0; i < this.touchs.length; i++) {
        this.touchs.pop();
      }
      // console.log("移动结束");
      // console.log(this.touchs);
    },
    // 画布的触摸取消响应
    cancel(e) {
      // console.log("触摸取消", e);
    },
    // 画布的长按手势响应
    tap(e) {
      // console.log("长按手势", e);
    },
    error(e) {
      // console.log("画布触摸错误", e);
    }
  }
};
</script>

<style lang="less">
@fz: 16px;
// .border-1(width,){

// }

.total-complaints {
  font-size: 12px !important;
  color: @baseTextColor-c;
  padding: 0 15px;
  background-color: @base-white;
  color: @baseFirstTitleColor;
  &:extend(.pa-body);
}
.pa-body {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1rpx solid #f1f1f1;
}
.baseConfig {
  padding: 0 15px;
  background-color: @base-white;
  color: @baseFirstTitleColor;
  font-size: @fz;
}
.tab {
  height: 40px;
}

.complaints-list {
  margin-bottom: 10px;
  &:extend(.baseConfig);

  & > .complaints-body {
    &:extend(.pa-body);
    & > .result-title {
      font-weight: bold;
    }
    & > li {
      & > .left-title {
        font-size: 14px;
        display: inline-block;
        // width: 65px;
        text-align: left;
        color: @baseTextColor-c;
      }
      & > .right-inner {
        font-size: 14px;
        display: inline-block;
        // width: 75%;
        text-align: left;
      }
    }
    & > li:not(:last-child) {
      margin-bottom: 12px;
    }
  }
  & > .complaints-result {
    overflow: hidden;
    &:extend(.pa-body);
    & > .result-open {
      margin-bottom: 12px;
      font-size: 15px;
      & > span:first-child {
        display: inline-block;
        // width: 25%;
        text-align: left;
        color: @baseTextColor-c;
      }
      & > span:last-child {
        display: inline-block;
        width: 75%;
        text-align: left;
      }
    }
    & > .PD-row {
      overflow: scroll;
      & .gride-2 {
        background-size: cover;
        background-repeat: no-repeat;
        margin-left: 9rpx;
        display: inline-block;
        width: 145 * 2rpx;
        height: 110 * 2rpx;
        overflow: hidden;
        background-position: center;
        & > img {
          // width: 100%;
          // height: 100%;
        }
      }
    }
    & > .cover-qian {
      background-repeat: no-repeat;
      background-size: contain;
      // height: 160px;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  & > .customer-result {
    justify-content: space-between;
    &:extend(.pa-body);
    & > .customer-say {
      align-items: center;
      font-size: 14px;
      & > span:first-child {
        display: inline-block;
        // width: %;
        text-align: left;
        margin-right: 15px;
        color: @baseTextColor-c;
      }
    }
    & > .go-sure {
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 30px;
      text-align: center;
      background-color: #fc4691;
      color: #fff;
      font-size: 14px;
      border-radius: 15px;
    }
    & > .sure-text {
      color: @baseColor;
    }
  }
}
.alert-qian {
  //   width: 100%;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 15px 0 15px;

  & > .qian {
    background-color: #fff;
    border-radius: 5px;
    height: 175px;
  }
  & > .qian-btn {
    justify-content: flex-end;
    position: absolute;
    bottom: 15px;
    right: 15px;
    & > .sure-qian {
      &:extend(.again-qian);
      background-color: #fc4691 !important;
      margin-left: 10px;
    }
  }
}
.again-qian {
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 30px;
  text-align: center;
  background-color: #fa9b09;
  color: #fff;
  font-size: 14px;
  border-radius: 15px;
}
.clearfix {
  display: table;
  content: "";
  clear: both;
}
::-webkit-scrollbar {
  display: none;
}
.sign {
  background: #fff;
}
.fixedb {
  position: fixed;
  overflow: hidden;
}
</style>
