import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.scss'
import Toast, { POSITION, PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const vueApp = createApp(App)
vueApp.use(router)
vueApp.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000
} as PluginOptions )
vueApp.config.errorHandler = (err, vm, info) => {
    console.log(err, vm, info)
}

vueApp.mount('#app')