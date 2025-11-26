import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu-styles.css';

function MenuUnificado() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  // Fecha o menu quando a rota mudar
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuAberto(false);
  }, [location]);

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
        
        {/* ✅ Links usando React Router */}
        <li><Link to="/sobre">APANIM - Quem somos nós?</Link></li>
        <li><Link to="/">Página Inicial</Link></li>
        <li><Link to="/cadastro">Cadastro</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/adocao-animal">Animais para Adoção</Link></li>
        <li><Link to="/compra-animal">Animais para Compra</Link></li>
        <li><Link to="/animais-perdidos">Animais Perdidos</Link></li>
        <li><Link to="/cadastro-animal-adocao">Cadastro Animal para Adoção</Link></li>
        <li><Link to="/cadastro-animal-venda">Cadastro Animal para Venda</Link></li>
        <li><Link to="/cadastro-animal-perdido">Cadastro Animal Perdido</Link></li>
        <li><Link to="/parceria">Parcerias</Link></li>
        <li><Link to="/servicos">Serviços</Link></li>
        <li><Link to="/planos-assinatura">Planos de Assinatura</Link></li>
      </ul>
    </div>
  );
}

export default MenuUnificado;