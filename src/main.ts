import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.scss'
import Toast, { POSITION, PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import i18njson from '@/common/i18n.json'
import { createI18n } from 'vue-i18n'

const vueApp = createApp(App)

vueApp.use(router)
vueApp.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000
} as PluginOptions)
const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'en',
    messages: i18njson
})

vueApp.use(i18n)

vueApp.config.errorHandler = (err, vm, info) => {
    console.log(err, vm, info)
}

vueApp.mount('#app')