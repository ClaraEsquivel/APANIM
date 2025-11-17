/* ============= SISTEMA DE AUTENTICAÇÃO - APANIM ============= */
/* Arquivo: assets/js/auth-system.js */
/* Incluir em TODAS as páginas após o menu-unificado.js */

(function() {
    'use strict';

    // ============= GERENCIAMENTO DE USUÁRIO =============
    const AuthSystem = {
        // Obter usuário atual
        getCurrentUser() {
            return window.currentUser || null;
        },

        // Salvar usuário
        setCurrentUser(userData) {
            window.currentUser = {
                ...userData,
                loggedIn: true,
                lastUpdate: new Date().toISOString()
            };
            
            // Disparar evento
            const event = new CustomEvent('userLoggedIn', {
                detail: window.currentUser
            });
            document.dispatchEvent(event);
            
            console.log('✅ Usuário autenticado:', window.currentUser.nome);
            return window.currentUser;
        },

        // Atualizar dados do usuário
        updateUser(updates) {
            if (!window.currentUser) return null;
            
            window.currentUser = {
                ...window.currentUser,
                ...updates,
                lastUpdate: new Date().toISOString()
            };
            
            // Disparar evento de atualização
            const event = new CustomEvent('userUpdated', {
                detail: window.currentUser
            });
            document.dispatchEvent(event);
            
            console.log('🔄 Usuário atualizado');
            return window.currentUser;
        },

        // Atualizar foto de perfil
        async updateProfilePicture(file) {
            if (!file) return null;
            
            try {
                // Validar arquivo
                if (!file.type.startsWith('image/')) {
                    throw new Error('Arquivo deve ser uma imagem');
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB
                    throw new Error('Imagem muito grande (máx 5MB)');
                }
                
                // Converter para base64
                const base64 = await this.fileToBase64(file);
                
                // Atualizar usuário
                this.updateUser({ picture: base64 });
                
                // AQUI: Enviar para API real em produção
                /*
                const response = await fetch('/api/users/update-picture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId: window.currentUser.id,
                        picture: base64 
                    })
                });
                */
                
                return base64;
            } catch (error) {
                console.error('Erro ao atualizar foto:', error);
                throw error;
            }
        },

        // Converter arquivo para base64
        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },

        // Fazer logout
        logout() {
            const userName = window.currentUser?.nome || 'Usuário';
            
            // Limpar dados
            window.currentUser = null;
            
            // Disparar evento
            const event = new CustomEvent('userLoggedOut');
            document.dispatchEvent(event);
            
            console.log('👋 Logout realizado:', userName);
            
            // Mostrar notificação (se disponível)
            if (window.PerfilApp?.showToast) {
                window.PerfilApp.showToast('Logout realizado com sucesso', 'success');
            }
            
            // Redirecionar após delay
            setTimeout(() => {
                window.location.href = '/pages/CadastroInicial/index.html';
            }, 1500);
        },

        // Verificar se está logado
        isAuthenticated() {
            return !!(window.currentUser && window.currentUser.loggedIn);
        },

        // Verificar autenticação e redirecionar se necessário
        requireAuth() {
            if (!this.isAuthenticated()) {
                console.warn('⚠️ Usuário não autenticado');
                window.location.href = '/pages/CadastroInicial/index.html';
                return false;
            }
            return true;
        }
    };

    // ============= GOOGLE AUTH (MOCK) =============
    window.GoogleAuth = {
        logout() {
            AuthSystem.logout();
        },
        
        isSignedIn() {
            return AuthSystem.isAuthenticated();
        },
        
        getCurrentUser() {
            return AuthSystem.getCurrentUser();
        }
    };

    // ============= EXPORTS =============
    window.AuthSystem = AuthSystem;
    
    console.log('🔐 Sistema de autenticação carregado');
})();