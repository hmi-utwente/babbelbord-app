import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Players from '@/components/Players'
import CreatePlayer from '@/components/CreatePlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
    {
      path: '/players/create',
      name: 'createPlayer',
      component: CreatePlayer
    }
  ]
})
