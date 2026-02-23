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
      <div class="boxExit">
        <router-link to="/Profile" class="nameProfile">{{userStore.user?.username}}</router-link>
        <button class="exit" @click="logout">Выйти</button>
        <button class="theme"@click="themeStore.toggleTheme"  :class="{dark:themeStore.isDark}">
            <span class="radio" ></span>
        </button>
      </div>
      </nav>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../store/nameTechnology'
import { useNameTechnology, useMenu } from '@/store/nameTechnology'
import { useTheme } from '../../store/nameTechnology'
const themeStore = useTheme()

const route = useRoute()
const router = useRouter()
const menuStore = useMenu()
const techStore = useNameTechnology()
const userStore = useUserStore()

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

const closeMenu = () => { menuStore.menu = false }

const handleNavigation = (tech) => {
  techStore.name = tech.name
  closeMenu()
}

watch(() => route.path, (newPath) => {
  menuStore.menu = newPath === '/menu'
}, { immediate: true })

const logout = () => {
  userStore.logout()
  setTimeout(() => router.push('/login'), 200)
}
</script>

<style scoped>
.menu-content {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.nav-box {
  width: min(50vw, 700px);
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: clamp(1rem, 3vw, 4rem);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: clamp(1rem, 3vw, 2rem);
}

.menu-link {
  padding: clamp(0.5rem, 1.5vw, 1rem) clamp(0.8rem, 2vw, 1.2rem);
  text-decoration: none;
  color: var(--Text);
  border-radius: 6px;
  transition: background 0.2s;
  background: transparent;
  border: 0;
  font-size: clamp(1rem, 2.5vw, 1.8rem);
  cursor: pointer;
}

.menu-link:hover {
  background: var(--Primary);
}

.menu-link.router-link-active {
  background: var(--Primary);
  color: white;
}

.boxExit {
  width: 100%;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-top: 1rem;
}

.exit {
  padding: 0.5rem;
  min-width: 8rem;
  border: none;
  background: var(--Primary);
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 600;
  border-radius: 5px;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.exit:hover { opacity: 1; }

.nameProfile {
  color: var(--Text);
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  opacity: 0.8;
  cursor: pointer;
  text-decoration: none;
}

.nameProfile:hover { opacity: 1; }

.theme{
  height:1.8rem;
  min-width:4rem;
  border-radius:50rem;
  background:var(--Background);
  border:2px solid var(--Primary);
  display:flex;
  justify-content:flex-end;
  align-items:center;
  padding:0.1rem;
  cursor: pointer;
  transition:all 1s ease;
}
.dark{
    height:1.8rem;
  min-width:4rem;
  border-radius:50rem;
  background:var(--Background);
  border:2px solid var(--Primary);
  display:flex;
  align-items:center;
  padding:0.1rem;
  cursor: pointer;
  justify-content:flex-start;
}
.radio{
  height:1.6rem;
  width:1.6rem;
  background:red;
  border-radius:50rem;
  background:var(--Primary);
}

@media (max-width: 1150px) {
  .nav-box { width: 70vw; }
}

@media (max-width: 768px) {
  .nav-box { width: 90vw; gap: 1.2rem; }
  .menu-content { height: auto; min-height: 90vh; padding: 2rem 0; }
}

@media (max-width: 431px) {
  .nav-box { width: 95vw; gap: 0.8rem; padding: 1rem; }
  .menu-link { font-size: 1.1rem; padding: 0.5rem 0.8rem; }
  .boxExit { gap: 0.8rem; }
}

@media (max-height: 600px) and (orientation: landscape) {
  .menu-content { height: auto; padding: 1rem 0; }
  .nav-box { gap: 0.8rem; }
  .menu-link { padding: 0.4rem 0.8rem; font-size: 1rem; }
}
</style>