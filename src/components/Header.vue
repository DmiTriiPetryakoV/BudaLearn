<template>
  <header class="main-header">
    <h1 class="name-product">BudaLearn</h1>
    <nav class="box-nav">
    <router-link
        class="burger-btn" 
        :class="{ 'active': isOpen }"
        @click="toggleMenu"
        aria-label="Меню"
        to="/menu"

        >
        <div class="burger-lines">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
            </div>
        <span class="sr-only">Меню</span>
    </router-link>
    </nav>
  </header>
</template>

<script setup>
import { useNameTechnology , useMenu } from '/src/store/nameTechnology'
import { useRouter } from 'vue-router'
const techStore = useNameTechnology()
const router = useRouter()

const menuRes = useMenu()
const SetTech = (tech) => {
        techStore.name = tech
    }
import { ref, watch } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  if(!isOpen.value){

      isOpen.value = true
      menuRes.value = true
  }else{
    router.go(-1)
    isOpen.value = false
  menuRes.value = false
}
  emit('toggle', isOpen.value)
}
watch(() => router.currentRoute.value.path , (newPath) =>{
  isOpen.value = newPath === '/menu'
  
  menuRes.menu = isOpen 
},{immediate:true})

const emit = defineEmits(['toggle'])
</script>


<style scoped>
/* В компоненте Header или в общих стилях */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem; /* Соответствует grid-template-rows: 4rem */
  background: var(--Surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--Border);
  box-shadow: 2px 1px 20px var(--Backgr);
  box-sizing: border-box;
  z-index: 1000;
}
.box-nav{
    height:100%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
      flex-shrink: 0;

      max-width:100%;
      padding-right:2rem;
}

.name-product{
    color:var(--Text);
    font-size:2rem;
    padding:1rem;
}
.link{
    font-size:0.9rem;
    width:auto;
    min-width:6rem;
    padding:0.7rem;
    display:flex;
    justify-content:center;
    align-items:center;
    box-sizing:border-box;
    background:var(--Secondary);
    border-radius:5rem;
    transition:all 0.4s ease;
    cursor:pointer;
    border: 2px solid transparent;
    color:var(--Text);   
    text-decoration:none;
}
.link:hover{
    transform:scale(1.03);
    border:2px solid var(--Border-two);
}

.burger-btn {
  --burger-color: var(--Text);
  --burger-color-hover: var(--Primary);
  --burger-size: 26px;
  --burger-line-height: 3px;
  --burger-gap: 4px;
  --animation-speed: 0.4s;
  width: calc(var(--burger-size) * 1.8);
  height: calc(var(--burger-size) * 1.8);
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  transition: all var(--Transition-Normal);
  border-radius: 8px;
  flex-shrink: 0;
  text-decoration: none;
  display: inline-flex;
  outline: none;
}

.burger-btn:hover {
  background: var(--Surface-Light);
}

.burger-btn:hover .line {
  background: var(--burger-color-hover);
}

.burger-btn.active {
  background: var(--Surface);
}

.burger-btn.active .line {
  background: var(--burger-color-hover);
}

.burger-lines {
  width: var(--burger-size);
  height: calc(var(--burger-line-height) * 3 + var(--burger-gap) * 2);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow:hidden;
}

.line {
  width: 100%;
  height: var(--burger-line-height);
  background: var(--burger-color);
  border-radius: 2px;
  transition: all var(--animation-speed) cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
  position: relative;
}
.burger-btn.active .line-1 {
  transform: translateY(calc(var(--burger-line-height) + var(--burger-gap))) rotate(45deg);
}

.burger-btn.active .line-2 {
  transform: scaleX(0);
  opacity: 0;
}

.burger-btn.active .line-3 {
  transform: translateY(calc(-1 * (var(--burger-line-height) + var(--burger-gap)))) rotate(-45deg);
}
.light-theme .burger-btn {
  --burger-color: var(--Text);
  --burger-color-hover: var(--Primary);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  display:flex;
}


@media(max-width:768px){
    .name-product{
    color:var(--Text);
    font-size:1.6rem;
    padding:0.8rem;
}
.link{
    min-width:5.2rem;
    padding:0.6rem;
}


}
@media(max-width:396px){
    .name-product{
    color:var(--Text);
    font-size:1.35rem;
    padding:0.7rem;
}
.link{
    min-width:5rem;
    padding:0.55rem;
    font-size:0.8rem;
}


}
@media(max-width:376px){
    .name-product{
    color:var(--Text);
    font-size:1.3rem;
    padding:0.5rem;
}
.link{
    min-width:4.8rem;
    padding:0.5rem;
    font-size:0.75rem;
}


}

</style>