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
