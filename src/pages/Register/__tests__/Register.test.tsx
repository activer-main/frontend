import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import Register from '../index';

// Test
describe('Register component', () => {
  it('Register Page render correctly', () => {
    // render component
    renderWithProviders(<Register />);

    // query
    const emailInput = screen.getByRole('textbox', { name: '帳號' });

    // assertion
    expect(screen.getByRole('heading', { name: '註冊' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '使用者名稱' })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByLabelText('確認密碼')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '註冊' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
  });
});
