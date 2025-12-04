import { useState, useEffect, useRef } from 'react';
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
import DogSentadoImg from '../../assets/images/dog_sentado.svg';
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
  const reloadTimeoutRef = useRef(null);

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
    
    // Se já vem formatado como string (ex: "R$ 1.500,00"), retorna como está
    if (typeof valor === 'string' && valor.includes('R$')) {
      return valor;
    }
    
    // Se vem como número ou string numérica, formata
    const numerico = typeof valor === 'string' ? parseFloat(valor.replace(/\D/g, '')) / 100 : parseFloat(valor);
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numerico);
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
      setAnimaisAdocao([]);
      console.log('🐾 Carregando animais para adoção...');

      let animaisCarregados = [];
      if (storageDisponivel()) {
        try {
          const resultado = await window.storage.get('animais_adocao', true);
          if (resultado && resultado.value) {
            animaisCarregados = JSON.parse(resultado.value);
          }
        } catch (e) {
          console.warn('Erro ao ler window.storage (adoção) no menu:', e);
        }
      } else {
        try {
          const dados = localStorage.getItem('animais_adocao');
          if (dados) animaisCarregados = JSON.parse(dados);
        } catch (e) {
          console.warn('Erro ao ler localStorage (adoção) no menu:', e);
        }
      }

      setAnimaisAdocao(animaisCarregados);
    } catch (error) {
      console.error('Erro ao carregar animais de adoção:', error);
    }
  };

  // Carregar animais para compra
  const carregarAnimaisCompra = async () => {
    try {
      setAnimaisCompra([]);
      console.log('💰 Carregando animais para compra...');

      let animaisCarregados = [];
      if (storageDisponivel()) {
        try {
          const resultado = await window.storage.get('animais_venda', true);
          if (resultado && resultado.value) {
            animaisCarregados = JSON.parse(resultado.value);
          }
        } catch (e) {
          console.warn('Erro ao ler window.storage (venda) no menu:', e);
        }
      } else {
        try {
          const dados = localStorage.getItem('animais_venda');
          if (dados) animaisCarregados = JSON.parse(dados);
        } catch (e) {
          console.warn('Erro ao ler localStorage (venda) no menu:', e);
        }
      }

      setAnimaisCompra(animaisCarregados);
    } catch (error) {
      console.error('Erro ao carregar animais de venda:', error);
    }
  };

  // Carregar animais perdidos
  const carregarAnimaisPerdidos = async () => {
    try {
      setAnimaisPerdidos([]);
      console.log('🔍 Carregando animais perdidos...');

      let animaisCarregados = [];
      if (storageDisponivel()) {
        try {
          const resultado = await window.storage.get('animais_perdidos', true);
          if (resultado && resultado.value) {
            animaisCarregados = JSON.parse(resultado.value);
          }
        } catch (e) {
          console.warn('Erro ao ler window.storage (perdidos) no menu:', e);
        }
      } else {
        try {
          const dados = localStorage.getItem('animais_perdidos');
          if (dados) animaisCarregados = JSON.parse(dados);
        } catch (e) {
          console.warn('Erro ao ler localStorage (perdidos) no menu:', e);
        }
      }

      setAnimaisPerdidos(animaisCarregados);
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

    // Listener para detectar mudanças no storage (quando novos animais são cadastrados)
    const handleStorageChange = (e) => {
      if (e.key === 'animais_adocao' || e.key === 'animais_venda' || e.key === 'animais_perdidos' || e.key === null) {
        console.log('📦 Alteração detectada no storage, recarregando animais...');
        
        // Limpar timeout anterior se existir
        if (reloadTimeoutRef.current) {
          clearTimeout(reloadTimeoutRef.current);
        }
        
        // Adicionar debounce de 500ms para evitar recarregamentos múltiplos
        reloadTimeoutRef.current = setTimeout(() => {
          carregarTodos();
        }, 500);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listeners customizados para mudanças específicas quando animais são cadastrados
    const handleAdocaoUpdated = () => {
      console.log('🐾 Animais para adoção foram atualizados!');
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      reloadTimeoutRef.current = setTimeout(() => {
        carregarAnimaisAdocao();
      }, 300);
    };

    const handleVendaUpdated = () => {
      console.log('💰 Animais para venda foram atualizados!');
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      reloadTimeoutRef.current = setTimeout(() => {
        carregarAnimaisCompra();
      }, 300);
    };

    const handlePerdidosUpdated = () => {
      console.log('🔍 Animais perdidos foram atualizados!');
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      reloadTimeoutRef.current = setTimeout(() => {
        carregarAnimaisPerdidos();
      }, 300);
    };

    window.addEventListener('animais-adocao-updated', handleAdocaoUpdated);
    window.addEventListener('animais-venda-updated', handleVendaUpdated);
    window.addEventListener('animais-perdidos-updated', handlePerdidosUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('animais-adocao-updated', handleAdocaoUpdated);
      window.removeEventListener('animais-venda-updated', handleVendaUpdated);
      window.removeEventListener('animais-perdidos-updated', handlePerdidosUpdated);
      
      // Limpar timeout ao desmontar
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
    };
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
            src={animal.imagemPrincipal || DogSentadoImg}
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
            src={animal.imagemPrincipal || DogSentadoImg}
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
    // Suporta tanto `dataPerdido` (antigo) quanto `dataDesaparecimento` (salvo pelo formulário)
    const parseDateForDisplay = (raw) => {
      if (!raw) return 'Não informado';
      try {
        let d;
        // Se já for ISO com hora
        if (typeof raw === 'string' && raw.includes('T')) {
          d = new Date(raw);
        } else if (typeof raw === 'string') {
          // Formato yyyy-mm-dd -> anexar hora para evitar timezone inconsistencies
          d = new Date(raw + 'T00:00:00');
        } else {
          d = new Date(raw);
        }
        if (Number.isNaN(d.getTime())) return 'Não informado';
        return d.toLocaleDateString('pt-BR');
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return 'Não informado';
      }
    };

    const dataPerdido = parseDateForDisplay(animal.dataPerdido || animal.dataDesaparecimento);

    return (
      <Link to="/animais-perdidos" style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          className="item_lateral"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <img
            src={animal.imagemPrincipal || DogSentadoImg}
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
              <dd style={{ color: '#dc2626', fontWeight: '700' }}>🚨 {dataPerdido}</dd>
              {animal.tempoDesaparecido && (
                <dd className="tempo-desaparecido" aria-hidden="false">{animal.tempoDesaparecido}</dd>
              )}
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