<template>
    <button class="my-button" @click="$emit('click')">
        <slot>Кнопка</slot>
    </button>
</template>

<script setup>
defineEmits(['click'])

</script>



<style scoped>

.my-button {
    background: var(--Primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    min-width:5rem;
    min-height:3rem;
}

.my-button:hover {
    transform:scale(1.02);
    opacity:0.8;
}
@media(max-width:768px){
    .my-button {
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    min-width:4.5rem;
    min-height:2.8rem;
}
}

</style>