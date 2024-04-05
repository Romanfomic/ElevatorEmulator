
import VueCookies from 'vue-cookies'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(VueCookies, {expires: '1d'}).mount('#app')
