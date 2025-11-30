import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuUnificado from '../MenuUnificado';
import '../../components/ScrollTop/scroll-top.js';
import './styles.css';
import '../../components/MenuUnificado/menu-styles.css';
import '../../components/MenuUnificado/header-unificado.css';
import '../../components/MenuUnificado/footer-unificado.css';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

// ===== COMPONENTE PRINCIPAL DE SERVIÇOS =====
const Servicos = () => {

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

        // Cleanup
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
            observer.disconnect();
        };
    }, []);

    // ===== FUNÇÃO PARA ENVIAR EMAIL =====
    const enviarEmailServicos = () => {
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

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Serviços</h1>
                    <p>Conheça os serviços públicos disponíveis para cuidar melhor do seu pet em Salvador</p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container">

                {/* Castramóvel */}
                <section className="section servico-section" id="castramovel">
                    <div className="servico-header">
                        <h2 className="section-title">Castramóvel</h2>
                    </div>

                    <div className="servico-content">
                        <div className="servico-descricao">
                            <p>O serviço Castramóvel, que realiza castração e microchipagem de cães e gatos de tutores residentes em Salvador.</p>
                            <p>A ação, gratuita, é realizada pela Diretoria de Bem-Estar e Promoção Animal (Dipa), vinculada à Secretaria Municipal de Sustentabilidade, Resiliência, Bem-Estar e Proteção Animal (Secis).</p>
                        </div>

                        <div className="como-realizar">
                            <h3>Como realizar a castração?</h3>
                            <p>A castração é realizada mediante agendamento.</p>
                        </div>

                        <div className="como-agendar">
                            <h3>Como posso agendar a castração?</h3>

                            <div className="passo-agendamento">
                                <h4>1. Através do e-mail:</h4>
                                <a href="mailto:agendamento.dipa@salvador.ba.gov.br" className="email-link">
                                    ✉️ agendamento.dipa@salvador.ba.gov.br
                                </a>
                            </div>

                            <div className="passo-agendamento">
                                <h4>2. O título do e-mail deve ser "Castração" e no corpo do e-mail deve conter por gentileza:</h4>
                                <ul className="lista-requisitos">
                                    <li>Nome completo do tutor</li>
                                    <li>Número do cartão do SUS</li>
                                    <li>Telefone para contato</li>
                                    <li>Espécie do animal</li>
                                    <li>Peso do animal</li>
                                    <li>Idade do animal</li>
                                    <li>Sexo do animal</li>
                                </ul>
                            </div>

                            <div className="passo-agendamento">
                                <h4>3. Devem ser anexados os seguintes documentos (em PDF):</h4>
                                <ul className="lista-requisitos">
                                    <li>RG</li>
                                    <li>CPF</li>
                                    <li>Cartão do SUS</li>
                                    <li>Comprovante de Residência em Salvador</li>
                                    <li>Cartão de Vacinação Antirrábica do Animal atualizado até 1 ano.</li>
                                    <li>Foto do Animal</li>
                                </ul>
                            </div>
                        </div>

                        <div className="atencao-box">
                            <h3>⚠️ ATENÇÃO!</h3>
                            <div className="atencao-lista">
                                <p><strong>1.</strong> No dia da castração, o animal deve ser acompanhado pela mesma pessoa que realizou o agendamento.</p>
                                <p><strong>2.</strong> O animal só poderá realizar o procedimento caso esteja de 10 a 12 horas de jejum, inclusive sem ter tomado água.</p>
                                <p><strong>3.</strong> Não existe nenhuma triagem antes da cirurgia, se seu animal possuir algum problema cardiovascular ou de saúde, é indicado o acompanhamento veterinário antes da cirurgia.</p>
                                <p><strong>4.</strong> O animal só será liberado depois que acordar da cirurgia.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RG para Cães e Gatos */}
                <section className="section servico-section" id="rg-animais">
                    <div className="servico-header">
                        <h2 className="section-title">RG para Cães e Gatos</h2>
                    </div>

                    <div className="servico-content">
                        <div className="servico-descricao">
                            <p>Lançado oficialmente pelo Governo Federal, o Sistema do Cadastro Nacional de Animais Domésticos (SinPatinhas) permite o registro de cães e gatos e ajuda na proteção e bem-estar dos pets em todo o país.</p>
                        </div>

                        <div className="porque-criar">
                            <h3>Por que criar um RG para meu Pet?</h3>
                            <p>O RG Animal possui um QR Code, esse código pode ser fixado na coleira, pois em caso de perda, qualquer pessoa consiga localizar o tutor e ajudar o animal a voltar para casa.</p>
                        </div>

                        <div className="como-criar">
                            <h3>Como posso criar o RG do meu Pet?</h3>

                            <div className="passo-criacao">
                                <p><strong>1.</strong> Através do site:</p>
                                <a href="https://sinpatinhas.mma.gov.br" target="_blank" rel="noopener noreferrer" className="site-link">
                                    🌐 https://sinpatinhas.mma.gov.br
                                </a>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>2.</strong> Escolha uma das três opções de perfis e clique em "Avançar"</p>
                                <ul className="lista-opcoes">
                                    <li>Responsável Pessoa Física</li>
                                    <li>Responsável Pessoa Jurídica</li>
                                    <li>Clínica ou Hospital Veterinário</li>
                                </ul>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>3.</strong> Preencha os dados de cadastro, a autorização e declarações e clique em "Salvar"</p>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>4.</strong> Preencha os dados do seu pet e clique em "Avançar"</p>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>5.</strong> Escolha uma foto do seu pet, anexe a imagem e clique em "Avançar"</p>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>6.</strong> Confirme os dados e clique em "Sim"</p>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>7.</strong> Gere o RG do seu animal</p>
                            </div>

                            <div className="passo-criacao">
                                <p><strong>8.</strong> Clique em "Baixar RG do animal" e pronto!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Dúvidas sobre os serviços?</h2>
                        <p>Entre em contato conosco e tire todas as suas dúvidas sobre como cuidar melhor do seu pet.</p>

                        <button className="btn-contato" onClick={enviarEmailServicos}>
                            ✉️ Entrar em Contato
                        </button>

                        <div className="email-info">
                            <p>Ou envie um e-mail diretamente para:</p>
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

export default Servicos;