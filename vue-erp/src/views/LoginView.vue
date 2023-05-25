<template>
  <main id="container">
    <div id="paper">
      <div id="titulo-container">
        <h2>ERP</h2>
        <h2>LOGIN</h2>
      </div>
      <div id="form-login">
        <form @submit.prevent="login">
          <div class="form-floating mb-3">
            <input v-model="user.login" type="text" class="form-control" id="login" :disabled="isLoading">
            <label for="login">Login</label>
          </div>
          <div class="form-floating">
            <input v-model="user.password" type="password" class="form-control" id="senha" :disabled="isLoading">
            <label for="senha">Password</label>
          </div>
          <button type="submit" class="btn btn-primary mt-2" :disabled="isLoading">
            Login
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<script setup>

import http from '@/services/http.js';
import { reactive, ref } from 'vue';
import { useAuth } from '@/stores/auth.js';
import router from '@/router/index.js';
import { toast } from 'vue3-toastify';

const auth = useAuth();

const user = reactive({
  login: '',
  password: ''
})

let isLoading = ref(false);

async function login() {
  isLoading.value = true;
  try {
    const { data } = await http.post('/login', {}, { auth: { username: user.login, password: user.password } });
    auth.setToken(data.token);
    router.replace({ name: 'dashboard' })
  } catch (error) {
    const msg = error?.response?.data?.msg;
    toast.error(msg ? msg : "Erro ao autenticar", {
      position: 'bottom-right'
    })
  }
  isLoading.value = false;
}
</script>

<style>
#container {
  background-color: lightgray;
  width: 100vw;
  height: 100vh;
  display: flex;
}

#paper {
  background-color: beige;
  width: 25%;
  height: 80%;
  margin: auto;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  padding: 5em 4em;
}

#titulo-container {
  flex: 1;
  text-align: center;
}

#titulo-container h2 {
  font-size: 2.5em;
  font-family: 'Arial';
  font-weight: 900;
}

#form-login {
  flex: 2;
  padding-top: 5em;
}

#form-login form {
  display: flex;
  flex-direction: column;
}
</style>