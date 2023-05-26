import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth.js';
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductView from '@/views/ProductView.vue'
import CustomersView from '@/views/CustomersView.vue'
import OdersView from '@/views/OdersView.vue'
import ReportsView from '@/views/ReportsView.vue'
import UsersView from '@/views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        auth: true
      }
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
      meta: {
        auth: true
      }
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView,
      meta: {
        auth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: {
        auth: true
      }
    },
    {
      path: '/users/:uuid',
      name: 'usersEdit',
      component: UsersView,
      meta: {
        auth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OdersView,
      meta: {
        auth: true
      }
    },
    {
      path: '/report',
      name: 'report',
      component: ReportsView,
      meta: {
        auth: true
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.name == undefined) {
    return next({ name: "login" });
  }
  const auth = to.meta?.auth;
  const isAuthenticated = await verify();
  if (auth) {
    if (isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (to.name == "login" && isAuthenticated) {
      next({ name: "dashboard" })
    } else {
      next();
    }
  }
});

async function verify() {
  const auth = useAuth();
  if (auth.token) {
    return await auth.checkToken();
  } else {
    return false;
  }
}

export default router;
