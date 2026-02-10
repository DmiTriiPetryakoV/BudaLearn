<template>
    <footer class="box-footer">
        <div class="social-links">
            <a class="social-link" href="https://t.me/BudaCommunity" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-telegram"></i>
                <span>Telegram</span>
            </a>
            <a class="social-link" href="#" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
            </a>
            <a class="social-link" href="https://www.tiktok.com/@mrboolean22?_r=1&_t=ZS-93KtdijEfcS" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-tiktok"></i>
                <span>TikTok</span>
            </a>
            <a class="social-link" href="https://youtube.com/@budacode?si=9_qrkk8XZOztgpQG" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube"></i>
                <span>YouTube</span>
            </a>
        </div>
        <div class="footer-info">
            <p class="support-message">{{ message }}</p>
            <p class="copyright">{{ flag }}</p>

            <p class="info">Version {{version}}</p>
            <p class="info">Next Update : {{data}}</p>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue"

const message = ref('Поддержите автора сайта, перейдя по ссылкам выше')
const year = new Date().getFullYear()
const flag = ref(`© ${year} BudaLearn. Author: Buda`)
const version = ref(1 + '.' +1 + '.' +1)
const data = ref('1.03.2026')

</script>

<style scoped>
.box-footer {
    width: 100%;
    min-height: 35vh;
    background: var(--Background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    padding: 2rem 1rem;
    box-sizing: border-box;
}
.info{
    margin:0;
    opacity:0.6;
}
.social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    max-width: 1200px;
    width: 100%;
}

.social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--Text);
    text-decoration: none;
    background: var(--Primary);
    border-radius: 16px;
    padding: 1.5rem;
    min-width: 180px;
    min-height: 120px;
    transition: all 0.3s ease;
    opacity: 0.8;
    border: 2px solid transparent;
}

.social-link:hover {
    opacity: 1;
    border-color: var(--Primary-Hover);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.social-link i {
    font-size: 2rem;
}

.social-link span {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
}

.footer-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--Text);
    gap: 0.5rem;
    max-width: 800px;
    padding: 0 1rem;
}

.support-message {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
}

.copyright {
    font-size: 0.95rem;
    opacity: 0.8;
    margin: 0;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 992px) {
    .box-footer {
        min-height: 40vh;
        gap: 2rem;
    }
    
    .social-link {
        min-width: 110px;
        min-height: 110px;
        padding: 1.25rem;
    }
    
    .social-link i {
        font-size: 1.75rem;
    }
    
    .social-link span {
        font-size: 0.95rem;
    }
    
    .support-message {
        font-size: 1.15rem;
    }
}

@media (max-width: 768px) {
    .box-footer {
        min-height: 50vh;
        gap: 2rem;
        padding: 1.5rem 1rem;
    }
    
    .social-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
        display: grid;
        max-width: 400px;
    }
    
    .social-link {
        min-width: 100%;
        min-height: 100px;
        padding: 1.25rem;
    }
    
    .support-message {
        font-size: 1.1rem;
    }
    
    .copyright {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .box-footer {
        min-height: 60vh;
        gap: 1.75rem;
        padding: 1.25rem 0.75rem;
    }
    
    .social-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        max-width: 320px;
    }
    
    .social-link {
        min-height: 90px;
        padding: 1rem;
        border-radius: 14px;
    }
    
    .social-link i {
        font-size: 1.5rem;
    }
    
    .social-link span {
        font-size: 0.85rem;
    }
    
    .support-message {
        font-size: 1rem;
        padding: 0 0.5rem;
    }
    
    .copyright {
        font-size: 0.85rem;
    }
}

@media (max-width: 320px) {
    .box-footer {
        min-height: 65vh;
        gap: 1.5rem;
    }
    
    .social-links {
        grid-template-columns: 1fr;
        max-width: 250px;
    }
    
    .social-link {
        min-height: 85px;
        padding: 0.875rem;
    }
    
    .support-message {
        font-size: 0.95rem;
    }
    
    .copyright {
        font-size: 0.8rem;
    }
}
</style>