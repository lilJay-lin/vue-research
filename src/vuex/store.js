/**
 * Created by linxiaojie on 2017/4/13.
 */
import Vue from 'vue'
import Vuex from 'Vuex'
import modules from './modules/index.js'
import createLogger from 'Vuex/src/plugins/logger.js'

Vue.use(Vuex)

let debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  strict: debug,
  modules,
  plugins: debug ? [createLogger()] : []
})
