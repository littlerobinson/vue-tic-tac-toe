
import Vue from 'vue'
import VueRouter from 'vue-router'

import Intro from '@/components/Intro'
import Game from '@/components/Game'
import Summary from '@/components/Summary'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
      meta: {title: 'Paramétrages du jeu'}
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      meta: {title: 'En jeu'}
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
      meta: {title: 'Récapitulatif'}
    }
  ]
})

export default router
