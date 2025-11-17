// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarFormulario();
    configurarDataMaxima();
});

// ===== HELPER: VERIFICAR SE WINDOW.STORAGE ESTÁ DISPONÍVEL =====
function storageDisponivel() {
    return typeof window.storage !== 'undefined' && 
           typeof window.storage.get === 'function' && 
           typeof window.storage.set === 'function';
}

// ===== CONFIGURAR DATA MÁXIMA (HOJE) =====
function configurarDataMaxima() {
    const dataInput = document.getElementById('data-desaparecimento');
    
    if (dataInput) {
        // Obter data de hoje no formato YYYY-MM-DD
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataHoje = `${ano}-${mes}-${dia}`;
        
        // Definir data máxima como hoje
        dataInput.setAttribute('max', dataHoje);
        
        console.log('✅ Data máxima configurada:', dataHoje);
    }
}

// ===== INICIALIZAÇÃO DO FORMULÁRIO =====
function inicializarFormulario() {
    configurarVacinacao();
    configurarPreviewImagem();
    configurarPreviewMidiasExtras();
    configurarContadorCaracteres();
    configurarCalculoTempo();
    configurarMascaraTelefone();
    configurarSubmit();
}

// ===== CONFIGURAR EXIBIÇÃO DE VACINAS =====
function configurarVacinacao() {
    const vacinadoSim = document.getElementById('vacinado-sim');
    const vacinadoNao = document.getElementById('vacinado-nao');
    const vacinasGrupo = document.getElementById('vacinas-grupo');

    if (vacinadoSim && vacinadoNao && vacinasGrupo) {
        vacinadoSim.addEventListener('change', function() {
            if (this.checked) {
                vacinasGrupo.style.display = 'block';
            }
        });

        vacinadoNao.addEventListener('change', function() {
            if (this.checked) {
                vacinasGrupo.style.display = 'none';
                const checkboxes = vacinasGrupo.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = false);
            }
        });
    }
}

// ===== PREVIEW DA IMAGEM PRINCIPAL =====
function configurarPreviewImagem() {
    const inputImagem = document.getElementById('imagem-animal');
    const previewImagem = document.getElementById('preview-imagem');

    if (inputImagem && previewImagem) {
        inputImagem.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    previewImagem.src = event.target.result;
                    previewImagem.style.display = 'block';
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
}

// ===== PREVIEW DE MÍDIAS EXTRAS (FOTOS E VÍDEOS) =====
function configurarPreviewMidiasExtras() {
    const inputMidias = document.getElementById('midias-extras');
    const previewContainer = document.getElementById('preview-midias-extras');

    if (inputMidias && previewContainer) {
        inputMidias.addEventListener('change', function(e) {
            previewContainer.innerHTML = '';
            const files = Array.from(e.target.files);
            
            if (files.length > 0) {
                previewContainer.style.display = 'grid';
                
                files.forEach((file, index) => {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        const reader = new FileReader();
                        
                        reader.onload = function(event) {
                            img.src = event.target.result;
                        };
                        
                        reader.readAsDataURL(file);
                        previewItem.appendChild(img);
                        
                    } else if (file.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.controls = true;
                        const reader = new FileReader();
                        
                        reader.onload = function(event) {
                            video.src = event.target.result;
                        };
                        
                        reader.readAsDataURL(file);
                        previewItem.appendChild(video);
                    }
                    
                    const badge = document.createElement('span');
                    badge.className = 'preview-badge';
                    badge.textContent = file.type.startsWith('video/') ? '📹 Vídeo' : '📷 Foto';
                    previewItem.appendChild(badge);
                    
                    previewContainer.appendChild(previewItem);
                });
                
                const info = document.createElement('p');
                info.className = 'preview-info';
                info.textContent = `${files.length} arquivo(s) selecionado(s)`;
                previewContainer.appendChild(info);
            } else {
                previewContainer.style.display = 'none';
            }
        });
    }
}

// ===== CONTADOR DE CARACTERES DO RESUMO =====
function configurarContadorCaracteres() {
    const resumoTextarea = document.getElementById('resumo-animal');
    const contadorSpan = document.getElementById('contador-caracteres');

    if (resumoTextarea && contadorSpan) {
        resumoTextarea.addEventListener('input', function() {
            const restantes = 100 - this.value.length;
            contadorSpan.textContent = restantes;
            
            if (restantes < 20) {
                contadorSpan.style.color = '#dc2626';
            } else {
                contadorSpan.style.color = '#5a2a2a';
            }
        });
    }
}

// ===== CALCULAR TEMPO DE DESAPARECIMENTO (CORRIGIDO) =====
function configurarCalculoTempo() {
    const dataInput = document.getElementById('data-desaparecimento');
    const tempoSpan = document.getElementById('tempo-desaparecido');

    if (dataInput && tempoSpan) {
        dataInput.addEventListener('change', function() {
            if (this.value) {
                // Validar se a data não é futura
                const dataSelecionada = new Date(this.value + 'T00:00:00');
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0); // Zerar horas para comparação justa
                
                if (dataSelecionada > hoje) {
                    alert('⚠️ A data de desaparecimento não pode ser uma data futura!');
                    this.value = '';
                    tempoSpan.textContent = '';
                    tempoSpan.style.color = '#5a2a2a';
                    tempoSpan.style.fontWeight = 'normal';
                    return;
                }
                
                // Calcular diferença em dias
                const diffTime = Math.abs(hoje - dataSelecionada);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                console.log('📅 Data selecionada:', dataSelecionada);
                console.log('📅 Hoje:', hoje);
                console.log('📊 Diferença em dias:', diffDays);
                
                // Exibir texto apropriado
                if (diffDays === 0) {
                    tempoSpan.textContent = '🚨 Desapareceu hoje';
                    tempoSpan.style.color = '#dc2626';
                    tempoSpan.style.fontWeight = 'bold';
                } else if (diffDays === 1) {
                    tempoSpan.textContent = '⚠️ Desapareceu há 1 dia';
                    tempoSpan.style.color = '#dc2626';
                    tempoSpan.style.fontWeight = 'bold';
                } else if (diffDays <= 7) {
                    tempoSpan.textContent = `⚠️ Desapareceu há ${diffDays} dias`;
                    tempoSpan.style.color = '#dc2626';
                    tempoSpan.style.fontWeight = 'bold';
                } else if (diffDays <= 30) {
                    tempoSpan.textContent = `📅 Desapareceu há ${diffDays} dias`;
                    tempoSpan.style.color = '#ea580c';
                    tempoSpan.style.fontWeight = 'bold';
                } else {
                    const meses = Math.floor(diffDays / 30);
                    const diasRestantes = diffDays % 30;
                    
                    if (diasRestantes === 0) {
                        tempoSpan.textContent = `📅 Desapareceu há ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
                    } else {
                        tempoSpan.textContent = `📅 Desapareceu há ${meses} ${meses === 1 ? 'mês' : 'meses'} e ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`;
                    }
                    tempoSpan.style.color = '#5a2a2a';
                    tempoSpan.style.fontWeight = '600';
                }
            } else {
                tempoSpan.textContent = '';
            }
        });
    }
}

// ===== MÁSCARA DE TELEFONE =====
function configurarMascaraTelefone() {
    const telefoneInput = document.getElementById('telefone-contato');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            if (valor.length <= 11) {
                if (valor.length <= 2) {
                    valor = valor.replace(/^(\d{0,2})/, '($1');
                } else if (valor.length <= 6) {
                    valor = valor.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
                } else if (valor.length <= 10) {
                    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = valor;
        });
    }
}

// ===== CONFIGURAR SUBMIT DO FORMULÁRIO =====
function configurarSubmit() {
    const form = document.getElementById('cadastro-animal');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                await salvarAnimal();
            }
        });
    }
}

// ===== VALIDAR FORMULÁRIO =====
function validarFormulario() {
    const nome = document.getElementById('nome-animal').value.trim();
    const idade = document.getElementById('idade-animal').value.trim();
    const raca = document.getElementById('raca-animal').value.trim();
    const porte = document.getElementById('porte-animal').value;
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const especie = document.querySelector('input[name="especie"]:checked');
    const cor = document.getElementById('cor-animal').value.trim();
    const vacinado = document.querySelector('input[name="vacinado"]:checked');
    const castrado = document.querySelector('input[name="castrado"]:checked');
    const vermifugado = document.querySelector('input[name="vermifugado"]:checked');
    const dataDesaparecimento = document.getElementById('data-desaparecimento').value;
    const localizacao = document.getElementById('localizacao').value;
    const imagem = document.getElementById('imagem-animal').files[0];
    const resumo = document.getElementById('resumo-animal').value.trim();
    const emailContato = document.getElementById('email-contato').value.trim();
    const telefoneContato = document.getElementById('telefone-contato').value.trim();

    if (!nome) {
        alert('Por favor, informe o nome do animal.');
        //usar em todos os alertas futuros
        // await alertaAviso('Campo Obrigatório', 'Por favor, informe o nome do animal.');
        return false;
    }

    if (!idade) {
        alert('Por favor, informe a idade do animal.');
        return false;
    }

    if (!raca) {
        alert('Por favor, informe a raça do animal.');
        return false;
    }

    if (!porte) {
        alert('Por favor, selecione o porte do animal.');
        return false;
    }

    if (!sexo) {
        alert('Por favor, selecione o sexo do animal.');
        return false;
    }

    if (!especie) {
        alert('Por favor, selecione a espécie do animal.');
        return false;
    }

    if (!cor) {
        alert('Por favor, informe a cor do animal.');
        return false;
    }

    if (!vacinado) {
        alert('Por favor, informe se o animal é vacinado.');
        return false;
    }

    if (!castrado) {
        alert('Por favor, informe se o animal é castrado.');
        return false;
    }

    if (!vermifugado) {
        alert('Por favor, informe se o animal é vermifugado.');
        return false;
    }

    if (!dataDesaparecimento) {
        alert('Por favor, informe a data de desaparecimento.');
        return false;
    }

    // Validar se a data não é futura
    const dataSelecionada = new Date(dataDesaparecimento + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataSelecionada > hoje) {
        alert('⚠️ A data de desaparecimento não pode ser uma data futura!');
        return false;
    }

    if (!localizacao) {
        alert('Por favor, selecione o local da última aparição.');
        return false;
    }

    if (!imagem) {
        alert('Por favor, selecione uma foto do animal.');
        return false;
    }

    if (!resumo) {
        alert('Por favor, escreva um resumo sobre o animal.');
        return false;
    }

    if (!emailContato && !telefoneContato) {
        alert('Por favor, informe pelo menos um meio de contato (email ou telefone).');
        return false;
    }

    return true;
}

// ===== SALVAR ANIMAL =====
async function salvarAnimal() {
    const botao = document.querySelector('.botao_cadastrar');
    const textoOriginal = botao.textContent;
    
    try {
        botao.textContent = 'Salvando...';
        botao.disabled = true;

        const animal = await coletarDadosFormulario();
        
        console.log('🐾 Animal coletado:', animal);
        
        let animais = [];
        
        if (storageDisponivel()) {
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
        
        console.log('✅ Total de animais salvos:', animais.length);
        
       await alertaSucesso(
        'Animal Cadastrado! ✅',
        'O animal foi adicionado à lista de animais perdidos com sucesso.');
        
        document.getElementById('cadastro-animal').reset();
        document.getElementById('preview-imagem').style.display = 'none';
        document.getElementById('preview-midias-extras').style.display = 'none';
        document.getElementById('vacinas-grupo').style.display = 'none';
        document.getElementById('contador-caracteres').textContent = '100';
        document.getElementById('tempo-desaparecido').textContent = '';
        
        botao.textContent = textoOriginal;
        botao.disabled = false;
        
        const visualizar = await confirmarModal(
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
        
        botao.textContent = textoOriginal;
        botao.disabled = false;
    }
}

// ===== COLETAR DADOS DO FORMULÁRIO =====
async function coletarDadosFormulario() {
    const id = Date.now().toString();
    
    const nome = document.getElementById('nome-animal').value.trim();
    const idade = document.getElementById('idade-animal').value.trim();
    const raca = document.getElementById('raca-animal').value.trim();
    const porte = document.getElementById('porte-animal').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const especie = document.querySelector('input[name="especie"]:checked').value;
    const cor = document.getElementById('cor-animal').value.trim();
    
    const vacinado = document.querySelector('input[name="vacinado"]:checked').value;
    const castrado = document.querySelector('input[name="castrado"]:checked').value;
    const vermifugado = document.querySelector('input[name="vermifugado"]:checked').value;
    
    const vacinas = [];
    if (vacinado === 'sim') {
        const checkboxes = document.querySelectorAll('input[name="vacinas[]"]:checked');
        checkboxes.forEach(cb => vacinas.push(cb.value));
    }
    
    const condicaoEspecial = document.getElementById('condicao-especial').value.trim() || 'Nenhuma';
    const dataDesaparecimento = document.getElementById('data-desaparecimento').value;
    const localizacao = document.getElementById('localizacao').value;
    const emailContato = document.getElementById('email-contato').value.trim();
    const telefoneContato = document.getElementById('telefone-contato').value.trim();
    const resumo = document.getElementById('resumo-animal').value.trim();
    
    // Processar imagem principal
    const imagemFile = document.getElementById('imagem-animal').files[0];
    const imagem = await converterImagemParaBase64(imagemFile);
    
    // Processar mídias extras (fotos e vídeos para o perfil)
    const midiasExtras = await processarMidiasExtras();
    
    return {
        id: id,
        nome: nome,
        idade: idade,
        raca: raca,
        porte: porte,
        sexo: sexo,
        especie: especie,
        cor: cor,
        vacinado: vacinado,
        vacinas: vacinas,
        castrado: castrado,
        vermifugado: vermifugado,
        condicaoEspecial: condicaoEspecial,
        dataDesaparecimento: dataDesaparecimento,
        localizacao: localizacao,
        emailContato: emailContato,
        telefoneContato: telefoneContato,
        resumo: resumo,
        imagem: imagem,
        midiasExtras: midiasExtras,
        dataCadastro: new Date().toISOString()
    };
}

// ===== PROCESSAR MÍDIAS EXTRAS =====
async function processarMidiasExtras() {
    const inputMidias = document.getElementById('midias-extras');
    const midiasExtras = [];
    
    if (inputMidias && inputMidias.files.length > 0) {
        const files = Array.from(inputMidias.files);
        
        for (const file of files) {
            const mediaBase64 = await converterImagemParaBase64(file);
            
            midiasExtras.push({
                tipo: file.type.startsWith('video/') ? 'video' : 'imagem',
                src: mediaBase64,
                nome: file.name
            });
        }
    }
    
    return midiasExtras;
}

// ===== CONVERTER IMAGEM PARA BASE64 =====
function converterImagemParaBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function(error) {
            reject(error);
        };
        
        reader.readAsDataURL(file);
    });
}

// ===== LOG PARA DEBUG =====
console.log('✅ Script de cadastro de animais perdidos carregado');
console.log('📦 window.storage disponível?', storageDisponivel());