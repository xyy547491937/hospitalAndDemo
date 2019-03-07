<template>
  <div class="vo">
    <div class="c" @click="changeJump('/pagesShop/productDetails',{id:orderList[0].commodityId})">
      <newDiaryBookList :isShowIcon="isShowIcon" :isShowSel="isShowSel" :orderList="orderList"/>
    </div>

    <div class="list-item">
      <listInput :leftInner="'填写日记本名称'" :isIcon="0">
        <input type="text" placeholder-style="color:#999" placeholder="请输入日记本名称" v-model="title">
      </listInput>

      <div class="c" @click="godiaryType">
        <listInput :leftInner="'选择日记类别'" :isIcon="1" :isInput="1" :inputValue="typeName">
          <!-- <span>{{typeName}}</span> -->
        </listInput>
      </div>

      <div class="c" @click="godiaryTag">
        <listInput :leftInner="'添加标签'" :isIcon="1" :isInput="1" :inputValue="splitName">
          <!-- <span> 面部</span> -->
        </listInput>
      </div>
      <listInput
        :leftInner="'你的昵称'"
        :isIcon="0"
        :message="12345"
        :isInput="1"
        :inputValue="nickName"
      >
        <!-- <span > {{nickName}}</span> -->
      </listInput>
    </div>
    <!--  editor -inner -->
    <!-- <div class="editor-diary-inner">

      <div class="section-inner">
        <p> 填写日记内容</p>
        <textarea bindblur="bindTextAreaBlur" placeholder="请在此处写下您的整形体会、手术效果等，您的经验将为其他小伙伴提供很大的帮助哦" placeholder-style=" color:#999; font-size:14px" />
        </div>
    </div>-->
    <!-- 术前照片 -->
    <div class="editor-diary-inner">
      <div class="section-inner">
        <p>
          上传美前照片
          <span class="tip1" v-if="imgList.length">(长按图片删除)</span>
          <span class="label">最多9张</span>
        </p>
        <ul class="picture flex-r">
          <li
            class="flex-r"
            @click="preView(item)"
            @longpress="deleImg(item,index)"
            v-for="(item,index) in imgList"
            :key="index"
          >
            <img class="img" :src="item" alt>
          </li>
          <li class="flex-r" v-if="imgListUrls.length<9" @click.stop="uploadImg">+</li>
        </ul>
      </div>
    </div>

    <div class="sub-btn" @click="saveEditorDiary">
      <div class="PD-sub-btn">发表</div>

      <!-- <i-button  bind:click="handleClick" shape="circle"  i-class="colors i-btn" size="small" @click="saveEditorDiary">确定</i-button> -->
    </div>
    <!-- 测试新模块区域 -->
    <!-- <div class="c" style="margin:0 auto;">
      <couponList />
    </div>-->
  </div>
</template>
<script>
import newDiaryBookList from "./comm/newDiaryBookList";
import listInput from "./comm/listInput";
// import couponList from "./comm/couponList";
export default {
  data() {
    return {
      isShowIcon: true,
      isShowSel: false,
      labelValue: [],
      labelTag: [],
      orderList: [],
      title: "",
      imgList: [],
      imgListUrls: [],
      tagName: []
    };
  },
  components: {
    newDiaryBookList,
    listInput
    // couponList
  },

  onLoad() {
    this.$store.commit("getDiaryType", []);
    this.$store.commit("getDiaryTag", []);
    this.imgListUrls = [];
    this.imgList = [];
  },
  onShow() {
    // this.imgListUrls = [];
  },
  created() {},
  computed: {
    nickName() {
      return this.$store.state.userInfo.nickName;
    },
    typeName() {
      let n = [];
      this.$store.state.diaryType.forEach(v => {
        n.push(v.label);
      });
      return n.join();
    },
    splitName() {
      let n = [];
      if (this.$store.state.diaryTag.length > 0) {
        this.$store.state.diaryTag.forEach(v => {
          console.log(v);
          n.push(v.label);
        });
      }
      return n.join();
    },
    splitId() {
      let n = [];
      if (this.$store.state.diaryTag.length > 0) {
        this.$store.state.diaryTag.forEach(v => {
          // console.log(v);
          n.push(v.detailCode);
        });
      }
      return n.join();
    }
  },
  mounted() {
    console.log(this.$root.$mp.query);
    // this.getDiaryType();
    // this.getDiaryTag();
    this.getOrderDetail();
    // this.chooiseType();
  },

  methods: {
    //根据订单id 获取订单详情

    getOrderDetail() {
      this.orderList = [];
      this.$http
        .post("order/queryOneByPk", {
          id: this.$root.$mp.query.id
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            res.data.commImg = res.data.commImg.split(",")[0];
            this.orderList.push(res.data);
            // console.log(this.orderList);
          }
        });
    },

    //go日记类型
    godiaryType() {
      this.changeJump("/pagesShow/labelType", {
        type: 1,
        // labelValue: JSON.stringify(this.labelValue)
        typeName: this.typeName
      });
    },
    godiaryTag() {
      this.changeJump("/pagesShow/labelDiary", {
        type: 1,
        // labelTag: JSON.stringify(this.labelTag),
        splitName: this.splitName
      });
    },

    //上图图片
    uploadImg() {
      let that = this;
      if (this.imgList.length >= 9) {
        wx.showToast({
          title: "最多传9张，不能再多了",
          icon: "none",
          mask: true
        });
        return;
      }
      let n = 9 - that.imgList.length;
      if (n == 0) return;
      wx.chooseImage({
        count: n,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // console.log(res);
          let arr = res.tempFilePaths;
          for (let i = 0; i < arr.length; i++) {
            // arr.forEach(item => {

            if (that.imgList.length >= 9) {
              wx.showToast({
                title: "最多传9张，不能再多了",
                icon: "none",
                mask: true
              });
              return;
            }
            (function(i) {
              let item = arr[i];
              wx.uploadFile({
                url: that.$store.state.httpUrl + "/shop4/uploadImgs/upload",
                filePath: item,
                name: "file",
                formData: {
                  user: "test"
                },
                success(res) {
                  // console.log(res);
                  let data = res.data;
                  data = JSON.parse(data);
                  that.imgList.push(item);
                  that.imgListUrls.push(data.data);
                }
              });
            })(i);
          }
        }
      });
    },
    preView(item) {
      let that = this;
      wx.previewImage({
        urls: that.imgList,
        current: item
      });
    },
    deleImg(item, index) {
      let that = this;
      wx.showModal({
        title: "确定删除图片?",
        success(res) {
          if (res.confirm) {
            that.imgList.splice(index, 1);
            that.imgListUrls.splice(index, 1);
          }
        }
      });
    },

    // 保存日记
    saveEditorDiary() {
      if (this.title.length < 10) {
        wx.showToast({
          title: "日记本名称最少10个字",
          icon: "none",
          mask: true
        });
        return;
      }
      if (
        this.$store.state.diaryTag.length <= 0 ||
        (this.splitId == "" || undefined) ||
        (this.title == "" || undefined)
      ) {
        wx.showToast({
          title: "你有未填项",
          icon: "none"
        });
      } else {
        if (this.imgListUrls.length <= 0) {
          wx.showToast({
            title: "请上传图片",
            icon: "none"
          });
        } else {
          let params = {
            areaIds: JSON.stringify([Number(this.$root.$mp.query.areaId)]),
            organId: this.orderList[0].organId,
            servicePersonalId: this.orderList[0].servicePersonalId
              ? this.orderList[0].servicePersonalId
              : "",
            diaryType: this.$store.state.diaryType[0].detailCode,
            tag: this.splitId,
            createType: "1",
            custId: this.$store.state.userInfo.custId,
            commId: this.orderList[0].commodityId,
            title: this.title,
            orderId: this.$root.$mp.query.id,
            author: this.$store.state.userInfo.custId,
            prePhoto: this.imgListUrls.join()
          };
          this.$http.post("diaryBook/save", params).then(res => {
            // console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: "保存成功",
                icon: "none"
              });
              // this.$store.commit("getDiaryType", []);
              // this.$store.commit("getDiaryTag", []);
              // this.$router.push({
              //   path: "/pages/show",
              //   isTab: true
              // });
              this.$router.go(-1);
              this.$store.commit("diaryState", { state: 1 });
            } else {
              wx.showToast({
                title: res.msg,
                image: "http://img.meiduduo.com/images/shop/cancel.png"
              });
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="less">
@import url("../css/style.less");

.list-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.colors {
  background-color: @baseColor !important;
  color: #fff !important;
}

.editor-diary-inner {
  margin-bottom: 10px;
  font-size: @baseSize;
  background-color: @base-white;

  & > .section-inner {
    & > p {
      color: @baseFirstTitleColor;
      font-weight: bold;
      padding: 0 0 15px 0;

      & > .label {
        color: @baseTextColor-c;
        margin-left: 10px;
        font-weight: normal;
      }
      & > .tip1 {
        font-size: 10px;
        color: @baseColor;
        font-weight: normal;
      }
    }

    & > textarea {
      width: 100%;
    }

    & .picture {
      flex-wrap: wrap;
      // justify-content: center;
      & > li {
        text-align: center;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        border-radius: 6px;
        & > img {
          width: 100%;
          height: 100%;
          display: block;
        }
        margin: 0 5px 5px 0;
        width: 1.32rem;
        height: 1.32rem;
        background: rgba(245, 245, 245, 1);
        border: 1px dashed rgba(204, 204, 204, 1);
        font-size: 40px;
        color: #ccc;
      }
    }

    padding: @basePadding;
  }
}

.sub-btn {
  margin-top: 20px;
  // position: fixed;
  // bottom: 20px;
  margin: a auto;
  width: 100%;
  margin-bottom: 20px;
}
</style>
