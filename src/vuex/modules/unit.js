/**
 * Created by linxiaojie on 2017/4/13.
 */
import * as types from './mutation-types.js'
import {util} from 'liljay-common-utils'
import tpl from '../../template/index.js'
let id = '_unit_'
const state = {
  background: '#ffffff',
  backgroundImage: '',
  selected: 0,
  items: [],
  maxIndex: 0
}
const mutations = {
  [types.ADD_UNIT] (state, unit) {
    state.selected = state.items.length
    state.items.push(unit)
  },
  [types.SELECTED_UNIT] (state, id) {
    state.selected = id
  },
  [types.SET_UNIT] (state, option = {}) {
    util.each(option, (val, key) => {
      if (util.has(state, key)) {
        state[key] = val
      }
    })
  },
  [types.SET_UNIT_DATA] (state, option = {}) {
    let index = state.selected
    let data = state.items[index].data
    util.each(option, (val, key) => {
      if (util.has(data, key)) {
        data[key] = val
      }
    })
  },
  [types.SET_UNIT_STYLE] (state, {cssText = ''}) {
    let index = state.selected
    state.items[index].data.cssText = cssText
  },
  [types.SET_MAX_INDEX] (state, index) {
    state.maxIndex = index
  },
  [types.UP_TO_TOP] (state) {
    let index = state.maxIndex
    state.maxIndex = index + 1
  }
}

const actions = {
  addUnit ({commit, state}, {type}) {
    let index = state.maxIndex + 1
    let unit = tpl.get({type, index})
    unit.id = id + index
    commit(types.ADD_UNIT, unit)
    commit(types.SELECTED_UNIT, state.items.length - 1)
    commit(types.SET_MAX_INDEX, index)
  },
  selectUnit ({commit}, {id}) {
    commit(types.SELECTED_UNIT, id)
  },
  resetUnit ({commit}, option = {}) {
    commit(types.SELECTED_UNIT, 0)
    let unit = {}
    unit.items = option.items || []
    unit.maxIndex = option.maxIndex || 0
    unit.background = option.background || '#ffffff'
    unit.backgroundImage = option.backgroundImage || ''
    commit(types.SET_UNIT, unit)
  },
  setUnitProp ({commit}, option = {}) {
    commit(types.SET_UNIT, option)
  },
  /*
   * 设置组件data
   * */
  setUnitData ({commit}, option = {}) {
    commit(types.SET_UNIT_DATA, option)
  },
  /*
   * 设置cssText
   * */
  setUnitStyle ({commit, state}, option = {}) {
    let item = state.items[state.selected]
    if (!item) {
      return
    }
    let cssText = item.data.cssText
    util.each(option, (val, key) => {
      let reg = new RegExp('(;|\\s+|^)' + key + ':([#%\\-a-zA-Z0-9\\s\\(\\)]*)(;|$)', 'g')
      let hint = 0
      cssText = cssText.replace(reg, (text, split, oldVal) => {
        hint = 1
        return ';' + key + ':' + val + ';'
      })
      if (!hint) {
        cssText = cssText + (/;$/.test(cssText) ? '' : ';') + key + ':' + val + ';'
      }
    })
    commit(types.SET_UNIT_STYLE, {cssText})
  },
  /*
   * 置顶
   * */
  upToTop ({dispatch, commit, state}) {
    dispatch('setUnitStyle', {'z-index': state.maxIndex})
    commit(types.UP_TO_TOP)
  }
}

const getters = {
  units (state) {
    return state
  },
  selected (state) {
    return state.selected
  },
  currentUnit (state) {
    return state.selected === undefined ? {} : state.items[state.selected]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
