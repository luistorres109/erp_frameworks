import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/home.vue')
    // },
    {
      path: '/user/login',
      name: 'Login',
      component: () => import('../views/user/login.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      // component: () => import('../views/dashboard')
    },
    {
      path: '/user',
      name: 'Usuário',
      // component: () => import('../views/user/user.vue')
    },
    {
      path: '/user/:uuid',
      name: 'Usuário',
      // component: () => import('../views/user/userEdit.vue')
    },
    {
      path: '/product',
      name: 'Produto',
      // component: () => import('../views/product/product.vue')
    },
    {
      path: '/product/:uuid',
      name: 'Produto',
      // component: () => import('../views/product/productEdit.vue')
    },
    {
      path: '/client ',
      name: 'Cliente ',
      // component: () => import('../views/client/client.vue')
    },
    {
      path: '/client/:uuid',
      name: 'Cliente',
      // component: () => import('../views/client/clientEdit.vue')
    },
    {
      path: '/orders ',
      name: 'Pedidos',
      // component: () => import('../views/orders/orders.vue')
    },
    {
      path: '/orders/:uuid',
      name: 'Pedidos',
      // component: () => import('../views/orders/ordersView.vue')
    },
    {
      path: '/report',
      name: 'Relatórios',
      // component: () => import('../views/report/report.vue')
    },
    {
      path: '/report/orders',
      name: 'Relatórios de pedidos',
      // component: () => import('../views//report/orders.vue')
    },
    {
      path: '/report/client',
      name: 'Relatório de clientes',
      // component: () => import('../views//report/orders.vue')
    }


  ]
})

export default router
