<template>
    <div class="boxFake">
        <div class="animBox">
            <div class="icon-container">
                <i class="fa-solid fa-atom icon-main rotate"></i>
            </div>
            <p class="text-fade">Авторы сайта уже работают над этим разделом</p>
            <p class="update">Next update : 1.03.2026</p>
        </div>
    </div>
</template>

<style scoped>

.animBox{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    margin-top:5rem;
    gap:3rem;
}
.icon-container{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    font-size:10rem;
    color:var(--Primary);
}
.rotate{
        animation:rotate 3s infinite;
}
.update{
    color:var(--Text);
    opacity:0.6;
}
@keyframes rotate{
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}

.text-fade{
    color:var(--Primary);
    font-weight:600;
    font-size:1.5rem;
}
@media(max-width:738px){
    .text-fade{
        font-size:1.4rem;
    }
    .icon-container{
        text-align:center;
        flex-wrap:wrap;
}
.animBox{
    text-align:center;
}
}





@media(max-width:438px){
    .text-fade{
        font-size:1.4rem;
    }
    .icon-container{
        text-align:center;
        flex-wrap:wrap;
}
.animBox{
    text-align:center;
}
}



</style>
<script setup>
</script>
