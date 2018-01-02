import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Players from '@/components/Players'
import CreatePlayer from '@/components/CreatePlayer'
import EditPlayer from '@/components/EditPlayer'

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
    },
    {
      path: '/players/edit/:id',
      name: 'editPlayer',
      component: EditPlayer,
      props: true
    }
  ]
})
