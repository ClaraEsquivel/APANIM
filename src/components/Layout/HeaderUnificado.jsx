import MenuUnificado from './MenuUnificado';
import ScrollTop from './ScrollTop';
import './header-unificado.css';
import PawsImg from '../images/Paws.svg';
import LogoImg from '../images/APANIM_logo.svg';
import CatImg from '../images/cat.svg';
import DogImg from '../images/dog.svg';

function HeaderUnificado() {
  return (
    <>
      <header>
        <div className="topo">
          <img src={PawsImg} className="patas_topo" alt="Patas" />
          <img src={LogoImg} id="logo_apanim" alt="Logo APANIM" />
          <img src={CatImg} className="cat_topo" alt="Gato" />
          <img src={DogImg} className="dog_topo" alt="Cachorro" />
        </div>

        <nav role="navigation">
          <MenuUnificado />
        </nav>
      </header>
      
      <ScrollTop />
    </>
  );
}

export default HeaderUnificado;