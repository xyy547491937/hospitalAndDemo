<template>
  <div class="vo">
    <div class="label-box">
      <div class="no-label flex-r">
        <span class="label-c no-label-item" v-if="addLabel.length==0">未添加标签
          <!-- <span class="close-label flex-r"> &times;</span> -->
        </span>
        <span class="label-c no-label-item" v-for="(item,index) in addLabel" :key="index">
          {{item.label}}
          <span class="close-label flex-r" @click="labelClose(index)">&times;</span>
        </span>
      </div>
      <!-- 标签 -->
      <div class="sel-label-box">
        <p>热门标签</p>
        <div class="co flex">
          <span
            class="label-c sel-label-item"
            v-for="(v,i) in labelValue"
            :key="v"
            :class="{'active':cur==i}"
            @click.stop="selLabel(v,i,$event)"
          >{{v.label}}</span>
        </div>
      </div>
    </div>

    <div class="sub-btn" @click="subBtn">
      <!-- <i-button  bind:click="handleClick" shape="circle" size="small" i-class="colors">确定</i-button> -->
      <div class="PD-sub-btn">确定</div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  // props: ["labelValue"],
  data() {
    return {
      cur: -1,
      labelValue: [],
      addLabel: []
    };
  },
  onShow() {
    this.cur = -1;
    // this.labelValue = [];
    // this.addLabel = [];
    this.getType();
  },
  mounted() {
    // this.labelValue = JSON.parse(this.$root.$mp.query.labelValue);
  },
  methods: {
    ...mapMutations(["getDiaryType"]),
    selLabel(item, i, event) {
      let a = [];
      this.cur = i;

      a.push(item);
      this.addLabel = a;
    },
    labelClose(index) {
      this.addLabel.length = 0;
      this.cur = -1;
    },
    //获取日记类型
    getType() {
      this.$http
        .post("common/dictList", {
          masterCode: "diary_type"
        })
        .then(res => {
          if (res.code == 1) {
            res.data.forEach(v => {
              if (typeof v.isChecked == "undefined") {
                this.$set(v, "isChecked", 0);
              }
            });
            this.labelValue = res.data;
            // 歘过来的值是默认选中的值
            let typeName = this.$root.$mp.query.typeName;
            let arr = typeName.split(",");
            this.labelValue.forEach((element, i) => {
              arr.forEach(val => {
                if (element.label == val) {
                  this.cur = i;
                }
              });
            });

            if (typeName == "") {
              this.addLabel = [];
            } else {
              let addArr = [];
              this.labelValue.forEach((v, i) => {
                if (i == this.cur) {
                  addArr.push(v);
                }
              });
              this.addLabel = addArr;
            }
          }
        });
    },
    subBtn() {
      let that = this;
      // that.$store.commit("getDiaryType", this.addLabel);
      // mapMutations 不需要commit
      this.getDiaryType(this.addLabel);

      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../css/style.less");
.colors {
  background-color: @baseColor!important;
  color: #fff !important;
}
.label-c {
  padding: 2px 10px;
  border: 1px solid #999;
  color: @baseTextColor-c;
  border-radius: 16px;
}
.label-box {
  font-size: @baseSize;
  background-color: @base-white;
  padding: 0 @basePadding;
  background-color: @base-white;
  & > .no-label {
    border-bottom: 1px solid @baseBackground-c;
    padding: 15px 0;
    flex-wrap: wrap;
    & > .no-label-item {
      margin: 0 0 5px 5px;
      position: relative;
      & > .close-label {
        justify-content: center;
        align-items: center;
        padding: 3rpx 6rpx;
        background: @baseColor;
        position: absolute;
        top: -6px;
        right: -8px;
        font-size: 9px;
        text-align: center;
        color: @base-white;
        border-radius: 50%;
      }
    }
  }
  & > .sel-label-box {
    & > p {
      color: @baseColor;
      padding: 5px 0;
      font-weight: bold;
    }
    & .co {
      padding: 15px 0;
      flex-wrap: wrap;
      & > .sel-label-item {
        background: rgba(241, 241, 241, 1);
        color: @baseFirstTitleColor;
        padding: 2px 10px;
        margin-bottom: 5px;
      }
      & > .sel-label-item:not(:first-child) {
        margin-left: 5px;
      }
    }
  }
}
.active {
  background-color: @baseColor!important;
  color: @base-white !important;
  border: 1px solid transparent;
}
.sub-btn {
  margin-top: 20px;
  position: fixed;
  bottom: 20px;
  margin: a auto;
  width: 100%;
}
</style>
