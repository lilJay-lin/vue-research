/**
 * Created by linxiaojie on 2017/4/13.
 */
import * as types from './mutation-types.js'
import {util} from 'liljay-common-utils'
import tpl from '../../template/index.js'
import server from '../../server/index.js'
let id = '_unit_'
let index = 0
const state = {
  _id: '',
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
    index = state.items.length
    let unit = tpl.get({type, index})
    unit.id = id + index
    unit.index = state.items.length
    commit(types.ADD_UNIT, unit)
    commit(types.SELECTED_UNIT, unit.id)
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
    commit(types.SET_UNIT, option)
  },
  /*
  * 设置组件data
  * */
  setUnitData ({commit}, option = {}) {
    commit(types.SET_UNIT_DATA, option)
  },
  saveUnit ({commit, state}) {
    let data = {
      _id: state._id,
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
  getUnit ({commit}, {id}) {
    return server.request({
      url: '/h5/' + id
    }).then(({res: {h5}}) => {
      return h5
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
