<style>
.input-content {
  font-size: 26rpx;
  font-weight: 400;
  color: black;
}
</style>

<template>
  <div style="box-sizing:border-box;">
    <div class="clear"></div>
    <div class="qu-body" style="padding:10rpx 20rpx 120rpx 20rpx">
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title" style="margin-right: 14rpx;margin-left: 0;">标题</span>
        </div>
        <input
          class="input"
          type="text"
          v-model="title"
          maxlength="50"
          placeholder="请输入标题（必须大于10字并且最多50字）"
        >
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title" style="margin-right: 14rpx;margin-left: 0;">文章内容</span>
        </div>
        <textarea
          class="input input-content"
          maxlength="800"
          name
          id
          v-model="content"
          placeholder="文字内容必须大于10字并且最多不能超过800字噢"
        ></textarea>
      </div>
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title">上传照片</span>
          <span class="tip1" v-if="imgList.length">(长按图片删除)</span>
          <span class="tip">最多可上传2张</span>
        </div>
        <div class="img-box">
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
      <div class="align-box">
        <div class="align">
          <span class="circle"></span>
          <span class="title" style="margin-right: 14rpx;margin-left: 0;">添加标签</span>
        </div>
        <div class="lanmu-box">
          <div class="item-box" v-for="(item,index) in lanmu" :key="index" @click="changeLm(index)">
            <span class="item" :class="{active:lmIndex==index}">{{item.detailName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <button class="tj" @click="crop">裁剪</button> -->
    <button class="tj" @click="save">发表</button>
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
      title: "",
      content: ""
    };
  },
  components: {},
  methods: {
    crop() {
      this.$router.push({
        path: "/pagesShow/global/crop"
      });
    },
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
          console.log(res);
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
      if (this.title.length > 50) {
        wx.showToast({
          title: "标题过长",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.title.length < 10) {
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.content.length < 10) {
        wx.showToast({
          title: "必须大于10个字！",
          icon: "none",
          mask: true
        });
        return false;
      }
      if (
        !this.title |
        !this.content |
        !this.columnId |
        !this.imgListUrls.length
      ) {
        wx.showToast({
          title: "请填写完整",
          icon: "none",
          mask: true
        });
        return;
      }
      this.$http
        .post("/article/save", {
          title: this.title,
          content: this.content,
          cover: this.imgListUrls.join(),
          columnId: this.columnId,
          author: this.$store.state.userInfo.custId,
          areaIds: this.$store.state.curCityId
            ? JSON.stringify([this.$store.state.curCityId])
            : JSON.stringify([1])
        })
        .then(res => {
          console.log(res);
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

