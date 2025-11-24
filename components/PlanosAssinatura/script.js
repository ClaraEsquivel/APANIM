// Toggle entre tipos de planos
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const planSections = document.querySelectorAll('.plans-section');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class de todos os botões
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active class ao botão clicado
            this.classList.add('active');

            // Esconde todas as seções
            planSections.forEach(section => section.classList.add('hidden'));

            // Mostra a seção correspondente
            const planType = this.getAttribute('data-type');
            const targetSection = document.getElementById(`${planType}-section`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                
                // Scroll suave para a seção
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // Animação de entrada dos cards ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa os cards de preços
    document.querySelectorAll('.pricing-card').forEach(card => {
        observer.observe(card);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Inicialmente esconde as respostas
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.maxHeight !== '0px';
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isOpen) {
                answer.style.maxHeight = '0';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });

    // Adiciona eventos aos botões de planos
    const planButtons = document.querySelectorAll('.btn-plan, .btn-partnership');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            let message = '';
            
            if (buttonText.includes('Cadastrar como Vendedor') || buttonText.includes('Assinar')) {
                message = 'Redirecionando para o processo de assinatura e cadastro como vendedor...';
                // Simula redirecionamento
                setTimeout(() => {
                    alert('Você será redirecionado para:\n1. Página de pagamento\n2. Após confirmação do pagamento, cadastro como vendedor\n3. Acesso completo à plataforma de vendas!');
                }, 500);
            } else if (buttonText.includes('Impulsionar')) {
                message = 'Processando impulsionamento do anúncio...';
                // Simula processamento
                setTimeout(() => {
                    alert('Aqui você seria redirecionado para a página de pagamento do impulsionamento!');
                }, 500);
            } else if (buttonText.includes('Parceiro')) {
                message = 'Abrindo formulário de parceria...';
                setTimeout(() => {
                    alert('Aqui você seria redirecionado para o formulário de parceria!');
                }, 500);
            }
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            console.log(message);
        });
    });

    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.btn-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Criar Conta')) {
                alert('Redirecionando para página de cadastro...');
            } else if (this.textContent.includes('Especialista')) {
                alert('Abrindo WhatsApp para contato com especialista...');
                // window.open('https://wa.me/5571999999999?text=Olá! Gostaria de falar com um especialista sobre os planos do APANIM.', '_blank');
            }
        });
    });

    // Animação nos números dos stats da hero
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('pt-BR');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Adiciona o sufixo após a animação
                if (element.textContent.includes('k') || element.textContent.includes('+') || element.textContent.includes('%')) {
                    return;
                }
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observa quando os stats entram na viewport
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('50mil')) {
                        stat.textContent = '0';
                        animateValue(stat, 0, 50000, 2000);
                        setTimeout(() => {
                            stat.textContent = '50mil+';
                        }, 2000);
                    } else if (text.includes('10mil')) {
                        stat.textContent = '0';
                        animateValue(stat, 0, 10000, 2000);
                        setTimeout(() => {
                            stat.textContent = '10mil+';
                        }, 2000);
                    } else if (text.includes('98%')) {
                        stat.textContent = '0%';
                        animateValue(stat, 0, 98, 2000);
                        setTimeout(() => {
                            stat.textContent = '98%';
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

    // Destaque visual ao hover nos cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Reduz levemente a opacidade dos outros cards
            pricingCards.forEach(otherCard => {
                if (otherCard !== card && !otherCard.classList.contains('featured-card')) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaura a opacidade de todos os cards
            pricingCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // Smooth scroll para links internos
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

    // Adiciona efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });

    // Tooltip para features
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.style.paddingLeft = '10px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.paddingLeft = '0';
        });
    });

    console.log('🐾 APANIM - Página de Planos carregada com sucesso!');
});

// Função para compartilhar plano (exemplo)
function sharePlan(planName) {
    const url = window.location.href;
    const text = `Confira o ${planName} do APANIM - A melhor plataforma para pets!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'APANIM - Planos',
            text: text,
            url: url,
        })
        .then(() => console.log('Compartilhado com sucesso!'))
        .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(`${text} ${url}`)
            .then(() => alert('Link copiado para a área de transferência!'))
            .catch(() => alert('Não foi possível copiar o link'));
    }
}

// Função para calcular economia (exemplo)
function calculateSavings(planPrice, period) {
    const monthlyPrice = planPrice;
    const annualPrice = monthlyPrice * 12;
    const annualDiscount = annualPrice * 0.2; // 20% de desconto
    const finalPrice = annualPrice - annualDiscount;
    
    return {
        monthly: monthlyPrice,
        annual: finalPrice,
        savings: annualDiscount
    };
}

// Event Listeners para comparação de planos
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('compare-plans-btn')) {
        const comparisonSection = document.querySelector('.comparison-section');
        if (comparisonSection) {
            comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});