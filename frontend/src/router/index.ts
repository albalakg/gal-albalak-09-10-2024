import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Guard from '@/helpers/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    beforeEnter: Guard.guest,
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/game',
    name: 'game',
    beforeEnter: Guard.user,
    component: () => import('@/views/GameView.vue')
  },
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: () => import('@/views/HomeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
