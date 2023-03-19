import React from 'react';
import { useAppSelector } from 'store';

function Profile() {
  const { userInfo } = useAppSelector((state) => state.auth);

  return (
    <div className="profile">
      <figure>{userInfo?.realName}</figure>
      <span>
        Welcome
        {' '}
        <strong>
          {userInfo?.realName}
          !
        </strong>
        {' '}
        You can view this page
        because youre logged in
      </span>
    </div>
  );
}

export default Profile;
