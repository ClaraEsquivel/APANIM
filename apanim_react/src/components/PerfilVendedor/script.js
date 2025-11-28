/* ============= SCRIPT DO PERFIL DE VENDEDOR - APANIM ============= */

// ============= VARIÁVEIS GLOBAIS =============
let currentVendor = null;
let originalDescription = '';

// ============= VERIFICAR AUTENTICAÇÃO =============
// function checkAuthentication() {
//     currentVendor = window.currentUser || window.AuthSystem?.getCurrentUser();
    
//     if (!currentVendor || !currentVendor.loggedIn || currentVendor.tipo !== 'vendedor') {
//         showToast('Acesso restrito a vendedores', 'warning');
//         setTimeout(() => {
//             window.location.href = '../CadastroVendedor/index.html';
//         }, 2000);
//         return false;
//     }

    // Garantir estrutura de dados
    if (!currentVendor.stats) {
        currentVendor.stats = {
            vendas: 0,
            avaliacoes: 0,
            animaisCadastrados: 0
        };
    }
    
    if (!currentVendor.plano) {
        currentVendor.plano = 'basico';
    }

    console.log('✅ Vendedor autenticado:', currentVendor);
    return true;


// ============= CARREGAR DADOS DO VENDEDOR =============
function loadVendorData() {
    if (!currentVendor) return;

    // Nome fantasia e razão social
    document.getElementById('profile-name').textContent = currentVendor.nomeFantasia || 'Minha Loja';
    document.getElementById('profile-razao-social').textContent = currentVendor.razaoSocial || '-';
    document.getElementById('profile-cnpj').textContent = `CNPJ: ${currentVendor.cnpj || '-'}`;
    
    // Avatar/Logo
    const avatarImg = currentVendor.logo || '../../assets/images/perfil.svg';
    document.getElementById('profile-avatar').src = avatarImg;
    
    // Badge de status
    const verificationBadge = document.getElementById('verification-badge');
    if (currentVendor.status === 'aprovado' || currentVendor.status === 'verificado') {
        verificationBadge.style.display = 'flex';
    } else if (currentVendor.status === 'em_analise') {
        verificationBadge.innerHTML = '<span class="badge-icon">⏳</span><span class="badge-text">Em Análise</span>';
        verificationBadge.classList.add('pending');
    }
    
    // Estatísticas
    if (currentVendor.stats) {
        document.getElementById('stat-vendas-mes').textContent = currentVendor.stats.vendasMes || 0;
        document.getElementById('stat-faturamento').textContent = 
            formatCurrency(currentVendor.stats.faturamento || 0);
        document.getElementById('stat-animais-ativos').textContent = 
            currentVendor.stats.animaisCadastrados || 0;
        document.getElementById('stat-visualizacoes').textContent = 
            currentVendor.stats.visualizacoes || 0;
        document.getElementById('total-sales').textContent = 
            currentVendor.stats.vendas || 0;
    }
    
    // Rating
    const rating = currentVendor.rating || 0;
    document.getElementById('rating-value').textContent = rating.toFixed(1);
    
    // Informações da empresa
    document.getElementById('company-razao').textContent = currentVendor.razaoSocial || '-';
    document.getElementById('company-fantasia').textContent = currentVendor.nomeFantasia || '-';
    document.getElementById('company-cnpj').textContent = currentVendor.cnpj || '-';
    document.getElementById('company-ie').textContent = currentVendor.inscricaoEstadual || '-';
    document.getElementById('company-phone').textContent = currentVendor.telefoneComercial || '-';
    document.getElementById('company-email').textContent = currentVendor.emailComercial || '-';
    
    // Endereço
    if (currentVendor.endereco) {
        document.getElementById('address-cep').textContent = currentVendor.endereco.cep || '-';
        document.getElementById('address-full').textContent = 
            `${currentVendor.endereco.rua || ''}, ${currentVendor.endereco.numero || ''} ${currentVendor.endereco.complemento ? '- ' + currentVendor.endereco.complemento : ''}`.trim();
        document.getElementById('address-city').textContent = 
            `${currentVendor.endereco.cidade || ''}, ${currentVendor.endereco.estado || ''}`;
    }
    
    // Descrição da loja
    if (currentVendor.descricao) {
        document.getElementById('loja-descricao').value = currentVendor.descricao;
        updateDescCharCount();
    }
}

// ============= FORMATAÇÃO =============
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
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

// ============= SISTEMA DE ABAS =============
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adicionar active ao clicado
            button.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${targetTab}"]`).classList.add('active');

            // Salvar aba atual
            localStorage.setItem('vendorCurrentTab', targetTab);
        });
    });

    // Restaurar última aba
    const lastTab = localStorage.getItem('vendorCurrentTab');
    if (lastTab) {
        const targetButton = document.querySelector(`.tab-btn[data-tab="${lastTab}"]`);
        if (targetButton) targetButton.click();
    }
}

// ============= CONTADOR DE CARACTERES =============
function updateDescCharCount() {
    const textarea = document.getElementById('loja-descricao');
    const charCurrent = document.getElementById('desc-char-current');
    
    if (textarea && charCurrent) {
        charCurrent.textContent = textarea.value.length;
    }
}

// ============= EDITAR DESCRIÇÃO =============
function editDescription() {
    const textarea = document.getElementById('loja-descricao');
    
    if (textarea.disabled) {
        // Modo de edição
        originalDescription = textarea.value;
        textarea.disabled = false;
        textarea.focus();
        
        // Criar botões de salvar/cancelar
        const cardBody = textarea.closest('.card-body');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'edit-buttons';
        buttonsDiv.innerHTML = `
            <button class="btn btn-primary" onclick="saveDescription()">
                <span>💾</span>
                <span>Salvar</span>
            </button>
            <button class="btn btn-secondary" onclick="cancelEditDescription()">
                <span>✕</span>
                <span>Cancelar</span>
            </button>
        `;
        cardBody.appendChild(buttonsDiv);
    }
}

function saveDescription() {
    const textarea = document.getElementById('loja-descricao');
    
    if (!currentVendor) return;
    
    currentVendor.descricao = textarea.value;
    
    // Salvar no sistema
    if (window.AuthSystem) {
        window.AuthSystem.setCurrentUser(currentVendor);
    }
    
    textarea.disabled = true;
    
    // Remover botões
    const buttonsDiv = document.querySelector('.edit-buttons');
    if (buttonsDiv) buttonsDiv.remove();
    
    showToast('Descrição atualizada com sucesso!', 'success');
}

function cancelEditDescription() {
    const textarea = document.getElementById('loja-descricao');
    textarea.value = originalDescription;
    textarea.disabled = true;
    
    // Remover botões
    const buttonsDiv = document.querySelector('.edit-buttons');
    if (buttonsDiv) buttonsDiv.remove();
}

// ============= FUNÇÕES DE AÇÕES =============
function editProfile() {
    showToast('Função de edição em desenvolvimento', 'info');
    // Implementar modal de edição
}

function addAnimal() {
    showToast('Redirecionando para cadastro de animal...', 'info');
    setTimeout(() => {
        window.location.href = '../CadastroAnimalVenda/index.html';
    }, 1000);
}

function editCompanyInfo() {
    showToast('Entre em contato com o suporte para alterar dados cadastrais', 'info');
}

function changePassword() {
    showToast('Função de alteração de senha em desenvolvimento', 'info');
    // Implementar modal de mudança de senha
}

function updateDocuments() {
    showToast('Entre em contato com o suporte para atualizar documentos', 'info');
}

function downloadData() {
    showToast('Gerando arquivo de dados...', 'info');
    // Implementar download de dados
}

function closeStore() {
    if (confirm('Tem certeza que deseja encerrar sua loja? Esta ação é irreversível.')) {
        showToast('Entre em contato com o suporte para encerrar sua loja', 'warning');
    }
}

function upgradePlan() {
    showToast('Redirecionando para planos...', 'info');
    // Implementar sistema de planos
}

function logout() {
    if (confirm('Deseja realmente sair?')) {
        if (window.AuthSystem) {
            window.AuthSystem.logout();
        }
        window.currentUser = null;
        showToast('Logout realizado com sucesso', 'success');
        setTimeout(() => {
            window.location.href = '../CadastroInicial/index.html';
        }, 1000);
    }
}

// ============= UPLOAD DE FOTOS =============
function initPhotoUpload() {
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    const editCoverBtn = document.querySelector('.edit-cover-btn');

    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => handleAvatarUpload(e.target.files[0]);
            input.click();
        });
    }

    if (editCoverBtn) {
        editCoverBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => handleCoverUpload(e.target.files[0]);
            input.click();
        });
    }
}

function handleAvatarUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('profile-avatar').src = e.target.result;
        if (currentVendor) {
            currentVendor.logo = e.target.result;
            if (window.AuthSystem) {
                window.AuthSystem.setCurrentUser(currentVendor);
            }
        }
        showToast('Logo atualizado com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
}

function handleCoverUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const coverDiv = document.querySelector('.profile-cover');
        coverDiv.style.backgroundImage = `url(${e.target.result})`;
        coverDiv.style.backgroundSize = 'cover';
        coverDiv.style.backgroundPosition = 'center';
        if (currentVendor) {
            currentVendor.coverImage = e.target.result;
            if (window.AuthSystem) {
                window.AuthSystem.setCurrentUser(currentVendor);
            }
        }
        showToast('Capa atualizada com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
}

// ============= CONFIGURAÇÕES =============
function initSettings() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', (e) => {
            const settingName = e.target.id;
            const value = e.target.checked;
            
            // Salvar configuração
            if (!currentVendor.settings) {
                currentVendor.settings = {};
            }
            currentVendor.settings[settingName] = value;
            
            if (window.AuthSystem) {
                window.AuthSystem.setCurrentUser(currentVendor);
            }
            
            showToast('Configuração atualizada', 'success', 2000);
        });
    });
}

// ============= CARREGAR ANIMAIS =============
function loadAnimals() {
    // Simulação de carregamento de animais
    // Em produção, fazer chamada à API
    const animalsGrid = document.getElementById('animals-grid');
    
    // Aqui você faria a chamada à API
    // const animals = await fetchVendorAnimals();
    
    // Se não houver animais, mostrar empty state
    // if (animals.length === 0) {
    //     animalsGrid.querySelector('.empty-state').style.display = 'flex';
    // }
}

// ============= CARREGAR VENDAS =============
function loadSales() {
    // Simulação de carregamento de vendas
    // Em produção, fazer chamada à API
}

// ============= CARREGAR ATIVIDADES =============
function loadActivities() {
    // Simulação de carregamento de atividades recentes
    // Em produção, fazer chamada à API
}

// ============= INICIALIZAÇÃO =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 APANIM - Perfil de Vendedor carregado');

    // Verificar autenticação
    if (!checkAuthentication()) {
        return;
    }

    // Carregar dados do vendedor
    loadVendorData();

    // Inicializar sistema de abas
    initTabs();

    // Inicializar upload de fotos
    initPhotoUpload();

    // Inicializar configurações
    initSettings();

    // Contador de caracteres
    const descTextarea = document.getElementById('loja-descricao');
    if (descTextarea) {
        descTextarea.addEventListener('input', updateDescCharCount);
    }

    // Carregar dados dinâmicos
    loadAnimals();
    loadSales();
    loadActivities();

    console.log('✅ Perfil de vendedor inicializado com sucesso');
});

// ============= EXPORTS =============
window.VendorProfile = {
    showToast,
    loadVendorData,
    editProfile,
    addAnimal,
    logout
};