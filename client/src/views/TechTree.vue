<template>
  <div class="main">
    <div class="box-button">
      <h1>Изучаем {{techName}}</h1>
      <div v-if="loading" class="loading">
        <p>Загрузка тем...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="loadTopics">Попробовать снова</button>
      </div>
      
      <template v-else>
        <template v-for="(topic, index) in topics" :key="topic.slug">
          <ButtonMain @click="theme(topic.slug)">
            {{ topic.title }}
          </ButtonMain>
              <canvas v-if="index < topics.length - 1"
                      ref="drawCanvas"
                      width="180" height="50"
                      style="display:block; margin: 0 auto;">
              </canvas>
      </template>
      </template>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted , watch , nextTick} from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter,useRoute } from 'vue-router'
import ButtonMain from '../components/ButtonMain.vue'
import { useNameTechnology } from '@/store/nameTechnology'
import { lessonsApi } from '../services/lessonsApi'

const techStore = useNameTechnology()
const router = useRouter()
const { name } = storeToRefs(techStore)
const route = useRoute() 

const topics = ref([])
const loading = ref(false)
const error = ref(null)

const props = defineProps({
  techSlug: {
    type: String,
    required: true
  },
  techName: {
    type: String,
    required: true
  }
})


const loadTopics = async () => {
  console.log('🔄 Начинаю загрузку тем...')
  loading.value = true
  error.value = null
  
  try {
    const data = await lessonsApi.getTopics(props.techSlug)
    topics.value = data
  } catch (err) {
    error.value = 'Не удалось загрузить список тем: ' + err.message
  } finally {
    loading.value = false
    console.log('✅ Загрузка завершена. Topics:', topics.value.length)
  }
}

const theme = (slug) => {
  console.log('Переход на тему:', slug)
  router.push(`/${props.techSlug}/${slug}`)

}
watch(() => props.techSlug, (newTech, oldTech) => {
  if (newTech !== oldTech) {
    console.log(`🔄 Технология изменилась: ${oldTech} → ${newTech}`)
    loadTopics()
  }
}) 

const drawCanvas = ref([])
const arrowOffsets = [
  { startX: -0, endX: 35,  bend1: -50,  bend2: 40 },
  { startX: 10,  endX: -25, bend1: -50, bend2: 20  },
  { startX: -25,  endX: -10, bend1: 30,  bend2: -40 },
  { startX: 15, endX: 30,  bend1: -20, bend2: 50  },
  { startX: 15, endX: 35,  bend1: -55, bend2: 40  },
  { startX: -25, endX: 40,  bend1: -24, bend2: 20  },
  { startX: 15, endX: 25,  bend1: -60, bend2: 60  },
  { startX: 35, endX: 35,  bend1: -30, bend2: 40  },
  { startX: 5, endX: 40,  bend1: -60, bend2: 24  },
  { startX: 40, endX: 45,  bend1: -34, bend2: 28  },
  { startX: 5, endX: 60,  bend1: -35, bend2: 42  },
  { startX: 10, endX: 20,  bend1: -40, bend2: 35  },
  { startX: 15, endX: 40,  bend1: -30, bend2: 62  },
  { startX: 15, endX: 45,  bend1: -29, bend2: 30  },
  { startX: 15, endX: 20,  bend1: -24, bend2: 55  },
]

function drawArrow(ctx, canvasWidth, canvasHeight, offsets) {
  const center = canvasWidth / 2
  const startX = center + offsets.startX
  const endX = center + offsets.endX
  const bend1 = offsets.bend1
  const bend2 = offsets.bend2

  // получаем цвет из CSS
  const primary = getComputedStyle(document.documentElement)
                  .getPropertyValue('--Primary').trim()

  // градиент
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
  gradient.addColorStop(0, 'rgba(255,255,255,0)')
  gradient.addColorStop(0.5, primary)
  gradient.addColorStop(1, 'rgba(255,255,255,0.4)')

  // свечение
  ctx.shadowColor = primary
  ctx.shadowBlur = 8

  ctx.beginPath()
  ctx.moveTo(startX, 0)
  ctx.bezierCurveTo(
    startX + bend1, canvasHeight * 0.3,
    endX + bend2,   canvasHeight * 0.7,
    endX, canvasHeight
  )

  ctx.strokeStyle = gradient
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()

  ctx.shadowBlur = 0
}

onMounted(() => {
  console.log('📌 Компонент смонтирован, загружаю темы...')
  loadTopics()
})

watch(topics ,async () => {
  await nextTick()
    drawCanvas.value.forEach((canvas , index) => {
      const ctx = canvas.getContext('2d')
      drawArrow(ctx , canvas.width , canvas.height , arrowOffsets[index] )
    })

})



</script>

<style scoped>
.box-button {
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr;
  min-width: 500px;
  max-width:500px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 3rem;
  color: var(--Text);
  gap:0;
}
canvas {
  display: block;

}
.arrow {
  color: var(--Text);
  font-size: 2rem;
  text-align: center;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  margin: 0.5rem 0;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: var(--Text);
}

.loading p {
  font-size: 1.2rem;
  color: var(--Text);
}

.error {
  padding: 2rem;
  text-align: center;
  color: #ff6b6b;
}

.error p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.error button {
  padding: 0.5rem 1rem;
  background: #f0db4f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.error button:hover {
  background: #e0cb3f;
}
@media(max-width:768px){
    .box-button{
      width: 90%;
      height: auto;
      display: grid;
      justify-content: center;
      align-items: center;

      grid-template-columns: 1fr;
      min-width: 300px;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 3rem;
      color: var(--Text);
    }
}

@media(max-width:376px){
    .box-button{
      max-width: 90vw;
      height: auto;
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 1fr;
      min-width: 300px;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 3rem;
      color: var(--Text);
    }
}

</style>