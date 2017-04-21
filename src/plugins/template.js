/**
 * Created by linxiaojie on 2017/4/20.
 *
 * 注册所有template模版为Vue组件
 */
import {util} from 'liljay-common-utils'
import {DEFAULT_UNIT_INITIALS} from '../constant/index.js'
import template from '../template'
let Vue

let Tpl = {}
Tpl.install = (_Vue) => {
  if (Vue) {
    console.error(
      '[Tpl] already installed. Vue.use(Tpl) should be called only once.'
    )
    return
  }
  util.each(template, (val, key) => {
    if (key === 'get') {
      return true
    }
    let obj = val({})
    _Vue.component(DEFAULT_UNIT_INITIALS + key, {
      template: obj.content,
      props: obj.props
    })
  })
  Vue = _Vue
}

export default Tpl
