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
    
    configurarBotoesInteress();
}

// ===== CRIAR HTML DO CARD =====
function criarCardAnimal(animal) {
    const categoriaIdade = calcularCategoriaIdade(animal.idade);
    const faixaValor = calcularFaixaValor(animal.valor);
    
    // Formatar vacinas
    const vacinasTexto = animal.vacinas && animal.vacinas.length > 0 
        ? `Sim (${formatarVacinas(animal.vacinas)})` 
        : (animal.vacinado === 'sim' ? 'Sim' : 'Não');
    
    // Badge de tipo (ESQUERDA)
    const badgeTipo = animal.especie === 'cachorro' 
        ? '<span class="badge-tipo badge-cachorro">🐕 Gato</span>'
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
                 data-valor="${faixaValor}"
                 onclick="abrirPerfil('${animal.id}')"
                 style="cursor: pointer;"
                 title="Clique para ver o perfil completo de ${animal.nome}">
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
                     
                    <dt>Localização:</dt>
                    <dd><span class="icone-info">📍</span> ${bairroFormatado}, Salvador-BA</dd>
                </dl>
                
                <div class="preco-destaque">
                    <p class="valor">${valorFormatado}</p>
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

// ===== ABRIR PERFIL DO ANIMAL =====
function abrirPerfil(animalId) {
    window.location.href = `../PerfilAnimal/index.html?id=${animalId}&tipo=venda`;
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

// ===== CONFIGURAR BOTÕES DE COMPRAR =====
function configurarBotoesInteress() {
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.stopPropagation();
            const animalId = this.getAttribute('data-animal-id');
            const nomeAnimal = this.closest('.card-animal').querySelector('.nome-animal').textContent;
            
            demonstrarInteresse(animalId, nomeAnimal);
        });
    });
}

// ===== DEMONSTRAR INTERESSE =====
async function demonstrarInteresse(animalId, nomeAnimal) {
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
        const valorFormatado = formatarValor(animal.valor);
        await mostrarModalCompra(nomeAnimal, valorFormatado, animal.emailContato, animal.telefoneContato);
        } else {
            await alertaErro('Erro', 'Erro ao buscar informações do animal. Tente novamente.');
        }
        
    } catch (error) {
        console.error('Erro ao demonstrar interesse:', error);
        alert('Erro ao processar sua solicitação. Tente novamente.');
    }
}

// ===== MOSTRAR MODAL DE COMPRA =====
async function mostrarModalCompra(nomeAnimal, valorAnimal, email, telefone) {
    const confirmado = await confirmarModal(
        '💰 Comprar ' + nomeAnimal,
        'Você está interessado em comprar <strong>' + nomeAnimal + '</strong> por <strong>' + valorAnimal + '</strong>.<br><br>Deseja abrir seu aplicativo de email?',
        {
            email: email || null,
            telefone: telefone || null
        }
    );
    
    if (confirmado) {
        const assunto = encodeURIComponent('Interesse em comprar: ' + nomeAnimal);
        const corpo = encodeURIComponent('Olá,\n\nTenho interesse em comprar o(a) ' + nomeAnimal + ' anunciado(a) por ' + valorAnimal + '.\n\nGostaria de mais informações sobre o animal e as condições de compra.\n\nAguardo retorno.');
        
        if (email) {
            window.location.href = 'mailto:' + email + '?subject=' + assunto + '&body=' + corpo;
        } else {
            await alertaAviso(
                'Email Indisponível',
                'Email não disponível. Entre em contato pelo telefone: ' + telefone
            );
        }
    }
}

// ===== LOG PARA DEBUG =====
console.log('✅ Script de listagem de compra carregado');
console.log('📦 window.storage disponível?', storageDisponivel());

// ===== FUNÇÃO DE DEBUG =====
window.testarStorageCompra = async function() {
    console.log('🔍 Testando storage na página de compra...');
    
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

console.log('💡 Execute window.testarStorageCompra() no console para verificar os dados');