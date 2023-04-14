import classNames from 'classnames';
import React, { useState } from 'react';
import './index.scss';

interface FormInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

// 我在測試時 value 標示為 undefined
// 會讓 component 變成 uncontrolled input
// value => value = ''
function FormInput({
  label, className, id, title, value = '', ...props
}: FormInputType) {
  const customClassName = className?.split(' ');
  const [inputValue, setInputValue] = useState<React.InputHTMLAttributes<HTMLInputElement>['value']>(value);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const classes = classNames({
    'form-input': true,
  }, customClassName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!event.target.validity.valid) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  return (
    <div className={classes}>
      <label
        htmlFor={id ? `form-input-${id}` : ''}
        className="form-input__label"
      >
        {label}
      </label>
      <input
        className="form-input__input"
        value={inputValue}
        onChange={handleChange}
        id={id ? `form-input-${id}` : ''}
        {...props}
      />
      {title
        && (
          <span className="form-input__error-message">
            {showErrorMessage && title}
          </span>
        )}

    </div>
  );
}

export default FormInput;
