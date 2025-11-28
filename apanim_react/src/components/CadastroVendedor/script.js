/* ============= SCRIPT DE CADASTRO DE VENDEDOR - APANIM ============= */

// ============= VARIÁVEIS GLOBAIS =============
let currentStep = 1;
const totalSteps = 5;
let formData = {};
let uploadedFiles = {};

// ============= MÁSCARAS DE ENTRADA =============
function maskCNPJ(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

function maskCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

function maskPhone(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function maskCEP(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

// ============= APLICAR MÁSCARAS =============
function applyMasks() {
    const cnpjInput = document.getElementById('cnpj');
    const cpfInput = document.getElementById('cpfResponsavel');
    const telefoneComercialInput = document.getElementById('telefoneComercial');
    const whatsappInput = document.getElementById('whatsappResponsavel');
    const cepInput = document.getElementById('cep');

    if (cnpjInput) {
        cnpjInput.addEventListener('input', (e) => {
            e.target.value = maskCNPJ(e.target.value);
        });
    }

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = maskCPF(e.target.value);
        });
    }

    if (telefoneComercialInput) {
        telefoneComercialInput.addEventListener('input', (e) => {
            e.target.value = maskPhone(e.target.value);
        });
    }

    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            e.target.value = maskPhone(e.target.value);
        });
    }

    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            e.target.value = maskCEP(e.target.value);
        });

        cepInput.addEventListener('blur', async () => {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                await buscarCEP(cep);
            }
        });
    }
}

// ============= BUSCAR CEP (API ViaCEP) =============
async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
            document.getElementById('rua').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || 'BA';

            showToast('Endereço encontrado!', 'success');
            document.getElementById('numero').focus();
        } else {
            showToast('CEP não encontrado', 'warning');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showToast('Erro ao buscar CEP. Digite manualmente.', 'error');
    }
}

// ============= TOAST NOTIFICATIONS =============
function showToast(message, type = 'info', duration = 3000) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';

    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#5A0609',
        warning: '#ff9800'
    };

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
        font-weight: 500;
    `;

    toast.innerHTML = `
        <span style="font-size: 1.5rem;">${icons[type]}</span>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(toastStyle);

// ============= VALIDAÇÃO DE CAMPOS =============
function validateField(field) {
    if (!field) return true;

    const value = field.value ? field.value.trim() : '';
    const errorMsg = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Limpar erro anterior
    if (errorMsg) {
        errorMsg.textContent = '';
        errorMsg.classList.remove('show');
        field.parentElement.classList.remove('error');
    }

    // Validar se campo é obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Este campo é obrigatório';
    }
    // Validação específica por tipo
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Digite um e-mail válido';
        }
    }
    else if (field.name === 'cnpj' && value) {
        const cnpj = value.replace(/\D/g, '');
        if (cnpj.length !== 14) {
            isValid = false;
            message = 'CNPJ deve ter 14 dígitos';
        }
    }
    else if (field.name === 'cpfResponsavel' && value) {
        const cpf = value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            isValid = false;
            message = 'CPF deve ter 11 dígitos';
        }
    }
    else if ((field.name === 'telefoneComercial' || field.name === 'whatsappResponsavel') && value) {
        const phone = value.replace(/\D/g, '');
        if (phone.length < 10) {
            isValid = false;
            message = 'Telefone inválido';
        }
    }
    else if (field.name === 'senha' && value) {
        if (value.length < 6) {
            isValid = false;
            message = 'Senha deve ter no mínimo 6 caracteres';
        }
    }
    else if (field.name === 'confirmarSenha' && value) {
        const senha = document.getElementById('senha').value;
        if (value !== senha) {
            isValid = false;
            message = 'As senhas não coincidem';
        }
    }
    else if (field.name === 'cep' && value) {
        const cep = value.replace(/\D/g, '');
        if (cep.length !== 8) {
            isValid = false;
            message = 'CEP deve ter 8 dígitos';
        }
    }
    else if (field.type === 'file' && field.hasAttribute('required')) {
        if (!field.files || field.files.length === 0) {
            isValid = false;
            message = 'Selecione um arquivo';
        } else {
            const file = field.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                isValid = false;
                message = 'Arquivo muito grande (máximo 5MB)';
            }
        }
    }

    if (!isValid && errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
        field.parentElement.classList.add('error');
    }

    return isValid;
}

// ============= VALIDAR ETAPA ATUAL =============
function validateCurrentStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
    
    let allValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            allValid = false;
        }
    });

    // Validação especial para checkboxes na última etapa
    if (currentStep === 5) {
        const checkboxes = currentFormStep.querySelectorAll('input[type="checkbox"][required]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allValid = false;
                const errorMsg = checkbox.closest('.form-group').querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'Você deve aceitar este termo';
                    errorMsg.classList.add('show');
                }
            }
        });
    }

    if (!allValid) {
        showToast('Preencha todos os campos obrigatórios', 'warning');
    }

    return allValid;
}

// ============= NAVEGAÇÃO ENTRE ETAPAS =============
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }

    saveStepData();

    if (currentStep === totalSteps) {
        submitForm();
        return;
    }

    currentStep++;
    updateForm();
}

function prevStep() {
    if (currentStep === 1) return;
    
    saveStepData();
    currentStep--;
    updateForm();
}

function updateForm() {
    // Atualizar visibilidade das etapas
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');

    // Atualizar indicadores de progresso
    updateProgressBar();
    updateStepIndicators();
    updateNavigationButtons();

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (currentStep / totalSteps) * 100;
    progressBar.style.setProperty('--progress', `${percentage}%`);
    progressBar.querySelector('::before') && (progressBar.querySelector('::before').style.width = `${percentage}%`);
}

function updateStepIndicators() {
    document.querySelectorAll('.step').forEach(step => {
        const stepNumber = parseInt(step.getAttribute('data-step'));
        
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

function updateNavigationButtons() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnNextText = document.getElementById('btn-next-text');

    if (currentStep === 1) {
        btnPrev.style.display = 'none';
    } else {
        btnPrev.style.display = 'flex';
    }

    if (currentStep === totalSteps) {
        btnNextText.textContent = 'Finalizar Cadastro';
    } else {
        btnNextText.textContent = 'Próximo';
    }
}

// ============= SALVAR DADOS DA ETAPA =============
function saveStepData() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentFormStep.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else if (input.type === 'file') {
            if (input.files && input.files.length > 0) {
                uploadedFiles[input.name] = input.files[0];
                formData[input.name] = input.files[0].name;
            }
        } else {
            formData[input.name] = input.value;
        }
    });

    console.log('Dados salvos:', formData);
    console.log('Arquivos:', uploadedFiles);
}

// ============= SUBMETER FORMULÁRIO =============
async function submitForm() {
    const btnNext = document.getElementById('btn-next');
    btnNext.classList.add('loading');
    btnNext.disabled = true;

    saveStepData();

    try {
        // Simular envio para API
        await new Promise(resolve => setTimeout(resolve, 2000));

        // AQUI VOCÊ DEVE FAZER A CHAMADA REAL À SUA API
        /*
        const formDataToSend = new FormData();
        
        // Adicionar dados do formulário
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        
        // Adicionar arquivos
        Object.keys(uploadedFiles).forEach(key => {
            formDataToSend.append(key, uploadedFiles[key]);
        });

        const response = await fetch('/api/cadastro-vendedor', {
            method: 'POST',
            body: formDataToSend
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        */

        console.log('Cadastro enviado:', formData);
        console.log('Arquivos enviados:', uploadedFiles);

        // Criar perfil de vendedor
        const newVendor = {
            id: Date.now().toString(),
            tipo: 'vendedor',
            razaoSocial: formData.razaoSocial,
            nomeFantasia: formData.nomeFantasia,
            cnpj: formData.cnpj,
            inscricaoEstadual: formData.inscricaoEstadual,
            telefoneComercial: formData.telefoneComercial,
            emailComercial: formData.emailComercial,
            responsavel: {
                nome: formData.nomeResponsavel,
                cpf: formData.cpfResponsavel,
                whatsapp: formData.whatsappResponsavel,
                email: formData.emailResponsavel
            },
            endereco: {
                cep: formData.cep,
                rua: formData.rua,
                numero: formData.numero,
                complemento: formData.complemento || '',
                bairro: formData.bairro,
                cidade: formData.cidade,
                estado: formData.estado
            },
            documentos: {
                licenca: formData.licenca,
                alvara: formData.alvara,
                comprovanteEndereco: formData.comprovanteEndereco,
                contratoSocial: formData.contratoSocial || null
            },
            status: 'em_analise',
            cadastroData: new Date().toISOString(),
            loggedIn: true,
            stats: {
                vendas: 0,
                avaliacoes: 0,
                animaisCadastrados: 0
            },
            plano: 'basico'
        };

        // Salvar no sistema
        if (window.AuthSystem) {
            window.AuthSystem.setCurrentUser(newVendor);
        } else {
            window.currentUser = newVendor;
        }

        console.log('✅ Vendedor cadastrado:', newVendor);

        // Disparar evento de cadastro
        const cadastroEvent = new CustomEvent('vendorRegistered', {
            detail: newVendor
        });
        document.dispatchEvent(cadastroEvent);

        // Esconder formulário e mostrar tela de sucesso
        document.getElementById('cadastro-vendedor-form').style.display = 'none';
        document.querySelector('.progress-indicator').style.display = 'none';
        document.querySelector('.welcome-section').style.display = 'none';
        document.querySelector('.signup-link').style.display = 'none';
        document.getElementById('success-screen').style.display = 'block';

        showToast('Cadastro realizado com sucesso! 🎉', 'success', 5000);

    } catch (error) {
        console.error('Erro no cadastro:', error);
        showToast('Erro ao realizar cadastro. Tente novamente.', 'error');

        btnNext.classList.remove('loading');
        btnNext.disabled = false;
    }
}

// ============= TOGGLE PASSWORD =============
function initTogglePassword() {
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('.eye-icon');

            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = '🙈';
            } else {
                input.type = 'password';
                icon.textContent = '👁️';
            }

            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ============= FILE UPLOAD =============
function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.parentElement.querySelector('.file-upload-label');
            const fileName = label.querySelector('.file-name');
            const uploadText = label.querySelector('.upload-text');

            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                fileName.textContent = file.name;
                uploadText.style.display = 'none';
                fileName.style.display = 'block';
                label.classList.add('has-file');
                
                // Validar tamanho do arquivo
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                    showToast('Arquivo muito grande (máximo 5MB)', 'error');
                    this.value = '';
                    fileName.textContent = '';
                    uploadText.style.display = 'block';
                    fileName.style.display = 'none';
                    label.classList.remove('has-file');
                } else {
                    showToast(`Arquivo "${file.name}" selecionado`, 'success');
                }
            } else {
                fileName.textContent = '';
                uploadText.style.display = 'block';
                fileName.style.display = 'none';
                label.classList.remove('has-file');
            }
        });
    });
}

// ============= VALIDAÇÃO EM TEMPO REAL =============
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value || input.hasAttribute('required')) {
                validateField(input);
            }
        });

        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

// ============= VERIFICAR SESSÃO ATIVA =============
function checkExistingSession() {
    if (window.currentUser && window.currentUser.loggedIn) {
        showToast('Você já está logado!', 'info');
        setTimeout(() => {
            if (window.currentUser.tipo === 'vendedor') {
                window.location.href = '../PerfilVendedor/index.html';
            } else {
                window.location.href = '../PerfilUsuario/index.html';
            }
        }, 1500);
        return true;
    }
    return false;
}

// ============= TRACKING =============
function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
    // Adicione Google Analytics ou outro sistema aqui
    // gtag('event', eventName, data);
}

// ============= INICIALIZAÇÃO =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 APANIM - Formulário de Cadastro de Vendedor carregado');

    // Verificar se já está logado
    if (checkExistingSession()) {
        return;
    }

    // Aplicar máscaras
    applyMasks();

    // Toggle de senha
    initTogglePassword();

    // File upload
    initFileUpload();

    // Validação em tempo real
    initRealTimeValidation();

    // Botões de navegação
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    btnNext.addEventListener('click', nextStep);
    btnPrev.addEventListener('click', prevStep);

    // Inicializar estado
    updateProgressBar();
    updateStepIndicators();
    updateNavigationButtons();

    // Tracking
    trackEvent('page_view', { page: 'cadastro_vendedor' });

    console.log('✅ Formulário de vendedor inicializado com sucesso');
});

// ============= EXPORTS =============
window.CadastroVendedorApp = {
    showToast,
    trackEvent,
    formData,
    uploadedFiles
};