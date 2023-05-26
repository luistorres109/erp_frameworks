<template>
   <nav class="navbar  navbar-expand-lg bg-light" style="background-color: #e3f2fd;">
      <div class="container-fluid">
         <a class="navbar-brand" style="font-weight: 600; font-family: 'Arial'; font-size: 2vw;">E R P</a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               <li class="nav-item">
                  <router-link :to="{ name: 'dashboard' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Dashboard</a>
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link :to="{ name: 'product' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Product</a>
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link :to="{ name: 'customers' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Customers</a>
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link :to="{ name: 'users' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Users</a>
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link :to="{ name: 'orders' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Orders</a>
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link :to="{ name: 'report' }" custom v-slot="{ isActive, href, navigate }">
                     <a class="nav-link" :href="href" @click="navigate" :class="isActive ? 'active' : ''">Reports</a>
                  </router-link>
               </li>
            </ul>
            <div class="d-flex">
               <button type="button" class="btn btn-secondary" @click="logout">Logout</button>
            </div>
         </div>
      </div>
   </nav>
</template>

<script setup>
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

function logout() {
   auth.clear();
   router.push({ name: 'login' });
}
</script>

<style>
.active {
   font-weight: 600;
}
</style>