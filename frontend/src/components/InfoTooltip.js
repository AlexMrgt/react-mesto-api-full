import good from '../images/auth_popup/good.png';
import bad from '../images/auth_popup/bad.png';
import closeImage from '../images/popup/close-icon.svg';

function InfoTooltip({ isSignUp, isOpen, onClose }) {





  return (

    <div className={`popup ${isOpen ? 'popup_active' : ''}`}>
      <div className='authorize-popup'>
        <div className='authorize-popup__wrapper'>
          <img className='authorize-popup__image' src={isSignUp ? good : bad} alt='Попап авторизации' />
          <p className='authorize-popup__caption'> {isSignUp ? 'Вы успешно зарегистрировались !' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
        </div>

        <button type="button" className="popup__close-popup" onClick={onClose}>
          <img className="popup__close-popup-image" src={closeImage}
            alt="Кнопка 'Закрыть всплывающее окно'" />
        </button>

      </div>
    </div>


  )
}

export default InfoTooltip;
