/**
 * Created by linxiaojie on 2017/4/13.
 *
 * 展示功能组件
 * 所有可选组件通过plugins/template.js注册
 * 功能：
 * 1. 功能组件通过传入的unit数据，生成对应的展示组件： unit.type
 * 2. 传递组件需要的属性值：key,props,class...
 * 3. 增加dom事件操作
 */
import {util} from 'liljay-common-utils'
import eventBus from '../event-bus/index.js'
import {DEFAULT_UNIT_INITIALS} from '../constant/index.js'
import {convertToObject} from '../helper/convert.js'

function findEl (el) {
  return el ? el.dataset && el.dataset.move ? el : findEl(el.parentNode) : null
}

export default {
  name: 'unit',
  functional: true,
  render: (createElement, context) => {
    let props = context.props
    let data = props.data
    let selectedClass = props.selected ? ' selected' : ''
    /*
     * 取出传入funtional组件的data的数据，当成unit组件的props传入
     * */
    let isMove = 0
    let startDis = {}
    let _tagEl = null
    let styleObject = null
    let vnodeData = {
      'class': selectedClass,
      attrs: {
        'data-move': true
      },
      nativeOn: {
        click (e) {
          console.dir(data)
          eventBus.$emit('mousestart:unit', props.index)
        },
        mousedown (e) {
          e.preventDefault()
          _tagEl = findEl(e.target)
          styleObject = convertToObject(_tagEl.style.cssText)
          if (styleObject.position !== 'absolute') {
            _tagEl = null
            return
          }
          isMove = 1
          startDis = {
            x: e.pageX,
            y: e.pageY
          }
          eventBus.$emit('mousestart:unit', props.index)
          let mousemove = (e) => {
            e.preventDefault()
            if (!isMove || _tagEl === null) {
              return
            }
            util.css(_tagEl, {
              top: (styleObject.top || 0) + e.pageY - startDis.y + 'px',
              left: (styleObject.left || 0) + e.pageX - startDis.x + 'px'
            })
          }
          let mouseup = (e) => {
            e.preventDefault()
            if (_tagEl) {
              eventBus.$emit('mouseup:unit', _tagEl)
              _tagEl.removeEventListener('mousemove', mousemove, !1)
              _tagEl.removeEventListener('mouseup', mouseup, !1)
              _tagEl.removeEventListener('mouseleave', mouseup, !1)
            }
            isMove = 0
            _tagEl = null
            startDis = {}
          }
          _tagEl.addEventListener('mousemove', mousemove, !1)
          _tagEl.addEventListener('mouseup', mouseup, !1)
          _tagEl.addEventListener('mouseout', mouseup, !1)
          _tagEl.addEventListener('mouseleave', mouseup, !1)
        }
      },
      /*
      * 传入属性值
      * */
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
    selected: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
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
