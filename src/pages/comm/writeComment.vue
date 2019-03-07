<template>
  <div class="commentbor">
    <div class="footer" v-if="writeItem&&writeItem.write1 &&!focus" @click="sendStatusMth">
      <img src="http://img.meiduduo.com/images/info/footer_comment.png" alt>评论
    </div>
    <div @click="sendStatusMth" class="write-comment" v-if="writeItem&&writeItem.write2 &&!focus">
      <input :disabled="true" name="input" placeholder="写评论..." @focus.native="sendStatusMth">
    </div>
    <div v-if="focus" class="writeComment1" :style="{bottom:rHeight+'rpx'}">
      <input
        name="input1"
        adjust-position="true"
        :placeholder="placeholder"
        v-model="content"
        @blur="blurmth"
        focus="true"
        @focus="focusMth"
        @confirm="commentSave"
      >
      <span class="send" @click="commentSave">发布</span>
    </div>
  </div>
</template>
<script>
const dataArr = [];
export default {
  data() {
    return {
      status: false,
      add: false,
      content: "",
      rHeight: "",
      focus: false,
      placeholder: ""
    };
  },
  props: ["writeItem"],
  onLoad() {
    this.status = false;
    this.add = false;
    console.log(this.writeItem);
  },
  watch: {
    "writeItem.sendStatus": {
      handler(val) {
        console.log(val, 6);
        this.$set(this, "status", val);
        this.status = val;
      }
    },
    "writeItem.focus": {
      handler(val) {
        console.log(val, 6);
        this.$set(this, "focus", val);
      }
    },
    "writeItem.place": {
      handler(val) {
        this.$set(this, "placeholder", val);
      }
    }
  },
  methods: {
    focusMth(event) {
      console.log(event);
      this.content = "";
      var { value, height } = event.mp.detail;
      this.rHeight = 3.75;
      this.$set(this, "focus", true);
    },
    blurmth() {
      // this.add = false
      // this.status = false
      // this.content = ''
      this.rHeight = 0;
      setTimeout(() => {
        this.$emit("blurChange");
        this.focus = false;
        this.add = true;
        // this.content = ''
      }, 200);
    },
    sendStatusMth() {
      console.log(456);
      this.add = true;
      this.status = false;
      this.focus = true;
      this.rHeight = 0;
      this.content = ''
    },
    // 保存评论
    commentSave() {
      console.log(this.writeItem.custId, "asd");
      if (!this.writeItem.custId) {
        console.log(this.writeItem.custId, "as");
        this.$emit("sendStatusM", this.status);
        return false;
      }
      console.log(
        this.content,
        this.content1 != "",
        this.content.length > 0,
        666
      );
      var ctn = this.content.replace(/(^\s*)|(\s*$)/g, "");
      if (ctn != "" && ctn.length > 0) {
        var commentType = "",
          commentId = 0,
          criticId = "";
          console.log(this.add,this.writeItem.sendStatus)
        if (this.add) {
          commentType = this.writeItem.commentType;
          commentId = 0;
          criticId = "";
        }
        if (this.status) {
          commentType = 11;
          commentId = this.writeItem.commentId;
          criticId = this.writeItem.criticId;
        }
        var option = {
          id: "", // id，新增时为空，修改时必输
          contentId: this.writeItem.contentId,
          custId: this.writeItem.custId,
          criticId: this.writeItem.criticId,
          content: ctn,
          commentId: commentId,
          commentType: commentType
        };
        this.$http.post("/comment/save", option).then(res => {
          if (res.code == 1) {
            this.content = "";
            wx.showToast({
              title: "提交成功",
              icon: "success",
              duration: 2000
            });
            setTimeout(() => {
              this.add = false;
              this.status = false;
              // if (!this.focus) {
              this.$emit("send");
              // }
              // this.$emit('send')
              this.$emit("sendStatusM");
            }, 2000);
          }
        });
      } else {
        wx.showToast({
          title: "请输入内容",
          icon: "none",
          duration: 2000
        });
      }
    }
  }
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  background: #f1f1f1;
  font-size: 28rpx;
  color: #555;
  z-index: 101;
}
.footer img {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  margin-right: 0.1rem;
}
.commentbor {
  width: 100%;
  height: 90rpx;
  overflow: hidden;
  border-top: 1rpx solid #f3f3f3;
  border-bottom: 1rpx solid #fff;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;
  z-index: 100;
}
.write-comment {
  width: 7.02rem;
  box-sizing: border-box;
  height: 60rpx;
  margin: 14rpx auto;
  border-radius: 200rpx;
  padding-left: 0.8rem;
  font-size: 0.24rem;
  color: #333;
  background: #f1f1f1 url("http://img.meiduduo.com/images/info/input_bg.png")
    no-repeat 0.3rem center;
  background-size: 0.28rem 0.2rem;
}
.write-comment input {
  box-sizing: border-box;
  display: inline-block;
  width: 96%;
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  padding-right: 80rpx;
  border-radius: 14rpx;
  background: #f1f1f1 url("http://img.meiduduo.com/images/face.png") no-repeat
    5.6rem center;
  background-size: 0.36rem;
}
</style>
