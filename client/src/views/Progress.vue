<template>
  <div class="boxChart">
    <h1 class="stats">Ваша Статистика</h1>
    <canvas ref="chartCanvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted , watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { progressApi } from '../services/progressApi'
import { useUserStore } from '../store/nameTechnology'
import { useTheme } from '../store/nameTechnology'
const themeStore = useTheme()

Chart.register(...registerables)

const chartCanvas = ref(null)
const userStore = useUserStore()

const colors = {
  javascript: '#F59E0B',
  css: '#3B82F6',
  html: '#10B981',
  node: '#8B5CF6',
  python: '#EC4899',
}

onMounted(async () => {
  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--Primary').trim()

  const progressData = await progressApi.get(userStore.accessToken)

  const labels = progressData.map(item => item.tech)

  const datasets = progressData.map(item => {
    const color = colors[item.tech.toLowerCase()] || primary
    const dayCount = [0,0,0,0,0,0,0]

      item.dates.forEach(date => {
        const d = new Date(date)
        const now = new Date()
        
        const weekStart = new Date(now)
        weekStart.setDate(now.getDate() - now.getDay() + 1)
        weekStart.setHours(0,0,0,0)
        
        if(d >= weekStart) {
          let day = d.getDay()
          day = day === 0 ? 6 : day - 1
          dayCount[day]++
      }
    })

    return {
      label: item.tech,
      data:dayCount,
      borderColor: color,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 3.5,
      pointBackgroundColor: color,
      tension: 0.1,
    }
  })

  const ctx = chartCanvas.value.getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: { labels: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'], datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#ffffff',
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 30,
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: primary } },
        y: {
          
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: primary, stepSize: 1 },
          beginAtZero: true
        }
      }
    }
  })
})
watch(() => themeStore.isDark , () => {
  if(chartIntance.value){
    chartIntance.value.destroy()
  }
createChart()
})
</script>

<style scoped>
.boxChart {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
}

.canvas {
  max-width: 100% !important;
  max-height: 75vh;
  min-height: 70vh;
}

.stats {
  color: var(--Text);
  font-weight: 800;
  font-size: 2.5rem;
  margin: 0;
}
</style>