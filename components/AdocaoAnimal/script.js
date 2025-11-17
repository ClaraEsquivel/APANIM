// ===== Script de listagem de adoção =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaAdocao();
});

function storageDisponivel() {
    return typeof window.storage !== 'undefined' && typeof window.storage.get === 'function';
}

async function inicializarPaginaAdocao() {
    await carregarAnimaisParaAdocao();
    configurarFiltros();
    configurarBotoes();
    atualizarContador();
}

async function carregarAnimaisParaAdocao() {
    const grid = document.getElementById('grid-animais');
    grid.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando animais...</p></div>';

    try {
        let animais = [];

        if (storageDisponivel()) {
            try {
                const resultado = await window.storage.get('animais_adocao', true);
                if (resultado && resultado.value) {
                    animais = JSON.parse(resultado.value);
                }
            } catch (e) {
                console.warn('Erro ao ler window.storage (adoção):', e);
            }
        } else {
            try {
                const dados = localStorage.getItem('animais_adocao');
                if (dados) animais = JSON.parse(dados);
            } catch (e) {
                console.warn('Erro ao ler localStorage (adoção):', e);
            }
        }

        if (animais.length > 0) {
            grid.innerHTML = '';
            adicionarAnimaisNaGridAdocao(animais);
        } else {
            mostrarMensagemVazia(0);
        }

    } catch (error) {
        console.error('Erro ao carregar animais para adoção:', error);
        grid.innerHTML = '<div class="erro"><p>Erro ao carregar animais. Recarregue a página.</p></div>';
        mostrarMensagemVazia(0);
    }
}

function adicionarAnimaisNaGridAdocao(animais) {
    const grid = document.getElementById('grid-animais');
    animais.forEach(animal => {
        const card = criarCardAnimalAdocao(animal);
        grid.insertAdjacentHTML('beforeend', card);
    });
    configurarBotoesAdotar();
}

function criarCardAnimalAdocao(animal) {
    const categoriaIdade = calcularCategoriaIdade(animal.idade);
    const vacinasTexto = animal.vacinas && animal.vacinas.length > 0 ? `Sim (${formatarVacinas(animal.vacinas)})` : (animal.vacinado === 'sim' ? 'Sim' : 'Não');
    const badgeTipo = animal.especie === 'cachorro' ? '<span class="badge-tipo badge-cachorro">🐕 Cachorro</span>' : '<span class="badge-tipo badge-gato">🐱 Gato</span>';
    const imagemSrc = animal.imagem || '../../assets/images/dog_sentado.svg';
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
                 onclick="abrirPerfil('${animal.id}')"
                 style="cursor: pointer;"
                 title="Clique para ver o perfil completo de ${animal.nome}">
            <div class="card-imagem">
                <img src="${imagemSrc}" alt="${animal.nome} - ${animal.especie} ${animal.raca} para adoção" class="imagem-animal" loading="lazy" width="200" height="200" onerror="this.src='../../assets/images/dog_sentado.svg'">
                ${badgeTipo}
                <span class="badge-adocao">Disponível para Adoção</span>
            </div>
            <div class="card-info">
                <h3 class="nome-animal">${animal.nome}</h3>
                <dl class="detalhes-animal">
                
                    <dt>Idade:</dt>
                    <dd><span class="icone-info">🎂</span> ${animal.idade}</dd>

                    <dt>Sexo:</dt>
                    <dd class="sexo" data-sexo="${animal.sexo}"><span class="icone-info">${animal.sexo === 'macho' ? '♂' : '♀'}</span> ${animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}</dd>

                    <dt>Localização:</dt>
                    <dd><span class="icone-info">📍</span> ${bairroFormatado}, Salvador-BA</dd>

                </dl>
                <button class="btn-adotar" type="button" data-animal-id="${animal.id}" aria-label="Manifestar interesse em adotar ${animal.nome}" onclick="event.stopPropagation(); solicitarAdocao('${animal.id}', '${animal.nome}');">
                    🐾 Quero Adotar
                </button>
            </div>
        </article>
    `;
}

// ===== ABRIR PERFIL DO ANIMAL =====
function abrirPerfil(animalId) {
    window.location.href = `../PerfilAnimal/index.html?id=${animalId}&tipo=adocao`;
}

function calcularCategoriaIdade(idadeTexto) {
    if (!idadeTexto) return 'todas';
    const idade = idadeTexto.toLowerCase();
    const match = idade.match(/(\d+)/);
    if (!match) return 'todas';
    const anos = parseInt(match[1]);
    if (idade.includes('mes') || idade.includes('mês')) return 'filhote';
    if (anos <= 1) return 'filhote';
    if (anos <= 7) return 'adulto';
    return 'idoso';
}

function formatarVacinas(vacinas) {
    const nomes = { 'v8': 'V8', 'v10': 'V10', 'raiva': 'Antirrábica', 'triplice': 'Tríplice Felina', 'leucemia': 'Leucemia Felina' };
    return vacinas.map(v => nomes[v] || v).join(', ');
}

function formatarBairro(bairro) {
    if (!bairro) return 'Não informado';
    return bairro.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
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

function configurarBotoes() {
    const btnLimpar = document.getElementById('limpar-filtros');
    if (btnLimpar) btnLimpar.addEventListener('click', limparFiltros);
}

function aplicarFiltros() {
    const tipoAnimal = document.getElementById('tipo_animal').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const porte = document.getElementById('porte').value;
    const bairro = document.getElementById('bairro').value;

    const cards = document.querySelectorAll('.card-animal');
    let visiveis = 0;

    cards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo');
        const cardIdade = card.getAttribute('data-idade');
        const cardSexo = card.getAttribute('data-sexo');
        const cardPorte = card.getAttribute('data-porte');
        const cardBairro = card.getAttribute('data-bairro');

        let mostrar = true;
        if (tipoAnimal !== 'todos' && cardTipo !== tipoAnimal) mostrar = false;
        if (idade !== 'todas' && cardIdade !== idade) mostrar = false;
        if (sexo !== 'todos' && cardSexo !== sexo) mostrar = false;
        if (porte !== 'todos' && cardPorte !== porte) mostrar = false;
        if (bairro !== 'todos' && cardBairro !== bairro) mostrar = false;

        if (mostrar) { card.style.display = 'block'; visiveis++; } else { card.style.display = 'none'; }
    });

    atualizarContador(visiveis);
    mostrarMensagemVazia(visiveis);
    anunciarResultados(visiveis);
}

function limparFiltros() {
    const form = document.getElementById('form-filtros');
    if (form) {
        form.reset();
        const cards = document.querySelectorAll('.card-animal');
        cards.forEach(c => c.style.display = 'block');
        atualizarContador(cards.length);
        mostrarMensagemVazia(cards.length);
        anunciarResultados(cards.length, true);
    }
}

function atualizarContador(quantidade) {
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        if (quantidade === undefined) {
            const visiveis = document.querySelectorAll('.card-animal:not([style*="display: none"])');
            quantidade = visiveis.length;
        }
        contador.textContent = quantidade === 1 ? '1 animal encontrado' : `${quantidade} animais encontrados`;
    }
}

function mostrarMensagemVazia(quantidade) {
    const mensagemVazia = document.getElementById('mensagem-vazia');
    const gridAnimais = document.getElementById('grid-animais');
    if (mensagemVazia) {
        if (quantidade === 0) { mensagemVazia.style.display = 'block'; if (gridAnimais) gridAnimais.style.display = 'none'; }
        else { mensagemVazia.style.display = 'none'; if (gridAnimais) gridAnimais.style.display = 'grid'; }
    }
}

function anunciarResultados(quantidade, foiLimpo = false) {
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        if (foiLimpo) contador.setAttribute('aria-live', 'polite');
        setTimeout(() => { contador.setAttribute('aria-live', 'polite'); }, 100);
    }
}

function configurarBotoesAdotar() {
    const botoes = document.querySelectorAll('.btn-adotar');
    botoes.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que o clique no botão abra o perfil
            const animalId = this.getAttribute('data-animal-id');
            const nome = this.closest('.card-animal').querySelector('.nome-animal').textContent;
            solicitarAdocao(animalId, nome);
        });
    });
}

async function solicitarAdocao(animalId, nomeAnimal) {
    try {
        let animais = [];
        if (storageDisponivel()) {
            const res = await window.storage.get('animais_adocao', true);
            if (res && res.value) animais = JSON.parse(res.value);
        } else {
            const dados = localStorage.getItem('animais_adocao');
            if (dados) animais = JSON.parse(dados);
        }

        const animal = animais.find(a => a.id === animalId);
        if (animal) {
        await mostrarModalAdocao(nomeAnimal, animal.emailContato, animal.telefoneContato);
    } else {
        await alertaErro('Erro', 'Erro ao buscar informações do animal. Tente novamente.');
    }
    } catch (e) {
        console.error('Erro ao solicitar adoção:', e);
        alert('Erro ao processar sua solicitação. Tente novamente.');
    }
}

async function mostrarModalAdocao(nomeAnimal, email, telefone) {
    const confirmado = await confirmarModal(
        '🐾 Adotar ' + nomeAnimal,
        'Você demonstrou interesse em adotar <strong>' + nomeAnimal + '</strong>.<br><br>Deseja abrir seu aplicativo de email para entrar em contato?',
        {
            email: email || null,
            telefone: telefone || null
        }
    );
    
    if (confirmado) {
        const assunto = encodeURIComponent('Interesse em adotar: ' + nomeAnimal);
        const corpo = encodeURIComponent('Olá,\n\nTenho interesse em adotar o(a) ' + nomeAnimal + ' anunciado(a).\n\nGostaria de receber informações sobre procedimentos para adoção e agendar uma visita.\n\nAguardo retorno.');
        
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


console.log('✅ Script de adoção carregado');
console.log('📦 window.storage disponível?', storageDisponivel());

window.testarStorageAdocao = async function() {
    console.log('🔍 Testando storage na página de adoção...');
    if (storageDisponivel()) {
        try {
            const res = await window.storage.get('animais_adocao', true);
            console.log('📦 Resultado:', res);
            if (res && res.value) {
                const animais = JSON.parse(res.value);
                console.log('🐾 Total de animais para adoção:', animais.length, animais);
            } else console.log('⚠️ Nenhum dado encontrado');
        } catch (e) { console.error('❌ Erro:', e); }
    } else {
        const dados = localStorage.getItem('animais_adocao');
        if (dados) console.log('🐾 Animais no localStorage:', JSON.parse(dados));
        else console.log('⚠️ Nenhum dado no localStorage');
    }
}