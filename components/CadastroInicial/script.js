/* ============= SCRIPT PRINCIPAL DO CADASTRO INICIAL ============= */

// ============= ANIMAÇÕES E INTERAÇÕES =============

/**
 * Adiciona animações de entrada aos elementos
 */
function initAnimations() {
    const container = document.querySelector('.container');
    const patas = document.querySelectorAll('[class^="patas"]');
    
    // Anima container
    if (container) {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Anima patas sequencialmente
    patas.forEach((pata, index) => {
        setTimeout(() => {
            pata.style.opacity = '1';
            pata.style.transform = 'scale(1)';
        }, 200 + (index * 100));
    });
}

/**
 * Adiciona efeito parallax suave
 */
function initParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const patas = document.querySelectorAll('[class^="patas"]');
        
        patas.forEach((pata, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            pata.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

/**
 * Adiciona efeitos de hover nos botões
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-cadastro');
    
    buttons.forEach(button => {
        // Efeito de onda ao clicar
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Efeito de inclinação 3D
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                scale(1.02)
            `;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Adiciona animação de ripple ao CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/**
 * Animação do cachorro
 */
function initDogAnimation() {
    const dogImage = document.querySelector('.dog-image img');
    
    if (dogImage) {
        let isWagging = false;
        
        dogImage.addEventListener('mouseenter', function() {
            if (!isWagging) {
                isWagging = true;
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'dogWag 0.5s ease-in-out 3';
                }, 10);
                
                setTimeout(() => {
                    this.style.animation = 'bounce 2s ease-in-out infinite';
                    isWagging = false;
                }, 1500);
            }
        });
    }
}

// Adiciona animação de abanar
const dogWagStyle = document.createElement('style');
dogWagStyle.textContent = `
    @keyframes dogWag {
        0%, 100% { transform: rotate(0deg) translateY(0); }
        25% { transform: rotate(-5deg) translateY(-5px); }
        75% { transform: rotate(5deg) translateY(-5px); }
    }
`;
document.head.appendChild(dogWagStyle);

/**
 * Efeitos nas patas decorativas
 */
function initPawEffects() {
    const patas = document.querySelectorAll('[class^="patas"]');
    
    patas.forEach(pata => {
        pata.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.filter = 'drop-shadow(0 8px 16px rgba(90, 6, 9, 0.3))';
        });
        
        pata.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))';
        });
        
        // // Clique nas patas faz aparecer um coração
        // pata.addEventListener('click', function() {
        //     const heart = document.createElement('div');
        //     heart.textContent = '❤️';
        //     heart.style.cssText = `
        //         position: fixed;
        //         left: ${event.clientX}px;
        //         top: ${event.clientY}px;
        //         font-size: 2rem;
        //         pointer-events: none;
        //         z-index: 9999;
        //         animation: heartFloat 1s ease-out forwards;
        //     `;
            
        //     document.body.appendChild(heart);
            
        //     setTimeout(() => heart.remove(), 1000);
        // });
    });
}

// Adiciona animação de coração flutuante
const heartFloatStyle = document.createElement('style');
heartFloatStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartFloatStyle);

/**
 * Validação de formulário (preparado para futuras validações)
 */
function initFormValidation() {
    const buttons = document.querySelectorAll('.btn-cadastro');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adiciona feedback visual
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });
    });
}

/**
 * Scroll suave para links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// /**
//  * Detecta modo escuro do sistema (preparado para futuras features)
//  */
// function detectDarkMode() {
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         console.log('🌙 Modo escuro detectado');
//         // Aqui você pode adicionar estilos para modo escuro
//     }
    
//     // Listener para mudanças no modo escuro
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//         const isDarkMode = e.matches;
//         console.log(`Modo ${isDarkMode ? 'escuro' : 'claro'} ativado`);
//     });
// }

/**
 * Adiciona tooltips informativos
 */
function initTooltips() {
    const buttons = document.querySelectorAll('.btn-cadastro');
    
    buttons.forEach(button => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        const description = button.querySelector('.btn-description');
        if (description) {
            tooltip.textContent = description.textContent;
            button.style.position = 'relative';
            button.appendChild(tooltip);
            
            button.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
            });
            
            button.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
            });
        }
    });
}

/**
 * Analytics e tracking (preparado para Google Analytics)
 */
function trackPageView() {
    console.log('📊 Página de cadastro visualizada');
    
    // Aqui você pode adicionar código do Google Analytics
    // gtag('event', 'page_view', {
    //     page_title: 'Cadastro Inicial',
    //     page_location: window.location.href,
    //     page_path: window.location.pathname
    // });
}

function trackButtonClick(buttonType) {
    console.log(`🖱️ Botão clicado: ${buttonType}`);
    
    // Aqui você pode adicionar código do Google Analytics
    // gtag('event', 'button_click', {
    //     button_type: buttonType
    // });
}

/**
 * Adiciona listeners para tracking
 */
function initTracking() {
    const usuarioBtn = document.getElementById('botao_usuario');
    const vendedorBtn = document.getElementById('botao_vendedor');
    const googleBtn = document.getElementById('googleSign');
    
    if (usuarioBtn) {
        usuarioBtn.addEventListener('click', () => trackButtonClick('cadastro_usuario'));
    }
    
    if (vendedorBtn) {
        vendedorBtn.addEventListener('click', () => trackButtonClick('cadastro_vendedor'));
    }
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => trackButtonClick('login_google'));
    }
}

/**
 * Listener para eventos de login/logout
 */
function initAuthListeners() {
    // Quando usuário faz login
    document.addEventListener('userLoggedIn', (e) => {
        const user = e.detail;
        console.log('✅ Usuário logado:', user.name);
        trackButtonClick('login_success');
    });
    
    // Quando usuário faz logout
    document.addEventListener('userLoggedOut', () => {
        console.log('👋 Usuário deslogado');
        trackButtonClick('logout');
    });
}

/**
 * Acessibilidade por teclado
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Adiciona estilos para navegação por teclado
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #5A0609 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

/**
 * Performance monitoring
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('⚡ Performance:', {
                    'Tempo de carregamento': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms',
                    'Tempo de DOM': Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms'
                });
            }, 0);
        });
    }
}



// ============= INICIALIZAÇÃO =============

document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 APANIM - Página de Cadastro Inicial carregada');
    
    // Inicializa todas as funcionalidades
    initAnimations();
    initParallax();
    initButtonEffects();
    initDogAnimation();
    initPawEffects();
    initFormValidation();
    initSmoothScroll();
    initTooltips();
    initTracking();
    initAuthListeners();
    initKeyboardNavigation();
    
    // Detecta modo escuro
    //detectDarkMode();
    
    // Tracking
    trackPageView();
    
    // Monitor de performance
    monitorPerformance();
    
    console.log('✅ Todas as funcionalidades inicializadas com sucesso');
});

// ============= EXPORTS =============
window.CadastroApp = {
    trackButtonClick,
    trackPageView
};