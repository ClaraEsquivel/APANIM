import { Link } from 'react-router-dom';
import './footer-unificado.css';
import InstagramImg from '../images/instagram.svg';
import EmailImg from '../images/email.svg';
import ForumImg from '../images/forum.svg';

function FooterUnificado() {
  return (
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
          <Link to="/login"><span>Login</span></Link><br />
          <Link to="/perfil-usuario"><span>Minha página de usuário</span></Link>
        </div>
      </nav>

      <div className="forum">
        <a href="#" aria-label="Fórum">
          <img src={ForumImg} alt="Acesse nosso fórum" />
        </a>
      </div>
    </footer>
  );
}

export default FooterUnificado;