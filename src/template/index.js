/**
 * Created by linxiaojie on 2017/4/20.
 * 组件模版，通过调用get(type)返回vuex 的组件state
 */
import {util} from 'liljay-common-utils'
import {components} from 'vue-research-unit'
let _Vue = null
let keys = Object.keys(components)
export default {
  modal ({index = 0, type = ''}) {
    if (keys.indexOf(type) === -1) {
      console.error('cannot find template ' + type)
      return
    }
    let me = this
    let component = me.getComponent(type)
    let props = component.props
    let obj = {
      type,
      id: 'n_' + index,
      data: {}
    }
    util.each(props, (val, key) => {
      let def = props[key].default
      obj.data[key] = util.isFunction(def) ? key === 'cssText' ? def(index) : def() : def
    })
    return obj
  },
  get (option) {
    return this.modal(option)
  },
  getComponent (name) {
    return components[name]
  },
  /*
  * 返回可选组件类型和label
  * */
  getSelectComponents () {
    let obj = []
    util.each(components, (component, key) => {
      obj.push({
        key,
        val: component.label
      })
    })
    return obj
  },
  register (Vue) {
    if (_Vue) {
      return
    }
    _Vue = Vue
    util.each(components, (val, key) => {
      _Vue.component(key, val)
    })
  }
}
