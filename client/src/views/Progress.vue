<template>
  <div class="boxChart">

    <h1 class="stats">Ваша Статистика</h1>
    <canvas ref="chartCanvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartCanvas = ref(null)

onMounted(() => {
  const primary = getComputedStyle(document.documentElement)
                  .getPropertyValue('--Primary').trim()
  const secondary = getComputedStyle(document.documentElement)
                  .getPropertyValue('--Secondary').trim()

  const ctx = chartCanvas.value.getContext('2d')

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    backgroundColor: primary,
datasets: [
  {
    label: 'HTML',
    data: [1, 3, 5, 7, 10, 12, 15],
    borderColor: '#10B981',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    pointRadius: 3.5,
    pointBackgroundColor: '#10B981',
    tension: 0.1,
  },
  {
    label: 'JavaScript',
    data: [1, 2, 4, 5, 7, 9, 11],
    borderColor: '#F59E0B',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    pointRadius: 3.5,
    pointBackgroundColor: '#F59E0B',
    tension: 0.1,
  },
  {
    label: 'CSS',
    data: [0, 1, 2, 3, 4, 6, 8],
    borderColor: '#3B82F6',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    pointRadius: 3.5,
    pointBackgroundColor: '#3B82F6',
    tension: 0.1,
  }
]
  },
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
      borderRadius: 4,
      padding:30, 
    }
  }
},
    scales: {
      x: { grid: { display: false }, ticks: { color:primary} },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color:primary} }
    }
  }
})
})
</script>

<style scoped>
.boxChart{
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    text-align:center;
    flex-direction:column;
    gap:2rem;
    padding:1.5rem;
}
.canvas{
    max-width:100% !important;
    max-height:75vh;
    min-height:70vh;
}
.stats{
    color:var(--Text);
    font-weight:800;
    font-size:2.5rem;
    margin:0;
}

</style>