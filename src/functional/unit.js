/**
 * Created by linxiaojie on 2017/4/13.
 */
import {util} from 'liljay-common-utils'
import eventBus from '../event-bus/index.js'
import {DEFAULT_UNIT_INITIALS} from '../constant/index.js'
export default {
  name: 'unit',
  functional: true,
  render: (createElement, context) => {
    let data = context.props.data
    /*
     * 取出传入funtional组件的data的数据，当成unit组件的props传入
     * */
    let vnodeData = {
      'class': data.className,
      'style': data.cssText,
      nativeOn: {
        click: function (e) {
          eventBus.$emit('click:unit', data.id)
        }
      },
      props: data.data,
      key: data.id
    }
    util.each(vnodeData, (val, key) => {
      context.data[key] = val
    })
    return createElement(
      DEFAULT_UNIT_INITIALS + data.type,
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
