import React, { useState } from 'react';
import FormInput from 'components/FormInput';

import { useAppSelector } from 'store';
import parseDate from 'utils/parseStringToYYYYMMDD';
import { selectUserInfo } from 'store/auth/authSlice';
import FormSelect from 'components/FormSelect';
import Button from 'components/Button';
import CityCountyData from './countyArea.json';

function Profile() {
  const userInfo = useAppSelector(selectUserInfo);
  const {
    avatar, username, email, profession, phone, birthday, county,
    area,
  } = userInfo!;
  const [selectedCounty, setSelectCounty] = useState(county || '臺北市');

  const handleCountyChange = (event: React.SyntheticEvent) => {
    // county
    setSelectCounty((event.target as HTMLSelectElement).value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & LoginFormDataType;
    dispatch();
  };

  return (
    <form className="profile" onSubmit={handleSubmit}>
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
      {/* Gender */}
      <FormSelect
        name="gender"
        label="性別"
        value="隱藏"
        options={['男', '女', '其他', '隱藏']}
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
      {/* Country */}
      <FormSelect
        label="縣市"
        name="county"
        onChange={handleCountyChange}
        defaultValue={county}
        options={CityCountyData.map((c) => c.CityName)}
      />
      <FormSelect
        label="區鄉鎮"
        name="area"
        value={area}
        options={CityCountyData.find(
          (c) => c.CityName === selectedCounty,
        )?.AreaList.map((a) => a.AreaName) || []}
      />
      <Button text="儲存" type="submit" />
      <Button text="取消" variant={{ outline: true }} type="button" />
    </form>
  );
}

export default Profile;
