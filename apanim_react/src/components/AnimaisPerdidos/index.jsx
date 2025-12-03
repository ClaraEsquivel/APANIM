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
                                    onChange={handleFiltroChange}
                                >
                                    <option value="todos">Todos os bairros</option>
                                    <option value="barra">Barra</option>
                                    <option value="rio_vermelho">Rio Vermelho</option>
                                    <option value="pituba">Pituba</option>
                                    <option value="itapua">Itapuã</option>
                                    <option value="cabula">Cabula</option>
                                    {/* Adicione mais bairros conforme necessário */}
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