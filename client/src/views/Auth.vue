<template>
  <div class="box-auth">
    <form @submit.prevent="handleAuth" class="formData">
      <slot><h1 class="welcomeAuth">Регистрация</h1></slot>

      <div class="inputs-grid">
        <div class="box-input">
          <label for="email">Gmail</label>
          <input type="email" id="email" required class="data-vvod" placeholder="example@gmail.com" v-model="email">
        </div>

        <div class="box-input">
          <label for="password">Пароль</label>
          <input type="password" id="password" required class="data-vvod" placeholder="Минимум 6 символов" v-model="password">
        </div>

        <div class="box-input">
          <label for="username">Имя</label>
          <input type="text" id="username" class="data-vvod" placeholder="Ваше имя" v-model="username">
        </div>

        <div class="box-input">
          <label for="grade">Грейд</label>
          <select id="grade" class="data-vvod select" v-model="grade">
            <option value="" disabled>Выберите грейд</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div class="box-input full">
          <label>Стек</label>
          <input type="text" class="data-vvod" placeholder="Vue, JS, Node..." v-model="stackInput">
        </div>
      </div>

      <div class="box-checkbox">
        <input type="checkbox" id="remember"/>
        <label for="remember">Запомнить меня</label>
      </div>

      <p v-if="message" class="success">{{ message }}</p>

      <div class="boxBtn">
        <button type="submit" class="btnSub" :disabled="!isTrue">Отправить</button>
        <p class="hint">Есть аккаунт? 
          <router-link to="/Login" class="link">Войти</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { authApi } from '../services/Authapi'
import { useRouter } from 'vue-router'

const router = useRouter()
const message = ref('')
const email = ref('')
const password = ref('')
const username = ref('')
const grade = ref('')
const stackInput = ref('')

const isTrue = computed(() => email.value && password.value.length >= 6)

const handleAuth = async () => {
  try{
  const stack = stackInput.value.split(',').map(s => s.trim()).filter(Boolean)
  const data = await authApi.registration(email.value, password.value, username.value, grade.value, stack)
  if (data?.accessToken) {
    message.value = 'Письмо отправлено на почту!'
  }
      else{ message.value = data?.message || 'Ошибка! Подождите 30 секунд чтобы сервер проснулся'
    }
  }
  catch(e){
    message.value = 'Ошибка подключения к серверу'
  }
}

</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.box-auth {
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.formData {
  width: 100%;
  max-width: 560px;
  background: var(--Surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--Text);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.welcomeAuth {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
}

.inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.full {
  grid-column: 1 / -1;
}

.box-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.box-input label {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-left: 0.2rem;
}

.data-vvod {
  width: 100%;
  height: 2.8rem;
  background: transparent;
  border: 1.5px solid var(--Primary);
  border-radius: 10px;
  padding: 0 0.9rem;
  color: var(--Text);
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.data-vvod:focus {
  outline: none;
  border-color: var(--Primary-Hover);
}

.data-vvod::placeholder {
  color: var(--Text);
  opacity: 0.4;
}

.select { cursor: pointer; }

select.data-vvod option {
  background: var(--Surface);
  color: var(--Text);
}

.box-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.box-checkbox input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: var(--Primary);
}

.box-checkbox label {
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.8;
}

.boxBtn {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transform:none !important;
}

.btnSub {
  padding: 0.9rem;
  width: 100%;
  color: var(--Text);
  background: var(--Primary);
  border: 0;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s, border 0.2s;
}

.btnSub:hover { border: 2px solid var(--Primary-Hover); }
.btnSub:disabled { opacity: 0.3; cursor: no-drop; pointer-events: none; }

.success {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--Primary);
}

.hint {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
}

.link {
  color: var(--Primary);
  text-decoration: none;
  font-weight: 600;
}

.link:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .inputs-grid { grid-template-columns: 1fr; }
  .full { grid-column: 1; }
  .formData { padding: 1.5rem; }
}

@media (max-width: 431px) {
  .welcomeAuth { font-size: 1.5rem; }
  .formData { padding: 1.2rem; gap: 0.8rem; }
}
</style>