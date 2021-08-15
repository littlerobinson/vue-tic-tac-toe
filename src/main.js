// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Intro from '@/components/Intro'
import Game from '@/components/Game'
import Notifications from 'vue-notification'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro,
    meta: {title: 'Paramétrages du jeu'}
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: {title: 'En jeu'}
  }
]

// Router instance and pass the `routes` option
const router = new VueRouter({
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
