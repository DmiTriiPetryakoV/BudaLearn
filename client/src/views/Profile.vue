<template>
  <div class="box-profile">
    <div class="card-profile">

      <!-- Background decoration -->
      <div class="card-glow"></div>
      <div class="card-grid"></div>

      <!-- Avatar -->
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

      <!-- User info -->
      <div class="user-info">
        <h1 class="user-name">{{ userName }}</h1>
        <p class="user-role">{{ userRole }}</p>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-value">{{ stek.length }}</span>
          <span class="stat-label">Технологий</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ grade }}</span>
          <span class="stat-label">Грейд</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ since }}</span>
          <span class="stat-label">На сайте с</span>
        </div>
      </div>

      <!-- Technologies -->
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

      <!-- Footer icon -->
      <div class="footer-icon">
        <i class="fas fa-terminal"></i>
        <span>dev profile</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('Admin')
const userRole = ref('Full-Stack Developer')
const grade  = ref('Middle')
const since  = ref('2023')

const stek = ref(['PHP', 'Vue', 'Python', 'JS', 'Node', 'HTML', 'CSS'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap');

.box-profile {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Background, #0d0f14);
  font-family: 'Syne', sans-serif;
}

.card-profile {
  position: relative;
  width: min(580px, 90vw);
  padding: 4rem 3.5rem 3.5rem;
  background: var(--Surface, #161921);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 32px 64px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(99, 102, 241, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
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
  width: 260px;
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
  background-size: 32px 32px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
}

/* ── Avatar ──────────────────────────────────────── */
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
  width: 72px;
  height: 72px;
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
  width: 40px;
  height: 40px;
}

.avatar-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--Surface, #161921);
  z-index: 2;
  box-shadow: 0 0 8px #22c55e;
}

/* ── User info ───────────────────────────────────── */
.user-info {
  text-align: center;
}

.user-name {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--Text, #f1f5f9);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.user-role {
  margin: 0.3rem 0 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.2rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--Text, #f1f5f9);
  font-family: 'JetBrains Mono', monospace;
}

.stat-label {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
}


.section {
  width: 100%;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 1rem;
  font-family: 'JetBrains Mono', monospace;
}

.section-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
}

.technology {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech {
  padding: 0.35rem 0.85rem;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 100px;
  color: #a78bfa;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  transition: all 0.2s ease;
  animation: tagIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  cursor: default;
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

.footer-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
}

.footer-icon i {
  font-size: 0.75rem;
  color: #6366f1;
}
</style>