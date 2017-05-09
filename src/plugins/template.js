/**
 * Created by linxiaojie on 2017/4/20.
 *
 * 注册所有template模版为Vue组件
 */
import tpl from '../template/index.js'
let Vue

let Tpl = {}
Tpl.install = (_Vue) => {
  if (Vue) {
    console.error(
      '[Tpl] already installed. Vue.use(Tpl) should be called only once.'
    )
    return
  }
  Vue = _Vue
  tpl.register(Vue)
}

export default Tpl
