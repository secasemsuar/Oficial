// Contador regressivo
function startCountdown() {
    let minutes = 15;
    let seconds = 0;
    
    const countdownInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const timeString = `${formattedMinutes}:${formattedSeconds}`;
        
        document.getElementById('countdown').textContent = timeString;
        document.getElementById('finalCountdown').textContent = timeString;
    }, 1000);
}

// Testemunhos
const testimonials = [
    {
        text: "Eu tentei TUDO antes disso. Em 7 dias perdi 3,5kg e minha barriga desinflou completamente!",
        name: "Mariana, 32 anos"
    },
    {
        text: "Achei que era impossível perder peso sem academia. Perdi 4kg em 8 dias seguindo esse método!",
        name: "Carlos, 41 anos"
    },
    {
        text: "Minha autoestima voltou! Perdi 2 números de calça em apenas 2 semanas sem passar fome!",
        name: "Juliana, 28 anos"
    },
    {
        text: "Depois de 3 filhos achei que nunca mais teria meu corpo de volta. Esse método provou que eu estava errado!",
        name: "Roberto, 37 anos"
    },
    {
        text: "Já tinha desistido de usar biquíni, agora estou me sentindo confiante de novo! Perdi 5kg em 3 semanas!",
        name: "Amanda, 35 anos"
    }
];

function loadTestimonials() {
    const testimonialSlider = document.getElementById('testimonialSlider');
    
    testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        
        testimonialItem.innerHTML = `
            <div class="testimonial-before-after">
                <div class="testimonial-image testimonial-before" id="before-${index}"></div>
                <div class="testimonial-image testimonial-after" id="after-${index}"></div>
            </div>
            <div class="testimonial-text">"${testimonial.text}"</div>
            <div class="testimonial-name">${testimonial.name}</div>
        `;
        
        testimonialSlider.appendChild(testimonialItem);
    });
}

// Notificações de compra ao vivo
const cities = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Fortaleza",
    "Brasília", "Curitiba", "Recife", "Porto Alegre", "Manaus", "Goiânia",
    "Belém", "Guarulhos", "Campinas", "São Luís", "Maceió", "Natal", "Teresina"
];

const names = [
    "Maria", "João", "Ana", "Carlos", "Juliana", "Pedro", "Fernanda", "Lucas",
    "Amanda", "Roberto", "Patrícia", "Marcos", "Camila", "Rafael", "Mariana",
    "Bruno", "Larissa", "Diego", "Aline", "Gustavo", "Tatiana", "Rodrigo"
];

function showRandomNotification() {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    const liveNotifications = document.getElementById('liveNotifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${randomName} de ${randomCity}</div>
            <div class="notification-message">acabou de comprar!</div>
        </div>
    `;
    
    liveNotifications.appendChild(notification);
    
    // Remover notificação após 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// FAQ interativo
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar estado do item atual
            item.classList.toggle('active');
        });
    });
}

// Opções de pagamento
function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remover classe ativa de todas as opções
            paymentOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Adicionar classe ativa à opção clicada
            option.classList.add('active');
        });
    });
}

// Botões CTA
function setupCTAButtons() {
    const ctaButton = document.getElementById('ctaButton');
    const finalCtaButton = document.getElementById('finalCtaButton');
    const checkout = document.getElementById('checkout');
    
    ctaButton.addEventListener('click', () => {
        checkout.scrollIntoView({ behavior: 'smooth' });
    });
    
    finalCtaButton.addEventListener('click', () => {
        checkout.scrollIntoView({ behavior: 'smooth' });
    });
}

// Formulário de checkout
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui seria implementada a lógica de processamento do pagamento
        alert('Obrigado pela compra! Você receberá o ebook em seu e-mail em instantes.');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    loadTestimonials();
    setupFAQ();
    setupPaymentOptions();
    setupCTAButtons();
    setupCheckoutForm();
    
    // Mostrar notificações aleatórias a cada 5-15 segundos
    setInterval(() => {
        showRandomNotification();
    }, Math.random() * 10000 + 5000);
    
    // Mostrar primeira notificação após 3 segundos
    setTimeout(() => {
        showRandomNotification();
    }, 3000);
});

// Efeito de ping de áudio quando alguém compra
function playPingSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
    audio.volume = 0.5;
    audio.play();
}

// Adicionar som ao mostrar notificação
const originalShowRandomNotification = showRandomNotification;
showRandomNotification = function() {
    originalShowRandomNotification();
    playPingSound();
};
