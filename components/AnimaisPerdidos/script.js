// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
});

// ===== HELPER: VERIFICAR SE WINDOW.STORAGE ESTÁ DISPONÍVEL =====
function storageDisponivel() {
    return typeof window.storage !== 'undefined' && 
           typeof window.storage.get === 'function';
}

// ===== INICIALIZAÇÃO DA PÁGINA =====
async function inicializarPagina() {
    await carregarAnimaisCadastrados();
    configurarFiltros();
    configurarBotoes();
    atualizarContador();
}

// ===== CARREGAR ANIMAIS DO ARMAZENAMENTO =====
async function carregarAnimaisCadastrados() {
    const grid = document.getElementById('grid-animais');
    
    // Mostrar mensagem de carregamento
    grid.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando animais...</p></div>';
    
    try {
        let animais = [];
        
        if (storageDisponivel()) {
            // Tentar usar window.storage
            try {
                const resultado = await window.storage.get('animais_perdidos', true);
                if (resultado && resultado.value) {
                    animais = JSON.parse(resultado.value);
                }
            } catch (error) {
                console.log('Erro ao carregar do window.storage:', error);
            }
        } else {
            // Fallback: usar localStorage
            console.log('Usando localStorage como fallback');
            try {
                const dados = localStorage.getItem('animais_perdidos');
                if (dados) {
                    animais = JSON.parse(dados);
                }
            } catch (error) {
                console.log('Erro ao carregar do localStorage:', error);
            }
        }
        
        if (animais.length > 0) {
            grid.innerHTML = ''; // Limpar loading
            adicionarAnimaisNaGrid(animais);
            console.log(`✅ ${animais.length} animais carregados`);
        } else {
            console.log('ℹ️ Nenhum animal cadastrado ainda');
            mostrarMensagemVazia(0);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar animais:', error);
        mostrarMensagemVazia(0);
    }
}

// ===== ADICIONAR ANIMAIS NA GRID =====
function adicionarAnimaisNaGrid(animais) {
    const grid = document.getElementById('grid-animais');
    
    animais.forEach(animal => {
        const cardHtml = criarCardAnimal(animal);
        grid.insertAdjacentHTML('beforeend', cardHtml);
    });
    
    // Reconfigurar botões de contato após adicionar novos cards
    configurarBotoesContato();
}

// ===== CRIAR HTML DO CARD =====
function criarCardAnimal(animal) {
    // Calcular período de desaparecimento
    const periodo = calcularPeriodo(animal.dataDesaparecimento);
    
    // Verificar se é urgente (menos de 7 dias)
    const diasDesaparecido = calcularDiasDesaparecido(animal.dataDesaparecimento);
    const isUrgente = diasDesaparecido <= 7;
    
    // Formatar vacinas
    const vacinasTexto = animal.vacinas && animal.vacinas.length > 0 
        ? `Sim (${formatarVacinas(animal.vacinas)})` 
        : (animal.vacinado === 'sim' ? 'Sim' : 'Não');
    
    // Badge de tipo
    const badgeTipo = animal.especie === 'cachorro' 
        ? '<span class="badge-tipo badge-cachorro">🐕 Cachorro</span>'
        : '<span class="badge-tipo badge-gato">🐱 Gato</span>';
    
    // Badge urgente
    const badgeUrgente = isUrgente 
        ? '<span class="badge-urgente">URGENTE</span>' 
        : '';
    
    // Imagem
    const imagemSrc = animal.imagem || '../../assets/images/dog_sentado.svg';
    
    // Formatar data
    const dataFormatada = formatarData(animal.dataDesaparecimento);
    
    // Nome do bairro formatado
    const bairroFormatado = formatarBairro(animal.localizacao);
    
    return `
        <article class="card-animal" 
                 data-animal-id="${animal.id}" 
                 data-tipo="${animal.especie}" 
                 data-sexo="${animal.sexo}"
                 data-porte="${animal.porte}"
                 data-cor="${animal.cor}"
                 data-bairro="${animal.localizacao}"
                 data-periodo="${periodo}">
            <div class="card-imagem">
                <img src="${imagemSrc}" 
                     alt="${animal.nome} - ${animal.especie} ${animal.raca} perdido" 
                     class="imagem-animal"
                     loading="lazy"
                     width="200"
                     height="200"
                     onerror="this.src='../../assets/images/dog_sentado.svg'">
                ${badgeTipo}
                ${badgeUrgente}
            </div>
            <div class="card-info">
                <h3 class="nome-animal">${animal.nome}</h3>
                <dl class="detalhes-animal">
                    <dt>Espécie:</dt>
                    <dd><span class="icone-info">🐾</span> ${animal.especie === 'cachorro' ? 'Cachorro' : 'Gato'}</dd>
                    
                    <dt>Raça:</dt>
                    <dd><span class="icone-info">${animal.especie === 'cachorro' ? '🐕' : '🐱'}</span> ${animal.raca}</dd>
                    
                    <dt>Sexo:</dt>
                    <dd class="sexo" data-sexo="${animal.sexo}"><span class="icone-info">${animal.sexo === 'macho' ? '♂' : '♀'}</span> ${animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}</dd>
                    
                    <dt>Idade:</dt>
                    <dd><span class="icone-info">🎂</span> ${animal.idade}</dd>
                    
                    <dt>Porte:</dt>
                    <dd><span class="icone-info">📏</span> ${capitalize(animal.porte)}</dd>
                    
                    <dt>Cor:</dt>
                    <dd><span class="icone-info">🎨</span> ${animal.cor}</dd>
                    
                    <dt>Vacinado:</dt>
                    <dd><span class="icone-info">💉</span> ${vacinasTexto}</dd>
                    
                    <dt>Castrado:</dt>
                    <dd><span class="icone-info">✂️</span> ${animal.castrado === 'sim' ? 'Sim' : 'Não'}</dd>
                    
                    <dt>Vermifugado:</dt>
                    <dd><span class="icone-info">💊</span> ${animal.vermifugado === 'sim' ? 'Sim' : 'Não'}</dd>
                    
                    <dt>Condição Especial:</dt>
                    <dd><span class="icone-info">⚕️</span> ${animal.condicaoEspecial}</dd>
                    
                    <dt>Data do Desaparecimento:</dt>
                    <dd><span class="icone-info">📅</span> ${dataFormatada}</dd>
                    
                    <dt>Última Aparição:</dt>
                    <dd><span class="icone-info">📍</span> ${bairroFormatado}, Salvador-BA</dd>
                </dl>
                
                <div class="resumo">
                    <p><strong>Resumo:</strong> ${animal.resumo}</p>
                </div>
                
                <div class="contato-info">
                    <p><strong>Contato:</strong></p>
                    ${animal.emailContato ? `<p>📧 ${animal.emailContato}</p>` : ''}
                    ${animal.telefoneContato ? `<p>📱 ${animal.telefoneContato}</p>` : ''}
                </div>
                
                <button class="btn-contato" 
                        type="button"
                        data-animal-id="${animal.id}"
                        aria-label="Entrar em contato sobre ${animal.nome}">
                     📞 Vi este Animal
                </button>
            </div>
        </article>
    `;
}

// ===== FUNÇÕES AUXILIARES =====
function calcularPeriodo(dataDesaparecimento) {
    if (!dataDesaparecimento) return 'todos';
    
    const dias = calcularDiasDesaparecido(dataDesaparecimento);
    
    if (dias <= 7) return 'ultima-semana';
    if (dias <= 30) return 'ultimo-mes';
    if (dias <= 90) return 'ultimos-3-meses';
    return 'mais-de-3-meses';
}

function calcularDiasDesaparecido(dataDesaparecimento) {
    if (!dataDesaparecimento) return 0;
    
    const data = new Date(dataDesaparecimento);
    const hoje = new Date();
    const diff = hoje - data;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatarData(dataString) {
    if (!dataString) return 'Não informado';
    
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

function formatarBairro(bairro) {
    if (!bairro) return 'Não informado';
    
    return bairro
        .split('_')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
}

function formatarVacinas(vacinas) {
    const nomes = {
        'v8': 'V8',
        'v10': 'V10',
        'raiva': 'Antirrábica',
        'triplice': 'Tríplice Felina',
        'leucemia': 'Leucemia Felina'
    };
    
    return vacinas.map(v => nomes[v] || v).join(', ');
}

function capitalize(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ===== CONFIGURAÇÃO DOS FILTROS =====
function configurarFiltros() {
    const form = document.getElementById('form-filtros');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            aplicarFiltros();
        });

        // ❌ REMOVIDO: Event listeners de 'change' nos selects
        // const selects = form.querySelectorAll('.select-filtro');
        // selects.forEach(select => {
        //     select.addEventListener('change', aplicarFiltros);
        // });
        
        // ✅ AGORA: Os filtros só são aplicados ao clicar no botão "Aplicar Filtros"
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
    const bairro = document.getElementById('bairro').value;
    const periodo = document.getElementById('periodo').value;

    const cards = document.querySelectorAll('.card-animal');
    let animaisVisiveis = 0;

    cards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo');
        const cardSexo = card.getAttribute('data-sexo');
        const cardPorte = card.getAttribute('data-porte');
        const cardBairro = card.getAttribute('data-bairro');
        const cardPeriodo = card.getAttribute('data-periodo');

        let mostrar = true;

        if (tipoAnimal !== 'todos' && cardTipo !== tipoAnimal) {
            mostrar = false;
        }

        if (sexo !== 'todos' && cardSexo !== sexo) {
            mostrar = false;
        }

        if (porte !== 'todos' && cardPorte !== porte) {
            mostrar = false;
        }

        if (bairro !== 'todos' && cardBairro !== bairro) {
            mostrar = false;
        }

        if (periodo !== 'todos' && cardPeriodo !== periodo) {
            mostrar = false;
        }

        if (mostrar) {
            card.style.display = 'block';
            animaisVisiveis++;
        } else {
            card.style.display = 'none';
        }
    });

    atualizarContador(animaisVisiveis);
    mostrarMensagemVazia(animaisVisiveis);
    anunciarResultados(animaisVisiveis);
}

// ===== LIMPAR FILTROS =====
function limparFiltros() {
    const form = document.getElementById('form-filtros');
    
    if (form) {
        form.reset();
        
        const cards = document.querySelectorAll('.card-animal');
        cards.forEach(card => {
            card.style.display = 'block';
        });

        atualizarContador(cards.length);
        mostrarMensagemVazia(cards.length);
        anunciarResultados(cards.length, true);
    }
}

// ===== ATUALIZAR CONTADOR =====
function atualizarContador(quantidade) {
    const contador = document.getElementById('contador-resultados');
    
    if (contador) {
        if (quantidade === undefined) {
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
    const card = document.querySelector(`[data-animal-id="${animalId}"]`);
    
    if (card) {
        const contatoInfo = card.querySelector('.contato-info');
        const paragrafos = contatoInfo.querySelectorAll('p');
        
        let email = '';
        let telefone = '';
        
        paragrafos.forEach(p => {
            const texto = p.textContent;
            if (texto.includes('📧')) {
                email = texto.replace('📧 ', '').trim();
            }
            if (texto.includes('📱')) {
                telefone = texto.replace('📱 ', '').trim();
            }
        });

        mostrarModalContato(nomeAnimal, email, telefone);
    }
}

// ===== MOSTRAR MODAL DE CONTATO =====
function mostrarModalContato(nomeAnimal, email, telefone) {
    const mensagem = `Você está prestes a entrar em contato sobre ${nomeAnimal}.\n\n` +
                    (email ? `Email: ${email}\n` : '') +
                    (telefone ? `Telefone: ${telefone}\n` : '') +
                    `\nDeseja abrir seu aplicativo de email?`;

    if (confirm(mensagem)) {
        const assunto = encodeURIComponent(`Vi o animal perdido: ${nomeAnimal}`);
        const corpo = encodeURIComponent(`Olá,\n\nEu vi o animal ${nomeAnimal} que está perdido.\n\nGostaria de fornecer informações sobre o paradeiro.\n\nAguardo retorno.`);
        
        if (email) {
            window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
        }
    }
}

// ===== LOG PARA DEBUG =====
console.log('✅ Script de listagem carregado');
console.log('📦 window.storage disponível?', storageDisponivel());