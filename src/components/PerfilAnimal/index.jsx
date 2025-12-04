import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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

const PerfilAnimal = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [indiceAtual, setIndiceAtual] = useState(0);

    const animalId = searchParams.get('id');
    const tipo = searchParams.get('tipo');

    // Funções auxiliares
    const storageDisponivel = () => {
        return typeof window !== 'undefined' &&
            typeof window.storage !== 'undefined' &&
            typeof window.storage.get === 'function';
    };

    const formatarValor = useCallback((valor) => {
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

        return `R$ ${valorNumerico.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }, []);

    const formatarBairro = useCallback((bairro) => {
        if (!bairro) return 'Não informado';

        return bairro
            .split('_')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ');
    }, []);

    const calcularTempoDesaparecimento = useCallback((dataDesaparecimento) => {
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
    }, []);

    const capitalize = useCallback((texto) => {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }, []);

    // Carregar dados do animal
    const carregarDadosAnimal = useCallback(async () => {
        try {
            if (!animalId || !tipo) {
                setErro(true);
                setLoading(false);
                return;
            }

            let animais = [];
            const chaveStorage = tipo === 'adocao' ? 'animais_adocao' :
                tipo === 'venda' ? 'animais_venda' :
                    'animais_perdidos';

            // Tentar carregar do storage
            if (storageDisponivel()) {
                try {
                    const resultado = await window.storage.get(chaveStorage, true);
                    if (resultado && resultado.value) {
                        animais = JSON.parse(resultado.value);
                    }
                } catch (e) {
                    console.warn('Erro ao ler window.storage:', e);
                }
            } else {
                try {
                    const dados = localStorage.getItem(chaveStorage);
                    if (dados) {
                        animais = JSON.parse(dados);
                    }
                } catch (e) {
                    console.warn('Erro ao ler localStorage:', e);
                }
            }

            const animalEncontrado = animais.find(a => a.id === animalId);

            if (animalEncontrado) {
                setAnimal(animalEncontrado);
                setLoading(false);
            } else {
                setErro(true);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro ao carregar dados do animal:', error);
            setErro(true);
            setLoading(false);
        }
    }, [animalId, tipo]);

    useEffect(() => {
        carregarDadosAnimal();
    }, [carregarDadosAnimal]);

    // Navegação do carrossel
    const navegarCarrossel = (direcao) => {
        if (!animal || !animal.midiasExtras) return;

        let novoIndice = indiceAtual + direcao;

        if (novoIndice < 0) {
            novoIndice = animal.midiasExtras.length - 1;
        } else if (novoIndice >= animal.midiasExtras.length) {
            novoIndice = 0;
        }

        setIndiceAtual(novoIndice);
    };

    const irParaItem = (index) => {
        setIndiceAtual(index);
    };

    // Handlers de ação
    const contatarSobre = async (acao) => {
        const email = animal.emailContato;
        const telefone = animal.telefoneContato;

        if (!email && !telefone) {
            alert('Informações de contato não disponíveis para este animal.');
            return;
        }

        let assunto = '';
        let corpo = '';

        if (acao === 'adotar') {
            assunto = 'Interesse em adotar: ' + animal.nome;
            corpo = 'Olá,\n\nTenho interesse em adotar o(a) ' + animal.nome + '.\n\nGostaria de mais informações sobre o processo de adoção.\n\nAguardo retorno.';
        } else if (acao === 'comprar') {
            const valorFormatado = formatarValor(animal.valor);
            assunto = 'Interesse em comprar: ' + animal.nome;
            corpo = 'Olá,\n\nTenho interesse em comprar o(a) ' + animal.nome + ' anunciado(a) por ' + valorFormatado + '.\n\nGostaria de mais informações.\n\nAguardo retorno.';
        } else {
            assunto = 'Informações sobre: ' + animal.nome;
            corpo = 'Olá,\n\nVi o anúncio sobre ' + animal.nome + ' perdido(a).\n\nGostaria de fornecer informações.\n\nAguardo retorno.';
        }

        if (email) {
            window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
        } else {
            alert('Email não disponível. Entre em contato pelo telefone: ' + telefone);
        }
    };

    if (loading) {
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
                <main className="container-principal" id="conteudo-principal">
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Carregando perfil do animal...</p>
                    </div>
                </main>
            </>
        );
    }

    if (erro) {
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
                <main className="container-principal" id="conteudo-principal">
                    <div className="erro-container">
                        <div className="erro-conteudo">
                            <h2>❌ Animal não encontrado</h2>
                            <p>Não foi possível carregar as informações deste animal.</p>
                            <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>
                        </div>
                    </div>
                </main>
            </>
        );
    }

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

            <ScrollTop />

            <a href="#conteudo-principal" className="sr-only">Pular para o conteúdo principal</a>

            <main className="container-principal" id="conteudo-principal">
                <div className="perfil-container">
                    {/* Botão voltar */}
                    <div className="header-perfil">
                        <button onClick={() => navigate(-1)} className="btn-voltar-topo">← Voltar</button>
                    </div>

                    {/* Seção principal */}
                    <section className="secao-principal">
                        <div className="container-imagem-principal">
                            <img
                                src={animal.imagemPrincipal || DogImg}
                                alt={`Foto do ${animal.nome}`}
                                className="imagem-principal"
                                onError={(e) => { e.target.src = DogImg; }}
                            />
                            <span className={`badge-tipo badge-${animal.especie}`}>
                                {animal.especie === 'cao' ? '🐕 Cachorro' : '🐱 Gato'}
                            </span>
                            <span className={`badge-status badge-${tipo === 'adocao' ? 'adocao' : tipo === 'venda' ? 'venda' : 'perdido'}`}>
                                {tipo === 'adocao' ? 'Disponível para Adoção' : tipo === 'venda' ? 'Disponível para Compra' : 'Animal Perdido'}
                            </span>
                        </div>

                        <div className="info-basica">
                            <h1 className="nome-animal-perfil">{animal.nome}</h1>

                            <div className="caracteristicas-rapidas">
                                <span className="tag">{animal.especie === 'cao' ? '🐕 Cachorro' : '🐱 Gato'}</span>
                                <span className="tag">{animal.sexo === 'macho' ? '♂ Macho' : '♀ Fêmea'}</span>
                                <span className="tag">🎂 {animal.idade}</span>
                                <span className="tag">📏 {capitalize(animal.porte)}</span>
                            </div>

                            {tipo === 'venda' && animal.valor && (
                                <div className="preco-destaque">
                                    <p className="valor">{formatarValor(animal.valor)}</p>
                                </div>
                            )}

                            <p className="resumo-perfil">{animal.resumo || 'Informações não disponíveis'}</p>

                            <div className="info-destaque">
                                <div className="info-item">
                                    <span className="icone">📍</span>
                                    <div>
                                        <strong>Localização</strong>
                                        <p>{formatarBairro(animal.localizacao)}, Salvador-BA</p>
                                    </div>
                                </div>
                                {tipo === 'perdido' && animal.dataDesaparecimento && (
                                    <div className="info-item">
                                        <span className="icone">📅</span>
                                        <div>
                                            <strong>Desapareceu há</strong>
                                            <p>{calcularTempoDesaparecimento(animal.dataDesaparecimento)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn-acao-principal"
                                onClick={() => {
                                    if (tipo === 'adocao') {
                                        contatarSobre('adotar');
                                    } else if (tipo === 'venda') {
                                        contatarSobre('comprar');
                                    } else {
                                        contatarSobre('informar');
                                    }
                                }}
                            >
                                {tipo === 'adocao' ? '🐾 Quero Adotar' : tipo === 'venda' ? '💰 Tenho Interesse' : '📞 Entrar em Contato'}
                            </button>
                        </div>
                    </section>

                    {/* Galeria de mídias */}
                    {animal.midiasExtras && animal.midiasExtras.length > 0 && (
                        <section className="secao-galeria">
                            <h2 className="titulo-secao">📸 Galeria de Fotos e Vídeos</h2>

                            <div className="carrossel-container">
                                <button className="carrossel-btn btn-prev" onClick={() => navegarCarrossel(-1)} aria-label="Foto anterior">❮</button>

                                <div className="carrossel-wrapper">
                                    <div className="carrossel" style={{ transform: `translateX(-${indiceAtual * 100}%)` }}>
                                        {animal.midiasExtras.map((midia, idx) => (
                                            <div key={idx} className="carrossel-item">
                                                {midia.tipo === 'video' ? (
                                                    <video src={midia.src} controls className="carrossel-media"></video>
                                                ) : (
                                                    <img
                                                        src={midia.src}
                                                        alt={`Foto ${idx + 1} do animal`}
                                                        className="carrossel-media"
                                                        onError={(e) => { e.target.src = DogImg; }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className="carrossel-btn btn-next" onClick={() => navegarCarrossel(1)} aria-label="Próxima foto">❯</button>
                            </div>

                            <div className="carrossel-indicadores">
                                {animal.midiasExtras.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`indicador ${idx === indiceAtual ? 'ativo' : ''}`}
                                        onClick={() => irParaItem(idx)}
                                        aria-label={`Ir para item ${idx + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Detalhes completos */}
                    <section className="secao-detalhes">
                        <h2 className="titulo-secao">📋 Informações Detalhadas</h2>

                        <div className="grid-detalhes">
                            <div className="detalhe-card">
                                <h3>🐾 Características Físicas</h3>
                                <dl className="lista-detalhes">
                                    <dt>Espécie:</dt>
                                    <dd>{animal.especie === 'cao' ? 'Cachorro' : 'Gato'}</dd>

                                    <dt>Raça:</dt>
                                    <dd>{animal.raca || 'Não informado'}</dd>

                                    <dt>Cor:</dt>
                                    <dd>{animal.cor || 'Não informado'}</dd>

                                    <dt>Sexo:</dt>
                                    <dd>{animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}</dd>

                                    <dt>Idade:</dt>
                                    <dd>{animal.idade || 'Não informado'}</dd>

                                    <dt>Porte:</dt>
                                    <dd>{capitalize(animal.porte) || 'Não informado'}</dd>
                                </dl>
                            </div>

                            <div className="detalhe-card">
                                <h3>💉 Saúde e Cuidados</h3>
                                <dl className="lista-detalhes">
                                    <dt>Vacinado:</dt>
                                    <dd>
                                        {animal.vacinas && animal.vacinas.length > 0
                                            ? `Sim (${animal.vacinas.join(', ')})`
                                            : animal.vacinado === 'sim' ? 'Sim' : 'Não'}
                                    </dd>

                                    <dt>Castrado:</dt>
                                    <dd>{animal.castrado === 'sim' ? 'Sim' : 'Não'}</dd>

                                    <dt>Vermifugado:</dt>
                                    <dd>{animal.vermifugado === 'sim' ? 'Sim' : 'Não'}</dd>

                                    {animal.condicaoEspecial && (
                                        <>
                                            <dt>Condição Especial:</dt>
                                            <dd>{animal.condicaoEspecial}</dd>
                                        </>
                                    )}
                                </dl>
                            </div>

                            {animal.descricaoCompleta && (
                                <div className="detalhe-card">
                                    <h3>📝 Descrição Completa</h3>
                                    <p className="descricao-completa">{animal.descricaoCompleta}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Seção de contato */}
                    <section className="secao-contato">
                        <h2 className="titulo-secao">📞 Entre em Contato</h2>

                        <div className="contato-card">
                            <p className="contato-intro">Para mais informações sobre este animal, entre em contato:</p>

                            <div className="contato-detalhes">
                                {animal.emailContato && (
                                    <div className="contato-item">
                                        <span className="icone-contato">📧</span>
                                        <div>
                                            <strong>Email:</strong>
                                            <p>{animal.emailContato}</p>
                                        </div>
                                    </div>
                                )}

                                {animal.telefoneContato && (
                                    <div className="contato-item">
                                        <span className="icone-contato">📱</span>
                                        <div>
                                            <strong>Telefone:</strong>
                                            <p>{animal.telefoneContato}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn-contato-email"
                                onClick={() => {
                                    if (tipo === 'adocao') {
                                        contatarSobre('adotar');
                                    } else if (tipo === 'venda') {
                                        contatarSobre('comprar');
                                    } else {
                                        contatarSobre('informar');
                                    }
                                }}
                            >
                                📧 Enviar Email
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="base">
                <div className="redes_sociais">
                    <img src={InstagramImg} alt="Siga-nos no Instagram" />
                    <img src={EmailImg} alt="Entre em contato por email" />
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <a href="/adocao-animal"><span>Adote</span></a><br />
                        <a href="/compra-animal"><span>Compre</span></a>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <a href="/parceria"><span>Seja uma empresa parceira</span></a>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <a href="/cadastro-animal-adocao"><span>Cadastrar animal para adoção</span></a><br />
                        <a href="/cadastro-animal-venda"><span>Cadastrar animal para venda</span></a><br />
                        <a href="/cadastro-animal-perdido"><span>Cadastrar animal perdido</span></a>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <a href="/animais-perdidos"><span>Animais perdidos</span></a>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <a href="/apanim"><span>APANIM</span></a>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <a href="/cadastro"><span>Cadastrar-se</span></a><br />
                        <a href="/login"><span>Login</span></a>
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum" />
                </div>
            </footer>
        </>
    );
};

export default PerfilAnimal;
