import React, { useState } from 'react';
import FormInput from 'components/FormInput';
import { useAppDispatch, useAppSelector } from 'store';
import parseDate from 'utils/parseStringToYYYYMMDD';
import { selectUserInfo } from 'store/auth/authSlice';
import FormSelect from 'components/FormSelect';
import { ProfileFormDataType } from 'types/user';
import Button from 'components/Button';
import { userUpdate } from 'store/auth/authAction';
import CityCountyData from './countyArea.json';
import './index.scss';

function Profile() {
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
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
    const target = event.target as typeof event.target & ProfileFormDataType;
    dispatch(userUpdate({
      username: target.username.value,
      avatar: '',
      // TODO: avatar input
      gender: target.gender.value,
      profession: target.profession.value,
      birthday: target.birthday.value as Date,
      phone: target.phone.value,
      county: target.county.value,
      area: target.area.value,
    }));
  };

  return (
    <form className="profile" onSubmit={handleSubmit}>
      <img
        className="profile__avatar"
        src={`http://220.132.244.41:5044${avatar}`}
        alt={username}
      />
      <h2 className="profile__header">歡迎回來</h2>
      {/* Username */}
      <div className="profile__inputs">
        <FormInput
          className="profile__username"
          name="username"
          label="使用者名稱"
          value={username || ''}
        />
        {/* Email */}
        <FormInput
          className="profile__email"
          name="email"
          label="帳號"
          value={email}
          disabled
        />

        {/* Profession */}
        <FormInput
          className="profile__prefession"
          name="profession"
          label="職業"
          value={profession || ''}
        />
        {/* Gender */}
        <FormSelect
          className="profile__gender"
          name="gender"
          label="性別"
          defaultValue="隱藏"
          options={['男', '女', '其他', '隱藏']}
        />

        {/* Birthday */}
        <FormInput
          className="profile__birthday"
          name="birthday"
          label="生日"
          type="date"
          value={birthday ? parseDate(birthday.toString()) : undefined}
        />
        {/* Phone */}
        <FormInput
          className="profile__phone"
          name="phone"
          label="電話"
          value={phone || undefined}
        />
        {/* Country */}
        <FormSelect
          className="profile__county"
          label="縣市"
          name="county"
          onChange={handleCountyChange}
          defaultValue={county || undefined}
          options={CityCountyData.map((c) => c.CityName)}
        />
        <FormSelect
          className="profile__area"
          label="區鄉鎮"
          name="area"
          defaultValue={area || undefined}
          options={CityCountyData.find(
            (c) => c.CityName === selectedCounty,
          )?.AreaList.map((a) => a.AreaName) || []}
        />
      </div>
      <div className="profile__control">
        <Button text="儲存" type="submit" />
        <Button text="取消" variant={{ outline: true }} type="button" />
      </div>
    </form>
  );
}

export default Profile;
