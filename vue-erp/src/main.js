import "bootstrap/dist/css/bootstrap.min.css"
import 'vue3-toastify/dist/index.css';
import { updateGlobalOptions } from "vue3-toastify";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

createApp(App)
   .use(createPinia())
   .use(updateGlobalOptions({ theme: 'colored' }))
   .use(router)
   .mount('#app');

import "bootstrap/dist/js/bootstrap.js"
