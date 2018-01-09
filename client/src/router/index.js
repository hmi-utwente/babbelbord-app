import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Players from '@/components/Players'
import SelectPlayers from '@/components/SelectPlayers'
import EditPlayer from '@/components/EditPlayer'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/players/profiles',
      name: 'players',
      component: Players
    },
    {
      path: '/players/select',
      name: 'selectPlayers',
      component: SelectPlayers
    },
    {
      path: '/players/edit/:id',
      name: 'editPlayer',
      component: EditPlayer,
      props: true
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})
