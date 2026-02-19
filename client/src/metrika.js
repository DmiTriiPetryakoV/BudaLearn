export default {
  install(app, options) {
    // Проверяем что мы в браузере
    if (typeof window === 'undefined') return
    
    const { id, router } = options
    
    // Загрузка скрипта Яндекс.Метрики
    const script = document.createElement('script')
    script.src = 'https://mc.yandex.ru/metrika/tag.js'
    script.async = true
    document.head.appendChild(script)
    
    // Инициализируем очередь
    window.ym = window.ym || function() {
      (window.ym.a = window.ym.a || []).push(arguments)
    }
    window.ym.l = new Date()
    
    // Инициализация счетчика
    window.ym(id, 'init', {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    })
    
    // Noscript для SEO
    const noscript = document.createElement('noscript')
    const image = document.createElement('img')
    image.src = `https://mc.yandex.ru/watch/${id}`
    image.style.position = 'absolute'
    image.style.left = '-9999px'
    image.alt = ''
    noscript.appendChild(image)
    document.body.appendChild(noscript)
    
    // Отслеживание переходов в роутере
    if (router) {
      router.afterEach((to) => {
        if (window.ym) {
          window.ym(id, 'hit', to.fullPath)
        }
      })
    }
    
    // Добавляем глобальную функцию для использования в компонентах
    app.config.globalProperties.$ym = (goalName, params) => {
      if (window.ym) {
        if (params) {
          window.ym(id, 'reachGoal', goalName, params)
        } else {
          window.ym(id, 'reachGoal', goalName)
        }
      }
    }
  }
}