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