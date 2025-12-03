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

  const isGmailEmail = (email) => {
    return email.toLowerCase().endsWith('@gmail.com');
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

    if (!isGmailEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Por favor, use um email @gmail.com' }));
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

  // ============= SIMULAR LOGIN COM GOOGLE =============
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    showToast('Conectando com o Google...', 'info');

    // Simula autenticação do Google
    setTimeout(() => {
      const mockGoogleUser = {
        id: Date.now().toString(),
        name: 'Usuário Demo',
        email: 'usuario.demo@gmail.com',
        picture: '🐾', // Emoji como placeholder
        provider: 'google'
      };

      // Salva no localStorage
      localStorage.setItem('apanim_user', JSON.stringify(mockGoogleUser));
      localStorage.setItem('apanim_logged_in', 'true');

      showToast('Login com Google realizado com sucesso! 🎉', 'success');

      setTimeout(() => {
        navigate('/perfil-usuario');
      }, 1500);

      setIsLoading(false);
    }, 1500);
  };

  // ============= PROCESSAR LOGIN =============
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

    // Simula chamada à API
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
        provider: 'email'
      };

      // Salva no localStorage
      localStorage.setItem('apanim_user', JSON.stringify(user));
      localStorage.setItem('apanim_logged_in', 'true');

      if (formData.rememberMe) {
        localStorage.setItem('apanim_remember_me', 'true');
      }

      showToast('Login realizado com sucesso! 🎉', 'success');

      setTimeout(() => {
        navigate('/perfil-usuario');
      }, 1500);

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

    if (!isGmailEmail(resetEmail)) {
      showToast('Por favor, use um email @gmail.com', 'error');
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
    localStorage.removeItem('apanim_user');
    localStorage.removeItem('apanim_logged_in');
    localStorage.removeItem('apanim_remember_me');
    showToast('Cache de login limpo!', 'info');
  };

  // ============= EFEITOS =============
  useEffect(() => {
    // REMOVIDO: Verificação de login automático
    // Agora sempre mostra a tela de login

    // Animações de entrada
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.style.opacity = '1';
        containerRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Autofocus no email
    if (emailInputRef.current) {
      setTimeout(() => {
        emailInputRef.current.focus();
      }, 500);
    }

    // Fecha modal com ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showForgotPasswordModal) {
        setShowForgotPasswordModal(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showForgotPasswordModal]);

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
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className={`patas${num} pata-animate`}>
            <img src={PataImg} alt="pata" />
          </div>
        ))}

        {/* Container principal */}
        <div
          ref={containerRef}
          className="container"
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.5s ease' }}
        >
          <div className="welcome-section">
            <div className="logo-circle">
              <img src={PerfilImg} alt="perfil" />
            </div>
            <h1 className="welcome-title">Bem-vindo de Volta!</h1>
            <p className="welcome-subtitle">Faça login para continuar ajudando os animais</p>
          </div>

          {/* Seção de login com Google */}
          <div className="login-google">
            <button
              className="google-btn"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              type="button"
            >
              <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3">
                <path fill="#5a0609" d="M533.5 278.4c0-18.5-1.5-36.3-4.4-53.6H272v101.5h146.5c-6.3 34-25.2 62.8-53.8 82l87 67c50.8-46.9 81.8-116 81.8-196z" />
                <path fill="#5a0609" d="M272 544.3c72.6 0 133.6-24 178-65.2l-87-67c-24.1 16.2-55 25.8-91 25.8-69.8 0-129-47.1-150.1-110.5l-89.6 69.2C69.9 483 163.1 544.3 272 544.3z" />
                <path fill="#5a0609" d="M121.9 326.4c-11.6-34.8-11.6-72.5 0-107.3L32.3 149.9c-41.3 81.8-41.3 179.4 0 261.2l89.6-69.2z" />
                <path fill="#5a0609" d="M272 107.7c39.5 0 75 13.6 103 40.3l77.3-77.3C405 24 344 0 272 0 163.1 0 69.9 61.3 32.3 149.9l89.6 69.2C143 154.8 202.2 107.7 272 107.7z" />
              </svg>
              <span>Entrar com Google</span>
            </button>
          </div>

          <div className="divider">
            <span>ou entre com seu email</span>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">
                <span className="label-icon"></span>
                Email
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                name="email"
                placeholder="seu@gmail.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message show">{errors.email}</span>
              )}
            </div>

            <div className={`form-group ${errors.password ? 'error' : ''}`}>
              <label htmlFor="password">
                <span className="label-icon"></span>
                Senha
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  <span className="eye-icon">
                    {showPassword ? '🔓' : '🔒'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <span className="error-message show">{errors.password}</span>
              )}
            </div>

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

            <button
              type="submit"
              className={`btn-login ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="btn-text">
                {isLoading ? 'Entrando...' : 'Entrar'}
              </span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          {/* Link para cadastro */}
          <div className="signup-link">
            <p>
              Ainda não tem uma conta?{' '}
              <Link to="/cadastro">Cadastre-se aqui</Link>
            </p>
          </div>

          {/* Botão de debug (REMOVER EM PRODUÇÃO) */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={clearLogin}
              style={{
                padding: '8px 16px',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🔧 Limpar Cache (Debug)
            </button>
          </div>

          {/* Informações de segurança */}
          <div className="security-info">
            <div className="security-icon">🔒</div>
            <p>Seus dados estão seguros conosco</p>
          </div>
        </div>
      </div>

      {/* Modal de Esqueci a Senha */}
      {showForgotPasswordModal && (
        <div
          className="modal show"
          onClick={(e) => {
            if (e.target.className === 'modal show') {
              setShowForgotPasswordModal(false);
            }
          }}
        >
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowForgotPasswordModal(false)}
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2>Recuperar Senha</h2>
            <p>Digite seu email e enviaremos instruções para redefinir sua senha.</p>

            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label htmlFor="reset-email">Email</label>
                <input
                  type="email"
                  id="reset-email"
                  name="reset-email"
                  placeholder="seu@gmail.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-reset">
                Enviar Link de Recuperação
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="base">
        <div className="redes_sociais">
          <a href="#" aria-label="Instagram">
            <img src={InstagramImg} alt="Siga-nos no Instagram" />
          </a>
          <a href="mailto:apanim.amor.protecao@gmail.com" aria-label="Email">
            <img src={EmailImg} alt="Entre em contato por email" />
          </a>
        </div>

        <nav className="links_uteis" aria-label="Links úteis">
          <div>
            <span className="titulo">Encontre um novo pet</span><br />
            <Link to="/adocao-animal"><span>Adote</span></Link><br />
            <Link to="/compra-animal"><span>Compre</span></Link>
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
            <Link to="/apanim"><span>APANIM</span></Link>
          </div>
          <div>
            <span className="titulo">Meu perfil</span><br />
            <Link to="/cadastro"><span>Cadastrar-se</span></Link><br />
            <Link to="/perfil-usuario"><span>Minha página de usuário</span></Link><br />
            <Link to="/perfil-vendedor"><span>Minha página de vendedor</span></Link>
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
}

export default Login;