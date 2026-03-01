<template>
  <div class="box-profile">
    <div class="card-profile">
      <div class="card-glow"></div>
      <div class="card-grid"></div>
      <div class="avatar-wrapper">
        <div class="avatar-ring"></div>
        <div class="avatar">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="15" r="7" fill="currentColor" opacity="0.9"/>
            <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
          </svg>
        </div>
        <div class="avatar-status"></div>
      </div>
      <div class="user-info">
        <h1 class="user-name">{{ useStore.user?.username }}</h1>
        <p class="user-role">{{ userRole }}</p>
      </div>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-value">Стек</span>
          <span class="stat-label">Технологий</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ useStore.user?.grade }}</span>
          <span class="stat-label">Грейд</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ since }}</span>
          <span class="stat-label">На сайте с</span>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">
          <span class="section-line"></span>
          Мой стек
          <span class="section-line"></span>
        </h2>
        <div class="technology">
            <span
              class="tech"
              v-for="(tech, index) in stek"
              :key="index"
              :style="{ animationDelay: `${index * 60}ms` }"
              >
              {{ tech }}
            </span>
        </div>
      </div>
      <div class="footer-icon">
        <i class="fas fa-terminal"></i>
        <span>dev profile</span>
      </div>


    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '../store/nameTechnology'

const useStore = useUserStore()

const since = ref('2026')
const userRole = ref('BudaLearn')

const stek = computed(() => useStore.user?.stack || [])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap');



.box-profile {
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Background, #0d0f14);
  font-family: 'Syne', sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.card-profile {
  position: relative;
  width: min(580px, 100%);
  padding: clamp(2rem, 8vw, 4rem) clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 6vw, 3.5rem);
  background: var(--Surface, #161921);
  border-radius: clamp(20px, 4vw, 24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 16px 32px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(99, 102, 241, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.5rem);
  overflow: hidden;
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}

.card-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  translate: -50% 0;
  width: min(260px, 80%);
  height: 260px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.card-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: clamp(24px, 5vw, 32px) clamp(24px, 5vw, 32px);
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
}

/* Avatar */
.avatar-wrapper {
  position: relative;
  margin-top: 0.5rem;
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 180deg, #6366f1, #a78bfa, #6366f1);
  animation: spin 4s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.avatar {
  position: relative;
  width: clamp(60px, 12vw, 72px);
  height: clamp(60px, 12vw, 72px);
  border-radius: 50%;
  background: var(--Surface, #161921);
  border: 3px solid var(--Surface, #161921);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a78bfa;
  z-index: 1;
}

.avatar svg {
  width: clamp(32px, 7vw, 40px);
  height: clamp(32px, 7vw, 40px);
}

.avatar-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: clamp(10px, 2.5vw, 14px);
  height: clamp(10px, 2.5vw, 14px);
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--Surface, #161921);
  z-index: 2;
  box-shadow: 0 0 8px #22c55e;
}

/* User info */
.user-info {
  text-align: center;
}

.user-name {
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: 800;
  color: var(--Text, #f1f5f9);
  letter-spacing: -0.02em;
  line-height: 1.1;
  word-break: break-word;
}

.user-role {
  margin: 0.3rem 0 0;
  font-size: clamp(0.65rem, 2vw, 0.8rem);
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

/* Stats row */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.8rem, 3vw, 1.5rem);
  padding: clamp(0.8rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.2rem;
  min-width: 0;
}

.stat-value {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  font-weight: 700;
  color: var(--Text, #f1f5f9);
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.stat-label {
  font-size: clamp(0.55rem, 1.8vw, 0.65rem);
  color:var(--Text);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  opacity:0.8;
}

.stat-divider {
  width: 1px;
  height: clamp(24px, 6vw, 32px);
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

/* Section */
.section {
  width: 100%;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(0.6rem, 2vw, 0.7rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 clamp(0.8rem, 2.5vw, 1rem);
  font-family: 'JetBrains Mono', monospace;
}

.section-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
}

/* Technologies */
.technology {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech {
  padding: 0.35rem clamp(0.6rem, 2vw, 0.85rem);
  font-size: clamp(0.65rem, 2vw, 0.72rem);
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 100px;
  color: #a78bfa;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  transition: all 0.2s ease;
  animation: tagIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  cursor: default;
  white-space: nowrap;
}

@keyframes tagIn {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: none; }
}

.tech:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  color: #c4b5fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* Footer */
.footer-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.55rem, 1.8vw, 0.65rem);
  color: rgba(255,255,255,0.2);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  margin-top: clamp(0.5rem, 2vw, 1rem);
}

.footer-icon i {
  font-size: clamp(0.65rem, 2vw, 0.75rem);
  color: #6366f1;
}

/* Специфические адаптации для мобильных устройств */
@media (max-width: 480px) {
  .stats-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    min-width: calc(33.33% - 0.5rem);
  }
  
  .technology {
    gap: 0.4rem;
  }
  
  .tech {
    white-space: normal;
    word-break: break-word;
    text-align: center;
    line-height: 1.2;
  }
}

@media (max-width: 360px) {
  .stats-row {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .stat-item {
    width: 100%;
  }
  
  .stat-value, .stat-label {
    white-space: normal;
    text-align: center;
  }
}

/* Для очень маленьких экранов */
@media (max-width: 280px) {
  .card-profile {
    padding: 1.5rem 1rem;
  }
  
  .tech {
    width: 100%;
    white-space: normal;
  }
}

/* Для планшетов */
@media (min-width: 768px) and (max-width: 1024px) {
  .card-profile {
    width: min(520px, 90%);
  }
}

/* Альбомная ориентация на телефонах */
@media (max-height: 600px) and (orientation: landscape) {
  .box-profile {
    min-height: auto;
    padding: 2rem 1rem;
  }
  
  .card-profile {
    padding: 2rem;
    gap: 1rem;
  }
  
  .avatar-wrapper {
    margin-top: 0;
  }
  
  .stats-row {
    padding: 0.8rem 1rem;
  }
}
</style>