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
            console.log('📦 Tentando carregar do window.storage...');
            try {
                const resultado = await window.storage.get('animais_venda', true);
                console.log('📦 Resultado do storage:', resultado);
                
                if (resultado && resultado.value) {
                    animais = JSON.parse(resultado.value);
                    console.log('✅ Animais carregados do window.storage:', animais.length);
                }
            } catch (error) {
                console.log('⚠️ Erro ao carregar do window.storage:', error);
            }
        } else {
            console.log('📦 Usando localStorage como fallback');
            try {
                const dados = localStorage.getItem('animais_venda');
                if (dados) {
                    animais = JSON.parse(dados);
                    console.log('✅ Animais carregados do localStorage:', animais.length);
                }
            } catch (error) {
                console.log('⚠️ Erro ao carregar do localStorage:', error);
            }
        }
        
        if (animais.length > 0) {
            grid.innerHTML = '';
            adicionarAnimaisNaGrid(animais);
            console.log(`✅ ${animais.length} animais exibidos na página`);
        } else {
            console.log('ℹ️ Nenhum animal cadastrado ainda');
            mostrarMensagemVazia(0);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar animais:', error);
        grid.innerHTML = '<div class="erro"><p>Erro ao carregar animais. Por favor, recarregue a página.</p></div>';
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
    
    configurarBotoesInteresse();
}

// ===== CRIAR HTML DO CARD =====
function criarCardAnimal(animal) {
    const categoriaIdade = calcularCategoriaIdade(animal.idade);
    const faixaValor = calcularFaixaValor(animal.valor);
    
    // Formatar vacinas
    const vacinasTexto = animal.vacinas && animal.vacinas.length > 0 
        ? `Sim (${formatarVacinas(animal.vacinas)})` 
        : (animal.vacinado === 'sim' ? 'Sim' : 'Não');
    
    // Badge de tipo
    const badgeTipo = animal.especie === 'cachorro' 
        ? '<span class="badge-tipo badge-cachorro">🐕 Cachorro</span>'
        : '<span class="badge-tipo badge-gato">🐱 Gato</span>';
    
    // Valor
    const valorFormatado = formatarValor(animal.valor);

    // Badge preço
    const badgePreco = `<span class="badge-preco">${valorFormatado}</span>`;
     
    // Imagem
    const imagemSrc = animal.imagem || '../../assets/images/dog_sentado.svg';
    
    // Nome bairro formatado
    const bairroFormatado = formatarBairro(animal.localizacao);
    
    return `
        <article class="card-animal" 
                 data-animal-id="${animal.id}" 
                 data-tipo="${animal.especie}" 
                 data-sexo="${animal.sexo}"
                 data-porte="${animal.porte}"
                 data-idade="${categoriaIdade}"
                 data-cor="${animal.cor}"
                 data-bairro="${animal.localizacao}"
                 data-valor="${faixaValor}">
            <div class="card-imagem">
                <img src="${imagemSrc}" 
                     alt="${animal.nome} - ${animal.especie} ${animal.raca} à venda" 
                     class="imagem-animal"
                     loading="lazy"
                     width="200"
                     height="200"
                     onerror="this.src='../../assets/images/dog_sentado.svg'">
                ${badgeTipo}
                ${badgePreco}
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
                    
                    <dt>Localização:</dt>
                    <dd><span class="icone-info">📍</span> ${bairroFormatado}, Salvador-BA</dd>
                </dl>
                
                <div class="resumo">
                    <p><strong>Resumo:</strong> ${animal.resumo || 'Informações não disponíveis'}</p>
                </div>
                
                <div class="preco-destaque">
                    <p class="valor">${valorFormatado}</p>
                </div>
                
                <div class="contato-info">
                    <p><strong>Contato:</strong></p>
                    ${animal.emailContato ? `<p>📧 ${animal.emailContato}</p>` : ''}
                    ${animal.telefoneContato ? `<p>📱 ${animal.telefoneContato}</p>` : ''}
                </div>
                
                <button class="btn-interessado" 
                        type="button"
                        data-animal-id="${animal.id}"
                        aria-label="Demonstrar interesse em ${animal.nome}">
                     💰 Tenho Interesse
                </button>
            </div>
        </article>
    `;
}

// ===== FUNÇÕES AUXILIARES =====
function calcularCategoriaIdade(idadeTexto) {
    if (!idadeTexto) return 'todas';
    
    const idade = idadeTexto.toLowerCase();
    const match = idade.match(/(\d+)/);
    if (!match) return 'todas';
    
    const anos = parseInt(match[1]);
    
    if (idade.includes('mes') || idade.includes('mês')) {
        return 'filhote';
    }
    
    if (anos <= 1) return 'filhote';
    if (anos <= 7) return 'adulto';
    return 'idoso';
}

function calcularFaixaValor(valor) {
    if (!valor && valor !== 0) return 'todos';
    
    let valorNumerico;
    
    if (typeof valor === 'number') {
        valorNumerico = valor;
    } else if (typeof valor === 'string') {
        valorNumerico = parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
    } else {
        return 'todos';
    }
    
    if (isNaN(valorNumerico)) return 'todos';
    
    if (valorNumerico <= 500) return 'ate-500';
    if (valorNumerico <= 1000) return '501-1000';
    if (valorNumerico <= 2000) return '1001-2000';
    if (valorNumerico <= 3000) return '2001-3000';
    return 'acima-3000';
}

function formatarValor(valor) {
    if (!valor && valor !== 0) return 'Valor não informado';
    
    let valorNumerico;
    
    if (typeof valor === 'number') {
        valorNumerico = valor;
    } else if (typeof valor === 'string') {
        if (valor.includes('R$')) return valor;
        valorNumerico = parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
    } else {
        return 'Valor não informado';
    }
    
    if (isNaN(valorNumerico)) return 'Valor não informado';
    
    return `R$ ${valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const porte = document.getElementById('porte').value;
    const valor = document.getElementById('valor').value;
    const bairro = document.getElementById('bairro').value;

    const cards = document.querySelectorAll('.card-animal');
    let animaisVisiveis = 0;

    cards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo');
        const cardIdade = card.getAttribute('data-idade');
        const cardSexo = card.getAttribute('data-sexo');
        const cardPorte = card.getAttribute('data-porte');
        const cardValor = card.getAttribute('data-valor');
        const cardBairro = card.getAttribute('data-bairro');

        let mostrar = true;

        if (tipoAnimal !== 'todos' && cardTipo !== tipoAnimal) mostrar = false;
        if (idade !== 'todas' && cardIdade !== idade) mostrar = false;
        if (sexo !== 'todos' && cardSexo !== sexo) mostrar = false;
        if (porte !== 'todos' && cardPorte !== porte) mostrar = false;
        if (valor !== 'todos' && cardValor !== valor) mostrar = false;
        if (bairro !== 'todos' && cardBairro !== bairro) mostrar = false;

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
            ? '1 animal encontrado' 
            : `${quantidade} animais encontrados`;
        
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

// ===== CONFIGURAR BOTÕES DE INTERESSE =====
function configurarBotoesInteresse() {
    const botoesInteresse = document.querySelectorAll('.btn-interessado');
    
    botoesInteresse.forEach(botao => {
        botao.addEventListener('click', function() {
            const animalId = this.getAttribute('data-animal-id');
            const nomeAnimal = this.closest('.card-animal').querySelector('.nome-animal').textContent;
            const valorAnimal = this.closest('.card-animal').querySelector('.preco-destaque .valor').textContent;
            
            demonstrarInteresse(animalId, nomeAnimal, valorAnimal);
        });
    });
}

// ===== DEMONSTRAR INTERESSE =====
async function demonstrarInteresse(animalId, nomeAnimal, valorAnimal) {
    try {
        let animais = [];
        
        if (storageDisponivel()) {
            const resultado = await window.storage.get('animais_venda', true);
            if (resultado && resultado.value) {
                animais = JSON.parse(resultado.value);
            }
        } else {
            const dados = localStorage.getItem('animais_venda');
            if (dados) {
                animais = JSON.parse(dados);
            }
        }
        
        const animal = animais.find(a => a.id === animalId);
        
        if (animal) {
            mostrarModalInteresse(nomeAnimal, valorAnimal, animal.emailContato, animal.telefoneContato);
        } else {
            alert('Erro ao buscar informações do animal. Tente novamente.');
        }
        
    } catch (error) {
        console.error('Erro ao demonstrar interesse:', error);
        alert('Erro ao processar sua solicitação. Tente novamente.');
    }
}

// ===== MOSTRAR MODAL DE INTERESSE =====
function mostrarModalInteresse(nomeAnimal, valorAnimal, email, telefone) {
    const mensagem = `Você está interessado em comprar ${nomeAnimal} por ${valorAnimal}.\n\n` +
                    'Informações de contato do vendedor:\n' +
                    (email ? `Email: ${email}\n` : '') +
                    (telefone ? `Telefone: ${telefone}\n` : '') +
                    `\nDeseja abrir seu aplicativo de email para entrar em contato?`;

    if (confirm(mensagem)) {
        const assunto = encodeURIComponent(`Interesse em comprar: ${nomeAnimal}`);
        const corpo = encodeURIComponent(`Olá,\n\nTenho interesse em comprar o(a) ${nomeAnimal} anunciado(a) por ${valorAnimal}.\n\nGostaria de mais informações sobre o animal e as condições de compra.\n\nAguardo retorno.`);
        
        if (email) {
            window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
        } else {
            alert('Email de contato não disponível. Por favor, entre em contato pelo telefone: ' + telefone);
        }
    }
}

// ===== LOG PARA DEBUG =====
console.log('✅ Script de listagem de compra carregado');
console.log('📦 window.storage disponível?', storageDisponivel());

// ===== FUNÇÃO DE DEBUG =====
window.testarStorageListagem = async function() {
    console.log('🔍 Testando storage na página de listagem...');
    
    if (storageDisponivel()) {
        try {
            const resultado = await window.storage.get('animais_venda', true);
            console.log('📦 Resultado:', resultado);
            
            if (resultado && resultado.value) {
                const animais = JSON.parse(resultado.value);
                console.log('🐾 Total de animais:', animais.length);
                console.log('🐾 Animais:', animais);
            } else {
                console.log('⚠️ Nenhum dado encontrado');
            }
        } catch (error) {
            console.error('❌ Erro:', error);
        }
    } else {
        console.log('📦 Verificando localStorage...');
        const dados = localStorage.getItem('animais_venda');
        if (dados) {
            const animais = JSON.parse(dados);
            console.log('🐾 Animais no localStorage:', animais);
        } else {
            console.log('⚠️ Nenhum dado no localStorage');
        }
    }
}

console.log('💡 Execute window.testarStorageListagem() no console para verificar os dados');

// ===== CSS ADICIONAL PARA RESUMO E CONTATO =====
// Adicione ao styles.css:
/*
.resumo {
    background: #fce4e4;
    border-left: 4px solid #a66666;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
}

.resumo p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #000000;
}

.resumo strong {
    color: #a66666;
}

.contato-info {
    background: #f0f9ff;
    border-left: 4px solid #3b82f6;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
}

.contato-info p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #1e3a8a;
}

.contato-info p:first-child {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1e40af;
}
*/