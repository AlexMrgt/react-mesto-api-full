import { useEffect} from 'react';

import closeImage from '../images/popup/close-icon.svg';

function ImagePopup({ isOpen, onClose, card }) {

  // закрытие по Esc
  useEffect(() => {

    if (!isOpen)
      return;

    const handleEscClose = (evt) => {

      if (evt.key === 'Escape')
        onClose();
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget && isOpen){
      onClose();
    }
  }

  return (
    <div className={`popup popup_scope_picture ${isOpen && 'popup_active' }`} onMouseUp = {handleOverlayClose}>

      <div className='card-popup'>

        <button type="button" className="popup__close-popup popup__close-popup_scope_picture" onClick={onClose}>
          <img className="popup__close-popup-image" src={closeImage}
            alt="Кнопка 'Закрыть всплывающее окно'" />
        </button>

        <img src={card ? card.link : ''} alt={card ? card.name : '' } className="card-popup__image" />
        <p className="card-popup__caption"> {card ? card.name : ''} </p>

      </div>

    </div>
  )
}

export default ImagePopup;
