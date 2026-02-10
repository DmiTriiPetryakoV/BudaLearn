class ApiLesson {
  constructor() {
    this.cache = new Map()
  }

  async getLesson(technology, slug) {
    const cacheKey = `${technology}/${slug}`
    
    if (this.cache.has(cacheKey)) {
      console.log('📦 Из кэша:', cacheKey)
      return this.cache.get(cacheKey)
    }
    
    try {
      const url = `/data/lessons/${technology}/${slug}.json`
      console.log('🌐 Полный URL урока:', url)
      console.log('🌐 Technology:', technology)
      console.log('🌐 Slug:', slug)
      
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
      throw error
    }
  }

  async getTopics(technology) {
    try {
      const url = '/data/topics.json'
      const response = await fetch(url)

      const data = await response.json()


      if (!response.ok) {
        const text = await response.text()
        console.error('📡 Response body:', text.substring(0, 200))
        throw new Error(`Не удалось загрузить topics.json (status: ${response.status})`)
      }
      
      return data[technology] || []
    } catch (error) {
      console.error('❌ Ошибка загрузки тем:', error)
      console.error('❌ Error stack:', error.stack)
      throw error
    }
  }
async allLessons(technology) {
  try {
    const url = '/data/topics.json'
    console.log('🌐 Запрос к:', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    console.log('📦 Полученные данные:', data)
    console.log('🔍 Тип данных:', typeof data)
    console.log('🔍 Это массив?', Array.isArray(data))
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      console.log('📋 Ключи в объекте:', Object.keys(data))
      const techKey = technology.toLowerCase()
      console.log(`🔍 Ищем уроки для ключа: "${techKey}"`)
      
      const lessons = data[techKey] || []
      console.log(`📚 Найдено уроков: ${lessons.length}`)
      return lessons
    }
    if (Array.isArray(data)) {
      console.log('📋 Фильтруем массив из', data.length, 'элементов')
      
      if (data.length > 0) {
        console.log('📄 Пример элемента:', data[0])
      }
      return data.filter(lesson => lesson.tech === technology)
    }
    console.error('❌ Неизвестный формат данных')
    return []
    
  } catch (error) {
    console.error('❌ Ошибка в allLessons:', error)
    return []
  }
}

  clearCache() {
    this.cache.clear()
    console.log('🗑️ Кэш очищен')
  }
}

export const lessonsApi = new ApiLesson()