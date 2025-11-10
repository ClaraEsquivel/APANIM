function enviarEmail() {
    const email = 'apanim.amor.protecao@gmail.com';
    const assunto = encodeURIComponent('Proposta de Parceria - APANIM');
    const corpo = encodeURIComponent(`Olá, equipe APANIM!

Gostaria de conhecer mais sobre as oportunidades de parceria com o APANIM.

Nome da Empresa: 
Segmento: 
Contato: 
Telefone: 

Mensagem:


Aguardo retorno.

Atenciosamente,`);
    
    window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
}

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

// Animação de entrada dos cards
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

document.querySelectorAll('.card, .impacto-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
