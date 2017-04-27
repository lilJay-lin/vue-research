/**
 * Created by linxiaojie on 2017/4/25.
 */
import {util} from 'liljay-common-utils'
let Vue
let Move = {}
const startMove = 'startMove'
const endMove = 'startMove'
const dealMove = 'dealMove'

function findEl (el) {
  return el ? el.dataset && el.dataset.move ? el : findEl(el.parentNode) : null
}

Move.install = (_vue) => {
  if (Vue) {
    console.error(
      '[Tpl] already installed. Vue.use(Tpl) should be called only once.'
    )
    return
  }
  Vue = _vue
  Vue.directive('move', {
    bind (el, {modifiers}, vnode) {
      let start = 'mousedown'
      let move = 'mousemove'
      let end = 'mouseup'

      let isMove = 0
      let startDis = {}
      let endDist = {}
      let _tagEl = null
      const mouseStart = (e) => {
        e.preventDefault()
        _tagEl = findEl(e.target)
        isMove = 1
        startDis = endDist = {
          x: e.pageX,
          y: e.pageY
        }
        if (util.isFunction(vnode[startMove])) {
          vnode[startMove](_tagEl, e)
        }
        console.dir(vnode)
      }
      const mouseMove = (e) => {
        e.preventDefault()
        if (!isMove) {
          return
        }
        let dis = {
          x: e.pageX - startDis.x,
          y: e.pageY - startDis.y
        }
        endDist = {
          x: e.pageX,
          y: e.pageY
        }
        if (util.isFunction(vnode[dealMove])) {
          vnode[dealMove](_tagEl, e, dis)
        }
      }
      const mouseEnd = (e) => {
        e.preventDefault()
        isMove = 0
        _tagEl = null
        let dis = {
          x: endDist.x - startDis.x,
          y: endDist.y - startDis.y
        }
        startDis = {}
        endDist = {}
        if (util.isFunction(vnode[endMove])) {
          vnode[endMove](_tagEl, e, dis)
        }
      }
      el.addEventListener(start, mouseStart, !1)
      el.addEventListener(move, mouseMove, !1)
      el.addEventListener(end, mouseEnd, !1)
    }
  })
}

export default Move
