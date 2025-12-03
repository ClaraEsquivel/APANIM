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

const CadastroVendedor = () => {
    const navigate = useNavigate();
    const { Modal, alertaSucesso, alertaErro } = useModal();

    // Estados
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        // Etapa 1: Empresa
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        inscricaoEstadual: '',
        telefoneComercial: '',
        emailComercial: '',
        
        // Etapa 2: Responsável
        nomeResponsavel: '',
        cpfResponsavel: '',
        whatsappResponsavel: '',
        emailResponsavel: '',
        senha: '',
        confirmarSenha: '',
        
        // Etapa 3: Endereço
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        
        // Etapa 4: Documentos
        licenca: null,
        alvara: null,
        contratoSocial: null,
        
        // Etapa 5: Finalizar
        termos: false
    });

    const [fileNames, setFileNames] = useState({
        licenca: '',
        alvara: '',
        contratoSocial: ''
    });

    const totalSteps = 5;

    // Máscara de CNPJ
    const maskCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

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

    // Validar Telefone
    const validarTelefone = (telefone) => {
        const numeros = telefone.replace(/\D/g, '');
        return numeros.length === 10 || numeros.length === 11;
    };

    // Validar Inscrição Estadual
    const validarInscricaoEstadual = (inscricao) => {
        const numeros = inscricao.replace(/\D/g, '');
        return numeros.length >= 8 && numeros.length <= 14;
    };

    // Handler genérico para inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handler para inputs com máscara
    const handleMaskedInput = (e, maskFunction) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: maskFunction(value)
        }));
    };

    // Handler para upload de arquivos
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Validar tamanho (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alertaErro('Arquivo muito grande', 'O arquivo deve ter no máximo 5MB');
                e.target.value = '';
                return;
            }

            // Validar tipo
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                alertaErro('Tipo inválido', 'Apenas PDF, JPG e PNG são permitidos');
                e.target.value = '';
                return;
            }

            setFormData(prev => ({ ...prev, [name]: file }));
            setFileNames(prev => ({ ...prev, [name]: file.name }));
        }
    };

    // Validar etapa atual
    const validarEtapa = async (step) => {
        switch (step) {
            case 1:
                if (!formData.razaoSocial.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha a razão social');
                    return false;
                }
                if (!formData.nomeFantasia.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o nome fantasia');
                    return false;
                }
                if (!formData.cnpj.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o CNPJ');
                    return false;
                }
                if (!validarInscricaoEstadual(formData.inscricaoEstadual)) {
                    await alertaErro('Inscrição Estadual Inválida', 'Digite uma inscrição estadual válida (8 a 14 dígitos)');
                    return false;
                }
                if (!validarTelefone(formData.telefoneComercial)) {
                    await alertaErro('Telefone Inválido', 'Digite um telefone válido com DDD');
                    return false;
                }
                if (!formData.emailComercial.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o email comercial');
                    return false;
                }
                break;

            case 2:
                if (!formData.nomeResponsavel.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o nome do responsável');
                    return false;
                }
                if (!formData.cpfResponsavel.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o CPF do responsável');
                    return false;
                }
                if (!validarTelefone(formData.whatsappResponsavel)) {
                    await alertaErro('Telefone Inválido', 'Digite um WhatsApp válido com DDD');
                    return false;
                }
                if (!formData.emailResponsavel.trim()) {
                    await alertaErro('Campo Obrigatório', 'Preencha o email do responsável');
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
                if (!formData.licenca) {
                    await alertaErro('Documento Obrigatório', 'Anexe a licença/registro');
                    return false;
                }
                if (!formData.alvara) {
                    await alertaErro('Documento Obrigatório', 'Anexe o alvará de funcionamento');
                    return false;
                }
                if (!formData.contratoSocial) {
                    await alertaErro('Documento Obrigatório', 'Anexe o contrato social');
                    return false;
                }
                break;

            case 5:
                if (!formData.termos) {
                    await alertaErro('Termos Obrigatórios', 'Aceite os termos para continuar');
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
            const vendedorData = {
                id: Date.now().toString(),
                ...formData,
                dataCadastro: new Date().toISOString(),
                status: 'pendente', // Aguardando aprovação
                documentosNomes: fileNames
            };

            // Remove confirmarSenha e arquivos (salvaria em servidor real)
            delete vendedorData.confirmarSenha;
            delete vendedorData.licenca;
            delete vendedorData.alvara;
            delete vendedorData.contratoSocial;

            // Salva no localStorage
            const vendedores = JSON.parse(localStorage.getItem('vendedores') || '[]');
            vendedores.push(vendedorData);
            localStorage.setItem('vendedores', JSON.stringify(vendedores));

            // Salva sessão
            sessionStorage.setItem('vendedorLogado', JSON.stringify({
                id: vendedorData.id,
                nomeFantasia: vendedorData.nomeFantasia,
                email: vendedorData.emailComercial,
                status: 'pendente'
            }));

            await alertaSucesso('Sucesso!', 'Cadastro realizado! Aguarde aprovação. 🎉');

            setTimeout(() => {
                navigate('/perfil-vendedor');
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
                            {[1, 2, 3, 4, 5].map((step) => (
                                <div 
                                    key={step}
                                    className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                                    data-step={step}
                                >
                                    <div className="step-circle">{step}</div>
                                    <div className="step-label">
                                        {step === 1 && 'Empresa'}
                                        {step === 2 && 'Responsável'}
                                        {step === 3 && 'Endereço'}
                                        {step === 4 && 'Documentos'}
                                        {step === 5 && 'Finalizar'}
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
                        <h1 className="welcome-title">Cadastro de Vendedor</h1>
                        <p className="welcome-subtitle">Junte-se aos vendedores registrados do APANIM</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit}>
                        {/* ETAPA 1: Informações da Empresa */}
                        {currentStep === 1 && (
                            <div className="form-step active">
                                <h2 className="section-title">Informações da Empresa</h2>
                                
                                <div className="info-box">
                                    <span className="info-icon">ℹ️</span>
                                    <p>Preencha os dados completos da sua empresa. Todas as informações serão verificadas.</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="razaoSocial">Razão Social <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="razaoSocial" 
                                            name="razaoSocial"
                                            value={formData.razaoSocial}
                                            onChange={handleInputChange}
                                            placeholder="Digite a razão social da empresa"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="nomeFantasia">Nome Fantasia <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="nomeFantasia" 
                                            name="nomeFantasia"
                                            value={formData.nomeFantasia}
                                            onChange={handleInputChange}
                                            placeholder="Digite o nome fantasia"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cnpj">CNPJ <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="cnpj" 
                                            name="cnpj"
                                            value={formData.cnpj}
                                            onChange={(e) => handleMaskedInput(e, maskCNPJ)}
                                            placeholder="00.000.000/0000-00"
                                            maxLength="18"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inscricaoEstadual">Inscrição Estadual <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="inscricaoEstadual" 
                                            name="inscricaoEstadual"
                                            value={formData.inscricaoEstadual}
                                            onChange={handleInputChange}
                                            placeholder="000.000.000.000"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="telefoneComercial">Telefone Comercial <span className="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            id="telefoneComercial" 
                                            name="telefoneComercial"
                                            value={formData.telefoneComercial}
                                            onChange={(e) => handleMaskedInput(e, maskPhone)}
                                            placeholder="(00) 0000-0000"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="emailComercial">E-mail Comercial <span className="required">*</span></label>
                                        <input 
                                            type="email" 
                                            id="emailComercial" 
                                            name="emailComercial"
                                            value={formData.emailComercial}
                                            onChange={handleInputChange}
                                            placeholder="contato@empresa.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 2: Responsável Legal */}
                        {currentStep === 2 && (
                            <div className="form-step active">
                                <h2 className="section-title">Responsável Legal</h2>

                                <div className="info-box">
                                    <span className="info-icon">👤</span>
                                    <p>Dados do responsável legal pela empresa perante o APANIM.</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="nomeResponsavel">Nome Completo <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="nomeResponsavel" 
                                            name="nomeResponsavel"
                                            value={formData.nomeResponsavel}
                                            onChange={handleInputChange}
                                            placeholder="Digite o nome completo do responsável"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cpfResponsavel">CPF <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="cpfResponsavel" 
                                            name="cpfResponsavel"
                                            value={formData.cpfResponsavel}
                                            onChange={(e) => handleMaskedInput(e, maskCPF)}
                                            placeholder="000.000.000-00"
                                            maxLength="14"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="whatsappResponsavel">Telefone / WhatsApp <span className="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            id="whatsappResponsavel" 
                                            name="whatsappResponsavel"
                                            value={formData.whatsappResponsavel}
                                            onChange={(e) => handleMaskedInput(e, maskPhone)}
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="emailResponsavel">E-mail do Responsável <span className="required">*</span></label>
                                        <input 
                                            type="email" 
                                            id="emailResponsavel" 
                                            name="emailResponsavel"
                                            value={formData.emailResponsavel}
                                            onChange={handleInputChange}
                                            placeholder="responsavel@email.com"
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
                                <h2 className="section-title">Endereço Comercial</h2>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="bairro">Bairro <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="bairro" 
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleInputChange}
                                            placeholder="Nome do bairro"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 2 }}>
                                        <label htmlFor="rua">Rua / Avenida <span className="required">*</span></label>
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
                                            placeholder="Número"
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
                                            placeholder="Sala, andar, etc... (opcional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 4: Documentação */}
                        {currentStep === 4 && (
                            <div className="form-step active">
                                <h2 className="section-title">Documentação Obrigatória</h2>

                                <div className="info-box warning">
                                    <span className="info-icon">⚠️</span>
                                    <p>Todos os documentos são obrigatórios. Formatos aceitos: PDF, JPG, PNG. Tamanho máximo: 5MB por arquivo.</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="licenca">Licença ou Registro do Órgão Competente <span className="required">*</span></label>
                                        <div className="file-upload-wrapper">
                                            <input 
                                                type="file" 
                                                id="licenca" 
                                                name="licenca"
                                                onChange={handleFileChange}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="licenca" className="file-upload-label">
                                                <span className="upload-icon">📄</span>
                                                <span className="upload-text">
                                                    {fileNames.licenca || 'Clique para selecionar o arquivo'}
                                                </span>
                                            </label>
                                        </div>
                                        <small className="file-help">Ex.: Registro CRMV, IBAMA, MAPA</small>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="alvara">Alvará de Funcionamento <span className="required">*</span></label>
                                        <div className="file-upload-wrapper">
                                            <input 
                                                type="file" 
                                                id="alvara" 
                                                name="alvara"
                                                onChange={handleFileChange}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="alvara" className="file-upload-label">
                                                <span className="upload-icon">📄</span>
                                                <span className="upload-text">
                                                    {fileNames.alvara || 'Clique para selecionar o arquivo'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full">
                                        <label htmlFor="contratoSocial">Contrato Social <span className="required">*</span></label>
                                        <div className="file-upload-wrapper">
                                            <input 
                                                type="file" 
                                                id="contratoSocial" 
                                                name="contratoSocial"
                                                onChange={handleFileChange}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="contratoSocial" className="file-upload-label">
                                                <span className="upload-icon">📄</span>
                                                <span className="upload-text">
                                                    {fileNames.contratoSocial || 'Clique para selecionar o arquivo'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ETAPA 5: Finalizar */}
                        {currentStep === 5 && (
                            <div className="form-step active">
                                <h2 className="section-title">Revisão e Finalização</h2>

                                <div className="info-box">
                                    <span className="info-icon">✓</span>
                                    <p>Revise todas as informações antes de finalizar. Após o envio, seu cadastro será analisado pela equipe do APANIM.</p>
                                </div>

                                <div className="review-section">
                                    <h3>📋 Resumo do Cadastro</h3>
                                    <div className="review-item">
                                        <strong>Empresa:</strong> {formData.nomeFantasia}
                                    </div>
                                    <div className="review-item">
                                        <strong>CNPJ:</strong> {formData.cnpj}
                                    </div>
                                    <div className="review-item">
                                        <strong>Responsável:</strong> {formData.nomeResponsavel}
                                    </div>
                                    <div className="review-item">
                                        <strong>Email:</strong> {formData.emailComercial}
                                    </div>
                                    <div className="review-item">
                                        <strong>Endereço:</strong> {formData.rua}, {formData.numero} - {formData.bairro}
                                    </div>
                                    <div className="review-item">
                                        <strong>Documentos:</strong> {fileNames.licenca ? '✓' : '✗'} Licença | {fileNames.alvara ? '✓' : '✗'} Alvará | {fileNames.contratoSocial ? '✓' : '✗'} Contrato
                                    </div>
                                </div>

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
                                                <strong>Aceito os termos de uso e políticas</strong>
                                                <small>
                                                    Li e concordo com os <a href="#" className="link-terms">Termos de Uso</a>, <a href="#" className="link-terms">Política de Privacidade</a> e <a href="#" className="link-terms">Regulamento de Vendedores</a> do APANIM
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
                                    Enviar Cadastro ✓
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

export default CadastroVendedor;