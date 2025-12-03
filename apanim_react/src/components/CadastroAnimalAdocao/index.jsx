import { useState } from 'react';
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

const CadastroAnimalAdocao = () => {
    const navigate = useNavigate();
    
    // Sistema de Modal
    const { 
        Modal, 
        alertaSucesso, 
        alertaErro, 
        alertaAviso 
    } = useModal();

    // Estados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        raca: '',
        porte: '',
        sexo: '',
        especie: '',
        cor: '',
        vacinado: '',
        castrado: '',
        vermifugado: '',
        vacinas: [],
        condicaoEspecial: '',
        localizacao: '',
        emailContato: '',
        telefoneContato: '',
        resumo: ''
    });

    const [imagemPrincipal, setImagemPrincipal] = useState(null);
    const [previewImagem, setPreviewImagem] = useState(null);
    const [midiasExtras, setMidiasExtras] = useState([]);
    const [previewMidias, setPreviewMidias] = useState([]);
    const [mostrarVacinas, setMostrarVacinas] = useState(false);
    const [contadorCaracteres, setContadorCaracteres] = useState(100);

    // Handler genérico para inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler para radio buttons
    const handleRadioChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Mostrar/ocultar vacinas
        if (name === 'vacinado') {
            setMostrarVacinas(value === 'sim');
            if (value === 'nao') {
                setFormData(prev => ({
                    ...prev,
                    vacinas: []
                }));
            }
        }
    };

    // Handler para checkboxes de vacinas
    const handleVacinaChange = (vacina) => {
        setFormData(prev => {
            const vacinas = prev.vacinas.includes(vacina)
                ? prev.vacinas.filter(v => v !== vacina)
                : [...prev.vacinas, vacina];
            return { ...prev, vacinas };
        });
    };

    // Handler para textarea do resumo
    const handleResumoChange = (e) => {
        const texto = e.target.value;
        if (texto.length <= 100) {
            setFormData(prev => ({ ...prev, resumo: texto }));
            setContadorCaracteres(100 - texto.length);
        }
    };

    // Handler para telefone com máscara
    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
        }
        
        setFormData(prev => ({ ...prev, telefoneContato: value }));
    };

    // Handler para upload de imagem principal
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alertaErro('Erro', 'A imagem deve ter no máximo 5MB');
                return;
            }

            // Validar tipo
            if (!file.type.startsWith('image/')) {
                alertaErro('Erro', 'Por favor, selecione apenas imagens');
                return;
            }

            setImagemPrincipal(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImagem(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler para mídias extras
    const handleMidiasExtrasChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validar quantidade (máximo 10 arquivos)
        if (files.length > 10) {
            alertaErro('Erro', 'Máximo de 10 arquivos permitidos');
            return;
        }

        // Validar tamanho de cada arquivo
        const arquivosGrandes = files.filter(f => f.size > 10 * 1024 * 1024);
        if (arquivosGrandes.length > 0) {
            alertaErro('Erro', 'Cada arquivo deve ter no máximo 10MB');
            return;
        }

        setMidiasExtras(files);

        const previews = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                previews.push({
                    tipo: file.type.startsWith('video/') ? 'video' : 'imagem',
                    src: event.target.result,
                    nome: file.name
                });
                if (previews.length === files.length) {
                    setPreviewMidias(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Verificar disponibilidade do storage
    const storageDisponivel = () => {
        return typeof window !== 'undefined' &&
            typeof window.storage !== 'undefined' &&
            typeof window.storage.set === 'function';
    };

    // Handler do submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações
        if (!formData.nome.trim()) {
            await alertaErro('Campo Obrigatório', 'Por favor, preencha o nome do animal');
            return;
        }

        if (!formData.especie) {
            await alertaErro('Campo Obrigatório', 'Por favor, selecione a espécie do animal');
            return;
        }

        if (!formData.localizacao) {
            await alertaErro('Campo Obrigatório', 'Por favor, selecione a localização');
            return;
        }

        if (!formData.emailContato && !formData.telefoneContato) {
            await alertaErro('Campo Obrigatório', 'Por favor, informe pelo menos um meio de contato');
            return;
        }

        if (!imagemPrincipal) {
            await alertaErro('Campo Obrigatório', 'Por favor, adicione uma foto do animal');
            return;
        }

        if (!formData.resumo.trim()) {
            await alertaErro('Campo Obrigatório', 'Por favor, adicione um resumo sobre o animal');
            return;
        }

        // Preparar dados para salvar
        const animalData = {
            ...formData,
            id: Date.now().toString(),
            imagemPrincipal: previewImagem,
            midiasExtras: previewMidias,
            dataCadastro: new Date().toISOString(),
            status: 'ativo',
            tipo: 'adocao'
        };

        try {
            let animaisExistentes = [];

            // Tentar usar window.storage primeiro
            if (storageDisponivel()) {
                const resultado = await window.storage.get('animais_adocao', true);
                if (resultado && resultado.value) {
                    animaisExistentes = JSON.parse(resultado.value);
                }
            } else {
                // Fallback para localStorage
                const dados = localStorage.getItem('animais_adocao');
                if (dados) {
                    animaisExistentes = JSON.parse(dados);
                }
            }

            // Adicionar novo animal
            animaisExistentes.push(animalData);

            // Salvar
            if (storageDisponivel()) {
                await window.storage.set('animais_adocao', JSON.stringify(animaisExistentes), true);
            } else {
                localStorage.setItem('animais_adocao', JSON.stringify(animaisExistentes));
            }

            await alertaSucesso('Sucesso!', 'Animal cadastrado para adoção com sucesso! 🎉');

            // Aguardar um pouco e redirecionar
            setTimeout(() => {
                navigate('/adocao-animal');
            }, 2000);

        } catch (error) {
            console.error('Erro ao salvar animal:', error);
            await alertaErro('Erro', 'Erro ao cadastrar animal. Tente novamente.');
        }
    };

    return (
        <>
            {/* Modal System */}
            {Modal}

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

            {/* Scroll to Top */}
            <ScrollTop />

            {/* Conteúdo Central */}
            <div className="central">
                {/* Patas decorativas */}
                {[...Array(24)].map((_, i) => (
                    <div key={i} className={`patas${i + 1}`}>
                        <img src={PataImg} alt="pata" />
                    </div>
                ))}

                {/* Container do formulário */}
                <div className="container">
                    <h2>🐾 Cadastro de Animal para Adoção</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Nome do Animal */}
                        <div className="form-group">
                            <label htmlFor="nome-animal" className="form-label">Nome do Animal *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nome-animal" 
                                name="nome" 
                                placeholder="Digite o nome do animal" 
                                value={formData.nome}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        {/* Espécie */}
                        <div className="form-group">
                            <label htmlFor="especie-animal" className="form-label">Espécie *</label>
                            <select 
                                className="form-control" 
                                id="especie-animal" 
                                name="especie"
                                value={formData.especie}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione a espécie</option>
                                <option value="cao">Cão</option>
                                <option value="gato">Gato</option>
                            </select>
                        </div>

                        {/* Idade */}
                        <div className="form-group">
                            <label htmlFor="idade-animal" className="form-label">Idade Aproximada</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="idade-animal" 
                                name="idade" 
                                placeholder="Ex: 2 anos, 6 meses..." 
                                value={formData.idade}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Raça */}
                        <div className="form-group">
                            <label htmlFor="raca-animal" className="form-label">Raça</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="raca-animal" 
                                name="raca" 
                                placeholder="Digite a raça ou 'SRD' (Sem Raça Definida)" 
                                value={formData.raca}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Porte */}
                        <div className="form-group">
                            <label className="form-label">Porte</label>
                            <div className="form-check-group">
                                {['pequeno', 'medio', 'grande'].map((porte) => (
                                    <div key={porte} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="porte" 
                                            id={`porte-${porte}`}
                                            checked={formData.porte === porte}
                                            onChange={() => handleRadioChange('porte', porte)}
                                        />
                                        <label className="form-check-label" htmlFor={`porte-${porte}`}>
                                            {porte.charAt(0).toUpperCase() + porte.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sexo */}
                        <div className="form-group">
                            <label className="form-label">Sexo</label>
                            <div className="form-check-group">
                                {['macho', 'femea'].map((sexo) => (
                                    <div key={sexo} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="sexo" 
                                            id={`sexo-${sexo}`}
                                            checked={formData.sexo === sexo}
                                            onChange={() => handleRadioChange('sexo', sexo)}
                                        />
                                        <label className="form-check-label" htmlFor={`sexo-${sexo}`}>
                                            {sexo === 'femea' ? 'Fêmea' : 'Macho'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cor */}
                        <div className="form-group">
                            <label htmlFor="cor-animal" className="form-label">Cor Predominante</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cor-animal" 
                                name="cor" 
                                placeholder="Ex: Preto, Branco, Caramelo, Rajado..." 
                                value={formData.cor}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Vacinado */}
                        <div className="form-group">
                            <label className="form-label">Vacinado?</label>
                            <div className="form-check-group">
                                {['sim', 'nao', 'nao-sei'].map((opcao) => (
                                    <div key={opcao} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="vacinado" 
                                            id={`vacinado-${opcao}`}
                                            checked={formData.vacinado === opcao}
                                            onChange={() => handleRadioChange('vacinado', opcao)}
                                        />
                                        <label className="form-check-label" htmlFor={`vacinado-${opcao}`}>
                                            {opcao === 'sim' ? 'Sim' : opcao === 'nao' ? 'Não' : 'Não sei'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vacinas (condicional) */}
                        {mostrarVacinas && (
                            <div id="vacinas-grupo">
                                <label className="form-label">Quais vacinas o animal possui?</label>
                                <div className="form-check-group">
                                    {['V8', 'V10', 'Antirrábica', 'Gripe (Bronquite)', 'Giardia', 'Leishmaniose'].map((vacina) => (
                                        <div key={vacina} className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id={`vacina-${vacina.toLowerCase().replace(/\s/g, '-')}`}
                                                checked={formData.vacinas.includes(vacina)}
                                                onChange={() => handleVacinaChange(vacina)}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor={`vacina-${vacina.toLowerCase().replace(/\s/g, '-')}`}
                                            >
                                                {vacina}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Castrado */}
                        <div className="form-group">
                            <label className="form-label">Castrado?</label>
                            <div className="form-check-group">
                                {['sim', 'nao', 'nao-sei'].map((opcao) => (
                                    <div key={opcao} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="castrado" 
                                            id={`castrado-${opcao}`}
                                            checked={formData.castrado === opcao}
                                            onChange={() => handleRadioChange('castrado', opcao)}
                                        />
                                        <label className="form-check-label" htmlFor={`castrado-${opcao}`}>
                                            {opcao === 'sim' ? 'Sim' : opcao === 'nao' ? 'Não' : 'Não sei'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vermifugado */}
                        <div className="form-group">
                            <label className="form-label">Vermifugado?</label>
                            <div className="form-check-group">
                                {['sim', 'nao', 'nao-sei'].map((opcao) => (
                                    <div key={opcao} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="vermifugado" 
                                            id={`vermifugado-${opcao}`}
                                            checked={formData.vermifugado === opcao}
                                            onChange={() => handleRadioChange('vermifugado', opcao)}
                                        />
                                        <label className="form-check-label" htmlFor={`vermifugado-${opcao}`}>
                                            {opcao === 'sim' ? 'Sim' : opcao === 'nao' ? 'Não' : 'Não sei'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Condição Especial */}
                        <div className="form-group">
                            <label htmlFor="condicao-especial" className="form-label">Condição Especial</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="condicao-especial" 
                                name="condicaoEspecial" 
                                placeholder="Ex: Cego, Deficiência física, etc." 
                                value={formData.condicaoEspecial}
                                onChange={handleInputChange}
                            />
                            <small className="form-text">Informe se o animal tem alguma necessidade especial</small>
                        </div>

                        {/* Localização - Bairros de Salvador */}
                        <div className="form-group">
                            <label htmlFor="localizacao-animal" className="form-label">Localização (Bairro) *</label>
                            <select 
                                className="form-control" 
                                id="localizacao-animal" 
                                name="localizacao"
                                value={formData.localizacao}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione o bairro</option>
                                <option value="acupe_de_brotas">Acupe de Brotas</option>
                                <option value="aeroporto">Aeroporto</option>
                                <option value="amaralina">Amaralina</option>
                                <option value="barra">Barra</option>
                                <option value="brotas">Brotas</option>
                                <option value="cabula">Cabula</option>
                                <option value="cajazeiras">Cajazeiras</option>
                                <option value="caminho_das_arvores">Caminho das Árvores</option>
                                <option value="canela">Canela</option>
                                <option value="centro">Centro</option>
                                <option value="costa_azul">Costa Azul</option>
                                <option value="federacao">Federação</option>
                                <option value="graca">Graça</option>
                                <option value="imbui">Imbuí</option>
                                <option value="itaigara">Itaigara</option>
                                <option value="itapua">Itapuã</option>
                                <option value="ondina">Ondina</option>
                                <option value="patamares">Patamares</option>
                                <option value="piata">Piatã</option>
                                <option value="pituba">Pituba</option>
                                <option value="rio_vermelho">Rio Vermelho</option>
                                <option value="stella_maris">Stella Maris</option>
                                <option value="vitoria">Vitória</option>
                            </select>
                            <small className="form-text">Informe o bairro onde o animal se encontra</small>
                        </div>

                        {/* Email de Contato */}
                        <div className="form-group">
                            <label htmlFor="email-contato" className="form-label">Email de Contato</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email-contato" 
                                name="emailContato" 
                                placeholder="exemplo@email.com" 
                                value={formData.emailContato}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Telefone de Contato */}
                        <div className="form-group">
                            <label htmlFor="telefone-contato" className="form-label">Telefone de Contato</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="telefone-contato" 
                                name="telefoneContato" 
                                placeholder="(00) 00000-0000" 
                                value={formData.telefoneContato}
                                onChange={handleTelefoneChange}
                                maxLength="15"
                            />
                            <small className="form-text">Informe pelo menos um meio de contato (email ou telefone)</small>
                        </div>

                        {/* Upload de Imagem do Animal */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="imagem-animal">Foto do Animal *</label>
                            <small className="form-text">Esta será a foto principal exibida nos anúncios (máx. 5MB)</small>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="imagem-animal" 
                                accept="image/*" 
                                onChange={handleImagemChange}
                                required 
                            />
                            <div id="preview-container">
                                {previewImagem && (
                                    <img 
                                        id="preview-imagem" 
                                        src={previewImagem} 
                                        alt="Preview da imagem" 
                                        style={{ display: 'block' }} 
                                    />
                                )}
                            </div>
                        </div>

                        {/* Mídias Extras */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="midias-extras">Fotos e Vídeos Extras (Opcional)</label>
                            <small className="form-text">Máximo de 10 arquivos, cada um com até 10MB</small>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="midias-extras" 
                                accept="image/*,video/*" 
                                multiple
                                onChange={handleMidiasExtrasChange}
                            />
                            
                            {previewMidias.length > 0 && (
                                <div className="preview-midias-extras">
                                    {previewMidias.map((media, index) => (
                                        <div key={index} className="preview-item">
                                            {media.tipo === 'video' ? (
                                                <video controls src={media.src}></video>
                                            ) : (
                                                <img src={media.src} alt={`Preview ${index + 1}`} />
                                            )}
                                            <span className="preview-badge">
                                                {media.tipo === 'video' ? '📹 Vídeo' : '📷 Foto'}
                                            </span>
                                        </div>
                                    ))}
                                    <p className="preview-info">{previewMidias.length} arquivo(s) selecionado(s)</p>
                                </div>
                            )}
                        </div>

                        {/* Resumo */}
                        <div className="form-group">
                            <label htmlFor="resumo-animal" className="form-label">Descrição do Animal (até 100 caracteres) *</label>
                            <textarea 
                                className="form-control" 
                                id="resumo-animal" 
                                name="resumo" 
                                rows="3" 
                                placeholder="Breve descrição do animal..." 
                                maxLength="100"
                                value={formData.resumo}
                                onChange={handleResumoChange}
                                required
                            ></textarea>
                            <small className="form-text">
                                Caracteres restantes: <span 
                                    id="contador-caracteres"
                                    style={{ color: contadorCaracteres < 20 ? '#dc2626' : '#5a2a2a' }}
                                >
                                    {contadorCaracteres}
                                </span>
                            </small>
                        </div>

                        <button type="submit" className="botao_cadastrar">
                            🐾 Cadastrar Animal para Adoção
                        </button>
                    </form>

                    <img src={DogAndCatImg} alt="Cachorro e gato" style={{ marginTop: '30px' }} />
                </div>
            </div>

            {/* Footer */}
            <footer className="base">
                <div className="redes_sociais">
                    <a href="https://instagram.com/apanim" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src={InstagramImg} alt="Siga-nos no Instagram" />
                    </a>
                    <a href="mailto:apanim.amor.protecao@gmail.com" aria-label="Email">
                        <img src={EmailImg} alt="Entre em contato por email" />
                    </a>
                </div>

                <nav className="links_uteis" aria-label="Links úteis">
                    <div>
                        <span className="titulo">Encontre um novo pet</span><br />
                        <Link to="/adocao-animal"><span>Adote um novo amigo</span></Link><br />
                        <Link to="/compra-animal"><span>Compre um animal</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Colabore</span><br />
                        <Link to="/parceria"><span>Seja uma empresa parceira</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Divulgue um animal</span><br />
                        <Link to="/cadastro-animal-adocao"><span>Cadastrar animal para adoção</span></Link><br />
                        <Link to="/cadastro-animal-venda"><span>Cadastrar animal para venda</span></Link><br />
                        <Link to="/cadastro-animal-perdido"><span>Cadastrar animal perdido</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Encontre um animal</span><br />
                        <Link to="/animais-perdidos"><span>Animais perdidos</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Sobre o APANIM</span><br />
                        <Link to="/apanim"><span>APANIM</span></Link><br />
                        <Link to="/servicos"><span>Serviços</span></Link>
                    </div>
                    <div>
                        <span className="titulo">Meu perfil</span><br />
                        <Link to="/cadastro"><span>Cadastrar-se</span></Link><br />
                        <Link to="/login"><span>Login</span></Link>
                    </div>
                </nav>

                <div className="forum">
                    <a href="#" aria-label="Fórum">
                        <img src={ForumImg} alt="Acesse nosso fórum" />
                    </a>
                </div>
            </footer>
        </>
    );
};

export default CadastroAnimalAdocao;