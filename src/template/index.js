/**
 * Created by linxiaojie on 2017/4/20.
 * 组件模版，通过调用get(type)返回vuex 的组件state
 */
import {util} from 'liljay-common-utils'
export default {
  txt ({index = 0, className = ''}) {
    return {
      type: 'txt',
      id: 'n_' + index,
      content: '<div :style="cssText" :class="[className]">{{text}}</div>',
      props: {
        className: {
          type: String,
          default: ''
        },
        cssText: {
          type: String,
          default: 'z-index:' + index * 10 + ';width:100%;top:0px;left:0px;'
        },
        text: {
          type: String,
          default: '我是文本'
        }
      }
    }
  },
  pic ({index = 0, className = ''}) {
    return {
      type: 'pic',
      id: 'n_' + index,
      content: '<img :style="cssText" :class="[className]" :src="src" />',
      props: {
        className: {
          type: String,
          default: ''
        },
        cssText: {
          type: String,
          default: 'z-index:' + index * 10 + ';width:100px;top:0px;left:0px;'
        },
        src: {
          type: String,
          default: 'static/assets/img/1.png'
        }
      }
    }
  },
  get (option) {
    let {type} = option
    let me = this
    if (!me[type]) {
      console.error('cannot find template ' + type)
      return
    }
    let obj = me[type](option)
    let data = {}
    util.each(obj.props, (val, key) => {
      let def = obj.props[key].default
      data[key] = util.isFunction(def) ? def() : def
    })
    delete obj.props
    obj.data = data
    return obj
  }
}
