<template>
  <div>
    <loading v-if="show"></loading>
    <div v-else class="project-info">
      <div class="box">
        <div class="loop">
          <!-- 轮播图组件 -->
          <banner :imgsrc="imgsrc" :reciveTaskid="reciveTaskid"></banner>
        </div>
        <div class="project">
          <div class="project-title-box flex-r">
            <div class="project-x-title">
              <h5 class="xyy-ellipsis-2">
                <span>[{{comm.commName}}]</span>
                <span>{{comm.remark}}</span>
              </h5>
              <span class="price">
                <span>
                  <span>¥</span>
                  {{comm.rulePrice }}
                </span>
                <!--  -->
                <span class="line">¥{{comm.price}}</span>
                <!--  -->
                <!-- <span>9折</span> -->
                <!--  -->
              </span>
            </div>
            <div class="project-x-fav" @click="favoriteProduct">
              <i-icon type="like" size="20" color="#999" v-if="!comm.favourite"/>
              <i-icon type="like_fill" size="20" color="#FC4396" v-else/>
              <p class="c">{{comm.favourite?"已收藏":"收藏"}}</p>
            </div>
          </div>

          <p class="position">
            <span>距离:{{comm.distance}}</span>
            <span>{{comm.buyNum }}人购买</span>
            <!-- @click="changeJump('/pagesShop/payAndCoupon')" -->
          </p>
        </div>
      </div>

      <div class="box">
        <div class="c .sel-server">
          <div class="flex-r">
            <span class="name-label">数量</span>
            <!-- 引入模块 -->
            <!-- <inputNumber :addNum="addNum" @addnum="addnum"/> -->
            <addProduct @addnum="addnum"/>
          </div>
        </div>
        <div class="c .sel-server" v-if="comm.commType==1">
          <div class="flex-r middle-label">
            <span class="c name-label">付款</span>
            <!-- 引入模块 -->
            <inputNumber :sel="sel" :comm="comm" @payType="payType" :organType="organ.organType"/>
          </div>
        </div>
        <div
          class="server sel-server flex-r"
          v-if="comm.isInsurance ||comm.isStage ||comm.isRecommend ||comm.isPrefer||comm.isHot "
        >
          <div class="name-label">服务</div>
          <div class="item">
            <div class="link">
              <!-- <span>闪电退</span> -->
              <span v-if="comm.isInsurance">保险</span>
              <span v-if="comm.isStage ">分期</span>
              <span class="c" v-if="comm.isRecommend ">推荐</span>
              <span class="c" v-if="comm.isPrefer ">优选</span>
              <span class="c" v-if=" comm.isHot ">热卖</span>
            </div>
          </div>
        </div>
        <!-- 新增功能优惠券 -->
        <!-- 假如返回数组为空  不显示，否则显示-->
        <div class="c server sel-server flex-r" @click="couponShow=true" v-if="couponList.length>0">
          <div class="name-label">促销</div>
          <!-- 引入sales组件 -->
          <div class="c" style="width:85%">
            <sales :isShow="isShow" :couponList="couponSplit"/>
          </div>
        </div>

        <!--  4.1新增 代言费分享功能-->
        <div class="c server flex-r" v-if="Number(comm.endorsementFee)>0">
          <div class="endorsement flex-r">
            <div class="endorsement-left flex-r">
              <p class="f-btn flex-r">分享</p>
              <p class="share-explain">分享可赚{{comm.endorsementFee}}元代言费</p>
              <!-- <p class="share-icon flex-r" @click.stop="explainShow=!explainShow">?</p> -->
              <img
                src="http://img.meiduduo.com/images/xyy/question.png"
                alt
                class="share-icon"
                @click.stop="explainShow=!explainShow"
              >
            </div>
            <div class="endorsement-right flex-r">
              <p class="go-share">去分享</p>
              <i-icon type="enter"/>
              <button open-type="share" class="hide-btn"></button>
            </div>
          </div>
        </div>
      </div>

      <div class="box addr-box">
        <div class="address">
          <div class="addr-img">
            <img :src="organ.logo">
          </div>
          <div class="addr-p">
            <div @click="changeJump('./orgin',{id:organ.id})">
              <p>{{organ.organName}}</p>
              <p>资质：{{organ.aptitude}}</p>
              <p>地址：{{organ.address}}</p>
            </div>
          </div>
        </div>
        <div
          class="link doctor"
          style="color:#666;"
          v-if="severPersonal"
          @click="changeJump('/pagesShop/doctor_detail',{id:severPersonal.id})"
        >
          <span>{{severPersonal.personalName}}</span>
          {{severPersonal.technicalName}}
          <span
            style="margin-left:10px; color:#666;"
          >擅长：{{severPersonal.fields}}</span>
          <span class="clc">
            <i-icon type="enter" size="15" color="#666"/>
          </span>
        </div>
      </div>
      <div class="box">
        <!-- 引入评价模块 -->
        <!-- <discuess /> -->
        <!-- <div class="c all-discuess">
        查看全部评价
        <span class="c">
          <i-icon type="enter" size="15" color="#FF4691" /></span>
        </div>-->
      </div>
      <div class="box box1">
        <div class="order-tab">
          <ul>
            <li
              v-for="(item, index) in orderArr"
              :key="index"
              :class="{active:index==orderTabIndex}"
              @click="changeActive(index)"
            >{{item}}</li>
          </ul>
        </div>
        <div class="tab-item" v-show="orderTabIndex==0">
          <div class="tab-title">服务介绍</div>
          <div ref="commInfo" class="item-block">
            <div class="item-banner" v-html="comm.commInfo"></div>
          </div>
          <!-- <div class="tab-title" v-if="severPersonal">医生介绍</div> -->
          <!-- <div class="item-block" v-if="severPersonal">
          <div class="item-banner" v-html="severPersonal.introduce"></div>
          <p ref="doctorIntro"></p>
          </div>-->
          <!-- <div class="tab-title">医院介绍</div> -->
          <!-- <h2>石家庄贵美人医疗美容医院</h2> -->
          <!-- <div class="item-banner out-img" v-html="organ.introduce"></div> -->
          <div class="tab-title">版权声明</div>
          <div class="item-block">
            <p>如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请相关权利人或利害关系人与胚豆网联系。</p>
          </div>
          <div class="tab-title">免责声明</div>
          <div class="item-block">
            <p v-if="organ.organType == 1">该服务项目需您与医生当面沟通咨询方能最终确定治疗方案，本站所载内容仅供参考。</p>
            <p v-else>该服务为线下服务，本站所载内容仅供参考。</p>
          </div>
        </div>
        <div
          class="tab-item tab-item1"
          v-show="orderTabIndex==1 && comm.commType==1"
          style="color:#999"
        >
          <div style="font-size: 0.65rem;">胚豆百科带您了解该项目的操作方法、术后效果、恢复时间、术后护理等相关知识</div>
          <hr style="height:0.4rem;border:none;border-top:0.4rem solid #F1F1F1;">
          <div class="comm_explain">
            <p>项目概览</p>
            <!--<div class="exp_abstract">
									<p>项目简介</p>
									<span>
										操作过程简单，创伤较小，深受年轻一族爱美人士所喜爱。
									</span>
            </div>-->
            <div class="exp_abstract">
              <p>项目简介</p>
              <span v-html="comm.reserveProcess"></span>
            </div>
          </div>
          <!-- 医美 的固值1533971621599  -->
          <!-- 当商品的channelCode ==固执 是显示治疗档案 -->
          <div class="comm_explain1" v-if="comm.channelCode== '1533971621599'">
            <div class="explain_tit">
              <img src="http://img.meiduduo.com/images/productDetails/comm11.png">治疗档案
            </div>
            <ul>
              <li>
                <span>单次治疗时长</span>
                <div>{{comm.onceTreatmentTime }}</div>
              </li>
              <li>
                <span>治疗次数</span>
                <div>{{comm.treatmentNum }}次</div>
              </li>
              <li>
                <span>效果持续时间</span>
                <div>{{comm.durationTime }}</div>
              </li>
              <li>
                <span>麻醉方式</span>
                <div>{{comm.anesthesia }}</div>
              </li>
              <li>
                <span>恢复过程</span>
                <div>{{comm.recoveryProcedure }}</div>
              </li>
              <li>
                <span>达到效果时间</span>
                <div>{{comm.finishTime }}</div>
              </li>
              <li>
                <span>疤痕情况</span>
                <div>{{comm.scar }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="tab-item"
          ref="reserveProcess"
          v-show="orderTabIndex==2 && comm.commType==1"
          style="color:#999"
        >
          <div class="order">
            <div class="link">预定须知</div>

            <div>
              <div class="order-title">服务项目</div>
              <p>{{comm.projectName}}</p>
            </div>
            <div>
              <div class="order-title">通过胚豆预定</div>
              <p>
                全款需支付
                <span>¥{{comm.rulePrice}}</span> 订金需支付
                <span>¥{{comm.depositPrice}}</span> 到院支付剩余
                <span>¥{{hospitalPay}}</span>
              </p>
            </div>
            <div>
              <div class="order-title">使用规则</div>
              <p ref="useRule" v-html="comm.useRule"></p>
            </div>
          </div>
        </div>
        <!-- <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1"> -->
        <!-- 评价 产品为服务-->
        <!-- 引入评价模块 -->
        <!-- <discuess />
        </div>-->
        <!-- <div class="tab-item" v-show="orderTabIndex==1 && comm.commType==2"> -->
        <!-- 评价 产品为产品时-->
        <!-- 引入评价模块 -->
        <!-- <discuess />
        </div>-->
        <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1">
          <!-- 日记本的模块 -->
          <typeDiary :diaryValue="diaryValue" :commType="comm.commType"></typeDiary>
        </div>
      </div>

      <!-- <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1"> -->
      <!-- 评价 产品为服务-->
      <!-- 引入评价模块 -->
      <!-- <discuess />
      </div>-->
      <!-- <div class="tab-item" v-show="orderTabIndex==1 && comm.commType==2"> -->
      <!-- 评价 产品为产品时-->
      <!-- 引入评价模块 -->
      <!-- <discuess />
      </div>-->
      <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1">
        <!-- 日记本的模块 -->
        <typeDiary :diaryValue="diaryValue" :commType="comm.commType"></typeDiary>
        <!-- nodata -->
        <div
          class="noData"
          v-if="diaryValue.length<=0"
          :style="loaded?' background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 120rpx 150rpx;':''"
        ></div>
      </div>
      <!-- 推荐商品 -->
      <div class="propose-pro">
        <!-- 猜你喜欢 -->
        <div class="guess-like">
          <span></span>
          <p>猜你喜欢</p>
          <span></span>
        </div>
        <!-- <i-divider color="#ed3f14" lineColor="#ed3f14">猜你喜欢</i-divider> -->
        <!-- 商品列表 -->
        <div class="product-box">
          <div class="product-list">
            <commodityCard
              v-for="(v,i) in proposeArr1"
              :key="i"
              :data="v"
              :shop="true"
              @jump="guessJump"
            />
          </div>
          <div class="product-list">
            <commodityCard
              v-for="(v,i) in proposeArr2"
              :key="i"
              :data="v"
              :shop="true"
              @jump="guessJump"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <hr style="height:0.4rem;border:none;border-top:0.4rem solid #F1F1F1;" />
    <hr style="height:1.4rem;border:none;border-top:1.4rem solid #F1F1F1;" />-->
    <div class="footer">
      <div class="footer-left">
        <!-- 电话 -->
        <div class="co flex-c" @click="callPhone(organ)">
          <img src="http://img.meiduduo.com/images/shop/call.png" alt class="c">
          <p class="c">电话</p>
        </div>
        <!-- 客服-->
        <div class="co flex-c">
          <img src="http://img.meiduduo.com/images/shop/message_b.png" alt>
          <!-- <img v-if="!commodity.favourite" src="/static/img/projectInfo/star.png" alt=""> -->
          <p class="c">客服</p>
          <button open-type="contact"></button>
        </div>
        <!-- 预约 -->
        <div class="co flex-c" @click="goAppointment">
          <img src="http://img.meiduduo.com/images/shop/yuyue.png" alt class="c">
          <p>预约</p>
        </div>
      </div>
      <div class="footer-right">
        <div @click="addCart($event)">+购物车</div>
        <div @click="jump(comm)">立即购买</div>
      </div>
    </div>

    <!-- 优惠券弹窗 -->
    <div class="cover" v-if="couponShow" @click="couponShow=!couponShow" @touchmove.stop="''">
      <div class="coupon-alert">
        <div class="c-box flex-c">
          <div class="coupon-title">促销</div>
          <p class="flex-r" style="width:100%;margin-bottom:15px">
            <span class="coupon-icon"></span> 购买该商品后即可领取以下优惠券
          </p>
          <scroll-view scroll-y class="pd-src">
            <div class="coupon-lists">
              <!-- 引入组件 -->
              <div
                class="cp"
                v-for="v in couponList"
                :key="v"
                @click="changeJump('/pagesShop/voucherDetail',{couponItem:JSON.stringify(v) })"
              >
                <voucher :voucher="v" @getVoucher="getVoucher" @useVoucher="useVoucher"/>
              </div>
            </div>
          </scroll-view>
        </div>

        <!-- button -->
        <div class="btn-fix">
          <div class="PD-sub-btn" @click="couponShow=!couponShow">完成</div>
        </div>
      </div>
    </div>
    <!-- 4.1新增分享代言费 -->
    <!-- 阻止默认滑动 -->
    <div class="cover" v-if="explainShow" @touchmove.stop="''">
      <div class="consultative">
        <h2 class="consultative-title">代言费说明</h2>
        <p class="consultative-content">您的好友通过您分享的链接下单并到店消费，您即可获得代言费。</p>
        <div class="PD-sub-btn consultative-btn" @click.stop="explainShow=!explainShow">知道了</div>
        <div class="close-btn" @click.stop="explainShow=!explainShow">&times;</div>
      </div>
    </div>
  </div>
</template>

<script>
// const util = require("@/utils/common.js");
import { dealRichP, dealHtmlStyle } from "@/utils/util.js";
import discuess from "./comm/discuess";
import banner from "./comm/shopBanner";
import typeDiary from "./comm/typeDiary"; //日记列表
import inputNumber from "./comm/inputNumber"; //数量++
import addProduct from "./comm/addProduct";
import sales from "./comm/sales";
import voucher from "./comm/voucher";
import LOGIN from "../utils/login.js";
import commodityCard from "../pages/comm/commodity_card";
import loading from "../pages/comm/loading";
export default {
  data() {
    return {
      loaded: false,
      show: true,
      orderArr: [],
      orderTabIndex: "0",
      commodity: [],
      doctor: [],
      organ: [],
      projectId: "",
      doctorId: "",
      organId: "",
      caseParames: {
        areaId: 37,
        verifyState: "Y"
      },
      dialogMask: false,
      dialogContent: "",
      beforePath: "/",
      explainList: [],
      explainContent: [],
      comm: {
        distance: null
      }, //获取商品详情的对象
      organ: {
        introduce: ""
      },
      severPersonal: {},
      diaryValue: [],
      imgsrc: [],
      sel: true,
      addNum: true,
      num: 1, //从子组件获取数据
      payMethod: 1,
      cartNum: 0,
      pageNum: 1,
      pageSize: 15,
      couponList: [],
      isShow: true,
      couponShow: false,
      explainShow: false, //代言费的模态框显示
      taskWork: {},
      reciveTaskid: false, //默认是自己点进去的
      proposeArr1: [],
      proposeArr2: []
    };
  },
  components: {
    banner,
    typeDiary,
    discuess,
    inputNumber,
    sales,
    voucher,
    commodityCard,
    loading,
    voucher,
    addProduct
    //             homeCase,
    //             dialogList
  },
  onShow() {
    this.loaded = false;
    this.show = true;
    this.goRegiest();
    // if (this.comm.id) {
    //   this.getDiary();
    // }
    this.num = 1;
    this.couponShow = false;
    this.explainShow = false;
    this.reciveTaskid = false;
    //显示分享功能
    this.showShareMenu();
    this.getDetail();
    this.couponShow = false;
  },
  //监听分享的回调
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    } else {
      console.log("来自右上角转发菜单");
    }
    console.log("=====================================");
    console.log(this.taskWork);
    console.log(
      `${this.taskWork.shareUrl}?taskId=${this.taskWork.taskId}&&custId=${
        this.taskWork.custId
      } &&id=${this.taskWork.recordId} &&imageUrl=${
        this.comm.commImg.split(",")[0]
      }`
    );
    return {
      title: `[${this.comm.commName}] ${this.comm.remark}`,
      path: `${this.taskWork.shareUrl}?taskId=${this.taskWork.taskId}&&custId=${
        this.taskWork.custId
      } &&id=${this.taskWork.recordId}&&share=1`,
      imageUrl: this.comm.commImg.split(",")[0],
      success: res => {
        this.$http
          .post("customerRelation/save", {
            custRelation: 1,
            taskId: this.taskWork.taskId,
            custId: this.$store.state.userInfo.custId,
            organId: this.organ.id,
            pCustId: 0
          })
          .then(res => {});
      },
      fail: res => {
        console.log("转发失败", res);
      }
    };
  },
  mounted() {
    this.goRegiest();
    this.getDetail();
    // 如果首次进入，没有注册转注册页面
  },
  computed: {
    baseUrlImg() {
      return this.$store.state.baseUrlImg;
    },
    user() {
      return this.$store.state.userInfo;
    },
    oldMoney() {
      let n = 0;
      if (this.comm.commType == 1) {
        if (this.payMethod == 1) {
          // 0定金，1全款
          n = this.comm.rulePrice;
        } else {
          n = this.comm.depositPrice;
        }
      } else {
        n = this.comm.rulePrice;
      }
      return n;
    },
    couponSplit() {
      // let a = this.couponList;
      return this.couponList.slice(0, 3);
    },
    hospitalPay() {
      return (this.comm.rulePrice - this.comm.depositPrice).toFixed(2);
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    jump(item) {
      // console.log(this.num);
      this.$router.push({
        path: "./successOrder",
        query: {
          id: item.id,
          commType: item.commType,
          shopType: 2,
          num: this.num,
          buyType: this.payMethod,
          organId: this.organ.id
        }
      });
    },
    goRegiest() {
      if (this.$route.query.share) {
        if (!this.user.openid || !this.user.custId) {
          this.$store.commit("setInvited", {
            invited: true
          });
          console.log("商品页判断是否已注册");
          LOGIN("/pagesShop/productDetails", this.$route.query);
        } else {
          this.getDetail();
        }
      }
      // console.log("商品详情页登录状态查看", this.$store.state.isLogin);
      // console.log("商品详情页，邀请状态", this.$store.state.invited);
      // if (this.$store.state.isLogin) {

      // }
      if (!this.user.openid || !this.user.custId) {
        // this.$router.replace({
        //   url: "/pages/index"
        // });
        // wx.switchTab({
        //   url: '/pages/index'
        // })
      }
    },
    changeActive(index) {
      this.orderTabIndex = index;
    },

    dealRichImg(text) {
      // this.dealRichText(text)
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto" '
      );
    },
    dealRichText(text) {
      return text.replace(
        /[\<p \<li \<h1 \<h2 \<h3 \<h4]/gi,
        '<p style=" font-size:12px;color:#999;"'
      );
    },
    imgSet(text) {
      return new Promise((resolve, reject) => {
        dealHtmlStyle(
          text,
          "p",
          "font-size:14px;color:#999;line-height: 24px;"
        ).then(res => {
          dealHtmlStyle(
            res,
            "ul",
            "font-size:14px;color:#999;line-height: 24px;"
          ).then(res => {
            dealHtmlStyle(res, "img", "max-width:100%;height:auto").then(
              res => {
                resolve(res);
              }
            );
          });
        });
      });
    },

    tablist(comm) {
      if (comm.commType == "1") {
        this.orderArr = ["项目详情", "使用须知", "常见问题", "日记"];
      } else if (comm.commType == "2") {
        this.orderArr = ["项目详情"];
      }
    },
    //名词解释性接口
    // !TODO 接口没完善
    NounInterpretation() {
      this.$http
        .post("projectNounExplanation/queryOneByCondition", {
          projectCateId: this.comm.categoryId || ""
        })
        .then(res => {
          // console.log(res);
        });
    },
    //点击收藏
    favoriteProduct() {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http
        .post("storeRecord/save", {
          recordId: this.comm.id,
          custId: this.$store.state.userInfo.custId, //模拟用户id
          recordType: 3, //3:商品; 4:资讯; 9:小视频
          state: this.comm.favourite ? "-1" : "1"
        })
        .then(res => {
          // console.log(res);
          wx.hideLoading();
          if (res.code == 1) {
            wx.showToast({
              title: this.comm.favourite ? "取消成功" : "收藏成功",
              icon: "none"
            });
            this.getDetail();
          }
        });
    },
    // 获取商品详情
    getDetail() {
      this.$http
        .post("commodity/getCommodityInfo", {
          id: this.$root.$mp.query.id,
          userId: this.$store.state.userInfo.custId || "",
          lat: this.$store.state.latitude || "",
          lng: this.$store.state.longitude || ""
        })
        .then(res => {
          //   console.log(res.data.data);
          if (res.code == 1) {
            this.show = false;
            const { comm, organ, servicePersonal, couponList } = res.data;
            this.imgSet(organ.introduce).then(res => {
              organ.introduce = res;
            });
            this.imgSet(comm.commInfo).then(res => {
              comm.commInfo = res;
            });
            this.imgSet(comm.useRule).then(res => {
              comm.useRule = res;
            });
            this.imgSet(servicePersonal.introduce).then(res => {
              servicePersonal.introduce = res;
            });
            this.imgSet(comm.reserveProcess).then(res => {
              comm.reserveProcess = res;
            });
            this.$set(this, "organ", organ);
            this.$set(this, "comm", comm);
            couponList.forEach(v => {
              v.state = -3;
            });

            this.$set(this, "couponList", couponList);
            this.$set(this, "severPersonal", servicePersonal);
            this.$set(this, "imgsrc", comm.commImg.split(","));
            // 距离显示一位小数
            this.$set(
              this.comm,
              "distance",
              this.comm.distance
                ? this.comm.distance.toFixed(1) + "km"
                : "距离太远"
            );
            // 代言费保留两位小数
            this.$set(
              this.comm,
              "endorsementFee",
              Number(this.comm.endorsementFee).toFixed(2)
            );
            this.tablist(this.comm);
            this.NounInterpretation();
            this.getDiary();
            this.getTaskId();
            this.isTaskId();
            this.guessLike();
          }
        });
    },
    //打电话
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item.tel,
        success: res => {
          // console.log(res);
        }
      });
    },
    //获取日记列表   POST /diary/queryOneByPkAndUserId
    getDiary() {
      this.$http
        .post("diaryBook/list4PageForDiaryBook", {
          // personalName: this.severPersonal.personalName
          commId: this.comm.id || "",
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            this.diaryValue = res.data.data;
            this.loaded = true;
          }
        });
    },
    //预约

    goAppointment() {
      // this.changeJump("../shop/myAppointment", { pid: this.comm.id });
      if (this.$store.state.isLogin) {
        if (this.comm.projectId) {
          this.changeJump("./myAppointment", {
            pid: this.comm.id,
            isDetail: false
          });
        } else {
          wx.showToast({
            title: "此项目不可预约",
            icon: "none"
          });
        }
      } else {
        wx.showToast({
          title: "请前往授权登陆",
          icon: "none"
        });
      }
    },
    //获取评价列表
    //评论类型(1:医生; 2:医院; 3:商品; 4:资讯; 5:日记; 6:达人; 7:日记本; 8:问答;9:小视频;10:文章;11:评论)
    getCommenList() {
      this.$http
        .post("comment/getList", {
          commentType: 3,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res);
        });
    },
    //获得子组件的参数
    addnum(msg) {
      this.num = msg;

      // console.log(this.num);
    },
    //接受子组件传过来的支付方式
    payType(msg) {
      this.payMethod = msg;
      // console.log(this.payMethod);
    },
    /*
            @ 加入购物车
            @ 加入成功后跳转
            @ 弹出提时
          actions*/
    addCart(e) {
      // console.log(this.num);
      this.$http
        .post("cart/save", {
          organId: this.organ.id,
          commodityId: this.comm.id,
          custId: this.$store.state.userInfo.custId,
          buyType: this.payMethod, //定金0 //全款1
          quantity: this.num,
          oldPrice: this.oldMoney, //加入时的价格
          state: 1
        })
        .then(res => {
          // console.log(res);

          if (res.code == 1) {
            wx.showToast({
              title: "加入成功",
              icon: "success"
            });
          }
        });
    },
    getVoucher() {
      wx.showToast({
        title: "购买后可领取",
        icon: "none",
        mask: true
      });
    },
    useVoucher(msg) {
      // console.log(msg);
      this.changeJump("/pagesShop/voucherDetail", { couponItem: msg });
    },
    showShareMenu() {
      wx.showShareMenu();
      // console.log("显示了当前页面的转发按钮");
    },
    getTaskId() {
      this.$http
        .post("shareTask/save", {
          custId: this.$store.state.userInfo.custId,
          shareType: 1,
          recordId: this.comm.id,
          shareUrl: "/pagesShop/productDetails",
          state: 1
        })
        .then(res => {
          if (res.code == 1) {
            this.taskWork = res.data;
            // console.log(this.taskWork);
          }
        });
    },

    //绑定用户分享上下级关系
    isTaskId() {
      console.log("绑定用户分享上下级关系");
      console.log(
        this.$root.$mp.query.taskId,
        this.$store.state.userInfo.custId,
        this.organ.id,
        this.$root.$mp.query.custId
      );
      console.log("绑定用户分享上下级关系");
      if (this.$root.$mp.query.taskId) {
        this.$http
          .post("customerRelation/save", {
            custRelation: 1,
            taskId: this.$root.$mp.query.taskId,
            custId: this.$store.state.userInfo.custId,
            organId: this.organ.id,
            pCustId: this.$root.$mp.query.custId
          })
          .then(res => {
            if (res.code == 1) {
              console.log("绑定用户分享上下级关系接口调用成功");
            }
            // console.log(res);
            //改变状态
            this.reciveTaskid = true;

            this.recordSource();
          });
      }
    },

    //记录来源用户的分享记录
    recordSource() {
      console.log("记录来源用户的分享记录");
      console.log(
        this.$root.$mp.query.custId,
        this.$store.state.userInfo.custId,
        this.$root.$mp.query.taskId,
        this.comm.id
      );
      console.log("记录来源用户的分享记录");
      this.$http
        .post("customerShareRecord/save", {
          originCustId: this.$root.$mp.query.custId, //分享人的id 又叫来源用户id
          custId: this.$store.state.userInfo.custId, //当前的用户id
          taskId: this.$root.$mp.query.taskId,
          shareType: 1,
          shareUrl: "/pagesShop/productDetails",
          recordId: this.comm.id
        })
        .then(res => {
          if (res.code == 1) {
            console.log("记录来源用户的分享记录接口调用成功");
          }
          console.log(res);
        });
    },
    //猜你喜欢 2019/1/29 梁台的接口
    guessLike() {
      this.$http
        .post("commodity/queryRecommendCommodity", {
          userId: this.user.custId,
          categoryId: this.comm.categoryId ? this.comm.categoryId : "",
          organId: this.organ.id,
          id: this.comm.id
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            // 接口请求了两遍，每次请求时都要归零
            let proposeArr1 = [];
            let proposeArr2 = [];
            res.data.forEach((v, i) => {
              v.commImg = v.commImg.split(",");
              if (i % 2) {
                proposeArr1.push(res.data[i]);
              } else {
                proposeArr2.push(res.data[i]);
              }
              this.proposeArr1 = proposeArr1;
              this.proposeArr2 = proposeArr2;
            });
          }
        });
    },
    //跳转商品详情
    guessJump(msg) {
      // console.log(msg);
      // this.changeJump("/pagesShop/productDetails", { id: msg });

      this.$router.replace({
        path: "/pagesShop/productDetails",
        query: { id: msg }
      });
    }
  }
};
</script>

<style scoped lang="less">
// @import url("../css/style.less");

.clc {
  position: absolute;
  right: 0;
}

.out-img img {
  max-width: 100%;
  height: auto;
  display: block;
}

.all-discuess {
  border-top: 1rpx solid #ccc;
  margin-top: 10px;
  text-align: center;
  color: #ff4691;
  font-size: 0.24rem;
  padding: 10px;
}

.middle-label {
  align-items: flex-start;
}

.project-info {
  padding-bottom: 0.9rem;
  background-color: #f1f1f1;
  min-height: 100%;
  width: 100%;
}

.box {
  margin-bottom: 0.17rem;
  background: #fff;
}

.box1 {
  background: transparent;
}

.loop {
  /* height: 7.3rem; */
  position: relative;
}

.loop .title {
  height: 0.51rem;
  width: 100%;
  position: absolute;
  top: 0.5rem;
  z-index: 55;
}

.loop .title .content {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  padding: 0 0.25rem;
}

.loop .title .content .right {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  /* width: 1.2rem;*/
}

.loop .title .content .ball {
  width: 0.51rem;
  height: 0.51rem;
  background-color: #000;
  border-radius: 50%;
  opacity: 0.5;
  background-size: 80% 80%;
  background-position: center center;
  background-repeat: no-repeat;
}

.loop .title .content .back {
  background-image: url("/static/img/projectInfo/back.png");
  background-size: 60% 60%;
  background-repeat: no-repeat;
}

.loop .title .content .right div:first-child {
  background-image: url("/static/img/projectInfo/che.png");
}

.loop .title .content .right div:last-child {
  background-image: url("/static/img/projectInfo/dian.png");
}

.loop img {
  height: 100%;
}

.project {
  padding: 0.2rem 0.25rem;
}

.project h5 {
  font-weight: normal;
  font-size: 12px;
  color: #333;
  margin-bottom: 0.1rem;
  border-right: 1rpx solid #ccc;
}

.project h5 span {
  font-weight: bolder;
}

.project p {
  color: #666;
  font-size: 0.24rem;
}

.project .price {
  margin-bottom: 0.05rem;
}

.project .price span:first-child {
  font-size: 18px;
  color: #ff4691;
  margin-right: 0.1rem;
}

.project .price span:first-child a {
  font-size: 12px;
}

.project .price .line {
  font-size: 0.24rem;
  color: #999;
  text-decoration: line-through;
}

.project .price i {
  font-size: 0.3rem;
}

/* .project .price span:last-child {
  font-size: 0.14rem;
  line-height: 1;
  padding: 0.01rem 0.05rem;
  background: #ff4691;
  color: #fff;
  font-weight: 100;
  border-radius: 0.03rem;
  position: relative;
  bottom: 0.1rem;
} */

.project .position {
  display: flex;
  color: #999;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
}

.server {
  display: flex;
  display: -webkit-flex;
}

.sel-server {
  padding: 0.2rem 0.25rem;
  font-size: 0.24rem;
  // align-items: baseline;
  position: relative;
  border-bottom: 1rpx solid @cof5;
}

.name-label {
  width: 15%;
  font-size: @baseSize;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  // margin-right: 30rpx;
}

.name {
  width: 0.73rem;
  color: #000;
  font-weight: 500;
  line-height: 0.6rem;
}

.item div {
  /* width: 6.32rem; */
  font-size: 0.24rem;
  line-height: 0.6rem;
}

.item div:nth-child(1) span {
  padding: 0 0.15rem 0 0.33rem;
  background: url("http://img.meiduduo.com/images/productDetails/yes.png")
    no-repeat left center;
  background-size: 0.22rem 0.22rem;
}

.item div:nth-child(2) span:first-child {
  padding-left: 0.33rem;
  background: url("http://img.meiduduo.com/images/productDetails/fen.png")
    no-repeat left center;
  background-size: 0.27rem 0.27rem;
}

.addr-box {
  padding: 0.26rem;
  /* margin-top: 15px; */
}

.address {
  display: flex;
  display: -webkit-flex;
}

.addr-img {
  width: 0.92rem;
  height: 0.92rem;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
}

.addr-img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.addr-p {
  padding-left: 0.16rem;
  font-size: 0.24rem;
}

.addr-p p {
  font-size: 0.24rem;
  color: #666;
  margin-bottom: 0.05rem;
}

.addr-p p:first-child {
  font-size: 0.24rem;
}

.addr-p p:not(:first-child) {
  color: #999999;
}

.contact {
  width: 5.5rem;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  padding: 0.2rem 0;
}

.contact div {
  width: 1.8rem;
  height: 0.54rem;
  border: 1px solid #ff4691;
  border-radius: 0.27rem;
  color: #ff4691;
  line-height: 0.54rem;
  padding-left: 1.1rem;
  margin-right: 0.1rem;
}

.contact div:first-child {
  background: url("http://img.meiduduo.com/images/productDetails/phone.png")
    no-repeat 0.4rem center;
  background-size: 0.31rem 0.31rem;
}

.contact div:last-child {
  position: relative;
  background: url("http://img.meiduduo.com/images/productDetails/message.png")
    no-repeat 0.4rem center;
  background-size: 0.31rem 0.25rem;
}

.contact div:last-child button {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}

.addr-box .doctor {
  line-height: 0.4rem;
  font-size: 0.24rem;
  width: 100%;
  overflow: hidden;
  /*文本不换行*/
  white-space: nowrap;
  /*文字超出用省略号*/
  text-overflow: ellipsis;
  margin-top: 15px;
}

.addr-box .doctor span {
  color: #666;
  margin-right: 0.1rem;
}

.order {
  padding: 0.1rem 0.32rem;
  font-size: 0.24rem;
  color: #999999;
  background: #ffffff;
}

.order .link {
  color: #333;
  font-weight: bolder;
  line-height: 0.6rem;
  border-bottom: 1px solid #eee;
}

.order-title {
  padding-top: 0.2rem;
  color: #333;
  line-height: 0.4rem;
}

.order p span {
  color: #ff4691;
  margin-right: 0.2rem;
}

.order-tab {
  width: 7.5rem;
  height: 0.7rem;
  background: #f1f1f1;
}

.order-tab ul {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  line-height: 0.7rem;
  font-size: 0.26rem;
  color: #555;
  font-weight: bolder;
  padding: 0 0.57rem;
}

.order-tab ul li {
  padding: 0 0.16rem;
}

.order-tab ul li.active {
  color: #ff4691;
  border-bottom: 2px solid #ff4691;
}

.tab-item {
  padding: 0.2rem;
  background: #ffffff;
}

.tab-item1 {
  background: transparent;
  padding: 0;
}

.tab-item1 > div {
  background: #ffffff;
  padding: 0.2rem;
}

.tab-item1 > .comm_explain {
  background: #ffffff;
  padding: 0.2rem;
  margin-top: 0.2rem;
}

.tab-item1 > .comm_explain1 {
  background: #ffffff;
  padding: 0.2rem 0.5rem;
  margin-top: 0.2rem;
}

.comm_explain > p {
  background: url("http://img.meiduduo.com/images/productDetails/comm_logo.png")
    no-repeat left center;
  padding: 0 0.15rem 0 0.42rem;
  background-size: 0.32rem 0.32rem;
  font-size: 0.28rem;
  color: #555555;
}

.exp_abstract {
  margin-top: 0.2rem;
}

.exp_abstract > p {
  font-size: 0.26rem;
  color: #666666;
}

.exp_abstract > span {
  font-size: 0.24rem;
  display: inline-block;
  line-height: 0.4rem;
  margin-top: 0.1rem;
}

.explain_tit {
  text-align: center;
  font-size: 0.36rem;
  color: #333333;
  font-weight: 600;
  margin-top: 0.3rem;
}

.explain_tit > img {
  width: 0.29rem;
  height: 0.34rem;
  margin-right: 0.16rem;
  margin-top: -0.08rem;
}

.comm_explain1 > ul {
  border: 1px solid #eeeeee;
  margin: 0.4rem 0;
}

.comm_explain1 > ul > li {
  display: flex;
  display: -webkit-flex;
  font-size: 0.24rem;
  color: #666666;
}

.comm_explain1 > ul > li:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.comm_explain1 li > span {
  flex: 0.4;
  -webkit-flex: 0.4;
  text-align: center;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: Center;
}

.comm_explain1 li > div {
  flex: 0.6;
  -webkit-flex: 0.6;
  padding: 0.2rem;
}

.tab-title {
  padding-left: 0.2rem;
  border-left: 3px solid #ff4691;
  font-size: 0.26rem;
  height: 0.26rem;
  line-height: 1;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
}

.title-title {
  font-size: 0.24rem;
  color: #555;
  line-height: 0.6rem;
}

.item-block p {
  color: #999;
  font-size: 0.24rem;
  line-height: 0.36rem;
  margin-bottom: 0.2rem;
}

.item-block-img {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  width: 100%;
  margin-bottom: 0.1rem;
}

.item-block-img img {
  width: 3.43rem;
  height: 3.7rem;
  border-radius: 0.1rem;
}

.item-banner img {
  display: block;
  width: 100%;
  height: 3.75rem;
  margin-bottom: 0.2rem;
}

.tab-item h2 {
  font-size: 0.3rem;
  line-height: 0.6rem;
}

.phone {
  height: 1.6rem;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}

.phone p {
  font-size: 0.3rem;
  color: #999;
  line-height: 0.5rem;
}

.phone p span {
  font-size: 0.36rem;
  color: #ff4691;
}

.phone img {
  width: 0.93rem;
  height: 0.93rem;
  margin-right: 0.3rem;
}

.footer {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: 0;
  font-size: 0.3rem;
  border-top: 1rpx solid @cof5;
}

.footer-left {
  /* width: 70%; */
  justify-content: space-around;
  width: 60%;
  display: flex;
  flex-direction: row;
  display: -webkit-flex;
  background: #ffffff;
}

.footer .co {
  position: relative;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.footer .co p {
  font-size: 11px;
  color: #666;
}

.footer .co button {
  padding: 0;
  font-size: 22rpx;
  color: #666666;
  width: 100%;
  height: 0.9rem;
  border: 0;
  background: transparent;
  border-radius: 0;
  outline: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  /* line-height: 6.5; */
}

.footer-left div img {
  width: 0.36rem;
  height: 0.35rem;
  margin-bottom: 0.05rem;
}

.footer-left {
  padding: 10rpx 0 4rpx;
}

.footer-right {
  width: 50%;
  display: flex;
  display: -webkit-flex;
}

.footer-right div {
  width: 100%;
  font-size: 0.3rem;
  color: #fff;
  line-height: 100rpx;
  text-align: center;
}

.footer-right div:first-child {
  background: #fe86d8;
}

.footer-right div:last-child {
  background: #ff4691;
}

.project-title-box {
  width: 100%;
  margin-bottom: 12rpx;
}

.project-x-title {
  width: 85%;
  & > h5 {
    font-size: 16px;
    min-height: 1rpx;
  }
}

.project-x-fav {
  width: 15%;
  text-align: center;
  color: #999;
}

.flex-r {
  display: flex;
  flex-direction: row;
}

/* 优惠券弹窗*/
.coupon-alert {
  padding: @basePadding;
  box-shadow: 1rpx -1rpx 10rpx #888888;
  // justify-content: center;
  // width: 100%;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 20%;
  right: 0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  z-index: 10;
  font-size: @baseSize;
  color: @baseFirstTitleColor;

  & > .c-box {
    // padding: @basePadding;
    align-items: center;
    width: 100%;
    height: 90%;

    & .coupon-lists {
      width: 100%;

      & > .cp {
        margin-bottom: 15px;
      }
    }
  }

  & .coupon-title {
    font-size: 17px;
    color: #000;
    margin-bottom: 15px;
    font-weight: bold;
  }

  & .coupon-icon {
    padding: 0 15rpx 0 33rpx;
    background: url("http://img.meiduduo.com/images/productDetails/yes.png")
      no-repeat left center;
    background-size: 22rpx 22rpx;
  }

  & > .btn-fix {
    height: 10%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 15;
    display: flex;
    align-items: center;
  }

  & .pd-src {
    height: 80%;
    overflow-y: scroll;
    // height: 60%;
  }
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}

.endorsement {
  justify-content: space-between;
  font-size: 13px;
  color: RGBA(51, 51, 51, 1);
  width: 100%;
  height: 45px;
  align-items: center;
  background: linear-gradient(
    to right,
    RGBA(255, 238, 200, 1),
    RGBA(245, 211, 147, 1)
  );

  & > .endorsement-left {
    margin-left: 25rpx;
    align-items: center;

    & > .f-btn {
      font-size: 10px;
      text-align: center;
      border-radius: 3px;
      color: RGBA(178, 116, 0, 1);
      padding: 2px 5px;
      background: linear-gradient(
        to right,
        RGBA(255, 238, 200, 1),
        RGBA(245, 211, 147, 1)
      );
    }

    & > .share-explain {
      margin-left: 15px;
    }

    & > .share-icon {
      width: 30rpx;
      height: 30rpx;
      border-radius: 100%;
      margin-left: 10px;
    }
  }

  & > .endorsement-right {
    margin-right: 25rpx;
    color: RGBA(178, 116, 0, 1);
    position: relative;
    & > .hide-btn {
      padding: 0;
      font-size: 22rpx;
      color: #666666;
      width: 100%;
      height: 0.9rem;
      border: 0;
      background: transparent;
      border-radius: 0;
      outline: 0;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}

.consultative {
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
  color: RGBA(51, 51, 51, 1);
  height: 225px;
  font-size: 13px;
  color: #999;
  background-color: #fff;
  border-radius: 8px;
  top: 50%;
  margin-top: -225rpx;
  left: 10%;
  position: fixed;
  & > .consultative-title {
    font-size: 17px;
    color: #000;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin: 10px 0;
    padding: 10px 0;
  }
  & > .consultative-content {
    text-align: center;
    margin: 10px 30px;
    min-height: 100px;
    line-height: 20px;
  }
  @h: 29px;
  & > .close-btn {
    width: @h;
    height: @h;
    line-height: @h;
    text-align: center;
    border-radius: 50%;
    background-color: RGBA(224, 224, 224, 1);
    color: RGBA(102, 102, 102, 1);
    top: -29rpx;
    right: -29rpx;
    position: absolute;
  }
}

.sel-server:before {
  content: "";
  display: block;
  width: 5px;
  height: 15px;
  background-color: #73dacf;
  position: absolute;
  left: -1px;
  top: 20rpx;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.propose-pro {
  background-color: #f5f5f5;

  margin-bottom: 10px;
  & > .product-box {
    padding: 0 15px;
    flex-direction: row;
    display: flex;
    // flex-wrap: wrap;
    & > .product-list {
      width: 50%;
    }
    & > .product-list:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    & > .product-list:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  & > .guess-like {
    margin-top: 30px;
    margin-bottom: 21px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > span {
      display: inline-block;
      width: 34px;
      height: 1px;
      background-color: #959595;
    }
    & > p {
      font-size: 14px;
      color: #959595;
      margin: 0 10px;
    }
  }
}
.propose-pro::before {
  display: table;
  content: "";
}
</style>
