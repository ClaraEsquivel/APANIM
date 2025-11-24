// Função para selecionar um plano
function selecionarPlano(plano) {
    // Aqui você pode implementar a lógica para redirecionar para o checkout
    // ou abrir um modal com mais informações
    
    const planos = {
        'basico': {
            nome: 'Plano Básico',
            preco: 'R$ 99/mês',
            descricao: 'Ideal para quem está começando'
        },
        'profissional': {
            nome: 'Plano Profissional',
            preco: 'R$ 199/mês',
            descricao: 'Para vendedores ativos'
        },
        'premium': {
            nome: 'Plano Premium',
            preco: 'R$ 349/mês',
            descricao: 'Para profissionais sérios'
        }
    };
    
    const planoSelecionado = planos[plano];
    
    // Por enquanto, vamos usar um alert como exemplo
    // Em produção, isso redirecionaria para uma página de checkout
    alert(`Você selecionou: ${planoSelecionado.nome}\nValor: ${planoSelecionado.preco}\n\nEm breve você será redirecionado para o checkout!`);
    
    // Exemplo de redirecionamento (descomente quando tiver a página de checkout)
    // window.location.href = `/checkout?plano=${plano}`;
}

// Função para comprar boost
function comprarBoost(periodo) {
    const boosts = {
        '7dias': {
            duracao: '7 dias',
            preco: 'R$ 29,90'
        },
        '15dias': {
            duracao: '15 dias',
            preco: 'R$ 49,90'
        },
        '30dias': {
            duracao: '30 dias',
            preco: 'R$ 79,90'
        }
    };
    
    const boostSelecionado = boosts[periodo];
    
    alert(`Você selecionou: Boost de ${boostSelecionado.duracao}\nValor: ${boostSelecionado.preco}\n\nEm breve você será redirecionado para o checkout!`);
    
    // Exemplo de redirecionamento (descomente quando tiver a página de checkout)
    // window.location.href = `/checkout-boost?periodo=${periodo}`;
}

// Função para toggle do FAQ
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fecha todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o FAQ clicado se ele não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Função para abrir contato
function abrirContato() {
    const email = 'apanim.amor.protecao@gmail.com';
    const assunto = encodeURIComponent('Dúvidas sobre Planos de Assinatura - APANIM');
    const corpo = encodeURIComponent(`Olá, equipe APANIM!

Gostaria de tirar dúvidas sobre os planos de assinatura.

Nome: 
Telefone: 
Empresa/CNPJ (se aplicável): 

Dúvida/Mensagem:


Aguardo retorno.

Atenciosamente,`);
    
    window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
}

// Animação de scroll suave para links internos
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

// Intersection Observer para animações de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards de benefícios
document.querySelectorAll('.beneficio-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observa os cards de planos
document.querySelectorAll('.plano-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observa os cards de boost
document.querySelectorAll('.boost-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observa os itens gratuitos
document.querySelectorAll('.gratuito-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(item);
});

// Observa os itens do FAQ
document.querySelectorAll('.faq-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Animação para a tabela de comparação
const tableWrapper = document.querySelector('.comparacao-table-wrapper');
if (tableWrapper) {
    tableWrapper.style.opacity = '0';
    tableWrapper.style.transform = 'translateY(30px)';
    tableWrapper.style.transition = 'all 0.8s ease';
    observer.observe(tableWrapper);
}

// Tracking de cliques nos botões (para analytics futuro)
document.querySelectorAll('.btn-plano, .btn-boost').forEach(button => {
    button.addEventListener('click', function() {
        // Aqui você pode adicionar código para enviar eventos para o Google Analytics
        // ou outro sistema de tracking
        console.log('Botão clicado:', this.textContent);
    });
});

// Efeito de highlight ao carregar a página com âncora
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.style.animation = 'highlight 2s ease';
            }, 500);
        }
    }
});

// Adiciona a animação de highlight ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(90, 6, 9, 0.1); }
    }
    
    .scroll-to-top:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(style);

// Previne múltiplos cliques nos botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('processing')) {
            this.classList.add('processing');
            setTimeout(() => {
                this.classList.remove('processing');
            }, 1000);
        }
    });
});

// Log de inicialização (pode ser removido em produção)
console.log('Página de Planos de Assinatura carregada com sucesso!');
console.log('Planos disponíveis: Básico, Profissional, Premium');
console.log('Boosts disponíveis: 7 dias, 15 dias, 30 dias');