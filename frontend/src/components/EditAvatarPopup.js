import { useEffect } from "react";

import PopupWithForm from "../components/PopupWithForm";

import useFormWithValidation from '../customHooks/useForm';
import Input from "./Input";

function EditAvatarPopup({
  isOpen: isEditAvatarPopupOpen,
  onClose: closeAllPopups,
  onUpdateAvatar
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {

    evt.preventDefault();
    onUpdateAvatar(values);
  }

  useEffect(() => {

    if (!isEditAvatarPopupOpen)
      return;
    resetForm();
  }, [resetForm, isEditAvatarPopupOpen]);


  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      scope='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      isDisabled={!isValid}
    >
      <Input
        id='avatar-url-input'
        name='avatar'
        inputClassName='popup__field'
        type='url'
        onChange={handleChange}
        placeholder='Ссылка на фото'
        value={values.avatar}
        error={errors.avatar}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
