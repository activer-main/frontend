import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import parseDate from 'utils/parseStringToYYYYMMDD';
import { selectUserInfo } from 'store/auth/authSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Button from '@mui/material/Button';
import { userUpdate } from 'store/auth/authAction';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Avatar, FormControl, InputLabel, MenuItem,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { ProfileFormDataType } from 'types/user';
import CityCountyData from './countyArea.json';

function Profile() {
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const {
    avatar, username, email, profession, phone, birthday, county,
    area,
  } = userInfo!;
  const [selectedCounty, setSelectCounty] = useState(county || '臺北市');

  const handleCountyChange = (event:SelectChangeEvent) => {
    // county
    setSelectCounty((event.target as HTMLSelectElement).value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & ProfileFormDataType;
    dispatch(userUpdate({
      username: target.username.value,
      // avatar: '',
      // TODO: avatar input
      gender: target.gender.value,
      // profession: target.profession.value,
      birthday: target.birthday.value,
      phone: target.phone.value,
      county: target.county.value,
      area: target.area.value,
    }));
  };

  return (
    <Container component="form" maxWidth="xl" onSubmit={handleSubmit}>
      <Avatar
        src={`http://220.132.244.41:5044${avatar}`}
        alt={username || 'user-avatar'}
      >
        {username}
      </Avatar>
      {/* Username */}
      <Stack maxWidth="sm" spacing={3} sx={{ mt: 2 }}>

        <TextField
          name="username"
          label="使用者名稱"
          value={username || ''}
        />

        {/* Email */}

        <TextField
          name="email"
          label="帳號"
          value={email}
          disabled
        />

        {/* Profession */}
        <TextField
          name="profession"
          label="職業"
          value={profession || ''}
        />
        {/* Gender */}
        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select
            name="gender"
            label="性別"
            defaultValue="隱藏"
          >
            <MenuItem value="男性">男性</MenuItem>
            <MenuItem value="女性">女性</MenuItem>
            <MenuItem value="隱藏">隱藏</MenuItem>

          </Select>
        </FormControl>

        {/* Birthday */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              name="birthday"
              value={birthday ? parseDate(birthday.toString()) : undefined}
            />
          </DemoContainer>
        </LocalizationProvider>
        {/* Phone */}
        <TextField
          name="phone"
          label="電話"
          value={phone || undefined}
        />
        {/* Country */}
        <FormControl>
          <InputLabel>縣市</InputLabel>
          <Select
            label="縣市"
            name="county"
            onChange={handleCountyChange}
            defaultValue={county || undefined}
          >
            {CityCountyData.map((c) => (
              <MenuItem value={c.CityName}>{c.CityName}</MenuItem>
            ))}

          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>區鄉鎮</InputLabel>
          <Select
            label="區鄉鎮"
            name="area"
            defaultValue={area || undefined}
          >
            {
              CityCountyData.find(
                (c) => c.CityName === selectedCounty,
              )?.AreaList.map((a) => (
                <MenuItem value={a.AreaName}>
                  { a.AreaName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={3} direction="row" sx={{ mt: 1 }}>
        <Button type="submit" variant="contained">儲存</Button>
        <Button variant="outlined" type="button">取消</Button>
      </Stack>
    </Container>
  );
}

export default Profile;
