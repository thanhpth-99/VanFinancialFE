import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import i18n from './lang'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
