<template>
  <div class="boxChart">
    <h1 class="stats">Ваша Статистика</h1>
    <canvas ref="chartCanvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { progressApi } from '../services/progressApi'
import { useUserStore, useTheme } from '../store/nameTechnology'

Chart.register(...registerables)

const chartCanvas = ref(null)
const chartInstance = ref(null)
const userStore = useUserStore()
const themeStore = useTheme()

const colors = {
  javascript: '#F59E0B',
  css: '#3B82F6',
  html: '#10B981',
  node: '#8B5CF6',
  python: '#EC4899',
}

// Генерируем последние 30 дней
function getLast30Days() {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    d.setHours(0, 0, 0, 0)
    days.push(d)
  }
  return days
}

function formatLabel(date) {
  return `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

async function createChart() {
  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--Primary').trim()

  const isDark = themeStore.isDark
  const textColor = isDark ? '#000000' : '#8B5CF6'
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'

  const progressData = await progressApi.get(userStore.accessToken)
  const last30 = getLast30Days()
  const labels = last30.map(formatLabel)

  const datasets = progressData.map(item => {
    const color = colors[item.tech.toLowerCase()] || primary

    const dayCounts = last30.map(day => {
      return item.dates.filter(dateStr => {
        const d = new Date(dateStr)
        return isSameDay(d, day)
      }).length
    })

    return {
      label: item.tech,
      data: dayCounts,
      borderColor: color,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: color,
      tension: 0.3,
    }
  })

  const ctx = chartCanvas.value.getContext('2d')

  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 30,
          },
        },
        tooltip: {
          callbacks: {
            title: (items) => {
              const idx = items[0].dataIndex
              const d = last30[idx]
              return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: primary,
            maxTicksLimit: 15,
            maxRotation: 0,
          },
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: primary, stepSize: 1 },
          beginAtZero: true,
        },
      },
    },
  })
}

onMounted(() => {
  createChart()
})

watch(() => themeStore.isDark, () => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
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
  max-height: 75.1vh;
  min-height: 70vh;
}

.stats {
  color: var(--Text);
  font-weight: 800;
  font-size: 2.5rem;
  margin: 0;
}
</style>