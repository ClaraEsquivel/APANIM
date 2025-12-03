import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// ===== COMPONENTE PRINCIPAL DE PARCERIA =====
const Parceria = () => {

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

        // Cleanup
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
            observer.disconnect();
        };
    }, []);

    // ===== FUNÇÃO PARA ENVIAR EMAIL =====
    const enviarEmail = () => {
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
                    <h1>Seja Nosso Parceiro</h1>
                    <p>Juntos, podemos transformar a vida de milhares de animais em Salvador e criar um futuro mais compassivo para todos.</p>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">30mil+</span>
                            <span className="stat-label">Animais em Situação de Rua</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Compromisso com a Causa</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Amor e Dedicação</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container">
                
                {/* Funcionalidades */}
                <section className="section">
                    <h2 className="section-title">O que Oferecemos</h2>
                    <p className="section-description">
                        Uma plataforma completa que vai muito além de simplesmente conectar animais e adotantes.
                    </p>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-icon">📱</div>
                            <h3>Sistema Inteligente</h3>
                            <ul>
                                <li>Cadastro completo com fotos e vídeos</li>
                                <li>Busca avançada com filtros inteligentes</li>
                                <li>Perfis verificados e seguros</li>
                                <li>Sistema de recomendações personalizado</li>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-icon">💬</div>
                            <h3>Comunicação Eficiente</h3>
                            <ul>
                                <li>Chat direto pelo site</li>
                                <li>Integração com WhatsApp</li>
                                <li>Notificações em tempo real</li>
                                <li>Acompanhamento pós-adoção</li>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-icon">📚</div>
                            <h3>Educação e Conteúdo</h3>
                            <ul>
                                <li>Blog com artigos especializados</li>
                                <li>Guias de adoção responsável</li>
                                <li>Informações sobre saúde animal</li>
                                <li>Dicas de comportamento e cuidados</li>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-icon">🏥</div>
                            <h3>Rede de Serviços</h3>
                            <ul>
                                <li>Agenda de castração gratuita</li>
                                <li>Parcerias com veterinários</li>
                                <li>Descontos para adotantes</li>
                                <li>Conexão com ONGs locais</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Por que ser Parceiro */}
                <section className="section">
                    <h2 className="section-title">Por que Ser Nosso Parceiro?</h2>
                    <p className="section-description">
                        Uma parceria com o APANIM vai além dos negócios - é um compromisso com a transformação social e o bem-estar animal.
                    </p>

                    <div className="impacto-grid">
                        <div className="impacto-item">
                            <div className="impacto-item-icon">🌟</div>
                            <h3>Responsabilidade Social</h3>
                            <p>Associe sua marca a uma causa nobre e ganhe reconhecimento da comunidade</p>
                        </div>
                        <div className="impacto-item">
                            <div className="impacto-item-icon">📈</div>
                            <h3>Visibilidade</h3>
                            <p>Exposição em nossa plataforma e redes sociais para milhares de usuários engajados</p>
                        </div>
                        <div className="impacto-item">
                            <div className="impacto-item-icon">🤝</div>
                            <h3>Networking</h3>
                            <p>Conexão com ONGs, veterinários e outros parceiros comprometidos</p>
                        </div>
                        <div className="impacto-item">
                            <div className="impacto-item-icon">💚</div>
                            <h3>Impacto Real</h3>
                            <p>Contribuição direta para redução do abandono e sofrimento animal</p>
                        </div>
                    </div>
                </section>

                {/* Oportunidades de Parceria */}
                <section className="section">
                    <h2 className="section-title">Oportunidades de Parceria</h2>
                    <p className="section-description">
                        Existem diversas formas de colaborar com o APANIM e fazer parte dessa transformação.
                    </p>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-icon">🏢</div>
                            <h3>Pet Shops e Clínicas</h3>
                            <p>Ofereça descontos exclusivos para adotantes, ganhe visibilidade na plataforma e fortaleça sua marca como empresa socialmente responsável.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">🏭</div>
                            <h3>Indústria Pet</h3>
                            <p>Forneça produtos para animais resgatados, patrocine campanhas de castração e participe de eventos promovidos pelo APANIM.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">💼</div>
                            <h3>Empresas em Geral</h3>
                            <p>Apoie financeiramente nossos projetos, promova ações internas de adoção responsável e engaje seus colaboradores na causa animal.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">👥</div>
                            <h3>ONGs e Protetores</h3>
                            <p>Divulgue seus animais gratuitamente, conecte-se com adotantes qualificados e amplie o alcance do seu trabalho de resgate.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Vamos Construir Juntos um Futuro Melhor?</h2>
                        <p>Entre em contato conosco e descubra como sua empresa pode fazer parte dessa transformação. Cada parceria salva vidas e transforma histórias.</p>
                        
                        <button className="btn-contato" onClick={enviarEmail}>
                            ✉️ Entrar em Contato
                        </button>

                        <div className="email-info">
                            <p>Ou envie um e-mail diretamente para:</p>
                            <p className="email-address">apanim.amor.protecao@gmail.com</p>
                        </div>
                    </div>
                </section>

                {/* Impacto Social */}
                <section className="section">
                    <h2 className="section-title">Nosso Impacto Social</h2>
                    <p className="section-description">
                        O abandono animal não é apenas uma questão de bem-estar dos pets, mas também um problema de saúde pública. Uma plataforma que facilite a adoção responsável e conscientize a população é fundamental para transformar essa realidade.
                    </p>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-icon">🏥</div>
                            <h3>Saúde Pública</h3>
                            <p>Redução de casos de zoonoses, acidentes de trânsito e agressões relacionadas a animais abandonados.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">🎓</div>
                            <h3>Educação</h3>
                            <p>Conscientização sobre posse responsável, castração e cuidados adequados com os animais.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon">🌍</div>
                            <h3>Comunidade</h3>
                            <p>Fortalecimento de redes de proteção animal e engajamento da sociedade civil em Salvador.</p>
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

            {/* Scripts */}
            <script src='../../components/ScrollTop/scroll-top.js'></script>
        </>
    );
};

export default Parceria;