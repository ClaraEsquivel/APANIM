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

const PerfilVendedor = () => {
    const navigate = useNavigate();
    const { Modal, alertaSucesso, alertaErro } = useModal();

    // Estados
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [filterAnimais, setFilterAnimais] = useState('todos');
    const [vendedorData, setVendedorData] = useState(null);
    const [descricaoLoja, setDescricaoLoja] = useState('');
    const [tempDescricao, setTempDescricao] = useState('');

    // Carregar dados do vendedor
    useEffect(() => {
        const vendedorLogado = sessionStorage.getItem('vendedorLogado');
        
        if (!vendedorLogado) {
            alertaErro('Não autenticado', 'Faça login para acessar o perfil');
            navigate('/login');
            return;
        }

        const vendedor = JSON.parse(vendedorLogado);
        const vendedores = JSON.parse(localStorage.getItem('vendedores') || '[]');
        const dadosCompletos = vendedores.find(v => v.id === vendedor.id);

        if (dadosCompletos) {
            setVendedorData(dadosCompletos);
            setDescricaoLoja(dadosCompletos.descricaoLoja || '');
        } else {
            setVendedorData(vendedor);
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

    // Editar descrição da loja
    const handleEditDescricao = () => {
        setTempDescricao(descricaoLoja);
        setIsEditingBio(true);
    };

    const handleSaveDescricao = () => {
        setDescricaoLoja(tempDescricao);
        setIsEditingBio(false);
        
        // Atualizar no localStorage
        const vendedores = JSON.parse(localStorage.getItem('vendedores') || '[]');
        const index = vendedores.findIndex(v => v.id === vendedorData.id);
        if (index !== -1) {
            vendedores[index].descricaoLoja = tempDescricao;
            localStorage.setItem('vendedores', JSON.stringify(vendedores));
            alertaSucesso('Sucesso!', 'Descrição da loja atualizada! ✓');
        }
    };

    const handleCancelDescricao = () => {
        setTempDescricao(descricaoLoja);
        setIsEditingBio(false);
    };

    // Logout
    const handleLogout = async () => {
        sessionStorage.removeItem('vendedorLogado');
        await alertaSucesso('Até logo!', 'Você saiu da sua conta');
        navigate('/');
    };

    if (!vendedorData) {
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
                            <button className="edit-cover-btn" title="Alterar capa da loja">📷</button>
                            {/* Status de verificação */}
                            <div className={`verification-badge ${vendedorData.status === 'ativo' ? 'verified' : 'pending'}`}>
                                <span className="badge-icon">
                                    {vendedorData.status === 'ativo' ? '✓' : '⏳'}
                                </span>
                                <span className="badge-text">
                                    {vendedorData.status === 'ativo' ? 'Verificado' : 'Pendente'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="profile-main-info">
                            <div className="profile-avatar-container">
                                <img src={PerfilImg} alt="Logo da empresa" className="profile-avatar" />
                                <button className="edit-avatar-btn" title="Alterar logo">📷</button>
                            </div>
                            
                            <div className="profile-user-data">
                                <h1 className="profile-name">{vendedorData.nomeFantasia}</h1>
                                <p className="profile-company-info">
                                    <span>{vendedorData.razaoSocial}</span> • 
                                    <span>CNPJ: {vendedorData.cnpj}</span>
                                </p>
                                <div className="profile-badges">
                                    <span className="badge badge-vendor">
                                        🏪 Vendedor Registrado
                                    </span>
                                    <span className="badge badge-rating">
                                        ⭐ 4.8
                                    </span>
                                    <span className="badge badge-sales">
                                        📦 0 Vendas
                                    </span>
                                </div>
                            </div>
                            
                            <div className="profile-actions">
                                <button className="btn btn-primary">
                                    <span>✏️</span>
                                    <span>Editar Perfil</span>
                                </button>
                                <Link to="/cadastro-animal-venda">
                                    <button className="btn btn-success">
                                        <span>➕</span>
                                        <span>Novo Animal</span>
                                    </button>
                                </Link>
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
                            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            <span>📊</span>
                            <span>Dashboard</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'animais' ? 'active' : ''}`}
                            onClick={() => setActiveTab('animais')}
                        >
                            <span>🐾</span>
                            <span>Meus Animais</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'vendas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('vendas')}
                        >
                            <span>💰</span>
                            <span>Vendas</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'loja' ? 'active' : ''}`}
                            onClick={() => setActiveTab('loja')}
                        >
                            <span>🏪</span>
                            <span>Sobre a Loja</span>
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
                        
                        {/* ABA: DASHBOARD */}
                        {activeTab === 'dashboard' && (
                            <div className="tab-content active">
                                {/* Estatísticas Principais */}
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon">📦</div>
                                        <div className="stat-info">
                                            <h3>0</h3>
                                            <p>Vendas este mês</p>
                                        </div>
                                        <div className="stat-trend positive">
                                            <span>↗</span>
                                            <span>+12%</span>
                                        </div>
                                    </div>

                                    <div className="stat-card">
                                        <div className="stat-icon">💰</div>
                                        <div className="stat-info">
                                            <h3>R$ 0,00</h3>
                                            <p>Faturamento</p>
                                        </div>
                                        <div className="stat-trend positive">
                                            <span>↗</span>
                                            <span>+8%</span>
                                        </div>
                                    </div>

                                    <div className="stat-card">
                                        <div className="stat-icon">🐾</div>
                                        <div className="stat-info">
                                            <h3>0</h3>
                                            <p>Animais ativos</p>
                                        </div>
                                    </div>

                                    <div className="stat-card">
                                        <div className="stat-icon">👥</div>
                                        <div className="stat-info">
                                            <h3>0</h3>
                                            <p>Visualizações</p>
                                        </div>
                                        <div className="stat-trend positive">
                                            <span>↗</span>
                                            <span>+15%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Gráfico e Atividades */}
                                <div className="content-grid">
                                    {/* Gráfico de Vendas */}
                                    <div className="card chart-card">
                                        <div className="card-header">
                                            <h2>Vendas dos Últimos 7 Dias</h2>
                                            <select className="period-selector">
                                                <option>Últimos 7 dias</option>
                                                <option>Últimos 30 dias</option>
                                                <option>Últimos 3 meses</option>
                                            </select>
                                        </div>
                                        <div className="card-body">
                                            <div className="chart-placeholder">
                                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, i) => (
                                                    <div key={i} className="bar" style={{ height: `${[40, 60, 80, 50, 70, 90, 65][i]}%` }}>
                                                        <span className="bar-label">{dia}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Atividades Recentes */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Atividades Recentes</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="empty-state">
                                                <div className="empty-icon">📋</div>
                                                <h3>Nenhuma atividade recente</h3>
                                                <p>Suas atividades aparecerão aqui</p>
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
                                    <h2>Meus Animais à Venda</h2>
                                    <Link to="/cadastro-animal-venda">
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
                                        className={`filter-btn ${filterAnimais === 'ativos' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('ativos')}
                                    >
                                        Ativos
                                    </button>
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'vendidos' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('vendidos')}
                                    >
                                        Vendidos
                                    </button>
                                    <button 
                                        className={`filter-btn ${filterAnimais === 'pausados' ? 'active' : ''}`}
                                        onClick={() => setFilterAnimais('pausados')}
                                    >
                                        Pausados
                                    </button>
                                </div>

                                <div className="animais-grid">
                                    {/* Placeholder quando não há animais */}
                                    <div className="empty-state">
                                        <div className="empty-icon">🐾</div>
                                        <h3>Nenhum animal cadastrado</h3>
                                        <p>Cadastre seu primeiro animal para venda</p>
                                        <Link to="/cadastro-animal-venda">
                                            <button className="btn btn-primary">
                                                Cadastrar Agora
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: VENDAS */}
                        {activeTab === 'vendas' && (
                            <div className="tab-content active">
                                <div className="vendas-header">
                                    <h2>Histórico de Vendas</h2>
                                    <div className="vendas-filters">
                                        <input type="text" placeholder="Buscar vendas..." className="search-input" />
                                        <select className="filter-select">
                                            <option>Todas as vendas</option>
                                            <option>Este mês</option>
                                            <option>Último mês</option>
                                            <option>Últimos 3 meses</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="vendas-container">
                                    <div className="empty-state">
                                        <div className="empty-icon">💰</div>
                                        <h3>Nenhuma venda realizada</h3>
                                        <p>Suas vendas aparecerão aqui quando você realizar a primeira</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: SOBRE A LOJA */}
                        {activeTab === 'loja' && (
                            <div className="tab-content active">
                                <div className="content-grid">
                                    {/* Card de Descrição da Loja */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Sobre Nossa Loja</h2>
                                            {!isEditingBio && (
                                                <button className="btn-icon" onClick={handleEditDescricao}>✏️</button>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <textarea 
                                                className="bio-textarea" 
                                                placeholder="Conte sobre sua loja, especialidades, histórico e diferenciais..."
                                                maxLength="1000"
                                                value={isEditingBio ? tempDescricao : descricaoLoja}
                                                onChange={(e) => setTempDescricao(e.target.value)}
                                                disabled={!isEditingBio}
                                            />
                                            <div className="char-count">
                                                <span>{isEditingBio ? tempDescricao.length : descricaoLoja.length}</span>/<span>1000</span> caracteres
                                            </div>
                                            {isEditingBio && (
                                                <div className="bio-actions">
                                                    <button className="btn btn-sm btn-primary" onClick={handleSaveDescricao}>Salvar</button>
                                                    <button className="btn btn-sm btn-secondary" onClick={handleCancelDescricao}>Cancelar</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card de Informações da Empresa */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Informações da Empresa</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="info-list">
                                                <div className="info-item">
                                                    <span className="info-icon">🏢</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Razão Social</span>
                                                        <span className="info-value">{vendedorData.razaoSocial}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">🏪</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Nome Fantasia</span>
                                                        <span className="info-value">{vendedorData.nomeFantasia}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📋</span>
                                                    <div className="info-content">
                                                        <span className="info-label">CNPJ</span>
                                                        <span className="info-value">{vendedorData.cnpj}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📄</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Inscrição Estadual</span>
                                                        <span className="info-value">{vendedorData.inscricaoEstadual}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📞</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Telefone Comercial</span>
                                                        <span className="info-value">{vendedorData.telefoneComercial}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📧</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Email Comercial</span>
                                                        <span className="info-value">{vendedorData.emailComercial}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📍</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Endereço</span>
                                                        <span className="info-value">
                                                            {vendedorData.rua}, {vendedorData.numero} - {vendedorData.bairro}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-icon">📅</span>
                                                    <div className="info-content">
                                                        <span className="info-label">Membro desde</span>
                                                        <span className="info-value">{formatarData(vendedorData.dataCadastro)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card de Documentos */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Documentação</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="docs-list">
                                                <div className="doc-item">
                                                    <span className="doc-icon">📄</span>
                                                    <span className="doc-name">Licença/Registro</span>
                                                    <span className="doc-status verified">✓ Verificado</span>
                                                </div>
                                                <div className="doc-item">
                                                    <span className="doc-icon">📄</span>
                                                    <span className="doc-name">Alvará de Funcionamento</span>
                                                    <span className="doc-status verified">✓ Verificado</span>
                                                </div>
                                                <div className="doc-item">
                                                    <span className="doc-icon">📄</span>
                                                    <span className="doc-name">Contrato Social</span>
                                                    <span className="doc-status verified">✓ Verificado</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: CONFIGURAÇÕES */}
                        {activeTab === 'configuracoes' && (
                            <div className="tab-content active">
                                <div className="settings-grid">
                                    {/* Configurações da Loja */}
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Configurações da Loja</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Loja Aberta</span>
                                                    <span className="setting-description">Permite que clientes vejam e comprem seus animais</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Aceitar Reservas</span>
                                                    <span className="setting-description">Permitir que clientes reservem animais</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Mostrar Preços</span>
                                                    <span className="setting-description">Exibir preços publicamente</span>
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
                                                    <span className="setting-label">Novas Vendas</span>
                                                    <span className="setting-description">Notificar quando houver uma nova venda</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Mensagens</span>
                                                    <span className="setting-description">Notificar sobre mensagens de clientes</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div className="setting-item">
                                                <div className="setting-info">
                                                    <span className="setting-label">Relatórios Semanais</span>
                                                    <span className="setting-description">Receber resumo semanal por email</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" />
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
                                                <span>Baixar Dados da Loja</span>
                                            </button>
                                            <button className="btn btn-outline btn-block btn-danger">
                                                <span>⚠️</span>
                                                <span>Pausar Vendas</span>
                                            </button>
                                            <button className="btn btn-outline btn-block btn-danger">
                                                <span>🗑️</span>
                                                <span>Desativar Conta</span>
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

export default PerfilVendedor;