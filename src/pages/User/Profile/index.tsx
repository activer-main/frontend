import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  selectUpdateUserInfo, selectUserData, selectUserInfo, setUserInfo,
} from 'store/auth/authSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import {
  Box,
  Container,
  FormControl, InputLabel, MenuItem, Paper, Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useUpdateUserMutation } from 'store/auth/authService';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useBeforeUnload } from 'hooks/useBeforeUnload';
import { blue } from '@mui/material/colors';
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
    <Container maxWidth="xl" component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>

        <Paper
          sx={{
            position: 'relative', p: 2,
          }}
          elevation={3}
        >
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: blue[100],
              height: 200,
              top: 0,
              left: 0,
              width: '100%',
            }}
          />
          <Box sx={{ pt: 10 }}>
            <AvatarUpload />
            <Stack direction="column" spacing={3}>
              <TextField
                sx={{
                  '& input': {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  },
                }}
                name="username"
                variant="standard"
                value={username || ''}
                onChange={(e) => dispatch(setUserInfo({ key: 'username', value: e.target.value }))}
              />
              <TextField
                size="small"
                variant="standard"
                name="email"
                label="Email"
                value={email}
                disabled
              />
            </Stack>
          </Box>

        </Paper>

        <Paper sx={{ p: 2 }} elevation={3}>
          {/* Profession */}
          <Typography variant="h5">
            職業
          </Typography>
          <Profession />
        </Paper>
        {/* Phone */}

        {/* Connection */}

        <Paper sx={{ p: 2 }}>

          <Stack spacing={3}>
            <Typography variant="h5">
              其他
            </Typography>
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
                  label="生日"
                  value={dayjs(birthday)}
                  onChange={(newValue) => dispatch(setUserInfo({ key: 'birthday', value: newValue?.format('YYYY-MM-DD') }))}
                />
              </DemoContainer>
            </LocalizationProvider>
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

            <Stack direction="row" spacing={2}>
              {/* Country */}
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>縣市</InputLabel>
                <Select
                  fullWidth
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
              <FormControl sx={{ width: '100%' }}>
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
          </Stack>
        </Paper>

        <Stack spacing={3} direction="row" sx={{ mt: 1 }}>
          <LoadingButton loading={isLoading} type="submit" variant="contained">儲存</LoadingButton>
          <Button variant="outlined" type="button">取消</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Profile;
