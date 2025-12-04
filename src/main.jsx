import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Observação: remoção automática de dados locais foi desativada
// Se desejar limpar dados de teste, remova manualmente as chaves no console do navegador.

// Importação das páginas
import MenuPage from './pages/MenuPage'
import AdocaoAnimalPage from './pages/AdocaoAnimalPage'
import AnimaisPerdidosPage from './pages/AnimaisPerdidosPage'
import APANIMPage from './pages/APANIMPage'
import CompraAnimalPage from './pages/CompraAnimalPage'
import ServicosPage from './pages/ServicosPage'
import ParceriaPage from './pages/ParceriaPage'
import PlanosAssinaturaPage from './pages/PlanosAssinaturaPage'
import CadastroAnimalAdocaoPage from './pages/CadastroAnimalAdocaoPage'
import CadastroAnimalVendaPage from './pages/CadastroAnimalVendaPage'
import CadastroAnimaisPerdidosPage from './pages/CadastroAnimaisPerdidosPage'
import LoginPage from './pages/LoginPage'
import CadastroInicialPage from './pages/CadastroInicialPage'
import CadastroUsuarioPage from './pages/CadastroUsuarioPage'
import CadastroVendedorPage from './pages/CadastroVendedorPage'
import PerfilUsuarioPage from './pages/PerfilUsuarioPage'
import PerfilVendedorPage from './pages/PerfilVendedorPage'
import FormaPagamentoPage from './pages/FormaPagamentoPage'
import PerfilAnimalPage from './pages/PerfilAnimalPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/menu" element={<MenuPage />} />
        
        {/* Páginas de Animais */}
        <Route path="/adocao-animal" element={<AdocaoAnimalPage />} />
        <Route path="/compra-animal" element={<CompraAnimalPage />} />
        <Route path="/animais-perdidos" element={<AnimaisPerdidosPage />} />
        
        {/* Páginas de Cadastro de Animais - AGORA ATIVAS */}
        <Route path="/cadastro-animal-adocao" element={<CadastroAnimalAdocaoPage />} />
        <Route path="/cadastro-animal-venda" element={<CadastroAnimalVendaPage />} />
        <Route path="/cadastro-animal-perdido" element={<CadastroAnimaisPerdidosPage />} />
        
        {/* Páginas Institucionais */}
        <Route path="/apanim" element={<APANIMPage />} />
        <Route path="/parceria" element={<ParceriaPage />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/planos-assinatura" element={<PlanosAssinaturaPage />} />
        <Route path="/forma-pagamento" element={<FormaPagamentoPage />} />
        
        {/* Páginas de Usuário */}
        <Route path="/cadastro" element={<CadastroInicialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuarioPage />} />
        <Route path="/cadastro-vendedor" element={<CadastroVendedorPage />} />
        <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />
        <Route path="/perfil-vendedor" element={<PerfilVendedorPage />} />
        
        {/* Página de Perfil do Animal */}
        <Route path="/perfil-animal" element={<PerfilAnimalPage />} />
        
        {/* Rota 404 - Página não encontrada */}
        <Route path="*" element={<MenuPage />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
