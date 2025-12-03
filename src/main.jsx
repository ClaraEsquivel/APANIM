import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Importação das páginas
import MenuPage from './pages/MenuPage'
import AdocaoAnimalPage from './pages/AdocaoAnimalPage'
import AnimaisPerdidosPage from './pages/AnimaisPerdidosPage'
import APANIMPage from './pages/APANIMPage'
import CompraAnimalPage from './pages/CompraAnimalPage'
import ServicosPage from './pages/ServicosPage'
import ParceriaPage from './pages/ParceriaPage'
import PlanosAssinaturaPage from './pages/PlanosAssinaturaPage'
import FormaPagamentoPage from './pages/FormaPagamentoPage'
import PerfilAnimal from './components/PerfilAnimal'

// Páginas de Cadastro - AGORA ATIVAS
import CadastroAnimalAdocaoPage from './pages/CadastroAnimalAdocaoPage'
import CadastroAnimalVendaPage from './pages/CadastroAnimalVendaPage'
import CadastroAnimaisPerdidosPage from './pages/CadastroAnimaisPerdidosPage'

// Páginas ainda comentadas (descomente quando estiverem prontas)
// import CadastroPage from './pages/CadastroPage'
// import LoginPage from './pages/LoginPage'
// import PerfilUsuarioPage from './pages/PerfilUsuarioPage'
// import PerfilVendedorPage from './pages/PerfilVendedorPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página Inicial */}
        <Route path="/menu" element={<MenuPage />} />
        
        {/* Páginas de Animais */}
        <Route path="/adocao-animal" element={<AdocaoAnimalPage />} />
        <Route path="/compra-animal" element={<CompraAnimalPage />} />
        <Route path="/animais-perdidos" element={<AnimaisPerdidosPage />} />
        <Route path="/perfil-animal" element={<PerfilAnimal />} />
        
        {/* Páginas de Cadastro de Animais - AGORA ATIVAS */}
        <Route path="/cadastro-animal-adocao" element={<CadastroAnimalAdocaoPage />} />
        <Route path="/cadastro-animal-venda" element={<CadastroAnimalVendaPage />} />
        <Route path="/cadastro-animal-perdido" element={<CadastroAnimaisPerdidosPage />} />
        
        {/* Páginas Institucionais */}
        <Route path="/apanim" element={<APANIMPage />} />
        <Route path="/parceria" element={<ParceriaPage />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/planos-assinatura" element={<PlanosAssinaturaPage />} />
        <Route path="/formas-pagamento" element={<FormaPagamentoPage />} />
        
        {/* Páginas de Usuário - ainda comentadas */}
        {/* <Route path="/cadastro" element={<CadastroPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} /> */}
        {/* <Route path="/perfil-vendedor" element={<PerfilVendedorPage />} /> */}
        
        {/* Rota 404 - Página não encontrada */}
        <Route path="*" element={<MenuPage />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
