// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./assets/less/bootstrap.less')
import Vue from 'vue'
import App from './App'
import router from './router'
/*
* plugins
* */
import Template from './plugins/template.js'
import Move from './plugins/move.js'

/*
* functional component
* */
import Unit from './functional/unit.js'
import Setting from './functional/setting.js'

import store from './vuex/store.js'

Vue.component('Unit', Unit)
Vue.component('Setting', Setting)

Vue.use(Move)
Vue.use(Template)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
