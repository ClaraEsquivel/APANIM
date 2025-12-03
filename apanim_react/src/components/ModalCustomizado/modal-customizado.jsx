import { useState, useEffect } from 'react';
import './modal-customizado.css';

// Componente Modal
function Modal({ config }) {
  const [isClosing, setIsClosing] = useState(false);

  // Previne scroll do body
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleClose(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = (resultado) => {
    setIsClosing(true);
    setTimeout(() => {
      config.onClose(resultado);
    }, 300);
  };

  const handleBackdropClick = () => {
    if (config.fecharBackdrop !== false) {
      handleClose(false);
    }
  };

  const handleButtonClick = (acao) => {
    if (acao === 'confirm' || acao === 'ok') {
      handleClose(true);
    } else if (acao === 'cancel') {
      handleClose(false);
    } else {
      handleClose(acao);
    }
  };

  const getIcone = (tipo) => {
    const icones = {
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'info': 'ℹ️',
      'question': '❓'
    };
    return icones[tipo] || '';
  };

  const tipoClass = config.tipo ? ` ${config.tipo}` : '';
  const showClass = isClosing ? ' hide' : ' show';

  return (
    <>
      <div 
        className={`modal-backdrop${showClass}`}
        onClick={handleBackdropClick}
      />
      <div className={`modal-container${showClass}`}>
        <div className={`modal-box${tipoClass}`}>
          <div className="modal-header">
            <h3>{config.titulo}</h3>
            {config.fecharX !== false && (
              <button 
                className="modal-close" 
                onClick={() => handleClose(false)}
                aria-label="Fechar"
              >
                &times;
              </button>
            )}
          </div>
          <div className="modal-body">
            {config.icone && (
              <div className={`modal-icon ${config.icone}`}>
                {getIcone(config.icone)}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: config.mensagem }} />
          </div>
          <div className="modal-footer">
            {(config.botoes || [{ texto: 'OK', classe: 'modal-btn-primary', acao: 'ok' }]).map((botao, index) => (
              <button
                key={index}
                className={`modal-btn ${botao.classe}`}
                onClick={() => handleButtonClick(botao.acao)}
              >
                {botao.texto}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Hook customizado para usar modais
export function useModal() {
  const [modalConfig, setModalConfig] = useState(null);

  const showModal = (config) => {
    return new Promise((resolve) => {
      setModalConfig({
        ...config,
        onClose: (result) => {
          setModalConfig(null);
          resolve(result);
        }
      });
    });
  };

  const alertaSucesso = (titulo, mensagem) => {
    return showModal({
      titulo,
      mensagem: `<p>${mensagem}</p>`,
      tipo: 'success',
      icone: 'success',
      botoes: [
        { texto: 'OK', classe: 'modal-btn-primary', acao: 'ok' }
      ]
    });
  };

  const alertaAviso = (titulo, mensagem) => {
    return showModal({
      titulo,
      mensagem: `<p>${mensagem}</p>`,
      tipo: 'warning',
      icone: 'warning',
      botoes: [
        { texto: 'Entendi', classe: 'modal-btn-primary', acao: 'ok' }
      ]
    });
  };

  const alertaErro = (titulo, mensagem) => {
    return showModal({
      titulo,
      mensagem: `<p>${mensagem}</p>`,
      tipo: 'error',
      icone: 'error',
      botoes: [
        { texto: 'Fechar', classe: 'modal-btn-primary', acao: 'ok' }
      ]
    });
  };

  const alertaInfo = (titulo, mensagem) => {
    return showModal({
      titulo,
      mensagem: `<p>${mensagem}</p>`,
      tipo: 'info',
      icone: 'info',
      botoes: [
        { texto: 'OK', classe: 'modal-btn-primary', acao: 'ok' }
      ]
    });
  };

  const confirmarModal = (titulo, mensagem, icone = 'question') => {
    return showModal({
      titulo,
      mensagem: `<p>${mensagem}</p>`,
      icone,
      botoes: [
        { texto: 'Cancelar', classe: 'modal-btn-cancel', acao: 'cancel' },
        { texto: 'Confirmar', classe: 'modal-btn-primary', acao: 'confirm' }
      ],
      fecharBackdrop: false,
      fecharX: true
    });
  };

  // Retorna o componente Modal e as funções
  return {
    Modal: modalConfig ? <Modal config={modalConfig} /> : null,
    alertaSucesso,
    alertaAviso,
    alertaErro,
    alertaInfo,
    confirmarModal,
    showModal
  };
}

// Export default vazio para evitar erros de import
export default useModal;