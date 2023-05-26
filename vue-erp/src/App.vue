<template>
  <NavBar v-show="auth.isAuthenticated" />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';

const auth = useAuth();
const router = useRouter();

function logout() {
  auth.clear();
  router.push({ name: 'login' });
}
</script>

