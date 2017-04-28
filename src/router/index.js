import Vue from 'vue'
import Router from 'vue-router'
import Config from '../components/Config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'Config',
      component: Config
    },
    {
      path: '/animate',
      name: 'Animate',
      component (resolve) {
        require(['../components/Animate'], resolve)
      }
    },
    {
      path: '/',
      name: 'Home',
      component (resolve) {
        require(['../components/Home'], resolve)
      }
    }
  ]
})
