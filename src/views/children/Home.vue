<template>
  <!-- Основная страница -->
  <div class="home-container" ref="homeContainer">
    <div class="floating-background">
      <div 
        class="code-element" 
        v-for="(element, index) in floatingElements" 
        :key="index"
        :style="element.style"
      >
        {{ element.text }}
      </div>
    </div>
    
    <div class="content">
      <div class="info">
        <h1 class="message">{{message}} <span class="name">{{name}}</span></h1>
        <p class="text">Начни свой путь в разработке</p>
      </div>
      
      <div class="list">
        <div class="column-left">
          <ul class="mega-list">
            <li>Освой востребованные навыки в веб-разработке</li>
            <li>Практическое обучение с реальными проектами</li>
            <li>Интерактивные уроки для быстрого старта в IT</li>
          </ul>
        </div>
        
        <div class="column-right">
          <ul class="mega-list">
            <li>Создавай сайты и приложения с нуля</li>
            <li>Обучение через практику и решение задач</li>
            <li>Поддержка на каждом этапе обучения</li>
          </ul>
        </div>
      </div>
      
      <div class="button-container">
        <button class="btn-down" @click="scrollToTechnologies">
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="technologies-container" ref="techContainer">
    <div class="tech-background">
      <div class="tech-code-element" v-for="(el, idx) in techElements" :key="idx" :style="el.style">
        {{ el.text }}
      </div>
    </div>
    
    <div class="technologies-content">
      <div class="tech-header">
        <h2 class="tech-title">
          Технологии <span class="tech-highlight">для изучения</span>
        </h2>
        <p class="tech-subtitle">Выбери технологию, с которой хочешь начать</p>
      </div>

      <div class="tech-grid">
        <router-link to="/html" class="tech-card router-card">
          <div class="tech-icon" style="background: var(--Gradient-Primary)">
            <i class="fab fa-html5"></i>
          </div>
          <div class="tech-info">
            <h3 class="tech-name">HTML</h3>
            <p class="tech-description">
              Язык разметки для создания структуры веб-страниц
            </p>
            <div class="tech-features">
              <span class="feature-tag">Структура</span>
              <span class="feature-tag">Семантика</span>
              <span class="feature-tag">SEO</span>
            </div>
            <div class="router-indicator">
              <span class="router-text">Изучить</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>

        <router-link to="/css" class="tech-card router-card">
          <div class="tech-icon" style="background: var(--Gradient-Secondary)">
            <i class="fab fa-css3-alt"></i>
          </div>
          <div class="tech-info">
            <h3 class="tech-name">CSS</h3>
            <p class="tech-description">
              Язык стилей для оформления и анимации веб-страниц
            </p>
            <div class="tech-features">
              <span class="feature-tag">Стилизация</span>
              <span class="feature-tag">Анимации</span>
              <span class="feature-tag">Адаптивность</span>
            </div>
            <div class="router-indicator">
              <span class="router-text">Изучить</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>

        <router-link to="/javascript" class="tech-card router-card">
          <div class="tech-icon" style="background: linear-gradient(135deg, #F7DF1E, #D4BB0F)">
            <i class="fab fa-js-square"></i>
          </div>
          <div class="tech-info">
            <h3 class="tech-name">JavaScript</h3>
            <p class="tech-description">
              Язык программирования для интерактивных веб-страниц
            </p>
            <div class="tech-features">
              <span class="feature-tag">Интерактивность</span>
              <span class="feature-tag">Логика</span>
              <span class="feature-tag">API</span>
            </div>
            <div class="router-indicator">
              <span class="router-text">Изучить</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>
      </div>

      <div class="tech-info-section">
        <div class="info-card">
          <i class="fas fa-layer-group info-icon"></i>
          <h4>Постепенное обучение</h4>
          <p>Начни с основ и постепенно переходи к сложным темам</p>
        </div>
        <div class="info-card">
          <i class="fas fa-code info-icon"></i>
          <h4>Практические примеры</h4>
          <p>Сразу применяй знания на реальных примерах и проектах</p>
        </div>
        <div class="info-card">
          <i class="fas fa-project-diagram info-icon"></i>
          <h4>Современные технологии</h4>
          <p>Изучай актуальные инструменты и лучшие практики</p>
        </div>
      </div>

      <button class="btn-back" @click="scrollToTop">
        <i class="fas fa-arrow-up"></i> На главную
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '@/api'
const name = ref('BudaLearn')
const message = ref('Добро пожаловать в ')
const floatingElements = ref([])
const techElements = ref([])
const homeContainer = ref(null)
const techContainer = ref(null)

const createFloatingElements = () => {
  const elements = []
  const texts = ['<div>', 'const', 'function', '{}', '=>', 'return', 'async', 'await', 'class', 'import', 'BudaLearn', 'Promise', 'OOP', 'Display', 'Position', 'HTML', 'CSS', 'JS', 'Vue', 'React', 'Node', 'API', 'Git', 'npm', 'JSON', 'DOM', 'Fetch', 'Array', 'Object']
  
  for (let i = 0; i < 30; i++) {
    elements.push({
      text: texts[i % texts.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 20 + 14}px`,
        opacity: Math.random() * 0.2 + 0.1
      }
    })
  }
  
  floatingElements.value = elements
}

const createTechElements = () => {
  const elements = []
  const texts = ['HTML', 'CSS', 'JS', 'div', 'span', 'class', 'id', 'style', 'script', 'link', 'head', 'body', 'section', 'article', 'nav', 'footer', 'header', 'button', 'input', 'form', 'flex', 'grid', 'margin', 'padding', 'border', 'color', 'font', 'display', 'position']
  
  for (let i = 0; i < 20; i++) {
    elements.push({
      text: texts[i % texts.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 15 + 12}px`,
        opacity: Math.random() * 0.1 + 0.05,
        animation: `floatTech ${Math.random() * 15 + 10}s ease-in-out infinite`
      }
    })
  }
  
  techElements.value = elements
}

const scrollToTechnologies = () => {
  techContainer.value.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

const scrollToTop = () => {
  homeContainer.value.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}


const server = ref('time message backend')

const testBackend = async() => {
  try{
    const response = await api.get('/test')
    server.value = response.data.message
    console.log('hello world')
  }catch(error){
    console.log(error)
  }
}


onMounted(() => {
  createFloatingElements()
  createTechElements()
    testBackend()
})
</script>

<style scoped>
/* Базовые стили */
.home-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--Gradient-Background);
  position: relative;
  overflow: hidden;
}

.floating-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.code-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-family: 'Courier New', monospace;
  font-weight: bold;
  animation: float 10s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
}

.code-element:nth-child(3n) {
  color: var(--Primary);
  opacity: 0.15 !important;
}

.code-element:nth-child(3n+1) {
  color: var(--Primary-Hover);
  opacity: 0.1 !important;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-40px) rotate(50deg); 
  }
}

.content {
  max-width:100vw;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 1rem;
  box-sizing: border-box;
}

.info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 1rem;
}

.message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  color: var(--Text);
  font-size: clamp(2rem, 8vw, 3.6rem);
  margin: 0 0 1rem 0;
  line-height: 1.2;
  flex-wrap: wrap;
  justify-content: center;
}

.name {
  background: linear-gradient(45deg, var(--Primary), var(--Primary-Hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: clamp(2.2rem, 9vw, 4rem);
}

.text {
  color: var(--Text);
  font-size: clamp(1rem, 4vw, 1.4rem);
  font-weight: 600;
  opacity: 0.8;
  padding: 0 1rem;
}

.list {
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 0 1rem;
}

.column-left, .column-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mega-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.mega-list li {
  color: var(--Text);
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  font-weight: 500;
  opacity: 0.9;
  padding: 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.mega-list li:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1rem;
}

.btn-down {
  color: var(--Text);
  font-size: 1.5rem;
  padding: 1.2rem;
  width: clamp(3.5rem, 10vw, 4rem);
  height: clamp(3.5rem, 10vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 2px solid var(--Surface-Dark);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: floating 3s ease-in-out infinite;
}

.btn-down:hover {
  background: var(--Primary-Hover);
  border-color: var(--Primary);
  transform: scale(1.1);
  animation-play-state: paused;
}

@keyframes floating {
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: translateY(-25px);
    box-shadow: 0 10px 20px var(--Background);
  }
}

/* Technologies Section */
.technologies-container {
  width: 100%;
  min-height: 100vh;
  background: var(--Background);
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.tech-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.tech-code-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.05);
  font-family: 'Courier New', monospace;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
}

@keyframes floatTech {
  0%, 100% { 
    transform: translateY(0) translateX(0) rotate(0deg); 
  }
  33% { 
    transform: translateY(-20px) translateX(10px) rotate(3deg); 
  }
  66% { 
    transform: translateY(10px) translateX(-5px) rotate(-2deg); 
  }
}

.technologies-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 1rem;
  box-sizing: border-box;
}

.tech-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.tech-title {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  color: var(--Text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.tech-highlight {
  background: var(--Gradient-Primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tech-subtitle {
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: var(--Text-Secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.tech-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.router-card {
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.tech-card {
  background: var(--Surface);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all var(--Transition-Normal);
  border: 1px solid var(--Border);
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--Shadow-Large);
  border-color: var(--Primary);
}

.router-card:hover .tech-card {
  border-color: var(--Primary);
  box-shadow: var(--Shadow-Large), var(--Shadow-Glow);
}

.tech-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
  box-shadow: var(--Shadow-Medium);
}

.tech-info {
  flex: 1;
  width: 100%;
}

.tech-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--Text);
  margin-bottom: 0.8rem;
}

.tech-description {
  color: var(--Text-Secondary);
  line-height: 1.5;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  min-height: 50px;
}

.tech-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.feature-tag {
  background: var(--Surface-Light);
  color: var(--Text);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all var(--Transition-Normal);
}

.router-card:hover .feature-tag {
  background: var(--Primary);
  color: white;
}

.router-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--Primary);
  font-weight: 600;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--Border);
  transition: all var(--Transition-Normal);
}

.router-card:hover .router-indicator {
  color: var(--Primary-Hover);
  transform: translateX(3px);
}

.router-text {
  font-size: 0.9rem;
}

.router-indicator i {
  font-size: 0.8rem;
  transition: transform var(--Transition-Normal);
}

.router-card:hover .router-indicator i {
  transform: translateX(3px);
}

.tech-info-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  background: var(--Surface);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid var(--Border);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.info-card {
  text-align: center;
  padding: 1rem;
}

.info-icon {
  font-size: 2rem;
  color: var(--Primary);
  margin-bottom: 0.8rem;
}

.info-card h4 {
  color: var(--Text);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.info-card p {
  color: var(--Text-Secondary);
  line-height: 1.5;
  font-size: 0.9rem;
}

/* Кнопка назад */
.btn-back {
  display: block;
  margin: 0 auto;
  background: transparent;
  color: var(--Text);
  border: 2px solid var(--Border);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--Transition-Normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 200px;
  justify-content: center;
}

.btn-back:hover {
  background: var(--Primary);
  border-color: var(--Primary);
  transform: translateY(-3px);
  box-shadow: var(--Shadow-Medium);
}

/* ========== АДАПТИВНОСТЬ ========== */

/* Планшеты (768px и выше) */
@media (min-width: 768px) {
  .content {
    padding: 2rem;
  }
  
  .message {
    flex-direction: row;
    white-space: nowrap;
  }
  
  .list {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin: 3rem 0;
  }
  
  .column-left {
    align-items: flex-start;
    text-align: left;
  }
  
  .column-right {
    align-items: flex-end;
    text-align: right;
  }
  
  .column-left .mega-list li {
    border-right: 2px solid rgba(255, 255, 255, 0.1);
    border-left: none;
    text-align: left;
  }
  
  .column-right .mega-list li {
    border-left: 2px solid rgba(255, 255, 255, 0.1);
    border-right: none;
    text-align: right;
  }
  
  .technologies-container {
    padding: 3rem 2rem;
  }
  
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-width: 100%;
    gap: 2rem;
  }
  
  .tech-card {
    padding: 2rem;
  }
  
  .tech-info-section {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    max-width: 100%;
    padding: 2rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
}

/* Ноутбуки (1024px и выше) */
@media (min-width: 1024px) {
  .list {
    max-width: 1300px;
    gap: 4rem;
  }
  
  .mega-list li {
    font-size: 1.2rem;
    padding: 1.2rem 1.5rem;
    max-width: 500px;
  }
  
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
  
  .tech-info-section {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2.5rem;
  }
  
  .technologies-content {
    padding: 2rem;
  }
}

/* Большие экраны (1440px и выше) */
@media (min-width: 1440px) {
  .content {
    padding: 4rem;
  }
  
  .message {
    font-size: 4rem;
  }
  
  .name {
    font-size: 4.5rem;
  }
  
  .tech-grid {
    gap: 3rem;
  }
  
  .tech-card {
    padding: 2.5rem;
  }
}

/* Очень маленькие устройства (до 360px) */
@media (max-width: 360px) {
  .content {
    padding: 0.5rem;
  }
  
  .message {
    font-size: 1.8rem;
    gap: 0.3rem;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .text {
    font-size: 0.9rem;
  }
  
  .mega-list li {
    padding: 0.8rem;
    font-size: 0.85rem;
  }
  
  .tech-card {
    padding: 1rem;
  }
  
  .tech-icon {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
  }
  
  .tech-name {
    font-size: 1.3rem;
  }
  
  .tech-description {
    font-size: 0.85rem;
  }
  
  .feature-tag {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
  
  .btn-back {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

/* Ландшафтная ориентация */
@media (max-height: 600px) and (orientation: landscape) {
  .home-container {
    min-height: 150vh;
  }
  
  .technologies-container {
    min-height: 150vh;
  }
  
  .content {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .list {
    margin: 1rem 0;
  }
  
  .mega-list li {
    padding: 0.8rem;
  }
}

/* Высокие устройства */
@media (min-height: 900px) {
  .content {
    justify-content: center;
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  
  .technologies-content {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* Поддержка темной темы */
@media (prefers-color-scheme: dark) {
  .code-element {
    color: rgba(255, 255, 255, 0.08);
  }
  
  .tech-code-element {
    color: rgba(255, 255, 255, 0.03);
  }
  
  .mega-list li {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.08);
  }
}

/* Улучшение для устройств с тач-скрином */
@media (hover: none) and (pointer: coarse) {
  .mega-list li:hover,
  .tech-card:hover,
  .btn-down:hover,
  .btn-back:hover {
    transform: none;
    animation-play-state: running;
  }
  
  .tech-card:active {
    transform: translateY(-2px);
  }
  
  .btn-down:active,
  .btn-back:active {
    background: var(--Primary);
    border-color: var(--Primary);
  }
}

/* Поддержка ретина дисплеев */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .tech-card {
    border-width: 0.5px;
  }
}

/* Печать */
@media print {
  .floating-background,
  .tech-background,
  .btn-down,
  .btn-back,
  .router-indicator {
    display: none;
  }
  
  .home-container,
  .technologies-container {
    background: white !important;
    color: black !important;
    min-height: auto;
  }
  
  .tech-card {
    break-inside: avoid;
    border: 1px solid #ddd;
  }
}
</style>