/**
 * Created by linxiaojie on 2017/4/13.
 */
import * as types from './mutation-types.js'
import {util} from 'liljay-common-utils'
import server from '../../server/index.js'
const state = {
  _id: '',
  name: '',
  description: '',
  selected: 0,
  pages: []
}
const mutations = {
  [types.ADD_PAGE] (state, page) {
    state.pages.push(page)
  },
  [types.DEL_PAGE] (state, id) {
    state.pages.splice(id, 1)
  },
  [types.SELECTED_PAGE] (state, id) {
    state.selected = id
  },
  [types.LOAD_PAGE] (state, option = {}) {
    util.each(option, (val, key) => {
      if (util.has(state, key)) {
        state[key] = val
      }
    })
  },
  [types.SET_PAGE] (state, {items = [], maxIndex = 0}) {
    state.pages[state.selected] = {items, maxIndex}
  }
}

const actions = {
  addPage ({commit, state}) {
    let page = {items: [], maxIndex: 0}
    commit(types.ADD_PAGE, page)
    return Promise.resolve(state.pages.length - 1)
  },
  delPage ({commit, state}, {id}) {
    commit(types.DEL_PAGE, id)
    return Promise.resolve(state.pages.length)
  },
  selectPage ({commit}, {id}) {
    commit(types.SELECTED_PAGE, id)
  },
  setPage ({commit}, unit = {}) {
    commit(types.SET_PAGE, unit)
  },
  createPage ({commit}, {name, description}) {
    return server.request({
      url: '/h5/create',
      data: {
        name,
        description,
        pages: [{
          maxIndex: 0,
          items: []
        }]
      },
      method: 'post'
    }).then(({res: {h5}}) => {
      commit(types.LOAD_PAGE, h5)
      return h5._id
    })
  },
  savePage ({dispatch, commit, state, rootState}) {
    /*
    * 先保存当前选中页的配置
    * */
    dispatch('setPage', rootState.units)
    let data = {
      _id: state._id,
      maxIndex: state.maxIndex,
      pages: state.pages.slice(0)
    }
    return server.request({
      url: '/h5/save',
      data,
      method: 'post'
    })
  },
  loadPage ({commit, dispatch}, {id}) {
    return server.request({
      url: '/h5/' + id
    }).then(({res: {h5}}) => {
      if (h5) {
        commit(types.LOAD_PAGE, h5)
      }
    })
  }
}

const getters = {
  pages (state) {
    return state.pages
  },
  selected (state) {
    return state.selected
  },
  currentPage (state) {
    return state.pages[state.selected]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
