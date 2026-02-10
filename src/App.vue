<template>
  <div class="main-box">
    <Header/>
    <template v-if="route.path !== '/'">
      <router-view></router-view>
    </template>
      <template v-else>
        <Home/>
      </template>
        <Footer/>
  </div>
</template>
<script setup>

import { storeToRefs } from 'pinia'

import Home from './views/children/Home.vue'

import { useNameTechnology } from '/src/store/nameTechnology'
import Menu from './views/children/Menu.vue'

const techStore = useNameTechnology()
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { watch } from 'vue'
const {name} = storeToRefs(techStore)
import {useRouter , useRoute} from 'vue-router'
const router =  useRouter()


const setTech = (tech) => {
  console.log('Header: устанавливаю технологию:', tech)
  techStore.name = tech
}
const route = useRoute()

const routePath = {
  'HTMLlearn':'HTML',
  'CSSlearn': 'CSS',
  'jslearn': 'JavaScript'
}



watch(() =>  route.name, (newName)  => {
  const tech = routePath[newName]
  if(tech){
    techStore.name = tech
}},{immediate:true}) 
</script>



<style scoped>
.main-box {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  grid-template-rows: auto auto;
  min-height: 100vh;
  height: auto;
  justify-content:center;
  align-items:center;
  background: var(--Background);
  padding-top: 4rem;
}
.main-box > *:nth-child(2) {
  width: 100%;
  margin-top: 0;
}
.main-box > footer {
  width: 100%;
}
.box-text{
  width:100%;
  height:100vh;
  display:flex;
  justify-content:flex-start;
  align-content:center;
  flex-direction:column;
  text-align:center;
}
.main-box > *:not(footer){
  flex:1;
}
p{
  font-size:2rem;
  color:red;
}
</style>