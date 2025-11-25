// ===== MODAL CUSTOMIZADO - APANIM =====

// Classe para gerenciar o modal
class ModalApanim {
    constructor() {
        this.backdrop = null;
        this.container = null;
        this.resolve = null;
        this.inicializar();
    }

    inicializar() {
        // Criar backdrop
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop';
        this.backdrop.onclick = () => this.fechar(false);
        document.body.appendChild(this.backdrop);

        // Criar container
        this.container = document.createElement('div');
        this.container.className = 'modal-container';
        document.body.appendChild(this.container);

        // Listener para ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.backdrop.classList.contains('show')) {
                this.fechar(false);
            }
        });
    }

    /**
     * Abre um modal de confirmação
     * @param {Object} options - Opções do modal
     * @param {string} options.titulo - Título do modal
     * @param {string} options.mensagem - Mensagem principal
     * @param {string} options.textoConfirmar - Texto do botão de confirmar
     * @param {string} options.textoCancelar - Texto do botão de cancelar
     * @param {string} options.tipo - Tipo do modal (default, success, warning, error, info)
     * @param {Object} options.contato - Informações de contato {email, telefone}
     * @returns {Promise<boolean>} - true se confirmado, false se cancelado
     */
    confirmar(options) {
        const {
            titulo = 'Confirmar',
            mensagem = '',
            textoConfirmar = 'Confirmar',
            textoCancelar = 'Cancelar',
            tipo = 'default',
            contato = null
        } = options;

        return new Promise((resolve) => {
            this.resolve = resolve;

            // Criar estrutura do modal
            const modalBox = document.createElement('div');
            modalBox.className = `modal-box ${tipo !== 'default' ? tipo : ''}`;

            // Header
            const header = document.createElement('div');
            header.className = 'modal-header';
            header.innerHTML = `
                <h3>${titulo}</h3>
                <button class="modal-close" aria-label="Fechar modal">×</button>
            `;

            // Body
            const body = document.createElement('div');
            body.className = 'modal-body';
            
            let bodyHTML = `<p>${mensagem}</p>`;

            // Adicionar informações de contato se fornecidas
            if (contato) {
                bodyHTML += `
                    <div class="modal-contato-info">
                        <h4>📞 Informações de Contato:</h4>
                        ${contato.email ? `
                            <div class="modal-contato-item">
                                <span class="icone">📧</span>
                                <span><strong>Email:</strong> ${contato.email}</span>
                            </div>
                        ` : ''}
                        ${contato.telefone ? `
                            <div class="modal-contato-item">
                                <span class="icone">📱</span>
                                <span><strong>Telefone:</strong> ${contato.telefone}</span>
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            body.innerHTML = bodyHTML;

            // Footer
            const footer = document.createElement('div');
            footer.className = 'modal-footer';
            footer.innerHTML = `
                <button class="modal-btn modal-btn-cancel">${textoCancelar}</button>
                <button class="modal-btn modal-btn-primary">${textoConfirmar}</button>
            `;

            // Montar modal
            modalBox.appendChild(header);
            modalBox.appendChild(body);
            modalBox.appendChild(footer);

            // Limpar container e adicionar novo modal
            this.container.innerHTML = '';
            this.container.appendChild(modalBox);

            // Event listeners
            header.querySelector('.modal-close').onclick = () => this.fechar(false);
            footer.querySelector('.modal-btn-cancel').onclick = () => this.fechar(false);
            footer.querySelector('.modal-btn-primary').onclick = () => this.fechar(true);

            // Mostrar modal
            this.abrir();
        });
    }

    /**
     * Abre um modal de alerta (apenas OK)
     * @param {Object} options - Opções do modal
     * @param {string} options.titulo - Título do modal
     * @param {string} options.mensagem - Mensagem principal
     * @param {string} options.textoOk - Texto do botão OK
     * @param {string} options.tipo - Tipo do modal (success, warning, error, info)
     * @param {string} options.icone - Ícone a ser exibido
     * @returns {Promise<void>}
     */
    alerta(options) {
        const {
            titulo = 'Aviso',
            mensagem = '',
            textoOk = 'OK',
            tipo = 'info',
            icone = null
        } = options;

        return new Promise((resolve) => {
            this.resolve = resolve;

            // Criar estrutura do modal
            const modalBox = document.createElement('div');
            modalBox.className = `modal-box ${tipo}`;

            // Header
            const header = document.createElement('div');
            header.className = 'modal-header';
            header.innerHTML = `
                <h3>${titulo}</h3>
                <button class="modal-close" aria-label="Fechar modal">×</button>
            `;

            // Body
            const body = document.createElement('div');
            body.className = 'modal-body';
            
            let bodyHTML = '';
            
            if (icone) {
                bodyHTML += `<div class="modal-icon ${tipo}">${icone}</div>`;
            }
            
            bodyHTML += `<p style="text-align: center;">${mensagem}</p>`;
            
            body.innerHTML = bodyHTML;

            // Footer
            const footer = document.createElement('div');
            footer.className = 'modal-footer';
            footer.style.justifyContent = 'center';
            footer.innerHTML = `
                <button class="modal-btn modal-btn-primary">${textoOk}</button>
            `;

            // Montar modal
            modalBox.appendChild(header);
            modalBox.appendChild(body);
            modalBox.appendChild(footer);

            // Limpar container e adicionar novo modal
            this.container.innerHTML = '';
            this.container.appendChild(modalBox);

            // Event listeners
            header.querySelector('.modal-close').onclick = () => this.fechar(true);
            footer.querySelector('.modal-btn-primary').onclick = () => this.fechar(true);

            // Mostrar modal
            this.abrir();
        });
    }

    abrir() {
        document.body.classList.add('modal-open');
        this.backdrop.classList.add('show');
        this.container.classList.add('show');
        
        // Focar no primeiro botão
        setTimeout(() => {
            const primeiroBtn = this.container.querySelector('.modal-btn');
            if (primeiroBtn) primeiroBtn.focus();
        }, 100);
    }

    fechar(resultado) {
        // Adicionar classe de saída
        this.backdrop.classList.add('hide');
        this.container.classList.add('hide');

        // Aguardar animação e então remover classes
        setTimeout(() => {
            this.backdrop.classList.remove('show', 'hide');
            this.container.classList.remove('show', 'hide');
            document.body.classList.remove('modal-open');
            
            if (this.resolve) {
                this.resolve(resultado);
                this.resolve = null;
            }
        }, 300);
    }
}

// Instância global do modal
const modalApanim = new ModalApanim();

// ===== FUNÇÕES AUXILIARES DE USO FÁCIL =====

/**
 * Exibe um modal de confirmação customizado
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {Object} contato - Objeto com {email, telefone} (opcional)
 * @returns {Promise<boolean>}
 */
function confirmarModal(titulo, mensagem, contato = null) {
    return modalApanim.confirmar({
        titulo: titulo,
        mensagem: mensagem,
        textoConfirmar: 'Enviar Email',
        textoCancelar: 'Cancelar',
        contato: contato
    });
}

/**
 * Exibe um alerta de sucesso
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem a ser exibida
 * @returns {Promise<void>}
 */
function alertaSucesso(titulo, mensagem) {
    return modalApanim.alerta({
        titulo: titulo,
        mensagem: mensagem,
        tipo: 'success',
        icone: '✅',
        textoOk: 'Entendi'
    });
}

/**
 * Exibe um alerta de erro
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem a ser exibida
 * @returns {Promise<void>}
 */
function alertaErro(titulo, mensagem) {
    return modalApanim.alerta({
        titulo: titulo,
        mensagem: mensagem,
        tipo: 'error',
        icone: '❌',
        textoOk: 'Entendi'
    });
}

/**
 * Exibe um alerta de aviso
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem a ser exibida
 * @returns {Promise<void>}
 */
function alertaAviso(titulo, mensagem) {
    return modalApanim.alerta({
        titulo: titulo,
        mensagem: mensagem,
        tipo: 'warning',
        icone: '⚠️',
        textoOk: 'Entendi'
    });
}

/**
 * Exibe um alerta informativo
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem a ser exibida
 * @returns {Promise<void>}
 */
function alertaInfo(titulo, mensagem) {
    return modalApanim.alerta({
        titulo: titulo,
        mensagem: mensagem,
        tipo: 'info',
        icone: 'ℹ️',
        textoOk: 'Entendi'
    });
}

console.log('✅ Modal customizado APANIM carregado');