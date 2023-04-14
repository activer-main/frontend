import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormInput from '../FormInput';

describe('FormInput', () => {
  it('應該要有一個 label', () => {
    const label = '測試 label';
    render(<FormInput label={label} id={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('應該要有一個 input', () => {
    const label = '測試 input';
    render(<FormInput label={label} id={label} type="text" />);
    expect(screen.getByLabelText(label)).toHaveAttribute('type', 'text');
  });

  it('應該要顯示錯誤訊息', () => {
    const label = '測試 input';
    const title = '請輸入正確格式';
    render(<FormInput label={label} id={label} title={title} pattern="\d+" />);
    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
