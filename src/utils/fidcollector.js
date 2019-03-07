var fmc = {}

fmc.firstPageLoadSetKey = function(uuidhead){
  var uuid = createKeyUUID(uuidhead);
    console.log("page load ready, uuid is:"+uuid);
  return uuid;
}

/**
 * 测试用function
 */
fmc.test = function(key){
  console.log("just test the fmc isok "+key);
}

fmc.goSaveStorage =function(key,formIdArr){
    wx.setStorage(key, formIdArr);
    console.log("写入storage： key is:"+key +" formIdArr is:"+ formIdArr)
}


/**
   * zx
   * 二〇一八年九月八日 10:29:49
   * 存储方式一： 
   * formIdArr临时数据 写入storage持久化
   * @params:key,data
   */
  function setStorage(key,data) {
    var key = key;
    var data = data;
    if (key.length === 0) {
    // not null to tip
    } else {
      wx.setStorageSync(key, data)
      
    }
  }

/**
 * zhouxin
 * 2018年9月8日 15:44:33
 * 生成uuid
 */
function createKeyUUID(keyhead){
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  //收集formid的key命名规则 formidBatchNo_开头
  //return "formidBatchNo_" + uuid;
  return keyhead+"_"+uuid;
}

/**
 * 2018年9月14日 15:29:27
 * js验证非空
 * undefined/null/''/ NaN/false/0/[]/{} /空白字符串  
 * return true
 */
function checkEmpty(value) {
    switch (value) {
          case 'undefined':
              return true;
          case 'string':
              if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
              break;
          case 'boolean':
              if (!value) return true;
              break;
          case 'number':
              if (0 === value || isNaN(value)) return true;
              break;
          case 'object':
              if (null === value || value.length === 0) return true;
              for (var i in value) {
                  return false;
              }
          return true;
    }
    return false;
}


module.exports = fmc