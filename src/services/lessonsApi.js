class ApiLesson {
  constructor() {
    this.cache = new Map()
    this.basePath = import.meta.env.BASE_URL || '/'
    console.log('🔄 ApiLesson инициализирован. Base path:', this.basePath)
  }

  async getLesson(technology, slug) {
    const cacheKey = `${technology}/${slug}`
    
    if (this.cache.has(cacheKey)) {
      console.log('📦 Из кэша:', cacheKey)
      return this.cache.get(cacheKey)
    }
    
    try {
      // ⬇️ ИСПРАВЛЕНО: Добавляем basePath
      const url = `${this.basePath}data/lessons/${technology}/${slug}.json`
      console.log('🌐 Полный URL урока:', url)
      console.log('🌐 Technology:', technology)
      console.log('🌐 Slug:', slug)
      console.log('🌐 Base path:', this.basePath)
      
      const response = await fetch(url)
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      if (!response.ok) {
        const text = await response.text()
        console.error('📡 Response body:', text)
        throw new Error(`Урок не найден: ${slug} (status: ${response.status})`)
      }
      
      const data = await response.json()
      this.cache.set(cacheKey, data)
      
      console.log('✅ Урок загружен:', data.title)
      return data
    } catch (error) {
      console.error('❌ Ошибка загрузки урока:', error)
      console.error('❌ Error stack:', error.stack)
      
      // Fallback: возвращаем заглушку
      return {
        title: `Урок ${slug}`,
        content: `<p>Содержание урока временно недоступно. Попробуйте позже.</p>`,
        slug: slug
      }
    }
  }

  async getTopics(technology) {
    try {
      // ⬇️ ИСПРАВЛЕНО: Добавляем basePath
      const url = `${this.basePath}data/topics.json`
      console.log('🌐 Загрузка topics.json по URL:', url)
      
      const response = await fetch(url)

      // Сначала проверяем статус
      if (!response.ok) {
        const text = await response.text()
        console.error('📡 Response body:', text.substring(0, 200))
        throw new Error(`Не удалось загрузить topics.json (status: ${response.status})`)
      }
      
      const data = await response.json()
      console.log('✅ Topics загружены. Данные для', technology + ':', data[technology])

      return data[technology] || []
    } catch (error) {
      console.error('❌ Ошибка загрузки тем:', error)
      console.error('❌ Error stack:', error.stack)
      
      // Fallback: возвращаем тестовые данные
      return this.getFallbackTopics(technology)
    }
  }

  async allLessons(technology) {
    try {
      // ⬇️ ИСПРАВЛЕНО: Добавляем basePath
      const url = `${this.basePath}data/topics.json`
      console.log('🌐 Запрос к:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📦 Полученные данные:', data)
      
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const techKey = technology.toLowerCase()
        console.log(`🔍 Ищем уроки для ключа: "${techKey}"`)
        
        const lessons = data[techKey] || []
        console.log(`📚 Найдено уроков: ${lessons.length}`)
        return lessons
      }
      
      return []
    } catch (error) {
      console.error('❌ Ошибка в allLessons:', error)
      return this.getFallbackTopics(technology)
    }
  }

  // Fallback данные на случай ошибок
  getFallbackTopics(technology) {
    console.log('🔄 Использую fallback данные для', technology)
    
    const fallbackData = {
      html: [
        { slug: 'vvedenie', title: 'Введение в HTML', description: 'Основы HTML' },
        { slug: 'tegi', title: 'Теги и атрибуты', description: 'Работа с тегами' }
      ],
      css: [
        { slug: 'osnovy', title: 'Основы CSS', description: 'Синтаксис CSS' },
        { slug: 'selektory', title: 'Селекторы', description: 'Виды селекторов' }
      ],
      javascript: [
        { slug: 'peremennye', title: 'Переменные', description: 'let, const, var' },
        { slug: 'funkcii', title: 'Функции', description: 'Объявление функций' }
      ]
    }
    
    return fallbackData[technology.toLowerCase()] || []
  }

  clearCache() {
    this.cache.clear()
    console.log('🗑️ Кэш очищен')
  }
}

export const lessonsApi = new ApiLesson()