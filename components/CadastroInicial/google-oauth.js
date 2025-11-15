/* ============= CONFIGURAÇÃO DO GOOGLE OAUTH ============= */

// ⚠️ IMPORTANTE: Configure suas credenciais aqui
const CONFIG = {
    CLIENT_ID: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Substitua pelo seu Client ID
    REDIRECT_URI: window.location.origin + '/oauth2callback',  // URL de callback
    SCOPE: 'openid profile email',
    AUTH_ENDPOINT: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
    USERINFO_ENDPOINT: 'https://www.googleapis.com/oauth2/v3/userinfo'
};

// ============= UTILITY FUNCTIONS =============

/**
 * Converte ArrayBuffer para Base64 URL-safe
 */
function base64urlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Gera string aleatória para code_verifier
 */
function generateRandomString(length = 64) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map(b => ('0' + b.toString(16)).slice(-2))
        .join('')
        .substring(0, length);
}

/**
 * Gera code_challenge a partir do code_verifier usando SHA-256
 */
async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64urlEncode(digest);
}

/**
 * Salva dados temporários (não usa localStorage conforme instruções)
 */
const tempStorage = {
    data: {},
    set(key, value) {
        this.data[key] = value;
    },
    get(key) {
        return this.data[key];
    },
    remove(key) {
        delete this.data[key];
    },
    clear() {
        this.data = {};
    }
};

// ============= UI FEEDBACK FUNCTIONS =============

/**
 * Mostra toast de notificação
 */
function showToast(message, type = 'info', duration = 3000) {
    // Remove toasts anteriores
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span style="font-size: 1.5rem;">${icons[type] || icons.info}</span>
        <span style="font-weight: 500;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

/**
 * Mostra/esconde loading spinner
 */
function toggleLoading(show) {
    let spinner = document.querySelector('.loading-spinner');
    
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(spinner);
    }
    
    if (show) {
        spinner.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        spinner.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Desabilita/habilita botão
 */
function toggleButton(button, disabled) {
    if (disabled) {
        button.disabled = true;
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }
}

// ============= OAUTH FLOW FUNCTIONS =============

/**
 * Inicia o fluxo OAuth com PKCE
 */
async function startGoogleOAuth() {
    try {
        console.log('🔐 Iniciando fluxo OAuth...');
        
        // Gera code_verifier e code_challenge
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        
        // Gera state para segurança
        const state = generateRandomString(32);
        
        // Salva dados temporariamente
        tempStorage.set('code_verifier', codeVerifier);
        tempStorage.set('oauth_state', state);
        
        // Constrói URL de autorização
        const params = new URLSearchParams({
            client_id: CONFIG.CLIENT_ID,
            redirect_uri: CONFIG.REDIRECT_URI,
            response_type: 'code',
            scope: CONFIG.SCOPE,
            access_type: 'offline',
            include_granted_scopes: 'true',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state: state,
            prompt: 'select_account' // Permite escolher conta
        });
        
        const authUrl = `${CONFIG.AUTH_ENDPOINT}?${params.toString()}`;
        
        console.log('✅ URL de autorização gerada');
        
        // Abre popup (melhor UX que redirect)
        const width = 600;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        const popup = window.open(
            authUrl,
            'google_oauth_popup',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`
        );
        
        if (!popup || popup.closed) {
            throw new Error('Popup bloqueado. Por favor, permita popups para este site.');
        }
        
        // Monitora o popup
        const popupCheckInterval = setInterval(() => {
            if (popup.closed) {
                clearInterval(popupCheckInterval);
                toggleLoading(false);
                console.log('❌ Popup fechado pelo usuário');
            }
        }, 500);
        
        // Listener para o callback do OAuth
        window.addEventListener('message', handleOAuthCallback);
        
    } catch (error) {
        console.error('❌ Erro ao iniciar OAuth:', error);
        showToast(error.message || 'Erro ao conectar com o Google', 'error');
        toggleLoading(false);
    }
}

/**
 * Processa o callback do OAuth
 */
async function handleOAuthCallback(event) {
    // Verifica origem do evento por segurança
    if (event.origin !== window.location.origin) return;
    
    const { code, state, error } = event.data;
    
    if (error) {
        console.error('❌ Erro no OAuth:', error);
        showToast('Erro na autenticação: ' + error, 'error');
        toggleLoading(false);
        return;
    }
    
    if (!code || !state) return;
    
    // Verifica state
    const savedState = tempStorage.get('oauth_state');
    if (state !== savedState) {
        console.error('❌ State inválido');
        showToast('Erro de segurança na autenticação', 'error');
        toggleLoading(false);
        return;
    }
    
    try {
        toggleLoading(true);
        console.log('🔄 Trocando code por token...');
        
        // Troca o code pelo access token
        const codeVerifier = tempStorage.get('code_verifier');
        const tokenData = await exchangeCodeForToken(code, codeVerifier);
        
        console.log('✅ Token obtido com sucesso');
        
        // Obtém informações do usuário
        const userInfo = await getUserInfo(tokenData.access_token);
        
        console.log('✅ Informações do usuário obtidas');
        
        // Salva dados do usuário
        window.currentUser = {
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        // Limpa dados temporários
        tempStorage.clear();
        
        // Dispara evento de login
        const loginEvent = new CustomEvent('userLoggedIn', {
            detail: window.currentUser
        });
        document.dispatchEvent(loginEvent);
        
        // Feedback visual
        showToast(`Bem-vindo, ${userInfo.name}! 🎉`, 'success');
        
        // Redireciona após 1.5 segundos
        setTimeout(() => {
            window.location.href = '../PerfilUsuario/index.html';
        }, 1500);
        
    } catch (error) {
        console.error('❌ Erro ao processar callback:', error);
        showToast('Erro ao processar autenticação', 'error');
    } finally {
        toggleLoading(false);
    }
}

/**
 * Troca authorization code por access token
 */
async function exchangeCodeForToken(code, codeVerifier) {
    const params = new URLSearchParams({
        client_id: CONFIG.CLIENT_ID,
        code: code,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
        redirect_uri: CONFIG.REDIRECT_URI
    });
    
    const response = await fetch(CONFIG.TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_description || 'Erro ao obter token');
    }
    
    return await response.json();
}

/**
 * Obtém informações do usuário
 */
async function getUserInfo(accessToken) {
    const response = await fetch(CONFIG.USERINFO_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Erro ao obter informações do usuário');
    }
    
    return await response.json();
}

/**
 * Verifica se há sessão ativa
 */
function checkActiveSession() {
    if (window.currentUser && window.currentUser.loggedIn) {
        console.log('✅ Sessão ativa encontrada');
        return true;
    }
    return false;
}

/**
 * Faz logout
 */
function logout() {
    window.currentUser = null;
    tempStorage.clear();
    
    const logoutEvent = new CustomEvent('userLoggedOut');
    document.dispatchEvent(logoutEvent);
    
    showToast('Logout realizado com sucesso! 👋', 'info');
    
    setTimeout(() => {
        window.location.href = '../CadastroInicial/index.html';
    }, 1000);
}

// ============= INICIALIZAÇÃO =============

document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 APANIM - Sistema de autenticação iniciado');
    
    // Verifica se há sessão ativa
    if (checkActiveSession()) {
        showToast('Você já está logado!', 'info');
        setTimeout(() => {
            window.location.href = '../PerfilUsuario/index.html';
        }, 1500);
        return;
    }
    
    // Configura o botão de login do Google
    const googleButton = document.getElementById('googleSign');
    
    if (googleButton) {
        googleButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Desabilita botão temporariamente
            toggleButton(googleButton, true);
            toggleLoading(true);
            
            try {
                await startGoogleOAuth();
            } catch (error) {
                console.error('Erro:', error);
                showToast('Erro ao iniciar login', 'error');
            } finally {
                setTimeout(() => {
                    toggleButton(googleButton, false);
                    toggleLoading(false);
                }, 2000);
            }
        });
        
        console.log('✅ Botão de login configurado');
    }
    
    // Animação no botão
    if (googleButton) {
        googleButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        googleButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// ============= PÁGINA DE CALLBACK =============
// Se esta for a página de callback, processa os parâmetros
if (window.location.pathname.includes('oauth2callback')) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    
    // Envia mensagem para a janela pai
    if (window.opener) {
        window.opener.postMessage({ code, state, error }, window.location.origin);
        window.close();
    }
}

// ============= EXPORTS =============
window.GoogleOAuth = {
    login: startGoogleOAuth,
    logout: logout,
    isLoggedIn: () => window.currentUser && window.currentUser.loggedIn,
    getCurrentUser: () => window.currentUser
};