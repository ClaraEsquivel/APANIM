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
// import PataImg from '../../assets/images/pata.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';
// import DogAndCatImg from '../../assets/images/dog_and_cat.svg';

// ===== COMPONENTE PRINCIPAL DA PÁGINA APANIM =====
const APANIM = () => {
  const navigate = useNavigate();

  // Função para navegar e scrollar para o topo
  const scrollToTopAndNavigate = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

    // ===== EFEITO PARA ANIMAÇÕES E OBSERVERS =====
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

        // Cleanup
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <header>
                <div className="topo">
                    <img src={PawsImg} className="patas_topo" alt="Patas" />
                    <img src={LogoImg} id="logo_apanim" alt="Logo APANIM" />
                    <img src={CatImg} className="cat_topo" alt="Gato" />
                    <img src={DogImg} className="dog_topo" alt="Cachorro" />
                </div>

                <nav role="navigation">
                    <MenuUnificado />
                </nav>
            </header>

            <ScrollTop />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Sobre o APANIM</h1>
                    <p>Amor e Proteção aos Animais - Transformando vidas através da tecnologia e compaixão</p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container">

                {/* Apresentação */}
                <section className="section">
                    <h2 className="section-title">Nossa História</h2>
                    <div className="content-box">
                        <p>O projeto <strong>APANIM – Amor e Proteção aos Animais</strong> tem como objetivo criar uma plataforma digital que reúne adoção, doação e venda responsável de animais em um só espaço. O site busca reduzir o abandono de pets em Salvador, promovendo a posse responsável e incentivando a castração através de parcerias com a Prefeitura e o castramóvel.</p>

                        <p><strong>O APANIM nasceu da observação direta da realidade das ruas de Salvador</strong>, onde milhares de animais ainda vivem em situação de abandono, e da constatação de que faltam ferramentas digitais eficientes para conectar pessoas dispostas a ajudar.</p>

                        <p>A plataforma funcionará como um ecossistema completo de proteção animal, onde usuários poderão não apenas encontrar seu novo companheiro, mas também ter acesso a informações sobre cuidados veterinários, guias de primeiros passos na adoção e conteúdo educativo sobre posse responsável.</p>
                    </div>
                </section>

                {/* Missão, Visão e Valores */}
                <section className="section">
                    <h2 className="section-title">Missão, Visão e Valores</h2>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-icon">🎯</div>
                            <h3>Nossa Missão</h3>
                            <p>Reduzir o abandono de pets em Salvador, promovendo a posse responsável e incentivando a castração através de parcerias estratégicas e tecnologia acessível.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">💡</div>
                            <h3>Nossa Visão</h3>
                            <p>Ser a principal plataforma de proteção animal da Bahia, referência em adoção responsável e educação sobre bem-estar animal.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">❤️</div>
                            <h3>Nossos Valores</h3>
                            <p>Compaixão, responsabilidade, transparência, inovação e compromisso com o bem-estar animal e a saúde pública.</p>
                        </div>
                    </div>
                </section>

                {/* Contexto Regional */}
                <section className="section">
                    <h2 className="section-title">O Cenário em Salvador</h2>
                    <div className="contexto-box">
                        <div className="contexto-content">
                            <div className="contexto-text">
                                <p>Salvador enfrenta desafios significativos relacionados ao abandono animal. Segundo estimativas de ONGs locais, existem <strong>mais de 30 mil animais em situação de rua</strong> apenas na capital baiana.</p>

                                <p>A falta de conscientização sobre castração, a reprodução descontrolada e a ausência de canais estruturados para adoção contribuem para esse cenário preocupante.</p>
                            </div>

                            <div className="impacto-social">
                                <h3>Impacto Social</h3>
                                <p>O abandono animal não é apenas uma questão de bem-estar dos pets, mas também um problema de saúde pública, podendo gerar casos de zoonoses, acidentes de trânsito e agressões. Uma plataforma que facilite a adoção responsável e conscientize a população é fundamental para transformar essa realidade.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* O Problema */}
                <section className="section">
                    <h2 className="section-title">O Problema que Enfrentamos</h2>
                    <p className="section-description">
                        O alto índice de abandono e a dificuldade de encontrar canais seguros de adoção e venda representam um desafio multifacetado para todos os envolvidos:
                    </p>

                    <div className="problema-grid">
                        <div className="problema-card">
                            <div className="problema-icon">🐾</div>
                            <h3>Para os Animais</h3>
                            <ul>
                                <li>Vida nas ruas expõe a riscos de doenças, acidentes e maus-tratos</li>
                                <li>Superlotação de abrigos e ONGs</li>
                                <li>Dificuldade de socialização e desenvolvimento saudável</li>
                            </ul>
                        </div>

                        <div className="problema-card">
                            <div className="problema-icon">🏠</div>
                            <h3>Para ONGs e Protetores</h3>
                            <ul>
                                <li>Falta de visibilidade para os animais disponíveis</li>
                                <li>Dificuldade em verificar a idoneidade dos adotantes</li>
                                <li>Sobrecarga de trabalho sem ferramentas adequadas</li>
                                <li>Custos elevados de manutenção dos animais</li>
                            </ul>
                        </div>

                        <div className="problema-card">
                            <div className="problema-icon">👥</div>
                            <h3>Para Adotantes e Compradores</h3>
                            <ul>
                                <li>Informações dispersas em múltiplas plataformas</li>
                                <li>Dificuldade em encontrar animais com perfil compatível</li>
                                <li>Falta de orientação sobre o processo de adoção</li>
                                <li>Desconfiança quanto à procedência dos animais</li>
                            </ul>
                        </div>

                        <div className="problema-card">
                            <div className="problema-icon">🌆</div>
                            <h3>Para a Sociedade</h3>
                            <ul>
                                <li>Problemas de saúde pública</li>
                                <li>Custos com controle de zoonoses</li>
                                <li>Impacto no trânsito e segurança urbana</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Nossa Solução */}
                <section className="section solucao-section">
                    <h2 className="section-title">Nossa Solução</h2>
                    <p className="section-description">
                        O APANIM surge como uma resposta integrada a todos esses desafios, oferecendo:
                    </p>

                    <div className="solucao-grid">
                        <div className="solucao-item">
                            <div className="solucao-icon">🏠</div>
                            <h3>Plataforma Centralizada</h3>
                            <p>Um único espaço digital que reúne adoção, doação e venda responsável de animais, facilitando o acesso e aumentando as chances de conexão entre animais e tutores.</p>
                        </div>

                        <div className="solucao-item">
                            <div className="solucao-icon">🔍</div>
                            <h3>Busca Inteligente</h3>
                            <p>Filtros avançados por espécie, raça, porte, idade, temperamento e localização em Salvador, permitindo encontrar o pet ideal para cada perfil.</p>
                        </div>

                        <div className="solucao-item">
                            <div className="solucao-icon">✅</div>
                            <h3>Verificação de Segurança</h3>
                            <p>Sistema de cadastro e verificação tanto para quem oferece quanto para quem busca um animal, aumentando a confiança e a segurança de todos.</p>
                        </div>

                        <div className="solucao-item">
                            <div className="solucao-icon">📚</div>
                            <h3>Educação e Suporte</h3>
                            <p>Conteúdo educativo sobre posse responsável, cuidados veterinários e guias de adoção para preparar novos tutores.</p>
                        </div>

                        <div className="solucao-item">
                            <div className="solucao-icon">🚑</div>
                            <h3>Parceria com Castramóvel</h3>
                            <p>Integração com o programa de castração gratuita da Prefeitura de Salvador, facilitando o agendamento direto pela plataforma.</p>
                        </div>

                        <div className="solucao-item">
                            <div className="solucao-icon">🤝</div>
                            <h3>Rede de Apoio</h3>
                            <p>Conexão entre ONGs, protetores, veterinários e pet shops parceiros, criando uma rede de suporte para os animais e tutores.</p>
                        </div>
                    </div>
                </section>

                {/* Funcionalidades */}
                <section className="section funcionalidades-section">
                    <h2 className="section-title">Funcionalidades Principais</h2>

                    <div className="funcionalidades-grid">
                        <div className="funcionalidade-box">
                            <h3>🐕 Cadastro de Animais</h3>
                            <ul>
                                <li>Formulário completo com fotos, descrição, temperamento e histórico de saúde</li>
                                <li>Categorização por adoção, doação ou venda</li>
                                <li>Geolocalização por bairros de Salvador</li>
                            </ul>
                        </div>

                        <div className="funcionalidade-box">
                            <h3>👤 Perfis de Usuário</h3>
                            <ul>
                                <li>Cadastro diferenciado para adotantes, doadores e vendedores</li>
                                <li>Histórico de adoções e avaliações</li>
                                <li>Sistema de verificação de identidade (opcional)</li>
                            </ul>
                        </div>

                        <div className="funcionalidade-box">
                            <h3>💬 Sistema de Mensagens</h3>
                            <ul>
                                <li>Chat interno entre interessados e anunciantes</li>
                                <li>Integração com WhatsApp para facilitar o contato</li>
                                <li>Sistema de notificações sobre novos animais disponíveis</li>
                            </ul>
                        </div>

                        <div className="funcionalidade-box">
                            <h3>📖 Conteúdo Educativo</h3>
                            <ul>
                                <li>Blog com artigos sobre cuidados, saúde e comportamento animal</li>
                                <li>Guias de adoção responsável</li>
                            </ul>
                        </div>

                        <div className="funcionalidade-box">
                            <h3>🏥 Seção de Serviços</h3>
                            <ul>
                                <li>Agenda de campanhas de castração gratuita</li>
                                <li>Parcerias com veterinários e pet shops com descontos para adotantes</li>
                                <li>Lista de ONGs e grupos de proteção animal em Salvador</li>
                            </ul>
                        </div>

                        <div className="funcionalidade-box">
                            <h3>🛡️ Transparência e Segurança</h3>
                            <ul>
                                <li>Sistema de avaliações e feedbacks</li>
                                <li>Termo de adoção responsável digital</li>
                                <li>Acompanhamento pós-adoção (opcional)</li>
                                <li>Denúncia de anúncios suspeitos</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Diferenciais */}
                <section className="section diferenciais-section">
                    <h2 className="section-title">Nossos Diferenciais</h2>
                    <p className="section-description">
                        O diferencial do APANIM está em unir em um mesmo ambiente virtual a adoção, doação e venda responsável, além de oferecer atendimento via WhatsApp e parcerias com ONGs e com a Prefeitura de Salvador.
                    </p>

                    <div className="diferenciais-grid">
                        <div className="diferencial-card">
                            <div className="diferencial-numero">1</div>
                            <h3>Integração Completa de Serviços</h3>
                            <p>Ao contrário dos concorrentes que focam apenas em adoção, o APANIM integra adoção, doação e venda ética, reconhecendo que existem diferentes necessidades e contextos na relação entre humanos e animais.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">2</div>
                            <h3>Parceria com Poder Público</h3>
                            <p>A integração com o castramóvel da Prefeitura de Salvador é única no mercado, permitindo que usuários agendem castrações gratuitas diretamente pela plataforma.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">3</div>
                            <h3>Verificação de Idoneidade</h3>
                            <p>Sistema pioneiro de verificação em múltiplas camadas, incluindo documentação, histórico de adoções e avaliações da comunidade.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">4</div>
                            <h3>Tecnologia de Matching</h3>
                            <p>Algoritmo que conecta animais e adotantes com base em compatibilidade de perfil, estilo de vida e preferências.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">5</div>
                            <h3>Suporte Contínuo</h3>
                            <p>Diferentemente de outras plataformas, o APANIM oferece acompanhamento, comunidade de tutores e acesso a conteúdo educativo contínuo.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">6</div>
                            <h3>Responsabilidade na Venda</h3>
                            <p>Exigência de documentação completa, comprovação de origem ética e incentivo à adoção como primeira opção.</p>
                        </div>

                        <div className="diferencial-card">
                            <div className="diferencial-numero">7</div>
                            <h3>Impacto Mensurável</h3>
                            <p>Dashboard público com estatísticas de adoções realizadas, animais castrados e redução estimada de animais em situação de rua.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Faça Parte Dessa Transformação</h2>
                        <p>Junte-se a nós nessa missão de criar um futuro melhor para os animais de Salvador. Seja adotando, doando, divulgando ou sendo nosso parceiro!</p>

                        <div className="cta-buttons">
                            <Link to="/adocao-animal" className="btn-cta btn-primary">
                                🐾 Adotar um Pet
                            </Link>
                            <button 
                                onClick={() => scrollToTopAndNavigate('/parceria')}
                                className="btn-cta btn-secondary"
                                style={{ border: 'none', cursor: 'pointer', background: 'inherit', color: 'inherit', font: 'inherit' }}
                            >
                                🤝 <strong>Ser Parceiro</strong>
                            </button>
                        </div>

                        <div className="email-info">
                            <p>Dúvidas? Entre em contato:</p>
                            <p className="email-address">apanim.amor.protecao@gmail.com</p>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <img src={InstagramImg} alt="Siga-nos no Instagram" />
                    <img src={EmailImg} alt="Entre em contato por email" />
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <Link to="/adocao-animal"><span>Adote um novo amigo</span></Link><br />
                        <Link to="/compra-animal"> <span>Compre um animal</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"> <span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"> <span>Cadastrar animal para adoção</span></Link><br />
                        <Link to="/cadastro-animal-venda"> <span>Cadastrar animal para venda</span></Link><br />
                        <Link to="/cadastro-animal-perdido"> <span>Cadastrar animal perdido</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"> <span>Animais perdidos</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"> <span>APANIM</span></Link><br />
                        <Link to="/servicos"> <span>Serviços</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"> <span>Cadastrar-se</span></Link><br />
                        <Link to="/login"> <span>Login</span></Link><br />
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum" />
                </div>
            </footer>

            {/* Scripts */}
            <script src='../../components/ScrollTop/scroll-top.js'></script>

        </>
    );
};

export default APANIM;