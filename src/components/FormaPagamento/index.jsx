import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import InstagramImg from '../../assets/images/instagram.svg';
import EmailImg from '../../assets/images/email.svg';
import ForumImg from '../../assets/images/forum.svg';

const FormasPagamento = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [tipoProduto, setTipoProduto] = useState(''); // 'plano' ou 'boost'
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [dadosCartao, setDadosCartao] = useState({
        numero: '',
        nome: '',
        validade: '',
        cvv: ''
    });
    const [dadosPix, setDadosPix] = useState({
        cpfCnpj: ''
    });
    const [dadosBoleto, setDadosBoleto] = useState({
        cpfCnpj: '',
        nome: '',
        email: ''
    });
    const [processando, setProcessando] = useState(false);

    useEffect(() => {
        // Detecta se é plano ou boost
        if (location.state?.plano) {
            setProdutoSelecionado(location.state.plano);
            setTipoProduto('plano');
        } else if (location.state?.boost) {
            setProdutoSelecionado(location.state.boost);
            setTipoProduto('boost');
        } else {
            // Se não houver produto selecionado, redireciona para página de planos
            navigate('/planos-assinatura');
        }

        // Animações de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.payment-card, .resume-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, [location, navigate]);

    const handleMetodoPagamentoChange = (metodo) => {
        setMetodoPagamento(metodo);
        setEtapaAtual(2);
    };

    const formatarNumeroCartao = (valor) => {
        const numeros = valor.replace(/\D/g, '');
        const grupos = numeros.match(/.{1,4}/g);
        return grupos ? grupos.join(' ') : numeros;
    };

    const formatarValidade = (valor) => {
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length >= 2) {
            return numeros.slice(0, 2) + '/' + numeros.slice(2, 4);
        }
        return numeros;
    };

    const formatarCPFCNPJ = (valor) => {
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length <= 11) {
            // CPF
            return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else {
            // CNPJ
            return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
    };

    const handleInputChange = (e, tipo) => {
        const { name, value } = e.target;
        
        if (tipo === 'cartao') {
            let valorFormatado = value;
            if (name === 'numero') {
                valorFormatado = formatarNumeroCartao(value);
            } else if (name === 'validade') {
                valorFormatado = formatarValidade(value);
            } else if (name === 'cvv') {
                valorFormatado = value.replace(/\D/g, '').slice(0, 4);
            }
            setDadosCartao({ ...dadosCartao, [name]: valorFormatado });
        } else if (tipo === 'pix') {
            const valorFormatado = name === 'cpfCnpj' ? formatarCPFCNPJ(value) : value;
            setDadosPix({ ...dadosPix, [name]: valorFormatado });
        } else if (tipo === 'boleto') {
            const valorFormatado = name === 'cpfCnpj' ? formatarCPFCNPJ(value) : value;
            setDadosBoleto({ ...dadosBoleto, [name]: valorFormatado });
        }
    };

    const validarCartao = () => {
        const { numero, nome, validade, cvv } = dadosCartao;
        return numero.replace(/\s/g, '').length === 16 &&
               nome.length >= 3 &&
               validade.length === 5 &&
               cvv.length >= 3;
    };

    const validarPix = () => {
        return dadosPix.cpfCnpj.replace(/\D/g, '').length >= 11;
    };

    const validarBoleto = () => {
        const { cpfCnpj, nome, email } = dadosBoleto;
        return cpfCnpj.replace(/\D/g, '').length >= 11 &&
               nome.length >= 3 &&
               email.includes('@');
    };

    const processarPagamento = async () => {
        let valido = false;

        if (metodoPagamento === 'cartao') {
            valido = validarCartao();
        } else if (metodoPagamento === 'pix') {
            valido = validarPix();
        } else if (metodoPagamento === 'boleto') {
            valido = validarBoleto();
        }

        if (!valido) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        setProcessando(true);

        // Simula processamento
        setTimeout(() => {
            setProcessando(false);
            setEtapaAtual(3);
        }, 2000);
    };

    const voltarParaProdutos = () => {
        if (tipoProduto === 'plano') {
            navigate('/planos-assinatura');
        } else {
            navigate('/planos-assinatura#boost'); // Navega para seção de boost
        }
    };

    // Função para obter nome do produto
    const getNomeProduto = () => {
        if (tipoProduto === 'plano') {
            return produtoSelecionado?.nome || '';
        } else {
            return `Boost ${produtoSelecionado?.duracao || ''}`;
        }
    };

    // Função para obter descrição do produto
    const getDescricaoProduto = () => {
        if (tipoProduto === 'plano') {
            return produtoSelecionado?.descricao || '';
        } else {
            return 'Destaque seu anúncio e alcance mais pessoas';
        }
    };

    if (!produtoSelecionado) {
        return null;
    }

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

                <nav role="navigation">
                    <MenuUnificado />
                </nav>
            </header>

            <ScrollTop />

            {/* Hero Section */}
            <section className="hero-payment">
                <div className="hero-content">
                    <h1>Forma de Pagamento</h1>
                    <p>Escolha a melhor forma de pagamento para você</p>
                </div>
            </section>

            {/* Container Principal */}
            <main className="payment-container">
                
                {/* Indicador de Etapas */}
                <div className="steps-indicator">
                    <div className={`step ${etapaAtual >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <span>Método</span>
                    </div>
                    <div className={`step-line ${etapaAtual >= 2 ? 'active' : ''}`}></div>
                    <div className={`step ${etapaAtual >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <span>Dados</span>
                    </div>
                    <div className={`step-line ${etapaAtual >= 3 ? 'active' : ''}`}></div>
                    <div className={`step ${etapaAtual >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <span>Confirmação</span>
                    </div>
                </div>

                {/* Layout de Pagamento */}
                <div className="payment-layout">
                    
                    {/* Coluna Esquerda - Formulários */}
                    <div className="payment-forms">
                        
                        {/* Etapa 1: Escolher Método */}
                        {etapaAtual === 1 && (
                            <div className="payment-methods">
                                <h2>Escolha o Método de Pagamento</h2>
                                
                                <div className="payment-options">
                                    <button 
                                        className={`payment-option ${metodoPagamento === 'cartao' ? 'selected' : ''}`}
                                        onClick={() => handleMetodoPagamentoChange('cartao')}
                                    >
                                        <div className="payment-icon">💳</div>
                                        <div className="payment-info">
                                            <h3>Cartão de Crédito</h3>
                                            <p>Pagamento instantâneo e seguro</p>
                                        </div>
                                    </button>

                                    <button 
                                        className={`payment-option ${metodoPagamento === 'pix' ? 'selected' : ''}`}
                                        onClick={() => handleMetodoPagamentoChange('pix')}
                                    >
                                        <div className="payment-icon">📱</div>
                                        <div className="payment-info">
                                            <h3>PIX</h3>
                                            <p>Aprovação imediata via QR Code</p>
                                        </div>
                                    </button>

                                    <button 
                                        className={`payment-option ${metodoPagamento === 'boleto' ? 'selected' : ''}`}
                                        onClick={() => handleMetodoPagamentoChange('boleto')}
                                    >
                                        <div className="payment-icon">🏦</div>
                                        <div className="payment-info">
                                            <h3>Boleto Bancário</h3>
                                            <p>Vencimento em 3 dias úteis</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Etapa 2: Formulários de Pagamento */}
                        {etapaAtual === 2 && metodoPagamento === 'cartao' && (
                            <div className="payment-card">
                                <button 
                                    className="back-to-methods"
                                    onClick={() => setEtapaAtual(1)}
                                >
                                    ← Voltar aos métodos
                                </button>

                                <h2>Dados do Cartão</h2>
                                
                                <form className="payment-form">
                                    <div className="form-group">
                                        <label>Número do Cartão</label>
                                        <input 
                                            type="text" 
                                            name="numero"
                                            placeholder="0000 0000 0000 0000"
                                            maxLength="19"
                                            value={dadosCartao.numero}
                                            onChange={(e) => handleInputChange(e, 'cartao')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nome no Cartão</label>
                                        <input 
                                            type="text" 
                                            name="nome"
                                            placeholder="Como está impresso no cartão"
                                            value={dadosCartao.nome}
                                            onChange={(e) => handleInputChange(e, 'cartao')}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Validade</label>
                                            <input 
                                                type="text" 
                                                name="validade"
                                                placeholder="MM/AA"
                                                maxLength="5"
                                                value={dadosCartao.validade}
                                                onChange={(e) => handleInputChange(e, 'cartao')}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input 
                                                type="text" 
                                                name="cvv"
                                                placeholder="123"
                                                maxLength="4"
                                                value={dadosCartao.cvv}
                                                onChange={(e) => handleInputChange(e, 'cartao')}
                                            />
                                        </div>
                                    </div>

                                    <div className="security-info">
                                        <span>🔒</span>
                                        <p>Seus dados estão protegidos com criptografia SSL de ponta a ponta</p>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="btn-confirm-payment"
                                        onClick={processarPagamento}
                                        disabled={processando}
                                    >
                                        {processando ? 'Processando...' : 'Confirmar Pagamento'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {etapaAtual === 2 && metodoPagamento === 'pix' && (
                            <div className="payment-card">
                                <button 
                                    className="back-to-methods"
                                    onClick={() => setEtapaAtual(1)}
                                >
                                    ← Voltar aos métodos
                                </button>

                                <h2>Pagamento via PIX</h2>
                                
                                <form className="payment-form">
                                    <div className="form-group">
                                        <label>CPF ou CNPJ</label>
                                        <input 
                                            type="text" 
                                            name="cpfCnpj"
                                            placeholder="000.000.000-00"
                                            value={dadosPix.cpfCnpj}
                                            onChange={(e) => handleInputChange(e, 'pix')}
                                        />
                                    </div>

                                    <div className="pix-info">
                                        <div className="pix-qrcode">
                                            <div className="qrcode-placeholder">
                                                <span>📱</span>
                                                <p>O QR Code será gerado após confirmar seus dados</p>
                                            </div>
                                        </div>

                                        <div className="pix-instructions">
                                            <h3>Como pagar com PIX:</h3>
                                            <ol>
                                                <li>Confirme seus dados acima</li>
                                                <li>Abra o app do seu banco</li>
                                                <li>Escaneie o QR Code gerado</li>
                                                <li>Confirme o pagamento</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="btn-confirm-payment"
                                        onClick={processarPagamento}
                                        disabled={processando}
                                    >
                                        {processando ? 'Gerando QR Code...' : 'Gerar QR Code'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {etapaAtual === 2 && metodoPagamento === 'boleto' && (
                            <div className="payment-card">
                                <button 
                                    className="back-to-methods"
                                    onClick={() => setEtapaAtual(1)}
                                >
                                    ← Voltar aos métodos
                                </button>

                                <h2>Dados para Boleto</h2>
                                
                                <form className="payment-form">
                                    <div className="form-group">
                                        <label>CPF ou CNPJ</label>
                                        <input 
                                            type="text" 
                                            name="cpfCnpj"
                                            placeholder="000.000.000-00"
                                            value={dadosBoleto.cpfCnpj}
                                            onChange={(e) => handleInputChange(e, 'boleto')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nome Completo</label>
                                        <input 
                                            type="text" 
                                            name="nome"
                                            placeholder="Seu nome completo"
                                            value={dadosBoleto.nome}
                                            onChange={(e) => handleInputChange(e, 'boleto')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>E-mail</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            placeholder="seu@email.com"
                                            value={dadosBoleto.email}
                                            onChange={(e) => handleInputChange(e, 'boleto')}
                                        />
                                    </div>

                                    <div className="boleto-info">
                                        <span>⚠️</span>
                                        <p>O boleto será enviado para o e-mail informado e tem vencimento em 3 dias úteis</p>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="btn-confirm-payment"
                                        onClick={processarPagamento}
                                        disabled={processando}
                                    >
                                        {processando ? 'Gerando Boleto...' : 'Gerar Boleto'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Etapa 3: Confirmação */}
                        {etapaAtual === 3 && (
                            <div className="payment-card success-card">
                                <div className="success-icon">✓</div>
                                <h2>Pagamento Confirmado!</h2>
                                <p className="success-message">
                                    {tipoProduto === 'plano' 
                                        ? `Sua assinatura do plano ${produtoSelecionado.nome} foi confirmada com sucesso!`
                                        : `Seu anúncio será destacado por ${produtoSelecionado.duracao}!`
                                    }
                                </p>

                                {metodoPagamento === 'boleto' && (
                                    <div className="download-boleto">
                                        <button className="btn-download">
                                            📄 Baixar Boleto
                                        </button>
                                        <p className="download-info">O boleto também foi enviado para seu e-mail</p>
                                    </div>
                                )}

                                {metodoPagamento === 'pix' && (
                                    <div className="pix-confirmed">
                                        <p>
                                            {tipoProduto === 'plano' 
                                                ? 'Pagamento identificado! Sua assinatura já está ativa.'
                                                : 'Pagamento identificado! Seu boost está ativo.'
                                            }
                                        </p>
                                    </div>
                                )}

                                <div className="success-actions">
                                    <Link to="/perfil-vendedor" className="btn-go-profile">
                                        Ir para Meu Perfil
                                    </Link>
                                    <button className="btn-back-home" onClick={voltarParaProdutos}>
                                        {tipoProduto === 'plano' ? 'Ver Outros Planos' : 'Ver Outros Boosts'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coluna Direita - Resumo */}
                    <div className="payment-resume">
                        <div className="resume-card">
                            <h3>Resumo do Pedido</h3>
                            
                            <div className="resume-plan">
                                {produtoSelecionado.badge && (
                                    <div className="plan-badge">{produtoSelecionado.badge}</div>
                                )}
                                <h4>{getNomeProduto()}</h4>
                                <p className="plan-description">{getDescricaoProduto()}</p>
                            </div>

                            <div className="resume-divider"></div>

                            <div className="resume-items">
                                <div className="resume-item">
                                    <span>{tipoProduto === 'plano' ? 'Plano mensal' : 'Boost de anúncio'}</span>
                                    <strong>{produtoSelecionado.preco}</strong>
                                </div>
                                <div className="resume-item">
                                    <span>Taxa de processamento</span>
                                    <strong className="free">Grátis</strong>
                                </div>
                            </div>

                            <div className="resume-divider"></div>

                            <div className="resume-total">
                                <span>Total</span>
                                <strong className="total-value">{produtoSelecionado.preco}</strong>
                            </div>

                            <div className="resume-info">
                                {tipoProduto === 'plano' ? (
                                    <>
                                        <p>✓ Cobrança recorrente mensal</p>
                                        <p>✓ Cancele quando quiser</p>
                                        <p>✓ Sem taxas de cancelamento</p>
                                    </>
                                ) : (
                                    <>
                                        <p>✓ Pagamento único</p>
                                        <p>✓ Ativação imediata</p>
                                        <p>✓ Duração: {produtoSelecionado.duracao}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="resume-card security-card">
                            <h4>Segurança Garantida</h4>
                            <div className="security-items">
                                <div className="security-item">
                                    <span>🔒</span>
                                    <p>Criptografia SSL</p>
                                </div>
                                <div className="security-item">
                                    <span>🛡️</span>
                                    <p>Dados protegidos</p>
                                </div>
                                <div className="security-item">
                                    <span>✓</span>
                                    <p>Pagamento seguro</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <img src={InstagramImg} alt="Siga-nos no Instagram"/>
                    <img src={EmailImg} alt="Entre em contato por email"/>
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <Link to="/adocao-animal"><span>Adote</span><br /></Link>
                        <Link to="/compra-animal"><span>Compre</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"><span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"><span>Cadastrar animal para adoção</span><br /></Link>
                        <Link to="/cadastro-animal-venda"><span>Cadastrar animal para venda</span><br /></Link>
                        <Link to="/cadastro-animal-perdido"><span>Cadastrar animal perdido</span><br /></Link>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"><span>Animais perdidos</span><br /></Link>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"><span>APANIM</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"><span>Cadastrar-se</span><br /></Link>
                        <Link to="/perfil-usuario"><span>Minha página de usuário</span><br /></Link>
                        <Link to="/perfil-vendedor"><span>Minha página de vendedor</span><br /></Link>
                    </div>
                </nav>

                <div className="forum">
                    <img src={ForumImg} alt="Acesse nosso fórum"/>
                </div>
            </footer>

            <ScrollTop />
        </>
    );
};

export default FormasPagamento;