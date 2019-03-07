<template>
  <div style="height:100%;padding-bottom:130rpx;background:#fff;box-sizing:border-box">
    <div class="clear"></div>
    <div class="qu-body">
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title">提问的内容</span>
        </div>
        <textarea
          class="input"
          maxlength="300"
          name
          id
          v-model="content"
          placeholder="请输入提问内容(必须大于10字并且在300字以内)"
        ></textarea>
      </div>
      <div class="align-box">
        <div class="align">
          <!-- <span class="circle"></span> -->
          <span class="title">上传照片</span>
          <span class="tip1" v-if="imgList.length">(长按图片删除)</span>
          <span class="tip">上传2张</span>
        </div>
        <div class="img-box">
          <!-- <div class="imglist">
                 <img src="http://img.meiduduo.com/images/index/ad_01.png" alt="">
          </div>-->
          <img
            class="img"
            @click="preView(item)"
            @longpress="deleImg(item,index)"
            v-for="(item,index) in imgList"
            :key="index"
            :src="item"
            alt
          >
          <div class="photo img" v-if="imgListUrls.length<2" @click="chooseImg"></div>
        </div>
      </div>
      <!-- <div class="align-box">
           <div class="align">
              <span class="circle"></span>
              <span class="title">请选择栏目</span>
           </div>
           <div class="lanmu-box">
              <div class="item-box" v-for="(item,index) in lanmu" :key="index" @click="changeLm(index)">
                 <span class="item" :class="{active:lmIndex==index}">{{item.detailName}}</span>
              </div>

           </div>
      </div>-->
    </div>
    <button class="tj" @click="save">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [],
      imgListUrls: [],
      lanmu: [],
      lmIndex: -1,
      columnId: "",
      content: ""
    };
  },
  components: {},
  methods: {
    getChannelRecord() {
      this.$http
        .post("/common/dictList", {
          masterCode: "column_type"
        })
        .then(res => {
          if (res.code == 1) {
            this.lanmu = res.data;
          }
        });
    },
    chooseImg() {
      let that = this;
      if (this.imgList.length >= 2) {
        wx.showToast({
          title: "最多传2张，不能再多了",
          icon: "none",
          mask: true
        });
        return;
      }
      let n = 2 - this.imgList.length;
      if (n == 0) return;
      wx.chooseImage({
        count: n,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // console.log(res);
          let arr = res.tempFilePaths;
          wx.showLoading({
            title: "加载中",
            icon: "none",
            mask: true
          });
          for (let i = 0; i < arr.length; i++) {
            (function() {
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
                  if (data.code == 1) {
                    that.imgList.push(item);
                    that.imgListUrls.push(data.data);
                    console.log(data.data);
                    if (i == arr.length - 1) {
                      wx.hideLoading();
                    }
                  }
                }
              });
            })(i);
          }
        }
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
    preView(item) {
      let that = this;
      wx.previewImage({
        urls: that.imgList,
        current: item
      });
    },
    changeLm(index) {
      this.lmIndex = index;
      this.columnId = this.lanmu[index].detailCode;
      console.log(this.columnId);
    },
    save() {
      if (this.content.length < 10) {
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return false;
      }
      if (
        // this.imgListUrls.length<2 |
        !this.content
      ) {
        wx.showToast({
          title: "请填写完整",
          icon: "none",
          mask: true
        });
        return;
      }
      this.$http
        .post("/question/saveOrEditOnApp", {
          title: this.title,
          content: this.content,
          imgUrl: this.imgListUrls.join(),
          city: this.$store.state.curCityId
            ? JSON.stringify([this.$store.state.curCityId])
            : JSON.stringify([1]),
          columnId: this.columnId,
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: "发布成功",
              mask: true,
              icon: "none"
            });
            this.title = "";
            this.content = "";
            this.imgList = [];
            this.imgListUrls = [];
            this.lmIndex = -1;
            this.columnId = "";
            this.$router.go(-1);
          }
        });
    },
    init() {
      this.title = "";
      this.content = "";
      this.imgList = [];
      this.imgListUrls = [];
      this.lmIndex = -1;
      this.columnId = "";
    }
  },
  onLoad() {
    this.init();
    this.getChannelRecord();
    this.lmIndex = -1;
  }
};
</script>

