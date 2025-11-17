/* ============= COMPONENTE DE PERFIL NO HEADER - GLOBAL ============= */
/* Este arquivo deve ser incluído em TODAS as páginas do site */

(function () {
    'use strict';

    // ============= VARIÁVEIS =============
    let userHeaderElement = null;
    let dropdownMenu = null;

    // ============= CRIAR PERFIL NO HEADER =============
    function createUserHeader() {
        // Verifica se já existe
        if (document.getElementById('user-profile-header')) {
            return;
        }

        // Encontra o nav no header
        const nav = document.querySelector('header nav[role="navigation"]');
        if (!nav) {
            console.warn('Nav não encontrado no header');
            return;
        }

        // Cria o elemento do perfil
        userHeaderElement = document.createElement('div');
        userHeaderElement.id = 'user-profile-header';
        userHeaderElement.className = 'user-profile-header';
        userHeaderElement.style.display = 'none'; // Oculto por padrão

        userHeaderElement.innerHTML = `
            <img src="../../assets/images/perfil.svg" alt="Foto de perfil" class="user-avatar-small">
            <div class="user-info-small">
                <span class="user-name-small">Usuário</span>
                <span class="user-status">Online</span>
            </div>
            <span class="user-dropdown-arrow">▼</span>
        `;

        nav.appendChild(userHeaderElement);

        // Adicionar estilos
        addHeaderStyles();

        // Adicionar event listener
        userHeaderElement.addEventListener('click', toggleDropdown);
    }

    // ============= ADICIONAR ESTILOS =============
    function addHeaderStyles() {
        if (document.getElementById('user-header-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'user-header-styles';
        style.textContent = `
            .user-profile-header {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 16px;
                background: white;
                border-radius: 50px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: all 0.3s ease;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 100;
            }

            .user-profile-header:hover {
                transform: translateY(-50%) scale(1.05);
                box-shadow: 0 4px 15px rgba(90, 6, 9, 0.2);
            }

            .user-avatar-small {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #5A0609;
                object-fit: cover;
            }

            .user-info-small {
                display: flex;
                flex-direction: column;
            }

            .user-name-small {
                font-weight: 600;
                color: #5A0609;
                font-size: 14px;
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .user-status {
                font-size: 11px;
                color: #4CAF50;
            }

            .user-dropdown-arrow {
                font-size: 10px;
                color: #5A0609;
                transition: transform 0.3s ease;
            }

            .user-profile-header:hover .user-dropdown-arrow {
                transform: translateY(2px);
            }

            .user-dropdown-menu {
                position: absolute;
                top: calc(100% + 10px);
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                padding: 12px 0;
                min-width: 220px;
                z-index: 1000;
                animation: slideDown 0.3s ease;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .user-dropdown-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 20px;
                color: #333;
                text-decoration: none;
                transition: all 0.2s ease;
                cursor: pointer;
                font-size: 14px;
            }

            .user-dropdown-item:hover {
                background: #fce4e4;
                color: #5A0609;
            }

            .user-dropdown-item .item-icon {
                font-size: 18px;
                width: 24px;
                text-align: center;
            }

            .user-dropdown-divider {
                height: 1px;
                background: #e0e0e0;
                margin: 8px 0;
            }

            .user-plano-badge {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 700;
                background: linear-gradient(135deg, #5A0609, #420406);
                color: white;
                margin-left: 8px;
            }

            @media (max-width: 768px) {
                .user-profile-header {
                    padding: 6px 12px;
                    gap: 8px;
                    right: 10px;
                }

                .user-avatar-small {
                    width: 35px;
                    height: 35px;
                }

                .user-name-small {
                    font-size: 12px;
                    max-width: 100px;
                }

                .user-info-small {
                    display: none;
                }

                .user-dropdown-arrow {
                    display: none;
                }

                .user-dropdown-menu {
                    right: 10px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // ============= ATUALIZAR DADOS DO USUÁRIO =============
    function updateUserHeader(userData) {
        if (!userHeaderElement) {
            createUserHeader();
        }

        if (!userData || !userHeaderElement) {
            userHeaderElement.style.display = 'none';
            return;
        }

        // Atualizar avatar
        const avatar = userHeaderElement.querySelector('.user-avatar-small');
        if (avatar && userData.picture) {
            avatar.src = userData.picture;
        }

        // Atualizar nome
        const nameEl = userHeaderElement.querySelector('.user-name-small');
        if (nameEl && userData.nome) {
            nameEl.textContent = userData.nome;
        }

        // Mostrar header
        userHeaderElement.style.display = 'flex';
    }

    // ============= CRIAR DROPDOWN MENU =============
    function createDropdownMenu(userData) {
        // Remove menu existente
        if (dropdownMenu) {
            dropdownMenu.remove();
        }

        dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'user-dropdown-menu';

        const planoNomes = {
            'gratuito': 'Gratuito',
            'amigo': 'Amigo',
            'protetor': 'Protetor',
            'ong': 'ONG'
        };

        const planoAtual = planoNomes[userData?.plano] || 'Gratuito';

        dropdownMenu.innerHTML = `
            <a href="../PerfilUsuario/index.html" class="user-dropdown-item">
                <span class="item-icon">👤</span>
                <span>Meu Perfil</span>
            </a>
            <a href="../PerfilUsuario/index.html#animais" class="user-dropdown-item">
                <span class="item-icon">🐾</span>
                <span>Meus Animais</span>
            </a>
            <a href="../PerfilUsuario/index.html#planos" class="user-dropdown-item">
                <span class="item-icon">⭐</span>
                <span>Planos</span>
                <span class="user-plano-badge">${planoAtual}</span>
            </a>
            <div class="user-dropdown-divider"></div>
            <a href="../PerfilUsuario/index.html#configuracoes" class="user-dropdown-item">
                <span class="item-icon">⚙️</span>
                <span>Configurações</span>
            </a>
            <div class="user-dropdown-item" onclick="window.GoogleAuth?.logout() || alert('Sistema de logout não disponível')">
                <span class="item-icon">🚪</span>
                <span>Sair</span>
            </div>
        `;

        document.body.appendChild(dropdownMenu);

        // Fechar ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', closeDropdownOnClickOutside);
        }, 100);
    }

    // ============= TOGGLE DROPDOWN =============
    function toggleDropdown(e) {
        e.stopPropagation();

        if (dropdownMenu && dropdownMenu.parentElement) {
            closeDropdown();
        } else {
            const userData = window.currentUser;
            createDropdownMenu(userData);
        }
    }

    // ============= FECHAR DROPDOWN =============
    function closeDropdown() {
        if (dropdownMenu) {
            dropdownMenu.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => {
                if (dropdownMenu) {
                    dropdownMenu.remove();
                    dropdownMenu = null;
                }
            }, 300);
        }
        document.removeEventListener('click', closeDropdownOnClickOutside);
    }

    function closeDropdownOnClickOutside(e) {
        if (dropdownMenu && !dropdownMenu.contains(e.target) &&
            !userHeaderElement.contains(e.target)) {
            closeDropdown();
        }
    }

    // ============= VERIFICAR E ATUALIZAR USUÁRIO =============
    // ============= VERIFICAR E ATUALIZAR USUÁRIO =============
    function checkAndUpdateUser() {
        const userData = window.currentUser;

        if (userData && userData.loggedIn) {
            updateUserHeader(userData);
        } else {
            // Usuário não logado, esconder header
            if (userHeaderElement) {
                userHeaderElement.style.display = 'none';
            }
            // ❌ REMOVER OU COMENTAR ESTA PARTE:
            // console.log('⚠️ Usuário não autenticado');
        }
    }
    // ============= LISTENERS DE EVENTOS =============
    document.addEventListener('userLoggedIn', (e) => {
        console.log('✅ Usuário logou, atualizando header');
        updateUserHeader(e.detail);
    });

    document.addEventListener('userLoggedOut', () => {
        console.log('👋 Usuário deslogou, escondendo header');
        if (userHeaderElement) {
            userHeaderElement.style.display = 'none';
        }
        closeDropdown();
    });

    // ============= INICIALIZAÇÃO =============
    function init() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createUserHeader();
                checkAndUpdateUser();
            });
        } else {
            createUserHeader();
            checkAndUpdateUser();
        }

        // Verifica periodicamente se o usuário mudou
        setInterval(checkAndUpdateUser, 2000);
    }

    // Inicia o componente
    init();

    // ============= EXPORTS =============
    window.UserHeader = {
        update: updateUserHeader,
        hide: () => {
            if (userHeaderElement) {
                userHeaderElement.style.display = 'none';
            }
        },
        show: () => {
            if (userHeaderElement) {
                userHeaderElement.style.display = 'flex';
            }
        }
    };

    console.log('🔧 Componente UserHeader inicializado');
})();