<template>
  <div v-if="menuStore.menu" class="menu">

    <div class="menu-content">
      <nav class="nav-box">
        <router-link 
          v-for="tech in links" 
          :key="tech.id"
          :to="tech.route"
          @click="handleNavigation(tech)"
          class="menu-link"
        >
          {{ tech.name }}
        </router-link>


      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter , useRoute } from 'vue-router'

const route = useRoute()
import { useNameTechnology,useMenu } from '@/store/nameTechnology'

const router = useRouter()
const menuStore = useMenu()
const techStore = useNameTechnology()




const links = [
  { id: 'html', name: 'HTML', route: '/html' },
  { id: 'css', name: 'CSS', route: '/css' },
  { id: 'js', name: 'JavaScript', route: '/javascript' },
   { id: 'Home', name: 'Home', route: '/' },
  { id: 'Закладки', name: 'Закладки', route: '/fake' },
   { id: 'Profile', name: 'Профиль', route: '/fake' },
    { id: 'Page', name: 'О нас', route: '/fake' },
        { id: 'Registration', name: 'Регистрация', route: '/registration' },

  ]

const closeMenu = () => {
  menuStore.menu = false
}

const handleNavigation = (tech) => {
  techStore.name = tech.name
  closeMenu()
}
watch(() => route.path , (newPath) => {
    menuStore.menu = newPath === '/menu'

},{immediate:true})


const visible = ref(false)
let time = null 

function showModal(){
  if(time){
    clearTimeout(time)
    time = null
  }

visible.value = true
time = setTimeout(() => {
  visible.value = false
},3000)
}
function closeModal() {
  visible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

</script>

<style scoped>
.menu-content {
  width:100%;
  height:90vh;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-direction:column;
  font-size:1.6rem;
  gap:2rem;
}

.menu-link {
  padding: 1rem;
  text-decoration: none;
  color: var(--Text);
  border-radius: 6px;
  transition: background 0.2s;
  overflow-x:hidden;
  background:transparent;
  border:0;
  font-size:1.8rem;
  cursor:pointer;
}

.menu-link:hover {
  background: var(--Primary);
}

.menu-link.router-link-active {
  background: var(--Primary);
  color: white;
}
.nav-box{
  height:auto;
  display:grid;
  flex-direction:column;
  gap:5rem;
  justify-content:center;
  justify-items:center;
  overflow:hidden;
  padding:2rem;
  grid-template-columns:repeat(2,1fr);
}


</style>