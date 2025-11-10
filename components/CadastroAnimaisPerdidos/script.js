// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarFormulario();
});

// ===== HELPER: VERIFICAR SE WINDOW.STORAGE ESTÁ DISPONÍVEL =====
function storageDisponivel() {
    return typeof window.storage !== 'undefined' && 
           typeof window.storage.get === 'function' && 
           typeof window.storage.set === 'function';
}

// ===== INICIALIZAÇÃO DO FORMULÁRIO =====
function inicializarFormulario() {
    configurarVacinacao();
    configurarPreviewImagem();
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
                // Desmarcar todas as vacinas
                const checkboxes = vacinasGrupo.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = false);
            }
        });
    }
}

// ===== PREVIEW DA IMAGEM =====
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

// ===== CALCULAR TEMPO DE DESAPARECIMENTO =====
function configurarCalculoTempo() {
    const dataInput = document.getElementById('data-desaparecimento');
    const tempoSpan = document.getElementById('tempo-desaparecido');

    if (dataInput && tempoSpan) {
        dataInput.addEventListener('change', function() {
            if (this.value) {
                const dataDesaparecimento = new Date(this.value);
                const hoje = new Date();
                const diffTime = Math.abs(hoje - dataDesaparecimento);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    tempoSpan.textContent = 'Desapareceu há 1 dia';
                } else if (diffDays > 1) {
                    tempoSpan.textContent = `Desapareceu há ${diffDays} dias`;
                }
                
                if (diffDays <= 7) {
                    tempoSpan.style.color = '#dc2626';
                    tempoSpan.style.fontWeight = 'bold';
                }
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
    const localizacao = document.getElementById('localizacao').value;
    const imagem = document.getElementById('imagem-animal').files[0];
    const resumo = document.getElementById('resumo-animal').value.trim();
    const emailContato = document.getElementById('email-contato').value.trim();
    const telefoneContato = document.getElementById('telefone-contato').value.trim();

    // Validações básicas
    if (!nome) {
        alert('Por favor, informe o nome do animal.');
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

    // Validar se pelo menos um contato foi fornecido
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
        // Mostrar loading
        botao.textContent = 'Salvando...';
        botao.disabled = true;

        // Coletar dados do formulário
        const animal = await coletarDadosFormulario();
        
        console.log('Animal coletado:', animal);
        
        // Buscar animais existentes
        let animais = [];
        
        if (storageDisponivel()) {
            // Usar window.storage
            try {
                const resultado = await window.storage.get('animais_perdidos', true);
                if (resultado && resultado.value) {
                    animais = JSON.parse(resultado.value);
                }
            } catch (error) {
                console.log('Primeira vez usando window.storage');
            }
            
            // Adicionar novo animal
            animais.push(animal);
            
            // Salvar no storage compartilhado
            await window.storage.set('animais_perdidos', JSON.stringify(animais), true);
            
        } else {
            // Fallback: usar localStorage
            console.log('window.storage não disponível, usando localStorage');
            
            try {
                const dados = localStorage.getItem('animais_perdidos');
                if (dados) {
                    animais = JSON.parse(dados);
                }
            } catch (error) {
                console.log('Primeira vez usando localStorage');
            }
            
            // Adicionar novo animal
            animais.push(animal);
            
            // Salvar no localStorage
            localStorage.setItem('animais_perdidos', JSON.stringify(animais));
        }
        
        console.log('✅ Animal salvo com sucesso!', animais);
        
        // Mostrar mensagem de sucesso
        alert('Animal cadastrado com sucesso! ✅\n\nO animal foi adicionado à lista de animais perdidos.');
        
        // Limpar formulário
        document.getElementById('cadastro-animal').reset();
        document.getElementById('preview-imagem').style.display = 'none';
        document.getElementById('vacinas-grupo').style.display = 'none';
        document.getElementById('contador-caracteres').textContent = '100';
        
        // Restaurar botão
        botao.textContent = textoOriginal;
        botao.disabled = false;
        
        // Perguntar se deseja ver a lista
        if (confirm('Deseja visualizar a lista de animais perdidos?')) {
            window.location.href = '../AnimaisPerdidos/index.html';
        }
        
    } catch (error) {
        console.error('❌ Erro ao salvar animal:', error);
        alert('Erro ao cadastrar animal: ' + error.message + '\n\nPor favor, tente novamente.');
        
        // Restaurar botão
        botao.textContent = textoOriginal;
        botao.disabled = false;
    }
}

// ===== COLETAR DADOS DO FORMULÁRIO =====
async function coletarDadosFormulario() {
    // Gerar ID único
    const id = Date.now().toString();
    
    // Dados básicos
    const nome = document.getElementById('nome-animal').value.trim();
    const idade = document.getElementById('idade-animal').value.trim();
    const raca = document.getElementById('raca-animal').value.trim();
    const porte = document.getElementById('porte-animal').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const especie = document.querySelector('input[name="especie"]:checked').value;
    const cor = document.getElementById('cor-animal').value.trim();
    
    // Informações de saúde
    const vacinado = document.querySelector('input[name="vacinado"]:checked').value;
    const castrado = document.querySelector('input[name="castrado"]:checked').value;
    const vermifugado = document.querySelector('input[name="vermifugado"]:checked').value;
    
    // Coletar vacinas selecionadas
    const vacinas = [];
    if (vacinado === 'sim') {
        const checkboxes = document.querySelectorAll('input[name="vacinas[]"]:checked');
        checkboxes.forEach(cb => vacinas.push(cb.value));
    }
    
    // Condição especial
    const condicaoEspecial = document.getElementById('condicao-especial').value.trim() || 'Nenhuma';
    
    // Data e localização
    const dataDesaparecimento = document.getElementById('data-desaparecimento').value;
    const localizacao = document.getElementById('localizacao').value;
    
    // Contato
    const emailContato = document.getElementById('email-contato').value.trim();
    const telefoneContato = document.getElementById('telefone-contato').value.trim();
    
    // Resumo
    const resumo = document.getElementById('resumo-animal').value.trim();
    
    // Processar imagem
    const imagemFile = document.getElementById('imagem-animal').files[0];
    const imagem = await converterImagemParaBase64(imagemFile);
    
    // Criar objeto do animal
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
        dataCadastro: new Date().toISOString()
    };
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
console.log('✅ Script de cadastro carregado');
console.log('📦 window.storage disponível?', storageDisponivel());