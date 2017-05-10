/**
 * Created by linxiaojie on 2017/4/25.
 */

/*
* 从样式字符串提取指定样式属性配置
* */
export const convertToObject = (cssText = '') => {
  let reg = new RegExp('(;|\\s*|^)([\\-a-zA-Z0-9]*)\\s*:\\s*([#%\\-a-zA-Z0-9\\s\\(\\),]*)\\s*;|$', 'g')
  let b = null
  let styleObject = {}
  while ((b = reg.exec(cssText))[0]) {
    let key = b[2]
    if (key) {
      styleObject[key] = decorateConvert(key, b[3])
    }
  }
  return styleObject
}

/*
* 转换装饰器
* */
export const decorateConvert = (key, val) => {
  return convertToNumber(key, val)
}

/*
* 样式单位转换,变为数字
* */
let attr = ['width', 'height', 'top', 'left', 'right', 'bottom']
export const convertToNumber = (key, val) => {
  return attr.indexOf(key) > -1 && val.indexOf('%') === -1 ? parseInt(val, 10) : val
}

/*
 * 样式单位转换,加上px单位
 * */
export const convertToPx = (key, val) => {
  return attr.indexOf(key) > -1 && val.indexOf('%') === -1 ? (val.trim() === '' ? 0 : val) + 'px' : val
}
