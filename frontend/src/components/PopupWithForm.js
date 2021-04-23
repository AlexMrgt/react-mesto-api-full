import closeImage from '../images/popup/close-icon.svg';

import {useEffect} from 'react';

function PopupWithForm( {
  children,
  scope,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isDisabled = false} ) {

  useEffect(() => {

    if (!isOpen) return;

    const handleEscClose = (evt) => {

      if (evt.key === 'Escape')
        onClose();
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose]);

  useEffect(() => {

    if (!isOpen)
      return;

    const handleOverlayClose = (evt) => {

      if (evt.target.classList.contains("popup"))
        onClose();
    }

    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    }
  }, [isOpen, onClose]);


  return (

    <div className={`popup popup_scope_${scope} ${isOpen? 'popup_active' : ''}`}>

      <div className="popup__wrapper">

        <form className={`popup__form popup__form_scope_${scope}`} name={scope} onSubmit = {onSubmit} noValidate >

          <button type="button" className="popup__close-popup" onClick = {onClose}>
            <img className="popup__close-popup-image" src={closeImage}
              alt="Кнопка 'Закрыть всплывающее окно'" />
          </button>

          <h2 className="popup__header">{title}</h2>

          {children}

          <button
            type="submit"
            className={`popup__save-button ${isDisabled && "popup__save-button_disabled"}`}
            disabled = {isDisabled}
          >
            {buttonText}
          </button>

        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
