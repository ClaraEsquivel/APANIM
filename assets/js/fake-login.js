/* ============= LOGIN FICTÍCIO SIMPLES - APANIM ============= */
/* Salva e recupera o nome do usuário sem verificações */

const FakeLogin = {
    /**
     * Salva o nome do usuário
     */
    login(nome) {
        sessionStorage.setItem('nomeUsuario', nome);
        console.log('✅ Usuário salvo:', nome);
    },
    
    /**
     * Pega o nome do usuário
     */
    getNome() {
        return sessionStorage.getItem('nomeUsuario');
    },
    
    /**
     * Verifica se está logado
     */
    isLoggedIn() {
        return !!sessionStorage.getItem('nomeUsuario');
    },
    
    /**
     * Faz logout
     */
    logout() {
        sessionStorage.removeItem('nomeUsuario');
        console.log('👋 Logout');
    }
};

// Disponibiliza globalmente
window.FakeLogin = FakeLogin;

console.log('🐾 FakeLogin carregado');