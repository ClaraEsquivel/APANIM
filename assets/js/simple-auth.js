/* ============= SISTEMA SIMPLES DE AUTENTICAÇÃO APANIM ============= */
/* Versão simplificada - sem verificações complexas */

const SimpleAuth = {
    /**
     * Salva usuário após cadastro
     */
    login(dados) {
        const usuario = {
            nome: dados.nome || dados.name,
            email: dados.email,
            telefone: dados.telefone || '',
            cpf: dados.cpf || '',
            foto: dados.foto || dados.picture || '',
            loginType: dados.loginType || 'manual'
        };
        
        // Salva no sessionStorage
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        
        console.log('✅ Usuário salvo:', usuario.nome);
        return usuario;
    },
    
    /**
     * Pega dados do usuário
     */
    getUser() {
        const dados = sessionStorage.getItem('usuario');
        return dados ? JSON.parse(dados) : null;
    },
    
    /**
     * Remove usuário (logout)
     */
    logout() {
        sessionStorage.removeItem('usuario');
        console.log('👋 Logout realizado');
    }
};

// Disponibiliza globalmente
window.SimpleAuth = SimpleAuth;