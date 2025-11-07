// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
});

// ===== INICIALIZAÇÃO DA PÁGINA =====
function inicializarPagina() {
    configurarFiltros();
    configurarBotoes();
    configurarBotoesContato();
    atualizarContador();
}

// ===== CONFIGURAÇÃO DOS FILTROS =====
function configurarFiltros() {
    const form = document.getElementById('form-filtros');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            aplicarFiltros();
        });

        // Adiciona listeners para os selects
        const selects = form.querySelectorAll('.select-filtro');
        selects.forEach(select => {
            select.addEventListener('change', aplicarFiltros);
        });
    }
}

// ===== CONFIGURAÇÃO DOS BOTÕES =====
function configurarBotoes() {
    const btnLimpar = document.getElementById('limpar-filtros');
    
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFiltros);
    }
}

// ===== APLICAR FILTROS =====
function aplicarFiltros() {
    const tipoAnimal = document.getElementById('tipo_animal').value;
    const sexo = document.getElementById('sexo').value;
    const porte = document.getElementById('porte').value;
    const cor = document.getElementById('cor').value;
    const bairro = document.getElementById('bairro').value;
    const periodo = document.getElementById('periodo').value;

    const cards = document.querySelectorAll('.card-animal');
    let animaisVisiveis = 0;

    cards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo');
        const cardSexo = card.getAttribute('data-sexo');
        const cardPorte = card.getAttribute('data-porte');
        const cardCor = card.getAttribute('data-cor');
        const cardBairro = card.getAttribute('data-bairro');
        const cardPeriodo = card.getAttribute('data-periodo');

        let mostrar = true;

        // Filtro tipo de animal
        if (tipoAnimal !== 'todos' && cardTipo !== tipoAnimal) {
            mostrar = false;
        }

        // Filtro sexo
        if (sexo !== 'todos' && cardSexo !== sexo) {
            mostrar = false;
        }

        // Filtro porte
        if (porte !== 'todos' && cardPorte !== porte) {
            mostrar = false;
        }

        // Filtro cor
        if (cor !== 'todas' && cardCor !== cor) {
            mostrar = false;
        }

        // Filtro bairro
        if (bairro !== 'todos' && cardBairro !== bairro) {
            mostrar = false;
        }

        // Filtro período
        if (periodo !== 'todos' && cardPeriodo !== periodo) {
            mostrar = false;
        }

        // Mostrar ou ocultar card
        if (mostrar) {
            card.style.display = 'block';
            animaisVisiveis++;
        } else {
            card.style.display = 'none';
        }
    });

    // Atualizar contador
    atualizarContador(animaisVisiveis);

    // Mostrar mensagem vazia se não houver resultados
    mostrarMensagemVazia(animaisVisiveis);

    // Anunciar mudanças para leitores de tela
    anunciarResultados(animaisVisiveis);
}

// ===== LIMPAR FILTROS =====
function limparFiltros() {
    const form = document.getElementById('form-filtros');
    
    if (form) {
        form.reset();
        
        // Mostrar todos os cards
        const cards = document.querySelectorAll('.card-animal');
        cards.forEach(card => {
            card.style.display = 'block';
        });

        // Atualizar contador
        atualizarContador(cards.length);

        // Ocultar mensagem vazia
        mostrarMensagemVazia(cards.length);

        // Anunciar para leitores de tela
        anunciarResultados(cards.length, true);
    }
}

// ===== ATUALIZAR CONTADOR =====
function atualizarContador(quantidade) {
    const contador = document.getElementById('contador-resultados');
    
    if (contador) {
        if (quantidade === undefined) {
            // Contar cards visíveis
            const cardsVisiveis = document.querySelectorAll('.card-animal:not([style*="display: none"])');
            quantidade = cardsVisiveis.length;
        }

        const texto = quantidade === 1 
            ? '1 animal procurado' 
            : `${quantidade} animais procurados`;
        
        contador.textContent = texto;
    }
}

// ===== MOSTRAR MENSAGEM VAZIA =====
function mostrarMensagemVazia(quantidade) {
    const mensagemVazia = document.getElementById('mensagem-vazia');
    const gridAnimais = document.getElementById('grid-animais');

    if (mensagemVazia) {
        if (quantidade === 0) {
            mensagemVazia.style.display = 'block';
            if (gridAnimais) {
                gridAnimais.style.display = 'none';
            }
        } else {
            mensagemVazia.style.display = 'none';
            if (gridAnimais) {
                gridAnimais.style.display = 'grid';
            }
        }
    }
}

// ===== ANUNCIAR RESULTADOS (ACESSIBILIDADE) =====
function anunciarResultados(quantidade, foiLimpo = false) {
    const contador = document.getElementById('contador-resultados');
    
    if (contador) {
        if (foiLimpo) {
            contador.setAttribute('aria-live', 'polite');
        }
        
        // Forçar atualização para leitores de tela
        setTimeout(() => {
            contador.setAttribute('aria-live', 'polite');
        }, 100);
    }
}

// ===== CONFIGURAR BOTÕES DE CONTATO =====
function configurarBotoesContato() {
    const botoesContato = document.querySelectorAll('.btn-contato');
    
    botoesContato.forEach(botao => {
        botao.addEventListener('click', function() {
            const animalId = this.getAttribute('data-animal-id');
            const nomeAnimal = this.closest('.card-animal').querySelector('.nome-animal').textContent;
            
            abrirContato(animalId, nomeAnimal);
        });
    });
}

// ===== ABRIR CONTATO =====
function abrirContato(animalId, nomeAnimal) {
    // Obter informações de contato do card
    const card = document.querySelector(`[data-animal-id="${animalId}"]`);
    
    if (card) {
        const contatoInfo = card.querySelector('.contato-info');
        const emailElement = contatoInfo.querySelectorAll('p')[1];
        const telefoneElement = contatoInfo.querySelectorAll('p')[2];
        
        const email = emailElement ? emailElement.textContent.replace('📧 ', '') : '';
        const telefone = telefoneElement ? telefoneElement.textContent.replace('📱 ', '') : '';

        // Mostrar modal ou redirecionar
        mostrarModalContato(nomeAnimal, email, telefone);
    }
}

// ===== MOSTRAR MODAL DE CONTATO =====
function mostrarModalContato(nomeAnimal, email, telefone) {
    // Criar mensagem personalizada
    const mensagem = `Você está prestes a entrar em contato sobre ${nomeAnimal}.\n\n` +
                    `Email: ${email}\n` +
                    `Telefone: ${telefone}\n\n` +
                    `Deseja abrir seu aplicativo de email?`;

    if (confirm(mensagem)) {
        // Criar link mailto
        const assunto = encodeURIComponent(`Vi o animal perdido: ${nomeAnimal}`);
        const corpo = encodeURIComponent(`Olá,\n\nEu vi o animal ${nomeAnimal} que está perdido.\n\nGostaria de fornecer informações sobre o paradeiro.\n\nAguardo retorno.`);
        
        window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
    }
}

// ===== FUNÇÃO AUXILIAR: FORMATAR TELEFONE =====
function formatarTelefone(telefone) {
    // Remove caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    // Formata: (XX) XXXXX-XXXX
    if (numeroLimpo.length === 11) {
        return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
    }
    
    return telefone;
}

// ===== ANIMAÇÃO DE SCROLL SUAVE =====
function scrollSuave(elemento) {
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== SALVAR ESTADO DOS FILTROS (LOCAL STORAGE) =====
function salvarFiltros() {
    const filtros = {
        tipo_animal: document.getElementById('tipo_animal').value,
        sexo: document.getElementById('sexo').value,
        porte: document.getElementById('porte').value,
        cor: document.getElementById('cor').value,
        bairro: document.getElementById('bairro').value,
        periodo: document.getElementById('periodo').value
    };

    // Usando variável em memória ao invés de localStorage
    window.filtrosSalvos = filtros;
}

// ===== CARREGAR ESTADO DOS FILTROS =====
function carregarFiltros() {
    const filtros = window.filtrosSalvos;

    if (filtros) {
        document.getElementById('tipo_animal').value = filtros.tipo_animal || 'todos';
        document.getElementById('sexo').value = filtros.sexo || 'todos';
        document.getElementById('porte').value = filtros.porte || 'todos';
        document.getElementById('cor').value = filtros.cor || 'todas';
        document.getElementById('bairro').value = filtros.bairro || 'todos';
        document.getElementById('periodo').value = filtros.periodo || 'todos';

        aplicarFiltros();
    }
}

// ===== ESTATÍSTICAS DOS ANIMAIS PERDIDOS =====
function obterEstatisticas() {
    const cards = document.querySelectorAll('.card-animal');
    const stats = {
        total: cards.length,
        cachorros: 0,
        gatos: 0,
        machos: 0,
        femeas: 0,
        urgentes: 0,
        porBairro: {}
    };

    cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        const sexo = card.getAttribute('data-sexo');
        const bairro = card.getAttribute('data-bairro');
        const temBadgeUrgente = card.querySelector('.badge-urgente') !== null;

        if (tipo === 'cachorro') stats.cachorros++;
        if (tipo === 'gato') stats.gatos++;
        if (sexo === 'macho') stats.machos++;
        if (sexo === 'femea') stats.femeas++;
        if (temBadgeUrgente) stats.urgentes++;

        if (bairro) {
            stats.porBairro[bairro] = (stats.porBairro[bairro] || 0) + 1;
        }
    });

    return stats;
}

// ===== EXPORTAR DADOS (para uso futuro) =====
function exportarDados() {
    const cards = document.querySelectorAll('.card-animal');
    const dados = [];

    cards.forEach(card => {
        const animal = {
            nome: card.querySelector('.nome-animal').textContent,
            tipo: card.getAttribute('data-tipo'),
            sexo: card.getAttribute('data-sexo'),
            porte: card.getAttribute('data-porte'),
            cor: card.getAttribute('data-cor'),
            bairro: card.getAttribute('data-bairro'),
            periodo: card.getAttribute('data-periodo')
        };

        dados.push(animal);
    });

    console.log('Dados dos animais perdidos:', dados);
    return dados;
}

// ===== BUSCA POR TEXTO (funcionalidade adicional) =====
function buscarPorTexto(texto) {
    const textoBusca = texto.toLowerCase().trim();
    const cards = document.querySelectorAll('.card-animal');
    let animaisVisiveis = 0;

    if (!textoBusca) {
        // Se não houver texto, mostrar todos
        cards.forEach(card => {
            card.style.display = 'block';
            animaisVisiveis++;
        });
    } else {
        cards.forEach(card => {
            const nomeAnimal = card.querySelector('.nome-animal').textContent.toLowerCase();
            const detalhes = card.querySelector('.detalhes-animal').textContent.toLowerCase();
            const resumo = card.querySelector('.resumo').textContent.toLowerCase();

            const contem = nomeAnimal.includes(textoBusca) || 
                          detalhes.includes(textoBusca) || 
                          resumo.includes(textoBusca);

            if (contem) {
                card.style.display = 'block';
                animaisVisiveis++;
            } else {
                card.style.display = 'none';
            }
        });
    }

    atualizarContador(animaisVisiveis);
    mostrarMensagemVazia(animaisVisiveis);
}

// ===== VALIDAÇÃO DE FORMULÁRIO DE CONTATO =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    return numeroLimpo.length === 10 || numeroLimpo.length === 11;
}

// ===== ORDENAÇÃO DE RESULTADOS =====
function ordenarPorData() {
    const grid = document.getElementById('grid-animais');
    const cards = Array.from(document.querySelectorAll('.card-animal'));

    cards.sort((a, b) => {
        const dataA = a.querySelector('[data-animal-id]').getAttribute('data-periodo');
        const dataB = b.querySelector('[data-animal-id]').getAttribute('data-periodo');
        
        const ordem = {
            'ultima-semana': 1,
            'ultimo-mes': 2,
            'ultimos-3-meses': 3,
            'mais-de-3-meses': 4
        };

        return (ordem[dataA] || 999) - (ordem[dataB] || 999);
    });

    // Reordenar no DOM
    cards.forEach(card => grid.appendChild(card));
}

// ===== DETECÇÃO DE NAVEGADOR E DISPOSITIVO =====
function detectarDispositivo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    return {
        isMobile: isMobile && !isTablet,
        isTablet: isTablet,
        isDesktop: !isMobile
    };
}

// ===== LOG DE ATIVIDADES (para debug) =====
function logAtividade(acao, detalhes = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${acao}`, detalhes);
}

// ===== INICIALIZAR TOOLTIPS (se necessário) =====
function inicializarTooltips() {
    const elementos = document.querySelectorAll('[data-tooltip]');
    
    elementos.forEach(elemento => {
        elemento.addEventListener('mouseenter', function() {
            const texto = this.getAttribute('data-tooltip');
            mostrarTooltip(this, texto);
        });

        elemento.addEventListener('mouseleave', function() {
            ocultarTooltip();
        });
    });
}

// ===== PERFORMANCE: LAZY LOADING DE IMAGENS =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

}// Observar imagens lazy
    