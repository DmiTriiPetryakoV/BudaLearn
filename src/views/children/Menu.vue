<template>
  <div v-if="menuStore.menu" class="menu">

    <div class="menu-content">
      <nav class="nav-box">
        <router-link 
          v-for="tech in technologies" 
          :key="tech.id"
          :to="tech.route"
          @click="handleNavigation(tech)"
          class="menu-link"
        >
          {{ tech.name }}
        </router-link>
               <router-link to="/"  class="menu-link">Home</router-link>
        <button class="menu-link"  @click="showModal()" >
          Прогресс
        </button>
        
        <button class="menu-link" @click="showModal()" >
          Закладки
        </button>
          <button  @click="showModal()" class="menu-link">
          Профиль
          </button>

      </nav>
          <div class="modal" :class="{modalVise :visible}">
            Команда сайта уже работает над этим разделом
            <button class="close" @click="closeModal()">
              <li class="fas fa-times closeIcon"></li>
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter , useRoute } from 'vue-router'

const route = useRoute()
import { useNameTechnology,useMenu } from '../../store/nameTechnology'

const router = useRouter()
const menuStore = useMenu()
const techStore = useNameTechnology()

const technologies = [
  { id: 'html', name: 'HTML', route: '/html' },
  { id: 'css', name: 'CSS', route: '/css' },
  { id: 'js', name: 'JavaScript', route: '/javascript' },

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
  height: 100vh;
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
.modal{
  padding:1.5rem;
  border:1px solid var(--Primary);
  color:var(--Text);
  font-size:1.1rem;
  border-radius:25px;
  display:none;
  transition:0.3s ease all;
  position:relative;
}
.modal.modalVise {
  display: flex;
  animation: modalFadeIn 0.4s ease forwards;
}

.close {
  position: absolute;
  top:5px;
  right:5px;
  padding:0.2rem 0.4rem;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--Text);
  cursor: pointer;
  font-size: 1.2rem;
  transition:all 0.3s ease;
}

.close:hover {
  background: var(--Error);
  color: white;
  transform:rotate(180deg);
}


@keyframes modalFadeIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translate(0%, -50%) scale(1);
  }
}

@keyframes modalFadeOut {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
}

</style>