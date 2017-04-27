/**
 * Created by linxiaojie on 2017/4/25.
 */

/*
* 从样式字符串提取指定样式属性配置
* */
export const convertToObject = (cssText = '') => {
  let reg = new RegExp('\\s*([\\-a-zA-Z0-9]*)\\s*:\\s*([\\-a-zA-Z0-9]*)\\s*;|$', 'g')
  let b = null
  let styleObject = {}
  while ((b = reg.exec(cssText))[0]) {
    let key = b[1]
    if (key) {
      styleObject[key] = convertToNumber(key, b[2])
    }
  }
  return styleObject
}

/*
* 样式单位转换,变为数字
* */
let attr = ['width', 'height', 'top', 'left', 'right', 'bottom']
export const convertToNumber = (key, val) => {
  return attr.indexOf(key) > -1 ? parseInt(val, 10) || 0 : val
}

/*
 * 样式单位转换,加上px单位
 * */
export const convertToPx = (key, val) => {
  return attr.indexOf(key) > -1 ? (val.trim() === '' ? 0 : val) + 'px' : val
}
