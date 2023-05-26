<template>
  <div class="container container-sm" id="login">
    <div class="card mt-4 card-margin">
      <div class="card-body">
        <h2 class="text-center">ERP LOGIN</h2>
        <form class="m-3" @submit.prevent="login">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Login</label>
            <input v-model="user.login" type="text" class="form-control" id="exampleInputEmail1" :disabled="isLoading">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Senha</label>
            <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1"
              :disabled="isLoading">
          </div>
          <!-- <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
          </div> -->
          <button type="submit" class="btn btn-primary">Logar</button>
        </form>
      </div>
    </div>
  </div>
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

<style scoped>

@media (min-width: 768px) {
  #login {
    width: 50vw;
  }
}
@media (min-width: 1024px) {
  #login {
    width: 40vw;
  }
}
@media (min-width: 1200px) {
  #login {
    width: 30vw;
  }
}


/*
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
} */
</style>