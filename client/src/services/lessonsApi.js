class ApiLesson {
  constructor() {
    this.cache = new Map()
    this.basePath = this.detectBasePath()
    console.log('📍 Base path:', this.basePath, '(is GitHub:', this.isGitHubPages(), ')')
  }

  isGitHubPages() {
    return window.location.hostname.includes('github.io')
  }

  detectBasePath() {
    if (this.isGitHubPages()) {
      const path = window.location.pathname
      const match = path.match(/^\/([^\/]+)\//)
      return match ? `/${match[1]}/` : '/BudaLearn/'
    }
    return import.meta.env.BASE_URL || '/'
  }

  async getLesson(technology, slug) {
    const cacheKey = `${technology}/${slug}`
    


    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }
    
    try {
      const tech = technology.toLowerCase()
      const url = `${this.basePath}data/lessons/${tech}/${slug}.json`
      
      console.log('🌐 Fetch:', url, '(GitHub:', this.isGitHubPages(), ')')
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`)
      }
      
      const data = await response.json()
      this.cache.set(cacheKey, data)
      return data
      
    } catch (error) {
      console.error('❌ Fetch failed:', technology, slug, error.message)
      
      // Fallback для GitHub Pages
      if (this.isGitHubPages()) {
        const fallbackUrl = `/BudaLearn/data/lessons/${technology}/${slug}.json`
        console.log('🔄 Trying fallback URL:', fallbackUrl)
        try {
          const response = await fetch(fallbackUrl)
          if (response.ok) {
            return await response.json()
          }
        } catch (e) {
          console.error('❌ Fallback also failed')
        }
      }
      
      return {
        title: `Урок ${slug}`,
        content: `<p>Урок временно недоступен</p>`,
        slug: slug
      }
    }
  }

  async getTopics(technology) {
    try {
      const url = `${this.basePath}data/topics.json`
      console.log('📋 Loading topics from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        // Fallback для GitHub Pages
        if (this.isGitHubPages()) {
          const fallbackUrl = `/BudaLearn/data/topics.json`
          console.log('🔄 Trying fallback topics URL:', fallbackUrl)
          const fallbackResponse = await fetch(fallbackUrl)
          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json()
            return data[technology.toLowerCase()] || []
          }
        }
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      return data[technology.toLowerCase()] || []
      
    } catch (error) {
      console.error('❌ Topics error:', error)
      return []
    }
  }
}

export const lessonsApi = new ApiLesson()