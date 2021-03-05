import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Startseite',
    component: Home
  },
  {
    path: '/waiting',
    name: 'Warteraum',
    component: () => import('../views/Waiting.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
