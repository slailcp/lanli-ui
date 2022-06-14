import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/icon-example.vue'

const routes: Array<RouteRecordRaw> = [
 
  {
    path: '/',
    name: 'flow-example',
    component: () => import( '../views/flow-example.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
