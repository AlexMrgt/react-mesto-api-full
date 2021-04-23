import { useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import useFormWithValidation from "../customHooks/useForm";

import PopupWithForm from "../components/PopupWithForm";
import Input from "../components/Input";


function EditProfilePopup({ isOpen: isEditProfilePopupOpen, onClose: closeAllPopups, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {

    if (!isEditProfilePopupOpen)
      return;
    resetForm({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isEditProfilePopupOpen, resetForm]); // isPopupIsOpen - почему-то убрал, надо посмотреть

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      scope='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      isDisabled = {!isValid}
    >
      <Input
        id='name-input'
        name='name'
        inputClassName='popup__field'
        type='text'
        onChange={handleChange}
        value={values.name}
        error={errors.name}
        minLength='2'
        maxLength='40'
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
      <Input
        id='description-input'
        name='about'
        inputClassName='popup__field'
        type='text'
        onChange={handleChange}
        value={values.about || ""}
        error={errors.about}
        minLength='2'
        maxLength='200'
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
