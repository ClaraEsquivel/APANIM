import HeaderUnificado from './HeaderUnificado';
import FooterUnificado from './FooterUnificado';
import { useModal } from './ModalCustomizado';


function Layout({ children }) {
  const { Modal } = useModal();

  return (
    <>
      <HeaderUnificado />
      
      <main>
        {children}
      </main>
      
      <FooterUnificado />
      
      {/* Modal system */}
      {Modal}
    </>
  );
}

export default Layout;