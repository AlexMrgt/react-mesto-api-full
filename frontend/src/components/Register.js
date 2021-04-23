import Input from "./Input";
import { Link } from 'react-router-dom';

import useFormWithValidation from '../customHooks/useForm';

function Register({ onRegister }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {

    evt.preventDefault();
    onRegister(values);
    resetForm();
  }

  return (
    <section
      className='unauthorized'>
      <form
        className='unauthorized__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <p className='unauthorized__title'>Регистрация</p>
        <Input
          id='reg-owner-email'
          name='email'
          inputClassName='unauthorized__field'
          type='email'
          onChange={handleChange}
          placeholder='Email'
          value={values.email}
          error={errors.email}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <Input
          id='reg-owner-password'
          name='password'
          inputClassName='unauthorized__field'
          type='password'
          minLength='8'
          onChange={handleChange}
          placeholder='Password'
          value={values.password}
          error={errors.password}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <button
          type="submit"
          className={`unauthorized__submit ${!isValid && 'unauthorized__submit_disabled'}`}
          disabled={!isValid}
        >
          Зарегестрироваться
          </button>
        <p className='unauthorized__caption' >
          Уже зарегистрированы?
          <Link className='unauthorized__caption header__link' to='/sign-in'>
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Register;
