// ===== MODAL CUSTOMIZADO - APANIM =====

/**
 * Sistema de modais customizados para o APANIM
 * Substitui os alerts/confirms nativos por modais estilizados
 */

// ===== GERENCIADOR DE MODAIS =====
const ModalManager = {
    // Contador para IDs únicos
    modalCounter: 0,

    /**
     * Cria a estrutura HTML do modal
     */
    criarModal(config) {
        const modalId = `modal-${++this.modalCounter}`;
        
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.id = `backdrop-${modalId}`;
        
        const container = document.createElement('div');
        container.className = 'modal-container';
        container.id = modalId;
        
        // Adiciona classe de tipo se especificado
        const tipoClass = config.tipo ? ` ${config.tipo}` : '';
        
        const modalHTML = `
            <div class="modal-box${tipoClass}">
                <div class="modal-header">
                    <h3>${config.titulo}</h3>
                    ${config.fecharX !== false ? '<button class="modal-close" aria-label="Fechar">&times;</button>' : ''}
                </div>
                <div class="modal-body">
                    ${config.icone ? `<div class="modal-icon ${config.icone}">${this.getIcone(config.icone)}</div>` : ''}
                    ${config.mensagem}
                </div>
                <div class="modal-footer">
                    ${this.criarBotoes(config.botoes)}
                </div>
            </div>
        `;
        
        container.innerHTML = modalHTML;
        
        return { backdrop, container, modalId };
    },

    /**
     * Retorna o ícone apropriado
     */
    getIcone(tipo) {
        const icones = {
            'success': '✅',
            'warning': '⚠️',
            'error': '❌',
            'info': 'ℹ️',
            'question': '❓'
        };
        return icones[tipo] || '';
    },

    /**
     * Cria HTML dos botões
     */
    criarBotoes(botoes) {
        if (!botoes || botoes.length === 0) {
            return '<button class="modal-btn modal-btn-primary" data-action="ok">OK</button>';
        }
        
        return botoes.map(botao => {
            const classe = botao.classe || 'modal-btn-primary';
            const acao = botao.acao || 'close';
            return `<button class="modal-btn ${classe}" data-action="${acao}">${botao.texto}</button>`;
        }).join('');
    },

    /**
     * Exibe o modal
     */
    async exibir(config) {
        return new Promise((resolve) => {
            const { backdrop, container, modalId } = this.criarModal(config);
            
            // Adiciona ao DOM
            document.body.appendChild(backdrop);
            document.body.appendChild(container);
            
            // Previne scroll do body
            document.body.classList.add('modal-open');
            
            // Aguarda um frame para animação
            requestAnimationFrame(() => {
                backdrop.classList.add('show');
                container.classList.add('show');
            });
            
            // Função para fechar o modal
            const fecharModal = (resultado) => {
                backdrop.classList.add('hide');
                container.classList.add('hide');
                
                setTimeout(() => {
                    backdrop.remove();
                    container.remove();
                    document.body.classList.remove('modal-open');
                    resolve(resultado);
                }, 300);
            };
            
            // Event listeners para botões
            const botoes = container.querySelectorAll('.modal-btn');
            botoes.forEach(botao => {
                botao.addEventListener('click', () => {
                    const acao = botao.getAttribute('data-action');
                    
                    if (acao === 'confirm' || acao === 'ok') {
                        fecharModal(true);
                    } else if (acao === 'cancel') {
                        fecharModal(false);
                    } else {
                        fecharModal(acao);
                    }
                });
            });
            
            // Botão X de fechar
            const btnFechar = container.querySelector('.modal-close');
            if (btnFechar) {
                btnFechar.addEventListener('click', () => fecharModal(false));
            }
            
            // Fechar ao clicar no backdrop (se permitido)
            if (config.fecharBackdrop !== false) {
                backdrop.addEventListener('click', () => fecharModal(false));
            }
            
            // ESC para fechar
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    document.removeEventListener('keydown', handleEsc);
                    fecharModal(false);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }
};

// ===== FUNÇÕES DE ATALHO =====

/**
 * Exibe um alerta de sucesso
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem do modal
 */
async function alertaSucesso(titulo, mensagem) {
    return await ModalManager.exibir({
        titulo: titulo,
        mensagem: `<p>${mensagem}</p>`,
        tipo: 'success',
        icone: 'success',
        botoes: [
            { texto: 'OK', classe: 'modal-btn-primary', acao: 'ok' }
        ]
    });
}

/**
 * Exibe um alerta de aviso
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem do modal
 */
async function alertaAviso(titulo, mensagem) {
    return await ModalManager.exibir({
        titulo: titulo,
        mensagem: `<p>${mensagem}</p>`,
        tipo: 'warning',
        icone: 'warning',
        botoes: [
            { texto: 'Entendi', classe: 'modal-btn-primary', acao: 'ok' }
        ]
    });
}

/**
 * Exibe um alerta de erro
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem do modal
 */
async function alertaErro(titulo, mensagem) {
    return await ModalManager.exibir({
        titulo: titulo,
        mensagem: `<p>${mensagem}</p>`,
        tipo: 'error',
        icone: 'error',
        botoes: [
            { texto: 'Fechar', classe: 'modal-btn-primary', acao: 'ok' }
        ]
    });
}

/**
 * Exibe um alerta de informação
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem do modal
 */
async function alertaInfo(titulo, mensagem) {
    return await ModalManager.exibir({
        titulo: titulo,
        mensagem: `<p>${mensagem}</p>`,
        tipo: 'info',
        icone: 'info',
        botoes: [
            { texto: 'OK', classe: 'modal-btn-primary', acao: 'ok' }
        ]
    });
}

/**
 * Exibe um modal de confirmação
 * @param {string} titulo - Título do modal
 * @param {string} mensagem - Mensagem do modal
 * @param {string} icone - Tipo de ícone (opcional)
 * @returns {Promise<boolean>} - true se confirmado, false se cancelado
 */
async function confirmarModal(titulo, mensagem, icone = 'question') {
    return await ModalManager.exibir({
        titulo: titulo,
        mensagem: `<p>${mensagem}</p>`,
        icone: icone,
        botoes: [
            { texto: 'Cancelar', classe: 'modal-btn-cancel', acao: 'cancel' },
            { texto: 'Confirmar', classe: 'modal-btn-primary', acao: 'confirm' }
        ],
        fecharBackdrop: false
    });
}

/**
 * Exibe um modal customizado completo
 * @param {Object} config - Configuração completa do modal
 */
async function modalCustomizado(config) {
    return await ModalManager.exibir(config);
}

// ===== ALERTA DE CAMPO OBRIGATÓRIO =====
/**
 * Exibe alerta padrão para campo obrigatório
 * @param {string} mensagem - Mensagem específica do campo
 */
async function alertaCampoObrigatorio(mensagem) {
    return await alertaAviso('⚠️ Campo Obrigatório', mensagem);
}

// ===== LOG =====
console.log('✅ Sistema de Modais Customizados APANIM carregado');
console.log('📦 Funções disponíveis:');
console.log('   - alertaSucesso(titulo, mensagem)');
console.log('   - alertaAviso(titulo, mensagem)');
console.log('   - alertaErro(titulo, mensagem)');
console.log('   - alertaInfo(titulo, mensagem)');
console.log('   - confirmarModal(titulo, mensagem, icone)');
console.log('   - alertaCampoObrigatorio(mensagem)');
console.log('   - modalCustomizado(config)');