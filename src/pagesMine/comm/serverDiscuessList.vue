<template>
  <div class="c">
    <!-- 引入组件 -->
    <!-- <tab :titledata="nav"></tab> -->
    <div class="pin" v-for="(item,i) in rateArr " :key="i">
      <div class="flex-c">
        <!-- businessType 1 医美，2审美 -->
        <p class="discuess-time flex-r">
          <span
            class="c"
            v-if="item.businessType==1"
          >{{item.receptionistStart }} 至 {{item.leavedTime }}</span>
          <span class="c" v-else>{{item.createDate}}</span>
          <span class="state-btn" v-if="item.state=='E'">已评价</span>
          <span
            class="state-btn no-state-btn"
            v-if="item.evaluationState==0"
            @click="editorDiscuess(item)"
          >发表评价</span>
        </p>
      </div>
      <!-- 医院信息title -->
      <div class="hospital-title flex-r">
        <div class="flex-r hos-cv">
          <img :src="item.logo" alt>
          <div class="flex-c" style="margin-left:10px;">
            <span class="hospital-title-oargan">{{item.organName }}</span>
            <span class="hospital-title-text">{{item.projectName }}</span>
          </div>
        </div>
        <!--  -->
        <div class="hos-cv" @click="item.isShow=!item.isShow">
          <i-icon type="unfold" v-if="item.isShow" size="20"/>
          <i-icon type="packup" v-else size="20"/>
        </div>
      </div>
      <!-- server-list -->
      <!-- 接待服务 -->
      <div class="rate-box" v-if="item.isShow">
        <p class="flex-r server-list" v-for="v in item.children" :key="v">
          <span class="server-icon icon-reception"></span>
          <span class="server-text">{{v.postName}}</span>
          <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate
                  :value="v.starNum "
                  :count="count"
                  v-on:change="change3($event,v)"
                  size="18"
                  :disabled="item.evaluationState==1?true:false"
                ></i-rate>
              </i-cell>
            </i-cell-group>
          </span>
          
          <span class="server-text" style="text-align:right;">{{v.discuessText}}</span>
        </p>
      </div>
      <!-- !TODO 评价内容没有 -->
      <!-- 写评论 -->
      <div class="editor-text" v-if="item.isShow">
        <textarea
          placeholder="这次服务让您感觉满意吗？快来说说吧"
          placeholder-style="color:#AAABB3;"
          style="width:100% "
          auto-focus
          maxlength="100"
          :disabled="item.evaluationState==1"
          v-model.lazy="item.content"
        />
      </div>
    </div>
  </div>
</template>
<script>
import tab from "@/pages/comm/tab";
export default {
  props: ["rateArr", "isDisabled"],
  data() {
    return {
      count: 5,
      startIndex: 1,
      discuessText: "",
      q: "",
      w: "",
      e: "",
      isShow: false
    };
  },
  components: {
    tab
  },
  computed: {
    httpUrl() {
      return this.$store.state.httpUrl;
    }
  },

  methods: {
    change3(e, item) {
      const index = e.mp.detail.index;
      item.starNum = index;

      //   console.log(item, index);
      this.iswei(index, item);
    },
    iswei(index, item) {
      let discuessText = "";
      index = Number(index);
      switch (index) {
        case 1:
          item.discuessText = "差";
          break;
        case 2:
          item.discuessText = "一般";
          break;
        case 3:
          item.discuessText = "一般";
          break;
        case 4:
          item.discuessText = "好";
          break;
        case 5:
          item.discuessText = "很好";
          break;
        default:
          item.discuessText = "很差";
      }
    },
    editorDiscuess(item) {
      let newArr = item.children.filter(v => {
        return v.starNum == null || v.starNum == 0;
      });

      if (newArr.length > 0) {
        wx.showToast({
          title: "请评论订单",
          icon: "none"
        });
      } else {
        let arr = [];
        item.children.forEach(v => {
          let j = {
            id: v.id,
            starNum: v.starNum,
            staffId: v.staffId
          };
          arr.push(j);
        });

        this.$http
          .post(this.httpUrl + "/basics/basicServiceEvaluation/save", {
            id: item.id,
            children: JSON.stringify(arr),
            content: item.content
          })
          .then(res => {
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "评论成功",
                icon: "none"
              });
              setTimeout(() => {
                this.$emit("isRefrensh", true);
              }, 2000);
            }
          });
      }
    }
  }
};
</script>
<style scoped>
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
  margin-top: 15px;
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
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
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
.hos-cv {
  align-items: flex-start;
  /* height: 100%; */
}
.server-list {
  /* width: 100%; */
  align-items: center;
  justify-content: flex-start;
  font-size: 0.28rem;
  padding: 10px 0;
}
.server-icon {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 0.3rem;
  height: 0.3rem;
}
.rate-box {
  border-top: 1rpx solid #ddd;
  border-bottom: 1rpx solid #ddd;
  padding: 15px 0;
  /* margin-top: 15px; */
  width: 100%;
}
.server-text {
  display: block;
  width: 20%;
  text-align: center;
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
  min-height: 3rem;
  padding: 10px 0;
}
</style>
