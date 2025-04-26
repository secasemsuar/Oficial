// Controlador VSL para integração com Vimeo e efeito blur

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const lockedContent = document.getElementById('locked-content');
    const progressBar = document.getElementById('vsl-progress-bar');
    const vslMessage = document.querySelector('.vsl-message');
    const redirectButton = document.getElementById('redirectButton');
    
    // Verificar se o conteúdo já foi desbloqueado anteriormente
    const contentUnlocked = localStorage.getItem('vslContentUnlocked') === 'true';
    
    // Se já foi desbloqueado, remover o blur imediatamente
    if (contentUnlocked) {
        unlockContent();
    }
    
    // Usar a API do Vimeo Player
    const iframe = document.querySelector('.vsl-video-wrapper iframe');
    if (iframe) {
        const player = new Vimeo.Player(iframe);
        
        // Quando o vídeo começar a rodar, esconde qualquer overlay visual
        player.on('play', function() {
            const overlayButton = document.querySelector('.vsl-play-button');
            if (overlayButton) overlayButton.style.display = 'none';
        });
        
        // Atualizar a barra de progresso durante a reprodução
        player.on('timeupdate', function(data) {
            const percent = (data.percent * 100).toFixed(2);
            if (progressBar) {
                progressBar.style.width = `${percent}%`;
            }
            
            // Desbloquear conteúdo após 90% do vídeo assistido
            if (data.percent >= 0.90 && !contentUnlocked) {
                unlockContent();
                localStorage.setItem('vslContentUnlocked', 'true');
                
                // Destacar o botão de redirecionamento
                if (redirectButton) {
                    document.body.classList.add('video-completed');
                    setTimeout(function() {
                        redirectButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 1000);
                }
            }
        });
        
        // Evento para quando o vídeo termina
        player.on('ended', function() {
            if (!contentUnlocked) {
                unlockContent();
                localStorage.setItem('vslContentUnlocked', 'true');
            }
            
            // Destacar o botão de redirecionamento
            if (redirectButton) {
                document.body.classList.add('video-completed');
                setTimeout(function() {
                    redirectButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1000);
            }
        });
    }
    
    // Função para desbloquear o conteúdo
    function unlockContent() {
        // Adicionar classe de animação de desbloqueio
        if (lockedContent) {
            lockedContent.classList.add('unlocking');
            
            // Após a animação, remover o blur completamente
            setTimeout(function() {
                lockedContent.classList.add('unlocked');
                lockedContent.classList.remove('unlocking');
                
                // Mostrar mensagem de desbloqueio
                const unlockMessage = document.createElement('div');
                unlockMessage.className = 'unlock-message visible';
                unlockMessage.innerHTML = '<i class="fas fa-unlock"></i> Conteúdo desbloqueado! Você já pode acessar todas as informações abaixo.';
                vslMessage.parentNode.insertBefore(unlockMessage, vslMessage.nextSibling);
                
                // Atualizar a mensagem de bloqueio
                vslMessage.style.backgroundColor = 'rgba(0, 204, 0, 0.1)';
                const lockIcon = vslMessage.querySelector('.vsl-lock-icon i');
                if (lockIcon) lockIcon.className = 'fas fa-unlock';
                
                const instruction = vslMessage.querySelector('.vsl-instruction');
                if (instruction) instruction.textContent = 'Conteúdo desbloqueado! Você já pode acessar todas as informações abaixo.';
                
                // Parar a animação de pulsação no ícone
                const lockIconContainer = document.querySelector('.vsl-lock-icon');
                if (lockIconContainer) lockIconContainer.style.animation = 'none';
                
                // Destacar o botão de redirecionamento
                if (redirectButton) {
                    redirectButton.classList.add('attention');
                }
            }, 1000);
        }
    }
    
    // Adicionar suporte para dispositivos móveis
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Ajustes específicos para dispositivos móveis se necessário
    }
});
