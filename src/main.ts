import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/axios'
import '@/access'
// Arco Design
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import 'bytemd/dist/index.css';
createApp(App)
.use(store)
.use(router)
.use(ArcoVue)
.mount('#app')