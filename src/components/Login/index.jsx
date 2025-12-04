import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuUnificado from '../MenuUnificado';
import ScrollTop from '../ScrollTop';
import './styles.css';
import '../Layout/header-unificado.css';
import '../Layout/footer-unificado.css';
import '../MenuUnificado/menu-styles.css';
import PerfilImg from '../../assets/images/User.svg';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import PataImg from '../../assets/images/pata.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

function Login() {
  const navigate = useNavigate();

  // ============= NOVO: Seletor de tipo de login =============
  const [tipoLogin, setTipoLogin] = useState('usuario'); // 'usuario' ou 'vendedor'

  // Estados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Refs
  const emailInputRef = useRef(null);
  const containerRef = useRef(null);

  // ============= VALIDAÇÕES =============
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // ============= VALIDAR CAMPO EMAIL =============
  const validateEmail = (email) => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Por favor, digite seu email' }));
      return false;
    }

    if (!isValidEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Por favor, digite um email válido' }));
      return false;
    }

    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  // ============= VALIDAR CAMPO SENHA =============
  const validatePassword = (password) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Por favor, digite sua senha' }));
      return false;
    }

    if (!isValidPassword(password)) {
      setErrors(prev => ({ ...prev, password: 'A senha deve ter no mínimo 6 caracteres' }));
      return false;
    }

    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  // ============= HANDLERS =============
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpa erro ao digitar
    if (name === 'email' && errors.email) {
      validateEmail(value);
    }
    if (name === 'password' && errors.password) {
      validatePassword(value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') validateEmail(value);
    if (name === 'password') validatePassword(value);
  };

  // ============= TOAST NOTIFICATIONS =============
  const showToast = (message, type = 'info') => {
    const toastContainer = document.createElement('div');
    toastContainer.className = `toast toast-${type}`;

    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
      warning: '⚠'
    };

    toastContainer.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.classList.add('show');
    }, 10);

    setTimeout(() => {
      toastContainer.classList.remove('show');
      setTimeout(() => toastContainer.remove(), 500);
    }, 3000);
  };

  // ============= PROCESSAR LOGIN - ATUALIZADO =============
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida todos os campos
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);

    if (!emailValid || !passwordValid) {
      showToast('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setIsLoading(true);

    // Simula verificação no banco de dados
    setTimeout(() => {
      let loginSucesso = false;
      let dadosUsuario = null;
      let rotaRedirecionamento = '/';

      if (tipoLogin === 'usuario') {
        // Buscar usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioEncontrado = usuarios.find(
          u => u.email === formData.email && u.senha === formData.password
        );

        if (usuarioEncontrado) {
          loginSucesso = true;
          dadosUsuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            tipo: 'usuario'
          };
          rotaRedirecionamento = '/perfil-usuario';

          // Salvar sessão
          sessionStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
        }
      } else {
        // Buscar vendedores cadastrados
        const vendedores = JSON.parse(localStorage.getItem('vendedores') || '[]');
        const vendedorEncontrado = vendedores.find(
          v => v.emailComercial === formData.email && v.senha === formData.password
        );

        if (vendedorEncontrado) {
          loginSucesso = true;
          dadosUsuario = {
            id: vendedorEncontrado.id,
            nomeFantasia: vendedorEncontrado.nomeFantasia,
            email: vendedorEncontrado.emailComercial,
            status: vendedorEncontrado.status,
            tipo: 'vendedor'
          };
          rotaRedirecionamento = '/perfil-vendedor';

          // Salvar sessão
          sessionStorage.setItem('vendedorLogado', JSON.stringify(dadosUsuario));
        }
      }

      if (loginSucesso) {
        // Login bem-sucedido
        if (formData.rememberMe) {
          localStorage.setItem('apanim_remember_me', 'true');
          localStorage.setItem('apanim_remember_tipo', tipoLogin);
        }

        showToast('Login realizado com sucesso! 🎉', 'success');

        setTimeout(() => {
          navigate(rotaRedirecionamento);
        }, 1500);
      } else {
        // Login falhou
        showToast('Email ou senha incorretos', 'error');
      }

      setIsLoading(false);
    }, 1500);
  };

  // ============= RECUPERAR SENHA =============
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!isValidEmail(resetEmail)) {
      showToast('Por favor, digite um email válido', 'error');
      return;
    }

    // Simula envio de email
    showToast('Enviando link de recuperação...', 'info');

    setTimeout(() => {
      showToast('Link de recuperação enviado para seu email! 📧', 'success');
      setShowForgotPasswordModal(false);
      setResetEmail('');
    }, 2000);
  };

  // ============= LIMPAR LOGIN (ÚTIL PARA DEBUG) =============
  const clearLogin = () => {
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('vendedorLogado');
    localStorage.removeItem('apanim_remember_me');
    localStorage.removeItem('apanim_remember_tipo');
    showToast('Cache de login limpo!', 'info');
  };

  // ============= EFEITOS =============
  useEffect(() => {
    // Verificar se já está logado
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    const vendedorLogado = sessionStorage.getItem('vendedorLogado');

    if (usuarioLogado) {
      navigate('/perfil-usuario');
    } else if (vendedorLogado) {
      navigate('/perfil-vendedor');
    }

    // Focus no input de email
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }

    // Carregar preferência de "lembrar-me"
    const rememberMe = localStorage.getItem('apanim_remember_me') === 'true';
    const tipoRemembrado = localStorage.getItem('apanim_remember_tipo');

    if (rememberMe && tipoRemembrado) {
      setTipoLogin(tipoRemembrado);
    }
  }, [navigate]);

  // ============= RENDER =============
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
        <nav role="navigation">
          <MenuUnificado />
        </nav>
      </header>

      <ScrollTop />

      {/* Conteúdo Central */}
      <div className="central">
        {/* Patas decorativas */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`patas${i + 1} pata-animate`}>
            <img src={PataImg} alt="pata" />
          </div>
        ))}

        {/* Container Principal */}
        <div className="container" ref={containerRef}>
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="logo-circle">
              <img src={PerfilImg} alt="perfil" />
            </div>
            <h1 className="welcome-title">Bem-vindo de volta!</h1>
            <p className="welcome-subtitle">Faça login para continuar</p>
          </div>

          {/* NOVO: Seletor de Tipo de Login */}
          <div className="login-type-selector">
            <button
              type="button"
              className={`type-btn ${tipoLogin === 'usuario' ? 'active' : ''}`}
              onClick={() => setTipoLogin('usuario')}
            >
              <span className="type-icon"></span>
              <span>Usuário</span>
            </button>
            <button
              type="button"
              className={`type-btn ${tipoLogin === 'vendedor' ? 'active' : ''}`}
              onClick={() => setTipoLogin('vendedor')}
            >
              <span className="type-icon"></span>
              <span>Vendedor</span>
            </button>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                {tipoLogin === 'usuario' ? 'E-mail' : 'E-mail Comercial'}
                <span className="required">*</span>
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? 'error' : ''}
                placeholder={tipoLogin === 'usuario' ? 'seu@email.com' : 'contato@empresa.com'}
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="password">
                Senha <span className="required">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password ? 'error' : ''}
                  placeholder="Digite sua senha"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? '🔓' : '🔒'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Opções */}
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="forgot-password"
                onClick={() => setShowForgotPasswordModal(true)}
                disabled={isLoading}
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Botão de Login */}
            <button type="submit" className="btn btn-login" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>ou</span>
          </div>

          {/* Links de Cadastro */}
          <div className="signup-link">
            <p>
              Ainda não tem uma conta?{' '}
              <Link to="/cadastro">Cadastre-se aqui</Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <span className="info-icon">ℹ️</span>
            <div>
              <p><strong>Dica:</strong> Use o email e senha que você cadastrou.</p>
              {tipoLogin === 'vendedor' && (
                <p><small>Vendedores devem usar o email comercial cadastrado.</small></p>
              )}
            </div>
          </div>

          {/* Debug Button (remover em produção) */}
          {/* <button onClick={clearLogin} className="btn-debug">
            🗑️ Limpar Cache de Login
          </button> */}
        </div>
      </div>

      {/* Modal de Recuperar Senha */}
      {showForgotPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowForgotPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowForgotPasswordModal(false)}
            >
              ✕
            </button>
            <h2>Recuperar Senha</h2>
            <p>Digite seu email para receber o link de recuperação</p>
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="base">
        <div className="redes_sociais">
          <a href="https://instagram.com/apanim" target="_blank" rel="noopener noreferrer">
            <img src={InstagramImg} alt="Instagram" />
          </a>
          <a href="mailto:apanim.amor.protecao@gmail.com">
            <img src={EmailImg} alt="Email" />
          </a>
        </div>

        <nav className="links_uteis">
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
          <a href="#">
            <img src={ForumImg} alt="Fórum" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Login;