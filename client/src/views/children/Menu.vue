<template>


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
  { id: 'Profile', name: 'Профиль', route: '/profile' },
  { id: 'Progress', name: 'Прогресс', route: '/progress' },
  { id: 'Registration', name: 'Регистрация', route: '/registration' },
  { id: 'Page', name: 'О нас', route: '/infosait' },


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


</script>

<style scoped>
.menu-content {
  width:100%;
  height:90vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  font-size:1.6rem;
  gap:1.2rem;
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
  width:50vw;
  height:auto;
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  gap:4rem;
  justify-content:center;
  justify-items:center;
  overflow:hidden;
  padding:2rem;

}
@media (max-width:1150px) {
    .nav-box{
      width:70vw;
    }
}
@media (max-width:768px) {
    .nav-box{
      width:90vw;
      gap:2rem;
    }
}
@media (max-width: 768px) {
  .nav-box {
    width: 90vw;
    gap: 1.2rem;
  }
  .menu-link {
    font-size: 1.4rem;
    padding: 0.7rem;
  }
  .menu-content {
    font-size: 1.2rem;
    gap: 0.8rem;
  }
}

@media (max-width: 431px) {
  .nav-box {
    width: 95vw;
    gap: 0.8rem;
    padding: 1rem;
  }
  .menu-link {
    font-size: 1.2rem;
    padding: 0.6rem;
  }
}
</style>