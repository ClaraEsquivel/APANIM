// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observa as caixas de conteúdo
document.querySelectorAll('.content-box, .contexto-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.6s ease';
    observer.observe(box);
});

// Observa os cards de problema
document.querySelectorAll('.problema-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observa os itens de solução
document.querySelectorAll('.solucao-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observa as funcionalidades
document.querySelectorAll('.funcionalidade-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(box);
});

// Observa os diferenciais
document.querySelectorAll('.diferencial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animação dos números dos diferenciais
const numerosDiferenciais = document.querySelectorAll('.diferencial-numero');
numerosDiferenciais.forEach(numero => {
    const observerNumero = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numero.style.animation = 'pulse 0.6s ease';
            }
        });
    }, { threshold: 0.5 });
    
    observerNumero.observe(numero);
});

// Adiciona estilo de animação pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Efeito parallax suave no hero (REMOVIDO - causava problema de scroll)
// O efeito parallax foi desabilitado para evitar conflitos com o scroll

// Contador animado para as estatísticas
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    };
    
    updateCounter();
};

// Ativa contador quando a seção de stats é visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('30mil')) {
                    stat.textContent = '0';
                    animateCounter(stat, 30000);
                    setTimeout(() => {
                        stat.textContent = '30mil+';
                    }, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}