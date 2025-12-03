import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuUnificado from '../MenuUnificado';
import ScrollTop from '../ScrollTop';
import './styles.css';
import '../Layout/header-unificado.css';
import '../Layout/footer-unificado.css';
import '../MenuUnificado/menu-styles.css';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import PataImg from '../../assets/images/pata.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';
import DogAndCatImg from '../../assets/images/dog_and_cat.svg';

// ===== COMPONENTE PRINCIPAL DE PLANOS DE ASSINATURA =====
const PlanosAssinatura = () => {

    // ===== EFEITO PARA ANIMAÇÕES =====
    useEffect(() => {
        // Animação de scroll suave
        const handleSmoothScroll = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Intersection Observer para animações
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

        // Adiciona animação de highlight
        const style = document.createElement('style');
        style.textContent = `
            @keyframes highlight {
                0%, 100% { background-color: transparent; }
                50% { background-color: rgba(90, 6, 9, 0.1); }
            }
        `;
        document.head.appendChild(style);

        // Cleanup
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
            observer.disconnect();
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, []);

    const navigate = useNavigate();

    // ===== FUNÇÕES =====
    const selecionarPlano = (plano) => {
        const planos = {
            'basico': {
                nome: 'Plano Básico',
                preco: 'R$ 99/mês',
                descricao: 'Ideal para quem está começando',
                badge: 'BÁSICO'
            },
            'profissional': {
                nome: 'Plano Profissional',
                preco: 'R$ 199/mês',
                descricao: 'Para vendedores ativos',
                badge: 'PROFISSIONAL'
            },
            'premium': {
                nome: 'Plano Premium',
                preco: 'R$ 349/mês',
                descricao: 'Para profissionais sérios',
                badge: 'PREMIUM'
            }
        };
        
        navigate('/formas-pagamento', { 
            state: { plano: planos[plano] } 
        });
    };

    const comprarBoost = (periodo) => {
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
    };

    const toggleFAQ = (e) => {
        const button = e.currentTarget;
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
    };

    const abrirContato = () => {
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
    };

    return (
        <>
            {/* Header */}
            <header>
                <div className="topo">
                    <img src={PawsImg} className="patas_topo" alt="Patas" />
                    <img src={LogoImg} id="logo_apanim" alt="Logo APANIM" />
                    <img src={CatImg} className="cat_topo" alt="Gato" />
                    <img src={DogImg} className="dog_topo" alt="Cachorro" />
                </div>

                {/* Menu Unificado */}
                <nav role="navigation">
                    <MenuUnificado />
                </nav>
            </header>

            <ScrollTop />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Planos de Assinatura</h1>
                    <p>Escolha o plano ideal para impulsionar suas vendas e alcançar mais clientes</p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container">
                
                {/* Benefícios Gerais */}
                <section className="beneficios-gerais">
                    <h2 className="section-title">Por que assinar?</h2>
                    <div className="beneficios-grid">
                        <div className="beneficio-card">
                            <div className="beneficio-icon">🎯</div>
                            <h3>Maior Visibilidade</h3>
                            <p>Seus anúncios aparecem em destaque nas buscas e na página inicial</p>
                        </div>
                        <div className="beneficio-card">
                            <div className="beneficio-icon">📊</div>
                            <h3>Estatísticas Detalhadas</h3>
                            <p>Acompanhe visualizações, interesse e performance dos seus anúncios</p>
                        </div>
                        <div className="beneficio-card">
                            <div className="beneficio-icon">⭐</div>
                            <h3>Selo Verificado</h3>
                            <p>Ganhe credibilidade com o selo de vendedor verificado</p>
                        </div>
                        <div className="beneficio-card">
                            <div className="beneficio-icon">🚀</div>
                            <h3>Suporte Prioritário</h3>
                            <p>Atendimento rápido e personalizado quando precisar</p>
                        </div>
                    </div>
                </section>

                {/* Planos Mensais */}
                <section className="planos-section" id="planos-section">
                    <h2 className="section-title">Planos Mensais para Vendedores</h2>
                    <p className="section-subtitle">Ideal para criadores registrados, pet shops e vendedores profissionais</p>
                    
                    <div className="planos-grid">
                        
                        {/* Plano Básico */}
                        <div className="plano-card">
                            <div className="plano-header">
                                <h3 className="plano-nome">Básico</h3>
                                <div className="plano-preco">
                                    <span className="preco-valor">R$ 99</span>
                                    <span className="preco-periodo">/mês</span>
                                </div>
                                <p className="plano-descricao">Para quem está começando</p>
                            </div>
                            
                            <div className="plano-beneficios">
                                <ul className="beneficios-lista">
                                    <li>✓ Até 10 anúncios ativos simultâneos</li>
                                    <li>✓ Fotos ilimitadas por anúncio</li>
                                    <li>✓ Suporte por email</li>
                                    <li>✓ Comissão de 8% sobre vendas</li>
                                    <li>✓ Painel de controle básico</li>
                                </ul>
                            </div>
                            
                            <button className="btn-plano" onClick={() => selecionarPlano('basico')}>Começar Agora</button>
                        </div>

                        {/* Plano Profissional */}
                        <div className="plano-card plano-destaque">
                            <div className="plano-badge">Mais Popular</div>
                            <div className="plano-header">
                                <h3 className="plano-nome">Profissional</h3>
                                <div className="plano-preco">
                                    <span className="preco-valor">R$ 199</span>
                                    <span className="preco-periodo">/mês</span>
                                </div>
                                <p className="plano-descricao">Para vendedores ativos</p>
                            </div>
                            
                            <div className="plano-beneficios">
                                <ul className="beneficios-lista">
                                    <li>✓ Anúncios ilimitados</li>
                                    <li>✓ Selo de "Vendedor Verificado" ⭐</li>
                                    <li>✓ Destaque em busca por categoria</li>
                                    <li>✓ Estatísticas de visualizações</li>
                                    <li>✓ Suporte prioritário</li>
                                    <li>✓ Comissão de 8% sobre vendas</li>
                                    <li>✓ Fotos e vídeos ilimitados</li>
                                </ul>
                            </div>
                            
                            <button className="btn-plano btn-plano-destaque" onClick={() => selecionarPlano('profissional')}>Escolher Profissional</button>
                        </div>

                        {/* Plano Premium */}
                        <div className="plano-card">
                            <div className="plano-header">
                                <h3 className="plano-nome">Premium</h3>
                                <div className="plano-preco">
                                    <span className="preco-valor">R$ 349</span>
                                    <span className="preco-periodo">/mês</span>
                                </div>
                                <p className="plano-descricao">Para profissionais sérios</p>
                            </div>
                            
                            <div className="plano-beneficios">
                                <ul className="beneficios-lista">
                                    <li>✓ Todos os benefícios do Profissional</li>
                                    <li>✓ Destaque permanente na página inicial</li>
                                    <li>✓ Vídeos de apresentação premium</li>
                                    <li>✓ Gerenciador de leads integrado</li>
                                    <li>✓ Consultoria trimestral de performance</li>
                                    <li>✓ Comissão de 8% sobre vendas</li>
                                    <li>✓ Badge Premium exclusivo 👑</li>
                                    <li>✓ Prioridade máxima no suporte</li>
                                </ul>
                            </div>
                            
                            <button className="btn-plano" onClick={() => selecionarPlano('premium')}>Quero o Premium</button>
                        </div>

                    </div>
                </section>

                {/* Anúncios em Destaque (Boost) */}
                <section className="boost-section">
                    <h2 className="section-title">Anúncios em Destaque</h2>
                    <p className="section-subtitle">Para vendedores eventuais ou quem quer impulsionar um anúncio específico</p>
                    
                    <div className="boost-grid">
                        
                        {/* Boost 7 dias */}
                        <div className="boost-card">
                            <div className="boost-header">
                                <h3 className="boost-titulo">Boost 7 dias</h3>
                                <div className="boost-preco">
                                    <span className="boost-valor">R$ 29,90</span>
                                </div>
                            </div>
                            
                            <div className="boost-beneficios">
                                <ul className="boost-lista">
                                    <li>✓ Destaque por 7 dias</li>
                                    <li>✓ Aparição nas buscas prioritárias</li>
                                    <li>✓ Badge "Em Destaque" 🌟</li>
                                    <li>✓ Estatísticas básicas</li>
                                </ul>
                            </div>
                            
                            <button className="btn-boost" onClick={() => comprarBoost('7dias')}>Impulsionar por 7 dias</button>
                        </div>

                        {/* Boost 15 dias */}
                        <div className="boost-card boost-popular">
                            <div className="boost-badge">Melhor Custo-Benefício</div>
                            <div className="boost-header">
                                <h3 className="boost-titulo">Boost 15 dias</h3>
                                <div className="boost-preco">
                                    <span className="boost-valor">R$ 49,90</span>
                                    <span className="boost-economia">Economize R$ 9,90</span>
                                </div>
                            </div>
                            
                            <div className="boost-beneficios">
                                <ul className="boost-lista">
                                    <li>✓ Destaque por 15 dias</li>
                                    <li>✓ Prioridade nas buscas</li>
                                    <li>✓ Badge "Em Destaque" 🌟</li>
                                    <li>✓ Estatísticas detalhadas</li>
                                    <li>✓ 2 aparições na página inicial</li>
                                </ul>
                            </div>
                            
                            <button className="btn-boost btn-boost-destaque" onClick={() => comprarBoost('15dias')}>Impulsionar por 15 dias</button>
                        </div>

                        {/* Boost 30 dias */}
                        <div className="boost-card">
                            <div className="boost-header">
                                <h3 className="boost-titulo">Boost 30 dias</h3>
                                <div className="boost-preco">
                                    <span className="boost-valor">R$ 79,90</span>
                                    <span className="boost-economia">Economize R$ 29,90</span>
                                </div>
                            </div>
                            
                            <div className="boost-beneficios">
                                <ul className="boost-lista">
                                    <li>✓ Destaque por 30 dias completos</li>
                                    <li>✓ Máxima prioridade nas buscas</li>
                                    <li>✓ Badge "Super Destaque" ⭐</li>
                                    <li>✓ Estatísticas avançadas</li>
                                    <li>✓ 5 aparições na página inicial</li>
                                    <li>✓ Suporte prioritário</li>
                                </ul>
                            </div>
                            
                            <button className="btn-boost" onClick={() => comprarBoost('30dias')}>Impulsionar por 30 dias</button>
                        </div>

                    </div>
                </section>

                {/* Anúncios Gratuitos */}
                <section className="gratuitos-section">
                    <h2 className="section-title">Anúncios Gratuitos</h2>
                    <p className="section-subtitle">Para adoção responsável - sempre 100% gratuito</p>
                    
                    <div className="gratuitos-grid">
                        <div className="gratuito-item">
                            <div className="gratuito-icon">❤️</div>
                            <h3>Adoção</h3>
                            <p>Anúncios ilimitados e gratuitos para animais disponíveis para adoção</p>
                        </div>
                        <div className="gratuito-item">
                            <div className="gratuito-icon">🔍</div>
                            <h3>Animais Perdidos</h3>
                            <p>Divulgue animais perdidos sem custos para ajudar a reencontrá-los</p>
                        </div>
                        <div className="gratuito-item">
                            <div className="gratuito-icon">🏠</div>
                            <h3>ONGs</h3>
                            <p>Organizações de proteção animal têm acesso gratuito à plataforma</p>
                        </div>
                    </div>
                </section>

                {/* Tabela de Comparação */}
                <section className="comparacao-section">
                    <h2 className="section-title">Compare os Planos</h2>
                    
                    <div className="comparacao-table-wrapper">
                        <table className="comparacao-table">
                            <thead>
                                <tr>
                                    <th>Recursos</th>
                                    <th>Básico</th>
                                    <th className="destaque-column">Profissional</th>
                                    <th>Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="feature-column">Anúncios ativos</td>
                                    <td>10</td>
                                    <td className="destaque-column">Ilimitado</td>
                                    <td>Ilimitado</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Fotos por anúncio</td>
                                    <td>Ilimitado</td>
                                    <td className="destaque-column">Ilimitado</td>
                                    <td>Ilimitado</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Vídeos</td>
                                    <td>—</td>
                                    <td className="destaque-column">✓</td>
                                    <td>✓ Premium</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Selo verificado</td>
                                    <td>—</td>
                                    <td className="destaque-column">✓</td>
                                    <td>✓ Premium 👑</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Destaque nas buscas</td>
                                    <td>—</td>
                                    <td className="destaque-column">✓ Por categoria</td>
                                    <td>✓ Geral</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Página inicial</td>
                                    <td>—</td>
                                    <td className="destaque-column">—</td>
                                    <td>✓ Permanente</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Estatísticas</td>
                                    <td>—</td>
                                    <td className="destaque-column">✓ Básicas</td>
                                    <td>✓ Avançadas</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Gerenciador de leads</td>
                                    <td>—</td>
                                    <td className="destaque-column">—</td>
                                    <td>✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Consultoria</td>
                                    <td>—</td>
                                    <td className="destaque-column">—</td>
                                    <td>✓ Trimestral</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Suporte</td>
                                    <td>Email</td>
                                    <td className="destaque-column">Prioritário</td>
                                    <td>VIP</td>
                                </tr>
                                <tr>
                                    <td className="feature-column">Comissão sobre vendas</td>
                                    <td>8%</td>
                                    <td className="destaque-column">8%</td>
                                    <td>8%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <h2 className="section-title">Perguntas Frequentes</h2>
                    
                    <div className="faq-container">
                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Como funciona a comissão de 8%?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>A comissão de 8% é aplicada apenas sobre vendas concretizadas através da plataforma. Isso significa que você só paga quando realmente vender um animal. O valor é calculado automaticamente no momento da transação.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Posso cancelar minha assinatura a qualquer momento?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. Seus anúncios permanecerão ativos até o final do período pago.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Qual a diferença entre assinatura mensal e boost?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>A assinatura mensal é ideal para vendedores profissionais que mantêm anúncios regularmente. O boost é uma compra única para impulsionar um anúncio específico por um período determinado, perfeito para vendedores eventuais.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Posso trocar de plano depois?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. No caso de upgrade, a diferença é calculada proporcionalmente. No downgrade, o crédito é aplicado na próxima cobrança.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Preciso ser criador registrado para assinar?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Sim, para contratar um plano mensal é necessário ter CNPJ ativo e estar regularizado como criador ou pet shop. Para boost avulso, qualquer usuário verificado pode contratar.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <button className="faq-question" onClick={toggleFAQ}>
                                <span>Como funciona o destaque na página inicial?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Os anúncios destacados aparecem em um carrossel rotativo na página inicial, garantindo máxima visibilidade. No plano Premium, você tem aparições garantidas diariamente. No boost de 30 dias, as aparições são distribuídas ao longo do período.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Pronto para crescer suas vendas?</h2>
                        <p>Escolha o plano ideal e comece a vender mais hoje mesmo!</p>
                        
                        <div className="cta-buttons">
                            <a href="#planos-section" className="btn-cta-primary">Ver Planos</a>
                            <button className="btn-cta-secondary" onClick={abrirContato}>
                                Falar com Especialista
                            </button>
                        </div>

                        <div className="email-info">
                            <p>Dúvidas sobre os planos?</p>
                            <p className="email-address">apanim.amor.protecao@gmail.com</p>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <img src={InstagramImg} alt="Siga-nos no Instagram"/>
                    <img src={EmailImg} alt="Entre em contato por email"/>
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <Link to="/adocao-animal"><span>Adote</span><br /></Link>
                        <Link to="/compra-animal"><span>Compre</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"><span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"><span>Cadastrar animal para adoção</span><br /></Link>
                        <Link to="/cadastro-animal-venda"><span>Cadastrar animal para venda</span><br /></Link>
                        <Link to="/cadastro-animal-perdido"><span>Cadastrar animal perdido</span><br /></Link>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"><span>Animais perdidos</span><br /></Link>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"><span>APANIM</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"><span>Cadastrar-se</span><br /></Link>
                        <Link to="/perfil-usuario"><span>Minha página de usuário</span><br /></Link>
                        <Link to="/perfil-vendedor"><span>Minha página de vendedor</span><br /></Link>
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum"/>
                </div>
            </footer>
                <ScrollTop />
        </>
    );
};

export default PlanosAssinatura;