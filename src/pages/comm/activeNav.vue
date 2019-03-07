<style>
.activeNav-container {
  height: 90rpx;
  overflow: hidden;
  /* background: #fbfbfb; */
  display: flex;
  display: -webkit-flex;
  position: relative;
  /* padding-right: 0.66rem; */
}
.ls_tab {
  display: -webkit-box;
  overflow-x: scroll;
  height: 90rpx;
  -webkit-overflow-scrolling: touch;
  /* background: #fbfbfb; */
  width: 100%;
}
.ls_tab::-webkit-scrollbar {
  display: none;
}
.ls_tab div {
  padding: 0 0.26rem;
  font-size: 0.34rem;
  color: #333;
  font-family: "PingFangSC-Regular";
  font-weight: 500;
}
.ls_tab div span {
  display: inline-block;
  border-top: 4rpx solid #fff;
  line-height: 90rpx;
  height: 90rpx;
  border-bottom: 4rpx solid #fff;
  box-sizing: border-box;
}
.ls_tab div.active {
  /* color: #333; */
  color: #ff4691;
}
.ls_tab div span.active {
  color: #ff4691;
  border-bottom: 4rpx solid #ff4691;
}
</style>
<template>
  <div>
    <div class="activeNav-container tab-box">
      <div class="ls_tab">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeIndex(index)"
        >
          <span class="border" :class="{active:activeIndex == index}">{{item.detailName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      tabList: []
    };
  },
  components: {},
  methods: {
    changeIndex(index) {
      this.activeIndex = index;
      this.$emit("changeCode", this.tabList[index].detailCode);
      this.$emit("changeActiveIndex", index);
    },
    getChanList() {
      this.$http
        .post("/common/dictList", {
          masterCode: "channel_type"
        })
        .then(res => {
          //  console.log(res);
          if (res.code == 1) {
            let data = res.data ? res.data : [];
            this.tabList = data;
            this.tabList.unshift({
              detailCode: "001",
              detailName: "推荐"
            });
            this.$store.commit("updateTopNavNum", data.length);
            this.changeIndex(0);
          }
        });
    }
  },
  onLoad() {
    this.getChanList();
  }
};
</script>

