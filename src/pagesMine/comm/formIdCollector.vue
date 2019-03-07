<template>
    <div></div>
</template>
<script>
export default {
  data() {
    return {
      //formids收集 2018年9月13日 11:28:22 zx
      keyHead: "fmc_", //storage存储key值前缀fmc_
      formIdKey: "", //storage存储key
      formIdArr: [], //storage value数组
      //test-setting
      // postUrl:'http://colmeluna.viphk.ngrok.org/storage/save',
      // openid:'o0Svv0HkPpV6JFq5ukQbcQSVLZXQ'

      //product-setting
      postUrl: "",
      openid: ""
    };
  },
  onLoad() {
    //创建页面唯一标识作为key用于setStorage存储的key 2018年9月13日 11:28:11 zx
    this.formIdKey = this.$fmc.firstPageLoadSetKey(this.keyHead);
    console.log("formIdKey is : " + this.formIdKey);

    //todo 获取当前用户的openid
    this.openid = "";
  },
  onShow() {
    //页面渲染完毕显示 检验清理storage未发送数据
    this.loadPage2BatchSave();
  },
  onHide() {
    //监听用户下拉事件 触发formids持久化写入storage
    console.log("start save to Storage");
    this.saveFormIds2Storage(this.formIdKey, this.formIdArr);
  },
  components: {},
  methods: {
    //✔checked 2018年9月13日 11:42:23 zx
    //点击创建formid存入当前页formIdArr[]
    createFormidscreateFormids: function(parentformid) {
      this.formIdArr.push(parentformid);
      console.log(this.formIdArr);
      // this.emit('create');
    },
    //✔checked 2018年9月13日 14:11:08 zx
    //页面首次加载 清理storage未存储的key-value formIdArr
    loadPage2BatchSave: function() {
      console.log("loadPage2BatchSave");
      try {
        var res = wx.getStorageInfoSync();
        console.log(res.keys);
        console.log(res.currentSize);
        console.log(res.limitSize);

        if (res.keys.length > 0) {
          for (var i = 0; i < res.keys.length; i++) {
            var key = res.keys[i];
            // ↓ key contains "fmc_"
            var t = this.isContains(key, this.keyHead);
            console.log("key is" + key, " flag:" + t);
            if (t) {
              try {
                var formidsvalue = wx.getStorageSync(key);
                console.log(formidsvalue);
                if (formidsvalue) {
                  // 发送save
                  console.log("有遗留数据存在，开始save前" + formidsvalue);
                  this.onShowformidsSave(key, formidsvalue);
                }
              } catch (e) {
                // error
              }
            }
          }
        } else {
          console.log("没有数据 ，不请求save");
        }
      } catch (e) {
        // Do something when catch error
      }
    },
    //✔checked 2018年9月13日 14:12:48 zx
    //把当前页面变量formIdKey(key)-formIdArr(value)持久化写入Storage
    saveFormIds2Storage: function(key, arr) {
      this.setStorage(key, arr);
      console.log("写入storage key is：" + key + " value is:" + arr);
    },
    //✔checked 2018年9月13日 14:27:12 zx
    //调用wx.setStroage function callbackmsg
    setStorage: function(key, data) {
      var key = key;
      var data = data;
      if (key.length === 0) {
        //todo dialog tips:key set not null
        console.log("key cannot be set null ");
      } else {
        wx.setStorageSync(key, data);
        //todo dialog tips:save secuess
        console.log("Saved to Localstorage successfully!");
        console.log("清空formIdArr");
        //请求成功rescode=1即删除本地storage中的fmckey 有可能删除 本地mock one
        ind.formIdArr = [];
      }
    },
    //✔checked 2018年9月13日 16:01:36 zx
    //调用wx.request 发送formids至服务器保存
    onShowformidsSave: function(key, value) {
      var ind = this;
      console.log("openid is:" + ind.openid);
      if (!this.checkEmpty(ind.openid)) {
        console.log("go post");
        wx.request({
          url: "http://colmeluna.viphk.ngrok.org/storage/save",
          data: {
            openid: "o0Svv0HkPpV6JFq5ukQbcQSVLZXQ",
            formids: value
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            try {
              wx.removeStorageSync(key);
              //var infodate = wx.getStorageInfoSync();
              console.log(
                "清空storage,storage-keys查看内容为：" + infodate.keys
              );
              console.log(infodate.currentSize);
              console.log(infodate.limitSize);
              console.log("清空formIdArr后的数值为：" + this.data.formIdArr);
            } catch (e) {
              // Do something when catch error
            }
          },
          fail: function(res) {
            console.log(res.data);
            // fail
          }
        });
      } else {
        console.log("FormidCollecterror: Openid can no be null");
      }
    },
    //Utils
    isContains: function(str, substr) {
      return new RegExp(substr).test(str);
    },
    checkEmpty: function(value) {
      switch (typeof value) {
        case "undefined":
          return true;
        case "string":
          if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
            return true;
          break;
        case "boolean":
          if (!value) return true;
          break;
        case "number":
          if (0 === value || isNaN(value)) return true;
          break;
        case "object":
          if (null === value || value.length === 0) return true;
          for (var i in value) {
            return false;
          }
          return true;
      }
      return false;
    }
  }
};
</script>
