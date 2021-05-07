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
    component: Account
  },
  {
    path: '/mycomputers',
    name: 'MyComputers',
    component: MyComputers
  },
  {
    path: '/dashboard/computer',
    name: 'DashboardComputer',
    component: DashboardComputer
  },
  {
    path: '/dashboard/company',
    name: 'DashboardCompany',
    component: DashboardCompany
  }
]

const router = new VueRouter({
  routes
})

export default router
