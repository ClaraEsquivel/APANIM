/* ============= SCRIPT DE CADASTRO - APANIM ============= */

// ============= VARIÁVEIS GLOBAIS =============
let currentStep = 1;
const totalSteps = 4;
let formData = {};
let selectedObjectives = [];

// ============= MÁSCARAS DE ENTRADA =============
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
    const cpfInput = document.getElementById('cpf');
    const whatsappInput = document.getElementById('whatsapp');
    const cepInput = document.getElementById('cep');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = maskCPF(e.target.value);
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
    else if (field.name === 'cpf' && value) {
        const cpf = value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            isValid = false;
            message = 'CPF deve ter 11 dígitos';
        }
    }
    else if (field.name === 'whatsapp' && value) {
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
    else if (field.name === 'dataNascimento' && value) {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            isValid = false;
            message = 'Você deve ter pelo menos 18 anos';
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
    
    // ETAPA 1: Validar objetivos
    if (currentStep === 1) {
        const checkboxes = currentFormStep.querySelectorAll('input[name="objetivo"]:checked');
        if (checkboxes.length === 0) {
            showToast('Selecione pelo menos uma opção', 'warning');
            return false;
        }
        selectedObjectives = Array.from(checkboxes).map(cb => cb.value);
        return true;
    }

    // ETAPA 4: Validar campos específicos de adotantes
    if (currentStep === 4) {
        const camposAdotante = document.getElementById('campos-adotante');
        
        if (selectedObjectives.includes('adotar') && camposAdotante.style.display !== 'none') {
            const radioGroups = ['tipoResidencia', 'telasProtecao', 'outrosAnimais', 'moradoresConcordam'];
            
            for (const groupName of radioGroups) {
                const checked = currentFormStep.querySelector(`input[name="${groupName}"]:checked`);
                if (!checked) {
                    showToast('Preencha todos os campos obrigatórios para adotantes', 'error');
                    return false;
                }
            }
        }
        
        // Validar termos
        const termos = document.getElementById('termos');
        const responsabilidade = document.getElementById('responsabilidade');
        
        if (!termos.checked || !responsabilidade.checked) {
            showToast('Você deve aceitar os termos de uso e responsabilidade', 'error');
            return false;
        }
    }

    // Validar campos obrigatórios da etapa
    const requiredFields = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
    let allValid = true;

    requiredFields.forEach(field => {
        if (field.type !== 'checkbox' && field.type !== 'radio') {
            if (!validateField(field)) {
                allValid = false;
            }
        }
    });

    if (!allValid) {
        showToast('Preencha todos os campos obrigatórios', 'error');
    }

    return allValid;
}

// ============= NAVEGAÇÃO ENTRE ETAPAS =============
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar::before') || document.querySelector('.progress-bar');
    const percentage = (currentStep / totalSteps) * 100;
    
    const style = document.createElement('style');
    style.textContent = `.progress-bar::before { width: ${percentage}% !important; }`;
    document.head.appendChild(style);
}

function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

function showStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

function nextStep() {
    if (!validateCurrentStep()) return;
    
    saveStepData();
    
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
        updateStepIndicators();
        updateNavigationButtons();
        
        // Mostrar campos condicionais na etapa 4
        if (currentStep === 4) {
            updateConditionalFields();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        submitForm();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
        updateStepIndicators();
        updateNavigationButtons();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

// ============= CAMPOS CONDICIONAIS =============
function updateConditionalFields() {
    const camposAdotante = document.getElementById('campos-adotante');
    
    if (selectedObjectives.includes('adotar')) {
        camposAdotante.style.display = 'block';
    } else {
        camposAdotante.style.display = 'none';
    }
}

// ============= SALVAR DADOS DA ETAPA =============
function saveStepData() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentFormStep.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (input.name === 'objetivo') {
                if (!formData.objetivos) formData.objetivos = [];
                if (input.checked && !formData.objetivos.includes(input.value)) {
                    formData.objetivos.push(input.value);
                } else if (!input.checked) {
                    formData.objetivos = formData.objetivos.filter(obj => obj !== input.value);
                }
            } else {
                formData[input.name] = input.checked;
            }
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name] = input.value;
        }
    });

    console.log('Dados salvos:', formData);
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
        const response = await fetch('/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        */

        console.log('Cadastro enviado:', formData);

        // Salvar usuário em memória (NÃO usa localStorage)
        window.currentUser = {
            id: Date.now().toString(),
            nome: formData.nome,
            email: formData.email,
            objetivos: formData.objetivos || selectedObjectives,
            loggedIn: true,
            cadastroCompleto: true,
            cadastroData: new Date().toISOString()
        };

        // Disparar evento de cadastro
        const cadastroEvent = new CustomEvent('userRegistered', {
            detail: window.currentUser
        });
        document.dispatchEvent(cadastroEvent);

        // Esconder formulário e mostrar tela de sucesso
        document.getElementById('cadastro-form').style.display = 'none';
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
        button.addEventListener('click', function() {
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
            window.location.href = '../PerfilUsuario/index.html';
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
    console.log('🐾 APANIM - Formulário de Cadastro carregado');
    
    // Verificar se já está logado
    if (checkExistingSession()) {
        return;
    }
    
    // Aplicar máscaras
    applyMasks();
    
    // Toggle de senha
    initTogglePassword();
    
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
    trackEvent('page_view', { page: 'cadastro' });
    
    console.log('✅ Formulário inicializado com sucesso');
});

// ============= EXPORTS =============
window.CadastroApp = {
    showToast,
    trackEvent,
    formData
};