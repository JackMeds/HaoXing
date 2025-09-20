import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/view/Login'
import NewsEdite from '@/view/NewsEdite'
import Home from '@/view/Home'
import UserManage from '@/view/UserManage'
import charts from '@/view/charts'
import userInfo from '@/view/userInfo'
import shopedite from '@/view/shopedite'
import gouwu from '@/view/gouwu'
import tag from '@/view/tag'
import demo from '@/view/demo'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/newsEdite',
        component: NewsEdite
      },
      {
        path: '/userManage',
        component: UserManage
      },
      {
        path: '/charts',
        component: charts
      },
      {
        path: '/userInfo',
        component: userInfo
      },
      {
        path: '/shopedite',
        component: shopedite
      },
      {
        path: '/gouwu',
        component: gouwu
      },
      {
        path: '/soundBook',
        component: () => import('@/view/soundBook')
      },
      {
        path: '/tag',
        component: tag
      },
      {
        path: '/demo',
        component: demo
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
