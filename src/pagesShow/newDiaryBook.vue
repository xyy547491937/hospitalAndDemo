<template>
  <div class="vo">
    <div class="c" v-if="orderList.length>0">
      <div class="sel-project" @click="c">
        <span>请选择一个做过的项目，来创建日记本</span>
      </div>
      <div class="c" style="padding-bottom:118rpx;">
        <newDiaryBookList
          :isShowIcon="isShowIcon"
          :isShowSel="isShowSel"
          :orderList="orderList"
          @orderId="getOrderId"
        ></newDiaryBookList>
      </div>
      <!-- <tab></tab> -->
      <div class="sub-btn flex-r" @click="goEditorDiary">
        <div class="PD-sub-btn">确定</div>
        <!-- <i-button bind:click="handleClick" shape="circle" size="small" i-class="colors" @click="goEditorDiary">确定</i-button> -->
        <!-- <button class="go-btn" @click="goEditorDiary"> 确定</button> -->
      </div>
    </div>
    <div id="nolist" v-if="orderList.length <1">
      <div
        class="noData-mode"
        :style="loaded?'background: #fff url(http://img.meiduduo.com/images/nodata.png?11) no-repeat center center;background-size: 220rpx 270rpx;':''"
      ></div>
    </div>
  </div>
</template>
<script>
import newDiaryBookList from "./comm/newDiaryBookList";
// import tab from "@/pages/comm/tab";
export default {
  data() {
    return {
      loaded: false,
      isShowIcon: false,
      isShowSel: true,
      orderList: [],
      orderId: "",
      areaId: -1
    };
  },
  onShow() {
    this.loaded = false;
    this.orderList = [];
    this.getOrderList();
  },
  components: {
    newDiaryBookList
    // tab
  },
  mounted() {
    // this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.$http
        .post("order/listByCustIdForDiaryBook", {
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.loaded = true;
            if (res.data.length > 0) {
              res.data.forEach(v => {
                this.$set(v, "isChecked", 0);
                v.commImg = v.commImg.split(",")[0];
              });
              this.orderList = res.data;
              this.orderId = this.orderList[0].id;
              this.areaId = this.orderList[0].areaId;
            }
          }
        });
    },
    getOrderId(msg) {
      this.orderId = msg.id;
      this.areaId = msg.areaId;
      console.log(this.orderId);
    },
    c() {
      // this.$router.push({
      //   path: "/pages/show",
      //   // isTab: true,
      //   query: { id: "xuuxuuxuxuxuux" }
      // });
    },
    goEditorDiary() {
      // this.changeJump("/pagesShow/editorDiary", {
      //   id: this.orderId
      // });
      this.$router.replace({
        path: "/pagesShow/editorDiary",
        query: {
          id: this.orderId,
          areaId: this.areaId
        }
      });
    }
    // changeData(name) {
    //   console.log("ssssssssssssssssssssssssssssssssssssssss");
    //   console.log(name);
    //   this.typeName = name;
    //   var pages = getCurrentPages(); // 获取页面栈
    //   var currPage = pages[pages.length - 1]; // 当前页面
    //   console.log(currPage.typeName);
    // }
  }
};
</script>
<style scoped lang="less">
// @import url("../css/style.less");
.vo {
  height: 100%;
}
.colors {
  background-color: @baseColor !important;
  color: #fff !important;
}
.go-btn {
  width: 50%;
  border-radius: 16px;
}
.sel-project {
  padding: 0 @basePadding;
  color: @baseTextColor;
  font-size: @baseSize;
  background-color: @base-white;

  & > span {
    display: block;
    width: 100%;
    border-bottom: 1px solid @baseBackground-c;
    padding: @basePadding 0;
  }
}

.sub-btn {
  align-items: center;
  position: fixed;
  bottom: 0;
  margin: a auto;
  width: 100%;
  z-index: 5;
  height: 100rpx;
  background-color: #fff;
}
</style>
