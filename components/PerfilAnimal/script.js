// ===== Script do Perfil Animal =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarPerfilAnimal();
});

function storageDisponivel() {
    return typeof window.storage !== 'undefined' && typeof window.storage.get === 'function';
}

// Variáveis globais para o carrossel
let indiceAtual = 0;
let totalItens = 0;

async function inicializarPerfilAnimal() {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');
    const tipo = urlParams.get('tipo'); // 'adocao', 'venda' ou 'perdido'

    if (!animalId || !tipo) {
        mostrarErro();
        return;
    }

    await carregarDadosAnimal(animalId, tipo);
}

async function carregarDadosAnimal(animalId, tipo) {
    try {
        let animais = [];
        const chaveStorage = tipo === 'adocao' ? 'animais_adocao' : 
                            tipo === 'venda' ? 'animais_venda' : 
                            'animais_perdidos';

        console.log('🔍 Procurando animal com ID:', animalId);
        console.log('📦 Tipo:', tipo);
        console.log('🔑 Chave de storage:', chaveStorage);

        // Tentar carregar do storage
        if (storageDisponivel()) {
            try {
                const resultado = await window.storage.get(chaveStorage, true);
                if (resultado && resultado.value) {
                    animais = JSON.parse(resultado.value);
                    console.log('✅ Animais carregados do window.storage:', animais.length);
                }
            } catch (e) {
                console.warn('⚠️ Erro ao ler window.storage:', e);
            }
        } else {
            try {
                const dados = localStorage.getItem(chaveStorage);
                if (dados) {
                    animais = JSON.parse(dados);
                    console.log('✅ Animais carregados do localStorage:', animais.length);
                }
            } catch (e) {
                console.warn('⚠️ Erro ao ler localStorage:', e);
            }
        }

        const animal = animais.find(a => a.id === animalId);
        
        if (animal) {
            console.log('✅ Animal encontrado:', animal);
            console.log('📸 Mídias extras:', animal.midiasExtras);
            preencherPerfil(animal, tipo);
            esconderLoader();
        } else {
            console.error('❌ Animal não encontrado com ID:', animalId);
            mostrarErro();
        }

    } catch (error) {
        console.error('❌ Erro ao carregar dados do animal:', error);
        mostrarErro();
    }
}

function preencherPerfil(animal, tipo) {
    // Nome
    document.getElementById('nome-animal').textContent = animal.nome || 'Nome não informado';
    
    // Imagem principal
    const imagemPrincipal = document.getElementById('imagem-principal');
    imagemPrincipal.src = animal.imagem || '../../assets/images/dog_sentado.svg';
    imagemPrincipal.alt = `Foto de ${animal.nome}`;
    imagemPrincipal.onerror = function() {
        this.src = '../../assets/images/dog_sentado.svg';
    };

    // Badge de tipo
    const badgeTipo = document.getElementById('badge-tipo');
    if (animal.especie === 'cachorro') {
        badgeTipo.textContent = '🐕 Cachorro';
        badgeTipo.className = 'badge-tipo badge-cachorro';
    } else {
        badgeTipo.textContent = '🐱 Gato';
        badgeTipo.className = 'badge-tipo badge-gato';
    }

    // Badge de status
    const badgeStatus = document.getElementById('badge-status');
    if (tipo === 'adocao') {
        badgeStatus.textContent = 'Disponível para Adoção';
        badgeStatus.className = 'badge-status badge-adocao';
    } else if (tipo === 'venda') {
        badgeStatus.textContent = 'Disponível para Compra';
        badgeStatus.className = 'badge-status badge-venda';
    } else {
        badgeStatus.textContent = 'Animal Perdido';
        badgeStatus.className = 'badge-status badge-perdido';
    }

    // Tags rápidas
    document.getElementById('tag-especie').textContent = animal.especie === 'cachorro' ? '🐕 Cachorro' : '🐱 Gato';
    document.getElementById('tag-sexo').textContent = animal.sexo === 'macho' ? '♂ Macho' : '♀ Fêmea';
    document.getElementById('tag-idade').textContent = `🎂 ${animal.idade}`;
    document.getElementById('tag-porte').textContent = `📏 ${capitalize(animal.porte)}`;

    // Preço (apenas para venda)
    if (tipo === 'venda' && animal.valor) {
        const precoContainer = document.getElementById('preco-container');
        const precoValor = document.getElementById('preco-valor');
        precoContainer.style.display = 'block';
        precoValor.textContent = formatarValor(animal.valor);
    }

    // Resumo
    document.getElementById('resumo-texto').textContent = animal.resumo || 'Informações não disponíveis';

    // Localização
    document.getElementById('localizacao-texto').textContent = formatarBairro(animal.localizacao) + ', Salvador-BA';

    // Data de desaparecimento (apenas para perdidos)
    if (tipo === 'perdido' && animal.dataDesaparecimento) {
        const container = document.getElementById('data-desaparecimento-container');
        container.style.display = 'flex';
        document.getElementById('tempo-desaparecimento').textContent = calcularTempoDesaparecimento(animal.dataDesaparecimento);
    }

    // Detalhes
    document.getElementById('det-especie').textContent = animal.especie === 'cachorro' ? 'Cachorro' : 'Gato';
    document.getElementById('det-raca').textContent = animal.raca || 'Não informado';
    document.getElementById('det-cor').textContent = animal.cor || 'Não informado';
    document.getElementById('det-sexo').textContent = animal.sexo === 'macho' ? 'Macho' : 'Fêmea';
    document.getElementById('det-idade').textContent = animal.idade || 'Não informado';
    document.getElementById('det-porte').textContent = capitalize(animal.porte) || 'Não informado';

    // Saúde
    const vacinasTexto = animal.vacinas && animal.vacinas.length > 0 
        ? `Sim (${formatarVacinas(animal.vacinas)})` 
        : (animal.vacinado === 'sim' ? 'Sim' : 'Não');
    
    document.getElementById('det-vacinado').textContent = vacinasTexto;
    document.getElementById('det-castrado').textContent = animal.castrado === 'sim' ? 'Sim' : 'Não';
    document.getElementById('det-vermifugado').textContent = animal.vermifugado === 'sim' ? 'Sim' : 'Não';

    // Temperamento (se houver)
    if (animal.temperamento) {
        document.getElementById('label-temperamento').style.display = 'block';
        document.getElementById('det-temperamento').style.display = 'block';
        document.getElementById('det-temperamento').textContent = animal.temperamento;
    }

    // Descrição completa (se houver)
    if (animal.descricaoCompleta) {
        document.getElementById('card-descricao').style.display = 'block';
        document.getElementById('det-descricao').textContent = animal.descricaoCompleta;
    }

    // Contato
    if (animal.emailContato) {
        const emailContainer = document.getElementById('contato-email-container');
        emailContainer.style.display = 'flex';
        document.getElementById('contato-email').textContent = animal.emailContato;
    }

    if (animal.telefoneContato) {
        const telefoneContainer = document.getElementById('contato-telefone-container');
        telefoneContainer.style.display = 'flex';
        document.getElementById('contato-telefone').textContent = animal.telefoneContato;
    }

    // Botão de ação principal
    const btnAcao = document.getElementById('btn-acao-principal');
    if (tipo === 'adocao') {
        btnAcao.textContent = '🐾 Quero Adotar';
        btnAcao.onclick = () => contatarSobre(animal, 'adotar');
    } else if (tipo === 'venda') {
        btnAcao.textContent = '💰 Tenho Interesse';
        btnAcao.onclick = () => contatarSobre(animal, 'comprar');
    } else {
        btnAcao.textContent = '📞 Entrar em Contato';
        btnAcao.onclick = () => contatarSobre(animal, 'informar');
    }

    // Botão de contato rápido
    const btnContatoRapido = document.getElementById('btn-contato-rapido');
    btnContatoRapido.textContent = '📧 Enviar Email';
    btnContatoRapido.onclick = () => contatarSobre(animal, tipo === 'adocao' ? 'adotar' : tipo === 'venda' ? 'comprar' : 'informar');

    // ✅ CORRIGIDO: Carregar galeria de mídias extras
    if (animal.midiasExtras && animal.midiasExtras.length > 0) {
        console.log('📸 Carregando galeria com', animal.midiasExtras.length, 'itens');
        carregarGaleria(animal.midiasExtras);
    } else {
        console.log('ℹ️ Nenhuma mídia extra encontrada');
    }
}

// ✅ CORRIGIDO: Função que carrega a galeria
function carregarGaleria(midias) {
    const secaoGaleria = document.getElementById('secao-galeria');
    const carrossel = document.getElementById('carrossel');
    const indicadores = document.getElementById('carrossel-indicadores');
    
    secaoGaleria.style.display = 'block';
    carrossel.innerHTML = '';
    indicadores.innerHTML = '';
    
    totalItens = midias.length;
    
    midias.forEach((midia, index) => {
        const item = document.createElement('div');
        item.className = 'carrossel-item';
        
        // ✅ CORRIGIDO: Usar midia.src ao invés de midia.url
        if (midia.tipo === 'video') {
            const video = document.createElement('video');
            video.src = midia.src; // ✅ MUDADO DE midia.url PARA midia.src
            video.controls = true;
            video.className = 'carrossel-media';
            item.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = midia.src; // ✅ MUDADO DE midia.url PARA midia.src
            img.alt = `Foto ${index + 1} do animal`;
            img.className = 'carrossel-media';
            img.onerror = function() {
                this.src = '../../assets/images/dog_sentado.svg';
            };
            item.appendChild(img);
        }
        
        carrossel.appendChild(item);
        
        // Criar indicador
        const indicador = document.createElement('button');
        indicador.className = 'indicador';
        indicador.setAttribute('aria-label', `Ir para item ${index + 1}`);
        indicador.onclick = () => irParaItem(index);
        indicadores.appendChild(indicador);
    });
    
    // Configurar botões do carrossel
    document.querySelector('.btn-prev').onclick = () => navegarCarrossel(-1);
    document.querySelector('.btn-next').onclick = () => navegarCarrossel(1);
    
    // Mostrar primeiro item
    atualizarCarrossel();
}

function navegarCarrossel(direcao) {
    indiceAtual += direcao;
    
    if (indiceAtual < 0) {
        indiceAtual = totalItens - 1;
    } else if (indiceAtual >= totalItens) {
        indiceAtual = 0;
    }
    
    atualizarCarrossel();
}

function irParaItem(index) {
    indiceAtual = index;
    atualizarCarrossel();
}

function atualizarCarrossel() {
    const carrossel = document.getElementById('carrossel');
    const indicadores = document.querySelectorAll('.indicador');
    
    // Mover carrossel
    const deslocamento = -indiceAtual * 100;
    carrossel.style.transform = `translateX(${deslocamento}%)`;
    
    // Atualizar indicadores
    indicadores.forEach((ind, i) => {
        if (i === indiceAtual) {
            ind.classList.add('ativo');
        } else {
            ind.classList.remove('ativo');
        }
    });
}

function calcularTempoDesaparecimento(dataDesaparecimento) {
    if (!dataDesaparecimento) return 'Data não informada';
    
    const dataPerdido = new Date(dataDesaparecimento + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(hoje - dataPerdido);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Desapareceu hoje';
    } else if (diffDays === 1) {
        return '1 dia';
    } else if (diffDays <= 30) {
        return `${diffDays} dias`;
    } else {
        const meses = Math.floor(diffDays / 30);
        const diasRestantes = diffDays % 30;
        
        if (diasRestantes === 0) {
            return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
        } else {
            return `${meses} ${meses === 1 ? 'mês' : 'meses'} e ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`;
        }
    }
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

async function contatarSobre(animal, acao) {
    const email = animal.emailContato;
    const telefone = animal.telefoneContato;
    
    if (!email && !telefone) {
        await alertaErro(
            'Contato Indisponível',
            'Informações de contato não disponíveis para este animal.'
        );
        return;
    }
    
    let titulo = '';
    let mensagem = '';
    let assunto = '';
    let corpo = '';
    
    if (acao === 'adotar') {
        titulo = '🐾 Adotar ' + animal.nome;
        mensagem = 'Você demonstrou interesse em adotar <strong>' + animal.nome + '</strong>.<br><br>Deseja abrir seu aplicativo de email para entrar em contato?';
        assunto = 'Interesse em adotar: ' + animal.nome;
        corpo = 'Olá,\n\nTenho interesse em adotar o(a) ' + animal.nome + '.\n\nGostaria de mais informações sobre o processo de adoção.\n\nAguardo retorno.';
    } else if (acao === 'comprar') {
        const valorFormatado = formatarValor(animal.valor);
        titulo = '💰 Comprar ' + animal.nome;
        mensagem = 'Você demonstrou interesse em comprar <strong>' + animal.nome + '</strong> por <strong>' + valorFormatado + '</strong>.<br><br>Deseja abrir seu aplicativo de email?';
        assunto = 'Interesse em comprar: ' + animal.nome;
        corpo = 'Olá,\n\nTenho interesse em comprar o(a) ' + animal.nome + ' anunciado(a) por ' + valorFormatado + '.\n\nGostaria de mais informações.\n\nAguardo retorno.';
    } else {
        titulo = '📞 Informações sobre ' + animal.nome;
        mensagem = 'Você quer fornecer informações sobre <strong>' + animal.nome + '</strong> perdido(a).<br><br>Deseja abrir seu aplicativo de email?';
        assunto = 'Informações sobre: ' + animal.nome;
        corpo = 'Olá,\n\nVi o anúncio sobre ' + animal.nome + ' perdido(a).\n\nGostaria de fornecer informações.\n\nAguardo retorno.';
    }
    
    const confirmado = await confirmarModal(
        titulo,
        mensagem,
        {
            email: email || null,
            telefone: telefone || null
        }
    );
    
    if (confirmado) {
        if (email) {
            window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
        } else {
            await alertaAviso(
                'Email Indisponível',
                'Email não disponível. Entre em contato pelo telefone: ' + telefone
            );
        }
    }
}


function mostrarErro() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('erro-container').style.display = 'flex';
}

function esconderLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('perfil-container').style.display = 'block';
}

console.log('✅ Script do Perfil Animal carregado');