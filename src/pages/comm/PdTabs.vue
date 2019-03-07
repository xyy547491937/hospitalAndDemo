<template>
  <div>
    <div class="activeNav-container tab-box">
      <div class="ls_tab2">
        <div v-for="(v,i) in tabArr" :key="i" @click="tapMove(v,i)" :style="{color:defaultColor}">
          <span :class="cur == i ? 'border active' : 'border'" :style="defaultColor=='#333'&&cur == i?'color:#ff4691;border-color:#ff4691;':''">{{v.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabArr: {
      type: Array,
      default: this.tabArr
    },
    bgColor: {
      type: String,
      default: "#fbfbfb"
    },
    cur: {
      type: Number,
      default: 0
    },
    tabColor: {
      type: String,
      default: "#fff"
    },
    defaultColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      tabArr: []
    };
  },
  methods: {
    tapMove(item, i) {
      this.cur = i;
      //   this.vm.$emit("tabItem", item);
      this.vm.$emit("tabItem", { item, i });
      this.$emit("tabItem", { item, i });
    }
  }
};
</script>

<style scoped>
.activeNav-container {
  height: 90rpx;
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  position: relative;
}
.ls_tab2 {
  display: -webkit-box;
  overflow-x: scroll;
  height: 90rpx;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}
.ls_tab2::-webkit-scrollbar {
  display: none;
}
.ls_tab2 div {
  padding: 0 0.26rem;
  font-size: 34rpx;
  color: #fff;
  font-family: "PingFangSC-Regular";
  font-weight: 500;
}
.ls_tab2 div span {
  display: inline-block;
  line-height: 90rpx;
  height: 90rpx;
  box-sizing: border-box;
}
.ls_tab2 span.active {
  color: #fff;
  border-bottom: 4rpx solid #fff;
}
.ls_tab2 div.active span {
  color: #fff;
}
</style>
