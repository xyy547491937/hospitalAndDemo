<template>
  <div class="c">
    <div class="quest-list"  v-for="(item, index) of data" :key="index"  @click="jump(item)">
      <!-- editor xyy 问答的模块 -->
      <!-- 头像以及关注标签 -->
      <div class="quest-message flex-r">
        <div class="flex-r user-message">
          <img :src="item.icon" alt="">
          <div class="flex-c user-name">
            <span>{{item.nickName}}</span>
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
      <p class="inner">{{item.content}}</p>
      <div class="read-num-box flex-r">
        <div class="flex-r read-num">
          <!-- <p>
            <i-icon type="browse" /> <span class="pa">{{item.commentNum}}</span></p> -->
            <p>
            <i-icon type="message" /> <span class="pa">{{item.commentNum}}</span></p>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    }
  },
  data() {
    return {
      item: {}
    };
  },
  methods: {
    jump(item) {
      this.changeJump("/pagesShow/information", { id: item.id, type: 8 });
    }
  }
};
</script>
<style lang="less">
@import url("../../css/style.less");

.quest-list {
  margin-bottom: 10px;
  font-size: @baseSize;
  color: @baseTextColor-c;
  background-color: @base-white;
  padding: @basePadding;

  & > .quest-message {
    justify-content: space-between;
    align-items: center;

    & > .user-message {
      align-items: center;
      width: 50%;

      & > img {
        display: block;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }

      & > .user-name {
        margin-left: 10px;

        & span:first-child {
          color: @baseSconedTitleColor;
        }

        & span:last-child {
          color: @baseTextColor-c;
          font-size: 10px;
        }
      }
    }
  }

  & > .inner {
    line-height: 20px;
    padding: 10px 0;
  }

  & > .read-num-box {
    color: #999;
    font-size: 0.18rem;
    align-content: center;
    justify-content: space-between;

    .read-num {
      justify-content: space-between;

      //   justify-content: space-around;
      & > p {
        width: 126rpx;
        &:extend(.flex-r);
        align-items: center;
        & > .pa {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
