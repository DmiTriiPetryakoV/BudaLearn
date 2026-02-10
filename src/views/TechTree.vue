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
      
      <template v-if="goga">
        <template v-for="(topic, index) in topics" :key="topic.slug">
          <ButtonMain @click="theme(topic.slug)">
            {{ topic.title }}
          </ButtonMain>
          <div v-if="index < topics.length - 1" class="arrow">↓</div>
        </template>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted , watch} from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter,useRoute } from 'vue-router'
import ButtonMain from '../components/ButtonMain.vue'
import { useNameTechnology } from '/src/store/nameTechnology'
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

const goga = ref(true)
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
  goga.value = !goga.value
}
watch(() => props.techSlug, (newTech, oldTech) => {
  if (newTech !== oldTech) {
    console.log(`🔄 Технология изменилась: ${oldTech} → ${newTech}`)
    loadTopics()
  }
}) 
watch(() => route.params.slug, (newSlug, oldSlug) => {
  console.log('🔍 Slug изменился:', oldSlug, '→', newSlug)
  if (newSlug) {
    goga.value = false
  } else {
    goga.value = true
  }
}, { immediate: true })

onMounted(() => {
  console.log('📌 Компонент смонтирован, загружаю темы...')
  loadTopics()
})
</script>

<style scoped>
.box-button {
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  min-width: 500px;
  max-width:500px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 3rem;
  color: var(--Text);
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
      width: 100%;
      height: auto;
      display: grid;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
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
      gap: 0.5rem;
      grid-template-columns: 1fr;
      min-width: 300px;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 3rem;
      color: var(--Text);
    }
}

</style>