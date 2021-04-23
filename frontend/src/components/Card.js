import {useContext} from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card:{name, link, likes, _id:cardId, owner:cardOwner},
  onCardClick, onCardLike, onCardDelete
}) {

  const {_id: currentUserId} = useContext(CurrentUserContext);

  const isOwner = cardOwner._id === currentUserId;
  const isLiked = likes.some(user => user._id === currentUserId);

  const cardDeleteButtonClassName = (
    `card__delete-card ${isOwner ? '' : 'card__delete-card_hidden'}`
  );

  const cardLikeClassName = (
    `card__like ${isLiked ? 'card__like_active' : ''}`
  );

  function handleClick() {

    onCardClick({link, name});
  };

  function handleLikeClick () {

    onCardLike({cardId, likes})
  };

  function handleDeleteClick() {

    onCardDelete(cardId);
  }

  return (
    <article  className = 'card'>
      <button type = 'button' className = {cardDeleteButtonClassName} onClick = {handleDeleteClick}></button>
      <img src={link} alt={`Фотография '${name}'`} className='card__picture' onClick = {handleClick} />
      <h2 className='card__title'>{name}</h2>
      <div className='card__like-container'>
        <button type='button' className={cardLikeClassName} onClick={handleLikeClick}></button>
        <p className='card__like-counter'>{likes.length}</p>
      </div>
    </article>
  )
}

export default Card;
