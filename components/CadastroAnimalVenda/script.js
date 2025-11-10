    // Mostrar/ocultar grupo de vacinas baseado na seleção de vacinado
        const vacinadoInputs = document.querySelectorAll('input[name="vacinado"]');
        const vacinasGrupo = document.getElementById('vacinas-grupo');
        
        vacinadoInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (this.value === 'sim') {
                    vacinasGrupo.style.display = 'block';
                } else {
                    vacinasGrupo.style.display = 'none';
                    // Desmarcar todas as vacinas quando "não" é selecionado
                    const checkboxes = vacinasGrupo.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => checkbox.checked = false);
                }
            });
        });

        // Contador de caracteres para o resumo
        const resumoTextarea = document.getElementById('resumo-animal');
        const contadorCaracteres = document.getElementById('contador-caracteres');
        
        resumoTextarea.addEventListener('input', function() {
            const caracteresRestantes = 100 - this.value.length;
            contadorCaracteres.textContent = caracteresRestantes;
            
            if (caracteresRestantes < 10) {
                contadorCaracteres.style.color = 'red';
            } else {
                contadorCaracteres.style.color = '';
            }
        });

        // Validação do formulário
        document.getElementById('cadastro-animal').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica de envio do formulário
            alert('Formulário submetido! (Implementar envio real)');
        });