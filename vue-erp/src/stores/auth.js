import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/services/http.js';

export const useAuth = defineStore('auth', () => {

  const token = ref(localStorage.getItem("token"));

  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  const isAuthenticated = computed(() => {
    return token.value;
  })

  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
      http.defaults.headers.Authorization = tokenAuth;
      const { data } = await http.get("/login/verify");
      return true;
    } catch (error) {
      return false;
    }
  }

  function clear() {
    localStorage.removeItem('token');
    token.value = '';
  }

  return {
    token,
    setToken,
    checkToken,
    isAuthenticated,
    clear
  }

})
