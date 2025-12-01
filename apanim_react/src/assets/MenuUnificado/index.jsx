import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu-styles.css';

function MenuUnificado() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  // Fecha o menu quando a rota mudar
  useEffect(() => {
    // Usando setTimeout para tornar o setState assíncrono
    const timer = setTimeout(() => {
      setMenuAberto(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location]);

  // Fecha o menu ao clicar em um link
  const handleLinkClick = () => {
    setMenuAberto(false);
  };

  return (
    <div id="menu_sanduiche">
      <input 
        type="checkbox" 
        id="menu_toggle" 
        checked={menuAberto}
        onChange={() => setMenuAberto(!menuAberto)}
      />
      
      <div className="hamburger-lines" onClick={() => setMenuAberto(!menuAberto)}>
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      
      <ul id="menu">
        <div className="menu-close">
          <label 
            className="close-button"
            onClick={() => setMenuAberto(false)}
          >
            <span className="close-line1"></span>
            <span className="close-line2"></span>
          </label>
        </div>
        
        <li><Link to="/apanim" onClick={handleLinkClick}>APANIM - Quem somos nós?</Link></li>
        <li><Link to="/menu" onClick={handleLinkClick}>Página Inicial</Link></li>
        <li><Link to="/cadastro" onClick={handleLinkClick}>Cadastro</Link></li>
        <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
        <li><Link to="/adocao-animal" onClick={handleLinkClick}>Animais para Adoção</Link></li>
        <li><Link to="/compra-animal" onClick={handleLinkClick}>Animais para Compra</Link></li>
        <li><Link to="/animais-perdidos" onClick={handleLinkClick}>Animais Perdidos</Link></li>
        <li><Link to="/cadastro-animal-adocao" onClick={handleLinkClick}>Cadastro Animal para Adoção</Link></li>
        <li><Link to="/cadastro-animal-venda" onClick={handleLinkClick}>Cadastro Animal para Venda</Link></li>
        <li><Link to="/cadastro-animal-perdido" onClick={handleLinkClick}>Cadastro Animal Perdido</Link></li>
        <li><Link to="/parceria" onClick={handleLinkClick}>Parcerias</Link></li>
        <li><Link to="/servicos" onClick={handleLinkClick}>Serviços</Link></li>
        <li><Link to="/planos-assinatura" onClick={handleLinkClick}>Planos de Assinatura</Link></li>
      </ul>
    </div>
  );
}

export default MenuUnificado;