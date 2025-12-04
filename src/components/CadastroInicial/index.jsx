import { Link } from 'react-router-dom';
import { useModal } from '../ModalCustomizado';
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
import DogSentadoImg from '../../assets/images/dog_sentado.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

const CadastroInicial = () => {
    const { Modal } = useModal();

    return (
        <>
            {/* Modal System */}
            {Modal}

            {/* Header */}
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

            {/* Scroll to Top */}
            <ScrollTop />

            {/* Conteúdo Central */}
            <div className="central">
                {/* Patas decorativas */}
                {/* {[...Array(6)].map((_, i) => (
                    <div key={i} className={`patas${i + 1} pata-animate`}>
                        <img src={PataImg} alt="pata" />
                    </div>
                ))} */}

                {/* Container principal */}
                <div className="container">
                    <div className="welcome-section">
                        <h1 className="welcome-title">Bem-vindo ao APANIM!</h1>
                        <p className="welcome-subtitle">Escolha como deseja se cadastrar</p>
                    </div>

                    {/* Imagem do cachorro */}
                    <div className="dog-image">
                        <img src={DogSentadoImg} alt="Cachorro sentado" />
                    </div>

                    {/* Botões de cadastro */}
                    <div className="botoes-container">
                        <Link to="/cadastro-usuario">
                            <button id="botao_usuario" className="btn-cadastro">
                                <span className="btn-text">Cadastrar como Usuário</span>
                                <span className="btn-description">Adote e ajude animais</span>
                            </button>
                        </Link>
                        <Link to="/cadastro-vendedor">
                            <button id="botao_vendedor" className="btn-cadastro">
                                <span className="btn-text">Cadastrar como Vendedor</span>
                                <span className="btn-description">Venda de forma responsável</span>
                            </button>
                        </Link>
                    </div>

                    {/* Link para login */}
                    <div className="login-link">
                        <p>Já possui uma conta? <Link to="/login">Faça login aqui</Link></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <a href="https://instagram.com/apanim" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src={InstagramImg} alt="Siga-nos no Instagram" />
                    </a>
                    <a href="mailto:apanim.amor.protecao@gmail.com" aria-label="Email">
                        <img src={EmailImg} alt="Entre em contato por email" />
                    </a>
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <Link to="/adocao-animal"><span>Adote um novo amigo</span></Link><br />
                        <Link to="/compra-animal"><span>Compre um animal</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"><span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"><span>Cadastrar animal para adoção</span></Link><br />
                        <Link to="/cadastro-animal-venda"><span>Cadastrar animal para venda</span></Link><br />
                        <Link to="/cadastro-animal-perdido"><span>Cadastrar animal perdido</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"><span>Animais perdidos</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"><span>APANIM</span></Link><br />
                        <Link to="/servicos"><span>Serviços</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"><span>Cadastrar-se</span></Link><br />
                        <Link to="/login"><span>Login</span></Link>
                    </div>
                </nav>

                <div className="forum">
                    <a href="#" aria-label="Fórum">
                        <img src={ForumImg} alt="Acesse nosso fórum" />
                    </a>
                </div>
            </footer>
        </>
    );
};

export default CadastroInicial;