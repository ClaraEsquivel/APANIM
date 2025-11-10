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

        const inputData = document.getElementById('data-desaparecimento');
            const campoResultado = document.getElementById('tempo-desaparecido');

            inputData.addEventListener('change', () => {
                const dataSelecionada = new Date(inputData.value);
                const hoje = new Date();

                // Zerar horas para comparar somente datas
                dataSelecionada.setHours(0, 0, 0, 0);
                hoje.setHours(0, 0, 0, 0);

                const diffEmMs = hoje - dataSelecionada;
                const diffEmDias = Math.floor(diffEmMs / (1000 * 60 * 60 * 24));

                if (isNaN(diffEmDias)) {
                    campoResultado.textContent = '';
                } else if (diffEmDias < 0) {
                    campoResultado.textContent = 'A data selecionada está no futuro.';
                } else if (diffEmDias === 0) {
                    campoResultado.textContent = 'Animal desaparecido hoje.';
                } else if (diffEmDias === 1) {
                    campoResultado.textContent = 'Animal desaparecido há 1 dia.';
                } else {
                    campoResultado.textContent = `Animal desaparecido há ${diffEmDias} dias.`;
                }
            });