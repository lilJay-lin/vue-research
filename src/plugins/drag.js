/**
 * Created by linxiaojie on 2017/3/31.
 */
import {util} from 'liljay-common-utils'
let Drag = {}
const Dragging = 'dragging'
const DragOver = 'drag-over'
const DragEnter = 'drag-enter'

/*
* 事件回调方法名
* */
const dragStart = 'dragStart'
const dragOver = 'dragOver'
const dragEnter = 'dragEnter'
const dragLeave = 'dragLeave'
const drag = 'drag'
const drop = 'drop'
const dragEnd = 'dragEnd'

/*
 * 保存唯一的拖拽实例
 * */
let _dragSrcEl = null

function findEl (el) {
  return el ? el.dataset && el.dataset.draggable ? el : findEl(el.parentNode) : null
}

Drag.install = (Vue) => {
  Vue.directive('drag', {
    bind: function (el, {modifiers}, vnode) {
      let vm = vnode.context
      let emptyFn = function () {}
      let draggable = modifiers.draggable
      let droppable = modifiers.droppable
      _dragSrcEl = null
      let handleDragStart = (e) => {
        _dragSrcEl = findEl(e.target)
        _dragSrcEl && util.addClass(_dragSrcEl, Dragging)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text', '*')
        if (util.isFunction(vm[dragStart])) {
          vm[dragStart](_dragSrcEl, e)
        }
      }

      let handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        _dragSrcEl && util.addClass(_dragSrcEl, DragOver)
        if (util.isFunction(vm[dragOver])) {
          vm[dragOver](_dragSrcEl, e)
        }
        return false
      }

      let handleDragEnter = (e) => {
        _dragSrcEl && util.addClass(_dragSrcEl, DragEnter)
        if (util.isFunction(vm[dragEnter])) {
          vm[dragEnter](_dragSrcEl, e)
        }
      }

      let handleDragLeave = (e) => {
        _dragSrcEl && util.removeClass(_dragSrcEl, DragEnter)
        if (util.isFunction(vm[dragLeave])) {
          vm[dragLeave](_dragSrcEl, e)
        }
      }

      let handleDrag = (e) => {
        if (util.isFunction(vm[drag])) {
          vm[drag](_dragSrcEl, e)
        }
      }

      let handleDragEnd = (e) => {
        _dragSrcEl && util.removeClass(_dragSrcEl, [DragEnter, Dragging, DragOver])
        if (util.isFunction(vm[dragEnd])) {
          vm[dragEnd](_dragSrcEl, e)
        }
        _dragSrcEl = null
      }

      let handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (_dragSrcEl === null) {
          return
        }
        if (_dragSrcEl !== e.target) {
          if (util.isFunction(vm[drop])) {
            vm[drop](_dragSrcEl, e)
          }
        }
        _dragSrcEl && util.removeClass(_dragSrcEl, [DragEnter, Dragging, DragOver])
        return false
      }

      if (!draggable) {
        handleDragStart = emptyFn
        handleDragEnter = emptyFn
        handleDrag = emptyFn
        handleDragLeave = emptyFn
        handleDragEnd = emptyFn
      }
      if (!droppable) {
        handleDrop = emptyFn
      }
      /*
      * 父节点可拖拽，默认节点也可以拖拽（chrome），增加属性进行区分
      * */
      if (draggable) {
        el.setAttribute('draggable', true)
        el.setAttribute('data-draggable', true)
      }
      el.addEventListener('dragstart', handleDragStart, !1)
      el.addEventListener('dragenter', handleDragEnter, !1)
      el.addEventListener('dragover', handleDragOver, !1)
      el.addEventListener('drag', handleDrag, !1)
      el.addEventListener('dragleave', handleDragLeave, !1)
      el.addEventListener('dragend', handleDragEnd, !1)
      el.addEventListener('drop', handleDrop, !1)

      el._destroy = () => {
        util.removeClass(el, [DragEnter, Dragging, DragOver])
        el.removeAttribute('draggable')
        el.removeEventListener('dragstart', handleDragStart)
        el.removeEventListener('dragenter', handleDragEnter)
        el.removeEventListener('dragover', handleDragOver)
        el.removeEventListener('dragleave', handleDragLeave)
        el.removeEventListener('drag', handleDrag)
      }
    },
    unbind (el) {
      el._destroy()
    }
  })
}
export default Drag

