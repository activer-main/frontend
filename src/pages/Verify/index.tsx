import Button from 'components/Button';
import FormInput from 'components/FormInput';
import React from 'react';
import { useUserVerifyMutation } from 'store/auth/authService';

function Verify() {
  const [verify] = useUserVerifyMutation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      verifyCode: { value: string }
    };
    verify({ verifyCode: target.verifyCode.value });
  };

  return (
    <form className="verify" onSubmit={handleSubmit}>
      <h1>驗證</h1>
      <FormInput label="驗證碼" name="verifyCode" />
      <Button text="驗證" type="submit" />
      <Button text="重新發送驗證" type="button" />
    </form>
  );
}

export default Verify;
