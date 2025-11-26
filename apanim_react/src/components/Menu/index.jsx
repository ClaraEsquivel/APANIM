import { useState, useEffect } from 'react';
import MenuUnificado from '../MenuUnificado';
import '../../components/ScrollTop/scroll-top.js';
import './style.css';
import '../../components/MenuUnificado/menu-styles.css';
import '../../components/MenuUnificado/header-unificado.css';
import '../../components/MenuUnificado/footer-unificado.css';
import PawsImg from '../../assets/images/Paws.svg';
import LogoImg from '../../assets/images/APANIM_logo.svg';
import DogSentadoImg from '../../assets/images/dog_sentado.svg';
import CatImg from '../../assets/images/cat.svg';
import DogImg from '../../assets/images/dog.svg';
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';
import { Link } from 'react-router-dom';


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
  });

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
      <article
        className="item_lateral"
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onClick={() => window.location.href = '../CompraAnimal/index.html'}
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
    );
  };

  // Componente de Card de Perdido
  const CardPerdido = ({ animal }) => {
    const localizacao = formatarLocalizacao(animal.localizacao);
    const dataPerdido = animal.dataPerdido
      ? new Date(animal.dataPerdido).toLocaleDateString('pt-BR')
      : 'Não informado';

    return (
      <article
        className="item_lateral"
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onClick={() => window.location.href = '../AnimaisPerdidos/index.html'}
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
    );
  };

  // Renderizar linha de animais
  const renderizarLinha = (animais, indiceInicial) => {
    const animaisDaLinha = animais.slice(indiceInicial, indiceInicial + 3);

    return (
      <section
        key={indiceInicial}
        className="linha_lateral"
        aria-label={`Linha ${Math.floor(indiceInicial / 3) + 1} de animais`}
      >
        {animaisDaLinha.map((animal, idx) => (
          <CardComponent key={idx} animal={animal} />
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

      <main className="central">
        <section className="conteudo_principal" aria-labelledby="titulo-principal">
          <h1 id="titulo-principal" className="sr-only">Serviços principais do APANIM</h1>

          <div className="botoes-principais" role="group" aria-label="Principais serviços disponíveis">

            <a href="../CompraAnimal/index.jsx">
              <button type="button" id="quero_comprar" aria-describedby="desc-comprar">
                Quero Comprar um Animal
              </button>
            </a>

            <Link to="/adocao-animal">
              <button type="button" id="quero_adotar" aria-describedby="desc-adotar">
                Quero Adotar um Animal
              </button>
            </Link>

            <a href="../AnimaisPerdidos/index.jsx">
              <button type="button" id="divulgar_animal_perdido" aria-describedby="desc-perdido">
                Divulgação de Animais Perdidos
              </button>
            </a>

            <a href="../Serviços/index.jsx">
              <button type="button" id="servicos" aria-describedby="desc-servicos">
                Nossos Serviços
              </button>
            </a>

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
                renderizarLinha(animaisAdocao, i * 3, CardAdocao)
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
                renderizarLinha(animaisCompra, i * 3, CardCompra)
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
                renderizarLinha(animaisPerdidos, i * 3, CardPerdido)
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
            <Link to="/adocao-animal"><span>Adote</span></Link><br />
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
            <span>APANIM</span>
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
}

export default Menu;