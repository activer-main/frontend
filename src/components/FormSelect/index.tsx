import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface FormSelectType extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[];
}

function FormSelect({
  label, options, className, ...props
}: FormSelectType) {
  const customClassName = className?.split(' ');
  const classes = classNames({
    select: true,
  }, customClassName);

  return (
    <div className={classes}>
      {label
          && (
            <label
              htmlFor={props.id}
              className="select__label active"
            >
              {label}
            </label>
          )}
      <select
        {...props}
        className="select__select"
      >
        {options.map((option: string, index: number) => (
          <option
            id={`${props.name}-option-${index}`}
            value={option}
            key={`${props.name}-option-${index}`}
            className="select__option"

          >
            {option}
          </option>
        ))}

      </select>
    </div>
  );
}

export default FormSelect;
