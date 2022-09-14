import { createApp } from 'vue'
import './css/index.css'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
