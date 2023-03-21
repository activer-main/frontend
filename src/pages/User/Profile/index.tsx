import React from 'react';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/auth/authSlice';

function Profile() {
  const userInfo = useAppSelector(selectUserInfo);
  const { avatar, username } = userInfo!;

  return (
    <div className="profile">
      <img src={avatar} alt={username} />
      <h2>{`歡迎回來，${username}`}</h2>
    </div>
  );
}

export default Profile;
