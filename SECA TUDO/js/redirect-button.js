// Script para controlar o botão de redirecionamento

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const redirectButton = document.getElementById('redirectButton');
    const vslVideo = document.getElementById('vsl-video');
    
    // URL para redirecionamento (atualizado com o link Kiwify)
    const redirectUrl = 'https://pay.kiwify.com.br/xb5u5ca';
    
    // Adicionar classe de flutuação ao botão para chamar mais atenção
    setTimeout(function() {
        redirectButton.classList.add('floating');
    }, 3000);
    
    // Configurar evento de clique para redirecionamento
    redirectButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Adicionar efeito visual ao clicar
        redirectButton.classList.add('clicked');
        
        // Redirecionar após breve delay para o efeito visual ser percebido
        setTimeout(function() {
            window.location.href = redirectUrl;
        }, 300);
    });
    
    // Destacar o botão quando o vídeo terminar
    if (vslVideo) {
        vslVideo.addEventListener('ended', function() {
            document.body.classList.add('video-completed');
            
            // Rolar suavemente até o botão
            setTimeout(function() {
                redirectButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        });
    }
    
    // Atualizar o URL de redirecionamento com parâmetros UTM se existirem
    function updateRedirectUrlWithUtm() {
        // Obter parâmetros UTM da URL atual
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        
        // Verificar se há parâmetros UTM
        let hasUtm = false;
        for (const param of utmParams) {
            if (urlParams.has(param)) {
                hasUtm = true;
                break;
            }
        }
        
        // Se houver parâmetros UTM, adicionar ao URL de redirecionamento
        if (hasUtm) {
            const redirectUrlObj = new URL(redirectUrl);
            
            for (const param of utmParams) {
                if (urlParams.has(param)) {
                    redirectUrlObj.searchParams.set(param, urlParams.get(param));
                }
            }
            
            // Atualizar o evento de clique com o novo URL
            redirectButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Adicionar efeito visual ao clicar
                redirectButton.classList.add('clicked');
                
                // Redirecionar após breve delay para o efeito visual ser percebido
                setTimeout(function() {
                    window.location.href = redirectUrlObj.toString();
                }, 300);
            });
        }
    }
    
    // Inicializar a função de atualização de URL
    updateRedirectUrlWithUtm();
    
    // Adicionar suporte para dispositivos móveis
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Ajustar tamanho do botão para dispositivos móveis
        redirectButton.style.padding = '15px 25px';
        
        // Adicionar feedback tátil ao clicar no botão em dispositivos que suportam
        redirectButton.addEventListener('click', function() {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    }
});
