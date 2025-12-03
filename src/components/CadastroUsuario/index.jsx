import { useState } from 'react';
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
import PerfilImg from '../../assets/images/User.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

const CadastroUsuario = () => {
    const navigate = useNavigate();
    const { Modal, alertaSucesso, alertaErro } = useModal();

    // Estados
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        // Etapa 1: Objetivo
        objetivos: [],
        
        // Etapa 2: Dados Pessoais
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        whatsapp: '',
        senha: '',
        confirmarSenha: '',
        
        // Etapa 3: Endereço (Simplificado)
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        
        // Etapa 4: Informações Adicionais
        tipoResidencia: '',
        telasProtecao: '',
        outrosAnimais: '',
        moradoresConcordam: '',
        motivoAdocao: '',
        termos: false
    });

    const totalSteps = 4;

    // Máscara de CPF
    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    // Máscara de Telefone
    const maskPhone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    // Handler genérico para inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox' && name === 'termos') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handler para checkbox de objetivos
    const handleObjetivosChange = (objetivo) => {
        setFormData(prev => {
            const objetivos = prev.objetivos.includes(objetivo)
                ? prev.objetivos.filter(o => o !== objetivo)
                : [...prev.objetivos, objetivo];
            return { ...prev, objetivos };
        });
    };

    // Handler para inputs com máscara
    const handleMaskedInput = (e, maskFunction) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: maskFunction(value)
        }));
    };



    // Validar email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Validar etapa atual
    const validarEtapa = async (step) => {
        switch (step) {
            case 1:
                if (formData.objetivos.length === 0) {
                    await alertaErro('Campo Obrigatório', 'Selecione pelo menos um objetivo');
                    return false;
                }
                break;

            case 2:
                if (!formData.nome.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o nome completo');
                    return false;
                }
                if (!formData.cpf.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o CPF');
                    return false;
                }
                if (!formData.dataNascimento) {
                    await alertaErro('Campo Obrigatório', 'Preencha a data de nascimento');
                    return false;
                }
                if (!validarEmail(formData.email)) {
                    await alertaErro('Email Inválido', 'Digite um email válido');
                    return false;
                }
                if (formData.whatsapp.replace(/\D/g, '').length < 11) {
                    await alertaErro('Telefone Inválido', 'Digite um WhatsApp válido');
                    return false;
                }
                if (formData.senha.length < 6) {
                    await alertaErro('Senha Fraca', 'A senha deve ter no mínimo 6 caracteres');
                    return false;
                }
                if (formData.senha !== formData.confirmarSenha) {
                    await alertaErro('Senha Diferente', 'As senhas não coincidem');
                    return false;
                }
                break;

            case 3:
                if (!formData.bairro.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o bairro');
                    return false;
                }
                if (!formData.rua.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha a rua');
                    return false;
                }
                if (!formData.numero.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o número');
                    return false;
                }
                break;

            case 4:
                // Validar campos condicionais para adotantes
                if (formData.objetivos.includes('adotar')) {
                    if (!formData.tipoResidencia) {
                        await alertaErro('Campo Obrigatório', 'Selecione o tipo de residência');
                        return false;
                    }
                    if (!formData.telasProtecao) {
                        await alertaErro('Campo Obrigatório', 'Informe sobre as telas de proteção');
                        return false;
                    }
                    if (!formData.outrosAnimais) {
                        await alertaErro('Campo Obrigatório', 'Informe se possui outros animais');
                        return false;
                    }
                    if (!formData.moradoresConcordam) {
                        await alertaErro('Campo Obrigatório', 'Informe se os moradores concordam');
                        return false;
                    }
                }
                if (!formData.termos) {
                    await alertaErro('Termos Obrigatórios', 'Aceite os termos de uso para continuar');
                    return false;
                }
                break;
        }
        return true;
    };

    // Próxima etapa
    const handleNext = async () => {
        const isValid = await validarEtapa(currentStep);
        if (isValid && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Etapa anterior
    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Submit final
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validarEtapa(currentStep);
        if (!isValid) return;

        try {
            // Prepara dados para salvar
            const userData = {
                id: Date.now().toString(),
                ...formData,
                dataCadastro: new Date().toISOString(),
                status: 'ativo'
            };

            // Remove confirmarSenha antes de salvar
            delete userData.confirmarSenha;

            // Salva no localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(userData);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Salva sessão do usuário
            sessionStorage.setItem('usuarioLogado', JSON.stringify({
                id: userData.id,
                nome: userData.nome,
                email: userData.email
            }));

            await alertaSucesso('Sucesso!', 'Cadastro realizado com sucesso! 🎉');

            setTimeout(() => {
                navigate('/perfil-usuario');
            }, 2000);

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            await alertaErro('Erro', 'Erro ao realizar cadastro. Tente novamente.');
        }
    };

    // Calcula progresso
    const calculateProgress = () => {
        return ((currentStep - 1) / (totalSteps - 1)) * 100;
    };

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

                {/* Container Principal */}
                <div className="container">
                    {/* Indicador de Progresso */}
                    <div className="progress-indicator">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${calculateProgress()}%` }}
                        ></div>
                        <div className="step-container">
                            {[1, 2, 3, 4].map((step) => (
                                <div 
                                    key={step}
                                    className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                                    data-step={step}
                                >
                                    <div className="step-circle">{step}</div>
                                    <div className="step-label">
                                        {step === 1 && 'Objetivo'}
                                        {step === 2 && 'Dados'}
                                        {step === 3 && 'Endereço'}
                                        {step === 4 && 'Finalizar'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <div className="logo-circle">
                            <img src={PerfilImg} alt="perfil" />
                        </div>
                        <h1 className="welcome-title">Cadastro Usuário</h1>
                        <p className="welcome-subtitle">Junte-se a nós para ajudar os animais</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit}>
                        {/* ETAPA 1: Objetivo */}
                        {currentStep === 1 && (
                            <div className="form-step active">
                                <h2 className="section-title">Qual é o seu objetivo?</h2>
                                
                                <div className="info-box">
                                    <span className="info-icon">ℹ️</span>
                                    <p>Selecione uma ou mais opções de acordo com o que você deseja fazer no APANIM.</p>
                                </div>

                                <div className="checkbox-group">
                                    <label className={`checkbox-card ${formData.objetivos.includes('adotar') ? 'checked' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.objetivos.includes('adotar')}
                                            onChange={() => handleObjetivosChange('adotar')}
                                        />
                                        <div className="checkbox-content">
                                            <span className="checkbox-icon">🏠</span>
                                            <div className="checkbox-text">
                                                <strong>Adotar um animal</strong>
                                                <small>Quero dar um lar para um animal que precisa</small>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`checkbox-card ${formData.objetivos.includes('doar') ? 'checked' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.objetivos.includes('doar')}
                                            onChange={() => handleObjetivosChange('doar')}
                                        />
                                        <div className="checkbox-content">
                                            <span className="checkbox-icon">❤️</span>
                                            <div className="checkbox-text">
                                                <strong>Doar um animal</strong>
                                                <small>Tenho um animal que precisa de um novo lar</small>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`checkbox-card ${formData.objetivos.includes('comprar') ? 'checked' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.objetivos.includes('comprar')}
                                            onChange={() => handleObjetivosChange('comprar')}
                                        />
                                        <div className="checkbox-content">
                                            <span className="checkbox-icon">🛒</span>
                                            <div className="checkbox-text">
                                                <strong>Comprar um animal</strong>
                                                <small>Busco adquirir um animal de criador</small>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 2: Dados Pessoais */}
                        {currentStep === 2 && (
                            <div className="form-step active">
                                <h2 className="section-title">Dados Pessoais</h2>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="nome">Nome Completo <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="nome" 
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cpf">CPF <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="cpf" 
                                            name="cpf"
                                            value={formData.cpf}
                                            onChange={(e) => handleMaskedInput(e, maskCPF)}
                                            placeholder="000.000.000-00"
                                            maxLength="14"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dataNascimento">Data de Nascimento <span className="required">*</span></label>
                                        <input 
                                            type="date" 
                                            id="dataNascimento" 
                                            name="dataNascimento"
                                            value={formData.dataNascimento}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail <span className="required">*</span></label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="seu@email.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="whatsapp">WhatsApp <span className="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            id="whatsapp" 
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={(e) => handleMaskedInput(e, maskPhone)}
                                            placeholder="(00) 00000-0000"
                                            maxLength="15"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="senha">Senha <span className="required">*</span></label>
                                        <div className="password-wrapper">
                                            <input 
                                                type={showPassword ? 'text' : 'password'}
                                                id="senha" 
                                                name="senha"
                                                value={formData.senha}
                                                onChange={handleInputChange}
                                                placeholder="Mínimo 6 caracteres"
                                            />
                                            <button 
                                                type="button" 
                                                className="toggle-password"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <span className="eye-icon">{showPassword ? '🔓' : '🔒'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmarSenha">Confirmar Senha <span className="required">*</span></label>
                                        <div className="password-wrapper">
                                            <input 
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmarSenha" 
                                                name="confirmarSenha"
                                                value={formData.confirmarSenha}
                                                onChange={handleInputChange}
                                                placeholder="Digite a senha novamente"
                                            />
                                            <button 
                                                type="button" 
                                                className="toggle-password"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <span className="eye-icon">{showConfirmPassword ? '🔓' : '🔒'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 3: Endereço (SIMPLIFICADO) */}
                        {currentStep === 3 && (
                            <div className="form-step active">
                                <h2 className="section-title">Endereço</h2>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="bairro">Bairro <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="bairro" 
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleInputChange}
                                            placeholder="Digite o bairro"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 2 }}>
                                        <label htmlFor="rua">Rua <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="rua" 
                                            name="rua"
                                            value={formData.rua}
                                            onChange={handleInputChange}
                                            placeholder="Nome da rua"
                                        />
                                    </div>

                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="numero">Número <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="numero" 
                                            name="numero"
                                            value={formData.numero}
                                            onChange={handleInputChange}
                                            placeholder="Nº"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="complemento">Complemento</label>
                                        <input 
                                            type="text" 
                                            id="complemento" 
                                            name="complemento"
                                            value={formData.complemento}
                                            onChange={handleInputChange}
                                            placeholder="Apartamento, bloco, etc... (opcional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 4: Informações Adicionais */}
                        {currentStep === 4 && (
                            <div className="form-step active">
                                <h2 className="section-title">Informações Adicionais</h2>

                                {/* Campos condicionais para adotantes */}
                                {formData.objetivos.includes('adotar') && (
                                    <div className="campos-adotante">
                                        <div className="info-box warning">
                                            <span className="info-icon">⚠️</span>
                                            <p>Estas informações nos ajudam a garantir que o animal terá um lar adequado.</p>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group full">
                                                <label>Tipo de Residência <span className="required">*</span></label>
                                                <div className="radio-group">
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="tipoResidencia" 
                                                            value="casa"
                                                            checked={formData.tipoResidencia === 'casa'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>🏠 Casa</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="tipoResidencia" 
                                                            value="apartamento"
                                                            checked={formData.tipoResidencia === 'apartamento'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>🏢 Apartamento</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="tipoResidencia" 
                                                            value="sitio"
                                                            checked={formData.tipoResidencia === 'sitio'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>🌳 Sítio/Chácara</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Possui telas de proteção? <span className="required">*</span></label>
                                                <div className="radio-group">
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="telasProtecao" 
                                                            value="sim"
                                                            checked={formData.telasProtecao === 'sim'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Sim</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="telasProtecao" 
                                                            value="nao"
                                                            checked={formData.telasProtecao === 'nao'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Não</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="telasProtecao" 
                                                            value="na"
                                                            checked={formData.telasProtecao === 'na'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>N/A</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label>Possui outros animais? <span className="required">*</span></label>
                                                <div className="radio-group">
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="outrosAnimais" 
                                                            value="sim"
                                                            checked={formData.outrosAnimais === 'sim'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Sim</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="outrosAnimais" 
                                                            value="nao"
                                                            checked={formData.outrosAnimais === 'nao'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Não</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group full">
                                                <label>Todos os moradores concordam? <span className="required">*</span></label>
                                                <div className="radio-group">
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="moradoresConcordam" 
                                                            value="sim"
                                                            checked={formData.moradoresConcordam === 'sim'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Sim, todos concordam</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="moradoresConcordam" 
                                                            value="nao"
                                                            checked={formData.moradoresConcordam === 'nao'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Não</span>
                                                    </label>
                                                    <label className="radio-option">
                                                        <input 
                                                            type="radio" 
                                                            name="moradoresConcordam" 
                                                            value="sozinho"
                                                            checked={formData.moradoresConcordam === 'sozinho'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span>Moro sozinho(a)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group full">
                                                <label htmlFor="motivoAdocao">Por que deseja adotar?</label>
                                                <textarea 
                                                    id="motivoAdocao" 
                                                    name="motivoAdocao"
                                                    value={formData.motivoAdocao}
                                                    onChange={handleInputChange}
                                                    rows="4" 
                                                    placeholder="Conte-nos um pouco sobre sua motivação para adotar..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Termos e Condições */}
                                <div className="form-row" style={{ marginTop: '2rem' }}>
                                    <div className="form-group full">
                                        <label className="checkbox-terms">
                                            <input 
                                                type="checkbox" 
                                                id="termos" 
                                                name="termos"
                                                checked={formData.termos}
                                                onChange={handleInputChange}
                                            />
                                            <div className="terms-content">
                                                <strong>Aceito os termos de uso e políticas de privacidade</strong>
                                                <small>
                                                    Li e concordo com os <a href="#" className="link-terms">Termos de Uso</a> e <a href="#" className="link-terms">Política de Privacidade</a> do APANIM
                                                </small>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botões de Navegação */}
                        <div className="form-navigation">
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    className="btn-secondary"
                                    onClick={handlePrevious}
                                >
                                    ← Voltar
                                </button>
                            )}
                            
                            {currentStep < totalSteps ? (
                                <button 
                                    type="button" 
                                    className="btn-primary"
                                    onClick={handleNext}
                                >
                                    Próximo →
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    className="btn-primary"
                                >
                                    Finalizar Cadastro ✓
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Link para Login */}
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

export default CadastroUsuario;