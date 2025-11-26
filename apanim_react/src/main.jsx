import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Importar páginas
import MenuPage from './pages/MenuPage'
import AdocaoAnimalPage from './pages/AdocaoAnimalPage'

// TODO: Criar estas páginas conforme necessário
// import SobrePage from './pages/SobrePage'
// import CadastroPage from './pages/CadastroPage'
// import LoginPage from './pages/LoginPage'
// import CompraAnimalPage from './pages/CompraAnimalPage'
// import AnimaisPerdidosPage from './pages/AnimaisPerdidosPage'
// import CadastroAnimalAdocaoPage from './pages/CadastroAnimalAdocaoPage'
// import CadastroAnimalVendaPage from './pages/CadastroAnimalVendaPage'
// import CadastroAnimalPerdidoPage from './pages/CadastroAnimalPerdidoPage'
// import ParceriaPage from './pages/ParceriaPage'
// import ServicosPage from './pages/ServicosPage'
// import PlanosAssinaturaPage from './pages/PlanosAssinaturaPage'
// import PerfilUsuarioPage from './pages/PerfilUsuarioPage'
// import PerfilVendedorPage from './pages/PerfilVendedorPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/menu" element={<MenuPage />} />
        
        {/* Páginas de Animais */}
        <Route path="/adocao-animal" element={<AdocaoAnimalPage />} />
        {/* <Route path="/compra-animal" element={<CompraAnimalPage />} /> */}
        {/* <Route path="/animais-perdidos" element={<AnimaisPerdidosPage />} /> */}
        
        {/* Páginas de Cadastro de Animais */}
        {/* <Route path="/cadastro-animal-adocao" element={<CadastroAnimalAdocaoPage />} /> */}
        {/* <Route path="/cadastro-animal-venda" element={<CadastroAnimalVendaPage />} /> */}
        {/* <Route path="/cadastro-animal-perdido" element={<CadastroAnimalPerdidoPage />} /> */}
        
        {/* Páginas Institucionais */}
        {/* <Route path="/sobre" element={<SobrePage />} /> */}
        {/* <Route path="/parceria" element={<ParceriaPage />} /> */}
        {/* <Route path="/servicos" element={<ServicosPage />} /> */}
        {/* <Route path="/planos-assinatura" element={<PlanosAssinaturaPage />} /> */}
        
        {/* Páginas de Usuário */}
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