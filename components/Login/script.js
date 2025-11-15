/* ============= SCRIPT DE LOGIN - APANIM ============= */

// ============= VARIÁVEIS GLOBAIS =============
let isSubmitting = false;

// ============= VALIDAÇÃO DE EMAIL =============
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============= VALIDAÇÃO DE SENHA =============
function isValidPassword(password) {
    // Mínimo 6 caracteres
    return password.length >= 6;
}

// ============= MOSTRAR/ESCONDER SENHA =============
function initTogglePassword() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = toggleBtn.querySelector('.eye-icon');
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alterna o ícone
        eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
        
        // Adiciona feedback visual
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// ============= VALIDAÇÃO EM TEMPO REAL =============
function initRealTimeValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });
    
    emailInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            validateEmail(this.value);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        validatePassword(this.value);
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            validatePassword(this.value);
        }
    });
}

// ============= VALIDAR EMAIL =============
function validateEmail(email) {
    const emailGroup = document.getElementById('email').parentElement;
    const emailError = document.getElementById('email-error');
    
    if (!email) {
        showError(emailGroup, emailError, 'Por favor, digite seu email');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError(emailGroup, emailError, 'Por favor, digite um email válido');
        return false;
    }
    
    hideError(emailGroup, emailError);
    return true;
}

// ============= VALIDAR SENHA =============
function validatePassword(password) {
    const passwordGroup = document.getElementById('password').parentElement.parentElement;
    const passwordError = document.getElementById('password-error');
    
    if (!password) {
        showError(passwordGroup, passwordError, 'Por favor, digite sua senha');
        return false;
    }
    
    if (!isValidPassword(password)) {
        showError(passwordGroup, passwordError, 'A senha deve ter no mínimo 6 caracteres');
        return false;
    }
    
    hideError(passwordGroup, passwordError);
    return true;
}

// ============= MOSTRAR ERRO =============
function showError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Shake animation
    formGroup.style.animation = 'shake 0.5s';
    setTimeout(() => {
        formGroup.style.animation = '';
    }, 500);
}

// ============= ESCONDER ERRO =============
function hideError(formGroup, errorElement) {
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// ============= TOAST NOTIFICATIONS =============
function showToast(message, type = 'info', duration = 3000) {
    // Remove toasts anteriores
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
    
    // Animação de saída
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// Adiciona animação ao CSS
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

// ============= LOADING BUTTON =============
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// ============= PROCESSAR LOGIN =============
async function processLogin(email, password, rememberMe) {
    // Simula chamada à API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // AQUI VOCÊ DEVE FAZER A CHAMADA REAL À SUA API
            // Exemplo de integração:
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rememberMe })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data.message);
                }
            })
            .catch(error => reject('Erro ao conectar com o servidor'));
            */
            
            // Simulação de login bem-sucedido (REMOVER EM PRODUÇÃO)
            if (email && password.length >= 6) {
                resolve({
                    success: true,
                    user: {
                        id: '123',
                        name: email.split('@')[0],
                        email: email
                    }
                });
            } else {
                reject('Email ou senha incorretos');
            }
        }, 1500);
    });
}

// ============= SUBMIT DO FORMULÁRIO =============
function initFormSubmit() {
    const form = document.getElementById('login-form');
    const btnLogin = document.getElementById('btn-login');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Valida campos
        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);
        
        if (!emailValid || !passwordValid) {
            showToast('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Inicia loading
        isSubmitting = true;
        setButtonLoading(btnLogin, true);
        
        try {
            const response = await processLogin(email, password, rememberMe);
            
            if (response.success) {
                // Salva usuário em memória (não usa localStorage)
                window.currentUser = {
                    ...response.user,
                    loggedIn: true,
                    loginTime: new Date().toISOString()
                };
                
                // Dispara evento de login
                const loginEvent = new CustomEvent('userLoggedIn', {
                    detail: window.currentUser
                });
                document.dispatchEvent(loginEvent);
                
                showToast(`Bem-vindo de volta, ${response.user.name}! 🎉`, 'success');
                
                // Redireciona após 1.5 segundos
                setTimeout(() => {
                    window.location.href = '../PerfilUsuario/index.html';
                }, 1500);
            }
        } catch (error) {
            console.error('Erro no login:', error);
            showToast(error || 'Erro ao fazer login. Tente novamente.', 'error');
            setButtonLoading(btnLogin, false);
            isSubmitting = false;
        }
    });
}

// ============= MODAL DE ESQUECI A SENHA =============
function initForgotPasswordModal() {
    const modal = document.getElementById('forgot-password-modal');
    const forgotLink = document.getElementById('forgot-password-link');
    const closeBtn = document.querySelector('.modal-close');
    const resetForm = document.getElementById('forgot-password-form');
    
    // Abre modal
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Fecha modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Fecha modal ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Fecha com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Submit do formulário de reset
    resetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const resetEmail = document.getElementById('reset-email').value.trim();
        
        if (!isValidEmail(resetEmail)) {
            showToast('Por favor, digite um email válido', 'error');
            return;
        }
        
        const btnReset = this.querySelector('.btn-reset');
        btnReset.disabled = true;
        btnReset.textContent = 'Enviando...';
        
        // Simula envio de email (SUBSTITUIR POR CHAMADA À API)
        setTimeout(() => {
            showToast('Link de recuperação enviado para seu email! 📧', 'success');
            modal.classList.remove('show');
            document.body.style.overflow = '';
            resetForm.reset();
            btnReset.disabled = false;
            btnReset.textContent = 'Enviar Link de Recuperação';
        }, 2000);
    });
}

// ============= ANIMAÇÕES E INTERAÇÕES =============
function initAnimations() {
    const container = document.querySelector('.container');
    const patas = document.querySelectorAll('[class^="patas"]');
    
    // Anima container
    if (container) {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Anima patas sequencialmente
    patas.forEach((pata, index) => {
        setTimeout(() => {
            pata.style.opacity = '1';
            pata.style.transform = 'scale(1)';
        }, 200 + (index * 100));
    });
}

// ============= EFEITO PARALLAX =============
function initParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const patas = document.querySelectorAll('[class^="patas"]');
        
        patas.forEach((pata, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            pata.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// ============= EFEITOS NAS PATAS =============
function initPawEffects() {
    const patas = document.querySelectorAll('[class^="patas"]');
    
    patas.forEach(pata => {
        pata.addEventListener('click', function() {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
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

// Adiciona animação de coração
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

// ============= ENTER KEY NO EMAIL =============
function initEnterKey() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });
}

// ============= AUTOFOCUS NO PRIMEIRO CAMPO =============
function initAutoFocus() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        setTimeout(() => {
            emailInput.focus();
        }, 500);
    }
}

// ============= ACESSIBILIDADE =============
function initAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #5A0609 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(accessibilityStyle);

// ============= TRACKING =============
function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
    
    // Aqui você pode adicionar Google Analytics ou outro sistema de tracking
    // gtag('event', eventName, data);
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

// ============= LISTENER DE LOGIN DO GOOGLE =============
document.addEventListener('userLoggedIn', (e) => {
    const user = e.detail;
    console.log('✅ Login Google bem-sucedido:', user.name);
    trackEvent('login_google_success', { email: user.email });
});

// ============= INICIALIZAÇÃO =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 APANIM - Página de Login carregada');
    
    // Verifica sessão ativa
    if (checkExistingSession()) {
        return;
    }
    
    // Inicializa todas as funcionalidades
    initTogglePassword();
    initRealTimeValidation();
    initFormSubmit();
    initForgotPasswordModal();
    initAnimations();
    initParallax();
    initPawEffects();
    initEnterKey();
    initAutoFocus();
    initAccessibility();
    
    // Tracking
    trackEvent('page_view', { page: 'login' });
    
    console.log('✅ Todas as funcionalidades inicializadas');
});

// ============= EXPORTS =============
window.LoginApp = {
    showToast,
    trackEvent
};