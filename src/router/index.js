import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import MyComputers from '../views/MyComputers.vue'
import DashboardComputer from '../views/DashboardComputer.vue'
import DashboardCompany from '../views/DashboardCompany.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true},
  },
  {
    path: '/mycomputers',
    name: 'MyComputers',
    component: MyComputers,
    meta: { requiresAuth: true},
  },
  {
    path: '/dashboard/computer',
    name: 'DashboardComputer',
    component: DashboardComputer,
    meta: { requiresAuth: true},
  },
  {
    path: '/dashboard/company',
    name: 'DashboardCompany',
    component: DashboardCompany,
    meta: { requiresAuth: true},
  },
  {
    path: '*',
    redirect: '/login'
  },
]

const router = new VueRouter({
  routes
})

export default router
