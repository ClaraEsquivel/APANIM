function enviarEmailServicos() {
    const email = 'apanim.amor.protecao@gmail.com';
    const assunto = encodeURIComponent('Dúvidas sobre Serviços - APANIM');
    const corpo = encodeURIComponent(`Olá, equipe APANIM!

Gostaria de tirar dúvidas sobre os serviços oferecidos.

Nome: 
Telefone: 
Serviço de Interesse: 

Dúvida/Mensagem:


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


// Animação de entrada das seções
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

// Observa as seções de serviço
document.querySelectorAll('.servico-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Animação para os passos de agendamento/criação
document.querySelectorAll('.passo-agendamento, .passo-criacao').forEach((passo, index) => {
    passo.style.opacity = '0';
    passo.style.transform = 'translateX(-20px)';
    passo.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(passo);
});

// Destaque para caixa de atenção
const atencaoBox = document.querySelector('.atencao-box');
if (atencaoBox) {
    atencaoBox.style.opacity = '0';
    atencaoBox.style.transform = 'scale(0.95)';
    atencaoBox.style.transition = 'all 0.6s ease';
    observer.observe(atencaoBox);
}