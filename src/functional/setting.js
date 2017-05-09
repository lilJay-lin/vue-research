/**
 * Created by linxiaojie on 2017/4/20.
 */
import {util} from 'liljay-common-utils'
import Setting from '../components/setting'
const INITIALS = 'Setting'
export default {
  name: 'setting',
  functional: true,
  render (h, context) {
    let {type, data} = context.props.data
    /*
     * 取出传入funtional组件的data的数据，当成unit组件的props传入
     * */
    context.data.props === undefined && (context.data.props = {})
    util.each(data, (val, key) => {
      context.data.props[key] = val
    })
    let component = type ? Setting[INITIALS + type.replace(/^Unit/i, '')] || 'div' : 'div'
    return h(
      component,
      context.data,
      context.children
    )
  },
  props: {
    /*
    * 接收整个unit数据
    * */
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
