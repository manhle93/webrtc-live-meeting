import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/index')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Layout/Layout'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component:() => import('../pages/Home/index')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
