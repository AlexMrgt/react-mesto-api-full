import addButtonImage from '../images/profile/add-button.svg';
import editAvatarIcon from '../images/profile/edit_icon.svg';

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card.js';


function Main( {cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const {name, about, avatar} = useContext(CurrentUserContext);

  return (
    <main className='content' >

      <section className='profile' aria-label='Профиль' >

        <div className='profile__image-and-edit-button-container'>
          <img src={avatar} alt='Фото профиля' className='profile__photo' onClick={onEditAvatar} />
          <img src={editAvatarIcon} alt='Кнопка Изменить аватар' className='profile__edit-profile-image'  />
        </div>

        <div className='profile__name-and-edit-button-container'>
          <h1 className='profile__name'>{name}</h1>

          <button type='button' className='profile__edit-profile' onClick={onEditProfile} ></button>
        </div>

        <p className='profile__description'>{about}</p>

        <button onClick={onAddPlace} type='button' className='profile__add-card'>
          <img className='profile__add-card-image' src={addButtonImage}
            alt='Кнопка Добавить карточку' />
        </button>
      </section>

      <section className='gallery' aria-label='Галерея'>

        {cards.map(card => (
          <Card
            key = {card._id}
            card = {card}
            onCardClick = {onCardClick}
            onCardLike = {onCardLike}
            onCardDelete = {onCardDelete} />
        ))}

      </section>

    </main>
  )
};

export default Main;
