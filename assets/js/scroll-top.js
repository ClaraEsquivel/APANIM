/**
 * =========================================
 * APANIM - Scroll to Top Button (Unificado)
 * =========================================
 * Arquivo: scroll-to-top.js
 * Descrição: Botão flutuante para voltar ao topo da página
 * Versão: 1.1 - Simplificada e otimizada
 * 
 * Como usar:
 * Adicione este script no final do <body> de qualquer página:
 * <script src="../../assets/js/scroll-to-top.js"></script>
 * 
 * OU use o caminho relativo correto para sua estrutura:
 * <script src="scroll-to-top.js"></script>
 */

// Aguarda o DOM estar completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
    initScrollToTop();
}

function initScrollToTop() {
    // Configurações padrão
    var config = {
        scrollThreshold: 300,
        buttonColor: 'linear-gradient(135deg, #5A0609, #420406)',
        buttonIcon: '↑',
        bottomPosition: '30px',
        rightPosition: '30px',
        buttonSize: '50px',
        zIndex: 1000
    };
    
    // Verifica personalizações via atributos data-*
    if (document.body.getAttribute('data-scroll-position')) {
        config.scrollThreshold = parseInt(document.body.getAttribute('data-scroll-position'));
    }
    if (document.body.getAttribute('data-scroll-color')) {
        config.buttonColor = document.body.getAttribute('data-scroll-color');
    }
    if (document.body.getAttribute('data-scroll-icon')) {
        config.buttonIcon = document.body.getAttribute('data-scroll-icon');
    }
    
    // Cria o botão
    var scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = config.buttonIcon;
    scrollToTopBtn.className = 'apanim-scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo da página');
    scrollToTopBtn.setAttribute('title', 'Voltar ao topo');
    scrollToTopBtn.setAttribute('type', 'button');
    
    // Aplica estilos inline
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = config.bottomPosition;
    scrollToTopBtn.style.right = config.rightPosition;
    scrollToTopBtn.style.background = config.buttonColor;
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.width = config.buttonSize;
    scrollToTopBtn.style.height = config.buttonSize;
    scrollToTopBtn.style.fontSize = '1.5rem';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
    scrollToTopBtn.style.transition = 'all 0.3s ease';
    scrollToTopBtn.style.zIndex = config.zIndex;
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(90, 6, 9, 0.3)';
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.alignItems = 'center';
    scrollToTopBtn.style.justifyContent = 'center';
    scrollToTopBtn.style.fontFamily = 'Arial, sans-serif';
    scrollToTopBtn.style.lineHeight = '1';
    
    // Adiciona o botão ao body
    document.body.appendChild(scrollToTopBtn);
    
    // Função para mostrar/esconder o botão
    function toggleButtonVisibility() {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        if (scrollPosition > config.scrollThreshold) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }
    
    // Função para voltar ao topo
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event Listeners
    
    // Mostra/esconde o botão ao fazer scroll
    window.addEventListener('scroll', toggleButtonVisibility);
    
    // Funcionalidade de click
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Efeito hover
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(90, 6, 9, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(90, 6, 9, 0.3)';
    });
    
    // Efeito active
    scrollToTopBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    scrollToTopBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    // Suporte a teclado
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Verifica visibilidade inicial
    toggleButtonVisibility();
    
    console.log('✓ APANIM Scroll to Top inicializado');
}