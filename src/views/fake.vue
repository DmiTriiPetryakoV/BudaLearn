<template>
    <div class="boxFake">
        <div class="animBox">
            <div class="icon-container">
                <i class="fa-solid fa-atom icon-main"></i>

            </div>
            <p class="text-fade">Авторы сайта уже работают над этим разделом</p>
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.boxFake {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: var(--Text);
}

.animBox {
    min-width: 50vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 3rem;
}

.icon-container {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-main {
    font-size: 10rem;
    color: var(--Primary);
    animation: rotate 10s infinite;
    filter: drop-shadow(0 0 30px var(--Primary));
    position: relative;
    z-index: 2;
}

.glow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, var(--Primary) 0%, transparent 70%);
    opacity: 0.3;
    animation: pulse-glow 3s ease-in-out infinite;
    border-radius: 50%;
}

.text-fade {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--Text);
    max-width: 600px;
    padding: 0 2rem;
}

.dots {
    display: flex;
    gap: 1rem;
}

.dots span {
    width: 12px;
    height: 12px;
    background: var(--Primary);
    border-radius: 50%;
    animation: bounce 1.8s ease-in-out infinite;
}

.dots span:nth-child(2) {
    animation-delay: 0.3s;
}

.dots span:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    25% {
        transform: rotate(90deg) translateY(100px) translateX(80px);
    }
    50% {
        transform: rotate(180deg) translateY(120px) translateX(60px);
    }
    75% {
        transform: rotate(270deg) translateY(100px) translateX(80px);
    }
    100% {
        transform: rotate(360deg) translateY(0) translateX(0);
    }
}

@keyframes pulse-glow {
    0%, 100% {
        transform: scale(1);
        opacity: 0.3;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.5;
    }
}

@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(1) translateY(0);
        opacity: 0.7;
    }
    40% {
        transform: scale(1.3) translateY(-10px);
        opacity: 1;
    }
}

/* Адаптив */
@media (max-width: 1024px) {
    .icon-main {
        font-size: 8rem;
    }
    
    .icon-container {
        width: 180px;
        height: 180px;
    }
    
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(90deg) translateY(70px) translateX(60px);
        }
        50% {
            transform: rotate(180deg) translateY(90px) translateX(40px);
        }
        75% {
            transform: rotate(270deg) translateY(70px) translateX(60px);
        }
        100% {
            transform: rotate(360deg) translateY(0) translateX(0);
        }
    }
}

@media (max-width: 768px) {
    .icon-main {
        font-size: 6rem;
    }
    
    .icon-container {
        width: 150px;
        height: 150px;
    }
    
    .text-fade {
        font-size: 1rem;
    }
    
    .animBox {
        gap: 2rem;
        min-width: 90vw;
    }
    
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(90deg) translateY(50px) translateX(40px);
        }
        50% {
            transform: rotate(180deg) translateY(60px) translateX(30px);
        }
        75% {
            transform: rotate(270deg) translateY(50px) translateX(40px);
        }
        100% {
            transform: rotate(360deg) translateY(0) translateX(0);
        }
    }
}

@media (max-width: 480px) {
    .icon-main {
        font-size: 4rem;
    }
    
    .icon-container {
        width: 100px;
        height: 100px;
    }
    
    .text-fade {
        font-size: 0.9rem;
        padding: 0 1rem;
    }
    
    .animBox {
        gap: 1.5rem;
    }
    
    .dots span {
        width: 10px;
        height: 10px;
    }
    
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(90deg) translateY(30px) translateX(25px);
        }
        50% {
            transform: rotate(180deg) translateY(40px) translateX(20px);
        }
        75% {
            transform: rotate(270deg) translateY(30px) translateX(25px);
        }
        100% {
            transform: rotate(360deg) translateY(0) translateX(0);
        }
    }
}
</style>

<script setup>
</script>