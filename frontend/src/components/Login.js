import Input from "./Input";

import useFormWithValidation from '../customHooks/useForm';

function Login({ onLogIn }) {

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  function handleSubmit(evt) {

    evt.preventDefault();
    onLogIn(values);
    resetForm();
  }

  return (
    <section className='unauthorized'>
      <form
        noValidate
        className='unauthorized__form'
        onSubmit={handleSubmit}
      >
        <p
          className='unauthorized__title'>
          Вход
        </p>
        <Input
          id='log-owner-email'
          name = 'email'
          inputClassName = 'unauthorized__field'
          type='email'
          onChange={handleChange}
          placeholder='Email'
          value={values.email}
          error = {errors.email}
          labelClassName = 'unauthorized__label'
          spanClassNameClarification = 'unauthorized'
        />
        <Input
          id='log-owner-password'
          name = 'password'
          inputClassName = 'unauthorized__field'
          type='password'
          onChange={handleChange}
          placeholder='Password'
          value={values.password}
          error = {errors.password}
          labelClassName = 'unauthorized__label'
          spanClassNameClarification = 'unauthorized'
        />
        <button
          type="submit"
          className={`unauthorized__submit ${!isValid && 'unauthorized__submit_disabled'}`}
          disabled = {!isValid}
          >
          Войти
        </button>
      </form>
    </section>
  )
}

export default Login;
