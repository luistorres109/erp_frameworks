import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuth } from '@/stores/auth.js';

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
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = to.meta?.auth;
  const isAuthenticated = await verify();
  console.log({ isAuthenticated })
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
