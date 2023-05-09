import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  selectUpdateUserInfo, selectUserData, selectUserInfo, setUserInfo,
} from 'store/auth/authSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useUpdateUserMutation } from 'store/auth/authService';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useBeforeUnload } from 'hooks/useBeforeUnload';
import AvatarUpload from './components/AvatarUpload';
import CityCountyData from './countyArea.json';
import Profession from './components/Profession';

function Profile() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const {
    username, email, phone, birthday, county, gender,
    area,
  } = userInfo!;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const updateUserInfo = useAppSelector(selectUpdateUserInfo);
  const { changed } = useAppSelector(selectUserData);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await updateUser(updateUserInfo)
      .unwrap()
      .then(() => toast.success('修改成功!'))
      .catch((error: any) => toast.error(error.data.message));
  };

  useBeforeUnload(changed, '尚未儲存，請問是否離開此頁面?');

  return (
    <Container component="form" maxWidth="xl" onSubmit={handleSubmit}>

      <AvatarUpload />
      {/* Username */}
      <Stack maxWidth="sm" spacing={3} sx={{ mt: 2 }}>

        <TextField
          name="username"
          label="使用者名稱"
          value={username || ''}
          onChange={(e) => dispatch(setUserInfo({ key: 'username', value: e.target.value }))}
        />

        {/* Email */}

        <TextField
          name="email"
          label="帳號"
          value={email}
          disabled
        />

        {/* Profession */}
        <Profession />
        {/* Gender */}
        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select
            name="gender"
            label="性別"
            defaultValue={gender}
            onChange={(e) => dispatch(setUserInfo({ key: 'gender', value: e.target.value }))}
          >
            <MenuItem value="Male">男性</MenuItem>
            <MenuItem value="Female">女性</MenuItem>
            <MenuItem value="Undefined">其他</MenuItem>

          </Select>
        </FormControl>

        {/* Birthday */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              value={dayjs(birthday)}
              onChange={(newValue) => dispatch(setUserInfo({ key: 'birthday', value: newValue?.format('YYYY-MM-DD') }))}
            />
          </DemoContainer>
        </LocalizationProvider>
        {/* Phone */}
        <TextField
          name="phone"
          label="電話"
          inputProps={{
            pattern: '^[0-9]{10}$',
            title: '電話欄位需為10位數字',
          }}
          value={phone || undefined}
          onChange={(e) => dispatch(setUserInfo({ key: 'phone', value: e.target.value }))}
        />
        {/* Country */}
        <FormControl>
          <InputLabel>縣市</InputLabel>
          <Select
            label="縣市"
            name="county"
            onChange={(e) => dispatch(setUserInfo({ key: 'county', value: e.target.value }))}
            defaultValue={county || undefined}
          >
            <MenuItem value={undefined}>未選擇</MenuItem>
            {CityCountyData.map((c) => (
              <MenuItem value={c.CityName} key={c.CityName}>{c.CityName}</MenuItem>
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
            <MenuItem value={undefined}>未選擇</MenuItem>
            {
              CityCountyData.find(
                (c) => c.CityName === county,
              )?.AreaList.map((a) => (
                <MenuItem value={a.AreaName} key={a.AreaName}>
                  { a.AreaName}
                </MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={3} direction="row" sx={{ mt: 1 }}>
        <LoadingButton loading={isLoading} type="submit" variant="contained">儲存</LoadingButton>
        <Button variant="outlined" type="button">取消</Button>
      </Stack>
    </Container>
  );
}

export default Profile;
