import PopupWithForm from "../components/PopupWithForm";
import Input from "../components/Input";

import { useEffect } from "react";

import useFormWithValidation from "../customHooks/useForm";

function AddPlacePopup({ isOpen: isAddPlacePopupOpen, onClose: closeAllPopups, onAddPlace }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


  function handleSubmit(evt) {

    evt.preventDefault();

    onAddPlace(values);
  }

  useEffect(() => {

    if (!isAddPlacePopupOpen)
      return;

    resetForm();
  }, [isAddPlacePopupOpen, resetForm]);

  return (
    <PopupWithForm
      scope='add'
      title='Новое место'
      buttonText='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <Input
        id='picture-input'
        name='name'
        inputClassName='popup__field'
        type='text'
        onChange={handleChange}
        placeholder='Название места'
        minLength='2'
        maxLength='30'

        value={values.name}
        error={errors.name}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'

      />
      <Input
        id='url-input'
        name='link'
        inputClassName='popup__field'
        type='url'
        onChange={handleChange}
        placeholder='Ссылка на картинку'
        value={values.link || ""}
        error={errors.link}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'

      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
