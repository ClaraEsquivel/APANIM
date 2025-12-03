import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
function Menu() {
  const [animaisAdocao, setAnimaisAdocao] = useState([]);
  const [animaisCompra, setAnimaisCompra] = useState([]);
  const [animaisPerdidos, setAnimaisPerdidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funções auxiliares
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatarLocalizacao = (loc) => {
    if (!loc) return 'Salvador-BA';
    return loc.split('_')
      .map(palavra => capitalize(palavra))
      .join(' ');
  };

  const formatarValor = (valor) => {
    if (!valor) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Verificar disponibilidade do storage
  const storageDisponivel = () => {
    return typeof window !== 'undefined' &&
      typeof window.storage !== 'undefined' &&
      typeof window.storage.get === 'function';
  };

  // Carregar animais para adoção
  const carregarAnimaisAdocao = async () => {
    try {
      let animais = [];

      if (storageDisponivel()) {
        const resultado = await window.storage.get('animais_adocao', true);
        if (resultado && resultado.value) {
          animais = JSON.parse(resultado.value);
        }
      } else {
        const dados = localStorage.getItem('animais_adocao');
        if (dados) {
          animais = JSON.parse(dados);
        }
      }

      console.log(`🐾 ${animais.length} animais para adoção encontrados`);
      const animaisRecentes = animais.slice(-9).reverse();
      setAnimaisAdocao(animaisRecentes);

    } catch (error) {
      console.error('Erro ao carregar animais de adoção:', error);
    }
  };

  // Carregar animais para compra
  const carregarAnimaisCompra = async () => {
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

      console.log(`💰 ${animais.length} animais para compra encontrados`);
      const animaisRecentes = animais.slice(-9).reverse();
      setAnimaisCompra(animaisRecentes);

    } catch (error) {
      console.error('Erro ao carregar animais de venda:', error);
    }
  };

  // Carregar animais perdidos
  const carregarAnimaisPerdidos = async () => {
    try {
      let animais = [];

      if (storageDisponivel()) {
        const resultado = await window.storage.get('animais_perdidos', true);
        if (resultado && resultado.value) {
          animais = JSON.parse(resultado.value);
        }
      } else {
        const dados = localStorage.getItem('animais_perdidos');
        if (dados) {
          animais = JSON.parse(dados);
        }
      }

      console.log(`🔍 ${animais.length} animais perdidos encontrados`);
      const animaisRecentes = animais.slice(-9).reverse();
      setAnimaisPerdidos(animaisRecentes);

    } catch (error) {
      console.error('Erro ao carregar animais perdidos:', error);
    }
  };

  // Carregar todos os animais
  useEffect(() => {
    const carregarTodos = async () => {
      setLoading(true);
      console.log('🔄 Carregando animais para o menu...');

      await Promise.all([
        carregarAnimaisAdocao(),
        carregarAnimaisCompra(),
        carregarAnimaisPerdidos()
      ]);

      setLoading(false);
      console.log('✅ Animais carregados com sucesso!');
    };

    carregarTodos();
  }, []); // Array vazio = executa apenas uma vez na montagem

  // Componente de Card de Adoção
  const CardAdocao = ({ animal }) => {
    const localizacao = formatarLocalizacao(animal.localizacao);

    return (
      <Link to="/adocao-animal" style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          className="item_lateral"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <img
            src={DogSentadoImg}
            alt={`Foto de ${animal.nome}`}
          />
          <div className="info_lateral">
            <h3>{animal.nome}</h3>
            <dl>
              <dt className="sr-only">Idade:</dt>
              <dd>{animal.idade}</dd>
              <dt className="sr-only">Sexo:</dt>
              <dd>{capitalize(animal.sexo)}</dd>
              <dt className="sr-only">Localização:</dt>
              <dd>{localizacao}</dd>
            </dl>
          </div>
        </article>
      </Link>
    );
  };

  // Componente de Card de Compra
  const CardCompra = ({ animal }) => {
    const localizacao = formatarLocalizacao(animal.localizacao);
    const valor = formatarValor(animal.valor);

    return (
      <Link to="/compra-animal" style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          className="item_lateral"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <img
            src={DogSentadoImg}
            alt={`Foto de ${animal.nome}`}
          />
          <div className="info_lateral">
            <h3>{animal.nome}</h3>
            <dl>
              <dt className="sr-only">Idade:</dt>
              <dd>{animal.idade}</dd>
              <dt className="sr-only">Sexo:</dt>
              <dd>{capitalize(animal.sexo)}</dd>
              <dt className="sr-only">Raça:</dt>
              <dd>{animal.raca}</dd>
              <dt className="sr-only">Localização:</dt>
              <dd>{localizacao}</dd>
              <dt className="sr-only">Valor:</dt>
              <dd style={{ color: '#5A0609', fontWeight: 'bold' }}>{valor}</dd>
            </dl>
          </div>
        </article>
      </Link>
    );
  };

  // Componente de Card de Perdido
  const CardPerdido = ({ animal }) => {
    const localizacao = formatarLocalizacao(animal.localizacao);
    const dataPerdido = animal.dataPerdido
      ? new Date(animal.dataPerdido).toLocaleDateString('pt-BR')
      : 'Não informado';

    return (
      <Link to="/animais-perdidos" style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          className="item_lateral"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <img
            src={DogSentadoImg}
            alt={`Foto de ${animal.nome || 'Animal'}`}
          />
          <div className="info_lateral">
            <h3>{animal.nome || 'Sem nome'}</h3>
            <dl>
              <dt className="sr-only">Espécie:</dt>
              <dd>{capitalize(animal.especie)}</dd>
              <dt className="sr-only">Cor:</dt>
              <dd>{capitalize(animal.cor)}</dd>
              <dt className="sr-only">Localização:</dt>
              <dd>{localizacao}</dd>
              <dt className="sr-only">Data perdido:</dt>
              <dd style={{ color: '#dc2626', fontWeight: 'bold' }}>🚨 {dataPerdido}</dd>
            </dl>
          </div>
        </article>
      </Link>
    );
  };

  // Renderizar linhas de animais para adoção
  const renderizarLinhaAdocao = (animais, indiceInicial) => {
    const animaisDaLinha = animais.slice(indiceInicial, indiceInicial + 3);

    return (
      <section
        key={indiceInicial}
        className="linha_lateral"
        aria-label={`Linha ${Math.floor(indiceInicial / 3) + 1} de animais`}
      >
        {animaisDaLinha.map((animal, idx) => (
          <CardAdocao key={idx} animal={animal} />
        ))}
      </section>
    );
  };

  // Renderizar linhas de animais para compra
  const renderizarLinhaCompra = (animais, indiceInicial) => {
    const animaisDaLinha = animais.slice(indiceInicial, indiceInicial + 3);

    return (
      <section
        key={indiceInicial}
        className="linha_lateral"
        aria-label={`Linha ${Math.floor(indiceInicial / 3) + 1} de animais`}
      >
        {animaisDaLinha.map((animal, idx) => (
          <CardCompra key={idx} animal={animal} />
        ))}
      </section>
    );
  };

  // Renderizar linhas de animais perdidos
  const renderizarLinhaPerdido = (animais, indiceInicial) => {
    const animaisDaLinha = animais.slice(indiceInicial, indiceInicial + 3);

    return (
      <section
        key={indiceInicial}
        className="linha_lateral"
        aria-label={`Linha ${Math.floor(indiceInicial / 3) + 1} de animais`}
      >
        {animaisDaLinha.map((animal, idx) => (
          <CardPerdido key={idx} animal={animal} />
        ))}
      </section>
    );
  };

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

      <main className="central">
        <section className="conteudo_principal" aria-labelledby="titulo-principal">
          <h1 id="titulo-principal" className="sr-only">Serviços principais do APANIM</h1>

          <div className="botoes-principais" role="group" aria-label="Principais serviços disponíveis">

            <Link to="/compra-animal">
              <button type="button" id="quero_comprar" aria-describedby="desc-comprar">
                Quero Comprar um Animal
              </button>
            </Link>

            <Link to="/adocao-animal">
              <button type="button" id="quero_adotar" aria-describedby="desc-adotar">
                Quero Adotar um Animal
              </button>
            </Link>

            <Link to="/animais-perdidos">
              <button type="button" id="divulgar_animal_perdido" aria-describedby="desc-perdido">
                Divulgação de Animais Perdidos
              </button>
            </Link>

            <Link to="/servicos">
              <button type="button" id="servicos" aria-describedby="desc-servicos">
                Nossos Serviços
              </button>
            </Link>

          </div>

          {/* Descrições ocultas para acessibilidade */}
          <div className="sr-only">
            <div id="desc-comprar">Encontre animais disponíveis para compra</div>
            <div id="desc-adotar">Encontre animais disponíveis para adoção</div>
            <div id="desc-perdido">Divulgue ou procure por animais perdidos</div>
            <div id="desc-servicos">Acesse serviços veterinários e relacionados</div>
          </div>
        </section>

        {/* SEÇÃO DE ADOÇÃO */}
        <section className="secao-adocao" aria-labelledby="titulo-resultados-adocao">
          <div className="cabecalho-resultados">
            <h2 id="titulo-resultados-adocao" className="titulo-resultados">Animais Para Adoção</h2>
            <span className="contador-resultados" id="contador-resultados-adocao" aria-live="polite">
              {loading ? 'Carregando...' : `${animaisAdocao.length} animais encontrados`}
            </span>
          </div>
        </section>

        <aside className="lateral_direito" aria-labelledby="titulo-animais-adocao">
          <h2 id="titulo-animais-adocao" className="sr-only">Animais em destaque para adoção</h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Carregando animais...</p>
          ) : animaisAdocao.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhum animal cadastrado para adoção ainda.</p>
          ) : (
            <>
              {[...Array(Math.ceil(animaisAdocao.length / 3))].map((_, i) =>
                renderizarLinhaAdocao(animaisAdocao, i * 3)
              )}
            </>
          )}
        </aside>

        {/* SEÇÃO DE COMPRA */}
        <section className="secao-compra" aria-labelledby="titulo-resultados-compra">
          <div className="cabecalho-resultados">
            <h2 id="titulo-resultados-compra" className="titulo-resultados-compra">Animais Para Compra</h2>
            <span className="contador-resultados-compra" id="contador-resultados-compra" aria-live="polite">
              {loading ? 'Carregando...' : `${animaisCompra.length} animais encontrados`}
            </span>
          </div>
        </section>

        <aside className="lateral_direito" aria-labelledby="titulo-animais-compra">
          <h2 id="titulo-animais-compra" className="sr-only">Animais em destaque para compra</h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Carregando animais...</p>
          ) : animaisCompra.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhum animal cadastrado para venda ainda.</p>
          ) : (
            <>
              {[...Array(Math.ceil(animaisCompra.length / 3))].map((_, i) =>
                renderizarLinhaCompra(animaisCompra, i * 3)
              )}
            </>
          )}
        </aside>

        {/* SEÇÃO DE ANIMAIS PERDIDOS */}
        <section className="secao-perdidos" aria-labelledby="titulo-resultados-perdidos">
          <div className="cabecalho-resultados">
            <h2 id="titulo-resultados-perdidos" className="titulo-resultados-perdidos">Animais Perdidos</h2>
            <span className="contador-resultados-perdidos" id="contador-resultados-perdidos" aria-live="polite">
              {loading ? 'Carregando...' : `${animaisPerdidos.length} animais encontrados`}
            </span>
          </div>
        </section>

        <aside className="lateral_direito" aria-labelledby="titulo-animais-perdidos">
          <h2 id="titulo-animais-perdidos" className="sr-only">Animais perdidos recentemente</h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Carregando animais...</p>
          ) : animaisPerdidos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhum animal perdido cadastrado ainda.</p>
          ) : (
            <>
              {[...Array(Math.ceil(animaisPerdidos.length / 3))].map((_, i) =>
                renderizarLinhaPerdido(animaisPerdidos, i * 3)
              )}
            </>
          )}
        </aside>
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

    </>
  );
}

export default Menu;