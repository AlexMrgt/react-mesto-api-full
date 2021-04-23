import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AuthorizedContext } from "../contexts/AuthContext";

import api from '../utils/api';
import { register, authorize, logOut } from '../utils/auth';

import Header from './Header';
import Register from './Register';
import Login from "./Login";
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip'

function App() {

  const [isSigUp, setSigUpStatus] = useState(false);
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  const [email, setEmail] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  let history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);


  function handleApiErr(err) {
    return console.log(`ERR TEXT: ${err}`);
  }
  // profile buttons handlers
  function handleEditProfileClick() {

    setEditProfilePopupOpen(true);
  };
  function handleEditAvatarClick() {

    setEditAvatarPopupOpen(true);
  };
  function handleAddPlaceClick() {

    setAddPlacePopupOpen(true);
  };
  function handleCardClick({ link, name }) {

    setCardPopupOpen(true);
    setSelectedCard({ link, name });
  }
  // close-popup-button handler
  function closeAllPopups() {

    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setCardPopupOpen(false);
    setInfotooltipOpen(false);

    setSelectedCard(null);
  }

  //submit-handlers
  function handleUpdateUser({ name, about }) {

    api.editTextUserInfo({ name, about })
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(err => {
        handleApiErr(err)
      })
  }
  function handleUpdateAvatar({ avatar }) {

    api.editUserPhoto({ avatar })
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(err => {
        handleApiErr(err)
      })
  }
  function handleAddPlace({ link, name }) {

    api.addNewCard({ link, name })
      .then(newCard => {

        setCards([newCard, ...cards])
      })
      .then(closeAllPopups)
      .catch(err => {
        handleApiErr(err)
      })
  }

  // cards stuff
  const [cards, setCards] = useState([]);

  function handleCardLike({ cardId, likes }) {

    const isLiked = likes.some(user => user._id === currentUser._id);

    if (isLiked) {

      api.deleteLike(cardId)
        .then(newCard => {

          setCards((state)=> state.map(c => c._id === cardId ? newCard : c))
        })
        .catch(err => {
          handleApiErr(err)
        })
    }
    else {

      api.setLike(cardId)
        .then(newCard => {

          setCards((state)=> state.map(c => c._id === cardId ? newCard : c))
        })
        .catch(err => {
          handleApiErr(err)
        })
    }
  }
  function handleCardDelete(currentCardId) {

    api.deleteCard(currentCardId)
      .then(() => {

        const newCards = cards.filter(c => c._id !== currentCardId);
        setCards(newCards);
      })
      .catch(err => {
        handleApiErr(err)
      })
  }
  //get user info
  useEffect(() => {

    api.getUserInfo()
      .then(user => {
        setCurrentUser(user);
        setLoggedInStatus(true);
        setEmail(user.email);
      })
      .catch(err => {
        console.log(`ERR TXT: ${err}`);
      });

  }, [isLoggedIn]);

  //get cards
  useEffect(() => {

    api.getDefaultCards()
      .then(cards => {
        setCards(cards.reverse());
      })
      .catch(err => {
        handleApiErr(err)
      })
  }, []);

  useEffect(() => {


  }, []);

  function handleRegistration({ password, email }) {

    register({ password, email })
      .then(res => {

        setSigUpStatus(true);
        setInfotooltipOpen(true);
        history.push('/sign-in');
      },
        err => {

          console.log(err);
          setSigUpStatus(false);
          setInfotooltipOpen(true);
        })
  }

  function handleLoggingIn({ password, email }) {

    authorize({ password, email })
      .then(() => {

        setLoggedInStatus(true);
      })
      .catch(err=>{

        console.log(`${err}`);
        setLoggedInStatus(false);
        history.push('/');
      })
  }

  function handleSignOut() {
    logOut();
    setLoggedInStatus(false);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <AuthorizedContext.Provider value={isLoggedIn}>
        <div className='wrapper'>

          <Header email={email} onSignOut={handleSignOut} />

          <Switch>

            <ProtectedRoute path='/' exact>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>

            <Route path="/sign-in">
              {isLoggedIn
                ? <Redirect to="/" />
                : <Login onLogIn={handleLoggingIn}
                />
              }
            </Route>

            <Route path="/sign-up">
              {isLoggedIn
                ? <Redirect to="/" />
                : <Register
                    isSigUp = {isSigUp}
                    onRegister={handleRegistration
                  }
                />
              }
            </Route>

            <Route path="*">
              {isLoggedIn
                ? <Redirect to="/" />
                : <Redirect to="/sign-in"
                />
              }
            </Route>

          </Switch>
          <Footer />

        </div>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlace}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
        card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          scope='confirm-card-delete'
          title='Вы уверены?'
          buttonText='Да'
          isOpen=''
          onClose={closeAllPopups}
        />

        <InfoTooltip isOpen={isInfoTooltipOpen} isSignUp={isSigUp} onClose={closeAllPopups} />

      </AuthorizedContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
