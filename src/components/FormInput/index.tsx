import classNames from 'classnames';
import React, { useState } from 'react';
import './index.scss';

interface FormInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function FormInput({
  label, className, id, title, value, ...props
}: FormInputType) {
  const customClassName = className?.split(' ');
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const classes = classNames({
    'form-input__input': true,
  }, customClassName);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!event.target.validity.valid) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  return (
    <div className="form-input">
      <label
        htmlFor={id ? `form-input-${id}` : ''}
        className="form-input__label"
      >
        {label}
      </label>
      <input
        className={classes}
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
