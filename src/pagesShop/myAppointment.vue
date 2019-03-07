<template>
  <div class="vo">
    <div class="appointment">
      <!-- 我的预约 -->
      <!-- 提交预约信息 -->
      <div class="appointment-product flex-r" v-if="isDetail">
        <div class="product-img"> <img :src="commImg " :alt="comm.commName"></div>
        <div class="c flex-c product-title">
          <p class="xyy-ellipsis-2" style="font-size:13px;" > [{{comm.commName}}] {{comm.remark}}</p>
          <p class="c co" style="color:#999;">{{organ.organName}}</p>
          <p class="c flex-r" style="color:#fc4396;"><span>￥{{comm.rulePrice}}</span> / <a class="c" style="text-decoration:line-through;color:#999;margin-left:10px;">
              ￥{{comm.price}}</a></p>
        </div>
      </div>
      <ul class="c appointment-list">
        <li class="flex-r">
          <span class="c">姓名 </span>
          <p class="flex-r"> <span style="color:#999;"> {{userName}}</span> <span class="icon-product "></span></p>
        </li>
        <li class="flex-r co">
          <span class="c">电话 </span>
          <p class="flex-r"> <span class="c" style="color:#999;"> {{phone}} </span> <span class="icon-product "></span></p>
        </li>
        <li class="flex-r">
          <span class="c">预约项目 </span>
          <p class="c"> <span class="c" style="color:#999;"> {{comm.commName}}</span> <span class="icon-product icon-project "></span></p>
        </li>
        <li class="flex-r" @click="alertTime">
          <span class="c">预约时间 </span>
          <p class="c">
            <span class="c" style="color:#999;"> {{timedata}}</span>
            <span class="icon-product icon-sj "></span>
          </p>
        </li>
      </ul>
      <div class="sub-appointment" @click="appointment">
        提交
      </div>
      <!-- 时间选择器 -->
      <div :class="{'sel-pick':isShow}">
        <pickTime @selTime="selTime" :isShow="isShow" @changeShow="changeShow"></pickTime>
      </div>
      <!-- 失败or 成功 -->
      <div class="sel-pick" v-if="isC">
        <div class="cover-img flex-r">
          <img :src="suc" alt="" mode="widthFix" @click="goAndto">

        </div>

      </div>
    </div>

  </div>

</template>
<script>
let utils = require("@/utils/common.js");
// import pickTime from "@/pages/comm/pickTime";
import pickTime from "./comm/pickTime";
export default {
  data() {
    return {
      severPersonal: {},
      comm: {
        commImg: ""
      },
      organ: {},
      isDetail: true,
      timedata: "请选择时间",
      start: "",
      end: "",
      isShow: false,
      suc: "",
      isC: false,
      isB: 2,
      isClick: false
    };
  },
  components: {
    pickTime
  },
  onShow() {
    this.timedata = "请选择时间";
    this.isClick = false;
  },
  computed: {
    userName() {
      return this.$store.state.userInfo.nickName;
    },
    phone() {
      return this.$store.state.userInfo.mobile;
    },
    commImg() {
      return this.comm.commImg.split(",")[0];
    }
  },
  mounted() {
    this.getDetail();
    this.isDetail = this.$root.$mp.query.isDetail;
    // console.log(utils.formatTime(new Date()));
  },
  methods: {
    //页面加载获取产亲信息
    getDetail() {
      this.$http
        .post("commodity/getCommodityInfo", {
          id: this.$route.query.pid,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            const { comm, organ, servicePersonal } = res.data;
            this.comm = comm;
            this.organ = organ;
            this.severPersonal = servicePersonal;
          }
        });
    },
    alertTime() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        if (this.timedata == "请选择时间") {
          this.timedata = utils.formatTime(new Date());
        }
      }
    },
    selTime(msg) {
      this.timedata = msg;
    },
    changeShow(msg) {
      this.isShow = msg;
    },
    //点击预约
    // 判断客服是否已经注册
    //已经注册，获取用户信息
    // isLogin() {},

    appointment() {
      let date = new Date().getTime();
      if (this.timedata != "请选择时间") {
        if (date >= new Date(this.timedata.replace(/-/g, "/"))) {
          wx.showToast({
            title: "请选择大于当前时间段时候预约",
            icon: "none"
          });
        } else {
          if (!this.isClick) {
            this.isClick = true;
            this.$http
              .post("preregistration/save", {
                organId: this.organ.id,
                peopleId: this.$store.state.userInfo.peopleId,
                appointmentTimeBegin: this.timedata,
                appointmentProjectId: this.comm.projectId,
                commodityId: this.$root.$mp.query.pid,
                tel: this.$store.state.userInfo.mobile,
                appointmentTime: this.timedata
              })
              .then(res => {
                // console.log(res);
                if (res.code == 1) {
                  this.suc = "http://img.meiduduo.com/images/xyy/cg.png";
                  this.isC = true;
                  this.isB = 1;
                  // console.log(this.suc);
                } else {
                  this.suc = "http://img.meiduduo.com/images/xyy/sb.png";
                  this.isC = true;
                  this.isB = 0;
                }
              });
          }
        }
      } else {
        wx.showToast({
          title: "请选择时间",
          icon: "none"
        });
      }
    },
    goAndto() {
      if (this.isB == 1) {
        this.$router.replace("/pagesMine/myAppoint");
        this.isC = false;
      } else if (this.isB == 0) {
        this.isC == false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import url("../css/style.less");
.flex-r {
  display: flex;
  flex-direction: row;
}

flex-c {
  display: flex;
  flex-direction: column;
}

.co-input {
  height: 1rem;
}

.appointment {
  /* padding: 0 15px; */
  font-size: 15px;
  // background-color: #ddd;
}

.cl {
  // background: #ddd;
  // padding-top: 15px;
}

.cover {
  background-color: rgba(0, 0, 0, 0.5);
}

.cover-img {
  justify-content: center;
  /* align-self: auto; */
  align-items: center;
  height: 100%;
}
.cover-img img {
  display: block;
  width: 4.44rem;
  /* height: 250px; */
}

.sel-pick {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.product-img {
  /* width: 30%; */
}

.product-img img {
  display: block;
  height: 100px;
  max-width: 100px;
  border-radius: 6px;
}

.product-title {
  height: 100px;
  align-items: baseline;
  margin-left: 15px;
}

.product-title .co {
  margin: 10px 0;
}

.appointment-product {
  padding: 10px 15px;

  align-items: center;
  background: #fff;
  margin-bottom: 15px;
}

.appointment-list {
  padding: 0 15px;
  margin-top: 15px;
  background: #fff;
}

.appointment-list li {
  padding: 16px 0;
  justify-content: space-between;
  border-bottom: 1rpx solid @cof5;
}

.icon-product {
  margin-left: 10px;
  background-image: url("http://img.meiduduo.com/images/xyy/message.png");
  width: 0.3rem;
  height: 0.3rem;
  /* opacity: 0.7; */
  display: inline-block;
  background-size: contain;
}

.icon-project {
  background-image: url("http://img.meiduduo.com/images/xyy/project.png");
}

.sub-appointment {
  margin: 0 auto;
  text-align: center;
  /* width: 50%; */
  width: 6rem;
  height: 0.8rem;
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  background-color: #fc4396;
  border-radius: 16px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-left: -3rem;
}

.icon-sj {
  background-image: url("http://img.meiduduo.com/images/xyy/sj.png");
}
</style>
