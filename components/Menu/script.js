 // ===== VERIFICAR SE WINDOW.STORAGE ESTÁ DISPONÍVEL =====
        function storageDisponivel() {
            return typeof window.storage !== 'undefined' && 
                   typeof window.storage.get === 'function';
        }

        // ===== CARREGAR TODOS OS ANIMAIS =====
        async function carregarAnimaisMenu() {
            try {
                console.log('🔄 Carregando animais para o menu...');
                
                await carregarAnimaisAdocao();
                await carregarAnimaisCompra();
                await carregarAnimaisPerdidos(); // ✅ ADICIONADO
                
                console.log('✅ Animais carregados com sucesso!');
            } catch (error) {
                console.error('❌ Erro ao carregar animais:', error);
            }
        }
        // ===== CARREGAR ANIMAIS PARA ADOÇÃO =====
        async function carregarAnimaisAdocao() {
            let animais = [];
            
            try {
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
                renderizarAnimaisAdocao(animaisRecentes);
                
            } catch (error) {
                console.error('Erro ao carregar animais de adoção:', error);
            }
        }

        // ===== CARREGAR ANIMAIS PARA COMPRA =====
        async function carregarAnimaisCompra() {
            let animais = [];
            
            try {
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
                renderizarAnimaisCompra(animaisRecentes);
                
            } catch (error) {
                console.error('Erro ao carregar animais de venda:', error);
            }
        }

        // ===== CARREGAR ANIMAIS PERDIDOS ===== 
        async function carregarAnimaisPerdidos() {
            let animais = [];
            
            try {
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
                renderizarAnimaisPerdidos(animaisRecentes);
                
            } catch (error) {
                console.error('Erro ao carregar animais perdidos:', error);
            }
        }

        // ===== RENDERIZAR ANIMAIS PARA ADOÇÃO =====
        function renderizarAnimaisAdocao(animais) {
            const secaoAdocao = document.querySelector('.secao-adocao');
            if (!secaoAdocao) return;
            
            const contador = secaoAdocao.querySelector('.contador-resultados');
            if (contador) {
                contador.textContent = `${animais.length} animais encontrados`;
            }
            
            let containerAnimais = secaoAdocao.nextElementSibling;
            
            if (!containerAnimais || !containerAnimais.classList.contains('lateral_direito')) {
                return;
            }
            
            containerAnimais.innerHTML = '';
            
            if (animais.length === 0) {
                containerAnimais.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum animal cadastrado para adoção ainda.</p>';
                return;
            }
            
            for (let i = 0; i < animais.length; i += 3) {
                const linha = document.createElement('section');
                linha.className = 'linha_lateral';
                linha.setAttribute('aria-label', `Linha ${Math.floor(i/3) + 1} de animais`);
                
                for (let j = i; j < i + 3 && j < animais.length; j++) {
                    const animal = animais[j];
                    const card = criarCardAdocao(animal);
                    linha.appendChild(card);
                }
                
                containerAnimais.appendChild(linha);
            }
        }

        // ===== RENDERIZAR ANIMAIS PARA COMPRA =====
        function renderizarAnimaisCompra(animais) {
            const secaoCompra = document.querySelector('.secao-compra');
            if (!secaoCompra) return;
            
            const contador = secaoCompra.querySelector('.contador-resultados-compra');
            if (contador) {
                contador.textContent = `${animais.length} animais encontrados`;
            }
            
            let containerAnimais = secaoCompra.nextElementSibling;
            
            if (!containerAnimais || !containerAnimais.classList.contains('lateral_direito')) {
                return;
            }
            
            containerAnimais.innerHTML = '';
            
            if (animais.length === 0) {
                containerAnimais.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum animal cadastrado para venda ainda.</p>';
                return;
            }
            
            for (let i = 0; i < animais.length; i += 3) {
                const linha = document.createElement('section');
                linha.className = 'linha_lateral';
                linha.setAttribute('aria-label', `Linha ${Math.floor(i/3) + 1} de animais`);
                
                for (let j = i; j < i + 3 && j < animais.length; j++) {
                    const animal = animais[j];
                    const card = criarCardCompra(animal);
                    linha.appendChild(card);
                }
                
                containerAnimais.appendChild(linha);
            }
        }

        // ===== RENDERIZAR ANIMAIS PERDIDOS ===== 
        function renderizarAnimaisPerdidos(animais) {
            const secaoPerdidos = document.querySelector('.secao-perdidos');
            if (!secaoPerdidos) return;
            
            const contador = secaoPerdidos.querySelector('.contador-resultados-perdidos');
            if (contador) {
                contador.textContent = `${animais.length} animais encontrados`;
            }
            
            let containerAnimais = secaoPerdidos.nextElementSibling;
            
            if (!containerAnimais || !containerAnimais.classList.contains('lateral_direito')) {
                return;
            }
            
            containerAnimais.innerHTML = '';
            
            if (animais.length === 0) {
                containerAnimais.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum animal perdido cadastrado ainda.</p>';
                return;
            }
            
            for (let i = 0; i < animais.length; i += 3) {
                const linha = document.createElement('section');
                linha.className = 'linha_lateral';
                linha.setAttribute('aria-label', `Linha ${Math.floor(i/3) + 1} de animais`);
                
                for (let j = i; j < i + 3 && j < animais.length; j++) {
                    const animal = animais[j];
                    const card = criarCardPerdido(animal);
                    linha.appendChild(card);
                }
                
                containerAnimais.appendChild(linha);
            }
        }


        // ===== CRIAR CARD DE ADOÇÃO =====
        function criarCardAdocao(animal) {
            const article = document.createElement('article');
            article.className = 'item_lateral';
            article.style.cursor = 'pointer';
            article.setAttribute('role', 'button');
            article.setAttribute('tabindex', '0');
            
            const localizacao = formatarLocalizacao(animal.localizacao);
            
            article.innerHTML = `
                <img src="${animal.imagem || '../../assets/images/dog_sentado.svg'}" 
                     alt="Foto de ${animal.nome}">
                <div class="info_lateral">
                    <h3>${animal.nome}</h3>
                    <dl>
                        <dt class="sr-only">Idade:</dt>
                        <dd>${animal.idade}</dd>
                        <dt class="sr-only">Sexo:</dt>
                        <dd>${capitalize(animal.sexo)}</dd>
                        <dt class="sr-only">Localização:</dt>
                        <dd>${localizacao}</dd>
                    </dl>
                </div>
            `;
            
            article.addEventListener('click', () => {
                window.location.href = '../AdocaoAnimal/index.html';
            });
            
            article.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.location.href = '../AdocaoAnimal/index.html';
                }
            });
            
            return article;
        }

        // ===== CRIAR CARD DE COMPRA =====
        function criarCardCompra(animal) {
            const article = document.createElement('article');
            article.className = 'item_lateral';
            article.style.cursor = 'pointer';
            article.setAttribute('role', 'button');
            article.setAttribute('tabindex', '0');
            
            const localizacao = formatarLocalizacao(animal.localizacao);
            const valor = formatarValor(animal.valor);
            
            article.innerHTML = `
                <img src="${animal.imagem || '../../assets/images/dog_sentado.svg'}" 
                     alt="Foto de ${animal.nome}">
                <div class="info_lateral">
                    <h3>${animal.nome}</h3>
                    <dl>
                        <dt class="sr-only">Idade:</dt>
                        <dd>${animal.idade}</dd>
                        <dt class="sr-only">Sexo:</dt>
                        <dd>${capitalize(animal.sexo)}</dd>
                        <dt class="sr-only">Raça:</dt>
                        <dd>${animal.raca}</dd>
                        <dt class="sr-only">Localização:</dt>
                        <dd>${localizacao}</dd>
                        <dt class="sr-only">Valor:</dt>
                        <dd style="color: #5A0609; font-weight: bold;">${valor}</dd>
                    </dl>
                </div>
            `;
            
            article.addEventListener('click', () => {
                window.location.href = '../CompraAnimal/index.html';
            });
            
            article.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.location.href = '../CompraAnimal/index.html';
                }
            });
            
            return article;
        }

        // ===== CRIAR CARD DE PERDIDO ===== ✅ NOVA FUNÇÃO
        function criarCardPerdido(animal) {
            const article = document.createElement('article');
            article.className = 'item_lateral';
            article.style.cursor = 'pointer';
            article.setAttribute('role', 'button');
            article.setAttribute('tabindex', '0');
            
            const localizacao = formatarLocalizacao(animal.localizacao);
            const dataPerdido = animal.dataPerdido ? new Date(animal.dataPerdido).toLocaleDateString('pt-BR') : 'Não informado';
            
            article.innerHTML = `
                <img src="${animal.imagem || '../../assets/images/dog_sentado.svg'}" 
                    alt="Foto de ${animal.nome || 'Animal'}">
                <div class="info_lateral">
                    <h3>${animal.nome || 'Sem nome'}</h3>
                    <dl>
                        <dt class="sr-only">Espécie:</dt>
                        <dd>${capitalize(animal.especie)}</dd>
                        <dt class="sr-only">Cor:</dt>
                        <dd>${capitalize(animal.cor)}</dd>
                        <dt class="sr-only">Localização:</dt>
                        <dd>${localizacao}</dd>
                        <dt class="sr-only">Data perdido:</dt>
                        <dd style="color: #dc2626; font-weight: bold;">🚨 ${dataPerdido}</dd>
                    </dl>
                </div>
            `;
            
            article.addEventListener('click', () => {
                window.location.href = '../AnimaisPerdidos/index.html';
            });
            
            article.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.location.href = '../AnimaisPerdidos/index.html';
                }
            });
            
            return article;
        }


        // ===== FUNÇÕES AUXILIARES =====
        function capitalize(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function formatarLocalizacao(loc) {
            if (!loc) return 'Salvador-BA';
            return loc.split('_')
                .map(palavra => capitalize(palavra))
                .join(' ');
        }

        function formatarValor(valor) {
            if (!valor) return 'Não informado';
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
        }

        // ===== INICIALIZAR =====
        document.addEventListener('DOMContentLoaded', carregarAnimaisMenu);
        
        console.log('✅ Script de menu dinâmico carregado');
        console.log('📦 window.storage disponível?', storageDisponivel());