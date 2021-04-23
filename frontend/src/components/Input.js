
function Input({
  id,
  name,
  inputClassName,

  type,

  maxLength = '',
  minLength = '',

  placeholder = '',

  onChange,

  value = '',
  error = '' ,
  labelClassName,
  spanClassNameClarification
}) {

  return (

    <label className={labelClassName}>

      <input
        id = {id}
        name = {name}
        className = {inputClassName}
        type = {type}
        maxLength = {maxLength}
        minLength = {minLength}
        placeholder = {placeholder}
        autoComplete = 'off'
        onChange = {onChange}
        value = {value}
        required>
      </input>
      <span
        id = {`${id}-error`}
        className={`${spanClassNameClarification}__input-error`}>
          {error}
        </span>

    </label>

  )
}

export default Input;
