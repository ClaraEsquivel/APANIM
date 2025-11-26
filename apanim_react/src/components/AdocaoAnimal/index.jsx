import { useState, useEffect } from 'react';
import MenuUnificado from '../MenuUnificado';
import '../../components/ScrollTop/scroll-top.js';
import './style.css';
import '../../components/MenuUnificado/menu-styles.css';
import '../../components/MenuUnificado/header-unificado.css';
import '../../components/MenuUnificado/footer-unificado.css';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

// ===== COMPONENTE PRINCIPAL DE ADOÇÃO =====
const AdocaoAnimais = () => {
    const [animais, setAnimais] = useState([]);
    const [animaisFiltrados, setAnimaisFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtros, setFiltros] = useState({
        tipo_animal: 'todos',
        idade: 'todas',
        sexo: 'todos',
        porte: 'todos',
        bairro: 'todos'
    });

    // ===== EFEITO PARA CARREGAR ANIMAIS =====
    useEffect(() => {
        carregarAnimaisParaAdocao();
    }, []);

    useEffect(() => {
        aplicarFiltros();
    }, [filtros, animais]);

    // ===== FUNÇÕES DE STORAGE =====
    const storageDisponivel = () => {
        return typeof window.storage !== 'undefined' && typeof window.storage.get === 'function';
    };

    const carregarAnimaisParaAdocao = async () => {
        setLoading(true);
        try {
            let animaisCarregados = [];

            if (storageDisponivel()) {
                try {
                    const resultado = await window.storage.get('animais_adocao', true);
                    if (resultado && resultado.value) {
                        animaisCarregados = JSON.parse(resultado.value);
                    }
                } catch (e) {
                    console.warn('Erro ao ler window.storage (adoção):', e);
                }
            } else {
                try {
                    const dados = localStorage.getItem('animais_adocao');
                    if (dados) animaisCarregados = JSON.parse(dados);
                } catch (e) {
                    console.warn('Erro ao ler localStorage (adoção):', e);
                }
            }

            setAnimais(animaisCarregados);
            setAnimaisFiltrados(animaisCarregados);
        } catch (error) {
            console.error('Erro ao carregar animais para adoção:', error);
        } finally {
            setLoading(false);
        }
    };

    // ===== FUNÇÕES DE FILTRO =====
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const aplicarFiltros = () => {
        let resultado = [...animais];

        if (filtros.tipo_animal !== 'todos') {
            resultado = resultado.filter(animal => animal.especie === filtros.tipo_animal);
        }

        if (filtros.idade !== 'todas') {
            resultado = resultado.filter(animal =>
                calcularCategoriaIdade(animal.idade) === filtros.idade
            );
        }

        if (filtros.sexo !== 'todos') {
            resultado = resultado.filter(animal => animal.sexo === filtros.sexo);
        }

        if (filtros.porte !== 'todos') {
            resultado = resultado.filter(animal => animal.porte === filtros.porte);
        }

        if (filtros.bairro !== 'todos') {
            resultado = resultado.filter(animal => animal.localizacao === filtros.bairro);
        }

        setAnimaisFiltrados(resultado);
    };

    const limparFiltros = () => {
        setFiltros({
            tipo_animal: 'todos',
            idade: 'todas',
            sexo: 'todos',
            porte: 'todos',
            bairro: 'todos'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        aplicarFiltros();
    };

    // ===== FUNÇÕES AUXILIARES =====
    const calcularCategoriaIdade = (idadeTexto) => {
        if (!idadeTexto) return 'todas';
        const idade = idadeTexto.toLowerCase();
        const match = idade.match(/(\d+)/);
        if (!match) return 'todas';
        const anos = parseInt(match[1]);
        if (idade.includes('mes') || idade.includes('mês')) return 'filhote';
        if (anos <= 1) return 'filhote';
        if (anos <= 7) return 'adulto';
        return 'idoso';
    };

    const formatarBairro = (bairro) => {
        if (!bairro) return 'Não informado';
        return bairro.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    };

    const abrirPerfil = (animalId) => {
        window.location.href = `../PerfilAnimal/index.html?id=${animalId}&tipo=adocao`;
    };

    const solicitarAdocao = async (animalId, nomeAnimal) => {
        try {
            const animal = animais.find(a => a.id === animalId);
            if (animal) {
                await mostrarModalAdocao(nomeAnimal, animal.emailContato, animal.telefoneContato);
            } else {
                alert('Erro ao buscar informações do animal. Tente novamente.');
            }
        } catch (e) {
            console.error('Erro ao solicitar adoção:', e);
            alert('Erro ao processar sua solicitação. Tente novamente.');
        }
    };

    const mostrarModalAdocao = async (nomeAnimal, email, telefone) => {
        const confirmado = window.confirm(
            `🐾 Adotar ${nomeAnimal}\n\nVocê demonstrou interesse em adotar ${nomeAnimal}.\n\nDeseja abrir seu aplicativo de email para entrar em contato?`
        );

        if (confirmado) {
            const assunto = encodeURIComponent('Interesse em adotar: ' + nomeAnimal);
            const corpo = encodeURIComponent('Olá,\n\nTenho interesse em adotar o(a) ' + nomeAnimal + ' anunciado(a).\n\nGostaria de receber informações sobre procedimentos para adoção e agendar uma visita.\n\nAguardo retorno.');

            if (email) {
                window.location.href = 'mailto:' + email + '?subject=' + assunto + '&body=' + corpo;
            } else {
                alert('Email Indisponível\n\nEmail não disponível. Entre em contato pelo telefone: ' + telefone);
            }
        }
    };

    // ===== COMPONENTE CARD DO ANIMAL =====
    const CardAnimal = ({ animal }) => {
        const categoriaIdade = calcularCategoriaIdade(animal.idade);
        const badgeTipo = animal.especie === 'cachorro' ?
            <span className="badge-tipo badge-cachorro">🐕 Cachorro</span> :
            <span className="badge-tipo badge-gato">🐱 Gato</span>;
        const imagemSrc = animal.imagem || '../../assets/images/dog_sentado.svg';
        const bairroFormatado = formatarBairro(animal.localizacao);

        return (
            <article
                className="card-animal"
                data-animal-id={animal.id}
                data-tipo={animal.especie}
                data-sexo={animal.sexo}
                data-porte={animal.porte}
                data-idade={categoriaIdade}
                data-cor={animal.cor}
                data-bairro={animal.localizacao}
                onClick={() => abrirPerfil(animal.id)}
                style={{ cursor: 'pointer' }}
                title={`Clique para ver o perfil completo de ${animal.nome}`}
            >
                <div className="card-imagem">
                    <img
                        src={imagemSrc}
                        alt={`${animal.nome} - ${animal.especie} ${animal.raca} para adoção`}
                        className="imagem-animal"
                        loading="lazy"
                        width="200"
                        height="200"
                        onError={(e) => e.target.src = '../../assets/images/dog_sentado.svg'}
                    />
                    {badgeTipo}
                    <span className="badge-adocao">Disponível para Adoção</span>
                </div>
                <div className="card-info">
                    <h3 className="nome-animal">{animal.nome}</h3>
                    <dl className="detalhes-animal">
                        <dt>Idade:</dt>
                        <dd><span className="icone-info">🎂</span> {animal.idade}</dd>

                        <dt>Sexo:</dt>
                        <dd className="sexo" data-sexo={animal.sexo}>
                            <span className="icone-info">{animal.sexo === 'macho' ? '♂' : '♀'}</span>
                            {animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}
                        </dd>

                        <dt>Localização:</dt>
                        <dd><span className="icone-info">📍</span> {bairroFormatado}, Salvador-BA</dd>
                    </dl>
                    <button
                        className="btn-adotar"
                        type="button"
                        data-animal-id={animal.id}
                        aria-label={`Manifestar interesse em adotar ${animal.nome}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            solicitarAdocao(animal.id, animal.nome);
                        }}
                    >
                        🐾 Quero Adotar
                    </button>
                </div>
            </article>
        );
    };

    // ===== RENDER =====
    return (
        <>
            <header>
                <div className="topo">
                    <img src={PawsImg} className="patas_topo" alt="Patas" />
                    <img src={LogoImg} id="logo_apanim" alt="Logo APANIM" />
                    <img src={CatImg} className="cat_topo" alt="Gato" />
                    <img src={DogImg} className="dog_topo" alt="Cachorro" />
                </div>

                <nav role="navigation">
                    <MenuUnificado />
                </nav>
            </header>

            <a href="#conteudo-principal" className="sr-only">Pular para o conteúdo principal</a>

            <main className="container-principal" id="conteudo-principal">
                {/* Seção de Filtros */}
                <section className="secao-filtros" aria-labelledby="titulo-filtros">
                    <h1 id="titulo-filtros" className="titulo-filtros">🐾 Encontre e adote seu novo companheiro</h1>

                    <form className="formulario-filtros" id="form-filtros" onSubmit={handleSubmit} role="search" aria-label="Filtros de busca para animais">
                        <div className="grid-filtros">
                            {/* Filtro Tipo de Animal */}
                            <div className="grupo-filtro">
                                <label htmlFor="tipo_animal" className="label-filtro">Tipo de Animal:</label>
                                <select
                                    id="tipo_animal"
                                    name="tipo_animal"
                                    className="select-filtro"
                                    aria-describedby="desc-tipo"
                                    value={filtros.tipo_animal}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="cachorro">🐕 Cachorro</option>
                                    <option value="gato">🐱 Gato</option>
                                </select>
                                <small id="desc-tipo" className="sr-only">Selecione o tipo de animal que deseja adotar</small>
                            </div>

                            {/* Filtro Idade */}
                            <div className="grupo-filtro">
                                <label htmlFor="idade" className="label-filtro">Idade:</label>
                                <select
                                    id="idade"
                                    name="idade"
                                    className="select-filtro"
                                    aria-describedby="desc-idade"
                                    value={filtros.idade}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todas">Todas as idades</option>
                                    <option value="filhote">🍼 Filhote (até 1 ano)</option>
                                    <option value="adulto">🐾 Adulto (1-7 anos)</option>
                                    <option value="idoso">🎂 Idoso (7+ anos)</option>
                                </select>
                                <small id="desc-idade" className="sr-only">Selecione a faixa etária preferida</small>
                            </div>

                            {/* Filtro Sexo */}
                            <div className="grupo-filtro">
                                <label htmlFor="sexo" className="label-filtro">Sexo:</label>
                                <select
                                    id="sexo"
                                    name="sexo"
                                    className="select-filtro"
                                    aria-describedby="desc-sexo"
                                    value={filtros.sexo}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="macho">♂ Macho</option>
                                    <option value="femea">♀ Fêmea</option>
                                </select>
                                <small id="desc-sexo" className="sr-only">Selecione o sexo do animal</small>
                            </div>

                            {/* Filtro Porte */}
                            <div className="grupo-filtro">
                                <label htmlFor="porte" className="label-filtro">Porte:</label>
                                <select
                                    id="porte"
                                    name="porte"
                                    className="select-filtro"
                                    aria-describedby="desc-porte"
                                    value={filtros.porte}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos os portes</option>
                                    <option value="pequeno">🐕‍🦺 Pequeno</option>
                                    <option value="medio">🐕 Médio</option>
                                    <option value="grande">🐕‍🦮 Grande</option>
                                </select>
                                <small id="desc-porte" className="sr-only">Selecione o porte do animal</small>
                            </div>

                            {/* Filtro Localização */}
                            <div className="grupo-filtro">
                                <label htmlFor="bairro" className="label-filtro">Bairro (Salvador-BA):</label>
                                <select
                                    id="bairro"
                                    name="bairro"
                                    className="select-filtro"
                                    aria-describedby="desc-bairro"
                                    value={filtros.bairro}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos os bairros</option>
                                    <option value="acupe">Acupe</option>
                                    <option value="aeroporto">Aeroporto</option>
                                    <option value="aguas_claras">Águas Claras</option>
                                    <option value="alto_da_terezinha">Alto da Terezinha</option>
                                    <option value="alto_das_pombas">Alto das Pombas</option>
                                    <option value="alto_do_cabrito">Alto do Cabrito</option>
                                    <option value="alto_do_coqueirinho">Alto do Coqueirinho</option>
                                    <option value="amaralina">Amaralina</option>
                                    <option value="areia_branca">Areia Branca</option>
                                    <option value="arenoso">Arenoso</option>
                                    <option value="arraial_do_retiro">Arraial do Retiro</option>
                                    <option value="bairro_da_paz">Bairro da Paz</option>
                                    <option value="baixa_de_quintas">Baixa de Quintas</option>
                                    <option value="barbalho">Barbalho</option>
                                    <option value="barra">Barra</option>
                                    <option value="barreiras">Barreiras</option>
                                    <option value="barris">Barris</option>
                                    <option value="beiru_tancredo_neves">Beiru / Tancredo Neves</option>
                                    <option value="boa_viagem">Boa Viagem</option>
                                    <option value="boa_vista_de_brotas">Boa Vista de Brotas</option>
                                    <option value="boa_vista_de_sao_caetano">Boa Vista de São Caetano</option>
                                    <option value="boca_da_mata">Boca da Mata</option>
                                    <option value="boca_do_rio">Boca do Rio</option>
                                    <option value="bom_jua">Bom Juá</option>
                                    <option value="bonfim">Bonfim</option>
                                    <option value="brotas">Brotas</option>
                                    <option value="cabula">Cabula</option>
                                    <option value="cabula_vi">Cabula VI</option>
                                    <option value="caji">Caji</option>
                                    <option value="calabar">Calabar</option>
                                    <option value="calabetao">Calabetão</option>
                                    <option value="calçada">Calçada</option>
                                    <option value="caminho_das_arvores">Caminho das Árvores</option>
                                    <option value="campinas_de_piraj">Campinas de Pirajá</option>
                                    <option value="candeal">Candeal</option>
                                    <option value="canela">Canela</option>
                                    <option value="retiro">Retiro</option>
                                    <option value="ribeira">Ribeira</option>
                                    <option value="rio_sena">Rio Sena</option>
                                    <option value="rio_vermelho">Rio Vermelho</option>
                                    <option value="roma">Roma</option>
                                    <option value="saboeiro">Saboeiro</option>
                                    <option value="santa_cruz">Santa Cruz</option>
                                    <option value="santa_luzia">Santa Luzia</option>
                                    <option value="santa_monica">Santa Mônica</option>
                                    <option value="santo_agostinho">Santo Agostinho</option>
                                    <option value="santo_antonio">Santo Antônio</option>
                                    <option value="sao_caetano">São Caetano</option>
                                    <option value="sao_cristovao">São Cristóvão</option>
                                    <option value="sao_goncalo">São Gonçalo</option>
                                    <option value="vitoria">Vitória</option>
                                    <option value="vista_alegre">Vista Alegre</option>
                                </select>
                                <small id="desc-bairro" className="sr-only">Selecione o bairro de preferência em Salvador</small>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="container-botoes">
                            <button type="submit" className="btn btn-primario" id="aplicar-filtros">
                                🔍 Aplicar Filtros
                            </button>
                            <button type="button" className="btn btn-secundario" id="limpar-filtros" onClick={limparFiltros}>
                                🔄 Limpar Filtros
                            </button>
                        </div>
                    </form>
                </section>

                {/* Seção de Resultados */}
                <section className="secao-adocao" aria-labelledby="titulo-resultados">
                    <div className="cabecalho-resultados">
                        <h2 id="titulo-resultados" className="titulo-resultados">Animais Disponíveis</h2>
                        <span className="contador-resultados" id="contador-resultados" aria-live="polite">
                            {animaisFiltrados.length === 1 ? '1 animal encontrado' : `${animaisFiltrados.length} animais encontrados`}
                        </span>
                    </div>

                    {/* Grid de Animais */}
                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Carregando animais...</p>
                        </div>
                    ) : animaisFiltrados.length > 0 ? (
                        <div className="grid-animais" id="grid-animais" role="region" aria-live="polite" aria-label="Resultados da busca">
                            {animaisFiltrados.map(animal => (
                                <CardAnimal key={animal.id} animal={animal} />
                            ))}
                        </div>
                    ) : (
                        <div className="mensagem-vazia" id="mensagem-vazia">
                            <h3>Nenhum animal encontrado</h3>
                            <p>Tente ajustar os filtros para encontrar mais opções de adoção.</p>
                            <button type="button" className="btn btn-primario" onClick={limparFiltros}>
                                🔄 Limpar Filtros
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <img src={InstagramImg} alt="Siga-nos no Instagram" />
                    <img src={EmailImg} alt="Entre em contato por email" />
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <a href="../AdocaoAnimal/index.jsx"><span>Adote</span><br /></a>
                        <a href="../CompraAnimal/index.jsx"><span>Compre</span></a>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <a href="../Parceria/index.jsx"><span>Seja uma empresa parceira</span></a>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <a href="../CadastroAnimalAdocao/index.jsx"><span>Cadastrar animal para adoção</span><br /></a>
                        <a href="../CadastroAnimalVenda/index.jsx"><span>Cadastrar animal para venda</span><br /></a>
                        <a href="../CadastroAnimaisPerdidos/index.jsx"><span>Cadastrar animal perdido</span><br /></a>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <a href="../AnimaisPerdidos/index.jsx"><span>Animais perdidos</span><br /></a>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <a href="../APANIM/index.jsx"><span>APANIM</span></a>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <a href="../CadastroInicial/index.jsx"><span>Cadastrar-se</span><br /></a>
                        <a href="../PerfilUsuario/index.jsx"><span>Minha página de usuário</span><br /></a>
                        <a href="../PerfilVendedor/index.jsx"><span>Minha página de vendedor</span><br /></a>
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum" />
                </div>
            </footer>

            {/* Scripts */}
            <script src='../../components/ScrollTop/scroll-top.js'></script>
        </>
    );
};

export default AdocaoAnimais;