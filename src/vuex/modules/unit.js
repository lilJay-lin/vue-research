/**
 * Created by linxiaojie on 2017/4/13.
 */
import * as types from './mutation-types.js'
import {util} from 'liljay-common-utils'
import tpl from '../../template/index.js'
let id = '_unit_'
let index = 0
const state = {
  selected: '',
  items: [],
  ids: {}
}
const mutations = {
  [types.ADD_UNIT] (state, unit) {
    let id = unit.id
    state.selected = id
    state.ids[id] = {
      index: state.items.length
    }
    state.items.push(unit)
  },
  [types.SELECTED_UNIT] (state, id) {
    state.selected = id
  },
  [types.SET_UNIT] (state, option = {}) {
    let index = state.ids[state.selected].index
    let unit = state.items[index]
    util.each(option, (val, key) => {
      if (util.has(unit, key)) {
        unit[key] = val
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

const actions = {
  addUnit ({commit, state}, {type}) {
    index++
    let unit = tpl.get({type, index})
    unit.id = id + index
    unit.index = state.items.length
    commit(types.ADD_UNIT, unit)
    commit(types.SELECTED_UNIT, unit.id)
  },
  setUnit ({commit, state}, option = {}) {
    commit(types.SET_UNIT, option)
  },
  selectUnit ({commit}, {id}) {
    commit(types.SELECTED_UNIT, id)
  },
  /*
  * 设置组件data
  * */
  setUnitData ({commit}, option = {}) {
    commit(types.SET_UNIT_DATA, option)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
