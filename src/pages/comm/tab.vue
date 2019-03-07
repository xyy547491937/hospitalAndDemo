<template>
  <div class="tabBox">
    <div class="list-nav">
      <ul>
        <li
          v-for="(item, index) in titledata"
          :key="index"
          @click="changeActive(index)"
          :class="{active:index == activeNum}"
        >
          <!-- <i-badge :count="item.badgeNum"> -->
          <div class="demo-badge">{{item.title}}</div>
          <!-- </i-badge> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titledata", "width", "activeIndex"],
  data() {
    return {
      activeNum: "0"
    };
  },
  watch: {
    titledata(value) {
      console.log(this.titledata, value, "tab内容");
    }
  },
  onShow() {
    console.log("tab onShow");
    // this.activeNum = "0"; // ! ...
    // console.log(this.titledata,value, 'tab内容')
    if (this.$route.query.isDiscuess) {
      this.activeNum = this.$route.query.index;
    }
  },
  onLoad() {
    console.log("tab onLoad");
    if (this.$route.query && this.$route.query.page == "myOrder") {
      this.activeNum = this.$route.query.index;
    }
  },
  mounted() {
    console.log("tab mounted");
    if (this.$route.query && this.$route.query.page == "myOrder") {
      this.activeNum = this.$route.query.index;
    }
  },
  methods: {
    changeActive(index) {
      this.activeNum = index;
      this.$emit("clickactive", this.titledata[index]);
    }
  }
};
</script>

<style scoped>
.tabBox {
  background-color: #f1f1f1;
  overflow: hidden;
  width: 100%;
}
.list-nav {
  background: #fff;
  height: 0.87rem;
  line-height: 0.87rem;
  font-size: 0.28rem;
  width: 100%;
  border-top: solid #eeeeee 1px;
  position: fixed;
  top: 0;
  z-index: 5;
}
.list-nav ul {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  padding: 0 0.3rem;
}
.list-nav ul li {
  /* padding: 0 0.3rem; */
  position: relative;
}
.list-nav ul li.active {
  color: #ff4691;
  border-bottom: 2px solid #ff4691;
}
</style>
