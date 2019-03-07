// 处理后台返回的字符串（主要为了兼容ios）
export function dealTime(time) {
  let val = time.slice(0, 19).replace(/-/g, "/")
  return val
}

// 处理数字为单精度小数
export function dealNumber1(number) {
  let val = number ? number.toFixed(1) : ''
  return val
}

// 处理机构列表里的距离
export function dealDistanceNumber(number) {
  if (number) {
    if (number >= 1) {
      return number.toFixed(2) + 'km'
    } else {
      return Math.round(number * 1000) + 'm'
    }
  } else {
    return ''
  }
}

// 去除字符串中所有html便签
export function removeHtmlTags(str) {
  return str.replace(/<[^>]+>/g, "")
}

export function removeBrTag(str) {
  return str.replace(/<br\s*\/?>/gi, '<p class="_br"></p>')
}

export function dealRichText(text) { // 处理 rich-text 中的 img
  return text.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
}

export function dealRichP(text) { // 处理 rich-text 中的 p
  return text.replace(/\<p/gi, '<p style="font-size:12px;color:#999;word-wrap:break-word;" ')
}

export function dealRichList(text) { // 处理 rich-text 中的 li
  return text.replace(/\<li/gi, '<li style="font-size:12px;color:#999;word-wrap:break-word;" ')
}

export function dealRichOl(text) { // 处理 rich-text 中的 ol
  return text.replace(/\<ol/gi, '<ol style="font-size:12px;color:#999;word-wrap:break-word;padding-left: 15px;" ')
}

export function dealRichH1(text) { // 处理 rich-text 中的 h1
  return text.replace(/\<h1/gi, '<h1 style="font-size:12px;color:#666;word-wrap:break-word;" ')
}

// 处理 rich-text 的通用函数，支持链式写法。参数说明：text：需要处理的内容，tag：html 标签（如： h1 p），style：添加的样式，（如：'font-size:12px;color:#666;word-wrap:break-word;'）
// 链式用法：
// dealHtmlStyle(el.content, 'h1', 'font-size:12px;color:#666;word-wrap:break-word;')
// .then(res => dealHtmlStyle(res, 'p', 'font-size:12px;color:red;word-wrap:break-word;'))
// .then(res => {
//   el.content = res
// })
export function dealHtmlStyle(text, tag, style) {
  let rule = new RegExp(`\<${tag}`, 'gi')
  return new Promise((resolve, reject) => {
    resolve(text.replace(rule, `<${tag} style="${style}" `))
  })
}

export function timeBackMMDD(time) {
  let val = time.slice(0, 19).replace(/-/g, "/")
  let newTime = new Date(val).toISOString()
  return newTime.slice(5, 10)
}

