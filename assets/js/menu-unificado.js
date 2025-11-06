// ===== MENU SANDUÍCHE UNIFICADO =====
// Este arquivo garante que todas as páginas tenham o mesmo menu

function criarMenuSanduiche() {
    const menuHTML = `
        <div id="menu_sanduiche">
            <input type="checkbox" id="menu_toggle">
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul id="menu">
                <div class="menu-close">
                    <label for="menu_toggle" class="close-button">
                        <span class="close-line1"></span>
                        <span class="close-line2"></span>
                    </label>
                </div>
                <li><a href="../Menu/index.html">Início</a></li>
                <li><a href="../CadastroInicial/index.html">Cadastro</a></li>
                <li><a href="../CadastroUsuario/index.html">Login</a></li>
                <li><a href="../PerfilUsuario/index.html">Meu Perfil</a></li>
                <li><a href="../AdocaoAnimal/index.html">Animais para Adoção</a></li>
                <li><a href="../CompraAnimal/index.html">Animais para Compra</a></li>
                <li><a href="../AnimaisPerdidos/index.html">Animais Perdidos</a></li>
                <li><a href="../CadastroAnimalAdocao/index.html">Cadastro Animal para Adoção</a></li>
                <li><a href="../CadastroAnimalVenda/index.html">Cadastro Animal para Venda</a></li>
                <li><a href="../CadastroAnimaisPerdidos/index.html">Cadastro Animal Perdido</a></li>
                <li><a href="../Serviços/index.html">Serviços</a></li>
                <li><a href="../Parceria/index.html">Parcerias</a></li>
            </ul>
        </div>
    `;

    return menuHTML;
}

// Função para inserir o menu na página
function inserirMenu() {
    const nav = document.querySelector('nav[role="navigation"]');
    if (nav) {
        nav.innerHTML = criarMenuSanduiche();
    }
}

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inserirMenu);
} else {
    inserirMenu();
}