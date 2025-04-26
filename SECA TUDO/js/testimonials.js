// Função para carregar as imagens de testemunhos
document.addEventListener('DOMContentLoaded', () => {
    const testimonialSlider = document.getElementById('testimonialSlider');
    
    // Verificar se o slider existe
    if (!testimonialSlider) return;
    
    // Limpar o slider (caso já tenha conteúdo)
    testimonialSlider.innerHTML = '';
    
    // Dados dos testemunhos com nomes femininos
    const testimonials = [
        {
            name: "Ana, 32 anos",
            text: "Perdi 7kg em apenas 3 semanas seguindo esse método! Nunca me senti tão bem!"
        },
        {
            name: "Beatriz, 41 anos",
            text: "Depois de 2 filhos, achei que nunca mais teria minha barriga de volta. Esse método provou que eu estava errada!"
        },
        {
            name: "Carla, 28 anos",
            text: "Já tinha tentado de tudo. Esse foi o ÚNICO método que realmente funcionou para mim!"
        },
        {
            name: "Daniela, 35 anos",
            text: "Meu marido não acreditou quando viu minha transformação em apenas 1 mês!"
        },
        {
            name: "Elena, 45 anos",
            text: "Na minha idade, achei que seria impossível. Mas consegui perder 9kg sem nenhum esforço!"
        }
    ];
    
    // Adicionar os testemunhos com as imagens renomeadas
    const nomesMulheres = ["ana", "beatriz", "carla", "daniela", "elena"];
    
    for (let i = 0; i < 5; i++) {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        
        // Usar as imagens com nomes femininos
        testimonialItem.innerHTML = `
            <div class="testimonial-before-after">
                <div class="testimonial-image testimonial-before" style="background-image: url('images/testimonials/${nomesMulheres[i]}_antes.png'); background-size: cover;"></div>
                <div class="testimonial-image testimonial-after" style="background-image: url('images/testimonials/${nomesMulheres[i]}_depois.png'); background-size: cover;"></div>
            </div>
            <div class="testimonial-text">${testimonials[i].text}</div>
            <div class="testimonial-name">${testimonials[i].name}</div>
        `;
        
        testimonialSlider.appendChild(testimonialItem);
    }
});
