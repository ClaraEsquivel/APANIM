import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import PataImg from '../../assets/images/pata.svg';
import PerfilImg from '../../assets/images/perfil.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

const PerfilUsuario = () => {
    const navigate = useNavigate();
    const { Modal, alertaSucesso, alertaErro, alertaAviso } = useModal();

    // Estados
    const [activeTab, setActiveTab] = useState('sobre');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [filterAnimais, setFilterAnimais] = useState('todos');
    const [userData, setUserData] = useState(null);
    const [bio, setBio] = useState('');
    const [tempBio, setTempBio] = useState('');

    // Carregar dados do usuário
    useEffect(() => {
        const usuarioLogado = sessionStorage.getItem('usuarioLogado');
        
        if (!usuarioLogado) {
            alertaErro('Não autenticado', 'Faça login para acessar o perfil');
            navigate('/login');
            return;
        }

        const usuario = JSON.parse(usuarioLogado);
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const dadosCompletos = usuarios.find(u => u.id === usuario.id);

        if (dadosCompletos) {
            setUserData(dadosCompletos);
            setBio(dadosCompletos.bio || '');
        } else {
            setUserData(usuario);
        }
    }, [navigate]);

    // Formatar data de cadastro
    const formatarData = (dataISO) => {
        if (!dataISO) return 'Janeiro 2025';
        const data = new Date(dataISO);
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return `${meses[data.getMonth()]} ${data.getFullYear()}`;
    };

    // Editar biografia
    const handleEditBio = () => {
        setTempBio(bio);
        setIsEditingBio(true);
    };

    const handleSaveBio = () => {
        setBio(tempBio);
        setIsEditingBio(false);
        
        // Atualizar no localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const index = usuarios.findIndex(u => u.id === userData.id);
        if (index !== -1) {
            usuarios[index].bio = tempBio;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alertaSucesso('Sucesso!', 'Biografia atualizada! ✓');
        }
    };

    const handleCancelBio = () => {
        setTempBio(bio);
        setIsEditingBio(false);
    };

    // Logout
    const handleLogout = async () => {
        sessionStorage.removeItem('usuarioLogado');
        await alertaSucesso('Até logo!', 'Você saiu da sua conta');
        navigate('/');
    };

    // Selecionar plano
    const handleSelectPlan = async (plano) => {
        await alertaSucesso(
            'Em breve!', 
            `O plano ${plano} estará disponível em breve. Aguarde! 🎉`
        );
    };

    if (!userData) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <p>Carregando...</p>
            </div>
        );
    }

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
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`patas${i + 1} pata-animate`}>
                        <img src={PataImg} alt="pata" />
                    </div>
                ))}

                <div className="profile-container">
                    {/* Header do Perfil */}
                    <div className="profile-header">
                        <div className="profile-cover">
                            <button className="edit-cover-btn" title="Alterar capa">📷</button>
                        </div>
                        
                        <div className="profile-main-info">
                            <div className="profile-avatar-container">
                                <img src={PerfilImg} alt="Foto de perfil" className="profile-avatar" />
                                <button className="edit-avatar-btn" title="Alterar foto">📷</button>
                            </div>
                            
                            <div className="profile-user-data">
                                <h1 className="profile-name">{userData.nome}</h1>
                                <p className="profile-email">{userData.email}</p>
                                <div className="profile-badges">
                                    {userData.objetivos?.includes('adotar') && (
                                        <span className="badge badge-adotante">🏠 Adotante</span>
                                    )}
                                    {userData.objetivos?.includes('doar') && (
                                        <span className="badge badge-doador">❤️ Doador</span>
                                    )}
                                    {userData.objetivos?.includes('comprar') && (
                                        <span className="badge badge-comprador">🛒 Comprador</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="profile-actions">
                                <button className="btn btn-primary">
                                    <span>✏️</span>
                                    <span>Editar Perfil</span>
                                </button>
                                <button className="btn btn-secondary" onClick={handleLogout}>
                                    <span>🚪</span>
                                    <span>Sair</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navegação de Abas */}
                    <div className="profile-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'sobre' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sobre')}
                        >
                            <span>📋</span>
                            <span>Sobre Mim</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'animais' ? 'active' : ''}`}
                            onClick={() => setActiveTab('animais')}
                        >
                            <span>🐾</span>
                            <span>Meus Animais</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'planos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('planos')}
                        >
                            <span>⭐</span>
                            <span>Planos</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'configuracoes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('configuracoes')}
                        >
                            <span>⚙️</span>
                            <span>Configurações</span>
                        </button>
                    </div>

                    {/* Conteúdo das Abas */}
                    <div className="profile-content">
                        
                        {/* ABA: SOBRE MIM */}
                        {activeTab === 'sobre' && (
                            <div className="tab-content active">
                                <div className="content-grid">
                                    {/* Card de Biografia */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Sobre Mim</h2>
                                            {!isEditingBio && (
                                                <button className="btn-icon" onClick={handleEditBio}>✏️</button>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <textarea 
                                                className="bio-textarea" 
                                                placeholder="Escreva um pouco sobre você, seus interesses e sua relação com os animais..."
                                                maxLength="500"
                                                value={isEditingBio ? tempBio : bio}
                                                onChange={(e) => setTempBio(e.target.value)}
                                                disabled={!isEditingBio}
                                            />
                                            <div className="char-count">
                                                <span>{isEditingBio ? tempBio.length : bio.length}</span>/<span>500</span> caracteres
                                            </div>
                                            {isEditingBio && (
                                                <div className="bio-actions">
                                                    <button className="btn btn-sm btn-primary" onClick={handleSaveBio}>Salvar</button>
                                                    <button className="btn btn-sm btn-secondary" onClick={handleCancelBio}>Cancelar</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card de Informações Pessoais */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Informações Pessoais</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="info-list">
                                                <div className="info-item">
                                                    <span className="info-icon">📧</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Email</span>
                                                        <span className="info-value">{userData.email}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📱</span>
                                                    <div className="info-content">
                                                        <span className="info-label">WhatsApp</span>
                                                        <span className="info-value">{userData.whatsapp || '(71) 99999-9999'}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📍</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Localização</span>
                                                        <span className="info-value">
                                                            {userData.bairro ? `${userData.bairro}, Salvador, BA` : 'Salvador, BA'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📅</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Membro desde</span>
                                                        <span className="info-value">{formatarData(userData.dataCadastro)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card de Estatísticas */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Minhas Estatísticas</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="stats-grid">
                                                <div className="stat-box">
                                                    <span className="stat-icon">🏠</span>
                                                    <span className="stat-number">0</span>
                                                    <span className="stat-label">Adoções</span>
                                                </div>
                                                <div className="stat-box">
                                                    <span className="stat-icon">❤️</span>
                                                    <span className="stat-number">0</span>
                                                    <span className="stat-label">Doações</span>
                                                </div>
                                                <div className="stat-box">
                                                    <span className="stat-icon">⭐</span>
                                                    <span className="stat-number">0</span>
                                                    <span className="stat-label">Favoritos</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: MEUS ANIMAIS */}
                        {activeTab === 'animais' && (
                            <div className="tab-content active">
                                <div className="animais-header">
                                    <h2>Meus Animais</h2>
                                    <Link to="/cadastro-animal-adocao">
                                        <button className="btn btn-primary">
                                            <span>➕</span>
                                            <span>Cadastrar Animal</span>
                                        </button>
                                    </Link>
                                </div>

                                <div className="animais-filters">
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'todos' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('todos')}
                                    >
                                        Todos
                                    </button>
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'adocao' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('adocao')}
                                    >
                                        Para Adoção
                                    </button>
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'adotados' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('adotados')}
                                    >
                                        Adotados
                                    </button>
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'favoritos' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('favoritos')}
                                    >
                                        Favoritos
                                    </button>
                                </div>

                                <div className="animais-grid">
                                    {/* Placeholder quando não há animais */}
                                    <div className="empty-state">
                                        <div className="empty-icon">🐾</div>
                                        <h3>Nenhum animal cadastrado</h3>
                                        <p>Cadastre seu primeiro animal para adoção ou compra</p>
                                        <Link to="/cadastro-animal-adocao">
                                            <button className="btn btn-primary">
                                                Cadastrar Agora
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: PLANOS */}
                        {activeTab === 'planos' && (
                            <div className="tab-content active">
                                <div className="planos-header">
                                    <h2>Escolha o Melhor Plano para Você</h2>
                                    <p>Desbloqueie recursos exclusivos e ajude ainda mais os animais</p>
                                </div>

                                <div className="current-plan-banner">
                                    <div className="banner-icon">⭐</div>
                                    <div className="banner-content">
                                        <h3>Seu Plano Atual: <span>Gratuito</span></h3>
                                        <p>Aproveite todos os recursos do seu plano atual</p>
                                    </div>
                                </div>

                                <div className="planos-grid">
                                    {/* Plano Gratuito */}
                                    <div className="plano-card">
                                        <div className="plano-badge">Atual</div>
                                        <div className="plano-icon">🐾</div>
                                        <h3 className="plano-nome">Gratuito</h3>
                                        <div className="plano-preco">
                                            <span className="preco">R$ 0</span>
                                            <span className="periodo">/mês</span>
                                        </div>
                                        <ul className="plano-features">
                                            <li>✓ Cadastro de até 3 animais</li>
                                            <li>✓ Busca básica de animais</li>
                                            <li>✓ Chat com adotantes</li>
                                            <li>✓ Perfil público</li>
                                            <li>✗ Destaque nos resultados</li>
                                            <li>✗ Análise de compatibilidade</li>
                                            <li>✗ Suporte prioritário</li>
                                        </ul>
                                        <button className="btn btn-secondary" disabled>Plano Atual</button>
                                    </div>

                                    {/* Plano Amigo */}
                                    <div className="plano-card">
                                        <div className="plano-icon">🐶</div>
                                        <h3 className="plano-nome">Amigo</h3>
                                        <div className="plano-preco">
                                            <span className="preco">R$ 19,90</span>
                                            <span className="periodo">/mês</span>
                                        </div>
                                        <ul className="plano-features">
                                            <li>✓ Cadastro de até 10 animais</li>
                                            <li>✓ Busca avançada</li>
                                            <li>✓ Chat ilimitado</li>
                                            <li>✓ Perfil destacado</li>
                                            <li>✓ Destaque moderado</li>
                                            <li>✓ Relatórios mensais</li>
                                            <li>✗ Suporte prioritário</li>
                                        </ul>
                                        <button className="btn btn-primary" onClick={() => handleSelectPlan('Amigo')}>
                                            Assinar Agora
                                        </button>
                                    </div>

                                    {/* Plano Protetor (Destaque) */}
                                    <div className="plano-card plano-destaque">
                                        <div className="plano-badge popular">Mais Popular</div>
                                        <div className="plano-icon">❤️</div>
                                        <h3 className="plano-nome">Protetor</h3>
                                        <div className="plano-preco">
                                            <span className="preco">R$ 39,90</span>
                                            <span className="periodo">/mês</span>
                                        </div>
                                        <ul className="plano-features">
                                            <li>✓ Cadastro ilimitado</li>
                                            <li>✓ Busca premium</li>
                                            <li>✓ Chat prioritário</li>
                                            <li>✓ Perfil premium</li>
                                            <li>✓ Máximo destaque</li>
                                            <li>✓ Análise de compatibilidade IA</li>
                                            <li>✓ Suporte prioritário 24/7</li>
                                        </ul>
                                        <button className="btn btn-primary" onClick={() => handleSelectPlan('Protetor')}>
                                            Assinar Agora
                                        </button>
                                    </div>

                                    {/* Plano ONG */}
                                    <div className="plano-card">
                                        <div className="plano-icon">🏢</div>
                                        <h3 className="plano-nome">ONG/Instituição</h3>
                                        <div className="plano-preco">
                                            <span className="preco">R$ 99,90</span>
                                            <span className="periodo">/mês</span>
                                        </div>
                                        <ul className="plano-features">
                                            <li>✓ Tudo do plano Protetor</li>
                                            <li>✓ Múltiplos usuários</li>
                                            <li>✓ Dashboard administrativo</li>
                                            <li>✓ Relatórios avançados</li>
                                            <li>✓ Página institucional</li>
                                            <li>✓ API de integração</li>
                                            <li>✓ Gestor de conta dedicado</li>
                                        </ul>
                                        <button className="btn btn-primary" onClick={() => handleSelectPlan('ONG')}>
                                            Assinar Agora
                                        </button>
                                    </div>
                                </div>

                                {/* Benefícios Gerais */}
                                <div className="beneficios-section">
                                    <h3>Por que assinar um plano premium?</h3>
                                    <div className="beneficios-grid">
                                        <div className="beneficio-item">
                                            <span className="beneficio-icon">🚀</span>
                                            <h4>Mais Visibilidade</h4>
                                            <p>Seus animais aparecem em destaque nas buscas</p>
                                        </div>
                                        <div className="beneficio-item">
                                            <span className="beneficio-icon">🤖</span>
                                            <h4>IA Integrada</h4>
                                            <p>Análise de compatibilidade entre adotante e pet</p>
                                        </div>
                                        <div className="beneficio-item">
                                            <span className="beneficio-icon">📊</span>
                                            <h4>Relatórios</h4>
                                            <p>Acompanhe estatísticas e performance</p>
                                        </div>
                                        <div className="beneficio-item">
                                            <span className="beneficio-icon">💬</span>
                                            <h4>Suporte Premium</h4>
                                            <p>Atendimento prioritário quando precisar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: CONFIGURAÇÕES */}
                        {activeTab === 'configuracoes' && (
                            <div className="tab-content active">
                                <div className="settings-grid">
                                    {/* Privacidade */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Privacidade</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Perfil Público</span>
                                                    <span className="setting-description">Permite que outros usuários vejam seu perfil</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Mostrar Email</span>
                                                    <span className="setting-description">Exibe seu email no perfil público</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Mostrar WhatsApp</span>
                                                    <span className="setting-description">Exibe seu WhatsApp no perfil público</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notificações */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Notificações</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Email</span>
                                                    <span className="setting-description">Receber notificações por email</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Push</span>
                                                    <span className="setting-description">Notificações push no navegador</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Mensagens</span>
                                                    <span className="setting-description">Notificar sobre novas mensagens</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Segurança */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Segurança</h2>
                                        </div>
                                        <div className="card-body">
                                            <button className="btn btn-outline btn-block">
                                                <span>🔒</span>
                                                <span>Alterar Senha</span>
                                            </button>
                                            <button className="btn btn-outline btn-block">
                                                <span>📧</span>
                                                <span>Alterar Email</span>
                                            </button>
                                            <button className="btn btn-outline btn-block">
                                                <span>📱</span>
                                                <span>Alterar Telefone</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Conta */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Conta</h2>
                                        </div>
                                        <div className="card-body">
                                            <button className="btn btn-outline btn-block">
                                                <span>💾</span>
                                                <span>Baixar Meus Dados</span>
                                            </button>
                                            <button className="btn btn-outline btn-block btn-danger">
                                                <span>⚠️</span>
                                                <span>Desativar Conta</span>
                                            </button>
                                            <button className="btn btn-outline btn-block btn-danger">
                                                <span>🗑️</span>
                                                <span>Excluir Conta</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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

export default PerfilUsuario;