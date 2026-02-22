import { defineStore } from 'pinia'
import { ref} from 'vue'

export const useNameTechnology = defineStore('tech', ( ) => {
    const name = ref('')
    return{
        name
    }

})
export const useMenu = defineStore('menu' , () => {
    const menu = ref(false)
    return{
        menu
    }
})

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