import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Players from '@/components/Players'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    }
  ]
})
