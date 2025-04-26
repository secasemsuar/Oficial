// Melhorias específicas para dispositivos móveis
document.addEventListener('DOMContentLoaded', () => {
    // Detectar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Adicionar classe ao body para estilos específicos
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Melhorar experiência de toque para o slider de testemunhos
    const testimonialSlider = document.getElementById('testimonialSlider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (testimonialSlider && sliderDots.length > 0) {
        // Variáveis para controle de toque
        let startX, moveX, currentSlide = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
        
        // Atualizar indicadores de slide
        const updateSliderDots = (index) => {
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };
        
        // Eventos de toque para o slider
        testimonialSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialSlider.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        });
        
        testimonialSlider.addEventListener('touchend', () => {
            if (startX && moveX) {
                const diff = startX - moveX;
                
                // Se o movimento foi significativo
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // Deslizar para a direita
                        currentSlide = Math.min(currentSlide + 1, testimonials.length - 1);
                    } else {
                        // Deslizar para a esquerda
                        currentSlide = Math.max(currentSlide - 1, 0);
                    }
                    
                    // Rolar para o slide atual
                    testimonials[currentSlide].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start'
                    });
                    
                    // Atualizar indicadores
                    updateSliderDots(currentSlide);
                }
            }
            
            // Resetar variáveis
            startX = null;
            moveX = null;
        });
        
        // Clicar nos indicadores para navegar
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                testimonials[currentSlide].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
                updateSliderDots(currentSlide);
            });
        });
    }
    
    // Melhorar experiência de toque para o FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Fechar outros itens
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                if (otherItem !== item && otherQuestion.getAttribute('aria-expanded') === 'true') {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar estado
            question.setAttribute('aria-expanded', !isExpanded);
            item.classList.toggle('active');
            
            // Adicionar feedback tátil em dispositivos que suportam
            if ('vibrate' in navigator && isMobile) {
                navigator.vibrate(50);
            }
        });
        
        // Suporte a teclado
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Melhorar experiência de toque para opções de pagamento
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remover classe ativa de todas as opções
            paymentOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Adicionar classe ativa à opção clicada
            option.classList.add('active');
            
            // Adicionar feedback tátil em dispositivos que suportam
            if ('vibrate' in navigator && isMobile) {
                navigator.vibrate(50);
            }
        });
        
        // Suporte a teclado
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });
    
    // Melhorar experiência de formulário em dispositivos móveis
    const form = document.getElementById('checkoutForm');
    
    if (form) {
        // Formatar CPF automaticamente
        const cpfInput = document.getElementById('cpf');
        
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 11) {
                    value = value.slice(0, 11);
                }
                
                if (value.length > 9) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                }
                
                e.target.value = value;
            });
        }
        
        // Melhorar feedback visual ao enviar o formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('.checkout-button');
            
            // Adicionar classe de loading
            submitButton.classList.add('loading');
            submitButton.textContent = 'PROCESSANDO...';
            
            // Simular processamento (em produção, isso seria uma chamada real de API)
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.classList.add('success');
                submitButton.textContent = 'COMPRA REALIZADA!';
                
                // Mostrar mensagem de sucesso
                alert('Obrigado pela compra! Você receberá o ebook em seu e-mail em instantes.');
                
                // Resetar formulário após alguns segundos
                setTimeout(() => {
                    form.reset();
                    submitButton.classList.remove('success');
                    submitButton.textContent = 'FINALIZAR COMPRA';
                }, 3000);
            }, 2000);
        });
    }
    
    // Otimizar contador para dispositivos móveis
    const updateCountdownDisplay = () => {
        const countdownElements = document.querySelectorAll('#countdown, #finalCountdown');
        
        if (countdownElements.length > 0) {
            // Verificar se o contador está visível na tela
            const isVisible = Array.from(countdownElements).some(el => {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            });
            
            // Reduzir a frequência de atualização quando não estiver visível
            if (!isVisible && isMobile) {
                document.body.classList.add('countdown-offscreen');
            } else {
                document.body.classList.remove('countdown-offscreen');
            }
        }
    };
    
    // Verificar visibilidade do contador durante a rolagem
    window.addEventListener('scroll', updateCountdownDisplay);
    
    // Inicializar verificação
    updateCountdownDisplay();
});
