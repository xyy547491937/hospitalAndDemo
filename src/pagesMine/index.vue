<template>
	<div class="mine">
		<div class="banner">
			<div class="person">
				<span>
					<img :src="info.icon? info.icon:''">
				</span>
				<p>{{info.nickName}}</p>
				<div style="width:80%;margin:0 auto;" class='ellipsis'>{{info.provinceName=="中国" || info.provinceName==info.cityName ? '' : info.provinceName}} {{info.cityName}}</div>

			</div>
		</div>
		<div class="infor">
			<tab :titledata="nav" @clickactive="clickactive"></tab>
		</div>
		<div class="content">
			<div class="content-item" v-if="onclick==0">
				<div class="box-title">共{{diaryBookNum}}个日记本，{{total}}篇日记</div>
				<div class="content-diary">
					<div class="content-diary-item" @click="todiary(item.id)" v-for="(item,index) in disayList" :key="index">
						<div class="diary-title">
							<div class="diary-title-icon"><img :src="info.icon" alt=""></div>
							<div class="diary-title-name">
								<p>{{item.authorName}}</p>
								<p class="diary-title-name-data">{{item.createDate}}</p>
							</div>
						</div>
						<div class="diary-page">
							<p>{{item.diaryBookName}}</p>
							<div class="diary-page-mg">
								<ul style="padding:6rpx 0;width:100%">
									<li v-if="item.afterPhoto[0]"><img :src="item.afterPhoto[0]" class="typeDiary-before-img"></li>
									<li  v-if="item.afterPhoto[1]"><img :src="item.afterPhoto[1]" class="typeDiary-before-img"></li>
									<li  v-if="item.afterPhoto[2]"><img :src="item.afterPhoto[2]" class="typeDiary-before-img"></li>
								</ul>
							</div>
              <!--  -->
							<p class="diary-page-p">
                  <wxparse :content="item.content ? removeBr(item.content) : ''" noData="" mode="widthFix" ></wxparse>
							</p>
							<div class="content-diary-footer">
								<p id="">
								{{item.readNum}}人已看过
							</p>
							<p class="diary-footer-r">
							<i-icon type="message" size="16" style="text-align: center;" />
							<span>{{item.commentNum}}</span>
							</p>
							<p class="diary-footer-r" @click.stop="customerRecordSave(item)">
								<i-icon :color="item.isThumbsUp>0?'#ff4691': null" type="praise" size="16" style="text-align: center;" />
							<span>{{item.fabulousNum}}</span>
							</p></div>
						</div>
					</div>
				</div>
			</div>
			<div class="" v-if="onclick==1">
				<div class="content-item">
					<div class="box-title">基本资料</div>
					<div class="box-ul" v-if="status">
            <picker v-model="info.sex" :range="array" class="pick" @change="status ? bindPickerChange($event): null">
              <view class="pick">
                <span>性别</span>
                <span>{{info.sex=='M' ? '男' :'女'}}</span>
                <span><i-icon type="enter" size="20" color="#999999"/></span>
              </view>
            </picker>
            <picker mode="region"  @change="status ? bindRegionChange($event): null" v-model="info.cityName" class="pick">
              <view class="pick">
                <span>地区</span>
                <span class="ellipsis">{{info.provinceName=="中国"||info.provinceName==info.cityName  ? '': info.provinceName}} {{info.cityName}}</span>
                <span><i-icon type="enter" size="20" color="#999999"/></span>
              </view>
            </picker>
            <picker mode="date" :value="info.birthday" fields="month" start="1950-01" end="2080-12" class="pick" @change="status ? bindDateChange($event): null">
              <view class="pick">
                <span>生日</span>
                <span>{{info.birthday}}</span>
                <span><i-icon type="enter" size="20" color="#999999"/></span>
              </view>
            </picker>
					</div>
          <div class="box-ul" v-else>
            <view class="pick">
              <span>性别</span>
              <span>{{info.sex=='M' ? '男' :'女'}}</span>
              <span></span>
            </view>
            <view class="pick">
              <span>地区</span>
              <span class="ellipsis">{{info.provinceName=="中国"||info.provinceName==info.cityName  ? '': info.provinceName}} {{info.cityName}}</span>
              <span></span>
            </view>
            <view class="pick">
              <span>生日</span>
              <span>{{info.birthday}}</span>
              <span></span>
            </view>
          </div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
import tab from "../pages/comm/tab.vue";
import wxparse from "mpvue-wxparse";
import { removeBrTag } from "../utils/util.js";
export default {
  components: {
    tab
  },
  data() {
    return {
      date: '',
      status: '',
      index: '',
      nav: [
        {
          title: "日记",
          badgeNum: 0
        },
        {
          title: "资料",
          badgeNum: 1
        }
      ],
      array: ["男", "女"],
      showStatus: false,
      onclick: 0,
      custId: "",
      userid: "",
      disayList: [],
      diaryBookNum: 0,
      total: 0,
      info: {},
      pageNum: 1,
      nextPage: 0
    };
  },
  computed: {
    region() {
      if (this.$store.state.curCity == "全国") {
        return [];
      } else {
        return [
          this.$store.state.userInfo.province,
          this.$store.state.userInfo.city,
          ""
        ];
      }
    },
    user() {
      return this.$store.state.userInfo;
    }
  },
  onUnload() {
    console.log(this.status)
    if(this.status) {
      var cityId = '', provinceId=''
      if (this.info.cityName) {
        this.$http
        .post("/common/getCityId", {
          areaName: this.info.cityName
        })
        .then(res => {
          cityId = res.data
          this.$http
            .post("/common/selectByPrimaryKey", {
              id: cityId
            })
            .then(res1 => {
              provinceId = res1.data.pId
              var option =  {
                id: this.user.custId,
                sex: this.info.sex ? this.info.sex : 'F',
                nickName: this.info.nickName,
                cityName: this.info.cityName,
                city: cityId,
                province: provinceId,

                // provinceName: this.info.provinceName,
                // birthday: this.info.birthday + '-01'
              }
              if (this.info.birthday) {
                option.birthday = this.info.birthday + '-01'
              }
              if (this.info.provinceName) {
                option.provinceName = this.info.provinceName
              }
              this.$http.post("/customer/saveV2", option).then(res => {
                if (res.code == 1) {
                  console.log(res)
                }
              });
            });
        });
      } else {
        var options =  {
          id: this.user.custId,
          sex: this.info.sex ? this.info.sex : 'F',
          nickName: this.info.nickName,
        }
        if (this.info.birthday) {
          options.birthday = this.info.birthday + '-01'
        }
        this.$http.post("/customer/saveV2", options).then(res => {
          if (res.code == 1) {
            console.log(res)
          }
        });
      }
    }
  },
  methods: {
    removeBr(str) {
      return removeBrTag(str)
    },
    customerRecordSave(item) {
      var option = {
        recordId: item.id,
        recordType: 5,
        custId: this.$store.state.userInfo.custId,
        crType: 1,
        state: item.isThumbsUp>0 ? -1 : 1
      };
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      this.$http.post("/customerRecord/save", option).then(res => {
        wx.hideLoading();
        this.getAllDiary(this.pageNum, true);
      });
    },
    bindRegionChange: function(e) {
      console.log(e);
      this.$set(this.info, "provinceName", e.target.value[0]);
      this.$set(this.info, "cityName", e.target.value[1]);
    },
    bindPickerChange: function(e) {
      this.$set(this.info, "sex", e.target.value == 0 ? "M" : "F");
    },
    bindDateChange: function(e) {
      this.$set(this.info, "birthday", e.target.value);
    },
    changeCtn(index) {
      this.index = index;
      this.showStatus = true;
    },
    todiary(id) {
      this.$router.push({
        path: "/pagesShow/diary",
        query: {
          id,
          type: 5
        }
      });
    },
    clickactive(out) {
      this.onclick = out.badgeNum;
    },
    getAllDiary(pageNum, flag) {
      this.$http
        .post("/diary/list4Page", {
          author: this.userid ? this.userid : this.custId,
          custId: this.$store.state.userInfo.custId,
          pageNum,
          pageSize: 15
        })
        .then(res => {
          console.log(res);
          if (res.code == "1") {
            this.total = res.data.total;
            this.nextPage = res.nextPage;
            var a = res.data.data ? res.data.data:[]
            a.forEach(ele => {
              ele.afterPhoto = ele.afterPhoto.split(',')
            });
            console.log(a)
            if (flag) {
              this.disayList = a;
            } else {
              this.disayList.concat(a);
            }
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    getInfo() {
      this.$http
        .post("/customer/queryOneByCondition", {
          id: this.userid,
          userId: this.custId
        })
        .then(res => {
          console.log("用户信息:", res);
          if (res.code == "1") {
            res.data.birthday = res.data.birthday
              ? res.data.birthday.split("-")[0] +
                "-" +
                res.data.birthday.split("-")[1]
              : "";
            this.info = res.data;
            this.diaryBookNum = res.data.diaryBookNum;
            console.log(this.info);
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    getServicedItems(pageNum) {
      this.$http
        .post("/order/list4Page", {
          custId: this.custId ? this.custId : this.userid,
          osId: 7,
          pageNum,
          pageSize: 15
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.servicedItems = res.data.data;
            this.total = res.data.total;
          }
        });
    }
  },
  onReachBottom() {
    // if(this.disayList.length< this.pageNum * 15){
    // 	return
    // }
    if (!this.nextPage) {
      return;
    }
    this.getAllDiary(this.nextPage, false);
  },
  onLoad(options) {
    this.custId = options.custId
    this.$set(this,'status',options.status == 'false' ? false :true)
    this.userid = options.custId;
    console.log(this.status)
  },
  onShow() {
    this.getInfo();
    this.getAllDiary(this.pageNum, true);
  }
};
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.diary-page .diary-page-mg,
.diary-page .diary-page-mg ul {
  display: flex;
  justify-content: start;
}
.diary-page .diary-page-mg{
  border: 0;
}
.diary-page .diary-page-p .p {
  overflow: hidden;
  text-align: left;
}
.diary-page .diary-page-p image {
  max-height: 250rpx;
  float: left;
  display: none;
}

.infor .list-nav {
  position: static;
}

.collect-kuang {
  margin-top: 1.5rem;
}

.mine {
  background-color: #f1f1f1;
}

.guanzhu {
  position: absolute;
  right: 0.2rem;
  bottom: 1rem;
}

.guanzhu .yi {
  background: #999;
  color: #fff;
  font-size: 0.26rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
}

.guanzhu .wei {
  background: #fc4396;
  color: #fff;
  font-size: 0.26rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
}

.banner {
  position: relative;
  width: 100%;
  height: 4.1rem;
  background: url("http://img.meiduduo.com/images/mine/banner.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.person {
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.person > span {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  border: 2px solid #fff;
  display: inline-block;
  margin-bottom: 0.2rem;
}

.person img {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
}

.person p {
  font-weight: bolder;
  color: #333;
  font-size: 0.34rem;
}

.person > div {
  color: #666;
  font-size: 0.28rem;
  line-height: 0.6rem;
}

.content {
  width: 100%;
}

.content-item {
  background: #f5f5f5;
  margin-bottom: 0.2rem;
}

.box-title {
  color: #999999;
  font-size: 0.26rem;
  background: #fff;
  padding: 0 0.3rem;
  height: 70rpx;
  line-height: 70rpx;
  margin-top: 18rpx;
  border-bottom: 1px solid #eeeeee;
}
.content-diary-item{
  padding: 0.3rem 0.3rem;
  background: #fff;
  margin-bottom: 18rpx;
}
.box-title-1 {
  color: #999999;
  font-size: 0.26rem;
}
.box-ul{
  padding: 0.3rem 0.3rem;
  background: #fff;
}
.box-ul .pick {
  color: #333;
  font-size: 0.3rem;
  height: 60rpx;
  line-height: 60rpx;
  overflow: hidden;
}
.box-ul .pick span {
  color: #333;
  margin-right: 0.4rem;
  float: left;
  width: 300rpx;
  height: 60rpx;
  line-height: 60rpx;
}
.box-ul .pick span:last-of-type {
  float: right;
  color: #999999;
  width: auto;
}
.box-ul .pick span:first-of-type {
  color: #999999;
  width: auto;
}
.box-p span {
  background: #ffd2ee;
  color: #ff4691;
  font-size: 0.2rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  margin-right: 0.1rem;
}
</style>
