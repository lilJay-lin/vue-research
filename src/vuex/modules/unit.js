/**
 * Created by linxiaojie on 2017/4/13.
 */
import * as types from './mutation-types.js'
import {util} from 'liljay-common-utils'
import tpl from '../../template/index.js'
import server from '../../server/index.js'
let id = '_unit_'
const state = {
  _id: '',
  selected: '',
  items: [],
  ids: {},
  maxIndex: 0
}
const mutations = {
  [types.ADD_UNIT] (state, unit) {
    let id = unit.id
    state.selected = id
    state.ids[id] = {
      index: unit.index
    }
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
    let index = state.ids[state.selected].index
    let data = state.items[index].data
    util.each(option, (val, key) => {
      if (util.has(data, key)) {
        data[key] = val
      }
    })
  },
  [types.SET_UNIT_STYLE] (state, {cssText = ''}) {
    let index = state.ids[state.selected].index
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
    unit.index = state.items.length
    commit(types.ADD_UNIT, unit)
    commit(types.SELECTED_UNIT, unit.id)
    commit(types.SET_MAX_INDEX, index)
  },
  selectUnit ({commit}, {id}) {
    commit(types.SELECTED_UNIT, id)
  },
  setUnit ({commit}, option) {
    let items = option.items || []
    let ids = {}
    util.each(items, (unit, key) => {
      ids[unit.id] = {
        index: key
      }
    })
    option.ids = ids
    option.maxIndex = option.maxIndex
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
    let obj = state.ids[state.selected]
    if (!obj) {
      return
    }
    let cssText = state.items[obj.index].data.cssText
    util.each(option, (val, key) => {
      let reg = new RegExp(key + ':([\\-a-zA-Z0-9\\s]*)(;|$)', 'g')
      let hint = 0
      cssText = cssText.replace(reg, (text, oldVal) => {
        hint = 1
        return key + ':' + val + ';'
      })
      if (!hint) {
        cssText = cssText + key + ':' + val + ';'
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
  },
  saveUnit ({commit, state}) {
    let data = {
      _id: state._id,
      maxIndex: state.maxIndex,
      items: state.items.slice(0)
    }
    return server.request({
      url: '/h5/save',
      data,
      method: 'post'
    }).then((res) => {
      console.dir(res)
    })
  },
  getUnit ({commit, dispatch}, {id}) {
    return server.request({
      url: '/h5/' + id
    }).then(({res: {h5}}) => {
      dispatch('setUnit', h5)
    })
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
    return state.selected ? state.items[state.ids[state.selected].index] : {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
