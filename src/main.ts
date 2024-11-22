import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import './assets/fonts/font.css'
import store from "./stores/index.js"
import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App).use(store).mount('#app')
