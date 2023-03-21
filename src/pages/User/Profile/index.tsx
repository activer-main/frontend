import FormInput from 'components/FormInput';
import React from 'react';
import { useAppSelector } from 'store';
import parseDate from 'utils/parseStringToYYYYMMDD';
import { selectUserInfo } from 'store/auth/authSlice';

function Profile() {
  const userInfo = useAppSelector(selectUserInfo);
  const {
    avatar, username, email, profession, phone, birthday,
  } = userInfo!;
  return (
    <div className="profile">
      <img src={avatar} alt={username} />
      <h2>{`歡迎回來，${username}`}</h2>
      {/* Username */}
      <FormInput
        name="username"
        label="使用者名稱"
        value={username}
      />
      {/* Email */}
      <FormInput
        name="email"
        label="帳號"
        value={email}
        disabled
      />
      {/* Profession */}
      <FormInput
        name="profession"
        label="職業"
        value={profession}
      />
      {/* Birthday */}
      <FormInput
        name="birthday"
        label="生日"
        type="date"
        value={parseDate(birthday.toString())}
      />
      {/* Phone */}
      <FormInput
        name="phone"
        label="電話"
        value={phone}
      />
    </div>
  );
}

export default Profile;
