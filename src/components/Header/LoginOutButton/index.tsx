import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

function LoginOutButton() {
  const navigate = useNavigate();

  return (
    <div className="login-out-button">
      <Button text="登入/註冊" onClick={() => navigate('/login')} />
    </div>
  );
}

export default LoginOutButton;
