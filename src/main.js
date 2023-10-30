import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/main.scss'
import { languages } from './i18n'
import { defaultLocale } from './i18n'
import mixpanel from "@/plugins/mixpanel";
import { createI18n } from 'vue-i18n'
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

const messages = Object.assign(languages)

const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'ru',
    messages
})

createApp(App).use(store).use(router).use(i18n).use(mixpanel).use(Vue3VideoPlayer, {
    lang: 'ru-RU'
  }).mount('#app')
