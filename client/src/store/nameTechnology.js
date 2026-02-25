import { defineStore } from 'pinia'
import { ref} from 'vue'
import {lessonsApi} from '../services/lessonsApi'


export const useNameTechnology = defineStore('tech', ( ) => {
    const name = ref('')
    const totalLessons = ref(0)
    const loadLessons =  async (technology) => {
    const topics = await lessonsApi.getTopics(technology)
    totalLessons.value = topics.length
}
return {loadLessons , totalLessons , name}
})
export const useMenu = defineStore('menu' , () => {
    const menu = ref(false)
    return{
        menu
    }
})

export const useTheme = defineStore('theme' , () => {
    const isDark = ref(false)
    function toggleTheme(){
       console.log(isDark.value)
        isDark.value = !isDark.value;
        console.log(isDark.value)
    }
    return{isDark , toggleTheme}
} , {persist:true})


export const useUserStore = defineStore('user' , () => {
    const accessToken = ref('')
    const user = ref(null)
    const setUser = (data) => {
        accessToken.value = data.accessToken
        user.value = data.user
    }
    const logout = () => {
        accessToken.value = ''
        user.value = null
    }
    return {accessToken , user, setUser , logout}
},{persist:true})


