import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../ModalCustomizado';
import MenuUnificado from '../MenuUnificado';
import ScrollTop from '../ScrollTop';
import './styles.css';
import '../Layout/header-unificado.css';
import '../Layout/footer-unificado.css';
import '../MenuUnificado/menu-styles.css';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import PataImg from '../../assets/images/pata.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';
import DogAndCatImg from '../../assets/images/dog_and_cat.svg';

// ===== COMPONENTE PRINCIPAL DE ANIMAIS PERDIDOS =====
const AnimaisPerdidos = () => {
    const navigate = useNavigate();
    const { alertaSucesso, alertaErro, alertaAviso, confirmarModal, Modal } = useModal();
    const [animais, setAnimais] = useState([]);
    const [animaisFiltrados, setAnimaisFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtros, setFiltros] = useState({
        tipo_animal: 'todos',
        sexo: 'todos',
        porte: 'todos',
        bairro: 'todos',
        periodo: 'todos'
    });

    // ===== FUNÇÕES DE STORAGE =====
    const storageDisponivel = () => {
        return typeof window.storage !== 'undefined' && typeof window.storage.get === 'function';
    };

    // ===== FUNÇÕES AUXILIARES =====
    const calcularDiasDesaparecido = useCallback((dataDesaparecimento) => {
        if (!dataDesaparecimento) return 0;

        const data = new Date(dataDesaparecimento + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diff = hoje - data;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }, []);

    const calcularPeriodo = useCallback((dataDesaparecimento) => {
        if (!dataDesaparecimento) return 'todos';

        const dias = calcularDiasDesaparecido(dataDesaparecimento);

        if (dias <= 7) return 'ultima-semana';
        if (dias <= 30) return 'ultimo-mes';
        if (dias <= 90) return 'ultimos-3-meses';
        return 'mais-de-3-meses';
    }, [calcularDiasDesaparecido]);

    const formatarData = (dataString) => {
        if (!dataString) return 'Não informado';

        const data = new Date(dataString + 'T00:00:00');
        return data.toLocaleDateString('pt-BR');
    };

    const formatarBairro = (bairro) => {
        if (!bairro) return 'Não informado';

        return bairro
            .split('_')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ');
    };

    const carregarAnimaisPerdidos = useCallback(async () => {
        setLoading(true);
        try {
            let animaisCarregados = [];

            if (storageDisponivel()) {
                try {
                    const resultado = await window.storage.get('animais_perdidos', true);
                    if (resultado && resultado.value) {
                        animaisCarregados = JSON.parse(resultado.value);
                    }
                } catch (e) {
                    console.warn('Erro ao ler window.storage (perdidos):', e);
                }
            } else {
                try {
                    const dados = localStorage.getItem('animais_perdidos');
                    if (dados) animaisCarregados = JSON.parse(dados);
                } catch (e) {
                    console.warn('Erro ao ler localStorage (perdidos):', e);
                }
            }

            setAnimais(animaisCarregados);
            setAnimaisFiltrados(animaisCarregados);
        } catch (error) {
            console.error('Erro ao carregar animais perdidos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const aplicarFiltros = useCallback(() => {
        let resultado = [...animais];

        if (filtros.tipo_animal !== 'todos') {
            resultado = resultado.filter(animal => animal.especie === filtros.tipo_animal);
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

        if (filtros.periodo !== 'todos') {
            resultado = resultado.filter(animal =>
                calcularPeriodo(animal.dataDesaparecimento) === filtros.periodo
            );
        }

        setAnimaisFiltrados(resultado);
    }, [animais, filtros, calcularPeriodo]);

    // ===== EFEITOS =====
    useEffect(() => {
        carregarAnimaisPerdidos();
    }, [carregarAnimaisPerdidos]);

    useEffect(() => {
        aplicarFiltros();
    }, [aplicarFiltros]);

    // Listener para recarregar dados quando voltam do cadastro
    useEffect(() => {
        const handleStorageChange = () => {
            carregarAnimaisPerdidos();
        };

        // Listen para mudanças no storage
        window.addEventListener('storage', handleStorageChange);
        // Listen para custom event quando dados são salvos
        window.addEventListener('animais-perdidos-updated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('animais-perdidos-updated', handleStorageChange);
        };
    }, [carregarAnimaisPerdidos]);

    // ===== HANDLERS =====
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const limparFiltros = () => {
        setFiltros({
            tipo_animal: 'todos',
            sexo: 'todos',
            porte: 'todos',
            bairro: 'todos',
            periodo: 'todos'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        aplicarFiltros();
    };

    const abrirPerfil = (animalId) => {
        navigate(`/perfil-animal?id=${animalId}&tipo=perdido`);
    };

    const abrirContato = async (animalId, nomeAnimal, e) => {
        if (e) e.stopPropagation();

        try {
            const animal = animais.find(a => a.id === animalId);

            if (animal) {
                const email = animal.emailContato;
                const telefone = animal.telefoneContato;

                const confirmar = await confirmarModal(
                    'Entrar em Contato',
                    `Você quer entrar em contato sobre ${nomeAnimal}?\n\nDeseja abrir seu aplicativo de email?`
                );

                if (confirmar) {
                    const assunto = encodeURIComponent('Informações sobre: ' + nomeAnimal);
                    const corpo = encodeURIComponent(`Olá,\n\nVi o anúncio sobre ${nomeAnimal} perdido(a).\n\nGostaria de fornecer informações sobre o paradeiro.\n\nAguardo retorno.`);

                    if (email) {
                        window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
                    } else {
                        alertaAviso('Email não disponível', `Entre em contato pelo telefone: ${telefone}`);
                    }
                }
            } else {
                alertaErro('Erro ao buscar informações do animal. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao abrir contato:', error);
            alertaErro('Erro ao processar sua solicitação. Tente novamente.');
        }
    };

    // ===== COMPONENTE CARD ANIMAL =====
    const CardAnimal = ({ animal }) => {
        const diasDesaparecido = calcularDiasDesaparecido(animal.dataDesaparecimento);
        const imagemSrc = animal.imagemPrincipal || DogImg;

        const badgeUrgente = () => {
            if (diasDesaparecido === 0) {
                return <span className="badge-urgente">URGENTE: Perdido hoje!</span>;
            } else if (diasDesaparecido === 1) {
                return <span className="badge-urgente">URGENTE: Perdido há 1 dia</span>;
            } else if (diasDesaparecido <= 7) {
                return <span className="badge-urgente">URGENTE: Perdido há {diasDesaparecido} dias</span>;
            }
            return null;
        };

        return (
            <article
                className="card-animal"
                onClick={() => abrirPerfil(animal.id)}
                style={{ cursor: 'pointer' }}
                title={`Clique para ver o perfil completo de ${animal.nome}`}
            >
                <div className="card-imagem">
                    <img
                        src={imagemSrc}
                        alt={`${animal.nome} - ${animal.especie} ${animal.raca} perdido`}
                        className="imagem-animal"
                        loading="lazy"
                        onError={(e) => { e.target.src = DogImg; }}
                    />
                    <span className={`badge-tipo badge-${animal.especie}`}>
                        {animal.especie === 'cachorro' ? '🐕 Cachorro' : '🐱 Gato'}
                    </span>
                    {badgeUrgente()}
                </div>
                <div className="card-info">
                    <h3 className="nome-animal">{animal.nome}</h3>
                    <dl className="detalhes-animal">
                        <dt>Sexo:</dt>
                        <dd className="sexo" data-sexo={animal.sexo}>
                            <span className="icone-info">{animal.sexo === 'macho' ? '♂' : '♀'}</span>
                            {animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}
                        </dd>

                        <dt>Cor:</dt>
                        <dd><span className="icone-info">🎨</span> {animal.cor}</dd>

                        <dt>Condição Especial:</dt>
                        <dd><span className="icone-info">⚕️</span> {animal.condicaoEspecial}</dd>

                        <dt>Data do Desaparecimento:</dt>
                        <dd><span className="icone-info">📅</span> {formatarData(animal.dataDesaparecimento)}</dd>

                        <dt>Última Aparição:</dt>
                        <dd><span className="icone-info">📍</span> {formatarBairro(animal.localizacao)}, Salvador-BA</dd>
                    </dl>

                    <button
                        className="btn-contato"
                        type="button"
                        aria-label={`Entrar em contato sobre ${animal.nome}`}
                        onClick={(e) => abrirContato(animal.id, animal.nome, e)}
                    >
                        📞 Vi este Animal
                    </button>
                </div>
            </article>
        );
    };

    return (
        <>
            {/* Header */}
            <header>
                <div className="topo">
                    <img src={PawsImg} className="patas_topo" alt="Patas" />
                    <img src={LogoImg} id="logo_apanim" alt="Logo APANIM" />
                    <img src={CatImg} className="cat_topo" alt="Gato" />
                    <img src={DogImg} className="dog_topo" alt="Cachorro" />
                </div>

                {/* Menu Unificado */}
                <nav role="navigation">
                    <MenuUnificado />
                </nav>
            </header>

            <ScrollTop />

            {/* Modal */}
            {Modal}

            {/* Skip to content para acessibilidade */}
            <a href="#conteudo-principal" className="sr-only">Pular para o conteúdo principal</a>

            {/* Main Content */}
            <main className="container-principal" id="conteudo-principal">
                {/* Seção de Filtros */}
                <section className="secao-filtros" aria-labelledby="titulo-filtros">
                    <h1 id="titulo-filtros" className="titulo-filtros">🔍 Ajude a encontrar animais perdidos</h1>

                    <form className="formulario-filtros" onSubmit={handleSubmit} role="search" aria-label="Filtros de busca para animais perdidos">
                        <div className="grid-filtros">
                            {/* Filtro Tipo de Animal */}
                            <div className="grupo-filtro">
                                <label htmlFor="tipo_animal" className="label-filtro">Tipo de Animal:</label>
                                <select
                                    id="tipo_animal"
                                    name="tipo_animal"
                                    className="select-filtro"
                                    value={filtros.tipo_animal}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="cachorro">🐕 Cachorro</option>
                                    <option value="gato">🐱 Gato</option>
                                </select>
                            </div>

                            {/* Filtro Sexo */}
                            <div className="grupo-filtro">
                                <label htmlFor="sexo" className="label-filtro">Sexo:</label>
                                <select
                                    id="sexo"
                                    name="sexo"
                                    className="select-filtro"
                                    value={filtros.sexo}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="macho">♂ Macho</option>
                                    <option value="femea">♀ Fêmea</option>
                                </select>
                            </div>

                            {/* Filtro Porte */}
                            <div className="grupo-filtro">
                                <label htmlFor="porte" className="label-filtro">Porte:</label>
                                <select
                                    id="porte"
                                    name="porte"
                                    className="select-filtro"
                                    value={filtros.porte}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos os portes</option>
                                    <option value="pequeno">🐕‍🦺 Pequeno</option>
                                    <option value="medio">🐕 Médio</option>
                                    <option value="grande">🐕‍🦮 Grande</option>
                                </select>
                            </div>

                            {/* Filtro Localização */}
                            <div className="grupo-filtro">
                                <label htmlFor="bairro" className="label-filtro">Bairro (Salvador-BA):</label>
                                <select
                                    id="bairro"
                                    name="bairro"
                                    className="select-filtro"
                                    value={filtros.bairro}
                                    onChange={handleFiltroChange}>
                                    <option value="todos">Todos os bairros</option>
                                    <option value="todos">Todos osbairros</option>
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
                                    <option value="caixa_dagua">Caixa D'Água</option>
                                    <option value="cajazeiras_ii">Cajazeiras II</option>
                                    <option value="cajazeiras_iv">Cajazeiras IV</option>
                                    <option value="cajazeiras_v">Cajazeiras V</option>
                                    <option value="cajazeiras_vi">Cajazeiras VI</option>
                                    <option value="cajazeiras_vii">Cajazeiras VII</option>
                                    <option value="cajazeiras_viii">Cajazeiras VIII</option>
                                    <option value="cajazeiras_x">Cajazeiras X</option>
                                    <option value="cajazeiras_xi">Cajazeiras XI</option>
                                    <option value="calabar">Calabar</option>
                                    <option value="calabetão">Calabetão</option>
                                    <option value="calçada">Calçada</option>
                                    <option value="caminho_das_arvores">Caminho das Árvores</option>
                                    <option value="caminho_de_areia">Caminho de Areia</option>
                                    <option value="campinas_de_piraja">Campinas de Pirajá</option>
                                    <option value="canabrava">Canabrava</option>
                                    <option value="candeal">Candeal</option>
                                    <option value="canela">Canela</option>
                                    <option value="capelinha">Capelinha</option>
                                    <option value="cassange">Cassange</option>
                                    <option value="castelo_branco">Castelo Branco</option>
                                    <option value="centro">Centro</option>
                                    <option value="centro_administrativo_da_bahia">Centro Administrativo da Bahia (CAB)</option>
                                    <option value="centro_historico">Centro Histórico</option>
                                    <option value="chame_chame">Chame‑Chame</option>
                                    <option value="chapada_do_rio_vermelho">Chapada do Rio Vermelho</option>
                                    <option value="cidade_nova">Cidade Nova</option>
                                    <option value="colinas_de_periperi">Colinas de Periperi</option>
                                    <option value="comercio">Comércio</option>
                                    <option value="cosme_de_farias">Cosme de Farias</option>
                                    <option value="costa_azul">Costa Azul</option>
                                    <option value="coutos">Coutos</option>
                                    <option value="curuzu">Curuzu</option>
                                    <option value="dois_de_julho">Dois de Julho</option>
                                    <option value="dom_avelar">Dom Avelar</option>
                                    <option value="doron">Doron</option>
                                    <option value="engenho_velho_da_federacao">Engenho Velho da Federação</option>
                                    <option value="engenho_velho_de_brotas">Engenho Velho de Brotas</option>
                                    <option value="engomadeira">Engomadeira</option>
                                    <option value="fazenda_coutos">Fazenda Coutos</option>
                                    <option value="fazenda_grande_do_retiro">Fazenda Grande do Retiro</option>
                                    <option value="fazenda_grande_i">Fazenda Grande I</option>
                                    <option value="fazenda_grande_ii">Fazenda Grande II</option>
                                    <option value="fazenda_grande_iii">Fazenda Grande III</option>
                                    <option value="fazenda_grande_iv">Fazenda Grande IV</option>
                                    <option value="federacao">Federação</option>
                                    <option value="garcia">Garcia</option>
                                    <option value="graca">Graça</option>
                                    <option value="granjas_rurais_presidente_vargas">Granjas Rurais Presidente Vargas</option>
                                    <option value="horto_florestal">Horto Florestal</option>
                                    <option value="iapi">IAPI</option>
                                    <option value="ilha_amarela">Ilha Amarela</option>
                                    <option value="ilha_de_bom_jesus_dos_passos">Ilha de Bom Jesus dos Passos</option>
                                    <option value="ilha_dos_frades_ilha_de_santo_antonio">Ilha dos Frades / Ilha de Santo Antônio</option>
                                    <option value="ilha_de_mare">Ilha de Maré</option>
                                    <option value="imbuí">Imbuí</option>
                                    <option value="itacaranha">Itacaranha</option>
                                    <option value="itaigara">Itaigara</option>
                                    <option value="itapua">Itapuã</option>
                                    <option value="itinga">Itinga</option>
                                    <option value="jaguaripe_i">Jaguaripe I</option>
                                    <option value="jardim_armação">Jardim Armação</option>
                                    <option value="jardim_cajazeiras">Jardim Cajazeiras</option>
                                    <option value="jardim_das_margaridas">Jardim das Margaridas</option>
                                    <option value="jardim_nova_esperanca">Jardim Nova Esperança</option>
                                    <option value="jardim_santo_inacio">Jardim Santo Inácio</option>
                                    <option value="lapinha">Lapinha</option>
                                    <option value="liberdade">Liberdade</option>
                                    <option value="lobato">Lobato</option>
                                    <option value="luiz_anselmo">Luiz Anselmo</option>
                                    <option value="macaúbas">Macaúbas</option>
                                    <option value="mangueira">Mangueira</option>
                                    <option value="marechal_rondon">Marechal Rondon</option>
                                    <option value="mares">Mares</option>
                                    <option value="massaranduba">Massaranduba</option>
                                    <option value="mata_escura">Mata Escura</option>
                                    <option value="matatu">Matatu</option>
                                    <option value="mirantes_de_periperi">Mirantes de Periperi</option>
                                    <option value="monte_serrat">Monte Serrat</option>
                                    <option value="moradas_da_lagoa">Moradas da Lagoa</option>
                                    <option value="mussurunga">Mussurunga</option>
                                    <option value="narandiba">Narandiba</option>
                                    <option value="nazare">Nazaré</option>
                                    <option value="nordeste_de_amaralina">Nordeste de Amaralina</option>
                                    <option value="nova_brasilia">Nova Brasília</option>
                                    <option value="nova_constituinte">Nova Constituinte</option>
                                    <option value="nova_esperanca">Nova Esperança</option>
                                    <option value="nova_sussuarana">Nova Sussuarana</option>
                                    <option value="novo_horizonte">Novo Horizonte</option>
                                    <option value="novo_marotinho">Novo Marotinho</option>
                                    <option value="ondina">Ondina</option>
                                    <option value="palestina">Palestina</option>
                                    <option value="paripe">Paripe</option>
                                    <option value="patamares">Patamares</option>
                                    <option value="pau_da_lima">Pau da Lima</option>
                                    <option value="pau_miudo">Pau Miúdo</option>
                                    <option value="periperi">Periperi</option>
                                    <option value="pernambues">Pernambués</option>
                                    <option value="pero_vaz">Pero Vaz</option>
                                    <option value="piata">Piatã</option>
                                    <option value="piraja">Pirajá</option>
                                    <option value="pituaçu">Pituaçu</option>
                                    <option value="pituba">Pituba</option>
                                    <option value="plataforma">Plataforma</option>
                                    <option value="porto_seco_piraja">Porto Seco Pirajá</option>
                                    <option value="praia_grande">Praia Grande</option>
                                    <option value="resgate">Resgate</option>
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
                                    <option value="sao_joao_do_cabrito">São João do Cabrito</option>
                                    <option value="sao_marcos">São Marcos</option>
                                    <option value="sao_rafael">São Rafael</option>
                                    <option value="sao_tome">São Tomé</option>
                                    <option value="saramandaia">Saramandaia</option>
                                    <option value="saude">Saúde</option>
                                    <option value="sete_de_abril">Sete de Abril</option>
                                    <option value="stella_maris">Stella Maris</option>
                                    <option value="stiep">STIEP</option>
                                    <option value="sussuarana">Sussuarana</option>
                                    <option value="tororo">Tororó</option>
                                    <option value="trobogy">Trobogy</option>
                                    <option value="uruguai">Uruguai</option>
                                    <option value="vale_das_pedrinhas">Vale das Pedrinhas</option>
                                    <option value="vale_dos_lagos">Vale dos Lagos</option>
                                    <option value="valeria">Valéria</option>
                                    <option value="vila_canaria">Vila Canária</option>
                                    <option value="vila_laura">Vila Laura</option>
                                    <option value="vila_ruy_barbosa_jardim_cruzeiro">Vila Ruy Barbosa / Jardim Cruzeiro</option>
                                    <option value="vitoria">Vitória</option>
                                    <option value="vista_alegre">Vista Alegre</option>
                                </select>
                            </div>

                            {/* Filtro Data */}
                            <div className="grupo-filtro">
                                <label htmlFor="periodo" className="label-filtro">Período do Desaparecimento:</label>
                                <select
                                    id="periodo"
                                    name="periodo"
                                    className="select-filtro"
                                    value={filtros.periodo}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos os períodos</option>
                                    <option value="ultima-semana">📅 Última semana</option>
                                    <option value="ultimo-mes">📅 Último mês</option>
                                    <option value="ultimos-3-meses">📅 Últimos 3 meses</option>
                                    <option value="mais-de-3-meses">📅 Mais de 3 meses</option>
                                </select>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="container-botoes">
                            <button type="submit" className="btn btn-primario">
                                🔍 Aplicar Filtros
                            </button>
                            <button type="button" className="btn btn-secundario" onClick={limparFiltros}>
                                🔄 Limpar Filtros
                            </button>
                        </div>
                    </form>
                </section>

                {/* Seção de Resultados */}
                <section className="secao-perdidos" aria-labelledby="titulo-resultados">
                    <div className="cabecalho-resultados">
                        <h2 id="titulo-resultados" className="titulo-resultados">Animais Perdidos</h2>
                        <span className="contador-resultados" aria-live="polite">
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
                        <div className="grid-animais" role="region" aria-live="polite" aria-label="Resultados da busca">
                            {animaisFiltrados.map(animal => (
                                <CardAnimal key={animal.id} animal={animal} />
                            ))}
                        </div>
                    ) : (
                        <div className="mensagem-vazia">
                            <h3>Nenhum animal encontrado</h3>
                            <p>Tente ajustar os filtros para ver mais animais perdidos.</p>
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
                        <Link to="/adocao-animal"><span>Adote um novo amigo</span></Link><br />
                        <Link to="/compra-animal"> <span>Compre um animal</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"> <span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"> <span>Cadastrar animal para adoção</span></Link><br />
                        <Link to="/cadastro-animal-venda"> <span>Cadastrar animal para venda</span></Link><br />
                        <Link to="/cadastro-animal-perdido"> <span>Cadastrar animal perdido</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"> <span>Animais perdidos</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"> <span>APANIM</span></Link><br />
                        <Link to="/servicos"> <span>Serviços</span></Link><br />
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"> <span>Cadastrar-se</span></Link><br />
                        <Link to="/login"> <span>Login</span></Link><br />
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum" />
                </div>
            </footer>

            {/* Scripts */}
            <script src='../../components/ScrollTop/scroll-top.js'></script>
            <script src='../../components/ModalCustomizado/modal-customizado.js'></script>
        </>
    );
};

export default AnimaisPerdidos;