import React, { useState, useEffect } from 'react';
import './styles.css';

const CadastroAnimalPerdido = () => {
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
        dataDesaparecimento: '',
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
    const [tempoDesaparecido, setTempoDesaparecido] = useState('');
    const [dataMaxima, setDataMaxima] = useState('');

    // Configurar data máxima (hoje) ao montar o componente
    useEffect(() => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataHoje = `${ano}-${mes}-${dia}`;
        setDataMaxima(dataHoje);
    }, []);

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

    // Handler para upload de imagem principal
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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

    // Calcular tempo de desaparecimento
    const handleDataDesaparecimentoChange = (e) => {
        const dataValue = e.target.value;
        setFormData(prev => ({ ...prev, dataDesaparecimento: dataValue }));

        if (dataValue) {
            const dataSelecionada = new Date(dataValue + 'T00:00:00');
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            if (dataSelecionada > hoje) {
                window.alertaAviso?.('Data Inválida', '⚠️ A data de desaparecimento não pode ser uma data futura!');
                setFormData(prev => ({ ...prev, dataDesaparecimento: '' }));
                setTempoDesaparecido('');
                return;
            }

            const diffTime = Math.abs(hoje - dataSelecionada);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                setTempoDesaparecido('🚨 Desapareceu hoje');
            } else if (diffDays === 1) {
                setTempoDesaparecido('⚠️ Desapareceu há 1 dia');
            } else if (diffDays <= 7) {
                setTempoDesaparecido(`⚠️ Desapareceu há ${diffDays} dias`);
            } else if (diffDays <= 30) {
                setTempoDesaparecido(`📅 Desapareceu há ${diffDays} dias`);
            } else if (diffDays <= 60) {
                const semanas = Math.floor(diffDays / 7);
                setTempoDesaparecido(`📅 Desapareceu há ${semanas} semana(s)`);
            } else {
                const meses = Math.floor(diffDays / 30);
                setTempoDesaparecido(`📅 Desapareceu há ${meses} mês(es)`);
            }
        }
    };

    // Máscara de telefone
    const handleTelefoneChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            if (valor.length <= 10) {
                valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else {
                valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            }
        }
        
        setFormData(prev => ({ ...prev, telefoneContato: valor }));
    };

    // Validação do formulário
    const validarFormulario = async () => {
        const {
            nome, idade, raca, porte, sexo, especie, cor,
            vacinado, castrado, vermifugado, dataDesaparecimento,
            localizacao, emailContato, telefoneContato, resumo
        } = formData;

        if (!nome) {
            await window.alertaCampoObrigatorio?.('Por favor, informe o nome do animal.');
            return false;
        }
        if (!idade) {
            await window.alertaCampoObrigatorio?.('Por favor, informe a idade do animal.');
            return false;
        }
        if (!raca) {
            await window.alertaCampoObrigatorio?.('Por favor, informe a raça do animal.');
            return false;
        }
        if (!porte) {
            await window.alertaCampoObrigatorio?.('Por favor, selecione o porte do animal.');
            return false;
        }
        if (!sexo) {
            await window.alertaCampoObrigatorio?.('Por favor, selecione o sexo do animal.');
            return false;
        }
        if (!especie) {
            await window.alertaCampoObrigatorio?.('Por favor, selecione a espécie do animal.');
            return false;
        }
        if (!cor) {
            await window.alertaCampoObrigatorio?.('Por favor, informe a cor do animal.');
            return false;
        }
        if (!vacinado) {
            await window.alertaCampoObrigatorio?.('Por favor, informe se o animal é vacinado.');
            return false;
        }
        if (!castrado) {
            await window.alertaCampoObrigatorio?.('Por favor, informe se o animal é castrado.');
            return false;
        }
        if (!vermifugado) {
            await window.alertaCampoObrigatorio?.('Por favor, informe se o animal é vermifugado.');
            return false;
        }
        if (!dataDesaparecimento) {
            await window.alertaCampoObrigatorio?.('Por favor, informe a data do desaparecimento.');
            return false;
        }
        if (!localizacao) {
            await window.alertaCampoObrigatorio?.('Por favor, selecione o local da última aparição.');
            return false;
        }
        if (!imagemPrincipal) {
            await window.alertaCampoObrigatorio?.('Por favor, selecione uma foto do animal.');
            return false;
        }
        if (!resumo) {
            await window.alertaCampoObrigatorio?.('Por favor, escreva um resumo sobre o animal.');
            return false;
        }
        if (!emailContato && !telefoneContato) {
            await window.alertaCampoObrigatorio?.('Por favor, informe pelo menos um meio de contato (email ou telefone).');
            return false;
        }

        return true;
    };

    // Converter arquivo para Base64
    const converterParaBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validarFormulario();
        if (!isValid) return;

        try {
            const imagemBase64 = await converterParaBase64(imagemPrincipal);
            
            const midiasExtrasBase64 = [];
            for (const file of midiasExtras) {
                const mediaBase64 = await converterParaBase64(file);
                midiasExtrasBase64.push({
                    tipo: file.type.startsWith('video/') ? 'video' : 'imagem',
                    src: mediaBase64,
                    nome: file.name
                });
            }

            const animal = {
                id: Date.now().toString(),
                ...formData,
                imagem: imagemBase64,
                midiasExtras: midiasExtrasBase64,
                dataCadastro: new Date().toISOString()
            };

            // Verificar se window.storage está disponível
            const storageDisponivel = typeof window.storage !== 'undefined' && 
                                     typeof window.storage.get === 'function' && 
                                     typeof window.storage.set === 'function';

            let animais = [];

            if (storageDisponivel) {
                try {
                    const resultado = await window.storage.get('animais_perdidos', true);
                    if (resultado && resultado.value) {
                        animais = JSON.parse(resultado.value);
                    }
                } catch (error) {
                    console.log('ℹ️ Primeira vez usando window.storage');
                }
                
                animais.push(animal);
                await window.storage.set('animais_perdidos', JSON.stringify(animais), true);
                console.log('✅ Salvo no window.storage (shared)');
            } else {
                console.log('⚠️ window.storage não disponível, usando localStorage');
                
                try {
                    const dados = localStorage.getItem('animais_perdidos');
                    if (dados) {
                        animais = JSON.parse(dados);
                    }
                } catch (error) {
                    console.log('ℹ️ Primeira vez usando localStorage');
                }
                
                animais.push(animal);
                localStorage.setItem('animais_perdidos', JSON.stringify(animais));
                console.log('✅ Salvo no localStorage');
            }

            await window.alertaSucesso?.(
                'Animal Cadastrado! ✅',
                'O animal foi adicionado à lista de animais perdidos com sucesso.'
            );

            // Resetar formulário
            setFormData({
                nome: '', idade: '', raca: '', porte: '', sexo: '', especie: '',
                cor: '', vacinado: '', castrado: '', vermifugado: '', vacinas: [],
                condicaoEspecial: '', dataDesaparecimento: '', localizacao: '',
                emailContato: '', telefoneContato: '', resumo: ''
            });
            setImagemPrincipal(null);
            setPreviewImagem(null);
            setMidiasExtras([]);
            setPreviewMidias([]);
            setMostrarVacinas(false);
            setContadorCaracteres(100);
            setTempoDesaparecido('');

            const visualizar = await window.confirmarModal?.(
                'Ver Lista de Animais?',
                'Deseja visualizar a lista de animais agora?',
                null
            );

            if (visualizar) {
                window.location.href = '../AnimaisPerdidos/index.html';
            }

        } catch (error) {
            console.error('❌ Erro ao salvar animal:', error);
            alert('Erro ao cadastrar animal: ' + error.message + '\n\nPor favor, tente novamente.');
        }
    };

    return (
        <div className="central">
            {/* Patas decorativas */}
            {[...Array(24)].map((_, i) => (
                <div key={i} className={`patas${i + 1}`}>
                    <img src="../../assets/images/pata.svg" alt="pata" />
                </div>
            ))}

            <div className="container">
                <h2>Divulgue um Animal Perdido</h2>
                
                <form id="cadastro-animal" onSubmit={handleSubmit} noValidate>
                    {/* Nome do Animal */}
                    <div className="form-group">
                        <label htmlFor="nome-animal" className="form-label">Nome do Animal:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nome-animal" 
                            name="nome" 
                            placeholder="Ex: Max, Luna" 
                            value={formData.nome}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    {/* Idade */}
                    <div className="form-group">
                        <label htmlFor="idade-animal" className="form-label">Idade:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="idade-animal" 
                            name="idade" 
                            placeholder="Ex: 2 anos, 6 meses" 
                            value={formData.idade}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    {/* Raça */}
                    <div className="form-group">
                        <label htmlFor="raca-animal" className="form-label">Raça:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="raca-animal" 
                            name="raca" 
                            placeholder="Ex: Labrador, SRD (Sem Raça Definida)" 
                            value={formData.raca}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    {/* Porte */}
                    <div className="form-group">
                        <label htmlFor="porte-animal" className="form-label">Porte:</label>
                        <select 
                            className="form-control" 
                            id="porte-animal" 
                            name="porte" 
                            value={formData.porte}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione o porte</option>
                            <option value="pequeno">Pequeno</option>
                            <option value="medio">Médio</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>

                    {/* Sexo */}
                    <div className="form-group">
                        <label className="form-label">Sexo:</label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexo-macho" 
                                    value="macho"
                                    checked={formData.sexo === 'macho'}
                                    onChange={() => handleRadioChange('sexo', 'macho')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="sexo-macho">Macho</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="sexo" 
                                    id="sexo-femea" 
                                    value="femea"
                                    checked={formData.sexo === 'femea'}
                                    onChange={() => handleRadioChange('sexo', 'femea')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="sexo-femea">Fêmea</label>
                            </div>
                        </div>
                    </div>

                    {/* Espécie */}
                    <div className="form-group">
                        <label className="form-label">Espécie:</label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="especie" 
                                    id="especie-cachorro" 
                                    value="cachorro"
                                    checked={formData.especie === 'cachorro'}
                                    onChange={() => handleRadioChange('especie', 'cachorro')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="especie-cachorro">Cachorro</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="especie" 
                                    id="especie-gato" 
                                    value="gato"
                                    checked={formData.especie === 'gato'}
                                    onChange={() => handleRadioChange('especie', 'gato')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="especie-gato">Gato</label>
                            </div>
                        </div>
                    </div>

                    {/* Cor */}
                    <div className="form-group">
                        <label htmlFor="cor-animal" className="form-label">Cor:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="cor-animal" 
                            name="cor" 
                            placeholder="Ex: Preto, Branco, Caramelo" 
                            value={formData.cor}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    {/* Vacinado */}
                    <div className="form-group">
                        <label className="form-label">Vacinado:</label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="vacinado" 
                                    id="vacinado-sim" 
                                    value="sim"
                                    checked={formData.vacinado === 'sim'}
                                    onChange={() => handleRadioChange('vacinado', 'sim')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="vacinado-sim">Sim</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="vacinado" 
                                    id="vacinado-nao" 
                                    value="nao"
                                    checked={formData.vacinado === 'nao'}
                                    onChange={() => handleRadioChange('vacinado', 'nao')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="vacinado-nao">Não</label>
                            </div>
                        </div>
                    </div>

                    {/* Vacinas (mostrado condicionalmente) */}
                    {mostrarVacinas && (
                        <div id="vacinas-grupo">
                            <label className="form-label">Quais vacinas o animal tomou?</label>
                            <div className="form-check-group">
                                {['v8', 'v10', 'antirrabica', 'giardia', 'gripe', 'leishmaniose'].map((vacina) => (
                                    <div key={vacina} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id={`vacina-${vacina}`}
                                            checked={formData.vacinas.includes(vacina)}
                                            onChange={() => handleVacinaChange(vacina)}
                                        />
                                        <label className="form-check-label" htmlFor={`vacina-${vacina}`}>
                                            {vacina === 'v8' ? 'V8' : 
                                             vacina === 'v10' ? 'V10' : 
                                             vacina === 'antirrabica' ? 'Antirrábica' : 
                                             vacina.charAt(0).toUpperCase() + vacina.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Castrado */}
                    <div className="form-group">
                        <label className="form-label">Castrado:</label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="castrado" 
                                    id="castrado-sim" 
                                    value="sim"
                                    checked={formData.castrado === 'sim'}
                                    onChange={() => handleRadioChange('castrado', 'sim')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="castrado-sim">Sim</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="castrado" 
                                    id="castrado-nao" 
                                    value="nao"
                                    checked={formData.castrado === 'nao'}
                                    onChange={() => handleRadioChange('castrado', 'nao')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="castrado-nao">Não</label>
                            </div>
                        </div>
                    </div>

                    {/* Vermifugado */}
                    <div className="form-group">
                        <label className="form-label">Vermifugado:</label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="vermifugado" 
                                    id="vermifugado-sim" 
                                    value="sim"
                                    checked={formData.vermifugado === 'sim'}
                                    onChange={() => handleRadioChange('vermifugado', 'sim')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="vermifugado-sim">Sim</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="vermifugado" 
                                    id="vermifugado-nao" 
                                    value="nao"
                                    checked={formData.vermifugado === 'nao'}
                                    onChange={() => handleRadioChange('vermifugado', 'nao')}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="vermifugado-nao">Não</label>
                            </div>
                        </div>
                    </div>

                    {/* Condição Especial */}
                    <div className="form-group">
                        <label htmlFor="condicao-especial" className="form-label">Condição Especial (opcional):</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="condicao-especial" 
                            name="condicaoEspecial" 
                            placeholder="Ex: Cego, deficiência física, etc." 
                            value={formData.condicaoEspecial}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Data do Desaparecimento */}
                    <div className="form-group">
                        <label htmlFor="data-desaparecimento" className="form-label">Data do Desaparecimento:</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="data-desaparecimento" 
                            name="dataDesaparecimento" 
                            max={dataMaxima}
                            value={formData.dataDesaparecimento}
                            onChange={handleDataDesaparecimentoChange}
                            required 
                        />
                        {tempoDesaparecido && (
                            <small 
                                id="tempo-desaparecido" 
                                className="form-text"
                                style={{
                                    color: tempoDesaparecido.includes('🚨') || tempoDesaparecido.includes('⚠️') ? '#dc2626' : '#5a2a2a',
                                    fontWeight: tempoDesaparecido.includes('🚨') || tempoDesaparecido.includes('⚠️') ? 'bold' : 'normal'
                                }}
                            >
                                {tempoDesaparecido}
                            </small>
                        )}
                    </div>

                    {/* Localização */}
                    <div className="form-group">
                        <label htmlFor="localizacao" className="form-label">Local da Última Aparição (Bairro - Salvador):</label>
                        <select 
                            className="form-control" 
                            id="localizacao" 
                            name="localizacao" 
                            value={formData.localizacao}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione o bairro</option>
                            <option value="acupe_de_brotas">Acupe de Brotas</option>
                            <option value="arenoso">Arenoso</option>
                            <option value="armacao">Armação</option>
                            <option value="arraial_do_retiro">Arraial do Retiro</option>
                            <option value="barra">Barra</option>
                            <option value="barris">Barris</option>
                            <option value="barro_branco">Barro Branco</option>
                            <option value="barro_duro">Barro Duro</option>
                            <option value="barroquinha">Barroquinha</option>
                            <option value="beiru_tancredo_neves">Beiru / Tancredo Neves</option>
                            <option value="boa_vista_de_brotas">Boa Vista de Brotas</option>
                            <option value="boa_vista_de_sao_caetano">Boa Vista de São Caetano</option>
                            <option value="boca_da_mata">Boca da Mata</option>
                            <option value="boca_do_rio">Boca do Rio</option>
                            <option value="bonfim">Bonfim</option>
                            <option value="brotas">Brotas</option>
                            <option value="cabula">Cabula</option>
                            <option value="cabula_vi">Cabula VI</option>
                            <option value="caixa_dagua">Caixa D'Água</option>
                            <option value="cajazeiras">Cajazeiras</option>
                            <option value="calabar">Calabar</option>
                            <option value="calçada">Calçada</option>
                            <option value="caminho_das_arvores">Caminho das Árvores</option>
                            <option value="caminho_de_areia">Caminho de Areia</option>
                            <option value="campinas_de_piraj�">Campinas de Pirajá</option>
                            <option value="canabrava">Canabrava</option>
                            <option value="candeal">Candeal</option>
                            <option value="canela">Canela</option>
                            <option value="cassange">Cassange</option>
                            <option value="castelo_branco">Castelo Branco</option>
                            <option value="centro">Centro</option>
                            <option value="centro_administrativo">Centro Administrativo</option>
                            <option value="chapada_do_rio_vermelho">Chapada do Rio Vermelho</option>
                            <option value="chame_chame">Chame-Chame</option>
                            <option value="cidade_nova">Cidade Nova</option>
                            <option value="coutos">Coutos</option>
                            <option value="costa_azul">Costa Azul</option>
                            <option value="curuzu">Curuzu</option>
                            <option value="doron">Doron</option>
                            <option value="engenho_velho_de_brotas">Engenho Velho de Brotas</option>
                            <option value="engenho_velho_da_federacao">Engenho Velho da Federação</option>
                            <option value="engomadeira">Engomadeira</option>
                            <option value="escada">Escada</option>
                            <option value="fazenda_coutos">Fazenda Coutos</option>
                            <option value="fazenda_grande_do_retiro">Fazenda Grande do Retiro</option>
                            <option value="fazenda_grande_i_ii_iii_iv">Fazenda Grande I, II, III e IV</option>
                            <option value="federacao">Federação</option>
                            <option value="garcia">Garcia</option>
                            <option value="garibaldi">Garibaldi</option>
                            <option value="granjas_rurais_presidente_vargas">Granjas Rurais Presidente Vargas</option>
                            <option value="graca">Graça</option>
                            <option value="horto_florestal">Horto Florestal</option>
                            <option value="iguatemi">Iguatemi</option>
                            <option value="ilha_amarela">Ilha Amarela</option>
                            <option value="ilha_de_bom_jesus_dos_passos">Ilha de Bom Jesus dos Passos</option>
                            <option value="ilha_de_mare">Ilha de Maré</option>
                            <option value="ilha_dos_frades">Ilha dos Frades</option>
                            <option value="itacaranha">Itacaranha</option>
                            <option value="itaigara">Itaigara</option>
                            <option value="itapoã">Itapoã</option>
                            <option value="itapua">Itapuã</option>
                            <option value="jaguaribe">Jaguaribe</option>
                            <option value="jardim_armacao">Jardim Armação</option>
                            <option value="jardim_das_margaridas">Jardim das Margaridas</option>
                            <option value="jardim_nova_esperanca">Jardim Nova Esperança</option>
                            <option value="jardim_santo_inacio">Jardim Santo Inácio</option>
                            <option value="lapinha">Lapinha</option>
                            <option value="liberdade">Liberdade</option>
                            <option value="lobato">Lobato</option>
                            <option value="luis_anselmo">Luis Anselmo</option>
                            <option value="luiz_anselmo">Luiz Anselmo</option>
                            <option value="macaubas">Macaúbas</option>
                            <option value="madre_de_deus">Madre de Deus</option>
                            <option value="mangueira">Mangueira</option>
                            <option value="marechal_rondon_cabula_vi">Marechal Rondon / Cabula VI</option>
                            <option value="mariquita">Mariquita</option>
                            <option value="massaranduba">Massaranduba</option>
                            <option value="mata_escura">Mata Escura</option>
                            <option value="matatu">Matatu</option>
                            <option value="matatu_de_brotas">Matatu de Brotas</option>
                            <option value="monte_serrat">Monte Serrat</option>
                            <option value="moradas_da_lagoa">Moradas da Lagoa</option>
                            <option value="mussurunga">Mussurunga</option>
                            <option value="narandiba">Narandiba</option>
                            <option value="nordeste_de_amaralina">Nordeste de Amaralina</option>
                            <option value="nova_brasilia">Nova Brasília</option>
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

                    {/* Email de Contato */}
                    <div className="form-group">
                        <label htmlFor="email-contato" className="form-label">Email de Contato:</label>
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
                        <label htmlFor="telefone-contato" className="form-label">Telefone de Contato:</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="telefone-contato" 
                            name="telefoneContato" 
                            placeholder="(00) 00000-0000" 
                            value={formData.telefoneContato}
                            onChange={handleTelefoneChange}
                        />
                        <small className="form-text">Informe pelo menos um meio de contato (email ou telefone)</small>
                    </div>

                    {/* Upload de Imagem do Animal */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="imagem-animal">Foto do Anúncio do Animal *</label>
                        <small className="form-text">Esta será a foto principal exibida nos cards da lista</small>
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
                        <label className="form-label" htmlFor="midias-extras">Fotos e Vídeos para o Perfil do Animal (Opcional)</label>
                        <small className="form-text">Adicione mais fotos e vídeos que aparecerão no perfil detalhado do animal. Aceita múltiplos arquivos.</small>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="midias-extras" 
                            accept="image/*,video/*" 
                            multiple
                            onChange={handleMidiasExtrasChange}
                        />
                        <small className="form-text">Você pode selecionar várias fotos e vídeos de uma vez (Ctrl+Clique ou Shift+Clique)</small>
                        
                        {previewMidias.length > 0 && (
                            <div id="preview-midias-extras" className="preview-midias-extras" style={{ display: 'grid' }}>
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
                        <label htmlFor="resumo-animal" className="form-label">Resumo (até 100 caracteres):</label>
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

                    <button type="submit" className="botao_cadastrar">Cadastrar Animal</button>
                </form>

                <img src="../../assets/images/dog_and_cat.svg" alt="Cachorro e gato"/>
            </div>
        </div>
    );
};

export default CadastroAnimalPerdido;