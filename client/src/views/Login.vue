<template>
  <div class="box-auth">
    <form @submit.prevent="handleLogin" method="POST" class="formData">
        <h1 class="welcomeAuth">Авторизация</h1>
      <div class="box-input">
        <label for="email">Gmail:</label>
        <input type="email" id="email" name="email" required class="data-vvod" placeholder="Gmail" v-model="email">
      </div>
      
      <div class="box-input"> 
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" required class="data-vvod" placeholder="Пароль" v-model="password">
      </div>
      
      <div class="box-checkbox">
        <input type="checkbox" id="remember" name="remember"/>
        <label for="remember">Запомнить меня</label>
      </div>
        <h1 class="success">{{message}}</h1>
      <div class="boxBtn">
        <button type="submit" class="btnSub" :disabled="!isTrue">Отправить</button>
        <p class="message">Нет аккаунта? <strong class="accent"><router-link to="/registration" class="link">Зарегистрироваться!</router-link></strong></p>
        <i class="fas fa-terminal info-icon"></i>
      </div>
    </form>
  </div>
</template>


<script setup>




import {ref , computed} from 'vue'
import { authApi } from '../services/Authapi'
import { authLogin } from '../services/loginapi.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/nameTechnology'
const userStore = useUserStore()
const router = useRouter() 
const message = ref('')

const handleLogin = async() => {
  const data = await authLogin.login(email.value , password.value)
  if(data.accessToken){
    message.value = 'Вы успешно Вошли'
    console.log('данные из логина:', data)
    userStore.setUser(data)
    console.log('стор после setUser:', userStore.user)
    router.push('/profile')
  }
}






const email = ref('')
const password = ref('')



const isTrue = computed(() => {
  return email.value && password.value.length >= 6

})



</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.box-auth {
  min-width: 50vw;
  min-height: 90vh;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.formData {
  min-width: 100%;
  max-height: 80vh;
  min-height: 70vh;
  background: var(--Surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: stretch;  
  text-align:center;  
  gap: 1.5rem;              
  padding: 4rem;
  color: var(--Text);
  border-radius: 20px;
  box-shadow: 0px 10px 10px 10px var(--Surface-Dark);
}

.welcomeAuth {
  text-align: center;
  font-size: 2.2rem;
  width: 100%;             
}


.box-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.box-input label {
  text-align: left;       
  font-size: 1rem;
  margin-left: 0.2rem;
}

.data-vvod {
  width: 100%;
  min-height: 3.5rem;
  background: transparent;
  border: 2px solid var(--Primary);
  border-radius: 10px;
  padding: 1rem;
  color: var(--Text);
  font-size: 1rem;
}

.data-vvod:focus {
  outline: none;
  border-color: var(--Primary-Hover);

}

.data-vvod::placeholder {
  color: var(--Text);
  opacity: 0.5;
}

.box-checkbox {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  margin: 0.5rem 0; 
}

.box-checkbox input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  accent-color: var(--Primary);
}

.box-checkbox label {
  color: var(--Text);
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.9;
}
.boxBtn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;    
  gap: 1.5rem;
  margin-top: 1rem;

}
.btnSub:disabled {
  opacity: 0.3;
  cursor: no-drop;
  pointer-events: none;
}

.btnSub {
  padding: 1.2rem;
  width: 100%;            
  color: var(--Text);
  background: var(--Primary);
  border: 0;
  border-radius: 10px;
  font-size: 1.2rem;
  opacity: 1;
  cursor: pointer;
  text-align: center;      
}

.btnSub:hover {
  border: 2px solid var(--Primary-Hover);
}
.success{
  font-size:1.8rem;
  font-weight:700;
  color:var(--Text); 
  margin:0;
  padding:0;
}
.message {
  width: 100%;
  text-align: center;
  color: var(--Text);
  font-size: 1rem;
  opacity: 0.8;
}

.accent {
  color: var(--Primary);
  cursor: pointer;
  font-weight: 600;
}

.accent:hover {
  text-decoration: underline;
}

.box-input,
.box-checkbox,
.boxBtn {
  width: 100%;
  max-width: 100%;       
}
.link{
    text-decoration:none;
    color:var(--Primary);
}

@media (max-width: 768px) {
  .formData {
    padding: 2rem;
    gap: 1.5rem;
  }
}
@media (max-width: 431px) {
  .formData {
    padding:1.5rem;
    gap: 1.5rem;
    min-width:85%;
    min-height:50%;    
  }
  .btnSub {
  padding:1rem;
}
.welcomeAuth{
  font-size:2rem;
  margin:0;
}
}
@media (max-width: 768px) {
  .formData {
    padding: 2rem;
    gap: 1.5rem;
  }
  .success {
    font-size: 1.4rem;
  }
}

@media (max-width: 431px) {
  .formData {
    padding: 1.5rem;
    gap: 1.5rem;
    min-width: 85%;
    min-height: 50%;
  }
  .btnSub {
    padding: 1rem;
  }
  .welcomeAuth {
    font-size: 2rem;
    margin: 0;
  }
  .success {
    font-size: 1.1rem;  /* меньше на маленьких экранах */
  }
}
</style>