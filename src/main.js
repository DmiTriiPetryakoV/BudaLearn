import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import metrika from './metrika'  // путь к твоему плагину

import './style.css'
import App from './App.vue'

const app = createApp(App)

// Подключаем Яндекс.Метрику только на продакшене
if (import.meta.env.PROD) {  // для Vite
// if (process.env.NODE_ENV === 'production') {  // для Vue CLI
  app.use(metrika, {
    id: 12345678,  // СЮДА ВСТАВЬ СВОЙ ID ИЗ ЯНДЕКС.МЕТРИКИ
    router: router
  })
}

app.use(createPinia())
app.use(router)
app.mount('#app')