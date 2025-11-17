/* ============= SCRIPT DO PERFIL DO USUÁRIO - APANIM (CORRIGIDO) ============= */

// ============= VARIÁVEIS GLOBAIS =============
let currentUser = null;
let originalBio = '';

// ============= VERIFICAR AUTENTICAÇÃO =============
function checkAuthentication() {
    // Verificar se há usuário logado
    currentUser = window.currentUser || window.AuthSystem?.getCurrentUser();
    
    // 🔴 REMOVER DADOS DE EXEMPLO - usar apenas dados reais
    if (!currentUser || !currentUser.loggedIn) {
        showToast('Você precisa fazer login', 'warning');
        setTimeout(() => {
            window.location.href = '../CadastroInicial/index.html';
        }, 2000);
        return false;
    }

    // ✅ Garantir que currentUser tenha todos os campos necessários
    if (!currentUser.stats) {
        currentUser.stats = {
            adocoes: 0,
            doacoes: 0,
            favoritos: 0
        };
    }
    
    if (!currentUser.plano) {
        currentUser.plano = 'gratuito';
    }

    console.log('✅ Usuário autenticado:', currentUser);
    return true;
}

// ============= CARREGAR DADOS DO USUÁRIO =============
function loadUserData() {
    if (!currentUser) return;

    // Nome e email
    document.getElementById('profile-name').textContent = currentUser.nome || 'Usuário';
    document.getElementById('profile-email').textContent = currentUser.email || '';
    document.getElementById('info-email').textContent = currentUser.email || '';
    
    // Avatar
    const avatarImg = currentUser.picture || '../../assets/images/perfil.svg';
    document.getElementById('profile-avatar').src = avatarImg;
    
    // WhatsApp
    if (currentUser.whatsapp) {
        document.getElementById('info-whatsapp').textContent = currentUser.whatsapp;
    }
    
    // Localização
    if (currentUser.cidade && currentUser.estado) {
        document.getElementById('info-location').textContent = 
            `${currentUser.cidade}, ${currentUser.estado}`;
    }
    
    // Data de cadastro
    if (currentUser.cadastroData) {
        const date = new Date(currentUser.cadastroData);
        const options = { year: 'numeric', month: 'long' };
        document.getElementById('info-member-since').textContent = 
            date.toLocaleDateString('pt-BR', options);
    }
    
    // Biografia
    if (currentUser.bio) {
        document.getElementById('bio-text').value = currentUser.bio;
        updateCharCount();
    }
    
    // Badges
    if (currentUser.objetivos && currentUser.objetivos.length > 0) {
        currentUser.objetivos.forEach(objetivo => {
            const badge = document.getElementById(`badge-${objetivo}`);
            if (badge) badge.style.display = 'inline-flex';
        });
    }
    
    // Estatísticas
    if (currentUser.stats) {
        document.getElementById('stat-adocoes').textContent = currentUser.stats.adocoes || 0;
        document.getElementById('stat-doacoes').textContent = currentUser.stats.doacoes || 0;
        document.getElementById('stat-favoritos').textContent = currentUser.stats.favoritos || 0;
    }
    
    // Plano atual
    updateCurrentPlan(currentUser.plano || 'gratuito');
}

// ============= UPLOAD DE FOTO DE PERFIL =============
function initAvatarUpload() {
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    
    if (!editAvatarBtn) return;
    
    // Criar input file invisível
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Evento do botão
    editAvatarBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Evento de seleção de arquivo
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            // Validar arquivo
            if (!file.type.startsWith('image/')) {
                showToast('Por favor, selecione uma imagem', 'error');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                showToast('Imagem muito grande (máximo 5MB)', 'error');
                return;
            }
            
            showToast('Enviando foto...', 'info');
            
            // Converter para base64
            const base64 = await fileToBase64(file);
            
            // Atualizar imagem na página
            document.getElementById('profile-avatar').src = base64;
            
            // Atualizar no sistema
            if (window.AuthSystem) {
                window.AuthSystem.updateUser({ picture: base64 });
            } else {
                currentUser.picture = base64;
                window.currentUser = currentUser;
            }
            
            // Disparar evento de atualização
            const event = new CustomEvent('userUpdated', {
                detail: currentUser
            });
            document.dispatchEvent(event);
            
            showToast('Foto atualizada com sucesso! ✓', 'success');
            trackEvent('profile_picture_updated');
            
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            showToast('Erro ao atualizar foto. Tente novamente.', 'error');
        }
        
        // Limpar input
        fileInput.value = '';
    });
}

// Converter arquivo para base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// ============= UPLOAD DE CAPA =============
function initCoverUpload() {
    const editCoverBtn = document.querySelector('.edit-cover-btn');
    
    if (!editCoverBtn) return;
    
    editCoverBtn.addEventListener('click', () => {
        showToast('Funcionalidade de capa em desenvolvimento 🔨', 'info');
    });
}

// ============= LOGOUT CORRIGIDO =============
function setupLogoutButtons() {
    // Botões de logout na página
    const logoutButtons = document.querySelectorAll('[onclick*="logout"]');
    
    logoutButtons.forEach(btn => {
        btn.removeAttribute('onclick');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            performLogout();
        });
    });
}

function performLogout() {
    showModal(
        'Sair da Conta',
        'Tem certeza que deseja sair?',
        () => {
            if (window.AuthSystem) {
                window.AuthSystem.logout();
            } else if (window.GoogleAuth) {
                window.GoogleAuth.logout();
            } else {
                // Fallback manual
                window.currentUser = null;
                
                const event = new CustomEvent('userLoggedOut');
                document.dispatchEvent(event);
                
                showToast('Logout realizado com sucesso', 'success');
                
                setTimeout(() => {
                    window.location.href = '../CadastroInicial/index.html';
                }, 1500);
            }
        }
    );
}

// ============= NAVEGAÇÃO DE ABAS =============
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adiciona active ao clicado
            btn.classList.add('active');
            const targetContent = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Tracking
            trackEvent('tab_change', { tab: targetTab });
        });
    });
}

// ============= EDITAR BIOGRAFIA =============
function editBio() {
    const bioTextarea = document.getElementById('bio-text');
    const bioActions = document.querySelector('.bio-actions');
    
    originalBio = bioTextarea.value;
    bioTextarea.disabled = false;
    bioTextarea.focus();
    bioActions.style.display = 'flex';
}

function saveBio() {
    const bioTextarea = document.getElementById('bio-text');
    const bioActions = document.querySelector('.bio-actions');
    const newBio = bioTextarea.value.trim();
    
    // Salvar no objeto do usuário
    if (currentUser) {
        currentUser.bio = newBio;
        window.currentUser = currentUser;
        
        if (window.AuthSystem) {
            window.AuthSystem.updateUser({ bio: newBio });
        }
    }
    
    bioTextarea.disabled = true;
    bioActions.style.display = 'none';
    
    showToast('Biografia atualizada com sucesso! ✓', 'success');
    trackEvent('bio_updated');
}

function cancelBio() {
    const bioTextarea = document.getElementById('bio-text');
    const bioActions = document.querySelector('.bio-actions');
    
    bioTextarea.value = originalBio;
    bioTextarea.disabled = true;
    bioActions.style.display = 'none';
}

function updateCharCount() {
    const bioTextarea = document.getElementById('bio-text');
    const charCurrent = document.getElementById('char-current');
    
    if (bioTextarea && charCurrent) {
        charCurrent.textContent = bioTextarea.value.length;
    }
}

// ============= EDITAR PERFIL =============
function editProfile() {
    showToast('Funcionalidade em desenvolvimento 🔨', 'info');
}

// ============= FILTROS DE ANIMAIS =============
function initAnimalFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterAnimals(filter);
            trackEvent('animals_filtered', { filter });
        });
    });
}

function filterAnimals(filter) {
    console.log('Filtrar animais por:', filter);
    showToast(`Filtrando por: ${filter}`, 'info');
}

// ============= PLANOS =============
function updateCurrentPlan(planName) {
    const currentPlanNameEl = document.getElementById('current-plan-name');
    if (currentPlanNameEl) {
        const planNames = {
            'gratuito': 'Gratuito',
            'amigo': 'Amigo',
            'protetor': 'Protetor',
            'ong': 'ONG/Instituição'
        };
        currentPlanNameEl.textContent = planNames[planName] || 'Gratuito';
    }
    
    const planoCards = document.querySelectorAll('.plano-card');
    planoCards.forEach(card => {
        const cardPlan = card.getAttribute('data-plan');
        const badge = card.querySelector('.plano-badge');
        const button = card.querySelector('.btn');
        
        if (cardPlan === planName) {
            if (!badge) {
                const newBadge = document.createElement('div');
                newBadge.className = 'plano-badge';
                newBadge.textContent = 'Atual';
                card.insertBefore(newBadge, card.firstChild);
            } else {
                badge.textContent = 'Atual';
                badge.classList.remove('popular');
            }
            
            if (button) {
                button.textContent = 'Plano Atual';
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary');
                button.disabled = true;
            }
        }
    });
}

function selectPlan(planName) {
    showModal(
        'Confirmar Assinatura',
        `Deseja assinar o plano ${planName.toUpperCase()}?`,
        () => {
            processPlanSubscription(planName);
        }
    );
}

function processPlanSubscription(planName) {
    showToast('Processando assinatura... ⏳', 'info');
    
    setTimeout(() => {
        if (currentUser) {
            currentUser.plano = planName;
            window.currentUser = currentUser;
            
            if (window.AuthSystem) {
                window.AuthSystem.updateUser({ plano: planName });
            }
        }
        
        updateCurrentPlan(planName);
        showToast('Plano atualizado com sucesso! 🎉', 'success');
        trackEvent('plan_subscribed', { plan: planName });
        
        const sobreTab = document.querySelector('.tab-btn[data-tab="sobre"]');
        if (sobreTab) sobreTab.click();
    }, 2000);
}

// ============= CONFIGURAÇÕES =============
function changePassword() {
    showToast('Funcionalidade em desenvolvimento 🔨', 'info');
}

function downloadData() {
    showToast('Preparando seus dados para download... 📥', 'info');
    
    setTimeout(() => {
        const dataStr = JSON.stringify(currentUser, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meus_dados_apanim.json';
        link.click();
        
        showToast('Download iniciado! ✓', 'success');
        trackEvent('data_downloaded');
    }, 1500);
}

function deleteAccount() {
    showModal(
        'Excluir Conta',
        'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
        () => {
            showToast('Conta excluída com sucesso', 'success');
            setTimeout(() => {
                window.currentUser = null;
                window.location.href = '../CadastroInicial/index.html';
            }, 2000);
        },
        true
    );
}

// ============= TOAST NOTIFICATIONS =============
function showToast(message, type = 'info', duration = 3000) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
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

// ============= MODAL =============
function showModal(title, message, onConfirm, isDangerous = false) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            <h2 style="color: ${isDangerous ? '#dc3545' : '#5A0609'}; margin-bottom: 1rem;">${title}</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn ${isDangerous ? 'btn-danger' : 'btn-primary'}" onclick="
                    this.closest('.modal').remove();
                    (${onConfirm.toString()})();
                ">
                    Confirmar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// ============= TRACKING =============
function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
}

// ============= LISTENERS DE CONFIGURAÇÕES =============
function initSettingsListeners() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const setting = this.id;
            const value = this.checked;
            
            console.log(`Setting ${setting}:`, value);
            showToast(`Configuração atualizada ✓`, 'success', 2000);
            trackEvent('setting_changed', { setting, value });
        });
    });
}

// ============= ANIMAÇÕES E EFEITOS =============
function initAnimations() {
    const patas = document.querySelectorAll('.pata-animate');
    patas.forEach(pata => {
        pata.addEventListener('click', function(e) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9999;
                animation: heartFloat 1s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        });
    });
}

const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// ============= LISTENERS DE EVENTOS GLOBAIS =============
document.addEventListener('userLoggedOut', () => {
    console.log('👋 Usuário deslogou');
    window.location.href = '../CadastroInicial/index.html';
});

document.addEventListener('userUpdated', (e) => {
    console.log('🔄 Dados do usuário atualizados', e.detail);
    currentUser = e.detail;
});

// ============= INICIALIZAÇÃO =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('� APANIM - Perfil do Usuário carregado');
    
    // Verificar autenticação
    if (!checkAuthentication()) {
        return;
    }
    
    // Carregar dados do usuário
    loadUserData();
    
    // Inicializar uploads
    initAvatarUpload();
    initCoverUpload();
    
    // Configurar botões de logout
    setupLogoutButtons();
    
    // Inicializar abas
    initTabs();
    
    // Inicializar filtros de animais
    initAnimalFilters();
    
    // Contador de caracteres da bio
    const bioTextarea = document.getElementById('bio-text');
    if (bioTextarea) {
        bioTextarea.addEventListener('input', updateCharCount);
    }
    
    // Listeners de configurações
    initSettingsListeners();
    
    // Animações
    initAnimations();
    
    // Tracking
    trackEvent('page_view', { page: 'perfil_usuario' });
    
    console.log('✅ Perfil inicializado com sucesso');
});

// ============= EXPORTS =============
window.PerfilApp = {
    editBio,
    saveBio,
    cancelBio,
    editProfile,
    selectPlan,
    changePassword,
    downloadData,
    deleteAccount,
    showToast,
    trackEvent
};