<template>
  <div class="lesson-container" v-if="currentLesson">
    <div v-if="loading" class="loading">
      <p>Загрузка урока...</p>
    </div>
    <div v-else-if="error" class="error">
      <h2>Ошибка</h2>
      <p>{{ error }}</p>
      <button @click="GetInfo">Попробовать снова</button>
    </div>
    <div v-else-if="data" class="box-info">
      <h1>Изучаем:{{technology}}</h1>
      <div class="title-box">
        <h2>{{ data.title }} </h2>
        <li class="far fa-clock"></li> {{data.time}} минут
        <p>{{ data.description }}</p>
      </div>
      
      <div class="lesson-content">
        <h3>Что вы узнаете:</h3>
        <ul>
          <li v-for="point in data.points" :key="point">{{ point }}</li>
        </ul>
      </div>
      
      <div class="theory-section">
        <h3 class="theory-title">Теория</h3>
        <div class="theory-content" v-html="formatTheory(data.theory)"></div>
      </div>
      
      <div class="box-btn">
        <button class="btn-back" @click="router.go(-1)">
          Назад
        </button>
        <button class="btn-back" id="next-theme" 
                @click="goToNextLesson()" 
              
                :disabled="!nextLesson">
          Следующая Тема
        </button>
      </div>
    </div>
    <button class="btn-heigth" @click="goTop()">
      <i :class="isBotBtn ? 'fas fa-arrow-down' : 'fas fa-arrow-up'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessonsApi } from '../../services/lessonsApi'
import { useNameTechnology } from '@/store/nameTechnology'




const route = useRoute()
const router = useRouter()
const data = ref(null)
const loading = ref(false)
const error = ref(null)
const nextLesson = ref(true)
const isBotBtn = ref(false)

const time = ref(15)

const technology = computed(() => {
  const path = route.path
  if (path.includes('/javascript/')) return 'JavaScript'
  if (path.includes('/css/')) return 'Css'
  if (path.includes('/html/')) return 'Html'
  return 'JavaScript'
})

const basePath = computed(() => {
  const path = route.path
  if (path.includes('/javascript/')) return '/javascript'
  if (path.includes('/css/')) return '/css'
  if (path.includes('/html/')) return '/html'
  return '/javascript'
})

const currentLesson = computed(() => route.params.slug)

async function GetInfo() {
  loading.value = true
  error.value = null
  data.value = null
  
  try {
    const slug = route.path.split('/').pop() 
    
    if (!slug) {
      throw new Error(`Урок не найден: ${slug}`)
    }
    
    const next = await nextLessons(technology.value, slug)
    nextLesson.value = next
    const dataJson = await lessonsApi.getLesson(technology.value, slug)
    data.value = dataJson
    
    await nextTick()
    handleScroll()
  } catch (err) { 
    console.error('❌ Ошибка:', err)
    error.value = err.message
    nextLesson.value = null
  } finally {
    loading.value = false
  }
}

async function nextLessons(technology, currentSlug) {
  try {
    const allLesson = await lessonsApi.getTopics(technology)
    const currentIndex = allLesson.findIndex(lesson => lesson.slug === currentSlug)
    
    if (currentIndex !== -1 && currentIndex < allLesson.length - 1) {
      return allLesson[currentIndex + 1]
    }
    return null 
  } catch(error) {
    console.error('Ошибка в nextLessons:', error)
    return null
  }
}

function goToNextLesson() {
  if (!nextLesson.value?.slug) return
  
  const newPath = `${basePath.value}/${nextLesson.value.slug}`
  router.push(newPath)
}

function formatTheory(text) {
  if (!text) return '';
  
  return text
    .replace(/^# (.*$)/gm, '<h1 class="theory-h1">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="theory-h2">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="theory-h3">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="theory-h4">$1</h4>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<div class="code-block"><span class="lang-label">$1</span><pre><code>$2</code></pre></div>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="theory-list">$1</ul>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^-{3,}$/gm, '<hr class="theory-hr">')
    .replace(/^> (.*$)/gm, '<blockquote class="theory-quote">$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="theory-link" target="_blank">$1</a>')
    .replace(/\n\n/g, '</p><p class="theory-paragraph">')
    .replace(/^\s*([^\n]+)(?=\n|$)/gm, '<p class="theory-paragraph">$1</p>')
    .replace(/<\/p><p class="theory-paragraph"><\/p>/g, '')
    .replace(/<p class="theory-paragraph"><\/p>/g, '')
}

function handleScroll() {
  const scrollY = window.scrollY
  const pageHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight
  const maxScroll = pageHeight - viewportHeight
  
  if (maxScroll <= 0) {
    isBotBtn.value = false
    return
  }
  
  const halfPage = maxScroll / 2
  isBotBtn.value = scrollY < halfPage
}

function goTop() {
  const target = isBotBtn.value ? document.documentElement.scrollHeight : 0
  
  window.scrollTo({
    top: target,
    behavior: 'smooth'
  })
}

onMounted(() => { 
  GetInfo()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.path, () => {
  GetInfo()
})
</script>

<style scoped>
.lesson-container {
  min-width:60vw;
  max-width:65vw;
  margin: 0 auto;
  padding: 1.25rem;
  background: var(--Background);
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  overflow-x: hidden;
  box-sizing: border-box;
  color: var(--Text);
  text-align:center;
}

.box-info {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;
}

.title-box {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.title-box h2 {
  font-size: 1.75rem;
  color: var(--Text);
  margin-bottom: 0.25rem;
  word-wrap: break-word;
  line-height: 1.2;
}

.title-box p {
  font-size: 1rem;
  color: var(--Text-Secondary);
  margin: 0;
  opacity: 0.9;
}

.lesson-content {
  width: 100%;
  max-width: 100%;
  height: auto;
  background: var(--Card-Background);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.5rem;
  
}

.lesson-content h3 {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
  color: var(--Text);
}

.lesson-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap:1rem;
}

.lesson-content li {
  padding: 0.8rem 0.75rem;
  background: var(--Background);
  border-radius: 6px;
  position: relative;
  padding-left: 2rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border:2px solid var(--Primary);
  display:flex;
  justify-content:center;
  align-items:center;
}

.lesson-content li:hover {
  transform: translateX(5px);
  background: var(--Hover-Background);
}

.lesson-content li::before {
  content: '✓';
  position: absolute;
  left: 0.75rem;
  color: var(--Primary);
  font-weight: bold;
  font-size: 1rem;
}

.theory-section {
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}

.theory-title {
  font-size: 1.5rem;
  color: var(--Text);
  margin-bottom: 1rem;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid var(--Primary);
}

.box-btn {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--Border);
}

.btn-back {
  padding: 0.75rem 1.5rem;
  background: var(--Primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  color: var(--Button-Text);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

.btn-back:hover:not(:disabled) {
  background: var(--Primary-Hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-back:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#next-theme {
  background: var(--Secondary);
}

#next-theme:hover:not(:disabled) {
  background: var(--Secondary-Hover);
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.error {
  background: var(--Error-Background);
  padding: 1.5rem;
  border-radius: 8px;
  color: var(--Error-Text);
  max-width: 600px;
  margin: 0 auto;
}

.error button {
  margin-top: 0.75rem;
  padding: 0.6rem 1.25rem;
  background: var(--Error-Text);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.error button:hover {
  opacity: 0.9;
}
</style>

<style>
.theory-content {
  width: 100%;
  max-width: 100%;
  line-height: 1.6;
  font-size: 1rem;
  color: var(--Text);
}

.theory-content > * {
  margin: 1rem 0;
}

.theory-h1 {
  font-size: 1.65rem;
  color: var(--Text);
  margin: 1.25rem 0 0.75rem 0;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid var(--Primary);
  font-weight: 700;
  line-height: 1.3;
}

.theory-h2 {
  font-size: 1.4rem;
  color: var(--Text);
  margin: 1.15rem 0 0.6rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--Primary);
  font-weight: 600;
  line-height: 1.35;
}

.theory-h3 {
  font-size: 1.2rem;
  color: var(--Text);
  margin: 1rem 0 0.5rem 0;
  font-weight: 600;
  line-height: 1.35;
}

.theory-h4 {
  font-size: 1.05rem;
  color: var(--Text-Secondary);
  margin: 0.9rem 0 0.4rem 0;
  font-weight: 600;
  line-height: 1.35;
}

.theory-paragraph {
  margin: 0.75rem 0;
  text-align: justify;
  word-wrap: break-word;
  line-height: 1.6;
}

.theory-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: none;
}

.theory-list li {
  margin: 0.5rem 0;
  padding-left: 0.75rem;
  position: relative;
  line-height: 1.5;
}

.theory-list li::before {
  content: '•';
  color: var(--Primary);
  font-weight: bold;
  position: absolute;
  left: -1rem;
  font-size: 1.1rem;
}

.inline-code {
  background: linear-gradient(135deg, var(--Code-Background) 0%, var(--Code-Background-Dark) 100%);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--Code-Text);
  border: 1px solid var(--Code-Border);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
  word-break: break-word;
  white-space: pre-wrap;
}

.code-block {
  background: linear-gradient(135deg, var(--Code-Block-Background) 0%, #2d2d2d 100%);
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid #404040;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  max-width: 100%;
}

.code-block .lang-label {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--Primary);
  color: var(--Button-Text);
  padding: 0.25rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 0 8px 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block pre {
  margin: 0;
  padding: 0;
  background: transparent;
  overflow-x: auto;
}

.code-block code {
  background: transparent;
  color: inherit;
  padding: 0;
  border: none;
  box-shadow: none;
  font-family: 'JetBrains Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.4;
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
}

.theory-quote {
  border-left: 3px solid var(--Primary);
  margin: 1.25rem 0;
  padding: 1rem 1.5rem;
  background: var(--Quote-Background);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: var(--Text-Secondary);
  position: relative;
}

.theory-quote::before {
  content: '"';
  font-size: 2.5rem;
  color: var(--Primary);
  opacity: 0.25;
  position: absolute;
  left: 0.75rem;
  top: 0.25rem;
}

.theory-link {
  color: var(--Link-Color);
  text-decoration: none;
  border-bottom: 1px dashed var(--Link-Color);
  padding-bottom: 1px;
  transition: all 0.3s ease;
}

.theory-link:hover {
  color: var(--Link-Hover);
  border-bottom: 2px solid var(--Link-Hover);
  text-decoration: none;
}

.theory-hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--Primary), transparent);
  margin: 2rem 0;
}

.theory-content strong {
  color: var(--Accent);
  font-weight: 700;
}

.theory-content em {
  color: var(--Text-Secondary);
  font-style: italic;
}
.btn-heigth {
  padding: 1.2rem;
  width:4rem;
  border-radius: 50%;
  border: none;
  background: var(--Primary);
  font-size: 1.5rem;
  color: var(--Text);
  position:fixed;
  bottom: 20px;  
  z-index:9999;
  right: 20px;
  margin-right:20px;
  cursor:pointer;
  transition:0.3s ease all;
}
.boxBtn{
  transform:rotate(180deg);
}
@media (max-width: 768px) {
  .lesson-container {
    padding: 0.75rem;
    max-width:90vw !important;
  }
  
  .title-box h2 {
    font-size: 1.5rem;
  }
  .btn-heigth{
    padding:1.2rem;
    width:3.8rem;
    right:5px;
  }
  .theory-h1 {
    font-size: 1.4rem;
  }
  
  .theory-h2 {
    font-size: 1.2rem;
  }
  
  .theory-h3 {
    font-size: 1.05rem;
  }
  
  .lesson-content ul {
    grid-template-columns: 1fr;
  }
  
  .box-btn {
    grid-template-columns: 1fr;
  }
  
  .btn-back {
    width: 100%;
  }
  
  .code-block {
    padding: 0.75rem;
    font-size: 0.85em;
  }
}
@media (max-width: 378px) {
  .lesson-container {
    padding: 0.75rem;
    min-width: 90vw;
    max-width: 95vw !important; 
  }
  .title-box h2 {
    font-size: 1.5rem;
  }
  
  .theory-h1 {
    font-size: 1.4rem;
  }
  
  .theory-h2 {
    font-size: 1.2rem;
  }
  
  .theory-h3 {
    font-size: 1.05rem;
  }
  
  .lesson-content ul {
    grid-template-columns: 1fr;
  }
  
  .box-btn {
    grid-template-columns: 1fr;
  }
  
  .btn-back {
    width: 100%;
  }
  
  .code-block {
    padding: 0.75rem;
    font-size: 0.85em;
  }
}
</style>