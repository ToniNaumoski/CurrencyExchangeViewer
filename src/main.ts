import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify' 
import en from './locales/en'
import mk from './locales/mk'
import { createI18n } from 'vue-i18n'
import '@mdi/font/css/materialdesignicons.css' 
const i18n = createI18n({
    legacy: false,
    locale: 'en-US', // Set English as default
    fallbackLocale: 'en-US', // Fallback to English
    messages: {
      'en-US': en,
      'mk-MK': mk
    }
  })
const app = createApp(App);
app.use(store);
app.use(vuetify); 
app.use(i18n)
app.mount('#app');

