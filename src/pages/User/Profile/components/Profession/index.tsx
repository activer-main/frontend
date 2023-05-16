import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUserInfo, setUserInfo } from 'store/auth/authSlice';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = ['學生', '醫生', '律師', '工程師', '護士', '會計師', '教師', '作家', '演員', '音樂家', '畫家', '攝影師', '設計師', '廚師', '記者', '翻譯', '推銷員', '市場行銷專員', '公關人員', '人力資源專員', '行政助理', '行政經理', '網頁設計師', '資料分析師', '金融分析師', '投資銀行家', '財務經理', '風險管理師', '房地產經紀人', '房地產投資者', '旅遊業人員', '餐飲業人員', '零售業人員', '運動員', '教練', '潛水員', '電影製片人', '網路行銷人員', '社群媒體經理', '遊戲開發者', '軟體工程師', '系統分析師', '資訊安全專家'];

export default function Profession() {
  const dispatch = useAppDispatch();
  const { profession } = useAppSelector(selectUserInfo)!;
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>

      <Autocomplete
        multiple
        limitTags={3}
        options={top100Films.map((option) => option)}
        freeSolo
        defaultValue={profession ? profession.map((p) => p.profession) : undefined}
        renderTags={
          (value: readonly string[], getTagProps) => value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        onChange={(e, value) => dispatch(setUserInfo({ key: 'profession', value }))}
        renderInput={(params) => (
          <TextField
            {...params}
            name="profession"
          />
        )}
      />

    </Stack>
  );
}
