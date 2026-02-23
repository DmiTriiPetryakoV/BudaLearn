<template>
  <div class="boxInfo">
    <div class="hero">
      <h1 class="message">Начинай учиться<br><span class="accent">прямо сейчас</span></h1>
      <p class="messageTwo">
        Сайт <strong>BudaLearn</strong> — обучающий сайт по веб-разработке
        <i class="fas fa-terminal icon"></i>
      </p>
    </div>
    <div class="tech-grid">
      <div class="tech-card" v-for="(tech, i) in techs" :key="i" :style="{ animationDelay: `${i * 80}ms` }">
        <div class="tech-top">
          <span class="tech-label" :style="{ color: tech.color }">{{ tech.name }}</span>
          <span class="tech-count">{{ tech.lessons }} уроков</span>
        </div>
        <p class="tech-desc">{{ tech.desc }}</p>
        <div class="tech-tags">
          <span class="tag" v-for="t in tech.tags" :key="t">{{ t }}</span>
        </div>
      </div>
    </div>
    <div class="admin-card">
      <div class="admin-left">
        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <div class="admin-avatar">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="15" r="7" fill="currentColor" opacity="0.9"/>
              <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
            </svg>
          </div>
          <div class="admin-online"></div>
        </div>
        <div class="admin-meta">
          <span class="admin-name">Admin</span>
          <span class="admin-role">Автор сайта</span>
          <span class="admin-age">16 лет</span>
        </div>
      </div>
      <div class="admin-right">
        <p class="admin-bio">
          Привет! Я сделал BudaLearn, потому что хотел объяснить веб-разработку
          так, как хотел бы,чтобы объяснили мне. Без воды, без лишнего — только то, что реально нужно.
          Развивайся вместе со мной!
        </p>
        <div class="admin-stack">
          <span class="pill html">HTML</span>
          <span class="pill css">CSS</span>
          <span class="pill js">JS</span>
          <span class="pill vue">Vue</span>
          <span class="pill php">Node</span>
          <span class="pill php">Python</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const techs = ref([
  {
    name: 'HTML',
    color: '#e34c26',
    lessons: 12,
    desc: 'Структура любой страницы. Начни здесь — это основа всего.',
    tags: ['теги', 'атрибуты', 'формы', 'семантика'],
  },
  {
    name: 'CSS',
    color: '#6a93f8',
    lessons: 15,
    desc: 'Делай страницы красивыми. Flexbox, Grid, анимации.',
    tags: ['селекторы', 'flexbox', 'grid', 'анимации'],
  },
  {
    name: 'JavaScript',
    color: '#f7df1e',
    lessons: 18,
    desc: 'Оживи свой сайт. Логика, события, работа с DOM.',
    tags: ['переменные', 'функции', 'DOM', 'события'],
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Unbounded:wght@400;700;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.boxInfo {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--Text);
  padding: 4rem;
  gap: 1.5rem;
  font-family: 'Fragment Mono', monospace;
}

/* HERO */
.hero {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  animation: fadeUp 0.5s both;
}

.hero-tag {
  font-size: 0.7rem;
  color: var(--Primary);
  letter-spacing: 0.12em;
  opacity: 0.8;
}

.message {
  font-family: 'Unbounded', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--Text);
}

.accent { color: var(--Primary-Hover); }

.messageTwo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--Text-Secondary);
  line-height: 1.6;
}

.messageTwo strong { color: var(--Text); font-weight: 600; }

.icon { color: var(--Primary); font-size: 0.9rem; }

/* TECH GRID */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--Border);
  border: 1px solid var(--Border);
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
}

.tech-card {
  background: var(--Surface);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  opacity: 0;
  animation: fadeUp 0.5s forwards;
  transition: background var(--Transition-Normal);
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--Gradient-Primary);
  opacity: 0;
  transition: opacity var(--Transition-Normal);
}

.tech-card:hover { background: rgba(139, 92, 246, 0.05); }
.tech-card:hover::before { opacity: 1; }

.tech-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-label {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.03em;
}

.tech-count {
  font-size: 0.6rem;
  color: var(--Text-Tertiary);
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--Border);
  padding: 0.2rem 0.55rem;
  border-radius: 100px;
}

.tech-desc {
  font-size: 0.74rem;
  line-height: 1.75;
  color: var(--Text-Secondary);
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.6rem;
  padding: 0.2rem 0.5rem;
  border-radius: 100px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: var(--Primary-Hover);
}

/* ADMIN CARD */
.admin-card {
  display: flex;
  gap: 2.5rem;
  background: var(--Surface);
  border: 1px solid var(--Border);
  border-radius: 18px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.5s 0.3s both;
}

.admin-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--Gradient-Primary);
}

.admin-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.avatar-wrap {
  position: relative;
  width: 68px;
  height: 68px;
}

.avatar-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: var(--Gradient-Primary);
  animation: spin 4s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.admin-avatar {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--Surface-Dark);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Primary-Hover);
  z-index: 1;
}

.admin-avatar svg { width: 34px; height: 34px; }

.admin-online {
  position: absolute;
  bottom: 3px; right: 3px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--Secondary);
  border: 2px solid var(--Surface-Dark);
  box-shadow: 0 0 6px var(--Secondary);
  z-index: 2;
}

.admin-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.admin-name {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--Text);
}

.admin-role {
  font-size: 0.65rem;
  color: var(--Primary);
  letter-spacing: 0.06em;
}

.admin-age {
  font-size: 0.62rem;
  color: var(--Text-Tertiary);
}

.admin-right {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;
  justify-content: center;
}

.admin-bio {
  font-size: 0.78rem;
  line-height: 1.85;
  color: var(--Text-Secondary);
}

.admin-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  padding: 0.3rem 0.85rem;
  border-radius: 100px;
  font-size: 0.68rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 700;
}

.pill.html { background: rgba(227,76,38,0.12); border: 1px solid rgba(227,76,38,0.3); color: #e34c26; }
.pill.css  { background: rgba(38,77,228,0.12); border: 1px solid rgba(38,77,228,0.3); color: #6a93f8; }
.pill.js   { background: rgba(247,223,30,0.1); border: 1px solid rgba(247,223,30,0.25); color: #f7df1e; }
.pill.vue  { background: rgba(66,184,131,0.12); border: 1px solid rgba(66,184,131,0.3); color: #42b883; }
.pill.php  { background: rgba(119,123,180,0.12); border: 1px solid rgba(119,123,180,0.3); color: #9b9fd4; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

@media (max-width: 768px) {
  .boxInfo { padding: 2rem 1.5rem; gap: 2rem; }
  .tech-grid { grid-template-columns: 1fr; }
  .admin-card { flex-direction: column; gap: 1.5rem; padding: 1.5rem; }
  .admin-left { flex-direction: row; }
  .admin-meta { align-items: flex-start; }
  .messageTwo{
    font-size:0.65rem;
  }
}
</style>