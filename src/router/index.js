import Router from 'vue-router'

import Intro from '@/components/Intro'
import Game from '@/components/Game'

export default new Router({
  routes: [
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
})
