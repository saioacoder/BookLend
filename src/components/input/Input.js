import { useSelector } from 'react-redux';

import './Input.scss';

const Input = ({
  type='text',
  label,
  value,
  id,
  placeholder,
  hasError,
  errorMessage,
  onChange
}) => {
  return (
    <div className={hasError ? 'fieldInput fieldInput_error' : 'fieldInput'}>
      <label>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!hasError || <p className="fieldInput_errorMessage">{errorMessage}</p>}
    </div>
  )
}

export default Input;