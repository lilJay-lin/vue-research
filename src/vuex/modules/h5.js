/**
 * Created by linxiaojie on 2017/5/2.
 */
import * as types from './mutation-types.js'
import server from '../../server/index.js'
const state = {
  pageInfo: {
    curPage: 1,
    count: 0,
    totalPage: 0
  },
  list: []
}

const mutations = {
  [types.LOAD_H5] (state, {pageInfo, list = []}) {
    state.pageInfo = pageInfo
    state.list = list
  }
}

const getters = {
  allH5 (state) {
    return state
  }
}

const actions = {
  loadH5 ({commit}, {page = 1, pageSize = 10}) {
    return server.request({
      url: '/h5/list?page=' + page + '&pageSize=' + pageSize
    }).then(({res}) => {
      commit(types.LOAD_H5, res)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
