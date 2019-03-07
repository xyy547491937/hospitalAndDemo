<template>
  <div class="c ">
    <!-- 引入组件 -->
    <!-- <tab :titledata="nav"></tab> -->
    <div>
      <div class="order-list flex-r pin">
        <img :src="orderItem.commImg" alt="">
        <div class="order-title flex-c">
          <p><span>[{{orderItem.commodityName}}]</span> <span class="xyy-ellipsis-1">{{orderItem.remark}}</span> </p>
          <p>{{orderItem.organName}}</p>
        </div>
      </div>
      <!-- server-list -->
      <!-- 接待服务 -->
      <div class="rate-box" v-for="(v,i) in rateArr" :key="i">
        <p class="flex-r server-list">
          <!-- <span class="server-icon icon-reception"></span> -->
          <span class="server-text"> {{v.title}}</span>
          <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate :value="v.startIndex " :count="5" v-on:change="change3($event,v)" size="20">
                </i-rate>
              </i-cell>
            </i-cell-group>
          </span>

          <span class="server-text" style="text-align:right;"> {{v.discuessText}}</span>
        </p>
      </div>
      <!-- !TODO 评价内容没有 -->
      <!-- 写评论 -->
      <div class="editor-text pin">
        <div class="cv">
          <textarea placeholder="这次服务让您感觉满意吗？快来说说吧" placeholder-style="color:#AAABB3; margin-left:10px" style="width:100% "
             maxlength="-1"  v-model.lazy="evaluateContent"/>
          </div>

        </div>

        <!-- 医生评价 -->
        <div class="pin">
          <!-- <div class="rate-box1" v-for="v in doctorRate" :key="v">
            <p class="flex-r server-list">

            <span class="server-text"> {{v.title}}</span>
            <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate :value="v.startIndex " :count="count" v-on:change="change3($event,v)" size="20">
                </i-rate>
              </i-cell>
            </i-cell-group>
          </span>

          <span class="server-text" style="text-align:right; color:#999;"> {{v.discuessText}}</span>
        </p>
        </div> -->

        <!-- 选择标签 -->
          <ul class="flex-r tags-list">
            <li style="font-weigth:bold;font-size:14px;"> 选择标签</li>
              <li class="click-tags" v-for="v in addTags" :key="v" v-if="v.isChecked"> {{v.label}} <i @click.stop="closeTags(v)">&times;</i></li>
              <li class="c"> 选择新标签</li>
          </ul>
          <ul class="tags-sel flex-r">
            <li v-for="v in tags" :key="v" @click.stop="selTags(v)" :class="{'active':v.isChecked}"> {{v.label}}</li>
          </ul>
          <div class="PD-sub-btn" @click="editorDiscuess(orderItem,rateArr)"> 提交</div>
        </div>


</div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      count: 5,
      discuessText: "",
      q: "",
      w: "",
      e: "",
      orderItem: {},
      evaluateContent: "",
      addTags: [],
      rateArr: [
        {
          title: "效果",
          iconfont: "icon-reception",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "环境",
          iconfont: "icon-seek",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "专业",
          iconfont: "icon-diagnosis",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "服务",
          iconfont: "icon-account",
          startIndex: 0,
          discuessText: ""
        }
      ],
      doctorRate: [
        {
          title: "医生评价",
          iconfont: "icon-account",
          startIndex: 0,
          discuessText: ""
        }
      ],
      tags: []
    };
  },
  components: {},
  onShow() {
    this.isZero(this.rateArr);
    this.isZero(this.doctorRate);
    this.getTags();
    this.addTags = [];

    this.evaluateContent = "";
    this.getOrderDetail();
    this.getTags();
  },
  computed: {
    detailcode() {
      let n = [];
      this.addTags.forEach(v => {
        console.log(v);
        n.push(v.detailCode);
        console.log(n);
      });
      return n.join();
    }
  },
  mounted() {
    this.getOrderDetail();
    this.getTags();
  },

  methods: {
    //根据订单id 获取订单详情
    getOrderDetail() {
      this.$http
        .post("order/queryOneByPk", {
          id: this.$root.$mp.query.id
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.orderItem = res.data;
            this.orderItem.commImg = res.data.commImg.split(",")[0];
          }
        });
    },
    //页面首次进入归0
    isZero(arr) {
      arr.forEach(v => {
        v.startIndex = 0;
        v.discuessText = "";
      });
    },

    change3(e, item) {
      const index = e.mp.detail.index;
      item.startIndex = index;
      this.discuessRate(index, item);
    },
    discuessRate(n, item) {
      switch (n) {
        case 1:
          item.discuessText = "一般般";
          break;
        case 2:
          item.discuessText = "一般";
          break;
        case 3:
          item.discuessText = "好";
          break;
        case 4:
          item.discuessText = "很好";
          break;
        case 5:
          item.discuessText = "非常好";
          break;
        default:
          item.discuessText = "非常差";
      }
    },
    //获取标签
    getTags() {
      this.$http
        .post("common/dictList", { masterCode: "evaluate_type" })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            res.data.forEach(v => {
              this.$set(v, "isChecked", 0);
            });
            this.tags = res.data;
          }
        });
    },

    //选择标签
    selTags(item) {
      item.isChecked = !item.isChecked;
      let a = [];
      a = this.tags.filter(v => {
        return v.isChecked == true;
      });
      // console.log(a);
      this.addTags = a;
    },
    //删除标签
    closeTags(item) {
      this.selTags(item);
    },
    editorDiscuess(item, arr) {
      // console.log(item.receptionistStar);
      // 返回没有填写的item
      let newArr = [];
      newArr = this.rateArr.filter(v => {
        return v.startIndex == 0;
      });

      if (
        this.evaluateContent == "" ||
        this.detailcode == "" ||
        newArr.length > 0
      ) {
        wx.showToast({
          title: "请完善评论信息",
          icon: "none"
        });
      } else {
        this.$http
          .post("orderEvaluateRecord/save", {
            organId: item.organId,
            custId: this.$store.state.userInfo.custId,
            orderId: item.id,
            // servicePersonId: item.servicePersonalId,

            starEffect: arr[0].startIndex, //效果
            starEnvironment: arr[1].startIndex,
            starSpecialty: arr[2].startIndex,
            starService: arr[3].startIndex,
            evaluateContent: this.evaluateContent,
            starServicePerson: this.doctorRate[0].startIndex,
            evaluateLabel: this.detailcode
          })
          .then(res => {
            if (res.code == 1) {
              wx.showToast({
                title: "评论成功",
                icon: "success"
              });
              setTimeout(() => {
                this.$router.replace({
                  path: "/pagesMine/myOrder",
                  query: {
                    index: 0,
                    isDiscuess: true
                  }
                });
              }, 3000);
            }
          });
      }
    }
  }
};
</script>
<style scoped lang="less">
.flex-c {
  display: flex;
  flex-direction: column;
}

.flex-r {
  display: flex;
  flex-direction: row;
}
.pin {
  margin-bottom: 15px;
  background: #fff;
  padding: 15px;
  //   margin-top: 15px;
}

.discuess-time {
  color: #bbb;
  justify-content: space-between;
}

.state-btn {
  /* 已评价 */
  width: 1.2rem;
  height: 0.41rem;
  background: rgba(230, 230, 230, 1);
  border-radius: 16px;
  text-align: center;
  line-height: 0.41rem;
  color: #fff;
}

.no-state-btn {
  /* 待评价 */
  background-color: #ff4691;
}

.hospital-title {
  margin-top: 15px;
  align-items: center;
  justify-content: flex-start;
}

.hospital-title img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.hospital-title-oargan {
  font-size: 0.3rem;
  font-weight: bold;
}
.rates {
  width: 50%;
  text-align: center;
}
.hospital-title-text {
  font-size: 0.26rem;
  margin-top: 10px;
  /* margin-left: 10px; */
}
.server-list {
  /* width: 100%; */
  align-items: center;
  justify-content: flex-start;
  font-size: 0.28rem;
}
.server-icon {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 0.3rem;
  height: 0.3rem;
}
.rate-box {
  // border-top: 1rpx solid #ddd;
  // border-bottom: 1rpx solid #ddd;
  padding: 15px;
  // margin-top: 15px;
  background-color: #fff;
  // width: 100%;
}
.rate-box1 {
  padding: 15px 0;
  background-color: #fff;
  width: 100%;
}
.server-text {
  display: block;
  width: 30%;
  text-align: left;
  color: #999;
}
.icon-reception {
  background-image: url("http://img.meiduduo.com/images/xyy/smile.png");
}
.icon-seek {
  background-image: url("http://img.meiduduo.com/images/xyy/dmessage.png");
}
.icon-diagnosis {
  background-image: url("http://img.meiduduo.com/images/xyy/docker.png");
}
.icon-account {
  background-image: url("http://img.meiduduo.com/images/xyy/smoney.png");
}
.icon-beauty {
  background-image: url("http://img.meiduduo.com/images/xyy/mrs.png");
}
.editor-text textarea {
  font-size: 0.28rem;
  min-height: 95px;
  // border: 1rpx dashed #ddd;
  background-color: RGBA(245, 245, 245, 1);
  // padding: 10px;
}
.editor-text .cv {
  padding: 10px;
  border: 1rpx dashed #ddd;
  background-color: RGBA(245, 245, 245, 1);
}

.order-list {
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 13px;
  color: #999;
  & > img {
    width: 60px;
    height: 60px;
  }
  & > .order-title {
    margin-left: 10px;
    justify-content: space-around;
    & > p:first-child {
      color: #333;
      font-size: 14px;
    }
  }
}
.tags-list {
  // padding: 0 15px;
  font-size: 13px;
  background-color: #fff;
  margin-top: 10px;
  color: RGBA(51, 51, 51, 1);
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1rpx solid #f1f1f1;
  & > li {
    margin-bottom: 10px;
  }
  & > li:not(:first-child) {
    margin-left: 10px;
    padding: 4rpx 20rpx;
    border: 1px solid #ddd;
    border-radius: 15px;
  }
  & > li:last-child {
    color: RGBA(153, 153, 153, 1);
  }
  & > .click-tags {
    position: relative;
    & > i {
      width: 14px;
      height: 14px;
      display: block;
      position: absolute;
      background-color: #ff4691;
      text-align: center;
      line-height: 14px;
      top: -14rpx;
      right: -14rpx;
      border-radius: 50%;
      color: #fff;
    }
  }
}

.tags-sel {
  font-size: 13px;
  color: RGBA(51, 51, 51, 1);
  margin-top: 10px;
  align-items: center;
  flex-wrap: wrap;
  & > li {
    margin-left: 10px;
    padding: 4rpx 20rpx;
    border: 1px solid #ddd;
    border-radius: 15px;
    background-color: RGBA(241, 241, 241, 1);
    margin: 0 0 10px 10px;
  }
}
@hei: 40px; //btn 高度
.PD-sub-btn {
  width: 90%;
  height: @hei;
  background: #ff4691;
  border-radius: 16px;
  text-align: center;
  line-height: @hei;
  margin: 20px auto;
  color: #fff;
  font-size: 13px;
}
.active {
  background-color: #ff4691 !important;
  color: #fff !important;
}
</style>
