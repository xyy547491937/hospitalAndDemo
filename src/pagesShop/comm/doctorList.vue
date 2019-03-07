<template>
  <div class="doc-list-p">
    <!-- 机构详情下的医生列表 -->
    <!-- editor xyy -->
    <div
      class="doctor-list flex-c content-item"
      @click="changeJump('/pagesShop/doctor_detail',{id:v.id})"
    >
      <div class="flex-r d-case border">
        <div class="doctor-img">
          <img :src="v.icon" :alt="v.personalName">
        </div>
        <div class="flex-r clo">
          <div class="flex-c">
            <P class="doctor-name">
              <span>{{v.personalName}}</span>
              <span class="co">{{v.technicalName}}</span>
              <span class="co">从业{{v.workingSeniority}}</span>
            </P>
            <p>{{v.organName}}</p>
            <p>距离 {{v.distance?v.distance+'km':'目标太远'}}</p>

            <!--  -->
          </div>
          <div class="case">{{v.caseNum}}个案例</div>
        </div>

        <!--  -->
      </div>
      <div class="c">
        <p class="flex-r" v-for="d in v.commodityList" :key="d" v-if="v.commodityList.length>0">
          <span style="color:#ff4691" class="price">￥{{d.rulePrice}}</span>
          <span class="server-list">
            [{{d.commName}}]
            {{d.remark}}
          </span>
          <span class="appointment">{{d.buyNum}}人预约</span>
        </p>
        <!-- <p class="flex-r"> <span style="color:#ff4691" class="price"> ￥30</span> <span class="server-list"> [注射微整]
        多点定位 注射微整...</span> <span class="appointment"> 116人预约</span></p>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["doctorers"],
  data() {
    return { v: {} };
  },
  created() {
    this.v = this.doctorers;
  },
  mounted() {
    console.log(this.v);
  }
};
</script>
<style scoped>
.flex-r {
  display: flex;
  flex-direction: row;
}

.flex-c {
  display: flex;
  flex-direction: column;
}
.content-item {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.doctor-list {
  font-size: 14px;
  color: #666;
  line-height: 25px;
  margin-bottom: 0.2rem;
}

.doc-list-p {
  margin-bottom: 0.2rem;
  padding: 0 10px;
}

.doctor-img {
  width: 25%;
}

.border {
  border-bottom: 1rpx solid #e8e8e8;
}
.d-case {
  width: 100%;
}
.doctor-img img {
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
  display: block;
}

.doctor-name span:first-child {
  color: #333;
  font-size: 15px;
  font-weight: bold;
}

.co {
  margin-left: 10px;
}

.clo {
  justify-content: space-between;
  width: 75%;
}

.case {
  width: 25%;
  text-align: right;
  color: #ff4691;
  /* font-size: 16px; */
  font-weight: bold;
}

.server-list {
  display: inline-block;
  width: 50%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}

.appointment {
  display: inline-block;
  width: 25%;
  text-align: right;
}

.price {
  color: #ff4691;
  font-weight: bold;
  display: block;
  width: 25%;
  text-align: left;
}
</style>
